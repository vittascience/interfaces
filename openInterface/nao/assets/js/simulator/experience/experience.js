import Experience from '/openInterface/interfaces/assets/js/simulator3d/Experience.js';
import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';

import { ARButton } from '../../../../../interfaces/assets/js/simulator3d/libs/ARButton.js';
// import * as dat from '/openInterface/interfaces/assets/js/simulator3d/libs/lil-gui.js';
import config from './config.js';
import { gsap } from '/openInterface/interfaces/assets/js/simulator3d/libs/gsap.js';
import Gui from './utils/debug.js';
import IKSolver from './utils/IKSolver.js';
import { poses, initialRootBone, upperBoneLimits } from './utils/poses.js';
import MapJointValues from './utils/mapJointsValues.js';
import TextGenerator from './utils/textGenerator.js';
import Background from './utils/background.js';
import SceneSetup from './utils/sceneSetup.js';
import RaycastModel from './utils/raycastEvents.js';
import AngleConversion from './utils/angle_conversion.js';
import Physics from './utils/physics.js';
import { Line2 } from '/openInterface/interfaces/assets/js/simulator3d/libs/Line2.js';
import { LineMaterial } from '/openInterface/interfaces/assets/js/simulator3d/libs/LineMaterial.js';
import { LineGeometry } from '/openInterface/interfaces/assets/js/simulator3d/libs/LineGeometry.js';

