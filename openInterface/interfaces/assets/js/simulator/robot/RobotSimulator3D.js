
const PATH_MEDIA = `${CDN_PATH}/openInterface/interfaces/assets/media/simulator/robot`
const Obstacle = {
	REC_DEFAULT_WIDTH: 100,
	REC_DEFAULT_HEIGHT: 50,
	CIRCLE_DEFAULT_RADIUS: 50,
	HANDLE_RADIUS: 5,
	ROBOT_SIMULATOR_OBSTACLES: {
		circle: ['buisson_rond', 'eau_rond', 'feu_rond', 'orage_rond', 'pierre_rond', 'tornade_rond', 'rond_blanc', 'rond_noir', 'rond_gris', 'rond_violet', 'rond_bleu', 'rond_vert', 'rond_jaune', 'rond_orange', 'rond_rouge'],
		rectangle: ['mur_horizontal', 'mur_vertical', 'ramp_front_3D', 'ramp_back_3D', 'ramp_left_3D', 'ramp_right_3D', 'ramp_flat_3D', 'buisson', 'eau', 'feu', 'orage', 'pierre', 'tornade', 'rectangle_blanc', 'rectangle_noir', 'rectangle_gris', 'rectangle_violet', 'rectangle_bleu', 'rectangle_vert', 'rectangle_jaune', 'rectangle_orange', 'rectangle_rouge', 'rectangle_violet'],
	},
	obstaclesDef: Object.create(null),
	obstaclesDB: Object.create(null),
	selectedObstacleId: null,
	initialize() {
		let x = 0,
			y = 0;
		for (const cat in this.ROBOT_SIMULATOR_OBSTACLES) {
			for (const obstacle of this.ROBOT_SIMULATOR_OBSTACLES[cat]) {
				this.obstaclesDef[obstacle] = {
					shape: cat,
					image: PATH_MEDIA + '/obstacles/' + obstacle + '.png',
					x: x * 50,
					y: y * 50,
					w: cat === 'circle' ? this.CIRCLE_DEFAULT_RADIUS : this.REC_DEFAULT_WIDTH,
					h: cat === 'circle' ? this.CIRCLE_DEFAULT_RADIUS : this.REC_DEFAULT_HEIGHT,
				};
				if (y == 4) {
					y = 0;
					x += 1;
				} else {
					y += 1;
				}
			}
		}
	},

	saveToLS: function () {
		try {
			
			const obstaclesToSave = {};
			for (const i in this.obstaclesDB) {
				const path = this.obstaclesDB[i].image;
				obstaclesToSave[i] = {
					shape: this.obstaclesDB[i].shape,
					image: path.split('/').pop(),
					x: Math.round(this.obstaclesDB[i].x),
					y: Math.round(this.obstaclesDB[i].y),
					w: Math.round(this.obstaclesDB[i].w),
					h: Math.round(this.obstaclesDB[i].h),
				};
			}
			SimulatorLS.set('obstaclesDB', JSON.stringify(obstaclesToSave));
		} catch (error) {
			
		}
	},
	setFromLS: function () {
		const obstaclesLS = SimulatorLS.get('obstaclesDB');
		if (obstaclesLS) {
			const obstacles = JSON.parse(obstaclesLS);
			for (const id in obstacles) {
				this.obstaclesDB[id] = Object.assign({}, obstacles[id]);
				this.obstaclesDB[id].image = PATH_MEDIA + '/obstacles/' + obstacles[id].image;
			}
		}
	},
};
export default class RobotSimulator3D {
	static instance;
	constructor(simulator3D, currentRobotName) {
		if (RobotSimulator3D.instance) {
			return RobotSimulator3D.instance;
		}
		this.simulator3D = simulator3D;
		this.initPos = {
			x: 0,
			y: 0,
		}
		this.currentRobotName = currentRobotName;
		this.config = Robots3D;
		this.Obstacle = Obstacle;
		this.axis = {
			isActive: false,
			isDisplayed: false,
		};
		this.angleSliderInitialized = false;
		this.initAngle = null;
		this.angle = 0;
		this.pen = {
			isActive: false,
		};
		this.isRecording = false;
		this.initialize();
		this.isRunning = false;

		RobotSimulator3D.instance = this;
		window.RobotSimulator3D = this;
	}

