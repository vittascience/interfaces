var tmImage =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/autobind-decorator/lib/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/autobind-decorator/lib/esm/index.js ***!
  \**********************************************************/
/*! exports provided: boundMethod, boundClass, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundMethod", function() { return boundMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundClass", function() { return boundClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return autobind; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
function boundMethod(target, key, descriptor) {
  var fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new TypeError("@boundMethod decorator can only be applied to methods not: ".concat(_typeof(fn)));
  } // In IE11 calling Object.defineProperty has a side-effect of evaluating the
  // getter for the property which is being replaced. This causes infinite
  // recursion and an "Out of stack space" error.


  var definingProperty = false;
  return {
    configurable: true,
    get: function get() {
      // eslint-disable-next-line no-prototype-builtins
      if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof fn !== 'function') {
        return fn;
      }

      var boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        configurable: true,
        get: function get() {
          return boundFn;
        },
        set: function set(value) {
          fn = value;
          delete this[key];
        }
      });
      definingProperty = false;
      return boundFn;
    },
    set: function set(value) {
      fn = value;
    }
  };
}
/**
 * Use boundMethod to bind all methods on the target.prototype
 */

function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  var keys; // Use Reflect if exists

  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    keys = Reflect.ownKeys(target.prototype);
  } else {
    keys = Object.getOwnPropertyNames(target.prototype); // Use symbols if support is provided

    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
    }
  }

  keys.forEach(function (key) {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key); // Only methods need binding

    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });
  return target;
}
function autobind() {
  if (arguments.length === 1) {
    return boundClass.apply(void 0, arguments);
  }

  return boundMethod.apply(void 0, arguments);
}

/***/ }),

/***/ "./node_modules/seedrandom/index.js":
/*!******************************************!*\
  !*** ./node_modules/seedrandom/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = __webpack_require__(/*! ./lib/alea */ "./node_modules/seedrandom/lib/alea.js");

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = __webpack_require__(/*! ./lib/xor128 */ "./node_modules/seedrandom/lib/xor128.js");

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = __webpack_require__(/*! ./lib/xorwow */ "./node_modules/seedrandom/lib/xorwow.js");

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = __webpack_require__(/*! ./lib/xorshift7 */ "./node_modules/seedrandom/lib/xorshift7.js");

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = __webpack_require__(/*! ./lib/xor4096 */ "./node_modules/seedrandom/lib/xor4096.js");

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = __webpack_require__(/*! ./lib/tychei */ "./node_modules/seedrandom/lib/tychei.js");

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = __webpack_require__(/*! ./seedrandom */ "./node_modules/seedrandom/seedrandom.js");

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;


/***/ }),

/***/ "./node_modules/seedrandom/lib/alea.js":
/*!*********************************************!*\
  !*** ./node_modules/seedrandom/lib/alea.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.alea = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/tychei.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/tychei.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.tychei = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xor128.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/xor128.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor128 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xor4096.js":
/*!************************************************!*\
  !*** ./node_modules/seedrandom/lib/xor4096.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xorshift7.js":
/*!**************************************************!*\
  !*** ./node_modules/seedrandom/lib/xorshift7.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorshift7 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xorwow.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/xorwow.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorwow = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/seedrandom.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/seedrandom.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//

// Detect the global object, even if operating in strict mode.
// http://stackoverflow.com/a/14387057/265298
var global = (0, eval)('this'),
    width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}
math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ( true && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = __webpack_require__(/*! crypto */ 0);
  } catch (ex) {}
} else if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return seedrandom; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

// End anonymous scope, and pass initial values.
})(
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-define.js":
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/custom-mobilenet.ts":
/*!*********************************!*\
  !*** ./src/custom-mobilenet.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFromFiles = exports.load = exports.loadTruncatedMobileNet = exports.CustomMobileNet = exports.getTopKClasses = exports.IMAGE_SIZE = void 0;
var tf = __webpack_require__(/*! @tensorflow/tfjs */ "@tensorflow/tfjs");
var tfjs_1 = __webpack_require__(/*! @tensorflow/tfjs */ "@tensorflow/tfjs");
var tf_1 = __webpack_require__(/*! ./utils/tf */ "./src/utils/tf.ts");
var canvas_1 = __webpack_require__(/*! ./utils/canvas */ "./src/utils/canvas.ts");
var version_1 = __webpack_require__(/*! ./version */ "./src/version.ts");
var DEFAULT_MOBILENET_VERSION = 1;
var DEFAULT_TRAINING_LAYER_V1 = 'conv_pw_13_relu';
var DEFAULT_TRAINING_LAYER_V2 = "out_relu";
var DEFAULT_ALPHA_V1 = 0.25;
var DEFAULT_ALPHA_V2 = 0.35;
exports.IMAGE_SIZE = 224;
/**
 * Receives a Metadata object and fills in the optional fields such as timeStamp
 * @param data a Metadata object
 */
