import * as THREE from './libs/three.js';
import { OrbitControls } from './libs/orbitControls.js';
import Experience from './Experience.js'

export default class Camera {
    constructor() {
        this.experience = new Experience()
        this.config = this.experience.config
        this.caperaPositionInit = this.experience.cameraPositionInit
        this.orbitControlsParams = this.experience.orbitControlsParams
        this.time = this.experience.time
        // this.size = this.experience.size
        this.targetElement = this.experience.targetElement
        this.scene = this.experience.scene
        this.mode = 'debug'
        this.setInstance()
        this.setModes()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(this.config.fov, this.config.width / this.config.height, this.config.clipNear, this.config.clipFar)
        this.instance.rotation.reorder('YXZ')
        this.scene.add(this.instance)

        //orthographic view
        const cameraPosition = new THREE.Vector3(0, 0.1, 1);
        const targetPosition = new THREE.Vector3(0, 0, 0);
        this.orthographic = new THREE.OrthographicCamera(
            this.config.width / -500,
            this.config.width / 500,
            this.config.height / 500,
            this.config.height / -500,
            this.config.clipNear,
            this.config.clipFar
        );

        this.orthographic.rotation.reorder('YXZ');
        this.orthographic.lookAt(targetPosition);
        this.orthographic.position.copy(cameraPosition);
        this.orthographic.updateProjectionMatrix();

    }

    setModes() {
        this.modes = {}
        // console.log("orbitControlParams",this.orbitControlsParams)

        // Default
        this.modes.default = {}
        this.modes.default.instance = this.instance.clone()
        // this.modes.default.instance.rotation.reorder('XYZ')

        // Debug
        this.modes.debug = {}
        this.modes.debug.instance = this.instance.clone()
        // this.modes.debug.instance.rotation.reorder('YXZ')
        // this.modes.debug.instance.position.set(2.14, 4.5, 2.15)
        this.modes.debug.instance.position.set(this.caperaPositionInit.x, this.caperaPositionInit.y, this.caperaPositionInit.z)

        this.modes.debug.orbitControls = new OrbitControls(this.modes.debug.instance, this.targetElement)
        // this.modes.debug.orbitControls = new OrbitControls(this.instance, this.targetElement)
        this.modes.debug.orbitControls.enabled = this.orbitControlsParams.enabled
        this.modes.debug.orbitControls.enablePan = this.orbitControlsParams.panning
        this.modes.debug.orbitControls.screenSpacePanning = this.orbitControlsParams.screenSpacePanning
        this.modes.debug.orbitControls.enableKeys = this.orbitControlsParams.enableKeys
        this.modes.debug.orbitControls.enableZoom = this.orbitControlsParams.enableZoom
        this.modes.debug.orbitControls.zoomSpeed = this.orbitControlsParams.zoomSpeed
        this.modes.debug.orbitControls.maxDistance = this.orbitControlsParams.maxDistance
        this.modes.debug.orbitControls.minDistance = this.orbitControlsParams.minDistance
        this.modes.debug.orbitControls.maxPolarAngle = this.orbitControlsParams.maxPolarAngle
        this.modes.debug.orbitControls.minPolarAngle = this.orbitControlsParams.minPolarAngle
        this.modes.debug.orbitControls.maxAzimuthAngle = this.orbitControlsParams.maxAzimuthAngle
        this.modes.debug.orbitControls.minAzimuthAngle = this.orbitControlsParams.minAzimuthAngle
        this.modes.debug.orbitControls.enableDamping = this.orbitControlsParams.enableDamping
        this.modes.debug.orbitControls.rotateSpeed = this.orbitControlsParams.rotateSpeed
        this.modes.debug.orbitControls.target = new THREE.Vector3(this.orbitControlsParams.targetPosition[0], this.orbitControlsParams.targetPosition[1], this.orbitControlsParams.targetPosition[2])
        this.modes.debug.orbitControls.update()

    }
    update() {
        // Update debug orbit controls
        this.modes.debug.orbitControls.update()
        // console.log('update')

        // Apply coordinates
        this.instance.position.copy(this.modes[this.mode].instance.position)
        this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion)
        this.instance.updateMatrixWorld() // To be used in projection
    }

    destroy() {
        this.modes.debug.orbitControls.destroy()
    }

}

