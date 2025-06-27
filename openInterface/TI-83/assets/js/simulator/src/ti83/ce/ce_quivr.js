// TI-83 Premium CE - ce_quivr module

var $builtinmodule = function (name) {
	
	const XPIXELS = 300;
	const YPIXELS = 150;
    const colors = {
        'r': 'red',
        'g': 'lime',
        'b': 'blue',
        'c': 'cyan',
        'm': 'fuchsia',
        'y': 'yellow',
        'blk': 'black'
    };

	var mod = Object.create(null);

	mod.__name__ = new Sk.builtin.str('ce_chart');

    mod.type = 'line';

    const pixel_Y = function (value) {
		return YPIXELS-Math.round((value-Simulator.Mosaic.specific.ti.graph.ymin)*YPIXELS/(Simulator.Mosaic.specific.ti.graph.ymax-Simulator.Mosaic.specific.ti.graph.ymin));
	};
	const pixel_X = function (value) {
		return (value-Simulator.Mosaic.specific.ti.graph.xmin)*XPIXELS/(Simulator.Mosaic.specific.ti.graph.xmax-Simulator.Mosaic.specific.ti.graph.xmin);
	};

	const drawLine = function (from_x, to_x, from_y, to_y) {
		Simulator.Mosaic.specific.ti.ctx.beginPath();
		Simulator.Mosaic.specific.ti.ctx.moveTo(from_x, from_y);
		Simulator.Mosaic.specific.ti.ctx.lineTo(to_x, to_y);
		Simulator.Mosaic.specific.ti.ctx.stroke();
	};

    const drawGraphLine = function (from_x, to_x, from_y, to_y) {
        drawLine(pixel_X(from_x), pixel_X(to_x), pixel_Y(from_y), pixel_Y(to_y));
    };

    const drawCircle = function (x, y) {
		Simulator.Mosaic.specific.ti.ctx.beginPath();
		Simulator.Mosaic.specific.ti.ctx.arc(x, y, 2, 0, 2*Math.PI, true);  // Cercle extérieur
		Simulator.Mosaic.specific.ti.ctx.fill();
	};

	const drawVector = function (xA, yA, xB, yB) { 
        Simulator.Mosaic.specific.ti.ctx.lineWidth = 1;
		const arrowLength = 8; 
		const arrowWidth = 6; 
		const AB = Math.sqrt(Math.pow(xB-xA, 2) + Math.pow(yB-yA, 2)); 
		xC = xB + arrowLength*(xA-xB)/AB;
		yC = yB + arrowLength*(yA-yB)/AB; 
		xD = xC + arrowWidth*(-(yB-yA))/AB;
		yD = yC + arrowWidth*((xB-xA))/AB; 
		xE = xC - arrowWidth*(-(yB-yA))/AB;
		yE = yC - arrowWidth*((xB-xA))/AB;
		drawLine(xA, xB, yA, yB);
		drawLine(xB, xD, yB, yD);
		drawLine(xB, xE, yB, yE);
	};

    const drawGraphVector = function (xA, yA, xB, yB) {
        drawVector(pixel_X(xA), pixel_Y(yA), pixel_X(xB), pixel_Y(yB));
    };

    mod.quiver = new Sk.builtin.func(function (x, y, dx, dy, param, colour, type) {
        if (type !== undefined) {
            mod.type = type.v;
        }
        Simulator.Mosaic.specific.ti.ctx.strokeStyle = colors[colour.v];
        if (mod.type == 'vector') {
            drawCircle(pixel_X(x.v), pixel_Y(y.v));
            drawGraphVector(x.v, y.v, x.v + dx.v*param.v, y.v + dy.v*param.v);
        } else if (mod.type == 'line') {
            drawGraphLine(x.v, dx.v*param.v, y.v, dy.v*param.v);   
        }
    });

    return mod;
};