var fillMetadata = function (data) {
    // util.assert(typeof data.tfjsVersion === 'string', () => `metadata.tfjsVersion is invalid`);
    data.packageVersion = data.packageVersion || version_1.version;
    data.packageName = data.packageName || '@teachablemachine/image';
    data.timeStamp = data.timeStamp || new Date().toISOString();
    data.userMetadata = data.userMetadata || {};
    data.modelName = data.modelName || 'untitled';
    data.labels = data.labels || [];
    data.imageSize = data.imageSize || exports.IMAGE_SIZE;
    return data;
};
// tslint:disable-next-line:no-any
var isMetadata = function (c) {
    return !!c && Array.isArray(c.labels);
};
var isAlphaValid = function (version, alpha) {
    if (version === 1) {
        if (alpha !== 0.25 && alpha !== 0.5 && alpha !== 0.75 && alpha !== 1) {
            console.warn("Invalid alpha. Options are: 0.25, 0.50, 0.75 or 1.00.");
            console.log("Loading model with alpha: ", DEFAULT_ALPHA_V1.toFixed(2));
            return DEFAULT_ALPHA_V1;
        }
    }
    else {
        if (alpha !== 0.35 && alpha !== 0.5 && alpha !== 0.75 && alpha !== 1) {
            console.warn("Invalid alpha. Options are: 0.35, 0.50, 0.75 or 1.00.");
            console.log("Loading model with alpha: ", DEFAULT_ALPHA_V2.toFixed(2));
            return DEFAULT_ALPHA_V2;
        }
    }
    return alpha;
};
var parseModelOptions = function (options) {
    options = options || {};
    if (options.checkpointUrl && options.trainingLayer) {
        if (options.alpha || options.version) {
            console.warn("Checkpoint URL passed to modelOptions, alpha options are ignored");
        }
        return [options.checkpointUrl, options.trainingLayer];
    }
    else {
        options.version = options.version || DEFAULT_MOBILENET_VERSION;
        if (options.version === 1) {
            options.alpha = options.alpha || DEFAULT_ALPHA_V1;
            options.alpha = isAlphaValid(options.version, options.alpha);
            console.log("Loading mobilenet " + options.version + " and alpha " + options.alpha);
            // exception is alpha of 1 can only be 1.0
            var alphaString = options.alpha.toFixed(2);
            if (alphaString === "1.00") {
                alphaString = "1.0";
            }
            return [
                // tslint:disable-next-line:max-line-length        
                "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_" + alphaString + "_" + exports.IMAGE_SIZE + "/model.json",
                DEFAULT_TRAINING_LAYER_V1
            ];
        }
        else if (options.version === 2) {
            options.alpha = options.alpha || DEFAULT_ALPHA_V2;
            options.alpha = isAlphaValid(options.version, options.alpha);
            console.log("Loading mobilenet " + options.version + " and alpha " + options.alpha);
            return [
                // tslint:disable-next-line:max-line-length        
                "https://storage.googleapis.com/teachable-machine-models/mobilenet_v2_weights_tf_dim_ordering_tf_kernels_" + options.alpha.toFixed(2) + "_" + exports.IMAGE_SIZE + "_no_top/model.json",
                DEFAULT_TRAINING_LAYER_V2
            ];
        }
        else {
            throw new Error("MobileNet V" + options.version + " doesn't exist");
        }
    }
};
/**
 * process either a URL string or a Metadata object
 * @param metadata a url to load metadata or a Metadata object
 */
var processMetadata = function (metadata) { return __awaiter(void 0, void 0, void 0, function () {
    var metadataJSON, metadataResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(typeof metadata === 'string')) return [3 /*break*/, 3];
                return [4 /*yield*/, fetch(metadata)];
            case 1:
                metadataResponse = _a.sent();
                return [4 /*yield*/, metadataResponse.json()];
            case 2:
                metadataJSON = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                if (isMetadata(metadata)) {
                    metadataJSON = metadata;
                }
                else {
                    throw new Error('Invalid Metadata provided');
                }
                _a.label = 4;
            case 4: return [2 /*return*/, fillMetadata(metadataJSON)];
        }
    });
}); };
/**
 * Computes the probabilities of the topK classes given logits by computing
 * softmax to get probabilities and then sorting the probabilities.
 * @param logits Tensor representing the logits from MobileNet.
 * @param topK The number of top predictions to show.
 */
