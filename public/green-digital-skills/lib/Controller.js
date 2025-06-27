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
		this._view.on('infoIconDeviceAdded', 'setInfoIconDeviceController', () => {
			this.setInfoIconDeviceController()
		})
		this._view.on('infoIconServiceAdded', 'setInfoIconServiceController', (service) => {
			this.setInfoIconServiceController(service)
		})
		this._view.on('infoIconAdded', 'iconController', (id) => {
			this.infoIconController(id)
		})

	}
	/**
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
				condition: "Neuf",
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
	}

	/**
	 * Controller for handling input changes (both direct input and button controls)
	 * @param {HTMLInputElement} input - The input element to control
	 * @param {'device'|'service'} type - The type of element being controlled
	 */
	inputController(input, type) {
		// Input validation
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

		// Cache DOM elements for buttons
		const buttonId = input.id.split('_').slice(1, 4).join('_');
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
			return true;
		};

		// Input change handler
		inputElement.addEventListener('change', (e) => {
			validateAndUpdate(Number(e.target.value));
		});

		// Minus button handler
		minusButton?.addEventListener('click', () => {
			validateAndUpdate(value - step);
		});

		// Plus button handler
		plusButton?.addEventListener('click', () => {
			validateAndUpdate(value + step);
		});

		// Initial validation
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
	 * Sets up the tooltip controller for device information icons
	 * Ensures proper event handling and cleanup
	 */
	setInfoIconDeviceController() {
		const infoIcon = document.querySelector('#shareElement');
		// Validate element exists
		if (!infoIcon) {
			console.warn('Info icon element not found');
			return;
		}

		// Clean up previous event listener to avoid duplicates
		infoIcon.removeEventListener('click', this.tooltipManager);

		// Add new event listener with proper binding
		infoIcon.addEventListener('click', this.tooltipManager);

		// Add ARIA attributes for accessibility
		infoIcon.setAttribute('aria-label', 'Show device information');
		infoIcon.setAttribute('role', 'button');
		infoIcon.setAttribute('tabindex', '0');
	}


	/**
	 * Manages tooltip display for CO2 information
	 * @param {Event} e - The click event
	 */
	tooltipManager = (e) => {
		if (!e.target.classList.contains('fa-circle-question') || e.target.classList.contains('co2-tooltip')) {
			return;
		}
		// Vérifie si l'élément cliqué est dans un parent `.clickable`
		const parentClickable = e.target.closest('.clickable');
		e.stopPropagation();
		if (!parentClickable) return;
		const type = parentClickable.id.split('-')[0]
		const name = parentClickable.id.split('-')[2]; // Assurez-vous que cet ID suit toujours ce format
		// Récupère ou affiche un nouveau tooltip
		const tooltip = document.querySelector(`#co2-tooltip-${name}`);
		if (tooltip) {
			tooltip.classList.toggle('d-none')

		}
		const tip = type === 'device' ? this._model.getTipDevice(name) : this._model.getTipService(name)
		tooltip.innerHTML = `${name}: ${this._view.loopOverParagraphs(tip)}`;
	}

	/**
 * Controls info icon behavior and tooltip display
 * @param {string} id - The container element ID
 */
	infoIconController(id) {
		const container = document.querySelector(`#${id}`)
		const icon = container.querySelector(`#${id} i`)
		const button = container.querySelector("button")
		if (icon != null) icon.addEventListener('click', (e) => {
			const spanElement = document.querySelector(`#${id} span`);
			spanElement.classList.remove('d-none');
			spanElement.classList.add('d-block');
		})
		if (button != null) button.addEventListener('click', (e) => {
			const spanElement = document.querySelector(`#${id} span`);
			spanElement.classList.add('d-none');
			spanElement.classList.remove('d-block');
		})
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
			shareButton.addEventListener('click', async () => {
				try {
					if (navigator.share) {
						await navigator.share({
							title: `Mon Impact CO₂ Numérique - ${new Date().toLocaleDateString()}`,
							text: 'Découvrez mon impact environnemental numérique',
							files: [file],
							url: location.origin + '/public/co2-calculator'
						});
						console.log('Share successful');
					} else {
						// Fallback for browsers without Web Share API
						shareTools._download(file.name, file);
						console.log('Download initiated as fallback');
					}
				} catch (error) {
					if (error.name !== 'AbortError') {
						console.error('Sharing failed:', error);
						// Fallback to download if sharing fails
						shareTools._download(file.name, file);
					}
				}
			});
		}

		// Download functionality
		const downloadButton = document.querySelector('#captureMyImpact');
		if (downloadButton) {
			downloadButton.addEventListener('click', () => {
				shareTools._download(file.name, file);
			});
		}
	}

	/**
	 * Handles print functionality for the impact report
	 */
	printController() {
		const printButton = document.querySelector('#printMyImpact');
		if (!printButton) return;

		printButton.addEventListener('click', async () => {
			const questionnaireContainer = document.querySelector('#question-section');
			const fieldset = questionnaireContainer?.querySelector('fieldset');
			const prevButton = document.querySelector('#prev');

			// Hide elements temporarily for printing
			fieldset?.classList.add('d-none');
			prevButton?.classList.add('d-none');

			try {
				if (!questionnaireContainer) {
					throw new Error('Target element not found');
				}

				const image = await shareTools.captureImage(questionnaireContainer);
				await shareTools.printTarget(image);


			} catch (error) {
				console.error('Error in print process:', error);
				// Consider showing user feedback here
			} finally {
				// Restore elements visibility
				setTimeout(() => {
					fieldset?.classList.remove('d-none');
					prevButton?.classList.remove('d-none');
				}, 1000);
			}
		});
	}
	


}
export default Controller