const ledShaderMaterial = new THREE.ShaderMaterial({
	uniforms: {
		color: { value: new THREE.Color(1, 1, 1) },
		intensity: { value: 1.0 },
	},
	vertexShader: `
        varying vec3 vColor;
        void main() {
            vColor = vec3(1.0); // Transmettre une couleur de base au fragment
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
	fragmentShader: `
        uniform vec3 color;
        uniform float intensity;
        varying vec3 vColor;

        void main() {
            // Contrôle la couleur et la transparence en fonction de l'intensité
            vec3 finalColor = color;
            float finalAlpha = intensity; // Transparence basée sur l'intensité
            gl_FragColor = vec4(finalColor, finalAlpha); // Utilise l'alpha pour contrôler l'opacité
        }
    `,
	transparent: true, // Active la transparence
});

export default class Simulator3d {
	static instance;
	constructor(_options, _poses) {
		if (Simulator3d.instance) {
			return Simulator3d.instance;
		}
		// common
		this.isReady = false; // for sklupt simulation only
		this.resetFlag = false;
		this.options = _options;
		this.poses = _poses;
		this.experience = new Experience(this.options, this.isReady);
		this.loadedHierarchie = false;
		this.isBusy = false;
		this.calibrationOffset = this.options.calibrationOffsets;
		this._loadHierarchie(); // important to load the hierarchie before init the simulator and access to the 3D model elements

		// Nao's specific

		this.naoConnected = false;
		this.realtimeMovement = false;
		this.isWakeUp = false;
		this.socket = null;

		this.promiseToResolve = [];
		this.animationBeforeStart = null;
		this.startPosition = [];
		this.intervalLedEyesRasta = null;
		this.intervalOtherLedsRasta = null;
		this.intervalLedRotation = null;
		this.intervalCheckAnimation = null;
		this._initAnimation(); // first model animation
		this.isLockedView = false;
		this.activeStreaming = false;
		this.isDeg = false;
		this.simulationEnded = false;
		this.isRunning = false;
		this.movementSliderOpen = false;
		this.isDeg = false;
		this.led_tl = {};
		this.requestLineTrajectory = false;
		this.pointsArrayLines = {};
		this.colorLine1 = new THREE.Color(0xff00ff);
		this.colorLine2 = new THREE.Color(0x00ff00);
		this.socketCon = null;
		this.ledGroup = {};
		this.ledsIntensity = {};
		this.sensorsGroupLeds = ['HeadTouchFront', 'HeadTouchMiddle', 'HeadTouchRear', 'LFootBumperRight', 'RFootBumperRight', 'LHandTouchLeft', 'LHandTouchRight', 'LHandTouchBack', 'RHandTouchLeft', 'RHandTouchRight', 'RHandTouchBack', 'sonar_sensor_left', 'sonar_sensor_right'];
		this.naoPose = 'stand';
		this.openHands = {
			left: false,
			leftHandValue: 0,
			right: false,
			rightHandValue: 0,
		};

		// bonus
		this.shakeDuration = 270;
		this.shakeIntensity = 0.12;
		this.isShaking = false;
		this.shakeEndTime = 0;
		Simulator3d.instance = this;
	}

	async startCameraShake() {
		this.fadeLedsColor(['led_brain', 'nao_logo_chest', 'nao_logo_foot_left', 'nao_logo_foot_right'], { r: 255, g: 0, b: 0 }, 1);

		const stompingFootAction = this.experience.actions['invoke_scene'];
		await this.preparePose('invoke_scene', 0.5, false);
		stompingFootAction.reset();
		stompingFootAction.setLoop(THREE.LoopOnce);
		stompingFootAction.clampWhenFinished = true;
		stompingFootAction.fadeIn(0.7);
		stompingFootAction.play();

		setTimeout(() => {
			this.fadeLedsColor(['led_brain', 'nao_logo_chest', 'nao_logo_foot_left', 'nao_logo_foot_right'], { r: 0, g: 255, b: 0 }, 1);

			this.experience.movementObjectFunctions.shakeCamera = this.updateCameraShake.bind(this);
			this.isShaking = true;
			this.shakeEndTime = performance.now() + this.shakeDuration;
		}, 1.1 * 1000);
		await this.waitForActionToFinish(stompingFootAction, null, true, [stompingFootAction]);
	}

	updateCameraShake() {
		const camera = this.experience.camera.modes.debug.instance;

		if (!this.isShaking) return;

		const currentTime = performance.now();
		if (currentTime > this.shakeEndTime) {
			this.isShaking = false;
			return;
		}

		const timeRemaining = (this.shakeEndTime - currentTime) / this.shakeDuration;

		const shakeX = (Math.random() - 0.5) * 2 * this.shakeIntensity * timeRemaining;
		const shakeY = (Math.random() - 0.5) * 2 * this.shakeIntensity * timeRemaining;
		const shakeZ = (Math.random() - 0.5) * 2 * this.shakeIntensity * timeRemaining;

		camera.position.x += shakeX;
		camera.position.y += shakeY;
		camera.position.z += shakeZ;
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
		// init Lock View
		const lockViewButton = document.getElementById('button-lock-view');
		lockViewButton.addEventListener('click', () => {
			lockViewButton.classList.toggle('active-lock-view');
			this.isLockedView = !this.isLockedView;
			this.lockViewToModel();
		});

		const soundButton = document.getElementById('button-sound-volume');
		soundButton.addEventListener('click', () => {
			soundButton.classList.toggle('active-sound-volume');
			this.textGenerator.mute = !this.textGenerator.mute;
			if (!this.textGenerator.mute) {
				soundButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
			} else {
				soundButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
			}
			this.textGenerator.speech.volume = this.textGenerator.mute ? 0 : 1;
		});

		const addBlockButton = document.getElementById('add-block-button');
		addBlockButton.addEventListener('click', () => {
			this.mapJointValues.addUpperBodyBlocks();
		});

		const penDrawingButton = document.getElementById('button-pen-drawing');
		penDrawingButton.addEventListener('click', () => {
			penDrawingButton.classList.toggle('activated');
			this.requestLineTrajectory = !this.requestLineTrajectory;
			if (!this.requestLineTrajectory) {
				this.pointsArrayLines = {};
				delete this.experience.movementObjectFunctions.upadteLineTrajectoryLine1;
				delete this.experience.movementObjectFunctions.upadteLineTrajectoryLine2;
				this.destroyLineTrajectory('thumbL001');
				this.destroyLineTrajectory('thumbR001');
			} else {
				this.drawLineTrajectory('thumbL001', this.colorLine1);
				this.experience.movementObjectFunctions.upadteLineTrajectoryLine1 = this.updateLineTrajectory.bind(this, 'thumbL001');
				this.drawLineTrajectory('thumbR001', this.colorLine2);
				this.experience.movementObjectFunctions.upadteLineTrajectoryLine2 = this.updateLineTrajectory.bind(this, 'thumbR001');
			}
		});

		const penDrawingColor = document.getElementById('pen-control-dropdown');
		penDrawingColor.addEventListener('click', () => {
			penDrawingColor.classList.toggle('activated');
			const penDrawingColorDropdown = document.getElementById('pen-control-dropdown-menu');
			penDrawingColorDropdown.classList.toggle('active-pen-color-dropdown');
		});

		const cameraButton = document.getElementById('button-camera');
		cameraButton.addEventListener('click', () => {
			if (!this.naoConnected) return;
			cameraButton.classList.toggle('active-camera');
			this.activeStreaming = !this.activeStreaming;
			if (this.activeStreaming) {
				// from naoCom command
				startNaotStreaming();
			} else {
				// from naoCom command
				stopNaoStreaming();
			}
		});

		const restButton = document.getElementById('button-rest');
		restButton.addEventListener('click', () => {
			if (!this.naoConnected) return;
			// from naoCom command
			if (this.isWakeUp) sendRestCommand();
		});

		const degreButton = document.getElementById('degre-radio-button');
		const radianButton = document.getElementById('radian-radio-button');

		degreButton.addEventListener('change', () => {
			this.isDeg = true;
			this.mapJointValues.swicthDeg(this.isDeg);
			this.mapJointValues.setAllRotationsValues();
		});

		radianButton.addEventListener('change', () => {
			this.isDeg = false;
			this.mapJointValues.swicthDeg(this.isDeg);
			this.mapJointValues.setAllRotationsValues();
		});

		const realTimeButton = document.getElementById('realtime-radio-button');
		const simulationButton = document.getElementById('non-realtime-radio-button');

		realTimeButton.addEventListener('change', () => {
			this.realtimeMovement = true;
			const targetCursors = document.querySelectorAll(".target-marker-cursor");
			targetCursors.forEach(targetCursor => {
				targetCursor.classList.add('active');
			});
			this.mapJointValues.realTimeMovement = true;
			this.mapJointValues.setAllRotationsValues();
		});

		simulationButton.addEventListener('change', () => {
			this.realtimeMovement = false;
			const targetCursors = document.querySelectorAll(".target-marker-cursor");
			targetCursors.forEach(targetCursor => {
				targetCursor.classList.remove('active');
			});
			this.mapJointValues.realTimeMovement = false;
			this.mapJointValues.setAllRotationsValues();
		});

		const sceneButton = document.getElementById('button-scene');
		sceneButton.addEventListener('click', () => {
			const sceneDropdown = document.getElementById('button-scene-container');
			sceneDropdown.classList.toggle('active-scene-dropdown');
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
			const excludedElements = ['backgroundSkyDome', 'backgroundFloor', 'Circle'];
			this.experience.scene.traverse((child) => {
				if (child.name && child instanceof THREE.Mesh && excludedElements.includes(child.name)) {
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

		// to keep juste in case (adjust the glow value of the bloom effect)
		// const sliderLightIntensity = document.getElementById('directional-light-intensity');
		// sliderLightIntensity.addEventListener('input', () => {
		// 	const light = this.experience.scene.getObjectByName('directionalLight');
		// 	light.intensity = sliderLightIntensity.value;

		// });

		// const bloomStrengh = document.getElementById('bloom-strengh');
		// bloomStrengh.addEventListener('input', () => {
		// 	this.experience.renderer.bloomPass.strength = Number(bloomStrengh.value);
		// });

		// const bloomRadius = document.getElementById('bloom-radius');
		// bloomRadius.addEventListener('input', () => {
		// 	this.experience.renderer.bloomPass.radius = Number(bloomRadius.value);
		// });
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
					// child.layers.enable(0);  // Visibles dans la couche 0
					// child.layers.enable(1);  // Visibles dans la couche 1 pour le bloom
					const elementsRegex = this.options.modelHierarchy.elementsRegex;
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
					for (let i = 0; i < elementsRegex.length; i++) {
						const regex = new RegExp(elementsRegex[i], 'g');
						if (child.name.match(regex)) {
							if (this.options.modelHierarchy.groupes.led_group.includes(child.name)) {
								this.ledGroup[child.name] = child;
							} else if (this.options.modelHierarchy.groupes.sensors_group.includes(child.name)) {
								// this.sensors[child.name] = child;
								child.visible = false;
							}
							this.experience.hierarchie[child.name] = child;
						}
					}

					if (child.name.match(/PerspectiveCamera/g)) {
						this.experience.perspecticeCamera = child;
					}
				});
				this.loadedHierarchie = true;
				// this.isReady = true;
				this.experience.sceneReady = true;
				console.log('hierarchie loaded');
				this._init();
				this.initLedIntensity();
				this.initSensors();
				// new IKSolver(this.experience);
				// new Gui(this.experience);
				this.resetJointsQuaternions();
				this.physics = new Physics(this.experience);
				this.mapJointValues = new MapJointValues(this.experience, this.getInitialRotations(), this.naoPose, this.physics);
				this.raycastModel = new RaycastModel(this.experience, this.mapJointValues);
				this.textGenerator = new TextGenerator(this.experience);
				this.background = new Background(this.experience);
				this.angleConversion = new AngleConversion(this.experience, poses['rest'], this.getInitialPositions(), this.mapJointValues);
				this.sceneSetup = new SceneSetup(this.experience);
			} else {
				if (this.options.params.debug) console.log('model not loaded');
				this._loadHierarchie();
			}
		}, 100);
	}

	/**
	 * Start the XR session and init the XR controller. Add the main XR function to the render loop
	 * @return {void} // start the XR session
	 * */
	startXr() {
		// hide environment mesh when XR session
		const excludedElements = ['backgroundSkyDome', 'backgroundFloor', 'Circle'];
		this.experience.scene.traverse((child) => {
			if (child.name && child instanceof THREE.Mesh && excludedElements.includes(child.name)) {
				child.visible = false;
			}
		});

		const model = this.experience.scene.getObjectByName('modelCustom');
		model.visible = false;

		// hide the physics elements (balls, boxes, etc..)
		this.physics.removeElements();
		this.changeScene('default');
		let controller;

		let reticle;

		let hitTestSource = null;
		let hitTestSourceRequested = false;

		this.reset();
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
	 * Lock the model view to the camera
	 * @return {void} // lock the view to the model
	 * */
	lockViewToModel() {
		const camera = this.experience.camera.modes.debug.instance;
		const model = this.experience.hierarchie['root_bone'];
		model.updateWorldMatrix(true, true);

		const targetPosition = new THREE.Vector3();
		model.getWorldPosition(targetPosition);

		gsap.to(this.experience.camera.modes.debug.orbitControls.target, {
			duration: 0.7,
			x: targetPosition.x,
			y: targetPosition.y,
			z: targetPosition.z,
			onUpdate: () => {
				this.experience.camera.modes.debug.orbitControls.update();
			},
			onComplete: () => {
				if (this.isLockedView) {
					this.experience.movementObjectFunctions.lockViewToModel = updateTarget.bind(this);
				} else {
					delete this.experience.movementObjectFunctions.lockViewToModel;
				}
			},
		});

		const updateTarget = () => {
			const worldPosition = new THREE.Vector3();
			model.getWorldPosition(worldPosition);

			this.experience.camera.modes.debug.orbitControls.target.copy(worldPosition);
			this.experience.camera.modes.debug.orbitControls.update();
		};
	}

	/**
	 * Change the color of the pen for the line trajectory
	 * @param {string} side // left or right
	 * @param {string} color // hex color
	 * @return {void} // change the color of the pen
	 * */
	changePenColor(side, color) {
		if (side === 'left') {
			this.colorLine1 = new THREE.Color(color);
		} else if (side === 'right') {
			this.colorLine2 = new THREE.Color(color);
		}
		if (this.requestLineTrajectory) {
			const leftLine = this.experience.scene.getObjectByName('thumbL001line');
			const rightLine = this.experience.scene.getObjectByName('thumbR001line');
			if (leftLine) {
				leftLine.material.color = this.colorLine1;
			}
			if (rightLine) {
				rightLine.material.color = this.colorLine2;
			}
		}
	}

	/**
	 * Changs the scene environment
	 * @param {string} scene // scene name
	 * @return {void} // change the scene
	 * */
	changeScene(scene) {
		if (scene === this.sceneSetup.userScene) return;
		this.sceneSetup.changeScene(scene);
	}

	/**
	 * Change the color of NAO (armature, body && protections). Function in sceneSetup.js
	 * @param {string} element // element name
	 * @param {string} color // hex color
	 * @return {void} // change the color of NAO
	 * */
	changeNaoColor(element, color) {
		this.sceneSetup.changeNaoColor(element, color);
	}

	/**
	 * Reset the quaternions of the joints
	 * @return {void} // reset the quaternions of the joints
	 * */
	resetJointsQuaternions = () => {
		const hierarchie = this.experience.hierarchie;
		const bones = Object.keys(hierarchie);
		for (let i = 0; i < bones.length; i++) {
			const bone = hierarchie[bones[i]];
			if (bone.isBone) {
				const quaternion = bone.quaternion;
				if (quaternion) {
					if (Math.abs(quaternion.x) < 0.05) {
						quaternion.x = 0;
					}
					if (Math.abs(quaternion.y) < 0.05) {
						quaternion.y = 0;
					}
					if (Math.abs(quaternion.z) < 0.05) {
						quaternion.z = 0;
					}
					if (Math.abs(quaternion.w) < 0.05) {
						quaternion.w = 0;
					}
				}
			}
		}
	};

	/**
	 * Init the first animation of the robot during loading
	 * @private
	 */
	_initAnimation() {
		setTimeout(async () => {
			if (!this.loadedHierarchie) {
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
					overlay.remove();
				},
			});

			const camera = this.experience.camera.modes.debug.instance;
			const self = this;
			gsap.to(camera.position, {
				duration: 3.5,
				x: -0.5,
				y: 0.85,
				z: 0.5,
				onComplete: () => {
					self.isReady = true;
				},
				ease: 'power4.inOut',
			});
		}, 100);
	}

	/**
	 * Resolved all the promises in the array (mainly for skulpt simulation)
	 * @return {void} // resolve all the promises
	 * */
	async resolvePromise() {
		return new Promise((resolve) => {
			for (let i = 0; i < this.promiseToResolve.length; i++) {
				this.promiseToResolve[i]();
			}
			this.promiseToResolve = [];
			resolve();
		});
	}

	/**
	 * Main function to restart the 3D simulation (everything need to be reset, ie: animations, intervals, leds, bones rotations & quaternions etc..)
	 * @return {void} // reset the simulation
	 * */
	async reset() {
		this.resetFlag = true;
		await this.resolvePromise();

		this.initLedIntensity();
		clearInterval(this.intervalCheckAnimation);

		// this.mapJointValues.completedAnimations = 0;
		this.animationBeforeStart = null;
		this.angleConversion.actualPosition = null;

		if (this.isReady) gsap.globalTimeline.clear();

		if (this.textGenerator.speech) {
			this.textGenerator.updateText('');
			window.speechSynthesis.cancel();
		}

		for (let i = 0; i < this.experience.mixers.length; i++) {
			this.experience.mixers[i].stopAllAction();
		}

		if (Object.keys(this.experience.movementObjectFunctions).length > 0) {
			Object.keys(this.experience.movementObjectFunctions).forEach((key) => {
				delete this.experience.movementObjectFunctions[key];
			});
		}

		this.pointsArrayLines = {};
		if (!this.requestLineTrajectory) {
			delete this.experience.movementObjectFunctions.upadteLineTrajectoryLine1;
			delete this.experience.movementObjectFunctions.upadteLineTrajectoryLine2;
			this.destroyLineTrajectory('thumbL001');
			this.destroyLineTrajectory('thumbR001');
		} else {
			this.drawLineTrajectory('thumbL001', this.colorLine1);
			this.experience.movementObjectFunctions.upadteLineTrajectoryLine1 = this.updateLineTrajectory.bind(this, 'thumbL001');
			this.drawLineTrajectory('thumbR001', this.colorLine2);
			this.experience.movementObjectFunctions.upadteLineTrajectoryLine2 = this.updateLineTrajectory.bind(this, 'thumbR001');
		}

		for (let i = 0; i < Object.keys(this.ledGroup).length; i++) {
			this.setLedsColor(0, 0, 0, Object.keys(this.ledGroup)[i]);
		}

		const restPose = poses['rest'];

		const rootBones = initialRootBone;
		Object.keys(rootBones).forEach((jointName) => {
			const joint = this.experience.hierarchie[jointName];
			const position = rootBones[jointName];

			if (joint) {
				joint.position.x = position.x;
				joint.position.y = position.y;
				joint.position.z = position.z;
			}
		});
		Object.keys(restPose).forEach((jointName) => {
			const joint = this.experience.hierarchie[jointName];
			const rotation = restPose[jointName];

			if (joint) {
				joint.rotation.x = rotation.x;
				joint.rotation.y = rotation.y;
				joint.rotation.z = rotation.z;
			}
		});

		this.naoPose = 'stand';
		this.openHands = {
			left: false,
			leftHandValue: 0,
			right: false,
			rightHandValue: 0,
		};

		this.rotateSonar();

		clearInterval(this.intervalLedEyesRasta);
		clearInterval(this.intervalOtherLedsRasta);
		clearInterval(this.intervalLedRotation);

		this.resetFlag = false;
		this.physics.init();
		if (this.usePostprocess) {
			this.experience.renderer.usePostprocess = true;
		}
	}

	initSensors() {
		const sonarLeft = this.experience.hierarchie['sonar_sensor_left'];
		const sonarRight = this.experience.hierarchie['sonar_sensor_right'];
		sonarLeft.castShadow = false;
		sonarRight.castShadow = false;
		sonarLeft.rotation.y = 17 * Math.PI / 180;
		sonarRight.rotation.y = -17 * Math.PI / 180;

		for (let i = 0; i < this.sensorsGroupLeds.length; i++) {
			const sensor = this.experience.hierarchie[this.sensorsGroupLeds[i]];
			if (sensor) {
				sensor.castShadow = false;
				// this.fadeLedsColor([this.sensorsGroupLeds[i]], { r: 0, g: 0, b: 0 }, 0.1);
			}
		}
	}

	rotateSonar(){
		const updateRotation = (sensor) => {
			const sonar = this.experience.hierarchie[sensor];
			const rotation = sonar.rotation;
			rotation.z += 0.2;
		};
		
		this.experience.movementObjectFunctions.sonarLeft = updateRotation.bind(this, 'sonar_sensor_left');
		this.experience.movementObjectFunctions.sonarRight = updateRotation.bind(this, 'sonar_sensor_right');
	}

	updateSonar(data) {
		const calculateColor = (distance) => {
			if (distance > 0.5) {
				return { r: 0, g: 0, b: 0 };
			} else if (distance <= 0) {
				return { r: 255, g: 0, b: 0 };
			} else {

				const ratio = distance / 0.5;
				return {
					r: Math.round(255 * (1 - ratio)), 
					g: Math.round(255 * ratio),
					b: 0
				};
			}
		};
		if (data.sonarLeft) {
			const leftColor = calculateColor(data.sonarLeft);
			this.fadeLedsColor(['sonar_sensor_left'], leftColor, 1, true);
		}

		if (data.sonarRight) {
			const rightColor = calculateColor(data.sonarRight);
			this.fadeLedsColor(['sonar_sensor_right'], rightColor, 1, true);
		}
	}

	/**
	 * Get initial rotations of the joints. Mandatory to get the right rotations of the joints, compared to the real robot and joints limits
	 * @return {object} // initial rotations of the joints
	 * */
	getInitialRotations() {
		const initialRotations = {};

		this.options.modelHierarchy.elementsRegex.forEach((elementName) => {
			const joint = this.experience.hierarchie[elementName];
			if (joint) {
				const rotationX = joint.rotation.x;
				const rotationY = joint.rotation.y;
				const rotationZ = joint.rotation.z;
				initialRotations[elementName] = {
					x: rotationX,
					y: rotationY,
					z: rotationZ,
				};
			} else {
				console.warn(`Joint "${elementName}" not found in the hierarchy.`);
			}
		});

		return initialRotations;
	}

	/**
	 * Get initial positions of the joints.
	 * @return {object} // initial positions of the joints
	 * */
	getInitialPositions() {
		const initialPositions = {};

		this.options.modelHierarchy.elementsRegex.forEach((elementName) => {
			const joint = this.experience.hierarchie[elementName];
			if (joint) {
				const position = joint.position;
				initialPositions[elementName] = {
					x: position.x,
					y: position.y,
					z: position.z,
				};
			} else {
				console.warn(`Joint "${elementName}" not found in the hierarchy.`);
			}
		});

		return initialPositions;
	}

	/**
	 * Get initial quaternions of the joints.
	 * @return {object} // initial quaternions of the joints
	 * */
	getInitialQuaternions() {
		const initialQuaternions = {};

		this.options.modelHierarchy.elementsRegex.forEach((elementName) => {
			const joint = this.experience.hierarchie[elementName];
			if (joint) {
				const quaternion = joint.quaternion;
				initialQuaternions[elementName] = {
					x: quaternion.x,
					y: quaternion.y,
					z: quaternion.z,
					w: quaternion.w,
				};
			} else {
				console.warn(`Joint "${elementName}" not found in the hierarchy.`);
			}
		});

		return initialQuaternions;
	}

	/**
	 * Convert RGB to HEX
	 * @param {number} r // red
	 * @param {number} g // green
	 * @param {number} b // blue
	 * @return {string} // hex color
	 * */
	convertRGBToHex(r, g, b) {
		return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
	}

	/**
	 * Convert HEX to RGB
	 * @param {string} hex // hex color
	 * @return {object} // RGB color
	 * */
	convertHexToRGB(hex) {
		const bigint = parseInt(hex, 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;
		return { r: r / 255, g: g / 255, b: b / 255 };
	}

	/**
	 * Check if the led is RGB or not. eyes, torso, foots are RGB leds.
	 * @param {string} led // led name
	 * @return {boolean} // true if the led is RGB
	 * */
	isLedRGB(led) {
		return this.options.modelHierarchy.groupes.rgbLed_group.includes(led);
	}

	/**
	 * Init the intensity of the leds
	 * @return {void} // init the intensity of the leds
	 * */
	initLedIntensity() {
		const ledGroup = Object.keys(this.ledGroup);
		for (let i = 0; i < ledGroup.length; i++) {
			this.ledsIntensity[ledGroup[i]] = 0.8;
		}
	}

	/**
	 * Set the intensity of the leds
	 * @param {number} intensity // intensity of the led
	 * @param {string} led // led name
	 * @return {void} // set the intensity of the led
	 * */
	setLedIntensity(intensity, led) {
		this.ledsIntensity[led] = intensity;
	}

	/**
	 * Set the color of the leds
	 * @param {number} r // red
	 * @param {number} g // green
	 * @param {number} b // blue
	 * @param {string} leds // led name
	 * @return {void} // set the color of the led
	 * */
	setLedsColor(r, g, b, leds = 'AllLeds') {
		const ledGroup = this.ledGroup;
		const color = new THREE.Color(r, g, b); // Convertit RGB en fraction de 1
		let intensity = Math.max(Math.max(r, g, b), (r + g + b) / 3); // Intensité basée sur la couleur la plus lumineuse
		let material = ledGroup[leds].material;

		if (!(material instanceof THREE.ShaderMaterial)) {
			material = ledShaderMaterial.clone();
			ledGroup[leds].material = material;
		}

		material.uniforms.color.value = color;
		material.uniforms.intensity.value = Math.min(intensity, this.ledsIntensity[leds] || 0.8);
	}

	/**
	 * Set the color of the leds
	 * @param {number} r // red
	 * @param {number} g // green
	 * @param {number} b // blue
	 * @param {array} leds // led name in an array ["allLeds"] | ["led_brain", "led_eyes", "led_foot_left", "led_foot_right", "led_torso"]
	 * @return {void} // set the color of the led
	 * */
	fadeLedsIntensity(leds, intensity, duration = 1) {
		const uuid = Math.random().toString(36).substring(7);
		const ledGroup = this.ledGroup;
		const startTime = performance.now();

		if (leds[0] === 'AllLeds') {
			leds = Object.keys(ledGroup);
		}

		leds.forEach((led) => {
			if (this.sensorsGroupLeds.includes(led) && !sensors) return;
			let material = ledGroup[led].material;
			if (!(material instanceof THREE.ShaderMaterial)) {
				material = ledShaderMaterial.clone();
				ledGroup[led].material = material;
			}
			const currentIntensity = material.uniforms.intensity.value;

			material.fadeIntensityData = {
				startIntensity: currentIntensity,
				targetIntensity: intensity,
				increment: (intensity - currentIntensity) / (duration * 60), // 60 FPS
			};
		});

		const fade = () => {
			const currentTime = performance.now();
			const elapsedTime = (currentTime - startTime) / 1000;
			const progress = Math.min(elapsedTime / duration, 1);

			leds.forEach((led) => {
				const material = ledGroup[led].material;
				const fadeData = material.fadeIntensityData;
				if (typeof fadeData === 'undefined') return;
				const intensity = fadeData.startIntensity + fadeData.increment * (progress * 60 * duration);
				this.ledsIntensity[led] = intensity;
				const currentColor = material.uniforms.color.value;

				if (this.isLedRGB(led)) {
					this.setLedsColor(currentColor.r, currentColor.g, currentColor.b, led);
				} else {
					this.setLedsColor(0, 0, currentColor.b, led);
				}
			});

			if (progress < 1) {
				this.experience.movementObjectFunctions['fadeLedsIntensity' + uuid] = fade.bind(this);
			} else {
				leds.forEach((led) => delete ledGroup[led].material.fadeData);
				delete this.experience.movementObjectFunctions['fadeLedsIntensity' + uuid];
			}
		};

		this.experience.movementObjectFunctions['fadeLedsIntensity' + uuid] = fade.bind(this);
	}

	/**
	 * Fade the color of the leds
	 * @param {array} leds // led name in an array ["allLeds"] | ["led_brain", "led_eyes", "led_foot_left", "led_foot_right", "led_torso"]
	 * @param {object} targetColor // target color {r: 100, g: 100, b: 100}
	 * @param {number} duration // duration of the fade
	 * @return {void} // fade the color of the led
	 * */
	fadeLedsColor(leds, targetColor, duration = 1, sensors = false) {
		return new Promise((resolve, reject) => {
			const uuid = Math.random().toString(36).substring(7);
			const ledGroup = this.ledGroup;
			const startTime = performance.now();

			if (leds[0] === 'AllLeds') {
				leds = Object.keys(ledGroup);
			}

			const targetColorNormalized = {
				r: targetColor.r / 100,
				g: targetColor.g / 100,
				b: targetColor.b / 100,
			};

			leds.forEach((led) => {
				if (this.sensorsGroupLeds.includes(led) && !sensors) return;
				let material = ledGroup[led].material;
				if (!(material instanceof THREE.ShaderMaterial)) {
					material = ledShaderMaterial.clone();
					ledGroup[led].material = material;
				}
				const currentColor = material.uniforms.color.value;
				const currentColorNormalized = {
					r: currentColor.r,
					g: currentColor.g,
					b: currentColor.b,
				};

				material.fadeData = {
					startColor: new THREE.Color(currentColorNormalized.r, currentColorNormalized.g, currentColorNormalized.b),
					targetColor: new THREE.Color(targetColorNormalized.r, targetColorNormalized.g, targetColorNormalized.b),
					increment: {
						r: (targetColorNormalized.r - currentColorNormalized.r) / (duration * 60), // 60 FPS
						g: (targetColorNormalized.g - currentColorNormalized.g) / (duration * 60),
						b: (targetColorNormalized.b - currentColorNormalized.b) / (duration * 60),
					},
				};
			});

			const fade = () => {
				const currentTime = performance.now();
				const elapsedTime = (currentTime - startTime) / 1000;
				const progress = Math.min(elapsedTime / duration, 1);

				leds.forEach((led) => {
					const material = ledGroup[led].material;
					const fadeData = material.fadeData;
					if (typeof fadeData === 'undefined') return;
					const r = fadeData.startColor.r + fadeData.increment.r * (progress * 60 * duration);
					const g = fadeData.startColor.g + fadeData.increment.g * (progress * 60 * duration);
					const b = fadeData.startColor.b + fadeData.increment.b * (progress * 60 * duration);

					if (this.isLedRGB(led)) {
						this.setLedsColor(r, g, b, led);
					} else {
						this.setLedsColor(0, 0, b, led);
					}
				});

				if (progress < 1) {
					this.experience.movementObjectFunctions['fadeLedsColor' + uuid] = fade.bind(this);
				} else {
					leds.forEach((led) => delete ledGroup[led].material.fadeData);
					delete this.experience.movementObjectFunctions['fadeLedsColor' + uuid];
					resolve();
				}
			};

			this.experience.movementObjectFunctions['fadeLedsColor' + uuid] = fade.bind(this);
		});
	}

	/**
	 * Rasta animation of the leds => Predefined animation
	 * @param {number} duration // duration of the animation
	 * @return {void} // rasta animation of the led
	 * */
	rastaAnimation(duration = 1) {
		return new Promise((resolve, reject) => {
			const colorOrder = [
				{ r: 1, g: 0, b: 0 }, // Red
				{ r: 1, g: 1, b: 0 }, // Yellow
				{ r: 0, g: 1, b: 0 }, // Green
			];

			const leftEyeLed = ['led_left_eye_L0', 'led_left_eye_L1', 'led_left_eye_L2', 'led_left_eye_L3', 'led_left_eye_L4', 'led_left_eye_L5', 'led_left_eye_L6', 'led_left_eye_L7'];
			const rightEyeLed = ['led_right_eye_R0', 'led_right_eye_R1', 'led_right_eye_R2', 'led_right_eye_R3', 'led_right_eye_R4', 'led_right_eye_R5', 'led_right_eye_R6', 'led_right_eye_R7'];
			const chestLed = ['nao_logo_chest'];
			const fooLeftLed = ['nao_logo_foot_left'];
			const fooRightLed = ['nao_logo_foot_right'];
			const allLeds = [...leftEyeLed, ...rightEyeLed, ...chestLed, ...fooLeftLed, ...fooRightLed];

			this.indexEyesAnim = 0;
			this.intervalLedEyesRasta = setInterval(() => {
				const orderElement = [
					[this.indexEyesAnim % 8, (this.indexEyesAnim + 1) % 8],
					[(this.indexEyesAnim + 2) % 8, (this.indexEyesAnim + 3) % 8, (this.indexEyesAnim + 4) % 8],
					[(this.indexEyesAnim + 5) % 8, (this.indexEyesAnim + 6) % 8, (this.indexEyesAnim + 7) % 8],
				];

				for (let i = 0; i < orderElement.length; i++) {
					const color = colorOrder[i];
					const leds = orderElement[i];
					leds.forEach((ledIndex) => {
						this.setLedsColor(color.r, color.g, color.b, leftEyeLed[ledIndex]);
						this.setLedsColor(color.r, color.g, color.b, rightEyeLed[ledIndex]);
					});
				}
				this.indexEyesAnim++;
			}, 500);

			this.indexOtherLedsAnim = 0;
			this.intervalOtherLedsRasta = setInterval(() => {
				const color = colorOrder[this.indexOtherLedsAnim % 3];
				chestLed.forEach((led) => this.setLedsColor(color.r, color.g, color.b, led));
				fooLeftLed.forEach((led) => this.setLedsColor(color.r, color.g, color.b, led));
				fooRightLed.forEach((led) => this.setLedsColor(color.r, color.g, color.b, led));
				this.indexOtherLedsAnim++;
			}, 1000);

			setTimeout(() => {
				clearInterval(this.intervalLedEyesRasta);
				clearInterval(this.intervalOtherLedsRasta);
				for (let i = 0; i < allLeds.length; i++) {
					this.setLedsColor(0, 0, 0, allLeds[i]);
				}
				resolve();
			}, duration * 1000);
		});
	}

	/**
	 * Rotation of the eyes leds
	 * @param {string} color // hex color
	 * @param {number} rotationDuration // duration of the rotation
	 * @param {number} duration // duration of the animation
	 * @return {void} // rotation of the eyes leds
	 * */
	eyeRotation(color, rotationDuration, duration) {
		return new Promise((resolve, reject) => {
			const leftEyeLed = ['led_left_eye_L0', 'led_left_eye_L1', 'led_left_eye_L2', 'led_left_eye_L3', 'led_left_eye_L4', 'led_left_eye_L5', 'led_left_eye_L6', 'led_left_eye_L7'];
			const rightEyeLed = ['led_right_eye_R0', 'led_right_eye_R1', 'led_right_eye_R2', 'led_right_eye_R3', 'led_right_eye_R4', 'led_right_eye_R5', 'led_right_eye_R6', 'led_right_eye_R7'];

			const colorRGB = this.convertHexToRGB(color.replace('#', ''));

			let index = 0;

			this.intervalLedRotation = setInterval(() => {
				if (index === 8) {
					index = 0;
				}
				leftEyeLed.forEach((led) => {
					this.setLedsColor(0, 0, 0, led);
				});
				rightEyeLed.forEach((led) => {
					this.setLedsColor(0, 0, 0, led);
				});
				const color = colorRGB;
				const leds = [leftEyeLed[index], rightEyeLed[index]];
				leds.forEach((led) => {
					this.setLedsColor(color.r, color.g, color.b, led);
				});
				index++;
			}, (rotationDuration * 1000) / 8);

			setTimeout(() => {
				clearInterval(this.intervalLedRotation);
				const allLeds = [...leftEyeLed, ...rightEyeLed];
				for (let i = 0; i < allLeds.length; i++) {
					this.setLedsColor(0, 0, 0, allLeds[i]);
				}
				resolve();
			}, duration * 1000);
		});
	}

	/**
	 * Save the current pose of the model. Mandatory to restore the pose after an animation. Otherwise, the model will keep the first pose of the animation when it's finished
	 * @return {void} // save the current pose
	 * */
	saveCurrentPose() {
		const model = this.experience.scene.getObjectByName('modelCustom');
		this.previousModelPose = {};

		model.traverse((bone) => {
			if (bone.isBone) {
				this.previousModelPose[bone.name] = {
					position: bone.position.clone(),
					quaternion: bone.quaternion.clone(),
				};
			}
		});
	}

	/**
	 * Restore the previous pose of the model
	 * @return {void} // restore the previous pose
	 * */
	restorePreviousPose() {
		const model = this.experience.scene.getObjectByName('modelCustom');

		model.traverse((bone) => {
			if (bone.isBone && this.previousModelPose[bone.name]) {
				const savedPose = this.previousModelPose[bone.name];
				bone.position.copy(savedPose.position);
				bone.quaternion.copy(savedPose.quaternion);
			}
		});
	}

	/**
	 * Open or close the hands of the model, based on one animation, => played in reverse if the hands are already open
	 * @param {string} side // left or right
	 * @param {string} event // open or close
	 * @param {number} speed // speed of the animation
	 * @return {void} // open or close the hands
	 * */
	openHand(side = 'left', event = 'open', speed = 1) {
		return new Promise((resolve, reject) => {
			if (this.resetFlag) return resolve();
			if ((event === 'open' && this.openHands[side]) || (event === 'close' && !this.openHands[side])) {
				return resolve();
			}

			let name = side === 'left' ? 'open_left_hand' : 'open_right_hand';
			let reverse = event === 'open' ? 1 : -1;

			let speedAnimation = Math.min(Math.max(speed, 0), 1);

			if (this.experience.actions && this.experience.actions[name]) {
				const action = this.experience.actions[name];
				action.reset();

				action.time = reverse === -1 ? action.getClip().duration : 0;

				action.setLoop(THREE.LoopOnce);
				action.clampWhenFinished = true;

				action.timeScale = reverse * speedAnimation;

				action.fadeIn(0.1);
				action.play();

				this.openHands[side] = event === 'open';

				this.waitForActionToFinish(action, null, true, [action], null, false).then(() => {
					resolve();
				});
			} else {
				console.warn(`Animation "${name}" non trouvée`);
				reject(new Error(`Animation "${name}" non trouvée`));
			}
		});
	}

	/**
	 * Prepare the pose of the model, based on the animation name. Play gsap animation to go to the first keyframe of the animation
	 * @param {string} name // animation name
	 * @param {number} duration // duration of the animation
	 * @param {boolean} needNegative // need to apply a negative value to the quaternion. Unused for now
	 * @return {void} // prepare the pose
	 * */
	async preparePose(name, duration = 1.2, needNegative = false) {
		return new Promise(async (resolve, reject) => {
			const postureQuatToApply = [];
			const postureToApply = [];
			const initialKeyFramePose = this.experience.actions[name].getClip().tracks;
			for (let i = 0; i < initialKeyFramePose.length; i++) {
				const track = initialKeyFramePose[i].name.split('.');
				if (track[1] === 'quaternion') {
					postureQuatToApply.push({
						name: track[0],
						values: initialKeyFramePose[i].values.slice(0, 4),
					});
				} else if (track[1] === 'position') {
					postureToApply.push({
						name: track[0],
						values: initialKeyFramePose[i].values,
					});
				}
			}

			if (this.resetFlag) return reject('Reset flag is active');
			const initialRootBonePosition = this.angleConversion.calculateVerticalPosition();
			for (let i = 0; i < postureQuatToApply.length; i++) {
				const joint = this.experience.hierarchie[postureQuatToApply[i].name];
				let negative = 1;
				const targetQuat = new THREE.Quaternion(postureQuatToApply[i].values[0], postureQuatToApply[i].values[1] * negative, postureQuatToApply[i].values[2] * negative, postureQuatToApply[i].values[3]);

				joint.quaternion.normalize();

				if (joint.quaternion.dot(targetQuat) < 0) {
					targetQuat.x *= -1;
					targetQuat.y *= -1;
					targetQuat.z *= -1;
					targetQuat.w *= -1;
				}

				const quaternionTween = gsap.to(joint.quaternion, {
					duration: duration,
					x: targetQuat.x,
					y: targetQuat.y,
					z: targetQuat.z,
					w: targetQuat.w,
					onUpdate: () => {
						joint.quaternion.normalize();
						const rootBone = this.experience.hierarchie['root_bone'];
						const difference = this.angleConversion.calculateVerticalPosition();
						rootBone.position.y += (initialRootBonePosition - difference) * 18;
					},
					onComplete: () => {
						if (!this.resetFlag) resolve();
					},
				});
			}

			for (let i = 0; i < postureToApply.length; i++) {
				const joint = this.experience.hierarchie[postureToApply[i].name];
				const positionTween = gsap.to(joint.position, {
					duration: duration,
					x: postureToApply[i].values[0],
					y: postureToApply[i].values[1],
					z: postureToApply[i].values[2],
				});
			}
		});
	}

	/**
	 * Change the posture of the model, based on the animation name, sit and stand. In the simulation Sit meads crouch for the real robot
	 * @param {string} name // animation name
	 * @param {number} speed // speed of the animation
	 * @param {boolean} reverse // reverse the animation
	 * @return {void} // change the posture
	 * */
	async posture(name, speed = 1, reverse = false) {
		return new Promise(async (resolve, reject) => {
			if (speed < 0) speed = 1;
			this.promiseToResolve.push(resolve);
			if (this.naoPose === name) {
				console.warn(`Le modèle est déjà en position ${name}`);
				return resolve();
			}

			let actionName;
			if (name === 'sit') {
				actionName = 'stand_sit';
			} else if (name === 'stand') {
				actionName = 'stand_sit';
				reverse = this.naoPose === 'sit';
			} else {
				actionName = name;
			}

			if (!this.experience.actions || !this.experience.actions[actionName]) {
				console.warn(`Animation "${actionName}" non trouvée`);
				return resolve();
			}

			const action = this.experience.actions[actionName];
			const reverseTrack = reverse ? -1 : 1;

			if (!reverse) {
				await this.preparePose(actionName, 1.2);
			}

			action.reset();
			action.timeScale = speed * reverseTrack;
			action.setLoop(THREE.LoopOnce);
			action.clampWhenFinished = true;

			action.time = reverse ? action.getClip().duration : 0;

			action.play();
			this.naoPose = name;
			await this.waitForActionToFinish(action, null, true, [action]);
			return resolve();
		});
	}

	/**
	 * Reset all the other actions, except the one with the name
	 * @param {string} name // animation name
	 * @return {void} // reset all the other actions
	 * */
	resetOtherActions(name) {
		const mixer = this.experience.mixers[0];
		mixer._actions.forEach((action) => {
			if (action.getClip().name !== name) {
				action.stop();
			}
		});
	}

	/**
	 * Unuse for now
	 **/
	setActualPosition() {
		const position = this.getInitialRotations();
		const boneHierarchy = this.experience.hierarchie;
		const bones = Object.keys(boneHierarchy);

		for (let i = 0; i < bones.length; i++) {
			const bone = boneHierarchy[bones[i]];
			if (bone.isBone) {
				const boneName = bone.name;
				const boneQuaternion = position[boneName];

				if (boneQuaternion) {
					bone.quaternion.copy(boneQuaternion);
					bone.quaternion.normalize();
				}
			}
		}
	}

	/**
	 * Wait for an action to finish, reset and resolve the promise
	 * @param {object} action // action to wait for
	 * @param {string} removeAction // action to remove from the movementObjectFunctions (ie: calculateDisplacement, etc...)
	 * @param {boolean} end // end the action
	 * @param {array} actions // actions to stop
	 * @param {number} needTimeout // need a timeout
	 * @param {boolean} needResetPose // need to reset the pose
	 * @return {Promise} // promise to resolve
	 * */
	waitForActionToFinish = (action, removeAction = null, end, actions, needTimeout = null, needResetPose = true) => {
		return new Promise((resolve) => {
			const mixer = action.getMixer();

			const onFinished = async (e) => {
				if (removeAction !== null) {
					delete this.experience.movementObjectFunctions[removeAction];
				}
				if (end) {
					this.saveCurrentPose();

					actions.forEach((action) => {
						action.stop();
					});

					this.restorePreviousPose();
					if (this.naoPose === 'stand' && needResetPose) {
						await this.preparePose('rest_pose', 1.2);
					}
				}
				if (e.action === action) {
					if (needTimeout !== null) {
						setTimeout(() => {
							resolve();
						}, 2000);
					} else {
						resolve();
					}
				}
				mixer.removeEventListener('finished', onFinished);
			};
			mixer.removeEventListener('finished', onFinished);
			mixer.addEventListener('finished', onFinished);
		});
	};

	/**
	 * Walk animation
	 * @param {string} name // animation name (forward, backward)
	 * @param {number} distance // distance to walk, in fraction of the distance of one loop of the walk animation
	 * @return {void} // walk animation
	 * */
	async walkStraightAnimation(name, distance) {
		this.resetOtherActions('walk_' + name);
		const rootBone = this.experience.hierarchie['root_bone'];
		const action = this.experience.actions['walk_' + name];

		await this.preparePose('walk_' + name, 1.2);

		const frameRate = action.getClip().tracks[0].times.length / action.getClip().duration;
		action.reset();

		const startFrame = 0;
		const loopStartFrame = 20;
		const loopEndFrame = 47;
		const endFrame = 57;

		const startClip = THREE.AnimationUtils.subclip(action.getClip(), 'walk_' + name + '_start', startFrame, loopStartFrame + 1, frameRate);
		const loopClip = THREE.AnimationUtils.subclip(action.getClip(), 'walk_' + name + '_loop', loopStartFrame, loopEndFrame, frameRate);
		const endClip = THREE.AnimationUtils.subclip(action.getClip(), 'walk_' + name + '_end', loopEndFrame, endFrame, frameRate);

		const loopsNeeded = distance;

		const mixer = this.experience.mixers[0];

		// does not work for now => to fix
		let startAction = mixer._actions.find((action) => action._clip.name === 'walk_' + name + '_start');
		let loopAction = mixer._actions.find((action) => action._clip.name === 'walk_' + name + '_loop');
		let endAction = mixer._actions.find((action) => action._clip.name === 'walk_' + name + '_end');

		if (!startAction) {
			startAction = mixer.clipAction(startClip);
		}
		if (!loopAction) {
			loopAction = mixer.clipAction(loopClip);
		}
		if (!endAction) {
			endAction = mixer.clipAction(endClip);
		}

		startAction.setLoop(THREE.LoopOnce);
		startAction.clampWhenFinished = true;
		startAction.setEffectiveWeight(1.0);
		startAction.fadeIn(0.8);
		startAction.play();

		await this.waitForActionToFinish(startAction, null, false);
		startAction.stop();

		loopAction.reset();
		loopAction.setLoop(THREE.LoopRepeat, loopsNeeded);
		loopAction.clampWhenFinished = true;

		loopAction.play();

		// compensate the fact that the root_bone is not perfectly aligned with the threejs Y axis (only for backward walk)
		this.previousLeftFootZ = name === 'backward' ? -0.6 : 0;
		this.previousRightFootZ = name === 'backward' ? -0.6 : 0;

		this.experience.movementObjectFunctions.calculateDisplacement = this.calculateDisplacement.bind(this, name);

		await this.waitForActionToFinish(loopAction);
		this.naoPose = 'stand';

		endAction.setLoop(THREE.LoopOnce);

		endAction.setEffectiveWeight(1.0);

		endAction.crossFadeFrom(loopAction, 0.2, false);
		endAction.clampWhenFinished = true;
		endAction.play();
		endAction.fadeOut(0.7);

		await this.waitForActionToFinish(endAction, 'calculateDisplacement', true, [startAction, loopAction, endAction]);
	}

	/**
	 * Calculate the displacement of the model, based on the walk animation (forward +z and backward -z)
	 * @param {string} name // animation name (forward, backward)
	 * @return {void} // calculate the displacement
	 * */
	calculateDisplacement = (name) => {
		const leftFoot = this.experience.hierarchie['CTRL_leg_IKL'];
		const rightFoot = this.experience.hierarchie['CTRL_leg_IKR'];

		const currentLeftFootZ = leftFoot.position.z;
		const currentRightFootZ = rightFoot.position.z;

		const leftFootDisplacement = currentLeftFootZ - this.previousLeftFootZ;
		const rightFootDisplacement = currentRightFootZ - this.previousRightFootZ;

		let displacement = 0;
		if (leftFootDisplacement < 0) {
			displacement += Math.abs(leftFootDisplacement);
		}
		if (rightFootDisplacement < 0) {
			displacement += Math.abs(rightFootDisplacement);
		}

		const rootBone = this.experience.hierarchie['root_bone'];
		const localDisplacement = new THREE.Vector3(0, name === 'backward' ? displacement * -1.05 : displacement * 1.05, 0); // Déplacement en Z local (avant-arrière)
		const worldDisplacement = localDisplacement.applyQuaternion(rootBone.quaternion);
		rootBone.position.add(worldDisplacement);

		this.previousLeftFootZ = currentLeftFootZ;
		this.previousRightFootZ = currentRightFootZ;
	};

	/**
	 * Turn animation
	 * @param {string} name // animation name (cw, ccw) => cw not implemented yet
	 * @param {number} distance // distance to turn, in fraction of the distance of one loop of the turn animation
	 * @return {void} // turn animation
	 * */
	async turnAnimation(name, distance, target) {
		// if (name === 'cw') return;
		this.resetOtherActions('turn_' + name);
		const rootBone = this.experience.hierarchie['root_bone'];
		const action = this.experience.actions['turn_' + name];

		await this.preparePose('turn_' + name, 1.2);

		const frameRate = action.getClip().tracks[0].times.length / action.getClip().duration;
		action.reset();

		const startFrame = 0;
		const loopStartFrame = 12;
		const loopEndFrame = 39;
		const endFrame = 49;

		const startClip = THREE.AnimationUtils.subclip(action.getClip(), 'turn_' + name + '_start', startFrame, loopStartFrame + 1, frameRate);
		const loopClip = THREE.AnimationUtils.subclip(action.getClip(), 'turn_' + name + '_loop', loopStartFrame, loopEndFrame, frameRate);
		const endClip = THREE.AnimationUtils.subclip(action.getClip(), 'turn_' + name + '_end', loopEndFrame, endFrame, frameRate);

		const stepPerLoop = (target * Math.PI) / 180 / (35 * distance);
		const loopsNeeded = distance;
		const mixer = this.experience.mixers[0];

		let startAction = mixer._actions.find((action) => action._clip.name === 'walk_' + name + '_start');
		let loopAction = mixer._actions.find((action) => action._clip.name === 'walk_' + name + '_loop');
		let endAction = mixer._actions.find((action) => action._clip.name === 'walk_' + name + '_end');

		if (!startAction) {
			startAction = mixer.clipAction(startClip);
		}
		if (!loopAction) {
			loopAction = mixer.clipAction(loopClip);
		}
		if (!endAction) {
			endAction = mixer.clipAction(endClip);
		}

		startAction.setLoop(THREE.LoopOnce);
		startAction.clampWhenFinished = true;
		startAction.setEffectiveWeight(1.0);
		startAction.fadeIn(0.8);
		startAction.play();

		await this.waitForActionToFinish(startAction, null, false);
		startAction.stop();

		loopAction.reset();
		loopAction.setLoop(THREE.LoopRepeat, loopsNeeded);
		loopAction.clampWhenFinished = true;
		loopAction.timeScale = 1;
		loopAction.play();

		// compensate the fact that the root_bone is not perfectly aligned with the threejs Y axis
		this.previousLeftFootZ = name === 'backward' ? -0.6 : 0;
		this.previousRightFootZ = name === 'backward' ? -0.6 : 0;
		this.initialAngleTest = 0;

		this.experience.movementObjectFunctions.calculateRotation = this.calculateRotation.bind(this, loopAction, frameRate, name, stepPerLoop);

		await this.waitForActionToFinish(loopAction);
		this.naoPose = 'stand';

		endAction.setLoop(THREE.LoopOnce);

		endAction.setEffectiveWeight(1.0);

		endAction.crossFadeFrom(loopAction, 0.2, false);
		endAction.clampWhenFinished = true;
		endAction.play();
		endAction.fadeOut(0.7);

		await this.waitForActionToFinish(endAction, 'calculateRotation', true, [startAction, loopAction, endAction]);
	}

	/**
	 * Calculate the rotation of the model, based on the turn animation (cw, ccw)
	 * @param {object} action // action to calculate the rotation
	 * @param {number} frameRate // frame rate of the action
	 * @return {void} // calculate the rotation
	 * */
	calculateRotation = (action, frameRate, direction, stepPerLoop) => {
		const rootBone = this.experience.hierarchie['root_bone'];
		const frameStart1 = 2 / frameRate;
		const frameEnd1 = 9 / frameRate;
		const frameStart2 = 16 / frameRate;
		const frameEnd2 = 23 / frameRate;

		const currentFrameRate = this.experience.getFrameRate() || 60;
		const frameRateRatio = currentFrameRate / 60;

		const adjustedStepPerLoop = stepPerLoop / frameRateRatio;

		// Flag to toggle between intervals
		if ((action.time >= frameStart1 && action.time <= frameEnd1) || (action.time >= frameStart2 && action.time <= frameEnd2)) {
			const rotation = -adjustedStepPerLoop;
			rootBone.rotation.z += rotation;
			this.initialAngleTest += rotation;
		}
	};

	/**
	 * animated speech
	 * @param {string} text // text to say
	 * @return {Promise} // animated speech
	 * */
	async animatedSpeech(text) {
		return new Promise(async (resolve, reject) => {
			if (this.naoConnected === false) {
				const actions = this.experience.actions;

				await this.preparePose('animated_speech1', 1.2);
				this.naoPose = 'stand';
				this.textGenerator.updateText(text);

				const playAnimatedAction = async (timeout, last) => {
					const number = Math.floor(Math.random() * 4) + 1;
					const action = actions[`animated_speech${number}`];
					action.fadeIn(0.5);
					action.setLoop(THREE.LoopOnce);
					action.clampWhenFinished = true;
					action.timeScale = 0.7;
					action.play();
					await this.waitForActionToFinish(action, null, true, [action], timeout, last ? true : false);
					return;
				};
				const max = Math.floor(text.toString().split(' ').length / 7 || 1);
				if (max === 0) {
					await playAnimatedAction(0, true);
					return resolve();
				}

				for (let i = 0; i < max; i++) {
					await playAnimatedAction(1.2, i === max - 1);
					if (this.experience.speechFlagInterruption) {
						this.experience.speechFlagInterruption = false;
						return resolve();
					}
				}
			} else {
				this.textGenerator.updateText(text, false);
				this.socket.emit('say_text', text, (response) => {
					if (response === 'action_done') {
						this.textGenerator.updateText('', false);
						return resolve(true);
					} else {
						return reject(false);
					}
				});
			}
		});
	}

	/**
	 * Main function to set the angles of the model (only the upper parte of the body for now)
	 * @param {string} part // part of the body
	 * @param {array} angles // angles to set
	 * @return {Promise} // set the angles of the model
	 * */
	async setAngles(part, angles) {
		return new Promise(async (resolve) => {
			if (this.resetFlag) return resolve();

			this.animationBeforeStart = this.mapJointValues.completedAnimations;
			const jointArray = ['neck', 'head', 'shoulderL', 'upperarmL', 'forearmL', 'forearmLyaw', 'handL', 'leftHand', 'shoulderR', 'upperarmR', 'forearmR', 'forearmRyaw', 'handR', 'rightHand'];
			const animationPromises = jointArray.map((joint, i) => {
				return new Promise((innerResolve) => {
					// const jointElement = document.getElementById(joint);
					// if (!jointElement) return innerResolve();
					if (this.resetFlag) return innerResolve();
					const value = angles[i];

					if (joint === 'leftHand' || joint === 'rightHand') {
						this.simpleMoveHand(joint, value)
							.then(() => {
								innerResolve();
							})
							.catch((error) => {
								console.error(`Error animating joint ${joint}:`, error);
								innerResolve();
							});
					} else {
						this.simpleMoves(joint, value)
							.then(() => {
								innerResolve();
							})
							.catch((error) => {
								console.error(`Error animating joint ${joint}:`, error);
								innerResolve();
							});
					}
				});
			});

			await Promise.all(animationPromises);
			this.mapJointValues.setAllRotationsValues();
			resolve();
		});
	}

	/**
	 * Set the angles of the joints of the model
	 * @param {string} part // part of the body
	 * @param {array} angles // angles to set
	 * @return {Promise} // set the angles of the joints of the model
	 * */
	simpleMoves = async (bone, value) => {
		if (upperBoneLimits[bone] && (value > upperBoneLimits[bone].max || value < upperBoneLimits[bone].min)) {
			UIManager.showErrorMessage('error-message', `the "${upperBoneLimits[bone].name}" can't be below ${upperBoneLimits[bone].min} (rad) or above ${upperBoneLimits[bone].max} (rad). The entered value is ${value}. The ${upperBoneLimits[bone].name} will be set to ${value > upperBoneLimits[bone].max ? upperBoneLimits[bone].max : upperBoneLimits[bone].min}`);
			if (value > upperBoneLimits[bone].max) {
				value = upperBoneLimits[bone].max;
			} else {
				value = upperBoneLimits[bone].min;
			}
		}
		return new Promise((resolve, reject) => {
			const boneData = this.mapJointValues.mapSliderValues[bone];
			if (!boneData) {
				return reject(new Error(`Bone ${bone} not found in mapSliderValues`));
			}

			const boneObject = this.experience.hierarchie[bone];
			const initialJointPosition = this.mapJointValues.initialJoints[bone];
			const { axes, direction } = boneData;
			const initialValue = boneObject.rotation[axes];
			const finalValue = initialJointPosition[axes] + value * direction;
			const duration = this.mapJointValues.getDuration(initialValue, finalValue);
			const animation = gsap.to(boneObject.rotation, {
				duration: duration * 1.2,
				[axes]: finalValue,
				onUpdate: () => {
					if (bone === 'upperarmL' || bone === 'upperarmR') {
						const epaulet = bone === 'upperarmL' ? this.experience.hierarchie['epaulet_left'] : this.experience.hierarchie['epaulet_right'];
						if (bone === 'upperarmL') {
							const upperarmL = this.experience.hierarchie['upperarmL'].rotation.x;
							if (upperarmL < 1) {
								epaulet.rotation.x = -0.02966 + Math.abs(upperarmL - 1);
							} else {
								epaulet.rotation.x = -0.02966;
							}
						} else {
							const upperarmR = this.experience.hierarchie['upperarmR'].rotation.x;
							if (upperarmR < 1) {
								epaulet.rotation.x = 0.09662 + Math.abs(upperarmR - 1);
							} else {
								epaulet.rotation.x = 0.09662;
							}
						}
					}
					this.mapJointValues.setAllRotationsValues();
					if (this.resetFlag) animation.kill();
				},
				onComplete: () => {
					if (!this.resetFlag) resolve();
				},
			});
		});
	};

	/**
	 * Extra animation to handle the hands of the model
	 * @param {string} hand // left or right
	 * @param {number} value // value to set
	 * @return {Promise} // extra animation to handle the hands of the model
	 * */
	simpleMoveHand = async (hand, value) => {
		const actualValue = this.openHands[`${hand}Value`];
		if (value > 1 || value < 0) {
			UIManager.showErrorMessage('error-message', `the "${upperBoneLimits[hand].name}" can't be below 0 or above 1\n. The entered value is ${value}.\n the ${upperBoneLimits[hand].name} will be set to ${value > 1 ? 1 : 0}`);
			if (value > 1) {
				value = 1;
			} else {
				value = 0;
			}
		}
		return new Promise((resolve) => {
			const bones = Object.keys(this.mapJointValues.handSliderValues[hand]);
			bones.forEach((phalax, index) => {
				const { axes, direction } = this.mapJointValues.handSliderValues[hand][phalax];
				if (typeof axes === 'undefined' || typeof direction === 'undefined') return;
				const boneObject = this.experience.hierarchie[phalax];
				const initialJointPosition = this.mapJointValues.initialJoints[phalax][axes];
				const finalValue = initialJointPosition + value * direction;
				const duration = Math.abs(actualValue - value) * 1.5 > 0.3 ? Math.abs(actualValue - value) * 1.5 : 0.3;
				gsap.to(boneObject.rotation, {
					duration: duration,
					[axes]: finalValue,
					onUpdate: () => {
						if (index === 0) {
							const updatedValue = (boneObject.rotation[axes] - initialJointPosition) * this.mapJointValues.handSliderValues[hand][phalax]['direction'];
							const slider = document.getElementById(hand);
							slider.value = updatedValue.toFixed(2);
							const sliderValue = document.getElementById(`${hand}-value`);
							sliderValue.innerHTML = Math.round(updatedValue * 100) + ' %';
							this.openHands[`${hand}Value`] = updatedValue;
						}
					},
					onComplete: () => {
						resolve();
					},
				});
			});
		});
	};

	/**
	 *
	 * @returns {boolean} // return true if the robot is ready to be used for simulation afer first animation => recursive check at the beginning in src/niryo.js
	 */
	checkIsReady() {
		return this.isReady;
	}

	/**
	 *
	 * @param {string} type // type of line to destroy; simulation:trajectoryLineSimulation, real robot line path:trajectoryLine)
	 */
	destroyLineTrajectory(type) {
		const testLine = this.experience.scene.getObjectByName(`${type}line`);
		if (testLine) {
			// Dispose geometry and material
			if (testLine.geometry) testLine.geometry.dispose();
			if (testLine.material) testLine.material.dispose();

			this.experience.scene.remove(testLine);
			// if (type === 'trajectoryLine') {
			// 	this.pointsArrayLine = [];
			// } else {
			// 	this.pointsArrayLineSimulation = [];
			// }
			if (this.pointsArrayLines.type) {
				this.pointsArrayLines.type = [];
			}
		}
	}

	/**
	 *
	 * @param {string} type // type of line to draw; simulation:trajectoryLineSimulation, real robot line path:trajectoryLine)
	 */
	drawLineTrajectory(type, color) {
		const testLine = this.experience.scene.getObjectByName(`${type}line`);
		if (testLine) {
			if (testLine.geometry) testLine.geometry.dispose();
			if (testLine.material) testLine.material.dispose();
			this.experience.scene.remove(testLine);
		}
		const globalPosition = new THREE.Vector3();
		const TCPPos = this.experience.hierarchie[type].getWorldPosition(globalPosition);
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

		// const color = type === 'trajectoryLine' ? 0x00ff00 : 0xff00ff;
		const lineMaterial = new LineMaterial({ color, linewidth: 0.003 });
		const lineGeometry = new LineGeometry();
		lineGeometry.setPositions(positions);
		// lineGeometry.setFromPoints(points);

		const line = new Line2(lineGeometry, lineMaterial);
		line.name = `${type}line`;

		// line.computeLineDistances();
		line.scale.set(1, 1, 1);
		// this.experience.scene.add(line);
		line.layers.enable(1);

		this.experience.scene.add(line);
	}

	/**
	 *
	 * @param {string} type
	 * @returns {void} update the line trajectory. Complete supression of points array and create a new path each time the function is called
	 */
	updateLineTrajectory(type) {
		const line = this.experience.scene.getObjectByName(`${type}line`);
		if (!line) return; // Exit if line does not exist

		const globalPosition = new THREE.Vector3();
		const TCPPos = this.experience.hierarchie[type].getWorldPosition(globalPosition);

		// Check if the point is almost the same as the last one
		if (this.pointsArrayLines[type] && this.pointsArrayLines[type].length > 0) {
			const lastPoint = this.pointsArrayLines[type][this.pointsArrayLines[type].length - 1];
			if (lastPoint.distanceTo(TCPPos) < 0.001) {
				return;
			}
		}

		if (this.pointsArrayLines[type]) {
			this.pointsArrayLines[type].push(TCPPos.clone());
		} else {
			this.pointsArrayLines[type] = [TCPPos.clone()];
		}

		let positions = [];

		// select the array depending on the type of line (simulator or real robot)
		const pointsArray = this.pointsArrayLines[type];
		// make the points array not too big => suppress points if too big
		if (pointsArray.length > 450) {
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

	touchChanged(data){
		for (let i = 0; i < data.length; i++) {
			const info = data[i]
			const title = info[0].split('/').join('')
			if (this.sensorsGroupLeds.includes(title) && info[1] === true){
				this.fadeLedsColor([title], {r: 150, g: 0, b: 150}, 0.5, true)
				setTimeout(() => {
					this.fadeLedsColor([title], {r: 0, g: 0, b: 0}, 0.3, true)
				}, 300)
			}
			
		}
		
	}
}

window.Simulator3D = new Simulator3d(config, poses);