function getTopKClasses(labels, logits, topK) {
    if (topK === void 0) { topK = 3; }
    return __awaiter(this, void 0, void 0, function () {
        var values;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logits.data()];
                case 1:
                    values = _a.sent();
                    return [2 /*return*/, tf.tidy(function () {
                            topK = Math.min(topK, values.length);
                            var valuesAndIndices = [];
                            for (var i = 0; i < values.length; i++) {
                                valuesAndIndices.push({ value: values[i], index: i });
                            }
                            valuesAndIndices.sort(function (a, b) {
                                return b.value - a.value;
                            });
                            var topkValues = new Float32Array(topK);
                            var topkIndices = new Int32Array(topK);
                            for (var i = 0; i < topK; i++) {
                                topkValues[i] = valuesAndIndices[i].value;
                                topkIndices[i] = valuesAndIndices[i].index;
                            }
                            var topClassesAndProbs = [];
                            for (var i = 0; i < topkIndices.length; i++) {
                                topClassesAndProbs.push({
                                    className: labels[topkIndices[i]],
                                    probability: topkValues[i]
                                });
                            }
                            return topClassesAndProbs;
                        })];
            }
        });
    });
}
exports.getTopKClasses = getTopKClasses;
var CustomMobileNet = /** @class */ (function () {
    function CustomMobileNet(model, metadata) {
        this.model = model;
        this._metadata = fillMetadata(metadata);
    }
    Object.defineProperty(CustomMobileNet, "EXPECTED_IMAGE_SIZE", {
        get: function () {
            return exports.IMAGE_SIZE;
        },
        enumerable: false,
        configurable: true
    });
    CustomMobileNet.prototype.getMetadata = function () {
        return this._metadata;
    };
    /**
     * get the total number of classes existing within model
     */
    CustomMobileNet.prototype.getTotalClasses = function () {
        var output = this.model.output;
        var totalClasses = output.shape[1];
        return totalClasses;
    };
    /**
     * get the model labels
     */
    CustomMobileNet.prototype.getClassLabels = function () {
        return this._metadata.labels;
    };
    /**
     * Given an image element, makes a prediction through mobilenet returning the
     * probabilities of the top K classes.
     * @param image the image to classify
     * @param maxPredictions the maximum number of classification predictions
     */
    CustomMobileNet.prototype.predictTopK = function (image, maxPredictions, flipped) {
        if (maxPredictions === void 0) { maxPredictions = 10; }
        if (flipped === void 0) { flipped = false; }
        return __awaiter(this, void 0, void 0, function () {
            var croppedImage, logits, classes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        croppedImage = canvas_1.cropTo(image, this._metadata.imageSize, flipped);
                        logits = tf.tidy(function () {
                            var captured = tf_1.capture(croppedImage, _this._metadata.grayscale);
                            return _this.model.predict(captured);
                        });
                        return [4 /*yield*/, getTopKClasses(this._metadata.labels, logits, maxPredictions)];
                    case 1:
                        classes = _a.sent();
                        tfjs_1.dispose(logits);
                        return [2 /*return*/, classes];
                }
            });
        });
    };
    /**
     * Given an image element, makes a prediction through mobilenet returning the
     * probabilities for ALL classes.
     * @param image the image to classify
     * @param flipped whether to flip the image on X
     */
    CustomMobileNet.prototype.predict = function (image, flipped) {
        if (flipped === void 0) { flipped = false; }
        return __awaiter(this, void 0, void 0, function () {
            var croppedImage, logits, values, classes, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        croppedImage = canvas_1.cropTo(image, this._metadata.imageSize, flipped);
                        logits = tf.tidy(function () {
                            var captured = tf_1.capture(croppedImage, _this._metadata.grayscale);
                            return _this.model.predict(captured);
                        });
                        return [4 /*yield*/, logits.data()];
                    case 1:
                        values = _a.sent();
                        classes = [];
                        for (i = 0; i < values.length; i++) {
                            classes.push({
                                className: this._metadata.labels[i],
                                probability: values[i]
                            });
                        }
                        tfjs_1.dispose(logits);
                        return [2 /*return*/, classes];
                }
            });
        });
    };
    CustomMobileNet.prototype.dispose = function () {
        this.truncatedModel.dispose();
    };
    return CustomMobileNet;
}());
exports.CustomMobileNet = CustomMobileNet;
/**
 * load the base mobilenet model
 * @param modelOptions options determining what model to load
 */
