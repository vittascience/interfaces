import Experience from '/openInterface/interfaces/assets/js/simulator3d/Experience.js';
import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';
import { ARButton } from '../../../../../interfaces/assets/js/simulator3d/libs/ARButton.js';
// import * as dat from '/openInterface/interfaces/assets/js/simulator3d/libs/lil-gui.js';
import config from './config.js';
import { gsap } from '/openInterface/interfaces/assets/js/simulator3d/libs/gsap.js';
// import Gui from './utils/debug.js';
import RosConnection from './roslib.js';
import { Line2 } from '/openInterface/interfaces/assets/js/simulator3d/libs/Line2.js';
import { LineMaterial } from '/openInterface/interfaces/assets/js/simulator3d/libs/LineMaterial.js';
import { LineGeometry } from '/openInterface/interfaces/assets/js/simulator3d/libs/LineGeometry.js';
import ledRainbow from './utils/led_rainbow.js';
import RaycastModel from './utils/raycastEvents.js';
import Background from './utils/background.js';

export default class Simulator3d {
	static instance;
	constructor(_options) {
		if (Simulator3d.instance) {
			return Simulator3d.instance;
		}
		// common
		this.options = _options;
		this.experience = new Experience(this.options);
		this.loadedHierarchie = false;
		this.isReady = false; // for simulation only
		this.isBusy = false;
		this._loadHierarchie(); // important to load the hierarchie before init the simulator and access to the 3D model elements

		// Niryo Ned2
		this._initAnimation(); // first model animation
		// this._initAnimationShort(); // first model animation short version for debug
		this.isDeg = false;
		this.simulationEnded = false;
		this.isRunning = false;
		this.movementSliderOpen = false;
		this.led_tl = {}; // timeline for led ring animation in gsap
		this.oldPosition = [0, 0, 0, 0, 0, 0];
		this.matrixCoord = ['y', 'x', 'x', 'z', 'x', 'z'];
		this.count = 0;
		this.storedPositions = [];
		this.startPositions = [0.00023593298341850755, 0.49940895727663126, -1.2506181983468665, 9.265358979293481e-5, -9.265358979293481e-5, 9.265358979293481e-5];
		this.requestLineTrajectory = false;
		this.pointsArrayLine = [];
		this.socketCon = null;
		this.waitingAddBlock = false;
		this.rosConnection = new RosConnection();

		Simulator3d.instance = this; // singleton
	}

	/**
	 * Init the simulator, sliders and buttons
	 * @return {void} // init the simulator
	 */
	async _init() {
		// check mobile or desktop to disable pan in orbitControl and AR button if not mobile (AR is not supported on desktop)
		const isMobile = /Android|webOS|iPhone|iPad|Opera Mini/i.test(navigator.userAgent);
		if (isMobile) {
			// this.experience.renderer.instance.xr.enabled = true;
			this.experience.camera.modes.debug.orbitControls.enablePan = false;
		}

		const buttonMovement = document.getElementById('movements-button');
		const buttonAddBlock = document.getElementById('add-block-button');
		const closeMovementButton = document.getElementById('close-movements-button');
		const overlayMovement = document.getElementById('movements-overlay');
		const degreButton = document.getElementById('degre-radio-button');
		const radianButton = document.getElementById('radian-radio-button');

		for (let i = 0; i < 6; i++) {
			const sliderValue = document.getElementById(`slider-j${i + 1}`);
			sliderValue.addEventListener('change', async function () {
				// if (!window.Simulator3D.movementSliderOpen) return;
				sliderValue.setAttribute('value', this.value);
				const sliderTextContent = document.getElementById(`slider-j${i + 1}-value`);
				if (window.Simulator3D.isDeg) {
					sliderTextContent.innerHTML = ((this.value * 180) / Math.PI).toFixed(0) + '°';
				} else {
					sliderTextContent.innerHTML = this.value;
				}
				const getAllValues = document.querySelectorAll('.slider-joint-element');
				let jointPosition = [];
				for (let j = 0; j < getAllValues.length; j++) {
					jointPosition.push(parseFloat(getAllValues[j].value));
				}
				await window.Simulator3D.sendTrajectory(jointPosition);
			});
		}

		buttonMovement.addEventListener('click', () => {
			this.openOverlayMovement();
		});

		closeMovementButton.addEventListener('click', () => {
			this.closeOverlayMovement();
		});

		buttonAddBlock.addEventListener('click', function () {
			window.addNiryoNedBlocks(window.Simulator3D.getRotation());
		});

		degreButton.addEventListener('change', function () {
			const jointValueTitle = document.getElementById('joint-value-title');
			jointValueTitle.innerHTML = 'Joints (deg)';
			window.Simulator3D.isDeg = true;
			for (let i = 0; i < 6; i++) {
				const degValue = document.getElementById(`joint-value-${i + 1}`);
				degValue.innerHTML = ((parseFloat(degValue.innerHTML) * 180) / Math.PI).toFixed(3);
			}
		});

		radianButton.addEventListener('change', function () {
			const jointValueTitle = document.getElementById('joint-value-title');
			jointValueTitle.innerHTML = 'Joints (rad)';
			window.Simulator3D.isDeg = false;
			for (let i = 0; i < 6; i++) {
				const radValue = document.getElementById(`joint-value-${i + 1}`);
				radValue.innerHTML = ((parseFloat(radValue.innerHTML) * Math.PI) / 180).toFixed(3);
			}
		});

		const xrAvailable = await navigator.xr.isSessionSupported('immersive-ar');

		if (isMobile && this.options.enableXR && xrAvailable) {
			const xrButton = document.getElementById('experience-ar');
			xrButton.appendChild(
				ARButton.createButton(this.experience.renderer.instance, {
					requiredFeatures: ['hit-test'],
					optionalFeatures: ['dom-overlay'],
				})
			);
		}
		this.experience.renderer.instance.xr.addEventListener('sessionstart', () => {
			this.options.params.debug && console.log('start XR session');
			this.experience.xrActive = true;
			this.experience.renderer.usePostprocess = false;
			this.startXr();
		});

		this.experience.renderer.instance.xr.addEventListener('sessionend', () => {
			this.options.params.debug && console.log('end XR session');
			const excludedElements = ['floorGridHelper', 'floorPlane', 'x-axis', 'y-axis', 'z-axis'];
			this.experience.scene.traverse((child) => {
				if (child.name && excludedElements.includes(child.name)) {
					child.visible = true;
				}
			});
			const model = this.experience.scene.getObjectByName('modelCustom');
			model.visible = true;
			model.position.set(0, 0, 0);
			this.experience.renderer.usePostprocess = this.options.usePostprocess;
			this.experience.camera.modes.debug.instance.aspect = this.options.params.width / this.options.params.height;
			this.experience.camera.modes.debug.instance.fov = 50;
			this.experience.camera.modes.debug.instance.updateProjectionMatrix();

			this.experience.renderer.instance.setSize(this.options.params.width, this.options.params.height);
			this.experience.renderer.instance.setPixelRatio(window.devicePixelRatio); // Optionnel pour une meilleure qualité
			delete this.experience.renderLoopXr.animateXr;
			this.experience.xrActive = false;
			this.reset();
		});

		this.raycastModel = new RaycastModel(this.experience, this);
		this.background = new Background(this.experience, this);
	}

