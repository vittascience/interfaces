const config = {
	debug: true,
	enableXR: false,
	enablePhysics: false,
	params: {
		debug: false, // debug mode will throw console.log for debugging if declared
		width: 500, // canvas width
		height: 350, // canvas height
		fov: 50,
		clipNear: 0.1,
		clipFar: 150,
	},
	orbitControlsParams: {
		enabled: true,
		panning: true,
		screenSpacePanning: true,
		enableZoom: true,
		enableKeys: false,
		zoomSpeed: 0.25,
		rotateSpeed: 1,
		enableDamping: true,
		maxDistance: 8, // initial zoom distance
		minDistance: 8, // initial zoom distance
		maxPolarAngle: (Math.PI / 2) * 0.9,
		minPolarAngle: 0,
		maxAzimuthAngle: Infinity,
		minAzimuthAngle: -Infinity,
		targetPosition: [0, 0, 0],
	},

	models: {
		modelPath: '/openInterface/esp32/assets/js/simulator/experience/models/ilo-v11.glb',
		modelType: 'gltf', // gltf or obj
	},
	// 2.14, 4.5, 2.15
	cameraPositionInit: {
		x: 0.3,
		y: 0.3,
		z: 0.3,
	},
	hasBackground: true,
	background: {
		color: '#ff0000',
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
		floorColor: 0x22b573,
	},
	usePostprocess: false,
	// elements hierarchy => used to get elements from the scene and handle animations
	usePostprocess: {
		enabled: false,
		config: {
			strength: 0.5,
			radius: 0.5,
			threshold: 1,
		},
	},
	modelHierarchy: {
		elementsRegex: ['(BL|BR|FR|FL)_wheel', '(C|L|R)_Sensor', 'body', 'chassis', 'LED', 'LED_(GLOW|GLOW_2)', 'Safety_Gate', '(B|F|R|L)_distance_sensor', '(F|B|R|L)_fence', 'bounding_box', 'bounding_box_physics',  'led_matrix_(center|circle)', 'led_matrix_center001', "wheel_BL", "wheel_BR", "wheel_FR", "wheel_FL"], 
		groupes: {
			led_group: ['led_matrix_center', 'led_matrix_circle', 'LED', 'led_matrix_center_1', 'led_matrix_center_2', 'led_matrix_center_3', 'led_matrix_center_4', 'led_matrix_center_5', 'led_matrix_center_6', 'led_matrix_center_7', 'led_matrix_center_8', 'led_matrix_center_9', 'led_matrix_center_10', 'led_matrix_center_11', 'led_matrix_center_12', 'led_matrix_center_13', 'led_matrix_center_14', 'led_matrix_center_15', 'led_matrix_center_16', 'led_matrix_center_17', 'led_matrix_center_18', 'led_matrix_center_19', 'led_matrix_center_20', 'led_matrix_center_21', 'led_matrix_center_22', 'led_matrix_center_23', 'led_matrix_center_24', 'led_matrix_center_25', 'led_matrix_center_26', 'led_matrix_center_27', 'led_matrix_center_28', 'led_matrix_center_29', 'led_matrix_center_30', 'led_matrix_center_31', 'led_matrix_center_32', 'led_matrix_center_33', 'led_matrix_center_34', 'led_matrix_center_35', 'led_matrix_center_36', 'led_matrix_center_37', 'led_matrix_center_38', 'led_matrix_center_39', 'led_matrix_center_40', 'led_matrix_center_41', 'led_matrix_center_42', 'led_matrix_center_43', 'led_matrix_center_44', 'led_matrix_center_45', 'led_matrix_circle_1', 'led_matrix_circle_2', 'led_matrix_circle_3', 'led_matrix_circle_4', 'led_matrix_circle_5', 'led_matrix_circle_6', 'led_matrix_circle_7', 'led_matrix_circle_8', 'led_matrix_circle_9', 'led_matrix_circle_10', 'led_matrix_circle_11', 'led_matrix_circle_12', 'led_matrix_circle_13', 'led_matrix_circle_14', 'led_matrix_circle_15'],
		}
	},
};

export default config;
