/**
 * Manage the exercise statements
 */
class ExerciseStatement{
	constructor() {
		// The DOM element where the exercise statement element will be inserted
		let ideWrapper = false;
		switch (INTERFACE_NAME) {
			case 'ai':
				ideWrapper = '#ai-ide';
				break;
		
			default:
				ideWrapper = '#ide';
				break;
		}
		this._statementLocationElt = document.querySelector(ideWrapper);
		// The statement content (simple text at first -> will be updated to bbcode)
		this._statementContent = false;
		// The DOM element that will contain the exercise statements
		this._statementWrapperElt = false;
		this._statementContentElt = false;
		this._statementButtonElt = false;
	}

	/**
	 * The statementContent setter
	 * @param {string} content - The content string
	 * @returns false if the parameter is not a string, otherwise returns true
	 */
	setStatementContent(content) {
		if (typeof content != 'string'){
			return false;
		}
		this._statementContent = content;
		return true;
	}

	/**
	 * The statementContent getter
	 * @returns the statementContent value
	 */
	getStatementContent() {
		return this._statementContent;
	}

	/**
	 * Update the statementContent and the DOM element innerHTML if the content is valid
	 * @param {string} content - The content string
	 */
	updateStatementContent(content) {
		if (this.setStatementContent(content) && this.getStatementContent() !== false) {
			this._statementContentElt.innerHTML = this.getStatementContent();
		}
	}

	/**
	 * Create the DOM statement element if it doesn't yet exist, update it's content and display/hide it depending on the content emptiness
	 */
	displayStatement() {
		if (!this._statementWrapperElt) {
			this._createStatementWrapperElt();
			this._statementLocationElt.insertBefore(this._statementWrapperElt, this._statementLocationElt.firstChild);
			this._setListeners();
			setTimeout(() => this._toggleStyle(), 0);
		} else {
			this._toggleStyle();
		}
		this.updateStatementContent(this._statementContent);
	}

	/**
	 * Create the DOM statement element and insert it in the DOM
	 */
	_createStatementWrapperElt() {
		this._statementWrapperElt = document.createElement('div');
		
		this._statementContentElt = document.createElement('div');
		this._statementContentElt.id = 'statement-content';
		this._statementContentElt.setAttribute('before-elt', i18next.t('code.statement'));

		this._statementButtonElt = document.createElement('button');
		this._statementButtonElt.classList = 'btn btn-orange';
		this._statementButtonElt.innerHTML = '<i class="fas fa-minus"></i>';

		this._statementWrapperElt.appendChild(this._statementButtonElt);
		this._statementWrapperElt.appendChild(this._statementContentElt);
		this._statementWrapperElt.classList.add('statement-wrapper');
	}

	/**
	 * Apply all the provided style values to a DOM element
	 * @param {DOM element} element - The DOM element to which the styles will be applied
	 * @param {object} styles - An object with javascript DOM element styles property associated with style values
	 */
	_setStyleToElt(element, styles) {
		for (let style in styles) {
			element.style[style] = styles[style];
		}
	}

	/**
	 * Apply some styles to the global DOM statement element to display or hide it depending on the current statementContent value
	 */
	_toggleStyle() {
		if (this._statementContent && this._statementContent != ''){
			this._statementWrapperElt.classList.add('statement-exists');
		} else {
			this._statementWrapperElt.classList.remove('statement-exists');
		}
	}

	/**
	 * Set the listeners for the collapse button
	 */
	_setListeners() {
		this._statementButtonElt.addEventListener('click', () => {
			this._toggleCollapse();
		});
	}

	/**
	 * Change the exercise statement wrapper classes to expand/collapse it
	 */
	_toggleCollapse() {
		if (this._statementWrapperElt.classList.contains('statement-collapsed')) {
			this._statementWrapperElt.classList.remove('statement-collapsed');
			this._statementButtonElt.innerHTML = '<i class="fas fa-minus"></i>';
		} else {
			this._statementWrapperElt.classList.add('statement-collapsed');
			this._statementButtonElt.innerHTML = '<i class="fas fa-plus"></i>';
		}
		if (typeof Blockly === 'undefined') {
			return;
		}
		// resize the Blockly workspace to fit the new statement wrapper height once the transition is finished
		this._statementWrapperElt.addEventListener('transitionend', () => {
			Blockly.svgResize(Blockly.getMainWorkspace());
		});
	}
}