	openOverlayMovement(groupSelected = null) {
		console.log('openOverlayMovement', groupSelected);
		const overlayMovement = document.getElementById('movements-overlay');
		overlayMovement.classList.toggle('active-overlay-button');
		this.movementSliderOpen = !this.movementSliderOpen;

		if (this.movementSliderOpen) {
			Simulator.pause();
		} else {
			Simulator.play();
		}
		let jointPosition = this.getRotation();
		const sign = [1, -1, -1, 1, -1, 1];
		for (let i = 0; i < 6; i++) {
			jointPosition[i] = sign[i] * jointPosition[i];
		}

		for (let i = 0; i < 6; i++) {
			const sliderValue = document.getElementById(`slider-j${i + 1}`);
			const sliderTextContent = document.getElementById(`slider-j${i + 1}-value`);
			sliderValue.value = jointPosition[i];
			if (this.isDeg) {
				sliderTextContent.innerHTML = ((jointPosition[i] * 180) / Math.PI).toFixed(0) + '°';
			} else {
				sliderTextContent.innerHTML = jointPosition[i].toFixed(2);
			}
		}

		if (groupSelected !== null) {
			const slider = groupSelected.sliderId;
			const sliderElements = document.querySelectorAll('.slider-joint-element');
			for (let i = 0; i < sliderElements.length; i++) {
				if (sliderElements[i].id !== slider) {
					sliderElements[i].setAttribute('disabled', 'true');
					sliderElements[i].style.cursor = 'not-allowed';
				}
			}
		}
	}

	closeOverlayMovement() {
		const overlayMovement = document.getElementById('movements-overlay');
		overlayMovement.classList.toggle('active-overlay-button');
		Simulator.play();
		this.movementSliderOpen = !this.movementSliderOpen;
		this.raycastModel.groupedLocked = false;
		const sliderElements = document.querySelectorAll('.slider-joint-element');
		for (let i = 0; i < sliderElements.length; i++) {
			sliderElements[i].removeAttribute('disabled');
			sliderElements[i].style.cursor = 'pointer';
		}
	}

	/**
	 * Start the XR session and init the XR controller. Add the main XR function to the render loop
	 * @return {void} // start the XR session
	 * */
	startXr() {
		// hide environment mesh when XR session
		const excludedElements = ['floorGridHelper', 'floorPlane', 'x-axis', 'y-axis', 'z-axis'];
		this.experience.scene.traverse((child) => {
			if (child.name && excludedElements.includes(child.name)) {
				child.visible = false;
			}
		});

		const model = this.experience.scene.getObjectByName('modelCustom');
		model.visible = false;

		let controller;

		let reticle;

		let hitTestSource = null;
		let hitTestSourceRequested = false;

		// this.reset();
		Simulator.pause();

		// on press on the screen => insert the model to the reticle position
		const onSelect = () => {
			if (reticle.visible) {
				reticle.matrix.decompose(model.position, model.quaternion, model.scale);
				model.visible = true;
				reticle.visible = false;
				Simulator.replay();
			}
		};

		controller = this.experience.renderer.instance.xr.getController(0);
		controller.addEventListener('select', onSelect);
		this.experience.scene.add(controller);

		reticle = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial());
		reticle.matrixAutoUpdate = false;
		reticle.visible = false;
		this.experience.scene.add(reticle);
		// to test the performance
		// this.experience.renderer.instance.xr.setFramebufferScaleFactor(4.0);

