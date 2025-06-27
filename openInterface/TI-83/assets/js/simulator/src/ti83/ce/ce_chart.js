// TI-83 Premium CE - ce_chart module

var $builtinmodule = function (name) {
	
	const XPIXELS = 300;
	const YPIXELS = 150;
    const colors = ['red', 'lime', 'blue', 'yellow', 'cyan', 'fuchsia', 'lightSalmon', 'black', 'darkGray'];

	var mod = Object.create(null);

	mod.__name__ = new Sk.builtin.str('ce_chart');

    const writeText = function (text, x, y) {
		Simulator.Mosaic.specific.ti.ctx.font = 'bolder 13.5px Courier New, monospace';
		Simulator.Mosaic.specific.ti.ctx.fillText(text, x, y);
	};

	const drawLine = function (from_x, to_x, from_y, to_y) {
		Simulator.Mosaic.specific.ti.ctx.beginPath();
		Simulator.Mosaic.specific.ti.ctx.moveTo(from_x, from_y);
		Simulator.Mosaic.specific.ti.ctx.lineTo(to_x, to_y);
		Simulator.Mosaic.specific.ti.ctx.stroke();
	};

    const drawRect = function (x, y, width, height, color_index) {
        Simulator.Mosaic.specific.ti.ctx.fillStyle = colors[color_index];
        Simulator.Mosaic.specific.ti.ctx.fillRect(x, y, width, height);
	};

    const color = function (r, g, b) {
        Simulator.Mosaic.specific.ti.ctx.strokeStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
		Simulator.Mosaic.specific.ti.ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    };

    const getArray = function (array) {
        const dta = array.v.map(i => i.v).map(i => [i[0].v, i[1].v]);
        let arr = Object.create(null);
        for (var i = 0; i<dta.length; i++) {
            arr[dta[i][0]] = dta[i][1];
        }
        return arr;
    };

    mod.chart = new Sk.misceval.buildClass(mod, function ($gbl, $loc) {

		chart__init__ = function (self, array) {
            self.title = null;
            self.ymin = 0;
            self.ymax = 0
            self.arr = null;
            self.decimals = null;
            if (array !== undefined) {
                if (Sk.builtin.checkIterable(array)) {
                    self.arr = getArray(array);
                } else {
                    // print error
                }
            }
            return Sk.builtin.none();
		};

		$loc.__init__ = new Sk.builtin.func(chart__init__);

        $loc.data = new Sk.builtin.func(function (self, array) {
			if (array !== undefined) {
                if (Sk.builtin.checkIterable(array)) {
                    self.arr = getArray(array);
                } else {
                    //print error
                }
			} else {
				throw new Sk.builtin.ValueError("function missing 1 required positional arguments");
			}
        });

		$loc.title = new Sk.builtin.func(function (self, title) {
            if (title === undefined) {
                Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction title() ", "function takes 1 positional arguments but 0 were given.", 'TypeError');
            } else if (Sk.builtin.checkNone(title) || Sk.builtin.checkNumber(title)) {
                Simulator.Mosaic.specific.ti.showError("La fonction title() prend seulement une chaîne de caractère en argument. ", "Argument must be a string.", 'cechartException');
            } else {
                setTimeout(function () {
                    const x_pos = Math.round((XPIXELS-Simulator.Mosaic.specific.ti.ctx.measureText(title.v).width)/2);
                    self.title = {title: title.v, x_pos: x_pos};
                }, 20);
            }
		});

        $loc.frequencies = new Sk.builtin.func(function (self, freq) {
            if (freq === undefined) {
                Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction frequencies() ", "function takes 1 positional arguments but 0 were given.", 'TypeError');
            } else if (!Sk.builtin.checkNumber(freq)) {
                Simulator.Mosaic.specific.ti.showError("La fonction frequencies() prend seulement un nombre en argument. ", "Argument must be a number.", 'cechartException');
            } else {
                self.decimals = freq.v;
            }
		});

        $loc.show = new Sk.builtin.func(function (self) {
            Simulator.Mosaic.specific.ti.shell = "";
            $("#ti_screen-value").html(Simulator.Mosaic.specific.ti.shell);
            $('#ti_screen-turtle-grid').css('opacity', 0);
            Simulator.Mosaic.specific.ti.clearScreen(false);
            const max = Math.max(...Object.values(self.arr));
            const width = Math.round((XPIXELS-40)/Object.entries(self.arr).length);
            let j = 0;
            let color_index = 0;
            for (var i in self.arr) {
                const x = 20+j*width;
                const height = self.arr[i]*(YPIXELS-40)/max;
                const x_label = x + width/2;
                if (self.arr[i] < 0) {
                    drawRect(x, YPIXELS-15, width, 15, color_index);
                    color(0, 0, 0);
                    if (self.decimals !== null) {
                        const value = roundFloat(self.arr[i], self.decimals);
                        writeText(value, x_label - Simulator.Mosaic.specific.ti.ctx.measureText(String(value)).width/2, 20);
                    }
                } else {
                    const y = YPIXELS - 15 - height;
                    drawRect(x, y, width, height, color_index);
                    color(0, 0, 0);
                    if (self.decimals !== null) {
                        const value = roundFloat(self.arr[i], self.decimals);
                        writeText(value, x_label - Simulator.Mosaic.specific.ti.ctx.measureText(String(value)).width/2, y - 3);
                    }
                }
                writeText(i, x_label - Simulator.Mosaic.specific.ti.ctx.measureText(i).width/2, YPIXELS - 3);
                j++;
                if (color_index == 8) color_index = -1;
                color_index ++;
            }
            color(0, 0, 0);
            Simulator.Mosaic.specific.ti.ctx.lineWidth = 2;
            drawLine(0, XPIXELS, 135, 135);
            if (self.title !== null) {
                writeText(self.title.title, self.title.x_pos, 10);
                self.title = null;
            } else {
                setTimeout(function () {
                    writeText(self.title.title, self.title.x_pos, 10);
                    self.title = null;
                }, 20);
            }
            self.arr = new Array();
            self.ymin = 0;
            self.ymax = 0;
            Simulator.pause();
		});

	}, "chart");

    return mod;
};