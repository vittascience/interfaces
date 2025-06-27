import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';


const jointMappings = [
    { index: 0, axes: 'y', direction: 1, idEl: 'neck', bone: 'neck', name: 'HeadYaw' },
    { index: 1, axes: 'x', direction: 1, idEl: 'head', bone: 'head', name: 'HeadPitch' },
    { index: 2, axes: 'x', direction: 1, idEl: 'shoulderL', bone: 'shoulderL', name: 'LShoulderPitch' },
    { index: 3, axes: 'x', direction: -1, idEl: 'upperarmL', bone: 'upperarmL', name: 'LShoulderRoll' },
    { index: 4, axes: 'z', direction: 1, idEl: 'forearmL-yaw', bone: 'forearmLyaw', name: 'LElbowYaw' },
    { index: 5, axes: 'y', direction: -1, idEl: 'forearmL-roll', bone: 'forearmL', name: 'LElbowRoll' },
    { index: 6, axes: 'y', direction: 1, idEl: 'handL', bone: 'handL', name: 'LWristYaw' },
    { index: 7, axes: 'x', direction: 1, idEl: null, bone: 'leftHand', name: 'LHand' }, // Non présent
    { index: 8, axes: 'x', direction: 1, idEl: 'pelvisL-yaw-pitch', bone: 'pelvisL', name: 'LHipYawPitch' },
    { index: 9, axes: 'y', direction: 1, idEl: 'pelvisL001', bone: 'pelvisL001', name: 'LHipRoll' },
    { index: 10, axes: 'x', direction: 1, idEl: 'tightL', bone: 'tightL', name: 'LHipPitch' },
    { index: 11, axes: 'x', direction: -1, idEl: 'shinL', bone: 'shinL', name: 'LKneePitch' },
    { index: 12, axes: 'x', direction: -1, idEl: 'shinL001', bone: 'shinL001', name: 'LAnklePitch' },
    { index: 13, axes: 'z', direction: 1, idEl: 'anckleL', bone: 'anckleL', name: 'LAnkleRoll' },
    { index: 14, axes: 'x', direction: 1, idEl: 'pelvisR-yaw-pitch', bone: 'pelvisR', name: 'RHipYawPitch' },
    { index: 15, axes: 'y', direction: 1, idEl: 'pelvisR001', bone: 'pelvisR001', name: 'RHipRoll' },
    { index: 16, axes: 'x', direction: 1, idEl: 'tightR', bone: 'tightR', name: 'RHipPitch' },
    { index: 17, axes: 'x', direction: -1, idEl: 'shinR', bone: 'shinR', name: 'RKneePitch' },
    { index: 18, axes: 'x', direction: -1, idEl: 'shinR001', bone: 'shinR001', name: 'RAnklePitch' },
    { index: 19, axes: 'z', direction: 1, idEl: 'anckleR', bone: 'anckleR', name: 'RAnkleRoll' },
    { index: 20, axes: 'x', direction: 1, idEl: 'shoulderR', bone: 'shoulderR', name: 'RShoulderPitch' },
    { index: 21, axes: 'x', direction: 1, idEl: 'upperarmR', bone: 'upperarmR', name: 'RShoulderRoll' },
    { index: 22, axes: 'z', direction: 1, idEl: 'forearmR-yaw', bone: 'forearmRyaw', name: 'RElbowYaw' },
    { index: 23, axes: 'y', direction: -1, idEl: 'forearmR-roll', bone: 'forearmR', name: 'RElbowRoll' },
    { index: 24, axes: 'y', direction: 1, idEl: 'handR', bone: 'handR', name: 'RWristYaw' },
    { index: 25, axes: 'y', direction: 1, idEl: null, bone: 'rightHand', name: 'RHand' } // Non présent
  ];
  

// test pose and values (to remove when developping is done)


const speechPos3 = [
    0.009,
    -0.018,
    -1.287,
    0.285,
    -0.002,
    -0.584,
    0.011,
    0.990,
    -0.167,
    0.118,
    0.127,
    -0.084,
    0.100,
    -0.118,
    -0.167,
    -0.118,
    0.135,
    -0.101,
    0.095,
    0.117,
    -1.267,
    -0.913,
    0.219,
    1.410,
    0.020,
    0.022
]

