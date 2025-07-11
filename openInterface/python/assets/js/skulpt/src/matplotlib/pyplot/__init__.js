/* eslint-disable */
(function () {
    var out$ = typeof exports != 'undefined' && exports || this;

    var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

    function isExternal(url) {
        return url && url.lastIndexOf('http', 0) == 0 && url.lastIndexOf(window.location.host) == -1;
    }

    function inlineImages(el, callback) {
        var images = el.querySelectorAll('image');
        var left = images.length;
        if (left == 0) {
            callback();
        }
        for (var i = 0; i < images.length; i++) {
            (function (image) {
                var href = image.getAttribute('xlink:href');
                if (href) {
                    if (isExternal(href.value)) {
                        console.warn("Cannot render embedded images linking to external hosts: " + href.value);
                        return;
                    }
                }
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var img = new Image();
                href = href || image.getAttribute('href');
                img.src = href;
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    image.setAttribute('xlink:href', canvas.toDataURL('image/png'));
                    left--;
                    if (left == 0) {
                        callback();
                    }
                };
                img.onerror = function () {
                    console.log("Could not load " + href);
                    left--;
                    if (left == 0) {
                        callback();
                    }
                };
            })(images[i]);
        }
    }

    function styles(el, selectorRemap) {
        var css = "";
        var sheets = document.styleSheets;
        for (var i = 0; i < sheets.length; i++) {
            if (isExternal(sheets[i].href)) {
                console.warn("Cannot include styles from other hosts: " + sheets[i].href);
                continue;
            }
            var rules = sheets[i].cssRules;
            if (rules != null) {
                for (var j = 0; j < rules.length; j++) {
                    var rule = rules[j];
                    if (typeof (rule.style) != "undefined") {
                        var match = null;
                        try {
                            match = el.querySelector(rule.selectorText);
                        } catch (err) {
                            console.warn('Invalid CSS selector "' + rule.selectorText + '"', err);
                        }
                        if (match) {
                            var selector = selectorRemap ? selectorRemap(rule.selectorText) : rule.selectorText;
                            css += selector + " { " + rule.style.cssText + " }\n";
                        } else if (rule.cssText.match(/^@font-face/)) {
                            css += rule.cssText + '\n';
                        }
                    }
                }
            }
        }
        return css;
    }

    out$.svgAsDataUri = function (el, options, cb) {
        options = options || {};
        options.scale = options.scale || 1;
        var xmlns = "http://www.w3.org/2000/xmlns/";

        inlineImages(el, function () {
            var outer = document.createElement("div");
            var clone = el.cloneNode(true);
            var width, height;
            if (el.tagName == 'svg') {
                var box = el.getBoundingClientRect();
                width = box.width;
                height = box.height;
            } else {
                var box = el.getBBox();
                width = box.x + box.width;
                height = box.y + box.height;
                clone.setAttribute('transform', clone.getAttribute('transform').replace(/translate\(.*?\)/, ''));

                var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.appendChild(clone);
                clone = svg;
            }

            clone.setAttribute("version", "1.1");
            clone.setAttributeNS(xmlns, "xmlns", "http://www.w3.org/2000/svg");
            clone.setAttributeNS(xmlns, "xmlns:xlink", "http://www.w3.org/1999/xlink");
            clone.setAttribute("width", width * options.scale);
            clone.setAttribute("height", height * options.scale);
            clone.setAttribute("viewBox", "0 0 " + width + " " + height);
            outer.appendChild(clone);

            var css = styles(el, options.selectorRemap);
            var s = document.createElement('style');
            s.setAttribute('type', 'text/css');
            s.innerHTML = "<![CDATA[\n" + css + "\n]]>";
            var defs = document.createElement('defs');
            defs.appendChild(s);
            clone.insertBefore(defs, clone.firstChild);

            var svg = doctype + outer.innerHTML;
            var uri = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg)));
            if (cb) {
                cb(uri);
            }
        });
    };

    out$.saveSvgAsPng = function (el, name, options) {
        options = options || {};
        out$.svgAsDataUri(el, options, function (uri) {
            var image = new Image();
            image.src = uri;
            image.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                var context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);

                var a = document.createElement('a');
                a.download = name;
                a.href = canvas.toDataURL('image/png');
                document.body.appendChild(a);
                a.addEventListener("click", function (e) {
                    a.parentNode.removeChild(a);
                });
                a.click();
            };
        });
    };
})();


/**
  Made by Michael Ebert for skulpt, see this modules at https://github.com/waywaaard/skulpt
 
  matplotlib.pyplot inspired by https://github.com/rameshvs/jsplotlib, though heavily modified.
 
  jsplotlib for supporting plot commands and kwargs for the matplotlib skulpt module
  Supports:
    - kwargs
    - all color specs
    - color cycle
    - rc params
    - ., o, x, s markers
    - resize function for markers
    - -, --, .- line styles
    - various Line2D attributes
    - auto scaling for axes
**/
var jsplotlib = {
    // empty object creation
};

jsplotlib.rc = {
    "lines.linewidth": 1.0,
    "lines.linestyle": "-",
    "lines.color": "blue",
    "lines.marker": "None",
    "lines.markeredgewidth": 0.5,
    "lines.markersize": 5,
    "lines.dash_joinstyle": "miter",
    "lines.dash_capstyle": "butt",
    "lines.solid_jointyle": "miter",
    "lines.solid_capstyle": "projecting",
    "lines.antialiased": true,
    "patch.linewidth": 1.0,
    "patch.facecolor": "blue",
    "patch.edgecolor": "black",
    "patch.antialiased": true,
    "text.color": "black",
    "axes.hold": true, // whether to clear the axes by default on
    "axes.facecolor": "white", // axes background color
    "axes.edgecolor": "black", // axes edge color
    "axes.grid": false,
    "axes.titlesize": "large",
    "axes.labelsize": "medium",
    "axes.labelweigth": "normal",
    "axes.labelcolor": "black",
    "axes.axisbelow": false,
    "axes.color_cycle": ["b", "g", "r", "c", "m", "y", "k"]
};

var chart_counter = 0; // for creating unique ids

var get_chart_id = function () {
    return "pplotchart" + chart_counter;
};

var get_clipping_id = function () {
    return "clipping-" + get_chart_id();
};

/** Line2D class for encapsulating all line relevant attributes and methods
    Rebuilds partial matplotlib.Line2D functionality. Does not inherit from
    abstract Artist class. Rather more a data representation.
 **/

