import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';
import { TransformControls } from '/openInterface/interfaces/assets/js/simulator3d/libs/TransformControls.js';

export default class TransformControl {
	static instance;
	constructor(exp, experience, obstaclesHandler, updateGrid) {
		if (TransformControl.instance) {
			return TransformControl.instance;
		}
		this.exp = exp;
		this.experience = experience;
		this.obstaclesHandler = obstaclesHandler;
		this.raycast();
		this.boundHandleMouseDown = this.handleMouseDown.bind(this);
		this.updateGrid = updateGrid;
		this.selectedItem = null;
		this.selectedItemMouseOver = false;
		this.transformControlHover = false;
		this.otherClickable = null;
		this.cursorState = 'default'; // 'default', 'pointer', 'grabbing'

		TransformControl.instance = this;
	}

	addHelpers(element, removable = false) {
		if (this.helperAdded) return;
		this.helperAdded = true;
		if (element.name === 'chassis') {
			this.experience.requestedTransformControl = true;
			if (this.exp.physics) {
				this.exp.physics.setDragging(true);
			}
		}
		this.transformControl = new TransformControls(this.experience.camera.instance, this.experience.renderer.instance.domElement);

		this.transformControl.attach(element);
		this.transformControl.axis = 'XZ';
		this.transformControl.showY = false;
		this.transformControl.size = 2;


		// this.transformControl.addEventListener('change', () => {
		// 	this.experience.renderer.update();
		// });


		this.transformControl.addEventListener('dragging-changed', (event) => {
			this.experience.camera.modes.debug.orbitControls.enabled = !event.value;
			if (event.value) {
				document.body.style.cursor = 'grabbing';
				this.cursorState = 'grabbing';
			} else {
				document.body.style.cursor = 'default';
				this.cursorState = 'default';
			}
			if (element.name === 'axisHandle') {
				const position = element.position;
				this.updateGrid(position.x, position.z);
			}
			if (element.name === 'chassis') {
				if (!Simulator.isRunning) {
					const position = element.position;
					SimulatorLS.setData("Donutbot", 'initialPositions', { x: position.x.toFixed(3), y: position.z.toFixed(3) }, (data) => JSON.stringify(data));
					if (this.exp.physics) {
						this.exp.physics.initPosition = { x: position.x.toFixed(3), z: position.z.toFixed(3) };
					}
				};
			} else if (this.obstaclesHandler.obstacles.find((obstacle) => obstacle.name === element.name)) {
				const position = element.position;
				const obstaclesDB = JSON.parse(SimulatorLS.get("obstaclesDB"))
				obstaclesDB[element.name].x = Number((position.x * 50.0).toFixed(0));
				obstaclesDB[element.name].y = Number((position.z * 50.0).toFixed(0)); 
				SimulatorLS.set("obstaclesDB", JSON.stringify(obstaclesDB));
				RobotSimulator.Obstacle.obstaclesDB[element.name] = obstaclesDB[element.name];
			};
		});

		if (removable) {
			document.addEventListener('keydown', (event) => this.handleKeyDown(event, element));
			this.experience.renderer.instance.domElement.addEventListener('mousedown', this.boundHandleMouseDown);
		}
		this.transformControl.name = element.name;
		this.experience.scene.add(this.transformControl);
	}

	handleKeyDown(event, element) {
		if (event.key === 'Delete' || event.key === 'Backspace') {
			this.transformControl.object.material.dispose();
			this.transformControl.object.geometry.dispose();
			this.experience.scene.remove(this.transformControl.object);
			this.obstaclesHandler.removeObstacle(this.transformControl.object.name);
			this.removeHelper(element);
			this.selectedItem = null;
		} else if (event.key === 'Escape') {
			if (this.selectedItem !== null && typeof this.selectedItem !== 'undefined') {
				this.selectedItem = null;
				this.removeHelper(this.selectedItem);
				this.selectedItemMouseOver = false;
				this.experience.renderer.instance.domElement.removeEventListener('mousedown', this.boundHandleMouseDown);
			}
		}
	}

	
	handleMouseDown(event) {
		event.preventDefault();
		if (event.button === 2) {
			if (this.selectedItem !== null && typeof this.selectedItem !== 'undefined') {
				this.selectedItem = null;
				this.removeHelper(this.selectedItem);
				this.selectedItemMouseOver = false;
				this.experience.renderer.instance.domElement.removeEventListener('mousedown', this.boundHandleMouseDown);
			}
		} else if (event.button === 0) {
			if (this.selectedItem !== null && typeof this.selectedItem !== 'undefined') {
				if (this.otherClickable !== null) {
					this.removeHelper(this.selectedItem);
					this.selectedItem = this.otherClickable;
					this.helperAdded = false;
					this.addHelpers(this.otherClickable, true);
					this.otherClickable = null;
					this.selectedItemMouseOver = false;
					if (this.cursorState !== 'default') {
						document.body.style.cursor = 'default';
						this.cursorState = 'default';
					}
				}
				return;
			};
			this.selectedItem = this.transformControl.object;
		}
	}

	removeHelper(element) {
		this.experience.requestedTransformControl = false;
		this.transformControl.detach(element);
		this.experience.scene.remove(this.transformControl);
		if (this.exp.physics) {
			this.exp.physics.setDragging(false);
		}
	}

	handleClick(event) {
		if (this.clickableCube !== null) {
			this.addHelpers(this.clickableCube);
			if (this.clickableCube.name !== this.previousClickableCube?.name) {
				this.removeHelper(this.previousClickableCube);
			}
			this.previousClickableCube = this.clickableCube;
		} else {
			this.removeHelper(this.previousClickableCube);
		}
	}

	raycast() {
		const raycaster = new THREE.Raycaster();
		const pointer = new THREE.Vector2();

		const onPointerMove = (event) => {
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
			if (intersects.length > 0&& this.selectedItem !== null && typeof this.selectedItem !== 'undefined') {
				this.obstaclesHandler.obstacles.forEach((obstacle) => {
					if (obstacle.name === intersects[0].object.name && this.selectedItem.name !== obstacle.name) {
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

		const experience3D = document.querySelector('.experience3D');
		experience3D.addEventListener('click', this.handleClick.bind(this));
		window.addEventListener('resize', () => {
			this.rect = canvasElement.getBoundingClientRect();
		});
	}
}