import { Sky } from '/openInterface/interfaces/assets/js/simulator3d/libs/Sky.js';
import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';

export default class Background {
	constructor(experience, exp) {
		this.experience = experience;
		this.exp = exp;
		this.textureLoader = new THREE.TextureLoader();
		this.init();
		this.defaultGroundColor = new THREE.Color(0xededed);
		this.userScene = 'default';
	}

	init() {

        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: this.defaultGroundColor,
            side: THREE.DoubleSide,
        });

        const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        groundMesh.rotation.x = -Math.PI / 2;
        groundMesh.position.y = -0.010;
        groundMesh.receiveShadow = true;
        this.experience.scene.add(groundMesh);


		const sky = new Sky();
		sky.scale.setScalar(100);
		this.experience.scene.add(sky);

		const skyUniforms = sky.material.uniforms;

		skyUniforms['turbidity'].value = 50;
		skyUniforms['rayleigh'].value = 2;
		skyUniforms['mieCoefficient'].value = 0.005;
		skyUniforms['mieDirectionalG'].value = 0.8;

		const parameters = {
			elevation: 30,
			azimuth: 1,
		};

		const pmremGenerator = new THREE.PMREMGenerator(this.experience.renderer.instance);
		const sceneEnv = new THREE.Scene();
		const sun = new THREE.Vector3();

		let renderTarget;

		const updateSun = () => {
			const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
			const theta = THREE.MathUtils.degToRad(parameters.azimuth);

			sun.setFromSphericalCoords(1, phi, theta);

			sky.material.uniforms['sunPosition'].value.copy(sun);

			if (renderTarget !== undefined) renderTarget.dispose();

			sceneEnv.add(sky);
			renderTarget = pmremGenerator.fromScene(sceneEnv);
			this.experience.scene.add(sky);

			this.experience.scene.environment = renderTarget.texture;
		};

		updateSun();
	}
}
