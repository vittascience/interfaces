import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';
import { TransformControls } from '/openInterface/interfaces/assets/js/simulator3d/libs/TransformControls.js';

export default class TransformControl {
	static instance;
	constructor(exp, experience, obstaclesHandler, updateGrid, robotName) {
		if (TransformControl.instance) {
			return TransformControl.instance;
		}
		this.exp = exp;
		this.experience = experience;
		this.obstaclesHandler = obstaclesHandler;
		this.robotName = robotName;
		this.raycast();
		this.boundHandleMouseDown = this.handleMouseDown.bind(this);
		this.boundHandleKeyDown = this.handleKeyDown.bind(this);
		this.updateGrid = updateGrid;
		this.selectedItem = null;
		this.selectedItemMouseOver = false;
		this.transformControlHover = false;
		this.otherClickable = null;
		this.cursorState = 'default'; // 'default', 'pointer', 'grabbing'
		this.toolbar = null;
		this.isToolbarHovered = false;
		this.initToolbar();

		TransformControl.instance = this;
	}

	initToolbar() {
		this.createToolbar();
		this.setupCameraListener();
	}

	setupCameraListener() {
		const orbitControls = this.experience.camera.modes.debug.orbitControls;
		if (orbitControls) {
			orbitControls.addEventListener('change', () => {
				if (this.selectedItem && this.toolbar.classList.contains('visible')) {
					this.updateToolbarPosition();
				}
			});
		}
	}

	createToolbar() {
		if (this.toolbar) return;

		this.toolbar = document.createElement('div');
		this.toolbar.className = 'obstacle-toolbar';
		this.toolbar.innerHTML = `
			<button class="obstacle-toolbar-btn" data-action="delete" title="Supprimer (Suppr)">
				<i class="fa-solid fa-trash"></i>
			</button>
			<div class="obstacle-toolbar-separator"></div>
			<button class="obstacle-toolbar-btn" data-action="close" title="Fermer (Echap)">
				<i class="fa-solid fa-xmark"></i>
			</button>
			
		`;

		this.toolbar.addEventListener('click', (e) => {
			const btn = e.target.closest('[data-action]');
			if (!btn) return;

			const action = btn.dataset.action;
			if (action === 'delete') this.deleteSelected();
			if (action === 'close') this.deselectCurrent();
		});

		this.toolbar.addEventListener('mouseenter', () => {
			this.isToolbarHovered = true;
		});
		this.toolbar.addEventListener('mouseleave', () => {
			this.isToolbarHovered = false;
		});

		document.body.appendChild(this.toolbar);
	}

	showToolbar() {
		if (!this.toolbar) return;
		if (this.selectedItem?.name === 'chassis') return;
		this.toolbar.classList.add('visible');
		this.updateToolbarPosition();
	}

	hideToolbar() {
		if (!this.toolbar) return;
		this.toolbar.classList.remove('visible');
	}

	updateToolbarPosition() {
		if (!this.selectedItem || !this.toolbar || !this.rect) return;

		const vector = this.selectedItem.position.clone();
		vector.y += 0.5;
		vector.project(this.experience.camera.instance);

		const x = (vector.x * 0.5 + 0.5) * this.rect.width + this.rect.left;
		const y = (-vector.y * 0.5 + 0.5) * this.rect.height + this.rect.top - 45;

		this.toolbar.style.left = `${x}px`;
		this.toolbar.style.top = `${y}px`;
	}

	deleteSelected() {
		if (!this.selectedItem || !this.transformControl) return;

		this.transformControl.object.material.dispose();
		this.transformControl.object.geometry.dispose();
		this.experience.scene.remove(this.transformControl.object);
		this.obstaclesHandler.removeObstacle(this.transformControl.object.name);
		this.removeHelper(this.selectedItem);
		this.selectedItem = null;
		this.helperAdded = false;
		this.hideToolbar();
		this.cleanupListeners();
	}

	deselectCurrent() {
		if (!this.selectedItem) return;
		this.removeHelper(this.selectedItem);
		this.selectedItem = null;
		this.selectedItemMouseOver = false;
		this.helperAdded = false;
		this.hideToolbar();
		this.cleanupListeners();
	}

