import * as CANNON from '/openInterface/interfaces/assets/js/simulator3d/libs/physics/cannon.js';
import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';

import cannonEsDebugger from '/openInterface/interfaces/assets/js/simulator3d/libs/physics/cannonEsDebugger.js';

const collisionGroups = {
	default: 1, // ground
	other: 2, // synced objects (balls)
	robot: 4, // robot parts (mors) TODO: add robot body
};

export default class Physics {
	constructor(experience) {
		this.experience = experience;
		this.world = new CANNON.World();
		this.gravityY = -9.81;
		this.world.gravity.set(0, this.gravityY, 0);
		this.cannonDebugger = new cannonEsDebugger(this.experience.scene, this.world, {
			autoUpdate: true,
			color: 0xff0000,
		});
		// this.debug = this.experience.devDebug
		this.debug = false;
		this.bodies = {};
		this.gripperCollision = false;
		this.grippedObject = null;
		this.collisionContacts = new Map(); // Stocker les contacts actifs par objet
		this.lastGroundCollisionAlert = 0; // Cooldown pour éviter les alertes répétées
		this.scenarios = ['default', 'tower', 'pyramid'];
		this.setupCollisionDetection();
	}

	init() {
		this.groundMaterial = new CANNON.Material('ground');
		const groundBody = new CANNON.Body({
			material: this.groundMaterial,
			mass: 0, // static
			collisionFilterGroup: collisionGroups.default, // Groupe du sol
			collisionFilterMask: collisionGroups.other | collisionGroups.robot, // Ballons ET robot peuvent interagir
		});
		const groundShape = new CANNON.Plane();
		groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		groundBody.addShape(groundShape);
		groundBody.userData = {
			name: 'ground',
			type: 'ground',
		};
		groundBody.position.y = -0.005;
		this.groundBody = groundBody;
		this.world.addBody(groundBody);

		const fixedTimeStep = 1.0 / 60.0; // seconds (from 60 fps, set in the renderer => setAnimationLoop in Experience.js)
		const maxSubSteps = 3;
		let lastTime = null;

		this.addRobotBodies();
		this.addSingleCube('#ff0000', { x: 0, y: 0.05, z: 0.2 });
		this.addSingleCube('#00ff00', { x: 0.1, y: 0.05, z: 0.2 });
		this.addSingleCube('#0000ff', { x: -0.1, y: 0.05, z: 0.2 });
		const animateSphere = () => {
			if (lastTime !== null) {
				const dt = (performance.now() - lastTime) / 1000;
				this.syncBodies();

				if (this.debug) {
					this.cannonDebugger.update();
				}

				this.world.step(fixedTimeStep, dt, maxSubSteps);
			}

			if (this.debug) {
				this.debuggerActive = true;
			}

			lastTime = performance.now();
		};

		// animate render loop
		this.experience.movementObjectFunctions.physicsUpdate = animateSphere.bind(this);
	}

	reset() {
		// Collecter d'abord tous les IDs à supprimer
		const idsToRemove = [];

		for (const [id, el] of Object.entries(this.bodies)) {
			const { body, mesh } = el;
			if (body.userData.type === 'balloon' || body.userData.type === 'synced_object') {
				idsToRemove.push({ id, body, mesh });
			}
		}

		// Maintenant supprimer tous les objets collectés
		for (const { id, body, mesh } of idsToRemove) {
			this.world.removeBody(body);
			this.experience.scene.remove(mesh);
			delete this.bodies[id];
		}

		console.log(`${idsToRemove.length} objets supprimés lors du reset`);

		// Ajouter les cubes par défaut
		this.addSingleCube('#ff0000', { x: 0, y: 0.05, z: 0.2 });
		this.addSingleCube('#00ff00', { x: 0.1, y: 0.05, z: 0.2 });
		this.addSingleCube('#0000ff', { x: -0.1, y: 0.05, z: 0.2 });
	}

