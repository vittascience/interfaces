import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';


export default class CustomSceneSetup {
    constructor(experience) {
        this.experience = experience;
        this.scene = experience.scene;
        this.defaultGroundColor = new THREE.Color(0x8dbacc);
        this.userScene = "default";
        this.structureMaterial = null;
        this.structureColor = null;
        this.primaryMaterial = null;
        this.primaryColor = null;
        this.secondaryMaterial = null;
        this.secondaryColor = null;
        this.loader = this.experience.world.gltfLoader;
        this.init();
    }

    init() {
        this.scene.traverse((child) => {
            if (child.isMesh){
                if (child.material.name === "NaoMat/Structure") {
                    this.structureColor = child.material.color;
                    this.structureMaterial = child.material;
                } else if (child.material.name === "NaoMat/MainSkin") {
                    this.primaryColor = child.material.color;
                    this.primaryMaterial = child.material;
                } else if (child.material.name === "NaoMat/SecondarySkin_pantone445C") {
                    this.secondaryColor = child.material.color;
                    this.secondaryMaterial = child.material;
                }
            }
        });

        const color1Dropdown = document.getElementById('nao-color-1-dropdown');
        const color2Dropdown = document.getElementById('nao-color-2-dropdown');
        const color3Dropdown = document.getElementById('nao-color-3-dropdown');

        color1Dropdown.addEventListener('change', (event) => {
            const color = event.target.value;
            this.changeNaoColor("structure", color);
        });

        color2Dropdown.addEventListener('change', (event) => {
            const color = event.target.value;
            this.changeNaoColor("primary", color);
        });

        color3Dropdown.addEventListener('change', (event) => {
            const color = event.target.value;
            this.changeNaoColor("secondary", color);
        });
    }

    changeNaoColor(element, color) {
        if (element === "structure") {
            if (color === "default") {
                this.structureMaterial.color = this.structureColor;
            } else {
                this.structureMaterial.color = new THREE.Color(color);
            }
        } else if (element === "primary") {
            if (color === "default") {
                this.primaryMaterial.color = this.primaryColor;
            } else {
                this.primaryMaterial.color = new THREE.Color(color);
            }
        } else if (element === "secondary") {
            if (color === "default") {
                this.secondaryMaterial.color = this.secondaryColor;
            } else {
                this.secondaryMaterial.color = new THREE.Color(color);
            }
        }
    }

    moonScene() {

        const checkTerrain = this.experience.scene.getObjectByName('moonTerrain');
        if (checkTerrain) {
          checkTerrain.visible = true;
          const groundFloor = this.experience.scene.getObjectByName('backgroundFloor');
          if (groundFloor) {
            groundFloor.material = new THREE.MeshStandardMaterial({ color: 0xA5A2A5 });
          }
          return;
        }
    
        const modelPath = '/openInterface/nao/assets/js/simulator/experience/models/terrain.glb';
        const floor = this.experience.scene.getObjectByName('backgroundFloor');
        if (floor) {
          floor.material = new THREE.MeshStandardMaterial({ color: 0xA5A2A5 });
        }
            const textureLoader = new THREE.TextureLoader();
            const moonDiffuse = textureLoader.load('/openInterface/nao/assets/js/simulator/experience/models/textures/Dirt_003_COLOR.png');
            const moonNormal = textureLoader.load('/openInterface/nao/assets/js/simulator/experience/models/textures/Dirt_003_NRM.png');
            const moonRoughness = textureLoader.load('/openInterface/nao/assets/js/simulator/experience/models/textures/Dirt_003_DISP.png');
    
            const moonMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uDiffuse: { value: moonDiffuse },
                    uNormal: { value: moonNormal },
                    uRoughness: { value: moonRoughness },
                    uTime: { value: 0 },
                },
                vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
                fragmentShader: `
        uniform sampler2D uDiffuse;
        uniform sampler2D uNormal;
        uniform sampler2D uRoughness;
        varying vec2 vUv;
        void main() {
          vec4 diffuseColor = texture2D(uDiffuse, vUv);
          vec4 normalColor = texture2D(uNormal, vUv);
          vec4 roughnessColor = texture2D(uRoughness, vUv);
          
          // Combine les couleurs pour un rendu lunaire
          vec3 finalColor = diffuseColor.rgb * 0.8 + normalColor.rgb * 0.2;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
            });
    
            this.loader.load(modelPath, (gltf) => {
                const terrain = gltf.scene;
    
                terrain.position.set(0, -0.2, 0);
    
                terrain.traverse((child) => {
                    if (child.isMesh) {
                        child.material = moonMaterial;
                        child.receiveShadow = true;
                    }
                });
                terrain.name = 'moonTerrain';
                this.scene.add(terrain);
            });
        }
    
      defaultScene() {
        const floor = this.experience.scene.getObjectByName('backgroundFloor');
        if (floor) {
          floor.material.color = this.defaultGroundColor;
        }
        const terrain = this.experience.scene.getObjectByName('moonTerrain');
        if (terrain) {
          terrain.visible = false;
        }
      }
    
      changeScene(scene) {
        this.userScene = scene;
        if (scene === 'default') {
          this.defaultScene();
        } else if (scene === 'moon') {
          this.moonScene();
        }
      }
}