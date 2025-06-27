
const config = {
    debug: true,
    enableXR: true,
    params : {
        "debug": false, // debug mode will throw console.log for debugging if declared
        "width": 500, // canvas width
        "height": 500, // canvas height
        'fov': 50,
        'clipNear': 0.1,
        'clipFar': 150,
    },
    orbitControlsParams: {
        enabled: true,
        panning: true,
        screenSpacePanning: true,
        enableKeys: false,
        zoomSpeed: 0.25,
        rotateSpeed: 1,
        enableDamping: true,
        maxDistance: 4,
        minDistance: 0.1,
        maxPolarAngle: Math.PI / 2,
        minPolarAngle: 0,
        maxAzimuthAngle: Infinity,  
        minAzimuthAngle: - Infinity,
        targetPosition: [0, 0.2, 0],
    },
    
    models:{
        modelPath: '/openInterface/niryo/assets/js/simulator/experience/models/ned2_v5.glb',
        modelType: 'glb', // gltf or obj
    },
    // 2.14, 4.5, 2.15
    cameraPositionInit:{
        x: -0.5,
		y: 2.5,
		z: 0.5,
    },
    hasBackground: true,
    background:{
        color: '#010101',
    },
    hasHelpers: true,
    ground: {
        hasGround: true,
        type: 'grid', // 'grid' or 'plane (grid is a gridHelper, plane is a planeGeometry)
        // grid
        gridSize: 5,
        divisions: 32,
        // plane
        planeSize: 20,
        floorColor: 0x22b573,
    },
    usePostprocess: {
		enabled: true,
		config: {
			strength: 0.5,
			radius: 0.5,
			threshold: 1,
		},
	},
    // elements hierarchy => used to get elements from the scene and handle animations
    modelHierarchy: {
        elementsRegex: ['joint_[0-9]', 'MORS_(LEFT|RIGHT)', 'LED_RING_', 'modelCustom', '(X|Y|Z)_axis_helper'], // either a string or an array of strings (regex formated or not)
        groupes:{
			led_group: ['LED_RING_1', 'LED_RING_2', 'LED_RING_3', 'LED_RING_4', 'LED_RING_5', 'LED_RING_6', 'LED_RING_7', 'LED_RING_8', 'LED_RING_9', 'LED_RING_10', 'LED_RING_11', 'LED_RING_12', 'LED_RING_13', 'LED_RING_14', 'LED_RING_15', 'LED_RING_16', 'LED_RING_17', 'LED_RING_18', 'LED_RING_19', 'LED_RING_20', 'LED_RING_21', 'LED_RING_22', 'LED_RING_23', 'LED_RING_24', 'LED_RING_25', 'LED_RING_26', 'LED_RING_27', 'LED_RING_28', 'LED_RING_29', 'LED_RING_30'],
		},
    },
}


export default config;