jsplotlib.Line2D = function (xdata, ydata, linewidth, linestyle, color, marker,
    markersize, markeredgewidth, markeredgecolor, markerfacecolor,
    markerfacecoloralt, fillstyle, antialiased, dash_capstyle,
    solid_capstyle, dash_joinstyle, solid_joinstyle, pickradius,
    drawstyle, markevery, kwargs) {

    var that = {};
    that._x = xdata;
    that._y = ydata;
    that._linewidth = linewidth || null;
    that._linestyle = linestyle || null;
    that._color = color || null;
    that._marker = marker || null;
    that._markersize = markersize || null;
    that._markeredgewidth = markeredgewidth || null;
    that._markeredgecolor = markeredgecolor || null;
    that._markerfacecolor = markerfacecolor || null;
    that._markerfacecoloralt = markerfacecoloralt || 'none';
    that._fillstyle = fillstyle || 'full';
    that._antialiased = antialiased || null;
    that._dash_capstyle = dash_capstyle || null;
    that._solid_capstyle = solid_capstyle || null;
    that._dash_joinstyle = dash_joinstyle || null;
    that._solid_joinstyle = solid_joinstyle || null;
    that._pickradius = pickradius || 5;
    that._drawstyle = drawstyle || null;
    that._markevery = markevery || null;
    that._alpha = 1.0;
    that._graphtype = null;
    that._barwidth = 0.8;
    that._histbins = 10;
    that._normed = false;
    that._text = null;
    that._fontsize = 10;
    that._label = null;

    //kwargs

    // if only y provided, create Array from 1 to N
    if (!that._x || that._x.length === 0) {
        that._x = jsplotlib.linspace(0, that._y.length - 1, that._y.length);
    }

    that.antialiased = function (a) {
        if (a)
            this._antialiased = a;
        return this;
    };

    that.markerfacecoloralt = function (mfca) {
        if (mfca)
            this._markerfacecoloralt = mfca;
        return this;
    };

    that.pickradius = function (pr) {
        if (pr)
            this._pickradius = pr;
        return this;
    };

    that.drawstyle = function (ds) {
        if (ds)
            this._drawstyle = ds;
        return this;
    };

    that.markevery = function (me) {
        if (me)
            this._markevery = me;
        return this;
    };

    that.color = function (cs) {
        if (cs)
            this._color = jsplotlib.color_to_hex(cs);
        return this;
    };

    that.alpha = function (a) {
        if (a)
            this._alpha = a;
        return this;
    };

    /* supports butt, round, projecting*/
    that.dash_capstyle = function (dcs) {
        if (dcs)
            this._dash_capstyle = dcs;
        return this;
    };

    /* supports butt, round, projecting*/
    that.solid_capstyle = function (scs) {
        if (scs)
            this._solid_capstyle = scs;
        return this;
    };

    /* supports miter, round, bevel' */
    that.solid_jointyle = function (sjs) {
        if (sjs)
            this._solid_joinstyle = sjs;
        return this;
    };

    /* supports miter, round, bevel' */
    that.dash_joinstyle = function (djs) {
        if (djs)
            this._dash_joinstyle = djs;
        return this;
    };

    /* random float */
    that.markersize = function (ms) {
        if (ms)
            this._markersize = ms;
        return this;
    };

    that.marker = function (ms) {
        if (ms)
            this._marker = ms;
        return this;
    };

    that.markerfacecolor = function (mfc) {
        if (mfc)
            this._markerfacecolor = jsplotlib.color_to_hex(mfc);
        return this;
    };

    that.markeredgecolor = function (mec) {
        if (mec)
            this._markeredgecolor = jsplotlib.color_to_hex(mec);
        return this;
    };

    that.markeredgewidth = function (mec) {
        if (mec)
            this._markeredgewidth = mec;
        return this;
    };

    that.linestyle = function (ls) {
        if (ls)
            ls = ls.trim();
        this._linestyle = ls;
        return this;
    };

    that.linewidth = function (lw) {
        if (lw)
            this._linewidth = lw;
        return this;
    };

    that.line_id = function (lid) {
        this._line_id = lid;
        return this;
    };

    that.bar_id = function (bid) {
        this._bar_id = bid;
        return this;
    };

    that.scatter_id = function (sid) {
        this._scatter_id = sid;
        return this;
    };

    that.xrange = function (min, max, N) {
        this._x = jsplotlib.linspace(min, max, N);
        return this;
    };

    that.yrange = function (min, max, N) {
        this._y = jsplotlib.linspace(min, max, N);
        return this;
    };

    that.graphtype = function (gt) {
        this._graphtype = gt;
        return this;
    };

    that.barwidth = function (bw) {
        this._barwidth = bw;
        return this;
    };

    that.histbins = function (bins) {
        this._histbins = bins;
        return this;
    };

    that.normed = function (n) {
        this._normed = n;
        return this;
    };

    that.text = function (t) {
        this._text = t;
        return this;
    }

    that.fontsize = function (s) {
        this._fontsize = s;
        return this;
    }

    that.label = function (s) {
        if (s === null)
            this._label = null;
        else
            this._label = s.toString();
        return this;
    }

    /**
      Updates possible attributes provided as kwargs
    **/
    that.update = function (kwargs) {
        // we assume key value pairs
        if (kwargs && typeof kwargs === "object") {
            for (var key in kwargs) {
                if (kwargs.hasOwnProperty(key)) {
                    var val = kwargs[key];

                    switch (key) {
                        case 'linewidth':
                            this.linewidth(val);
                            break;
                        case 'linestyle':
                            this.linestyle(val);
                            break;
                        case 'color':
                            val = jsplotlib.to_rgb(val);
                            this.color(val);
                            break;
                        case 'marker':
                            this.marker(val);
                            break;
                        case 'markersize':
                            this.markersize(val);
                            break;
                        case 'markeredgewidth':
                            this.markeredgewidth(val);
                            break;
                        case 'markeredgecolor':
                            val = jsplotlib.to_rgb(val);
                            this.markeredgecolor(val);
                            break;
                        case 'markerfacecolor':
                            val = jsplotlib.to_rgb(val);
                            this.markerfacecolor(val);
                            break;
                        case 'markerfacecoloralt':
                            val = jsplotlib.to_rgb(val);
                            this.markerfacecoloralt(val);
                            break;
                        case 'fillstyle':
                            this.fillstyle(val);
                            break;
                        case 'antialiased':
                            this.antialiased(val);
                            break;
                        case 'dash_capstyle':
                            this.dash_capstyle(val);
                            break;
                        case 'solid_capstyle':
                            this.solid_capstyle(val);
                            break;
                        case 'dash_joinstyle':
                            this.dash_joinstyle(val);
                            break;
                        case 'solid_jointyle':
                            this.solid_jointyle(val);
                            break;
                        case 'pickradius':
                            this.pickradius(val);
                            break;
                        case 'drawstyle':
                            this.drawstyle(val);
                            break;
                        case 'markevery':
                            this.markevery(val);
                            break;
                        case 'alpha':
                            this.alpha(val);
                            break;
                        case 'graphtype':
                            this.graphtype(val);
                            break;
                        case 'barwidth':
                            this.barwidth(val);
                            break;
                        case 'histbins':
                            this.histbins(val);
                            break;
                        case 'normed':
                            this.normed(val);
                            break;
                        case 'text':
                            this.text(val);
                            break;
                        case 'fontsize':
                            this.fontsize(val);
                            break;
                        case 'label':
                            this.label(val);
                            break;
                    }
                }
            }
        }

        return this;
    };

    that.draw = function (parent_chart) {
        // should be called in the pplot command
        // each plot call adds a new line to our existing plot
        // object and draws them all, when show is called
        // this._init_common();
        var number_of_points = this._y.length || this._x.length; // implement need to move those from the original construct_graph class to lines
        if (!this._linestyle && !this._marker) {
            this._linestyle = jsplotlib.rc['lines.linestyle'];
        }

        /*
        if (!this._marker && !this._linestyle) {
          this._marker = jsplotlib.rc['lines.marker'];
        }
        */

        if (!this._color) {
            this._color = jsplotlib.color_to_hex(parent_chart.get_next_color());
        }

        // set defaults for all attributes
        if (!this._markersize) {
            this._markersize = jsplotlib.rc['lines.markersize'];
        }

        if (!this._markeredgecolor) {
            this._markeredgecolor = 'k';
        }

        if (!this._linewidth) {
            this._linewidth = jsplotlib.rc['lines.linewidth'];
        }

        if (!this._dash_capstyle) {
            this._dash_capstyle = "butt";
        }

        if (!this._solid_capstyle) {
            this._solid_capstyle = "butt";
        }

        if (!this._solid_joinstyle) {
            this._solid_joinstyle = "miter";
        }

        if (!this._dash_joinstyle) {
            this._dash_joinstyle = "miter";
        }

        // default markerfacecolor is linecolor
        if (!this._markerfacecolor) {
            this._markerfacecolor = jsplotlib.color_to_hex(this._color);
        }

        if (!this._markeredgewidth) {
            this._markeredgewidth = 0.75;
        }

        if (!this._alpha) {
            this._alpha = 1;
        }

        // local storage for drawing
        var x = this._x;
        var y = this._y;

        // create array of point pairs with optional s value
        // from [x1,x2], [y1, y2], [s1, s2]
        // to [[x1,y1,s1],[x2,y2,s2]]
        var xys = d3.zip(x, y);
        var pairs = d3.zip(xys.slice(0, -1), xys.slice(1));
        var xscale = parent_chart.get_xscale(); // should come from axis o.O
        var yscale = parent_chart.get_yscale();

        var default_formatter = function (x) {
            if (x.toString && x.toString().length > 4) {
                return x.toExponential ? x.toExponential() : x;
            }

            return x;
        };

        // those are the default formatters, we just use a precision if its a number
        parent_chart._xaxis._formatter = parent_chart._xaxis._formatter || default_formatter;

        parent_chart._yaxis._formatter = parent_chart._yaxis._formatter || default_formatter;

        var get_scatter_id = function (n) {
            return get_chart_id() + "-scatter" + n;
        };

        if (this._graphtype === "scatter") {
            var s = this._markersize;
            if (s === undefined || typeof (s) === "number") {
                var t = (s === undefined ? 1.0 : s);             // default scatter width 1.0
                s = new Array(y.length);
                for (var i = 0; i < s.length; i++)
                    s[i] = t;
            }
            var xys = d3.zip(x, y, s);
            this._scatter = parent_chart.chart.append("svg:g").attr("id", get_scatter_id(this._scatter_id))
                .attr("class", "pplot_scatters")
                .style("clip-path", "url(#" + get_clipping_id() + ")")
                .style("fill", jsplotlib.color_to_hex(this._color));
            this._scatters = this._scatter.selectAll("circle.pplot_scatters" + this._scatter_id)
                .data(xys).enter()
                .append("circle").attr("class", "pplot_scatters" + this._scatter_id)
                .attr("cx", function (d) { return xscale(d[0]); })
                .attr("cy", function (d) { return yscale(d[1]); })
                .attr("r", function (d) { return Math.sqrt(Math.abs(d[2]) / 3.1416); })
                .style("opacity", this._alpha);
            return this;
        }

        var get_bars_id = function (n) {
            return get_chart_id() + "-bars" + n;
        };

        var x_edge_align = function (d) {
            return xscale(d[0] + (d[2] < 0 ? d[2] : 0));
        };
        var x_center_align = function (d) {
            return xscale(d[0] + (d[2] < 0 ? d[2] : -d[2]) / 2);
        };
        var x_pos_align = (this._drawstyle == "center" ? x_center_align : x_edge_align);

        // this adds the bars to the chart
        if (this._graphtype === "bar") {
            var s = this._barwidth;
            if (s === undefined || typeof (s) === "number") {
                var t = (s === undefined ? 0.8 : s);             // default bar width 0.8
                s = new Array(y.length);
                for (var i = 0; i < s.length; i++)
                    s[i] = t;
            }
            var xys = d3.zip(x, y, s);
            this._bar = parent_chart.chart.append("svg:g").attr("id", get_bars_id(this._bar_id))
                .attr("class", "pplot_bars")
                .style("clip-path", "url(#" + get_clipping_id() + ")")
                .style("stroke", jsplotlib.color_to_hex(this._markeredgecolor))
                .style("stroke-width", this._markeredgewidth)
                .style("opacity", this._alpha);
            this._bars = this._bar.selectAll("rect.pplot_bars" + this._bar_id)
                .data(xys).enter()
                .append("rect").attr("class", "pplot_bars" + this._bar_id)
                .style("fill", jsplotlib.color_to_hex(this._color))
                .attr("x", x_pos_align)
                .attr("y", function (d) { return yscale(d[1] > 0 ? d[1] : 0); })
                .attr("width", function (d) { return Math.abs(xscale(d[2]) - xscale(0)); })
                .attr("height", function (d) { return Math.abs(yscale(d[1] > 0 ? d[1] : -d[1]) - yscale(0)); });
            return this;
        }

        var get_text_id = function (n) {
            return get_chart_id() + "-text" + n;
        };

        if (this._graphtype === "text") {
            var xys = d3.zip(x, y, this._text);
            this._text = parent_chart.chart.append("svg:g").attr("id", get_text_id(this._text_id))
                .attr("class", "pplot_texts")
                .style("clip-path", "url(#" + get_clipping_id() + ")")
                .style("font-size", this._fontsize + "pt")
                .style("fill", jsplotlib.color_to_hex(this._color))
                .style("opacity", this._alpha);
            this._texts = this._text.selectAll("text.pplot_texts" + this._text_id)
                .data(xys).enter()
                .append("text").attr("class", "pplot_texts" + this._text_id)
                .attr("x", function (d) { return xscale(d[0]); })
                .attr("y", function (d) { return yscale(d[1]); })
                .text(function (d) { return d[2]; });
            return this;
        }

        var get_lines_id = function (n) {
            return get_chart_id() + "-lines" + n;
        }

        // this adds the line to the chart
        this._line = parent_chart.chart.append("svg:g").attr("id", get_lines_id(this._line_id))
            .attr("class", "pplot_lines")
            .style("clip-path", "url(#" + get_clipping_id() + ")")
            .style("stroke", jsplotlib.color_to_hex(this._color))
            .style("stroke-width", this._linewidth)
            .style("stroke-opacity", this._alpha);

        var drawlines = true;
        // set appropriate line style
        if (this._linestyle === "-" || this._linestyle === null) {
            this._line = this._line
                .style("stroke-linecap", this._solid_capstyle)
                .style("stroke-linejoin", this._solid_joinstyle);
        } else if (this._linestyle === "--") {
            this._line = this._line
                .style("stroke-linecap", this._dash_capstyle)
                .style("stroke-linejoin", this._dash_joinstyle)
                .style("stroke-dasharray", "5,5");
        } else if (this._linestyle === ":") {
            this._line = this._line
                .style("stroke-linecap", "round")
                .style("stroke-linejoin", this._dash_joinstyle)
                .style("stroke-dasharray", "2,5");
        } else if (this._linestyle === "-.") {
            this._line = this._line
                .style("stroke-linecap", this._dash_capstyle)
                .style("stroke-linejoin", this._dash_joinstyle)
                .style("stroke-dasharray", "5, 5, 2, 5");
        } else {
            drawlines = false;
        }

        if (drawlines) {
            this._lines = this._line.selectAll("line.pplot_lines" + this._line_id)
                .data(pairs).enter()
                .append("line").attr("class", "pplot_lines" + this._line_id)
                .attr("x1", function (d) { return xscale(d[0][0]); })
                .attr("x2", function (d) { return xscale(d[1][0]); })
                .attr("y1", function (d) { return yscale(d[0][1]); })
                .attr("y2", function (d) { return yscale(d[1][1]); });
        }

        var get_points_id = function (n) {
            return get_chart_id() + "-points" + n;
        }

        // append points
        this._point = parent_chart.chart.append("svg:g").attr("id", get_points_id(this._line_id))
            .attr("class", "pplot_points")
            .style("clip-path", "url(#" + get_clipping_id() + ")")
            .style("stroke", jsplotlib.color_to_hex(this._markeredgecolor))
            .style("stroke-width", this._markeredgewidth)
            .style("stroke-opacity", this._alpha)
            .style("fill", jsplotlib.color_to_hex(this._markerfacecolor));

        this._points = this._point.selectAll("g.pplot_points" + this._line_id)
            .data(xys).enter()
            .append("g").attr("class", "pplot_points" + this._line_id)
            .attr("x", function (d) { return d[0]; })
            .attr("y", function (d) { return d[1]; });

        // init hover popups
        /*
        $("#" + chart.attr("id") + " g.pplot_points" + this._line_id).tipsy({
          gravity: "nw",
          html: true,
          title: function() {
            var d = this.__data__;
            var output = "(" + xformat(d[0]) + "," + yformat(d[1]) + ")";
            return output;
          }
        }); */

        // set appropriate marker styles
        // http://matplotlib.org/api/markers_api.html
        var marker_size = this._markersize; // store for nested call
        switch (this._marker) {
            case undefined:
            case " ":
            case "None":
            case "":
                this._markers = this._points.append("circle").attr("cx", function (d) {
                    return xscale(d[0]);
                }).attr("cy", function (d) {
                    return yscale(d[1]);
                }).attr("r", function (d) {
                    return 0;
                });
                break;
            case ",":
                this._markers = this._points.append("circle").attr("cx", function (d) {
                    return xscale(d[0]);
                }).attr("cy", function (d) {
                    return yscale(d[1]);
                }).attr("r", function (d) {
                    return 0.2;
                });
                break;
            case ".":
                this._markers = this._points.append("circle").attr("cx", function (d) {
                    return xscale(d[0]);
                }).attr("cy", function (d) {
                    return yscale(d[1]);
                }).attr("r", function (d) {
                    return 1;
                });
                break;
            case "o":
                this._markers = this._points.append("circle").attr("cx", function (d) {
                    return xscale(d[0]);
                }).attr("cy", function (d) {
                    return yscale(d[1]);
                }).attr("r", function (d) {
                    return marker_size;
                });
                break;
            case "x":
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]) - marker_size * 0.7;
                }).attr("x2", function (d) {
                    return xscale(d[0]) + marker_size * 0.7;
                }).attr("y1", function (d) {
                    return yscale(d[1]) - marker_size * 0.7;
                }).attr("y2", function (d) {
                    return yscale(d[1]) + marker_size * 0.7;
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]) + marker_size * 0.7;
                }).attr("x2", function (d) {
                    return xscale(d[0]) - marker_size * 0.7;
                }).attr("y1", function (d) {
                    return yscale(d[1]) - marker_size * 0.7;
                }).attr("y2", function (d) {
                    return yscale(d[1]) + marker_size * 0.7;
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._markers = this._points.selectAll("line");
                break;
            case "+":
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]) - marker_size;
                }).attr("x2", function (d) {
                    return xscale(d[0]) + marker_size;
                }).attr("y1", function (d) {
                    return yscale(d[1]);
                }).attr("y2", function (d) {
                    return yscale(d[1]);
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]);
                }).attr("x2", function (d) {
                    return xscale(d[0]);
                }).attr("y1", function (d) {
                    return yscale(d[1]) - marker_size;
                }).attr("y2", function (d) {
                    return yscale(d[1]) + marker_size;
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._markers = this._points.selectAll("line");
                break;
            case "_":
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]) - marker_size;
                }).attr("x2", function (d) {
                    return xscale(d[0]) + marker_size;
                }).attr("y1", function (d) {
                    return yscale(d[1]);
                }).attr("y2", function (d) {
                    return yscale(d[1]);
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._markers = this._points.selectAll("line");
                break;
            case "|":
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]);
                }).attr("x2", function (d) {
                    return xscale(d[0]);
                }).attr("y1", function (d) {
                    return yscale(d[1]) - marker_size;
                }).attr("y2", function (d) {
                    return yscale(d[1]) + marker_size;
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._markers = this._points.selectAll("line");
                break;
            case 's':
                this._points.append("rect")
                    .attr("x", function (d) {
                        return xscale(d[0]) - marker_size / 2;
                    })
                    .attr("y", function (d) {
                        return yscale(d[1]) - marker_size / 2;
                    })
                    .attr("width", function (d) {
                        return marker_size;
                    })
                    .attr("height", function (d) {
                        return marker_size;
                    });
                this._markers = this._points.selectAll("rect");
                break;
            case 'D':
                this._points.append("polygon")
                    .attr("points", function (d) {
                        var cx = xscale(d[0]);
                        var cy = yscale(d[1]);
                        var s = marker_size * 5 / 4;
                        var plist = [cx - s, cy,
                            cx, cy - s,
                        cx + s, cy,
                            cx, cy + s];
                        return plist.toString().replace(/,/g, " ");
                    });
                this._markers = this._points.selectAll("polygon");
                break;
            case 'd':
                this._points.append("polygon")
                    .attr("points", function (d) {
                        var cx = xscale(d[0]);
                        var cy = yscale(d[1]);
                        var s = marker_size * 5 / 4;
                        var plist = [cx - s / 2, cy,
                            cx, cy - s,
                        cx + s / 2, cy,
                            cx, cy + s];
                        return plist.toString().replace(/,/g, " ");
                    });
                this._markers = this._points.selectAll("polygon");
                break;
            case '^':
                this._points.append("polygon")
                    .attr("points", function (d) {
                        var cx = xscale(d[0]);
                        var cy = yscale(d[1]);
                        var s = marker_size * 2;
                        var plist = [cx - 0.5 * s, cy + 0.289 * s,
                        cx + 0.5 * s, cy + 0.289 * s,
                            cx, cy - 0.577 * s];
                        return plist.toString().replace(/,/g, " ");
                    });
                this._markers = this._points.selectAll("polygon");
                break;
            case 'v':
                this._points.append("polygon")
                    .attr("points", function (d) {
                        var cx = xscale(d[0]);
                        var cy = yscale(d[1]);
                        var s = marker_size * 2;
                        var plist = [cx - 0.5 * s, cy - 0.289 * s,
                        cx + 0.5 * s, cy - 0.289 * s,
                            cx, cy + 0.577 * s];
                        return plist.toString().replace(/,/g, " ");
                    });
                this._markers = this._points.selectAll("polygon");
                break;
            case '<':
                this._points.append("polygon")
                    .attr("points", function (d) {
                        var cx = xscale(d[0]);
                        var cy = yscale(d[1]);
                        var s = marker_size * 2;
                        var plist = [cx + 0.289 * s, cy - 0.5 * s,
                        cx + 0.289 * s, cy + 0.5 * s,
                        cx - 0.577 * s, cy];
                        return plist.toString().replace(/,/g, " ");
                    });
                this._markers = this._points.selectAll("polygon");
                break;
            case '>':
                this._points.append("polygon")
                    .attr("points", function (d) {
                        var cx = xscale(d[0]);
                        var cy = yscale(d[1]);
                        var s = marker_size * 2;
                        var plist = [cx - 0.289 * s, cy - 0.5 * s,
                        cx - 0.289 * s, cy + 0.5 * s,
                        cx + 0.577 * s, cy];
                        return plist.toString().replace(/,/g, " ");
                    });
                this._markers = this._points.selectAll("polygon");
                break;
            case '1':
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]);
                }).attr("x2", function (d) {
                    return xscale(d[0]) - marker_size;
                }).attr("y1", function (d) {
                    return yscale(d[1]);
                }).attr("y2", function (d) {
                    return yscale(d[1]) - marker_size * 0.577;
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]);
                }).attr("x2", function (d) {
                    return xscale(d[0]) + marker_size;
                }).attr("y1", function (d) {
                    return yscale(d[1]);
                }).attr("y2", function (d) {
                    return yscale(d[1]) - marker_size * 0.577;
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]);
                }).attr("x2", function (d) {
                    return xscale(d[0]);
                }).attr("y1", function (d) {
                    return yscale(d[1]);
                }).attr("y2", function (d) {
                    return yscale(d[1]) + marker_size * 1.155;
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._markers = this._points.selectAll("line");
                break;
            case '2':
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]);
                }).attr("x2", function (d) {
                    return xscale(d[0]) - marker_size;
                }).attr("y1", function (d) {
                    return yscale(d[1]);
                }).attr("y2", function (d) {
                    return yscale(d[1]) + marker_size * 0.577;
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]);
                }).attr("x2", function (d) {
                    return xscale(d[0]) + marker_size;
                }).attr("y1", function (d) {
                    return yscale(d[1]);
                }).attr("y2", function (d) {
                    return yscale(d[1]) + marker_size * 0.577;
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]);
                }).attr("x2", function (d) {
                    return xscale(d[0]);
                }).attr("y1", function (d) {
                    return yscale(d[1]);
                }).attr("y2", function (d) {
                    return yscale(d[1]) - marker_size * 1.155;
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._markers = this._points.selectAll("line");
                break;
            case '3':
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]);
                }).attr("x2", function (d) {
                    return xscale(d[0]) + marker_size * 0.577;
                }).attr("y1", function (d) {
                    return yscale(d[1]);
                }).attr("y2", function (d) {
                    return yscale(d[1]) - marker_size;
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]);
                }).attr("x2", function (d) {
                    return xscale(d[0]) + marker_size * 0.577;
                }).attr("y1", function (d) {
                    return yscale(d[1]);
                }).attr("y2", function (d) {
                    return yscale(d[1]) + marker_size;
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]);
                }).attr("x2", function (d) {
                    return xscale(d[0]) - marker_size * 1.155;
                }).attr("y1", function (d) {
                    return yscale(d[1]);
                }).attr("y2", function (d) {
                    return yscale(d[1]);
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._markers = this._points.selectAll("line");
                break;
            case '4':
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]);
                }).attr("x2", function (d) {
                    return xscale(d[0]) - marker_size * 0.577;
                }).attr("y1", function (d) {
                    return yscale(d[1]);
                }).attr("y2", function (d) {
                    return yscale(d[1]) - marker_size;
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]);
                }).attr("x2", function (d) {
                    return xscale(d[0]) - marker_size * 0.577;
                }).attr("y1", function (d) {
                    return yscale(d[1]);
                }).attr("y2", function (d) {
                    return yscale(d[1]) + marker_size;
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._points.append("line").attr("x1", function (d) {
                    return xscale(d[0]);
                }).attr("x2", function (d) {
                    return xscale(d[0]) + marker_size * 1.155;
                }).attr("y1", function (d) {
                    return yscale(d[1]);
                }).attr("y2", function (d) {
                    return yscale(d[1]);
                }).style("stroke", jsplotlib.color_to_hex(this._color));
                this._markers = this._points.selectAll("line");
                break;
        }

        // resize function only supports 'o'
        var resize_function = function (resize_amount) {
            return function () {
                var marker = d3.select(this);
                if (marker.attr("r")) {
                    marker.attr("r", marker.attr("r") * resize_amount);
                } else if (marker.attr("width") && marker.attr("height")) {
                    // resizes square marker
                    var old_marker_size = parseFloat(marker.attr("width"));
                    var new_marker_size = old_marker_size * resize_amount;
                    var diff_marker_size = (new_marker_size - old_marker_size) / 2;

                    var new_x = parseFloat(marker.attr("x")) - diff_marker_size;
                    var new_y = parseFloat(marker.attr("y")) - diff_marker_size;
                    marker.attr("width", new_marker_size);
                    marker.attr("height", new_marker_size);
                    marker.attr("x", new_x);
                    marker.attr("y", new_y);
                } else {
                    return true;
                }
            };
        };

        // add marker attributes
        if (this._markers) {
            this._markers
                .on("mouseover", resize_function(1.25))
                .on("mouseout", resize_function(0.8));
        }

        return this;
    };

    return that;
};

