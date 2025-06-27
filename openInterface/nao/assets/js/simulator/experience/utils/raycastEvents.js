import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';

export default class RaycastModel {
	constructor(experience, mapJointValues) {
		this.experience = experience;
		this.mapJointValues = mapJointValues;
		this.intersectArray = [];
		this.meshesByGroup = {};
		this.actualGroup = null;
		this.savedMaterial = [];
		this.overlayMovement = false;
		this.groupedLocked = false;
		this.initRaycast();
	}

	addMeshToIntersectArray(group, patterns) {
		this.experience.scene.traverse((child) => {
			if (child.isMesh && patterns.some((pattern) => child.name.toLowerCase().startsWith(pattern.toLowerCase()))) {
				this.intersectArray.push(child);
				if (!this.meshesByGroup[group]) {
					this.meshesByGroup[group] = [];
					this.meshesByGroup[group].name = [];
					this.meshesByGroup[group].meshes = [];
				}
				this.meshesByGroup[group].name.push(child.name);
				this.meshesByGroup[group].meshes.push(child);
			}
		});
	}

	changeMaterial(group) {
		if (this.actualGroup) {
			this.restoreMaterial(this.actualGroup); // Restore previous group's material
		}
		this.actualGroup = group;

		const newMaterial = new THREE.MeshStandardMaterial();
		newMaterial.color = new THREE.Color(0xffeab0);
		newMaterial.emissive = new THREE.Color(0xffeab0);
		newMaterial.emissiveIntensity = 0.05;
		newMaterial.transparent = true;
		newMaterial.opacity = 0.60;
        newMaterial.side = THREE.DoubleSide;
        newMaterial.castShadow = true;


		this.meshesByGroup[group].meshes.forEach((mesh) => {
			if (mesh.material.name !== 'NaoMat/MainSkin') return;
			this.savedMaterial.push({ mesh, material: mesh.material });
			mesh.material = newMaterial;
			mesh.layers.enable(1);
		});
	}

	restoreMaterial() {
		this.savedMaterial.forEach(({ mesh, material }) => {
			mesh.material = material; // Restore original material
			mesh.layers.disable(1);
		});
		this.savedMaterial = []; // Clear saved materials
	}

	async handleClick() {
        if (this.actualGroup === "torsoGroup") return;
		if (this.actualGroup && !this.groupedLocked) {
			
			document.body.style.cursor = 'default';
			this.groupedLocked = true;
			const overlayMovement = document.getElementById('movements-overlay');
			overlayMovement.classList.toggle('active-overlay-button');
            const jointGroupElement = document.getElementById(this.actualGroup);
            jointGroupElement.classList.toggle('active-joints-group');
			this.mapJointValues.setAllRotationsValues();
		}
	}

	initRaycast() {
		const raycaster = new THREE.Raycaster();
		const pointer = new THREE.Vector2();

		const groups = {
			torsoGroup: { names: 'torsoGroup', patterns: ['NAOTorsoV6'] },
			headGroup: { names: 'headGroup', patterns: ['NAOHeadPitch', 'NAOHeadYaw'] },
			leftArmGroup: { names: 'leftArmGroup', patterns: ['NAOLShoulder', 'NAOLElbow', 'NAOLWrist', 'NAO_LFinger', 'NAO_LThumb', 'NAOH25V60xmlLShoulder', 'epaulet_left', 'NAOH25V60xmlLElbowRoll', 'naoLWristYawV6'] },
			rightArmGroup: { names: 'rightArmGroup', patterns: ['NAORShoulder', 'NAORElbow', 'NAORWrist', 'NAO_RFinger', 'NAO_RThumb', 'NAOH25V60xmlRShoulder', 'epaulet_right', 'NAOH25V60xmlRElbowRoll', 'naoRWristYawV6'] },
			// leftLegGroup: { names: 'leftLegGroup', patterns: ['NAOLHip', 'NAOLKnee', 'NAOLAnkle'] }, // unused intil physics is implemented
			// rightLegGroup: { names: 'rightLegGroup', patterns: ['NAORHip', 'NAORKnee', 'NAORAnkle'] }, // unused intil physics is implemented
		};

		for (const group in groups) {
			this.addMeshToIntersectArray(groups[group].names, groups[group].patterns);
		}

		const onPointerMove = (event) => {
			const canvasElement = document.querySelector('.experience3D canvas');
			this.rect = canvasElement.getBoundingClientRect();
			pointer.x = ((event.clientX - this.rect.left) / this.rect.width) * 2 - 1;
			pointer.y = -((event.clientY - this.rect.top) / this.rect.height) * 2 + 1;
			raycaster.setFromCamera(pointer, this.experience.camera.instance);

			const intersects = raycaster.intersectObjects(this.intersectArray, true);
			if (intersects.length > 0 && !this.groupedLocked) {
				for (const group in this.meshesByGroup) {
					if (this.meshesByGroup[group].name.includes(intersects[0].object.name) && group !== this.actualGroup) {
						this.actualGroup = group;
						this.changeMaterial(group);
						document.body.style.cursor = 'pointer';
					}
				}
			} else {
				if (!this.groupedLocked) {
					this.restoreMaterial(this.actualGroup);
					document.body.style.cursor = 'default';
					this.actualGroup = null;
				}
			}
		};

		window.addEventListener('pointermove', onPointerMove);
		const closeMovementButton = document.getElementById('close-movements-button');
		closeMovementButton.addEventListener('click', () => {
			this.restoreMaterial(this.actualGroup);
            const jointGroupElement = document.getElementById(this.actualGroup);
            jointGroupElement.classList.toggle('active-joints-group');
			this.actualGroup = null;
			const overlayMovement = document.getElementById('movements-overlay');
			overlayMovement.classList.toggle('active-overlay-button');
			this.groupedLocked = false;

		});
		const experience3D = document.querySelector('.experience3D');
		experience3D.addEventListener('mousedown', this.handleClick.bind(this));
		window.addEventListener('resize', () => {
			this.rect = canvasElement.getBoundingClientRect();
		});
	}
}
