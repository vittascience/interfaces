import * as CANNON from '/openInterface/interfaces/assets/js/simulator3d/libs/physics/cannon.js';
import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';

import cannonEsDebugger from '/openInterface/interfaces/assets/js/simulator3d/libs/physics/cannonEsDebugger.js';


const bodiesSizes = {
    leftArm: {
        name : "arm_left_empty",
        type: "capsule",
        follow : "NAOH25V60xmlLWristYaw",
        radius: 0.035,
        height: 0.095,
        rotation: {
            x: Math.PI / 2,
        }
    },
    rightArm: {
        name : 'arm_right_empty',
        type: "capsule",
        follow : "NAOH25V60xmlRWristYaw",
        radius: 0.035,
        height: 0.095,
        rotation: {
            x: Math.PI / 2,
        }
    },
    leftLeg: {
        name : 'leg_left_empty',
        type: "capsule",
        follow : "NAOH25V60xmlRKneePitch",
        radius: 0.04,
        height: 0.08,
        rotation: {
            x: -0.3,
        }
    },
    rightLeg: {
        name : 'leg_right_empty',
        type: "capsule",
        follow : "NAOH25V60xmlLKneePitch",
        radius: 0.04,
        height: 0.08,
        rotation: {
            x: -0.3,
        }
    },
    leftTight:{
        name : 'tight_left_empty',
        type: "capsule",
        follow : "NAOH25V60xmlLKneePitch",
        radius: 0.04,
        height: 0.07,
        rotation: {
            x: 0.3,
        }
    },
    rightTight:{
        name : 'tight_right_empty',
        type: "capsule",
        follow : "NAOH25V60xmlRKneePitch",
        radius: 0.04,
        height: 0.07,
        rotation: {
            x: 0.3,
        }
    },
    headCapsule: {
        name : 'head_capsule_empty',
        type: "capsule",
        follow : "NAOH25V60xmlHeadPitch",
        radius: 0.045,
        height: 0.06,
        rotation: {
            x: Math.PI / 2,
            z: Math.PI / 2,
        }
    },
    torsoUpper: {
        name : 'torso_upper_empty',
        type: "sphere",
        follow : "NAOH25V60xmlTorso",
        radius: 0.065,
        height: 0.1,
        rotation: {
            x: 0,
        }
    },
    torsoLower: {
        name : 'torso_lower_empty',
        type: "sphere",
        follow : "NAOH25V60xmlTorso",
        radius: 0.047,
        height: 0.1,
        rotation: {
            x: 0,
        }
    },
    rightHip: {
        name : 'hip_right_empty',
        type: "sphere",
        follow : "NAOH25V60xmlRHipYawPitch",
        radius: 0.04,
        height: 0.1,
        rotation: {
            x: 0,
        }
    },
    leftHip: {
        name : 'hip_left_empty',
        type: "sphere",
        follow : "NAOH25V60xmlLHipYawPitch",
        radius: 0.04,
        height: 0.1,
        rotation: {
            x: 0,
        }
    },
    headSphere: {
        name : 'head_sphere_empty',
        type: "sphere",
        follow : "NAOH25V60xmlHeadPitch",
        radius: 0.055,
        height: 0.1,
        rotation: {
            x: 0,
        }
    },
}

const bodiesCollisions = {
    leftFoot: {
        mesh: "collide_left_foot_empty",
        type: "box-body",
        size: [0.075, 0.02, 0.15],
    },
    rightFoot: {
        mesh: "collide_right_foot_empty",
        type: "box-body",
        size: [0.075, 0.02, 0.15],
    },
    tightLeft: {
        mesh: "tight_left_empty",
        type: "box-body",
        size: [0.075, 0.12, 0.07],
    },
    tightRight: {
        mesh: "tight_right_empty",
        type: "box-body",
        size: [0.075, 0.12, 0.07],
    },
    torso: {
        mesh: "torso_upper_empty",
        type: "box-body",
        size: [0.1, 0.15, 0.1],
    },
    head: {
        mesh: "head_capsule_empty",
        type: "box-body",
        size: [0.1, 0.1, 0.1],
    },
    leftArm: {
        mesh: "arm_left_empty",
        type: "box-body",
        size: [0.045, 0.13, 0.045],
    },
    rightArm: {
        mesh: "arm_right_empty",
        type: "box-body",
        size: [0.045, 0.13, 0.045],
    },
}