jsplotlib.plot = function (chart, rows = null, cols = null, index = null) {
    /*
      list of responsibilites
       - holds all lines
       - updates axis
       - construct axis
       - knows color_cycle
       - scatter? s() functions?
    */

    // store chart object and append own methods
    var that = {
        chart: chart,
        subplot: null
    };

    that.axes_colorcycle_position = 0;
    that.line_count = 0;
    that._lines = []; // we support multiple lines
    that.scatter_count = 0;
    that._scatters = [];
    that.bar_count = 0;
    that._bars = [];
    that.text_count = 0;
    that._texts = [];
    that._legend = null;

    that.add_line = function (line) {
        if (line) {
            this._lines.push(line);
            line._line_id = this.line_count++;
            this._update_limits();
            //this._update_chart_ratio();
        }
        return this;
    };

    that.add_scatter = function (scatter) {
        if (scatter) {
            this._scatters.push(scatter);
            scatter._scatter_id = this.scatter_count++;
            this._update_limits();
            //this._update_chart_ratio();
        }
        return this;
    };

    that.add_bar = function (bar) {
        if (bar) {
            this._bars.push(bar);
            bar._bar_id = this.bar_count++;
            this._update_limits();
            //this._update_chart_ratio();
        }
        return this;
    };

    // Hugly Hack : convert hist to bar and add
    that.add_hist = function (hist) {
        if (hist) {
            var bins = hist._histbins;
            var y = new Array(bins);
            var x = new Array(bins);
            for (var i = 0; i < y.length; i++)
                x[i] = y[i] = 0;
            var xmax = d3.max(hist._x);
            var xmin = d3.min(hist._x);
            var h = (xmax - xmin) / bins;
            var count = hist._x.length;
            for (var i = 0; i < hist._x.length; i++) {
                var k = Math.floor((hist._x[i] - xmin) / h);
                if (k == y.length) { k--; }
                y[k] += 1;
            }
            for (var i = 0; i < y.length; i++) {
                x[i] = xmin + i * h;
                if (hist._normed) { y[i] /= count * h; }
            }
            hist._graphtype = "bar";
            hist._y = y;
            hist._x = x;
            hist._barwidth = h;
            this.add_bar(hist);
        }
    };

    that.add_text = function (text) {
        if (text) {
            this._texts.push(text);
            text._text_id = this.text_count++;
        }
        return this;
    };

    that.add_legend = function (legend) {
        this._legend = legend;
        return this;
    }

    // calculate width-height-ratio

    //Subplot
    that._subplot_w = cols;
    that._subplot_h = rows;
    that._subplot_i = index;


    // set graph attributes
    that._chartheight = parseInt(chart.attr("height"), 10);
    that._chartwidth = parseInt(chart.attr("width"));


    that._title_string = "";
    that._title_size = 0;
    that._xaxis = jsplotlib.construct_axis(that, "x");
    that._yaxis = jsplotlib.construct_axis(that, "y");
    that._axes = [that._xaxis, that._yaxis];
    that._xlim = null;
    that._ylim = null;

    // returns the next color in the cycle
    that.get_next_color = function () {
        var cs = jsplotlib.rc['axes.color_cycle'][this.axes_colorcycle_position];
        this.axes_colorcycle_position = (this.axes_colorcycle_position + 1) %
            jsplotlib.rc['axes.color_cycle'].length;
        return cs;
    };

    // setter functions
    that.xlabel = function (xl) {
        this._xaxis.set_label(xl);
        return this;
    };

    that.ylabel = function (yl) {
        this._yaxis.set_label(yl);
        return this;
    };

    that.xaxis_off = function () {
        this._xaxis._turn_off();
        return this;
    };

    that.yaxis_off = function () {
        this._yaxis._turn_off();
        return this;
    };

    that.xaxis_on = function () {
        this._xaxis._turn_on();
        return this;
    };

    that.yaxis_on = function () {
        this._yaxis._turn_on();
        return this;
    };

    that.axis_on = function () {
        this.yaxis_on();
        this.xaxis_on();
        return this;
    };

    that.axis_off = function () {
        this.yaxis_off();
        this.xaxis_off();
        return this;
    };

    that.xgrid = function (b) {
        this._xaxis._grid(b);
    };

    that.ygrid = function (b) {
        this._yaxis._grid(b);
    };

    that.title = function (title_string) {
        this._title_string = title_string;
        this._title_size = this._chartheight * 0.1;
        this._title_transform_string = "translate(" + this._chartwidth / 2 + "," +
            this._title_size / 2 + ")";
        return this;
    };

    // force xlimits and ylimits
    that._set_xlim = function (lim) {
        this._xlim = lim;
        this._xlimits(lim);
        return this;
    };

    that._set_ylim = function (lim) {
        this._ylim = lim;
        this._ylimits(lim);
        return this;
    };

    that._get_xlim = function () {
        if (!this._xaxis._domain)
            return [0, 1];
        return this._xaxis._domain;
    }

    that._get_ylim = function () {
        if (!this._yaxis._domain)
            return [0, 1];
        return this._yaxis._domain;
    }

    // sets the ylimits based on a minmax array/tuple
    that._ylimits = function (min_max_tuple) {
        if (this._ylim === null) {
            this._yaxis._set_data_range(min_max_tuple);
        } else {
            this._yaxis._set_data_range(this._ylim);
        }
        return this;
    };

    that._xlimits = function (min_max_tuple) {
        if (this._xlim === null) {
            this._xaxis._set_data_range(min_max_tuple);
        } else {
            this._xaxis._set_data_range(this._xlim);
        }
        return this;
    };

    that._update_limits = function () {
        var i;
        var xs = []; // all x-values
        var ys = []; // all y-values

        // calculate limits
        for (i = 0; i < this._lines.length; i++) {
            xs = xs.concat(this._lines[i]._x);
            ys = ys.concat(this._lines[i]._y);
        }

        for (i = 0; i < this._scatters.length; i++) {
            xs = xs.concat(this._scatters[i]._x);
            ys = ys.concat(this._scatters[i]._y);
        }

        var xmin = d3.min(xs);
        var xmax = d3.max(xs);
        var ymin = d3.min(ys);
        var ymax = d3.max(ys);

        if (this._bars.length > 0) {
            var xbs = [];
            var ybs = [];
            for (i = 0; i < this._bars.length; i++) {
                xbs = xbs.concat(this._bars[i]._x);
                ybs = ybs.concat(this._bars[i]._y);
            }
            var xbmin = d3.min(xbs);
            var xbmax = d3.max(xbs) + 1;   // default bar width space
            var ybmin = d3.min(ybs);
            var ybmax = d3.max(ybs);
            ybmin = (ybmin > 0 ? 0 : ybmin);
            ybmax = (ybmax < 0 ? 0 : ybmax);
            xmin = (xmin == undefined || xmin > xbmin ? xbmin : xmin);
            xmax = (xmax == undefined || xmax < xbmax ? xbmax : xmax);
            ymin = (ymin == undefined || ymin > ybmin ? ybmin : ymin);
            ymax = (ymax == undefined || ymax < ybmax ? ybmax : ymax);
        }

        this._xlimits([xmin, xmax]);
        this._ylimits([ymin, ymax]);

        return this;
    };

    /**
     * Simple chart ratio auto choosing function. Try to choose a best width/height
     * ratio for the input values.
     */
    that._update_chart_ratio = function () {
        var maxHeight = 800;
        var maxWidth = 800;

        // save original values for recalculations
        if (!that._originalWidth || !that._originalHeight) {
            that._originalWidth = chart.attr("width");
            that._originalHeight = chart.attr("height");
        }

        var _height = that._originalHeight;
        var _width = that._originalWidth;
        var i;
        var xs = []; // all x-values
        var ys = []; // all y-values

        // calculate limits
        /*
        for (i = 0; i < this._lines.length; i++) {
          xs = xs.concat(this._lines[i]._x);
          ys = ys.concat(this._lines[i]._y);
        }
  
        var _abs_height = Math.abs(d3.min(xs) - d3.max(xs));
        var _abs_width = Math.abs(d3.min(ys) - d3.max(ys));
        */
        var xlims = this._get_xlim();
        var ylims = this._get_ylim();

        var _abs_height = Math.abs(xlims[0] - xlims[1]);
        var _abs_width = Math.abs(ylims[0] - ylims[1]);

        var w_ratio = _abs_height / _abs_width;
        var h_ratio = _abs_width / _abs_height;

        h_ratio = h_ratio > 1 ? 1.25 : h_ratio < 1 ? 0.85 : 1;
        w_ratio = w_ratio > 1 ? 1.25 : w_ratio < 1 ? 0.85 : 1;

        that._chartheight = _height * h_ratio;
        that._chartwidth = _width * w_ratio;
        chart.attr("height", that._chartheight);
        chart.attr("width", that._chartwidth);
    };

    that.yformat = function (formatter) {
        this._yaxis._set_formatter(formatter);
        return this;
    };

    that.xformat = function (formatter) {
        this._xaxis._set_formatter(formatter);
        return this;
    };

    that.get_yscale = function () {
        return this._yaxis.get_scale();
    };

    that.get_xscale = function () {
        return this._xaxis.get_scale();
    };

    // defines lines and points clipping
    that._create_clipping = function () {
        chart.append("svg:clipPath").attr("id", get_clipping_id())
            .append("rect")
            .attr("fill", "white")
            .attr("x", that._yaxis._size)
            .attr("y", that._title_size)
            .attr("width", that._width)
            .attr("height", that._height - that._title_size);
    };

    that._create_plot_group = function (plotId, meta) {
        let sh = meta._subplot_h;
        let sw = meta._subplot_w;
        let si = meta._subplot_i;

        if (sh === null || sw === null || si === null) {
            sh = 1;
            sw = 1;
            si = 1;
        }
        chart.append("svg:g").attr("id", "subplot" + plotId)
            .attr("subplot", "true")
            .attr("sh", sh)
            .attr("sw", sw)
            .attr("si", si);
        return "#subplot" + plotId;
    }

    // creates axes
    that._init_common = function () {
        for (var i = 0; i < 2; i++) {
            this._axes[i]._init(this);
        }
        this._height = this._chartheight - this._xaxis._size;
        this._width = this._chartwidth - this._yaxis._size;
        return this;
    };

    // draw axes and append graph title
    that._draw_axes = function () {
        for (var i = 0; i < this._axes.length; i++) {
            this._axes[i]._draw_axis(this);
            this._axes[i]._draw_label(this);
        }

        var myselector = "#" + chart.attr("id") + " .axis line, #" + chart.attr(
            "id") + " .axis path";
        $(myselector).css("fill", "none").css("stroke", "#000");
        d3.svg.axis(chart);
        if (this._title_string !== "") {
            that.chart.append("svg:g").attr("class", "graph_title").attr(
                "transform", this._title_transform_string).append("text").append(
                    "tspan").attr("text-anchor", "middle").attr("class", "graph_title").attr(
                        "writing-mode", "rl-tb").text(this._title_string);
        }
        return this;
    };

    that._render_legend_position = function (g, allLabelsLength) {
        const xPadding = 0.15;
        const yPadding = 0.15;
        let x = 0;
        let y = 0;

        switch (that._legend) {
            case "upper right":
                x = that._chartwidth - (that._chartwidth * xPadding);
                y = that._chartheight * yPadding;
                break;
            case "upper left":
                x = that._chartwidth * xPadding;
                y = that._chartheight * yPadding;
                break;
            case "lower left":
                x = that._chartwidth * xPadding;
                y = that._chartheight - (that._chartheight * yPadding) - (allLabelsLength * 20);
                break;
            case "lower right":
                x = that._chartwidth - (that._chartwidth * xPadding);
                y = that._chartheight - (that._chartheight * yPadding) - (allLabelsLength * 20);
                break;
            case "center left":
                x = that._chartwidth * xPadding;
                y = that._chartheight / 2;
                break;
            case "center right":
                x = that._chartwidth - (that._chartwidth * xPadding);
                y = that._chartheight / 2;
                break;
            case "lower center":
                x = that._chartwidth / 2;
                y = that._chartheight - (that._chartheight * yPadding) - (allLabelsLength * 20);
                break;
            case "upper center":
                x = that._chartwidth / 2;
                y = that._chartheight * yPadding;
                break;
            case "center":
                x = that._chartwidth / 2;
                y = that._chartheight / 2;
                break;
            default:
                x = 0;
                y = 0;
        }
        g.style("transform", "translate(" + x + "px, " + y + "px)");
    }

    that._render_legend = function (allLabels) {
        let y = 0;

        let g = chart.append("svg:g").attr("id", "legend_" + this._plotId);
        //chart.append("svg:g").attr("id", this._id)

        for (let i = 0; i < allLabels.length; i++) {
            g.append("circle").attr("cx", 0).attr("cy", y).attr("r", 6).style("fill", allLabels[i].color);
            g.append("text").attr("x", 20).attr("y", y).text(allLabels[i].label).style("font-size", "15px").attr("alignment-baseline", "middle");
            y += 30;
        }

        //Position Render
        that._render_legend_position(g, allLabels.length);
    }

    // draw legend
    that._draw_legend = function () {
        if (that._legend === null)
            return;
        let allLabels = [];

        /* Get all labels from line */
        for (let i = 0; i < that._lines.length; i++) {
            if (that._lines[i]._label === null)
                continue;
            allLabels.push({
                type: "line",
                color: that._lines[i]._color,
                label: that._lines[i]._label
            });
        }
        /* Get all labels from scatter */
        for (let i = 0; i < that._scatters.length; i++) {
            if (that._scatters[i]._label === null)
                continue;
            allLabels.push({
                type: "scatter",
                color: that._scatters[i]._color,
                label: that._scatters[i]._label
            });
        }

        /* Get all labels from bar and hist */
        for (let i = 0; i < that._bars.length; i++) {
            if (that._bars[i]._label === null)
                continue;
            allLabels.push({
                type: "bar",
                color: that._bars[i]._color,
                label: that._bars[i]._label
            });
        }

        that._render_legend(allLabels);
    };

    // resize function for the chart
    var chart_id = that.chart.attr("id");
    that.erase_charts = function () {
        $("#" + chart.attr("id")).empty();
    };
    that.resize_function = function (resize_amount, direction) {
        return function () {
            var node = this;
            while (node.id !== chart_id) {
                node.parentNode.appendChild(node);
                node = node.parentNode;
            }
            var object = d3.select(this);
            var x0 = parseInt(object.attr("x") || "0", 10);
            var width0 = parseInt(object.attr("width"), 10);
            var y0 = parseInt(object.attr("y") || "0", 10);
            var height0 = parseInt(object.attr("height"), 10);
            var newwidth, newheight, newx, newy;
            if (direction === "grow") {
                object.attr("x_orig", x0).attr("y_orig", y0).attr("width_orig",
                    width0).attr("height_orig", height0);
                newwidth = width0 * resize_amount;
                newheight = height0 * resize_amount;
                newx = x0 - (resize_amount - 1) * width0 / 2;
                newy = y0 - (resize_amount - 1) * height0 / 2;
            } else if (direction === "shrink") {
                newwidth = object.attr("width_orig");
                newheight = object.attr("height_orig");
                newx = object.attr("x_orig");
                newy = object.attr("y_orig");
            }
            object.attr("x", newx).attr("y", newy).attr("height", newheight).attr(
                "width", newwidth);
        };
    };

    that.scale_subplot = function (x, y, posX, posY, subplot) {
        $(subplot).css('transform', 'translate(' + posX + 'px, ' + posY + 'px) scale(' + x + ', ' + y + ')');
    };
    /**
     Draws the lines. Lines are resonsible for their drawing. Here we just initialize
     the axes and the scaling.
    **/
    that.draw = function (plotId) {
        var i;

        this._init_common(); //
        this._plotId = plotId;

        this._create_clipping();

        // draw scatters
        for (i = 0; i < this._scatters.length; i++) {
            this._scatters[i].draw(this);
        }

        // draw bars
        for (i = 0; i < this._bars.length; i++) {
            this._bars[i].draw(this);
        }

        // draw lines
        for (i = 0; i < this._lines.length; i++) {
            this._lines[i].draw(this);
        }

        // draw texts
        for (i = 0; i < this._texts.length; i++) {
            this._texts[i].draw(this);
        }

        this._draw_axes();
        this._draw_legend();

        //put every elements created in group
        const allChildsChart = $(this.chart[0][0]).children();

        this.subplot = this._create_plot_group(plotId, this);
        for (i = 0; i < allChildsChart.length; i++) {
            if ($(allChildsChart[i]).attr('subplot') === "true")
                continue;
            $(allChildsChart[i]).appendTo(this.subplot);
        }
        if (this._subplot_h === null)
            return;


        //resize subplot
        let scaleW = ($("#" + get_chart_id()).width() / this._subplot_w) / $("#" + get_chart_id()).width();
        let scaleH = ($("#" + get_chart_id()).height() / this._subplot_h) / $("#" + get_chart_id()).height();

        let posY = (Math.ceil(this._subplot_i / this._subplot_h) - 1)
            * $("#" + get_chart_id()).height() * scaleH;
        let posX = (this._subplot_i % this._subplot_w) - 1;
        if (posX < 0) {
            posX = (this._subplot_w - 1) * $("#" + get_chart_id()).width() * scaleW;
        } else {
            posX *= ($("#" + get_chart_id()).width() * scaleW)
        }
        this.scale_subplot(scaleW, scaleH, posX, posY, this.subplot);
    };

    that.update = function (kwargs) {
        var i;

        // pass to lines
        for (i = 0; i < this._lines.length; i++) {
            this._lines[i].update(kwargs);
        }

        // update own kwargs
        if (kwargs && typeof kwargs === "object") {
            for (var key in kwargs) {
                if (kwargs.hasOwnProperty(key)) {
                    var val = kwargs[key];

                    switch (key) {
                        case 'title':
                            this.title(val);
                            break;
                        case 'xlabel':
                            this.xlabel(val);
                            break;
                        case 'ylabel':
                            this.ylabel(val);
                            break;
                    }
                }
            }
        }

        return this;
    };

    return that;
};



