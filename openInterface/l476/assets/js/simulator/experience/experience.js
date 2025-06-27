import Experience from '/openInterface/interfaces/assets/js/simulator3d/Experience.js';
import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';
// import * as dat from '/openInterface/interfaces/assets/js/simulator3d/libs/lil-gui.js';
import config from './config.js';
// import Gui from './utils/debug.js';

// lines 3D (kind of tube geometry)
import { Line2 } from '/openInterface/interfaces/assets/js/simulator3d/libs/Line2.js';
import { LineMaterial } from '/openInterface/interfaces/assets/js/simulator3d/libs/LineMaterial.js';
import { LineGeometry } from '/openInterface/interfaces/assets/js/simulator3d/libs/LineGeometry.js';
import { OBB } from '/openInterface/interfaces/assets/js/simulator3d/libs/OBB.js';

import TransformControl from './utils/transformControls.js';
import ObstacleUtils from './utils/obstaclesUtils.js';
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
		this.robotSimulator = new RobotSimulator3D(this, 'Donutbot');
		this._loadHierarchie(); // important to load the hierarchie before init the simulator and access to the 3D model elements

		// Donutbot-robot specific
		this.topView = false;
		this.penColor = '#ff9603';
		this.backgroundChoice = '/openInterface/esp32/assets/js/simulator/experience/textures/piste_kit_4.png';
		this.rgbTextureValue = [{}, {}, {}];
		this.speed = 10;
		this.angle = 0;
		this.speedRotation = 10; // ms/deg
		this.flagForStopSimulation = false;
		this.pointsArrayLine = [];
		this.activateLineTrajectory = false;
		this.startingPosGrid = new THREE.Vector3(-0.5, 0, 0);
		this.gridAxisActivated = false;
		

		this.distanceSensors = {
			F_distance_sensor: {
				direction: { x: 1, y: 0, z: 0 },
				color: 0x0000ff,
				visible: false,
			},
		};
		this.distanceToBarrier = {
			F_distance_sensor: 0,
		};

		Simulator3d.instance = this; // singleton
	}

	/**
	 * Init the simulator, sliders and buttons
	 * @return {void} // init the simulator
	 */
	async _init() {
		const getImageDataBackground = JSON.parse(localStorage.simulatorData);
		let background = null;
		try {
			const interfaceImageDataBackground = getImageDataBackground[INTERFACE_NAME];
			if (typeof interfaceImageDataBackground !== 'undefined' && typeof interfaceImageDataBackground.backgrounds !== 'undefined' && typeof interfaceImageDataBackground.backgrounds.Donutbot !== 'undefined') {
				background = interfaceImageDataBackground.backgrounds.Donutbot;
			}
		} catch (error) {
			console.error('error loading background', error);
		}
		if (background !== null && typeof background !== 'undefined') {
			await this.updateBackground(background);
		} else {
			await this.updateBackground('/openInterface/interfaces/assets/media/simulator/robot/backgrounds/piste_kit_1.png');
		}


		// initTransparent material
		const transparentMaterial = new THREE.MeshPhysicalMaterial({
			roughness: 0.1,
			transmission: 0.8, // Add transparency
		});

		const fence = this.experience.hierarchie['Safety_Gate'];
		if (fence) {
			fence.material = transparentMaterial;
		}

		this.createTubeDistanceSensor();
		this.experience.movementObjectFunctions.getDistanceSensor = this.getDistanceSensor.bind(this);

		const fenceInvisible = ['F_fence', 'B_fence', 'R_fence', 'L_fence'];
		for (let i = 0; i < fenceInvisible.length; i++) {
			this.experience.hierarchie[fenceInvisible[i]].visible = false;
		}

		this.startCollectRGB();
		this.checkCollision();
		if (this.options.enablePhysics) {
			this.initPhysics();
		}
		this.initObstacleUtils();
		this.initTranformControls();
		this.initFakeGizmo();
		this.isReady = true;
	}

	toogleRobotSim(visibility) {
		// console.log('toogleRobotSim', visibility);
		const hideRobotSimulation = document.getElementById('robot-sim');
		hideRobotSimulation.style.display = visibility ? 'none' : 'block';
		// hideRobotSimulation.style.height = visibility ? '0px' : '500px';

		const experience3d = document.getElementById('experience-3d-container');
		experience3d.style.display = visibility ? 'flex' : 'none';
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

	/**
	 * Load the 3D model and create the hierarchie of the robot, store it in this.experience.hierarchie
	 *
	 * @private
	 * @return {void} // create the hierarchie of the robot => this.experience.hierarchie
	 **/
	_loadHierarchie() {
		setTimeout(() => {
			const robotSimElement = document.getElementById('robot-sim');
			if (this.experience.loaded && robotSimElement !== null) {
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
							if (child.name.match(/(bounding_box_physics|wheel_L|wheel_R)/g)) {
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
		// this.robotSimulator.isRunning = false;
		if (!this.isReady || Simulator._classicRobotSimulatorPrepareForRun) return;

		this.LEDMatrix = {};

		this.initLEDSystem();
		this.robotSimulator.resetSystem();

		this.removeTransformControls();
		this.removeObstacles();
		this.addObstacles();
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
		const Donutbot = this.experience.hierarchie['chassis'];
		const angleRad = -(angle * Math.PI) / 180;
		Donutbot.rotation.set(0, angleRad, 0);
		Donutbot.updateMatrixWorld();
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

		this.experience.movementObjectFunctions.checkCollision = check.bind(this);
	}

	/**
	 * @description: Push back function to push back the robot when it collides with the fence obstacles (reversed direction)
	 * @param {string} fenceName // the name of the fence obstacle
	 * @returns {void} // push back the robot when it collides with the fence obstacles
	 * */
	pushBackFence(fenceName) {
		const Donutbot = this.experience.hierarchie['chassis'];
		const position = Donutbot.position;
		const pushbackDistance = 0.1;

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
		const Donutbot = this.experience.hierarchie['chassis'];
		const position = Donutbot.position;
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
		const ds = ['F_distance_sensor'];
		for (let i = 0; i < ds.length; i++) {
			const shaderMaterial = new THREE.ShaderMaterial({
				uniforms: {
					color: { value: new THREE.Color(0xff0055) },
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
		const distanceSensors = ['F_distance_sensor'];
		const slidersId = ['donutbot-distanceFront_slider'];
		const sliderSlot = ['donutbot-distanceFront'];
		
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

			if (intersects.length > 0) {
				const distance = intersects[0].distance;
				this.distanceToBarrier[distanceSensors[i]] = distance;

				let distanceValue = 0.001;
				if (sliderEl) {
					distanceValue = distance;
					try {
						Simulator.setSliderValue(sliderSlot[i], distanceValue * 100);
					} catch (error) {
						this.debug && console.warn('error slider', error);
					}
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
					plane.position.set(0, -0.05, 0);
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

		// select the array depending on the type of line (simulator or real robot for niryo but may be added for other robots in the future)
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

		// update line geometry with new geometry, maybe
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

	updateLEDColor(r, g, b, index = false) {
		if (index) {
			const led = this.experience.hierarchie[`led_${index}`];
			led.material.color = new THREE.Color(r, g, b);
			led.material.emissive = new THREE.Color(r, g, b);
			led.material.emissiveIntensity = 1.5;
			led.visible = true;
			this.LEDMatrix[`led_${index}`] = { color: { r, g, b }, intensity: 1.5, id: index };
			return;
		}

		const leds = Object.keys(this.LEDMatrix);
		for (let i = 0; i < leds.length; i++) {
			const led = this.experience.hierarchie[leds[i]];
			led.material.color = new THREE.Color().setRGB(r, g, b);
			// led.material.emissive = new THREE.Color().setRGB(r, g, b);
			// led.material.emissiveIntensity = 0.1;
			// led.material.opacity = 0.1;
			led.visible = true;
			this.LEDMatrix[leds[i]] = { color: { r, g, b }, intensity: 1.5, id: i };
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
		const ledMatrixCount = 8;
		const color = { r: 0, g: 0, b: 0 };
		const ledIntensity = Math.max(Math.max(color.r, color.g, color.b), (color.r + color.g + color.b) / 3); // Intensité basée sur la couleur la plus lumineuse
		for (let i = 1; i < ledMatrixCount + 1; i++) {
			const led = this.experience.hierarchie[`led_${i}`];
			this.LEDMatrix[`led_${i}`] = { color, intensity: ledIntensity, id: i - 1 };
			led.material.color = new THREE.Color(color.r, color.g, color.b);
			led.material.emissive = new THREE.Color(color.r, color.g, color.b);
			led.material.emissiveIntensity = 1.5;
		}

		const glowShader = (intensity) => {
			return {
				uniforms: {
					glowIntensity: { value: intensity },
					u_time: { value: 0.0 },
					glowColor: { value: new THREE.Color(color) }, // Couleur dynamique
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
				side: THREE.FrontSide, // Applique uniquement sur la face avant
			};
		};

		// Appliquer le shader directement sur le mesh
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
