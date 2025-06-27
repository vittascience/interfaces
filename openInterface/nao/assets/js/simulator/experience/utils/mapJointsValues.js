import { gsap } from '/openInterface/interfaces/assets/js/simulator3d/libs/gsap.js';
import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';

const innerOverlay =//html
	`<div id="headGroup" class="joints-group">
		<div class="slider-movement">
			<label for="headYaw" class="slider-movement-title">Head Yaw</label>
			<div id="target-marker-neck" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-2.0857"
				max="2.0857"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="neck"
			/>
			<div id="neck-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="headPitch" class="slider-movement-title">Head Pitch</label>
			<div id="target-marker-head" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-0.6720"
				max="0.5149"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="head"
			/>
			<div id="head-value" class="joint-value"></div>
		</div>
	</div>

	<div id="leftArmGroup" class="joints-group">
		<div class="slider-movement">
			<label for="shoulderPitch" class="slider-movement-title">Shoulder L Pitch</label>
			<div id="target-marker-shoulderL" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-2.0857"
				max="2.0857"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="shoulderL"
			/>
			<div id="shoulderL-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="shoulderRoll" class="slider-movement-title">Shoulder L Roll</label>
			<div id="target-marker-upperarmL" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-0.3142"
				max="1.3265"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="upperarmL"
			/>
			<div id="upperarmL-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="shoulderRoll" class="slider-movement-title">Elbow L Roll</label>
			<div id="target-marker-forearmL-roll" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-1.5446"
				max="-0.0349"
				value="-0.0349"
				step="0.01"
				class="slider-joint-element"
				id="forearmL-roll"
			/>
			<div id="forearmL-roll-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="shoulderRoll" class="slider-movement-title">Elbow L Yaw</label>
			<div id="target-marker-forearmL-yaw" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-2.0857"
				max="2.0857"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="forearmL-yaw"
			/>
			<div id="forearmL-yaw-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="shoulderRoll" class="slider-movement-title">Wrist L Yaw</label>
			<div id="target-marker-handL" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-1.8238"
				max="1.8238"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="handL"
			/>
			<div id="handL-value" class="joint-value">0</div>
		</div>
		<div class="slider-movement">
			<label for="leftHand" class="slider-movement-title">Left Hand</label>
			<div id="target-marker-leftHand" class="target-marker-cursor"></div>
			<input
				type="range"
				min="0"
				max="1"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="leftHand"
			/>
			<div id="leftHand-value" class="joint-value">0</div>
		</div>
	</div>
	<div id="rightArmGroup" class="joints-group">
		<div class="slider-movement">
			<label for="shoulderPitch" class="slider-movement-title">Shoulder R Pitch</label>
			<div id="target-marker-shoulderR" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-2.0857"
				max="2.0857"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="shoulderR"
			/>
			<div id="shoulderR-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="shoulderRoll" class="slider-movement-title">Shoulder R Roll</label>
			<div id="target-marker-upperarmR" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-1.3265"
				max="0.3142"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="upperarmR"
			/>
			<div id="upperarmR-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="shoulderRoll" class="slider-movement-title">Elbow R Roll</label>
			<div id="target-marker-forearmR-roll" class="target-marker-cursor"></div>
			<input
				type="range"
				min="0.0349"
				max="1.5446"
				value="0.0349"
				step="0.01"
				class="slider-joint-element"
				id="forearmR-roll"
			/>
			<div id="forearmR-roll-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="shoulderRoll" class="slider-movement-title">Elbow R Yaw</label>
			<div id="target-marker-forearmR-yaw" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-2.0857"
				max="2.0857"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="forearmR-yaw"
			/>
			<div id="forearmR-yaw-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="shoulderRoll" class="slider-movement-title">Wrist R Yaw</label>
			<div id="target-marker-handR" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-1.8238"
				max="1.8238"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="handR"
			/>
			<div id="handR-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="rightHand" class="slider-movement-title">Right Hand</label>
			<div id="target-marker-rightHand" class="target-marker-cursor"></div>
			<input
				type="range"
				min="0"
				max="1"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="rightHand"
			/>
			<div id="rightHand-value" class="joint-value">0</div>
		</div>
	</div>
	<div id="leftLegGroup" class="joints-group">
		<div class="slider-movement">
			<label for="pelvisL-yaw-pitch" class="slider-movement-title">Hip L YAW-Pitch</label>
			<div id="target-marker-pelvisL-yaw-pitch" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-1.1453"
				max="1.1453"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="pelvisL-yaw-pitch"
			/>
			<div id="pelvisL-yaw-pitch-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="pelvisL001" class="slider-movement-title">Hip L Roll</label>
			<div id="target-marker-pelvisL001" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-1.1453"
				max="1.1453"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="pelvisL001"
			/>
			<div id="pelvisL001-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="tightL" class="slider-movement-title">Hip L Pitch</label>
			<div id="target-marker-tightL" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-1.5708"
				max="0.5236"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="tightL"
			/>
			<div id="tightL-value" class="joint-value"></div>
		</div>
			<div class="slider-movement">
				<label for="shinPitch" class="slider-movement-title">Knee R Pitch</label>
				<div id="target-marker-shinL" class="target-marker-cursor"></div>
				<input
					type="range"
					min="-2.1125"
					max="0.4840"
					value="0"
					step="0.01"
					class="slider-joint-element"
					id="shinL"
				/>
				<div id="shinL-value" class="joint-value"></div>
			</div>
			<div class="slider-movement">
				<label for="shinL001pitch" class="slider-movement-title">Ankle L Pitch</label>
				<div id="target-marker-shinL001" class="target-marker-cursor"></div>
				<input
					type="range"
					min="-1.1345"
					max="0.4014"
					value="0"
					step="0.01"
					class="slider-joint-element"
					id="shinL001"
				/>
				<div id="shinL001-value" class="joint-value"></div>
			</div>
			<div class="slider-movement">
				<label for="anckleL" class="slider-movement-title">Ankle L Roll</label>
				<div id="target-marker-anckleL" class="target-marker-cursor"></div>
				<input
					type="range"
					min="-0.3491"
					max="0.3491"
					value="0"
					step="0.01"
					class="slider-joint-element"
					id="anckleL"
				/>
				<div id="anckleL-value" class="joint-value"></div>
			</div>
	</div>
	<div id="rightLegGroup" class="joints-group">
		<div class="slider-movement">
			<label for="pelvisR-yaw-pitch" class="slider-movement-title">Hip R YAW-Pitch</label>
			<div id="target-marker-pelvisR-yaw-pitch" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-1.1453"
				max="1.1453"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="pelvisR-yaw-pitch"
			/>
			<div id="pelvisR-yaw-pitch-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="pelvisR001" class="slider-movement-title">Hip R Roll</label>
			<div id="target-marker-pelvisR001" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-1.1453"
				max="1.1453"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="pelvisR001"
			/>
			<div id="pelvisR001-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="tightR" class="slider-movement-title">Hip R Pitch</label>
			<div id="target-marker-tightR" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-1.5708"
				max="0.5236"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="tightR"
			/>
			<div id="tightR-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="shinPitch" class="slider-movement-title">Knee R Pitch</label>
			<div id="target-marker-shinR" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-2.1125"
				max="0.4840"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="shinR"
			/>
			<div id="shinR-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="shinR001pitch" class="slider-movement-title">Ankle R Pitch</label>
			<div id="target-marker-shinR001" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-1.1345"
				max="0.4014"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="shinR001"
			/>
			<div id="shinR001-value" class="joint-value"></div>
		</div>
		<div class="slider-movement">
			<label for="anckleR" class="slider-movement-title">Ankle R Roll</label>
			<div id="target-marker-anckleR" class="target-marker-cursor"></div>
			<input
				type="range"
				min="-0.3491"
				max="0.3491"
				value="0"
				step="0.01"
				class="slider-joint-element"
				id="anckleR"
			/>
			<div id="anckleR-value" class="joint-value"></div>
		</div>

	</div>
</div>
`;