/** List of all supported line styles **/
jsplotlib.Line2D.lineStyles = {
    '-': '_draw_solid',
    '--': '_draw_dashed',
    '-.': '_draw_dash_dot',
    ':': '_draw_dotted',
    'None': '_draw_nothing',
    ' ': '_draw_nothing',
    '': '_draw_nothing',
};

jsplotlib.Line2D.lineMarkers = {
    '.': 'point',
    ',': 'pixel',
    'o': 'circle',
    'v': 'triangle_down',
    '^': 'triangle_up',
    '<': 'triangle_left',
    '>': 'triangle_right',
    '1': 'tri_down',
    '2': 'tri_up',
    '3': 'tri_left',
    '4': 'tri_right',
    '8': 'octagon',
    's': 'square',
    'p': 'pentagon',
    '*': 'star',
    'h': 'hexagon1',
    'H': 'hexagon2',
    '+': 'plus',
    'x': 'x',
    'D': 'diamond',
    'd': 'thin_diamond',
    '|': 'vline',
    '_': 'hline',
    //TICKLEFT: 'tickleft',
    //TICKRIGHT: 'tickright',
    //TICKUP: 'tickup',
    //TICKDOWN: 'tickdown',
    //CARETLEFT: 'caretleft',
    //CARETRIGHT: 'caretright',
    //CARETUP: 'caretup',
    //CARETDOWN: 'caretdown',
    "None": 'nothing',
    //Sk.builtin.none.none$: 'nothing',
    ' ': 'nothing',
    '': 'nothing'
};

/**
 Color short keys
**/
jsplotlib.colors = {
    'b': 'blue',
    'g': 'green',
    'r': 'red',
    'c': 'cyan',
    'm': 'magenta',
    'y': 'yellow',
    'k': 'black',
    'w': 'white'
};

jsplotlib.position = [
    "upper right",
    "upper left",
    "lower left",
    "lower right",
    "center left",
    "center right",
    "lower center",
    "upper center",
    "center"
]

/**
 Mapping of all possible CSS colors, that are supported by matplotlib
**/
jsplotlib.cnames = {
    'aliceblue': '#F0F8FF',
    'antiquewhite': '#FAEBD7',
    'aqua': '#00FFFF',
    'aquamarine': '#7FFFD4',
    'azure': '#F0FFFF',
    'beige': '#F5F5DC',
    'bisque': '#FFE4C4',
    'black': '#000000',
    'blanchedalmond': '#FFEBCD',
    'blue': '#0000FF',
    'blueviolet': '#8A2BE2',
    'brown': '#A52A2A',
    'burlywood': '#DEB887',
    'cadetblue': '#5F9EA0',
    'chartreuse': '#7FFF00',
    'chocolate': '#D2691E',
    'coral': '#FF7F50',
    'cornflowerblue': '#6495ED',
    'cornsilk': '#FFF8DC',
    'crimson': '#DC143C',
    'cyan': '#00FFFF',
    'darkblue': '#00008B',
    'darkcyan': '#008B8B',
    'darkgoldenrod': '#B8860B',
    'darkgray': '#A9A9A9',
    'darkgreen': '#006400',
    'darkkhaki': '#BDB76B',
    'darkmagenta': '#8B008B',
    'darkolivegreen': '#556B2F',
    'darkorange': '#FF8C00',
    'darkorchid': '#9932CC',
    'darkred': '#8B0000',
    'darksage': '#598556',
    'darksalmon': '#E9967A',
    'darkseagreen': '#8FBC8F',
    'darkslateblue': '#483D8B',
    'darkslategray': '#2F4F4F',
    'darkturquoise': '#00CED1',
    'darkviolet': '#9400D3',
    'deeppink': '#FF1493',
    'deepskyblue': '#00BFFF',
    'dimgray': '#696969',
    'dodgerblue': '#1E90FF',
    'firebrick': '#B22222',
    'floralwhite': '#FFFAF0',
    'forestgreen': '#228B22',
    'fuchsia': '#FF00FF',
    'gainsboro': '#DCDCDC',
    'ghostwhite': '#F8F8FF',
    'gold': '#FFD700',
    'goldenrod': '#DAA520',
    'gray': '#808080',
    'green': '#008000',
    'greenyellow': '#ADFF2F',
    'honeydew': '#F0FFF0',
    'hotpink': '#FF69B4',
    'indianred': '#CD5C5C',
    'indigo': '#4B0082',
    'ivory': '#FFFFF0',
    'khaki': '#F0E68C',
    'lavender': '#E6E6FA',
    'lavenderblush': '#FFF0F5',
    'lawngreen': '#7CFC00',
    'lemonchiffon': '#FFFACD',
    'lightblue': '#ADD8E6',
    'lightcoral': '#F08080',
    'lightcyan': '#E0FFFF',
    'lightgoldenrodyellow': '#FAFAD2',
    'lightgreen': '#90EE90',
    'lightgray': '#D3D3D3',
    'lightpink': '#FFB6C1',
    'lightsage': '#BCECAC',
    'lightsalmon': '#FFA07A',
    'lightseagreen': '#20B2AA',
    'lightskyblue': '#87CEFA',
    'lightslategray': '#778899',
    'lightsteelblue': '#B0C4DE',
    'lightyellow': '#FFFFE0',
    'lime': '#00FF00',
    'limegreen': '#32CD32',
    'linen': '#FAF0E6',
    'magenta': '#FF00FF',
    'maroon': '#800000',
    'mediumaquamarine': '#66CDAA',
    'mediumblue': '#0000CD',
    'mediumorchid': '#BA55D3',
    'mediumpurple': '#9370DB',
    'mediumseagreen': '#3CB371',
    'mediumslateblue': '#7B68EE',
    'mediumspringgreen': '#00FA9A',
    'mediumturquoise': '#48D1CC',
    'mediumvioletred': '#C71585',
    'midnightblue': '#191970',
    'mintcream': '#F5FFFA',
    'mistyrose': '#FFE4E1',
    'moccasin': '#FFE4B5',
    'navajowhite': '#FFDEAD',
    'navy': '#000080',
    'oldlace': '#FDF5E6',
    'olive': '#808000',
    'olivedrab': '#6B8E23',
    'orange': '#FFA500',
    'orangered': '#FF4500',
    'orchid': '#DA70D6',
    'palegoldenrod': '#EEE8AA',
    'palegreen': '#98FB98',
    'paleturquoise': '#AFEEEE',
    'palevioletred': '#DB7093',
    'papayawhip': '#FFEFD5',
    'peachpuff': '#FFDAB9',
    'peru': '#CD853F',
    'pink': '#FFC0CB',
    'plum': '#DDA0DD',
    'powderblue': '#B0E0E6',
    'purple': '#800080',
    'red': '#FF0000',
    'rosybrown': '#BC8F8F',
    'royalblue': '#4169E1',
    'saddlebrown': '#8B4513',
    'salmon': '#FA8072',
    'sage': '#87AE73',
    'sandybrown': '#FAA460',
    'seagreen': '#2E8B57',
    'seashell': '#FFF5EE',
    'sienna': '#A0522D',
    'silver': '#C0C0C0',
    'skyblue': '#87CEEB',
    'slateblue': '#6A5ACD',
    'slategray': '#708090',
    'snow': '#FFFAFA',
    'springgreen': '#00FF7F',
    'steelblue': '#4682B4',
    'tan': '#D2B48C',
    'teal': '#008080',
    'thistle': '#D8BFD8',
    'tomato': '#FF6347',
    'turquoise': '#40E0D0',
    'violet': '#EE82EE',
    'wheat': '#F5DEB3',
    'white': '#FFFFFF',
    'whitesmoke': '#F5F5F5',
    'yellow': '#FFFF00',
    'yellowgreen': '#9ACD32'
};

