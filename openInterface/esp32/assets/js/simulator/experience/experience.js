import Experience from '/openInterface/interfaces/assets/js/simulator3d/Experience.js';
import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';
// import * as dat from '/openInterface/interfaces/assets/js/simulator3d/libs/lil-gui.js';

import { ARButton } from '../../../../../interfaces/assets/js/simulator3d/libs/ARButton.js';

import config from './config.js';
import { gsap } from '/openInterface/interfaces/assets/js/simulator3d/libs/gsap.js';
// import Gui from './utils/debug.js';

// lines 3D (kind of tube geometry)
import { Line2 } from '/openInterface/interfaces/assets/js/simulator3d/libs/Line2.js';
import { LineMaterial } from '/openInterface/interfaces/assets/js/simulator3d/libs/LineMaterial.js';
import { LineGeometry } from '/openInterface/interfaces/assets/js/simulator3d/libs/LineGeometry.js';
import { OBB } from '/openInterface/interfaces/assets/js/simulator3d/libs/OBB.js';

import TransformControl from './utils/transformControls.js';
import ObstacleUtils from './utils/obstaclesUtils.js';
import MazeBuilder from './utils/mazeBuilder.js';
import ledsArrayCenter from './utils/ledsArray.js';
import Physics from './utils/physics.js';
import RobotSimulator3D from '/openInterface/interfaces/assets/js/simulator/robot/RobotSimulator3D.js';

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
		this.robotSimulator = new RobotSimulator3D(this, 'Ilo');
		this._loadHierarchie(); // important to load the hierarchie before init the simulator and access to the 3D model elements

		// ilo-robot specific
		this.topView = false;
		this.penColor = '#ff9603';
		this.backgroundChoice = '/openInterface/esp32/assets/js/simulator/experience/textures/piste_kit_4.png';
		this.rgbTextureValue = [{}, {}, {}];
		this.speed = 100;
		this.angle = 0;
		this.speedRotation = 10; // ms/deg
		this.flagForStopSimulation = false;
		this.pointsArrayLine = [];
		this.activateLineTrajectory = false;
		this.startingPosGrid = new THREE.Vector3(-0.5, 0, 0);
		this.gridAxisActivated = false;
		this.dirComponent = {
			forward: {
				axis: 'x',
				value: 1,
				wheels: {
					FR_wheel: -1,
					FL_wheel: -1,
					BR_wheel: -1,
					BL_wheel: -1,
				},
			},
			backward: {
				axis: 'x',
				value: -1,
				wheels: {
					FR_wheel: 1,
					FL_wheel: 1,
					BR_wheel: 1,
					BL_wheel: 1,
				},
			},
			left: {
				axis: 'z',
				value: -1,
				wheels: {
					FR_wheel: -1,
					FL_wheel: 1,
					BR_wheel: 1,
					BL_wheel: -1,
				},
			},
			right: {
				axis: 'z',
				value: 1,
				wheels: {
					FR_wheel: -1,
					FL_wheel: -1,
					BR_wheel: -1,
					BL_wheel: 1,
				},
			},
			pivotCW: {
				wheels: {
					FR_wheel: 1,
					FL_wheel: -1,
					BR_wheel: 1,
					BL_wheel: -1,
				},
			},
			pivotCCW: {
				wheels: {
					FR_wheel: -1,
					FL_wheel: 1,
					BR_wheel: -1,
					BL_wheel: 1,
				},
			},
		};

		this.mecanumWheelCompute = {
			FR_wheel: { speed: 0, direction: 0 },
			FL_wheel: { speed: 0, direction: 0 },
			BR_wheel: { speed: 0, direction: 0 },
			BL_wheel: { speed: 0, direction: 0 },
		};

		this.distanceSensors = {
			L_distance_sensor: {
				direction: { x: 0, y: 0, z: -1 },
				color: 0xff0000,
				visible: false,
			},
			R_distance_sensor: {
				direction: { x: 0, y: 0, z: 1 },
				color: 0x00ff00,
				visible: false,
			},
			F_distance_sensor: {
				direction: { x: 1, y: 0, z: 0 },
				color: 0x0000ff,
				visible: false,
			},
			B_distance_sensor: {
				direction: { x: -1, y: 0, z: 0 },
				color: 0xffff00,
				visible: false,
			},
		};
		this.distanceToBarrier = {
			L_distance_sensor: 0,
			R_distance_sensor: 0,
			F_distance_sensor: 0,
			B_distance_sensor: 0,
		};

		this.LEDMatrixCenter = {};
		this.LEDMatrixCircle = {};

		Simulator3d.instance = this; // singleton
	}

	/**
	 * Init the simulator, sliders and buttons
	 * @return {void} // init the simulator
	 */
	async _init() {

		this.experience.renderer.instance.xr.addEventListener('sessionstart', () => {
			this.options.params.debug && console.log('start XR session');
			this.experience.xrActive = true;
			this.experience.renderer.usePostprocess = false;
			this.startXr();
		});

		this.experience.renderer.instance.xr.addEventListener('sessionend', () => {
			this.options.params.debug && console.log('end XR session');
			const excludedElements = [];
			this.experience.scene.traverse((child) => {
				if (child.name && child instanceof THREE.Mesh && excludedElements.includes(child.name)) {
					child.visible = true;
				}
			});

			const model = this.experience.scene.getObjectByName('modelCustom');
			const groundTrack = this.experience.scene.getObjectByName('ground_track');
			const reticle = this.experience.scene.getObjectByName('reticle');

			if (this.obstaclesHandler.obstacles.length > 0) {
				this.obstaclesHandler.obstacles.forEach((obstacle) => {
					obstacle.removeFromParent();
				});
			}

			if (reticle) {
				reticle.removeFromParent();
			}

			if (model) {
				model.removeFromParent();
				this.experience.scene.add(model);
			}

			if (groundTrack) {
				groundTrack.removeFromParent();
				this.experience.scene.add(groundTrack);
			}

			if (this.boundingBox) {
				this.boundingBox.removeFromParent();
				this.experience.scene.add(this.boundingBox);
			}

			this.experience.renderer.usePostprocess = this.options.usePostprocess;
			this.experience.camera.modes.debug.instance.aspect = this.options.params.width / this.options.params.height;
			this.experience.camera.modes.debug.instance.fov = 50;
			this.experience.camera.modes.debug.instance.updateProjectionMatrix();

			this.experience.renderer.instance.setSize(this.options.params.width, this.options.params.height);
			this.experience.renderer.instance.setPixelRatio(window.devicePixelRatio); // Optionnel pour une meilleure qualité
			delete this.experience.renderLoopXr.animateXr;
			this.experience.xrActive = false;
			this.resetPosition();
		});

		const getStorage = localStorage.getItem('simulatorData');
		let getImageDataBackground = {};
		if (typeof getStorage !== 'undefined' && getStorage !== null) {
			getImageDataBackground = JSON.parse(localStorage.simulatorData);
		}
		let background = null;
		try {
			const interfaceImageDataBackground = getImageDataBackground[INTERFACE_NAME];
			if (typeof interfaceImageDataBackground !== 'undefined' && typeof interfaceImageDataBackground.backgrounds !== 'undefined' && typeof interfaceImageDataBackground.backgrounds.Ilo !== 'undefined') {
				background = interfaceImageDataBackground.backgrounds.Ilo;
			}
		} catch (error) {
			console.error('error loading background', error);
		}
		if (background !== null && typeof background !== 'undefined') {
			await this.updateBackground(background);
		} else {
			await this.updateBackground('/openInterface/esp32/assets/js/simulator/experience/textures/piste_kit_4.png');
		}


		// initTransparent material
		const transparentMaterial = new THREE.MeshPhysicalMaterial({
			roughness: 0.1,
			transmission: 0.8, // Add transparency
		});

		const fence = this.experience.hierarchie['Safety_Gate'];
		fence.material = transparentMaterial;

		this.createTubeDistanceSensor();
		this.experience.movementObjectFunctions.getDistanceSensor = this.getDistanceSensor.bind(this);

		const fenceInvisible = ['F_fence', 'B_fence', 'R_fence', 'L_fence'];
		for (let i = 0; i < fenceInvisible.length; i++) {
			this.experience.hierarchie[fenceInvisible[i]].visible = false;
		}

		this.startCollectRGB();
		this.checkCollision();
		if (this.options.enablePhysics) {
			if (navigator.userAgent.includes('Chrome')) {
				this.initPhysics();
			}
		}
		this.initObstacleUtils();

		this.initTranformControls();
		this.initFakeGizmo();
		// this.initRobotSimulator();
		this.isReady = true;
		// this.initMazeBuilder(); // unused for now => to keep
		// this.initGridAxis();
	}

	/**
	 * @description: initFakeGizmo function to init the fake gizmo button to switch between the top view and the orbit controls view
	 * @returns {void} // init the fake gizmo button
	 * */
	initFakeGizmo() {
		const gizmoButton = document.getElementById('gizmo-button');
		gizmoButton.addEventListener('click', function () {
			window.Simulator3D.topView = !window.Simulator3D.topView;
			window.Simulator3D.toogleView();
			gizmoButton.classList.toggle('active-gizmo');
		});
	}

	/**
	 * @description: toogleView function to switch between the top view and the orbit controls view
	 * @returns {void} // switch between the top view and the orbit controls view
	 * */
	toogleView() {
		const camera = this.experience.camera.modes.debug.instance;
		const orbitControls = this.experience.camera.modes.debug.orbitControls;
		if (this.topView) {
			this.storedCameraPosition = this.experience.camera.modes.debug.instance.position.clone();

			orbitControls.target.set(0, 0, 0);
			orbitControls.update();
			camera.position.set(0, 0.3, 0);
			camera.up.set(0, 0, -1);
			camera.lookAt(0, 0, 0);

			camera.lookAt(0, 0, 0);
			orbitControls.enabled = false;
		} else {
			camera.up.set(0, 1, 0);
			camera.position.copy(this.storedCameraPosition);
			orbitControls.enabled = true;
		}
	}

	/**
	 * @description: initMazeBuilder function
	 * @returns {void} // init the maze builder
	 * */
	initMazeBuilder() {
		this.mazeBuilder = new MazeBuilder(this.experience);
		this.mazeArray = this.mazeBuilder.maze.length > 0 ? this.mazeBuilder.maze : [];
	}

	/**
	 * @description: init transform controls to move the robot or objects in the scene on the x, z axis (y is locked)
	 * @returns {void} // init transform controls
	 **/
	initTranformControls() {
		this.transformControl = new TransformControl(this, this.experience, this.obstaclesHandler, this.updateGridSystem.bind(this));
	}

	initPhysics() {
		this.physics = new Physics(this.experience, this);
		this.physics.init();
		this.experience.physics = this.physics;
	}

	/**
	 * @description: initObstacleUtils function to init the obstacle utils
	 * @returns {void} // init the obstacle utils
	 **/
	initObstacleUtils() {
		this.obstaclesHandler = new ObstacleUtils(this.experience, this.options.enablePhysics ? this.physics : null);
	}

	/**
	 * @description: start collect RGB function to start collecting the RGB values of the 3 sensors
	 * @returns {void} // start collecting the RGB values of the 3 sensors
	 **/
	startCollectRGB() {
		this.experience.movementObjectFunctions.collectRGB = this.getImageTextureData.bind(this);
	}

	/**
	 * @description: stop collect RGB function to stop collecting the RGB values of the 3 sensors. Unused for now
	 * @returns {void} // stop collecting the RGB values of the 3 sensors
	 * */
	stopCollectRGB() {
		this.startingCollectRGB = false;
		delete this.experience.movementObjectFunctions.collectRGB;
	}

	// initRobotSimulator() {
	// 	this.robotSimulator = new RobotSimulator3D(this, 'Ilo');
	// }

	/**
	 * Load the 3D model and create the hierarchie of the robot, store it in this.experience.hierarchie
	 *
	 * @private
	 * @return {void} // create the hierarchie of the robot => this.experience.hierarchie
	 **/
	_loadHierarchie() {
		setTimeout(() => {
			// const robotSimElement = document.getElementById('robot-sim');
			if (this.experience.loaded) {
				if (this.options.params.debug) {
					console.log('Model loaded');
				}
				this.experience.scene.traverse((child) => {
					const elementsRegex = this.options.modelHierarchy.elementsRegex;
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
					for (let i = 0; i < elementsRegex.length; i++) {
						const regex = new RegExp(elementsRegex[i], 'g');

						if (child.name.match(regex)) {
							this.experience.hierarchie[child.name] = child;
							if (child.name.match(/(bounding_box_physics|wheel_FL|wheel_FR|wheel_BL|wheel_BR)/g)) {
								child.visible = false;
							}
							if (child.name === 'bounding_box') {
								// bouding box of the robot to check the collision
								child.visible = false;
								// child.material.wireframe = true;
								try {
									const geometryBoundingBox = new THREE.Box3().setFromObject(child);
									const center = geometryBoundingBox.getCenter(new THREE.Vector3());
									const size = geometryBoundingBox.getSize(new THREE.Vector3());

									// Créer une BoxGeometry avec les dimensions obtenues
									this.boxGeometryTest = new THREE.BoxGeometry(size.x, size.y, size.z);
									this.boxGeometryTest.userData.obb = new OBB();
									this.boxGeometryTest.userData.obb.halfSize.copy(size).multiplyScalar(0.5);

									// Créer un matériau pour la bounding box et l'ajouter à la scène
									const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
									this.boundingBox = new THREE.Mesh(this.boxGeometryTest, boxMaterial);
									this.boundingBox.position.copy(center);
									this.boundingBox.userData.obb = new OBB();
									this.boundingBox.visible = false;
									this.experience.scene.add(this.boundingBox);
								} catch (error) {
									console.error('error bounding box', error);
								}
							}
						}
					}

					if (child.name.match(/PerspectiveCamera/g)) {
						this.experience.perspecticeCamera = child;
					}
				});
				this.loadedHierarchie = true;
				this.experience.sceneReady = true;
				this._init();

				// new Gui(this.experience);
			} else {
				if (this.options.params.debug) console.log('model not loaded');
				this._loadHierarchie();
				console.log('loading');
			}
		}, 100);
	}


	/**
	 * @description: reset the robot position to the initial position when skulpt start the simulation
	 * @returns {void} // reset the robot position
	 **/
	resetPosition() {
		//init robot
		if (!this.isReady) return;
		this.LEDMatrixCenter = {};
		this.LEDMatrixCircle = {};

		this.initLEDSystem();
		this.robotSimulator.resetSystem();

		this.removeTransformControls();
		this.removeObstacles();
		this.addObstacles();

		this.setLedShape('ring_1');
	}

	// methode for storage infos from DB
	setInitialRobotPosition(position) {
		SimulatorLS.setData('Ilo', 'initialPositions', { x: position.x, y: position.y }, (data) => JSON.stringify(data));
	}

	pause() {
		if (this.physics) {
			this.physics.pause();
		}
	}

	play() {
		if (this.physics) {
			this.physics.play();
		}
	}


	rotateModelY(angle) {
		const robot = this.experience.hierarchie['chassis'];
		const angleRad = -(angle * Math.PI) / 180;
		if (this.physics) {
			robot.rotation.set(0, angleRad, 0);
		} else {
			const quaternion = new THREE.Quaternion();
			quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angleRad);
			robot.quaternion.copy(quaternion);
		}
		robot.updateMatrixWorld();
	}

	/**
	 * @description: zoom function (+) to zoom out the scene increase the distance between the camera and the scene
	 * @return {void} // zoom out the scene
	 **/
	sceneZoomOut() {
		const zoom = this.experience.minZoom;
		// if (zoom > 2.2) return;
		this.experience.camera.modes.debug.orbitControls.minDistance = zoom + 1;
		this.experience.camera.modes.debug.orbitControls.maxDistance = zoom + 1;
		this.experience.minZoom = zoom + 1;
	}
	/**
	 * @description: zoom function (-) to zoom in the scene decrease the distance between the camera and the scene
	 * @returns {void} // zoom in the scene
	 */
	sceneZoomIn() {
		const zoom = this.experience.minZoom;
		// if (zoom < 1) return;
		this.experience.camera.modes.debug.orbitControls.minDistance = zoom - 1;
		this.experience.camera.modes.debug.orbitControls.maxDistance = zoom - 1;
		this.experience.minZoom = zoom - 1;
	}

	/**
	 * @description: checkCollision function to check the collision between the robot and the obstacles
	 * @returns {void} // check the collision between the robot and the obstacles
	 **/
	checkCollision() {
		const check = () => {
			const collisionFenceMesh = [];
			const fenceMesh = ['F_fence', 'B_fence', 'R_fence', 'L_fence'];
			for (let i = 0; i < fenceMesh.length; i++) {
				const fence = this.experience.hierarchie[fenceMesh[i]];
				collisionFenceMesh.push(fence);
			}
			const maze = this.experience.mazeArray || [];

			const collisionObjects = [...this.obstaclesHandler.obstacles, ...collisionFenceMesh, ...maze];
			const hitbox = this.experience.hierarchie['chassis'];

			hitbox.updateMatrixWorld();

			// update the bounding box position and rotation from the hitbox corresponding to the robot chassis
			if (this.boundingBox) {
				this.boundingBox.position.copy(hitbox.position);
				this.boundingBox.rotation.copy(hitbox.rotation);

				const boundingBoxGeometryCenter = new THREE.Vector3();
				this.boundingBox.geometry.computeBoundingBox();
				this.boundingBox.geometry.boundingBox.getCenter(boundingBoxGeometryCenter);
				this.boundingBox.geometry.translate(-boundingBoxGeometryCenter.x, -boundingBoxGeometryCenter.y, -boundingBoxGeometryCenter.z);
				this.boundingBox.updateMatrix();
				this.boundingBox.updateMatrixWorld();

				this.boundingBox.userData.obb.copy(this.boundingBox.geometry.userData.obb);
				this.boundingBox.userData.obb.applyMatrix4(this.boundingBox.matrixWorld);
			}

			for (let i = 0; i < collisionObjects.length; i++) {
				const object = collisionObjects[i];
				const objectBoundingBox = new THREE.Box3().setFromObject(object);
				const obb = this.boundingBox.userData.obb;
				// use OBB instead of bounding box for more precise collision detection during rotation (classic bounding box are axis aligned)
				if (obb.intersectsBox3(objectBoundingBox)) {
					const directionVector = new THREE.Vector3().subVectors(obb.center, objectBoundingBox.getCenter(new THREE.Vector3()));
					const direction = directionVector.clone().normalize();

					const primaryAxis = Math.abs(direction.x) > Math.abs(direction.z) ? 'x' : 'z';
					const primarySign = direction[primaryAxis] > 0 ? 1 : -1;
					const isFence = object.name.includes('fence');
					if (isFence) {
						this.pushBackFence(object.name);
						return true;
					} else {
						this.pushBack(primaryAxis, primarySign);
						return true;
					}
				}
			}
		};

		if (!this.physics) {
			this.experience.movementObjectFunctions.checkCollision = check.bind(this);
		}
	}

	/**
	 * @description: Push back function to push back the robot when it collides with the fence obstacles (reversed direction)
	 * @param {string} fenceName // the name of the fence obstacle
	 * @returns {void} // push back the robot when it collides with the fence obstacles
	 * */
	pushBackFence(fenceName) {
		const ilo = this.experience.hierarchie['chassis'];
		const position = ilo.position;
		const pushbackDistance = 0.2; // La distance de repoussement (à ajuster si besoin)

		switch (fenceName) {
			case 'F_fence': // Front
				position.x -= pushbackDistance;
				position.z = position.z;
				break;

			case 'B_fence': // Back
				position.x += pushbackDistance;
				position.z = position.z;
				break;

			case 'L_fence': // Left
				position.z += pushbackDistance;
				position.x = position.x;
				break;

			case 'R_fence': // Right
				position.z -= pushbackDistance;
				position.x = position.x;
				break;

			default:
				console.log('unnamed fence : ', fenceName);
				break;
		}
	}

	/**
	 * @description: pushBack function to push back the robot when it collides with the obstacles (fence or objects)
	 * @param {string} primaryAxis // the primary axis of impact based on the larger component (x or z)
	 * @param {number} primarySign // the sign of the primary axis of impact (1 or -1)
	 * @returns {void} // push back the robot when it collides with the obstacles
	 **/
	pushBack(primaryAxis, primarySign) {
		const ilo = this.experience.hierarchie['chassis'];
		const position = ilo.position;
		const moveDirection = new THREE.Vector3();
		moveDirection[primaryAxis] = primarySign * 0.25;
		position.x += moveDirection.x;
		position.z += moveDirection.z;
	}

	// to keep: simple version of the tube geometry for the distance sensors need to check if performances are impacted with shaders before removing it
	// createTubeDistanceSensor() {
	// 	const ds = ['L_distance_sensor', 'R_distance_sensor', 'F_distance_sensor', 'B_distance_sensor'];
	// 	for (let i = 0; i < ds.length; i++) {
	// 		// const color = this.distanceSensors[ds[i]].color;
	// 		const material = new THREE.MeshBasicMaterial({ color: "0xff0000" });
	// 		// material.transparent = true;
	// 		const tubeGeometry = new THREE.CylinderGeometry(0.004, 0.005, 0.1, 16);
	// 		const tube = new THREE.Mesh(tubeGeometry, material);
	// 		tube.material.opacity = 0.5;
	// 		tube.material.emissiveIntensity = 3.5;
	// 		tube.name = ds[i] + '_tube';
	// 		if (!this.distanceSensors[ds[i]].visible){
	// 			tube.visible = false;
	// 		}
	// 		this.experience.scene.add(tube);
	// 	}
	// }

	/**
	 * advanced version of the tube geometry with shaders for the distance sensors. Thanks chatGPT 😇 (I've never understood shaders)
	 *
	 * @description: createTubeDistanceSensor function to create the tube geometry for the distance sensors (4 distance sensors: left, right, front, back)
	 * @returns {void} // create the tube geometry for the distance sensors
	 **/
	createTubeDistanceSensor() {
		const ds = ['L_distance_sensor', 'R_distance_sensor', 'F_distance_sensor', 'B_distance_sensor'];
		for (let i = 0; i < ds.length; i++) {
			const shaderMaterial = new THREE.ShaderMaterial({
				uniforms: {
					color: { value: new THREE.Color(0x00ff00) },
					opacity: { value: 1 },
					time: { value: 0.15 }, // Ajout d'un uniform pour le temps
				},
				vertexShader: `
					varying vec2 vUv;
					void main() {
						vUv = uv;
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					}
				`,
				fragmentShader: `
					uniform vec3 color;
					uniform float opacity;
					uniform float time;
					varying vec2 vUv;
			
					// Fonction simple pour générer du bruit
					float noise() {
						return fract(sin(dot(gl_FragCoord.xy ,vec2(12.9898,78.233))) * 43758.5453);
					}
			
					void main() {
						float glow = sin(vUv.y * 3.1415926) * 0.5 + 0.5;
						// Ajouter une composante de bruit basée sur le temps pour créer un effet 'électrique'
						float noiseEffect = noise() * 0.5 + 0.5;
						float pulse = sin(time * 10.0) * 0.5 + 0.5; // Crée un effet pulsatoire
						float combinedGlow = glow * pulse * noiseEffect; // Combinaison des effets pour un rendu plus dynamique
						gl_FragColor = vec4(color * combinedGlow, opacity);
					}
				`,
				transparent: true,
				blending: THREE.AdditiveBlending,
			});

			const tubeGeometry = new THREE.CylinderGeometry(0.04, 0.05, 1, 16, 1, true);
			const tube = new THREE.Mesh(tubeGeometry, shaderMaterial);
			tube.name = ds[i] + '_tube';
			this.experience.scene.add(tube);
		}
	}

	/**
	 * @description: getDistanceSensor function to get the distance sensor values for the 4 distance sensors (left, right, front, back)
	 * @returns {void} // get the distance sensor values for the 4 distance sensors
	 **/
	getDistanceSensor() {
		const distanceSensors = ['L_distance_sensor', 'R_distance_sensor', 'F_distance_sensor', 'B_distance_sensor'];
		const slidersId = ['ilo-distanceLeft_slider', 'ilo-distanceRight_slider', 'ilo-distanceFront_slider', 'ilo-distanceBack_slider'];
		const sliderSlot = ['ilo-distanceLeft', 'ilo-distanceRight', 'ilo-distanceFront', 'ilo-distanceBack'];

		for (let i = 0; i < distanceSensors.length; i++) {
			const sensors = this.experience.hierarchie[distanceSensors[i]];
			const barrier = this.experience.hierarchie['Safety_Gate'];
			const obstacles = this.obstaclesHandler.obstacles;
			const maze = this.experience.mazeArray || [];
			const detectableObjects = [barrier, ...obstacles, ...maze];

			const sensorPosition = new THREE.Vector3();
			sensors.getWorldPosition(sensorPosition);
			const coord = this.distanceSensors[distanceSensors[i]].direction;
			const sensorDirection = new THREE.Vector3(coord['x'], 0, coord['z']);
			sensors.localToWorld(sensorDirection);
			sensorDirection.sub(sensorPosition).normalize();

			const raycaster = new THREE.Raycaster(sensorPosition, sensorDirection);
			const intersects = raycaster.intersectObjects(detectableObjects, true);

			const tube = this.experience.scene.getObjectByName(distanceSensors[i] + '_tube');
			const sliderEl = document.getElementById(slidersId[i]);
			// if (sliderEl) {
			// 	console.log('slider found', slidersId[i]);
			// }
			if (intersects.length > 0) {
				// tube.material.opacity = 1;
				const distance = intersects[0].distance;
				this.distanceToBarrier[distanceSensors[i]] = distance;

				let distanceValue = 0.001;
				if (sliderEl) {
					distanceValue = distance;
					Simulator.setSliderValue(sliderSlot[i], distanceValue * 100);
				}
				tube.scale.set(1, distanceValue, 1); // Adjust scale to match the distance

				const midpoint = new THREE.Vector3().addVectors(sensorPosition, sensorDirection.clone().multiplyScalar(distance * 0.5));
				tube.position.copy(midpoint);
				const axis = new THREE.Vector3(0, 1, 0);
				const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, sensorDirection.clone());
				tube.quaternion.copy(quaternion);
			} else if (sliderEl) {
				tube.scale.set(1, 100, 1); // Adjust scale to match the distance

				const midpoint = new THREE.Vector3().addVectors(sensorPosition, sensorDirection.clone().multiplyScalar(100 * 0.5));
				tube.position.copy(midpoint);
				const axis = new THREE.Vector3(0, 1, 0);
				const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, sensorDirection.clone());
				tube.quaternion.copy(quaternion);
			}
		}
	}

	/**
	 * @description: updateBackground function to update the background of the scene
	 * @param {string} path // the path of the background image
	 * @returns {void} // update the background of the scene
	 * @throws {error} // error loading texture
	 **/
	updateBackground(path) {
		const planeGeometry = new THREE.PlaneGeometry(20, 12, 10, 10);
		const textureLoader = new THREE.TextureLoader();
		return new Promise((resolve, reject) => {
			textureLoader.load(
				path,
				(texture) => {
					const checkPlane = this.experience.scene.getObjectByName('ground_track');

					this.textureTrack = texture;
					this.textureTrack.flipX = true;
					// this.textureTrack.flipY = true;
					let material = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide });
					if (checkPlane) {
						checkPlane.material.dispose();
						checkPlane.geometry.dispose();
						this.experience.scene.remove(checkPlane);
					}
					const plane = new THREE.Mesh(planeGeometry, material);
					plane.receiveShadow = true;
					plane.castShadow = true;
					this.trackWidth = plane.geometry.parameters.width;
					this.trackHeight = plane.geometry.parameters.height;
					plane.position.set(0, 0, 0);
					plane.rotation.x = -Math.PI / 2;
					plane.name = 'ground_track';
					this.experience.scene.add(plane);

					this.image = texture.image;
					const canvas = document.createElement('canvas');
					this.context = canvas.getContext('2d');

					canvas.width = this.image.width;
					canvas.height = this.image.height;

					this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height);
					this.imageData = this.context.getImageData(0, 0, this.image.width, this.image.height);
					// this.isReady = true;
					// this.resetPosition();
					return resolve();
				},
				undefined,
				(err) => {
					console.error('error loading texture ', err);
					return reject();
				}
			);
		});
	}

	/**
	 * @description: addObstacle function to add an obstacle to the scene
	 * @param {object} obs // the obstacle object to add
	 * @returns {void} // add an obstacle to the scene
	 **/
	async addObstacles() {
		if (!this.isReady) return;
		// const obs = RobotSimulator.Obstacle.obstaclesDB
		const obstacleDB = SimulatorLS.get('obstaclesDB');

		if (typeof obstacleDB === 'undefined' || obstacleDB === null) return;
		RobotSimulator.Obstacle.obstaclesDB = {};
		const obs = JSON.parse(obstacleDB);
		for (const key in obs) {
			const shape = obs[key].shape;
			const element = obs[key].image.split('.')[0];
			const width = obs[key].w;
			const height = obs[key].h;
			const positionX = obs[key].x;
			const positionY = obs[key].y;
			const image = '/openInterface/interfaces/assets/media/simulator/robot/obstacles/' + element + '.png';
			const id = key;
			await this.obstaclesHandler.addObstacle(element, image, shape, width, height, positionX, positionY, id);
			RobotSimulator.Obstacle.obstaclesDB[id] = obs[key];
		}
	}

	removeObstacles() {
		if (!this.isReady) return;
		this.obstaclesHandler.removeObstacles();
	}

	removeTransformControls() {
		if (!this.isReady) return;
		if (this.transformControl.selectedItem) {
			this.transformControl.removeHelper(this.transformControl.selectedItem);
			this.transformControl.selectedItem = null;
			this.experience.renderer.instance.domElement.removeEventListener('mousedown', this.transformControl.boundHandleMouseDown);
		}
	}

	// unused for now
	intervalCheckStop(resolver) {
		const interval = setInterval(() => {
			if (this.flagForStopSimulation) {
				clearInterval(interval);
				this.flagForStopSimulation = false;
				resolver();
			}
		}, 500);
	}

	/**
	 * @description: check if the main model is loaded
	 * @returns {boolean} // true if the main model is loaded, false otherwise
	 **/
	checkIsReady() {
		return this.isReady;
	}

	/**
	 * @description: updateMecanumComponent function to update the mecanum wheel component
	 * @param {string} wheel // the wheel to update
	 * @param {number} speed // the speed of the wheel
	 * @param {number} direction // the direction of the wheel (1 or -1)
	 * @returns {void} // update the mecanum wheel component
	 * */
	updateMecanumComponent(wheel, speed, direction) {
		this.mecanumWheelCompute[wheel].speed = (speed / 100) * this.speed * direction;
		this.mecanumWheelCompute[wheel].direction = direction;
	}

	/**
	 * @description: computeMecanumMovement function to compute the movement (x, y, rotY) of the robot with mecanum wheels
	 * @returns {object} // the movement of the robot (x, y, rotY) => no friction
	 * */
	computeMecanumMovement() {
		let vx = 0;
		let vy = 0;
		let vw = 0;
	
		const R = 0.05; // Rayon de la roue (en mètres)
		const l1 = 0.2; // Longueur du robot (en mètres)
		const l2 = 0.15; // Largeur du robot (en mètres)
	
		const maxWheelSpeed = 1.0; // Vitesse maximale des roues (ex. 1 m/s)
	
		// Conversion des vitesses des roues en m/s
		const FR = (this.mecanumWheelCompute['FR_wheel'].speed / 100) * maxWheelSpeed * this.mecanumWheelCompute['FR_wheel'].direction;
		const FL = (this.mecanumWheelCompute['FL_wheel'].speed / 100) * maxWheelSpeed * this.mecanumWheelCompute['FL_wheel'].direction;
		const BR = (this.mecanumWheelCompute['BR_wheel'].speed / 100) * maxWheelSpeed * this.mecanumWheelCompute['BR_wheel'].direction;
		const BL = (this.mecanumWheelCompute['BL_wheel'].speed / 100) * maxWheelSpeed * this.mecanumWheelCompute['BL_wheel'].direction;
	
		// Calcul des composantes de la vitesse
		vx = (R * (FR + FL + BR + BL)) / 4;
		vy = (R * -(FR - FL - BR + BL)) / 4;
		vw = (R * (FR - FL + BR - BL)) / (4 * (l1 + l2));
	
		return { vx, vy, vw };
	}
	

	/**
	 * @description: moveKinematic function to move the robot kinematically (mecanum wheels)
	 * @returns {void} // move the robot kinematically
	 * */
	moveKinematic() {
		clearInterval(this.intervalMoveCommande);
		if (this.experience.requestedTransformControl) return;
	
		const { vx, vy, vw } = this.computeMecanumMovement();
		const ilo = this.experience.hierarchie['chassis'];
	
		let moveDirection = new THREE.Vector3(vx, 0, vy);
		this.wheelUpdateMecanum(); 
	
		const timeStep = 1;
		const incrementRotation = vw * timeStep;
	
		let counter = 0;
		this.intervalMoveCommande = setInterval(() => {
			if (counter >= 60 * 60 * 5) {
				clearInterval(this.intervalMoveCommande);
				this.stopWheels();
			} else if (this.experience.requestedTransformControl || !Simulator.isRunning) {
			} else {
				if (this.activateLineTrajectory) {
					this.updateLineTrajectory('trajectoryLine');
				}
				if (incrementRotation !== 0) {
					const quaternionRotation = new THREE.Quaternion();
					quaternionRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), incrementRotation);
					ilo.quaternion.multiply(quaternionRotation);
				}
	
				// Appliquer la rotation actuelle à la direction du mouvement pour qu’il reste dans le référentiel local
				let adjustedMoveDirection = moveDirection.clone();
				adjustedMoveDirection.applyQuaternion(ilo.quaternion);
				adjustedMoveDirection.multiplyScalar(timeStep);
	
				// Appliquer le déplacement
				ilo.position.add(adjustedMoveDirection);
	
				counter++;
			}
		}, 1000 / 60); // 60 FPS
	}
	

	/**
	 * @description: command the robot to move forward or backward left or right (can be interrupted by the user for transform control purpose)
	 * @param {number} unit // the unit of movement (1 unit is equal to the length of the robot => 0.193 m)
	 * @param {string} direction // the direction of movement (forward, backward, left, right)
	 * @returns {Promise} // a promise that resolves when the robot finishes the movement for skulpt
	 **/
	moveCommand(direction, moveDistance, steps = null) {
		clearInterval(this.intervalMoveCommande);
		if (this.experience.requestedTransformControl || !Simulator.isRunning) return;
		return new Promise((resolve, reject) => {
			switch (direction) {
				case 'forward':
					this.setLedShape('front');
					break;
				case 'backward':
					this.setLedShape('back');
					break;
			}
			this.isRunning = true;
			const component = this.dirComponent[direction];
			const distance = steps === null ? moveDistance * 1.93 : steps * 1.93;
			const duration = distance / this.speed;
			const ilo = this.experience.hierarchie['chassis'];

			let moveDirection = new THREE.Vector3();
			moveDirection[component.axis] = component.value;

			this.wheelUpdate(direction);

			const frames = duration * 60 * 100; // total frames

			let counter = 0;

			this.intervalMoveCommande = setInterval(() => {
				if (counter >= frames) {
					this.setLedShape('ring_1');
					clearInterval(this.intervalMoveCommande);
					this.stopWheels();
					resolve();
				} else if (this.experience.requestedTransformControl || !Simulator.isRunning) {
				} else {
					if (this.activateLineTrajectory) {
						this.updateLineTrajectory('trajectoryLine');
					}
					let adjustedMoveDirection = moveDirection.clone();
					adjustedMoveDirection.applyQuaternion(ilo.quaternion);
					adjustedMoveDirection.normalize().multiplyScalar(distance / frames);

					ilo.position.add(adjustedMoveDirection);

					counter++;
				}
			}, 1000 / 60); // Move at 60 FPS
		});
	}

	/**
	 * @description: command the robot to rotate left or right (can be interrupted by the user for transform control purpose)
	 * @param {number} angle // the angle of rotation
	 * @param {string} direction // the direction of rotation (cw or ccw)
	 * @returns {Promise} // a promise that resolves when the robot finishes the rotation for skulpt
	 **/
	rotateCommand(angle, direction, steps = null) {
		clearInterval(this.intervalMoveCommande);
		if (this.experience.requestedTransformControl) return;
		return new Promise((resolve, reject) => {
			switch (direction) {
				case 'cw':
					this.setLedShape('rot_clock');
					break;
				case 'ccw':
					this.setLedShape('rot_trigo');
					break;
			}
			this.isRunning = true;
			const ilo = this.experience.hierarchie['chassis'];
			const dir = direction === 'cw' ? -1 : 1;
			const rotation = ilo.rotation;
			if (steps !== null) angle = angle * steps;
			const radAngle = (angle * Math.PI) / 180;
			const duration = (Math.abs(angle) * this.speedRotation) / 1000;
			this.wheelUpdate(direction === 'cw' ? 'pivotCW' : 'pivotCCW');
			const frames = duration * 60; // total frames
			const increment = radAngle / frames;

			let counter = 0;
			this.intervalRotateCommande = setInterval(() => {
				if (counter >= frames) {
					this.angle = this.angle + radAngle * dir;
					this.isRunning = false;
					clearInterval(this.intervalRotateCommande);
					this.setLedShape('ring_1');
					this.stopWheels();
					resolve();
				} else if (this.experience.requestedTransformControl || !Simulator.isRunning) {
				} else {
					if (this.activateLineTrajectory) {
						this.updateLineTrajectory('trajectoryLine');
					}
					rotation.y += increment * dir;
					counter++;
				}
			}, 1000 / 60); // Move at 60 FPS
		});
	}

	stopMotors() {
		this.updateMecanumComponent('FR_wheel', 0, 0);
		this.updateMecanumComponent('FL_wheel', 0, 0);
		this.updateMecanumComponent('BR_wheel', 0, 0);
		this.updateMecanumComponent('BL_wheel', 0, 0);
		clearInterval(this.intervalMoveCommande);
		this.stopWheels();
		this.wheelUpdateMecanum();
	}

	/**
	 * @description: move wheels function to move the wheels of the robot
	 * @param {string} type // the type of movement (forward, backward, left, right, cw, ccw)
	 * @returns {void} // move the wheels of the robot
	 **/
	wheelUpdate(type) {
		const wheelMove = (() => {
			const wheels = ['FR_wheel', 'FL_wheel', 'BR_wheel', 'BL_wheel'];
			wheels.map((wheel) => {
				this.experience.hierarchie[wheel].rotation.z += this.dirComponent[type].wheels[wheel] * 0.1;
			});
		}).bind(this);
		this.experience.movementObjectFunctions.wheelMove = wheelMove;
	}

	/**
	 * @description: updateWheel function to update the wheel of the robot when mecanum wheel movement
	 * @returns {void} // update the wheel of the robot
	 * */
	wheelUpdateMecanum() {
		this.stopWheels();
	
		const R = 0.05; // wheel radius (in meters)
		const maxWheelSpeed = 1.0; // max wheel speed (ex. 1 m/s)
	
		const wheelMove = (() => {
			const wheels = ['FR_wheel', 'FL_wheel', 'BR_wheel', 'BL_wheel'];
	
			wheels.forEach((wheel) => {
				const wheelObj = this.experience.hierarchie[wheel];
				const speed = this.mecanumWheelCompute[wheel].speed;
				const direction = this.mecanumWheelCompute[wheel].direction;
	
				// linear speed to angular speed
				const wheelAngularSpeed = ((speed / 100) * maxWheelSpeed) / R;
	
				// add rotation to the wheel
				wheelObj.rotation.z += direction * -wheelAngularSpeed * 0.016; // Facteur temps (1/60 FPS)
			});
		}).bind(this);
	
		this.experience.movementObjectFunctions.wheelMove = wheelMove;
	}

	/**
	 * @description: stop the wheels of the robot
	 * @returns {void} // stop the wheels of the robot
	 **/
	stopWheels() {
		delete this.experience.movementObjectFunctions.wheelMove;
	}

	/**
	 * @description: get the pixel color value below the robot for the 3 sensors (left, center, right). It calculate the mean of the RGB values of the 4x4 pixels around the center pixel
	 * @returns {void} // get the pixel color value below the robot for the 3 sensors
	 **/
	getImageTextureData() {
		const sensors = ['L_Sensor', 'C_Sensor', 'R_Sensor'];
		this.rgbTextureValue = [{}, {}, {}];

		for (let i = 0; i < sensors.length; i++) {
			const sensor = this.experience.hierarchie[sensors[i]];
			const positionSensor = sensor.getWorldPosition(new THREE.Vector3());
			const xV = positionSensor.x;
			const zV = -positionSensor.z;

			let u = (xV + this.trackWidth / 2) / this.trackWidth;
			let v = 1 - (zV + this.trackHeight / 2) / this.trackHeight;

			// Calculate the center pixel position
			const xCenter = Math.floor(u * this.image.width);
			const yCenter = Math.floor(v * this.image.height);

			// Initialize sums of RGB values
			let sumR = 0,
				sumG = 0,
				sumB = 0;
			let count = 0;

			// Loop over a 4 by 4 block centered around the (xCenter, yCenter)
			for (let dx = -2; dx <= 1; dx++) {
				for (let dy = -2; dy <= 1; dy++) {
					const x = xCenter + dx;
					const y = yCenter + dy;

					// Make sure we don't go outside the image boundaries
					if (x >= 0 && x < this.image.width && y >= 0 && y < this.image.height) {
						const position = (y * this.image.width + x) * 4; // 4 for RGBA
						const r = this.imageData.data[position];
						const g = this.imageData.data[position + 1];
						const b = this.imageData.data[position + 2];

						sumR += r;
						sumG += g;
						sumB += b;
						count++;
					}
				}
			}

			// Calculate averages
			const avgR = sumR / count;
			const avgG = sumG / count;
			const avgB = sumB / count;

			this.rgbTextureValue[i] = { r: avgR, g: avgG, b: avgB };
		}
	}

	/**
	 * @description: update the pen color
	 * @param {string} color // the color of the pen in hex format
	 * @returns {void} // update the pen color
	 * */
	changePenColor(color) {
		this.penColor = color;
		const testLine = this.experience.scene.getObjectByName('trajectoryLine');
		if (testLine) {
			if (testLine.material) {
				testLine.material.color.set(color);
			}
		}
	}

	/**
	 *
	 * @param {string} type // type of line to destroy; simulation:trajectoryLineSimulation, real robot line path:trajectoryLine)
	 */
	destroyLineTrajectory(type) {
		this.activateLineTrajectory = false;
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
		this.activateLineTrajectory = true;
		const testLine = this.experience.scene.getObjectByName(type);
		if (testLine) {
			if (testLine.geometry) testLine.geometry.dispose();
			if (testLine.material) testLine.material.dispose();
			this.experience.scene.remove(testLine);
		}
		const globalPosition = new THREE.Vector3();
		const chassis = this.experience.hierarchie['chassis'].getWorldPosition(globalPosition);
		const points = [];
		points.push(chassis);
		points.push(chassis);

		const spline = new THREE.CatmullRomCurve3(points);
		const divisions = Math.round(10 * points.length);
		let positions = [];
		// Calcul des positions le long de la spline
		for (let i = 0, l = divisions; i < l; i++) {
			const t = i / l;
			const point = spline.getPoint(t);
			positions.push(point.x, point.y, point.z);
		}

		const color = type === 'trajectoryLine' ? this.penColor : 0xff0000;
		const lineMaterial = new LineMaterial({ color, linewidth: 0.005 });
		const lineGeometry = new LineGeometry();
		lineGeometry.setPositions(positions);
		// lineGeometry.setFromPoints(points);

		const line = new Line2(lineGeometry, lineMaterial);
		line.name = type;

		line.scale.set(1, 1, 1);

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
		const chassis = this.experience.hierarchie['chassis'].getWorldPosition(globalPosition);

		// update points array
		if (type === 'trajectoryLine') {
			if (!this.pointsArrayLine) {
				this.pointsArrayLine = [];
			}
			if (chassis) {
				this.pointsArrayLine.push(chassis.clone());
			}
		} else {
			if (!this.pointsArrayLineSimulation) {
				this.pointsArrayLineSimulation = [];
			}
			if (chassis) {
				this.pointsArrayLineSimulation.push(chassis.clone());
			}
		}
		let positions = [];

		// select the array depending on the type of line
		const pointsArray = type === 'trajectoryLine' ? this.pointsArrayLine : this.pointsArrayLineSimulation;
		// make the points array not too big => suppress points if too big to avoid performance issues (you can adjust the number of points to keep in the array)
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

		// update line geometry with new geometry
		line.geometry = new LineGeometry();
		line.geometry.setPositions(positions);
	}

	/**
	 * @description: reset the line trajectory
	 * @param {string} type // the type of line to reset (trajectoryLine or trajectoryLineSimulation)
	 * @returns {void} // reset the line trajectory
	 **/
	resetLineTrajectory(type) {
		if (type === 'trajectoryLine') {
			this.pointsArrayLine = [];
		} else {
			this.pointsArrayLineSimulation = [];
		}
	}

	/**
	 * @description: draw the axis grid for the scene. The first call will draw the grid, the next calls will show or hide the grid
	 * @returns {void} // draw the axis grid for the scene
	 **/
	drawAxisGrid() {
		const spacing = 1;
		const ground = this.experience.scene.getObjectByName('ground_track');
		const width = ground.geometry.parameters.width;
		const height = ground.geometry.parameters.height;
		const groundPos = ground.position;

		const groupLines = new THREE.Group();


		const groundMinX = groundPos.x - width / 2;
		const groundMaxX = groundPos.x + width / 2;
		const groundMinZ = groundPos.z - height / 2;
		const groundMaxZ = groundPos.z + height / 2;

		const startPosX = groundPos.x + this.startingPosGrid.x;
		const startPosZ = groundPos.z + this.startingPosGrid.z;

		const numLinesXPositive = Math.floor((groundMaxX - startPosX) / spacing);
		const numLinesXNegative = Math.floor((startPosX - groundMinX) / spacing);
		const numLinesZPositive = Math.floor((groundMaxZ - startPosZ) / spacing);
		const numLinesZNegative = Math.floor((startPosZ - groundMinZ) / spacing);

		for (let i = -numLinesXNegative; i <= numLinesXPositive; i++) {
			const xPosition = startPosX + i * spacing;
			const lineX = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(xPosition, 0.01, groundMinZ), new THREE.Vector3(xPosition, 0.01, groundMaxZ)]), new THREE.LineBasicMaterial({ color: 0x000000 }));
			groupLines.add(lineX);
		}

		for (let i = -numLinesZNegative; i <= numLinesZPositive; i++) {
			const zPosition = startPosZ + i * spacing;
			const lineZ = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(groundMinX, 0.01, zPosition), new THREE.Vector3(groundMaxX, 0.01, zPosition)]), new THREE.LineBasicMaterial({ color: 0x000000 }));
			groupLines.add(lineZ);
		}

		groupLines.name = 'axisGrid';

		const colorX = 0xff0000;
		const lineMaterial = new LineMaterial({ color: colorX, linewidth: 0.01 });
		const lineAxisX = new LineGeometry();

		lineAxisX.setPositions([groundMinX, 0.01, this.startingPosGrid.z, groundMaxX, 0.01, this.startingPosGrid.z]);
		const lineXX = new Line2(lineAxisX, lineMaterial);
		lineXX.name = 'lineAxisX';
		this.experience.scene.add(lineXX);

		const colorZ = 0x0000ff;
		const lineMaterialZ = new LineMaterial({ color: colorZ, linewidth: 0.01 });
		const lineAxisZ = new LineGeometry();

		lineAxisZ.setPositions([this.startingPosGrid.x, 0.01, groundMinZ, this.startingPosGrid.x, 0.01, groundMaxZ]);
		const lineZZ = new Line2(lineAxisZ, lineMaterialZ);
		lineZZ.name = 'lineAxisZ';
		this.experience.scene.add(lineZZ);

		this.experience.scene.add(groupLines);
	}

	initGridAxis() {
		if (this.experience.gridAxisActivated) {
			const axisGroup = this.experience.scene.getObjectByName('axisGrid');
			const axisX = this.experience.scene.getObjectByName('lineAxisX');
			const axisZ = this.experience.scene.getObjectByName('lineAxisZ');
			if (axisGroup) axisGroup.visible = true;
			if (axisX) axisX.visible = true;
			if (axisZ) axisZ.visible = true;
			this.experience.needGridAxis = true;
		} else {
			this.experience.gridAxisActivated = true;
			this.experience.needGridAxis = true;
			this.drawAxisGrid();
			const axisHandle = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
			axisHandle.position.set(this.startingPosGrid.x, 0.01, this.startingPosGrid.z);
			axisHandle.name = 'axisHandle';
			axisHandle.visible = false;
			const axisGroup = this.experience.scene.getObjectByName('axisGrid');
			const axisX = this.experience.scene.getObjectByName('lineAxisX');
			const axisZ = this.experience.scene.getObjectByName('lineAxisZ');
			if (axisGroup) axisGroup.visible = true;
			if (axisX) axisX.visible = true;
			if (axisZ) axisZ.visible = true;
			this.experience.scene.add(axisHandle);
		}
	}

	hideGridAxis() {
		const axisGroup = this.experience.scene.getObjectByName('axisGrid');
		const axisX = this.experience.scene.getObjectByName('lineAxisX');
		const axisZ = this.experience.scene.getObjectByName('lineAxisZ');
		if (axisGroup) axisGroup.visible = false;
		if (axisX) axisX.visible = false;
		if (axisZ) axisZ.visible = false;
		this.startingPosGrid = new THREE.Vector3(-0.5, 0, 0);
		this.experience.needGridAxis = false;
	}

	updateLEDColor(r, g, b, ringOnly = false) {
		const ledsCircle = Object.keys(this.LEDMatrixCircle);
		for (let i = 0; i < ledsCircle.length; i++) {
			const led = this.experience.hierarchie[ledsCircle[i]];
			led.material.color = new THREE.Color().setRGB(r, g, b);
			// led.material.emissive = new THREE.Color().setRGB(r, g, b);
			// led.material.emissiveIntensity = 0.1;
			// led.material.opacity = 0.1;
			led.visible = true;
			this.LEDMatrixCircle[ledsCircle[i]] = { color: { r, g, b }, intensity: 1.5, id: i };
		}

		if (ringOnly) return;

		const ledsCenter = Object.keys(this.LEDMatrixCenter);
		for (let i = 0; i < ledsCenter.length; i++) {
			const led = this.experience.hierarchie[ledsCenter[i]];
			led.material.color = new THREE.Color().setRGB(r, g, b);
			// led.material.emissive = new THREE.Color().setRGB(r, g, b);
			// led.material.emissiveIntensity = 0.5;
			led.visible = true;
			this.LEDMatrixCenter[ledsCenter[i]] = { color: { r, g, b }, intensity: 1.5, id: i };
		}
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

	initLEDSystem() {
		const ledGlow = this.experience.hierarchie['LED_GLOW'];
		ledGlow.material = new THREE.MeshPhysicalMaterial({
			roughness: 0,
			transmission: 0.99, // Add transparency
		});
		ledGlow.material.transparent = true;
		// ledGlow.visible = false;
		const ledMatrixCenterCount = 45;
		const ledMatrixCircleCount = 15;
		const color = { r: 0, g: 0, b: 0 };
		const ledIntensity = Math.max(Math.max(color.r, color.g, color.b), (color.r + color.g + color.b) / 3); // Intensité basée sur la couleur la plus lumineuse
		for (let i = 1; i < ledMatrixCenterCount + 1; i++) {
			const led = this.experience.hierarchie[`led_matrix_center_${i}`];
			this.LEDMatrixCenter[`led_matrix_center_${i}`] = { color, intensity: ledIntensity, id: i - 1 };
			led.material.color = new THREE.Color(color.r, color.g, color.b);
			led.material.emissive = new THREE.Color(color.r, color.g, color.b);
			led.material.emissiveIntensity = 1.5;
		}

		for (let i = 1; i < ledMatrixCircleCount + 1; i++) {
			const led = this.experience.hierarchie[`led_matrix_circle_${i}`];
			this.LEDMatrixCircle[`led_matrix_circle_${i}`] = { color, intensity: ledIntensity, id: i - 1 };
			led.material.color = new THREE.Color(color.r, color.g, color.b);
			led.material.emissive = new THREE.Color(color.r, color.g, color.b);
			led.material.emissiveIntensity = ledIntensity;
			led.material.opacity = 1;
		}

		const glowShader = (intensity) => {
			return {
				uniforms: {
					glowIntensity: { value: intensity },
					u_time: { value: 0.0 },
					glowColor: { value: new THREE.Color(color) },
					viewVector: { value: this.experience.camera.modes.debug.instance.position },
				},
				vertexShader: `
					uniform vec3 viewVector;
					varying float intensity;
					
		
					void main() {
						vec3 vNormal = normalize(normalMatrix * normal);
						vec3 modelViewPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
						vec3 vNormView = normalize(viewVector - modelViewPosition);
						intensity = pow(dot(vNormal, vNormView), 2.0);
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					}
				`,
				fragmentShader: `
					uniform vec3 glowColor;
					varying float intensity;
					uniform float glowIntensity;
		
					void main() {
						vec3 glow = glowColor * intensity;
						gl_FragColor = vec4(glow, glowIntensity);
					}
				`,
				transparent: true,
				blending: THREE.AdditiveBlending,
				side: THREE.FrontSide,
			};
		};

		const glowMaterial1 = new THREE.ShaderMaterial(glowShader(0.5));
		ledGlow.material = glowMaterial1;
	}
	setLedShape(shape) {
		const ledCenter = Object.keys(this.LEDMatrixCenter);
		const shapeMatrix = ledsArrayCenter[shape];
		for (let i = 0; i < ledCenter.length; i++) {
			const led = this.experience.hierarchie[ledCenter[i]];
			// led.visible = shapeMatrix.includes(i);
			led.visible = true;
			if (!shapeMatrix.includes(i)) {
				// led.visible = false;
				led.material.color = new THREE.Color().setRGB(0, 0, 0);
			} else {
				let color = this.LEDMatrixCenter[ledCenter[i]].color;
				if (color.r === 0 && color.g === 0 && color.b === 0) {
					color = { r: 102 / 255, g: 1, b: 1 };
				}
				led.material.color = new THREE.Color().setRGB(color.r, color.g, color.b);
				this.updateLEDColor(color.r, color.g, color.b, true);
			}
		}
	}

	updateGridSystem(newX, newZ) {
		this.startingPosGrid.set(newX, 0, newZ);

		// Supprimer l'ancienne grille et les axes
		const oldGroup = this.experience.scene.getObjectByName('axisGrid');
		const oldAxisX = this.experience.scene.getObjectByName('lineAxisX');
		const oldAxisZ = this.experience.scene.getObjectByName('lineAxisZ');
		if (oldGroup) this.experience.scene.remove(oldGroup);
		if (oldAxisX) this.experience.scene.remove(oldAxisX);
		if (oldAxisZ) this.experience.scene.remove(oldAxisZ);

		this.drawAxisGrid();
	}
}

window.Simulator3D = new Simulator3d(config);
