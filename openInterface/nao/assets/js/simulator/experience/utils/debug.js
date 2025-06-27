import * as dat from '/openInterface/interfaces/assets/js/simulator3d/libs/lil-gui.js';
import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';
export default class Gui {
	constructor(experience) {
		this.experience = experience;
		this.ui = new dat.GUI({ autoPlace: false });
		this.initGui();
	}

	initGui() {
		console.log('initGui');

		const target = this.experience.hierarchie['shinL'];

		const ikFolder = this.ui.addFolder('IK');

		// Dossier pour l'IK
		// ikFolder.add(target.position, 'x', -10, 10).step(0.01).name('IK Target X');
		// ikFolder.add(target.position, 'y', -10, 10).step(0.01).name('IK Target Y');
		// ikFolder.add(target.position, 'z', -10, 10).step(0.01).name('IK Target Z');

		// // Dossier pour l'IK
		// ikFolder.add(target.position, 'x', -10, 10).step(0.01).name('IK Target X');
		// ikFolder.add(target.position, 'y', -10, 10).step(0.01).name('IK Target Y');
		// ikFolder.add(target.position, 'z', -10, 10).step(0.01).name('IK Target Z');

		const rootBone = this.experience.hierarchie.root_bone;

		// Dossier pour le rootBone
		const rootBoneFolder = this.ui.addFolder('Root Bone');
		rootBoneFolder.add(rootBone.rotation, 'z', -2.0857, 2.0857).step(0.01).name('Root Bone Yaw (z)');
		rootBoneFolder.add(rootBone.position, 'y', -10, 10).step(0.01).name('Root Bone Y (Y)');
		rootBoneFolder.add(rootBone.position, 'z', -10, 10).step(0.01).name('Root Bone Z (Z)');
		rootBoneFolder.add(rootBone.position, 'x', -10, 10).step(0.01).name('Root Bone X (X)');

		// Obtenir les références des joints de la tête
		const neck = this.experience.hierarchie.neck;
		const head = this.experience.hierarchie.head;

		// Créer un dossier pour le "neck"
		const headFolder = this.ui.addFolder('head');

		// Ajouter les contrôles pour le joint "neck"
		headFolder.add(neck.rotation, 'y', -2.0857, 2.0857).step(0.01).name('Neck Yaw (Y)');
		headFolder.add(head.rotation, 'x', -0.672, 0.5149).step(0.01).name('Head pitch (x)');

		// Groupe des joints de l'épaule gauche (Left Shoulder)
		const shoulderL = this.experience.hierarchie.shoulderL;
		const elbowL = this.experience.hierarchie.upperarmL;
		const wristL = this.experience.hierarchie.forearmL;
		const handL = this.experience.hierarchie.handL;

		// Dossier pour l'épaule gauche
		const shoulderFolder = this.ui.addFolder('Left Shoulder');
		shoulderFolder.add(shoulderL.rotation, 'x', -2.0857, 2.0857).step(0.01).name('LShoulder Pitch (x)');
		shoulderFolder.add(elbowL.rotation, 'x', -0.3142, 1.6).step(0.01).name('Shoulder roll (X)');
		shoulderFolder.add(wristL.rotation, 'x', -1.8238, 1.8238).step(0.01).name('Elbow roll (X)');
		shoulderFolder.add(wristL.rotation, 'y', -2.0857, 2.0857).step(0.01).name('Elbow yaw (Y)');
		shoulderFolder.add(handL.rotation, 'y', -1.8238, 1.8238).step(0.01).name('Wrist yaw (Y)');

		// Groupe des joints de l'épaule droite (Right Shoulder)
		const shoulderR = this.experience.hierarchie.shoulderR;
		const elbowR = this.experience.hierarchie.upperarmR;
		const wristR = this.experience.hierarchie.forearmR;
		const handR = this.experience.hierarchie.handR;

		// Dossier pour l'épaule droite
		const shoulderFolderR = this.ui.addFolder('Right Shoulder');
		shoulderFolderR.add(shoulderR.rotation, 'x', -2.0857, 2.0857).step(0.01).name('RShoulder Pitch (x)');
		shoulderFolderR.add(elbowR.rotation, 'x', -0.3142, 1.5).step(0.01).name('Shoulder roll (X)');
		shoulderFolderR.add(wristR.rotation, 'x', -1.8238, 1.8238).step(0.01).name('Elbow roll (X)');
		shoulderFolderR.add(wristR.rotation, 'y', -2.0857, 2.0857).step(0.01).name('Elbow yaw (Y)');
		shoulderFolderR.add(handR.rotation, 'y', -1.8238, 1.8238).step(0.01).name('Wrist yaw (Y)');

		// Groupe des joints de la hanche gauche (Left Hip)
		const hipL = this.experience.hierarchie.pelvisL;
		const hipRoll = this.experience.hierarchie.pelvisL001
		const thighL = this.experience.hierarchie.tightL;
		const thighR = this.experience.hierarchie.tightR;
		const shinL = this.experience.hierarchie.shinL;
		const foot = this.experience.hierarchie.shinL001;
		const ankleL = this.experience.hierarchie.anckleL;

		// Création d'une rotation locale de 45° sur l'axe Z
		const rotation45Deg = new THREE.Quaternion();
		rotation45Deg.setFromAxisAngle(new THREE.Vector3(0, 0, 1), THREE.MathUtils.degToRad(-135));

		// Appliquer cette rotation initiale à la hanche gauche (hipL)
		// hipL.quaternion.multiplyQuaternions(rotation45Deg, hipL.quaternion);

		// Dossier pour la hanche gauche
		const hipFolder = this.ui.addFolder('Left Hip');
		// hipFolder.add(hipL.rotation, 'x', -1.1453, 1.1453).step(0.01).name('Hip pitch (x)');
		// Ajouter un slider pour manipuler la rotation sur l'axe X de hipL avec une rotation préalable sur Z de 45°
		// hipFolder
		// 	.add({ rotationX: 0 }, 'rotationX', -Math.PI, Math.PI)
		// 	.step(0.01)
		// 	.name('Hip pitch (x)')
		// 	.onChange((value) => {
		// 		// Appliquer la rotation de 45° sur Z en premier
		// 		const localRotation = new THREE.Quaternion();
		// 		localRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), value); // rotation sur X (pitch)

		// 		// Appliquer la rotation sur Z puis sur X
		// 		hipL.quaternion.copy(rotation45Deg).multiply(localRotation);
		// 	});
		// hipFolder.add(hipRoll.rotation, 'y', -1.1453, 1.1453).step(0.01).name('Hip roll (y)');
		// hipFolder.add(thighL.rotation, 'x', -2.0857, 2.0857).step(0.01).name('Thigh pitch (x)');
		// hipFolder.add(thighR.rotation, 'x', -2.0857, 2.0857).step(0.01).name('Thigh pitch (x)');
		// hipFolder.add(shinL.rotation, 'x', -2.0857, 2.0857).step(0.01).name('Shin pitch (x)');
		// hipFolder.add(ankleL.rotation, 'x', -1.1453, 1.1453).step(0.01).name('Ankle pitch (x)');
		// hipFolder.add(foot.rotation, 'x', -0.349, 0.349).step(0.01).name('Foot pitch (x)');
		// hipFolder.add(ankleL.rotation, 'z', -0.349, 0.349).step(0.01).name('Ankle yaw (z)');

		// Configuration de l'UI
		const experience3D = document.querySelector('.experience3D');
		const canvas = experience3D.querySelector('canvas');
		const container = document.createElement('div');
		container.id = 'my-gui-container';
		container.appendChild(this.ui.domElement);
		container.style.position = 'absolute';
		container.style.top = '0';
		container.style.right = '0';
		container.style.zIndex = '1000';
		container.style.height = 'auto';

		// document.body.appendChild(container); // Ajoutez cette ligne
		experience3D.insertBefore(container, canvas);
	}
}