	initialize() {
		this.Obstacle.initialize();
		this.Obstacle.setFromLS();
		this.injectSimulatorButtons();
		// this.resetSystem();
	}

	resetSystem() {
		if (this.simulator3D.physics) {
			if (typeof this.simulator3D.physics.clearIntervals === 'function') {
				this.simulator3D.physics.clearIntervals();
			}
		}

		const initialZoom = Number(SimulatorLS.getData(this.currentRobotName, 'initialZooms')) || Robots3D[this.currentRobotName].INITIAL_ZOOM;
		this.setZoom(initialZoom);

		const chassis = this.simulator3D.experience.hierarchie['chassis'];

		const RobotPosition = typeof SimulatorLS.getData(this.currentRobotName, 'initialPositions') !== 'undefined' ? JSON.parse(SimulatorLS.getData(this.currentRobotName, 'initialPositions')) : { x: 0, y: 0 };
		
		let posX = this.initPos.x;
		let posY = this.initPos.y;

		if (RobotPosition !== null) {
			posX = Number(RobotPosition.x) || 0;
			posY = Number(RobotPosition.y) || 0;
		}

		if (this.simulator3D.physics) {
			this.simulator3D.physics.initPosition = { x: posX, z: posY };
			this.simulator3D.physics.resetPosition();
			this.simulator3D.physics.world.step(1 / 60);
		} else {
			chassis.position.set(Number(posX), 0.35, Number(posY));
			chassis.rotation.set(0, 0, 0);
		}

		const initialAngle = Number(SimulatorLS.getData(this.currentRobotName, 'initialAngles')) || 0;
		if (initialAngle !== null) {
			// setTimeout is mandatory here to jump to the next frame before rotating the robot (100 ms might be enough in most cases if the frame rate is above 30 fps)
			setTimeout(() => {
				if (this.simulator3D.physics) {
					this.simulator3D.physics.isRotating = true;
					this.simulator3D.physics.computeRotation = true;
				}
				this.setInitialRobotAngle(initialAngle);
				this.isRunning = true;

			}, 100);
		}
		 
	}

	updateBackground(backgroundChoice) {
		this.simulator3D.updateBackground(backgroundChoice);
		SimulatorLS.setData(this.currentRobotName, 'backgrounds', backgroundChoice, SimulatorLS.backgroundFormat);
	}

	toggleGraphDisplay() {
		const graphControlButton = document.getElementById('graph-control-3D');
		if (this.axis.isActive) {
			this.axis.isActive = false;
			$('.graph_control_button').removeClass('activated');
			this.simulator3D.hideGridAxis();
		} else {
			this.axis.isActive = true;
			$('.graph_control_button').addClass('activated');
			this.simulator3D.initGridAxis();
		}
	}

	zoomIn() {
		const zoom = this.simulator3D.minZoom;
		// if (zoom < 1) return;
		this.simulator3D.experience.camera.modes.debug.orbitControls.minDistance = 10 + zoom - 1;
		this.simulator3D.experience.camera.modes.debug.orbitControls.maxDistance = 10 + zoom - 1;
		this.simulator3D.minZoom = zoom - 1;
		SimulatorLS.setData(this.currentRobotName, 'initialZooms', zoom - 1 > -7 ? zoom - 1 : -7);
	}

	zoomOut() {
		const zoom = this.simulator3D.minZoom;
		// if (zoom < 1) return;
		this.simulator3D.experience.camera.modes.debug.orbitControls.minDistance = 10 + zoom + 1;
		this.simulator3D.experience.camera.modes.debug.orbitControls.maxDistance = 10 + zoom + 1;
		this.simulator3D.minZoom = zoom + 1;
		SimulatorLS.setData(this.currentRobotName, 'initialZooms', zoom + 1 < 3 ? zoom + 1 : 3);
	}

	setZoom(zoom) {
		this.simulator3D.experience.camera.modes.debug.orbitControls.minDistance = 10 + zoom;
		this.simulator3D.experience.camera.modes.debug.orbitControls.maxDistance = 10 + zoom;
		this.simulator3D.minZoom = zoom;
		SimulatorLS.setData(this.currentRobotName, 'initialZooms', zoom);
	}

