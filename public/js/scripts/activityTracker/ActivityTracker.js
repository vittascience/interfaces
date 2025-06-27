/**
 * Track the time passed by a student on a task even if the student close the page or the browser
 */
class ActivityTracker{
	constructor() {
		// Singleton pattern to only have one instantiation of the class
		if (ActivityTracker._instance) {
			return ActivityTracker._instance;
		}
		ActivityTracker._instance = this;
		this._reference = false;
		this._activityStartTime = false;
		this._isTracking = false;
		this._eventListenerCallback = false;
	}

	/**
	 * Start the timer (get the starting time), select the current activity (activityLinkUser) reference, and start the listener that will be triggered if the user close the page/the browser
	 * @param {object} params - an object with properties reference, controller and action
	 */
	startActivityTracker(params) {
		this._isTracking = true;
		this._activityStartTime = Date.now();
		this._reference = typeof params.reference !== 'undefined' ? params.reference : false;
		const optionalParams = typeof params.options !== 'undefined' ? params.options : false;
		this._eventListenerCallback = () => { this.saveTimePassed(params.controller, params.action, optionalParams) };
		window.addEventListener('unload', this._eventListenerCallback, false);
	}

	/**
	 * Clear the current tracking values and remove the window unload listener
	 */
	stopActivityTracker() {
		this._isTracking = false;
		this._activityStartTime = false;
		this._reference = false;
		window.removeEventListener('unload', this._eventListenerCallback, false);
		this._eventListenerCallback = false;
	}

	/**
	 * Calculate the time passed from the begining of the current task and send it with the reference to the backend using a sendBeacon (POST request that have low priority but will not be interrupted if the page/browser is closed)
	 */
	saveTimePassed(controller, action, optionalParams = false) {
		const timePassed = Math.round((Date.now() - this._activityStartTime)/1000);
		const timeData = new FormData();
		if (this._reference) timeData.set('reference', this._reference);
		timeData.set('time_passed', timePassed);
		if (optionalParams && typeof optionalParams === 'object') {
			for (let param in optionalParams) {
				timeData.set(param, optionalParams[param]);
			}
		}
		navigator.sendBeacon(`/routing/Routing.php?controller=${controller}&action=${action}`, timeData);
	}

	getIsTracking() {
		return this._isTracking;
	}
}