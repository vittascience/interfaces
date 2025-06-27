import * as THREE from './libs/three.js';
import { GLTFLoader } from './libs/loader/GLTFLoader.js';
import { FBXLoader } from './libs/loader/FBXLoader.js';

import Experience from './Experience.js';
export default class World {
	constructor(modelPath, modelType, animations) {
		this.experience = new Experience();
		this.config = this.experience.config;
		this.modelPath = modelPath;
		this.modelType = modelType;
		this.animations = animations;
		this.scene = this.experience.scene;
		this.usePostprocess = this.experience.options.usePostprocess;
		this.gltfLoader = new GLTFLoader(); // to be used in other classes
		this.addGround();
		this.loadModel();
		this.addLights();
		this.addAxes();
	}

	loadModel() {
		const model = this.modelPath;
		const modelType = this.modelType;
		// todo: add glb or fbx support
		this.loader = this.modelType === 'fbx' ? new FBXLoader() : new GLTFLoader();
		this.loader.load(
			model,
			(object) => {
				let sceneModel;
				if (modelType === 'fbx') {
					object.scale.set(0.1, 0.1, 0.1);
					object.name = 'modelCustom';
					object.position.set(0, 0.6, 0);
					this.scene.add(object);
					sceneModel = object;
				} else {
					object.scene.name = 'modelCustom';
					this.scene.add(object.scene);
					sceneModel = object.scene;
				}

				// S'il y a des animations, on les stocke
				if (object.animations && object.animations.length > 0) {
					const mixer = new THREE.AnimationMixer(sceneModel);
					this.experience.mixers = [];
					this.experience.mixers.push(mixer);
					this.experience.actions = {};

					// Stocker les animations par leur nom
					object.animations.forEach((anim) => {
						const newTracks = [];
						// Crée une action pour chaque animation et la stocke par son nom
						if (this.animations && this.animations[anim.name] && !this.animations[anim.name].allBones) {
							anim.tracks.forEach((track) => {
								const trackName = track.name.split('.')[0];
								if (this.animations[anim.name].bones.includes(trackName)) {
									newTracks.push(track);
								}
							});
							anim.tracks = newTracks;
						} else if (this.animations && this.animations[anim.name] && this.animations[anim.name].allBones) {
							anim.tracks = anim.tracks.filter((track) => {
								const trackName = track.name.split('.')[0];
								if (!this.animations[anim.name].excludedBones.includes(trackName)) {
									newTracks.push(track);
								}
							});
							anim.tracks = newTracks;
						}
						
						const action = mixer.clipAction(anim);
						this.experience.actions[anim.name] = action; // Stocker l'action dans experience.actions
					});
				}
				this.experience.loaded = true;
			},
			(xhr) => {
				if (this.experience.devDebug) console.log(`Chargement : ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`);
			},
			(error) => {
				console.error(error);
			}
		);
	}

	loadExtraModel(modelPath, type) {
		const model = modelPath;
		const modelType = type;

		this.loader = modelType === 'fbx' ? new FBXLoader() : new GLTFLoader();

		this.loader.load(
			model,
			(object) => {
				let sceneModel;
				if (modelType === 'fbx') {
					object.scale.set(0.1, 0.1, 0.1);
					object.name = 'extraModel';
					object.position.set(0, 0.6, 0);
					this.scene.add(object);
					sceneModel = object;
				} else {
					object.scene.name = modelPath.split('/').pop().split('.')[0];
					this.scene.add(object.scene);
					sceneModel = object.scene;
				}
			},
			(xhr) => {
				if (this.experience.devDebug) console.log(`Chargement : ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`);
			},
			(error) => {
				console.error(error);
			}
		);
	}

	addLights() {
		// const light = new THREE.AmbientLight(0xffffff, 0.5);
		// this.scene.add(light);
		// // const light1 = new THREE.DirectionalLight(0xffffff, 4);
		// // this.scene.add(light1);
		// const light2 = new THREE.DirectionalLight(0xffffff, 2);
		// this.scene.add(light2);
		const light = new THREE.AmbientLight(0xffffff, 0.5);
		light.name = 'ambientLight';
		this.scene.add(light);
		const secondLightIntensity = this.usePostprocess.enabled ? 4 : 2;
		const light1 = new THREE.DirectionalLight(0xffffff,secondLightIntensity);
		light1.position.set(this.config.directionalLight.position[0], this.config.directionalLight.position[1], this.config.directionalLight.position[2]);
		light1.castShadow = true
		light1.shadow.mapSize.width = 4096
		light1.shadow.mapSize.height = 4096
		light1.shadow.camera.near = 0.0001;
		light1.shadow.camera.far = 50; 
		light1.shadow.camera.top = 5; 
		light1.shadow.camera.bottom = -5;
		light1.shadow.camera.left = -10;
		light1.shadow.camera.right = 10;
		light1.shadow.bias = -0.0001;
		light1.name = 'directionalLight';
		this.scene.add(light1);
	}

	addGround() {
		if (this.experience.options.ground.hasGround === false) return;
		if (this.experience.options.ground.type === 'grid') {
			const gridSize = this.experience.options.ground.gridSize;
			const divisions = this.experience.options.ground.divisions; // Nombre de divisions de la grille
			const gridHelper = new THREE.GridHelper(gridSize, divisions, 0xffffff, 0xffffff);

			// 2. Positionner la grille au sol (si nécessaire, vous pouvez la déplacer légèrement vers le bas pour éviter les problèmes de z-fighting avec d'autres objets)
			gridHelper.position.y = -0.01;

			// Ajouter la grille à la scène
			gridHelper.name = 'floorGridHelper';
			this.scene.add(gridHelper);
		} else if (this.experience.options.ground.type === 'plane') {
			const planeSize = this.experience.options.ground.planeSize;
			const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
			const planeMaterial = new THREE.MeshStandardMaterial({
				color: this.experience.options.ground.floorColor,
				depthWrite: false,
			});
			const plane = new THREE.Mesh(planeGeometry, planeMaterial);
			plane.name = 'floorPlane';
			plane.rotation.x = -Math.PI / 2;
			plane.receiveShadow = true;
			plane.name = 'floorPlane';
			this.scene.add(plane);
		}
	}

	addAxes() {
		if (this.experience.options.hasHelpers === false) return;
		const size = 10;

		const createAxis = (color, start, end, name) => {
			const material = new THREE.LineBasicMaterial({ color: color });
			const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
			const line = new THREE.Line(geometry, material);
			line.name = name;
			this.scene.add(line);
		};

		// Axe X (Rouge)
		createAxis(0x00ff00, new THREE.Vector3(-size, 0, 0), new THREE.Vector3(size, 0, 0), "x-axis");

		// Axe Y (Vert)
		createAxis(0x0000ff, new THREE.Vector3(0, -size, 0), new THREE.Vector3(0, size, 0), "y-axis");

		// Axe X (Rouge)
		createAxis(0xff0000, new THREE.Vector3(0, 0, -size), new THREE.Vector3(0, 0, size), "z-axis");
	}

	update() {}
}