function loadTruncatedMobileNet(modelOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, checkpointUrl, trainingLayer, mobilenet, layer, truncatedModel, model, layer, truncatedModel, model;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = parseModelOptions(modelOptions), checkpointUrl = _a[0], trainingLayer = _a[1];
                    return [4 /*yield*/, tf.loadLayersModel(checkpointUrl)];
                case 1:
                    mobilenet = _b.sent();
                    if (modelOptions && modelOptions.version === 1) {
                        layer = mobilenet.getLayer(trainingLayer);
                        truncatedModel = tf.model({ inputs: mobilenet.inputs, outputs: layer.output });
                        model = tf.sequential();
                        model.add(truncatedModel);
                        model.add(tf.layers.flatten());
                        return [2 /*return*/, model];
                    }
                    else {
                        layer = mobilenet.getLayer(trainingLayer);
                        truncatedModel = tf.model({ inputs: mobilenet.inputs, outputs: layer.output });
                        model = tf.sequential();
                        model.add(truncatedModel);
                        model.add(tf.layers.globalAveragePooling2d({})); // go from shape [7, 7, 1280] to [1280]
                        return [2 /*return*/, model];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.loadTruncatedMobileNet = loadTruncatedMobileNet;
function load(model, metadata) {
    return __awaiter(this, void 0, void 0, function () {
        var customModel, metadataJSON, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, tf.loadLayersModel(model)];
                case 1:
                    customModel = _b.sent();
                    if (!metadata) return [3 /*break*/, 3];
                    return [4 /*yield*/, processMetadata(metadata)];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = null;
                    _b.label = 4;
                case 4:
                    metadataJSON = _a;
                    return [2 /*return*/, new CustomMobileNet(customModel, metadataJSON)];
            }
        });
    });
}
exports.load = load;
function loadFromFiles(model, weights, metadata) {
    return __awaiter(this, void 0, void 0, function () {
        var customModel, metadataFile, metadataJSON, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, tf.loadLayersModel(tf.io.browserFiles([model, weights]))];
                case 1:
                    customModel = _b.sent();
                    return [4 /*yield*/, new Response(metadata).json()];
                case 2:
                    metadataFile = _b.sent();
                    if (!metadata) return [3 /*break*/, 4];
                    return [4 /*yield*/, processMetadata(metadataFile)];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = null;
                    _b.label = 5;
                case 5:
                    metadataJSON = _a;
                    return [2 /*return*/, new CustomMobileNet(customModel, metadataJSON)];
            }
        });
    });
}
exports.loadFromFiles = loadFromFiles;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var custom_mobilenet_1 = __webpack_require__(/*! ./custom-mobilenet */ "./src/custom-mobilenet.ts");
Object.defineProperty(exports, "IMAGE_SIZE", { enumerable: true, get: function () { return custom_mobilenet_1.IMAGE_SIZE; } });
Object.defineProperty(exports, "CustomMobileNet", { enumerable: true, get: function () { return custom_mobilenet_1.CustomMobileNet; } });
Object.defineProperty(exports, "load", { enumerable: true, get: function () { return custom_mobilenet_1.load; } });
Object.defineProperty(exports, "loadFromFiles", { enumerable: true, get: function () { return custom_mobilenet_1.loadFromFiles; } });
Object.defineProperty(exports, "loadTruncatedMobileNet", { enumerable: true, get: function () { return custom_mobilenet_1.loadTruncatedMobileNet; } });
var teachable_mobilenet_1 = __webpack_require__(/*! ./teachable-mobilenet */ "./src/teachable-mobilenet.ts");
Object.defineProperty(exports, "TeachableMobileNet", { enumerable: true, get: function () { return teachable_mobilenet_1.TeachableMobileNet; } });
Object.defineProperty(exports, "createTeachable", { enumerable: true, get: function () { return teachable_mobilenet_1.createTeachable; } });
var webcam_1 = __webpack_require__(/*! ./utils/webcam */ "./src/utils/webcam.ts");
Object.defineProperty(exports, "Webcam", { enumerable: true, get: function () { return webcam_1.Webcam; } });
var version_1 = __webpack_require__(/*! ./version */ "./src/version.ts");
Object.defineProperty(exports, "version", { enumerable: true, get: function () { return version_1.version; } });


/***/ }),

/***/ "./src/teachable-mobilenet.ts":
/*!************************************!*\
  !*** ./src/teachable-mobilenet.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeachable = exports.TeachableMobileNet = void 0;
var tf = __webpack_require__(/*! @tensorflow/tfjs */ "@tensorflow/tfjs");
var tfjs_1 = __webpack_require__(/*! @tensorflow/tfjs */ "@tensorflow/tfjs");
var tf_1 = __webpack_require__(/*! ./utils/tf */ "./src/utils/tf.ts");
var custom_mobilenet_1 = __webpack_require__(/*! ./custom-mobilenet */ "./src/custom-mobilenet.ts");
var seedrandom = __webpack_require__(/*! seedrandom */ "./node_modules/seedrandom/index.js");
var VALIDATION_FRACTION = 0.15;
// tslint:disable-next-line:no-any
var isTensor = function (c) {
    return typeof c.dataId === 'object' && typeof c.shape === 'object';
};
/**
 * Converts an integer into its one-hot representation and returns
 * the data as a JS Array.
 */
function flatOneHot(label, numClasses) {
    var labelOneHot = new Array(numClasses).fill(0);
    labelOneHot[label] = 1;
    return labelOneHot;
}
/**
 * Shuffle an array of Float32Array or Samples using Fisher-Yates algorithm
 * Takes an optional seed value to make shuffling predictable
 */
