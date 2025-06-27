import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';
import { CCDIKSolver, CCDIKHelper } from '/openInterface/interfaces/assets/js/simulator3d/libs/CCDIKSolver.js';

export default class IKSolver {
	constructor(experience) {
		this.experience = experience;
		this.hierarchie = this.experience.hierarchie;
		this.iks = [];
		this._init();
	}

	_init() {
		this._loadIKs();
		this._initIKSolver();
	}

	_loadIKs() {
		
		this.iksChainLegLeft = [
			{ bone: this.hierarchie['pelvisL001'] },
			{ bone: this.hierarchie['tightL'] },
			{ bone: this.hierarchie['shinL'] },
		];

		
		this.iks.push({
			target: this.hierarchie['CTRL_leg_IKL'],
			effector: this.hierarchie['anckleL'], 
			links: this.iksChainLegLeft,
			iteration: 10, 
		});
	}

	_initIKSolver() {
        // Scene model
		const model = this.experience.scene.getObjectByName('modelCustom');
		if (!model) {
			console.error('Modèle non trouvé dans la scène');
			return;
		}

		
		const bones = [
            this.hierarchie['root_bone'], 
            this.hierarchie['spine'],
            this.hierarchie['pelvisL'],
            this.hierarchie['pelvisL001'],
            this.hierarchie['tightL'],
            this.hierarchie['shinL'],
            this.hierarchie['shinL001'],
            this.hierarchie['anckleL'],
        ];

		if (bones.length === 0) {
			console.error("Aucun bone trouvé dans l'armature");
			return;
		}

		const skeleton = new THREE.Skeleton(bones);

		
		model.skeleton = skeleton;

		
        const iks = [
            {
                target: 4,
                effector: 7,
                links: [
                    {
                        index: 6,  // shinL001
                        rotationMin: { x: -Math.PI / 4, y: 0, z: 0 },
                        rotationMax: { x: Math.PI / 4, y: 0, z: 0 }
                    },
                    {
                        index: 5,  // shinL
                        rotationMin: { x: -Math.PI / 2, y: 0, z: 0 },
                        rotationMax: { x: Math.PI / 2, y: 0, z: 0 }
                    },
                    {
                        index: 4,  // tightL
                        rotationMin: { x: -Math.PI / 4, y: 0, z: 0 },
                        rotationMax: { x: Math.PI / 4, y: 0, z: 0 }
                    },
                    {
                        index: 3,  // pelvisL001
                        rotationMin: { x: 0, y: -Math.PI / 8, z: 0 },
                        rotationMax: { x: 0, y: Math.PI / 8, z: 0 }
                    },
                    {
                        index: 2,  // pelvisL
                        rotationMin: { x: -Math.PI / 8, y: 0, z: 0 },
                        rotationMax: { x: Math.PI / 8, y: 0, z: 0 }
                    },
                    {
                        index: 1,  // spine
                        rotationMin: { x: -Math.PI / 8, y: 0, z: 0 },
                        rotationMax: { x: Math.PI / 8, y: 0, z: 0 }
                    },
                    {
                        index: 0,  // root_bone
                        rotationMin: { x: 0, y: 0, z: 0 },
                        rotationMax: { x: 0, y: 0, z: 0 }
                    }
                ],
                iteration: 10,
            }
        ];
        

		const ccdikhelper = new CCDIKHelper(model, iks, 0.01);
		this.experience.scene.add(ccdikhelper);
		
		this.ikSolver = new CCDIKSolver(model, iks);
		this.experience.ikSolver = this.ikSolver;

		
		if (!this.ikSolver._valid()) {
			console.error('La structure IK est invalide');
		}
	}
}