const mapSliderValues = {
	neck: {
		axes: 'y', direction: 1, idEl: 'neck' ,
	},
	head: {
		 axes: 'x', direction: 1, idEl: 'head' ,
	},
	shoulderL: {
		axes: 'x', direction: 1, idEl: 'shoulderL' ,
	},
	upperarmL: {
		 axes: 'x', direction: -1, idEl: 'upperarmL' ,
	},
	forearmL: {
		axes: 'y', direction: -1, idEl: 'forearmL-roll' ,
	},
	forearmLyaw: {
		axes: 'z', direction: 1, idEl: 'forearmL-yaw' ,
	},
	handL: {
		axes: 'y', direction: 1, idEl: 'handL' ,
	},
	shoulderR: {
		axes: 'x', direction: 1, idEl: 'shoulderR' ,
	},
	upperarmR: {
		axes: 'x', direction: 1, idEl: 'upperarmR' ,
	},
	forearmR: {
		axes: 'y', direction: -1, idEl: 'forearmR-roll' ,
	},
	forearmRyaw: {
		axes: 'z', direction: 1, idEl: 'forearmR-yaw' ,
	},
	handR: {
		axes: 'y', direction: 1, idEl: 'handR' ,
	},

	pelvisL: {
		axes: 'x', direction: 1, idEl: 'pelvisL-yaw-pitch' ,
	},
	pelvisL001: {
		axes: 'y', direction: 1, idEl: 'pelvisL001' ,
	},
	tightL: {
		axes: 'x', direction: 1, idEl: 'tightL' ,
	},
	shinL: {
		axes: 'x', direction: 1, idEl: 'shinL' ,
	},
	shinL001: {
		axes: 'x', direction: 1, idEl: 'shinL001' ,
	},
	anckleL: {
		axes: 'z', direction: 1, idEl: 'anckleL' ,
	},
	pelvisR: {
		axes: 'x', direction: 1, idEl: 'pelvisR-yaw-pitch' ,
	},
	pelvisR001: {
		axes: 'y', direction: 1, idEl: 'pelvisR001' ,
	},
	tightR: {
		axes: 'x', direction: 1, idEl: 'tightR' ,
	},
	shinR: {
		axes: 'x', direction: 1, idEl: 'shinR',
	},
	shinR001: {
		axes: 'x', direction: 1, idEl: 'shinR001' ,
	},
	anckleR: {
		axes: 'z', direction: -1, idEl: 'anckleR' ,
	},
	spine: {
		axes: 'x', direction: 1, idEl: 'spine' ,
	},
};

