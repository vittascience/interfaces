/**
 * Class that manage the localStorage synchronization between all the subdomains of the production server. It only operates on production server (not on local environment or test servers)
 */
class VittaStorage {
	/**
	 * Create the instance. As it is a singleton, it only can be instanciated once. If the class has already been instanciated, the constructor returns the previous instance.
	 * @returns {object} The previous instance of VittaStorage, if it has already been instanciated
	 */
	constructor() {
		if (typeof VittaStorage._instance !== 'undefined') {
			return VittaStorage._instance;
		}
		VittaStorage._instance = this;
		// The subdomains list. If a new language is added on production server, it has to be added in this list.
		this._subDomains = [{name: 'ar'}, {name: 'en'}, {name: 'es'}, {name: 'fr'}, {name: 'it'}];
		// The tasks pile where all the changes in the localStorage are stored before the synchronization is called
		this._storageTasks = [];
		// This is the number of milliseconds between the last localstorage change and the synchronization
		this._syncTimeout = 5000;
		// This property stores the current setTimeout reference to be used in stopTimeout events
		this._timeout = false;
	}

	/**
	 * Sets up the synchronization management
	 * @returns {boolean} false if it is not called in production context
	 */
	async init() {
		const isProdDomain = this._setupSubDomains();
		if (!isProdDomain) {
			console.warn(`${String.fromCodePoint(0x23F8)} ${location.host} is not a production domain. Skipping subdomain localStorage synchronization!`);
			return false;
		}
		try {
			await this._setupSubDomainIframes();
		} catch (error) {
			console.error(error);
		}
		this._setLocalStorageObserver((prop, value) => {
			this._addToStorageTasks(prop, value);
		});
	}

	/**
	 * Changes the behavior of the window.localStorage property to add a callback on localStorage direct assignements or during the localStorage.setItem() calls
	 * @param {function} callback - The function that will be called when the localStorage of the current window is changed. The callback will get two arguments : the key and the value of the localStorage change
	 */
	_setLocalStorageObserver(callback) {
		Object.defineProperty(window, 'localStorage', {
			configurable: true,
			enumerable: true,
			value: new Proxy(localStorage, {
				// Direct assignment
				set: (ls, prop, value) => {
					callback(prop, value);
					// Original localStorage.setItem() behavior
					ls[prop] = value;
					return true;
				},
				// Assigment via setItem method
				get: function(ls, prop) {
					if (prop !== 'setItem') {
						if (typeof ls[prop] === 'function') {
							return ls[prop].bind(ls);
						} else {
							return ls[prop];
						}
					}
					return (...args) => {
						callback(args[0], args[1]);
						ls.setItem.apply(ls, args);
					}
				}
				// MAYBE ADD A REMOVEITEM LISTENER ?
			})
		});
	}

	/**
	 * Checks if the current context is in production and dynamically generates the various subdomains url from all the items listed in this._subDomains array, by excluding the current subdomain
	 * @returns {boolean} false if it is not called in production context
	 */
	_setupSubDomains() {
		const currentSubDomain = location.host.split('.')[0];
		let isProdDomain = false;
		for (let i=this._subDomains.length-1; i>=0; i--) {
			// We remove the current subdomain from the subdomains list as we don't need to update it's localStorage
			if (currentSubDomain === this._subDomains[i].name) {
				this._subDomains.splice(i, 1);
				isProdDomain = true;
				continue;
			}
			// We format the subdomain with the protocol and the domain
			this._subDomains[i].url = `https://${this._subDomains[i].name}.vittascience.com`;
		}
		if (!isProdDomain) {
			return false;
		}
		return true;
	}

	/**
	 * Adds a task in the tasks queue and set/reset the timeout before the next synchronization
	 * @param {string} prop - The current localStorage key to be added/changed
	 * @param {string} value - The value of the current key to be added/changed
	 * @returns {boolean} true if the current localStorage key already exists in the tasks queue, as we only change the value related to this key
	 */
	_addToStorageTasks(prop, value) {
		if (this._timeout) {
			clearTimeout(this._timeout);
		}
		this._timeout = setTimeout(this._synchronizeLocalStorages, this._syncTimeout);
		for (let task of this._storageTasks) {
			if (typeof task[prop] !== 'undefined') {
				task[prop] = value;
				return true;
			}
		}
		this._storageTasks.push({[prop]: value});
	}

	/**
	 * Synchronizes the subdomains localStorage by calling the _synchronizeSubDomain method for each subdomain and with the tasks pile
	 * @returns {Promise} Promise
	 */
	_synchronizeLocalStorages = () => {
		return new Promise(async (resolve, reject) => {
			// The Promises array
			const syncDomainPile = [];
			// We loop over the subdomains and we add a synchronization Promise for each one in the Promise array
			for (let subDomain of this._subDomains) {
				// We clone the storageTasks as we need to shift it for each domain
				let storageTasksCopy = [...this._storageTasks];
				syncDomainPile.push(this._synchronizeSubDomain(subDomain, storageTasksCopy));
			}
			// We clear the storageTasks
			this._storageTasks = [];
			try {
				// We wait for all the subdomain promises to resolve
				await Promise.all(syncDomainPile);
			} catch(error) {
				console.error(error);
				reject();
				return;
			}
			resolve();
		});
	}

	/**
	 * Loops over all the provided tasks and emits a postMessage for each task to the iframe for the provided subdomain to be processed by the synchronization page within the iframe
	 * @param {object} subDomain - The subdomain object
	 * @param {array} tasks - The array containing all the tasks to synchronize the current subdomain localStorage
	 * @returns {Promise} Promise
	 */
	_synchronizeSubDomain(subDomain, tasks) {
		return new Promise((resolve, reject) => {
			while(tasks.length) {
				const task = tasks.shift(),
				taskKey = Object.keys(task)[0];
				subDomain.iframeWindow.postMessage(JSON.stringify({key: taskKey, method: "set", data: task[taskKey]}), "*");
			}
			resolve();
		});
	}

	/**
	 * Creates an iframe pointing toward the synchronization page for each subdomain. Resolves when all the iframes have been loaded
	 * @returns {Promise} Promise
	 */
	_setupSubDomainIframes() {
		return new Promise(async (resolve, reject) => {
			const iframePromises = [];
			for (let subDomain of this._subDomains) {
				iframePromises.push(this._createIframe(subDomain));
			}
			try {
				await Promise.all(iframePromises);
			} catch (error) {
				console.error(error);
				reject(error);
				return;
			}
			resolve();
		});
	}

	/**
	 * Creates the iframe for the subdomain pointing toward the synchronization page. Resolves when the iframe has been loaded
	 * @param {object} subDomain - The subdomain object
	 * @returns {Promise} Promise
	 */
	_createIframe(subDomain) {
		return new Promise((resolve, reject) => {
			const iframe = document.createElement('iframe');
			iframe.src = `${subDomain.url}/public/syncStorage/syncStorage.html`;
			iframe.style.display = 'none';
			subDomain.iframe = iframe;
			iframe.addEventListener('load', () => {
				let iframeWindow;
				// some browser (don't remember which one) throw exception when you try to access
				// contentWindow for the first time, it works when you do that second time
				try {
					iframeWindow = iframe.contentWindow;
				} catch(e) {
					iframeWindow = iframe.contentWindow;
				}
				subDomain.iframeWindow = iframeWindow;
				resolve();
			});
			document.querySelector('body').appendChild(iframe);
		});
	}

}

const vittaStorage = new VittaStorage();
vittaStorage.init();