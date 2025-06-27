import Controller from './lib/Controller.js'

import Model from './lib/Model.js';

import View from './lib/View.js';
class mainGDS {
	constructor({ parentElement }) {
		if (typeof mainGDS._instance !== 'undefined') {
			return mainGDS._instance;
		}
		mainGDS._instance = this;
		this._parentElement = false;
		if (!this.setParentElement(parentElement)) {
			console.error(`AiMain constructor stopped!`);
			return false;
		}
        this._model = new Model();
		this._controller = new Controller();
		this._view = new View();
        this._model.init();
        this._controller.init();
		this._view.init();
		
    }
    setParentElement(querySelector) {
		const querySelectorType = typeof querySelector;
		if (querySelectorType !== 'string') {
			console.error(`The AiMain parentElement parameter must be a string, ${querySelectorType} given!`)
			return false;
		}
		if (document.querySelector(querySelector) === null){
			console.error(`AiMain->setParentElement: the element targeted by the provided querySelector doesn't exist!`);
			return false;
		}
		this._parentElement = document.querySelector(querySelector);
		return true;
	}

	getParentElement() {
		return this._parentElement;
	}

}
window.Main = new mainGDS({
	parentElement :'#question-section'
});