const mapSlidersJoints = {
	"neck": "HeadYaw",
	"head": "HeadPitch",
	"shoulderL": "LShoulderPitch",
	"upperarmL": "LShoulderRoll",
	"forearmL-roll": "LElbowRoll",
	"forearmL-yaw": "LElbowYaw",
	"handL": "LWristYaw",
	"leftHand": "LHand",
	"shoulderR": "RShoulderPitch",
	"upperarmR": "RShoulderRoll",
	"forearmR-roll": "RElbowRoll",
	"forearmR-yaw": "RElbowYaw",
	"handR": "RWristYaw",
	"rightHand": "RHand",
}

const handSliderValues = {
	leftHand: {
		finger11L: { axes: 'y', direction: 1 },
		finger11L001: { axes: 'x', direction: -1 },
		finger11L002: { axes: 'x', direction: -1 },
		thumbL: { axes: 'y', direction: -1 },
		thumbL001: { axes: 'x', direction: 1 },
		finger21L: { axes: 'y', direction: 1 },
		finger21L001: { axes: 'x', direction: -1 },
		finger21L002: { axes: 'x', direction: -1 },
		idEl: 'leftHand',
	},
	rightHand: {
		finger11R: { axes: 'y', direction: -1 },
		finger11R001: { axes: 'x', direction: -1 },
		finger11R002: { axes: 'x', direction: -1 },
		thumbR: { axes: 'y', direction: 1 },
		thumbR001: { axes: 'x', direction: 1 },
		finger21R: { axes: 'y', direction: -1 },
		finger21R001: { axes: 'x', direction: -1 },
		finger21R002: { axes: 'x', direction: -1 },
		idEl: 'rightHand',
	},
};

