/**
 * Report ajax errors in the devtool console and, in production context, send a beacon to the backend to get the error notification in Slack
 */
class VittaControllerNotif {
	constructor() {
		if (typeof VittaControllerNotif._instance !== 'undefined') {
			return VittaControllerNotif._instance;
		}
		VittaControllerNotif._instance = this;
		this._lang = ['ar', 'en', 'es', 'fr', 'it'];
		this._isProd = false;
		this._setLangDomains();
	}

	/**
	 * Rewrite the domains and check if we are in production context
	 */
	_setLangDomains() {
		const currentDomain = location.host;
		for (let lang of this._lang) {
			const rewritedDomain = `${lang}.vittascience.com`;
			if (rewritedDomain === currentDomain) {
				this._isProd = true;
				break;
			}
		}
	}

	/**
	 * [FOR AJAX REQUESTS ONLY] Generate the error report, display it in the console and, in production context, send it to log emails
	 * @param {object} error - Ajax error object
	 * @param {object} ajaxObject - Ajax object
	 */
	async manageError(error, ajaxObject) {
		let parentErrorMessage;
		try {
			throw new Error();
		} catch (error) {
			parentErrorMessage = error.stack.split('\n');
		}
		const localStorageCopy = {...localStorage};
		for (let localStorageEntry in localStorageCopy) {
			localStorageCopy[localStorageEntry] = this._parseLocalStorageItem(localStorageCopy[localStorageEntry]);
		}
		const errorReport = {
			errorMessage: error.statusText,
			responseText: error.responseText,
			status: error.status,
			readyState: error.readyState,
			state: error.state(),
			responseHeaders: error.getAllResponseHeaders(),
			requestPayload: ajaxObject.data,
			context: {
				domain: location.origin,
				path: location.pathname,
				href: location.href,
				errorStack: parentErrorMessage,
				browser: this._getBrowserVersion(),
				date: new Date().toLocaleString(),
				routingUrl : ajaxObject.url,
				userAgentData: navigator.userAgentData,
				isInIframe: window.parent !== window,
				referer: document.referrer,
				ltiContext: typeof ltiVariables13 != 'undefined' ? ltiVariables13 : false
			},
			localStorage: localStorageCopy,
			cookies: document.cookie,
			windowSize: {
				width: window.innerWidth,
				height: window.innerHeight
			}
		}
		console.error(errorReport);
		const notificationText = i18next.t('notifications.controllerError');
		if (typeof VittaNotif !== 'undefined') {
			const vittaNotif = new VittaNotif();
			vittaNotif.displayNotification(null, notificationText, 'bg-danger');
		} else if (typeof displayNotification !== 'undefined') {
			displayNotification('#notif-div', notificationText, 'error')
		} else {
			alert(notificationText);
		}
		this._sendSlackNotification(errorReport);
	}

	/**
	 * Generate the error report, display it in the console and, in production context, send it to log emails
	 * @param {object} error - The error object
	 * @param {string} errorMessage [OPTIONAL] - The error message
	 * @returns {undefined} if the VittaNotif class is not available
	 */
	manageAnyError(error, errorMessage = false, optional = false) {
		if (!errorMessage) {
			errorMessage = error;
			if (typeof error !== 'string') {
				errorMessage = JSON.stringify(error);
			}
		}
		if (typeof VittaNotif === 'undefined') {
			return;
		}

		const localStorageCopy = {...localStorage};
		for (let localStorageEntry in localStorageCopy) {
			localStorageCopy[localStorageEntry] = this._parseLocalStorageItem(localStorageCopy[localStorageEntry]);
		}

		const errorReport = {
			optional: optional,
			error: {
				message: error.message,
				stack: error.stack
			},
			context: {
				domain: location.origin,
				path: location.pathname,
				href: location.href,
				browser: this._getBrowserVersion(),
				date: new Date().toLocaleString(),
				userAgentData: navigator.userAgentData,
				isInIframe: window.parent !== window,
				referer: document.referrer,
				ltiContext: typeof ltiVariables13 != 'undefined' ? ltiVariables13 : false
			},
			localStorage: localStorageCopy,
			cookies: document.cookie,
			windowSize: {
				width: window.innerWidth,
				height: window.innerHeight
			}
		}

		console.error(errorReport);
		const vittaNotif = new VittaNotif();
		vittaNotif.displayNotification(null, errorMessage, 'bg-danger');
		this._sendSlackNotification(errorReport);
	}

	/**
	 * Get the current browser and it's version
	 * @returns {string} The current browser and it's version
	 */
	_getBrowserVersion() {
		try {
			const { userAgent } = navigator;
			let match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
			let temp;
		
			if (/trident/i.test(match[1])) {
				temp = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
				return `IE ${temp[1] || ''}`;
			}
		
			if (match[1] === 'Chrome') {
				temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
				if (temp !== null) {
					return temp.slice(1).join(' ').replace('OPR', 'Opera');
				}
				temp = userAgent.match(/\b(Edg)\/(\d+)/);
				if (temp !== null) {
					return temp.slice(1).join(' ').replace('Edg', 'Edge (Chromium)');
				}
			}
			match = match[2] ? [ match[1], match[2] ] : [ navigator.appName, navigator.appVersion, '-?' ];
			temp = userAgent.match(/version\/(\d+)/i);
			if (temp !== null) {
				match.splice(1, 1, temp[1]);
			}
			return match.join(' ');
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	/**
	 * JSON parse a string, if possible
	 * @param {string} item - A localStorage item
	 * @returns {string} the parsed item
	 */
	_parseLocalStorageItem(item) {
		let parsedValue;
		try {
			parsedValue = JSON.parse(item)                 
		} catch (error) {
			parsedValue = item
		}
		return parsedValue;
	}

	/**
	 * Send the error report to log email addresses (slack or log ones)
	 * @param {object} errorReport - The error report object
	 * @returns {Promise}
	 */
	async _sendSlackNotification(errorReport) {
		if (!this._isProd) {
			console.error(`${String.fromCodePoint(0x23F8)} ${location.host} is not a production domain. Skipping Slack notification!`);
			return false;
		}
		const errorData = new FormData();
		const stringifiedReport = JSON.stringify(errorReport)
		errorData.set('errorReport', stringifiedReport);
		if (stringifiedReport.length < 60000) {
			navigator.sendBeacon('/routing/Routing.php?controller=prod_issues_notifier&action=notify_slack', errorData);
		} else {
			await (await fetch(
				'/routing/Routing.php?controller=prod_issues_notifier&action=notify_slack',
				{
					method: 'POST',
					body: errorData
				}
			)).json();
		}
	}
}