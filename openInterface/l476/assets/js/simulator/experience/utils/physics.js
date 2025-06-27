import * as CANNON from '/openInterface/interfaces/assets/js/simulator3d/libs/physics/cannon.js';
import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';

import cannonEsDebugger from '/openInterface/interfaces/assets/js/simulator3d/libs/physics/cannonEsDebugger.js';

const collisionGroups = {
	default: 1,
	other: 2,
};

export default class Physics {
	constructor(experience, exp) {
		this.exp = exp;
		this.experience = experience;
		this.world = new CANNON.World({
			gravity: new CANNON.Vec3(0, -9.82, 0),
			// allowSleep: true,           // Optimisation physique
			// broadphase: new CANNON.SAPBroadphase(),
			broadphase: new CANNON.NaiveBroadphase(),
		});
		this.world.gravity.set(0, -50, 0);
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
		this.leftSpeed = 0;
		this.rightSpeed = 0;
		this.leftLocked = true;
		this.rightLocked = true;
		this.isResetting = false;
		this.isRotating = false;
		this.resetTimeout = null;
		this.offset = 0.45;
		this.isDragging = false;
		this.initPosition = { x: 0, z: 0 };
		this.currentAngle = 0;
		this.isPaused = false;
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
		};

		// animate render loop
		this.experience.movementObjectFunctions.physicsUpdate = animate.bind(this);
	}

	resetPosition() {
		this.stopWheels();
		this.stop();
		this.isResetting = true;
	}

	setDragging(dragging) {
		this.isDragging = dragging;
	}

	setRotating(rotating) {
		this.isRotating = rotating;
	}

	stopVelocity() {
		// this.stopWheels();
		for (const body in this.bodies) {
			this.bodies[body].body.velocity.set(0, 0, 0);
			this.bodies[body].body.angularVelocity.set(0, 0, 0);
		}
	}

	stopWheels() {
		this.vehicle.setWheelForce(0, 0);
		this.vehicle.setWheelForce(0, 1);
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

		const supportsArray = ['physics_support_front', 'physics_support_back'];

		supportsArray.forEach((support) => {
			const supportMesh = this.experience.hierarchie[support];

			const supportBody = new CANNON.Body({
				mass: 10, // Une faible masse pour ne pas trop impacter la physique du châssis
				shape: new CANNON.Sphere(0.05),
				material: new CANNON.Material({ friction: 0, restitution: 0 }),
			});

			const supportWorldPosition = new THREE.Vector3();
			supportMesh.getWorldPosition(supportWorldPosition);
			supportBody.position.set(supportWorldPosition.x, supportWorldPosition.y, supportWorldPosition.z);
			this.world.addBody(supportBody);

			const localPivotChassis = chassisBody.pointToLocalFrame(new CANNON.Vec3(supportWorldPosition.x, supportWorldPosition.y, supportWorldPosition.z + 0.015));
			const localPivotSupport = new CANNON.Vec3(0, 0, 0);

			const supportConstraint = new CANNON.PointToPointConstraint(chassisBody, localPivotChassis, supportBody, localPivotSupport);

			const supportMat = new CANNON.ContactMaterial(this.groundBody.material, supportBody.material, {
				friction: 0.0,
				restitution: 0,
			});

			this.world.addContactMaterial(supportMat);

			this.world.addConstraint(supportConstraint);

			this.bodies = {
				...this.bodies,
				[support]: {
					body: supportBody,
					mesh: supportMesh,
				},
			};

			supportBody.userData = {
				name: support,
				type: 'support',
				initPosition: new CANNON.Vec3(supportWorldPosition.x, supportWorldPosition.y, supportWorldPosition.z),
				resetPosition: new CANNON.Vec3(supportWorldPosition.x, supportWorldPosition.y, supportWorldPosition.z),
				initQuaternion: new CANNON.Quaternion(0, 0, 0, 1),
			};
		});

		const wheelRadius = 0.3;
		const wheelHeight = 0.22;
		const wheelMass = 30;
		this.wheelMaterial = new CANNON.Material('wheel');

		const wheelMeshSimple = ['L_wheel', 'R_wheel'];
		if (this.debug) {
			wheelMeshSimple.forEach((wheel) => {
				const mesh = this.experience.hierarchie[wheel];
				mesh.visible = false;
			});
		}

		const wheelMeshes = [this.experience.hierarchie['wheel_L'], this.experience.hierarchie['wheel_R']];

		wheelMeshes.forEach((wheel) => {
			wheel.visible = false;
		});

		const wheelPosArray = {
			wheel_L: new THREE.Vector3(chassisHalfSize.x - 0.7, 0.45, -chassisHalfSize.z - 0.15),
			wheel_R: new THREE.Vector3(chassisHalfSize.x - 0.7, 0.45, chassisHalfSize.z + 0.15),
		};

		wheelMeshes.forEach((wheelMesh) => {
			wheelPosArray.wheel_L.y = wheelPosArray.wheel_R.y; // Assurer une hauteur identique
			wheelPosArray.wheel_L.z = -wheelPosArray.wheel_R.z; // Assurer un placement symétrique en `z`
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
				direction: new CANNON.Vec3(0, 0, -1),
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
		});

		const mat2 = new CANNON.ContactMaterial(this.groundBody.material, this.wheelMaterial, {
			friction: 45,
			restitution: 0.1,
			contactEquationStiffness: 1e4,
			contactEquationRelaxation: 3,
			frictionEquationStiffness: 1e4,
			frictionEquationRelaxation: 3,
		});

		this.world.addContactMaterial(mat2);
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

	syncBodies() {
		if (this.disablePhysics) return;
		if (this.isResetting) {
			this.isResetting = false;
			this.stopVelocity();
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
			this.world.step(1 / 60);
			return;
		}
		if (this.isDragging && !this.isRotating) {
			this.stopVelocity();
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
			return;
		}
		if (this.isRotating && !this.isDragging) {
			this.stopVelocity();

			const chassisMesh = this.experience.hierarchie['chassis'];
			const chassisBody = this.bodies['chassis'].body;

			const quaternion = new CANNON.Quaternion();
			let angleInRadians = (chassisMesh.rotation.y + 2 * Math.PI) % (2 * Math.PI);
			quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), angleInRadians);

			// Appliquer et sauvegarder la rotation pour le chassis
			chassisBody.quaternion.copy(quaternion);
			chassisBody.userData.initQuaternion = new CANNON.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);

			const wheelArray = ['wheel_L', 'wheel_R', 'physics_support_back', 'physics_support_front'];
			for (const wheel of wheelArray) {
				const wheelMesh = this.bodies[wheel].mesh;
				const wheelBody = this.bodies[wheel].body;

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

			this.isRotating = false;
			return;
		}

		if (this.isPaused) return;
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
		const wheelEl = ['L_wheel', 'R_wheel'];
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

	// simple move methode with directly setting the angular velocity of the wheels
	move(direction, speed) {
		const MAX_SPEED = 15000;
		const correctionFactor = 30 + 6 * (1 - Math.abs(speed) / MAX_SPEED);

		this.leftLocked = true;
		this.rightLocked = true;

		switch (direction) {
			case 'forward':
				this.leftSpeed = -(speed / (MAX_SPEED / correctionFactor));
				this.rightSpeed = -(speed / (MAX_SPEED / correctionFactor));

				break;
			case 'backward':
				this.leftSpeed = speed / (MAX_SPEED / correctionFactor);
				this.rightSpeed = speed / (MAX_SPEED / correctionFactor);
				break;

			case 'rot_trigo':
				this.leftSpeed = speed / (MAX_SPEED / correctionFactor);
				this.rightSpeed = -(speed / (MAX_SPEED / correctionFactor));
				break;
			case 'rot_clock':
				this.leftSpeed = -(speed / (MAX_SPEED / correctionFactor));
				this.rightSpeed = speed / (MAX_SPEED / correctionFactor);
				break;
			case 'stop':
			case 'pause':
				this.vehicle.setWheelForce(0, 0);
				this.vehicle.setWheelForce(0, 1);
				this.leftSpeed = 0;
				this.rightSpeed = 0;

				break;
		}
	}

	rotateRobotAngle(targetAngle, speed) {
		return new Promise((resolve) => {
			if (this.experience.movementObjectFunctions.updateAngle) {
				delete this.experience.movementObjectFunctions.updateAngle;
				this.leftSpeed = 0;
				this.rightSpeed = 0;
			}

			this.move('stop', speed);

			const MAX_SPEED = 15000;
			const CORRECTION_FACTOR = 30 + 6 * (1 - Math.abs(speed) / MAX_SPEED);
			const ANGLE_THRESHOLD = 0.05;

			const targetAngleRadians = (targetAngle * Math.PI) / 180;

			const direction = targetAngle > 0 ? 'rot_trigo' : 'rot_clock';

			const totalRotation = Math.abs(targetAngleRadians);

			let rotationDone = 0;
			let lastAngle = null;

			const updateAngle = () => {
				const robotAngle = this.bodies['chassis'].body.quaternion;
				const currentAngle = Math.atan2(2 * (robotAngle.y * robotAngle.w + robotAngle.x * robotAngle.z), 1 - 2 * (robotAngle.y * robotAngle.y + robotAngle.z * robotAngle.z));

				if (lastAngle === null) {
					lastAngle = currentAngle;
					return;
				}

				let deltaAngle = currentAngle - lastAngle;

				if (deltaAngle > Math.PI) deltaAngle -= 2 * Math.PI;
				if (deltaAngle < -Math.PI) deltaAngle += 2 * Math.PI;

				rotationDone += Math.abs(deltaAngle);

				lastAngle = currentAngle;

				if (direction === 'rot_clock') {
					this.leftSpeed = speed / (MAX_SPEED / CORRECTION_FACTOR);
					this.rightSpeed = -speed / (MAX_SPEED / CORRECTION_FACTOR);
				} else {
					// rot_trigo
					this.leftSpeed = -speed / (MAX_SPEED / CORRECTION_FACTOR);
					this.rightSpeed = speed / (MAX_SPEED / CORRECTION_FACTOR);
				}

				if (rotationDone >= totalRotation - ANGLE_THRESHOLD) {
					this.leftSpeed = 0;
					this.rightSpeed = 0;
					delete this.experience.movementObjectFunctions.updateAngle;
					return resolve();
				}
			};

			this.experience.movementObjectFunctions.updateAngle = updateAngle.bind(this);
		});
	}

	moveRobotDistance(step, direction, speed) {
		return new Promise((resolve) => {
			if (this.experience.movementObjectFunctions.updatePosition) {
				delete this.experience.movementObjectFunctions.updatePosition;
				this.leftSpeed = 0;
				this.rightSpeed = 0;
			}
			this.move('stop', speed);

			this.leftSpeed = 0;
			this.rightSpeed = 0;

			const distanceToTravel = 1 * step;

			const initialPosition = this.bodies['chassis'].body.position.clone();


			let distanceTraveled = 0;

			const updatePositionStep = () => {
				const currentPosition = this.bodies['chassis'].body.position;


				const deltaX = currentPosition.x - initialPosition.x;
				const deltaZ = currentPosition.z - initialPosition.z;
				const currentDistanceTraveled = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);

				distanceTraveled = currentDistanceTraveled;

				if (direction === 'forward') {
					this.move('forward', speed);
				} else {
					this.move('backward', speed);
				}

				if (distanceTraveled >= distanceToTravel) {
					this.move('stop', speed);
					delete this.experience.movementObjectFunctions.updatePositionStep;
					return resolve();
				}
			};

			this.experience.movementObjectFunctions.updatePositionStep = updatePositionStep.bind(this);
		});
	}

	setAngularVelocity(left = true, right = true) {
		const leftSpeed = this.leftSpeed;
		const rightSpeed = this.rightSpeed;
		const leftVelocity = new CANNON.Vec3(0, 0, leftSpeed);
		const rightVelocity = new CANNON.Vec3(0, 0, rightSpeed);

		// need to multiply the velocity by the quaternion of the wheel to get the correct direction
		if (this.leftLocked) {
			this.vehicle.wheelBodies[0].angularVelocity.copy(this.vehicle.wheelBodies[0].quaternion.vmult(leftVelocity));
		}
		if (this.rightLocked) {
			this.vehicle.wheelBodies[1].angularVelocity.copy(this.vehicle.wheelBodies[1].quaternion.vmult(rightVelocity));
		}
	}

	getForcesInfo() {
		console.log('Vitesse roue gauche :', this.vehicle.wheelBodies[0].angularVelocity);
		console.log('Vitesse roue droite :', this.vehicle.wheelBodies[1].angularVelocity);
	}

	stop() {
		this.leftSpeed = 0;
		this.rightSpeed = 0;
		this.vehicle.setWheelForce(0, 0);
		this.vehicle.setWheelForce(0, 1);
	}

	getWheelSpeed() {
		return [this.vehicle.getWheelSpeed(0), this.vehicle.getWheelSpeed(1)];
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

		const matObstacle = new CANNON.ContactMaterial(obstacleBody.material, this.wheelMaterial, {
			friction: 45,
			restitution: 0.01,
			// Augmenter la raideur pour éviter la pénétration
			contactEquationStiffness: 1e8,
			contactEquationRelaxation: 3,
			frictionEquationStiffness: 1e8,
			frictionEquationRelaxation: 3,
			// Ajouter ces paramètres pour améliorer la stabilité
			contactEquationRegularizationTime: 3,
			frictionEquationRegularizationTime: 3,
		});

		this.world.addContactMaterial(matObstacle);

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

		const matObstacle = new CANNON.ContactMaterial(obstacleBody.material, this.wheelMaterial, {
			friction: 45,
			restitution: 0.01,
			// Augmenter la raideur pour éviter la pénétration
			contactEquationStiffness: 1e8,
			contactEquationRelaxation: 3,
			frictionEquationStiffness: 1e8,
			frictionEquationRelaxation: 3,
			// Ajouter ces paramètres pour améliorer la stabilité
			contactEquationRegularizationTime: 3,
			frictionEquationRegularizationTime: 3,
		});

		// Configuration supplémentaire du corps pour les formes complexes
		obstacleBody.collisionResponse = 1;
		obstacleBody.allowSleep = false; // Garder le corps toujours actif

		this.world.addContactMaterial(matObstacle);

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
