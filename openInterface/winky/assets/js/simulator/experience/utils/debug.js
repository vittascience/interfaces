// import Simulator3d from '../experience';
import * as dat from '/openInterface/interfaces/assets/js/simulator3d/libs/lil-gui.js';

export default class Gui {
    constructor(experience) {
        this.experience = experience;
        this.ui = new dat.GUI({ autoPlace: false });
        this.initGui();
    }

    initGui() {
        console.log('initGui');
        const element = this.experience.hierarchie.element;
        this.ui = new dat.GUI({ autoPlace: false });
        const element1Pos = this.ui.add(element.rotation, 'y').min(-3.14).max(3.14).step(0.01).name('Joint_1');

        const printValues = () => {
            console.log(values);
        };
        
        const values = [0];

        element1Pos.onChange((value) => {
            printValues();
            values[0] = Number(value.toFixed(2));
        });

        const container = document.createElement('div');
        container.id = 'my-gui-container';
        container.appendChild(this.ui.domElement);
        container.style.position = 'absolute';
        container.style.top = '100px';
        container.style.right = '5px';
        container.style.zIndex = '1000';
        // container.style.width = '500px';
        container.style.height = 'auto';

        document.body.appendChild(container);  // Ajoutez cette ligne
    }
}