	setGravity(gravity){
		this.gravityY = gravity;
		this.world.gravity.set(0, this.gravityY, 0);
	}

	setupCollisionDetection() {
		this.world.addEventListener('beginContact', (e) => {
			const { bodyA, bodyB } = e;

			// Vérifier collision robot/ground
			this.checkRobotGroundCollision(bodyA, bodyB);

			const collisionData = this.checkGripperCollision(bodyA, bodyB);
			if (collisionData.isCollision) {
				const cubeId = collisionData.cubeBody.id;
				const gripperName = collisionData.gripperBody.userData.name;

				if (!this.collisionContacts.has(cubeId)) {
					this.collisionContacts.set(cubeId, {
						cubeBody: collisionData.cubeBody,
						mors_left: false,
						mors_right: false,
					});
				}

				const contacts = this.collisionContacts.get(cubeId);
				contacts[gripperName] = true;

				if (contacts.mors_left && contacts.mors_right) {
					this.gripperCollision = true;
					this.collidingObject = collisionData.cubeBody;
				} else {
					this.gripperCollision = false;
					this.collidingObject = null;
				}
			}
		});

		this.world.addEventListener('endContact', (e) => {
			const { bodyA, bodyB } = e;

			const collisionData = this.checkGripperCollision(bodyA, bodyB);
			if (collisionData.isCollision) {
				const cubeId = collisionData.cubeBody.id;
				const gripperName = collisionData.gripperBody.userData.name;

				if (this.collisionContacts.has(cubeId)) {
					const contacts = this.collisionContacts.get(cubeId);
					contacts[gripperName] = false;

					if (!contacts.mors_left && !contacts.mors_right) {
						this.collisionContacts.delete(cubeId);
						if (this.collidingObject && this.collidingObject.id === cubeId) {
							this.gripperCollision = false;
							this.collidingObject = null;
						}
					} else if (!(contacts.mors_left && contacts.mors_right)) {
						if (this.collidingObject && this.collidingObject.id === cubeId) {
							this.gripperCollision = false;
							this.collidingObject = null;
						}
					}
				}
			}
		});
	}

	checkGripperCollision(bodyA, bodyB) {
		// Vérifier que les bodies existent et ont userData
		if (!bodyA || !bodyB || !bodyA.userData || !bodyB.userData) {
			return { isCollision: false };
		}

		const isAGripper = bodyA.userData.type === 'robot_part' && (bodyA.userData.name === 'mors_left' || bodyA.userData.name === 'mors_right');
		const isBGripper = bodyB.userData.type === 'robot_part' && (bodyB.userData.name === 'mors_left' || bodyB.userData.name === 'mors_right');

		const isACube = bodyA.userData.type === 'balloon';
		const isBCube = bodyB.userData.type === 'balloon';

		if (isAGripper && isBCube) {
			return { isCollision: true, cubeBody: bodyB, gripperBody: bodyA };
		} else if (isBGripper && isACube) {
			return { isCollision: true, cubeBody: bodyA, gripperBody: bodyB };
		}
		return { isCollision: false };
	}

	checkRobotGroundCollision(bodyA, bodyB) {
		// Vérifier que les bodies existent et ont userData
		if (!bodyA || !bodyB || !bodyA.userData || !bodyB.userData) {
			return;
		}

		const isAGround = bodyA.userData.type === 'ground';
		const isBGround = bodyB.userData.type === 'ground';
		const isARobot = bodyA.userData.type === 'robot_part';
		const isBRobot = bodyB.userData.type === 'robot_part';

		// Debug: log seulement les collisions robot-ground
		if ((isAGround && isBRobot) || (isBGround && isARobot)) {
			console.log('🔍 Robot-Ground collision attempt between:', bodyA.userData?.name || 'unknown', 'and', bodyB.userData?.name || 'unknown');
		}

		if ((isAGround && isBRobot) || (isBGround && isARobot)) {
			const robotPart = isARobot ? bodyA.userData.name : bodyB.userData.name;
			const now = Date.now();

			// Cooldown de 2 secondes entre les alertes
			if (now - this.lastGroundCollisionAlert > 2000) {
				this.lastGroundCollisionAlert = now;
			}
		}
	}