function fisherYates(array, seed) {
    var _a;
    var length = array.length;
    // need to clone array or we'd be editing original as we goo
    var shuffled = array.slice();
    for (var i = (length - 1); i > 0; i -= 1) {
        var randomIndex = void 0;
        if (seed) {
            randomIndex = Math.floor(seed() * (i + 1));
        }
        else {
            randomIndex = Math.floor(Math.random() * (i + 1));
        }
        _a = [shuffled[randomIndex], shuffled[i]], shuffled[i] = _a[0], shuffled[randomIndex] = _a[1];
    }
    return shuffled;
}
var TeachableMobileNet = /** @class */ (function (_super) {
    __extends(TeachableMobileNet, _super);
    function TeachableMobileNet(truncated, metadata) {
        var _this = _super.call(this, tf.sequential(), metadata) || this;
        // private __stopTrainingReject: (error: Error) => void;
        // Number of total samples
        _this.totalSamples = 0;
        // Array of all the examples collected
        _this.examples = [];
        // the provided model is the truncated mobilenet
        _this.truncatedModel = truncated;
        return _this;
    }
    Object.defineProperty(TeachableMobileNet.prototype, "asSequentialModel", {
        get: function () {
            return this.model;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TeachableMobileNet.prototype, "isTrained", {
        /**
         * has the teachable model been trained?
         */
        get: function () {
            return !!this.model && this.model.layers && this.model.layers.length > 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TeachableMobileNet.prototype, "isPrepared", {
        /**
         * has the dataset been prepared with all labels and samples processed?
         */
        get: function () {
            return !!this.trainDataset;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TeachableMobileNet.prototype, "numClasses", {
        /**
         * how many classes are in the dataset?
         */
        get: function () {
            return this._metadata.labels.length;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Add a sample of data under the provided className
     * @param className the classification this example belongs to
     * @param sample the image / tensor that belongs in this classification
     */
    // public async addExample(className: number, sample: HTMLCanvasElement | tf.Tensor) {
    TeachableMobileNet.prototype.addExample = function (className, sample) {
        return __awaiter(this, void 0, void 0, function () {
            var cap, example, activation;
            return __generator(this, function (_a) {
                cap = isTensor(sample) ? sample : tf_1.capture(sample, this._metadata.grayscale);
                example = this.truncatedModel.predict(cap);
                activation = example.dataSync();
                cap.dispose();
                example.dispose();
                // save samples of each class separately
                this.examples[className].push(activation);
                // increase our sample counter
                this.totalSamples++;
                return [2 /*return*/];
            });
        });
    };
    /**
     * Classify an input image / Tensor with your trained model. Return all results.
     * @param image the input image / Tensor to classify against your model
     * @param topK how many of the top results do you want? defautls to 3
     */
    TeachableMobileNet.prototype.predict = function (image, flipped) {
        if (flipped === void 0) { flipped = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.model) {
                    throw new Error('Model has not been trained yet, called train() first');
                }
                return [2 /*return*/, _super.prototype.predict.call(this, image, flipped)];
            });
        });
    };
    /**
     * Classify an input image / Tensor with your trained model. Return topK results
     * @param image the input image / Tensor to classify against your model
     * @param maxPredictions how many of the top results do you want? defautls to 3
     * @param flipped whether to flip an image
     */
    TeachableMobileNet.prototype.predictTopK = function (image, maxPredictions, flipped) {
        if (maxPredictions === void 0) { maxPredictions = 10; }
        if (flipped === void 0) { flipped = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.model) {
                    throw new Error('Model has not been trained yet, called train() first');
                }
                return [2 /*return*/, _super.prototype.predictTopK.call(this, image, maxPredictions, flipped)];
            });
        });
    };
    /**
     * process the current examples provided to calculate labels and format
     * into proper tf.data.Dataset
     */
    TeachableMobileNet.prototype.prepare = function () {
        for (var classes in this.examples) {
            if (classes.length === 0) {
                throw new Error('Add some examples before training');
            }
        }
        var datasets = this.convertToTfDataset();
        this.trainDataset = datasets.trainDataset;
        this.validationDataset = datasets.validationDataset;
    };
    /**
     * Process the examples by first shuffling randomly per class, then adding
     * one-hot labels, then splitting into training/validation datsets, and finally
     * sorting one last time
     */
    TeachableMobileNet.prototype.convertToTfDataset = function () {
        // first shuffle each class individually
        // TODO: we could basically replicate this by insterting randomly
        for (var i = 0; i < this.examples.length; i++) {
            this.examples[i] = fisherYates(this.examples[i], this.seed);
        }
        // then break into validation and test datasets
        var trainDataset = [];
        var validationDataset = [];
        var _loop_1 = function (i) {
            var y = flatOneHot(i, this_1.numClasses);
            var classLength = this_1.examples[i].length;
            var numValidation = Math.ceil(VALIDATION_FRACTION * classLength);
            var numTrain = classLength - numValidation;
            var classTrain = this_1.examples[i].slice(0, numTrain).map(function (dataArray) {
                return { data: dataArray, label: y };
            });
            var classValidation = this_1.examples[i].slice(numTrain).map(function (dataArray) {
                return { data: dataArray, label: y };
            });
            trainDataset = trainDataset.concat(classTrain);
            validationDataset = validationDataset.concat(classValidation);
        };
        var this_1 = this;
        // for each class, add samples to train and validation dataset
        for (var i = 0; i < this.examples.length; i++) {
            _loop_1(i);
        }
        // finally shuffle both train and validation datasets
        trainDataset = fisherYates(trainDataset, this.seed);
        validationDataset = fisherYates(validationDataset, this.seed);
        var trainX = tf.data.array(trainDataset.map(function (sample) { return sample.data; }));
        var validationX = tf.data.array(validationDataset.map(function (sample) { return sample.data; }));
        var trainY = tf.data.array(trainDataset.map(function (sample) { return sample.label; }));
        var validationY = tf.data.array(validationDataset.map(function (sample) { return sample.label; }));
        // return tf.data dataset objects
        return {
            trainDataset: tf.data.zip({ xs: trainX, ys: trainY }),
            validationDataset: tf.data.zip({ xs: validationX, ys: validationY })
        };
    };
    /**
     * Saving `model`'s topology and weights as two files
     * (`my-model-1.json` and `my-model-1.weights.bin`) as well as
     * a `metadata.json` file containing metadata such as text labels to be
     * downloaded from browser.
     * @param handlerOrURL An instance of `IOHandler` or a URL-like,
     * scheme-based string shortcut for `IOHandler`.
     * @param config Options for saving the model.
     * @returns A `Promise` of `SaveResult`, which summarizes the result of
     * the saving, such as byte sizes of the saved artifacts for the model's
     *   topology and weight values.
     */
    TeachableMobileNet.prototype.save = function (handlerOrURL, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.model.save(handlerOrURL, config)];
            });
        });
    };
    /**
     * Train your data into a new model and join it with mobilenet
     * @param params the parameters for the model / training
     * @param callbacks provide callbacks to receive training events
     */
    TeachableMobileNet.prototype.train = function (params, callbacks) {
        if (callbacks === void 0) { callbacks = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var originalOnTrainEnd, numLabels, inputShape, inputSize, varianceScaling, optimizer, trainData, validationData, history, jointModel;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originalOnTrainEnd = callbacks.onTrainEnd || (function () { });
                        callbacks.onTrainEnd = function (logs) {
                            if (_this.__stopTrainingResolve) {
                                _this.__stopTrainingResolve();
                                _this.__stopTrainingResolve = null;
                            }
                            originalOnTrainEnd(logs);
                        };
                        // Rest of trian function
                        if (!this.isPrepared) {
                            this.prepare();
                        }
                        numLabels = this.getLabels().length;
                        tfjs_1.util.assert(numLabels === this.numClasses, function () { return "Can not train, has " + numLabels + " labels and " + _this.numClasses + " classes"; });
                        inputShape = this.truncatedModel.outputs[0].shape.slice(1);
                        inputSize = tf.util.sizeFromShape(inputShape);
                        if (this.seed) {
                            varianceScaling = tf.initializers.varianceScaling({ seed: 3.14 });
                        }
                        else {
                            varianceScaling = tf.initializers.varianceScaling({});
                        }
                        this.trainingModel = tf.sequential({
                            layers: [
                                tf.layers.dense({
                                    inputShape: [inputSize],
                                    units: params.denseUnits,
                                    activation: 'relu',
                                    kernelInitializer: varianceScaling,
                                    useBias: true
                                }),
                                tf.layers.dense({
                                    kernelInitializer: varianceScaling,
                                    useBias: false,
                                    activation: 'softmax',
                                    units: this.numClasses
                                })
                            ]
                        });
                        optimizer = tf.train.adam(params.learningRate);
                        // const optimizer = tf.train.rmsprop(params.learningRate);
                        this.trainingModel.compile({
                            optimizer: optimizer,
                            // loss: 'binaryCrossentropy',
                            loss: 'categoricalCrossentropy',
                            metrics: ['accuracy']
                        });
                        if (!(params.batchSize > 0)) {
                            throw new Error("Batch size is 0 or NaN. Please choose a non-zero fraction");
                        }
                        trainData = this.trainDataset.batch(params.batchSize);
                        validationData = this.validationDataset.batch(params.batchSize);
                        return [4 /*yield*/, this.trainingModel.fitDataset(trainData, {
                                epochs: params.epochs,
                                validationData: validationData,
                                callbacks: callbacks
                            })];
                    case 1:
                        history = _a.sent();
                        jointModel = tf.sequential();
                        jointModel.add(this.truncatedModel);
                        jointModel.add(this.trainingModel);
                        this.model = jointModel;
                        optimizer.dispose(); // cleanup of memory
                        return [2 /*return*/, this.model];
                }
            });
        });
    };
    /*
     * Setup the exampls array to hold samples per class
     */
    TeachableMobileNet.prototype.prepareDataset = function () {
        for (var i = 0; i < this.numClasses; i++) {
            this.examples[i] = [];
        }
    };
    TeachableMobileNet.prototype.setLabel = function (index, label) {
        this._metadata.labels[index] = label;
    };
    TeachableMobileNet.prototype.setLabels = function (labels) {
        this._metadata.labels = labels;
        this.prepareDataset();
    };
    TeachableMobileNet.prototype.getLabel = function (index) {
        return this._metadata.labels[index];
    };
    TeachableMobileNet.prototype.getLabels = function () {
        return this._metadata.labels;
    };
    TeachableMobileNet.prototype.setName = function (name) {
        this._metadata.modelName = name;
    };
    TeachableMobileNet.prototype.getName = function () {
        return this._metadata.modelName;
    };
    TeachableMobileNet.prototype.stopTraining = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.trainingModel.stopTraining = true;
            _this.__stopTrainingResolve = resolve;
            // this.__stopTrainingReject = reject;
        });
        return promise;
    };
    TeachableMobileNet.prototype.dispose = function () {
        this.trainingModel.dispose();
        _super.prototype.dispose.call(this);
    };
    /*
     * Calculate each class accuracy using the validation dataset
     */
    TeachableMobileNet.prototype.calculateAccuracyPerClass = function () {
        return __awaiter(this, void 0, void 0, function () {
            var validationXs, validationYs, batchSize, iterations, batchesX, batchesY, itX, itY, allX, allY, i, batchedXTensor, batchedXPredictionTensor, argMaxX, batchedYTensor, argMaxY, reference, predictions, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validationXs = this.validationDataset.mapAsync(function (dataset) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, dataset.xs];
                            });
                        }); });
                        validationYs = this.validationDataset.mapAsync(function (dataset) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, dataset.ys];
                            });
                        }); });
                        batchSize = Math.min(validationYs.size, 32);
                        iterations = Math.ceil(validationYs.size / batchSize);
                        batchesX = validationXs.batch(batchSize);
                        batchesY = validationYs.batch(batchSize);
                        return [4 /*yield*/, batchesX.iterator()];
                    case 1:
                        itX = _a.sent();
                        return [4 /*yield*/, batchesY.iterator()];
                    case 2:
                        itY = _a.sent();
                        allX = [];
                        allY = [];
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < iterations)) return [3 /*break*/, 7];
                        return [4 /*yield*/, itX.next()];
                    case 4:
                        batchedXTensor = _a.sent();
                        batchedXPredictionTensor = this.trainingModel.predict(batchedXTensor.value);
                        argMaxX = batchedXPredictionTensor.argMax(1);
                        allX.push(argMaxX);
                        return [4 /*yield*/, itY.next()];
                    case 5:
                        batchedYTensor = _a.sent();
                        argMaxY = batchedYTensor.value.argMax(1);
                        allY.push(argMaxY);
                        // 3. dispose of all our tensors
                        batchedXTensor.value.dispose();
                        batchedXPredictionTensor.dispose();
                        batchedYTensor.value.dispose();
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7:
                        reference = tf.concat(allY);
                        predictions = tf.concat(allX);
                        // only if we concatenated more than one tensor for preference and reference
                        if (iterations !== 1) {
                            for (i = 0; i < allX.length; i++) {
                                allX[i].dispose();
                                allY[i].dispose();
                            }
                        }
                        return [2 /*return*/, { reference: reference, predictions: predictions }];
                }
            });
        });
    };
    /*
     * optional seed for predictable shuffling of dataset
     */
    TeachableMobileNet.prototype.setSeed = function (seed) {
        this.seed = seedrandom(seed);
    };
    return TeachableMobileNet;
}(custom_mobilenet_1.CustomMobileNet));
exports.TeachableMobileNet = TeachableMobileNet;
function createTeachable(metadata, modelOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var mobilenet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, custom_mobilenet_1.loadTruncatedMobileNet(modelOptions)];
                case 1:
                    mobilenet = _a.sent();
                    return [2 /*return*/, new TeachableMobileNet(mobilenet, metadata)];
            }
        });
    });
}
exports.createTeachable = createTeachable;


