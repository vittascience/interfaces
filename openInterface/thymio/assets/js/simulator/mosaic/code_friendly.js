Simulator.CodeFriendly.getAdaptedCode = function (code) {
	code = Simulator.CodeFriendly.thymio(code);
	code = Simulator.CodeFriendly.thymio_motors(code);
	code = Simulator.CodeFriendly.thymio_events(code);
	code = Simulator.CodeFriendly.thymio_colors(code);
	return code;
};

// handle asynchronous onevent block for thymio 
Simulator.CodeFriendly.thymio_events = function (code) {
	
	const retrieveEvent = (code) => {
		

		let codeSplited = code.split('\n');
		const varElement = [];
		
		// not needed anymore, the global variables are added in the @onevent block generator (to keep just in case)
		// add variables to the list
		// for (let i = 0; i < codeSplited.length; i++) {
		// 	if (codeSplited[i].split('')[0] !== ' ' && /[a-zA-Z0-9_]*=[a-zA-Z0-9_]*/i.test(codeSplited[i]) && !/def/i.test(codeSplited[i])) {
		// 		let subStrings = codeSplited[i].split(' ');
		// 		if (!(/^( |if|elif|else|while)$/).test(subStrings[0])) {
		// 			varElement.push(codeSplited[i].split('=')[0].trim());
		// 		}
		// 	}
		// }

		// add global variables to the @onevent block
		for (let i=0; i< codeSplited.length; i++){
			if (codeSplited[i].match(/@onevent/g)) {
				if (varElement.length > 0){
					codeSplited[i+1] = codeSplited[i+1] + '\n' + '  global ' + varElement.join(', ');
				}
			}
		}
		return codeSplited.join('\n') + '\n';
	}
	
	if (code.match(/@onevent/g)) {
		const newCode = retrieveEvent(code);
		return newCode;
	} else {
		return code;
	}
};

Simulator.CodeFriendly.thymio = function (code) {
	code = code.replace(/def prox\(/g, 'def prox_event(');
	code = code.replace(/def motor\(/g, 'def motor_event(');
	code = code.replace(/def acc\(/g, 'def acc_event(');
	code = code.replace(/(?<!def )button_(center|forward|left|right|backward)/gi, 'button.$1()');
	code = code.replace(/(?<!_|def\s*)temperature/g, 'temperature_sensor()');
	code = code.replace(/nf_leds_(top|bottom_right|bottom_left|circle|buttons|temperature|sound|rc)\s*\((.*)\)/g, 'leds.$1($2)');
	code = code.replace(/nf_leds_(prox_h|prox_v|)\s*\((.*)\)/g, 'leds.$1([$2])\n');
	code = code.replace(/prox_horizontal\[([0-9]+)\]\s*(>|=|<)+\s*([0-9]+)/g, 'prox.horizontal($1, "$2", $3)');
	code = code.replace(/prox_horizontal\[([0-9]+)\]/g, 'prox.horizontal($1, "", 0)');
	code = code.replace(/prox_ground_delta\[([0-9]+)\]\s*(>|=|<)+\s*([0-9]+)/g, 'prox.ground_delta($1, "$2", $3)');
	code = code.replace(/timer_period\[([0-9]+)\]\s*[>|=|<]+\s*([0-9]+)/g, 'timer_period($1, $2)');
	code = code.replace(/acc\[(.*)\]/g, 'acc_sensor($1)');
	code = code.replace(/rc5_(command|adress)/g, 'rc5_$1()');
	code = code.replace(/mic_threshold\s*=\s*(.*)/g, 'mic_threshold($1)');
	code = code.replace(/mic_intensity/g, 'mic_intensity(20)');
	code = code.replace(/nf_math_(sub|mul|cos|sin|rand|sqrt|div|add|min|max|copy)\((\w+)(,[^\)]+)?\)/g, '$2 = nf_math.$1($2$3)');
	return code;
};

Simulator.CodeFriendly.thymio_motors = function (code) {
	code = code.replace(/motor_left_target\s*=\s*(.*)\n/g, 'motor.left($1)\n');
	code = code.replace(/motor_right_target\s*=\s*(.*)\n/g, 'motor.right($1)\n');
	code = code.replace(/motor_(left_speed|right_speed)/g, 'motor.$1()');
	return code;
};

Simulator.CodeFriendly.thymio_colors = function (code) {
	code = code.replace(/(BLACK|GREEN|BLUE|CYAN|MAGENTA|RED|WHITE|YELLOW)/g, 'set_thymio_color("$1")');
	return code;
};