const collisionGroups = {
    torso: 1,
    rightLeg: 2,
    leftLeg: 4,
    head: 8,
    leftArm: 16,
    rightArm: 32,
    default: 64,
    other: 128,
};

export default class Physics {
	constructor(experience) {
		this.experience = experience;
		this.world = new CANNON.World();
		this.world.gravity.set(0, -9.81, 0);
        this.cannonDebugger = new cannonEsDebugger(this.experience.scene, this.world, {
            autoUpdate: true,
            color: 0xff0000,
        });
        this.debug = this.experience.devDebug
        this.bodies = {};
        this.experience.collisionElement = [];
        this.experience.collisionDetected = false;
        // this.addBalloons();
        this.createCollisionBodies();
        this.addBoddies();
	}

	init() {
		const groundBody = new CANNON.Body({
            material: new CANNON.Material(),
			mass: 0, // static
            collisionFilterGroup: collisionGroups.default, // Groupe du sol
            collisionFilterMask: collisionGroups.other,    // Les ballons doivent pouvoir interagir
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
		const animateSphere = () => {
            if (lastTime !== null) {
                const dt = (performance.now() - lastTime) / 1000;
                this.syncBodies();

                if (this.debug) this.cannonDebugger.update();

                this.world.step(fixedTimeStep, dt, maxSubSteps);
            }

            if (this.debug) {
                this.debuggerActive = true;
            }
            
            lastTime = performance.now();
        }

        // animate render loop
        this.experience.movementObjectFunctions.physicsUpdate = animateSphere.bind(this);

	}

    createCollisionBodies() {
        for (const bodyName in bodiesCollisions) {
            const { mesh, type, size } = bodiesCollisions[bodyName];
    
            // Obtenez le mesh correspondant dans la scène
            const meshElement = this.experience.scene.getObjectByName(mesh);
            if (!meshElement) {
                console.error(`Mesh "${mesh}" not found in the scene.`);
                continue;
            }
    
            // Obtenez la position et la rotation initiales du mesh
            const worldPosition = new THREE.Vector3();
            meshElement.getWorldPosition(worldPosition);
    
            const worldQuaternion = new THREE.Quaternion();
            meshElement.getWorldQuaternion(worldQuaternion);
    
            // Créez un body kinematique
            const kinematicBody = new CANNON.Body({
                mass: 10, // Le corps est kinematique
                type: CANNON.Body.KINEMATIC,
                position: new CANNON.Vec3(worldPosition.x, worldPosition.y, worldPosition.z),
            });
    
            // Ajouter la forme correspondant au type spécifié
            switch (type) {
                case "box-body":
                    const [width, height, depth] = size;
                    const boxShape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2));
                    kinematicBody.addShape(boxShape);
                    break;
    
                default:
                    console.error(`Unsupported body type "${type}" for "${bodyName}".`);
                    continue;
            }
    
            kinematicBody.userData = {
                name: bodyName,
                type: type,
                mesh: meshElement,
            };
    
            // Ajoutez le corps au monde physique
            this.world.addBody(kinematicBody);
    
            // Enregistrez une relation entre le mesh et le body
            this.bodies[bodyName] = {
                body: kinematicBody,
                mesh: meshElement,
            };
    
        }
    }


