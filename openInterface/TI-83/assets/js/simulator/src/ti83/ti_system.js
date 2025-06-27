// TI-83 Premium CE - ti_system module

var $builtinmodule = function (name) {

	const XPIXELS = 300;
	const YPIXELS = 155;
	const dispAtText = {};
	let storedListObject = {};

	Simulator.Mosaic.specific.ti.isScreenUsed = true;
	Simulator.Mosaic.specific.ti.recall_RegEQ = null;

	const writeText = function (text, x, y) {
		Simulator.Mosaic.specific.ti.ctx.font = '13.1px TICELarge';
		Simulator.Mosaic.specific.ti.ctx.textBaseline = 'bottom';
		Simulator.Mosaic.specific.ti.ctx.fillStyle = '#000000';
		Simulator.Mosaic.specific.ti.ctx.fillText(text, x, y);
	};

	const parsedText = (text, position, line) => {
		if (position.v == "left") {
			const textValue = text.v + "°".repeat(32 - text.v.length);
			return dispAtText[line] = textValue.split('');
		} else if (position.v == "center") {
			const textValue = "°".repeat(Math.round((32 - text.v.length) / 2)) + text.v + "°".repeat(Math.round((32 - text.v.length) / 2));
			return dispAtText[line] = textValue.split('');
		} else if (position.v == "right") {
			const textValue = "°".repeat(32 - text.v.length) + text.v;
			return dispAtText[line] = textValue.split('');
		}
	};

	const parsedTiScreenText = () => {
		const tiScreen = document.getElementById("ti_screen-value");
		const tiScreenText = tiScreen.innerHTML.replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').split('<br>');
		const newTiScreenText = [];

		for (let i = 0; i < tiScreenText.length; i++) {
			let line = tiScreenText[i].split('');
			if (dispAtText[i + 1] !== undefined) {
				for (let j = 0; j < line.length; j++) {
					if (dispAtText[i + 1][j] !== "°") {
						line[j] = '&nbsp;';
					}
				}
			}
			newTiScreenText.push(line.join(''));
		}
		tiScreen.innerHTML = newTiScreenText.join('<br>');
	};

	var ti_system = {};

	ti_system.__name__ = new Sk.builtin.str('ti_system');

	ti_system.recall_list = new Sk.builtin.func(function (name) {
		const list = storedListObject
		return new Sk.builtin.list(list[name]);
	});

	ti_system.store_list = new Sk.builtin.func(function (name, list) {
		const listToAdd = list.v.map((item) => item.v);
		const newList = { ...storedListObject, [name]: listToAdd }
		storedListObject = { ...newList }
	});

	ti_system.recall_RegEQ = new Sk.builtin.func(function () {
		if (Simulator.Mosaic.specific.ti.recall_RegEQ !== null) {
			return new Sk.builtin.str(Simulator.Mosaic.specific.ti.recall_RegEQ);
		}
	});

	ti_system.escape = new Sk.builtin.func(function () {
		Simulator.Mosaic.specific.ti.isWaiting = true;
		$('#ti_var-button').css('opacity', 0.6);
		$('#ti_entrer-button').css('opacity', 0.6);
		if (Simulator.Mosaic.specific.ti.annulClicked) {
			Simulator.Mosaic.specific.ti.annulClicked = false;
			Simulator.Mosaic.specific.ti.isWaiting = false;
			$('#ti_var-button').css('opacity', 1);
			$('#ti_entrer-button').css('opacity', 1);
			return new Sk.builtin.bool(true);
		}
		return new Sk.builtin.bool(false);
	});

	ti_system.disp_at = new Sk.builtin.func(function (line, text, position) {
		//suppress first line displacement in canvas for disp_at function (need to find why it's happening)
		writeText("", 2, -100);
		if (line === undefined || text == undefined) {
			Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction text_at() ", "function takes 2 positional arguments but 1 were given.", 'TypeError');
		} else if (line === undefined && text == undefined) {
			Simulator.Mosaic.specific.ti.showError("Il manque 2 arguments à la fonction text_at() ", "function takes 2 positional arguments but 0 were given.", 'TypeError');
		} else {
			if (text.v == null) {
				Simulator.Mosaic.specific.ti.showError("La valeur du texte est à 'None'. Affichage impossible.", "Argument must be a string.");
			} else {
				let y_pos = line.v;
				if (y_pos >= 1 && y_pos < 13) {
					y_pos = 13 + (y_pos - 1) * YPIXELS / 12.5;
					let x_pos;
					if (position === undefined || position.v == "left") {
						x_pos = 2;
					} else if (position.v == "center") {
						x_pos = Math.round((XPIXELS - Simulator.Mosaic.specific.ti.ctx.measureText(text.v).width) / 2);
					} else if (position.v == "right") {
						x_pos = XPIXELS - Simulator.Mosaic.specific.ti.ctx.measureText(text.v).width - 1;
					} else {
						Simulator.Mosaic.specific.ti.showError("L'alignement du texte est invalide.", "Invalid text alignment.", 'tiplotlibException');
					}
					parsedText(text, position, line);
					parsedTiScreenText();
					writeText(text.v, x_pos, y_pos);
				} else {
					Simulator.Mosaic.specific.ti.showError("Ligne invalide pour écrire du texte.", "Invalid row.", 'tiplotlibException');
				}
			}
		}
	});

	ti_system.disp_clr = new Sk.builtin.func(function () {
		Simulator.Mosaic.specific.ti.shell = "";
		$("#ti_screen-value").html(Simulator.Mosaic.specific.ti.shell);
		Simulator.Mosaic.specific.ti.clearScreen(true);
	});

	ti_system.disp_wait = new Sk.builtin.func(function () {
		$('#ti_var-button').css('opacity', 0.6);
		$('#ti_entrer-button').css('opacity', 0.6);
		const poll = resolve => {
			if (Simulator.Mosaic.specific.ti.annulClicked === true) {
				Simulator.Mosaic.specific.ti.annulClicked = false;
				Simulator.Mosaic.specific.ti.isWaiting = false;
				Simulator.Mosaic.specific.ti.ctx.clearRect(0, 0, 320, 175);
				const tiScreen = document.getElementById("ti_screen-value");
				tiScreen.innerHTML = "";
				$('#ti_var-button').css('opacity', 1);
				$('#ti_entrer-button').css('opacity', 1);
				resolve();
			} else {
				Simulator.Mosaic.specific.ti.isWaiting = true;
				setTimeout(_ => poll(resolve), 5);
			}
		}
		return new Sk.misceval.promiseToSuspension(new Promise(poll));
	});

	ti_system.disp_cursor = new Sk.builtin.func(function () {
		throw new Sk.builtin.NotImplementedError("ti_system.disp_cursor() is not yet implemented");
	});

	ti_system.sleep = new Sk.builtin.func(function (delay) {
		if (delay !== undefined) {
			if (Sk.builtin.checkNumber(delay)) {
				return Simulator.sleep_ms(Sk.ffi.remapToJs(delay) * 1000);
			} else if (Sk.builtin.checkString(delay)) {
				Simulator.Mosaic.specific.ti.showError("Type invalide dans la fonction sleep()", "can't convert 'int' object to str implicity", 'TypeError');
			}
		} else {
			Simulator.Mosaic.specific.ti.showError("Il manque l'argument 'duration' à la fonction sleep() ", "function takes 1 positional arguments but 0 were given.", 'TypeError');
		}
	});

	ti_system.wait_key = new Sk.builtin.func(function () {
		Simulator.Mosaic.specific.ti.isWaiting = true;
		Simulator.Mosaic.specific.ti.waitKey = true;
		const poll = resolve => {
			if (Simulator.Mosaic.specific.ti.enterClicked === true) {
				Simulator.Mosaic.specific.ti.isWaiting = false;
				Simulator.Mosaic.specific.ti.waitKey = false;
				Simulator.Mosaic.specific.ti.enterClicked = false;
				resolve(5);
			} else if (Simulator.Mosaic.specific.ti.annulClicked === true) {
				Simulator.Mosaic.specific.ti.isWaiting = false;
				Simulator.Mosaic.specific.ti.waitKey = false;
				Simulator.Mosaic.specific.ti.annulClicked = false;
				resolve(9);
			} else if (Simulator.Mosaic.specific.ti.varButtonClicked) {
				Simulator.Mosaic.specific.ti.isWaiting = false;
				Simulator.Mosaic.specific.ti.waitKey = false;
				Simulator.Mosaic.specific.ti.varButtonClicked = false;
				resolve(53);

			} else {
				setTimeout(_ => poll(resolve), 5);
			}
		}
		return new Sk.misceval.promiseToSuspension(new Promise(poll).then(value => { return (new Sk.builtin.int_(value)) }));
	});

	return ti_system;
};