export default class MapJointValues {
	constructor(experience, initialJoints, naoPose, physics) {
		this.experience = experience;
		this.initialJoints = initialJoints;
		this.completedAnimations = 0;
		this.naoPose = naoPose;
		this.physics = physics;
		this.mapSliderValues = mapSliderValues;
		this.handSliderValues = handSliderValues;
		this.isDeg = false;
		this.realTimeMovement = false;
		this.movingLiveSlider = null;
		this.init();
	}

	swicthDeg(deg) {
		this.isDeg = deg;
	};

	init() {
		const jointElementContent = document.getElementById('joints-element-content');
		jointElementContent.innerHTML = innerOverlay;

		const bones = Object.keys(mapSliderValues);

		// only for pelvisL
		const rotation45DegPelvisL = new THREE.Quaternion();
		rotation45DegPelvisL.setFromAxisAngle(new THREE.Vector3(0, 0, 1), THREE.MathUtils.degToRad(-135));

		// Optionnel : Si pelvisR a une autre rotation de base, vous pouvez la définir ici
		const rotation45DegPelvisR = new THREE.Quaternion();
		rotation45DegPelvisR.setFromAxisAngle(new THREE.Vector3(0, 0, 1), THREE.MathUtils.degToRad(135)); // Exemple : rotation inverse

		bones.forEach((bone) => {
				
				const id = mapSliderValues[bone]['idEl'];
				const slider = document.getElementById(id);
				if (!slider) return;
				slider.addEventListener('change', async () => {
					if (this.realTimeMovement) {
						return this.sendRealTimeCommand(slider);
					}
					const deg = this.isDeg;
					if (window.Simulator3D.naoPose === "sit"){
						this.toggleSliderInputs(true);
						await window.Simulator3D.posture('stand');
						this.toggleSliderInputs(false);
						this.setAllRotationsValues();
					}
					const boneObject = this.experience.hierarchie[bone];
					const initialJointPosition = this.initialJoints[bone];
					const value = Number(slider.value);
					const { axes, direction } = mapSliderValues[bone];
					const initialValue = boneObject.rotation[axes];
					const finalValue = initialJointPosition[axes] + value * direction;
					const duration = this.getDuration(initialValue, finalValue);
					// update the epaulet left and right (should not hit the shoulder)
					if (bone === 'upperarmL' || bone === 'upperarmR') {
						 const animation = gsap.to(boneObject.rotation, {
							duration,
							[axes]: finalValue,
							onUpdate: () => {
								// update epaulet left and right
								if (this.experience.collisionDetected) {
									animation.kill(); // Arrête immédiatement l'animation
									// console.log(`Animation sur ${bone} interrompue en raison d'une collision.`);
									this.experience.collisionDetected = false;
									this.computeReverseAnimation(boneObject, axes, direction, finalValue);
									return;
								}
								const epaulet = bone === 'upperarmL' ? this.experience.hierarchie['epaulet_left'] : this.experience.hierarchie['epaulet_right'];
								if (bone === 'upperarmL') {
									const upperarmL = this.experience.hierarchie['upperarmL'].rotation.x;
									if (upperarmL < 1) {
										epaulet.rotation.x = -0.02966 + Math.abs(upperarmL - 1);
									} else {
										epaulet.rotation.x = -0.02966;
									}
								} else {
									const upperarmR = this.experience.hierarchie['upperarmR'].rotation.x;
									if (upperarmR < 1) {
										epaulet.rotation.x = 0.09662 + Math.abs(upperarmR - 1);
									} else {
										epaulet.rotation.x = 0.09662;
									}
								}
								const innerValue = document.getElementById(`${id}-value`);
								innerValue.innerHTML = deg ? (value * 180 / Math.PI).toFixed(1) : value.toFixed(3);
							},
							onComplete: () => {
								this.completedAnimations++;
							},
						});

					} else if (bone !== 'pelvisL' && bone !== 'pelvisR') {
						// Standard case
						const animation = gsap.to(boneObject.rotation, {
							duration,
							[axes]: finalValue,
							onUpdate: () => {
								if (this.experience.collisionDetected) {
									animation.kill(); // Arrête immédiatement l'animation
									this.experience.collisionDetected = false;
									this.computeReverseAnimation(boneObject, axes, direction, finalValue);
									return;
								}
								const innerValue = document.getElementById(`${id}-value`);
								innerValue.innerHTML = deg ? (value * 180 / Math.PI).toFixed(1) : value.toFixed(3);
							},
							onComplete: () => {
								this.completedAnimations++;
							},
						});
					} else {
						// Particular case for pelvisL and pelvisR
						const localRotation = new THREE.Quaternion();
						localRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), value * direction);

						const targetQuaternion = bone === 'pelvisL' ? rotation45DegPelvisL.clone() : rotation45DegPelvisR.clone();
						targetQuaternion.multiply(localRotation);


						const animation = gsap.to(boneObject.quaternion, {
							x: targetQuaternion.x,
							y: targetQuaternion.y,
							z: targetQuaternion.z,
							w: targetQuaternion.w,
							duration, 
							onUpdate: () => {
								if (this.experience.collisionDetected) {
									animation.kill(); // Arrête immédiatement l'animation
									this.experience.collisionDetected = false;
									this.computeReverseAnimation(boneObject, axes, direction, finalValue);
									return;
								}
								boneObject.quaternion.normalize();
								const innerValue = document.getElementById(`${id}-value`);
								innerValue.innerHTML = deg ? (value * 180 / Math.PI).toFixed(1) : value.toFixed(3);
							},
							onComplete: () => {
								this.completedAnimations++;
							},
						});
					}
				});
			});


		const handBones = Object.keys(handSliderValues);
		handBones.forEach((bone) => {
			const sliderId = handSliderValues[bone];
			const slider = document.getElementById(sliderId['idEl']);
			if (!slider) return;
			slider.addEventListener('change', () => {
				if (this.realTimeMovement) {
					return this.sendRealTimeCommand(slider);
				}
				const value = Number(slider.value);
				const bones = Object.keys(handSliderValues[bone]);
				const innerValue = document.getElementById(`${bone}-value`);
				innerValue.innerHTML = value.toFixed(2);
				bones.forEach((phalax) => {
					const { axes, direction } = handSliderValues[bone][phalax];
					const boneObject = this.experience.hierarchie[phalax];
					const initialJointPosition = this.initialJoints[phalax][axes];
					gsap.to(boneObject.rotation, {
						[axes]: initialJointPosition + value * direction,
						onUpdate: () => {},
						onComplete: () => {
							this.completedAnimations++;
						},
					});
				});
			});
		});
	}

	updateCursorRealTime(slider, value) {
		const name = slider.id;
		const targetCursor = document.getElementById(`target-marker-${name}`);
		let min = Number(slider.min);
		let max = Number(slider.max);
		const sliderWidth = slider.offsetWidth;
		const markerWidth = 16;

		const percent = (value - min) / (max - min);
		const position = percent * (sliderWidth - markerWidth); 

		targetCursor.style.left = `${position}px`;
	}

	sendRealTimeCommand = async (slider) => {
		this.movingLiveSlider = slider;
		const name = slider.id;
		const value = Number(slider.value);
		this.updateCursorRealTime(slider, value);
		
		const joint = mapSlidersJoints[name];
		const naoCom = NaoCom.instance
		if (naoCom) {
			await naoCom.sendRealTimeCommand(joint, value);
		}
	}

	computeReverseAnimation(bone, axes, direction, value) {
		const step = 1.57 / 360;
		const currentRotation = bone.rotation[axes];
		const signCurrent = Math.sign(currentRotation);
		const signValue = Math.sign(value);
		const sign = signCurrent === signValue ? currentRotation < value ? 1 : -1 : signValue; // 🙈 devil ternary 
		const reverseStep = step * sign;
		const maxAttempts = 60;
		let attempts = 0;
		this.toggleSliderInputs(true);

		const revertUntilNoContact = () => {
			if (this.physics.world.contacts.length > 0 && attempts < maxAttempts ) {
				let needReverse = false;
				this.physics.world.contacts.forEach((contact) => {
					if (contact.bi.userData.type.match(/(sphere|capsule)/gi) && contact.bj.userData.type.match(/(sphere|capsule)/gi)) {
						needReverse = true;
					}
				});
				if (needReverse) {
					bone.rotation[axes] -= reverseStep;
					this.experience.collisionDetected = false;
					attempts++;
				} else {
					this.toggleSliderInputs(false);
					this.setAllRotationsValues();
					this.experience.collisionDetected = false;
					delete this.experience.movementObjectFunctions.computeReverAnim;
				}
			} else {
				this.toggleSliderInputs(false);
				this.setAllRotationsValues();
				this.experience.collisionDetected = false;
				delete this.experience.movementObjectFunctions.computeReverAnim;
			}
		};

		this.experience.movementObjectFunctions.computeReverAnim = revertUntilNoContact.bind(this);

	}

	toggleSliderInputs = (disabled) => {
		const allJointValuesInput = document.querySelectorAll('.slider-joint-element');
		allJointValuesInput.forEach((input) => {
			input.disabled = disabled;
		});
	};


	getDuration(initialValue, finalValue) {
		if ((initialValue < 0 && finalValue < 0) || (initialValue > 0 && finalValue > 0)) {
			return Math.max(Math.abs(finalValue - initialValue), 0.3);
		} else {
			return Math.max(Math.abs(initialValue) + Math.abs(finalValue), 0.3);
		}
	}

	setAllRotationsValues() {
		const deg = this.isDeg;
		const bones = Object.keys(mapSliderValues);
		bones.forEach((bone) => {
			const boneObject = this.experience.hierarchie[bone];
			const initialJointPosition = this.initialJoints[bone];
			
			const id = mapSliderValues[bone]['idEl'];
			const slider = document.getElementById(id);
			

			if (!slider) return;
			const { axes } = mapSliderValues[bone];
			const value = (boneObject.rotation[axes] - initialJointPosition[axes]) * mapSliderValues[bone]['direction'];
			slider.value = value;
			const innerValue = document.getElementById(`${id}-value`);
			innerValue.innerHTML = deg ? (value * 180/ Math.PI).toFixed(1) : value.toFixed(3);

			if (this.realTimeMovement && this.movingLiveSlider.id !== slider.id) {
				this.updateCursorRealTime(slider, value);
			}
			
		});
	}

	getUpperBodyPositions() {
		const deg = this.isDeg;
		const headGroup = document.getElementById('headGroup');
		const leftArmGroup = document.getElementById('leftArmGroup');
		const rightArmGroup = document.getElementById('rightArmGroup');

		const headInputs = headGroup.querySelectorAll('.joint-value');
		const headValues = Array.from(headInputs).map((input) => Number(input.innerHTML));

		const leftArmInputs = leftArmGroup.querySelectorAll('.joint-value');
		const leftArmValues = Array.from(leftArmInputs).map((input) => Number(input.innerHTML));

		const rightArmInputs = rightArmGroup.querySelectorAll('.joint-value');
		const rightArmValues = Array.from(rightArmInputs).map((input) => Number(input.innerHTML));

		const upperBodyPositions = [...headValues, ...leftArmValues, ...rightArmValues];
		return upperBodyPositions;
	}

	addUpperBodyBlocks = () => {
		// this.setAllRotationsValues();
		const deg = this.isDeg;
		const content_blocks = document.querySelector('#content_blocks > div');
		if (typeof content_blocks !== 'undefined') content_blocks.focus();
		const upperBodyPositions = this.getUpperBodyPositions();
		const workspace = Main.getWorkSpace();
		const allBlocks = workspace.getAllBlocks();
		let targetBlock = null;

		for (let i = 0; i < allBlocks.length; i++) {
			if (allBlocks[i].type === 'on_start' || allBlocks[i].type === 'scratch_on_start') {
				targetBlock = allBlocks[i];
				break; //
			}
		}
		const remapDeg = (values) => {
			if (deg) {
				return values.map((value) => (value).toFixed(1));
			} else {
				return values.map((value) => value.toFixed(3));
			}
		};

		const finalValues = remapDeg(upperBodyPositions);

		// Créer le nouveau bloc en xml
		const xmlText = `
		<block type="movements_setAnglesArmes_${deg ? "degres": "radians"}">
			<value name="HEAD_YAW">
				<shadow type="math_number">
					<field name="NUM">${finalValues[0]}</field>
				</shadow>
			</value>
			<value name="HEAD_PITCH">
				<shadow type="math_number">
					<field name="NUM">${finalValues[1]}</field>
				</shadow>
			</value>
			<value name="L_SHOULDER_PITCH">
				<shadow type="math_number">
					<field name="NUM">${finalValues[2]}</field>
				</shadow>
			</value>
			<value name="L_SHOULDER_ROLL">
				<shadow type="math_number">
					<field name="NUM">${finalValues[3]}</field>
				</shadow>
			</value>
			<value name="L_ELBOW_ROLL">
				<shadow type="math_number">
					<field name="NUM">${deg ? finalValues[4] > -2 ? -2 : finalValues[4] : finalValues[4] > -0.0349 ? -0.0349 : finalValues[4]}</field>
				</shadow>
			</value>
			<value name="L_ELBOW_YAW">
				<shadow type="math_number">
					<field name="NUM">${finalValues[5]}</field>
				</shadow>
			</value>
			<value name="L_WRIST_YAW">
				<shadow type="math_number">
					<field name="NUM">${finalValues[6]}</field>
				</shadow>
			</value>
			<value name="L_HAND">
				<shadow type="math_number">
					<field name="NUM">${finalValues[7]}</field>
				</shadow>
			</value>
			<value name="R_SHOULDER_PITCH">
				<shadow type="math_number">
					<field name="NUM">${finalValues[8]}</field>
				</shadow>
			</value>
			<value name="R_SHOULDER_ROLL">
				<shadow type="math_number">
					<field name="NUM">${finalValues[9]}</field>
				</shadow>
			</value>
			<value name="R_ELBOW_ROLL">
				<shadow type="math_number">
					<field name="NUM">${deg ?  finalValues[10] < 2 ? 2 : finalValues[10] :finalValues[10] < 0.0349 ? 0.0349: finalValues[10]}</field>
				</shadow>
			</value>
			<value name="R_ELBOW_YAW">
				<shadow type="math_number">
					<field name="NUM">${finalValues[11]}</field>
				</shadow>
			</value>
			<value name="R_WRIST_YAW">
				<shadow type="math_number">
					<field name="NUM">${finalValues[12]}</field>
				</shadow>
			</value>
			<value name="R_HAND">
				<shadow type="math_number">
					<field name="NUM">${finalValues[13]}</field>
				</shadow>
			</value>
		</block>`;
		const xml = Blockly.Xml.textToDom(xmlText);
		const newBlock = Blockly.Xml.domToBlock(xml, workspace);

		// Si le targetBlock est vide (n'a pas de child blocks)
		const statementInput = targetBlock.getInput('DO');
		if (targetBlock.childBlocks_.length === 0) {
			if (statementInput && statementInput.connection) {
				statementInput.connection.connect(newBlock.previousConnection);
			} else {
				console.error('No valid input found on target block to connect to.');
			}
		} else {

			const statementConnection = statementInput.connection;
			let lastBlock = statementConnection.targetBlock();
			while (lastBlock && lastBlock.getNextBlock()) {
				lastBlock = lastBlock.getNextBlock();
			}
			let currentBlock = lastBlock;

			// Parcourir jusqu'au dernier bloc
			while (currentBlock.getNextBlock()) {
				currentBlock = currentBlock.getNextBlock();
			}
			lastBlock.nextConnection.connect(newBlock.previousConnection);
		}

	};
}