    syncBodies() {
        for (const el of Object.values(this.bodies)) {
            const { body, mesh, anchor } = el;
            if (body.userData.type === 'balloon') {
                mesh.position.copy(body.position); // Synchroniser la position
                mesh.quaternion.copy(body.quaternion); // Synchroniser l'orientation
            } else if (body.userData.type === 'box-body') {
                const worldPosition = new THREE.Vector3();
                mesh.getWorldPosition(worldPosition);
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

    addBoddies() {
        for (const bodyName in bodiesSizes) {
            const { name, radius, height, rotation, type, follow } = bodiesSizes[bodyName];
    
            // mask and group
            let group, mask;

            if (bodyName === 'torsoUpper' || bodyName === 'torsoLower') {
                group = collisionGroups.torso;
                mask = collisionGroups.rightLeg | collisionGroups.leftLeg | collisionGroups.head | collisionGroups.default | collisionGroups.rightArm | collisionGroups.leftArm;
            } else if (bodyName === 'rightHip' || bodyName === 'rightLeg' || bodyName === 'rightTight') {
                group = collisionGroups.rightLeg;
                mask = collisionGroups.leftLeg| collisionGroups.default | collisionGroups.rightArm | collisionGroups.leftArm;
            } else if (bodyName === 'leftHip' || bodyName === 'leftLeg' || bodyName === 'leftTight') {
                group = collisionGroups.leftLeg;
                mask = collisionGroups.rightLeg | collisionGroups.default | collisionGroups.rightArm | collisionGroups.leftArm;
            } else if (bodyName === 'headSphere' || bodyName === 'headCapsule') {
                group = collisionGroups.head;
                mask = collisionGroups.default | collisionGroups.rightArm | collisionGroups.leftArm;
            } else  if (bodyName === 'leftArm') {
                group = collisionGroups.leftArm;
                mask = collisionGroups.rightArm | collisionGroups.default | collisionGroups.rightLeg | collisionGroups.leftLeg | collisionGroups.head | collisionGroups.torso;
            } else if (bodyName === 'rightArm') {
                group = collisionGroups.rightArm;
                mask = collisionGroups.leftArm | collisionGroups.default | collisionGroups.rightLeg | collisionGroups.leftLeg | collisionGroups.head | collisionGroups.torso;
            } else {
                group = collisionGroups.default;
                mask = collisionGroups.torso | collisionGroups.rightLeg | collisionGroups.leftLeg | collisionGroups.head;
            }
            if (type === 'sphere') {
                this.createSphere(name, radius,  follow, group, mask);
            } else {
                this.createCapsule(name, radius, height, rotation, follow, group, mask);
            }
        }
    }


    createSphere(element, radius, follow, group, mask) {
        
        const worldPosition = new THREE.Vector3();
        const meshElement = this.experience.scene.getObjectByName(element);
        meshElement.getWorldPosition(worldPosition);

        const sphereBody = new CANNON.Body({
            mass: 0.001,
            position: new CANNON.Vec3(worldPosition.x, worldPosition.y, worldPosition.z),
            shape: new CANNON.Sphere(radius),
            collisionFilterGroup: group,
            collisionFilterMask: mask,
        });

        sphereBody.collisionResponse = true;
        sphereBody.allowSleep = false;

        sphereBody.userData = {
            name: element,
            type: 'sphere',
            mesh: follow,
        };

        this.world.addBody(sphereBody);

        sphereBody.addEventListener('collide', (event) => {
            if (typeof event.body.userData === 'undefined' || typeof event.body.userData.mesh === 'undefined') return;
            // this.experience.collisionElement.push({ collider: sphereBody.userData.mesh, element:event.body.userData.mesh });
            if (event.body.userData.type.match(/(sphere|capsule)/gi)) this.experience.collisionDetected = true;
        });
        
        this.bodies = {
            ...this.bodies,
            [sphereBody.id]: {
                body: sphereBody,
                mesh: meshElement,
            }
        }

    }



    createCapsule(element, radius, height, rotation, follow, group, mask) {
        
        const worldPosition = new THREE.Vector3();
        const meshElement = this.experience.scene.getObjectByName(element);
        meshElement.getWorldPosition(worldPosition);
        const capsuleBody = new CANNON.Body({
            mass: 0.01,
            position: new CANNON.Vec3(worldPosition.x, worldPosition.y, worldPosition.z),
            collisionFilterGroup: group,
            collisionFilterMask: mask,
        });
        
        capsuleBody.collisionResponse = true;
        capsuleBody.allowSleep = false;

        capsuleBody.userData = {
            name: element,
            type: 'capsule',
            mesh: follow,
        };
    
        
        const cylinder = new CANNON.Cylinder(radius, radius, height, 16);
        capsuleBody.addShape(cylinder);
    
        
        const topSphere = new CANNON.Sphere(radius);
        capsuleBody.addShape(topSphere, new CANNON.Vec3(0, height / 2, 0));
    
        
        const bottomSphere = new CANNON.Sphere(radius);
        capsuleBody.addShape(bottomSphere, new CANNON.Vec3(0, -height / 2, 0));
        
        // Doen't work for now
        const initialQuaternion = new CANNON.Quaternion();
        initialQuaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), rotation.x);

        if (rotation.z) {
            const zRotation = new CANNON.Quaternion();
            zRotation.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), rotation.z);
            initialQuaternion.mult(zRotation, initialQuaternion);
        }

