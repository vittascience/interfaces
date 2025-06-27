/**
 * Display notifications in top of a div.
 */
class VittaNotif {
	constructor(notificationDuration) {
		if (VittaNotif.instance != null) {
			return VittaNotif.instance;
		}
		VittaNotif.instance = this;
		this._notificationDuration = notificationDuration ? notificationDuration*1000 : 7000;
		this._destinationDivELt = false;
		this._message = false;
		this._type = false;
	}

	/**
	 * The main method that initiate all the required steps to setup and display a notification
	 * @param {string || null} destinationDiv - The query selector for the destination div element, can be null to use the default notification div.
	 * @param {string} message - The message to display in the notification
	 * @param {string} type - The type of the message : a css class -> bg-success or bg-danger (or another one)
	 * @returns false if there is any error or true if succeded
	 */
	displayNotification(destinationDiv, message, type) {
		this.setDestinationDiv(destinationDiv);
		this.setMessage(message);
		this.setType(type);
		if (!this.getDestinationDiv() || !this.getMessage() || !this.getType()){
			console.log('Stopping notification display!');
			return false;
		}
		return this._executeNotification();
	}

	/**
	 * The _destinationDivElt setter
	 * @param {string || null} destinationDiv - The destination div query selector or null to use the default notification area
	 * @returns false if the argument is incorrect, return true otherwise
	 */
	setDestinationDiv(destinationDiv) {
		destinationDiv = destinationDiv === null ? '#vitta-notif-area' : destinationDiv;
		if (typeof destinationDiv !== 'string') {
			console.error(`The notification div argument must be a string!`);
			return false;
		}
		const destinationDivElt = document.querySelector(destinationDiv);
		if (destinationDivElt == null) {
			console.error(`The notification destination div doesn't exist!`);
			return false;
		}
		this._destinationDivELt = destinationDivElt;
		return true;
	}

	/**
	 * The _message setter
	 * @param {string} message - A message
	 * @returns false if the message is not a string, true otherwise
	 */
	setMessage(message) {
		if (typeof message !== 'string') {
			console.error(`The notification message argument must be a string!`);
			return false;
		}
		this._message = message;
		return true;
	}

	/**
	 * The _type setter
	 * @param {string} type - The class to be added for the notification background color
	 * @returns false if the type is not a string, true otherwise
	 */
	setType(type) {
		if (typeof type !== 'string') {
			console.error(`The notification type argument must be a string!`);
			return false;
		}
		this._type = type;
		return true;
	}

	/**
	 * The _destinationDivElt getter
	 * @returns DOM Element of the destination div
	 */
	getDestinationDiv() {
		return this._destinationDivELt;
	}

	/**
	 * The _message getter
	 * @returns message as a string
	 */
	getMessage() {
		return this._message;
	}

	/**
	 * The _type getter
	 * @returns type as a string
	 */
	getType() {
		return this._type;
	}

	/**
	 * Create and setup the notification DOM Element, insert it in the DOM and prepare the closing callback
	 * @returns true when setup and insertion are completed
	 */
	_executeNotification() {
		const currentNotificationElt = document.createElement('div');
		currentNotificationElt.classList.add('vitta-notif', this.getType());
		currentNotificationElt.innerHTML = `
		${this.getMessage()}
		<button type="button" class="btn vitta-notif-close" onclick="VittaNotif.instance.closeNotification(event)"><i class="fa fa-times"></i></button>
		`;
		this.getDestinationDiv().insertBefore(currentNotificationElt, this.getDestinationDiv().firstChild);
		getComputedStyle(currentNotificationElt).opacity;
		currentNotificationElt.style.opacity = 1;
		setTimeout(() => {
			this.fadeNotificationElt(currentNotificationElt);
		}, this._notificationDuration);
		this.resetParameterProperties();
		return true;
	}

	/**
	 * Close the notification on user trigger
	 * @param {*} e 
	 */
	closeNotification(e) {
		let currentTargetElt = e.target;
		while(!currentTargetElt.classList.contains('vitta-notif')) {
			currentTargetElt = currentTargetElt.parentElement;
		}
		this.fadeNotificationElt(currentTargetElt);
	}

	/**
	 * Set the opacity of the provided element to 0 and, then, remove it from the DOM (after fade effect duration)
	 * @param {DOM Element} element - The element to be removed
	 */
	fadeNotificationElt(element) {
		element.style.opacity = 0;
		setTimeout(() => {
			element.remove();
		}, 400);
	}

	/**
	 * Reset all the displayNotification parameter properties
	 */
	resetParameterProperties() {
		this._destinationDivELt = false;
		this._message = false;
		this._type = false;
	}
}
