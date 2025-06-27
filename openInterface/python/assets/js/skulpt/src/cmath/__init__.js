/**
 * This file purpose a partial implementation of cmath library in Skulpt.
 * @author: Léo Meillier (leo mlr) 
 */

var $builtinmodule=function() {
    
    var mod = {};
    var isType = function (x, type) {
        return Sk.builtin.isinstance(x, Sk.builtin[type]).v;
    };
    
    var typeErrors = function (x) {
        if (isType(x, 'str')) {
            throw new Sk.builtin.TypeError("must be real number, not str");
        } else if (x && {}.toString.call(x) === '[object Function]') {
            throw new Sk.builtin.TypeError("must be real number, not type");
        } else if (isType(x, 'none')) {
            throw new Sk.builtin.TypeError("must be real number, not NoneType");
        }
    };
    
    var phase = function (x) {
        let a = 0, b = 0;
        typeErrors(x)
        if (x.real && x.imag) {
            a = x.real.v;
            b = x.imag.v;
        }   
        Sk.builtin.pyCheckType("b", "integer or float", Sk.builtin.checkNumber(b));
        Sk.builtin.pyCheckType("a", "integer or float", Sk.builtin.checkNumber(a));    
        return Sk.builtin.float_(Math.atan2(Sk.builtin.asnum$(b), Sk.builtin.asnum$(a)));
    };
    mod.phase = new Sk.builtin.func(function (x) {
        Sk.builtin.pyCheckArgsLen("phase", arguments.length, 1, 1);
        
        return phase(x);
    });
    
    mod.rect = new Sk.builtin.func(function (r, phi) {
        Sk.builtin.pyCheckArgsLen("rect", arguments.length, 2, 2);
        typeErrors(r)
        typeErrors(phi)
        let a = r.v*Math.cos(phi.v);
        let b = r.v*Math.sin(phi.v);
        
        return Sk.builtin.complex(Sk.builtin.float_(a), Sk.builtin.float_(b));
    });
    
    mod.polar = new Sk.builtin.func(function (x) {
        Sk.builtin.pyCheckArgsLen("polar", arguments.length, 1, 1);
        typeErrors(x);
        let r = x.v, phi = 0;
        if (x.real && x.imag) {
            r = Sk.builtin.abs(x).v;
            phi = phase(x).v;
        }

        return Sk.builtin.tuple([Sk.builtin.float_(r), Sk.builtin.float_(phi)]);
    });
    
    mod.exp = new Sk.builtin.func(function (x) {
        Sk.builtin.pyCheckArgsLen("exp", arguments.length, 1, 1);
        typeErrors(x);
        let a = 0, b = 0;
        if (x.real && x.imag) {
            a = Math.exp(x.real.v)*Math.cos(x.imag.v);
            b = Math.exp(x.real.v)*Math.sin(x.imag.v);
        } else {
            a = Math.exp(x.v);
        }
        
        return Sk.builtin.complex(Sk.builtin.float_(a), Sk.builtin.float_(b));
    });
    
    mod.pi = Sk.builtin.float_(3.141592653589793);
    mod.e = Sk.builtin.float_(2.718281828459045);
    mod.tau = Sk.builtin.float_(6.283185307179586);
    
    mod.log = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.log is not yet implemented");
    });
    mod.log10 = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.log10 is not yet implemented");
    });
    mod.sqrt = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.sqrt is not yet implemented");
    });
    mod.acos = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.acos is not yet implemented");
    });
    mod.asin = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.asin is not yet implemented");
    });
    mod.atan = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.atan is not yet implemented");
    });
    mod.cos = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.cos is not yet implemented");
    });
    mod.sin = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.sin is not yet implemented");
    });
    mod.tan = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.tan is not yet implemented");
    });
    mod.acosh = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.acosh is not yet implemented");
    });
    mod.asinh = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.asinh is not yet implemented");
    });
    mod.atanh = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.atanh is not yet implemented");
    });
    mod.cosh = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.cosh is not yet implemented");
    });
    mod.sinh = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.sinh is not yet implemented");
    });
    mod.tanh = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.tanh is not yet implemented");
    });
    mod.isfinite = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.isfinite is not yet implemented");
    });
    mod.isinf = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.isinf is not yet implemented");
    });
    mod.isnan = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.isnan is not yet implemented");
    });
    mod.isclose = new Sk.builtin.func(function() {
        throw new Sk.builtin.NotImplementedError("cmath.isclose is not yet implemented");
    });
    return mod;
};