jsplotlib.color_to_hex = function (color) {
    // is color a shortcut?
    if (jsplotlib.colors[color])
        color = jsplotlib.colors[color];

    // is inside cnames array?
    if (jsplotlib.cnames[color])
        return jsplotlib.cnames[color];

    // check if it is already a hex value
    if (typeof color == "string") {
        var match = color.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/);
        if (match && match.length === 1)
            return match[0];
    }

    // add rgb colors here
    if (Array.isArray(color) && color.length === 3) {
        return jsplotlib.rgb2hex(color);
    }

    // back to default
    return jsplotlib.cnames[jsplotlib.rc['lines.color']];
};

jsplotlib.get_color = function (cs) {
    return jsplotlib.colors[cs] ? jsplotlib.colors[cs] : jsplotlib.colors.b;
};

/**
 Creates the d3 svg element at the specified dom element with given width and height
**/
jsplotlib.make_chart = function (width, height, insert_container, insert_mode,
    attributes) {
    chart_counter++;
    var DEFAULT_PADDING = 10;
    insert_container = insert_container || "body";

    //width = width - 2 * DEFAULT_PADDING || 500;
    height = 1.4 * (height - 2 * DEFAULT_PADDING) || 400;
    attributes = attributes || {};

    // create id, if not given
    if (!('id' in attributes)) {
        attributes.id = get_chart_id();
    }

    var chart;
    if (!insert_mode) {
        chart = d3.select(insert_container).append('svg');
    } else {
        chart = d3.select(insert_container).insert('svg', insert_mode);
    }

    // set css classes
    chart.attr('class', 'chart');
    chart.attr('width', width);
    chart.attr('height', height);
    chart.attr('chart_count', chart_counter);
    chart.attr('viewBox', '0 0 ' + width + ' ' + height);

    // set additional given attributes
    for (var attribute in attributes) {
        if (attributes.hasOwnProperty(attribute)) {
            chart.attr(attribute, attributes[attribute]);
        }
    }

    $('.chart#' + attributes.id).css("padding", DEFAULT_PADDING + 'px').css("overflow", "visible");
    return chart;
};

/**
 Creates x or y axis and auto scales them
**/
jsplotlib.construct_axis = function () {
    var axis_count = 0;
    return function (parent_graph, x_or_y) {
        var that = {};
        that._id = "axis" + axis_count++;
        that._will_draw_label = false;
        that._will_draw_axis = true;
        that._x_or_y = x_or_y;
        that._size = 5;
        that._show_grid = false;
        that._label_offset = 0;
        that._label_string = "";
        if (x_or_y === "x") {
            that._axis_proportion = 0.08;
            that._label_proportion = 0.06;
        } else if (x_or_y === "y") {
            that._axis_proportion = 0.06;
            that._label_proportion = 0.03;
        } else {
            throw "Invalid axis type (must be x or y): " + this._x_or_y;
        }
        that._proportion = that._axis_proportion;
        that.n_ticks = 4;
        that.set_n_ticks = function (n) {
            this.n_ticks = n;
        };
        that.set_label = function (label_string) {
            this._label_string = label_string;
            this._will_draw_label = true;
            this._proportion = this._axis_proportion + this._label_proportion;
            return this;
        };
        that._turn_off = function () {
            this._will_draw_axis = false;
            return this;
        };
        that._turn_on = function () {
            this._will_draw_axis = true;
            return this;
        };
        that.set_bar_limits = function (minmaxplus) {
            var min = minmaxplus[0];
            var oldmax = minmaxplus[1];
            var plus = minmaxplus[2];
            var newmax;
            if (oldmax instanceof Date) {
                newmax = new Date(oldmax.getTime() + plus);
            } else {
                newmax = oldmax + plus;
            }
            this._set_data_range([min, newmax]);
        };

        that._set_data_range = function (minmax) {
            this._min = minmax[0];
            this._max = minmax[1];
            if (this._min instanceof Date || this._max instanceof Date) {
                this._scale = d3.time.scale();
                this._min = new Date(this._min);
                this._max = new Date(this._max);
            } else {
                this._scale = d3.scale.linear();
            }
            this._domain = [this._min, this._max];
            return this;
        };
        that._set_formatter = function (formatter) {
            this._formatter = formatter;
            return this;
        };
        that.get_scale = function () {
            if (this._x_or_y === "x") {
                this._range = [parent_graph._yaxis._size, parent_graph._chartwidth];
            } else if (this._x_or_y === "y") {
                this._range = [parent_graph._height, parent_graph._title_size];
            }
            this._scale
                .domain(this._domain)
                .range(this._range);
            return this._scale;
        };
        that._init = function (chart) {
            var dimension;
            if (this._will_draw_axis) {
                if (this._x_or_y === "x") {
                    dimension = parent_graph._chartheight;
                } else if (this._x_or_y === "y") {
                    dimension = parent_graph._chartwidth;
                } else {
                    throw "Invalid axis type (must be x or y): " + this._x_or_y;
                }
                this._size = dimension * this._proportion;
                this._label_offset = this._size * this._label_proportion;
            } else {
                this._size = 0;
            }
            return this;
        };
        that._compute_transform_string = function () {
            var offset_h, offset_v;
            var offset_label_h, offset_label_v;
            var label_rotation = "";
            if (this._x_or_y === "x") {
                offset_h = 0;
                offset_v = parent_graph._height;
                offset_label_h = (parent_graph._yaxis._size + parent_graph._chartwidth) /
                    2 - 20;
                offset_label_v = parent_graph._height + this._size - this._label_offset - 20;
                this._writing_mode = "horizontal-tb";
                this._orientation = "bottom";
            } else if (this._x_or_y === "y") {
                offset_h = this._size;
                offset_v = 0;
                offset_label_h = this._label_offset;
                offset_label_v = parent_graph._chartheight / 2 - 50;
                label_rotation = "rotate(90)";
                this._writing_mode = "vertical-rl";
                this._orientation = "left";
            } else {
                throw "Invalid axis type (must be x or y): " + this._x_or_y;
            }
            this._transform_string = "translate(" + offset_h + "," + offset_v +
                ")scale(1,1)";
            this._label_transform_string = "translate(" + offset_label_h + "," +
                offset_label_v + ")" + label_rotation;
        };
        that._draw_axis = function () {
            if (this._will_draw_axis) {
                this._formatter = this._formatter || this.get_scale().tickFormat(this
                    .n_ticks);
                this._compute_transform_string();
                this._axis = d3.svg.axis().scale(this.get_scale()).ticks(this.n_ticks)
                    .orient(this._orientation).tickSubdivide(0).tickFormat(this._formatter);
                if (this._show_grid) {
                    var size = 0;
                    if (this._x_or_y === "x") {
                        size = parent_graph._height - parent_graph._title_size;
                    } else if (this._x_or_y === "y") {
                        size = parent_graph._width;
                    }
                    this._axis = this._axis.tickSize(-size);
                    parent_graph.chart.append("svg:g").attr("id", this._id).attr("class",
                        this._x_or_y + " axis").attr("transform", this._transform_string).call(
                            this._axis).selectAll(".tick line")
                        .attr("stroke-dasharray", "5,5");
                } else {
                    parent_graph.chart.append("svg:g").attr("id", this._id).attr("class",
                        this._x_or_y + " axis").attr("transform", this._transform_string).call(
                            this._axis);
                }
            }
        };
        that._grid = function (b) {
            this._show_grid = b < 0 ? !this._show_grid : b;
        };
        that._draw_label = function () {
            this._compute_transform_string();
            if (this._will_draw_axis && this._will_draw_label) {
                parent_graph.chart.append("svg:g").attr("class", this._x_or_y +
                    " axis_label").attr("transform", this._label_transform_string).append(
                        "text").append("tspan").attr("text-anchor", "top").attr("class",
                            this._x_or_y + " axis_label").attr("writing-mode", this._writing_mode)
                    .text(this._label_string);
            }
        };
        return that;
    };
}();

jsplotlib.parse_marker = function (style) {
    if (!style) return "";
    switch (style) {
        case '.':
            return ".";
        case ',':
            return ",";
        case 'o':
            return "o";
        case 'v':
            return "v";
        case '^':
            return "^";
        case '<':
            return "<";
        case '>':
            return ">";
        case '1':
            return "1";
        case '2':
            return "2";
        case '3':
            return "3";
        case '4':
            return "4";
        case 's':
            return "s";
        case 'p':
            return "x";
        case '*':
            return "x";
        case 'h':
            return "x";
        case 'H':
            return "x";
        case '+':
            return "+";
        case 'x':
            return "x";
        case 'D':
            return "D";
        case 'd':
            return "d";
        case '|':
            return "|";
        case '_':
            return "_";
        default:
            return "";
    }
};

/**
Process a MATLAB style color/line style format string.  Return a
(*linestyle*, *color*) tuple as a result of the processing.  Default
values are ('-', 'b').  Example format strings include:
 
* 'ko': black circles
* '.b': blue dots
* 'r--': red dashed lines
 
.. seealso::
 
  :func:`~matplotlib.Line2D.lineStyles` and
  :func:`~matplotlib.pyplot.colors`
    for all possible styles and color format string.
**/
jsplotlib._process_plot_format = function (fmt) {
    var linestyle = null;
    var marker = null;
    var color = null;

    // Is fmt just a colorspec
    try {
        color = jsplotlib.to_rgb(fmt);
        if (color) {
            return {
                'linestyle': linestyle,
                'marker': marker,
                'color': color
            };
        }
    } catch (e) { 
        console.error(e);
    }

    // handle the multi char special cases and strip them for the string
    if (fmt.search(/--/) >= 0) {
        linestyle = '--';
        fmt = fmt.replace(/--/, '');
    }
    if (fmt.search(/-\./) >= 0) {
        linestyle = '-.';
        fmt = fmt.replace(/-\./, '');
    }
    if (fmt.search(/ /) >= 0) {
        linestyle = '';
        fmt = fmt.replace(/ /, '');
    }

    var i;
    for (i = 0; i < fmt.length; i++) {
        var c = fmt.charAt(i);
        if (jsplotlib.Line2D.lineStyles[c]) {
            if (linestyle) {
                throw new Sk.builtin.ValueError('Illegal format string "' + fmt +
                    '"; two linestyle symbols');
            }
            linestyle = c;
        } else if (jsplotlib.Line2D.lineMarkers[c]) {
            if (marker) {
                throw new Sk.builtin.ValueError('Illegal format string "' + fmt +
                    '"; two marker symbols');
            }
            marker = c;
        } else if (jsplotlib.colors[c]) {
            if (color) {
                throw new Sk.builtin.ValueError('Illegal format string "' + fmt +
                    '"; two color symbols');
            }
            color = c;
        } else {
            throw new Sk.builtin.ValueError('Unrecognized character ' + c +
                ' in format string');
        }
    }

    if (!linestyle && !marker) {
        // use defaults --> rcParams['lines.linestyle']
        linestyle = '-';
    }
    if (!linestyle) {
        linestyle = ' ';
    }
    if (!marker) {
        marker = '';
    }

    return {
        'linestyle': linestyle,
        'marker': marker,
        'color': color
    };
};

/**
 https://github.com/matplotlib/matplotlib/blob/master/lib/matplotlib/colors.py
 http://matplotlib.org/api/colors_api.html
 
  Returns an *RGB* tuple of three floats from 0-1.
 
  *arg* can be an *RGB* or *RGBA* sequence or a string in any of
  several forms:
 
      1) a letter from the set 'rgbcmykw'
      2) a hex color string, like '#00FFFF'
      3) a standard name, like 'aqua'
      4) a string representation of a float, like '0.4',
         indicating gray on a 0-1 scale
 
  if *arg* is *RGBA*, the *A* will simply be discarded.
**/
jsplotlib.to_rgb = function (fmt) {
    if (!fmt) return null;

    var color = null;

    if (typeof fmt == "string") {
        fmt_lower = fmt.toLowerCase();

        if (jsplotlib.colors[fmt_lower])
            return jsplotlib.hex2color(jsplotlib.cnames[jsplotlib.colors[fmt_lower]]);

        // is inside cnames array?
        if (jsplotlib.cnames[fmt_lower])
            return jsplotlib.hex2color(jsplotlib.cnames[fmt_lower]);

        if (fmt_lower.indexOf('#') === 0) {
            return jsplotlib.hex2color(fmt_lower);
        }

        // is it simple grey shade?
        var fl = parseFloat(fmt_lower);
        if (isNaN(fl)) {
            throw new Sk.builtin.ValueError('cannot convert argument to rgb sequence');
        }

        if (fl < 0 || fl > 1) {
            throw new Sk.builtin.ValueError('gray (string) must be in range 0-1');
        }

        return [fl, fl, fl];
    }

    // check if its a color tuple [r,g,b, [a]] with values from [0-1]
    if (Array.isArray(fmt)) {
        if (fmt.length > 4 || fmt.length < 3)
            throw new Sk.builtin.ValueError('sequence length is ' + fmt.length +
                '; must be 3 or 4');

        color = fmt.slice(0, 3);
        var i;

        for (i = 0; i < 3; i++) {
            var fl_rgb = parseFloat(fmt);

            if (fl_rgb < 0 || fl_rgb > 1)
                throw new Sk.builtin.ValueError(
                    'number in rbg sequence outside 0-1 range');
        }
    }

    return color;
};

