// ti_draw library for the TI-83 simulator

var $builtinmodule = function (name) {

    const XPIXELS = 300;
    const YPIXELS = 150;
    self.CANVASX = 319;
    self.CANVASY = 209;
    self.penColor = "black";
    self.fillColor = "black";
    self.CANVASXSET = 319;
    self.CANVASYSET = 209;

    var ti_draw = Object.create(null);
    ti_draw.__name__ = new Sk.builtin.str('ti_draw');

    Simulator.Mosaic.specific.ti.isScreenUsed = true;
    const canvasOpacity = document.querySelector('.canvas-ti-graph');
    canvasOpacity.style.opacity = '0';

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

    const pixel_Y = function (value) {
        return ((value) * YPIXELS / (self.CANVASY)).toFixed(0);
    };
    const pixel_X = function (value) {
        return ((value) * XPIXELS / (self.CANVASX)).toFixed(0);
    };

    const setPenColor = function (color) {
        self.penColor = color;
        self.fillColor = color;
    };

    const drawLine = function (from_x, to_x, from_y, to_y) {
        Simulator.Mosaic.specific.ti.ctx.beginPath();
        Simulator.Mosaic.specific.ti.ctx.moveTo(from_x, from_y);
        Simulator.Mosaic.specific.ti.ctx.lineTo(to_x, to_y);
        Simulator.Mosaic.specific.ti.ctx.strokeStyle = self.penColor;
        Simulator.Mosaic.specific.ti.ctx.stroke();
    };

    const drawCircle = function (x, y, radius) {
        Simulator.Mosaic.specific.ti.ctx.beginPath();
        //scale to avoid streching
        Simulator.Mosaic.specific.ti.ctx.scale(1, 3 / 4);
        Simulator.Mosaic.specific.ti.ctx.arc(x, y * 4 / 3, radius, 0, 2 * Math.PI);
        Simulator.Mosaic.specific.ti.ctx.strokeStyle = self.penColor;
        Simulator.Mosaic.specific.ti.ctx.stroke();
        //reset scale to avoid streching
        Simulator.Mosaic.specific.ti.ctx.scale(1, 1 * 4 / 3);
    }

    const drawPoly = function (listX, listY) {
        const ctx = Simulator.Mosaic.specific.ti.ctx;
        ctx.beginPath();
        ctx.moveTo(pixel_X(listX.v[0].v), pixel_Y(listY.v[0].v));
        for (let i = 1; i < listX.v.length; i++) {
            ctx.lineTo(pixel_X(listX.v[i].v), pixel_Y(listY.v[i].v));
        }
        ctx.closePath();
        ctx.strokeStyle = self.penColor;
        ctx.stroke();
    }

    const plotXY = function (x, y, shape) {
        const ctx = Simulator.Mosaic.specific.ti.ctx;
        ctx.beginPath();
        switch (String(shape)) {
            case "1":
                drawCircle(x, y, 2);
                ctx.fillStyle = self.fillColor ? self.fillColor : "black";
                ctx.fill();
                break;
            case "2":
                drawCircle(x, y, 2);
                ctx.strokeStyle = self.penColor ? self.penColor : "black";
                ctx.stroke();
                break;
            case "3":
                ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
                ctx.fillStyle = self.fillColor ? self.fillColor : "black";
                ctx.fill();
                break;
            case "4":
                ctx.rect(x - 1.5, y - 1.5, 3, 3);
                ctx.strokeStyle = self.penColor ? self.penColor : "black";
                ctx.stroke();
                break;
            case "5":
                ctx.moveTo(x, y);
                ctx.font = "11px TICELarge";
                ctx.fillStyle = self.penColor ? self.penColor : "black";
                ctx.fillText("x", x, y + 2.5);
                break;
            case "6":
                ctx.moveTo(x, y);
                ctx.font = "11px TICELarge";
                ctx.fillStyle = self.penColor ? self.penColor : "black";
                ctx.fillText("+", x, y + 4);
                break;
            case "7":
                ctx.moveTo(x, y);
                ctx.font = "8px TICELarge";
                ctx.fillStyle = self.penColor ? self.penColor : "black";
                ctx.fillText("•", x, y + 2);
                break;
            case "8":
                ctx.moveTo(x, y);
                drawCircle(x, y, 4);
                ctx.fillStyle = self.fillColor ? self.fillColor : "black";
                ctx.fill();
                break;
            case "9":
                ctx.moveTo(x, y);
                drawCircle(x, y, 4);
                ctx.strokeStyle = self.penColor ? self.penColor : "black";
                ctx.stroke();
                break;
            case "10":
                ctx.moveTo(x, y);
                drawCircle(x, y, 6);
                ctx.fillStyle = self.fillColor ? self.fillColor : "black";
                ctx.fill();
                break;
            case "11":
                ctx.moveTo(x, y);
                drawCircle(x, y, 6);
                ctx.strokeStyle = self.penColor ? self.penColor : "black";
                ctx.stroke();
                break;
            case "12":
                ctx.moveTo(x, y);
                drawCircle(x, y, 8);
                ctx.fillStyle = self.fillColor ? self.fillColor : "black";
                ctx.fill();
                break;
            case "13":
                ctx.moveTo(x, y);
                drawCircle(x, y, 8);
                ctx.strokeStyle = self.penColor ? self.penColor : "black";
                ctx.stroke();
                break;
        }
    };

    ti_draw.set_color = new Sk.builtin.func(function (r, g, b) {
        const red = r.v;
        const green = g.v;
        const blue = b.v;
        const color = `rgb(${red}, ${green}, ${blue})`;
        setPenColor(color);
    });

    ti_draw.set_pen = new Sk.builtin.func(function (size, style) {
        const ctx = Simulator.Mosaic.specific.ti.ctx;
        switch (size?.v) {
            case 'thin':
                self.penSize = 1;
                break;
            case 'medium':
                self.penSize = 2;
                break;
            case 'thick':
                self.penSize = 3;
                break;
            default:
                self.penSize = 1;
        }
        switch (style?.v) {
            case 'solid':
                self.penStyle = [];
                break;
            case 'dashed':
                self.penStyle = [3, 3];
                break;
            case 'dotted':
                self.penStyle = [1, 2];
                break;
            default:
                self.penStyle = [];
        }
        ctx.lineWidth = self.penSize;
        ctx.setLineDash(self.penStyle);
    })

    ti_draw.fill_rect = new Sk.builtin.func(function (x1, y1, X, Y) {
        Simulator.Mosaic.specific.ti.ctx.beginPath();
        Simulator.Mosaic.specific.ti.ctx.fillStyle = self.fillColor ? self.fillColor : "black";
        Simulator.Mosaic.specific.ti.ctx.fillRect(pixel_X(x1.v), pixel_Y(y1.v), pixel_X(X.v), pixel_Y(Y.v));
    });

    ti_draw.draw_rect = new Sk.builtin.func(function (x1, y1, X, Y) {
        Simulator.Mosaic.specific.ti.ctx.beginPath();
        Simulator.Mosaic.specific.ti.ctx.rect(pixel_X(x1.v), pixel_Y(y1.v), pixel_X(X.v), pixel_Y(Y.v));
        Simulator.Mosaic.specific.ti.ctx.strokeStyle = self.penColor;
        Simulator.Mosaic.specific.ti.ctx.stroke();
    });

    ti_draw.draw_line = new Sk.builtin.func(function (x1, y1, x2, y2) {
        drawLine(pixel_X(x1.v), pixel_X(x2.v), pixel_Y(y1.v), pixel_Y(y2.v));
    });

    ti_draw.draw_circle = new Sk.builtin.func(function (x, y, radius) {
        drawCircle(pixel_X(x.v), pixel_Y(y.v), radius.v);
        Simulator.Mosaic.specific.ti.ctx.strokeStyle = self.penColor;
    });

    ti_draw.fill_circle = new Sk.builtin.func(function (x, y, radius) {
        drawCircle(pixel_X(x.v), pixel_Y(y.v), radius.v);
        Simulator.Mosaic.specific.ti.ctx.fillStyle = self.fillColor ? self.fillColor : "black";
        Simulator.Mosaic.specific.ti.ctx.fill();
    })

    ti_draw.draw_text = new Sk.builtin.func(function (x, y, text) {
        Simulator.Mosaic.specific.ti.ctx.font = "11px TICELarge";
        Simulator.Mosaic.specific.ti.ctx.fillStyle = self.penColor;
        Simulator.Mosaic.specific.ti.ctx.fillText(text.v, pixel_X(x.v), pixel_Y(y.v));
    });

    ti_draw.draw_poly = new Sk.builtin.func(function (listX, listY) {
        drawPoly(listX, listY);
        Simulator.Mosaic.specific.ti.ctx.strokeStyle = self.penColor;
        Simulator.Mosaic.specific.ti.ctx.stroke();
    });

    ti_draw.fill_poly = new Sk.builtin.func(function (listX, listY) {
        drawPoly(listX, listY);
        Simulator.Mosaic.specific.ti.ctx.fillStyle = self.fillColor ? self.fillColor : "black";
        Simulator.Mosaic.specific.ti.ctx.fill();
    });

    ti_draw.plot_xy = new Sk.builtin.func(function (x, y, shape) {
        plotXY(pixel_X(x.v), pixel_Y(y.v), shape.v);
    });

    ti_draw.set_window = new Sk.builtin.func(function (width, height) {
        const canvas = document.querySelector('.canvas-ti-graph');
        const ctx = canvas.getContext('2d');
        ctx.restore();
        ctx.save();
        self.CANVASXSET = width.v;
        self.CANVASYSET = height.v;
        const centreX = pixel_X(CANVASX / 2);
        const centreY = pixel_Y(CANVASY / 2);
        const startSquareX = centreX - pixel_X(width.v) / 2;
        const startSquareY = centreY - pixel_Y(height.v) / 2;
        ctx.beginPath();
        ctx.rect(startSquareX, startSquareY, pixel_X(width.v), pixel_Y(height.v));
        ctx.clip();
    });

    ti_draw.get_screen_dim = new Sk.builtin.func(function () {
        return new Sk.builtin.str(`${self.CANVASXSET}, ${self.CANVASYSET}`);
    });

    ti_draw.show_draw = new Sk.builtin.func(function (flag='False') {
        if (flag && flag.v === 1){
            canvasOpacity.style.opacity = 1;
            return new Sk.builtin.none();
        } else {
            canvasOpacity.style.opacity = 1;
            disableButtons(['var', 'entrer']);
            const poll = resolve => {
                if (Simulator.Mosaic.specific.ti.annulClicked === true) {
                    Simulator.Mosaic.specific.ti.annulClicked = false;
                    canvasOpacity.style.opacity = 0;
                    resetTIScreen();
                    resolve();
                } else {
                    Simulator.Mosaic.specific.ti.isWaiting = true;
                    setTimeout(_ => poll(resolve), 5);
                }
            }
            return new Sk.misceval.promiseToSuspension(new Promise(poll));
        }
    });
    return ti_draw;
}