/***/ }),

/***/ "./src/utils/canvas.ts":
/*!*****************************!*\
  !*** ./src/utils/canvas.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cropTo = exports.resizeMinTo = exports.resizeMaxTo = exports.resize = void 0;
var newCanvas = function () { return document.createElement('canvas'); };
function resize(image, scale, canvas) {
    if (canvas === void 0) { canvas = newCanvas(); }
    canvas.width = image.width * scale;
    canvas.height = image.height * scale;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
}
exports.resize = resize;
function resizeMaxTo(image, maxSize, canvas) {
    if (canvas === void 0) { canvas = newCanvas(); }
    var max = Math.max(image.width, image.height);
    return resize(image, maxSize / max, canvas);
}
exports.resizeMaxTo = resizeMaxTo;
function resizeMinTo(image, minSize, canvas) {
    if (canvas === void 0) { canvas = newCanvas(); }
    var min = Math.min(image.width, image.height);
    return resize(image, minSize / min, canvas);
}
exports.resizeMinTo = resizeMinTo;
function cropTo(image, size, flipped, canvas) {
    if (flipped === void 0) { flipped = false; }
    if (canvas === void 0) { canvas = newCanvas(); }
    // image image, bitmap, or canvas
    var width = image.width;
    var height = image.height;
    // if video element
    if (image instanceof HTMLVideoElement) {
        width = image.videoWidth;
        height = image.videoHeight;
    }
    var min = Math.min(width, height);
    var scale = size / min;
    var scaledW = Math.ceil(width * scale);
    var scaledH = Math.ceil(height * scale);
    var dx = scaledW - size;
    var dy = scaledH - size;
    canvas.width = canvas.height = size;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, ~~(dx / 2) * -1, ~~(dy / 2) * -1, scaledW, scaledH);
    // canvas is already sized and cropped to center correctly
    if (flipped) {
        ctx.scale(-1, 1);
        ctx.drawImage(canvas, size * -1, 0);
    }
    return canvas;
}
exports.cropTo = cropTo;


/***/ }),