/**
  Take a hex string *s* and return the corresponding rgb 3-tuple
  Example: #efefef -> (0.93725, 0.93725, 0.93725)
**/
jsplotlib.hex2color = function (s) {
    if (!s || typeof s != "string") {
        throw new Sk.builtin.TypeError("hex2color requires a string argument");
    }
    // check if it is a hex value
    var i;
    var s_copy = s;
    var hex_tuple = [];
    for (i = 0; i < 3; i++) {
        var match = s_copy.match(/(?:[0-9a-fA-F]){1,2}$/);
        if (match && match.length === 1) {
            hex_tuple.push(match[0]);
            s_copy = s_copy.substring(0, match.index);
        }
    }
    //var match = s.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/);
    if (hex_tuple.length === 3) {
        // yeah positiv --> convert into right color spec
        var color = [];
        color[0] = parseInt(hex_tuple[0], 16) / 255.0;
        color[1] = parseInt(hex_tuple[1], 16) / 255.0;
        color[2] = parseInt(hex_tuple[2], 16) / 255.0;

        return color.reverse();
    } else {
        throw new Sk.builtin.ValueError('invalid hex color string "' + s + '"');
    }
};

/**
  Expects and rgb tuple with values [0,1]
**/
jsplotlib.rgb2hex = function (rgb) {
    if (!rgb) return null;

    if (rgb.length && rgb.length >= 3) {
        var i;
        // some hacky code to rebuild string format :(
        var hex_str = '#';
        for (i = 0; i < 3; i++) {
            var val = Math.round(rgb[i] * 255).toString(16);
            hex_str += val.length == 2 ? val : '0' + val;
        }

        return hex_str;
    }
};

jsplotlib.linspace = function (min, max, N) {
    var newscale = d3.scale.linear().domain([1, N]).range([min, max]);
    var data = [];
    for (var i = 1; i <= N; i++) {
        var output = newscale(i);
        if (min instanceof Date) {
            output = new Date(output);
        }
        data.push(output);
    }
    return data;
};

jsplotlib.range = function (N) {
    var l = [];
    for (var i = 0; i < N; i++) {
        l.push(i);
    }
    return l;
};

jsplotlib.ones = function (N) {
    var l = [];
    for (var i = 0; i < N; i++) {
        l.push(1);
    }
    return l;
};

var $builtinmodule = function (name) {
    var mod = {};
    var import_modules = Object.create(null);
    return Sk.misceval.chain(
        Sk.importModule("numpy", false, true),
        (numpy_mod) => {
            import_modules.numpy = numpy_mod.$d;
        },
        () => matplotlib_pyplot_mod(mod, import_modules)
    );
}

