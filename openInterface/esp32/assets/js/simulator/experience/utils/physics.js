import * as CANNON from '/openInterface/interfaces/assets/js/simulator3d/libs/physics/cannon.js';
import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';

import cannonEsDebugger from '/openInterface/interfaces/assets/js/simulator3d/libs/physics/cannonEsDebugger.js';


export default class Physics {
	constructor(experience, exp) {
		this.exp = exp;
		this.experience = experience;
		this.world = new CANNON.World();
		this.world.gravity.set(0, -9.81, 0);
		this.cannonDebugger = new cannonEsDebugger(this.experience.scene, this.world, {
			autoUpdate: true,
			color: 0xff0000,
		});
		this.debug = this.experience.devDebug;
		this.bodies = {};
		this.experience.collisionElement = [];
		this.experience.collisionDetected = false;
		this.disablePhysics = false;
		this.steeringWheelsValues = [0, 0, 0, 0];
		this.isResetting = false;
		this.isRotating = false;
		this.resetTimeout = null;
		this.offset = 0.5;
		this.isDragging = false;
		this.initPosition = { x: 0, z: 0 };
		this.currentAngle = 0;
		this.isPaused = false;
		this.computeRotation = false;
		this.computeDragging = false;
		this.frontLeftSpeed = 0;
		this.frontRightSpeed = 0;
		this.backLeftSpeed = 0;
		this.backRightSpeed = 0;
		this.frontLeftLocked = true;
		this.frontRightLocked = true;
		this.backLeftLocked = true;
		this.backRightLocked = true;
		this.moveInterval = null;
		this.isReady = false;
	}

	init() {
		const groundBody = new CANNON.Body({
			type: CANNON.Body.STATIC,
			// infinte geometric plane
			shape: new CANNON.Plane(),
		});
		// rotate ground body by 90 degrees
		groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
		groundBody.userData = {
			name: 'ground',
			type: 'ground',
		};
		groundBody.position.y = 0;
		groundBody.material = new CANNON.Material({ friction: 0.5, restitution: 0 });
		this.groundBody = groundBody;
		this.world.addBody(groundBody);

		const fixedTimeStep = 1.0 / 60.0; // seconds (from 60 fps, set in the renderer => setAnimationLoop in Experience.js)
		const maxSubSteps = 3;
		let lastTime = null;
		this.createRobotBody();
		this.addFence();
		const animate = () => {
			try {
				if (lastTime !== null) {
					if (this.exp.activateLineTrajectory) {
						this.exp.updateLineTrajectory('trajectoryLine');
					}
					if (!this.disablePhysics) {
						const dt = (performance.now() - lastTime) / 1000;
						this.syncBodies();

						if (this.debug) this.cannonDebugger.update();
						this.world.step(fixedTimeStep, dt, maxSubSteps);
					}
				}

				if (this.debug) {
					this.debuggerActive = true;
				}

				lastTime = performance.now();
			} catch (error) {
				console.log(error);
			}
		};

		// animate render loop
		this.experience.movementObjectFunctions.physicsUpdate = animate.bind(this);
	}

	resetPosition() {
		// this.stopWheels();
		this.isResetting = true;
	}

	setDragging(dragging) {
		this.isDragging = dragging;
	}

	setRotating(rotating) {
		this.isRotating = rotating;
	}

	stopVelocity() {
		for (const body in this.bodies) {
			this.bodies[body].body.velocity.set(0, 0, 0);
			this.bodies[body].body.angularVelocity.set(0, 0, 0);
		}
	}

	stopWheels() {
		this.vehicle.setWheelForce(0, 0);
		this.vehicle.setWheelForce(0, 1);
		this.vehicle.setWheelForce(0, 2);
		this.vehicle.setWheelForce(0, 3);
	}