const handSliderValues = {
	leftHand: {
		finger11L: { axes: 'y', direction: 1 },
		finger11L001: { axes: 'x', direction: -1 },
		finger11L002: { axes: 'x', direction: -1 },
		thumbL: { axes: 'y', direction: -1 },
		thumbL001: { axes: 'x', direction: 1 },
		finger21L: { axes: 'y', direction: 1 },
		finger21L001: { axes: 'x', direction: -1 },
		finger21L002: { axes: 'x', direction: -1 },
	},
	rightHand: {
		finger11R: { axes: 'y', direction: -1 },
		finger11R001: { axes: 'x', direction: -1 },
		finger11R002: { axes: 'x', direction: -1 },
		thumbR: { axes: 'y', direction: 1 },
		thumbR001: { axes: 'x', direction: 1 },
		finger21R: { axes: 'y', direction: -1 },
		finger21R001: { axes: 'x', direction: -1 },
		finger21R002: { axes: 'x', direction: -1 },
	},
};

export default class AngleConversion {
    constructor(experience, initialJoints, initialPosition, mapJointValues) {
        this.experience = experience;
        this.initialJoints = initialJoints;
        this.initialPosition = initialPosition;
        this.mapJointValues = mapJointValues;
        this.handSliderValues = handSliderValues;
        this.actualPosition = null;
        this.nao3DPosition = {
            x: 0,
            y: 0,
            theta: 0
        }
    }

    updatePose(values){
        const newValues = values.map((value) => value.toFixed(3));
        if (this.actualPosition !== null) {
            const isSamePosition = this.actualPosition.every(
                (value, index) => Math.abs(value - newValues[index]) < 0.01
            );
            if (isSamePosition) {
                return;
            }
        }

        const rootBone = this.experience.hierarchie["root_bone"];
        const initialRootBonePosition = this.calculateVerticalPosition();
        // Rotation de base pour pelvisL et pelvisR
        const baseRotationPelvisL = new THREE.Quaternion();
        baseRotationPelvisL.setFromAxisAngle(new THREE.Vector3(0, 0, 1), THREE.MathUtils.degToRad(-135));

        const baseRotationPelvisR = new THREE.Quaternion();
        baseRotationPelvisR.setFromAxisAngle(new THREE.Vector3(0, 0, 1), THREE.MathUtils.degToRad(135));


        const jointValues = values;
        for (let i = 0; i < jointMappings.length; i++) {
            const joint = jointMappings[i];
            if (joint.axes) {
                const initialJointPosition = this.initialJoints[joint.bone];
                if (joint.bone === 'pelvisL' || joint.bone === 'pelvisR') {
                    if (joint.bone === 'pelvisL') {
                        // Rotation locale calculée à partir des valeurs du moteur
                        
                        const localRotationLeft = new THREE.Quaternion();
                        localRotationLeft.setFromAxisAngle(new THREE.Vector3(0, 1, 0), jointValues[i] * joint.direction);
                        const localRotationRight = new THREE.Quaternion();
                        localRotationRight.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -jointValues[i] * joint.direction);

                        // Calcul des quaternions finaux pour pelvisL et pelvisR
                        const finalRotationPelvisL = baseRotationPelvisL.clone().multiply(localRotationLeft);
                        const finalRotationPelvisR = baseRotationPelvisR.clone().multiply(localRotationRight);
        
                        // Application des rotations
                        this.experience.hierarchie["pelvisL"].rotation.setFromQuaternion(finalRotationPelvisL);
                        this.experience.hierarchie["pelvisR"].rotation.setFromQuaternion(finalRotationPelvisR);
                        this.experience.hierarchie["pelvisL"].updateMatrixWorld(true);
                        this.experience.hierarchie["pelvisR"].updateMatrixWorld(true);

                        // console.log(jointValues[i])
                        // console.log(this.initialJoints["root_bone"].x)
                        // console.log(this.initialJoints["root_bone"].x - (jointValues[i]/2))
                        // need to fix rotation of rootBone when hips move
                        // rootBone.rotation.x = this.initialJoints["root_bone"].x - (jointValues[i]/2);
                        // console.log(this.initialJoints["root_bone"].x, jointValues[i])
                        // console.log(rootBone.rotation.x, jointValues[i])
                        
                        // rootBone.updateMatrixWorld(true);

                        continue; // Passer au joint suivant après avoir traité pelvisL et pelvisR
                    }

                } else if (joint.bone === 'leftHand' || joint.bone === 'rightHand') {
                    
                    const handValues = this.handSliderValues[joint.bone];
                    for (const finger in handValues) {
                        const initialFingerPosition = this.initialJoints[finger];
                        const fingerJoint = handValues[finger];
                        const finalValue = initialFingerPosition[fingerJoint.axes] + fingerJoint.direction * jointValues[i];
                        this.experience.hierarchie[finger].rotation[fingerJoint.axes] = finalValue;
                    };
                } else {
                    
                    const finalValue = initialJointPosition[joint.axes] + joint.direction * jointValues[i];
                    this.experience.hierarchie[joint.bone].rotation[joint.axes] = finalValue;
                    // this.experience.hierarchie[joint.bone].updateMatrixWorld(true);
                }
            }
        }
        this.experience.scene.updateMatrixWorld(true);
        const difference = this.calculateVerticalPosition();
        rootBone.position.y += (initialRootBonePosition - difference) * 18;
        this.actualPosition = newValues;

