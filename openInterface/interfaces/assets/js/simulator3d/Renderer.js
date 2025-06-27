import * as THREE from './libs/three.js'
import Experience from './Experience.js'


import { EffectComposer } from './libs/effects/EffectComposer.js';
import { RenderPass } from './libs/effects/RenderPass.js';
import { UnrealBloomPass } from './libs/effects/UnrealBloomPass.js';
import { OutputPass } from './libs/effects/OutputPass.js';
import { ShaderPass } from './libs/effects/ShaderPass.js';

export default class Renderer{
    constructor(buffer, cameraType, usePostprocess = false){
        this.usePostprocess = usePostprocess
        this.experience = new Experience()
        this.sceneReady = this.experience.sceneReady
        this.config = this.experience.config
        this.time = this.experience.time
        // this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.cameraType = cameraType
        this.needBuffer = buffer
        this.stats = this.experience.stats
        this.materials = {}
        this.bloomLayer = new THREE.Layers()
        this.bloomLayer.set(1)
        this.darkMaterial = new THREE.MeshBasicMaterial({color: '#000000'})
        this.setInstance()
        this.initBloomLayer()
    }

    setInstance()
    {
        this.clearColor = '#010101'

        // Renderer
        this.instance = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            physicallyCorrectLights: true,
            outputEncoding: THREE.SRGBColorSpace,
            // preserveDrawingBuffer: this.needBuffer,
            // preserveDrawingBuffer: this.needBuffer
        })
        this.instance.preserveDrawingBuffer = this.needBuffer
        this.instance.xr.enabled = true
        // this.instance.domElement.style.position = 'absolute'
        // this.instance.domElement.style.top = 0
        // this.instance.domElement.style.left = 0
        // this.instance.domElement.style.width = '100%'
        // this.instance.domElement.style.height = '100%'

        this.instance.setClearColor(0xFFFFFF, 0)
        this.instance.setSize(this.config.width, this.config.height)
        this.instance.setPixelRatio(this.config.pixelRatio)
        // this.instance.gammaOutPut = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.shadowMap.enabled = true
        this.instance.toneMapping = this.usePostprocess.enabled ? THREE.ReinhardToneMapping : THREE.NoToneMapping
        this.instance.toneMappingExposure = 1

        this.context = this.instance.getContext()


        // Post process
        const renderScene = new RenderPass(this.scene, this.camera.instance)


        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(this.config.width, this.config.height), 1.5, 0.4, 0.85)
        this.bloomPass.threshold = this.usePostprocess.enabled ? this.usePostprocess.config.threshold : 0
        this.bloomPass.strength = this.usePostprocess.enabled ? this.usePostprocess.config.strength : 1
        this.bloomPass.radius = this.usePostprocess.enabled ? this.usePostprocess.config.radius : 0.1
        this.bloomPass.exposure = this.usePostprocess.enabled ? 1.5 : 1

        const vertexShader = `
        varying vec2 vUv;

			void main() {

				vUv = uv;

				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			}
        `
        const fragmentShader = `
        uniform sampler2D baseTexture;
			uniform sampler2D bloomTexture;

			varying vec2 vUv;

			void main() {

				gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

			}
        `

        this.bloomComposer = new EffectComposer(this.instance)
        this.bloomComposer.renderToScreen = false
        this.bloomComposer.addPass(renderScene)
        this.bloomComposer.addPass(this.bloomPass)

        const mixPass = new ShaderPass(
            new THREE.ShaderMaterial( {
                uniforms: {
                    baseTexture: { value: null },
                    bloomTexture: { value: this.bloomComposer.renderTarget2.texture }
                },
                vertexShader,
                fragmentShader,
                defines: {}
            } ), 'baseTexture'
        );
        mixPass.needsSwap = true;


        const outputPass = new OutputPass()

        this.postProcess = new EffectComposer(this.instance),
        this.postProcess.addPass(renderScene)
        this.postProcess.addPass(mixPass)
        this.postProcess.addPass(outputPass)

        



        // Add stats panel
        if(this.stats)
        {
            this.stats.setRenderPanel(this.context)
        }
        
    }

    initBloomLayer(){
        setTimeout(() => {
            if (this.experience.sceneReady){
                this.bloomPassMeshes = []
                const groupedMeshes = this.experience.options.modelHierarchy.groupes.led_group
                this.scene.traverse((child) => {
                    if (child.isMesh) {
                        if (groupedMeshes.includes(child.name)) {
                            // Assignez les LEDs à la couche 1
                            this.bloomPassMeshes.push(child);
                            child.layers.enable(1);
                        } else {
                            // Assignez les autres objets à la couche 0 uniquement
                            // child.layers.set(0);
                        }
                    } else if (child.isLight) {
                        // Assignez les lumières uniquement à la couche 0
                        // child.layers.enable(0);
                    }
                });
            } else {
                this.initBloomLayer()
            }
        }, 300)
    }

    update() {   
        if(this.stats)
        {
            this.stats.beforeRender()
        }

        if (this.usePostprocess.enabled && this.experience.sceneReady) {
            // console.log('usePostprocess')
            this.scene.traverse(this.darkenNonBloomed.bind(this));
            this.bloomComposer.render()
            this.scene.traverse(this.restoreMaterial.bind(this));
            
            this.postProcess.render()
        } else {
            if (this.cameraType === 'default'){
                this.instance.render(this.scene, this.camera.instance)
            } else {
                this.instance.render(this.scene, this.camera.orthographic)
            }
        }

        if (this.stats) {
            this.stats.afterRender()
        }
    }

    destroy()
    {
        if (this.instance) {
            this.instance.dispose();
            console.log('Renderer disposed');
           
        }
    }

    darkenNonBloomed(obj){
        if ( obj.isMesh && this.bloomLayer.test( obj.layers ) === false ) {
            // console.log('darkenNonBloomed')
            this.materials[ obj.uuid ] = obj.material;
            obj.material = this.darkMaterial;

        }
    };
    restoreMaterial( obj ) {

        if ( this.materials[ obj.uuid ] ) {

            obj.material = this.materials[ obj.uuid ];
            delete this.materials[ obj.uuid ];

        }

    }


}