	createRobotBody() {
		const chassis = this.experience.hierarchie['chassis'];
		const chassisMesh = chassis;
		const chassisBoundingBox = this.experience.hierarchie['bounding_box_physics'];
		const size = new THREE.Vector3();
		const chassisBox = new THREE.Box3().setFromObject(chassisBoundingBox);

		const worldPosition = new THREE.Vector3();
		chassisBoundingBox.getWorldPosition(worldPosition);

		const worldQuaternion = new THREE.Quaternion();
		chassisBoundingBox.getWorldQuaternion(worldQuaternion);

		const chassisSize = chassisBox.getSize(size);
		const chassisHalfSize = new CANNON.Vec3(chassisSize.x / 2, chassisSize.y / 2, chassisSize.z / 2);

		const chassisBody = new CANNON.Body({
			mass: 150,
			position: new CANNON.Vec3(0, 0 + this.offset, 0),
			quaternion: new CANNON.Quaternion(0, 0, 0, 1),
			shape: new CANNON.Box(chassisHalfSize),
			material: new CANNON.Material({ friction: 0, restitution: 0 }),
		});

		const vehicle = new CANNON.RigidVehicle({ chassisBody: chassisBody });

		const wheelRadius = 0.26;
		const wheelHeight = 0.22;
		const wheelMass = 40;
		this.wheelMaterial = new CANNON.Material('wheel');

		const wheelMeshSimple = ['FL_wheel', 'FR_wheel', 'BL_wheel', 'BR_wheel'];
		if (this.debug) {
			wheelMeshSimple.forEach((wheel) => {
				const mesh = this.experience.hierarchie[wheel];
				mesh.visible = false;
			});
		}

		const wheelMeshes = [this.experience.hierarchie['wheel_FL'], this.experience.hierarchie['wheel_FR'], this.experience.hierarchie['wheel_BL'], this.experience.hierarchie['wheel_BR']];

		wheelMeshes.forEach((wheel) => {
			wheel.visible = false;
		});

		const wheelPosArray = {
			wheel_FL: new THREE.Vector3(chassisHalfSize.x - 0.39, 0.3, -chassisHalfSize.z - 0.15),
			wheel_FR: new THREE.Vector3(chassisHalfSize.x - 0.39, 0.3, chassisHalfSize.z + 0.15),
			wheel_BL: new THREE.Vector3(-chassisHalfSize.x + 0.5, 0.3, -chassisHalfSize.z - 0.15),
			wheel_BR: new THREE.Vector3(-chassisHalfSize.x + 0.5, 0.3, chassisHalfSize.z + 0.15),
		};

		wheelMeshes.forEach((wheelMesh) => {
			const reversed = wheelMesh.name.includes('FR') || wheelMesh.name.includes('BL');

			const wheelPos = wheelPosArray[wheelMesh.name];

			wheelPos.y -= wheelRadius + 0.3;

			const wheelBody = new CANNON.Body({
				mass: wheelMass,
				material: this.wheelMaterial,
			});

			const wheelShape = new CANNON.Cylinder(wheelRadius, wheelRadius, wheelHeight, 20);
			const wheelQuaternion = new CANNON.Quaternion();
			wheelQuaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);

			wheelBody.addShape(wheelShape, new CANNON.Vec3(0, 0, 0), wheelQuaternion);
			wheelBody.linearDamping = 0.8;
			wheelBody.angularDamping = 0.8;


			vehicle.addWheel({
				body: wheelBody,
				position: new CANNON.Vec3(wheelPos.x, wheelPos.y, wheelPos.z),
				axis: new CANNON.Vec3(0, 0, 1),
				direction: new CANNON.Vec3(0, -1, 0),
				isFrontWheel: true,
			});

			wheelBody.userData = {
				name: wheelMesh.name,
				type: 'wheel',
				initPosition: new CANNON.Vec3(wheelPos.x, wheelPos.y + this.offset, wheelPos.z),
				resetPosition: new CANNON.Vec3(wheelPos.x, wheelPos.y + this.offset, wheelPos.z),
				initQuaternion: new CANNON.Quaternion(0, 0, 0, 1),
			};

			this.bodies = {
				...this.bodies,
				[wheelMesh.name]: {
					body: wheelBody,
					mesh: wheelMesh,
				},
			};
			const numRollers = 9;
			const rollerRadius = wheelRadius * 0.17;
			const rollerLength = wheelHeight;
			const rollerMass = wheelMass / 6;

			for (let i = 0; i < numRollers; i++) {
				const angle = (i / numRollers) * Math.PI * 2;

				const rollerPos = new CANNON.Vec3((wheelRadius - rollerRadius * 0.5) * Math.cos(angle), (wheelRadius - rollerRadius * 0.5) * Math.sin(angle), 0);

				const rollerBody = new CANNON.Body({
					mass: rollerMass,
					material: this.wheelMaterial,
					position: new CANNON.Vec3(wheelPos.x + rollerPos.x, wheelPos.y, wheelPos.z + rollerPos.z),
				});

				const centralRadius = rollerRadius;
				const endRadius = rollerRadius * 0.5;
				const centralLength = rollerLength * 0.5;
				const endLength = (rollerLength - centralLength) * 0.8;

				const centralShape = new CANNON.Cylinder(centralRadius, centralRadius, centralLength, 10);

				const topCone = new CANNON.Cylinder(centralRadius, endRadius, endLength, 10);
				const bottomCone = new CANNON.Cylinder(endRadius, centralRadius, endLength, 10);

				const rollerQuaternion = new CANNON.Quaternion();
				rollerQuaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 4);

				rollerBody.addShape(centralShape, new CANNON.Vec3(0, 0, 0), rollerQuaternion);
				rollerBody.addShape(topCone, new CANNON.Vec3(0, -centralLength * 0.8, 0), rollerQuaternion);
				rollerBody.addShape(bottomCone, new CANNON.Vec3(0, centralLength * 0.8, 0), rollerQuaternion);

				const rollerAxis = new CANNON.Vec3(-Math.sin(angle), Math.cos(angle), reversed ? -Math.PI / 4 : Math.PI / 4).scale(Math.SQRT1_2);

				this.world.addBody(rollerBody);
				const rollerConstraint = new CANNON.HingeConstraint(wheelBody, rollerBody, {
					pivotA: rollerPos,
					pivotB: new CANNON.Vec3(0, 0, 0),
					axisA: rollerAxis,
					axisB: new CANNON.Vec3(0, 1, 0),
				});

				const rollerWorldPos = new CANNON.Vec3(wheelPos.x + rollerPos.x, wheelPos.y + this.offset, wheelPos.z + rollerPos.z);

				rollerBody.userData = {
					name: 'roller',
					type: 'roller',
					initPosition: rollerWorldPos,
					resetPosition: rollerWorldPos,
					initQuaternion: new CANNON.Quaternion(0, 0, 0, 1),
				};

				const mat2 = new CANNON.ContactMaterial(this.groundBody.material, this.wheelMaterial, {
					friction: 45,
					restitution: 0.1,
					contactEquationStiffness: 1e4,
					contactEquationRelaxation: 3,
					frictionEquationStiffness: 1e4,
					frictionEquationRelaxation: 3,
				});

				this.world.addContactMaterial(mat2);

				this.world.addConstraint(rollerConstraint);
				this.bodies = {
					...this.bodies,
					[`${wheelMesh.name}-roller-${i}`]: {
						body: rollerBody,
						mesh: wheelMesh,
					},
				};
			}
		});

		const mat1 = new CANNON.ContactMaterial(this.groundBody.material, this.wheelMaterial, { friction: 50, restitution: 0 });
		this.world.addContactMaterial(mat1);
		this.chassisBody = chassisBody;
		chassisBody.userData = {
			name: 'chassis',
			type: 'box-body',
			initPosition: new CANNON.Vec3(0, 0 + this.offset, 0),
			resetPosition: new CANNON.Vec3(0, 0 + this.offset, 0),
			initQuaternion: new CANNON.Quaternion(0, 0, 0, 1),
		};

		this.bodies = {
			...this.bodies,
			chassis: {
				body: chassisBody,
				mesh: chassisMesh,
			},
		};

		vehicle.addToWorld(this.world);
		this.vehicle = vehicle;
	}

	// add fence (Arena)
	addFence() {
		// (F|B|R|L)_fence
		const fenceArray = ['F', 'B', 'R', 'L'];
		const fenceMaterial = new CANNON.Material('fence');
		for (const fence of fenceArray) {
			const mesh = this.experience.hierarchie[`${fence}_fence`];
			const fenceBox = new THREE.Box3().setFromObject(mesh);
			const size = new THREE.Vector3();
			const fenceSize = fenceBox.getSize(size);
			const fenceHalfSize = new CANNON.Vec3(fenceSize.x / 2, fenceSize.y / 2, fenceSize.z / 2);
			const fenceBody = new CANNON.Body({
				mass: 0,
				shape: new CANNON.Box(fenceHalfSize),
				material: fenceMaterial,
			});
			const worldPosition = new THREE.Vector3();
			mesh.getWorldPosition(worldPosition);
			fenceBody.position.set(worldPosition.x, worldPosition.y, worldPosition.z);
			this.world.addBody(fenceBody);
			fenceBody.userData = {
				name: `${fence}_fence`,
				type: 'box-body',
			};
		}
	}

	updateInitialPosition() {}

	pause() {
		this.isPaused = true;
	}

	play() {
		this.isPaused = false;
	}

	clearIntervals() {
		this.stopVelocity();
		this.stop();
		clearInterval(this.moveInterval);
	}

	syncBodies() {
		if (this.disablePhysics) return;
		if (this.isResetting) {
			this.isReady = false;
			this.isResetting = false;
			this.stopVelocity();
			this.computeRotation = false;
			this.computeDragging = false;
			this.isRotating = false;
			this.isDragging = false;

			try {
				// Reset le chassis d'abord
				const chassisBody = this.bodies['chassis'].body;
				if (chassisBody.userData.initPosition) {
					const chassisResetPos = new CANNON.Vec3(Number(chassisBody.userData.initPosition.x) + Number(this.initPosition.x), chassisBody.userData.initPosition.y, Number(chassisBody.userData.initPosition.z) + Number(this.initPosition.z));
					chassisBody.position.copy(chassisResetPos);
				}
				if (chassisBody.userData.initQuaternion) {
					chassisBody.quaternion.copy(chassisBody.userData.initQuaternion);
				}

				// Reset les autres éléments relativement au chassis
				for (const [key, el] of Object.entries(this.bodies)) {
					const { body } = el;
					if (key !== 'chassis') {
						// Skip le chassis car déjà fait
						if (body.userData.initQuaternion) {
							body.quaternion.copy(body.userData.initQuaternion);
						}
						if (body.userData.initPosition && body.userData.resetPosition) {
							// Utiliser resetPosition pour les offsets relatifs
							const resetPos = new CANNON.Vec3(Number(chassisBody.position.x) + Number(body.userData.resetPosition.x), body.userData.initPosition.y, Number(chassisBody.position.z) + Number(body.userData.resetPosition.z));
							body.position.copy(resetPos);
						}
					}
				}
			} catch (error) {
				console.log(error);
			}
			this.isReady = true;

			return;
		}
		if (this.isDragging && !this.isRotating) {
			this.stopVelocity();
			this.isRotating = false;
			this.computeRotation = false;
			if (!this.computeDragging) return;
			const chassisBody = this.experience.hierarchie['chassis'];
			for (const [key, el] of Object.entries(this.bodies)) {
				const { body } = el;
				if (body.userData.initQuaternion) {
					body.quaternion.copy(body.userData.initQuaternion);
				}
				if (body.userData.initPosition) {
					// Appliquer l'offset du chassis
					body.position.set(chassisBody.position.x + body.userData.resetPosition.x, body.userData.initPosition.y, chassisBody.position.z + body.userData.resetPosition.z);
				}
			}
			this.isDragging = false;
			this.computeDragging = false;
			return;
		}
		if (this.isRotating && !this.isDragging) {
			this.stopVelocity();
			if (!this.computeRotation) return;

			const chassisMesh = this.experience.hierarchie['chassis'];
			const chassisBody = this.bodies['chassis'].body;

			const quaternion = new CANNON.Quaternion();
			let angleInRadians = (chassisMesh.rotation.y + 2 * Math.PI) % (2 * Math.PI);
			quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), angleInRadians);

			// Appliquer et sauvegarder la rotation pour le chassis
			chassisBody.quaternion.copy(quaternion);
			chassisBody.userData.initQuaternion = new CANNON.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);

			// const wheelArray = ['wheel_L', 'wheel_R', 'physics_support_back', 'physics_support_front'];
			// for (const wheel of wheelArray) {
			for (const [key, el] of Object.entries(this.bodies)) {
				const { body } = el;
				if (key !== 'chassis' && body.userData.initQuaternion) {
					const wheelMesh = this.bodies[key].mesh;
					const wheelBody = this.bodies[key].body;

					// Appliquer la rotation
					wheelBody.quaternion.copy(quaternion);

					// Calculer la nouvelle position mondiale
					const worldPosition = wheelMesh.getWorldPosition(new THREE.Vector3());
					wheelBody.position.copy(new CANNON.Vec3(worldPosition.x, worldPosition.y, worldPosition.z));

					// Calculer l'offset relatif par rapport au chassis après rotation
					const relativeX = worldPosition.x - chassisBody.position.x;
					const relativeZ = worldPosition.z - chassisBody.position.z;

					// Sauvegarder la rotation et la position relative
					wheelBody.userData.initQuaternion = new CANNON.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
					wheelBody.userData.resetPosition = new CANNON.Vec3(relativeX, wheelBody.userData.resetPosition.y, relativeZ);
					wheelBody.userData.initPosition = new CANNON.Vec3(worldPosition.x, worldPosition.y, worldPosition.z);
				}
			}

			this.isRotating = false;
			this.computeRotation = false;
			return;
		}
		if (this.isPaused) {
			this.stopVelocity();
			return;
		}

		for (const [key, el] of Object.entries(this.bodies)) {
			const { body, mesh, anchor } = el;
			if (body.userData.type === 'box-body') {
				let yOffset = 0;
				if (key === 'chassis') {
					yOffset = -0.2;
				}
				mesh.position.copy(body.position).add(new THREE.Vector3(0, yOffset, 0));
				mesh.quaternion.copy(body.quaternion);
			} else if (body.userData.type === 'obstacle') {
				body.position = new CANNON.Vec3(mesh.position.x, mesh.position.y, mesh.position.z);
				body.quaternion.set(mesh.quaternion.x, mesh.quaternion.y, mesh.quaternion.z, mesh.quaternion.w);
			}
		}
		if (this.vehicle) {
			this.updateWheelSpeed();
		}

		this.setAngularVelocity();
	}

	updateWheelSpeed() {
		const wheelEl = ['FL_wheel', 'FR_wheel', 'BL_wheel', 'BR_wheel'];
		const wheelSpeed = this.getWheelSpeed();
		for (let i = 0; i < wheelEl.length; i++) {
			const wheel = this.experience.hierarchie[wheelEl[i]];
			wheel.rotation.z += wheelSpeed[i] / 60;
		}
	}

	rotateRobot(rotationStrength) {
		const torqueFactor = 10;

		let torque = new CANNON.Vec3(0, rotationStrength * torqueFactor, 0);

		const applyTorque = (torque) => {
			this.vehicle.chassisBody.applyTorque(torque);
		};

		this.experience.movementObjectFunctions.addTorque = applyTorque.bind(this, torque);
	}

	move(direction, speed) {
		this.frontLeftLocked = true;
		this.frontRightLocked = true;
		this.backLeftLocked = true;
		this.backRightLocked = true;

		switch (direction) {
			case 'front':
				this.frontLeftSpeed = speed;
				this.frontRightSpeed = speed;
				this.backLeftSpeed = speed;
				this.backRightSpeed = speed;
				break;
			case 'back':
				this.frontLeftSpeed = -speed;
				this.frontRightSpeed = -speed;
				this.backLeftSpeed = -speed;
				this.backRightSpeed = -speed;
				break;
			case 'left':
				this.frontLeftSpeed = -speed;
				this.frontRightSpeed = speed;
				this.backLeftSpeed = speed;
				this.backRightSpeed = -speed;
				break;
			case 'right':
				this.frontLeftSpeed = speed;
				this.frontRightSpeed = -speed;
				this.backLeftSpeed = -speed;
				this.backRightSpeed = speed;
				break;
			case 'rot_trigo':
				this.frontLeftSpeed = -speed;
				this.frontRightSpeed = speed;
				this.backLeftSpeed = -speed;
				this.backRightSpeed = speed;
				break;
			case 'rot_clock':
				this.frontLeftSpeed = speed;
				this.frontRightSpeed = -speed;
				this.backLeftSpeed = speed;
				this.backRightSpeed = -speed;
				break;
			case 'stop':
				this.stop();
				break;
		}
	}

	stop() {
		this.frontLeftSpeed = 0;
		this.frontRightSpeed = 0;
		this.backLeftSpeed = 0;
		this.backRightSpeed = 0;
	}


	getWheelSpeed() {
		return [this.vehicle.getWheelSpeed(0), this.vehicle.getWheelSpeed(1), this.vehicle.getWheelSpeed(2), this.vehicle.getWheelSpeed(3)];
	}

	getForcesInfo() {
		console.log('Vitesse roue gauche :', this.vehicle.wheelBodies[0].angularVelocity);
		console.log('Vitesse roue droite :', this.vehicle.wheelBodies[1].angularVelocity);
		console.log('Vitesse roue arrière gauche :', this.vehicle.wheelBodies[2].angularVelocity);
		console.log('Vitesse roue arrière droite :', this.vehicle.wheelBodies[3].angularVelocity);
	}

	moveStep(angle, direction = 'front', step = 1, speed = 7) {
		if (direction === 'forward') {
			this.move('front', speed);
		} else if (direction === 'backward') {
			this.move('back', speed);
		} else if (direction === 'ccw') {
			this.move('rot_trigo', speed);
		} else if (direction === 'cw') {
			this.move('rot_clock', speed);
		} else if (direction === 'left') {
			this.move('left', speed);
		} else if (direction === 'right') {
			this.move('right', speed);
		}
		return new Promise((resolve) => {
			const startTime = performance.now();
			const timeForOneUnit = 1100 * step;

			this.moveInterval = setInterval(() => {
				const currentTime = performance.now();
				const elapsedTime = currentTime - startTime;

				if (elapsedTime >= timeForOneUnit) {
					this.move('stop', 0);
					clearInterval(this.moveInterval);
					resolve();
				}
			}, 16); // ~60fps check
		});
	}

	setAngularVelocity() {
		const frontLeftSpeed = -this.frontLeftSpeed;
		const frontRightSpeed = -this.frontRightSpeed;
		const backLeftSpeed = -this.backLeftSpeed;
		const backRightSpeed = -this.backRightSpeed;

		const frontLeftVelocity = new CANNON.Vec3(0, 0, frontLeftSpeed);
		const frontRightVelocity = new CANNON.Vec3(0, 0, frontRightSpeed);
		const backLeftVelocity = new CANNON.Vec3(0, 0, backLeftSpeed);
		const backRightVelocity = new CANNON.Vec3(0, 0, backRightSpeed);

		// need to multiply the velocity by the quaternion of the wheel to get the correct direction
		if (this.frontLeftLocked) {
			this.vehicle.wheelBodies[0].angularVelocity.copy(this.vehicle.wheelBodies[0].quaternion.vmult(frontLeftVelocity));
		}
		if (this.frontRightLocked) {
			this.vehicle.wheelBodies[1].angularVelocity.copy(this.vehicle.wheelBodies[1].quaternion.vmult(frontRightVelocity));
		}
		if (this.backLeftLocked) {
			this.vehicle.wheelBodies[2].angularVelocity.copy(this.vehicle.wheelBodies[2].quaternion.vmult(backLeftVelocity));
		}
		if (this.backRightLocked) {
			this.vehicle.wheelBodies[3].angularVelocity.copy(this.vehicle.wheelBodies[3].quaternion.vmult(backRightVelocity));
		}
	}

	addObstacle(obstacle, shape) {
		const obstacleBox = new THREE.Box3().setFromObject(obstacle);
		const size = new THREE.Vector3();
		const obstacleSize = obstacleBox.getSize(size);
		const obstacleHalfSize = new CANNON.Vec3(obstacleSize.x / 2, obstacleSize.y / 2, obstacleSize.z / 2);

		const worldPosition = new THREE.Vector3();
		obstacle.getWorldPosition(worldPosition);

		const worldQuaternion = new THREE.Quaternion();
		obstacle.getWorldQuaternion(worldQuaternion);

		const obstacleBody = new CANNON.Body({
			mass: 0,
			position: new CANNON.Vec3(worldPosition.x, worldPosition.y, worldPosition.z),
			quaternion: new CANNON.Quaternion(worldQuaternion.x, worldQuaternion.y, worldQuaternion.z, worldQuaternion.w),
			shape: shape === 'circle' ? new CANNON.Cylinder(1, 1, 0.5, 32) : new CANNON.Box(obstacleHalfSize),
			material: new CANNON.Material('obstacle'),
		});

		// const matObstacle = new CANNON.ContactMaterial(obstacleBody.material, this.wheelMaterial, {
		// 	friction: 45,
		// 	restitution: 0.01,
		// 	// Augmenter la raideur pour éviter la pénétration
		// 	contactEquationStiffness: 1e8,
		// 	contactEquationRelaxation: 3,
		// 	frictionEquationStiffness: 1e8,
		// 	frictionEquationRelaxation: 3,
		// 	// Ajouter ces paramètres pour améliorer la stabilité
		// 	contactEquationRegularizationTime: 3,
		// 	frictionEquationRegularizationTime: 3,
		// });

		// this.world.addContactMaterial(matObstacle);

		this.world.addBody(obstacleBody);
		obstacleBody.userData = {
			name: 'obstacle',
			type: 'obstacle',
		};

		this.bodies = {
			...this.bodies,
			[obstacle.name]: {
				body: obstacleBody,
				mesh: obstacle,
			},
		};
	}

	removeObstacle(obstacle) {
		this.world.removeBody(this.bodies[obstacle].body);
		delete this.bodies[obstacle.name];
	}

	addObstacleComplexe(mesh, vertices, faces, positionX, positionY) {
		const cannonVertices = vertices.map((v) => new CANNON.Vec3(v.x, v.y, v.z));
		const cannonShape = new CANNON.ConvexPolyhedron({ vertices: cannonVertices, faces });

		const obstaclePosition = new THREE.Vector3();
		mesh.getWorldPosition(obstaclePosition);

		// Création du corps physique
		const obstacleBody = new CANNON.Body({
			mass: 0, // Objet statique
			position: new CANNON.Vec3(positionX, 0, positionY),
			shape: cannonShape,
			material: new CANNON.Material('obstacleComplexe'),
		});

		obstacleBody.position.copy(mesh.position);

		// const matObstacle = new CANNON.ContactMaterial(obstacleBody.material, this.wheelMaterial, {
		// 	friction: 45,
		// 	restitution: 0.01,
		// 	// Augmenter la raideur pour éviter la pénétration
		// 	contactEquationStiffness: 1e8,
		// 	contactEquationRelaxation: 3,
		// 	frictionEquationStiffness: 1e8,
		// 	frictionEquationRelaxation: 3,
		// 	// Ajouter ces paramètres pour améliorer la stabilité
		// 	contactEquationRegularizationTime: 3,
		// 	frictionEquationRegularizationTime: 3,
		// });

		// Configuration supplémentaire du corps pour les formes complexes
		obstacleBody.collisionResponse = 1;
		obstacleBody.allowSleep = false; // Garder le corps toujours actif

		// this.world.addContactMaterial(matObstacle);

		// Ajout au monde physique
		this.world.addBody(obstacleBody);
		obstacleBody.userData = { name: 'obstacle', type: 'obstacle' };

		// Stocker l'obstacle
		this.bodies = {
			...this.bodies,
			[mesh.name]: {
				body: obstacleBody,
				mesh: mesh,
			},
		};
	}
}
