import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';
import  BufferGeometryUtils  from '/openInterface/interfaces/assets/js/simulator3d/libs/BufferGeometryUtils.js';
import grid from './mazeGrid.js'; // to remove when grid will be generated from the interface (in a modal for example)


/**
 * Maze builder class (unused for now, but could be used to build a maze from a grid)
 * @param {Experience} experience
 */
export default class MazeBuilder {
	constructor(experience) {
		this.grid = grid;
		this.maze = [];
		this.experience = experience;
		this.initPosition = { x: 0, y: 0 };
        this.gridSize = { x: 40, y: 20 };   
        this.factor = 1/20;
        this.init();
        
	}

    init(){
        this.buildMaze()
    }

	buildMaze() {
        const gridData = this.grid;
		const geometries = []; 
        const meshObjects = [];
		const wallHeight = 0.2; 
		const wallThickness = 1; 

        const halfGridSizeX = (this.gridSize.x * this.factor) / 2;
        const halfGridSizeY = (this.gridSize.y * this.factor) / 2;

		
		for (let row = 0; row <this.gridSize.y; row++) {
			for (let col = 0; col < this.gridSize.x ; col++) {
				const index = row * this.gridSize.x + col;
				const pixel = gridData[index];
				if (pixel.isWall) {
					
					const geometry = new THREE.BoxGeometry(wallThickness* this.factor, wallHeight, wallThickness* this.factor);
					geometry.translate(
                        (col * this.factor) - halfGridSizeX,  
                        wallHeight / 2,                      
                        (row * this.factor) - halfGridSizeY   
                    );

                    geometries.push(geometry);
				}
			}
		}

        for (const geometry of geometries) {
            const material = new THREE.MeshStandardMaterial({ color: 0x00ffaa });
            const mesh = new THREE.Mesh(geometry, material);
            meshObjects.push(mesh);
            this.experience.scene.add(mesh);
        }

        this.experience.mazeArray = meshObjects
        this.experience.experience.movementObjectFunctions.checkCollision = null;
        this.experience.checkCollision();

	}
}