	isGripperBlocked() {
		return this.gripperCollision;
	}

	gripObject() {
		if (this.collidingObject && !this.grippedObject) {
			this.grippedObject = this.collidingObject;
			this.grippedObject.type = CANNON.Body.KINEMATIC;
			this.grippedObject.mass = 0;

			const morsLeft = this.experience.hierarchie['MORS_LEFT'];
			const morsRight = this.experience.hierarchie['MORS_RIGHT'];

			if (morsLeft && morsRight) {
				const gripperCenter = new THREE.Vector3();
				gripperCenter.addVectors(morsLeft.getWorldPosition(new THREE.Vector3()), morsRight.getWorldPosition(new THREE.Vector3())).multiplyScalar(0.5);

				const leftQuaternion = morsLeft.getWorldQuaternion(new THREE.Quaternion());
				const rightQuaternion = morsRight.getWorldQuaternion(new THREE.Quaternion());
				this.initialGripperQuaternion = leftQuaternion.clone().slerp(rightQuaternion, 0.5);

				const worldOffset = new THREE.Vector3().subVectors(new THREE.Vector3(this.grippedObject.position.x, this.grippedObject.position.y, this.grippedObject.position.z), gripperCenter);
				this.grippedObjectOffset = worldOffset.applyQuaternion(this.initialGripperQuaternion.clone().invert());

				const objectQuaternion = new THREE.Quaternion(this.grippedObject.quaternion.x, this.grippedObject.quaternion.y, this.grippedObject.quaternion.z, this.grippedObject.quaternion.w);
				this.grippedObjectQuaternionOffset = this.initialGripperQuaternion.clone().invert().multiply(objectQuaternion);
			}
		}
	}

	releaseObject() {
		if (this.grippedObject) {
			this.grippedObject.type = CANNON.Body.DYNAMIC;
			this.grippedObject.mass = 1;
			this.grippedObject = null;
			this.grippedObjectOffset = null;
			this.grippedObjectQuaternionOffset = null;
			this.initialGripperQuaternion = null;
		}
	}

	syncBodies() {
		if (this.grippedObject && this.grippedObjectOffset) {
			const morsLeft = this.experience.hierarchie['MORS_LEFT'];
			const morsRight = this.experience.hierarchie['MORS_RIGHT'];

			if (morsLeft && morsRight) {
				const gripperCenter = new THREE.Vector3();
				gripperCenter.addVectors(morsLeft.getWorldPosition(new THREE.Vector3()), morsRight.getWorldPosition(new THREE.Vector3())).multiplyScalar(0.5);

				const leftQuaternion = morsLeft.getWorldQuaternion(new THREE.Quaternion());
				const rightQuaternion = morsRight.getWorldQuaternion(new THREE.Quaternion());
				const currentGripperQuaternion = leftQuaternion.clone().slerp(rightQuaternion, 0.5);

				const worldOffset = this.grippedObjectOffset.clone().applyQuaternion(currentGripperQuaternion);
				const newPosition = gripperCenter.add(worldOffset);
				this.grippedObject.position.set(newPosition.x, newPosition.y, newPosition.z);

				if (this.grippedObjectQuaternionOffset) {
					const newQuaternion = currentGripperQuaternion.multiply(this.grippedObjectQuaternionOffset);
					this.grippedObject.quaternion.set(newQuaternion.x, newQuaternion.y, newQuaternion.z, newQuaternion.w);
				}

				const grippedBodyElement = Object.values(this.bodies).find((el) => el.body === this.grippedObject);
				if (grippedBodyElement) {
					grippedBodyElement.mesh.position.copy(this.grippedObject.position);
					grippedBodyElement.mesh.quaternion.copy(this.grippedObject.quaternion);
				}
			}
		}

		for (const el of Object.values(this.bodies)) {
			const { body, mesh } = el;

			if (this.grippedObject && body === this.grippedObject) {
				continue;
			}

			if (body.userData.type === 'balloon' || body.userData.type === 'synced_object') {
				mesh.position.copy(body.position);
				mesh.quaternion.copy(body.quaternion);
			} else if (body.userData.type === 'robot_part') {
				const worldPosition = new THREE.Vector3();
				mesh.getWorldPosition(worldPosition);

				// Appliquer les offsets pour corriger le décalage
				const jointName = body.userData.name;
				const factors = this.getJointFactors();
				if (factors && factors[jointName]) {
					worldPosition.x += factors[jointName].offsetX || 0;
					worldPosition.y += factors[jointName].offsetY || 0;
					worldPosition.z += factors[jointName].offsetZ || 0;
				}

				body.position.set(worldPosition.x, worldPosition.y, worldPosition.z);

				const worldQuaternion = new THREE.Quaternion();
				mesh.getWorldQuaternion(worldQuaternion);
				body.quaternion.set(worldQuaternion.x, worldQuaternion.y, worldQuaternion.z, worldQuaternion.w);
			} else {
				const worldPosition = new THREE.Vector3();
				mesh.getWorldPosition(worldPosition);
				body.position = new CANNON.Vec3(worldPosition.x, worldPosition.y, worldPosition.z);

				const worldQuaternion = new THREE.Quaternion();
				mesh.getWorldQuaternion(worldQuaternion);

				body.quaternion.set(worldQuaternion.x, worldQuaternion.y, worldQuaternion.z, worldQuaternion.w);
			}
		}
	}