	cleanupListeners() {
		this.experience.renderer.instance.domElement.removeEventListener('mousedown', this.boundHandleMouseDown);
		document.removeEventListener('keydown', this.boundHandleKeyDown);
	}

	addHelpers(element, removable = false) {
		if (this.helperAdded) return;
		if (this.obstaclesHandler.lockedObstacles.has(element.name)) return;
		this.helperAdded = true;
		if (element.name === 'chassis') {
			this.experience.requestedTransformControl = true;
			if (this.exp.physics) {
				// this.exp.physics.computeDragging = false;
				this.exp.physics.setDragging(true);
			}
		}
		this.transformControl = new TransformControls(this.experience.camera.instance, this.experience.renderer.instance.domElement);

		this.transformControl.attach(element);
		this.transformControl.axis = 'XZ';
		this.transformControl.showY = false;
		this.transformControl.size = 2;


		this.transformControl.addEventListener('dragging-changed', (event) => {
			this.experience.camera.modes.debug.orbitControls.enabled = !event.value;
			this.transformControlHover = event.value;
			if (event.value) {
				document.body.style.cursor = 'grabbing';
				this.cursorState = 'grabbing';
				this.hideToolbar();
			} else {
				document.body.style.cursor = 'default';
				this.cursorState = 'default';
				if (this.selectedItem) this.showToolbar();
			}
			if (element.name === 'axisHandle') {
				const position = element.position;
				this.updateGrid(position.x, position.z);
			}
			if (element.name === 'chassis') {
				if (!Simulator.isRunning) {
					const position = element.position;
					SimulatorLS.setData(this.robotName, 'initialPositions', { x: position.x.toFixed(3), y: position.z.toFixed(3) }, (data) => JSON.stringify(data));
					if (this.exp.physics) {
						this.exp.physics.initPosition = { x: position.x.toFixed(3), z: position.z.toFixed(3) };
					}
				};
			} else if (this.obstaclesHandler.obstacles.find((obstacle) => obstacle.name === element.name)) {
				const selectedObstacle = RobotSimulator3D.Obstacle.obstaclesDB[element.name];
				selectedObstacle.x = Number((element.position.x * 50.0).toFixed(0));
				selectedObstacle.y = Number((element.position.z * 50.0).toFixed(0));
				RobotSimulator3D.Obstacle.saveToLS();
			};
		});

		if (removable) {
			document.addEventListener('keydown', this.boundHandleKeyDown);
			this.experience.renderer.instance.domElement.addEventListener('mousedown', this.boundHandleMouseDown);
		}
		this.transformControl.name = element.name;
		this.experience.scene.add(this.transformControl);
	}

	handleKeyDown(event) {
		if (event.key === 'Delete' || event.key === 'Backspace') {
			this.deleteSelected();
		} else if (event.key === 'Escape') {
			this.deselectCurrent();
		}
	}

	
	handleMouseDown(event) {
		event.preventDefault();
		if (event.button === 2) {
			this.deselectCurrent();
		} else if (event.button === 0) {
			if (this.isToolbarHovered) return;
			if (this.selectedItem !== null && typeof this.selectedItem !== 'undefined') {
				if (this.otherClickable !== null) {
					this.removeHelper(this.selectedItem);
					this.hideToolbar();
					this.selectedItem = this.otherClickable;
					this.helperAdded = false;
					this.addHelpers(this.otherClickable, true);
					this.otherClickable = null;
					this.selectedItemMouseOver = false;
					if (this.cursorState !== 'default') {
						document.body.style.cursor = 'default';
						this.cursorState = 'default';
					}
					this.showToolbar();
				} else if (!this.selectedItemMouseOver && !this.transformControlHover) {
					this.deselectCurrent();
				}
				return;
			};
			if (!this.transformControl || !this.transformControl.object) return;
			this.selectedItem = this.transformControl.object;
			this.showToolbar();
		}
	}

	removeHelper(element) {
		if (!this.transformControl) return;
		this.experience.requestedTransformControl = false;
		this.experience.camera.modes.debug.orbitControls.enabled = true;
		this.transformControl.detach(element);
		this.experience.scene.remove(this.transformControl);
		this.transformControl.dispose();
		this.transformControl = null;
		if (this.exp.physics) {
			// TO update if Ilo needs physics
			// this.exp.physics.computeDragging = true;
			this.exp.physics.setDragging(false);
		}
	}

