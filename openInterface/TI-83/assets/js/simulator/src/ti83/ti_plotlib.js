// TI-83 Premium CE - ti_plotlib module

var $builtinmodule = function (name) {

	const XPIXELS = 300;
	const YPIXELS = 150;

	var ti_plotlib = Object.create(null);

	ti_plotlib.__name__ = new Sk.builtin.str('ti_plotlib');

	Simulator.Mosaic.specific.ti.isScreenUsed = true;
	Simulator.Mosaic.specific.ti.replActive = false;

	const resetTIScreen = () => {
		Simulator.Mosaic.specific.ti.isWaiting = false;
		const buttons = ['var', 'entrer', 'annul'];
		for (let i = 0; i < buttons.length; i++) {
			const button = document.getElementById(`ti_${buttons[i]}-button`);
			button.disabled = false;
		}
	};

	const disableButtons = function (buttons) {
		for (let i = 0; i < buttons.length; i++) {
			const button = document.getElementById(`ti_${buttons[i]}-button`);
			button.disabled = true;
		}
	};

	resetTIScreen();

	const canvasOpacity = document.querySelector('.canvas-ti-graph');
	canvasOpacity.style.opacity = '0';

	const clearScreen = function (menus) {
		Simulator.Mosaic.specific.ti.shell = "";
		$("#ti_screen-value").html(Simulator.Mosaic.specific.ti.shell);
		Simulator.Mosaic.specific.ti.clearScreen(menus);
	};

	const getMultiples = function (scale, min = 0, max = 1, digits = 2) {
		let a = new Array();
		let f = Math.pow(10, digits);
		for (let t = Math.round(min * f); t <= Math.round(max * f); t++) {
			if (t % Math.round(scale * f) == 0) {
				a.push(t / f);
			}
		}
		return a;
	};

	const getGrid = function (scale, min, max, len) {
		let a = getMultiples(scale, min, max);
		a.forEach((val, ind) => a[ind] = (val - min) * len / (max - min));
		return a;
	};

	const pixel_Y = function (value) {
		return YPIXELS - Math.round((value - Simulator.Mosaic.specific.ti.graph.ymin) * YPIXELS / (Simulator.Mosaic.specific.ti.graph.ymax - Simulator.Mosaic.specific.ti.graph.ymin));
	};

	const pixel_X = function (value) {
		return (value - Simulator.Mosaic.specific.ti.graph.xmin) * XPIXELS / (Simulator.Mosaic.specific.ti.graph.xmax - Simulator.Mosaic.specific.ti.graph.xmin);
	};

	const writeText = function (text, x, y) {
		Simulator.Mosaic.specific.ti.ctx.font = '12px TICELarge';
		Simulator.Mosaic.specific.ti.ctx.fillText(text, x, y);
	};

	const drawLine = function (from_x, to_x, from_y, to_y) {
		Simulator.Mosaic.specific.ti.ctx.beginPath();
		Simulator.Mosaic.specific.ti.ctx.moveTo(from_x, from_y);
		Simulator.Mosaic.specific.ti.ctx.lineTo(to_x, to_y);
		Simulator.Mosaic.specific.ti.ctx.stroke();
	};

	const drawPlus = function (x, y) {
		drawLine(x - 3, x + 3, y, y);
		drawLine(x, x, y - 3, y + 3);
	};

	const drawCross = function (x, y) {
		drawLine(x - 3, x + 3, y - 3, y + 3);
		drawLine(x - 3, x + 3, y + 3, y - 3);
	};

	const drawCircle = function (x, y) {
		Simulator.Mosaic.specific.ti.ctx.beginPath();
		Simulator.Mosaic.specific.ti.ctx.arc(x, y, 2, 0, 2 * Math.PI, true);  // Cercle extérieur
		Simulator.Mosaic.specific.ti.ctx.fill();
	};

	const drawVector = function (xA, yA, xB, yB) {
		const arrowLength = 8;
		const arrowWidth = 6;
		const AB = Math.sqrt(Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2));
		xC = xB + arrowLength * (xA - xB) / AB;
		yC = yB + arrowLength * (yA - yB) / AB;
		xD = xC + arrowWidth * (-(yB - yA)) / AB;
		yD = yC + arrowWidth * ((xB - xA)) / AB;
		xE = xC - arrowWidth * (-(yB - yA)) / AB;
		yE = yC - arrowWidth * ((xB - xA)) / AB;
		drawLine(xA, xB, yA, yB);
		drawLine(xB, xD, yB, yD);
		drawLine(xB, xE, yB, yE);
	};

	const printLabels = function (xpos, x, xi, xj, y, yi, yj) {
		if (xpos === undefined) {
			writeText(x, xi, xj);
			writeText(y, yi, yj);
		} else {
			xj = Math.floor(xpos.v);
			if (xj >= 1 && xj < 13) {
				xj = 13 + (xj - 1) * YPIXELS / 12.5;
				writeText(x, xi, xj);
				writeText(y, yi, yj);
			} else {
				Simulator.Mosaic.specific.ti.showError("Ligne invalide pour écrire du texte.", "Invalid row.", 'tiplotlibException');
			}
		}
	};

	const plot = function (xlist, ylist, type, lined) {
		let x = xlist.map(i => i.v);
		let y = ylist.map(i => i.v);
		if (x.length === y.length) {
			if (x.includes(null)) {
				Simulator.Mosaic.specific.ti.showError("Le tableau x contient une valeur nulle.", "Argument must be an int or float.", 'tiplotlibException');
			} else if (y.includes(null)) {
				Simulator.Mosaic.specific.ti.showError("Le tableau y contient une valeur nulle.", "Argument must be an int or float.", 'tiplotlibException');
			} else {
				x.forEach((val, ind) => x[ind] = pixel_X(val));
				y.forEach((val, ind) => y[ind] = pixel_Y(val));
				for (let i = 0; i < x.length; i++) {
					if (type === '+') {
						drawPlus(x[i], y[i]);
					} else if (type === 'x') {
						drawCross(x[i], y[i]);
					} else if (type === "o") {
						drawCircle(x[i], y[i]);
					} else if (type != ".") {
						Simulator.Mosaic.specific.ti.showError("Marqueur invalide pour tracer les points.", "Invalid mark.", 'tiplotlibException');
						break;
					}
					if (lined) {
						if (i > 0) {
							drawLine(x[i - 1], x[i], y[i - 1], y[i]);
						}
					}
				}
			}
		} else {
			Simulator.Mosaic.specific.ti.showError("Les tableaux x et y ne font pas la même taille.", "Invalid x range.", 'tiplotlibException');
		}
	};

	const plotWithError = function (xlist, ylist, type, lined) {
		if (Sk.builtin.checkNumber(xlist)) {
			if (Sk.builtin.checkNumber(ylist)) {
				plot(Array(xlist), Array(ylist), type, false);
			} else {
				Simulator.Mosaic.specific.ti.showError("Les arguments doivent être 2 listes ou 2 nombres.", "Arguments must be 2 lists or 2 numbers.", 'tiplotlibException');
			}
		} else {
			if (xlist.v == null || ylist.v == null) {
				Simulator.Mosaic.specific.ti.showError("Les arguments doivent être 2 listes ou 2 nombres.", "Arguments must be 2 lists or 2 numbers.", 'tiplotlibException');
			} else {
				if (Sk.builtin.checkNumber(ylist)) {
					Simulator.Mosaic.specific.ti.showError("Les arguments doivent être 2 listes ou 2 nombres.", "Arguments must be 2 lists or 2 numbers.", 'tiplotlibException');
				} else {
					plot(xlist.v, ylist.v, type, lined);
				}
			}
		}
	};

	const writeTextAt = function (text, line, position) {
		if (line === undefined || text == undefined) {
			Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction text_at() ", "function takes 2 positional arguments but 1 were given.", 'TypeError');
		} else if (line === undefined && text == undefined) {
			Simulator.Mosaic.specific.ti.showError("Il manque 2 arguments à la fonction text_at() ", "function takes 2 positional arguments but 0 were given.", 'TypeError');
		} else {
			if (text == null) {
				Simulator.Mosaic.specific.ti.showError("La valeur du texte est à 'None'. Affichage impossible.", "Argument must be a string.");
			} else {
				let y_pos = Math.floor(line);
				if (y_pos >= 1 && y_pos < 13) {
					y_pos = 13 + (y_pos - 1) * YPIXELS / 12.5;
					let x_pos;
					if (position === undefined || position == "left") {
						x_pos = 2;
					} else if (position == "center") {
						x_pos = Math.round((XPIXELS - Simulator.Mosaic.specific.ti.ctx.measureText(text).width) / 2);
					} else if (position == "right") {
						x_pos = XPIXELS - Simulator.Mosaic.specific.ti.ctx.measureText(text).width - 1;
					} else {
						Simulator.Mosaic.specific.ti.showError("L'alignement du texte est invalide.", "Invalid text alignment.", 'tiplotlibException');
					}
					writeText(text, x_pos, y_pos);
				} else {
					Simulator.Mosaic.specific.ti.showError("Ligne invalide pour écrire du texte.", "Invalid row.", 'tiplotlibException');
				}
			}
		}
	};

	ti_plotlib.cls = new Sk.builtin.func(function () {
		clearScreen(true);
	});

	ti_plotlib.window = new Sk.builtin.func(function (xmin, xmax, ymin, ymax) {
		if (xmin.v > xmax.v) {
			Simulator.Mosaic.specific.ti.showError("Le minimum de l\'axe X est supérieur au maximum.", "Invalid x range.", 'tiplotlibException');
		} else if (ymin.v > ymax.v) {
			Simulator.Mosaic.specific.ti.showError("Le minimum de l\'axe Y est supérieur au maximum.", "Invalid x range.", 'tiplotlibException');
		} else {
			Simulator.Mosaic.specific.ti.graph.xmin = roundFloat(xmin.v);
			Simulator.Mosaic.specific.ti.graph.xmax = roundFloat(xmax.v);
			Simulator.Mosaic.specific.ti.graph.ymin = roundFloat(ymin.v);
			Simulator.Mosaic.specific.ti.graph.ymax = roundFloat(ymax.v);
		}
	});

	ti_plotlib.xmin = new Sk.builtin.func(function (xmin) {
		if (xmin === undefined && Simulator.Mosaic.specific.ti.graph.xmin !== undefined) {
			return new Sk.builtin.int_(Simulator.Mosaic.specific.ti.graph.xmin)
		}
		if (xmin.v > Simulator.Mosaic.specific.ti.graph.xmax) {
			Simulator.Mosaic.specific.ti.showError("Le minimum de l\'axe X est supérieur au maximum.", "Invalid x range.", 'tiplotlibException');
		} else {
			Simulator.Mosaic.specific.ti.graph.xmin = roundFloat(xmin.v);
		}
		return new Sk.builtin.int_(xmin.v)
	});

	ti_plotlib.xmax = new Sk.builtin.func(function (xmax) {
		if (xmax === undefined && Simulator.Mosaic.specific.ti.graph.xmax !== undefined) {
			return new Sk.builtin.int_(Simulator.Mosaic.specific.ti.graph.xmax)
		}
		if (xmax.v < Simulator.Mosaic.specific.ti.graph.xmin) {
			Simulator.Mosaic.specific.ti.showError("Le maximum de l\'axe X est inférieur au minimum.", "Invalid x range.", 'tiplotlibException');
		} else {
			Simulator.Mosaic.specific.ti.graph.xmax = roundFloat(xmax.v);
		}
		return new Sk.builtin.int_(xmax)
	});

	ti_plotlib.ymin = new Sk.builtin.func(function (ymin) {
		if (ymin === undefined && Simulator.Mosaic.specific.ti.graph.ymin !== undefined) {
			return new Sk.builtin.int_(Simulator.Mosaic.specific.ti.graph.ymin)
		}
		if (ymin.v > Simulator.Mosaic.specific.ti.graph.ymax) {
			Simulator.Mosaic.specific.ti.showError("Le minimum de l\'axe Y est supérieur au maximum.", "Invalid x range.", 'tiplotlibException');
		} else {
			Simulator.Mosaic.specific.ti.graph.ymin = roundFloat(ymin.v);
		}
		return new Sk.builtin.int_(ymin.v)
	});

	ti_plotlib.ymax = new Sk.builtin.func(function (ymax) {
		if (ymax === undefined && Simulator.Mosaic.specific.ti.graph.ymax !== undefined) {
			return new Sk.builtin.int_(Simulator.Mosaic.specific.ti.graph.ymax)
		}
		if (ymax.v < Simulator.Mosaic.specific.ti.graph.ymin) {
			Simulator.Mosaic.specific.ti.showError("Le maximum de l\'axe Y est inférieur au minimum.", "Invalid x range.", 'tiplotlibException');
		} else {
			Simulator.Mosaic.specific.ti.graph.ymax = roundFloat(ymax.v);
		}
		return new Sk.builtin.int_(ymax.v)
	});

	ti_plotlib.a = new Sk.builtin.func(function (self) {
		return new Sk.builtin.int_(self.a)
	});

	ti_plotlib.b = new Sk.builtin.func(function (self) {
		return new Sk.builtin.int_(self.b)
	});

	ti_plotlib.m = new Sk.builtin.func(function (self) {
		return new Sk.builtin.int_(self.m)
	});

	ti_plotlib.lin_reg = new Sk.builtin.func(function (xlist, ylist, position, line) {
		const x = xlist.v.map(i => i.v);
		const y = ylist.v.map(i => i.v);
		const n = x.length;
		const xsum = x.reduce((a, b) => a + b, 0);
		const ysum = y.reduce((a, b) => a + b, 0);
		const xysum = x.reduce((a, b, i) => a + b * y[i], 0);
		const x2sum = x.reduce((a, b) => a + b * b, 0);
		const a = (n * xysum - xsum * ysum) / (n * x2sum - xsum * xsum);
		const b = (x2sum * ysum - xsum * xysum) / (n * x2sum - xsum * xsum);
		const m = (xysum - xsum * ysum / n) / (x2sum - xsum * xsum / n);
		const edges = 1000
		drawLine(pixel_X(-edges), pixel_X(edges), pixel_Y(-edges * a + b), pixel_Y(edges * a + b), "red");
		self.a = a
		self.b = b
		self.m = m
		// Store the equation for recall_RegEQ
		Simulator.Mosaic.specific.ti.recall_RegEQ = `y=${a.toFixed(2)}x+${b.toFixed(2)}`
		// write the equation of the linear regression at a specific position and line on the TI screen
		writeTextAt(`y=${a.toFixed(2)}x+${b.toFixed(2)}`, line.v, position.v)
	});

	ti_plotlib.a = new Sk.builtin.func(function () {
		if (self.a !== undefined) {
			return new Sk.builtin.int_(self.a)
		}
	});

	ti_plotlib.b = new Sk.builtin.func(function () {
		if (self.b !== undefined) {
			return new Sk.builtin.int_(self.b)
		}
	});

	ti_plotlib.m = new Sk.builtin.func(function () {
		if (self.m !== undefined) {
			return new Sk.builtin.int_(self.m)
		}
	});

	ti_plotlib.auto_window = new Sk.builtin.func(function (xlist, ylist) {
		const x = xlist.v.map(i => i.v);
		const y = ylist.v.map(i => i.v);
		Simulator.Mosaic.specific.ti.graph.xmin = roundFloat(Math.min(...x));
		Simulator.Mosaic.specific.ti.graph.xmax = roundFloat(Math.max(...x));
		Simulator.Mosaic.specific.ti.graph.ymin = roundFloat(Math.min(...y));
		Simulator.Mosaic.specific.ti.graph.ymax = roundFloat(Math.max(...y));
	});

	ti_plotlib.show_plot = new Sk.builtin.func(function () {
		Simulator.Mosaic.specific.ti.isWaiting = true;
		canvasOpacity.style.opacity = '1';
		$('#ti_screen-menus').css('opacity', 0);
		disableButtons(['var', 'entrer']);
		setTimeout(() => {
			const replWrapper = document.querySelector('.repl-wrapper');
			if (replWrapper !== null) {
				Simulator.Mosaic.specific.ti.replActive = false;
				PythonREPL.toggleCaret();
				PythonREPL.clear();
			}
		}, 280);

		const poll = resolve => {
			if (Simulator.Mosaic.specific.ti.annulClicked === true) {
				Simulator.Mosaic.specific.ti.annulClicked = false;
				canvasOpacity.style.opacity = '0';
				resetTIScreen();
				clearScreen(true);
				resolve(9);
			} else {
				setTimeout(_ => poll(resolve), 5);
			}
		}
		return new Sk.misceval.promiseToSuspension(new Promise(poll).then(value => { return new Sk.builtin.int_(value) }));
	});

	ti_plotlib.grid = new Sk.builtin.func(function (xscl, yscl, type) {
		Simulator.Mosaic.specific.ti.ctx.save();
		Simulator.Mosaic.specific.ti.ctx.strokeStyle = 'rgb(100, 100, 100)';
		Simulator.Mosaic.specific.ti.ctx.lineWidth = 1;
		if (type === undefined || type.v == "dot") {
			Simulator.Mosaic.specific.ti.ctx.setLineDash([1, 1]);
		} else if (type.v == "solid") {
			Simulator.Mosaic.specific.ti.ctx.setLineDash([]);
		} else if (type.v == "dash") {
			Simulator.Mosaic.specific.ti.ctx.setLineDash([2.5, 1.5]);
		} else if (type.v == "point") {
			Simulator.Mosaic.specific.ti.ctx.setLineDash([1, 2]);
		} else {
			Simulator.Mosaic.specific.ti.showError("\'' + type.v + '\' Style du pinceau invalide.", "Invalid pen style.", 'tiplotlibException');
		}
		const x_grid = getGrid(xscl.v, Simulator.Mosaic.specific.ti.graph.xmin, Simulator.Mosaic.specific.ti.graph.xmax, XPIXELS);
		const y_grid = getGrid(yscl.v, Simulator.Mosaic.specific.ti.graph.ymin, Simulator.Mosaic.specific.ti.graph.ymax, YPIXELS);
		for (let i = 0; i < x_grid.length; i++) {
			drawLine(x_grid[i], x_grid[i], 0, YPIXELS);
		}
		for (let i = y_grid.length - 1; i > -1; i--) {
			drawLine(0, XPIXELS, y_grid[i], y_grid[i]);
		}
		Simulator.Mosaic.specific.ti.ctx.restore();
	});

	ti_plotlib.axes = new Sk.builtin.func(function (option) {
		if (Simulator.Mosaic.specific.ti.ctx.lineWidth == 1) Simulator.Mosaic.specific.ti.ctx.lineWidth = 2;
		let x_pos = pixel_X(0);
		let y_pos = pixel_Y(0);
		drawLine(x_pos, x_pos, 0, YPIXELS);
		drawLine(0, XPIXELS, y_pos, y_pos);
		y_pos = y_pos + 13;
		if (y_pos > YPIXELS - 2) y_pos = YPIXELS - 2;
		if (y_pos < 0) y_pos = 0;
		if (Simulator.Mosaic.specific.ti.graph.ymax < 0) y_pos = YPIXELS - 30;
		writeText(Simulator.Mosaic.specific.ti.graph.xmin, 0, y_pos);
		writeText(Simulator.Mosaic.specific.ti.graph.xmax, XPIXELS - Simulator.Mosaic.specific.ti.ctx.measureText(Simulator.Mosaic.specific.ti.graph.xmax).width - 1, y_pos);
		let ymax_y_pos = YPIXELS - 2
		if (x_pos < 0) x_pos = 0;
		if ((y_pos == YPIXELS - 2) && (x_pos == 0)) ymax_y_pos = YPIXELS - 17
		writeText(Simulator.Mosaic.specific.ti.graph.ymin, x_pos, ymax_y_pos);
		writeText(Simulator.Mosaic.specific.ti.graph.ymax, x_pos, 24);
	});

	ti_plotlib.labels = new Sk.builtin.func(function (xlabel, ylabel, xpos, ypos) {
		if (xlabel.v == null || ylabel.v == null) {
			Simulator.Mosaic.specific.ti.showError("La valeur du texte est à 'None'. Affichage impossible.", "Argument must be a string.", 'tiplotlibException');
		} else if (xlabel === undefined || ylabel == undefined) {
			Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction labels() ", "function takes 2 positional arguments but 1 were given.", 'TypeError');
		} else if (xlabel === undefined && ylabel == undefined) {
			Simulator.Mosaic.specific.ti.showError("Il manque 2 arguments à la fonction labels() ", "function takes 2 positional arguments but 0 were given.", 'TypeError');
		} else {
			const xlabel_xpos = XPIXELS - Simulator.Mosaic.specific.ti.ctx.measureText(xlabel.v).width - 1;
			const xlabel_ypos = 13 + YPIXELS / 12.5;
			const ylabel_xpos = 2;
			let ylabel_ypos = 13 + 11 * YPIXELS / 12.5;
			if (ypos === undefined) {
				printLabels(xpos, xlabel.v, xlabel_xpos, xlabel_ypos, ylabel.v, ylabel_xpos, ylabel_ypos);
			} else {
				ylabel_ypos = Math.floor(ypos.v);
				if (ylabel_ypos >= 1 && ylabel_ypos < 13) {
					ylabel_ypos = 13 + (ylabel_ypos - 1) * YPIXELS / 12.5;
					printLabels(xpos, xlabel.v, xlabel_xpos, xlabel_ypos, ylabel.v, ylabel_xpos, ylabel_ypos);
				} else {
					Simulator.Mosaic.specific.ti.showError("Ligne invalide pour écrire du texte.", "Invalid row.", 'tiplotlibException');
				}
			}
		}
	});

	ti_plotlib.title = new Sk.builtin.func(function (title) {
		if (title === undefined) {
			Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction title() ", "function takes 1 positional arguments but 0 were given.", 'TypeError');
		} else if (Sk.builtin.checkNone(title) || Sk.builtin.checkNumber(title)) {
			Simulator.Mosaic.specific.ti.showError("La fonction title() prend seulement une chaîne de caractère en argument. ", "Argument must be a string.", 'tiplotlibException');
		} else {
			setTimeout(function () {
				const x_pos = Math.round((XPIXELS - Simulator.Mosaic.specific.ti.ctx.measureText(title.v).width) / 2);
				writeText(title.v, x_pos, 10);
			}, 20);
		}
	});

	ti_plotlib.color = new Sk.builtin.func(function (r, g, b) {
		Simulator.Mosaic.specific.ti.ctx.strokeStyle = 'rgb(' + r.v + ', ' + g.v + ', ' + b.v + ')';
		Simulator.Mosaic.specific.ti.ctx.fillStyle = 'rgb(' + r.v + ', ' + g.v + ', ' + b.v + ')';
	});

	ti_plotlib.scatter = new Sk.builtin.func(function (xlist, ylist, type) {
		if (type === undefined) {
			plotWithError(xlist, ylist, "o", false);
		} else {
			plotWithError(xlist, ylist, type.v, false);
		}
	});

	ti_plotlib.plot = new Sk.builtin.func(function (xlist, ylist, type) {
		if (type === undefined) {
			plotWithError(xlist, ylist, "o", true);
		} else {
			plotWithError(xlist, ylist, type.v, true);
		}
	});

	ti_plotlib.line = new Sk.builtin.func(function (xA, yA, xB, yB, type) {
		const a_posX = pixel_X(xA.v);
		const a_posY = pixel_Y(yA.v);
		const b_posX = pixel_X(xB.v);
		const b_posY = pixel_Y(yB.v);
		if (type === undefined || type.v != "arrow") {
			drawLine(a_posX, b_posX, a_posY, b_posY);
		} else if (type.v == "arrow") {
			drawVector(a_posX, a_posY, b_posX, b_posY);
		} else {
			Simulator.Mosaic.specific.ti.showError("\'" + type.v + "\' Style de la ligne invalide.", "Invalid line size.", 'tiplotlibException');
		}
	});

	ti_plotlib.pen = new Sk.builtin.func(function (size, type) {
		if (size.v == "thin") {
			Simulator.Mosaic.specific.ti.ctx.lineWidth = 2;
		} else if (size.v == "medium") {
			Simulator.Mosaic.specific.ti.ctx.lineWidth = 3;
		} else if (size.v == "thick") {
			Simulator.Mosaic.specific.ti.ctx.lineWidth = 4;
		} else {
			Simulator.Mosaic.specific.ti.showError("\'" + size.v + "\' Taille du pinceau invalide.", "Invalid pen size.", 'tiplotlibException');
		}
		if (type.v == "solid") {
			Simulator.Mosaic.specific.ti.ctx.setLineDash([]);
		} else if (type.v == "dot") {
			Simulator.Mosaic.specific.ti.ctx.setLineDash([Simulator.Mosaic.specific.ti.ctx.lineWidth, Simulator.Mosaic.specific.ti.ctx.lineWidth]);
		} else if (type.v == "dash") {
			Simulator.Mosaic.specific.ti.ctx.setLineDash([2.5 * Simulator.Mosaic.specific.ti.ctx.lineWidth, 1.5 * Simulator.Mosaic.specific.ti.ctx.lineWidth]);
		} else {
			Simulator.Mosaic.specific.ti.showError("\'" + type.v + "\' Style du pinceau invalide.", "Invalid pen style.", 'tiplotlibException');
		}
	});

	ti_plotlib.text_at = new Sk.builtin.func(function (line, text, position) {
		writeTextAt(text.v, line.v, position.v);
	});

	return ti_plotlib;
};