	addElements(element) {
		const countBallons = Object.values(this.bodies).filter((el) => el.body.userData.type === 'balloon').length;
		if (countBallons > 200) {
			const ballonButton = document.getElementById('button-add-element');
			ballonButton.disabled = true;
			ballonButton.innerHTML = 'Max';
			return;
		}
		for (let i = 0; i < 20; i++) {
			const randomPosition = new CANNON.Vec3(Math.random() * 2 - 0.5, Math.random() * 2 + 0.5, Math.random() * 2 - 0.5);
			const balloon = new CANNON.Body({
				material: new CANNON.Material(),
				mass: 0.01,
				position: new CANNON.Vec3(randomPosition.x, randomPosition.y, randomPosition.z),
				shape: element === 'cube' ? new CANNON.Box(new CANNON.Vec3(0.1, 0.1, 0.1)) : new CANNON.Sphere(0.1),
				collisionFilterGroup: collisionGroups.other, // Assurez-vous que ce groupe est compatible
			});

			balloon.collisionResponse = true;
			balloon.allowSleep = false;
			const mat1 = new CANNON.ContactMaterial(this.groundMaterial, balloon.material, { friction: 0.1, restitution: 0.4 });
			this.world.addContactMaterial(mat1);
			balloon.userData = {
				name: `balloon-${i}`,
				type: 'balloon',
			};

			this.world.addBody(balloon);

			const randomColor = Math.random() * 0xffffff;

			const material = new THREE.MeshStandardMaterial({ color: randomColor });
			const balloonMesh = new THREE.Mesh(element === 'cube' ? new THREE.BoxGeometry(0.2, 0.2, 0.2) : new THREE.SphereGeometry(0.1, 32, 32), material);

			balloonMesh.castShadow = true;
			balloonMesh.receiveShadow = true;

			balloonMesh.position.copy(randomPosition);

			this.experience.scene.add(balloonMesh);

			this.bodies = {
				...this.bodies,
				[balloon.id]: {
					body: balloon,
					mesh: balloonMesh,
				},
			};
		}
	}

	removeElements() {
		for (const el of Object.values(this.bodies)) {
			const { body, mesh } = el;
			if (body.userData.type === 'balloon') {
				this.world.removeBody(body);
				mesh.geometry.dispose();
				mesh.material.dispose();
				this.experience.scene.remove(mesh);
				delete this.bodies[body.id];
			}
		}

		const ballonButton = document.getElementById('button-add-element');
		ballonButton.disabled = false;
		ballonButton.innerHTML = 'Ballons';
	}

