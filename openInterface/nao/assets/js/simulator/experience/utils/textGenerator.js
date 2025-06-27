import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';
import { FontLoader } from '/openInterface/interfaces/assets/js/simulator3d/libs/loader/FontLoader.js';

export default class TextGenerator {
	constructor(experience) {
		this.experience = experience;
		this.experience.speechFlagInterruption = false;
		this.fontLoader = new FontLoader();
        this.voices = [];
		this.mute = true;
		this.initFont();
        this.getVoices();
	}

	initFont() {
        this.fontLoader.load('/openInterface/nao/assets/js/simulator/experience/utils/fonts/Roboto_Regular.json', (font) => {
			this.font = font;
		});
	}

    getVoices() {
        this.voices = window.speechSynthesis.getVoices();
        setTimeout(() => {
            if (this.voices.length === 0) {
                this.getVoices();
            }
        }, 50);
    }

	updateText(text, needToSpeak = true) {
		if (this.text) this.experience.scene.remove(this.text);
		if (this.bubble) this.experience.scene.remove(this.bubble);
		if (this.bubbleOutline) this.experience.scene.remove(this.bubbleOutline);
		delete this.experience.movementObjectFunctions.text;

		const checkText = text.toString().trim();
		if (checkText === '') return;

		const color = 0x000000;

		// Matériau pour le texte
		const matLite = new THREE.MeshBasicMaterial({
			color: color,
			transparent: true,
			opacity: 0.8,
			side: THREE.DoubleSide,
			polygonOffset: true,
			polygonOffsetFactor: -1,
		});

		// Gestion automatique du retour à la ligne
		const [message, lines] = this.wrapText(text, 1.5);

		// Créer les formes du texte
		const shapes = this.font.generateShapes(message, 0.02);
		const geometry = new THREE.ShapeGeometry(shapes);
		geometry.computeBoundingBox();

		// Centrer le texte
		const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
		const yMid = -0.5 * (geometry.boundingBox.max.y - geometry.boundingBox.min.y);
		geometry.translate(xMid, lines * 0.013, 0);

		this.text = new THREE.Mesh(geometry, matLite);

		// Dimensions de la bulle avec un padding
		const bubblePadding = 0.05;
		const bubbleWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x + bubblePadding;
		const bubbleHeight = geometry.boundingBox.max.y - geometry.boundingBox.min.y + bubblePadding;

		// Créer une forme arrondie pour la bulle
		const bubbleShape = new THREE.Shape();
		let radius = 0.02;
		if (lines > 0) {
			radius = 0.05;
		}

		// Commencer en bas à gauche et faire le tour avec un crochet
		bubbleShape.moveTo(-bubbleWidth / 2 + radius, -bubbleHeight / 2);
		bubbleShape.lineTo(0, -bubbleHeight / 2); // Début du crochet
		bubbleShape.lineTo(-0.005, -bubbleHeight / 2 - 0.01); // Pointe du crochet
		bubbleShape.lineTo(0.02, -bubbleHeight / 2); // Fin du crochet
		bubbleShape.lineTo(bubbleWidth / 2 - radius, -bubbleHeight / 2);
		bubbleShape.quadraticCurveTo(bubbleWidth / 2, -bubbleHeight / 2, bubbleWidth / 2, -bubbleHeight / 2 + radius);
		bubbleShape.lineTo(bubbleWidth / 2, bubbleHeight / 2 - radius);
		bubbleShape.quadraticCurveTo(bubbleWidth / 2, bubbleHeight / 2, bubbleWidth / 2 - radius, bubbleHeight / 2);
		bubbleShape.lineTo(-bubbleWidth / 2 + radius, bubbleHeight / 2);
		bubbleShape.quadraticCurveTo(-bubbleWidth / 2, bubbleHeight / 2, -bubbleWidth / 2, bubbleHeight / 2 - radius);
		bubbleShape.lineTo(-bubbleWidth / 2, -bubbleHeight / 2 + radius);
		bubbleShape.quadraticCurveTo(-bubbleWidth / 2, -bubbleHeight / 2, -bubbleWidth / 2 + radius, -bubbleHeight / 2);

		// Créer la géométrie et le matériau de la bulle
		const bubbleGeometry = new THREE.ShapeGeometry(bubbleShape);
		const bubbleMaterial = new THREE.MeshBasicMaterial({
			color: 0xfbfbfb,
			transparent: true,
			opacity: 0.9,
			side: THREE.DoubleSide,
		});
		this.bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);