        this.mapJointValues.setAllRotationsValues();

    }

    calculateVerticalPosition() {
        const ankleL = this.experience.hierarchie["anckleL"]; // Bone pour la cheville gauche
        const ankleR = this.experience.hierarchie["anckleR"]; // Bone pour la cheville droite
    
        // Mettre à jour toutes les matrices mondiales
        this.experience.scene.updateMatrixWorld(true);
    
        // Positions mondiales des bones
        const ankleLPosition = new THREE.Vector3();
        ankleL.getWorldPosition(ankleLPosition);
    
        const ankleRPosition = new THREE.Vector3();
        ankleR.getWorldPosition(ankleRPosition);
    
        // Prendre la hauteur minimale des chevilles par rapport au sol (Y = 0)
        const distanceToGroundL = ankleLPosition.y;
        const distanceToGroundR = ankleRPosition.y;
    
        // Retourner la hauteur minimale (pour garder les pieds au sol)
        return Math.min(distanceToGroundL, distanceToGroundR);
    }
    
    update3DPosition(values) {
        const factor = 18;
        this.nao3DPosition.x = values[0];
        this.nao3DPosition.y = values[1];
        this.nao3DPosition.theta = values[2];
        const rootBone = this.experience.hierarchie["root_bone"];
        rootBone.position.x = this.nao3DPosition.y * factor;
        rootBone.position.z = this.nao3DPosition.x * factor;
        rootBone.rotation.z = - this.nao3DPosition.theta;
    }

    singleUpdate(value){
        const values = speechPos3;
        this.updatePose(values);
    }

    addCenterOfMass(values) {
        const scene = this.experience.scene;
        const torso = this.experience.hierarchie["naoTorsoV6"];
    
        // Nettoyer les anciennes sphères de COM
        const objectsToRemove = [];
        scene.traverse((child) => {
            if (child.name === "centerOfMass") {
                objectsToRemove.push(child);
            }
        });
        objectsToRemove.forEach((object) => {
            object.geometry.dispose();
            object.material.dispose();
            scene.remove(object);
        });
    
        // Créer la sphère pour représenter le COM
        const comSphereGeometry = new THREE.SphereGeometry(0.05, 32, 32); // Rayon 2 cm
        const comSphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });
        const comSphere = new THREE.Mesh(comSphereGeometry, comSphereMaterial);
        comSphere.name = "centerOfMass";
    
        // Calculer la position globale du COM
        const centerOfMassLocal = new THREE.Vector3(
            values[0], // X
            values[1], // Y
            values[2]  // Z
        );
        const centerOfMassWorld = torso.localToWorld(centerOfMassLocal);
        comSphere.position.copy(centerOfMassWorld);
    
        // Ajouter la sphère à la scène
        scene.add(comSphere);
    }
    

    drawSupportPolygon(values){
        const scene = this.experience.scene;

        scene.traverse((child) => {
            if (child.name === "supportPolygon") {
                child.geometry.dispose();
                child.material.dispose();
                scene.remove(child);
            }
        });

        const supportPolygon = values;

        const supportPolygonGeometry = new THREE.BufferGeometry().setFromPoints(supportPolygon.map((point) => new THREE.Vector3(point[1], 0, point[0])));
        const supportPolygonMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
        const supportPolygonLine = new THREE.Line(supportPolygonGeometry, supportPolygonMaterial);

        supportPolygonLine.name = "supportPolygon";
        scene.add(supportPolygonLine);
    }
    
    
    
}