	raycast() {
		const raycaster = new THREE.Raycaster();
		const pointer = new THREE.Vector2();

		const onPointerMove = (event) => {
			if (this.transformControlHover) return;

			const axisHandle = this.experience.scene.getObjectByName('axisHandle');
			if (this.experience.needGridAxis) {
				this.obstacles = [...this.obstaclesHandler.obstacles, this.experience.hierarchie['chassis'], axisHandle];
			} else {
				this.obstacles = [...this.obstaclesHandler.obstacles, this.experience.hierarchie['chassis']];
			}

			const canvasElement = document.querySelector('.experience3D canvas');
			this.rect = canvasElement.getBoundingClientRect();
			pointer.x = ((event.clientX - this.rect.left) / this.rect.width) * 2 - 1;
			pointer.y = -((event.clientY - this.rect.top) / this.rect.height) * 2 + 1;

			// Prevent the raycaster to be triggered outside the canvas
			if (pointer.x < -1 || pointer.x > 1 || pointer.y < -1 || pointer.y > 1) return;
			raycaster.setFromCamera(pointer, this.experience.camera.instance);
			const intersects = raycaster.intersectObjects(this.obstacles, true);
			if (intersects.length > 0 && this.selectedItem !== null && typeof this.selectedItem !== 'undefined') {
				this.obstaclesHandler.obstacles.forEach((obstacle) => {
					if (obstacle.name === intersects[0].object.name && this.selectedItem.name !== obstacle.name && !this.obstaclesHandler.lockedObstacles.has(intersects[0].object.name) && !this.helperAdded) {
						this.otherClickable = intersects[0].object;
						if (this.cursorState !== 'pointer') {
							document.body.style.cursor = 'pointer';
							this.cursorState = 'pointer';
						}
						return;
					}
				});
			} else {
				if (this.cursorState !== 'default') {
					document.body.style.cursor = 'default';
					this.cursorState = 'default';
					this.otherClickable = null;
				}
			}
			if (this.selectedItem !== null && typeof this.selectedItem !== 'undefined') {
				if (intersects.length && intersects[0].object.name === this.selectedItem.name) {
					this.selectedItemMouseOver = true;
					return;
				}
				this.selectedItemMouseOver = false;
				return;
			}
			if (intersects.length > 0) {
				if (this.obstaclesHandler.obstacles.length > 0) {
					// add helpers to the hoovered object
					let chassisIntersected = true;
					this.obstaclesHandler.obstacles.forEach((obstacle) => {
						if (obstacle.name === intersects[0].object.name) {
							this.addHelpers(intersects[0].object, true);
							chassisIntersected = false;
						}
					});
					if (intersects[0].object.name === 'axisHandle') {
						this.addHelpers(intersects[0].object, false);
					}
					if (chassisIntersected) {
						this.addHelpers(this.experience.hierarchie['chassis']);
					}
				} else {
					if (intersects[0].object.name === 'axisHandle') {
						this.addHelpers(intersects[0].object, false);
					} else {
						this.addHelpers(this.experience.hierarchie['chassis']);
					}
				}
				intersects[0].object.name;
			} else {
				this.helperAdded = false;
				this.removeHelper(this.experience.hierarchie['chassis']);
				if (this.cursorState !== 'default') {
					document.body.style.cursor = 'default';
					this.cursorState = 'default';
				}
				this.otherClickable = null;
			}
		};

		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('resize', () => {
			const canvasElement = document.querySelector('.experience3D canvas')
			this.deselectCurrent();
			this.rect = canvasElement.getBoundingClientRect();
		});

		window.addEventListener('click', (e) => {
			if (!this.selectedItem) return;
			const canvas = document.querySelector('.experience3D canvas');
			const experienceContainer = document.querySelector('.experience3D');
			const isInsideExperience = experienceContainer?.contains(e.target) || e.target === canvas;
			const isInsideToolbar = this.toolbar?.contains(e.target);
			if (!isInsideExperience && !isInsideToolbar) {
				this.deselectCurrent();
			}
		});

	}
}