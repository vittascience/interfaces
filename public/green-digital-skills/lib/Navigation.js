import Controller from './Controller.js';
import View from './View.js';
import Model from './Model.js';
import Observable from "./Observable.js";

class Navigation extends Observable {
    constructor() {
        // Singleton pattern check
        if (typeof Navigation._instance !== 'undefined') {
            return Navigation._instance;
        } // Observable Inheritance
        super();
        // Singleton pattern instanciation 
        Navigation._instance = this;
        this._controller = new Controller();
        this._model = new Model();
        this._view = new View();
		this.currentQuestionIndex = 0;
		this.currentStep = 1;



    }
    init() {
        document.querySelector('#prev').addEventListener('click', () => {
			if(document.querySelector('#simul-container')) {
				document.querySelector('#simul-container').classList.add('d-none')
				if(document.querySelector('#progressBarCopy')) document.querySelector('#progressBarCopy').remove()
			}
            this.previousQuestion()
        })
        document.querySelector('#next').addEventListener('click', () => {
			this.nextQuestion()
	})
    }
    getCurrentStep(){
		return this.currentStep
    }
    nextQuestion() {
		if (this._model.getDevicesSelected().length === 0) {
			alert("Sélectionnez les appareils que vous utilisez")
			return
		}
		if (this._model.getServicesSelected().length < 1 && this.currentQuestionIndex === 7) {
			alert("Sélectionnez les service numerique que vous utilisez")
			return
		}

		this.currentQuestionIndex++;
		this.questionManager('plus')
	}
	previousQuestion() {
		//if (this.currentQuestionIndex > 0) {
			this.currentQuestionIndex--;
		//}
		this.questionManager('minus')
	}

	questionManager(nav) {
		const questionMaterialLength = this._model.getQuestionnaireDataMaterial().length;
		const questionUtilizationLength = this._model.getQuestionnaireDataUtilization().length;
		
		if (this.currentQuestionIndex === 0) {
			this._view.displayFirstQuestion('device');
			this.currentStep += (nav === 'plus') ? 1 : -1;
			document.querySelector('#prev').classList.add('d-none')
			return;
		}
	
		if (this.currentQuestionIndex === questionMaterialLength) {
			this._view.displayFirstQuestion('service');
			this.currentStep += (nav === 'plus') ? 1 : -1;
			return;
		}
	
		if (this.currentQuestionIndex === questionMaterialLength + questionUtilizationLength) {
			this._view.displayBalanceSheet();
			this.updateNavButtons();
			const stepElement = document.querySelector('.step');
			if (stepElement) stepElement.innerText = '';
			const nextButton = document.getElementById('next');
			if(nextButton.classList.contains('d-none')) nextButton.classList.remove('d-none')
			if (nextButton) nextButton.innerText = 'Tous les conseils';

			this.currentStep += (nav === 'plus') ? 1 : -1;
			return;
		}
	
		if (this.currentQuestionIndex === questionMaterialLength + questionUtilizationLength + 1) {
			this._view.displayAllTips();
			this.updateNavButtons();
			const stepElement = document.querySelector('.step');
			if (stepElement) stepElement.innerText = '';
	
			const nextButton = document.getElementById('next');
			if (nextButton) nextButton.classList.remove('block'); 
			nextButton.classList.add('d-none'); 
	
			this.currentStep +=1;
			return;
		}
	
		if (this.currentQuestionIndex < questionMaterialLength) {
			const element = this._model.getQuestionnaireDataMaterial()[this.currentQuestionIndex];
			const id = element.visible_if.device_selection;
			const currentValues = this._controller.checkUserDataByDevice(id);
	
			if (this._model.getArrayDeviceIds().includes(id)) {
				this.trigger('deviceQuestion', this.currentQuestionIndex, currentValues);
				this.currentStep += (nav === 'plus') ? 1 : -1;
				this.updateNavButtons();
				return;
			} else {
				this.currentQuestionIndex += (nav === 'plus') ? 1 : -1;
				if (this.currentQuestionIndex < questionMaterialLength + questionUtilizationLength) {
					this.questionManager(nav);
				}
			}
		} else {
			const index = this.currentQuestionIndex - questionMaterialLength;
			const element = this._model.getQuestionnaireDataUtilization()[index];
			const serviceId = element.id.split('_')[0];
	
			if (this._model.getArrayServiceIds().map(String).includes(serviceId)) {
				const userSelects = this._controller.checkUserDataByService(serviceId);
				this.trigger('serviceQuestion', index, userSelects);
				this.currentStep += (nav === 'plus') ? 1 : -1;
				this.updateNavButtons();
				document.querySelector('#next').innerText = 'Suivant';
				const simulContainer = document.querySelector('#simul-container');
				if(simulContainer) simulContainer.classList.add('d-none');
				return;
			} else {
				this.currentQuestionIndex += (nav === 'plus') ? 1 : -1;
				//if (this.currentQuestionIndex < questionMaterialLength + questionUtilizationLength) {
					this.questionManager(nav);
				//}
			}
		}
	}
	
    updateNavButtons(){       
        // Update navigation buttons
        const questionnaireDataUtilization = this._model.getQuestionnaireDataUtilization().length
        const devices = this._model.getArrayDeviceIds().length
        const services = this._model.getArrayServiceIds().length
        const total = services > 0 ? devices + services + 2 : devices + 1 + questionnaireDataUtilization
        document.querySelector('.step').innerText = `${this.getCurrentStep()} sur ${total}`
		const prevBtn = document.getElementById('prev');
		if (prevBtn.classList.contains('d-none')) {
			prevBtn.classList.remove('d-none'); 
			prevBtn.classList.add('inline-block'); 
		}
		const nextBtn = document.getElementById('next');
		if (nextBtn.classList.contains('d-none')) {
			nextBtn.classList.remove('d-none'); 
			nextBtn.classList.add('inline-block'); 
		}  
		const div = document.querySelector("#question-section");
		if (div) {
			const y = div.getBoundingClientRect().top + window.scrollY;
			if (this.currentStep != 1) {
				window.scrollTo({ top: y, behavior: "smooth" });
			}
		} else {
			console.error("Element #question-section not found.");
		}

		
  
	}

	
}
export default Navigation