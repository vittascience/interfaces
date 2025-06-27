// TI-83 Premium CE - turtle module

var $builtinmodule = function (name) {

    const XPIXELS = 300;
    const YPIXELS = 150;
    const TURTLE_DOT_SCALE = 0.95;

    var turtle = Object.create(null);

    Simulator.Mosaic.specific.ti.isScreenUsed = true;
    
    const canvasOpacity = document.querySelector('.canvas-ti-turtle');
    canvasOpacity.style.opacity = '1';

    turtle.__name__ = new Sk.builtin.str('turtle');
    turtle.savedCanvas = null;

    turtle.turtleCanvas = document.createElement('canvas');
    turtle.turtleCtx = turtle.turtleCanvas.getContext('2d');

    turtle.turtleDrawCanvas = document.createElement('canvas')
    turtle.turtleDrawCtx = turtle.turtleDrawCanvas.getContext('2d');


    const updateCanvas = function () {
        Simulator.Mosaic.specific.ti.clearTurtleScreen(false);
        Simulator.Mosaic.specific.ti.ctxTurtle.drawImage(turtle.turtleDrawCanvas, 0, 0, XPIXELS, YPIXELS);
        Simulator.Mosaic.specific.ti.ctxTurtle.drawImage(turtle.turtleCanvas, 0, 0, XPIXELS, YPIXELS);
    };

    const pixel_Y = function (value) {
        return YPIXELS - Math.round((value - Simulator.Mosaic.specific.ti.graph.ymin) * YPIXELS / (Simulator.Mosaic.specific.ti.graph.ymax - Simulator.Mosaic.specific.ti.graph.ymin));
    };

    const pixel_X = function (value) {
        return (value - Simulator.Mosaic.specific.ti.graph.xmin) * XPIXELS / (Simulator.Mosaic.specific.ti.graph.xmax - Simulator.Mosaic.specific.ti.graph.xmin);
    };

    const cleanTurtleCanvas = function () {
        turtle.turtleCtx.clearRect(0, 0, XPIXELS, YPIXELS);
    };

    const drawGrid = function () {
        Simulator.Mosaic.specific.ti.shell = "";
        $("#ti_screen-value").html(Simulator.Mosaic.specific.ti.shell);
        $('#ti_screen-turtle-grid').css('opacity', 1);
    };

    const drawTurtle = async function (self) {
        cleanTurtleCanvas();
        updateCanvas();
        await sleep_ms(100 / self.speed);
        const X = -14;
        const Y = 4;
        turtle.turtleCtx.beginPath();
        turtle.turtleCtx.moveTo(pixel_X(self.pos.x), pixel_Y(self.pos.y));
        const h = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2));
        const A = {
            x: Math.round(h * Math.cos(degToRad(self.angle) - Math.atan(Y / X))),
            y: Math.round(h * Math.sin(degToRad(self.angle) - Math.atan(Y / X)))
        };
        const B = {
            x: Math.round(h * Math.cos(degToRad(self.angle) + Math.atan(Y / X))),
            y: Math.round(h * Math.sin(degToRad(self.angle) + Math.atan(Y / X)))
        };
        turtle.turtleCtx.lineTo(pixel_X(self.pos.x - A.x), pixel_Y(self.pos.y + A.y));
        turtle.turtleCtx.lineTo(pixel_X(self.pos.x - B.x), pixel_Y(self.pos.y + B.y));
        turtle.turtleCtx.closePath();
        // the outline
        turtle.turtleCtx.lineWidth = 1;
        turtle.turtleCtx.strokeStyle = '#000';
        turtle.turtleCtx.stroke();
        // the fill color
        turtle.turtleCtx.fillStyle = "#FFCC00";
        turtle.turtleCtx.fill();
        updateCanvas();
    };

    const drawLine = function (self, from_x, to_x, from_y, to_y) {
        if (!self.pathering) {
            turtle.turtleDrawCtx.moveTo(from_x, from_y);
        } else if (!self.startingPath) {
            turtle.turtleDrawCtx.moveTo(from_x, from_y);
            self.startingPath = true;
        }
        turtle.turtleDrawCtx.lineTo(to_x, to_y);
        turtle.turtleDrawCtx.stroke();
    };
    
    const drawLineTurtle = function (self, from_x, to_x, from_y, to_y) {
        drawLine(self, pixel_X(from_x), pixel_X(to_x), pixel_Y(from_y), pixel_Y(to_y));
    };

    const drawDisk = function (x, y, radius) {
        turtle.turtleDrawCtx.save();
        turtle.turtleDrawCtx.scale(1, 0.75);
        turtle.turtleDrawCtx.beginPath();
        turtle.turtleDrawCtx.arc(x, y + 25, radius, 0, 2 * Math.PI);
        turtle.turtleDrawCtx.fill();
        turtle.turtleDrawCtx.restore();
    };

    const writeText = function (text, x, y) {
        turtle.turtleDrawCtx.font = 'bolder 15px Courier New';
        turtle.turtleDrawCtx.fillText(text, x, y);
    };

    const map = function (value, from_min, from_max, to_min, to_max) {
        return (value - from_min) * (to_max - to_min) / (from_max - from_min) + to_min;
    };

    turtle.Turtle = new Sk.misceval.buildClass(turtle, function ($gbl, $loc) {

        Turtle__init__ = function (self) {
            Simulator.Mosaic.specific.ti.graph = {
                xmin: -155,
                xmax: 155,
                ymin: -105,
                ymax: 105
            };
            self.pos = {
                x: 0,
                y: 0
            };
            self.speed = 1;
            self.angle = 0;
            self.turtleDisplayed = true;
            self.penActivated = true;
            turtle.turtleDrawCtx.lineWidth = 1;
            self.pathering = false;
            self.startingPath = false;
            drawGrid();
            turtle.turtleDrawCtx.moveTo(pixel_X(self.pos.x), pixel_Y(self.pos.y));
            turtle.turtleDrawCtx.strokeStyle = 'rgb(0,0,0)';
            turtle.turtleDrawCtx.fillStyle = 'rgb(0,0,0)';
            return Sk.builtin.none();
        };

        $loc.__init__ = new Sk.builtin.func(Turtle__init__);

        const moveDistance = async function (self, distance) {
            Simulator.Mosaic.specific.ti.turtleMoving = true;
            let move = 0;
            while (distance !== 0) {
                if (distance > 19) {
                    distance -= 19;
                    move = 19;
                } else if (distance < -19) {
                    distance += 19;
                    move = -19;
                } else {
                    move = distance;
                    distance = 0;
                }
                const newPos = {
                    x: self.pos.x + move * Math.cos(degToRad(self.angle)),
                    y: self.pos.y - move * Math.sin(degToRad(self.angle))
                }
                if (self.penActivated) {
                    drawLineTurtle(self, self.pos.x, newPos.x, self.pos.y, newPos.y);
                }
                await sleep_ms(100 / self.speed);
                self.pos = newPos;
                if (self.turtleDisplayed) {
                    await drawTurtle(self);
                }
                updateCanvas();
            }
            Simulator.Mosaic.specific.ti.turtleMoving = false;
        };

        const moveToPosition = async function (self, pos) {
            Simulator.Mosaic.specific.ti.turtleMoving = true;
            if (self.penActivated) {
                drawLineTurtle(self, self.pos.x, pos.x, self.pos.y, pos.y);
            }
            await sleep_ms(100);
            self.pos = pos;
            if (self.turtleDisplayed) {
                await drawTurtle(self);
            }
            Simulator.Mosaic.specific.ti.turtleMoving = false;
        };

        // Turtle - Move

        $loc.forward = new Sk.builtin.func(function (self, distance) {
            if (distance !== undefined) {
                if (distance.v > 0) {
                    moveDistance(self, distance.v);
                }
            } else {
                Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction forward() ", "function takes 2 positional arguments but 1 were given.", 'TypeError');
            }
        });

        $loc.backward = new Sk.builtin.func(function (self, distance) {
            if (distance !== undefined) {
                if (distance.v > 0) {
                    moveDistance(self, -distance.v);
                }
            } else {
                Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction forward() ", "function takes 2 positional arguments but 1 were given.", 'TypeError');
            }
        });

        $loc.right = new Sk.builtin.func(function (self, angle) {
            if (angle !== undefined) {
                self.angle += angle.v;
                if (self.angle >= 360) {
                    self.angle -= 360;
                }
                if (self.turtleDisplayed) {
                    drawTurtle(self);
                }
            } else {
                Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction right() ", "function takes 2 positional arguments but 1 were given.", 'TypeError');
            }
        });

        $loc.left = new Sk.builtin.func(function (self, angle) {
            if (angle !== undefined) {
                self.angle -= angle.v;
                if (self.angle <= -360) {
                    self.angle += 360;
                }
                if (self.turtleDisplayed) {
                    drawTurtle(self);
                }
            } else {
                Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction left() ", "function takes 2 positional arguments but 1 were given.", 'TypeError');
            }
        });

        $loc.gotoPos = new Sk.builtin.func(function (self, x, y) {
            if (x !== undefined) {
                if (y !== undefined) {
                    moveToPosition(self, { x: x.v, y: y.v });
                } else {
                    Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction goto() ", "unsupported types for __sub__: 'int', 'NoneType", 'TypeError');
                }
            } else {
                Simulator.Mosaic.specific.ti.showError("Il manque 2 arguments à la fonction goto() ", "function takes 2 positional arguments but 1 were given.", 'TypeError');
            }
        });

        $loc.done = new Sk.builtin.func(function (self) {
            Simulator.pause();
        });

        // Turtle - Draw

        $loc.fillcolor = new Sk.builtin.func(function (self, r, g, b) {
            turtle.turtleDrawCtx.fillStyle = 'rgb(' + r.v + "," + g.v + "," + b.v + ")";
        });

        $loc.begin_fill = new Sk.builtin.func(function (self) {
            turtle.turtleDrawCtx.beginPath();
            self.pathering = true;
        });

        $loc.end_fill = new Sk.builtin.func(function (self) {
            turtle.turtleDrawCtx.closePath();
            turtle.turtleDrawCtx.fill();
            self.pathering = false;
            self.startingPath = false;
            updateCanvas();
        });

        $loc.write = new Sk.builtin.func(function (self, text) {
            if (text !== undefined) {
                turtle.turtleDrawCtx.save();
                turtle.turtleDrawCtx.fillStyle = turtle.turtleDrawCtx.strokeStyle;
                writeText(text.v, pixel_X(self.pos.x), pixel_Y(self.pos.y));
                turtle.turtleDrawCtx.restore();
            } else {
                Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction speed() ", "function takes 2 positional arguments but 1 were given.", 'TypeError');
            }
        });

        // Turtle - Pen

        $loc.penup = new Sk.builtin.func(function (self) {
            turtle.turtleDrawCtx.closePath();
            self.penActivated = false;
        });

        $loc.pendown = new Sk.builtin.func(function (self) {
            turtle.turtleDrawCtx.beginPath();
            self.penActivated = true;
        });

        $loc.pencolor = new Sk.builtin.func(function (self, r, g, b) {
            turtle.turtleDrawCtx.closePath();
            turtle.turtleDrawCtx.beginPath();
            self.penColorValue = 'rgb(' + r.v + "," + g.v + "," + b.v + ")";
            turtle.turtleDrawCtx.strokeStyle = 'rgb(' + r.v + "," + g.v + "," + b.v + ")";
        });

        $loc.dot = new Sk.builtin.func(function (self, diameter) {
            // if penColorValue is defined then use it, else use the default black color
            if (diameter !== undefined) {
                drawDisk(pixel_X(self.pos.x), pixel_Y(self.pos.y), TURTLE_DOT_SCALE * diameter.v / 2);
                turtle.turtleDrawCtx.fillStyle = self.penColorValue;
                turtle.turtleDrawCtx.fill();
                updateCanvas();
            } else {
                Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction dot() ", "function takes 2 positional arguments but 1 were given.", 'TypeError');
            }
        });


        $loc.pensize = new Sk.builtin.func(function (self, size) {
            if (size !== undefined) {
                turtle.turtleDrawCtx.lineWidth = size.v;
            } else {
                Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction pensize() ", "function takes 2 positional arguments but 1 were given.", 'TypeError');
            }
        });

        // Turtle - Settings

        $loc.clear = new Sk.builtin.func(function (self) {
            turtle.turtleDrawCtx.clearRect(0, 0, XPIXELS, YPIXELS);
            updateCanvas();
        });

        $loc.hideturtle = new Sk.builtin.func(function (self) {
            self.turtleDisplayed = false;
        });

        $loc.showturtle = new Sk.builtin.func(function (self) {
            self.turtleDisplayed = true;
        });
        

        $loc.show = new Sk.builtin.func(function (self) {
            Simulator.Mosaic.specific.ti.isWaiting = true;
            self.turtleDisplayed = true;
            // Simulator.pause();
        });

        $loc.hidegrid = new Sk.builtin.func(function (self) {
            Simulator.Mosaic.specific.ti.shell = "";
            $("#ti_screen-value").html(Simulator.Mosaic.specific.ti.shell);
            Simulator.Mosaic.specific.ti.clearScreen(false);
            $('#ti_screen-turtle-grid').css('opacity', 0);
        });

        $loc.speed = new Sk.builtin.func(function (self, speed) {
            if (speed !== undefined) {
                self.speed = map(speed.v, 0, 10, 1, 10);
            } else {
                Simulator.Mosaic.specific.ti.showError("Il manque 1 argument à la fonction speed() ", "function takes 2 positional arguments but 1 were given.", 'TypeError');
            }
        });

        // Turtle - State

        $loc.home = new Sk.builtin.func(function (self) {
            self.pos = {
                x: 0,
                y: 0
            };
        });

        $loc.setheading = new Sk.builtin.func(function (self, degree) {
            self.angle = -degree.v;
            if (self.turtleDisplayed) {
                drawTurtle(self);
            }
        });

        $loc.xcor = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(self.pos.x);
        });

        $loc.ycor = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(self.pos.y);
        });

        $loc.pos = new Sk.builtin.func(function (self) {
            return new Sk.builtin.tuple([self.pos.x, self.pos.y]);
        });

        $loc.heading = new Sk.builtin.func(function (self) {
            return new Sk.builtin.int_(self.angle);
        });

    }, "Turtle", []);

    return turtle;
};