		// Créer le contour de la bulle
		const bubbleOutlineGeometry = new THREE.EdgesGeometry(bubbleGeometry);
		const bubbleOutlineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
		this.bubbleOutline = new THREE.LineSegments(bubbleOutlineGeometry, bubbleOutlineMaterial);

		// Positionner les éléments initialement
		this.text.position.set(0, 0.7, 0.1); // Devant la bulle
		this.bubble.position.set(0, 0.7, -0.5); // Derrière le texte
		this.bubbleOutline.position.set(0, 0.7, -0.1); // Même position que la bulle

		// Ajout de la fonction pour suivre la tête
		this.experience.movementObjectFunctions.text = () => {
			const naosHead = this.experience.hierarchie.NAOH25V60xmlHeadPitch.getWorldPosition(new THREE.Vector3());
			this.text.position.set(naosHead.x, naosHead.y + 0.22, naosHead.z);
			this.bubble.position.set(naosHead.x, naosHead.y + 0.22, naosHead.z);
			this.bubbleOutline.position.set(naosHead.x, naosHead.y + 0.22, naosHead.z);

			// Faire face à la caméra
			const cameraPosition = this.experience.camera.modes.debug.instance.position;
			this.text.lookAt(cameraPosition);
			this.bubble.lookAt(cameraPosition);
			this.bubbleOutline.lookAt(cameraPosition);
		};

		// Ajouter les éléments à la scène
		this.experience.scene.add(this.bubbleOutline);
		this.experience.scene.add(this.bubble);
		this.experience.scene.add(this.text);
		if (needToSpeak){
			this.textToSpeech(text);
		}
	}

	wrapText(text, maxWidth) {
		// Découpe le texte en lignes pour ne pas dépasser maxWidth
		
		const words = text.toString().split(' ');
		let lines = '';
		let line = '';
		let count = 0;

		for (let i = 0; i < words.length; i++) {
			const testLine = line + words[i] + ' ';
			const testShapes = this.font.generateShapes(testLine, 0.05);
			const testGeometry = new THREE.ShapeGeometry(testShapes);
			testGeometry.computeBoundingBox();
			const lineWidth = testGeometry.boundingBox.max.x - testGeometry.boundingBox.min.x;

			if (lineWidth > maxWidth && i > 0) {
				count++;
				lines += line + '\n';
				line = words[i] + ' ';
			} else {
				line = testLine;
			}
		}
		lines += line;
		return [lines, count];
	}

	textToSpeech(text) {
        return new Promise((resolve, reject) => {
            this.speech = new SpeechSynthesisUtterance();
            this.speech.onend = () => {
                // clear text after speech
                this.updateText('');
				this.experience.speechFlagInterruption = true;
                resolve();
            };
            this.speech.text = text;
            this.speech.lang = 'fr-FR';
            this.speech.volume = this.mute ? 0 : 1;
            this.speech.rate = 1;
            this.speech.pitch = 1.3;
        
            this.speech.voice = this.voices.find((voice) => voice.name === 'Marie');
            if (!this.speech.voice) {
				this.speech.voice = this.voices.find((voice) => voice.name === 'Julie');
                console.warn("Marie's voice not found");
            }
    
            window.speechSynthesis.speak(this.speech);
        })
	}
}


