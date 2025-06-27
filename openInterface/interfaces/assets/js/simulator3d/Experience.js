// // import './style.css'
import * as THREE from './libs/three.js';
import * as dat from './libs/lil-gui.js';

import Time from './Utils/Time.js';
import Stats from './Utils/Stats.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World.js';

export default class Experience {
	static instance;
	constructor(options, sceneReady) {
		if (Experience.instance) {
			return Experience.instance;
		}
		Experience.instance = this;
		this.options = options;
		this.sceneReady = sceneReady;
		this.functions = options.functions;
		this.hierarchie = {};
		this.movementLiberty = options.movementsLiberty;
		this.devDebug = options.params.debug; // console.log
		this.model = options.models.modelPath; // Model path to load
		this.modelType = options.models.modelType; // Model type to load
		this.animations = options.animations;
		this.orbitControlsParams = options.orbitControlsParams;
		this.sizes = { width: options.params.width, height: options.params.height, fov: options.params.fov, clipNear: options.params.clipNear, clipFar: options.params.clipFar };
		this.cameraPositionInit = { x: options.cameraPositionInit.x, y: options.cameraPositionInit.y, z: options.cameraPositionInit.z };
		this.movementObjectFunctions = {};
		this.renderLoopXr = {};
		this.targetElement = document.querySelector('.experience3D');
		this.time = new Time();
		this.loaded = false;
		this.minZoom = options.orbitControlsParams.minDistance;
		this.cameraType = 'default';
		this.mediaRecorder = null;
		this.clock = new THREE.Clock();
		this.stats = new Stats(this.devDebug);
		this.xrActive = false;
		this.resized = false;
		this.fullscreenMode = false;
		this.frameRate = 0;
		this.init();
		this.setMediaRecorder();
		this.setConfig();
		this.setScene();
		this.setCamera();
		this.setRenderer();
		this.setWorld();
		this.update();
	}

	init() {
		window.addEventListener('beforeunload', () => {
			this.destroy();
		});
		if (this.devDebug) console.log('init');
		setTimeout(() => {
			if (this.loaded) {
				if (this.devDebug) console.log('Model loaded');
			} else {
				if (this.devDebug) console.log('model not loaded');
				this.init();
			}
		}, 100);
	}

	setConfig() {
		this.config = {};

		// Debug
		// this.config.debug = window.location.hash === '#debug'

		// Pixel ratio
		this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);