	togglePenWriting() {
		if (this.pen.isActive) {
			this.pen.isActive = false;
			$('.pen_control_button').removeClass('activated');
			this.simulator3D.destroyLineTrajectory('trajectoryLine');
		} else {
			this.pen.isActive = true;
			$('.pen_control_button').addClass('activated');

			this.simulator3D.drawLineTrajectory('trajectoryLine');
			this.simulator3D.penColor = this.pen.color;
		}
	}

	erasePenContent() {
		this.simulator3D.resetLineTrajectory('trajectoryLine');
	}

	toggleColorDropdown(close = false) {
		document.getElementById('control-dropdown-robot-angle-window-3D').classList.remove('activated');
		const colorDropdown = document.getElementById('control-dropdown-colors-window-3D');
		if (close) {
			colorDropdown.classList.remove('activated');
		} else {
			colorDropdown.classList.toggle('activated');
		}
	}

	toggleControlsDropdown() {
		this.toggleColorDropdown(true);
		this.toggleAnglePanel(true);
		this._toggleDropdown();

		const erasePenButton = document.getElementById('pen-control-erase-content-3D');
		erasePenButton.disabled = !this.pen.isActive;
		erasePenButton.style.color = this.pen.isActive ? 'var(--text-3)' : 'var(--text-1)';
	}

	_toggleDropdown() {
		document.getElementById('control-dropdown-window-3D').classList.toggle('activated');

		const dropdownButtons = document.querySelectorAll('.control_dropdown_button');
		dropdownButtons.forEach((button) => {
			button.classList.toggle('activated');
			button.innerHTML = button.classList.contains('activated') ? '<i class="fa-solid fa-caret-down"></i>' : '<i class="fa-solid fa-caret-up"></i>';
		});
	}

	toggleAnglePanel(close = false) {
		document.getElementById('control-dropdown-colors-window-3D').classList.remove('activated');
		const angleDropdown = document.getElementById('control-dropdown-robot-angle-window-3D');

		if (close) {
			angleDropdown.classList.remove('activated');
		} else {
			angleDropdown.classList.toggle('activated');
			if (angleDropdown.classList.contains('activated') && !this.angleSliderInitialized) {
				const knob = document.querySelector('.angle-slider-knob-3D');
				let isRotating = false;

				document.addEventListener('mousedown', (e) => {
					if (e.target.closest('.angle-slider-knob-3D')) {
						isRotating = true;
					}
				});

				document.addEventListener('mousemove', (e) => {
					if (isRotating) {
						const knobX = knob.getBoundingClientRect().left + knob.clientWidth / 2;
						const knobY = knob.getBoundingClientRect().top + knob.clientHeight / 2;
						const angleRad = Math.atan2(e.clientY - knobY, e.clientX - knobX);
						const angleDeg = (angleRad * 180) / Math.PI;
						const rotationAngle = (angleDeg + 360) % 360;

						if (Simulator._3DRobotSimulatorPrepareForRun) {
							this.setInitialRobotAngle(rotationAngle);
							if (this.simulator3D.physics){
								this.simulator3D.physics.isRotating = true;
							}
						}
					}
				});

				document.addEventListener('mouseup', () => {
					isRotating = false;
					if (this.simulator3D.physics){
						this.simulator3D.physics.computeRotation = true;
					}
				});

				this.angleSliderInitialized = true;
			}
		}
	}

	setInitialRobotAngle(angle) {
		$('.angle-slider-pointer').css('transform', `rotate(${angle - 180}deg)`);
		$('.angle-slider-text').html(`${Math.round(angle)} °`);
		this.angle = angle.toFixed(0);
		if (angle !== this.angle) {
			this.simulator3D.rotateModelY(angle);
			SimulatorLS.setData(this.currentRobotName, 'initialAngles', Math.round(angle));
		}
	}

	changePenColor(color) {
		this.pen.color = color;
		this.simulator3D.penColor = color;
		this.simulator3D.changePenColor(color);
		this.toggleColorDropdown();
		this._toggleDropdown();
	}

	async getScreenshot() {
		return this.simulator3D.experience.takeScreenShot();
	}

