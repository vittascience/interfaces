import * as shareTools from '../scripts/share_tools.js';
import Model from './Model.js';
import View from './View.js';
import Navigation from './Navigation.js';
import Observable from "./Observable.js";

class Controller extends Observable {
	constructor() {
		// Singleton pattern check
		if (typeof Controller._instance !== 'undefined') {
			return Controller._instance;
		} // Observable Inheritance
		super();
		// Singleton pattern instanciation 
		Controller._instance = this;
		this._model = new Model();
		this._view = new View();
		this._navigation = new Navigation();
		this._navigation.init();
		this.simulationFor = {};

		// Vérifier les capacités du navigateur au démarrage
		this.browserCapabilities = this.checkBrowserCapabilities();
	}


	init() {

		this._model.on('dataLoaded', 'questionsReady', () => {
			this.trigger('startQuestionnaire')
		})
		this._view.on('firstQuestionDisplayed', 'setCheckBoxController', (id, type) => {
			this.checkBoxController(id, type)
		})

		this._view.on('inputAdded', 'setNumberController', (el, type) => {
			this.inputController(el, type)
		})
		this._view.on('selectInputAdded', 'setSelectController', (el, type) => {
			this.selectController(el, type)
		})
		this._view.on('balanceSheetDisplayed', 'controllerImpactReduction', () => {
			this.controllerImpactReduction()
			this.shareMyImpact()
			this.printController()
		})
		this._view.on('infoIconAdded', 'iconController', (id) => {
			this.setupModalInfoIcon(id)
		})

		// Gestion du clic sur la flèche de défilement en JavaScript classique
		const indexScrollArrow = document.getElementById('index-scroll-arrow');
		if (indexScrollArrow) {
			indexScrollArrow.addEventListener('click', () => {
				this.trigger('arrowClicked', 'scrollArrow');
			});
		}
	}
	/**
 * Vérifie les capacités du navigateur pour les fonctionnalités de partage
 * @returns {object} Objet contenant les capacités supportées
 */
	checkBrowserCapabilities() {
		const capabilities = {
			webShare: !!navigator.share,
			canShare: !!navigator.canShare,
			fileSharing: false,
			hasClipboard: !!navigator.clipboard,
			hasClipboardWrite: !!(navigator.clipboard && navigator.clipboard.writeText)
		};

		// Test de support du partage de fichiers
		if (capabilities.webShare && capabilities.canShare) {
			try {
				// Test avec un fichier fictif
				const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });
				capabilities.fileSharing = navigator.canShare({ files: [testFile] });
			} catch (error) {
				console.warn('Cannot test file sharing capability:', error);
				capabilities.fileSharing = false;
			}
		}

		return capabilities;
	}

	getBrowserCapabilities() {
		return this.browserCapabilities;
	}

	/**
 * Controller for home page checkbox state changes
 * @param {HTMLInputElement} checkbox - The checkbox element
 * @param {'device'|'service'} type - The type of element (device or service)
 */
	checkBoxController(checkbox, type) {
		if (!checkbox || !['device', 'service'].includes(type)) {
			console.error('Invalid parameters for checkBoxController');
			return;
		}
		// checkbox.addEventListener('keydown', (e) => {
		// 	if (e.key === 'Enter' || e.key === ' ') {
		// 		e.preventDefault();
		// 		// Toggle checkbox state
		// 		e.target.checked = !e.target.checked;
		// 		// Dispatch change event to trigger the logic
		// 		checkbox.dispatchEvent(new Event('change', { bubbles: true }));
		// 	}
		// });

		checkbox.addEventListener('change', (e) => {
			try {
				const section = type === 'device'
					? this._model.getDevicesSelected()
					: this._model.getServicesSelected();

				const elementExists = section.some(el => el.id === checkbox.id);

				if (elementExists) {
					this._model.removeUnselectedItem(checkbox.id, type);
				} else {
					const newElement = type === 'device'
						? this.initUserDataByDevice(checkbox.id)
						: this.initUserDataByService(checkbox.id);

					const updateMethod = type === 'device'
						? this._model.setDevicesSelected.bind(this._model)
						: this._model.setServicesSelected.bind(this._model);

					updateMethod(newElement);
				}

				e.stopPropagation();
			} catch (error) {
				console.error('Error in checkBoxController:', error);
			}
		});
	}
	/**
	 * Initializes user data for a device with calculated default values
	 * @param {string} id - The device identifier
	 * @returns {object} Structured user data with default values
	 */


	initUserDataByDevice(id) {
		if (!id || typeof id !== 'string') {
			throw new Error('Invalid device ID');
		}

		const lifeTime = Number(this._model.getLifetimeByDevice(id));
		const yearsUsage = Math.floor(lifeTime * 0.5); // Using percentage for clarity
		const remainingLife = lifeTime - yearsUsage;

		return {
			id,
			inputUser: {
				condition: "new",
				yearsUsage,
				change: remainingLife,
				day_time: Number(this._model.getTheoreticalUseById(id)) || 0, // Fallback to 0 if undefined
				//lastUpdate: new Date().toISOString() // Added metadata
			}
		}
	}
	/**
 * Initializes user data for a service with calculated default values
 * @param {string} id - The device identifier
 * @returns {object} Structured user data with default values
 */
	initUserDataByService(id) {
		if (id === "email") {
			return {
				id: id,
				inputUser: {
					email_text: 5,
					email_attachment: 2,
					email_attachment_5: 0,
					email_spam: 10,
				}
			}
		}
		if (id === "ai") {
			return {
				id: id,
				inputUser: {
					ai_text: 5,
					ai_image: 1,
				}
			}
		}
		if (id === "video") {
			return {
				id: id,
				inputUser: {
					day_time: Number(this._model.getTheoreticalUseServiceById(id)),
					connection: "Wi-fi",
					quality: "video"
				}
			}
		} else return {
			id: id,
			inputUser: {
				day_time: Number(this._model.getTheoreticalUseServiceById(id)),
				connection: "Wi-fi"
			}
		}
	}
	/**
	 * Retrieves current values for a device or initializes new data if not found
	 * @param {string} id - The device identifier
	 * @returns {object} Existing device data or newly initialized data
	 */
	checkUserDataByDevice(id) {
		// Input validation
		if (!id || typeof id !== 'string') {
			throw new Error('Invalid device ID');
		}

		// Find existing device using find() instead of filter()[0]
		const existingDevice = this._model.getDevicesSelected().find(el => el.id === id);

		// Return existing device or initialize new one
		return existingDevice ?? this.initUserDataByDevice(id);
	}
	/**
	 * Retrieves current service data or initializes new data if not found
	 * @param {string} id - The service identifier
	 * @returns {object} Existing service data or newly initialized data
	 */
	checkUserDataByService(id) {
		if (!id || typeof id !== 'string') {
			throw new Error('Invalid service ID');
		}

		// Use optional chaining and nullish coalescing for cleaner code
		const existingService = this._model.getServicesSelected()?.find(el => el.id === id);

		// Return existing service or initialize new one (using ?? for nullish coalescing)
		return existingService ?? this.initUserDataByService(id);
	}
	/**
	 * Controller for handling selection changes
	 * @param {HTMLElement} input - The input container element
	 * @param {'device'|'service'} type - The type of element being controlled
	 */
	selectController(input, type) {
		// Validate inputs
		if (!input?.id || !['device', 'service'].includes(type)) {
			throw new Error('Invalid input parameters');
		}

		const id = input.id.split('_')[0];
		const userSelection = type === 'device'
			? this.checkUserDataByDevice(id)
			: this.checkUserDataByService(id);

		// Create a mapping of input types to properties
		const inputPropertyMap = {
			'connection': 'connection',
			'condition': 'condition',
			'audio': 'quality'
		};
		input.addEventListener('change', (e) => {
			try {
				const checkedInput = input.querySelector('input[type="radio"]:checked');
				if (!checkedInput) return;

				const inputType = Object.keys(inputPropertyMap).find(key => input.id.includes(key));
				if (inputType) {
					userSelection.inputUser[inputPropertyMap[inputType]] = checkedInput.value;
				}

				// Trigger the appropriate event
				const eventName = type === 'device'
					? 'deviceConsumChanged'
					: 'serviceConsumChanged';
				this.trigger(eventName, userSelection, id);
			} catch (error) {
				console.error('Error in selectController:', error);
			}
		});
		input.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault(); // Empêche le comportement par défaut

				try {
					let targetInput = null;

					// Si la cible est un label, trouve l'input radio associé
					if (e.target.tagName === 'LABEL') {
						const labelFor = e.target.getAttribute('for') || e.target.getAttribute('htmlFor');
						if (labelFor) {
							targetInput = document.getElementById(labelFor);
						}
					}
					// Si la cible est déjà un input radio
					else if (e.target.type === 'radio') {
						targetInput = e.target;
					}

					if (!targetInput) return;

					// Coche le radio button
					targetInput.checked = true;

					const inputType = Object.keys(inputPropertyMap).find(key => input.id.includes(key));
					if (inputType) {
						userSelection.inputUser[inputPropertyMap[inputType]] = targetInput.value;
					}

					// Trigger the appropriate event
					const eventName = type === 'device'
						? 'deviceConsumChanged'
						: 'serviceConsumChanged';
					this.trigger(eventName, userSelection, id);
				} catch (error) {
					console.error('Error in selectController keydown:', error);
				}
			}
			if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
				e.preventDefault();
				const radios = input.querySelectorAll('input[type="radio"]');
				let currentIndex = Array.from(radios).findIndex(r => r.checked);
				if (e.key === 'ArrowLeft') {
					currentIndex = (currentIndex > 0) ? currentIndex - 1 : radios.length - 1;
				} else if (e.key === 'ArrowRight') {
					currentIndex = (currentIndex < radios.length - 1) ? currentIndex + 1 : 0;
				}

				// Coche le nouveau radio button
				radios[currentIndex].checked = true;
				// Met le focus sur le nouveau radio button
				radios[currentIndex].focus();

				// Déclenche l'événement de changement
				const inputType = Object.keys(inputPropertyMap).find(key => input.id.includes(key));
				if (inputType) {
					userSelection.inputUser[inputPropertyMap[inputType]] = radios[currentIndex].value;
				}

				// Trigger the appropriate event
				const eventName = type === 'device'
					? 'deviceConsumChanged'
					: 'serviceConsumChanged';
				this.trigger(eventName, userSelection, id);
			}
		});
	}

	/**
	 * Controller for handling input changes (both direct input and button controls)
	 * @param {HTMLInputElement} input - The input element to control
	 * @param {'device'|'service'} type - The type of element being controlled
	 */
	inputController(input, type) {
		if (!input?.id || !['device', 'service'].includes(type)) {
			throw new Error('Invalid input parameters');
		}

		const id = input.id.split('_')[1];
		const userSelection = type === "device"
			? this.checkUserDataByDevice(id)
			: this.checkUserDataByService(id);

		const inputElement = document.querySelector(`#${input.id}`);
		const min = Number(input.min);
		const max = Number(input.max);
		const step = Number(input.step);
		let value = Number(inputElement.value);

		// CORRECTION : Sélection correcte des boutons
		const buttonId = input.id.replace('input_', '');
		const minusButton = document.querySelector(`#minus-${buttonId}`);
		const plusButton = document.querySelector(`#plus-${buttonId}`);

		// Validate and update value
		const validateAndUpdate = (newValue) => {
			if (newValue < min || newValue > max) {
				inputElement.value = value;
				this._view.showInputError(min, max);
				return false;
			}
			value = newValue;
			inputElement.value = value;
			this.userSelectsUpdate(userSelection, input, value, type);
			this._view.inputUpdateUnits(input, value);
			return true;
		};

		// Input change handler
		inputElement.addEventListener('change', (e) => {
			validateAndUpdate(Number(e.target.value));
		});

		// Input input handler (pour les changements en temps réel)
		inputElement.addEventListener('input', (e) => {
			const newValue = Number(e.target.value);
			if (!isNaN(newValue)) {
				validateAndUpdate(newValue);
			}
		});

		// Minus button handlers
		if (minusButton) {
			minusButton.addEventListener('click', () => {
				validateAndUpdate(value - step);
				setTimeout(() => minusButton.focus(), 100);
			});

			minusButton.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					validateAndUpdate(value - step);
					setTimeout(() => minusButton.focus(), 100);
				}
			});
		}

		// Plus button handlers
		if (plusButton) {
			plusButton.addEventListener('click', () => {
				validateAndUpdate(value + step);
				setTimeout(() => plusButton.focus(), 100);
			});

			plusButton.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					validateAndUpdate(value + step);
					setTimeout(() => plusButton.focus(), 100);
				}
			});
		}

		// Initial validation and button state
		validateAndUpdate(value);

	}


	/**
	 * Updates user selections and triggers appropriate events
	 * @param {object} userSelects - The user selection object to update
	 * @param {HTMLInputElement} input - The input element that changed
	 * @param {number} value - The new value to set
	 * @param {'device'|'service'} type - The type of element being updated
	 */
	userSelectsUpdate(userSelects, input, value, type) {
		// Input validation
		if (!userSelects?.inputUser || !input?.id || !['device', 'service'].includes(type)) {
			throw new Error('Invalid parameters for userSelectsUpdate');
		}

		const id = input.id.split('_')[1];
		const inputElement = document.querySelector(`#${input.id}`);

		// Update the input value in the DOM
		if (inputElement) {
			inputElement.value = value;
		}

		// Mapping of input ID patterns to property names
		const propertyMappings = {
			'email_text': 'email_text',
			'email_attachment': 'email_attachment',
			'email_attachment_5': 'email_attachment_5',
			'email_spam': 'email_spam',
			'ai_text': 'ai_text',
			'ai_image': 'ai_image',
			'_years_usage': 'yearsUsage',
			'_change': 'change',
			'_day_time': 'day_time'
		};

		// Find and update the appropriate property
		for (const [pattern, property] of Object.entries(propertyMappings)) {
			if (input.id.includes(pattern)) {
				userSelects.inputUser[property] = value;
				break; // Exit loop once we find a match
			}
		}

		// Trigger the appropriate event
		const eventName = type === 'device' ? 'deviceConsumChanged' : 'serviceConsumChanged';
		this.trigger(eventName, userSelects, id);
	}
	/**
	 * switchment of the impact reduction checkbox
	 */
	controllerImpactReduction() {
		const impactSettings = [
			{ id: 'checkboxLongLife', method: 'computeLongLifeImpact' },
			{ id: 'checkboxLowQuality', method: 'computAudioImpact' },
			{ id: 'checkboxWifi', method: 'computWifiImpact' },
			{ id: 'checkboxDevicesReconditione', method: 'computReconditioned' }
		];

		impactSettings.forEach(setting => {
			const element = document.getElementById(setting.id);
			if (element) {
				element.addEventListener('change', () => {
					this._model[setting.method]();
				});
			}
		});
	}



	/**
	 * Sets up modal behavior with focus trap for info icons
	 * @param {string} id - The container element ID
	 */
	setupModalInfoIcon(id) {
		const container = document.querySelector(`#${id}`);
		if (!container) {
			console.warn(`Container with id ${id} not found`);
			return;
		}

		const iconButton = container.querySelector('button.info-btn');
		let closeButton = null


		// Fonction pour piéger le focus dans l'info-block
		const trapFocus = (infoBlock) => {
			const focusableElements = infoBlock.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
			const firstFocusable = focusableElements[0];
			const lastFocusable = focusableElements[focusableElements.length - 1];

			const handleFocusTrap = (e) => {
				if (e.key === 'Tab') {
					if (e.shiftKey) {
						// Shift + Tab - aller vers l'élément précédent
						if (document.activeElement === firstFocusable) {
							e.preventDefault();
							lastFocusable.focus();
						}
					} else {
						// Tab - aller vers l'élément suivant
						if (document.activeElement === lastFocusable) {
							e.preventDefault();
							firstFocusable.focus();
						}
					}
				}
			};

			// Ajouter l'écouteur de piège de focus
			infoBlock.addEventListener('keydown', handleFocusTrap);

			// Retourner une fonction de nettoyage
			return () => {
				infoBlock.removeEventListener('keydown', handleFocusTrap);
			};
		};

		let cleanupFocusTrap = null;

		if (iconButton != null) {

			// Gestion du clic
			iconButton.addEventListener('click', (e) => {
				e.preventDefault();
				const spanElement = container.querySelector('.info-block');
				if (spanElement) {
					const isVisible = !spanElement.classList.contains('d-none');
					if (isVisible) {
						// Si déjà ouvert, ferme l'info-block
						if (cleanupFocusTrap) {
							cleanupFocusTrap();
							cleanupFocusTrap = null;
							//}
							// if (closeButton) {
							// 	closeButton.click();
						} else {
							spanElement.classList.add('d-none');
							spanElement.classList.remove('d-block');
							iconButton.classList.remove('d-none');
						}
					} else {
						// Si fermé, ouvre l'info-block
						spanElement.classList.remove('d-none');
						spanElement.classList.add('d-block');
						iconButton.classList.add('d-none');
						closeButton = container.querySelector('.info-block button');
						this.infoBlockCloseButtonController(closeButton, container, iconButton)
						// Active le piège de focus
						cleanupFocusTrap = trapFocus(spanElement);

						// Met le focus sur le bouton de fermeture
						if (closeButton) closeButton.focus();
					}
				}
			});

			// Gestion du clavier
			iconButton.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					iconButton.click();
				}
			});
			iconButton.addEventListener('mouseover', (e) => {
				iconButton.setAttribute('title', "Cliquer pour voir les détails de l'impact");
			});
			iconButton.addEventListener('mouseout', (e) => {
				iconButton.removeAttribute('title');
			});
			iconButton.addEventListener('focus', (e) => {
				iconButton.setAttribute('title', "Cliquer pour voir les détails de l'impact");
			});
			iconButton.addEventListener('blur', (e) => {
				iconButton.removeAttribute('title');
			});

		}


	}
	infoBlockCloseButtonController(closeButton, container, iconButton) {

		if (closeButton != null) {
			// Gestion du clic
			closeButton.addEventListener('click', (e) => {
				e.preventDefault();
				const spanElement = container.querySelector('.info-block');
				if (spanElement) {
					// // Nettoie le piège de focus
					// if (cleanupFocusTrap) {
					// 	cleanupFocusTrap();
					// 	cleanupFocusTrap = null;
					// }

					spanElement.classList.add('d-none');
					spanElement.classList.remove('d-block');
					if (iconButton) {
						iconButton.classList.remove('d-none');
						// Remet le focus sur le bouton d'information
						iconButton.focus();
					}
				}
			});

			// Gestion du clavier
			closeButton.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					closeButton.click();
				}
				else if (e.key === 'Escape') {
					e.preventDefault();
					closeButton.click();
				}
			});

		}
	}

	/**
* Handles sharing and downloading the impact report
*/
	async shareMyImpact() {
		const container = document.getElementById('shareElement');
		if (!container) {
			console.error('Share container not found');
			return;
		}

		// Generate the image file
		let file;
		try {
			const canvas = await html2canvas(container);
			const blob = await new Promise((resolve) => {
				canvas.toBlob(resolve, 'image/jpeg', 0.9); // 90% quality
			});

			if (!blob) {
				throw new Error('Failed to create image blob');
			}

			file = new File([blob], `my_digital_impact- ${new Date().toLocaleDateString()}.jpg`, {
				type: "image/jpeg",
				lastModified: Date.now()
			});
		} catch (error) {
			console.error('Error generating impact image:', error);
			return;
		}

		// Share functionality
		const shareButton = document.querySelector('#shareMyImpact');
		if (shareButton) {
			const shareHandler = async () => {
				try {
					// Utiliser les capacités vérifiées au démarrage
					if (this.browserCapabilities.webShare && this.browserCapabilities.fileSharing) {
						await navigator.share({
							title: `Mon Impact CO₂ Numérique - ${new Date().toLocaleDateString()}`,
							text: 'Découvrez mon impact environnemental numérique',
							files: [file],
							url: location.origin + '/public/co2-calculator'
						});
					} else if (this.browserCapabilities.webShare) {
						// Fallback: partage sans fichier si les fichiers ne sont pas supportés
						await navigator.share({
							title: `Mon Impact CO₂ Numérique - ${new Date().toLocaleDateString()}`,
							text: 'Découvrez mon impact environnemental numérique - ' + (location.origin + '/public/co2-calculator'),
							url: location.origin + '/public/co2-calculator'
						});
						// Télécharger le fichier séparément
						shareTools._download(file.name, file);
					} else {
						// Fallback pour les navigateurs sans Web Share API
						shareTools._download(file.name, file);
					}
				} catch (error) {
					if (error.name !== 'AbortError') {
						// Fallback to download if sharing fails
						shareTools._download(file.name, file);
					}
				}
			};

			shareButton.addEventListener('click', shareHandler);
			shareButton.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					shareHandler();
				}
			});
		}

		// Download functionality
		const downloadButton = document.querySelector('#captureMyImpact');
		if (downloadButton) {
			const downloadHandler = () => {
				shareTools._download(file.name, file);
			};

			downloadButton.addEventListener('click', downloadHandler);
			downloadButton.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					downloadHandler();
				}
			});
		}
	}

	/**
	 * Handles print functionality for the impact report
	 */
	printController() {
		// Attendre que le DOM soit prêt et le bouton créé
		setTimeout(() => {
			const printButton = document.querySelector('#printMyImpact');
			if (!printButton) {
				console.warn('Print button not found');
				return;
			}

			const printHandler = async () => {
				const questionnaireContainer = document.querySelector('#questionnaire-container');
				const fieldset = questionnaireContainer?.querySelector('fieldset');
				const prevButton = document.querySelector('#prev');
				const nextButton = document.querySelector('#next');
		

				// Small delay to ensure visibility changes take effect
				await new Promise(r => setTimeout(r, 300));	


				try {
					if (!questionnaireContainer) {
						throw new Error('Target element not found');
					}
	
						fieldset?.classList.add('d-none');
						prevButton?.classList.add('d-none');
						nextButton?.classList.add('d-none');
						questionnaireContainer.querySelectorAll('button').forEach(btn => btn.classList.add('d-none'));


		
					// Utiliser directement printTarget avec l'élément HTML
					await shareTools.printTarget(questionnaireContainer, 'Mon Impact CO₂ Numérique');

				} catch (error) {
					console.error('Error in print process:', error);
					// Consider showing user feedback here
				} finally {
					// Restore elements visibility
					setTimeout(() => {
						fieldset?.classList.remove('d-none');
						prevButton?.classList.remove('d-none');
						nextButton?.classList.remove('d-none');
						questionnaireContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('d-none'));
					}, 1000);
				}
			};

			// // Supprimer les anciens écouteurs s'ils existent
			printButton.removeEventListener('click', printHandler);
			printButton.removeEventListener('keydown', printHandler);

			printButton.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					printButton.click(); // Déclenche l'événement click
				}
			});
			printButton.addEventListener('click', (e) => {
				e.preventDefault();
				printHandler();
			});

			// Assurer que le bouton est focalisable
			if (!printButton.hasAttribute('tabindex')) {
				printButton.setAttribute('tabindex', '0');
			}
		}, 100);
	}
	async downloadPDF() {
		const container = document.getElementById('shareElement');
		document.querySelector('#navigation').classList.add('d-none');

		if (!container) {
			console.error('Share container not found');
			return;
		}

		// Generate the image file
		let file;
		try {
			container.scrollIntoView({ block: 'start', inline: 'nearest' });
			await new Promise(r => setTimeout(r, 500)); // attendre que tout s'affiche

			const canvas = await html2canvas(container, {
				useCORS: true,
				backgroundColor: '#ffffff', // utile si fond transparent
			});
			const imgData = canvas.toDataURL('image/png');

			const pdf = new jspdf.jsPDF({
				orientation: 'portrait',
				unit: 'px',
				format: [canvas.width, canvas.height]
			});

			pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
			pdf.save('Green conseils de Verdinum.pdf');

			document.querySelector('#navigation').classList.remove('d-none');

		} catch (error) {
			console.error('Error generating impact image:', error);
			document.querySelector('#navigation').classList.remove('d-none');
			return;
		}
	}
}
export default Controller