function matplotlib_pyplot_mod(mod, import_module) {
    var chart;
    var plot; // TODO, we should support multiple lines here
    let plots = [];

    // import numpy
    var CLASS_NDARRAY = "numpy.ndarray"; // maybe make identifier accessible in numpy module
    const np = import_module.numpy;
    // var ndarray_f = np.array.func_code;
    // var getitem_f = np[CLASS_NDARRAY]['__getitem__'].func_code;
    // var ndarray = Sk.misceval.callsim(np['$d'].array.func_code, new Sk.builtin.list([1,2,3,4]));

    var create_chart = function () {
        /* test if Canvas ist available should be moved to create_chart function */
        if (Sk.canvas === undefined) {
            throw new Sk.builtin.NameError(
                "Can not resolve drawing area. Sk.canvas is undefined!");
        }

        if ($('#' + Sk.canvas).length === 0) {
            throw new Sk.builtin.OperationError("No canvas found (internal error)");
        }

        if (!chart) {
            $('#' + Sk.canvas).empty();
            // min height and width
            chart = jsplotlib.make_chart(400, 200, "#" + Sk.canvas);
        }
    };

    var plot_f = function (kwa) {
        // http://matplotlib.org/api/pyplot_api.html
        // http://matplotlib.org/api/artist_api.html#matplotlib.lines.Line2D
        //debugger;
        Sk.builtin.pyCheckArgs("plotk", arguments, 1, Infinity, true, false);
        args = Array.prototype.slice.call(arguments, 1);
        kwargs = new Sk.builtins.dict(kwa); // is pretty useless for handling kwargs
        kwargs = Sk.ffi.remapToJs(kwargs); // create a proper dict

        // try parsing plot args
        // possible xdata, ydata, stylestring
        // or x1, y1, stylestring1, x2, y2, stylestring2
        // or ydata, stylestring
        /*
          plot(x, y)        # plot x and y using default line style and color
          plot(x, y, 'bo')  # plot x and y using blue circle markers
          plot(y)           # plot y using x as index array 0..N-1
          plot(y, 'r+')     # ditto, but with red plusses
        */

        // variable definitions for args
        var xdata = []; // actually x and y data may contain multiple lines
        var ydata = [];
        var stylestring = []; // we support only one at the moment
        var i = 0;
        var lines = 0;
        var xdata_not_ydata_flag = true;
        var slice = new Sk.builtin.slice(0, undefined, 1); // getting complete first dimension of ndarray

        for (i = 0; i < args.length; i++) {
            if (args[i] instanceof Sk.builtin.list || Sk.abstr.typeName(args[i]) === CLASS_NDARRAY) {
                // special treatment for ndarrays, though we allow basic lists too
                var _unpacked;
                if (Sk.abstr.typeName(args[i]) === CLASS_NDARRAY) {
                    // we get the first dimension, no 2-dim data
                    _unpacked = Sk.ffi.unwrapn(args[i]);
                    var first_dim_size = 0;
                    if (_unpacked && _unpacked.shape && _unpacked.shape[0]) {
                        first_dim_size = _unpacked.shape[0];
                    } else {
                        throw new Sk.builtin.ValueError('args contain "' + CLASS_NDARRAY + '" without elements or malformed shape.');
                    }
                    _unpacked = _unpacked.buffer.slice(0, first_dim_size); // buffer array of first dimension
                    _unpacked = _unpacked.map(function (x) { return Sk.ffi.remapToJs(x); })
                } else {
                    _unpacked = Sk.ffi.remapToJs(args[i]);
                }

                // unwraps x and y, but no 2-dim-data
                if (xdata_not_ydata_flag) {
                    xdata.push(_unpacked);
                    xdata_not_ydata_flag = false;
                } else {
                    ydata.push(_unpacked);
                    xdata_not_ydata_flag = true;
                }
            } else if (Sk.builtin.checkString(args[i])) {
                stylestring.push(Sk.ffi.remapToJs(args[i]));
            } else if (Sk.builtin.checkNumber(args[i])) {
                _unpacked = Sk.ffi.remapToJs(args[i]);
                var tempArray = [];
                tempArray.push(_unpacked);
                /**
                 * Why do we need to push an single item array?
                 *
                 * Each Line is represented as an array of x values and an array of y values
                 * so just calling plot with (x, y, fmt) would result in Line2D([x], [y], fmt)
                 */
                if (xdata_not_ydata_flag) {
                    xdata.push(tempArray);
                    xdata_not_ydata_flag = false;
                } else {
                    ydata.push(tempArray);
                    xdata_not_ydata_flag = true;
                }
            } else {
                throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(args[i]) +
                    "' is not supported for *args[" + i + "].");
            }
        }

        /* handle special cases
          only supplied y
          only supplied 1 array and stylestring
        */
        if ((args.length === 1) || (args.length === 2 && (xdata.length === 1 &&
            ydata.length === 0))) {
            // only y supplied
            xdata.forEach(function (element) {
                ydata.push(element);
            });
            xdata[0] = [];
        }

        // empty canvas from previous plots
        create_chart();
        // create new plot instance, should be replaced with Line2D and then added to the plot
        if (!plot) {
            plot = jsplotlib.plot(chart);
        }

        // create line objects
        var line;

        if (xdata.length === 1 && ydata.length === 1 && stylestring.length === 0) {
            // handle case for plot(x, y)
            line = new jsplotlib.Line2D(xdata[0], ydata[0]);
            line.update(kwargs);
            plot.add_line(line);
        } else if (xdata.length === ydata.length && xdata.length === stylestring.length) {
            for (i = 0; i < xdata.length; i++) {
                line = new jsplotlib.Line2D(xdata[i], ydata[i]);
                var ftm_tuple = jsplotlib._process_plot_format(stylestring[i]);
                line.update({
                    'linestyle': ftm_tuple.linestyle,
                    'marker': jsplotlib.parse_marker(ftm_tuple.marker),
                    'color': ftm_tuple.color
                });
                line.update(kwargs);
                plot.add_line(line);
            }
        } else {
            throw new Sk.builtin.ValueError('Cannot parse given combination of "*args"!');
        }

        // set kwargs that apply for all lines
        //plot.update(kwargs);

        // result
        var result = [];

        return new Sk.builtins.tuple(result);
    };
    plot_f.co_kwargs = true;
    mod.plot = new Sk.builtin.func(plot_f);

    let subplot_f = function (rows, cols, index) {
        //index, cols, rows
        Sk.builtin.pyCheckArgs("subplot", arguments, 1, 3);

        if (rows.v === null || !Sk.builtin.checkInt(rows)) {
            throw new Sk.builtin.ValueError("Error 1");
        } else {
            rows = Sk.ffi.remapToJs(rows);
        }

        if (cols !== undefined && cols !== null) {
            if (!Sk.builtin.checkInt(cols)) {
                throw new Sk.builtin.ValueError("Error 2");
            } else {
                cols = Sk.ffi.remapToJs(cols);
            }
        } else {
            cols = null;
        }

        if (index !== undefined && index !== null) {
            if (!Sk.builtin.checkInt(cols)) {
                throw new Sk.builtin.ValueError("Error 3");
            } else {
                index = Sk.ffi.remapToJs(index);
            }
        } else {
            index = null;
        }

        if (index === null && cols == null) {
            //one number
            if (rows > 999 || rows < 111) {
                throw new Sk.builtin.ValueError("Error 4");
            } else {
                index = parseInt(rows.toString()[2]);
                cols = parseInt(rows.toString()[1]);
                rows = parseInt(rows.toString()[0]);
            }
        } else {
            if (index === null || index > 9 || index < 1) {
                throw new Sk.builtin.ValueError("Error 5");
            } else if (cols === null || cols > 9 || cols < 1) {
                throw new Sk.builtin.ValueError("Error 6");
            } else if (rows > 9 || rows < 1) {
                throw new Sk.builtin.ValueError("Error 7");
            }
        }

        if (index > (cols * rows)) {
            throw new Sk.builtin.ValueError("Error 8");
        }

        create_chart();
        if (!plot) {
            plot = jsplotlib.plot(chart, rows, cols, index);
        } else {
            if (plot._subplot_h !== null) {
                plots.push(plot);
            }
            plot = jsplotlib.plot(chart, rows, cols, index);
        }
    };
    mod.subplot = new Sk.builtin.func(subplot_f);

    var show_f = function () {
        // call drawing routine
        if (plot && plot.draw) {
            plot.erase_charts(); //remove all charts in SVG div
            plots.push(plot);
            for (let i = 0; i < plots.length; i++) {
                plots[i].draw(i);
            }
        } else {
            throw new Sk.builtin.ValueError("Can not call show without any plot created.");
        }

        var $div_canvas = $('#' + Sk.canvas);
        $div_canvas.show();

        //saveSvgAsPng(document.querySelector('#' + Sk.canvas + " svg"), "plot.png");

        // add automatically a download link for the picture
        /*
        debugger;
        var svg = document.querySelector('#' + Sk.canvas + " svg");
        var svgData = new XMLSerializer().serializeToString( svg );
    
        var canvas = document.createElement("canvas");
        var svgSize = svg.getBBox != null ? svg.getBBox() : svg.getBoundingClientRect();
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
    
        canvas.width = $div_canvas.width();
        canvas.height = $div_canvas.height();
    
        var ctx = canvas.getContext("2d");
        var img = document.createElement("img");
        img.setAttribute("src", "data:image/svg+xml;base64," + btoa( svgData ));
    
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
    
            // Now is done
            var canvasdata = canvas.toDataURL("image/png" );
            var a = document.createElement("a");
            a.download = "plot_"+Date.now()+".png";
            a.href = canvasdata;
            document.body.appendChild(a);
            a.click();
        };
        */
    };
    mod.show = new Sk.builtin.func(show_f);

    var title_f = function (label, fontdict, loc) {
        Sk.builtin.pyCheckArgs("title", arguments, 1, 3);

        if (!Sk.builtin.checkString(label)) {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(label) +
                "' is not supported for title.");
        }

        var label_unwrap = Sk.ffi.remapToJs(label);

        create_chart();
        // create new plot instance, should be replaced with Line2D and then added to the plot
        if (!plot) {
            plot = jsplotlib.plot(chart);
        }

        if (plot && plot.title) {
            plot.title(label_unwrap);
        }

        return new Sk.builtin.str(label_unwrap);
    };

    title_f.co_varnames = ['label', 'fontdict', 'loc',];
    title_f.$defaults = [null, Sk.builtin.none.none$, Sk.builtin.none.none$,
        Sk.builtin.none.none$
    ];
    mod.title = new Sk.builtin.func(title_f);

    // axis function
    var axis_f = function (v) {
        Sk.builtin.pyCheckArgs("axis", arguments, 0, 1, false);

        var lim = null;

        // when called without any arguments it should return the current axis limits
        if (arguments.length <= 0) {
            lim = (plot ? plot._get_xlim() : [0, 1]);
            lim = lim.concat(plot ? plot._get_ylim() : [0, 1]);
            return new Sk.builtins.tuple(lim);
        }

        // >>> axis(v)
        // sets the min and max of the x and y axes, with
        // ``v = [xmin, xmax, ymin, ymax]``.::
        if (Sk.builtin.checkSequence(v)) {
            lim = Sk.ffi.remapToJs(v);
        } else if (Sk.builtin.checkString(v)) {
            var info = Sk.ffi.remapToJs(v);
        } else {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(v) + "' is not supported for v.");
        }

        create_chart();
        if (!plot) {
            plot = jsplotlib.plot(chart);
        }
        if (plot && plot._axes && lim !== null) {
            plot._set_xlim([lim[0], lim[1]]);
            plot._set_ylim([lim[2], lim[3]]);
        }

        //The xmin, xmax, ymin, ymax tuple is returned
        return new Sk.builtins.tuple(lim);
    };

    axis_f.co_varnames = ['v'];
    axis_f.$defaults = [Sk.builtin.none.none$];
    mod.axis = new Sk.builtin.func(axis_f);

    var xlabel_f = function (s, fontdict, loc) {
        Sk.builtin.pyCheckArgs("xlabel", arguments, 1, 3);

        if (!Sk.builtin.checkString(s)) {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(s) +
                "' is not supported for s.");
        }

        create_chart();
        // create new plot instance, should be replaced with Line2D and then added to the plot
        if (!plot) {
            plot = jsplotlib.plot(chart);
        }

        if (plot && plot.xlabel) {
            plot.xlabel(Sk.ffi.remapToJs(s));
        }
    };

    xlabel_f.co_varnames = ['s', 'fontdict', 'loc',];
    xlabel_f.$defaults = [null, Sk.builtin.none.none$, Sk.builtin.none.none$,
        Sk.builtin.none.none$
    ];
    mod.xlabel = new Sk.builtin.func(xlabel_f);

    var ylabel_f = function (s, fontdict, loc) {
        Sk.builtin.pyCheckArgs("ylabel", arguments, 1, 3);

        if (!Sk.builtin.checkString(s)) {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(s) +
                "' is not supported for s.");
        }

        create_chart();
        // create new plot instance, should be replaced with Line2D and then added to the plot
        if (!plot) {
            plot = jsplotlib.plot(chart);
        }

        if (plot && plot.ylabel) {
            plot.ylabel(Sk.ffi.remapToJs(s));
        }
    };

    ylabel_f.co_varnames = ['s', 'fontdict', 'loc',];
    ylabel_f.$defaults = [null, Sk.builtin.none.none$, Sk.builtin.none.none$,
        Sk.builtin.none.none$
    ];
    mod.ylabel = new Sk.builtin.func(ylabel_f);

    // Clear the current figure
    var clf_f = function () {
        // clear all
        chart = null;
        plot = null;

        if (Sk.canvas !== undefined) {
            $('#' + Sk.canvas).empty();
        }
    };

    mod.clf = new Sk.builtin.func(clf_f);

    // xlim function
    var xlim_f = function (s, e) {
        Sk.builtin.pyCheckArgs("xlim", arguments, 0, 2, false);

        if (arguments.length <= 0)
            return new Sk.builtins.tuple(plot ? plot._get_xlim() : [0, 1]);

        if (Sk.builtin.checkSequence(s)) {
            lim = Sk.ffi.remapToJs(s);
        } else if (Sk.builtin.checkNumber(s)) {
            if (Sk.builtin.checkNumber(e)) {
                lim = [Sk.ffi.remapToJs(s), Sk.ffi.remapToJs(e)];
            } else {
                throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(e) + "' is not supported for e.");
            }
        } else {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(s) + "' is not supported for s.");
        }
        if (lim[0] > lim[1]) { lim = [lim[1], lim[0]]; }

        create_chart();
        if (!plot) {
            plot = jsplotlib.plot(chart);
        }
        if (plot) {
            plot._set_xlim(lim);
        }
    };

    xlim_f.co_varnames = ['s', 'e'];
    xlim_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$];
    mod.xlim = new Sk.builtin.func(xlim_f);

    // ylim function
    var ylim_f = function (s, e) {
        Sk.builtin.pyCheckArgs("ylim", arguments, 0, 2, false);

        if (arguments.length <= 0)
            return new Sk.builtins.tuple(plot ? plot._get_ylim() : [0, 1]);

        if (Sk.builtin.checkSequence(s)) {
            lim = Sk.ffi.remapToJs(s);
        } else if (Sk.builtin.checkNumber(s)) {
            if (Sk.builtin.checkNumber(e)) {
                lim = [Sk.ffi.remapToJs(s), Sk.ffi.remapToJs(e)];
            } else {
                throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(e) + "' is not supported for e.");
            }
        } else {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(s) + "' is not supported for s.");
        }
        if (lim[0] > lim[1]) { lim = [lim[1], lim[0]]; }

        create_chart();
        if (!plot) {
            plot = jsplotlib.plot(chart);
        }
        if (plot) {
            plot._set_ylim(lim);
        }
    };

    ylim_f.co_varnames = ['s', 'e'];
    ylim_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$];
    mod.ylim = new Sk.builtin.func(ylim_f);

    // grid function
    var grid_f = function (b, axis, which) {
        Sk.builtin.pyCheckArgs("grid", arguments, 0, 3, false, false);

        if (which.v != null && !Sk.builtin.checkNone(which)) {
            throw new Sk.builtin.NotImplementedError("the 'which' parameter is currently not supported");
        }

        if (axis.v !== null) {
            if (!Sk.builtin.checkString(axis)) {
                throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(axis) + "' is not supported for axis.");
            } else {
                axis = Sk.ffi.remapToJs(axis);
            }
        } else {
            axis = "both";
        }

        if (axis !== "both" && axis !== "x" && axis !== "y") {
            throw new Sk.builtin.ValueError("axis: must be 'both' (default), 'x' or 'y'");
        }

        if (b.v !== null) {
            if (!Sk.builtin.checkBool(b)) {
                throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(b) + "' is not supported for b.");
            } else {
                b = Sk.ffi.remapToJs(b) ? 1 : 0;
            }
        } else {
            b = -1;
        }

        create_chart();
        if (!plot) {
            plot = jsplotlib.plot(chart);
        }
        if (plot) {
            if (axis === "both" || axis === "x")
                plot.xgrid(b);
            if (axis === "both" || axis === "y")
                plot.ygrid(b);
        }
    };

    grid_f.co_varnames = ["b", "axis", "which"];
    grid_f.$defaults = [Sk.builtin.bool.true$, Sk.builtin.none.none$, Sk.builtin.none.none$];
    mod.grid = new Sk.builtin.func(grid_f);

    // bar function
    var bar_f = function (left, height, width, color, edgecolor, align, bottom, alpha, label) {
        Sk.builtin.pyCheckArgs("bar", arguments, 0, 9, false);

        if (Sk.builtin.checkNone(left)) {
            throw new Sk.builtin.ValueError("missing 1 required positional argument: 'left'");
        }

        if (Sk.builtin.checkNone(height)) {
            throw new Sk.builtin.ValueError("missing 1 required positional argument: 'height'");
        }

        if (!Sk.builtin.checkString(color)) {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(color) + "' is not supported for color.");
        } else {
            color = Sk.ffi.remapToJs(color);
        }

        if (!Sk.builtin.checkString(edgecolor)) {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(edgecolor) + "' is not supported for edgecolor.");
        } else {
            edgecolor = Sk.ffi.remapToJs(edgecolor);
        }

        if (!Sk.builtin.checkNumber(alpha)) {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(alpha) + "' is not supported for alpha.");
        } else {
            alpha = Sk.ffi.remapToJs(alpha);
        }

        if (!Sk.builtin.checkString(align)) {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(align) + "' is not supported for align.");
        } else {
            align = Sk.ffi.remapToJs(align);
        }

        if (align != "edge" && align != "center") {
            throw new Sk.builtin.ValueError("align: must be 'edge', 'center' (default)");
        }

        if (bottom.v != null && !Sk.builtin.checkNone(bottom)) {
            throw new Sk.builtin.NotImplementedError("the 'bottom' parameter is currently not supported");
        }

        if (!Sk.builtin.checkString(label) && !Sk.builtin.checkNumber(label) && !Sk.builtin.checkNone(label)) {
            throw new Sk.builtin.ValueError("the 'label' parameter must be a string or integer.");
        }
        label = Sk.ffi.remapToJs(label);

        if (Sk.builtin.checkSequence(left)) {
            if (Sk.abstr.typeName(left) === CLASS_NDARRAY) {
                const data = Sk.ffi.unwrapn(left);
                var dim = 0;
                if (data && data.shape && data.shape[0]) {
                    dim = data.shape[0];
                } else {
                    throw new Sk.builtin.ValueError('left contain "' + CLASS_NDARRAY + '" without elements or malformed shape.');
                }
                left = data.buffer.slice(0, dim).map(function (x) { return Sk.ffi.remapToJs(x); });
            } else {
                left = Sk.ffi.remapToJs(left);
            }
        } else {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(left) + "' is not supported for left.");
        }

        if (Sk.builtin.checkSequence(height)) {
            if (Sk.abstr.typeName(height) === CLASS_NDARRAY) {
                const data = Sk.ffi.unwrapn(height);
                var dim = 0;
                if (data && data.shape && data.shape[0]) {
                    dim = data.shape[0];
                } else {
                    throw new Sk.builtin.ValueError('height contain "' + CLASS_NDARRAY + '" without elements or malformed shape.');
                }
                height = data.buffer.slice(0, dim).map(function (x) { return Sk.ffi.remapToJs(x); });
            } else {
                height = Sk.ffi.remapToJs(height);
            }
        } else {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(height) + "' is not supported for height.");
        }

        if (Sk.builtin.checkNumber(width)) {
            width = Sk.ffi.remapToJs(width);
        } else if (Sk.builtin.checkSequence(width)) {
            if (Sk.abstr.typeName(width) === CLASS_NDARRAY) {
                const data = Sk.ffi.unwrapn(width);
                var dim = 0;
                if (data && data.shape && data.shape[0]) {
                    dim = data.shape[0];
                } else {
                    throw new Sk.builtin.ValueError('width contain "' + CLASS_NDARRAY + '" without elements or malformed shape.');
                }
                width = data.buffer.slice(0, dim).map(function (x) { return Sk.ffi.remapToJs(x); });
            } else {
                width = Sk.ffi.remapToJs(width);
            }
        } else {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(width) + "' is not supported for width.");
        }

        create_chart();
        if (!plot) {
            plot = jsplotlib.plot(chart);
        }
        if (plot) {
            bar = new jsplotlib.Line2D(left, height);
            bar.update({
                "graphtype": "bar",
                "barwidth": width,
                "color": color,
                "markeredgecolor": edgecolor,
                "drawstyle": align,
                "alpha": alpha,
                "label": label
            });
            plot.add_bar(bar);
        }
    };

    bar_f.co_varnames = ["left", "height", "width", "color", "edgecolor", "align", "bottom", "alpha", "label"];
    bar_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$, new Sk.builtin.float_(0.8),
    new Sk.builtin.str("blue"), new Sk.builtin.str("black"), new Sk.builtin.str("center"),
    Sk.builtin.none.none$, new Sk.builtin.float_(1.0), Sk.builtin.none.none$];
    mod.bar = new Sk.builtin.func(bar_f);

    // hist function
    var hist_f = function (x, bins, normed, color, edgecolor, align, alpha, label) {
        Sk.builtin.pyCheckArgs("hist", arguments, 0, 8, false);

        if (x.v === null || Sk.builtin.checkNone(x)) {
            throw new Sk.builtin.ValueError("missing 1 required positional argument: 'x'");
        }

        if (bins.v !== null) {
            if (!Sk.builtin.checkNumber(bins)) {
                throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(bins) + "' is not supported for 'bins'.");
            } else {
                bins = Sk.ffi.remapToJs(bins);
            }
        } else {
            bins = 10;
        }

        if (normed.v !== null) {
            if (!Sk.builtin.checkBool(normed)) {
                throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(normed) + "' is not supported for 'normed'.");
            } else {
                normed = Sk.ffi.remapToJs(normed);
            }
        } else {
            normed = false;
        }

        if (color.v !== null) {
            if (!Sk.builtin.checkString(color)) {
                throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(color) + "' is not supported for 'color'.");
            } else {
                color = Sk.ffi.remapToJs(color);
            }
        } else {
            color = "blue";
        }

        if (edgecolor.v !== null) {
            if (!Sk.builtin.checkString(edgecolor)) {
                throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(edgecolor) + "' is not supported for 'edgecolor'.");
            } else {
                edgecolor = Sk.ffi.remapToJs(edgecolor);
            }
        } else {
            edgecolor = "black";
        }

        if (alpha.v !== null) {
            if (!Sk.builtin.checkNumber(alpha)) {
                throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(alpha) + "' is not supported for alpha.");
            } else {
                alpha = Sk.ffi.remapToJs(alpha);
            }
        } else {
            alpha = 1.0;
        }

        if (align.v !== null) {
            if (!Sk.builtin.checkString(align)) {
                throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(align) + "' is not supported for align.");
            } else {
                align = Sk.ffi.remapToJs(align);
            }
        } else {
            align = "center";
        }
        if (align != "edge" && align != "center") {
            throw new Sk.builtin.ValueError("align: must be 'edge', 'center' (default)");
        }

        if (label.v != null) {
            if (!Sk.builtin.checkString(label) && !Sk.builtin.checkNumber(label)) {
                throw new Sk.builtin.ValueError("the 'label' parameter must be a string or integer.");
            }
            label = Sk.ffi.remapToJs(label);
        } else {
            label = null;
        }

        if (Sk.builtin.checkSequence(x)) {
            x = Sk.ffi.remapToJs(x);
        } else if (Sk.abstr.typeName(x) === CLASS_NDARRAY) {
            var data = Sk.ffi.unwrapn(x);
            var dim = 0;
            if (data && data.shape && data.shape[0]) {
                dim = data.shape[0];
            } else {
                throw new Sk.builtin.ValueError('x contain "' + CLASS_NDARRAY + '" without elements or malformed shape.');
            }
            x = data.buffer.slice(0, dim).map(function (t) { return Sk.ffi.remapToJs(t); });
        } else {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(x) + "' is not supported for 'x'.");
        }

        create_chart();
        if (!plot) {
            plot = jsplotlib.plot(chart);
        }
        if (plot) {
            hist = new jsplotlib.Line2D(x);
            hist.update({
                "graphtype": "hist",
                "histbins": bins,
                "normed": normed,
                "color": color,
                "markeredgecolor": edgecolor,
                "drawstyle": align,
                "alpha": alpha,
                "label": label
            });
            plot.add_hist(hist);
        }
        return Sk.ffi.remapToPy([hist._y, hist._x, null]);
    };

    hist_f.co_varnames = ["x", "bins", "normed", "color", "edgecolor", "align", "alpha", "label"];
    hist_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.none.none$,
    Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.none.none$,
    Sk.builtin.none.none$, Sk.builtin.none.none$];
    mod.hist = new Sk.builtin.func(hist_f);

    // scatter function
    var scatter_f = function (x, y, s, c, color, alpha, label) {
        Sk.builtin.pyCheckArgs("scatter", arguments, 0, 7, false);

        if (x.v === null || Sk.builtin.checkNone(x)) {
            throw new Sk.builtin.ValueError("missing 1 required positional argument: 'x'");
        }

        if (y.v === null || Sk.builtin.checkNone(y)) {
            throw new Sk.builtin.ValueError("missing 1 required positional argument: 'y'");
        }

        if (c.v !== null && !Sk.builtin.checkString(c)) {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(c) + "' is not supported for c.");
        }
        c = Sk.ffi.remapToJs(c);

        if (color.v !== null && !Sk.builtin.checkString(color)) {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(color) + "' is not supported for color.");
        }
        color = Sk.ffi.remapToJs(color);

        if (alpha.v != null && !Sk.builtin.checkNumber(alpha)) {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(alpha) + "' is not supported for alpha.");
        }
        alpha = Sk.ffi.remapToJs(alpha);

        if (!Sk.builtin.checkString(label) && !Sk.builtin.checkNumber(label) && !Sk.builtin.checkNone(label)) {
            throw new Sk.builtin.ValueError("the 'label' parameter must be a string or integer.");
        }
        label = Sk.ffi.remapToJs(label);

        if (Sk.builtin.checkSequence(x)) {
            if (Sk.abstr.typeName(x) === CLASS_NDARRAY) {
                const data = Sk.ffi.unwrapn(x);
                var dim = 0;
                if (data && data.shape && data.shape[0]) {
                    dim = data.shape[0];
                } else {
                    throw new Sk.builtin.ValueError('x contain "' + CLASS_NDARRAY + '" without elements or malformed shape.');
                }
                x = data.buffer.slice(0, dim).map(function (t) { return Sk.ffi.remapToJs(t); });
            } else {
                x = Sk.ffi.remapToJs(x);
            }
        } else {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(x) + "' is not supported for x.");
        }

        if (Sk.builtin.checkSequence(y)) {
            if (Sk.abstr.typeName(y) === CLASS_NDARRAY) {
                const data = Sk.ffi.unwrapn(y);
                var dim = 0;
                if (data && data.shape && data.shape[0]) {
                    dim = data.shape[0];
                } else {
                    throw new Sk.builtin.ValueError('y contain "' + CLASS_NDARRAY + '" without elements or malformed shape.');
                }
                y = data.buffer.slice(0, dim).map(function (t) { return Sk.ffi.remapToJs(t); });
            } else {
                y = Sk.ffi.remapToJs(y);
            }
        } else {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(y) + "' is not supported for y.");
        }

        if (Sk.builtin.checkNumber(s)) {
            s = Sk.ffi.remapToJs(s);
        } else if (Sk.builtin.checkSequence(s)) {
            if (Sk.abstr.typeName(s) === CLASS_NDARRAY) {
                const data = Sk.ffi.unwrapn(s);
                var dim = 0;
                if (data && data.shape && data.shape[0]) {
                    dim = data.shape[0];
                } else {
                    throw new Sk.builtin.ValueError('s contain "' + CLASS_NDARRAY + '" without elements or malformed shape.');
                }
                s = data.buffer.slice(0, dim).map(function (t) { return Sk.ffi.remapToJs(t); });
            } else {
                s = Sk.ffi.remapToJs(s);
            }
        } else {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(s) + "' is not supported for s.");
        }

        create_chart();
        if (!plot) {
            plot = jsplotlib.plot(chart);
        }
        if (plot) {
            scatter = new jsplotlib.Line2D(x, y);
            scatter.update({
                "graphtype": "scatter",
                "color": color,
                "linestyle": "",
                "marker": "s",
                "markersize": s,
                "markeredgecolor": c,
                "alpha": alpha,
                "label": label
            });
            plot.add_scatter(scatter);
        }
    };

    scatter_f.co_varnames = ["x", "y", "s", "c", "color", "alpha", "label"];
    scatter_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$, new Sk.builtin.float_(20.0),
    new Sk.builtin.str("blue"), new Sk.builtin.str("black"), new Sk.builtin.float_(1.0),
    Sk.builtin.none.none$];
    mod.scatter = new Sk.builtin.func(scatter_f);

    // text function
    var text_f = function (x, y, s, color, fontsize) {
        Sk.builtin.pyCheckArgs("text", arguments, 3, 5, false);

        if (x.v === null || Sk.builtin.checkNone(x)) {
            throw new Sk.builtin.ValueError("missing 1 required positional argument: 'x'");
        }
        if (Sk.builtin.checkNumber(x)) {
            x = Sk.ffi.remapToJs(x);
        } else {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(x) + "' is not supported for x.");
        }
        if (y.v === null || Sk.builtin.checkNone(y)) {
            throw new Sk.builtin.ValueError("missing 1 required positional argument: 'y'");
        }
        if (Sk.builtin.checkNumber(y)) {
            y = Sk.ffi.remapToJs(y);
        } else {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(y) + "' is not supported for y.");
        }
        if (s.v === null || Sk.builtin.checkNone(s)) {
            throw new Sk.builtin.ValueError("missing 1 required positional argument: 's'");
        }
        if (Sk.builtin.checkString(s)) {
            s = Sk.ffi.remapToJs(s);
        } else {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(s) + "' is not supported for s.");
        }
        if (color.v !== null && !Sk.builtin.checkString(color)) {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(color) + "' is not supported for 'color'.");
        }
        if (color.v !== null) {
            color = Sk.ffi.remapToJs(color);
        } else {
            color = "black";
        }
        if (fontsize.v !== null && !Sk.builtin.checkNumber(fontsize)) {
            throw new Sk.builtin.TypeError("'" + Sk.abstr.typeName(fontsize) + "' is not supported for 'fontsize'.");
        }
        if (fontsize.v !== null) {
            fontsize = Sk.ffi.remapToJs(fontsize);
        } else {
            fontsize = 10;
        }

        create_chart();
        if (!plot) {
            plot = jsplotlib.plot(chart);
        }
        if (plot) {
            text = new jsplotlib.Line2D([x], [y]);
            text.update({
                "graphtype": "text",
                "text": [s],
                "color": color,
                "fontsize": fontsize
            });
            plot.add_text(text);
        }
    };

    text_f.co_varnames = ["x", "y", "s", "color", "fontsize"];
    text_f.$defaults = [Sk.builtin.none.none$, Sk.builtin.none.none$, Sk.builtin.none.none$,
    Sk.builtin.none.none$, Sk.builtin.none.none$];
    mod.text = new Sk.builtin.func(text_f);

    //legend function
    var legend_f = function (loc) {
        Sk.builtin.pyCheckArgs("legend", arguments, 0, 1, false);

        if (loc.v !== null) {
            if (!Sk.builtin.checkString(loc)) {
                throw new Sk.builtin.TypeError("loc must be a string.");
            } else {
                if (jsplotlib.position.indexOf(loc.v) === -1)
                    throw new Sk.builtin.TypeError("this value of loc is invalid");
                else
                    loc = Sk.ffi.remapToJs(loc);
            }
        } else {
            loc = "upper center";
        }

        create_chart();
        if (!plot) {
            plot = jsplotlib.plot(chart);
        }
        if (plot) {
            plot.add_legend(loc);
        }
    };

    legend_f.co_varnames = ["loc"];
    legend_f.$defaults = [Sk.builtin.none.none$];
    mod.legend = new Sk.builtin.func(legend_f);


    /* list of not implemented methods */
    mod.findobj = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "findobj is not yet implemented");
    });
    mod.switch_backend = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "switch_backend is not yet implemented");
    });
    mod.isinteractive = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "isinteractive is not yet implemented");
    });
    mod.ioff = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "ioff is not yet implemented");
    });
    mod.ion = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("ion is not yet implemented");
    });
    mod.pause = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "pause is not yet implemented");
    });
    mod.rc = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("rc is not yet implemented");
    });
    mod.rc_context = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "rc_context is not yet implemented");
    });
    mod.rcdefaults = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "rcdefaults is not yet implemented");
    });
    mod.gci = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("gci is not yet implemented");
    });
    mod.sci = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("sci is not yet implemented");
    });
    mod.xkcd = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "xkcd is not yet implemented");
    });
    mod.figure = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "figure is not yet implemented");
    });
    mod.gcf = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("gcf is not yet implemented");
    });
    mod.get_fignums = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "get_fignums is not yet implemented");
    });
    mod.get_figlabels = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "get_figlabels is not yet implemented");
    });
    mod.get_current_fig_manager = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "get_current_fig_manager is not yet implemented");
    });
    mod.connect = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "connect is not yet implemented");
    });
    mod.disconnect = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "disconnect is not yet implemented");
    });
    mod.close = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "close is not yet implemented");
    });
    mod.savefig = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "savefig is not yet implemented");
    });
    mod.ginput = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "ginput is not yet implemented");
    });
    mod.waitforbuttonpress = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "waitforbuttonpress is not yet implemented");
    });
    mod.figtext = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "figtext is not yet implemented");
    });
    mod.suptitle = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "suptitle is not yet implemented");
    });
    mod.figimage = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "figimage is not yet implemented");
    });
    mod.figlegend = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "figlegend is not yet implemented");
    });
    mod.hold = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "hold is not yet implemented");
    });
    mod.ishold = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "ishold is not yet implemented");
    });
    mod.over = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "over is not yet implemented");
    });
    mod.delaxes = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "delaxes is not yet implemented");
    });
    mod.sca = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("sca is not yet implemented");
    });
    mod.gca = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("gca is not yet implemented");
    });
    /*
    mod.subplot = new Sk.builtin.func(function() {
      throw new Sk.builtin.NotImplementedError(
        "subplot is not yet implemented");
    });
  
     */
    mod.subplots = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "subplots is not yet implemented");
    });
    mod.subplot2grid = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "subplot2grid is not yet implemented");
    });
    mod.twinx = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "twinx is not yet implemented");
    });
    mod.twiny = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "twiny is not yet implemented");
    });
    mod.subplots_adjust = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "subplots_adjust is not yet implemented");
    });
    mod.subplot_tool = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "subplot_tool is not yet implemented");
    });
    mod.tight_layout = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "tight_layout is not yet implemented");
    });
    mod.box = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("box is not yet implemented");
    });
    mod.xscale = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "xscale is not yet implemented");
    });
    mod.yscale = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "yscale is not yet implemented");
    });
    mod.xticks = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "xticks is not yet implemented");
    });
    mod.yticks = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "yticks is not yet implemented");
    });
    mod.minorticks_on = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "minorticks_on is not yet implemented");
    });
    mod.minorticks_off = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "minorticks_off is not yet implemented");
    });
    mod.rgrids = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "rgrids is not yet implemented");
    });
    mod.thetagrids = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "thetagrids is not yet implemented");
    });
    mod.plotting = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "plotting is not yet implemented");
    });
    mod.get_plot_commands = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "get_plot_commands is not yet implemented");
    });
    mod.colors = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "colors is not yet implemented");
    });
    mod.colormaps = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "colormaps is not yet implemented");
    });
    mod._setup_pyplot_info_docstrings = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "_setup_pyplot_info_docstrings is not yet implemented");
    });
    mod.colorbar = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "colorbar is not yet implemented");
    });
    mod.clim = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "clim is not yet implemented");
    });
    mod.set_cmap = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "set_cmap is not yet implemented");
    });
    mod.imread = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "imread is not yet implemented");
    });
    mod.imsave = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "imsave is not yet implemented");
    });
    mod.matshow = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "matshow is not yet implemented");
    });
    mod.polar = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "polar is not yet implemented");
    });
    mod.plotfile = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "plotfile is not yet implemented");
    });
    mod._autogen_docstring = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "_autogen_docstring is not yet implemented");
    });
    mod.acorr = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "acorr is not yet implemented");
    });
    mod.arrow = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "arrow is not yet implemented");
    });
    mod.axhline = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "axhline is not yet implemented");
    });
    mod.axhspan = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "axhspan is not yet implemented");
    });
    mod.axvline = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "axvline is not yet implemented");
    });
    mod.axvspan = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "axvspan is not yet implemented");
    });
    mod.barh = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "barh is not yet implemented");
    });
    mod.broken_barh = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "broken_barh is not yet implemented");
    });
    mod.boxplot = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "boxplot is not yet implemented");
    });
    mod.cohere = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "cohere is not yet implemented");
    });
    mod.clabel = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "clabel is not yet implemented");
    });
    mod.contour = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "contour is not yet implemented");
    });
    mod.contourf = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "contourf is not yet implemented");
    });
    mod.csd = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("csd is not yet implemented");
    });
    mod.errorbar = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "errorbar is not yet implemented");
    });
    mod.eventplot = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "eventplot is not yet implemented");
    });
    mod.fill = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "fill is not yet implemented");
    });
    mod.fill_between = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "fill_between is not yet implemented");
    });
    mod.fill_betweenx = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "fill_betweenx is not yet implemented");
    });
    mod.hexbin = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "hexbin is not yet implemented");
    });
    mod.hist2d = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "hist2d is not yet implemented");
    });
    mod.hlines = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "hlines is not yet implemented");
    });
    mod.loglog = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "loglog is not yet implemented");
    });
    mod.magnitude_spectrum = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "magnitude_spectrum is not yet implemented");
    });
    mod.pcolor = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "pcolor is not yet implemented");
    });
    mod.pcolormesh = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "pcolormesh is not yet implemented");
    });
    mod.phase_spectrum = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "phase_spectrum is not yet implemented");
    });
    mod.pie = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("pie is not yet implemented");
    });
    mod.plot_date = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "plot_date is not yet implemented");
    });
    mod.psd = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("psd is not yet implemented");
    });
    mod.quiver = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "quiver is not yet implemented");
    });
    mod.quiverkey = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "quiverkey is not yet implemented");
    });
    mod.semilogx = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "semilogx is not yet implemented");
    });
    mod.semilogy = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "semilogy is not yet implemented");
    });
    mod.specgram = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "specgram is not yet implemented");
    });
    mod.stackplot = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "stackplot is not yet implemented");
    });
    mod.stem = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "stem is not yet implemented");
    });
    mod.step = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "step is not yet implemented");
    });
    mod.streamplot = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "streamplot is not yet implemented");
    });
    mod.tricontour = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "tricontour is not yet implemented");
    });
    mod.tricontourf = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "tricontourf is not yet implemented");
    });
    mod.tripcolor = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "tripcolor is not yet implemented");
    });
    mod.triplot = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "triplot is not yet implemented");
    });
    mod.vlines = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "vlines is not yet implemented");
    });
    mod.xcorr = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "xcorr is not yet implemented");
    });
    mod.barbs = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "barbs is not yet implemented");
    });
    mod.cla = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("cla is not yet implemented");
    });
    mod.table = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "table is not yet implemented");
    });
    mod.annotate = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "annotate is not yet implemented");
    });
    mod.ticklabel_format = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "ticklabel_format is not yet implemented");
    });
    mod.locator_params = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "locator_params is not yet implemented");
    });
    mod.tick_params = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "tick_params is not yet implemented");
    });
    mod.margins = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "margins is not yet implemented");
    });
    mod.autoscale = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "autoscale is not yet implemented");
    });
    mod.autumn = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "autumn is not yet implemented");
    });
    mod.cool = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "cool is not yet implemented");
    });
    mod.copper = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "copper is not yet implemented");
    });
    mod.flag = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "flag is not yet implemented");
    });
    mod.gray = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "gray is not yet implemented");
    });
    mod.hot = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("hot is not yet implemented");
    });
    mod.hsv = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("hsv is not yet implemented");
    });
    mod.jet = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError("jet is not yet implemented");
    });
    mod.pink = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "pink is not yet implemented");
    });
    mod.prism = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "prism is not yet implemented");
    });
    mod.spring = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "spring is not yet implemented");
    });
    mod.summer = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "summer is not yet implemented");
    });
    mod.winter = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "winter is not yet implemented");
    });
    mod.spectral = new Sk.builtin.func(function () {
        throw new Sk.builtin.NotImplementedError(
            "spectral is not yet implemented");
    });

    return mod;
};