const asebaTranspiler = {
	init: function () {
		this.spinningLoaderLink = `${CDN_PATH}/public/content/img/spinning-loader.svg`;
		this.options = {
			uuid: 'auto'
		};
		this.tdm = null;
		this.connectionMaxAttempts = 10;
		this.connectionDelay = 500;
		this.pyodideTranspiler = null;
		this.wsUrl = 'ws://localhost:8597',
		this.fetchOptions = {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Access-Control-Allow-Origin': '*'
			},
			body: ''
		};
		this.tdmPath = {
			directoryPath: `/openInterface/${INTERFACE_NAME}/assets/js/aseba/tdm/`,
			filesName: {
				'windows': ['TDMLauncher.exe', 'thymio-device-manager.exe'],
				'macOS': ['ThymioDeviceManager.dmg']
			}
		};
		this.thymioName = null;
		this.err = new VittaNotif();
	},
	startWebSocket: function () {
		try {
			this.tdm = new TDM(this.wsUrl, this.options);
		} catch (e) {
			console.error(e);
		}
	},
	searchNodes: async function (refresh = false) {
		//search mode
		try {
			if (typeof this.tdm === 'undefined' || this.tdm === null || !this.checkConnection() || refresh) {
				this.tdm = new TDM();
			} else {
				return this.transpileToAseba();
			}
		} catch (e) {
			console.error(e);
		}
		const modalContent = document.querySelector('#modal-thymio-select > div > div.vitta-modal-content.stylized-scrollbar > div.modal-content-div');
		modalContent.innerHTML = `<span>${jsonPath('code.thymioInterface.modalThymioSelect.searching')} <img style='width:30px;' src='${this.spinningLoaderLink}'/></span>`;
		if (typeof this.setIntervalSearchNodes !== 'undefined') clearInterval(this.setIntervalSearchNodes);
		let currentAttempt = 0;
		this.setIntervalSearchNodes = setInterval(() => {
			// When the timeout is reached, a warning message is displayed.
			if (currentAttempt > this.connectionMaxAttempts) {
				modalContent.innerHTML = `<span>${jsonPath('code.thymioInterface.modalThymioSelect.noThymioDetected')} ❌</span>`;
				clearInterval(this.setIntervalSearchNodes);
			}
			currentAttempt += 1;
			if (this.tdm?.nodes.length === 0) return;
			this.nodesData = new Map();
			this.tdm.nodes.forEach(node => {
				const uuid = node.id.toString().replace(/[^a-zA-Z0-9 \-{}]/g, '');
				if (!this.nodesData.has(node.name)) { // Vérifier si l'uuid est déjà utilisé
					this.nodesData.set(node.name, { uuid, node });
				}
			});
			if (this.nodesData.size === 0) return;
			modalContent.innerHTML = '';
			this.nodesData.forEach((nodeData) => {
				const htmlString = `
				<div class="form-check">
					<input class="form-check-input thymio-node" type="radio" name="node" value="${nodeData.uuid}">
					<label class="form-check-label" for="${nodeData.node.name}">${nodeData.node.name}</label>
				</div>`;
				modalContent.insertAdjacentHTML('beforeend', htmlString);
			});
			if (this.nodesData.size > 0) {
				clearInterval(this.setIntervalSearchNodes);
			}
		}, 1000);
		if (!refresh) pseudoModal.openModal('modal-thymio-select');
	},
	getSelectedNodeValue: function () {
		let nodes = document.querySelectorAll('.thymio-node');
		let selectedNode = null;
		if (typeof nodes === 'undefined' || nodes.length === 0) return selectedNode;
		nodes = Array.from(nodes);
		nodes.some((node) => {
			if (node.checked) {
				selectedNode = node.value;
				return true;
			}
		});
		return selectedNode;
	},
	checkConnection: function () {
		return this.tdm.canRun() && this.tdm.isConnected();
	},
	connectionFailure: function () {
		InterfaceMonitor.writeConsole('[Thymio] Connection failed - Thymio not found', 'warning');
		this.thymioName = null;
		$("#disconnect-opt").hide();
		$('#connected-icon').remove();
		$('#upload-python').css('pointer-events', 'unset');
		$('#thymio-connection-loader').remove();
	},
	connectionSuccess: function () {
		this.thymioName = this.tdm.selectedNode._name;
		InterfaceMonitor.writeConsole(`[Thymio] Connected - Node id : ${this.thymioName}`, 'success');
		$("#execution-buttons-panel").append('<i id="connected-icon" class="fab fa-usb"></i>');
		$('#disconnect-opt').show();
		$('#upload-python').css('pointer-events', 'unset');
		$('#thymio-connection-loader').remove();
	},
	connect: async function () {
		pseudoModal.closeModal('modal-thymio-select');
		const selectedNodeValue = this.getSelectedNodeValue();
		if (selectedNodeValue === null) {
			return this.err.displayNotification(null, jsonPath('code.thymioInterface.modalThymioSelect.connectionError'), 'bg-danger');
		}
		this.options.uuid = selectedNodeValue;
		this.startWebSocket();
		InterfaceMonitor.writeConsole('[Thymio] Searching for a node ...');
		$('#upload-python').css('pointer-events', 'none');
		$("#execution-buttons-panel").append(`<img id='thymio-connection-loader' style='width: 45px;' src='${this.spinningLoaderLink}'/>`);
		let currentAttempt = 0;
		return new Promise((resolve, reject) => {
			const findNode = () => {
				currentAttempt += 1;
				// console.log(this.tdm.canRun()); // For debug
				if (this.checkConnection()) {
					resolve();
				} else if (currentAttempt >= this.connectionMaxAttempts) {
					reject();
				} else {
					setTimeout(findNode, this.connectionDelay);
				}
			};
			findNode();
		}).then(() => {
			this.connectionSuccess();
		}).catch(() => {
			this.connectionFailure();
		});
	},
	disconnect: function () {
		try {
			this.tdm.selectedNode._client._socket.close();
			this.tdm = null;
			InterfaceMonitor.writeConsole('[Thymio] Thymio disconnected', 'success');
			$("#disconnect-opt").hide();
			$('#connected-icon').remove();
		} catch (e) {
			console.error(e);
		}
	},
	send: function (code) {
		try {
			if (this.checkConnection()) {
				// console.log(code); // For debug
				this.tdm.run(code, this.success, this.failure);
			}
		} catch (e) {
			console.error(e);
		}
	},
	success: () => {
		InterfaceMonitor.writeConsole('[Thymio] Code sent successfully', 'success');
	},
	failure: () => {
		InterfaceMonitor.writeConsole('[Thymio] Failed to send', 'warning');
	},
	transpileToAseba: async function (resetCode = null) {
		if (this.pyodideTranspiler === null) {
			this.pyodideTranspiler = new window.PyodideATranspiler();
		}

		if (this.tdm === null || !this.checkConnection()) {
			await this.connect();
		}
		InterfaceMonitor.writeConsole('[Thymio] Transpilation in progress ...');
		let code = '';
		if (resetCode !== null) {
			code = resetCode;
		} else {
			code = CodeManager.getSharedInstance().getCode() || '';

		}

		const asebaCode = await this.pyodideTranspiler.transpile(code);
		if (!asebaCode.success) {
			// console.error(asebaCode.code); // For debug
			InterfaceMonitor.writeConsole('[Thymio] Transpilation failed', 'warning');
			if (asebaCode.code !== undefined) {
				InterfaceMonitor.writeConsole(asebaCode.code, 'warning');
			}
			this.err.displayNotification(null, i18next.t('notifications.asebaTranspileError'), 'bg-danger');
			if (!this.checkConnection()) this.connectionFailure();
			return;
		} else {
			// console.log(asebaCode.code); // For debug
			InterfaceMonitor.writeConsole('[Thymio] Transpilation success', 'success');
			this.send(asebaCode.code);
		}
	},
	resetThymio: function () {
		InterfaceMonitor.writeConsole('[Thymio] Stop ...');
		const resetCode = `from thymio import *\nleds_top = [0,0,0]\nleds_bottom_right = [0,0,0]\nleds_bottom_left = [0,0,0]\nleds_circle = [0,0,0,0,0,0,0,0]\nleds_prox_h = [0,0,0,0,0,0,0,0]\nleds_prox_v = [0,0]\nleds_rc = [0]\nleds_buttons = [0,0,0,0]\nleds_temperature = [0,0]\nleds_sound = [0]\nmotor_left_target = 0\nmotor_right_target = 0`;
		this.transpileToAseba(resetCode);
	},
	downloadTDM: async function (os = null) {
		if (os === null) {
			if (navigator.userAgent.toLowerCase().indexOf('win') === -1) {
				os = 'macOS';
			} else {
				os = 'windows';
			}
		}
		this.tdmPath.filesName[os].forEach(async (fileName) => {
			await VittaInterface.fetchDir(this.tdmPath.directoryPath + fileName, "blob")
				.then(function (blob) {
					const url = window.URL.createObjectURL(blob);
					const a = document.createElement('a');
					a.style.display = 'none';
					a.href = url;
					a.download = fileName;
					document.body.appendChild(a);
					a.click();
					window.URL.revokeObjectURL(url);
				});
			await new Promise(r => setTimeout(r, 1000)); // avoid avoid browser errors when multiple files are downloaded
		});

	}
};