		// Width and height and camera properties
		this.config.width = this.sizes.width; // Simulator width
		this.config.height = this.sizes.height; // Simulator height
		this.config.fov = this.sizes.fov; // Simulator fov
		this.config.clipNear = this.sizes.clipNear; // Simulator clipNear
		this.config.clipFar = this.sizes.clipFar; // Simulator clipFar
		this.config.directionalLight = this.options.params.directionalLight || { position: [2, 3, 1] };
	}

	setScene() {
		this.scene = new THREE.Scene();
	}

	setCamera() {
		this.camera = new Camera();
	}

	setRenderer(buffer = false) {
		this.renderer = new Renderer(buffer, this.cameraType, this.options.usePostprocess);
		this.targetElement.appendChild(this.renderer.instance.domElement);
	}

	setWorld() {
		this.world = new World(this.model, this.modelType, this.animations);
	}

	// registerMovementFunction(fn) {
	//     this.movementFunctions.push(fn.bind(this));
	// }

	getFrameRate() {
		return this.frameRate;
	}

	animation(timeStamp, frame) {
		if (this.stats) this.stats.update();
        
        const delta = this.clock.getDelta();

		if (!this.lastTime) {
			this.lastTime = timeStamp;
		} else {
			const elapsedTime = (timeStamp - this.lastTime) / 1000;
			this.frameRate = 1 / elapsedTime;
			this.lastTime = timeStamp;
		}

		if (this.mixers && this.mixers.length > 0) {
			for (let i = 0; i < this.mixers.length; i++) {
				this.mixers[i].update(delta);
			};
		};

		if (this.ikSolver) {
			this.ikSolver.update();
		};

		try {
			Object.values(this.renderLoopXr).forEach((fn) => {
				fn(timeStamp, frame);
			});
		} catch (error) {
			console.error(error);
		};

		try {
			Object.values(this.movementObjectFunctions).forEach((fn) => {
				fn();
			});
		} catch (error) {
			console.error(error);
		};

		if (!this.xrActive && this.camera.instance.fov !== this.config.fov) {
			this.camera.instance.fov = this.config.fov;
			this.camera.instance.updateProjectionMatrix();
		};

		this.camera.update();

		if (!this.xrActive) {
			this.renderLoopXr = {};
		};

		if (this.world) {
			this.world.update();
		};
		if (this.renderer) {
			this.renderer.update();
		};
	}

	toggleFullscreen(screenMode) {
		this.fullscreenMode = screenMode;
		this.resize();
	}

	resize() {
		const renderer = this.renderer;
		const camera = this.camera.instance;
		const innerWidth = window.innerWidth;
		if (innerWidth > 900 && !this.fullscreenMode) {
			if (this.resized){
				this.resized = false;
				camera.aspect = this.config.width / this.config.height;
				camera.updateProjectionMatrix();
				if (renderer.usePostprocess){
					renderer.bloomComposer.setSize(this.config.width, this.config.height);
					renderer.postProcess.setSize(this.config.width, this.config.height);
				}
				renderer.instance.setSize(this.config.width, this.config.height);
				renderer.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
				
			}
			return;
		};
		this.resized = true;
		camera.aspect = innerWidth / this.config.height;
		camera.updateProjectionMatrix();
		if (renderer.usePostprocess){
			renderer.bloomComposer.setSize(innerWidth, this.config.height);
			renderer.postProcess.setSize(innerWidth, this.config.height);
		}
		renderer.instance.setSize(innerWidth, this.config.height);
		renderer.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	update() {
		window.addEventListener('resize', this.resize.bind(this));
		this.resize();
		this.renderer.instance.setAnimationLoop((timeStamp, frame) => {
			this.animation(timeStamp, frame);
		});
	}

	destroy() {

		this.movementObjectFunctions = {};
		// delete renderLoopXr
		this.renderLoopXr = {};

		if (this.physics) {
            this.physics.world.bodies.forEach(body => {
                this.physics.world.removeBody(body);
            });
            this.physics.world.constraints.length = 0;
            this.physics.world.contactMaterials.length = 0;
            this.physics.bodies = {};
        }

		if (this.renderer) {
			this.renderer.destroy();
			this.targetElement.removeChild(this.renderer.instance.domElement);
		}
		this.scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                if (object.geometry) {
                    object.geometry.dispose();
                }
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => this.disposeMaterial(material));
                    } else {
                        this.disposeMaterial(object.material);
                    }
                }
            }
        });
		if (window.gc) {
			window.gc();
		}


	}

	disposeMaterial(material) {
        if (material.map) material.map.dispose();
        if (material.lightMap) material.lightMap.dispose();
        if (material.bumpMap) material.bumpMap.dispose();
        if (material.normalMap) material.normalMap.dispose();
        if (material.specularMap) material.specularMap.dispose();
        if (material.envMap) material.envMap.dispose();
        if (material.alphaMap) material.alphaMap.dispose();
        if (material.aoMap) material.aoMap.dispose();
        if (material.displacementMap) material.displacementMap.dispose();
        if (material.emissiveMap) material.emissiveMap.dispose();
        if (material.gradientMap) material.gradientMap.dispose();
        if (material.metalnessMap) material.metalnessMap.dispose();
        if (material.roughnessMap) material.roughnessMap.dispose();
        material.dispose();
    }


	// need to access the renderer instance to change the buffer for picture
	takeScreenShot() {
		// Use requestAnimationFrame to delay screenshot capture to just after rendering
		requestAnimationFrame(() => {
			const canvas = this.renderer.instance.domElement;
			const dataUrl = canvas.toDataURL('image/png'); // Capture the screenshot

			// Create an anchor element to download the image
			const anchorElement = document.createElement('a');
			document.body.appendChild(anchorElement);
			anchorElement.href = dataUrl;
			anchorElement.download = 'robot_simulator-screenshot.png';
			anchorElement.click();
			document.body.removeChild(anchorElement);

			// No need to destroy and recreate the renderer, preserving the current state
		});
	}

	waitForCanvas() {
		return new Promise((resolve) => {
			// Vérifier si l'élément est déjà dans le DOM
			const canvas = document.querySelector('.experience3D > canvas');
			if (canvas) {
				return resolve();
			}

			// Si l'élément n'est pas encore présent, on observe le DOM
			const observer = new MutationObserver((mutations, obs) => {
				const canvas = document.querySelector('.experience3D > canvas');
				if (canvas) {
					// Lorsque l'élément est ajouté, on arrête d'observer
					resolve(canvas);
					obs.disconnect();
				}
			});

			// Observer les mutations sur le document entier
			observer.observe(document.body, {
				childList: true, // Surveille les ajouts/suppressions d'éléments enfants
				subtree: true, // Surveille tout le sous-arbre de l'élément (ici le body)
			});
		});
	}

	async setMediaRecorder() {
		await this.waitForCanvas();
		const canvas = document.querySelector('.experience3D>canvas');
		const stream = canvas.captureStream(30); // Capture le stream du canvas à 30 FPS
		this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8' });
	}

	// Créer une fonction qui commence l'enregistrement de la scène
	startRecording() {
		const chunks = [];

		// Chaque fois qu'il y a une donnée disponible, on la stocke
		this.mediaRecorder.ondataavailable = function (event) {
			if (event.data.size > 0) {
				chunks.push(event.data);
			}
		};

		// Quand l'enregistrement est terminé, créer un fichier vidéo
		this.mediaRecorder.onstop = function () {
			const blob = new Blob(chunks, { type: 'video/webm' });
			const url = URL.createObjectURL(blob);

			// Créer un lien de téléchargement
			const a = document.createElement('a');
			a.href = url;
			a.download = 'scene_threejs.mp4'; // Note que le navigateur pourrait ne pas directement télécharger en MP4, ce sera en webm
			a.click();

			// Libérer l'URL Blob après le téléchargement
			URL.revokeObjectURL(url);
		};

		// Commencer l'enregistrement
		this.mediaRecorder.start();
	}
}
