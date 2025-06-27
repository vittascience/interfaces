import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';

export default class RaycastModel {
	constructor(experience, experience3D) {
		this.experience = experience;
		this.experience3D = experience3D;
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
				console.log('child', child.name);
			}
		});
	}

	changeMaterial(group) {
		if (this.actualGroup) {
			this.restoreMaterial(this.actualGroup); // Restore previous group's material
		}
		this.actualGroup = group;
		
		const newMaterial = new THREE.MeshStandardMaterial();
		newMaterial.color = new THREE.Color(0xd145ed);
		newMaterial.emissive = new THREE.Color(0xd145ed);
		newMaterial.emissiveIntensity = 2;
		newMaterial.transparent = true;
		newMaterial.opacity = 0.80;
        newMaterial.side = THREE.DoubleSide;
        newMaterial.castShadow = true;
		
		
		this.meshesByGroup[group].meshes.forEach((mesh) => {
			console.log('group', group);
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
		if (this.actualGroup && !this.groupedLocked) {
			
			document.body.style.cursor = 'default';
			this.groupedLocked = true;
			this.experience3D.openOverlayMovement(this.jointGroups[this.actualGroup]);
		}
	}

	initRaycast() {
		const raycaster = new THREE.Raycaster();
		const pointer = new THREE.Vector2();

		const groups = {
			joint1Group: { names: 'joint1Group', patterns: ["shoulder_link"], sliderId: "slider-j1"},
			joint2Group: { names: 'joint2Group', patterns: ["arm_link"], sliderId: "slider-j2"},
			joint3Group: { names: 'joint3Group', patterns: ["joint_3"], sliderId: "slider-j3"},
			joint4Group: { names: 'joint4Group', patterns: ["forearm_link"], sliderId: "slider-j4"},
			joint5Group: { names: 'joint5Group', patterns: ["wrist_link"], sliderId: "slider-j5"},
			joint6Group: { names: 'joint6Group', patterns: ["joint_6"], sliderId: "slider-j6"},
		};

		this.jointGroups = groups

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