		// frame and timestamp are provided by the setAnimationLoop in Experience.js file (in animate function)
		const renderLoop = (timestamp, frame) => {
			if (frame) {
				const referenceSpace = this.experience.renderer.instance.xr.getReferenceSpace();
				const session = this.experience.renderer.instance.xr.getSession();

				if (hitTestSourceRequested === false) {
					session.requestReferenceSpace('viewer').then(function (referenceSpace) {
						session.requestHitTestSource({ space: referenceSpace }).then(function (source) {
							hitTestSource = source;
						});
					});

					hitTestSourceRequested = true;
				}

				if (hitTestSource) {
					const hitTestResults = frame.getHitTestResults(hitTestSource);

					if (hitTestResults.length) {
						const hit = hitTestResults[0];

						reticle.visible = true;
						reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
					} else {
						reticle.visible = false;
					}
				}
			}
		};

		this.experience.renderLoopXr.animateXr = renderLoop.bind(this);
	}

	/**
	 * Load the 3D model and create the hierarchie of the robot, store it in this.experience.hierarchie
	 *
	 * @private
	 * @return {void} // create the hierarchie of the robot => this.experience.hierarchie
	 **/
	_loadHierarchie() {
		setTimeout(() => {
			if (this.experience.loaded) {
				if (this.options.params.debug) {
					console.log('Model loaded');
				}
				this.experience.scene.traverse((child) => {
					if (child.isMesh) {
						child.receiveShadow = true;
						child.castShadow = true;
					}

					const elementsRegex = this.options.modelHierarchy.elementsRegex;

					for (let i = 0; i < elementsRegex.length; i++) {
						const regex = new RegExp(elementsRegex[i], 'g');
						if (child.name.match(regex)) {
							this.experience.hierarchie[child.name] = child;
						}
					}

					if (child.name.match(/PerspectiveCamera/g)) {
						this.experience.perspecticeCamera = child;
					}
				});
				this.experience.sceneReady = true;
				if (this.usePostprocess) {
					this.experience.renderer.usePostprocess = true;
				}
				this.loadedHierarchie = true;
				this._init();
				this.led_ring();
				// new Gui(this.experience);
			} else {
				if (this.options.params.debug) console.log('model not loaded');
				this._loadHierarchie();
			}
		}, 100);
	}
	/**
	 * Init the first animation of the robot during loading
	 * @private
	 */
	_initAnimation() {
		setTimeout(async () => {
			if (!this.loadedHierarchie) {
				// this._initAnimation();
				this._initAnimation();
				return;
			}
			const overlay = document.querySelector('.overlay-experience');
			overlay.style.opacity = 1;
			gsap.to(overlay.style, {
				duration: 3,
				opacity: '0',
				ease: 'power3.inOut',
				onComplete: () => {
					this.closeGripper(0.5);
					overlay.remove();
				},
			});

			const camera = this.experience.camera.modes.debug.instance;
			// camera.position.set(0, 3, 10);
			gsap.to(camera.position, {
				duration: 3.5,
				x: -0.65,
				y: 0.55,
				z: 0.65,
				onComplete: () => {
					// camera.update();
					this.isReady = true;
				},
				ease: 'power4.inOut',
			});
			// to modify for each interface robot
			await this.goToPos(this.startPositions, 4);
			this.isReady = true;
		}, 100);
	}

	/**
	 * Init the first animation of the robot during loading short version for debug
	 * @private
	 */
	_initAnimationShort() {
		setTimeout(async () => {
			if (!this.loadedHierarchie) {
				this._initAnimationShort();
				return;
			}
			const overlay = document.querySelector('.overlay-experience');
			overlay.style.opacity = 1;
			gsap.to(overlay.style, {
				duration: 0.5,
				opacity: '0',
				ease: 'power3.inOut',
				onComplete: () => {
					this.closeGripper(0.5);
					overlay.remove();
				},
			});

			const camera = this.experience.camera.modes.debug.instance;
			// camera.position.set(0, 3, 10);
			gsap.to(camera.position, {
				duration: 0.5,
				x: -3.4905921244078773,
				y: 2.292785267899508,
				z: 3.399838575039238,
				onComplete: () => {
					// camera.update();
					this.isReady = true;
				},
				ease: 'power4.inOut',
			});
			// to modify for each interface robot
			await this.goToPos(this.startPositions, 0.5);
			this.isReady = true;
		}, 100);
	}

	/**
	 *
	 * @returns {boolean} // return true if the robot is ready to be used for simulation afer first animation => recursive check at the beginning in src/niryo.js
	 */
	checkIsReady() {
		return this.isReady;
	}

	async reset() {}

	/**
	 *
	 * @returns {boolean} // return true if the roslibjs websocket connection is established
	 */
	checkIsRoslibConnected() {
		return this.rosConnection.roslibConnected;
	}

	/**
	 * @description // init the websocket connection with the robot using roslibjs
	 * @param {object} socket // socket connection
	 * @return {void} // creates socketCon object
	 */
	initConnectionMiddleware(socket) {
		this.socketCon = socket;
		this.subscribeJointStates();
		this.subscribeToGripper();
		this.subscribeLEDRING();
		this.subscribeToFreeMotion();
	}

	/**
	 * @description reset the robot led timeline
	 * @return {void} // reset the led timeline
	 **/

	resetTl() {
		for (let i = 0; i < 30; i++) {
			this.led_tl[i].pause();
		}
	}

	/**
	 *
	 * @param {string} color // color of the led ring
	 */
	led_ring(color) {
		// setTimeout(() => {
		// 	if (!this.loadedHierarchie) {
		// 		this.led_ring(color);
		// 		return;
		// 	}
		for (let i = 0; i < 30; i++) {
			const led = this.experience.hierarchie[`LED_RING_${i + 1}`];
			led.material.emissive = new THREE.Color(color ? color : 0x00ff00);
			led.material.emissiveIntensity = 1.5;
		}
		// this.led_ring_pulse(color, false);
		// }, 100);
	}
	/**
	 *
	 * @param {string} color
	 * @param {boolean} needReset
	 * @returns {void} // pulse the led ring
	 */
	led_ring_pulse(color, needReset) {
		// maybe not the best way to do it (we should not create a new timeline each time reset is needed)

		if (this.led_tl['0'] === undefined) {
			for (let i = 0; i < 30; i++) {
				const led = this.experience.hierarchie[`LED_RING_${i + 1}`];
				led.material.emissive = new THREE.Color(color ? color : 0x00ff00);
				led.material.emissiveIntensity = 1.5;
				this.led_tl[i] = new gsap.timeline();
				// this.led_tl[i].addLabel(`led_ring_${i + 1}`, i+1);
				this.led_tl[i].fromTo(
					led.material,
					{
						emissiveIntensity: 3,
					},
					{
						duration: 1.5,
						emissiveIntensity: 0,
						repeat: -1,
						yoyo: true,
					}
				);
			}
		} else {
			for (let i = 0; i < 30; i++) {
				this.led_tl[i].play();
			}
		}
		if (needReset) {
			for (let i = 0; i < 30; i++) {
				clearInterval(this.intervalLed);
				const led = this.experience.hierarchie[`LED_RING_${i + 1}`];
				led.material.emissive = new THREE.Color(color ? color : 0x00ff00);
				// restart the timeline to avoid the discrepancy between individual leds and yoyo effect
				this.led_tl[i].restart();
			}
		}
	}

	/**
	 * @param {string} color
	 */
	led_ring_anim(color) {
		for (let i = 0; i < 30; i++) {
			this.led_tl[i].pause();
			const led = this.experience.hierarchie[`LED_RING_${i + 1}`];
			led.material.emissive = new THREE.Color(color ? color : 0x00ff00);
			led.material.emissiveIntensity = 1.5;
		}
	}

	/**
	 *
	 * @param {string} color
	 * @param {number} period
	 * @param {number} iteration
	 * @param {boolean} wait
	 */
	led_ring_flashing(color, period, iteration, wait) {
		clearInterval(this.intervalLed);
		let isOn = true; // flag to follow the state of the led
		let currentIteration = 0;
		for (let i = 0; i < 30; i++) {
			this.led_tl[i].pause();
		}
		this.intervalLed = setInterval(() => {
			if (currentIteration >= iteration) {
				clearInterval(this.intervalLed);
				this.led_ring_pulse(_, true);
				return;
			}

			for (let i = 0; i < 30; i++) {
				const led = this.experience.hierarchie[`LED_RING_${i + 1}`];
				led.material.emissive = new THREE.Color(color ? color : 0x00ff00);
				led.material.emissiveIntensity = isOn ? 3 : 0;
			}

			isOn = !isOn;
			currentIteration++;
		}, (period / 2) * 1000);
	}
	/**
	 *
	 * @param {number} led
	 * @param {string} color
	 */
	async led_set_led(led, color) {
		return new Promise((resolve, reject) => {
			const ledRing = this.experience.hierarchie[`LED_RING_${led + 1}`];
			this.led_tl[led].pause();
			ledRing.material.emissive = new THREE.Color(color ? color : 0x00ff00);
			ledRing.material.emissiveIntensity = 1.5;
			return resolve();
		});
	}
	/**
	 *
	 * @param {string} color
	 * @param {number} period
	 * @param {number} iteration
	 * @param {boolean} wait
	 * @param {boolean} simulation // unused for now
	 */
	led_ring_chase(color, period, iteration, wait, simulation) {
		const ledFunction = (func) => {
			clearInterval(this.intervalLed);
			let isOdd = true;
			let currentIteration = 0;
			for (let i = 0; i < 30; i++) {
				this.led_tl[i].pause();
			}
			this.intervalLed = setInterval(() => {
				if (currentIteration >= iteration) {
					clearInterval(this.intervalLed);
					this.led_ring_pulse('#00ff00', true);
					return func();
				}

				for (let i = 1; i < 31; i++) {
					let lightUp;
					if (isOdd) {
						lightUp = i % 2 === 0;
					} else {
						lightUp = i % 2 !== 0;
					}
					const led = this.experience.hierarchie[`LED_RING_${i}`];
					led.material.emissive = new THREE.Color(lightUp ? color : 0x000000);
					led.material.emissiveIntensity = 1.5;
				}

				isOdd = !isOdd; //
				currentIteration++;
			}, (period / 2) * 1000); //
		};
		if (wait) {
			return new Promise((resolve, reject) => {
				ledFunction(resolve);
			});
		} else {
			ledFunction();
		}
	}

	/**
	 * @description // wipe the led ring with a specific color
	 * @param {string} color
	 * @param {number} period
	 * @param {boolean} wait
	 * @returns {void} // wipe the led ring
	 **/
	led_ring_wipe(color, period, wait = false) {
		const ledFunction = (func) => {
			clearInterval(this.intervalLed);
			let currentLed = 0;
			for (let i = 0; i < 30; i++) {
				this.led_tl[i].pause();
			}
			this.intervalLed = setInterval(() => {
				if (currentLed >= 30) {
					clearInterval(this.intervalLed);
					this.led_ring_pulse('#00ff00', true);
					return func();
				}
				for (let i = 1; i < 31; i++) {
					const led = this.experience.hierarchie[`LED_RING_${i}`];
					led.material.emissive = new THREE.Color(i === currentLed ? color : led.material.emissive);
					led.material.emissiveIntensity = 1.5;
				}

				currentLed++;
			}, (period / 30) * 1000);
		};
		if (wait) {
			return new Promise((resolve, reject) => {
				ledFunction(resolve);
			});
		} else {
			ledFunction();
		}
	}

	/**
	 * @description // create a rainbow pattern on the led ring
	 * @param {number} duration
	 * @param {number} repetitions
	 * @param {boolean} wait
	 * @returns {void} // create a rainbow pattern on the led ring
	 **/
	async led_ring_rainbow_pattern(duration, repetitions, wait = false) {
		const ledFunction = (func) => {
			clearInterval(this.intervalLed);
			for (let i = 0; i < 30; i++) {
				this.led_tl[i].pause();
			}
			let rainbowPos = 0;
			let currentIteration = 0;

			this.intervalLed = setInterval(() => {
				if (rainbowPos >= ledRainbow.length) {
					rainbowPos = 0;
					currentIteration++;
				}
				if (currentIteration >= repetitions) {
					clearInterval(this.intervalLed);
					this.led_ring_pulse('#00ff00', true);
					return func();
				}
				for (let i = 0; i < 30; i++) {
					const led = this.experience.hierarchie[`LED_RING_${i + 1}`];
					led.material.emissive = new THREE.Color(ledRainbow[rainbowPos]);
					led.material.emissiveIntensity = 1.5;
				}
				rainbowPos++;
			}, (duration * 1000) / ledRainbow.length);
		};
		if (wait) {
			return new Promise((resolve, reject) => {
				ledFunction(resolve);
			});
		} else {
			ledFunction();
		}
	}

	/**
	 *
	 * @param {number} duration
	 * @param {number} repetitions
	 * @param {boolean} wait
	 * @returns {void} // create a rainbow cycle pattern on the led ring
	 **/
	led_ring_rainbow_cycle(duration, repetitions, wait = false) {
		const ledFunction = (func) => {
			clearInterval(this.intervalLed);
			for (let i = 0; i < 30; i++) {
				this.led_tl[i].pause();
			}
			let rainbowPos = 0;
			let currentIteration = 0;

			this.intervalLed = setInterval(() => {
				if (rainbowPos >= ledRainbow.length - 1) {
					rainbowPos = 0;
					currentIteration++;
				}
				if (currentIteration >= repetitions) {
					clearInterval(this.intervalLed);
					this.led_ring_pulse('#00ff00', true);
					return func();
				}
				for (let i = 0; i < 30; i++) {
					const led = this.experience.hierarchie[`LED_RING_${i + 1}`];
					led.material.emissive = new THREE.Color(ledRainbow[(rainbowPos + i * 2) % ledRainbow.length]);
					led.material.emissiveIntensity = 1.5;
				}
				rainbowPos += 1;
			}, (duration * 1000) / ledRainbow.length);
		};

		if (wait) {
			return new Promise((resolve, reject) => {
				ledFunction(resolve);
			});
		} else {
			ledFunction();
		}
	}

	/**
	 * @description // create a led ring animation going up
	 * @param {string} color
	 * @param {number} period
	 * @param {number} iterations
	 * @param {boolean} wait
	 * @returns {void} // create a led ring animation going up
	 **/
	led_ring_go_up(color, period, iterations, wait) {
		const ledFunction = (func) => {
			clearInterval(this.intervalLed);
			let currentIteration = 0;
			let currentLed = 0;
			for (let i = 0; i < 30; i++) {
				this.led_tl[i].pause();
			}
			this.intervalLed = setInterval(() => {
				if (currentIteration >= iterations) {
					clearInterval(this.intervalLed);
					this.led_ring_pulse('#00ff00', true);
					return func();
				}
				const led = this.experience.hierarchie[`LED_RING_${currentLed + 1}`];
				led.material.emissive = new THREE.Color(color ? color : 0x00ff00);
				led.material.emissiveIntensity = 1.5;

				currentLed++;
				if (currentLed >= 30) {
					currentLed = 0;
					for (let i = 0; i < 30; i++) {
						const led = this.experience.hierarchie[`LED_RING_${i + 1}`];
						led.material.emissive = new THREE.Color(0x000000);
						led.material.emissiveIntensity = 1.5;
					}
					currentIteration++;
				}
			}, (period * 1000) / 30);
		};
		if (wait) {
			return new Promise((resolve, reject) => {
				ledFunction(resolve);
			});
		} else {
			ledFunction();
		}
	}

	/**
	 * @description // create a led ring animation going up and down (half speed for go up animation, half speed for go down)
	 * @param {string} color
	 * @param {number} period
	 * @param {number} iterations
	 * @param {boolean} wait
	 * @returns {void} // create a led ring animation going up and down
	 **/
	led_ring_up_down(color, period, iterations, wait) {
		const ledFunction = (func) => {
			clearInterval(this.intervalLed);
			let currentIteration = 0;
			let currentLed = 0;
			let needReverse = false;

			for (let i = 0; i < 30; i++) {
				this.led_tl[i].pause();
			}
			this.intervalLed = setInterval(() => {
				if (currentIteration >= iterations) {
					clearInterval(this.intervalLed);
					this.led_ring_pulse('#00ff00', true);
					return func();
				}
				const led = this.experience.hierarchie[`LED_RING_${currentLed + 1}`];
				led.material.emissive = new THREE.Color(needReverse ? '#000000' : color ? color : 0x00ff00);
				led.material.emissiveIntensity = 1.5;
				currentLed++;
				if (currentLed >= 30) {
					currentLed = 0;
					needReverse = !needReverse;
					currentIteration += 1 / 2;
				}
			}, (period * 1000) / 60);
		};
		if (wait) {
			return new Promise((resolve, reject) => {
				ledFunction(resolve);
			});
		} else {
			ledFunction();
		}
	}

	/**
	 * @return {void} // subscribe to the led ring topic
	 */
	subscribeLEDRING() {
		this.socketCon.on('led_ring_status', (message) => {
			const colorReceived = '#' + ((1 << 24) + (message.animation_color.r << 16) + (message.animation_color.g << 8) + message.animation_color.b).toString(16).slice(1);
			switch (message.animation_mode.animation) {
				case 1:
					this.led_ring_anim(colorReceived);
					break;
				case 2:
					this.led_ring_flashing(colorReceived, 5, 3, false);
					break;
				case 4:
					this.led_ring_chase(colorReceived, 0.5, 10, false);
					break;
				case 5:
					this.led_ring_wipe(colorReceived, 5, false);
					break;
				case 6:
					this.led_ring_rainbow_pattern(2, 1, false);
					break;
				case 7:
					this.led_ring_rainbow_cycle(2, 1, false);
					break;
				case 13:
					this.led_set_led(0, '#0000ff');
					break;
			}
		});
	}

	/**
	 *
	 * @returns {Array} // return the current array of joint positions of the robot (in radians)
	 */
	getRotation() {
		const joint1 = this.experience.hierarchie.joint_1;
		const joint2 = this.experience.hierarchie.joint_2;
		const joint3 = this.experience.hierarchie.joint_3;
		const joint4 = this.experience.hierarchie.joint_4;
		const joint5 = this.experience.hierarchie.joint_5;
		const joint6 = this.experience.hierarchie.joint_6;
		return [joint1.rotation.y, joint2.rotation.x, joint3.rotation.x, joint4.rotation.z, joint5.rotation.x, joint6.rotation.z];
	}

	// adjust depending on the robot, joints and 3D model
	/**
	 * @description go to a specific position in radians using gsap go to
	 * @param {array} targetPositions
	 * @param {number} duration
	 * @returns {void}
	 */
	async goToPos(targetPositions, duration) {
		if (this.isBusy) return;
		const experience = this.experience;
		const baseSpeed = 0.7;

		const animationFunction = () => {
			this.isBusy = true;
			this.completedTasks = [false, false, false, false, false, false];
			return new Promise((resolve, reject) => {
				const promises = [];
				for (let i = 0; i < targetPositions.length; i++) {
					// Créez une fonction intermédiaire pour capturer la valeur de i
					const createAnimationPromise = (index) => {
						return new Promise((resolve) => {
							const sign = [1, -1, -1, 1, -1, 1];
							gsap.to(this.experience.hierarchie[`joint_${index + 1}`].rotation, {
								duration: duration, // ajustez selon les besoins
								[this.matrixCoord[index]]: targetPositions[index] * sign[index],
								// ease: "power1.inOut",
								onComplete: () => {
									// console.log('joint ' + index + ' completed');
									resolve();
								},
							});
						});
					};
					this.updateLineTrajectory('trajectoryLineSimulation');
					// Créez la promesse pour cette itération
					promises.push(createAnimationPromise(i));
				}

				// Utilisez Promise.all pour attendre que toutes les promesses se terminent
				Promise.all(promises).then(() => {
					this.isBusy = false;
					resolve();
				});
			});
		};

		return animationFunction();
	}

	/**
	 * @description  get trajectory from the robot using roslibjs
	 * @param {array} destPosition
	 * @param {boolean} direct
	 * @returns {void} // recursive call to goToPos function
	 */
	async sendTrajectory(destPosition, direct) {
		let startPositions = this.getRotation();
		const sign = [1, -1, -1, 1, -1, 1];
		for (let i = 0; i < 6; i++) {
			startPositions[i] = sign[i] * startPositions[i];
		}

		let result;
		if (direct) {
			// result = destPosition;
			const getStartPose = await this.rosConnection.computeForwardKinematics(this.getRotation());
			// await this.rosConnection.computeInverseKinematics(getStartPose);
			result = await this.rosConnection.getLinearTrajectory(startPositions, getStartPose, destPosition, 'rad');
		} else {
			result = await this.rosConnection.getTrajectory(startPositions, destPosition, 'rad');
			// result = await this.rosConnection.getTrajectoryLinear(startPositions, destPosition, 'rad');
		}

		const moveToPosition = async (index) => {
			if (index >= result.length) {
				// console.log(`kinematic planned path completed, ${index} positions reached, duration: ${result[index - 1].time_from_start.secs + result[index - 1].time_from_start.nsecs * 1e-9}`);
				return; // stop recursion
			}

			const duration = result[index].time_from_start.secs + result[index].time_from_start.nsecs * 1e-9 - (result[index - 1].time_from_start.secs + result[index - 1].time_from_start.nsecs * 1e-9);
			await this.goToPos(result[index].positions, duration);
			for (let i = 0; i < 6; i++) {
				const joint = this.experience.hierarchie[`joint_${i + 1}`];
				const jointSpan = document.getElementById(`joint-value-${i + 1}`);
				if (this.isDeg) {
					jointSpan.innerText = ((sign[i] * joint.rotation[this.matrixCoord[i]] * 180) / Math.PI).toFixed(3);
				} else {
					jointSpan.innerText = sign[i] * joint.rotation[this.matrixCoord[i]].toFixed(3);
				}
			}
			await moveToPosition(index + 1);
		};

		// Commencer la récursion à partir de la première position
		await moveToPosition(1);
	}
	// unused for now
	async sendMultipleTrajectories(destPositions) {
		for (let i = 0; i < destPositions.length; i++) {
			await this.sendTrajectory(destPositions[i], false);
			await new Promise((resolve) => setTimeout(resolve, 30));
		}
	}
	/**
	 *
	 * @param {array} pose
	 * @returns {array} // return the joint positions from a specific pose
	 */
	async computeInverseKinematics(pose) {
		const joints = this.rosConnection.computeInverseKinematics(pose);
		return joints;
	}
	/**
	 *
	 * @param {array} joints
	 * @returns {array} // return the pose from joint position
	 */
	async computeForwardKinematics(joints) {
		const pose = await this.rosConnection.computeForwardKinematics(joints);
		return pose;
	}
	/**
	 * @description // unused for now
	 * @param {array} start
	 * @param {array} end
	 */
	getLinear(start, end) {
		return this.rosConnection.getLinearTrajectory(start, end);
	}

	/**
	 *
	 * @param {string} type // type of line to destroy; simulation:trajectoryLineSimulation, real robot line path:trajectoryLine)
	 */
	destroyLineTrajectory(type) {
		const testLine = this.experience.scene.getObjectByName(type);
		if (testLine) {
			// Dispose geometry and material
			if (testLine.geometry) testLine.geometry.dispose();
			if (testLine.material) testLine.material.dispose();

			this.experience.scene.remove(testLine);
			if (type === 'trajectoryLine') {
				this.pointsArrayLine = [];
			} else {
				this.pointsArrayLineSimulation = [];
			}
		}
	}

	/**
	 *
	 * @param {string} type // type of line to draw; simulation:trajectoryLineSimulation, real robot line path:trajectoryLine)
	 */
	drawLineTrajectory(type) {
		const testLine = this.experience.scene.getObjectByName(type);
		if (testLine) {
			if (testLine.geometry) testLine.geometry.dispose();
			if (testLine.material) testLine.material.dispose();
			this.experience.scene.remove(testLine);
		}
		const globalPosition = new THREE.Vector3();
		const TCPPos = this.experience.hierarchie.X_axis_helper.getWorldPosition(globalPosition);
		const points = [];
		points.push(TCPPos);
		points.push(TCPPos);

		const spline = new THREE.CatmullRomCurve3(points);
		const divisions = Math.round(10 * points.length);
		let positions = [];
		// Calcul des positions le long de la spline
		for (let i = 0, l = divisions; i < l; i++) {
			const t = i / l;
			const point = spline.getPoint(t);
			positions.push(point.x, point.y, point.z);
		}

		const color = type === 'trajectoryLine' ? 0x00ff00 : 0xff0000;
		const lineMaterial = new LineMaterial({ color, linewidth: 0.005 });
		const lineGeometry = new LineGeometry();
		lineGeometry.setPositions(positions);
		// lineGeometry.setFromPoints(points);

		const line = new Line2(lineGeometry, lineMaterial);
		line.name = type;

		// line.computeLineDistances();
		line.scale.set(1, 1, 1);
		// this.experience.scene.add(line);

		this.experience.scene.add(line);
	}

	/**
	 *
	 * @param {string} type
	 * @returns {void} update the line trajectory. Complete supression of points array and create a new path each time the function is called
	 */
	updateLineTrajectory(type) {
		const line = this.experience.scene.getObjectByName(type);
		if (!line) return; // Exit if line does not exist

		const globalPosition = new THREE.Vector3();
		const TCPPos = this.experience.hierarchie.X_axis_helper.getWorldPosition(globalPosition);

		// update points array
		if (type === 'trajectoryLine') {
			if (!this.pointsArrayLine) {
				this.pointsArrayLine = [];
			}
			if (TCPPos) {
				this.pointsArrayLine.push(TCPPos.clone());
			}
		} else {
			if (!this.pointsArrayLineSimulation) {
				this.pointsArrayLineSimulation = [];
			}
			if (TCPPos) {
				this.pointsArrayLineSimulation.push(TCPPos.clone());
			}
		}
		let positions = [];

		// select the array depending on the type of line (simulator or real robot)
		const pointsArray = type === 'trajectoryLine' ? this.pointsArrayLine : this.pointsArrayLineSimulation;
		// make the points array not too big => suppress points if too big
		if (pointsArray.length > 2000) {
			pointsArray.shift();
		}
		const spline = new THREE.CatmullRomCurve3(pointsArray);
		const divisions = Math.round(1 * pointsArray.length);
		if (spline.points.length < 2) return; // avoid error if not enough points
		// calc positions along spline
		try {
			for (let i = 0; i < divisions; i++) {
				const t = divisions > 1 ? i / (divisions - 1) : 0;
				const point = spline.getPoint(t);
				if (!point) {
					console.error("Point non défini trouvé à l'index:", i);
					continue;
				}
				positions.push(point.x, point.y, point.z);
			}
		} catch (error) {
			console.error('Erreur lors du calcul des points de la spline:', error);
		}

		if (positions.length === 0) return; // Exit if no positions

		// update line geometry with new geometry, maybe
		line.geometry = new LineGeometry();
		line.geometry.setPositions(positions);
	}

	/**
	 * @description Only for real moves. Subscribe to the joint_states topic to get the current position of the robot and update the 3D model and line trajectory if needed
	 * @return {void} // subscribe to the joint_states topic
	 */

	subscribeJointStates() {
		this.socketCon.on('joint_states', (message) => {
			if (message.position.toString() !== this.oldPosition.toString()) {
				// console.log('Received joint states: ', message.position);
				this.oldPosition = message.position;
				// this.goToPos(message.position, 0.02);
				this.storedPositions.push(message.position);

				const sign = [1, -1, -1, 1, -1, 1];
				for (let i = 0; i < 6; i++) {
					const joint = this.experience.hierarchie[`joint_${i + 1}`];
					const jointSpan = document.getElementById(`joint-value-${i + 1}`);
					jointSpan.innerText = sign[i] * joint.rotation[this.matrixCoord[i]].toFixed(3);
					joint.rotation[this.matrixCoord[i]] = sign[i] * message.position[i];
				}
				if (this.requestLineTrajectory) {
					this.updateLineTrajectory('trajectoryLine');
				}
			}
		});
	}

	/**
	 *
	 * @param {number} duration
	 * @return {void} // close the 3D model gripper
	 */
	closeGripper(duration) {
		const morsLeft = this.experience.hierarchie.MORS_LEFT;
		const morsRight = this.experience.hierarchie.MORS_RIGHT;
		gsap.to(morsLeft.position, {
			duration: duration,
			x: 0.01,
		});
		gsap.to(morsRight.position, {
			duration: duration,
			x: -0.005,
		});
	}

	/**
	 *
	 * @param {number} duration
	 * @return {void} // open the 3D model gripper
	 */
	openGripper(duration) {
		const morsLeft = this.experience.hierarchie.MORS_LEFT;
		const morsRight = this.experience.hierarchie.MORS_RIGHT;
		gsap.to(morsLeft.position, {
			duration: duration,
			x: 0.028,
		});
		gsap.to(morsRight.position, {
			duration: duration,
			x: -0.025,
		});
	}

	/**
	 * @description // subscribe to the gripper position topic
	 * @return {void}
	 */
	subscribeToGripper() {
		this.socketCon.on('gripper_position', (message) => {
			// console.log('Received gripper position: ', message);
			const speed = (600 - message.goal.cmd.speed) / 1000;
			if (message.goal.cmd.cmd_type === 2) {
				setTimeout(() => {
					this.closeGripper(speed);
				}, 250);
			} else if (message.goal.cmd.cmd_type === 1) {
				setTimeout(() => {
					this.openGripper(speed);
				}, 250);
			}
		});
	}

	// unused for now
	async goHome() {
		await this.sendTrajectory([0, 0, 0, 0, 0, 0]);
	}

	/**
	 * @description // add a niryo block to the simulation from the current position of the robot
	 */
	addNiryoBlock() {
		window.addNiryoNedBlocks(this.getRotation());
	}

	/**
	 * @description // subscribe to the free motion topic. If the robot is in free motion mode, add a niryo block to the simulation if the saved button (robot) is pressed
	 */
	subscribeToFreeMotion() {
		this.socketCon.on('free_motion__save_status', (message) => {
			// console.log('Received free motion status: ', message);
			if (message.action < 10 && !this.waitingAddBlock) {
				this.waitingAddBlock = true;
				this.addNiryoBlock();
			}
		});
	}
}

window.Simulator3D = new Simulator3d(config);
