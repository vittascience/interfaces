/**
 * Custom tool to display an overlay with loading spinner and custom message for waiting events
 * 
 * To use it, just call new Vittablocker('Your custom message', 'cssSelectorForElementToBlock'). The second argument is optional as it will use the html body by default. When the waiting time has ended, call the end() method on the Vittablocker instance
 */
class VittaBlocker {
	/**
	 * Class constructor that defines all the class properties and call the _init() method
	 * @param {string} message - The message that will be displayed in the overlay or i18next translation path
	 * @param {string} elementToBlock - The css selector for the element where the overlay will be displayed ('body' by default)
	 * @returns false if the elementToBlock doesn't exist in the DOM
	 */
    constructor(message = '', elementToBlock = 'body', fontSize = '1rem', loaderLink = `${CDN_PATH}/public/content/img/spinning-loader.svg`) {
        this._message = message;
        this._overlayElt;
		this._spinningLoaderElt;
		this._overlayContentElt;
		this._overlayTextElt;
		// The link for the spinner image
		this._spinningLoaderLink = loaderLink;
		// The css properties for the overlay
        this._overlayCss = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            opacity: '0.2',
            zIndex: '9998',
            top: '0',
            left: '0',
        };
		// The css properties for the overlay content
        this._overlayContentCss = {
            position: 'absolute',
            zIndex: '9999',
            width: '100%',
            height: '100%',
            fontSize: fontSize,
			fontWeight: '600',
            color: 'var(--vitta-red-light)',
			textAlign: 'center',
			backgroundColor: 'var(--bg-0)',
			borderRadius: '1em',
			height: 'auto',
			padding: '1em',
			margin: '0',
			width: '90%',
            top: '50%',
            left: '50%',
            display: 'flex',
			flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
			pointerEvents: 'none',
			transform: 'translate(-50%, -50%)'
        };
		// The css properties for the spinner image
		this._spinningLoaderCss = {
			display: 'block',
            width: '150px',
			height: '150px'
		};
		// The css properties to apply to the element where the overlay is displayed
        this._elementToBlockCss = {
            'pointerEvents': 'none',
			'overflow': 'hidden'
        };
		// When we change the css of the element where the overlay is displayed we store the initial values in this property
		this._elementToBlockInitialCss = {};
		this._modalClasses = ['vitta-modal'];
		this._lowerModalZIndex = 1000;
		// We check if the element targeted by the provided css selector exists
        if (typeof document.querySelector(elementToBlock) == 'undefined') {
            console.error(`${elementToBlock} doesn't exist!`);
            return false;
        }
        this._elementToBlockElt = document.querySelector(elementToBlock);
		this._setZindex()
        this._init();
    }

	/**
	 * Changes the element targeted by the overlay, create the overlay and append it there
	 */
    _init() {
        this._transformElementToBlock();
        this._createAndAppendOverlay();
    }

	/**
	 * Creates the overlay element, manage its childs, style it and append it to the targeted element
	 */
    _createAndAppendOverlay() {
		this._overlayElt = document.createElement('div');
        this._createOverlayContentElement();
        this._elementToBlockElt.appendChild(this._overlayContentElt);
        for (let property in this._overlayCss) {
			this._overlayElt.style[property] = this._overlayCss[property];
        }
		this._elementToBlockElt.appendChild(this._overlayElt);
    }

	/**
	 * Blurs all the targeted element childs and change its style
	 */
    _transformElementToBlock() {
		this._blurAllChilds(this._elementToBlockElt);
        for (let property in this._elementToBlockCss) {
			this._elementToBlockInitialCss[property] = window.getComputedStyle(this._elementToBlockElt)[property];
            this._elementToBlockElt.style[property] = this._elementToBlockCss[property];
        }
    }

	/**
	 * Restores the css initial values of the targeted element
	 */
	_restoreElementToBlock() {
		for (let property in this._elementToBlockInitialCss) {
			this._elementToBlockElt.style[property] = this._elementToBlockInitialCss[property];
		}
	}

	/**
	 * Creates all the overlay childs, style and append them
	 */
    _createOverlayContentElement() {
        this._overlayContentElt = document.createElement('div');
		this._overlayContentElt.className = 'vitta-blocker-overlay-content';
		this._overlayTextElt = document.createElement('span');
		if (this._message.match(' ')){
			this._overlayTextElt.textContent = this._message;
		} else {
			this._overlayTextElt.textContent = typeof jsonPath(this._message) != 'undefined' ? jsonPath(this._message) : this._message;
		}
		this._createSpinningLoaderElement();
		this._overlayContentElt.appendChild(this._spinningLoaderElt);
		this._overlayContentElt.appendChild(this._overlayTextElt);
        for (let property in this._overlayContentCss) {
            this._overlayContentElt.style[property] = this._overlayContentCss[property];
        }
    }

	/**
	 * Creates the spinning image element and style it
	 */
	_createSpinningLoaderElement() {
		this._spinningLoaderElt = document.createElement('img');
		this._spinningLoaderElt.src = this._spinningLoaderLink;
		for (let property in this._spinningLoaderCss) {
            this._spinningLoaderElt.style[property] = this._spinningLoaderCss[property];
        }
	}

	/**
	 * Blurs all the targeted element childs
	 * @param {DOM Element} element - The targeted element
	 */
    _blurAllChilds(element) {
		for (let node of element.childNodes) {
			if (typeof node.style != 'undefined') {
				node.style.filter = 'blur(3px)';
			}
		}
	}

	/**
	 * Unblurs all the targeted element childs
	 * @param {DOM Element} element - The targeted element
	 */
	_unblurAllChilds(element) {
		for (let node of element.childNodes) {
			if (typeof node.style != 'undefined') {
				node.style.filter = '';
			}
		}
	}

	/**
	 * Restores the targeted element and all its childs to their initial state and remove all the overlay elements from the DOM
	 */
    end() {
		this._unblurAllChilds(this._elementToBlockElt);
		this._restoreElementToBlock();
		this._overlayElt.remove();
		this._spinningLoaderElt.remove();
		this._overlayContentElt.remove();
		this._overlayTextElt.remove();
	}

	/**
	 * Restart the blocker after it's end() call.
	 */
	restart() {
		this._init();
	}

	_isOnModal(element) {
		let currentElement = element;
		do {
			if (typeof currentElement.classList === 'undefined') {
				continue;
			}
			for (let modalClass of this._modalClasses) {
				if (currentElement.classList.contains(modalClass)) return true;
			}
		} while (currentElement = currentElement.parentElement);
		return false;
	}

	_setZindex() {
		if (!this._isOnModal(this._elementToBlockElt)) {
			this._overlayCss.zIndex = String(this._lowerModalZIndex - 2);
			this._overlayContentCss.zIndex = String(this._lowerModalZIndex - 1);
		}
	}
}
