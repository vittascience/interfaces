Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3" type="image/svg+xml"></object>`;

Simulator.Mosaic.pin_regex = /([0-9]{1,2})/;

Simulator.Mosaic.getPinDef = (pin, mod) => {
	const pins = Blockly.Constants.Pins[mod.pins];
	const pinName = pins.find((p) => p[1] == pin);
	return {
		name: pinName ? pinName[0] : null,
		id: pin.replace('pin', ''),
	};
};

Simulator.Mosaic.externalLibraries = {
	'src/lib/niryo_robot_python_ros_wrapper.js': Simulator.PATH_LIB + 'niryo.js',
	'src/lib/rospy.js': Simulator.PATH_LIB + 'rospy.js',
};

Simulator.Mosaic.addSpecificInitializations = async function () { };

Simulator.Mosaic.addSpecificSkulptFunctions = function () { };

Simulator.Mosaic.groveRegex = {};

Simulator.Mosaic.specific = {
	
	createSliders: function () { 
		console.log("Creating sliders for Niryo robot");
		$('#irSensor_slider').slider({
			min: 0,
			max: 1,
			step: 1,
			value: 1,
		})
		$('#conveyor_slider').slider({
			min: -100,
			max: 100,
			step: 1,
			value: 0,
		});
	},

	calculs: {},

	definitions: [
		{
			regex: /niryo_robot\.digital_read\(/g,
            id: "irSensor",
			title: "Capteur infrarouge",
            pin: 'Niryo',
            type: 'input',
            listeners: [{
                default: "ON",
                unit: '',
                color: "#f9d142",
                suffix: ""
            }],
            class: "button",
            picture: "Bouton.png",
            pictureAnimation: "Bouton-animation.png",
            pictureInteraction: "buttonPush",
            animate: function (Animator) {
                Animator.button();

            }
        },
		{
			regex: /niryo_robot\.control_conveyor\(/g,
			id: "conveyor",
			title: "Conveyor",
			pin: 'Niryo',
			type: 'input',
			listeners: [{
				default: 0,
				unit: '%',
				color: "#f9d142",
				suffix: ""
			}],
			picture: "niryo_conveyor.png",
			pictureAnimation: "niryo_conveyor_animation.png",
			animate: function (Animator) {
				const conveyorValue = document.getElementById("conveyor_value");
				if (conveyorValue) {
					conveyorValue.innerText = Animator.value;
				}
				const el = document.getElementById("conveyor_anim");
				if (!el) return;

				const value = parseFloat(Animator.value);

				if (isNaN(value) || Math.abs(value) < 1) {
					el.style.animation = "none";
					el.style.backgroundPositionX = "0%";
					return;
				}
				const baseDuration = 1;
				const duration = baseDuration / (Math.abs(value) / 100);

				const direction = value > 0 ? "normal" : "reverse";

				el.style.animation = `scrollConveyor ${duration}s linear infinite ${direction}`;
			

			}
		},
	],
};