	getMeshBoundingBoxSize(mesh) {
		const box = new THREE.Box3().setFromObject(mesh);
		const size = box.getSize(new THREE.Vector3());
		return {
			x: size.x / 8,
			y: size.y / 4,
			z: size.z / 2,
		};
	}

	getJointFactors() {
		return {
			joint_1: { x: 3.5, y: 0.7, z: 0.2, offsetY: 0.05, offsetZ: 0, offsetX: 0, pivotX: 0, pivotY: 0, pivotZ: 0 },
			base_link: { x: 3.5, y: 1.8, z: 0.9, offsetY: 0.04, offsetZ: 0, offsetX: 0, pivotX: 0, pivotY: 0, pivotZ: 0 },
			joint_2: { x: 3.1, y: 1.8, z: 0.17, offsetY: 0, offsetZ: 0, offsetX: 0, pivotX: 0, pivotY: 0.1, pivotZ: 0 },
			joint_3: { x: 1.8, y: 1.5, z: 0.25, offsetY: 0, offsetZ: 0, offsetX: 0, pivotX: 0, pivotY: 0.02, pivotZ: 0.04 },
			joint_4: { x: 1.5, y: 1.2, z: 0.55, offsetY: 0, offsetZ: 0, offsetX: 0, pivotX: 0, pivotY: 0, pivotZ: 0.09 },
			joint_6: { x: 1, y: 0.4, z: 0.8, offsetY: 0, offsetZ: 0, offsetX: 0, pivotX: 0, pivotY: 0, pivotZ: 0 },
		};
	}

	addRobotBodies() {
		const morsLeft = this.experience.hierarchie['MORS_LEFT'];
		const morsRight = this.experience.hierarchie['MORS_RIGHT'];

		if (morsLeft) {
			const leftSize = this.getMeshBoundingBoxSize(morsLeft);

			const leftBox = new CANNON.Body({
				material: new CANNON.Material(),
				mass: 0, // Petite masse pour détecter les collisions
				position: new CANNON.Vec3().copy(morsLeft.getWorldPosition(new THREE.Vector3())),
				shape: new CANNON.Box(new CANNON.Vec3(leftSize.x * 2, leftSize.y * 2, leftSize.z)),
				collisionFilterGroup: collisionGroups.robot,
				collisionFilterMask: collisionGroups.other | collisionGroups.default,
			});
			leftBox.collisionResponse = true;
			leftBox.allowSleep = false;
			leftBox.userData = {
				name: 'mors_left',
				type: 'robot_part',
			};
			this.world.addBody(leftBox);
			this.bodies = {
				...this.bodies,
				[leftBox.id]: {
					body: leftBox,
					mesh: morsLeft,
				},
			};
		}

		if (morsRight) {
			const rightSize = this.getMeshBoundingBoxSize(morsRight);

			const rightBox = new CANNON.Body({
				material: new CANNON.Material(),
				mass: 0, // Petite masse pour détecter les collisions
				position: new CANNON.Vec3().copy(morsRight.getWorldPosition(new THREE.Vector3())),
				shape: new CANNON.Box(new CANNON.Vec3(rightSize.x * 2, rightSize.y * 2, rightSize.z)),
				collisionFilterGroup: collisionGroups.robot,
				collisionFilterMask: collisionGroups.other | collisionGroups.default,
			});
			rightBox.collisionResponse = true;
			rightBox.allowSleep = false;
			rightBox.userData = {
				name: 'mors_right',
				type: 'robot_part',
			};
			this.world.addBody(rightBox);
			this.bodies = {
				...this.bodies,
				[rightBox.id]: {
					body: rightBox,
					mesh: morsRight,
				},
			};
		}
		const JOINTS = ['joint_1', 'base_link', 'joint_2', 'joint_3', 'joint_4', 'joint_6'];
		const factors = this.getJointFactors();
		JOINTS.forEach((jointName) => {
			const joint = this.experience.hierarchie[jointName];
			if (joint) {
				const jointSize = this.getMeshBoundingBoxSize(joint, false);
				let bodyPosition = joint.getWorldPosition(new THREE.Vector3());

				// Appliquer les offsets pour corriger le décalage
				if (factors && factors[jointName]) {
					bodyPosition.x += factors[jointName].offsetX || 0;
					bodyPosition.y += factors[jointName].offsetY || 0;
					bodyPosition.z += factors[jointName].offsetZ || 0;
				}

				const jointBox = new CANNON.Body({
					material: new CANNON.Material(),
					mass: 0,
					position: new CANNON.Vec3(bodyPosition.x, bodyPosition.y, bodyPosition.z),
					collisionFilterGroup: collisionGroups.robot,
					collisionFilterMask: collisionGroups.other | collisionGroups.default,
				});
				const shape = new CANNON.Box(new CANNON.Vec3(jointSize.x * factors[jointName].x, jointSize.y * factors[jointName].y, jointSize.z * factors[jointName].z));
				const shapeOffset = new CANNON.Vec3(factors[jointName].pivotX || 0, factors[jointName].pivotY || 0, factors[jointName].pivotZ || 0);
				const shapeQuaternion = new CANNON.Quaternion();

				jointBox.addShape(shape, shapeOffset, shapeQuaternion);
				jointBox.collisionResponse = true;
				jointBox.allowSleep = false;
				jointBox.userData = {
					name: jointName,
					type: 'robot_part',
				};
				this.world.addBody(jointBox);
				this.bodies = {
					...this.bodies,
					[jointBox.id]: {
						body: jointBox,
						mesh: joint,
					},
				};
			}
		});
	}

