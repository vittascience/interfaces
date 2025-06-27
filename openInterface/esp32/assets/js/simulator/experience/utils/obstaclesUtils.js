import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';

export default class ObsatcleUtils {
	static instance;
	constructor(experience, physics = null) {
		if (ObsatcleUtils.instance) {
			return ObsatcleUtils.instance;
		}
		this.obstacles = [];
		this.obstaclesIds = [];
		this.physics = physics;
		this.experience = experience;

		ObsatcleUtils.instance = this;
	}

	async addObstacle(element, url, shape, width, height, positionX, positionY, id) {
		const complexeMeshArray = ['ramp_left_3D', 'ramp_right_3D', 'ramp_front_3D', 'ramp_back_3D', "ramp_flat_3D"];
		if (this.obstaclesIds.find((obstacle) => obstacle === id)) {
			return;
		}

		this.obstaclesIds.push(id);

		let wall = false;
		let repeat = null;
		if (element === 'mur_horizontal') {
			height = 125;
			width = 5;
			repeat = { x: 2, y: 8 };
			wall = true;
		} else if (element === 'mur_vertical') {
			height = 5;
			width = 125;
			repeat = { x: 8, y: 2 };
			wall = true;
		}

		try {
			if (complexeMeshArray.includes(element) && this.physics !== null) {
				if (element === 'ramp_flat_3D') {
					const geometry = new THREE.BoxGeometry(3, 0.6, 2);
					const material = new THREE.MeshToonMaterial({ color: 0xaeaeae, wireframe: false });
					const mesh = new THREE.Mesh(geometry, material);
					mesh.position.set(positionX / 50, 0.3, positionY / 50);
					mesh.name = id;
					mesh.castShadow = true
					mesh.receiveShadow = true

					this.obstacles.push(mesh)
					this.experience.scene.add(mesh);

					if (this.physics !== null) {
						this.physics.addObstacle(mesh);
					}
					return;

				}
				const { mesh, vertices, faces } = this.createComplexeMesh(element, positionX / 50, positionY / 50);
				if (this.physics !== null) {
					mesh.name = id;
					this.obstacles.push(mesh);
					this.experience.scene.add(mesh);
					this.physics.addObstacleComplexe(mesh, vertices, faces, positionX / 50, positionY / 50);
				}
			} else {
				const texture = await this.loadTextureAsync(url);

				if (wall) {
					texture.rotation = Math.PI / 2;
					texture.center.set(5, 5);
					texture.wrapS = THREE.RepeatWrapping;
					texture.wrapT = THREE.RepeatWrapping;
					texture.repeat.set(repeat.x, repeat.y);
				}

				const material = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide });
				let geometry;

				if (shape === 'rectangle') {
					geometry = new THREE.BoxGeometry(height / 50, wall ? 2 : 1, width / 50);
				} else if (shape === 'circle') {
					geometry = new THREE.CylinderGeometry(height / 50, height / 50, 0.35, 32);
				}

				const obstacleMesh = new THREE.Mesh(geometry, material);
				obstacleMesh.position.x = positionX / 50;
				obstacleMesh.position.z = positionY / 50;
				obstacleMesh.position.y = shape === 'rectangle' ? 0.5 : 0.15;
				obstacleMesh.name = id;

				this.obstacles.push(obstacleMesh);
				this.experience.scene.add(obstacleMesh);
				if (this.physics !== null) {
					this.physics.addObstacle(obstacleMesh, shape);
				}
			}
		} catch (err) {
			console.error(`Failed to load texture for obstacle ${id}:`, err);
		}
	}

	createComplexeMesh(direction, positionX, positionY) {
		// Définir les sommets du prisme avec angle droit
		let vertices;

		let xOffset = positionX || 0;
		let yOffset = positionY || 0;

		switch (direction) {
			case 'ramp_front_3D':
				vertices = [
					new THREE.Vector3(-1, 0, -1), // 0
					new THREE.Vector3(3, 0, -1), // 1
					new THREE.Vector3(3, 0, 1), // 2
					new THREE.Vector3(-1, 0, 1), // 3
					new THREE.Vector3(3, 0.6, 1),
					new THREE.Vector3(3, 0.6, -1),
				];
				break;
			case 'ramp_back_3D':
				vertices = [
					new THREE.Vector3(-1, 0, -1), // 0
					new THREE.Vector3(3, 0, -1), // 1
					new THREE.Vector3(3, 0, 1), // 2
					new THREE.Vector3(-1, 0, 1), // 3
					new THREE.Vector3(-1, 0.6, 1),
					new THREE.Vector3(-1, 0.6, -1),
				];
				break;
			case 'ramp_right_3D':
				vertices = [
					new THREE.Vector3(1, 0, -1), // 1
					new THREE.Vector3(1, 0, 3), // 3
					new THREE.Vector3(-1, 0, 3), // 3
					new THREE.Vector3(-1, 0, -1), // 0
					new THREE.Vector3(-1, 0.6, 3),
					new THREE.Vector3(1, 0.6, 3),
				];
				break;
			case 'ramp_left_3D':
				vertices = [
					new THREE.Vector3(1, 0, -1), // 1
					new THREE.Vector3(1, 0, 3), // 3
					new THREE.Vector3(-1, 0, 3), // 3
					new THREE.Vector3(-1, 0, -1), // 0
					new THREE.Vector3(-1, 0.6, -1),
					new THREE.Vector3(1, 0.6, -1),
				];
				break;
		}

		// Correct faces for CANNONJS
		const faces = [
			[0, 1, 2],
			[0, 2, 3],
			[1, 5, 4],
			[1, 4, 2],
			[2, 4, 3],
			[3, 4, 0],
			[0, 4, 5],
			[0, 5, 1],
		];

		// Correct faces for THREEJS (right & front ramp)
		const facesTHREE1 = [
			[0, 1, 2],
			[0, 2, 3],
			[1, 4, 5],
			[2, 4, 1],
			[5, 0, 1],
			[4, 2, 3],
			[5, 4, 0],
			[4, 3, 0]
		];

		// Correct faces for THREEJS (left & back ramp)
		const facesTHREE2 = [
			[0, 1, 2],
			[0, 2, 3],
			[1, 4, 5],
			[4, 1, 2],
			[2, 4, 3],
			[0, 3, 4],
			[5, 0, 4],
			[0, 1, 5],
		];

		const side = direction === 'ramp_left_3D' || direction === 'ramp_back_3D' ? facesTHREE2 : facesTHREE1;

		// Création du mesh Three.js
		const geometry = new THREE.BufferGeometry()
		const positions = new Float32Array(vertices.flatMap((v) => [v.x, v.y, v.z]));
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setIndex(side.flat());
		geometry.computeVertexNormals();

		const material = new THREE.MeshStandardMaterial({ color: 0xaeaeae, wireframe: false, side: THREE.DoubleSide });

		const mesh = new THREE.Mesh(geometry, material);

		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.position.set(xOffset, 0, yOffset);

		return { mesh, vertices, faces };
	}

	loadTextureAsync(url) {
		return new Promise((resolve, reject) => {
			const textureLoader = new THREE.TextureLoader();
			textureLoader.load(
				url,
				(texture) => resolve(texture), // Résolution si succès
				undefined,
				(err) => reject(err) // Rejet si erreur
			);
		});
	}

	removeObstacle(obstacleName) {
		this.obstacles = this.obstacles.filter((obstacle) => obstacle.name !== obstacleName);
		this.obstaclesIds = this.obstaclesIds.filter((id) => id !== obstacleName);
		// remove element frem RobotSimulator.Obstacles
		const obstaclesDB = JSON.parse(SimulatorLS.get('obstaclesDB'));
		delete obstaclesDB[obstacleName];
		SimulatorLS.set('obstaclesDB', JSON.stringify(obstaclesDB));
		delete RobotSimulator3D.Obstacle.obstaclesDB[obstacleName];
		if (this.physics !== null) {
			this.physics.removeObstacle(obstacleName);
		}
	}

	removeObstacles() {
		this.obstacles.forEach((obstacle) => {
			obstacle.geometry.dispose();
			obstacle.material.dispose();

			this.experience.scene.remove(obstacle);
			if (this.physics !== null) {
				this.physics.removeObstacle(obstacle.name);
			}
		});
		this.obstacles = [];
		this.obstaclesIds = [];
	}

	updateObstacle(obstacleId, position, size) {
		const obstacle = this.obstacles.find((obstacle) => obstacle.id === obstacleId);
		if (obstacle) {
			obstacle.position = position;
			obstacle.size = size;
		}
	}

	getObstacleById(obstacleId) {
		return this.obstacles.find((obstacle) => obstacle.id === obstacleId);
	}

	getObstacles() {
		return this.obstacles;
	}

	getObstaclesData() {
		return this.obstacles.map((obstacle) => {
			return {
				id: obstacle.id,
				position: obstacle.position,
				size: obstacle.size,
				type: obstacle.type,
			};
		});
	}
}
