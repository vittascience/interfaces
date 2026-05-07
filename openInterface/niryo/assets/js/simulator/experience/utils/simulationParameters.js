import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';

export default class SimulationParameters {
	constructor(experience, exp) {
		this.experience = experience;
		this.exp = exp;
		this.physicsEnabled = true;
		this.currentGravity = 9.81;
		this.currentScenario = 'default';
		this.penColor = '#FF0000';
		this.robotColor = '#0000FF';

		this.init();
	}

	init() {
		this.physicsToggle = document.getElementById('physics-toggle');
		this.gravitySelect = document.getElementById('gravity-select');
		this.resetPhysicsButton = document.getElementById('reset-physics-button');
		this.scenarioSelect = document.getElementById('scenario-select');
		this.penColorSelect = document.getElementById('pen-color-select');
		this.robotColorSelect = document.getElementById('robot-color-select');
		this.initEventListeners();
	}

	initEventListeners() {
		this.physicsToggle.addEventListener('change', (e) => {
			this.togglePhysics(e.target.checked);
		});

		this.gravitySelect.addEventListener('change', (e) => {
			this.changeGravity(parseFloat(e.target.value));
		});

		this.resetPhysicsButton.addEventListener('click', () => {
			this.resetPhysics();
		});

		this.scenarioSelect.addEventListener('change', (e) => {
			this.changeScenario(e.target.value);
		});

		this.penColorSelect.addEventListener('change', (e) => {
			this.changePenColor(e.target.value);
		});

		this.robotColorSelect.addEventListener('change', (e) => {
			this.changeRobotColor(e.target.value);
		});
	}

	/**
	 * Active ou désactive la physique dans la simulation
	 * @param {boolean} enabled - État de la physique
	 */
	togglePhysics(enabled) {
		this.physicsEnabled = enabled;
        // TODO (or not)
		// if (this.exp.physics) {
		// 	if (enabled) {
		// 		this.exp.physics.enable();
		// 	} else {
		// 		this.exp.physics.disable();
		// 	}
		// }
	}

	/**
	 * Change la gravité de la simulation
	 * @param {number} gravity - Valeur de la gravité en m/s²
	 */
	changeGravity(gravity) {
		this.currentGravity = gravity;
		if (this.exp.physics) {
			this.exp.physics.setGravity(-gravity);
		}
	}

	/**
	 * Réinitialise la physique de la simulation
	 */
	resetPhysics() {
		if (this.exp.physics) {
			this.exp.physics.reset();
		}
	}

	/**
	 * Change le scénario de la simulation
	 * @param {string} scenario - Nom du scénario
	 */
	changeScenario(scenario) {
		this.currentScenario = scenario;
		switch (scenario) {
			case 'default':
				this.loadDefaultScenario();
				break;
			case 'scenario1':
				this.loadScenario1();
				break;
			case 'scenario2':
				this.loadScenario2();
				break;
			case 'scenario3':
				this.loadScenario3();
				break;
			default:
				console.warn(`Scénario inconnu: ${scenario}`);
		}
	}

	/**
	 * Change la couleur du tracé du stylo
	 * @param {string} color - Couleur hexadécimale
	 */
	changePenColor(color) {
		this.penColor = color;
		if (this.exp.colorLineTrajectory) {
			this.exp.colorLineTrajectory = new THREE.Color(color);
		}
	}

	/**
	 * Change la couleur du robot
	 * @param {string} color - Couleur hexadécimale
	 */
	changeRobotColor(color) {
		this.robotColor = color;
		this.updateRobotColor(color);
	}

	loadScenario1() {
		this.exp.changeScenario('default');
	}

	loadScenario2() {
		this.exp.changeScenario('tower');
	}

	loadScenario3() {
		this.exp.changeScenario('pyramid');
	}

	/**
	 * Met à jour la couleur du robot dans la scène
	 * @param {string} color - Couleur hexadécimale
	 */
	updateRobotColor(color) {
        const partToChange = ['base_link', 'shoulder_link', 'upper_arm_link', 'forearm_link', 'wrist_1_link', 'wrist_2_link', 'wrist_3_link', 'gripper_left_finger_link', 'gripper_right_finger_link'];
		this.experience.scene.traverse((child) => {
			if (child.isMesh && child.material && partToChange.includes(child.name)) {
				if (child.material.name === 'blue') {
					child.material.color.set(color);
				}
			}
		});
	}
}
