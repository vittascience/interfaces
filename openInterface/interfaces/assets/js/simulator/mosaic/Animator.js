'use strict';

/**
 * Workspace Animator: Animator
 * Copyright 2021 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is Vittascience's intellectual property.
 * 
 * This class purpose to provide an animator 
 * of mosaic module (text, slider and animation) for Simulator.
 */

/** 
 * @fileoverview WorkSpace Animator 
 * @author: leomlr (Léo Meillier)
 */

/**
 * @class Animator
 */
class Animator {

	/**
	 * Creates an instance of this.
	 * @private
	 */
	constructor() {
		this.mod = null;
		this.value = 0;
		this.id = null;
		this.valueId = null;
		this.animId = null;
		this.sliderId = null;
		this.isUpdating = false;
	}

	/**
	 * Animate a button by switching up or down.
	 * @param {int} [state=this.value]
	 */
	button(state = this.value, pull = 'down') {
		$(this.valueId).text(pull == 'down' ? (state ? "ON" : "OFF") : (state ? "OFF" : "ON"));
		$(this.animId).addClass("button-anim-" + (pull == 'down' ? (state ? "down" : "up") : (state ? "up" : "down")));
		$(this.animId).removeClass("button-anim-" + (pull == 'down' ? (state ? "up" : "down") : (state ? "down" : "up")));
	};
	/**
	 * Animate a led switching ON or OFF.
	 */
	led() {
		if (this.value > 1) {
			$(this.valueId).html(this.value);
			$(this.animId).css("opacity", this.value / WRITE_ANALOG_MAX_VALUE);
		} else {
			$(this.valueId).html(this.value ? "ON" : "OFF");
			$(this.animId).css("opacity", this.value ? this.value : "0");
		}
	};
	/**
	 * Animate a gauge from 100px to 0px.
	 * Example: Temperature sensor
	 * @param {number} [text=this.value]
	 */
	gauge(text = this.value) {
		const min = $(this.sliderId).slider('option', 'min');
		const max = $(this.sliderId).slider('option', 'max');
		$(this.valueId).text(text);
		$(this.animId).css('clip-path', 'inset(' + this._map(this.value, min, max, 100, 0) + '% 0px 0px)');
	};
	/**
	 * Animate bluetooth communication, updating available data and arrows animations.
	 * Example: HM10
	 */
	bluetooth() {
		const rx_buffer = "Données dispo:<br>";
		if (this.value == null || this.value == 'flush' || this.value == 'readString') {
			$(this.valueId).html(rx_buffer + "0");
		} else if (this.value == 'write' || this.value == 'read') {
			if (this.value == 'read') {
				const value = $(this.valueId).html().split('<br>');
				$(this.valueId).html(rx_buffer + (parseInt(value[1]) - 1));
			}
			const arrowId = this.valueId.replace('_value', '') + " .module-svg-base ." + this.value + "-arrow";
			$(arrowId).attr("fill", 'rgb(0,130,252)');
			setTimeout(function () {
				$(arrowId).attr("fill", 'rgb(0,0,0)');
			}, 300);
		} else if (this.value.includes('available')) {
			const n = this.value.split(':')[1];
			$(this.valueId).html(rx_buffer + n);
		}
	};
	/**
	 * Animate by setting opacity between 0 and 1 on picture.
	 * Example: Humidity sensor
	 * @param {number} min
	 * @param {number} max
	 * @param {number} [text=this.value]
	 */
	opacity(min, max, text = this.value) {
		$(this.valueId).text(text);
		$(this.animId).css("opacity", this._map(this.value, min, max, 0, 1));
	};
	/**
	 * Rotate the picture from 0° to 360°, default as 280°.
	 * Example: Accelerometer
	 * @param {number} min
	 * @param {number} max
	 * @param {number} [degree=280]
	 */
	rotate(min, max, text = this.value, degree = 280) {
		$(this.valueId).text(text);
		$(this.animId).css('transform', 'rotate(' + this._map(this.value, min, max, 0, degree) + 'deg)');
	};
	/**
	 * Do a simple translation of picture animation. "left: -10px"
	 * Example: Line follower sensor
	 * @param {string} status
	 * @param {boolean} [condition=null]
	 * @param {number} [text=this.value]
	 */
	translation(status, condition = null, text = this.value) {
		let state;
		if (status === 'digital') {
			state = this.value == 1;
			$(this.valueId).text(state ? "ON" : "OFF");
		} else if (status === 'analog') {
			state = condition;
			$(this.valueId).text(text);
		}
		$(this.animId).css('left', (state ? "-10px" : ""));
	};
	/**
	 * Update value and slider of other listeners of module.
	 * @param {Object} results
	 * @param {function} callbackAnim
	 */
	updateListeners(calc, callback) {
		const listeners = this.mod.listeners;
		for (var i = 0; i < listeners.length; i++) {
			const suffix = listeners[i].suffix;
			const text = calc[suffix];
			if (this.valueId.includes(suffix)) {
				callback(text);
			} else {
				const sliderId = this.animId.replace('_anim', '_slider') + suffix;
				this._updateRelative(sliderId, text);
			}
		}
	};
	/**
	 * Rotate the updated option from 0° to 360°.
	 * @param {number} min
	 * @param {number} max
	 * @param {number} [degree=280]
	 */
	rotateUpdate(min, max, to, forUpdate, text, degree = 280) {
		const sliderId = this.valueId.replace(to[0], to[1]).replace('_value', '_slider');
		this._updateRelative(sliderId, text, this._invert(min, max));
		$(this.animId.replace(to[0], to[1])).css('transform', 'rotate(' + this._map(forUpdate, max, min, 0, degree) + 'deg)');
	};
	/**
	 * Update other option of module.
	 * @param {Array<string>} to
	 * @param {Array<number>} limits
	 * @param {Array<function>} callback 
	 * @param {boolean} isInverted
	 */
	updateInvertedCouple(to, limits, callbacks, isInverted) {
		const getValueFrom = (state, array) => { return state ? array[0] : array[1] };
		const min = getValueFrom(isInverted, limits);
		const max = getValueFrom(!isInverted, limits);
		const forUpdate = isInverted ? this.value : this._invert(limits[0], limits[1]);
		const forText = !isInverted ? this.value : this._invert(max, min);
		let texts = {};
		texts[getValueFrom(isInverted, to)] = callbacks[1](forText);
		texts[getValueFrom(!isInverted, to)] = callbacks[0](forText);
		this.rotate(min, max, texts[to[0]]);
		this.rotateUpdate(limits[0], limits[1], to, forUpdate, texts[to[1]]);
	};
	/**
	 * Update manually relative slider and text value.
	 * @param {string} sliderId
	 * @param {string} text
	 * @param {number} [value=this.value]
	 */
	_updateRelative(sliderId, text, value = this.value) {
		this.isUpdating = true;
		$(sliderId.replace('_slider', '_value')).text(text);
		$(sliderId).slider('value', value);
	};
	/**
	 * Map value.
	 * @param {number} value
	 * @param {number} from_min
	 * @param {number} from_max
	 * @param {number} to_min
	 * @param {number} to_max
	 * @returns {number}
	 */
	_map(value, from_min, from_max, to_min, to_max) {
		return (value - from_min) * (to_max - to_min) / (from_max - from_min) + to_min;
	};
	/**
	 * Invert value by remapping.
	 * @param {number} min
	 * @param {number} max
	 * @param {number} [value=this.value]
	 * @returns {number}
	 */
	_invert(min, max, value = this.value) {
		return this._map(value, min, max, max, min)
	};

}