        if (rotation.y) {
            const yRotation = new CANNON.Quaternion();
            yRotation.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), rotation.y);
            initialQuaternion.mult(yRotation, initialQuaternion);
        }

        // doesn't work for now
        capsuleBody.quaternion.copy(initialQuaternion);
        capsuleBody.addEventListener('collide', (event) => {
            if (typeof event.body.userData === 'undefined' || typeof event.body.userData.mesh === 'undefined') return;
            // this.experience.collisionElement.push({ collider: capsuleBody.userData.mesh, element:event.body.userData.mesh });
            if (event.body.userData.type.match(/(sphere|capsule)/gi)) this.experience.collisionDetected = true;
            
        });

        this.world.addBody(capsuleBody);
        

        this.bodies = {
            ...this.bodies,
            [capsuleBody.id]: {
                body: capsuleBody,
                mesh: meshElement,
            }
        }

    }

    addElements(element) {
        const countBallons = Object.values(this.bodies).filter(el => el.body.userData.type === 'balloon').length;
        if (countBallons > 200) {
            const ballonButton = document.getElementById('button-add-element');
            ballonButton.disabled = true;
            ballonButton.innerHTML = "Max";
            return;
        };
        for (let i = 0; i < 20; i++) {

            const randomPosition = new CANNON.Vec3(
                Math.random() * 2 - 0.5,
                Math.random() * 2 + 0.5,
                Math.random() * 2 - 0.5
            );
            const balloon = new CANNON.Body({
                material: new CANNON.Material(),
                mass: 0.01,
                position: new CANNON.Vec3(randomPosition.x, randomPosition.y, randomPosition.z),
                shape: element === "cube" ?  new CANNON.Box(new CANNON.Vec3(0.1, 0.1, 0.1)) : new CANNON.Sphere(0.1),
                collisionFilterGroup: collisionGroups.other, // Assurez-vous que ce groupe est compatible
                // collisionFilterMask: collisionGroups.default, // avec le masque de collision par défaut
            });

            balloon.collisionResponse = true;
            balloon.allowSleep = false;
            const mat1 = new CANNON.ContactMaterial(this.groundBody.material, balloon.material, { friction: 0.1, restitution: 0.4 });
            this.world.addContactMaterial(mat1);
            balloon.userData = {
                name: `balloon-${i}`,
                type: 'balloon',
            };

            this.world.addBody(balloon);

            const randomColor = Math.random() * 0xffffff;

            const material = new THREE.MeshStandardMaterial({ color: randomColor });
            const balloonMesh = new THREE.Mesh(
                element === "cube" ? new THREE.BoxGeometry(0.2, 0.2, 0.2) : new THREE.SphereGeometry(0.1, 32, 32),
                material
            );
            // const balloonMesh = new THREE.Mesh(
            //     new THREE.SphereGeometry(0.1, 32, 32),
            //     material
            // );

            balloonMesh.castShadow = true;
            balloonMesh.receiveShadow = true;

            balloonMesh.position.copy(randomPosition);

            this.experience.scene.add(balloonMesh);

            // return balloon;
            this.bodies = {
                ...this.bodies,
                [balloon.id]: {
                    body: balloon,
                    mesh: balloonMesh,
                }
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
        ballonButton.innerHTML = "Ballons";

    }
}
