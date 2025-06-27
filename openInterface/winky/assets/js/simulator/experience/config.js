
const config = {
    debug: true,
    params: {
        "debug": false, // debug mode will throw console.log for debugging if declared
        "width": 500, // canvas width
        "height": 500, // canvas height
        'fov': 50,
        'clipNear': 0.1,
        'clipFar': 150,
    },
    orbitControlsParams: {
        enabled: true,
        panning: false,
        screenSpacePanning: true,
        enableKeys: false,
        zoomSpeed: 0.25,
        rotateSpeed: 0.25,
        enableDamping: true,
        maxDistance: 18,
        minDistance: 1,
        maxPolarAngle: Math.PI / 2,
        minPolarAngle: 0,
        maxAzimuthAngle: Math.PI / 2,
        minAzimuthAngle: -Math.PI / 2,
        targetPosition: [0, 10, 0]
    },

    models: {
        modelPath: '/openInterface/winky/assets/js/simulator/experience/models/winky_v3_scene.gltf',
        modelType: 'gltf', // gltf or obj
    },
    // 2.14, 4.5, 2.15
    cameraPositionInit: {
        x: 0,
        y: 20,
        z: 0,
    },
    hasBackground: true,
    background: {
        color: '#22b573',
    },
    hasHelpers: false,
    ground: {
        hasGround: true,
        type: 'plane', // 'grid' or 'plane (grid is a gridHelper, plane is a planeGeometry)
        // grid
        gridSize: 20,
        divisions: 32,
        // plane
        planeSize: 20,
        floorColor: 0x22b573,
    },
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
        elementsRegex: ['Face_Body_GEO', '(L|R)_Leg_GEO', 'BotBody_GEO', '(L|R)_ears_GEO', '(L|R)_Eye_GEO', 'LED_(L|R)_'] // either a string or an array of strings (regex formated or not)
    },
}

export default config;