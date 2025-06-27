const config = {
	debug: true,
	enableXR: true,
	params: {
		debug: false, // debug mode will throw consolelog for debugging if declared
		width: 500, // canvas width
		height: 500, // canvas height
		fov: 50,
		clipNear: 0.1,
		clipFar: 1000,
	},
	orbitControlsParams: {
		enabled: true,
		panning: true,
		screenSpacePanning: true,
		enableKeys: false,
		enableZoom: true,
		zoomSpeed: 0.25,
		rotateSpeed: 1,
		enableDamping: true,
		maxDistance: Infinity,
		minDistance: 0.3,
		maxPolarAngle: Math.PI / 2,
		minPolarAngle: 0,
		maxAzimuthAngle: Infinity,
		minAzimuthAngle: -Infinity,
		targetPosition: [0, 0.3, 0],
	},

	models: {
		modelPath: '/openInterface/nao/assets/js/simulator/experience/models/nao-V12.glb',
		modelType: 'glb', // gltf or obj
	},
	// 2.14, 4.5, 2.15`
	cameraPositionInit: {
		x: -0.5,
		y: 3.5,
		z: 0.5,
	},
	hasBackground: true,
	background: {
		color: '#010101',
	},
	hasHelpers: false,
	ground: {
		hasGround: false,
		type: 'plane', // 'grid' or 'plane (grid is a gridHelper, plane is a planeGeometry)
		// grid
		gridSize: 20,
		divisions: 32,
		// plane
		planeSize: 20,
		// floorColor: 0x22b573,
		floorColor: 0x8dbacc,
	},
	usePostprocess: {
		enabled: true,
		config: {
			strength: 1,
			radius: 0.1,
			threshold: 0,
		},
	},
	// elements hierarchy => used to get elements from the scene and handle animations
	modelHierarchy: {
		elementsRegex: [
			'finger11L', 'finger11L001', 'finger11L002', 'thumbL', 'thumbL001', 'finger21L', 'finger21L001', 'finger21L002',
			'led_left_eye_L0',
			'led_left_eye_L1',
			'led_left_eye_L2',
			'led_left_eye_L3',
			'led_left_eye_L4',
			'led_left_eye_L5',
			'led_left_eye_L6',
			'led_left_eye_L7',
			'led_right_eye_R0',
			'led_right_eye_R1',
			'led_right_eye_R2',
			'led_right_eye_R3',
			'led_right_eye_R4',
			'led_right_eye_R5',
			'led_right_eye_R6',
			'led_right_eye_R7',
			'US_sensor_1',
			'epaulet_left',
			'epaulet_right',
			'led_brain',
			'led_left_ear',
			'led_right_ear',
			'nao_logo_chest',
			'nao_logo_foot_left',
			'nao_logo_foot_right',
			'NAOH25V60xmlHeadPitch',
			'root_bone',
			'CTRL_leg_IKL',
			'CTRL_leg_IKR',
			'TARGET_IK_legL',
			'TARGET_IK_legR',
			'spine',
			'pelvisL',
			'pelvisL001',
			'tightL',
			'shinL',
			'shinL001',
			'anckleL',
			'pelvisR',
			'pelvisR001',
			'tightR',
			'shinR',
			'shinR001',
			'anckleR',
			'spine001',
			'shoulderL',
			'upperarmL',
			'forearmL',
			'forearmLyaw',
			'forearmRyaw',
			'handL',
			'finger11L',
			'finger11L001',
			'finger11L002',
			'thumbL',
			'thumbL001',
			'finger21L',
			'finger21L001',
			'finger21L002',
			'shoulderR',
			'upperarmR',
			'forearmR',
			'handR',
			'finger11R',
			'finger11R001',
			'finger11R002',
			'thumbR',
			'thumbR001',
			'finger21R',
			'finger21R001',
			'finger21R002',
			'neck',
			'head',
			'CTRL_arm_IKL',
			'CTRL_arm_IKR',
			'naoTorsoV6',
			'HeadTouchFront',
			'HeadTouchMiddle',
			'HeadTouchRear',
			'LFootBumperRight',
			'RFootBumperRight',
			'LHandTouchLeft',
			'LHandTouchRight',
			'LHandTouchBack',
			'RHandTouchLeft',
			'RHandTouchRight',
			'RHandTouchBack',
			'sonar_sensor_left',
			'sonar_sensor_right',

		],
		groupes:{
			led_group: ['led_brain','led_left_ear', 'led_right_ear', 'nao_logo_chest', 'nao_logo_foot_left', 'nao_logo_foot_right', 'led_left_eye_L0', 'led_left_eye_L1', 'led_left_eye_L2', 'led_left_eye_L3', 'led_left_eye_L4', 'led_left_eye_L5', 'led_left_eye_L6', 'led_left_eye_L7', 'led_right_eye_R0', 'led_right_eye_R1', 'led_right_eye_R2', 'led_right_eye_R3', 'led_right_eye_R4', 'led_right_eye_R5', 'led_right_eye_R6', 'led_right_eye_R7', 'HeadTouchFront', 'HeadTouchMiddle', 'HeadTouchRear', 'LFootBumperRight', 'RFootBumperRight', 'LHandTouchLeft', 'LHandTouchRight', 'LHandTouchBack', 'RHandTouchLeft', 'RHandTouchRight', 'RHandTouchBack', 'sonar_sensor_left', 'sonar_sensor_right'],
			rgbLed_group: ['nao_logo_chest', 'nao_logo_foot_left', 'nao_logo_foot_right', 'led_left_eye_L0', 'led_left_eye_L1', 'led_left_eye_L2', 'led_left_eye_L3', 'led_left_eye_L4', 'led_left_eye_L5', 'led_left_eye_L6', 'led_left_eye_L7', 'led_right_eye_R0', 'led_right_eye_R1', 'led_right_eye_R2', 'led_right_eye_R3', 'led_right_eye_R4', 'led_right_eye_R5', 'led_right_eye_R6', 'led_right_eye_R7', 'HeadTouchFront', 'HeadTouchMiddle', 'HeadTouchRear', 'LFootBumperRight', 'RFootBumperRight', 'LHandTouchLeft', 'LHandTouchRight', 'LHandTouchBack', 'RHandTouchLeft', 'RHandTouchRight', 'RHandTouchBack', 'sonar_sensor_left', 'sonar_sensor_right'],
			sensors_group: ['US_sensor_1'],
		},
	},
	// animations
	animations: {
		open_left_hand: {
			bones: ['finger11L', 'finger11L001', 'finger11L002', 'thumbL', 'thumbL001', 'finger21L', 'finger21L001', 'finger21L002'],
			allBones: false,
		},
		open_right_hand: {
			bones: ['finger11R', 'finger11R001', 'finger11R002', 'thumbR', 'thumbR001', 'finger21R', 'finger21R001', 'finger21R002'],
			allBones: false,
		},
		stand_sit: {
			allBones: true,
			excludedBones : ['root_bone'],
		},
		walk_forward: {
			allBones: true,
			excludedBones : ['root_bone', 'finger11L', 'finger11L001', 'finger11L002', 'thumbL', 'thumbL001', 'finger21L', 'finger21L001', 'finger21L002', 'finger11R', 'finger11R001', 'finger11R002', 'thumbR', 'thumbR001', 'finger21R', 'finger21R001', 'finger21R002'],
		},
		walk_backward: {
			allBones: true,
			excludedBones : ['root_bone', 'finger11L', 'finger11L001', 'finger11L002', 'thumbL', 'thumbL001', 'finger21L', 'finger21L001', 'finger21L002', 'finger11R', 'finger11R001', 'finger11R002', 'thumbR', 'thumbR001', 'finger21R', 'finger21R001', 'finger21R002'],
		},
		turn_ccw:{
			allBones: true,
			excludedBones : ['root_bone', 'finger11L', 'finger11L001', 'finger11L002', 'thumbL', 'thumbL001', 'finger21L', 'finger21L001', 'finger21L002', 'finger11R', 'finger11R001', 'finger11R002', 'thumbR', 'thumbR001', 'finger21R', 'finger21R001', 'finger21R002'],
		},
		turn_cw:{
			allBones: true,
			excludedBones : ['root_bone', 'finger11L', 'finger11L001', 'finger11L002', 'thumbL', 'thumbL001', 'finger21L', 'finger21L001', 'finger21L002', 'finger11R', 'finger11R001', 'finger11R002', 'thumbR', 'thumbR001', 'finger21R', 'finger21R001', 'finger21R002'],
		},
		invoke_scene: {
			allBones: true,
			excludedBones: ["root_bone"]
		},
		rest_pose: {
			allBones: true,
			excludedBones: ["root_bone"]
		},
		animated_speech1: {
			allBones: true,
			excludedBones: ["root_bone"]
		},
		animated_speech2: {
			allBones: true,
			excludedBones: ["root_bone"]
		},
		animated_speech3: {
			allBones: true,
			excludedBones: ["root_bone"]
		},
		animated_speech4: {
			allBones: true,
			excludedBones: ["root_bone"]
		},
	},
	
};

export default config;
