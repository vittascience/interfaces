// import Simulator3d from '../experience';
import * as dat from '/openInterface/interfaces/assets/js/simulator3d/libs/lil-gui.js';

export default class Gui{
    constructor(experience){
        this.experience = experience;
        this.ui = new dat.GUI({ autoPlace: false });
        this.initGui();
    }

    initGui() {
        console.log('initGui');
        const joint1 = this.experience.hierarchie.joint_1;
        const joint2 = this.experience.hierarchie.joint_2;
        const joint3 = this.experience.hierarchie.joint_3;
        const joint4 = this.experience.hierarchie.joint_4;
        const joint5 = this.experience.hierarchie.joint_5;
        const joint6 = this.experience.hierarchie.joint_6;
        this.ui = new dat.GUI({ autoPlace: false });
        const joint1Pos = this.ui.add(joint1.rotation, 'y').min(-3.14).max(3.14).step(0.01).name('Joint_1');
        const joint2Pos = this.ui.add(joint2.rotation, 'x', -35 * Math.PI / 180, 90 * Math.PI / 180).step(0.01).name('Joint_2');
        const joint3Pos = this.ui.add(joint3.rotation, 'x', -60 * Math.PI / 180, 90 * Math.PI / 180).step(0.01).name('Joint_3');
        const joint4Pos = this.ui.add(joint4.rotation, 'z', -3.14, 3.14).step(0.01).name('Joint_4');
        const joint5Pos = this.ui.add(joint5.rotation, 'x', -3.14, 3.14).step(0.01).name('Joint_5');
        const joint6Pos = this.ui.add(joint6.rotation, 'z', -3.14, 3.14).step(0.01).name('Joint_6');

		const values = [0, 0, 0, 0, 0, 0]

        const printValues = () => {
            console.log(values);
        }
		
		
		joint1Pos.onChange((value) => {
			printValues();
			values[0] = Number(-value.toFixed(2));
		});
		joint2Pos.onChange((value) => {
			printValues();
			values[1] = Number(-value.toFixed(2));
		});
		joint3Pos.onChange((value) => {
			printValues();
			values[2] = Number(-value.toFixed(2));
		});
		joint4Pos.onChange((value) => {
			printValues();
			values[3] = Number(-value.toFixed(2));
		});
        joint5Pos.onChange((value) => {
            printValues();
            values[4] = Number(-value.toFixed(2));
        });
        joint6Pos.onChange((value) => {
            printValues();
            values[5] = Number(-value.toFixed(2));
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