	addSingleCube(color, positions) {
		const size = 0.015;
		const position = new CANNON.Vec3(positions?.x || 0, positions?.y || 0.4, positions?.z || 0.2);
		const ball = new CANNON.Body({
			material: new CANNON.Material(),
			mass: 1,
			position: position,
			shape: new CANNON.Box(new CANNON.Vec3(size, size, size)),
			collisionFilterGroup: collisionGroups.other,
			collisionFilterMask: collisionGroups.default | collisionGroups.robot | collisionGroups.other,
		});

		ball.collisionResponse = true;
		ball.allowSleep = true;
		ball.sleepSpeedLimit = 0.1;
		ball.sleepTimeLimit = 1;
		ball.linearDamping = 0.1;
		ball.angularDamping = 0.1;

		const mat1 = new CANNON.ContactMaterial(this.groundMaterial, ball.material, {
			friction: 0.3,
			restitution: 0.2,
			contactEquationStiffness: 1e8,
			contactEquationRelaxation: 3,
		});
		this.world.addContactMaterial(mat1);
		ball.userData = {
			name: `ball_single`,
			type: 'balloon',
		};
		this.world.addBody(ball);
		const mesh = new THREE.Mesh(new THREE.BoxGeometry(size * 2, size * 2, size * 2), new THREE.MeshStandardMaterial({ color }));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.position.copy(position);
		this.experience.scene.add(mesh);
		this.bodies = {
			...this.bodies,
			[ball.id]: {
				body: ball,
				mesh: mesh,
			},
		};
	}