/***/ "./src/utils/tf.ts":
/*!*************************!*\
  !*** ./src/utils/tf.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cropTensor = exports.capture = void 0;
var tf = __webpack_require__(/*! @tensorflow/tfjs */ "@tensorflow/tfjs");
/**
 * Receives an image and normalizes it between -1 and 1.
 * Returns a batched image (1 - element batch) of shape [1, w, h, c]
 * @param rasterElement the element with pixels to convert to a Tensor
 * @param grayscale optinal flag that changes the crop to [1, w, h, 1]
 */
function capture(rasterElement, grayscale) {
    return tf.tidy(function () {
        var pixels = tf.browser.fromPixels(rasterElement);
        // crop the image so we're using the center square
        var cropped = cropTensor(pixels, grayscale);
        // Expand the outer most dimension so we have a batch size of 1
        var batchedImage = cropped.expandDims(0);
        // Normalize the image between -1 and a1. The image comes in between 0-255
        // so we divide by 127 and subtract 1.
        return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    });
}
exports.capture = capture;
function cropTensor(img, grayscaleModel, grayscaleInput) {
    var size = Math.min(img.shape[0], img.shape[1]);
    var centerHeight = img.shape[0] / 2;
    var beginHeight = centerHeight - (size / 2);
    var centerWidth = img.shape[1] / 2;
    var beginWidth = centerWidth - (size / 2);
    if (grayscaleModel && !grayscaleInput) {
        //cropped rgb data
        var grayscale_cropped = img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
        grayscale_cropped = grayscale_cropped.reshape([size * size, 1, 3]);
        var rgb_weights = [0.2989, 0.5870, 0.1140];
        grayscale_cropped = tf.mul(grayscale_cropped, rgb_weights);
        grayscale_cropped = grayscale_cropped.reshape([size, size, 3]);
        grayscale_cropped = tf.sum(grayscale_cropped, -1);
        grayscale_cropped = tf.expandDims(grayscale_cropped, -1);
        return grayscale_cropped;
    }
    return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
}
exports.cropTensor = cropTensor;


