// TI-83 Premium CE - ce_box module

var $builtinmodule = function (name) {
	
	const XPIXELS = 300;
	const YPIXELS = 150;

	var mod = Object.create(null);

	mod.__name__ = new Sk.builtin.str('ce_box');

    const writeText = function (text, x, y) {
		Simulator.Mosaic.specific.ti.ctx.font = 'bolder 13.5px Courier New';
		Simulator.Mosaic.specific.ti.ctx.fillText(text, x, y);
	};

	const drawLine = function (from_x, to_x, from_y, to_y) {
		Simulator.Mosaic.specific.ti.ctx.beginPath();
		Simulator.Mosaic.specific.ti.ctx.moveTo(from_x, from_y);
		Simulator.Mosaic.specific.ti.ctx.lineTo(to_x, to_y);
		Simulator.Mosaic.specific.ti.ctx.stroke();
	};

    const drawLineX = function (self, from_x, to_x, from_y, to_y) {
        drawLine(pixel_X(self, from_x), pixel_X(self, to_x), from_y, to_y);
    };

    const pixel_X = function (self, value) {
		return (value-self.xmin)*XPIXELS/(self.xmax-self.xmin);
	};

    const color = function (r, g, b) {
        Simulator.Mosaic.specific.ti.ctx.strokeStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
		Simulator.Mosaic.specific.ti.ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    };

    const withThis = (obj, cb) => cb(obj);
    const sort = array => array.sort((a, b) => a - b);
    const fractile = (array, parts, nth) => withThis(
        (nth * (array.length + 1) / parts),
        decimal => withThis(
            Math.floor(decimal),
            even => withThis(
                sort(array),
                sorted => sorted[even - 1] + ((decimal - even) * (sorted[even] - sorted[even - 1]))
            )
        )
    );

    const getIQR = function (arr) {
        const Q1 = fractile(arr, 4, 1)
        const Q3 = fractile(arr, 4, 3)
        return {
            q1: Q1, 
            median: fractile(arr, 4, 2), 
            q3: Q3, 
            irq: Q3-Q1
        };
    };

    mod.box = new Sk.misceval.buildClass(mod, function ($gbl, $loc) {

		var js__init__ = function (self, data) {
            self.title = null;
            self.irq = null;
            self.xmin = 0;
            self.xmax = 0;
            self.arr = new Array();
			if (data !== undefined) {
                self.arr = data.v.map(i => i.v);
                self.irq = getIQR(self.arr);
			} else {
				throw new Sk.builtin.ValueError("function missing 1 required positional arguments");
			}
            return Sk.builtin.none();
		};

		$loc.__init__ = new Sk.builtin.func(js__init__);

		$loc.title = new Sk.builtin.func(function (self, title) {
            if (title === undefined) {
                Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction title() ", "function takes 1 positional arguments but 0 were given.", 'TypeError');
            } else if (Sk.builtin.checkNone(title) || Sk.builtin.checkNumber(title)) {
                Simulator.Mosaic.specific.ti.showError("La fonction title() prend seulement une chaîne de caractère en argument. ", "Argument must be a string.", 'tiplotlibException');
            } else {
                setTimeout(function () {
                    const x_pos = Math.round((XPIXELS-Simulator.Mosaic.specific.ti.ctx.measureText(title.v).width)/2);
                    self.title = {title: title.v, x_pos: x_pos};
                }, 20);
            }
		});

        $loc.show = new Sk.builtin.func(function (self) {
            Simulator.Mosaic.specific.ti.shell = "";
            $("#ti_screen-value").html(Simulator.Mosaic.specific.ti.shell);
            $('#ti_screen-turtle-grid').css('opacity', 0);
            Simulator.Mosaic.specific.ti.clearScreen(false);
            if (self.irq !== null) {
                color(60, 210, 60);
                writeText("Q1 = " + self.irq.q1.toFixed(3), 8, 105);
                color(255, 0, 0);
                writeText("médiane = " + self.irq.median.toFixed(3), 8, 118);
                color(0, 0, 255);
                writeText("Q3 = " + self.irq.q3.toFixed(3), 8, 131);
                color(10, 10, 10);
                writeText("écart interquartile = " + self.irq.irq.toFixed(3), 8, 144);
                const offset = 0.15*(Math.max(...self.arr)-Math.min(...self.arr))
                self.xmin = roundFloat(Math.min(...self.arr)-offset, 1);
                self.xmax = roundFloat(Math.max(...self.arr)+offset, 1);
                writeText(self.xmin, 2, YPIXELS/2 + 12);
                writeText(self.xmax, XPIXELS-Simulator.Mosaic.specific.ti.ctx.measureText(self.xmax).width-1, YPIXELS/2 + 12);
                
                // Draw the lines
                const y = {
                    up: 15,
                    down: YPIXELS/2-15,
                    mid: YPIXELS/4,
                    center: YPIXELS/2
                };
                Simulator.Mosaic.specific.ti.ctx.strokeStyle = 'rgb(0, 0, 0)';
                Simulator.Mosaic.specific.ti.ctx.lineWidth = 1;
                // Draw center x axis
                drawLineX(self, self.xmin, self.xmax, y.center, y.center);
                // Draw left & right line
                drawLineX(self, Math.min(...self.arr), self.irq.q1, y.mid, y.mid);
                drawLineX(self, self.irq.q3, Math.max(...self.arr), y.mid, y.mid);
                // Draw up & down line
                drawLineX(self, self.irq.q1, self.irq.q3, y.up, y.up);
                drawLineX(self, self.irq.q1, self.irq.q3, y.down, y.down);
                // Draw vertical dash on box
                drawLineX(self, Math.min(...self.arr), Math.min(...self.arr), y.mid-5, y.mid+5);
                drawLineX(self, Math.max(...self.arr), Math.max(...self.arr), y.mid-5, y.mid+5);
                // Draw vertical dash on axis
                drawLineX(self, self.irq.q1, self.irq.q1, y.center-3, y.center+3);
                drawLineX(self, self.irq.median, self.irq.median, y.center-3, y.center+3);
                drawLineX(self, self.irq.q3, self.irq.q3, y.center-3, y.center+3);
                // Draw vertical IRQ values colored lines
                color(60, 210, 60);
                drawLineX(self, self.irq.q1, self.irq.q1, y.down, y.up);
                color(255, 0, 0);
                drawLineX(self, self.irq.median, self.irq.median, y.down, y.up);
                color(0, 0, 255);
                drawLineX(self, self.irq.q3, self.irq.q3, y.down, y.up);
                color(0, 0, 0);
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
                self.irq = null;
                self.xmin = 0;
                self.xmax = 0;
            }
            Simulator.pause();
		});

	}, "box");

    return mod;
};