	addRandomBall(ballNumber) {
		const size = 0.015;
		const ballArray = [];
		for (let i = 0; i < ballNumber; i++) {
			const position = new CANNON.Vec3((Math.random() - 0.5) * 0.4, 0.4, (Math.random() - 0.5) * 0.4);
			ballArray.push(position);
			const ball = new CANNON.Body({
				material: new CANNON.Material(),
				mass: 1,
				position: position,
				shape: new CANNON.Box(new CANNON.Vec3(size, size, size)),
				collisionFilterGroup: collisionGroups.other,
				collisionFilterMask: collisionGroups.default | collisionGroups.robot | collisionGroups.other,
			});

			ball.collisionResponse = true;
			ball.allowSleep = true;
			ball.sleepSpeedLimit = 0.1;
			ball.sleepTimeLimit = 1;
			ball.linearDamping = 0.1;
			ball.angularDamping = 0.1;

			const mat1 = new CANNON.ContactMaterial(this.groundMaterial, ball.material, {
				friction: 0.3,
				restitution: 0.2,
				contactEquationStiffness: 1e8,
				contactEquationRelaxation: 3,
			});
			this.world.addContactMaterial(mat1);
			ball.userData = {
				name: `ball_${i}`,
				type: 'balloon',
			};
			this.world.addBody(ball);
			const mesh = new THREE.Mesh(new THREE.BoxGeometry(size * 2, size * 2, size * 2), new THREE.MeshStandardMaterial({ color: 0x0000ff }));
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			mesh.position.copy(position);
			this.experience.scene.add(mesh);
			this.bodies = {
				...this.bodies,
				[ball.id]: {
					body: ball,
					mesh: mesh,
				},
			};
		}
	}

	addPhysicalSyncedObjects(objects) {
		// Collecter d'abord tous les IDs à supprimer
		const idsToRemove = [];

		for (const [id, el] of Object.entries(this.bodies)) {
			const { body, mesh } = el;
			if (body.userData.type === 'balloon' || body.userData.type === 'synced_object') {
				idsToRemove.push({ id, body, mesh });
			}
		}

		// Maintenant supprimer tous les objets collectés
		for (const { id, body, mesh } of idsToRemove) {
			this.world.removeBody(body);
			this.experience.scene.remove(mesh);
			delete this.bodies[id];
		}
		console.log(objects)
		for (let i = 0; i < objects.length; i++) {
			const color = '#ff0000';
			this.addSingleCube(color, { x: objects[i].y / 100, y: 0.01, z: objects[i].x / 100 });
		}

	}

	// addPhysicalSyncedObjects(objects) {
	// 	console.log('Adding physical synced objects:', objects.length);

	// 	this.removeSyncedObjects();

	// 	for (let i = 0; i < objects.length; i++) {
	// 		const obj = objects[i];
	// 		const physicalBody = new CANNON.Body({
	// 			material: new CANNON.Material(),
	// 			mass: 10,
	// 			position: new CANNON.Vec3(obj.y / 100, 0.5, obj.x / 100),
	// 			shape: new CANNON.Sphere(0.02),
	// 			collisionFilterGroup: collisionGroups.other,
	// 			collisionFilterMask: collisionGroups.default | collisionGroups.robot,
	// 		});

	// 		physicalBody.collisionResponse = true;
	// 		physicalBody.allowSleep = false;

	// 		physicalBody.userData = {
	// 			name: `synced_object_${i}`,
	// 			type: 'synced_object',
	// 		};

	// 		this.world.addBody(physicalBody);

	// 		const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.02, 32, 32), new THREE.MeshStandardMaterial({ color: 0x00ff00 }));

	// 		mesh.castShadow = true;
	// 		mesh.receiveShadow = true;
	// 		mesh.name = 'real_robot_object' + i;
	// 		mesh.position.copy(physicalBody.position);

	// 		this.experience.scene.add(mesh);

	// 		this.bodies = {
	// 			...this.bodies,
	// 			[physicalBody.id]: {
	// 				body: physicalBody,
	// 				mesh: mesh,
	// 			},
	// 		};
	// 	}
	// }

	removeSyncedObjects() {
		for (const el of Object.values(this.bodies)) {
			const { body, mesh } = el;
			if (body.userData.type === 'synced_object') {
				this.world.removeBody(body);
				mesh.geometry.dispose();
				mesh.material.dispose();
				this.experience.scene.remove(mesh);
				delete this.bodies[body.id];
			}
		}
	}
}