/***/ }),

/***/ "./src/utils/webcam.ts":
/*!*****************************!*\
  !*** ./src/utils/webcam.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Webcam = void 0;
var autobind_decorator_1 = __webpack_require__(/*! autobind-decorator */ "./node_modules/autobind-decorator/lib/esm/index.js");
var canvas_1 = __webpack_require__(/*! ./canvas */ "./src/utils/canvas.ts");
var defaultVideoOptions = {
    facingMode: 'user',
    frameRate: 24
};
var fillConstraints = function (options) {
    options.facingMode = options.facingMode || defaultVideoOptions.facingMode;
    options.frameRate = options.frameRate || defaultVideoOptions.frameRate;
    options.aspectRatio = options.aspectRatio || defaultVideoOptions.aspectRatio;
    return options;
};
var Webcam = /** @class */ (function () {
    function Webcam(width, height, flip) {
        if (width === void 0) { width = 400; }
        if (height === void 0) { height = 400; }
        if (flip === void 0) { flip = false; }
        this.width = width;
        this.height = height;
        this.flip = flip;
    }
    Webcam.prototype.getWebcam = function (options) {
        if (options === void 0) { options = {}; }
        if (!window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
            return Promise.reject('Your browser does not support WebRTC. Please try another one.');
        }
        options.width = 640;
        var videoOptions = fillConstraints(options);
        var video = document.createElement('video');
        return window.navigator.mediaDevices.getUserMedia({ video: videoOptions })
            .then(function (mediaStream) {
            video.srcObject = mediaStream;
            video.addEventListener('loadedmetadata', function (event) {
                var vw = video.videoWidth, vh = video.videoHeight;
                video.width = vw;
                video.height = vh;
            });
            return video;
        }, function () {
            return Promise.reject('Could not open your camera. You may have denied access.');
        });
    };
    // setup or setupWebcam
    Webcam.prototype.setup = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.webcam) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getWebcam(options)];
                    case 1:
                        _a.webcam = _b.sent();
                        if (!this.canvas) {
                            this.canvas = document.createElement('canvas');
                            this.canvas.width = this.width;
                            this.canvas.height = this.height;
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Webcam.prototype.play = function () {
        var promise = this.webcam.play();
        return promise;
    };
    Webcam.prototype.pause = function () {
        this.webcam.pause();
    };
    Webcam.prototype.stop = function () {
        this.stopStreamedVideo(this.webcam);
    };
    Webcam.prototype.update = function () {
        this.renderCameraToCanvas();
    };
    Webcam.prototype.stopStreamedVideo = function (videoEl) {
        var stream = videoEl.srcObject;
        var tracks = stream.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
        videoEl.srcObject = null;
    };
    Webcam.prototype.renderCameraToCanvas = function () {
        if (this.canvas && this.webcam) {
            var ctx = this.canvas.getContext('2d');
            if (this.webcam.videoWidth !== 0) {
                var croppedCanvas = canvas_1.cropTo(this.webcam, this.width, this.flip);
                ctx.drawImage(croppedCanvas, 0, 0);
            }
        }
    };
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "getWebcam", null);
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "setup", null);
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "play", null);
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "pause", null);
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "stop", null);
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "update", null);
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "stopStreamedVideo", null);
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "renderCameraToCanvas", null);
    return Webcam;
}());
exports.Webcam = Webcam;


/***/ }),

/***/ "./src/version.ts":
/*!************************!*\
  !*** ./src/version.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @license See the LICENSE file. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = void 0;
// This code is auto-generated, do not modify this file!
var version = '0.8.4-alpha2';
exports.version = version;


/***/ }),

/***/ 0:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "@tensorflow/tfjs":
/*!*********************!*\
  !*** external "tf" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = tf;

/***/ })

/******/ });