	recordVideo() {
		const robotSimRecorder = document.getElementById('robot-simulator-record-3D');
		const robotSimContainer = document.getElementById('experience-3d-container').querySelector('canvas');
		if (this.isRecording) {
			this.isRecording = false;
			this.simulator3D.experience.mediaRecorder.stop();
			robotSimRecorder.classList.remove('recording');
			robotSimContainer.style.border = 'none';
		} else {
			this.isRecording = true;
			this.simulator3D.experience.startRecording();
			robotSimRecorder.classList.add('recording');
			robotSimContainer.style.border = '3px solid var(--vitta-red)';
		}
	}

	injectSimulatorButtons() {
		const robotSimulatorHTML = `
    <div class="simulator-buttons my-2">
        <div class="btn-group oi-btn-group-simulator oi-option-activated">
            <!-- Not to be deleted: functionality to be implemented on interfaces
            <button id="robot-image-button-3D" class="btn oi-btn-simulator" title="Robot image" onclick="RobotSimulator3D.toggleRobotImage()">
                <i class="fa-solid fa-car-side"></i>
            </button> 
            -->
            <button id="robot-background-button-3D" class="btn oi-btn-simulator" data-i18n="[title]code.simulator.buttons.robot.background" 
                    data-toggle="tooltip" data-placement="top" title="Background">
                <img src="/openInterface/interfaces/assets/media/simulator/menu/button_icons/icon-img.svg" alt="Image icon">
            </button>
            <button id="obstacles-button-3D" class="btn oi-btn-simulator obstacle_button" data-i18n="[title]code.simulator.buttons.robot.obstacle" 
                    data-toggle="tooltip" data-placement="top" title="Obstacles">
                <img src="/openInterface/interfaces/assets/media/simulator/menu/button_icons/icon-bloc.svg" alt="Block icon">
            </button>
        </div>
        <div class="ms-3 btn-group oi-btn-group-simulator oi-option-activated">
            <button id="graph-zoom-out-3D" class="btn oi-btn-simulator zoom_out_button" data-i18n="[title]code.simulator.buttons.robot.zoomout" 
                    data-toggle="tooltip" data-placement="top" title="Zoom out" onclick="RobotSimulator3D.zoomOut()">
                <img src="/openInterface/interfaces/assets/media/simulator/robot/buttons/icon-less.svg" alt="Zoom out icon">
            </button>
            <button id="graph-zoom-in-3D" class="btn oi-btn-simulator zoom_in_button" data-i18n="[title]code.simulator.buttons.robot.zoomin" 
                    data-toggle="tooltip" data-placement="top" title="Zoom in" onclick="RobotSimulator3D.zoomIn()">
                <img src="/openInterface/interfaces/assets/media/simulator/robot/buttons/icon-add.svg" alt="Zoom in icon">
            </button>
        </div>
        <div class="ms-3 btn-group oi-btn-group-simulator oi-option-activated">
            <button id="graph-control-3D" class="btn oi-btn-simulator graph_control_button" data-i18n="[title]code.simulator.buttons.robot.graph" 
                    data-toggle="tooltip" data-placement="top" title="Graph control" onclick="RobotSimulator3D.toggleGraphDisplay()">
                <img src="/openInterface/interfaces/assets/media/simulator/robot/buttons/icon-orthonormal.svg" alt="Graph icon">
            </button>
            <button id="pen-control-3D" class="btn oi-btn-simulator pen_control_button" data-i18n="[title]code.simulator.buttons.robot.pen" 
                    data-toggle="tooltip" data-placement="top" title="Pen control" onclick="RobotSimulator3D.togglePenWriting()">
                <img src="/openInterface/interfaces/assets/media/simulator/robot/buttons/icon-write.svg" alt="Pen icon">
            </button>
            <button id="control-dropdown-3D" class="btn oi-btn-simulator control_dropdown_button oi-btn-simulator-narrow" data-i18n="[title]code.simulator.buttons.robot.controls" 
                    data-toggle="tooltip" data-placement="top" title="Controls" onclick="RobotSimulator3D.toggleControlsDropdown()">
                <i class="fa-solid fa-caret-up"></i>
            </button>
        </div>
        <div id="control-dropdown-container-3D">
            <div id="control-dropdown-colors-window-3D" class="simulator-control-window">
            <ul>
                <li onclick='RobotSimulator3D.changePenColor("ffffff")'>
                <div style="background-color:#fff;"></div>
                <div>Blanc</div>
                </li>
                <li onclick='RobotSimulator3D.changePenColor("#000000")'>
                <div style="background-color:#000;"></div>
                <div>Noir</div>
                </li>
                <li onclick='RobotSimulator3D.changePenColor("#ff0000")'>
                <div style="background-color:#f00;"></div>
                <div>Rouge</div>
                </li>
                <li onclick='RobotSimulator3D.changePenColor("#00ff00")'>
                <div style="background-color:#0f0;"></div>
                <div>Vert</div>
                </li>
                <li onclick='RobotSimulator3D.changePenColor("#0000ff")'>
                <div style="background-color:#00f;"></div>
                <div>Bleu</div>
                </li>
                <li onclick='RobotSimulator3D.changePenColor("#FFFF00")'>
                <div style="background-color:#ff0;"></div>
                <div>Jaune</div>
                </li>
                <li onclick='RobotSimulator3D.changePenColor("#7f00ff")'>
                <div style="background-color:#7f00ff;"></div>
                <div>Violet</div>
                </li>
                <li onclick='RobotSimulator3D.changePenColor("#ffa500")'>
                <div style="background-color:#ffa500;"></div>
                <div>Orange</div>
                </li>
                <li onclick='RobotSimulator3D.changePenColor("#808080")'>
                <div style="background-color:#808080;"></div>
                <div>Gris</div>
                </li>
            </ul>
            </div>
            <div id="control-dropdown-robot-angle-window-3D" class="simulator-control-window">
                <div class="robot-angle-slider-center">
                <div class="robot-angle-slider">
                    <div class="angle-slider-knob-3D">
                    <div class="angle-slider-rotator"><div class="angle-slider-text">0 °</div></div>
                    <div class="angle-slider-pointer">
                        <i class="fas fa-circle angle-slider-bullet"></i>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div id="control-dropdown-window-3D" class="simulator-control-window">
            <button id="pen-control-erase-content-3D" onclick="RobotSimulator3D.erasePenContent()">
                <i class="fa-solid fa-eraser"></i><span data-i18n="code.simulator.buttons.robot.erase-pencil">Effacer le tracé</span>
            </button>
            <button id="pen-control-line-color-3D" onclick="RobotSimulator3D.toggleColorDropdown()">
                <i class="fa-solid fa-palette"></i><span data-i18n="code.simulator.buttons.robot.color-pencil">Couleur du tracé</span>
            </button>
            <button id="robot-control-initial-angle-3D" onclick="RobotSimulator3D.toggleAnglePanel()">
                <i class="fa-solid fa-caret-right"></i><span data-i18n="code.simulator.buttons.robot.initial-angle">Angle du robot</span>
            </button>
            </div>
        </div>
        <div class="ms-3 btn-group oi-btn-group-simulator oi-option-activated">
            <button id="screenshot-button-3D" class="btn oi-btn-simulator" data-i18n="[title]code.simulator.buttons.robot.screenshot" 
                    data-toggle="tooltip" data-placement="top" title="Screenshot" onclick="RobotSimulator3D.getScreenshot()">
                <img src="/openInterface/interfaces/assets/media/simulator/menu/button_icons/icon-photo.svg" alt="Photo icon">
            </button>
            <button id="robot-simulator-record-3D" class="btn oi-btn-simulator" data-i18n="[title]code.simulator.buttons.robot.record" 
                    data-toggle="tooltip" data-placement="top" title="Record" onclick="RobotSimulator3D.recordVideo()">
                <img src="/openInterface/interfaces/assets/media/simulator/menu/button_icons/icon-rec.svg" alt="Record icon" style="width: 80%;">
            </button>
        </div>
    </div>`;
		const experienceContainer = document.getElementById('experience-3d-container');
		experienceContainer.insertAdjacentHTML('beforeend', robotSimulatorHTML);
	}
}

// window.RobotSimulator3D = new RobotSimulator3D();
