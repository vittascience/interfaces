const config = {
	debug: true,
	enablePhysics: true,
	params: {
		debug: false, // debug mode will throw console.log for debugging if declared
		width: 500, // canvas width
		height: 350, // canvas height
		fov: 50,
		clipNear: 0.1,
		clipFar: 150,
		directionalLight: {
			position: [5, 20, 4],
		}
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
		maxDistance: 10, // initial zoom distance
		minDistance: 10, // initial zoom distance
		maxPolarAngle: (Math.PI) / 2*0.9,
		minPolarAngle: 0,
		maxAzimuthAngle: Infinity,
		minAzimuthAngle: -Infinity,
		targetPosition: [0, 0, 0],
	},

	models: {
		modelPath: '/openInterface/l476/assets/js/simulator/experience/models/donubot-V4.glb',
		modelType: 'gltf', // gltf or obj
	},
	// 2.14, 4.5, 2.15
	cameraPositionInit: {
		x: 3,
		y: 3,
		z: 3,
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
	usePostprocess: {
		enabled: false,
		config: {
			strength: 0.5,
			radius: 0.5,
			threshold: 1,
		},
	},
	
	// elements hierarchy => used to get elements from the scene and handle animations
	modelHierarchy: {
		elementsRegex: ['(L|R)_wheel', '(C|L|R)_Sensor', 'body', 'chassis', 'LED', 'LED_GLOW', 'Safety_Gate', '(B|F|R|L)_distance_sensor', '(F|B|R|L)_fence', 'bounding_box', 'wheel_(L|R)', 'physics_support_(back|front)', "led_(1|2|3|4|5|6|7|8)"], // either a string or an array of strings (regex formated or not)
		groupes: {
			led_group: ['led_1', 'led_2', 'led_3', 'led_4', 'led_5', 'led_6', 'led_7', 'led_8'],
		}
	},
};

export default config;
