/**
 * Minified by jsDelivr using Terser v5.15.1.
 * Original file: /npm/cannon-es@0.20.0/dist/cannon-es.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
class ObjectCollisionMatrix {
	constructor() {
		this.matrix = {};
	}
	get(e, t) {
		let { id: s } = e,
			{ id: i } = t;
		if (i > s) {
			const e = i;
			(i = s), (s = e);
		}
		return `${s}-${i}` in this.matrix;
	}
	set(e, t, s) {
		let { id: i } = e,
			{ id: o } = t;
		if (o > i) {
			const e = o;
			(o = i), (i = e);
		}
		s ? (this.matrix[`${i}-${o}`] = !0) : delete this.matrix[`${i}-${o}`];
	}
	reset() {
		this.matrix = {};
	}
	setNumObjects(e) {}
}
class Mat3 {
	constructor(e) {
		void 0 === e && (e = [0, 0, 0, 0, 0, 0, 0, 0, 0]), (this.elements = e);
	}
	identity() {
		const e = this.elements;
		(e[0] = 1), (e[1] = 0), (e[2] = 0), (e[3] = 0), (e[4] = 1), (e[5] = 0), (e[6] = 0), (e[7] = 0), (e[8] = 1);
	}
	setZero() {
		const e = this.elements;
		(e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 0), (e[4] = 0), (e[5] = 0), (e[6] = 0), (e[7] = 0), (e[8] = 0);
	}
	setTrace(e) {
		const t = this.elements;
		(t[0] = e.x), (t[4] = e.y), (t[8] = e.z);
	}
	getTrace(e) {
		void 0 === e && (e = new Vec3());
		const t = this.elements;
		return (e.x = t[0]), (e.y = t[4]), (e.z = t[8]), e;
	}
	vmult(e, t) {
		void 0 === t && (t = new Vec3());
		const s = this.elements,
			i = e.x,
			o = e.y,
			n = e.z;
		return (t.x = s[0] * i + s[1] * o + s[2] * n), (t.y = s[3] * i + s[4] * o + s[5] * n), (t.z = s[6] * i + s[7] * o + s[8] * n), t;
	}
	smult(e) {
		for (let t = 0; t < this.elements.length; t++) this.elements[t] *= e;
	}
	mmult(e, t) {
		void 0 === t && (t = new Mat3());
		const s = this.elements,
			i = e.elements,
			o = t.elements,
			n = s[0],
			r = s[1],
			a = s[2],
			l = s[3],
			c = s[4],
			h = s[5],
			d = s[6],
			p = s[7],
			u = s[8],
			m = i[0],
			v = i[1],
			y = i[2],
			g = i[3],
			x = i[4],
			f = i[5],
			w = i[6],
			b = i[7],
			_ = i[8];
		return (o[0] = n * m + r * g + a * w), (o[1] = n * v + r * x + a * b), (o[2] = n * y + r * f + a * _), (o[3] = l * m + c * g + h * w), (o[4] = l * v + c * x + h * b), (o[5] = l * y + c * f + h * _), (o[6] = d * m + p * g + u * w), (o[7] = d * v + p * x + u * b), (o[8] = d * y + p * f + u * _), t;
	}
	scale(e, t) {
		void 0 === t && (t = new Mat3());
		const s = this.elements,
			i = t.elements;
		for (let t = 0; 3 !== t; t++) (i[3 * t + 0] = e.x * s[3 * t + 0]), (i[3 * t + 1] = e.y * s[3 * t + 1]), (i[3 * t + 2] = e.z * s[3 * t + 2]);
		return t;
	}
	solve(e, t) {
		void 0 === t && (t = new Vec3());
		const s = [];
		let i, o;
		for (i = 0; i < 12; i++) s.push(0);
		for (i = 0; i < 3; i++) for (o = 0; o < 3; o++) s[i + 4 * o] = this.elements[i + 3 * o];
		(s[3] = e.x), (s[7] = e.y), (s[11] = e.z);
		let n = 3;
		const r = n;
		let a;
		let l;
		do {
			if (((i = r - n), 0 === s[i + 4 * i]))
				for (o = i + 1; o < r; o++)
					if (0 !== s[i + 4 * o]) {
						a = 4;
						do {
							(l = 4 - a), (s[l + 4 * i] += s[l + 4 * o]);
						} while (--a);
						break;
					}
			if (0 !== s[i + 4 * i])
				for (o = i + 1; o < r; o++) {
					const e = s[i + 4 * o] / s[i + 4 * i];
					a = 4;
					do {
						(l = 4 - a), (s[l + 4 * o] = l <= i ? 0 : s[l + 4 * o] - s[l + 4 * i] * e);
					} while (--a);
				}
		} while (--n);
		if (((t.z = s[11] / s[10]), (t.y = (s[7] - s[6] * t.z) / s[5]), (t.x = (s[3] - s[2] * t.z - s[1] * t.y) / s[0]), isNaN(t.x) || isNaN(t.y) || isNaN(t.z) || t.x === 1 / 0 || t.y === 1 / 0 || t.z === 1 / 0)) throw `Could not solve equation! Got x=[${t.toString()}], b=[${e.toString()}], A=[${this.toString()}]`;
		return t;
	}
	e(e, t, s) {
		if (void 0 === s) return this.elements[t + 3 * e];
		this.elements[t + 3 * e] = s;
	}
	copy(e) {
		for (let t = 0; t < e.elements.length; t++) this.elements[t] = e.elements[t];
		return this;
	}
	toString() {
		let e = '';
		for (let t = 0; t < 9; t++) e += this.elements[t] + ',';
		return e;
	}
	reverse(e) {
		void 0 === e && (e = new Mat3());
		const t = reverse_eqns;
		let s, i;
		for (s = 0; s < 3; s++) for (i = 0; i < 3; i++) t[s + 6 * i] = this.elements[s + 3 * i];
		(t[3] = 1), (t[9] = 0), (t[15] = 0), (t[4] = 0), (t[10] = 1), (t[16] = 0), (t[5] = 0), (t[11] = 0), (t[17] = 1);
		let o = 3;
		const n = o;
		let r;
		let a;
		do {
			if (((s = n - o), 0 === t[s + 6 * s]))
				for (i = s + 1; i < n; i++)
					if (0 !== t[s + 6 * i]) {
						r = 6;
						do {
							(a = 6 - r), (t[a + 6 * s] += t[a + 6 * i]);
						} while (--r);
						break;
					}
			if (0 !== t[s + 6 * s])
				for (i = s + 1; i < n; i++) {
					const e = t[s + 6 * i] / t[s + 6 * s];
					r = 6;
					do {
						(a = 6 - r), (t[a + 6 * i] = a <= s ? 0 : t[a + 6 * i] - t[a + 6 * s] * e);
					} while (--r);
				}
		} while (--o);
		s = 2;
		do {
			i = s - 1;
			do {
				const e = t[s + 6 * i] / t[s + 6 * s];
				r = 6;
				do {
					(a = 6 - r), (t[a + 6 * i] = t[a + 6 * i] - t[a + 6 * s] * e);
				} while (--r);
			} while (i--);
		} while (--s);
		s = 2;
		do {
			const e = 1 / t[s + 6 * s];
			r = 6;
			do {
				(a = 6 - r), (t[a + 6 * s] = t[a + 6 * s] * e);
			} while (--r);
		} while (s--);
		s = 2;
		do {
			i = 2;
			do {
				if (((a = t[3 + i + 6 * s]), isNaN(a) || a === 1 / 0)) throw `Could not reverse! A=[${this.toString()}]`;
				e.e(s, i, a);
			} while (i--);
		} while (s--);
		return e;
	}
	setRotationFromQuaternion(e) {
		const t = e.x,
			s = e.y,
			i = e.z,
			o = e.w,
			n = t + t,
			r = s + s,
			a = i + i,
			l = t * n,
			c = t * r,
			h = t * a,
			d = s * r,
			p = s * a,
			u = i * a,
			m = o * n,
			v = o * r,
			y = o * a,
			g = this.elements;
		return (g[0] = 1 - (d + u)), (g[1] = c - y), (g[2] = h + v), (g[3] = c + y), (g[4] = 1 - (l + u)), (g[5] = p - m), (g[6] = h - v), (g[7] = p + m), (g[8] = 1 - (l + d)), this;
	}
	transpose(e) {
		void 0 === e && (e = new Mat3());
		const t = this.elements,
			s = e.elements;
		let i;
		return (s[0] = t[0]), (s[4] = t[4]), (s[8] = t[8]), (i = t[1]), (s[1] = t[3]), (s[3] = i), (i = t[2]), (s[2] = t[6]), (s[6] = i), (i = t[5]), (s[5] = t[7]), (s[7] = i), e;
	}
}
const reverse_eqns = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
class Vec3 {
	constructor(e, t, s) {
		void 0 === e && (e = 0), void 0 === t && (t = 0), void 0 === s && (s = 0), (this.x = e), (this.y = t), (this.z = s);
	}
	cross(e, t) {
		void 0 === t && (t = new Vec3());
		const s = e.x,
			i = e.y,
			o = e.z,
			n = this.x,
			r = this.y,
			a = this.z;
		return (t.x = r * o - a * i), (t.y = a * s - n * o), (t.z = n * i - r * s), t;
	}
	set(e, t, s) {
		return (this.x = e), (this.y = t), (this.z = s), this;
	}
	setZero() {
		this.x = this.y = this.z = 0;
	}
	vadd(e, t) {
		if (!t) return new Vec3(this.x + e.x, this.y + e.y, this.z + e.z);
		(t.x = e.x + this.x), (t.y = e.y + this.y), (t.z = e.z + this.z);
	}
	vsub(e, t) {
		if (!t) return new Vec3(this.x - e.x, this.y - e.y, this.z - e.z);
		(t.x = this.x - e.x), (t.y = this.y - e.y), (t.z = this.z - e.z);
	}
	crossmat() {
		return new Mat3([0, -this.z, this.y, this.z, 0, -this.x, -this.y, this.x, 0]);
	}
	normalize() {
		const e = this.x,
			t = this.y,
			s = this.z,
			i = Math.sqrt(e * e + t * t + s * s);
		if (i > 0) {
			const e = 1 / i;
			(this.x *= e), (this.y *= e), (this.z *= e);
		} else (this.x = 0), (this.y = 0), (this.z = 0);
		return i;
	}
	unit(e) {
		void 0 === e && (e = new Vec3());
		const t = this.x,
			s = this.y,
			i = this.z;
		let o = Math.sqrt(t * t + s * s + i * i);
		return o > 0 ? ((o = 1 / o), (e.x = t * o), (e.y = s * o), (e.z = i * o)) : ((e.x = 1), (e.y = 0), (e.z = 0)), e;
	}
	length() {
		const e = this.x,
			t = this.y,
			s = this.z;
		return Math.sqrt(e * e + t * t + s * s);
	}
	lengthSquared() {
		return this.dot(this);
	}
	distanceTo(e) {
		const t = this.x,
			s = this.y,
			i = this.z,
			o = e.x,
			n = e.y,
			r = e.z;
		return Math.sqrt((o - t) * (o - t) + (n - s) * (n - s) + (r - i) * (r - i));
	}
	distanceSquared(e) {
		const t = this.x,
			s = this.y,
			i = this.z,
			o = e.x,
			n = e.y,
			r = e.z;
		return (o - t) * (o - t) + (n - s) * (n - s) + (r - i) * (r - i);
	}
	scale(e, t) {
		void 0 === t && (t = new Vec3());
		const s = this.x,
			i = this.y,
			o = this.z;
		return (t.x = e * s), (t.y = e * i), (t.z = e * o), t;
	}
	vmul(e, t) {
		return void 0 === t && (t = new Vec3()), (t.x = e.x * this.x), (t.y = e.y * this.y), (t.z = e.z * this.z), t;
	}
	addScaledVector(e, t, s) {
		return void 0 === s && (s = new Vec3()), (s.x = this.x + e * t.x), (s.y = this.y + e * t.y), (s.z = this.z + e * t.z), s;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z;
	}
	isZero() {
		return 0 === this.x && 0 === this.y && 0 === this.z;
	}
	negate(e) {
		return void 0 === e && (e = new Vec3()), (e.x = -this.x), (e.y = -this.y), (e.z = -this.z), e;
	}
	tangents(e, t) {
		const s = this.length();
		if (s > 0) {
			const i = Vec3_tangents_n,
				o = 1 / s;
			i.set(this.x * o, this.y * o, this.z * o);
			const n = Vec3_tangents_randVec;
			Math.abs(i.x) < 0.9 ? (n.set(1, 0, 0), i.cross(n, e)) : (n.set(0, 1, 0), i.cross(n, e)), i.cross(e, t);
		} else e.set(1, 0, 0), t.set(0, 1, 0);
	}
	toString() {
		return `${this.x},${this.y},${this.z}`;
	}
	toArray() {
		return [this.x, this.y, this.z];
	}
	copy(e) {
		return (this.x = e.x), (this.y = e.y), (this.z = e.z), this;
	}
	lerp(e, t, s) {
		const i = this.x,
			o = this.y,
			n = this.z;
		(s.x = i + (e.x - i) * t), (s.y = o + (e.y - o) * t), (s.z = n + (e.z - n) * t);
	}
	almostEquals(e, t) {
		return void 0 === t && (t = 1e-6), !(Math.abs(this.x - e.x) > t || Math.abs(this.y - e.y) > t || Math.abs(this.z - e.z) > t);
	}
	almostZero(e) {
		return void 0 === e && (e = 1e-6), !(Math.abs(this.x) > e || Math.abs(this.y) > e || Math.abs(this.z) > e);
	}
	isAntiparallelTo(e, t) {
		return this.negate(antip_neg), antip_neg.almostEquals(e, t);
	}
	clone() {
		return new Vec3(this.x, this.y, this.z);
	}
}
(Vec3.ZERO = new Vec3(0, 0, 0)), (Vec3.UNIT_X = new Vec3(1, 0, 0)), (Vec3.UNIT_Y = new Vec3(0, 1, 0)), (Vec3.UNIT_Z = new Vec3(0, 0, 1));
const Vec3_tangents_n = new Vec3(),
	Vec3_tangents_randVec = new Vec3(),
	antip_neg = new Vec3();
class AABB {
	constructor(e) {
		void 0 === e && (e = {}), (this.lowerBound = new Vec3()), (this.upperBound = new Vec3()), e.lowerBound && this.lowerBound.copy(e.lowerBound), e.upperBound && this.upperBound.copy(e.upperBound);
	}
	setFromPoints(e, t, s, i) {
		const o = this.lowerBound,
			n = this.upperBound,
			r = s;
		o.copy(e[0]), r && r.vmult(o, o), n.copy(o);
		for (let t = 1; t < e.length; t++) {
			let s = e[t];
			r && (r.vmult(s, tmp$1), (s = tmp$1)), s.x > n.x && (n.x = s.x), s.x < o.x && (o.x = s.x), s.y > n.y && (n.y = s.y), s.y < o.y && (o.y = s.y), s.z > n.z && (n.z = s.z), s.z < o.z && (o.z = s.z);
		}
		return t && (t.vadd(o, o), t.vadd(n, n)), i && ((o.x -= i), (o.y -= i), (o.z -= i), (n.x += i), (n.y += i), (n.z += i)), this;
	}
	copy(e) {
		return this.lowerBound.copy(e.lowerBound), this.upperBound.copy(e.upperBound), this;
	}
	clone() {
		return new AABB().copy(this);
	}
	extend(e) {
		(this.lowerBound.x = Math.min(this.lowerBound.x, e.lowerBound.x)), (this.upperBound.x = Math.max(this.upperBound.x, e.upperBound.x)), (this.lowerBound.y = Math.min(this.lowerBound.y, e.lowerBound.y)), (this.upperBound.y = Math.max(this.upperBound.y, e.upperBound.y)), (this.lowerBound.z = Math.min(this.lowerBound.z, e.lowerBound.z)), (this.upperBound.z = Math.max(this.upperBound.z, e.upperBound.z));
	}
	overlaps(e) {
		const t = this.lowerBound,
			s = this.upperBound,
			i = e.lowerBound,
			o = e.upperBound,
			n = (i.x <= s.x && s.x <= o.x) || (t.x <= o.x && o.x <= s.x),
			r = (i.y <= s.y && s.y <= o.y) || (t.y <= o.y && o.y <= s.y),
			a = (i.z <= s.z && s.z <= o.z) || (t.z <= o.z && o.z <= s.z);
		return n && r && a;
	}
	volume() {
		const e = this.lowerBound,
			t = this.upperBound;
		return (t.x - e.x) * (t.y - e.y) * (t.z - e.z);
	}
	contains(e) {
		const t = this.lowerBound,
			s = this.upperBound,
			i = e.lowerBound,
			o = e.upperBound;
		return t.x <= i.x && s.x >= o.x && t.y <= i.y && s.y >= o.y && t.z <= i.z && s.z >= o.z;
	}
	getCorners(e, t, s, i, o, n, r, a) {
		const l = this.lowerBound,
			c = this.upperBound;
		e.copy(l), t.set(c.x, l.y, l.z), s.set(c.x, c.y, l.z), i.set(l.x, c.y, c.z), o.set(c.x, l.y, c.z), n.set(l.x, c.y, l.z), r.set(l.x, l.y, c.z), a.copy(c);
	}
	toLocalFrame(e, t) {
		const s = transformIntoFrame_corners,
			i = s[0],
			o = s[1],
			n = s[2],
			r = s[3],
			a = s[4],
			l = s[5],
			c = s[6],
			h = s[7];
		this.getCorners(i, o, n, r, a, l, c, h);
		for (let t = 0; 8 !== t; t++) {
			const i = s[t];
			e.pointToLocal(i, i);
		}
		return t.setFromPoints(s);
	}
	toWorldFrame(e, t) {
		const s = transformIntoFrame_corners,
			i = s[0],
			o = s[1],
			n = s[2],
			r = s[3],
			a = s[4],
			l = s[5],
			c = s[6],
			h = s[7];
		this.getCorners(i, o, n, r, a, l, c, h);
		for (let t = 0; 8 !== t; t++) {
			const i = s[t];
			e.pointToWorld(i, i);
		}
		return t.setFromPoints(s);
	}
	overlapsRay(e) {
		const { direction: t, from: s } = e,
			i = 1 / t.x,
			o = 1 / t.y,
			n = 1 / t.z,
			r = (this.lowerBound.x - s.x) * i,
			a = (this.upperBound.x - s.x) * i,
			l = (this.lowerBound.y - s.y) * o,
			c = (this.upperBound.y - s.y) * o,
			h = (this.lowerBound.z - s.z) * n,
			d = (this.upperBound.z - s.z) * n,
			p = Math.max(Math.max(Math.min(r, a), Math.min(l, c)), Math.min(h, d)),
			u = Math.min(Math.min(Math.max(r, a), Math.max(l, c)), Math.max(h, d));
		return !(u < 0) && !(p > u);
	}
}
const tmp$1 = new Vec3(),
	transformIntoFrame_corners = [new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3()];
class ArrayCollisionMatrix {
	constructor() {
		this.matrix = [];
	}
	get(e, t) {
		let { index: s } = e,
			{ index: i } = t;
		if (i > s) {
			const e = i;
			(i = s), (s = e);
		}
		return this.matrix[((s * (s + 1)) >> 1) + i - 1];
	}
	set(e, t, s) {
		let { index: i } = e,
			{ index: o } = t;
		if (o > i) {
			const e = o;
			(o = i), (i = e);
		}
		this.matrix[((i * (i + 1)) >> 1) + o - 1] = s ? 1 : 0;
	}
	reset() {
		for (let e = 0, t = this.matrix.length; e !== t; e++) this.matrix[e] = 0;
	}
	setNumObjects(e) {
		this.matrix.length = (e * (e - 1)) >> 1;
	}
}
class EventTarget {
	addEventListener(e, t) {
		void 0 === this._listeners && (this._listeners = {});
		const s = this._listeners;
		return void 0 === s[e] && (s[e] = []), s[e].includes(t) || s[e].push(t), this;
	}
	hasEventListener(e, t) {
		if (void 0 === this._listeners) return !1;
		const s = this._listeners;
		return !(void 0 === s[e] || !s[e].includes(t));
	}
	hasAnyEventListener(e) {
		if (void 0 === this._listeners) return !1;
		return void 0 !== this._listeners[e];
	}
	removeEventListener(e, t) {
		if (void 0 === this._listeners) return this;
		const s = this._listeners;
		if (void 0 === s[e]) return this;
		const i = s[e].indexOf(t);
		return -1 !== i && s[e].splice(i, 1), this;
	}
	dispatchEvent(e) {
		if (void 0 === this._listeners) return this;
		const t = this._listeners[e.type];
		if (void 0 !== t) {
			e.target = this;
			for (let s = 0, i = t.length; s < i; s++) t[s].call(this, e);
		}
		return this;
	}
}
class Quaternion {
	constructor(e, t, s, i) {
		void 0 === e && (e = 0), void 0 === t && (t = 0), void 0 === s && (s = 0), void 0 === i && (i = 1), (this.x = e), (this.y = t), (this.z = s), (this.w = i);
	}
	set(e, t, s, i) {
		return (this.x = e), (this.y = t), (this.z = s), (this.w = i), this;
	}
	toString() {
		return `${this.x},${this.y},${this.z},${this.w}`;
	}
	toArray() {
		return [this.x, this.y, this.z, this.w];
	}
	setFromAxisAngle(e, t) {
		const s = Math.sin(0.5 * t);
		return (this.x = e.x * s), (this.y = e.y * s), (this.z = e.z * s), (this.w = Math.cos(0.5 * t)), this;
	}
	toAxisAngle(e) {
		void 0 === e && (e = new Vec3()), this.normalize();
		const t = 2 * Math.acos(this.w),
			s = Math.sqrt(1 - this.w * this.w);
		return s < 0.001 ? ((e.x = this.x), (e.y = this.y), (e.z = this.z)) : ((e.x = this.x / s), (e.y = this.y / s), (e.z = this.z / s)), [e, t];
	}
	setFromVectors(e, t) {
		if (e.isAntiparallelTo(t)) {
			const t = sfv_t1,
				s = sfv_t2;
			e.tangents(t, s), this.setFromAxisAngle(t, Math.PI);
		} else {
			const s = e.cross(t);
			(this.x = s.x), (this.y = s.y), (this.z = s.z), (this.w = Math.sqrt(e.length() ** 2 * t.length() ** 2) + e.dot(t)), this.normalize();
		}
		return this;
	}
	mult(e, t) {
		void 0 === t && (t = new Quaternion());
		const s = this.x,
			i = this.y,
			o = this.z,
			n = this.w,
			r = e.x,
			a = e.y,
			l = e.z,
			c = e.w;
		return (t.x = s * c + n * r + i * l - o * a), (t.y = i * c + n * a + o * r - s * l), (t.z = o * c + n * l + s * a - i * r), (t.w = n * c - s * r - i * a - o * l), t;
	}
	inverse(e) {
		void 0 === e && (e = new Quaternion());
		const t = this.x,
			s = this.y,
			i = this.z,
			o = this.w;
		this.conjugate(e);
		const n = 1 / (t * t + s * s + i * i + o * o);
		return (e.x *= n), (e.y *= n), (e.z *= n), (e.w *= n), e;
	}
	conjugate(e) {
		return void 0 === e && (e = new Quaternion()), (e.x = -this.x), (e.y = -this.y), (e.z = -this.z), (e.w = this.w), e;
	}
	normalize() {
		let e = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
		return 0 === e ? ((this.x = 0), (this.y = 0), (this.z = 0), (this.w = 0)) : ((e = 1 / e), (this.x *= e), (this.y *= e), (this.z *= e), (this.w *= e)), this;
	}
	normalizeFast() {
		const e = (3 - (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)) / 2;
		return 0 === e ? ((this.x = 0), (this.y = 0), (this.z = 0), (this.w = 0)) : ((this.x *= e), (this.y *= e), (this.z *= e), (this.w *= e)), this;
	}
	vmult(e, t) {
		void 0 === t && (t = new Vec3());
		const s = e.x,
			i = e.y,
			o = e.z,
			n = this.x,
			r = this.y,
			a = this.z,
			l = this.w,
			c = l * s + r * o - a * i,
			h = l * i + a * s - n * o,
			d = l * o + n * i - r * s,
			p = -n * s - r * i - a * o;
		return (t.x = c * l + p * -n + h * -a - d * -r), (t.y = h * l + p * -r + d * -n - c * -a), (t.z = d * l + p * -a + c * -r - h * -n), t;
	}
	copy(e) {
		return (this.x = e.x), (this.y = e.y), (this.z = e.z), (this.w = e.w), this;
	}
	toEuler(e, t) {
		let s, i, o;
		void 0 === t && (t = 'YZX');
		const n = this.x,
			r = this.y,
			a = this.z,
			l = this.w;
		if ('YZX' !== t) throw new Error(`Euler order ${t} not supported yet.`);
		{
			const e = n * r + a * l;
			if ((e > 0.499 && ((s = 2 * Math.atan2(n, l)), (i = Math.PI / 2), (o = 0)), e < -0.499 && ((s = -2 * Math.atan2(n, l)), (i = -Math.PI / 2), (o = 0)), void 0 === s)) {
				const t = n * n,
					c = r * r,
					h = a * a;
				(s = Math.atan2(2 * r * l - 2 * n * a, 1 - 2 * c - 2 * h)), (i = Math.asin(2 * e)), (o = Math.atan2(2 * n * l - 2 * r * a, 1 - 2 * t - 2 * h));
			}
		}
		(e.y = s), (e.z = i), (e.x = o);
	}
	setFromEuler(e, t, s, i) {
		void 0 === i && (i = 'XYZ');
		const o = Math.cos(e / 2),
			n = Math.cos(t / 2),
			r = Math.cos(s / 2),
			a = Math.sin(e / 2),
			l = Math.sin(t / 2),
			c = Math.sin(s / 2);
		return (
			'XYZ' === i
				? ((this.x = a * n * r + o * l * c), (this.y = o * l * r - a * n * c), (this.z = o * n * c + a * l * r), (this.w = o * n * r - a * l * c))
				: 'YXZ' === i
				? ((this.x = a * n * r + o * l * c), (this.y = o * l * r - a * n * c), (this.z = o * n * c - a * l * r), (this.w = o * n * r + a * l * c))
				: 'ZXY' === i
				? ((this.x = a * n * r - o * l * c), (this.y = o * l * r + a * n * c), (this.z = o * n * c + a * l * r), (this.w = o * n * r - a * l * c))
				: 'ZYX' === i
				? ((this.x = a * n * r - o * l * c), (this.y = o * l * r + a * n * c), (this.z = o * n * c - a * l * r), (this.w = o * n * r + a * l * c))
				: 'YZX' === i
				? ((this.x = a * n * r + o * l * c), (this.y = o * l * r + a * n * c), (this.z = o * n * c - a * l * r), (this.w = o * n * r - a * l * c))
				: 'XZY' === i && ((this.x = a * n * r - o * l * c), (this.y = o * l * r - a * n * c), (this.z = o * n * c + a * l * r), (this.w = o * n * r + a * l * c)),
			this
		);
	}
	clone() {
		return new Quaternion(this.x, this.y, this.z, this.w);
	}
	slerp(e, t, s) {
		void 0 === s && (s = new Quaternion());
		const i = this.x,
			o = this.y,
			n = this.z,
			r = this.w;
		let a,
			l,
			c,
			h,
			d,
			p = e.x,
			u = e.y,
			m = e.z,
			v = e.w;
		return (l = i * p + o * u + n * m + r * v), l < 0 && ((l = -l), (p = -p), (u = -u), (m = -m), (v = -v)), 1 - l > 1e-6 ? ((a = Math.acos(l)), (c = Math.sin(a)), (h = Math.sin((1 - t) * a) / c), (d = Math.sin(t * a) / c)) : ((h = 1 - t), (d = t)), (s.x = h * i + d * p), (s.y = h * o + d * u), (s.z = h * n + d * m), (s.w = h * r + d * v), s;
	}
	integrate(e, t, s, i) {
		void 0 === i && (i = new Quaternion());
		const o = e.x * s.x,
			n = e.y * s.y,
			r = e.z * s.z,
			a = this.x,
			l = this.y,
			c = this.z,
			h = this.w,
			d = 0.5 * t;
		return (i.x += d * (o * h + n * c - r * l)), (i.y += d * (n * h + r * a - o * c)), (i.z += d * (r * h + o * l - n * a)), (i.w += d * (-o * a - n * l - r * c)), i;
	}
}
const sfv_t1 = new Vec3(),
	sfv_t2 = new Vec3(),
	SHAPE_TYPES = { SPHERE: 1, PLANE: 2, BOX: 4, COMPOUND: 8, CONVEXPOLYHEDRON: 16, HEIGHTFIELD: 32, PARTICLE: 64, CYLINDER: 128, TRIMESH: 256 };
class Shape {
	constructor(e) {
		void 0 === e && (e = {}), (this.id = Shape.idCounter++), (this.type = e.type || 0), (this.boundingSphereRadius = 0), (this.collisionResponse = !e.collisionResponse || e.collisionResponse), (this.collisionFilterGroup = void 0 !== e.collisionFilterGroup ? e.collisionFilterGroup : 1), (this.collisionFilterMask = void 0 !== e.collisionFilterMask ? e.collisionFilterMask : -1), (this.material = e.material ? e.material : null), (this.body = null);
	}
	updateBoundingSphereRadius() {
		throw `computeBoundingSphereRadius() not implemented for shape type ${this.type}`;
	}
	volume() {
		throw `volume() not implemented for shape type ${this.type}`;
	}
	calculateLocalInertia(e, t) {
		throw `calculateLocalInertia() not implemented for shape type ${this.type}`;
	}
	calculateWorldAABB(e, t, s, i) {
		throw `calculateWorldAABB() not implemented for shape type ${this.type}`;
	}
}
(Shape.idCounter = 0), (Shape.types = SHAPE_TYPES);
class Transform {
	constructor(e) {
		void 0 === e && (e = {}), (this.position = new Vec3()), (this.quaternion = new Quaternion()), e.position && this.position.copy(e.position), e.quaternion && this.quaternion.copy(e.quaternion);
	}
	pointToLocal(e, t) {
		return Transform.pointToLocalFrame(this.position, this.quaternion, e, t);
	}
	pointToWorld(e, t) {
		return Transform.pointToWorldFrame(this.position, this.quaternion, e, t);
	}
	vectorToWorldFrame(e, t) {
		return void 0 === t && (t = new Vec3()), this.quaternion.vmult(e, t), t;
	}
	static pointToLocalFrame(e, t, s, i) {
		return void 0 === i && (i = new Vec3()), s.vsub(e, i), t.conjugate(tmpQuat$1), tmpQuat$1.vmult(i, i), i;
	}
	static pointToWorldFrame(e, t, s, i) {
		return void 0 === i && (i = new Vec3()), t.vmult(s, i), i.vadd(e, i), i;
	}
	static vectorToWorldFrame(e, t, s) {
		return void 0 === s && (s = new Vec3()), e.vmult(t, s), s;
	}
	static vectorToLocalFrame(e, t, s, i) {
		return void 0 === i && (i = new Vec3()), (t.w *= -1), t.vmult(s, i), (t.w *= -1), i;
	}
}
const tmpQuat$1 = new Quaternion();
class ConvexPolyhedron extends Shape {
	constructor(e) {
		void 0 === e && (e = {});
		const { vertices: t = [], faces: s = [], normals: i = [], axes: o, boundingSphereRadius: n } = e;
		super({ type: Shape.types.CONVEXPOLYHEDRON }), (this.vertices = t), (this.faces = s), (this.faceNormals = i), 0 === this.faceNormals.length && this.computeNormals(), n ? (this.boundingSphereRadius = n) : this.updateBoundingSphereRadius(), (this.worldVertices = []), (this.worldVerticesNeedsUpdate = !0), (this.worldFaceNormals = []), (this.worldFaceNormalsNeedsUpdate = !0), (this.uniqueAxes = o ? o.slice() : null), (this.uniqueEdges = []), this.computeEdges();
	}
	computeEdges() {
		const e = this.faces,
			t = this.vertices,
			s = this.uniqueEdges;
		s.length = 0;
		const i = new Vec3();
		for (let o = 0; o !== e.length; o++) {
			const n = e[o],
				r = n.length;
			for (let e = 0; e !== r; e++) {
				const o = (e + 1) % r;
				t[n[e]].vsub(t[n[o]], i), i.normalize();
				let a = !1;
				for (let e = 0; e !== s.length; e++)
					if (s[e].almostEquals(i) || s[e].almostEquals(i)) {
						a = !0;
						break;
					}
				a || s.push(i.clone());
			}
		}
	}
	computeNormals() {
		this.faceNormals.length = this.faces.length;
		for (let e = 0; e < this.faces.length; e++) {
			for (let t = 0; t < this.faces[e].length; t++) if (!this.vertices[this.faces[e][t]]) throw new Error(`Vertex ${this.faces[e][t]} not found!`);
			const t = this.faceNormals[e] || new Vec3();
			this.getFaceNormal(e, t), t.negate(t), (this.faceNormals[e] = t);
			const s = this.vertices[this.faces[e][0]];
			if (t.dot(s) < 0) {
				console.error(`.faceNormals[${e}] = Vec3(${t.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);
				for (let t = 0; t < this.faces[e].length; t++) console.warn(`.vertices[${this.faces[e][t]}] = Vec3(${this.vertices[this.faces[e][t]].toString()})`);
			}
		}
	}
	getFaceNormal(e, t) {
		const s = this.faces[e],
			i = this.vertices[s[0]],
			o = this.vertices[s[1]],
			n = this.vertices[s[2]];
		ConvexPolyhedron.computeNormal(i, o, n, t);
	}
	static computeNormal(e, t, s, i) {
		const o = new Vec3(),
			n = new Vec3();
		t.vsub(e, n), s.vsub(t, o), o.cross(n, i), i.isZero() || i.normalize();
	}
	clipAgainstHull(e, t, s, i, o, n, r, a, l) {
		const c = new Vec3();
		let h = -1,
			d = -Number.MAX_VALUE;
		for (let e = 0; e < s.faces.length; e++) {
			c.copy(s.faceNormals[e]), o.vmult(c, c);
			const t = c.dot(n);
			t > d && ((d = t), (h = e));
		}
		const p = [];
		for (let e = 0; e < s.faces[h].length; e++) {
			const t = s.vertices[s.faces[h][e]],
				n = new Vec3();
			n.copy(t), o.vmult(n, n), i.vadd(n, n), p.push(n);
		}
		h >= 0 && this.clipFaceAgainstHull(n, e, t, p, r, a, l);
	}
	findSeparatingAxis(e, t, s, i, o, n, r, a) {
		const l = new Vec3(),
			c = new Vec3(),
			h = new Vec3(),
			d = new Vec3(),
			p = new Vec3(),
			u = new Vec3();
		let m = Number.MAX_VALUE;
		const v = this;
		if (v.uniqueAxes)
			for (let r = 0; r !== v.uniqueAxes.length; r++) {
				s.vmult(v.uniqueAxes[r], l);
				const a = v.testSepAxis(l, e, t, s, i, o);
				if (!1 === a) return !1;
				a < m && ((m = a), n.copy(l));
			}
		else {
			const a = r ? r.length : v.faces.length;
			for (let c = 0; c < a; c++) {
				const a = r ? r[c] : c;
				l.copy(v.faceNormals[a]), s.vmult(l, l);
				const h = v.testSepAxis(l, e, t, s, i, o);
				if (!1 === h) return !1;
				h < m && ((m = h), n.copy(l));
			}
		}
		if (e.uniqueAxes)
			for (let r = 0; r !== e.uniqueAxes.length; r++) {
				o.vmult(e.uniqueAxes[r], c);
				const a = v.testSepAxis(c, e, t, s, i, o);
				if (!1 === a) return !1;
				a < m && ((m = a), n.copy(c));
			}
		else {
			const r = a ? a.length : e.faces.length;
			for (let l = 0; l < r; l++) {
				const r = a ? a[l] : l;
				c.copy(e.faceNormals[r]), o.vmult(c, c);
				const h = v.testSepAxis(c, e, t, s, i, o);
				if (!1 === h) return !1;
				h < m && ((m = h), n.copy(c));
			}
		}
		for (let r = 0; r !== v.uniqueEdges.length; r++) {
			s.vmult(v.uniqueEdges[r], d);
			for (let r = 0; r !== e.uniqueEdges.length; r++)
				if ((o.vmult(e.uniqueEdges[r], p), d.cross(p, u), !u.almostZero())) {
					u.normalize();
					const r = v.testSepAxis(u, e, t, s, i, o);
					if (!1 === r) return !1;
					r < m && ((m = r), n.copy(u));
				}
		}
		return i.vsub(t, h), h.dot(n) > 0 && n.negate(n), !0;
	}
	testSepAxis(e, t, s, i, o, n) {
		ConvexPolyhedron.project(this, e, s, i, maxminA), ConvexPolyhedron.project(t, e, o, n, maxminB);
		const r = maxminA[0],
			a = maxminA[1],
			l = maxminB[0],
			c = maxminB[1];
		if (r < c || l < a) return !1;
		const h = r - c,
			d = l - a;
		return h < d ? h : d;
	}
	calculateLocalInertia(e, t) {
		const s = new Vec3(),
			i = new Vec3();
		this.computeLocalAABB(i, s);
		const o = s.x - i.x,
			n = s.y - i.y,
			r = s.z - i.z;
		(t.x = (1 / 12) * e * (2 * n * 2 * n + 2 * r * 2 * r)), (t.y = (1 / 12) * e * (2 * o * 2 * o + 2 * r * 2 * r)), (t.z = (1 / 12) * e * (2 * n * 2 * n + 2 * o * 2 * o));
	}
	getPlaneConstantOfFace(e) {
		const t = this.faces[e],
			s = this.faceNormals[e],
			i = this.vertices[t[0]];
		return -s.dot(i);
	}
	clipFaceAgainstHull(e, t, s, i, o, n, r) {
		const a = new Vec3(),
			l = new Vec3(),
			c = new Vec3(),
			h = new Vec3(),
			d = new Vec3(),
			p = new Vec3(),
			u = new Vec3(),
			m = new Vec3(),
			v = this,
			y = i,
			g = [];
		let x = -1,
			f = Number.MAX_VALUE;
		for (let t = 0; t < v.faces.length; t++) {
			a.copy(v.faceNormals[t]), s.vmult(a, a);
			const i = a.dot(e);
			i < f && ((f = i), (x = t));
		}
		if (x < 0) return;
		const w = v.faces[x];
		w.connectedFaces = [];
		for (let e = 0; e < v.faces.length; e++) for (let t = 0; t < v.faces[e].length; t++) -1 !== w.indexOf(v.faces[e][t]) && e !== x && -1 === w.connectedFaces.indexOf(e) && w.connectedFaces.push(e);
		const b = w.length;
		for (let e = 0; e < b; e++) {
			const i = v.vertices[w[e]],
				o = v.vertices[w[(e + 1) % b]];
			i.vsub(o, l), c.copy(l), s.vmult(c, c), t.vadd(c, c), h.copy(this.faceNormals[x]), s.vmult(h, h), t.vadd(h, h), c.cross(h, d), d.negate(d), p.copy(i), s.vmult(p, p), t.vadd(p, p);
			const n = w.connectedFaces[e];
			u.copy(this.faceNormals[n]);
			const r = this.getPlaneConstantOfFace(n);
			m.copy(u), s.vmult(m, m);
			const a = r - m.dot(t);
			for (this.clipFaceAgainstPlane(y, g, m, a); y.length; ) y.shift();
			for (; g.length; ) y.push(g.shift());
		}
		u.copy(this.faceNormals[x]);
		const _ = this.getPlaneConstantOfFace(x);
		m.copy(u), s.vmult(m, m);
		const B = _ - m.dot(t);
		for (let e = 0; e < y.length; e++) {
			let t = m.dot(y[e]) + B;
			if ((t <= o && (console.log(`clamped: depth=${t} to minDist=${o}`), (t = o)), t <= n)) {
				const s = y[e];
				if (t <= 1e-6) {
					const e = { point: s, normal: m, depth: t };
					r.push(e);
				}
			}
		}
	}
	clipFaceAgainstPlane(e, t, s, i) {
		let o, n;
		const r = e.length;
		if (r < 2) return t;
		let a = e[e.length - 1],
			l = e[0];
		o = s.dot(a) + i;
		for (let c = 0; c < r; c++) {
			if (((l = e[c]), (n = s.dot(l) + i), o < 0))
				if (n < 0) {
					const e = new Vec3();
					e.copy(l), t.push(e);
				} else {
					const e = new Vec3();
					a.lerp(l, o / (o - n), e), t.push(e);
				}
			else if (n < 0) {
				const e = new Vec3();
				a.lerp(l, o / (o - n), e), t.push(e), t.push(l);
			}
			(a = l), (o = n);
		}
		return t;
	}
	computeWorldVertices(e, t) {
		for (; this.worldVertices.length < this.vertices.length; ) this.worldVertices.push(new Vec3());
		const s = this.vertices,
			i = this.worldVertices;
		for (let o = 0; o !== this.vertices.length; o++) t.vmult(s[o], i[o]), e.vadd(i[o], i[o]);
		this.worldVerticesNeedsUpdate = !1;
	}
	computeLocalAABB(e, t) {
		const s = this.vertices;
		e.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), t.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
		for (let i = 0; i < this.vertices.length; i++) {
			const o = s[i];
			o.x < e.x ? (e.x = o.x) : o.x > t.x && (t.x = o.x), o.y < e.y ? (e.y = o.y) : o.y > t.y && (t.y = o.y), o.z < e.z ? (e.z = o.z) : o.z > t.z && (t.z = o.z);
		}
	}
	computeWorldFaceNormals(e) {
		const t = this.faceNormals.length;
		for (; this.worldFaceNormals.length < t; ) this.worldFaceNormals.push(new Vec3());
		const s = this.faceNormals,
			i = this.worldFaceNormals;
		for (let o = 0; o !== t; o++) e.vmult(s[o], i[o]);
		this.worldFaceNormalsNeedsUpdate = !1;
	}
	updateBoundingSphereRadius() {
		let e = 0;
		const t = this.vertices;
		for (let s = 0; s !== t.length; s++) {
			const i = t[s].lengthSquared();
			i > e && (e = i);
		}
		this.boundingSphereRadius = Math.sqrt(e);
	}
	calculateWorldAABB(e, t, s, i) {
		const o = this.vertices;
		let n,
			r,
			a,
			l,
			c,
			h,
			d = new Vec3();
		for (let s = 0; s < o.length; s++) {
			d.copy(o[s]), t.vmult(d, d), e.vadd(d, d);
			const i = d;
			(void 0 === n || i.x < n) && (n = i.x), (void 0 === l || i.x > l) && (l = i.x), (void 0 === r || i.y < r) && (r = i.y), (void 0 === c || i.y > c) && (c = i.y), (void 0 === a || i.z < a) && (a = i.z), (void 0 === h || i.z > h) && (h = i.z);
		}
		s.set(n, r, a), i.set(l, c, h);
	}
	volume() {
		return (4 * Math.PI * this.boundingSphereRadius) / 3;
	}
	getAveragePointLocal(e) {
		void 0 === e && (e = new Vec3());
		const t = this.vertices;
		for (let s = 0; s < t.length; s++) e.vadd(t[s], e);
		return e.scale(1 / t.length, e), e;
	}
	transformAllPoints(e, t) {
		const s = this.vertices.length,
			i = this.vertices;
		if (t) {
			for (let e = 0; e < s; e++) {
				const s = i[e];
				t.vmult(s, s);
			}
			for (let e = 0; e < this.faceNormals.length; e++) {
				const s = this.faceNormals[e];
				t.vmult(s, s);
			}
		}
		if (e)
			for (let t = 0; t < s; t++) {
				const s = i[t];
				s.vadd(e, s);
			}
	}
	pointIsInside(e) {
		const t = this.vertices,
			s = this.faces,
			i = this.faceNormals,
			o = new Vec3();
		this.getAveragePointLocal(o);
		for (let n = 0; n < this.faces.length; n++) {
			let r = i[n];
			const a = t[s[n][0]],
				l = new Vec3();
			e.vsub(a, l);
			const c = r.dot(l),
				h = new Vec3();
			o.vsub(a, h);
			const d = r.dot(h);
			if ((c < 0 && d > 0) || (c > 0 && d < 0)) return !1;
		}
		return -1;
	}
	static project(e, t, s, i, o) {
		const n = e.vertices.length,
			r = project_localAxis;
		let a = 0,
			l = 0;
		const c = project_localOrigin,
			h = e.vertices;
		c.setZero(), Transform.vectorToLocalFrame(s, i, t, r), Transform.pointToLocalFrame(s, i, c, c);
		const d = c.dot(r);
		l = a = h[0].dot(r);
		for (let e = 1; e < n; e++) {
			const t = h[e].dot(r);
			t > a && (a = t), t < l && (l = t);
		}
		if (((l -= d), (a -= d), l > a)) {
			const e = l;
			(l = a), (a = e);
		}
		(o[0] = a), (o[1] = l);
	}
}
const maxminA = [],
	maxminB = [],
	project_worldVertex = new Vec3(),
	project_localAxis = new Vec3(),
	project_localOrigin = new Vec3();
class Box extends Shape {
	constructor(e) {
		super({ type: Shape.types.BOX }), (this.halfExtents = e), (this.convexPolyhedronRepresentation = null), this.updateConvexPolyhedronRepresentation(), this.updateBoundingSphereRadius();
	}
	updateConvexPolyhedronRepresentation() {
		const e = this.halfExtents.x,
			t = this.halfExtents.y,
			s = this.halfExtents.z,
			i = Vec3,
			o = [new i(-e, -t, -s), new i(e, -t, -s), new i(e, t, -s), new i(-e, t, -s), new i(-e, -t, s), new i(e, -t, s), new i(e, t, s), new i(-e, t, s)],
			n = [new i(0, 0, 1), new i(0, 1, 0), new i(1, 0, 0)],
			r = new ConvexPolyhedron({
				vertices: o,
				faces: [
					[3, 2, 1, 0],
					[4, 5, 6, 7],
					[5, 4, 0, 1],
					[2, 3, 7, 6],
					[0, 4, 7, 3],
					[1, 2, 6, 5],
				],
				axes: n,
			});
		(this.convexPolyhedronRepresentation = r), (r.material = this.material);
	}
	calculateLocalInertia(e, t) {
		return void 0 === t && (t = new Vec3()), Box.calculateInertia(this.halfExtents, e, t), t;
	}
	static calculateInertia(e, t, s) {
		const i = e;
		(s.x = (1 / 12) * t * (2 * i.y * 2 * i.y + 2 * i.z * 2 * i.z)), (s.y = (1 / 12) * t * (2 * i.x * 2 * i.x + 2 * i.z * 2 * i.z)), (s.z = (1 / 12) * t * (2 * i.y * 2 * i.y + 2 * i.x * 2 * i.x));
	}
	getSideNormals(e, t) {
		const s = e,
			i = this.halfExtents;
		if ((s[0].set(i.x, 0, 0), s[1].set(0, i.y, 0), s[2].set(0, 0, i.z), s[3].set(-i.x, 0, 0), s[4].set(0, -i.y, 0), s[5].set(0, 0, -i.z), void 0 !== t)) for (let e = 0; e !== s.length; e++) t.vmult(s[e], s[e]);
		return s;
	}
	volume() {
		return 8 * this.halfExtents.x * this.halfExtents.y * this.halfExtents.z;
	}
	updateBoundingSphereRadius() {
		this.boundingSphereRadius = this.halfExtents.length();
	}
	forEachWorldCorner(e, t, s) {
		const i = this.halfExtents,
			o = [
				[i.x, i.y, i.z],
				[-i.x, i.y, i.z],
				[-i.x, -i.y, i.z],
				[-i.x, -i.y, -i.z],
				[i.x, -i.y, -i.z],
				[i.x, i.y, -i.z],
				[-i.x, i.y, -i.z],
				[i.x, -i.y, i.z],
			];
		for (let i = 0; i < o.length; i++) worldCornerTempPos.set(o[i][0], o[i][1], o[i][2]), t.vmult(worldCornerTempPos, worldCornerTempPos), e.vadd(worldCornerTempPos, worldCornerTempPos), s(worldCornerTempPos.x, worldCornerTempPos.y, worldCornerTempPos.z);
	}
	calculateWorldAABB(e, t, s, i) {
		const o = this.halfExtents;
		worldCornersTemp[0].set(o.x, o.y, o.z), worldCornersTemp[1].set(-o.x, o.y, o.z), worldCornersTemp[2].set(-o.x, -o.y, o.z), worldCornersTemp[3].set(-o.x, -o.y, -o.z), worldCornersTemp[4].set(o.x, -o.y, -o.z), worldCornersTemp[5].set(o.x, o.y, -o.z), worldCornersTemp[6].set(-o.x, o.y, -o.z), worldCornersTemp[7].set(o.x, -o.y, o.z);
		const n = worldCornersTemp[0];
		t.vmult(n, n), e.vadd(n, n), i.copy(n), s.copy(n);
		for (let o = 1; o < 8; o++) {
			const n = worldCornersTemp[o];
			t.vmult(n, n), e.vadd(n, n);
			const r = n.x,
				a = n.y,
				l = n.z;
			r > i.x && (i.x = r), a > i.y && (i.y = a), l > i.z && (i.z = l), r < s.x && (s.x = r), a < s.y && (s.y = a), l < s.z && (s.z = l);
		}
	}
}
const worldCornerTempPos = new Vec3(),
	worldCornersTemp = [new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3()],
	BODY_TYPES = { DYNAMIC: 1, STATIC: 2, KINEMATIC: 4 },
	BODY_SLEEP_STATES = { AWAKE: 0, SLEEPY: 1, SLEEPING: 2 };
class Body extends EventTarget {
	constructor(e) {
		void 0 === e && (e = {}),
			super(),
			(this.id = Body.idCounter++),
			(this.index = -1),
			(this.world = null),
			(this.vlambda = new Vec3()),
			(this.collisionFilterGroup = 'number' == typeof e.collisionFilterGroup ? e.collisionFilterGroup : 1),
			(this.collisionFilterMask = 'number' == typeof e.collisionFilterMask ? e.collisionFilterMask : -1),
			(this.collisionResponse = 'boolean' != typeof e.collisionResponse || e.collisionResponse),
			(this.position = new Vec3()),
			(this.previousPosition = new Vec3()),
			(this.interpolatedPosition = new Vec3()),
			(this.initPosition = new Vec3()),
			e.position && (this.position.copy(e.position), this.previousPosition.copy(e.position), this.interpolatedPosition.copy(e.position), this.initPosition.copy(e.position)),
			(this.velocity = new Vec3()),
			e.velocity && this.velocity.copy(e.velocity),
			(this.initVelocity = new Vec3()),
			(this.force = new Vec3());
		const t = 'number' == typeof e.mass ? e.mass : 0;
		(this.mass = t),
			(this.invMass = t > 0 ? 1 / t : 0),
			(this.material = e.material || null),
			(this.linearDamping = 'number' == typeof e.linearDamping ? e.linearDamping : 0.01),
			(this.type = t <= 0 ? Body.STATIC : Body.DYNAMIC),
			typeof e.type == typeof Body.STATIC && (this.type = e.type),
			(this.allowSleep = void 0 === e.allowSleep || e.allowSleep),
			(this.sleepState = Body.AWAKE),
			(this.sleepSpeedLimit = void 0 !== e.sleepSpeedLimit ? e.sleepSpeedLimit : 0.1),
			(this.sleepTimeLimit = void 0 !== e.sleepTimeLimit ? e.sleepTimeLimit : 1),
			(this.timeLastSleepy = 0),
			(this.wakeUpAfterNarrowphase = !1),
			(this.torque = new Vec3()),
			(this.quaternion = new Quaternion()),
			(this.initQuaternion = new Quaternion()),
			(this.previousQuaternion = new Quaternion()),
			(this.interpolatedQuaternion = new Quaternion()),
			e.quaternion && (this.quaternion.copy(e.quaternion), this.initQuaternion.copy(e.quaternion), this.previousQuaternion.copy(e.quaternion), this.interpolatedQuaternion.copy(e.quaternion)),
			(this.angularVelocity = new Vec3()),
			e.angularVelocity && this.angularVelocity.copy(e.angularVelocity),
			(this.initAngularVelocity = new Vec3()),
			(this.shapes = []),
			(this.shapeOffsets = []),
			(this.shapeOrientations = []),
			(this.inertia = new Vec3()),
			(this.invInertia = new Vec3()),
			(this.invInertiaWorld = new Mat3()),
			(this.invMassSolve = 0),
			(this.invInertiaSolve = new Vec3()),
			(this.invInertiaWorldSolve = new Mat3()),
			(this.fixedRotation = void 0 !== e.fixedRotation && e.fixedRotation),
			(this.angularDamping = void 0 !== e.angularDamping ? e.angularDamping : 0.01),
			(this.linearFactor = new Vec3(1, 1, 1)),
			e.linearFactor && this.linearFactor.copy(e.linearFactor),
			(this.angularFactor = new Vec3(1, 1, 1)),
			e.angularFactor && this.angularFactor.copy(e.angularFactor),
			(this.aabb = new AABB()),
			(this.aabbNeedsUpdate = !0),
			(this.boundingRadius = 0),
			(this.wlambda = new Vec3()),
			(this.isTrigger = Boolean(e.isTrigger)),
			e.shape && this.addShape(e.shape),
			this.updateMassProperties();
	}
	wakeUp() {
		const e = this.sleepState;
		(this.sleepState = Body.AWAKE), (this.wakeUpAfterNarrowphase = !1), e === Body.SLEEPING && this.dispatchEvent(Body.wakeupEvent);
	}
	sleep() {
		(this.sleepState = Body.SLEEPING), this.velocity.set(0, 0, 0), this.angularVelocity.set(0, 0, 0), (this.wakeUpAfterNarrowphase = !1);
	}
	sleepTick(e) {
		if (this.allowSleep) {
			const t = this.sleepState,
				s = this.velocity.lengthSquared() + this.angularVelocity.lengthSquared(),
				i = this.sleepSpeedLimit ** 2;
			t === Body.AWAKE && s < i ? ((this.sleepState = Body.SLEEPY), (this.timeLastSleepy = e), this.dispatchEvent(Body.sleepyEvent)) : t === Body.SLEEPY && s > i ? this.wakeUp() : t === Body.SLEEPY && e - this.timeLastSleepy > this.sleepTimeLimit && (this.sleep(), this.dispatchEvent(Body.sleepEvent));
		}
	}
	updateSolveMassProperties() {
		this.sleepState === Body.SLEEPING || this.type === Body.KINEMATIC ? ((this.invMassSolve = 0), this.invInertiaSolve.setZero(), this.invInertiaWorldSolve.setZero()) : ((this.invMassSolve = this.invMass), this.invInertiaSolve.copy(this.invInertia), this.invInertiaWorldSolve.copy(this.invInertiaWorld));
	}
	pointToLocalFrame(e, t) {
		return void 0 === t && (t = new Vec3()), e.vsub(this.position, t), this.quaternion.conjugate().vmult(t, t), t;
	}
	vectorToLocalFrame(e, t) {
		return void 0 === t && (t = new Vec3()), this.quaternion.conjugate().vmult(e, t), t;
	}
	pointToWorldFrame(e, t) {
		return void 0 === t && (t = new Vec3()), this.quaternion.vmult(e, t), t.vadd(this.position, t), t;
	}
	vectorToWorldFrame(e, t) {
		return void 0 === t && (t = new Vec3()), this.quaternion.vmult(e, t), t;
	}
	addShape(e, t, s) {
		const i = new Vec3(),
			o = new Quaternion();
		return t && i.copy(t), s && o.copy(s), this.shapes.push(e), this.shapeOffsets.push(i), this.shapeOrientations.push(o), this.updateMassProperties(), this.updateBoundingRadius(), (this.aabbNeedsUpdate = !0), (e.body = this), this;
	}
	removeShape(e) {
		const t = this.shapes.indexOf(e);
		return -1 === t ? (console.warn('Shape does not belong to the body'), this) : (this.shapes.splice(t, 1), this.shapeOffsets.splice(t, 1), this.shapeOrientations.splice(t, 1), this.updateMassProperties(), this.updateBoundingRadius(), (this.aabbNeedsUpdate = !0), (e.body = null), this);
	}
	updateBoundingRadius() {
		const e = this.shapes,
			t = this.shapeOffsets,
			s = e.length;
		let i = 0;
		for (let o = 0; o !== s; o++) {
			const s = e[o];
			s.updateBoundingSphereRadius();
			const n = t[o].length(),
				r = s.boundingSphereRadius;
			n + r > i && (i = n + r);
		}
		this.boundingRadius = i;
	}
	updateAABB() {
		const e = this.shapes,
			t = this.shapeOffsets,
			s = this.shapeOrientations,
			i = e.length,
			o = tmpVec,
			n = tmpQuat,
			r = this.quaternion,
			a = this.aabb,
			l = updateAABB_shapeAABB;
		for (let c = 0; c !== i; c++) {
			const i = e[c];
			r.vmult(t[c], o), o.vadd(this.position, o), r.mult(s[c], n), i.calculateWorldAABB(o, n, l.lowerBound, l.upperBound), 0 === c ? a.copy(l) : a.extend(l);
		}
		this.aabbNeedsUpdate = !1;
	}
	updateInertiaWorld(e) {
		const t = this.invInertia;
		if (t.x !== t.y || t.y !== t.z || e) {
			const e = uiw_m1,
				s = uiw_m2;
			e.setRotationFromQuaternion(this.quaternion), e.transpose(s), e.scale(t, e), e.mmult(s, this.invInertiaWorld);
		} else;
	}
	applyForce(e, t) {
		if ((void 0 === t && (t = new Vec3()), this.type !== Body.DYNAMIC)) return;
		this.sleepState === Body.SLEEPING && this.wakeUp();
		const s = Body_applyForce_rotForce;
		t.cross(e, s), this.force.vadd(e, this.force), this.torque.vadd(s, this.torque);
	}
	applyLocalForce(e, t) {
		if ((void 0 === t && (t = new Vec3()), this.type !== Body.DYNAMIC)) return;
		const s = Body_applyLocalForce_worldForce,
			i = Body_applyLocalForce_relativePointWorld;
		this.vectorToWorldFrame(e, s), this.vectorToWorldFrame(t, i), this.applyForce(s, i);
	}
	applyTorque(e) {
		this.type === Body.DYNAMIC && (this.sleepState === Body.SLEEPING && this.wakeUp(), this.torque.vadd(e, this.torque));
	}
	applyImpulse(e, t) {
		if ((void 0 === t && (t = new Vec3()), this.type !== Body.DYNAMIC)) return;
		this.sleepState === Body.SLEEPING && this.wakeUp();
		const s = t,
			i = Body_applyImpulse_velo;
		i.copy(e), i.scale(this.invMass, i), this.velocity.vadd(i, this.velocity);
		const o = Body_applyImpulse_rotVelo;
		s.cross(e, o), this.invInertiaWorld.vmult(o, o), this.angularVelocity.vadd(o, this.angularVelocity);
	}
	applyLocalImpulse(e, t) {
		if ((void 0 === t && (t = new Vec3()), this.type !== Body.DYNAMIC)) return;
		const s = Body_applyLocalImpulse_worldImpulse,
			i = Body_applyLocalImpulse_relativePoint;
		this.vectorToWorldFrame(e, s), this.vectorToWorldFrame(t, i), this.applyImpulse(s, i);
	}
	updateMassProperties() {
		const e = Body_updateMassProperties_halfExtents;
		this.invMass = this.mass > 0 ? 1 / this.mass : 0;
		const t = this.inertia,
			s = this.fixedRotation;
		this.updateAABB(), e.set((this.aabb.upperBound.x - this.aabb.lowerBound.x) / 2, (this.aabb.upperBound.y - this.aabb.lowerBound.y) / 2, (this.aabb.upperBound.z - this.aabb.lowerBound.z) / 2), Box.calculateInertia(e, this.mass, t), this.invInertia.set(t.x > 0 && !s ? 1 / t.x : 0, t.y > 0 && !s ? 1 / t.y : 0, t.z > 0 && !s ? 1 / t.z : 0), this.updateInertiaWorld(!0);
	}
	getVelocityAtWorldPoint(e, t) {
		const s = new Vec3();
		return e.vsub(this.position, s), this.angularVelocity.cross(s, t), this.velocity.vadd(t, t), t;
	}
	integrate(e, t, s) {
		if ((this.previousPosition.copy(this.position), this.previousQuaternion.copy(this.quaternion), (this.type !== Body.DYNAMIC && this.type !== Body.KINEMATIC) || this.sleepState === Body.SLEEPING)) return;
		const i = this.velocity,
			o = this.angularVelocity,
			n = this.position,
			r = this.force,
			a = this.torque,
			l = this.quaternion,
			c = this.invMass,
			h = this.invInertiaWorld,
			d = this.linearFactor,
			p = c * e;
		(i.x += r.x * p * d.x), (i.y += r.y * p * d.y), (i.z += r.z * p * d.z);
		const u = h.elements,
			m = this.angularFactor,
			v = a.x * m.x,
			y = a.y * m.y,
			g = a.z * m.z;
		(o.x += e * (u[0] * v + u[1] * y + u[2] * g)), (o.y += e * (u[3] * v + u[4] * y + u[5] * g)), (o.z += e * (u[6] * v + u[7] * y + u[8] * g)), (n.x += i.x * e), (n.y += i.y * e), (n.z += i.z * e), l.integrate(this.angularVelocity, e, this.angularFactor, l), t && (s ? l.normalizeFast() : l.normalize()), (this.aabbNeedsUpdate = !0), this.updateInertiaWorld();
	}
}
(Body.idCounter = 0), (Body.COLLIDE_EVENT_NAME = 'collide'), (Body.DYNAMIC = BODY_TYPES.DYNAMIC), (Body.STATIC = BODY_TYPES.STATIC), (Body.KINEMATIC = BODY_TYPES.KINEMATIC), (Body.AWAKE = BODY_SLEEP_STATES.AWAKE), (Body.SLEEPY = BODY_SLEEP_STATES.SLEEPY), (Body.SLEEPING = BODY_SLEEP_STATES.SLEEPING), (Body.wakeupEvent = { type: 'wakeup' }), (Body.sleepyEvent = { type: 'sleepy' }), (Body.sleepEvent = { type: 'sleep' });
const tmpVec = new Vec3(),
	tmpQuat = new Quaternion(),
	updateAABB_shapeAABB = new AABB(),
	uiw_m1 = new Mat3(),
	uiw_m2 = new Mat3(),
	uiw_m3 = new Mat3(),
	Body_applyForce_rotForce = new Vec3(),
	Body_applyLocalForce_worldForce = new Vec3(),
	Body_applyLocalForce_relativePointWorld = new Vec3(),
	Body_applyImpulse_velo = new Vec3(),
	Body_applyImpulse_rotVelo = new Vec3(),
	Body_applyLocalImpulse_worldImpulse = new Vec3(),
	Body_applyLocalImpulse_relativePoint = new Vec3(),
	Body_updateMassProperties_halfExtents = new Vec3();
class Broadphase {
	constructor() {
		(this.world = null), (this.useBoundingBoxes = !1), (this.dirty = !0);
	}
	collisionPairs(e, t, s) {
		throw new Error('collisionPairs not implemented for this BroadPhase class!');
	}
	needBroadphaseCollision(e, t) {
		return 0 != (e.collisionFilterGroup & t.collisionFilterMask) && 0 != (t.collisionFilterGroup & e.collisionFilterMask) && ((0 == (e.type & Body.STATIC) && e.sleepState !== Body.SLEEPING) || (0 == (t.type & Body.STATIC) && t.sleepState !== Body.SLEEPING));
	}
	intersectionTest(e, t, s, i) {
		this.useBoundingBoxes ? this.doBoundingBoxBroadphase(e, t, s, i) : this.doBoundingSphereBroadphase(e, t, s, i);
	}
	doBoundingSphereBroadphase(e, t, s, i) {
		const o = Broadphase_collisionPairs_r;
		t.position.vsub(e.position, o);
		const n = (e.boundingRadius + t.boundingRadius) ** 2;
		o.lengthSquared() < n && (s.push(e), i.push(t));
	}
	doBoundingBoxBroadphase(e, t, s, i) {
		e.aabbNeedsUpdate && e.updateAABB(), t.aabbNeedsUpdate && t.updateAABB(), e.aabb.overlaps(t.aabb) && (s.push(e), i.push(t));
	}
	makePairsUnique(e, t) {
		const s = Broadphase_makePairsUnique_temp,
			i = Broadphase_makePairsUnique_p1,
			o = Broadphase_makePairsUnique_p2,
			n = e.length;
		for (let s = 0; s !== n; s++) (i[s] = e[s]), (o[s] = t[s]);
		(e.length = 0), (t.length = 0);
		for (let e = 0; e !== n; e++) {
			const t = i[e].id,
				n = o[e].id,
				r = t < n ? `${t},${n}` : `${n},${t}`;
			(s[r] = e), s.keys.push(r);
		}
		for (let n = 0; n !== s.keys.length; n++) {
			const n = s.keys.pop(),
				r = s[n];
			e.push(i[r]), t.push(o[r]), delete s[n];
		}
	}
	setWorld(e) {}
	static boundingSphereCheck(e, t) {
		const s = new Vec3();
		e.position.vsub(t.position, s);
		const i = e.shapes[0],
			o = t.shapes[0];
		return Math.pow(i.boundingSphereRadius + o.boundingSphereRadius, 2) > s.lengthSquared();
	}
	aabbQuery(e, t, s) {
		return console.warn('.aabbQuery is not implemented in this Broadphase subclass.'), [];
	}
}
const Broadphase_collisionPairs_r = new Vec3();
new Vec3(), new Quaternion(), new Vec3();
const Broadphase_makePairsUnique_temp = { keys: [] },
	Broadphase_makePairsUnique_p1 = [],
	Broadphase_makePairsUnique_p2 = [];
new Vec3();
class GridBroadphase extends Broadphase {
	constructor(e, t, s, i, o) {
		void 0 === e && (e = new Vec3(100, 100, 100)), void 0 === t && (t = new Vec3(-100, -100, -100)), void 0 === s && (s = 10), void 0 === i && (i = 10), void 0 === o && (o = 10), super(), (this.nx = s), (this.ny = i), (this.nz = o), (this.aabbMin = e), (this.aabbMax = t);
		const n = this.nx * this.ny * this.nz;
		if (n <= 0) throw "GridBroadphase: Each dimension's n must be >0";
		(this.bins = []), (this.binLengths = []), (this.bins.length = n), (this.binLengths.length = n);
		for (let e = 0; e < n; e++) (this.bins[e] = []), (this.binLengths[e] = 0);
	}
	collisionPairs(e, t, s) {
		const i = e.bodies.length,
			o = e.bodies,
			n = this.aabbMax,
			r = this.aabbMin,
			a = this.nx,
			l = this.ny,
			c = this.nz,
			h = l * c,
			d = c,
			p = n.x,
			u = n.y,
			m = n.z,
			v = r.x,
			y = r.y,
			g = r.z,
			x = a / (p - v),
			f = l / (u - y),
			w = c / (m - g),
			b = (p - v) / a,
			_ = (u - y) / l,
			B = (m - g) / c,
			S = 0.5 * Math.sqrt(b * b + _ * _ + B * B),
			V = Shape.types,
			A = V.SPHERE,
			E = V.PLANE;
		V.BOX, V.COMPOUND, V.CONVEXPOLYHEDRON;
		const C = this.bins,
			T = this.binLengths,
			P = this.bins.length;
		for (let e = 0; e !== P; e++) T[e] = 0;
		const I = Math.ceil;
		function F(e, t, s, i, o, n, r) {
			let p = ((e - v) * x) | 0,
				u = ((t - y) * f) | 0,
				m = ((s - g) * w) | 0,
				b = I((i - v) * x),
				_ = I((o - y) * f),
				B = I((n - g) * w);
			p < 0 ? (p = 0) : p >= a && (p = a - 1), u < 0 ? (u = 0) : u >= l && (u = l - 1), m < 0 ? (m = 0) : m >= c && (m = c - 1), b < 0 ? (b = 0) : b >= a && (b = a - 1), _ < 0 ? (_ = 0) : _ >= l && (_ = l - 1), B < 0 ? (B = 0) : B >= c && (B = c - 1), (p *= h), (u *= d), (m *= 1), (b *= h), (_ *= d), (B *= 1);
			for (let e = p; e <= b; e += h)
				for (let t = u; t <= _; t += d)
					for (let s = m; s <= B; s += 1) {
						const i = e + t + s;
						C[i][T[i]++] = r;
					}
		}
		for (let e = 0; e !== i; e++) {
			const t = o[e],
				s = t.shapes[0];
			switch (s.type) {
				case A: {
					const e = s,
						i = t.position.x,
						o = t.position.y,
						n = t.position.z,
						r = e.radius;
					F(i - r, o - r, n - r, i + r, o + r, n + r, t);
					break;
				}
				case E: {
					const e = s;
					e.worldNormalNeedsUpdate && e.computeWorldNormal(t.quaternion);
					const i = e.worldNormal,
						o = v + 0.5 * b - t.position.x,
						n = y + 0.5 * _ - t.position.y,
						r = g + 0.5 * B - t.position.z,
						p = GridBroadphase_collisionPairs_d;
					p.set(o, n, r);
					for (let e = 0, s = 0; e !== a; e++, s += h, p.y = n, p.x += b)
						for (let e = 0, o = 0; e !== l; e++, o += d, p.z = r, p.y += _)
							for (let e = 0, n = 0; e !== c; e++, n += 1, p.z += B)
								if (p.dot(i) < S) {
									const e = s + o + n;
									C[e][T[e]++] = t;
								}
					break;
				}
				default:
					t.aabbNeedsUpdate && t.updateAABB(), F(t.aabb.lowerBound.x, t.aabb.lowerBound.y, t.aabb.lowerBound.z, t.aabb.upperBound.x, t.aabb.upperBound.y, t.aabb.upperBound.z, t);
			}
		}
		for (let e = 0; e !== P; e++) {
			const i = T[e];
			if (i > 1) {
				const o = C[e];
				for (let e = 0; e !== i; e++) {
					const i = o[e];
					for (let n = 0; n !== e; n++) {
						const e = o[n];
						this.needBroadphaseCollision(i, e) && this.intersectionTest(i, e, t, s);
					}
				}
			}
		}
		this.makePairsUnique(t, s);
	}
}
const GridBroadphase_collisionPairs_d = new Vec3();
new Vec3();
class NaiveBroadphase extends Broadphase {
	constructor() {
		super();
	}
	collisionPairs(e, t, s) {
		const i = e.bodies,
			o = i.length;
		let n, r;
		for (let e = 0; e !== o; e++) for (let o = 0; o !== e; o++) (n = i[e]), (r = i[o]), this.needBroadphaseCollision(n, r) && this.intersectionTest(n, r, t, s);
	}
	aabbQuery(e, t, s) {
		void 0 === s && (s = []);
		for (let i = 0; i < e.bodies.length; i++) {
			const o = e.bodies[i];
			o.aabbNeedsUpdate && o.updateAABB(), o.aabb.overlaps(t) && s.push(o);
		}
		return s;
	}
}
class RaycastResult {
	constructor() {
		(this.rayFromWorld = new Vec3()), (this.rayToWorld = new Vec3()), (this.hitNormalWorld = new Vec3()), (this.hitPointWorld = new Vec3()), (this.hasHit = !1), (this.shape = null), (this.body = null), (this.hitFaceIndex = -1), (this.distance = -1), (this.shouldStop = !1);
	}
	reset() {
		this.rayFromWorld.setZero(), this.rayToWorld.setZero(), this.hitNormalWorld.setZero(), this.hitPointWorld.setZero(), (this.hasHit = !1), (this.shape = null), (this.body = null), (this.hitFaceIndex = -1), (this.distance = -1), (this.shouldStop = !1);
	}
	abort() {
		this.shouldStop = !0;
	}
	set(e, t, s, i, o, n, r) {
		this.rayFromWorld.copy(e), this.rayToWorld.copy(t), this.hitNormalWorld.copy(s), this.hitPointWorld.copy(i), (this.shape = o), (this.body = n), (this.distance = r);
	}
}
let _Shape$types$SPHERE, _Shape$types$PLANE, _Shape$types$BOX, _Shape$types$CYLINDER, _Shape$types$CONVEXPO, _Shape$types$HEIGHTFI, _Shape$types$TRIMESH;
const RAY_MODES = { CLOSEST: 1, ANY: 2, ALL: 4 };
(_Shape$types$SPHERE = Shape.types.SPHERE), (_Shape$types$PLANE = Shape.types.PLANE), (_Shape$types$BOX = Shape.types.BOX), (_Shape$types$CYLINDER = Shape.types.CYLINDER), (_Shape$types$CONVEXPO = Shape.types.CONVEXPOLYHEDRON), (_Shape$types$HEIGHTFI = Shape.types.HEIGHTFIELD), (_Shape$types$TRIMESH = Shape.types.TRIMESH);
class Ray {
	get [_Shape$types$SPHERE]() {
		return this._intersectSphere;
	}
	get [_Shape$types$PLANE]() {
		return this._intersectPlane;
	}
	get [_Shape$types$BOX]() {
		return this._intersectBox;
	}
	get [_Shape$types$CYLINDER]() {
		return this._intersectConvex;
	}
	get [_Shape$types$CONVEXPO]() {
		return this._intersectConvex;
	}
	get [_Shape$types$HEIGHTFI]() {
		return this._intersectHeightfield;
	}
	get [_Shape$types$TRIMESH]() {
		return this._intersectTrimesh;
	}
	constructor(e, t) {
		void 0 === e && (e = new Vec3()), void 0 === t && (t = new Vec3()), (this.from = e.clone()), (this.to = t.clone()), (this.direction = new Vec3()), (this.precision = 1e-4), (this.checkCollisionResponse = !0), (this.skipBackfaces = !1), (this.collisionFilterMask = -1), (this.collisionFilterGroup = -1), (this.mode = Ray.ANY), (this.result = new RaycastResult()), (this.hasHit = !1), (this.callback = (e) => {});
	}
	intersectWorld(e, t) {
		return (
			(this.mode = t.mode || Ray.ANY),
			(this.result = t.result || new RaycastResult()),
			(this.skipBackfaces = !!t.skipBackfaces),
			(this.collisionFilterMask = void 0 !== t.collisionFilterMask ? t.collisionFilterMask : -1),
			(this.collisionFilterGroup = void 0 !== t.collisionFilterGroup ? t.collisionFilterGroup : -1),
			(this.checkCollisionResponse = void 0 === t.checkCollisionResponse || t.checkCollisionResponse),
			t.from && this.from.copy(t.from),
			t.to && this.to.copy(t.to),
			(this.callback = t.callback || (() => {})),
			(this.hasHit = !1),
			this.result.reset(),
			this.updateDirection(),
			this.getAABB(tmpAABB$1),
			(tmpArray.length = 0),
			e.broadphase.aabbQuery(e, tmpAABB$1, tmpArray),
			this.intersectBodies(tmpArray),
			this.hasHit
		);
	}
	intersectBody(e, t) {
		t && ((this.result = t), this.updateDirection());
		const s = this.checkCollisionResponse;
		if (s && !e.collisionResponse) return;
		if (0 == (this.collisionFilterGroup & e.collisionFilterMask) || 0 == (e.collisionFilterGroup & this.collisionFilterMask)) return;
		const i = intersectBody_xi,
			o = intersectBody_qi;
		for (let t = 0, n = e.shapes.length; t < n; t++) {
			const n = e.shapes[t];
			if ((!s || n.collisionResponse) && (e.quaternion.mult(e.shapeOrientations[t], o), e.quaternion.vmult(e.shapeOffsets[t], i), i.vadd(e.position, i), this.intersectShape(n, o, i, e), this.result.shouldStop)) break;
		}
	}
	intersectBodies(e, t) {
		t && ((this.result = t), this.updateDirection());
		for (let t = 0, s = e.length; !this.result.shouldStop && t < s; t++) this.intersectBody(e[t]);
	}
	updateDirection() {
		this.to.vsub(this.from, this.direction), this.direction.normalize();
	}
	intersectShape(e, t, s, i) {
		if (distanceFromIntersection(this.from, this.direction, s) > e.boundingSphereRadius) return;
		const o = this[e.type];
		o && o.call(this, e, t, s, i, e);
	}
	_intersectBox(e, t, s, i, o) {
		return this._intersectConvex(e.convexPolyhedronRepresentation, t, s, i, o);
	}
	_intersectPlane(e, t, s, i, o) {
		const n = this.from,
			r = this.to,
			a = this.direction,
			l = new Vec3(0, 0, 1);
		t.vmult(l, l);
		const c = new Vec3();
		n.vsub(s, c);
		const h = c.dot(l);
		r.vsub(s, c);
		if (h * c.dot(l) > 0) return;
		if (n.distanceTo(r) < h) return;
		const d = l.dot(a);
		if (Math.abs(d) < this.precision) return;
		const p = new Vec3(),
			u = new Vec3(),
			m = new Vec3();
		n.vsub(s, p);
		const v = -l.dot(p) / d;
		a.scale(v, u), n.vadd(u, m), this.reportIntersection(l, m, o, i, -1);
	}
	getAABB(e) {
		const { lowerBound: t, upperBound: s } = e,
			i = this.to,
			o = this.from;
		(t.x = Math.min(i.x, o.x)), (t.y = Math.min(i.y, o.y)), (t.z = Math.min(i.z, o.z)), (s.x = Math.max(i.x, o.x)), (s.y = Math.max(i.y, o.y)), (s.z = Math.max(i.z, o.z));
	}
	_intersectHeightfield(e, t, s, i, o) {
		e.data, e.elementSize;
		const n = intersectHeightfield_localRay;
		n.from.copy(this.from), n.to.copy(this.to), Transform.pointToLocalFrame(s, t, n.from, n.from), Transform.pointToLocalFrame(s, t, n.to, n.to), n.updateDirection();
		const r = intersectHeightfield_index;
		let a, l, c, h;
		(a = l = 0), (c = h = e.data.length - 1);
		const d = new AABB();
		n.getAABB(d), e.getIndexOfPosition(d.lowerBound.x, d.lowerBound.y, r, !0), (a = Math.max(a, r[0])), (l = Math.max(l, r[1])), e.getIndexOfPosition(d.upperBound.x, d.upperBound.y, r, !0), (c = Math.min(c, r[0] + 1)), (h = Math.min(h, r[1] + 1));
		for (let r = a; r < c; r++)
			for (let a = l; a < h; a++) {
				if (this.result.shouldStop) return;
				if ((e.getAabbAtIndex(r, a, d), d.overlapsRay(n))) {
					if ((e.getConvexTrianglePillar(r, a, !1), Transform.pointToWorldFrame(s, t, e.pillarOffset, worldPillarOffset), this._intersectConvex(e.pillarConvex, t, worldPillarOffset, i, o, intersectConvexOptions), this.result.shouldStop)) return;
					e.getConvexTrianglePillar(r, a, !0), Transform.pointToWorldFrame(s, t, e.pillarOffset, worldPillarOffset), this._intersectConvex(e.pillarConvex, t, worldPillarOffset, i, o, intersectConvexOptions);
				}
			}
	}
	_intersectSphere(e, t, s, i, o) {
		const n = this.from,
			r = this.to,
			a = e.radius,
			l = (r.x - n.x) ** 2 + (r.y - n.y) ** 2 + (r.z - n.z) ** 2,
			c = 2 * ((r.x - n.x) * (n.x - s.x) + (r.y - n.y) * (n.y - s.y) + (r.z - n.z) * (n.z - s.z)),
			h = c ** 2 - 4 * l * ((n.x - s.x) ** 2 + (n.y - s.y) ** 2 + (n.z - s.z) ** 2 - a ** 2),
			d = Ray_intersectSphere_intersectionPoint,
			p = Ray_intersectSphere_normal;
		if (!(h < 0))
			if (0 === h) n.lerp(r, h, d), d.vsub(s, p), p.normalize(), this.reportIntersection(p, d, o, i, -1);
			else {
				const e = (-c - Math.sqrt(h)) / (2 * l),
					t = (-c + Math.sqrt(h)) / (2 * l);
				if ((e >= 0 && e <= 1 && (n.lerp(r, e, d), d.vsub(s, p), p.normalize(), this.reportIntersection(p, d, o, i, -1)), this.result.shouldStop)) return;
				t >= 0 && t <= 1 && (n.lerp(r, t, d), d.vsub(s, p), p.normalize(), this.reportIntersection(p, d, o, i, -1));
			}
	}
	_intersectConvex(e, t, s, i, o, n) {
		const r = intersectConvex_normal,
			l = intersectConvex_vector,
			h = (n && n.faceList) || null,
			d = e.faces,
			p = e.vertices,
			u = e.faceNormals,
			m = this.direction,
			v = this.from,
			y = this.to,
			g = v.distanceTo(y),
			x = h ? h.length : d.length,
			f = this.result;
		for (let e = 0; !f.shouldStop && e < x; e++) {
			const n = h ? h[e] : e,
				y = d[n],
				x = u[n],
				w = t,
				_ = s;
			l.copy(p[y[0]]), w.vmult(l, l), l.vadd(_, l), l.vsub(v, l), w.vmult(x, r);
			const B = m.dot(r);
			if (Math.abs(B) < this.precision) continue;
			const S = r.dot(l) / B;
			if (!(S < 0)) {
				m.scale(S, intersectPoint), intersectPoint.vadd(v, intersectPoint), a.copy(p[y[0]]), w.vmult(a, a), _.vadd(a, a);
				for (let e = 1; !f.shouldStop && e < y.length - 1; e++) {
					b.copy(p[y[e]]), c.copy(p[y[e + 1]]), w.vmult(b, b), w.vmult(c, c), _.vadd(b, b), _.vadd(c, c);
					const t = intersectPoint.distanceTo(v);
					(!Ray.pointInTriangle(intersectPoint, a, b, c) && !Ray.pointInTriangle(intersectPoint, b, a, c)) || t > g || this.reportIntersection(r, intersectPoint, o, i, n);
				}
			}
		}
	}
	_intersectTrimesh(e, t, s, i, o, n) {
		const r = intersectTrimesh_normal,
			l = intersectTrimesh_triangles,
			h = intersectTrimesh_treeTransform,
			d = intersectConvex_vector,
			p = intersectTrimesh_localDirection,
			u = intersectTrimesh_localFrom,
			m = intersectTrimesh_localTo,
			v = intersectTrimesh_worldIntersectPoint,
			y = intersectTrimesh_worldNormal,
			g = e.indices;
		e.vertices;
		const x = this.from,
			f = this.to,
			w = this.direction;
		h.position.copy(s), h.quaternion.copy(t), Transform.vectorToLocalFrame(s, t, w, p), Transform.pointToLocalFrame(s, t, x, u), Transform.pointToLocalFrame(s, t, f, m), (m.x *= e.scale.x), (m.y *= e.scale.y), (m.z *= e.scale.z), (u.x *= e.scale.x), (u.y *= e.scale.y), (u.z *= e.scale.z), m.vsub(u, p), p.normalize();
		const _ = u.distanceSquared(m);
		e.tree.rayQuery(this, h, l);
		for (let n = 0, h = l.length; !this.result.shouldStop && n !== h; n++) {
			const h = l[n];
			e.getNormal(h, r), e.getVertex(g[3 * h], a), a.vsub(u, d);
			const m = p.dot(r),
				x = r.dot(d) / m;
			if (x < 0) continue;
			p.scale(x, intersectPoint), intersectPoint.vadd(u, intersectPoint), e.getVertex(g[3 * h + 1], b), e.getVertex(g[3 * h + 2], c);
			const f = intersectPoint.distanceSquared(u);
			(!Ray.pointInTriangle(intersectPoint, b, a, c) && !Ray.pointInTriangle(intersectPoint, a, b, c)) || f > _ || (Transform.vectorToWorldFrame(t, r, y), Transform.pointToWorldFrame(s, t, intersectPoint, v), this.reportIntersection(y, v, o, i, h));
		}
		l.length = 0;
	}
	reportIntersection(e, t, s, i, o) {
		const n = this.from,
			r = this.to,
			a = n.distanceTo(t),
			l = this.result;
		if (!(this.skipBackfaces && e.dot(this.direction) > 0))
			switch (((l.hitFaceIndex = void 0 !== o ? o : -1), this.mode)) {
				case Ray.ALL:
					(this.hasHit = !0), l.set(n, r, e, t, s, i, a), (l.hasHit = !0), this.callback(l);
					break;
				case Ray.CLOSEST:
					(a < l.distance || !l.hasHit) && ((this.hasHit = !0), (l.hasHit = !0), l.set(n, r, e, t, s, i, a));
					break;
				case Ray.ANY:
					(this.hasHit = !0), (l.hasHit = !0), l.set(n, r, e, t, s, i, a), (l.shouldStop = !0);
			}
	}
	static pointInTriangle(e, t, s, i) {
		i.vsub(t, v0), s.vsub(t, v1), e.vsub(t, v2);
		const o = v0.dot(v0),
			n = v0.dot(v1),
			r = v0.dot(v2),
			a = v1.dot(v1),
			l = v1.dot(v2);
		let c, h;
		return (c = a * r - n * l) >= 0 && (h = o * l - n * r) >= 0 && c + h < o * a - n * n;
	}
}
(Ray.CLOSEST = RAY_MODES.CLOSEST), (Ray.ANY = RAY_MODES.ANY), (Ray.ALL = RAY_MODES.ALL);
const tmpAABB$1 = new AABB(),
	tmpArray = [],
	v1 = new Vec3(),
	v2 = new Vec3(),
	intersectBody_xi = new Vec3(),
	intersectBody_qi = new Quaternion(),
	intersectPoint = new Vec3(),
	a = new Vec3(),
	b = new Vec3(),
	c = new Vec3();
new Vec3(), new RaycastResult();
const intersectConvexOptions = { faceList: [0] },
	worldPillarOffset = new Vec3(),
	intersectHeightfield_localRay = new Ray(),
	intersectHeightfield_index = [],
	Ray_intersectSphere_intersectionPoint = new Vec3(),
	Ray_intersectSphere_normal = new Vec3(),
	intersectConvex_normal = new Vec3(),
	intersectConvex_minDistNormal = new Vec3(),
	intersectConvex_minDistIntersect = new Vec3(),
	intersectConvex_vector = new Vec3(),
	intersectTrimesh_normal = new Vec3(),
	intersectTrimesh_localDirection = new Vec3(),
	intersectTrimesh_localFrom = new Vec3(),
	intersectTrimesh_localTo = new Vec3(),
	intersectTrimesh_worldNormal = new Vec3(),
	intersectTrimesh_worldIntersectPoint = new Vec3();
new AABB();
const intersectTrimesh_triangles = [],
	intersectTrimesh_treeTransform = new Transform(),
	v0 = new Vec3(),
	intersect = new Vec3();
function distanceFromIntersection(e, t, s) {
	s.vsub(e, v0);
	const i = v0.dot(t);
	t.scale(i, intersect), intersect.vadd(e, intersect);
	return s.distanceTo(intersect);
}
class SAPBroadphase extends Broadphase {
	static checkBounds(e, t, s) {
		let i, o;
		0 === s ? ((i = e.position.x), (o = t.position.x)) : 1 === s ? ((i = e.position.y), (o = t.position.y)) : 2 === s && ((i = e.position.z), (o = t.position.z));
		const n = e.boundingRadius;
		return o - t.boundingRadius < i + n;
	}
	static insertionSortX(e) {
		for (let t = 1, s = e.length; t < s; t++) {
			const s = e[t];
			let i;
			for (i = t - 1; i >= 0 && !(e[i].aabb.lowerBound.x <= s.aabb.lowerBound.x); i--) e[i + 1] = e[i];
			e[i + 1] = s;
		}
		return e;
	}
	static insertionSortY(e) {
		for (let t = 1, s = e.length; t < s; t++) {
			const s = e[t];
			let i;
			for (i = t - 1; i >= 0 && !(e[i].aabb.lowerBound.y <= s.aabb.lowerBound.y); i--) e[i + 1] = e[i];
			e[i + 1] = s;
		}
		return e;
	}
	static insertionSortZ(e) {
		for (let t = 1, s = e.length; t < s; t++) {
			const s = e[t];
			let i;
			for (i = t - 1; i >= 0 && !(e[i].aabb.lowerBound.z <= s.aabb.lowerBound.z); i--) e[i + 1] = e[i];
			e[i + 1] = s;
		}
		return e;
	}
	constructor(e) {
		super(), (this.axisList = []), (this.world = null), (this.axisIndex = 0);
		const t = this.axisList;
		(this._addBodyHandler = (e) => {
			t.push(e.body);
		}),
			(this._removeBodyHandler = (e) => {
				const s = t.indexOf(e.body);
				-1 !== s && t.splice(s, 1);
			}),
			e && this.setWorld(e);
	}
	setWorld(e) {
		this.axisList.length = 0;
		for (let t = 0; t < e.bodies.length; t++) this.axisList.push(e.bodies[t]);
		e.removeEventListener('addBody', this._addBodyHandler), e.removeEventListener('removeBody', this._removeBodyHandler), e.addEventListener('addBody', this._addBodyHandler), e.addEventListener('removeBody', this._removeBodyHandler), (this.world = e), (this.dirty = !0);
	}
	collisionPairs(e, t, s) {
		const i = this.axisList,
			o = i.length,
			n = this.axisIndex;
		let r, a;
		for (this.dirty && (this.sortList(), (this.dirty = !1)), r = 0; r !== o; r++) {
			const e = i[r];
			for (a = r + 1; a < o; a++) {
				const o = i[a];
				if (this.needBroadphaseCollision(e, o)) {
					if (!SAPBroadphase.checkBounds(e, o, n)) break;
					this.intersectionTest(e, o, t, s);
				}
			}
		}
	}
	sortList() {
		const e = this.axisList,
			t = this.axisIndex,
			s = e.length;
		for (let t = 0; t !== s; t++) {
			const s = e[t];
			s.aabbNeedsUpdate && s.updateAABB();
		}
		0 === t ? SAPBroadphase.insertionSortX(e) : 1 === t ? SAPBroadphase.insertionSortY(e) : 2 === t && SAPBroadphase.insertionSortZ(e);
	}
	autoDetectAxis() {
		let e = 0,
			t = 0,
			s = 0,
			i = 0,
			o = 0,
			n = 0;
		const r = this.axisList,
			a = r.length,
			l = 1 / a;
		for (let l = 0; l !== a; l++) {
			const a = r[l],
				c = a.position.x;
			(e += c), (t += c * c);
			const h = a.position.y;
			(s += h), (i += h * h);
			const d = a.position.z;
			(o += d), (n += d * d);
		}
		const c = t - e * e * l,
			h = i - s * s * l,
			d = n - o * o * l;
		this.axisIndex = c > h ? (c > d ? 0 : 2) : h > d ? 1 : 2;
	}
	aabbQuery(e, t, s) {
		void 0 === s && (s = []), this.dirty && (this.sortList(), (this.dirty = !1));
		const i = this.axisIndex;
		let o = 'x';
		1 === i && (o = 'y'), 2 === i && (o = 'z');
		const n = this.axisList;
		t.lowerBound[o], t.upperBound[o];
		for (let e = 0; e < n.length; e++) {
			const i = n[e];
			i.aabbNeedsUpdate && i.updateAABB(), i.aabb.overlaps(t) && s.push(i);
		}
		return s;
	}
}
class Utils {
	static defaults(e, t) {
		void 0 === e && (e = {});
		for (let s in t) s in e || (e[s] = t[s]);
		return e;
	}
}
class Constraint {
	constructor(e, t, s) {
		void 0 === s && (s = {}), (s = Utils.defaults(s, { collideConnected: !0, wakeUpBodies: !0 })), (this.equations = []), (this.bodyA = e), (this.bodyB = t), (this.id = Constraint.idCounter++), (this.collideConnected = s.collideConnected), s.wakeUpBodies && (e && e.wakeUp(), t && t.wakeUp());
	}
	update() {
		throw new Error('method update() not implmemented in this Constraint subclass!');
	}
	enable() {
		const e = this.equations;
		for (let t = 0; t < e.length; t++) e[t].enabled = !0;
	}
	disable() {
		const e = this.equations;
		for (let t = 0; t < e.length; t++) e[t].enabled = !1;
	}
}
Constraint.idCounter = 0;
class JacobianElement {
	constructor() {
		(this.spatial = new Vec3()), (this.rotational = new Vec3());
	}
	multiplyElement(e) {
		return e.spatial.dot(this.spatial) + e.rotational.dot(this.rotational);
	}
	multiplyVectors(e, t) {
		return e.dot(this.spatial) + t.dot(this.rotational);
	}
}
class Equation {
	constructor(e, t, s, i) {
		void 0 === s && (s = -1e6), void 0 === i && (i = 1e6), (this.id = Equation.idCounter++), (this.minForce = s), (this.maxForce = i), (this.bi = e), (this.bj = t), (this.a = 0), (this.b = 0), (this.eps = 0), (this.jacobianElementA = new JacobianElement()), (this.jacobianElementB = new JacobianElement()), (this.enabled = !0), (this.multiplier = 0), this.setSpookParams(1e7, 4, 1 / 60);
	}
	setSpookParams(e, t, s) {
		const i = t,
			o = e,
			n = s;
		(this.a = 4 / (n * (1 + 4 * i))), (this.b = (4 * i) / (1 + 4 * i)), (this.eps = 4 / (n * n * o * (1 + 4 * i)));
	}
	computeB(e, t, s) {
		const i = this.computeGW();
		return -this.computeGq() * e - i * t - this.computeGiMf() * s;
	}
	computeGq() {
		const e = this.jacobianElementA,
			t = this.jacobianElementB,
			s = this.bi,
			i = this.bj,
			o = s.position,
			n = i.position;
		return e.spatial.dot(o) + t.spatial.dot(n);
	}
	computeGW() {
		const e = this.jacobianElementA,
			t = this.jacobianElementB,
			s = this.bi,
			i = this.bj,
			o = s.velocity,
			n = i.velocity,
			r = s.angularVelocity,
			a = i.angularVelocity;
		return e.multiplyVectors(o, r) + t.multiplyVectors(n, a);
	}
	computeGWlambda() {
		const e = this.jacobianElementA,
			t = this.jacobianElementB,
			s = this.bi,
			i = this.bj,
			o = s.vlambda,
			n = i.vlambda,
			r = s.wlambda,
			a = i.wlambda;
		return e.multiplyVectors(o, r) + t.multiplyVectors(n, a);
	}
	computeGiMf() {
		const e = this.jacobianElementA,
			t = this.jacobianElementB,
			s = this.bi,
			i = this.bj,
			o = s.force,
			n = s.torque,
			r = i.force,
			a = i.torque,
			l = s.invMassSolve,
			c = i.invMassSolve;
		return o.scale(l, iMfi), r.scale(c, iMfj), s.invInertiaWorldSolve.vmult(n, invIi_vmult_taui), i.invInertiaWorldSolve.vmult(a, invIj_vmult_tauj), e.multiplyVectors(iMfi, invIi_vmult_taui) + t.multiplyVectors(iMfj, invIj_vmult_tauj);
	}
	computeGiMGt() {
		const e = this.jacobianElementA,
			t = this.jacobianElementB,
			s = this.bi,
			i = this.bj,
			o = s.invMassSolve,
			n = i.invMassSolve,
			r = s.invInertiaWorldSolve,
			a = i.invInertiaWorldSolve;
		let l = o + n;
		return r.vmult(e.rotational, tmp), (l += tmp.dot(e.rotational)), a.vmult(t.rotational, tmp), (l += tmp.dot(t.rotational)), l;
	}
	addToWlambda(e) {
		const t = this.jacobianElementA,
			s = this.jacobianElementB,
			i = this.bi,
			o = this.bj,
			n = addToWlambda_temp;
		i.vlambda.addScaledVector(i.invMassSolve * e, t.spatial, i.vlambda), o.vlambda.addScaledVector(o.invMassSolve * e, s.spatial, o.vlambda), i.invInertiaWorldSolve.vmult(t.rotational, n), i.wlambda.addScaledVector(e, n, i.wlambda), o.invInertiaWorldSolve.vmult(s.rotational, n), o.wlambda.addScaledVector(e, n, o.wlambda);
	}
	computeC() {
		return this.computeGiMGt() + this.eps;
	}
}
Equation.idCounter = 0;
const iMfi = new Vec3(),
	iMfj = new Vec3(),
	invIi_vmult_taui = new Vec3(),
	invIj_vmult_tauj = new Vec3(),
	tmp = new Vec3(),
	addToWlambda_temp = new Vec3();
class ContactEquation extends Equation {
	constructor(e, t, s) {
		void 0 === s && (s = 1e6), super(e, t, 0, s), (this.restitution = 0), (this.ri = new Vec3()), (this.rj = new Vec3()), (this.ni = new Vec3());
	}
	computeB(e) {
		const t = this.a,
			s = this.b,
			i = this.bi,
			o = this.bj,
			n = this.ri,
			r = this.rj,
			a = ContactEquation_computeB_temp1,
			l = ContactEquation_computeB_temp2,
			c = i.velocity,
			h = i.angularVelocity;
		i.force, i.torque;
		const d = o.velocity,
			p = o.angularVelocity;
		o.force, o.torque;
		const u = ContactEquation_computeB_temp3,
			m = this.jacobianElementA,
			v = this.jacobianElementB,
			y = this.ni;
		n.cross(y, a), r.cross(y, l), y.negate(m.spatial), a.negate(m.rotational), v.spatial.copy(y), v.rotational.copy(l), u.copy(o.position), u.vadd(r, u), u.vsub(i.position, u), u.vsub(n, u);
		const g = y.dot(u),
			x = this.restitution + 1;
		return -g * t - (x * d.dot(y) - x * c.dot(y) + p.dot(l) - h.dot(a)) * s - e * this.computeGiMf();
	}
	getImpactVelocityAlongNormal() {
		const e = ContactEquation_getImpactVelocityAlongNormal_vi,
			t = ContactEquation_getImpactVelocityAlongNormal_vj,
			s = ContactEquation_getImpactVelocityAlongNormal_xi,
			i = ContactEquation_getImpactVelocityAlongNormal_xj,
			o = ContactEquation_getImpactVelocityAlongNormal_relVel;
		return this.bi.position.vadd(this.ri, s), this.bj.position.vadd(this.rj, i), this.bi.getVelocityAtWorldPoint(s, e), this.bj.getVelocityAtWorldPoint(i, t), e.vsub(t, o), this.ni.dot(o);
	}
}
const ContactEquation_computeB_temp1 = new Vec3(),
	ContactEquation_computeB_temp2 = new Vec3(),
	ContactEquation_computeB_temp3 = new Vec3(),
	ContactEquation_getImpactVelocityAlongNormal_vi = new Vec3(),
	ContactEquation_getImpactVelocityAlongNormal_vj = new Vec3(),
	ContactEquation_getImpactVelocityAlongNormal_xi = new Vec3(),
	ContactEquation_getImpactVelocityAlongNormal_xj = new Vec3(),
	ContactEquation_getImpactVelocityAlongNormal_relVel = new Vec3();
class PointToPointConstraint extends Constraint {
	constructor(e, t, s, i, o) {
		void 0 === t && (t = new Vec3()), void 0 === i && (i = new Vec3()), void 0 === o && (o = 1e6), super(e, s), (this.pivotA = t.clone()), (this.pivotB = i.clone());
		const n = (this.equationX = new ContactEquation(e, s)),
			r = (this.equationY = new ContactEquation(e, s)),
			a = (this.equationZ = new ContactEquation(e, s));
		this.equations.push(n, r, a), (n.minForce = r.minForce = a.minForce = -o), (n.maxForce = r.maxForce = a.maxForce = o), n.ni.set(1, 0, 0), r.ni.set(0, 1, 0), a.ni.set(0, 0, 1);
	}
	update() {
		const e = this.bodyA,
			t = this.bodyB,
			s = this.equationX,
			i = this.equationY,
			o = this.equationZ;
		e.quaternion.vmult(this.pivotA, s.ri), t.quaternion.vmult(this.pivotB, s.rj), i.ri.copy(s.ri), i.rj.copy(s.rj), o.ri.copy(s.ri), o.rj.copy(s.rj);
	}
}
class ConeEquation extends Equation {
	constructor(e, t, s) {
		void 0 === s && (s = {});
		const i = void 0 !== s.maxForce ? s.maxForce : 1e6;
		super(e, t, -i, i), (this.axisA = s.axisA ? s.axisA.clone() : new Vec3(1, 0, 0)), (this.axisB = s.axisB ? s.axisB.clone() : new Vec3(0, 1, 0)), (this.angle = void 0 !== s.angle ? s.angle : 0);
	}
	computeB(e) {
		const t = this.a,
			s = this.b,
			i = this.axisA,
			o = this.axisB,
			n = tmpVec1$2,
			r = tmpVec2$2,
			a = this.jacobianElementA,
			l = this.jacobianElementB;
		i.cross(o, n), o.cross(i, r), a.rotational.copy(r), l.rotational.copy(n);
		return -(Math.cos(this.angle) - i.dot(o)) * t - this.computeGW() * s - e * this.computeGiMf();
	}
}
const tmpVec1$2 = new Vec3(),
	tmpVec2$2 = new Vec3();
class RotationalEquation extends Equation {
	constructor(e, t, s) {
		void 0 === s && (s = {});
		const i = void 0 !== s.maxForce ? s.maxForce : 1e6;
		super(e, t, -i, i), (this.axisA = s.axisA ? s.axisA.clone() : new Vec3(1, 0, 0)), (this.axisB = s.axisB ? s.axisB.clone() : new Vec3(0, 1, 0)), (this.maxAngle = Math.PI / 2);
	}
	computeB(e) {
		const t = this.a,
			s = this.b,
			i = this.axisA,
			o = this.axisB,
			n = tmpVec1$1,
			r = tmpVec2$1,
			a = this.jacobianElementA,
			l = this.jacobianElementB;
		i.cross(o, n), o.cross(i, r), a.rotational.copy(r), l.rotational.copy(n);
		return -(Math.cos(this.maxAngle) - i.dot(o)) * t - this.computeGW() * s - e * this.computeGiMf();
	}
}
const tmpVec1$1 = new Vec3(),
	tmpVec2$1 = new Vec3();
class ConeTwistConstraint extends PointToPointConstraint {
	constructor(e, t, s) {
		void 0 === s && (s = {});
		const i = void 0 !== s.maxForce ? s.maxForce : 1e6;
		super(e, s.pivotA ? s.pivotA.clone() : new Vec3(), t, s.pivotB ? s.pivotB.clone() : new Vec3(), i), (this.axisA = s.axisA ? s.axisA.clone() : new Vec3()), (this.axisB = s.axisB ? s.axisB.clone() : new Vec3()), (this.collideConnected = !!s.collideConnected), (this.angle = void 0 !== s.angle ? s.angle : 0);
		const o = (this.coneEquation = new ConeEquation(e, t, s)),
			n = (this.twistEquation = new RotationalEquation(e, t, s));
		(this.twistAngle = void 0 !== s.twistAngle ? s.twistAngle : 0), (o.maxForce = 0), (o.minForce = -i), (n.maxForce = 0), (n.minForce = -i), this.equations.push(o, n);
	}
	update() {
		const e = this.bodyA,
			t = this.bodyB,
			s = this.coneEquation,
			i = this.twistEquation;
		super.update(), e.vectorToWorldFrame(this.axisA, s.axisA), t.vectorToWorldFrame(this.axisB, s.axisB), this.axisA.tangents(i.axisA, i.axisA), e.vectorToWorldFrame(i.axisA, i.axisA), this.axisB.tangents(i.axisB, i.axisB), t.vectorToWorldFrame(i.axisB, i.axisB), (s.angle = this.angle), (i.maxAngle = this.twistAngle);
	}
}
new Vec3(), new Vec3();
class DistanceConstraint extends Constraint {
	constructor(e, t, s, i) {
		void 0 === i && (i = 1e6), super(e, t), void 0 === s && (s = e.position.distanceTo(t.position)), (this.distance = s);
		const o = (this.distanceEquation = new ContactEquation(e, t));
		this.equations.push(o), (o.minForce = -i), (o.maxForce = i);
	}
	update() {
		const e = this.bodyA,
			t = this.bodyB,
			s = this.distanceEquation,
			i = 0.5 * this.distance,
			o = s.ni;
		t.position.vsub(e.position, o), o.normalize(), o.scale(i, s.ri), o.scale(-i, s.rj);
	}
}
class LockConstraint extends PointToPointConstraint {
	constructor(e, t, s) {
		void 0 === s && (s = {});
		const i = void 0 !== s.maxForce ? s.maxForce : 1e6,
			o = new Vec3(),
			n = new Vec3(),
			r = new Vec3();
		e.position.vadd(t.position, r), r.scale(0.5, r), t.pointToLocalFrame(r, n), e.pointToLocalFrame(r, o), super(e, o, t, n, i), (this.xA = e.vectorToLocalFrame(Vec3.UNIT_X)), (this.xB = t.vectorToLocalFrame(Vec3.UNIT_X)), (this.yA = e.vectorToLocalFrame(Vec3.UNIT_Y)), (this.yB = t.vectorToLocalFrame(Vec3.UNIT_Y)), (this.zA = e.vectorToLocalFrame(Vec3.UNIT_Z)), (this.zB = t.vectorToLocalFrame(Vec3.UNIT_Z));
		const a = (this.rotationalEquation1 = new RotationalEquation(e, t, s)),
			l = (this.rotationalEquation2 = new RotationalEquation(e, t, s)),
			c = (this.rotationalEquation3 = new RotationalEquation(e, t, s));
		this.equations.push(a, l, c);
	}
	update() {
		const e = this.bodyA,
			t = this.bodyB;
		this.motorEquation;
		const s = this.rotationalEquation1,
			i = this.rotationalEquation2,
			o = this.rotationalEquation3;
		super.update(), e.vectorToWorldFrame(this.xA, s.axisA), t.vectorToWorldFrame(this.yB, s.axisB), e.vectorToWorldFrame(this.yA, i.axisA), t.vectorToWorldFrame(this.zB, i.axisB), e.vectorToWorldFrame(this.zA, o.axisA), t.vectorToWorldFrame(this.xB, o.axisB);
	}
}
const LockConstraint_update_tmpVec1 = new Vec3(),
	LockConstraint_update_tmpVec2 = new Vec3();
class RotationalMotorEquation extends Equation {
	constructor(e, t, s) {
		void 0 === s && (s = 1e6), super(e, t, -s, s), (this.axisA = new Vec3()), (this.axisB = new Vec3()), (this.targetVelocity = 0);
	}
	computeB(e) {
		this.a;
		const t = this.b;
		this.bi, this.bj;
		const s = this.axisA,
			i = this.axisB,
			o = this.jacobianElementA,
			n = this.jacobianElementB;
		o.rotational.copy(s), i.negate(n.rotational);
		return -(this.computeGW() - this.targetVelocity) * t - e * this.computeGiMf();
	}
}
class HingeConstraint extends PointToPointConstraint {
	constructor(e, t, s) {
		void 0 === s && (s = {});
		const i = void 0 !== s.maxForce ? s.maxForce : 1e6;
		super(e, s.pivotA ? s.pivotA.clone() : new Vec3(), t, s.pivotB ? s.pivotB.clone() : new Vec3(), i);
		(this.axisA = s.axisA ? s.axisA.clone() : new Vec3(1, 0, 0)).normalize();
		(this.axisB = s.axisB ? s.axisB.clone() : new Vec3(1, 0, 0)).normalize(), (this.collideConnected = !!s.collideConnected);
		const o = (this.rotationalEquation1 = new RotationalEquation(e, t, s)),
			n = (this.rotationalEquation2 = new RotationalEquation(e, t, s)),
			r = (this.motorEquation = new RotationalMotorEquation(e, t, i));
		(r.enabled = !1), this.equations.push(o, n, r);
	}
	enableMotor() {
		this.motorEquation.enabled = !0;
	}
	disableMotor() {
		this.motorEquation.enabled = !1;
	}
	setMotorSpeed(e) {
		this.motorEquation.targetVelocity = e;
	}
	setMotorMaxForce(e) {
		(this.motorEquation.maxForce = e), (this.motorEquation.minForce = -e);
	}
	update() {
		const e = this.bodyA,
			t = this.bodyB,
			s = this.motorEquation,
			i = this.rotationalEquation1,
			o = this.rotationalEquation2,
			n = HingeConstraint_update_tmpVec1,
			r = HingeConstraint_update_tmpVec2,
			a = this.axisA,
			l = this.axisB;
		super.update(), e.quaternion.vmult(a, n), t.quaternion.vmult(l, r), n.tangents(i.axisA, o.axisA), i.axisB.copy(r), o.axisB.copy(r), this.motorEquation.enabled && (e.quaternion.vmult(this.axisA, s.axisA), t.quaternion.vmult(this.axisB, s.axisB));
	}
}
const HingeConstraint_update_tmpVec1 = new Vec3(),
	HingeConstraint_update_tmpVec2 = new Vec3();
class FrictionEquation extends Equation {
	constructor(e, t, s) {
		super(e, t, -s, s), (this.ri = new Vec3()), (this.rj = new Vec3()), (this.t = new Vec3());
	}
	computeB(e) {
		this.a;
		const t = this.b;
		this.bi, this.bj;
		const s = this.ri,
			i = this.rj,
			o = FrictionEquation_computeB_temp1,
			n = FrictionEquation_computeB_temp2,
			r = this.t;
		s.cross(r, o), i.cross(r, n);
		const a = this.jacobianElementA,
			l = this.jacobianElementB;
		r.negate(a.spatial), o.negate(a.rotational), l.spatial.copy(r), l.rotational.copy(n);
		return -this.computeGW() * t - e * this.computeGiMf();
	}
}
const FrictionEquation_computeB_temp1 = new Vec3(),
	FrictionEquation_computeB_temp2 = new Vec3();
class ContactMaterial {
	constructor(e, t, s) {
		(s = Utils.defaults(s, { friction: 0.3, restitution: 0.3, contactEquationStiffness: 1e7, contactEquationRelaxation: 3, frictionEquationStiffness: 1e7, frictionEquationRelaxation: 3 })),
			(this.id = ContactMaterial.idCounter++),
			(this.materials = [e, t]),
			(this.friction = s.friction),
			(this.restitution = s.restitution),
			(this.contactEquationStiffness = s.contactEquationStiffness),
			(this.contactEquationRelaxation = s.contactEquationRelaxation),
			(this.frictionEquationStiffness = s.frictionEquationStiffness),
			(this.frictionEquationRelaxation = s.frictionEquationRelaxation);
	}
}
ContactMaterial.idCounter = 0;
class Material {
	constructor(e) {
		void 0 === e && (e = {});
		let t = '';
		'string' == typeof e && ((t = e), (e = {})), (this.name = t), (this.id = Material.idCounter++), (this.friction = void 0 !== e.friction ? e.friction : -1), (this.restitution = void 0 !== e.restitution ? e.restitution : -1);
	}
}
Material.idCounter = 0;
class Spring {
	constructor(e, t, s) {
		void 0 === s && (s = {}),
			(this.restLength = 'number' == typeof s.restLength ? s.restLength : 1),
			(this.stiffness = s.stiffness || 100),
			(this.damping = s.damping || 1),
			(this.bodyA = e),
			(this.bodyB = t),
			(this.localAnchorA = new Vec3()),
			(this.localAnchorB = new Vec3()),
			s.localAnchorA && this.localAnchorA.copy(s.localAnchorA),
			s.localAnchorB && this.localAnchorB.copy(s.localAnchorB),
			s.worldAnchorA && this.setWorldAnchorA(s.worldAnchorA),
			s.worldAnchorB && this.setWorldAnchorB(s.worldAnchorB);
	}
	setWorldAnchorA(e) {
		this.bodyA.pointToLocalFrame(e, this.localAnchorA);
	}
	setWorldAnchorB(e) {
		this.bodyB.pointToLocalFrame(e, this.localAnchorB);
	}
	getWorldAnchorA(e) {
		this.bodyA.pointToWorldFrame(this.localAnchorA, e);
	}
	getWorldAnchorB(e) {
		this.bodyB.pointToWorldFrame(this.localAnchorB, e);
	}
	applyForce() {
		const e = this.stiffness,
			t = this.damping,
			s = this.restLength,
			i = this.bodyA,
			o = this.bodyB,
			n = applyForce_r,
			r = applyForce_r_unit,
			a = applyForce_u,
			l = applyForce_f,
			c = applyForce_tmp,
			h = applyForce_worldAnchorA,
			d = applyForce_worldAnchorB,
			p = applyForce_ri,
			u = applyForce_rj,
			m = applyForce_ri_x_f,
			v = applyForce_rj_x_f;
		this.getWorldAnchorA(h), this.getWorldAnchorB(d), h.vsub(i.position, p), d.vsub(o.position, u), d.vsub(h, n);
		const y = n.length();
		r.copy(n), r.normalize(), o.velocity.vsub(i.velocity, a), o.angularVelocity.cross(u, c), a.vadd(c, a), i.angularVelocity.cross(p, c), a.vsub(c, a), r.scale(-e * (y - s) - t * a.dot(r), l), i.force.vsub(l, i.force), o.force.vadd(l, o.force), p.cross(l, m), u.cross(l, v), i.torque.vsub(m, i.torque), o.torque.vadd(v, o.torque);
	}
}
const applyForce_r = new Vec3(),
	applyForce_r_unit = new Vec3(),
	applyForce_u = new Vec3(),
	applyForce_f = new Vec3(),
	applyForce_worldAnchorA = new Vec3(),
	applyForce_worldAnchorB = new Vec3(),
	applyForce_ri = new Vec3(),
	applyForce_rj = new Vec3(),
	applyForce_ri_x_f = new Vec3(),
	applyForce_rj_x_f = new Vec3(),
	applyForce_tmp = new Vec3();
class WheelInfo {
	constructor(e) {
		void 0 === e && (e = {}),
			(e = Utils.defaults(e, {
				chassisConnectionPointLocal: new Vec3(),
				chassisConnectionPointWorld: new Vec3(),
				directionLocal: new Vec3(),
				directionWorld: new Vec3(),
				axleLocal: new Vec3(),
				axleWorld: new Vec3(),
				suspensionRestLength: 1,
				suspensionMaxLength: 2,
				radius: 1,
				suspensionStiffness: 100,
				dampingCompression: 10,
				dampingRelaxation: 10,
				frictionSlip: 10.5,
				forwardAcceleration: 1,
				sideAcceleration: 1,
				steering: 0,
				rotation: 0,
				deltaRotation: 0,
				rollInfluence: 0.01,
				maxSuspensionForce: Number.MAX_VALUE,
				isFrontWheel: !0,
				clippedInvContactDotSuspension: 1,
				suspensionRelativeVelocity: 0,
				suspensionForce: 0,
				slipInfo: 0,
				skidInfo: 0,
				suspensionLength: 0,
				maxSuspensionTravel: 1,
				useCustomSlidingRotationalSpeed: !1,
				customSlidingRotationalSpeed: -0.1,
			})),
			(this.maxSuspensionTravel = e.maxSuspensionTravel),
			(this.customSlidingRotationalSpeed = e.customSlidingRotationalSpeed),
			(this.useCustomSlidingRotationalSpeed = e.useCustomSlidingRotationalSpeed),
			(this.sliding = !1),
			(this.chassisConnectionPointLocal = e.chassisConnectionPointLocal.clone()),
			(this.chassisConnectionPointWorld = e.chassisConnectionPointWorld.clone()),
			(this.directionLocal = e.directionLocal.clone()),
			(this.directionWorld = e.directionWorld.clone()),
			(this.axleLocal = e.axleLocal.clone()),
			(this.axleWorld = e.axleWorld.clone()),
			(this.suspensionRestLength = e.suspensionRestLength),
			(this.suspensionMaxLength = e.suspensionMaxLength),
			(this.radius = e.radius),
			(this.suspensionStiffness = e.suspensionStiffness),
			(this.dampingCompression = e.dampingCompression),
			(this.dampingRelaxation = e.dampingRelaxation),
			(this.frictionSlip = e.frictionSlip),
			(this.forwardAcceleration = e.forwardAcceleration),
			(this.sideAcceleration = e.sideAcceleration),
			(this.steering = 0),
			(this.rotation = 0),
			(this.deltaRotation = 0),
			(this.rollInfluence = e.rollInfluence),
			(this.maxSuspensionForce = e.maxSuspensionForce),
			(this.engineForce = 0),
			(this.brake = 0),
			(this.isFrontWheel = e.isFrontWheel),
			(this.clippedInvContactDotSuspension = 1),
			(this.suspensionRelativeVelocity = 0),
			(this.suspensionForce = 0),
			(this.slipInfo = 0),
			(this.skidInfo = 0),
			(this.suspensionLength = 0),
			(this.sideImpulse = 0),
			(this.forwardImpulse = 0),
			(this.raycastResult = new RaycastResult()),
			(this.worldTransform = new Transform()),
			(this.isInContact = !1);
	}
	updateWheel(e) {
		const t = this.raycastResult;
		if (this.isInContact) {
			const s = t.hitNormalWorld.dot(t.directionWorld);
			t.hitPointWorld.vsub(e.position, relpos), e.getVelocityAtWorldPoint(relpos, chassis_velocity_at_contactPoint);
			const i = t.hitNormalWorld.dot(chassis_velocity_at_contactPoint);
			if (s >= -0.1) (this.suspensionRelativeVelocity = 0), (this.clippedInvContactDotSuspension = 10);
			else {
				const e = -1 / s;
				(this.suspensionRelativeVelocity = i * e), (this.clippedInvContactDotSuspension = e);
			}
		} else (t.suspensionLength = this.suspensionRestLength), (this.suspensionRelativeVelocity = 0), t.directionWorld.scale(-1, t.hitNormalWorld), (this.clippedInvContactDotSuspension = 1);
	}
}
const chassis_velocity_at_contactPoint = new Vec3(),
	relpos = new Vec3();
class RaycastVehicle {
	constructor(e) {
		(this.chassisBody = e.chassisBody), (this.wheelInfos = []), (this.sliding = !1), (this.world = null), (this.indexRightAxis = void 0 !== e.indexRightAxis ? e.indexRightAxis : 2), (this.indexForwardAxis = void 0 !== e.indexForwardAxis ? e.indexForwardAxis : 0), (this.indexUpAxis = void 0 !== e.indexUpAxis ? e.indexUpAxis : 1), (this.constraints = []), (this.preStepCallback = () => {}), (this.currentVehicleSpeedKmHour = 0), (this.numWheelsOnGround = 0);
	}
	addWheel(e) {
		void 0 === e && (e = {});
		const t = new WheelInfo(e),
			s = this.wheelInfos.length;
		return this.wheelInfos.push(t), s;
	}
	setSteeringValue(e, t) {
		this.wheelInfos[t].steering = e;
	}
	applyEngineForce(e, t) {
		this.wheelInfos[t].engineForce = e;
	}
	setBrake(e, t) {
		this.wheelInfos[t].brake = e;
	}
	addToWorld(e) {
		e.addBody(this.chassisBody);
		const t = this;
		(this.preStepCallback = () => {
			t.updateVehicle(e.dt);
		}),
			e.addEventListener('preStep', this.preStepCallback),
			(this.world = e);
	}
	getVehicleAxisWorld(e, t) {
		t.set(0 === e ? 1 : 0, 1 === e ? 1 : 0, 2 === e ? 1 : 0), this.chassisBody.vectorToWorldFrame(t, t);
	}
	updateVehicle(e) {
		const t = this.wheelInfos,
			s = t.length,
			i = this.chassisBody;
		for (let e = 0; e < s; e++) this.updateWheelTransform(e);
		this.currentVehicleSpeedKmHour = 3.6 * i.velocity.length();
		const o = new Vec3();
		this.getVehicleAxisWorld(this.indexForwardAxis, o), o.dot(i.velocity) < 0 && (this.currentVehicleSpeedKmHour *= -1);
		for (let e = 0; e < s; e++) this.castRay(t[e]);
		this.updateSuspension(e);
		const n = new Vec3(),
			r = new Vec3();
		for (let o = 0; o < s; o++) {
			const s = t[o];
			let a = s.suspensionForce;
			a > s.maxSuspensionForce && (a = s.maxSuspensionForce), s.raycastResult.hitNormalWorld.scale(a * e, n), s.raycastResult.hitPointWorld.vsub(i.position, r), i.applyImpulse(n, r);
		}
		this.updateFriction(e);
		const a = new Vec3(),
			l = new Vec3(),
			c = new Vec3();
		for (let o = 0; o < s; o++) {
			const s = t[o];
			i.getVelocityAtWorldPoint(s.chassisConnectionPointWorld, c);
			let n = 1;
			if (1 === this.indexUpAxis) n = -1;
			if (s.isInContact) {
				this.getVehicleAxisWorld(this.indexForwardAxis, l);
				const t = l.dot(s.raycastResult.hitNormalWorld);
				s.raycastResult.hitNormalWorld.scale(t, a), l.vsub(a, l);
				const i = l.dot(c);
				s.deltaRotation = (n * i * e) / s.radius;
			}
			(!s.sliding && s.isInContact) || 0 === s.engineForce || !s.useCustomSlidingRotationalSpeed || (s.deltaRotation = (s.engineForce > 0 ? 1 : -1) * s.customSlidingRotationalSpeed * e), Math.abs(s.brake) > Math.abs(s.engineForce) && (s.deltaRotation = 0), (s.rotation += s.deltaRotation), (s.deltaRotation *= 0.99);
		}
	}
	updateSuspension(e) {
		const t = this.chassisBody.mass,
			s = this.wheelInfos,
			i = s.length;
		for (let e = 0; e < i; e++) {
			const i = s[e];
			if (i.isInContact) {
				let e;
				const s = i.suspensionRestLength - i.suspensionLength;
				e = i.suspensionStiffness * s * i.clippedInvContactDotSuspension;
				const o = i.suspensionRelativeVelocity;
				let n;
				(n = o < 0 ? i.dampingCompression : i.dampingRelaxation), (e -= n * o), (i.suspensionForce = e * t), i.suspensionForce < 0 && (i.suspensionForce = 0);
			} else i.suspensionForce = 0;
		}
	}
	removeFromWorld(e) {
		this.constraints, e.removeBody(this.chassisBody), e.removeEventListener('preStep', this.preStepCallback), (this.world = null);
	}
	castRay(e) {
		const t = castRay_rayvector,
			s = castRay_target;
		this.updateWheelTransformWorld(e);
		const i = this.chassisBody;
		let o = -1;
		const n = e.suspensionRestLength + e.radius;
		e.directionWorld.scale(n, t);
		const r = e.chassisConnectionPointWorld;
		r.vadd(t, s);
		const a = e.raycastResult;
		a.reset();
		const l = i.collisionResponse;
		(i.collisionResponse = !1), this.world.rayTest(r, s, a), (i.collisionResponse = l);
		const c = a.body;
		if (((e.raycastResult.groundObject = 0), c)) {
			(o = a.distance), (e.raycastResult.hitNormalWorld = a.hitNormalWorld), (e.isInContact = !0);
			const t = a.distance;
			e.suspensionLength = t - e.radius;
			const s = e.suspensionRestLength - e.maxSuspensionTravel,
				n = e.suspensionRestLength + e.maxSuspensionTravel;
			e.suspensionLength < s && (e.suspensionLength = s), e.suspensionLength > n && ((e.suspensionLength = n), e.raycastResult.reset());
			const r = e.raycastResult.hitNormalWorld.dot(e.directionWorld),
				l = new Vec3();
			i.getVelocityAtWorldPoint(e.raycastResult.hitPointWorld, l);
			const c = e.raycastResult.hitNormalWorld.dot(l);
			if (r >= -0.1) (e.suspensionRelativeVelocity = 0), (e.clippedInvContactDotSuspension = 10);
			else {
				const t = -1 / r;
				(e.suspensionRelativeVelocity = c * t), (e.clippedInvContactDotSuspension = t);
			}
		} else (e.suspensionLength = e.suspensionRestLength + 0 * e.maxSuspensionTravel), (e.suspensionRelativeVelocity = 0), e.directionWorld.scale(-1, e.raycastResult.hitNormalWorld), (e.clippedInvContactDotSuspension = 1);
		return o;
	}
	updateWheelTransformWorld(e) {
		e.isInContact = !1;
		const t = this.chassisBody;
		t.pointToWorldFrame(e.chassisConnectionPointLocal, e.chassisConnectionPointWorld), t.vectorToWorldFrame(e.directionLocal, e.directionWorld), t.vectorToWorldFrame(e.axleLocal, e.axleWorld);
	}
	updateWheelTransform(e) {
		const t = tmpVec4,
			s = tmpVec5,
			i = tmpVec6,
			o = this.wheelInfos[e];
		this.updateWheelTransformWorld(o), o.directionLocal.scale(-1, t), s.copy(o.axleLocal), t.cross(s, i), i.normalize(), s.normalize();
		const n = o.steering,
			r = new Quaternion();
		r.setFromAxisAngle(t, n);
		const a = new Quaternion();
		a.setFromAxisAngle(s, o.rotation);
		const l = o.worldTransform.quaternion;
		this.chassisBody.quaternion.mult(r, l), l.mult(a, l), l.normalize();
		const c = o.worldTransform.position;
		c.copy(o.directionWorld), c.scale(o.suspensionLength, c), c.vadd(o.chassisConnectionPointWorld, c);
	}
	getWheelTransformWorld(e) {
		return this.wheelInfos[e].worldTransform;
	}
	updateFriction(e) {
		const t = updateFriction_surfNormalWS_scaled_proj,
			s = this.wheelInfos,
			i = s.length,
			o = this.chassisBody,
			n = updateFriction_forwardWS,
			r = updateFriction_axle;
		this.numWheelsOnGround = 0;
		for (let e = 0; e < i; e++) {
			const t = s[e];
			t.raycastResult.body && this.numWheelsOnGround++, (t.sideImpulse = 0), (t.forwardImpulse = 0), n[e] || (n[e] = new Vec3()), r[e] || (r[e] = new Vec3());
		}
		for (let e = 0; e < i; e++) {
			const i = s[e],
				a = i.raycastResult.body;
			if (a) {
				const s = r[e];
				this.getWheelTransformWorld(e).vectorToWorldFrame(directions[this.indexRightAxis], s);
				const l = i.raycastResult.hitNormalWorld,
					c = s.dot(l);
				l.scale(c, t), s.vsub(t, s), s.normalize(), l.cross(s, n[e]), n[e].normalize(), (i.sideImpulse = resolveSingleBilateral(o, i.raycastResult.hitPointWorld, a, i.raycastResult.hitPointWorld, s)), (i.sideImpulse *= sideFrictionStiffness2);
			}
		}
		this.sliding = !1;
		for (let t = 0; t < i; t++) {
			const i = s[t],
				r = i.raycastResult.body;
			let a = 0;
			if (((i.slipInfo = 1), r)) {
				const s = 0,
					l = i.brake ? i.brake : s;
				(a = calcRollingFriction(o, r, i.raycastResult.hitPointWorld, n[t], l)), (a += i.engineForce * e);
				const c = l / a;
				i.slipInfo *= c;
			}
			if (((i.forwardImpulse = 0), (i.skidInfo = 1), r)) {
				i.skidInfo = 1;
				const t = i.suspensionForce * e * i.frictionSlip,
					s = t * t;
				i.forwardImpulse = a;
				const o = (0.5 * i.forwardImpulse) / i.forwardAcceleration,
					n = (1 * i.sideImpulse) / i.sideAcceleration,
					r = o * o + n * n;
				if (((i.sliding = !1), r > s)) {
					(this.sliding = !0), (i.sliding = !0);
					const e = t / Math.sqrt(r);
					i.skidInfo *= e;
				}
			}
		}
		if (this.sliding)
			for (let e = 0; e < i; e++) {
				const t = s[e];
				0 !== t.sideImpulse && t.skidInfo < 1 && ((t.forwardImpulse *= t.skidInfo), (t.sideImpulse *= t.skidInfo));
			}
		for (let e = 0; e < i; e++) {
			const t = s[e],
				i = new Vec3();
			if ((t.raycastResult.hitPointWorld.vsub(o.position, i), 0 !== t.forwardImpulse)) {
				const s = new Vec3();
				n[e].scale(t.forwardImpulse, s), o.applyImpulse(s, i);
			}
			if (0 !== t.sideImpulse) {
				const s = t.raycastResult.body,
					n = new Vec3();
				t.raycastResult.hitPointWorld.vsub(s.position, n);
				const a = new Vec3();
				r[e].scale(t.sideImpulse, a), o.vectorToLocalFrame(i, i), (i['xyz'[this.indexUpAxis]] *= t.rollInfluence), o.vectorToWorldFrame(i, i), o.applyImpulse(a, i), a.scale(-1, a), s.applyImpulse(a, n);
			}
		}
	}
}
new Vec3(), new Vec3(), new Vec3();
const tmpVec4 = new Vec3(),
	tmpVec5 = new Vec3(),
	tmpVec6 = new Vec3();
new Ray(), new Vec3();
const castRay_rayvector = new Vec3(),
	castRay_target = new Vec3(),
	directions = [new Vec3(1, 0, 0), new Vec3(0, 1, 0), new Vec3(0, 0, 1)],
	updateFriction_surfNormalWS_scaled_proj = new Vec3(),
	updateFriction_axle = [],
	updateFriction_forwardWS = [],
	sideFrictionStiffness2 = 1,
	calcRollingFriction_vel1 = new Vec3(),
	calcRollingFriction_vel2 = new Vec3(),
	calcRollingFriction_vel = new Vec3();
function calcRollingFriction(e, t, s, i, o) {
	let n = 0;
	const r = s,
		a = calcRollingFriction_vel1,
		l = calcRollingFriction_vel2,
		c = calcRollingFriction_vel;
	e.getVelocityAtWorldPoint(r, a), t.getVelocityAtWorldPoint(r, l), a.vsub(l, c);
	return (n = -i.dot(c) * (1 / (computeImpulseDenominator(e, s, i) + computeImpulseDenominator(t, s, i)))), o < n && (n = o), n < -o && (n = -o), n;
}
const computeImpulseDenominator_r0 = new Vec3(),
	computeImpulseDenominator_c0 = new Vec3(),
	computeImpulseDenominator_vec = new Vec3(),
	computeImpulseDenominator_m = new Vec3();
function computeImpulseDenominator(e, t, s) {
	const i = computeImpulseDenominator_r0,
		o = computeImpulseDenominator_c0,
		n = computeImpulseDenominator_vec,
		r = computeImpulseDenominator_m;
	return t.vsub(e.position, i), i.cross(s, o), e.invInertiaWorld.vmult(o, r), r.cross(i, n), e.invMass + s.dot(n);
}
const resolveSingleBilateral_vel1 = new Vec3(),
	resolveSingleBilateral_vel2 = new Vec3(),
	resolveSingleBilateral_vel = new Vec3();
function resolveSingleBilateral(e, t, s, i, o) {
	if (o.lengthSquared() > 1.1) return 0;
	const n = resolveSingleBilateral_vel1,
		r = resolveSingleBilateral_vel2,
		a = resolveSingleBilateral_vel;
	e.getVelocityAtWorldPoint(t, n), s.getVelocityAtWorldPoint(i, r), n.vsub(r, a);
	return -0.2 * o.dot(a) * (1 / (e.invMass + s.invMass));
}
class Sphere extends Shape {
	constructor(e) {
		if ((super({ type: Shape.types.SPHERE }), (this.radius = void 0 !== e ? e : 1), this.radius < 0)) throw new Error('The sphere radius cannot be negative.');
		this.updateBoundingSphereRadius();
	}
	calculateLocalInertia(e, t) {
		void 0 === t && (t = new Vec3());
		const s = (2 * e * this.radius * this.radius) / 5;
		return (t.x = s), (t.y = s), (t.z = s), t;
	}
	volume() {
		return (4 * Math.PI * Math.pow(this.radius, 3)) / 3;
	}
	updateBoundingSphereRadius() {
		this.boundingSphereRadius = this.radius;
	}
	calculateWorldAABB(e, t, s, i) {
		const o = this.radius,
			n = ['x', 'y', 'z'];
		for (let t = 0; t < n.length; t++) {
			const r = n[t];
			(s[r] = e[r] - o), (i[r] = e[r] + o);
		}
	}
}
class RigidVehicle {
	constructor(e) {
		void 0 === e && (e = {}), (this.wheelBodies = []), (this.coordinateSystem = void 0 !== e.coordinateSystem ? e.coordinateSystem.clone() : new Vec3(1, 2, 3)), e.chassisBody ? (this.chassisBody = e.chassisBody) : (this.chassisBody = new Body({ mass: 1, shape: new Box(new Vec3(5, 0.5, 2)) })), (this.constraints = []), (this.wheelAxes = []), (this.wheelForces = []);
	}
	addWheel(e) {
		let t;
		void 0 === e && (e = {}), (t = e.body ? e.body : new Body({ mass: 1, shape: new Sphere(1.2) })), this.wheelBodies.push(t), this.wheelForces.push(0);
		const s = void 0 !== e.position ? e.position.clone() : new Vec3(),
			i = new Vec3();
		this.chassisBody.pointToWorldFrame(s, i), t.position.set(i.x, i.y, i.z);
		const o = void 0 !== e.axis ? e.axis.clone() : new Vec3(0, 0, 1);
		this.wheelAxes.push(o);
		const n = new HingeConstraint(this.chassisBody, t, { pivotA: s, axisA: o, pivotB: Vec3.ZERO, axisB: o, collideConnected: !1 });
		return this.constraints.push(n), this.wheelBodies.length - 1;
	}
	setSteeringValue(e, t) {
		const s = this.wheelAxes[t],
			i = Math.cos(e),
			o = Math.sin(e),
			n = s.x,
			r = s.z;
		this.constraints[t].axisA.set(-i * n + o * r, 0, o * n + i * r);
	}
	setMotorSpeed(e, t) {
		const s = this.constraints[t];
		s.enableMotor(), (s.motorTargetVelocity = e);
	}
	disableMotor(e) {
		this.constraints[e].disableMotor();
	}
	setWheelForce(e, t) {
		this.wheelForces[t] = e;
	}
	applyWheelForce(e, t) {
		const s = this.wheelAxes[t],
			i = this.wheelBodies[t],
			o = i.torque;
		s.scale(e, torque), i.vectorToWorldFrame(torque, torque), o.vadd(torque, o);
	}
	addToWorld(e) {
		const t = this.constraints,
			s = this.wheelBodies.concat([this.chassisBody]);
		for (let t = 0; t < s.length; t++) e.addBody(s[t]);
		for (let s = 0; s < t.length; s++) e.addConstraint(t[s]);
		e.addEventListener('preStep', this._update.bind(this));
	}
	_update() {
		const e = this.wheelForces;
		for (let t = 0; t < e.length; t++) this.applyWheelForce(e[t], t);
	}
	removeFromWorld(e) {
		const t = this.constraints,
			s = this.wheelBodies.concat([this.chassisBody]);
		for (let t = 0; t < s.length; t++) e.removeBody(s[t]);
		for (let s = 0; s < t.length; s++) e.removeConstraint(t[s]);
	}
	getWheelSpeed(e) {
		const t = this.wheelAxes[e],
			s = this.wheelBodies[e].angularVelocity;
		return this.chassisBody.vectorToWorldFrame(t, worldAxis), s.dot(worldAxis);
	}
}
const torque = new Vec3(),
	worldAxis = new Vec3();
class SPHSystem {
	constructor() {
		(this.particles = []), (this.density = 1), (this.smoothingRadius = 1), (this.speedOfSound = 1), (this.viscosity = 0.01), (this.eps = 1e-6), (this.pressures = []), (this.densities = []), (this.neighbors = []);
	}
	add(e) {
		this.particles.push(e), this.neighbors.length < this.particles.length && this.neighbors.push([]);
	}
	remove(e) {
		const t = this.particles.indexOf(e);
		-1 !== t && (this.particles.splice(t, 1), this.neighbors.length > this.particles.length && this.neighbors.pop());
	}
	getNeighbors(e, t) {
		const s = this.particles.length,
			i = e.id,
			o = this.smoothingRadius * this.smoothingRadius,
			n = SPHSystem_getNeighbors_dist;
		for (let r = 0; r !== s; r++) {
			const s = this.particles[r];
			s.position.vsub(e.position, n), i !== s.id && n.lengthSquared() < o && t.push(s);
		}
	}
	update() {
		const e = this.particles.length,
			t = SPHSystem_update_dist,
			s = this.speedOfSound,
			i = this.eps;
		for (let i = 0; i !== e; i++) {
			const e = this.particles[i],
				o = this.neighbors[i];
			(o.length = 0), this.getNeighbors(e, o), o.push(this.particles[i]);
			const n = o.length;
			let r = 0;
			for (let s = 0; s !== n; s++) {
				e.position.vsub(o[s].position, t);
				const i = t.length(),
					n = this.w(i);
				r += o[s].mass * n;
			}
			(this.densities[i] = r), (this.pressures[i] = s * s * (this.densities[i] - this.density));
		}
		const o = SPHSystem_update_a_pressure,
			n = SPHSystem_update_a_visc,
			r = SPHSystem_update_gradW,
			a = SPHSystem_update_r_vec,
			l = SPHSystem_update_u;
		for (let t = 0; t !== e; t++) {
			const e = this.particles[t];
			let s, c;
			o.set(0, 0, 0), n.set(0, 0, 0);
			const h = this.neighbors[t],
				d = h.length;
			for (let p = 0; p !== d; p++) {
				const d = h[p];
				e.position.vsub(d.position, a);
				const u = a.length();
				(s = -d.mass * (this.pressures[t] / (this.densities[t] * this.densities[t] + i) + this.pressures[p] / (this.densities[p] * this.densities[p] + i))), this.gradw(a, r), r.scale(s, r), o.vadd(r, o), d.velocity.vsub(e.velocity, l), l.scale((1 / (1e-4 + this.densities[t] * this.densities[p])) * this.viscosity * d.mass, l), (c = this.nablaw(u)), l.scale(c, l), n.vadd(l, n);
			}
			n.scale(e.mass, n), o.scale(e.mass, o), e.force.vadd(n, e.force), e.force.vadd(o, e.force);
		}
	}
	w(e) {
		const t = this.smoothingRadius;
		return (315 / (64 * Math.PI * t ** 9)) * (t * t - e * e) ** 3;
	}
	gradw(e, t) {
		const s = e.length(),
			i = this.smoothingRadius;
		e.scale((945 / (32 * Math.PI * i ** 9)) * (i * i - s * s) ** 2, t);
	}
	nablaw(e) {
		const t = this.smoothingRadius;
		return (945 / (32 * Math.PI * t ** 9)) * (t * t - e * e) * (7 * e * e - 3 * t * t);
	}
}
const SPHSystem_getNeighbors_dist = new Vec3(),
	SPHSystem_update_dist = new Vec3(),
	SPHSystem_update_a_pressure = new Vec3(),
	SPHSystem_update_a_visc = new Vec3(),
	SPHSystem_update_gradW = new Vec3(),
	SPHSystem_update_r_vec = new Vec3(),
	SPHSystem_update_u = new Vec3();
class Cylinder extends ConvexPolyhedron {
	constructor(e, t, s, i) {
		if ((void 0 === e && (e = 1), void 0 === t && (t = 1), void 0 === s && (s = 1), void 0 === i && (i = 8), e < 0)) throw new Error('The cylinder radiusTop cannot be negative.');
		if (t < 0) throw new Error('The cylinder radiusBottom cannot be negative.');
		const o = i,
			n = [],
			r = [],
			a = [],
			l = [],
			c = [],
			h = Math.cos,
			d = Math.sin;
		n.push(new Vec3(-t * d(0), 0.5 * -s, t * h(0))), l.push(0), n.push(new Vec3(-e * d(0), 0.5 * s, e * h(0))), c.push(1);
		for (let i = 0; i < o; i++) {
			const p = ((2 * Math.PI) / o) * (i + 1),
				u = ((2 * Math.PI) / o) * (i + 0.5);
			i < o - 1 ? (n.push(new Vec3(-t * d(p), 0.5 * -s, t * h(p))), l.push(2 * i + 2), n.push(new Vec3(-e * d(p), 0.5 * s, e * h(p))), c.push(2 * i + 3), a.push([2 * i, 2 * i + 1, 2 * i + 3, 2 * i + 2])) : a.push([2 * i, 2 * i + 1, 1, 0]), (o % 2 == 1 || i < o / 2) && r.push(new Vec3(-d(u), 0, h(u)));
		}
		a.push(l), r.push(new Vec3(0, 1, 0));
		const p = [];
		for (let e = 0; e < c.length; e++) p.push(c[c.length - e - 1]);
		a.push(p), super({ vertices: n, faces: a, axes: r }), (this.type = Shape.types.CYLINDER), (this.radiusTop = e), (this.radiusBottom = t), (this.height = s), (this.numSegments = i);
	}
}
class Particle extends Shape {
	constructor() {
		super({ type: Shape.types.PARTICLE });
	}
	calculateLocalInertia(e, t) {
		return void 0 === t && (t = new Vec3()), t.set(0, 0, 0), t;
	}
	volume() {
		return 0;
	}
	updateBoundingSphereRadius() {
		this.boundingSphereRadius = 0;
	}
	calculateWorldAABB(e, t, s, i) {
		s.copy(e), i.copy(e);
	}
}
class Plane extends Shape {
	constructor() {
		super({ type: Shape.types.PLANE }), (this.worldNormal = new Vec3()), (this.worldNormalNeedsUpdate = !0), (this.boundingSphereRadius = Number.MAX_VALUE);
	}
	computeWorldNormal(e) {
		const t = this.worldNormal;
		t.set(0, 0, 1), e.vmult(t, t), (this.worldNormalNeedsUpdate = !1);
	}
	calculateLocalInertia(e, t) {
		return void 0 === t && (t = new Vec3()), t;
	}
	volume() {
		return Number.MAX_VALUE;
	}
	calculateWorldAABB(e, t, s, i) {
		tempNormal.set(0, 0, 1), t.vmult(tempNormal, tempNormal);
		const o = Number.MAX_VALUE;
		s.set(-o, -o, -o), i.set(o, o, o), 1 === tempNormal.x ? (i.x = e.x) : -1 === tempNormal.x && (s.x = e.x), 1 === tempNormal.y ? (i.y = e.y) : -1 === tempNormal.y && (s.y = e.y), 1 === tempNormal.z ? (i.z = e.z) : -1 === tempNormal.z && (s.z = e.z);
	}
	updateBoundingSphereRadius() {
		this.boundingSphereRadius = Number.MAX_VALUE;
	}
}
const tempNormal = new Vec3();
class Heightfield extends Shape {
	constructor(e, t) {
		void 0 === t && (t = {}),
			(t = Utils.defaults(t, { maxValue: null, minValue: null, elementSize: 1 })),
			super({ type: Shape.types.HEIGHTFIELD }),
			(this.data = e),
			(this.maxValue = t.maxValue),
			(this.minValue = t.minValue),
			(this.elementSize = t.elementSize),
			null === t.minValue && this.updateMinValue(),
			null === t.maxValue && this.updateMaxValue(),
			(this.cacheEnabled = !0),
			(this.pillarConvex = new ConvexPolyhedron()),
			(this.pillarOffset = new Vec3()),
			this.updateBoundingSphereRadius(),
			(this._cachedPillars = {});
	}
	update() {
		this._cachedPillars = {};
	}
	updateMinValue() {
		const e = this.data;
		let t = e[0][0];
		for (let s = 0; s !== e.length; s++)
			for (let i = 0; i !== e[s].length; i++) {
				const o = e[s][i];
				o < t && (t = o);
			}
		this.minValue = t;
	}
	updateMaxValue() {
		const e = this.data;
		let t = e[0][0];
		for (let s = 0; s !== e.length; s++)
			for (let i = 0; i !== e[s].length; i++) {
				const o = e[s][i];
				o > t && (t = o);
			}
		this.maxValue = t;
	}
	setHeightValueAtIndex(e, t, s) {
		(this.data[e][t] = s), this.clearCachedConvexTrianglePillar(e, t, !1), e > 0 && (this.clearCachedConvexTrianglePillar(e - 1, t, !0), this.clearCachedConvexTrianglePillar(e - 1, t, !1)), t > 0 && (this.clearCachedConvexTrianglePillar(e, t - 1, !0), this.clearCachedConvexTrianglePillar(e, t - 1, !1)), t > 0 && e > 0 && this.clearCachedConvexTrianglePillar(e - 1, t - 1, !0);
	}
	getRectMinMax(e, t, s, i, o) {
		void 0 === o && (o = []);
		const n = this.data;
		let r = this.minValue;
		for (let o = e; o <= s; o++)
			for (let e = t; e <= i; e++) {
				const t = n[o][e];
				t > r && (r = t);
			}
		(o[0] = this.minValue), (o[1] = r);
	}
	getIndexOfPosition(e, t, s, i) {
		const o = this.elementSize,
			n = this.data;
		let r = Math.floor(e / o),
			a = Math.floor(t / o);
		return (s[0] = r), (s[1] = a), i && (r < 0 && (r = 0), a < 0 && (a = 0), r >= n.length - 1 && (r = n.length - 1), a >= n[0].length - 1 && (a = n[0].length - 1)), !(r < 0 || a < 0 || r >= n.length - 1 || a >= n[0].length - 1);
	}
	getTriangleAt(e, t, s, i, o, n) {
		const r = getHeightAt_idx;
		this.getIndexOfPosition(e, t, r, s);
		let a = r[0],
			l = r[1];
		const c = this.data;
		s && ((a = Math.min(c.length - 2, Math.max(0, a))), (l = Math.min(c[0].length - 2, Math.max(0, l))));
		const h = this.elementSize,
			d = (e / h - a) ** 2 + (t / h - l) ** 2 > (e / h - (a + 1)) ** 2 + (t / h - (l + 1)) ** 2;
		return this.getTriangle(a, l, d, i, o, n), d;
	}
	getNormalAt(e, t, s, i) {
		const o = getNormalAt_a,
			n = getNormalAt_b,
			r = getNormalAt_c,
			a = getNormalAt_e0,
			l = getNormalAt_e1;
		this.getTriangleAt(e, t, s, o, n, r), n.vsub(o, a), r.vsub(o, l), a.cross(l, i), i.normalize();
	}
	getAabbAtIndex(e, t, s) {
		let { lowerBound: i, upperBound: o } = s;
		const n = this.data,
			r = this.elementSize;
		i.set(e * r, t * r, n[e][t]), o.set((e + 1) * r, (t + 1) * r, n[e + 1][t + 1]);
	}
	getHeightAt(e, t, s) {
		const i = this.data,
			o = getHeightAt_a,
			n = getHeightAt_b,
			r = getHeightAt_c,
			a = getHeightAt_idx;
		this.getIndexOfPosition(e, t, a, s);
		let l = a[0],
			c = a[1];
		s && ((l = Math.min(i.length - 2, Math.max(0, l))), (c = Math.min(i[0].length - 2, Math.max(0, c))));
		const h = this.getTriangleAt(e, t, s, o, n, r);
		barycentricWeights(e, t, o.x, o.y, n.x, n.y, r.x, r.y, getHeightAt_weights);
		const d = getHeightAt_weights;
		return h ? i[l + 1][c + 1] * d.x + i[l][c + 1] * d.y + i[l + 1][c] * d.z : i[l][c] * d.x + i[l + 1][c] * d.y + i[l][c + 1] * d.z;
	}
	getCacheConvexTrianglePillarKey(e, t, s) {
		return `${e}_${t}_${s ? 1 : 0}`;
	}
	getCachedConvexTrianglePillar(e, t, s) {
		return this._cachedPillars[this.getCacheConvexTrianglePillarKey(e, t, s)];
	}
	setCachedConvexTrianglePillar(e, t, s, i, o) {
		this._cachedPillars[this.getCacheConvexTrianglePillarKey(e, t, s)] = { convex: i, offset: o };
	}
	clearCachedConvexTrianglePillar(e, t, s) {
		delete this._cachedPillars[this.getCacheConvexTrianglePillarKey(e, t, s)];
	}
	getTriangle(e, t, s, i, o, n) {
		const r = this.data,
			a = this.elementSize;
		s ? (i.set((e + 1) * a, (t + 1) * a, r[e + 1][t + 1]), o.set(e * a, (t + 1) * a, r[e][t + 1]), n.set((e + 1) * a, t * a, r[e + 1][t])) : (i.set(e * a, t * a, r[e][t]), o.set((e + 1) * a, t * a, r[e + 1][t]), n.set(e * a, (t + 1) * a, r[e][t + 1]));
	}
	getConvexTrianglePillar(e, t, s) {
		let i = this.pillarConvex,
			o = this.pillarOffset;
		if (this.cacheEnabled) {
			const n = this.getCachedConvexTrianglePillar(e, t, s);
			if (n) return (this.pillarConvex = n.convex), void (this.pillarOffset = n.offset);
			(i = new ConvexPolyhedron()), (o = new Vec3()), (this.pillarConvex = i), (this.pillarOffset = o);
		}
		const n = this.data,
			r = this.elementSize,
			a = i.faces;
		i.vertices.length = 6;
		for (let e = 0; e < 6; e++) i.vertices[e] || (i.vertices[e] = new Vec3());
		a.length = 5;
		for (let e = 0; e < 5; e++) a[e] || (a[e] = []);
		const l = i.vertices,
			c = (Math.min(n[e][t], n[e + 1][t], n[e][t + 1], n[e + 1][t + 1]) - this.minValue) / 2 + this.minValue;
		s
			? (o.set((e + 0.75) * r, (t + 0.75) * r, c),
			  l[0].set(0.25 * r, 0.25 * r, n[e + 1][t + 1] - c),
			  l[1].set(-0.75 * r, 0.25 * r, n[e][t + 1] - c),
			  l[2].set(0.25 * r, -0.75 * r, n[e + 1][t] - c),
			  l[3].set(0.25 * r, 0.25 * r, -Math.abs(c) - 1),
			  l[4].set(-0.75 * r, 0.25 * r, -Math.abs(c) - 1),
			  l[5].set(0.25 * r, -0.75 * r, -Math.abs(c) - 1),
			  (a[0][0] = 0),
			  (a[0][1] = 1),
			  (a[0][2] = 2),
			  (a[1][0] = 5),
			  (a[1][1] = 4),
			  (a[1][2] = 3),
			  (a[2][0] = 2),
			  (a[2][1] = 5),
			  (a[2][2] = 3),
			  (a[2][3] = 0),
			  (a[3][0] = 3),
			  (a[3][1] = 4),
			  (a[3][2] = 1),
			  (a[3][3] = 0),
			  (a[4][0] = 1),
			  (a[4][1] = 4),
			  (a[4][2] = 5),
			  (a[4][3] = 2))
			: (o.set((e + 0.25) * r, (t + 0.25) * r, c),
			  l[0].set(-0.25 * r, -0.25 * r, n[e][t] - c),
			  l[1].set(0.75 * r, -0.25 * r, n[e + 1][t] - c),
			  l[2].set(-0.25 * r, 0.75 * r, n[e][t + 1] - c),
			  l[3].set(-0.25 * r, -0.25 * r, -Math.abs(c) - 1),
			  l[4].set(0.75 * r, -0.25 * r, -Math.abs(c) - 1),
			  l[5].set(-0.25 * r, 0.75 * r, -Math.abs(c) - 1),
			  (a[0][0] = 0),
			  (a[0][1] = 1),
			  (a[0][2] = 2),
			  (a[1][0] = 5),
			  (a[1][1] = 4),
			  (a[1][2] = 3),
			  (a[2][0] = 0),
			  (a[2][1] = 2),
			  (a[2][2] = 5),
			  (a[2][3] = 3),
			  (a[3][0] = 1),
			  (a[3][1] = 0),
			  (a[3][2] = 3),
			  (a[3][3] = 4),
			  (a[4][0] = 4),
			  (a[4][1] = 5),
			  (a[4][2] = 2),
			  (a[4][3] = 1)),
			i.computeNormals(),
			i.computeEdges(),
			i.updateBoundingSphereRadius(),
			this.setCachedConvexTrianglePillar(e, t, s, i, o);
	}
	calculateLocalInertia(e, t) {
		return void 0 === t && (t = new Vec3()), t.set(0, 0, 0), t;
	}
	volume() {
		return Number.MAX_VALUE;
	}
	calculateWorldAABB(e, t, s, i) {
		s.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE), i.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
	}
	updateBoundingSphereRadius() {
		const e = this.data,
			t = this.elementSize;
		this.boundingSphereRadius = new Vec3(e.length * t, e[0].length * t, Math.max(Math.abs(this.maxValue), Math.abs(this.minValue))).length();
	}
	setHeightsFromImage(e, t) {
		const { x: s, z: i, y: o } = t,
			n = document.createElement('canvas');
		(n.width = e.width), (n.height = e.height);
		const r = n.getContext('2d');
		r.drawImage(e, 0, 0);
		const a = r.getImageData(0, 0, e.width, e.height),
			l = this.data;
		(l.length = 0), (this.elementSize = Math.abs(s) / a.width);
		for (let e = 0; e < a.height; e++) {
			const t = [];
			for (let o = 0; o < a.width; o++) {
				const n = ((a.data[4 * (e * a.height + o)] + a.data[4 * (e * a.height + o) + 1] + a.data[4 * (e * a.height + o) + 2]) / 4 / 255) * i;
				s < 0 ? t.push(n) : t.unshift(n);
			}
			o < 0 ? l.unshift(t) : l.push(t);
		}
		this.updateMaxValue(), this.updateMinValue(), this.update();
	}
}
const getHeightAt_idx = [],
	getHeightAt_weights = new Vec3(),
	getHeightAt_a = new Vec3(),
	getHeightAt_b = new Vec3(),
	getHeightAt_c = new Vec3(),
	getNormalAt_a = new Vec3(),
	getNormalAt_b = new Vec3(),
	getNormalAt_c = new Vec3(),
	getNormalAt_e0 = new Vec3(),
	getNormalAt_e1 = new Vec3();
function barycentricWeights(e, t, s, i, o, n, r, a, l) {
	(l.x = ((n - a) * (e - r) + (r - o) * (t - a)) / ((n - a) * (s - r) + (r - o) * (i - a))), (l.y = ((a - i) * (e - r) + (s - r) * (t - a)) / ((n - a) * (s - r) + (r - o) * (i - a))), (l.z = 1 - l.x - l.y);
}
class OctreeNode {
	constructor(e) {
		void 0 === e && (e = {}), (this.root = e.root || null), (this.aabb = e.aabb ? e.aabb.clone() : new AABB()), (this.data = []), (this.children = []);
	}
	reset() {
		this.children.length = this.data.length = 0;
	}
	insert(e, t, s) {
		void 0 === s && (s = 0);
		const i = this.data;
		if (!this.aabb.contains(e)) return !1;
		const o = this.children;
		if (s < (this.maxDepth || this.root.maxDepth)) {
			let i = !1;
			o.length || (this.subdivide(), (i = !0));
			for (let i = 0; 8 !== i; i++) if (o[i].insert(e, t, s + 1)) return !0;
			i && (o.length = 0);
		}
		return i.push(t), !0;
	}
	subdivide() {
		const e = this.aabb,
			t = e.lowerBound,
			s = e.upperBound,
			i = this.children;
		i.push(
			new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(0, 0, 0) }) }),
			new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(1, 0, 0) }) }),
			new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(1, 1, 0) }) }),
			new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(1, 1, 1) }) }),
			new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(0, 1, 1) }) }),
			new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(0, 0, 1) }) }),
			new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(1, 0, 1) }) }),
			new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(0, 1, 0) }) })
		),
			s.vsub(t, halfDiagonal),
			halfDiagonal.scale(0.5, halfDiagonal);
		const o = this.root || this;
		for (let e = 0; 8 !== e; e++) {
			const s = i[e];
			s.root = o;
			const n = s.aabb.lowerBound;
			(n.x *= halfDiagonal.x), (n.y *= halfDiagonal.y), (n.z *= halfDiagonal.z), n.vadd(t, n), n.vadd(halfDiagonal, s.aabb.upperBound);
		}
	}
	aabbQuery(e, t) {
		this.data, this.children;
		const s = [this];
		for (; s.length; ) {
			const i = s.pop();
			i.aabb.overlaps(e) && Array.prototype.push.apply(t, i.data), Array.prototype.push.apply(s, i.children);
		}
		return t;
	}
	rayQuery(e, t, s) {
		return e.getAABB(tmpAABB), tmpAABB.toLocalFrame(t, tmpAABB), this.aabbQuery(tmpAABB, s), s;
	}
	removeEmptyNodes() {
		for (let e = this.children.length - 1; e >= 0; e--) this.children[e].removeEmptyNodes(), this.children[e].children.length || this.children[e].data.length || this.children.splice(e, 1);
	}
}
class Octree extends OctreeNode {
	constructor(e, t) {
		void 0 === t && (t = {}), super({ root: null, aabb: e }), (this.maxDepth = void 0 !== t.maxDepth ? t.maxDepth : 8);
	}
}
const halfDiagonal = new Vec3(),
	tmpAABB = new AABB();
class Trimesh extends Shape {
	constructor(e, t) {
		super({ type: Shape.types.TRIMESH }), (this.vertices = new Float32Array(e)), (this.indices = new Int16Array(t)), (this.normals = new Float32Array(t.length)), (this.aabb = new AABB()), (this.edges = null), (this.scale = new Vec3(1, 1, 1)), (this.tree = new Octree()), this.updateEdges(), this.updateNormals(), this.updateAABB(), this.updateBoundingSphereRadius(), this.updateTree();
	}
	updateTree() {
		const e = this.tree;
		e.reset(), e.aabb.copy(this.aabb);
		const t = this.scale;
		(e.aabb.lowerBound.x *= 1 / t.x), (e.aabb.lowerBound.y *= 1 / t.y), (e.aabb.lowerBound.z *= 1 / t.z), (e.aabb.upperBound.x *= 1 / t.x), (e.aabb.upperBound.y *= 1 / t.y), (e.aabb.upperBound.z *= 1 / t.z);
		const s = new AABB(),
			i = new Vec3(),
			o = new Vec3(),
			n = new Vec3(),
			r = [i, o, n];
		for (let t = 0; t < this.indices.length / 3; t++) {
			const a = 3 * t;
			this._getUnscaledVertex(this.indices[a], i), this._getUnscaledVertex(this.indices[a + 1], o), this._getUnscaledVertex(this.indices[a + 2], n), s.setFromPoints(r), e.insert(s, t);
		}
		e.removeEmptyNodes();
	}
	getTrianglesInAABB(e, t) {
		unscaledAABB.copy(e);
		const s = this.scale,
			i = s.x,
			o = s.y,
			n = s.z,
			r = unscaledAABB.lowerBound,
			a = unscaledAABB.upperBound;
		return (r.x /= i), (r.y /= o), (r.z /= n), (a.x /= i), (a.y /= o), (a.z /= n), this.tree.aabbQuery(unscaledAABB, t);
	}
	setScale(e) {
		const t = this.scale.x === this.scale.y && this.scale.y === this.scale.z,
			s = e.x === e.y && e.y === e.z;
		(t && s) || this.updateNormals(), this.scale.copy(e), this.updateAABB(), this.updateBoundingSphereRadius();
	}
	updateNormals() {
		const e = computeNormals_n,
			t = this.normals;
		for (let s = 0; s < this.indices.length / 3; s++) {
			const i = 3 * s,
				o = this.indices[i],
				n = this.indices[i + 1],
				r = this.indices[i + 2];
			this.getVertex(o, va), this.getVertex(n, vb), this.getVertex(r, vc), Trimesh.computeNormal(vb, va, vc, e), (t[i] = e.x), (t[i + 1] = e.y), (t[i + 2] = e.z);
		}
	}
	updateEdges() {
		const e = {},
			t = (t, s) => {
				e[t < s ? `${t}_${s}` : `${s}_${t}`] = !0;
			};
		for (let e = 0; e < this.indices.length / 3; e++) {
			const s = 3 * e,
				i = this.indices[s],
				o = this.indices[s + 1],
				n = this.indices[s + 2];
			t(i, o), t(o, n), t(n, i);
		}
		const s = Object.keys(e);
		this.edges = new Int16Array(2 * s.length);
		for (let e = 0; e < s.length; e++) {
			const t = s[e].split('_');
			(this.edges[2 * e] = parseInt(t[0], 10)), (this.edges[2 * e + 1] = parseInt(t[1], 10));
		}
	}
	getEdgeVertex(e, t, s) {
		const i = this.edges[2 * e + (t ? 1 : 0)];
		this.getVertex(i, s);
	}
	getEdgeVector(e, t) {
		const s = getEdgeVector_va,
			i = getEdgeVector_vb;
		this.getEdgeVertex(e, 0, s), this.getEdgeVertex(e, 1, i), i.vsub(s, t);
	}
	static computeNormal(e, t, s, i) {
		t.vsub(e, ab), s.vsub(t, cb), cb.cross(ab, i), i.isZero() || i.normalize();
	}
	getVertex(e, t) {
		const s = this.scale;
		return this._getUnscaledVertex(e, t), (t.x *= s.x), (t.y *= s.y), (t.z *= s.z), t;
	}
	_getUnscaledVertex(e, t) {
		const s = 3 * e,
			i = this.vertices;
		return t.set(i[s], i[s + 1], i[s + 2]);
	}
	getWorldVertex(e, t, s, i) {
		return this.getVertex(e, i), Transform.pointToWorldFrame(t, s, i, i), i;
	}
	getTriangleVertices(e, t, s, i) {
		const o = 3 * e;
		this.getVertex(this.indices[o], t), this.getVertex(this.indices[o + 1], s), this.getVertex(this.indices[o + 2], i);
	}
	getNormal(e, t) {
		const s = 3 * e;
		return t.set(this.normals[s], this.normals[s + 1], this.normals[s + 2]);
	}
	calculateLocalInertia(e, t) {
		this.computeLocalAABB(cli_aabb);
		const s = cli_aabb.upperBound.x - cli_aabb.lowerBound.x,
			i = cli_aabb.upperBound.y - cli_aabb.lowerBound.y,
			o = cli_aabb.upperBound.z - cli_aabb.lowerBound.z;
		return t.set((1 / 12) * e * (2 * i * 2 * i + 2 * o * 2 * o), (1 / 12) * e * (2 * s * 2 * s + 2 * o * 2 * o), (1 / 12) * e * (2 * i * 2 * i + 2 * s * 2 * s));
	}
	computeLocalAABB(e) {
		const t = e.lowerBound,
			s = e.upperBound,
			i = this.vertices.length;
		this.vertices;
		const o = computeLocalAABB_worldVert;
		this.getVertex(0, o), t.copy(o), s.copy(o);
		for (let e = 0; e !== i; e++) this.getVertex(e, o), o.x < t.x ? (t.x = o.x) : o.x > s.x && (s.x = o.x), o.y < t.y ? (t.y = o.y) : o.y > s.y && (s.y = o.y), o.z < t.z ? (t.z = o.z) : o.z > s.z && (s.z = o.z);
	}
	updateAABB() {
		this.computeLocalAABB(this.aabb);
	}
	updateBoundingSphereRadius() {
		let e = 0;
		const t = this.vertices,
			s = new Vec3();
		for (let i = 0, o = t.length / 3; i !== o; i++) {
			this.getVertex(i, s);
			const t = s.lengthSquared();
			t > e && (e = t);
		}
		this.boundingSphereRadius = Math.sqrt(e);
	}
	calculateWorldAABB(e, t, s, i) {
		const o = calculateWorldAABB_frame,
			n = calculateWorldAABB_aabb;
		(o.position = e), (o.quaternion = t), this.aabb.toWorldFrame(o, n), s.copy(n.lowerBound), i.copy(n.upperBound);
	}
	volume() {
		return (4 * Math.PI * this.boundingSphereRadius) / 3;
	}
	static createTorus(e, t, s, i, o) {
		void 0 === e && (e = 1), void 0 === t && (t = 0.5), void 0 === s && (s = 8), void 0 === i && (i = 6), void 0 === o && (o = 2 * Math.PI);
		const n = [],
			r = [];
		for (let r = 0; r <= s; r++)
			for (let a = 0; a <= i; a++) {
				const l = (a / i) * o,
					c = (r / s) * Math.PI * 2,
					h = (e + t * Math.cos(c)) * Math.cos(l),
					d = (e + t * Math.cos(c)) * Math.sin(l),
					p = t * Math.sin(c);
				n.push(h, d, p);
			}
		for (let e = 1; e <= s; e++)
			for (let t = 1; t <= i; t++) {
				const s = (i + 1) * e + t - 1,
					o = (i + 1) * (e - 1) + t - 1,
					n = (i + 1) * (e - 1) + t,
					a = (i + 1) * e + t;
				r.push(s, o, a), r.push(o, n, a);
			}
		return new Trimesh(n, r);
	}
}
const computeNormals_n = new Vec3(),
	unscaledAABB = new AABB(),
	getEdgeVector_va = new Vec3(),
	getEdgeVector_vb = new Vec3(),
	cb = new Vec3(),
	ab = new Vec3(),
	va = new Vec3(),
	vb = new Vec3(),
	vc = new Vec3(),
	cli_aabb = new AABB(),
	computeLocalAABB_worldVert = new Vec3(),
	calculateWorldAABB_frame = new Transform(),
	calculateWorldAABB_aabb = new AABB();
class Solver {
	constructor() {
		this.equations = [];
	}
	solve(e, t) {
		return 0;
	}
	addEquation(e) {
		!e.enabled || e.bi.isTrigger || e.bj.isTrigger || this.equations.push(e);
	}
	removeEquation(e) {
		const t = this.equations,
			s = t.indexOf(e);
		-1 !== s && t.splice(s, 1);
	}
	removeAllEquations() {
		this.equations.length = 0;
	}
}
class GSSolver extends Solver {
	constructor() {
		super(), (this.iterations = 10), (this.tolerance = 1e-7);
	}
	solve(e, t) {
		let s = 0;
		const i = this.iterations,
			o = this.tolerance * this.tolerance,
			n = this.equations,
			r = n.length,
			a = t.bodies,
			l = a.length,
			c = e;
		let h, d, p, u, m, v;
		if (0 !== r) for (let e = 0; e !== l; e++) a[e].updateSolveMassProperties();
		const y = GSSolver_solve_invCs,
			g = GSSolver_solve_Bs,
			x = GSSolver_solve_lambda;
		(y.length = r), (g.length = r), (x.length = r);
		for (let e = 0; e !== r; e++) {
			const t = n[e];
			(x[e] = 0), (g[e] = t.computeB(c)), (y[e] = 1 / t.computeC());
		}
		if (0 !== r) {
			for (let e = 0; e !== l; e++) {
				const t = a[e],
					s = t.vlambda,
					i = t.wlambda;
				s.set(0, 0, 0), i.set(0, 0, 0);
			}
			for (s = 0; s !== i; s++) {
				u = 0;
				for (let e = 0; e !== r; e++) {
					const t = n[e];
					(h = g[e]), (d = y[e]), (v = x[e]), (m = t.computeGWlambda()), (p = d * (h - m - t.eps * v)), v + p < t.minForce ? (p = t.minForce - v) : v + p > t.maxForce && (p = t.maxForce - v), (x[e] += p), (u += p > 0 ? p : -p), t.addToWlambda(p);
				}
				if (u * u < o) break;
			}
			for (let e = 0; e !== l; e++) {
				const t = a[e],
					s = t.velocity,
					i = t.angularVelocity;
				t.vlambda.vmul(t.linearFactor, t.vlambda), s.vadd(t.vlambda, s), t.wlambda.vmul(t.angularFactor, t.wlambda), i.vadd(t.wlambda, i);
			}
			let e = n.length;
			const t = 1 / c;
			for (; e--; ) n[e].multiplier = x[e] * t;
		}
		return s;
	}
}
const GSSolver_solve_lambda = [],
	GSSolver_solve_invCs = [],
	GSSolver_solve_Bs = [];
class SplitSolver extends Solver {
	constructor(e) {
		for (super(), this.iterations = 10, this.tolerance = 1e-7, this.subsolver = e, this.nodes = [], this.nodePool = []; this.nodePool.length < 128; ) this.nodePool.push(this.createNode());
	}
	createNode() {
		return { body: null, children: [], eqs: [], visited: !1 };
	}
	solve(e, t) {
		const s = SplitSolver_solve_nodes,
			i = this.nodePool,
			o = t.bodies,
			n = this.equations,
			r = n.length,
			a = o.length,
			l = this.subsolver;
		for (; i.length < a; ) i.push(this.createNode());
		s.length = a;
		for (let e = 0; e < a; e++) s[e] = i[e];
		for (let e = 0; e !== a; e++) {
			const t = s[e];
			(t.body = o[e]), (t.children.length = 0), (t.eqs.length = 0), (t.visited = !1);
		}
		for (let e = 0; e !== r; e++) {
			const t = n[e],
				i = o.indexOf(t.bi),
				r = o.indexOf(t.bj),
				a = s[i],
				l = s[r];
			a.children.push(l), a.eqs.push(t), l.children.push(a), l.eqs.push(t);
		}
		let c,
			h = 0,
			d = SplitSolver_solve_eqs;
		(l.tolerance = this.tolerance), (l.iterations = this.iterations);
		const p = SplitSolver_solve_dummyWorld;
		for (; (c = getUnvisitedNode(s)); ) {
			(d.length = 0), (p.bodies.length = 0), bfs(c, visitFunc, p.bodies, d);
			const t = d.length;
			d = d.sort(sortById);
			for (let e = 0; e !== t; e++) l.addEquation(d[e]);
			l.solve(e, p), l.removeAllEquations(), h++;
		}
		return h;
	}
}
const SplitSolver_solve_nodes = [],
	SplitSolver_solve_eqs = [],
	SplitSolver_solve_dummyWorld = { bodies: [] },
	STATIC = Body.STATIC;
function getUnvisitedNode(e) {
	const t = e.length;
	for (let s = 0; s !== t; s++) {
		const t = e[s];
		if (!(t.visited || t.body.type & STATIC)) return t;
	}
	return !1;
}
const queue = [];
function bfs(e, t, s, i) {
	for (queue.push(e), e.visited = !0, t(e, s, i); queue.length; ) {
		const e = queue.pop();
		let o;
		for (; (o = getUnvisitedNode(e.children)); ) (o.visited = !0), t(o, s, i), queue.push(o);
	}
}
function visitFunc(e, t, s) {
	t.push(e.body);
	const i = e.eqs.length;
	for (let t = 0; t !== i; t++) {
		const i = e.eqs[t];
		s.includes(i) || s.push(i);
	}
}
function sortById(e, t) {
	return t.id - e.id;
}
class Pool {
	constructor() {
		(this.objects = []), (this.type = Object);
	}
	release() {
		const e = arguments.length;
		for (let t = 0; t !== e; t++) this.objects.push(t < 0 || arguments.length <= t ? void 0 : arguments[t]);
		return this;
	}
	get() {
		return 0 === this.objects.length ? this.constructObject() : this.objects.pop();
	}
	constructObject() {
		throw new Error('constructObject() not implemented in this Pool subclass yet!');
	}
	resize(e) {
		const t = this.objects;
		for (; t.length > e; ) t.pop();
		for (; t.length < e; ) t.push(this.constructObject());
		return this;
	}
}
class Vec3Pool extends Pool {
	constructor() {
		super(...arguments), (this.type = Vec3);
	}
	constructObject() {
		return new Vec3();
	}
}
const COLLISION_TYPES = {
	sphereSphere: Shape.types.SPHERE,
	spherePlane: Shape.types.SPHERE | Shape.types.PLANE,
	boxBox: Shape.types.BOX | Shape.types.BOX,
	sphereBox: Shape.types.SPHERE | Shape.types.BOX,
	planeBox: Shape.types.PLANE | Shape.types.BOX,
	convexConvex: Shape.types.CONVEXPOLYHEDRON,
	sphereConvex: Shape.types.SPHERE | Shape.types.CONVEXPOLYHEDRON,
	planeConvex: Shape.types.PLANE | Shape.types.CONVEXPOLYHEDRON,
	boxConvex: Shape.types.BOX | Shape.types.CONVEXPOLYHEDRON,
	sphereHeightfield: Shape.types.SPHERE | Shape.types.HEIGHTFIELD,
	boxHeightfield: Shape.types.BOX | Shape.types.HEIGHTFIELD,
	convexHeightfield: Shape.types.CONVEXPOLYHEDRON | Shape.types.HEIGHTFIELD,
	sphereParticle: Shape.types.PARTICLE | Shape.types.SPHERE,
	planeParticle: Shape.types.PLANE | Shape.types.PARTICLE,
	boxParticle: Shape.types.BOX | Shape.types.PARTICLE,
	convexParticle: Shape.types.PARTICLE | Shape.types.CONVEXPOLYHEDRON,
	cylinderCylinder: Shape.types.CYLINDER,
	sphereCylinder: Shape.types.SPHERE | Shape.types.CYLINDER,
	planeCylinder: Shape.types.PLANE | Shape.types.CYLINDER,
	boxCylinder: Shape.types.BOX | Shape.types.CYLINDER,
	convexCylinder: Shape.types.CONVEXPOLYHEDRON | Shape.types.CYLINDER,
	heightfieldCylinder: Shape.types.HEIGHTFIELD | Shape.types.CYLINDER,
	particleCylinder: Shape.types.PARTICLE | Shape.types.CYLINDER,
	sphereTrimesh: Shape.types.SPHERE | Shape.types.TRIMESH,
	planeTrimesh: Shape.types.PLANE | Shape.types.TRIMESH,
};
class Narrowphase {
	get [COLLISION_TYPES.sphereSphere]() {
		return this.sphereSphere;
	}
	get [COLLISION_TYPES.spherePlane]() {
		return this.spherePlane;
	}
	get [COLLISION_TYPES.boxBox]() {
		return this.boxBox;
	}
	get [COLLISION_TYPES.sphereBox]() {
		return this.sphereBox;
	}
	get [COLLISION_TYPES.planeBox]() {
		return this.planeBox;
	}
	get [COLLISION_TYPES.convexConvex]() {
		return this.convexConvex;
	}
	get [COLLISION_TYPES.sphereConvex]() {
		return this.sphereConvex;
	}
	get [COLLISION_TYPES.planeConvex]() {
		return this.planeConvex;
	}
	get [COLLISION_TYPES.boxConvex]() {
		return this.boxConvex;
	}
	get [COLLISION_TYPES.sphereHeightfield]() {
		return this.sphereHeightfield;
	}
	get [COLLISION_TYPES.boxHeightfield]() {
		return this.boxHeightfield;
	}
	get [COLLISION_TYPES.convexHeightfield]() {
		return this.convexHeightfield;
	}
	get [COLLISION_TYPES.sphereParticle]() {
		return this.sphereParticle;
	}
	get [COLLISION_TYPES.planeParticle]() {
		return this.planeParticle;
	}
	get [COLLISION_TYPES.boxParticle]() {
		return this.boxParticle;
	}
	get [COLLISION_TYPES.convexParticle]() {
		return this.convexParticle;
	}
	get [COLLISION_TYPES.cylinderCylinder]() {
		return this.convexConvex;
	}
	get [COLLISION_TYPES.sphereCylinder]() {
		return this.sphereConvex;
	}
	get [COLLISION_TYPES.planeCylinder]() {
		return this.planeConvex;
	}
	get [COLLISION_TYPES.boxCylinder]() {
		return this.boxConvex;
	}
	get [COLLISION_TYPES.convexCylinder]() {
		return this.convexConvex;
	}
	get [COLLISION_TYPES.heightfieldCylinder]() {
		return this.heightfieldCylinder;
	}
	get [COLLISION_TYPES.particleCylinder]() {
		return this.particleCylinder;
	}
	get [COLLISION_TYPES.sphereTrimesh]() {
		return this.sphereTrimesh;
	}
	get [COLLISION_TYPES.planeTrimesh]() {
		return this.planeTrimesh;
	}
	constructor(e) {
		(this.contactPointPool = []), (this.frictionEquationPool = []), (this.result = []), (this.frictionResult = []), (this.v3pool = new Vec3Pool()), (this.world = e), (this.currentContactMaterial = e.defaultContactMaterial), (this.enableFrictionReduction = !1);
	}
	createContactEquation(e, t, s, i, o, n) {
		let r;
		this.contactPointPool.length ? ((r = this.contactPointPool.pop()), (r.bi = e), (r.bj = t)) : (r = new ContactEquation(e, t)), (r.enabled = e.collisionResponse && t.collisionResponse && s.collisionResponse && i.collisionResponse);
		const a = this.currentContactMaterial;
		(r.restitution = a.restitution), r.setSpookParams(a.contactEquationStiffness, a.contactEquationRelaxation, this.world.dt);
		const l = s.material || e.material,
			c = i.material || t.material;
		return l && c && l.restitution >= 0 && c.restitution >= 0 && (r.restitution = l.restitution * c.restitution), (r.si = o || s), (r.sj = n || i), r;
	}
	createFrictionEquationsFromContact(e, t) {
		const s = e.bi,
			i = e.bj,
			o = e.si,
			n = e.sj,
			r = this.world,
			a = this.currentContactMaterial;
		let l = a.friction;
		const c = o.material || s.material,
			h = n.material || i.material;
		if ((c && h && c.friction >= 0 && h.friction >= 0 && (l = c.friction * h.friction), l > 0)) {
			const o = l * (r.frictionGravity || r.gravity).length();
			let n = s.invMass + i.invMass;
			n > 0 && (n = 1 / n);
			const c = this.frictionEquationPool,
				h = c.length ? c.pop() : new FrictionEquation(s, i, o * n),
				d = c.length ? c.pop() : new FrictionEquation(s, i, o * n);
			return (h.bi = d.bi = s), (h.bj = d.bj = i), (h.minForce = d.minForce = -o * n), (h.maxForce = d.maxForce = o * n), h.ri.copy(e.ri), h.rj.copy(e.rj), d.ri.copy(e.ri), d.rj.copy(e.rj), e.ni.tangents(h.t, d.t), h.setSpookParams(a.frictionEquationStiffness, a.frictionEquationRelaxation, r.dt), d.setSpookParams(a.frictionEquationStiffness, a.frictionEquationRelaxation, r.dt), (h.enabled = d.enabled = e.enabled), t.push(h, d), !0;
		}
		return !1;
	}
	createFrictionFromAverage(e) {
		let t = this.result[this.result.length - 1];
		if (!this.createFrictionEquationsFromContact(t, this.frictionResult) || 1 === e) return;
		const s = this.frictionResult[this.frictionResult.length - 2],
			i = this.frictionResult[this.frictionResult.length - 1];
		averageNormal.setZero(), averageContactPointA.setZero(), averageContactPointB.setZero();
		const o = t.bi;
		t.bj;
		for (let s = 0; s !== e; s++) (t = this.result[this.result.length - 1 - s]), t.bi !== o ? (averageNormal.vadd(t.ni, averageNormal), averageContactPointA.vadd(t.ri, averageContactPointA), averageContactPointB.vadd(t.rj, averageContactPointB)) : (averageNormal.vsub(t.ni, averageNormal), averageContactPointA.vadd(t.rj, averageContactPointA), averageContactPointB.vadd(t.ri, averageContactPointB));
		const n = 1 / e;
		averageContactPointA.scale(n, s.ri), averageContactPointB.scale(n, s.rj), i.ri.copy(s.ri), i.rj.copy(s.rj), averageNormal.normalize(), averageNormal.tangents(s.t, i.t);
	}
	getContacts(e, t, s, i, o, n, r) {
		(this.contactPointPool = o), (this.frictionEquationPool = r), (this.result = i), (this.frictionResult = n);
		const a = tmpQuat1,
			l = tmpQuat2,
			c = tmpVec1,
			h = tmpVec2;
		for (let i = 0, o = e.length; i !== o; i++) {
			const o = e[i],
				n = t[i];
			let r = null;
			o.material && n.material && (r = s.getContactMaterial(o.material, n.material) || null);
			const d = (o.type & Body.KINEMATIC && n.type & Body.STATIC) || (o.type & Body.STATIC && n.type & Body.KINEMATIC) || (o.type & Body.KINEMATIC && n.type & Body.KINEMATIC);
			for (let e = 0; e < o.shapes.length; e++) {
				o.quaternion.mult(o.shapeOrientations[e], a), o.quaternion.vmult(o.shapeOffsets[e], c), c.vadd(o.position, c);
				const t = o.shapes[e];
				for (let e = 0; e < n.shapes.length; e++) {
					n.quaternion.mult(n.shapeOrientations[e], l), n.quaternion.vmult(n.shapeOffsets[e], h), h.vadd(n.position, h);
					const i = n.shapes[e];
					if (!(t.collisionFilterMask & i.collisionFilterGroup && i.collisionFilterMask & t.collisionFilterGroup)) continue;
					if (c.distanceTo(h) > t.boundingSphereRadius + i.boundingSphereRadius) continue;
					let p = null;
					t.material && i.material && (p = s.getContactMaterial(t.material, i.material) || null), (this.currentContactMaterial = p || r || s.defaultContactMaterial);
					const u = this[t.type | i.type];
					if (u) {
						let e = !1;
						(e = t.type < i.type ? u.call(this, t, i, c, h, a, l, o, n, t, i, d) : u.call(this, i, t, h, c, l, a, n, o, t, i, d)), e && d && (s.shapeOverlapKeeper.set(t.id, i.id), s.bodyOverlapKeeper.set(o.id, n.id));
					}
				}
			}
		}
	}
	sphereSphere(e, t, s, i, o, n, r, a, l, c, h) {
		if (h) return s.distanceSquared(i) < (e.radius + t.radius) ** 2;
		const d = this.createContactEquation(r, a, e, t, l, c);
		i.vsub(s, d.ni), d.ni.normalize(), d.ri.copy(d.ni), d.rj.copy(d.ni), d.ri.scale(e.radius, d.ri), d.rj.scale(-t.radius, d.rj), d.ri.vadd(s, d.ri), d.ri.vsub(r.position, d.ri), d.rj.vadd(i, d.rj), d.rj.vsub(a.position, d.rj), this.result.push(d), this.createFrictionEquationsFromContact(d, this.frictionResult);
	}
	spherePlane(e, t, s, i, o, n, r, a, l, c, h) {
		const d = this.createContactEquation(r, a, e, t, l, c);
		if ((d.ni.set(0, 0, 1), n.vmult(d.ni, d.ni), d.ni.negate(d.ni), d.ni.normalize(), d.ni.scale(e.radius, d.ri), s.vsub(i, point_on_plane_to_sphere), d.ni.scale(d.ni.dot(point_on_plane_to_sphere), plane_to_sphere_ortho), point_on_plane_to_sphere.vsub(plane_to_sphere_ortho, d.rj), -point_on_plane_to_sphere.dot(d.ni) <= e.radius)) {
			if (h) return !0;
			const e = d.ri,
				t = d.rj;
			e.vadd(s, e), e.vsub(r.position, e), t.vadd(i, t), t.vsub(a.position, t), this.result.push(d), this.createFrictionEquationsFromContact(d, this.frictionResult);
		}
	}
	boxBox(e, t, s, i, o, n, r, a, l, c, h) {
		return (e.convexPolyhedronRepresentation.material = e.material), (t.convexPolyhedronRepresentation.material = t.material), (e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse), (t.convexPolyhedronRepresentation.collisionResponse = t.collisionResponse), this.convexConvex(e.convexPolyhedronRepresentation, t.convexPolyhedronRepresentation, s, i, o, n, r, a, e, t, h);
	}
	sphereBox(e, t, s, i, o, n, r, a, l, c, h) {
		const d = this.v3pool,
			p = sphereBox_sides;
		s.vsub(i, box_to_sphere), t.getSideNormals(p, n);
		const u = e.radius;
		let m = !1;
		const v = sphereBox_side_ns,
			y = sphereBox_side_ns1,
			g = sphereBox_side_ns2;
		let x = null,
			f = 0,
			w = 0,
			b = 0,
			_ = null;
		for (let e = 0, t = p.length; e !== t && !1 === m; e++) {
			const t = sphereBox_ns;
			t.copy(p[e]);
			const s = t.length();
			t.normalize();
			const i = box_to_sphere.dot(t);
			if (i < s + u && i > 0) {
				const o = sphereBox_ns1,
					n = sphereBox_ns2;
				o.copy(p[(e + 1) % 3]), n.copy(p[(e + 2) % 3]);
				const r = o.length(),
					a = n.length();
				o.normalize(), n.normalize();
				const l = box_to_sphere.dot(o),
					c = box_to_sphere.dot(n);
				if (l < r && l > -r && c < a && c > -a) {
					const e = Math.abs(i - s - u);
					if ((null === _ || e < _) && ((_ = e), (w = l), (b = c), (x = s), v.copy(t), y.copy(o), g.copy(n), f++, h)) return !0;
				}
			}
		}
		if (f) {
			m = !0;
			const o = this.createContactEquation(r, a, e, t, l, c);
			v.scale(-u, o.ri), o.ni.copy(v), o.ni.negate(o.ni), v.scale(x, v), y.scale(w, y), v.vadd(y, v), g.scale(b, g), v.vadd(g, o.rj), o.ri.vadd(s, o.ri), o.ri.vsub(r.position, o.ri), o.rj.vadd(i, o.rj), o.rj.vsub(a.position, o.rj), this.result.push(o), this.createFrictionEquationsFromContact(o, this.frictionResult);
		}
		let B = d.get();
		const S = sphereBox_sphere_to_corner;
		for (let o = 0; 2 !== o && !m; o++)
			for (let n = 0; 2 !== n && !m; n++)
				for (let d = 0; 2 !== d && !m; d++)
					if ((B.set(0, 0, 0), o ? B.vadd(p[0], B) : B.vsub(p[0], B), n ? B.vadd(p[1], B) : B.vsub(p[1], B), d ? B.vadd(p[2], B) : B.vsub(p[2], B), i.vadd(B, S), S.vsub(s, S), S.lengthSquared() < u * u)) {
						if (h) return !0;
						m = !0;
						const o = this.createContactEquation(r, a, e, t, l, c);
						o.ri.copy(S), o.ri.normalize(), o.ni.copy(o.ri), o.ri.scale(u, o.ri), o.rj.copy(B), o.ri.vadd(s, o.ri), o.ri.vsub(r.position, o.ri), o.rj.vadd(i, o.rj), o.rj.vsub(a.position, o.rj), this.result.push(o), this.createFrictionEquationsFromContact(o, this.frictionResult);
					}
		d.release(B), (B = null);
		const V = d.get(),
			A = d.get(),
			E = d.get(),
			C = d.get(),
			T = d.get(),
			P = p.length;
		for (let o = 0; o !== P && !m; o++)
			for (let n = 0; n !== P && !m; n++)
				if (o % 3 != n % 3) {
					p[n].cross(p[o], V), V.normalize(), p[o].vadd(p[n], A), E.copy(s), E.vsub(A, E), E.vsub(i, E);
					const d = E.dot(V);
					V.scale(d, C);
					let v = 0;
					for (; v === o % 3 || v === n % 3; ) v++;
					T.copy(s), T.vsub(C, T), T.vsub(A, T), T.vsub(i, T);
					const y = Math.abs(d),
						g = T.length();
					if (y < p[v].length() && g < u) {
						if (h) return !0;
						m = !0;
						const o = this.createContactEquation(r, a, e, t, l, c);
						A.vadd(C, o.rj), o.rj.copy(o.rj), T.negate(o.ni), o.ni.normalize(), o.ri.copy(o.rj), o.ri.vadd(i, o.ri), o.ri.vsub(s, o.ri), o.ri.normalize(), o.ri.scale(u, o.ri), o.ri.vadd(s, o.ri), o.ri.vsub(r.position, o.ri), o.rj.vadd(i, o.rj), o.rj.vsub(a.position, o.rj), this.result.push(o), this.createFrictionEquationsFromContact(o, this.frictionResult);
					}
				}
		d.release(V, A, E, C, T);
	}
	planeBox(e, t, s, i, o, n, r, a, l, c, h) {
		return (t.convexPolyhedronRepresentation.material = t.material), (t.convexPolyhedronRepresentation.collisionResponse = t.collisionResponse), (t.convexPolyhedronRepresentation.id = t.id), this.planeConvex(e, t.convexPolyhedronRepresentation, s, i, o, n, r, a, e, t, h);
	}
	convexConvex(e, t, s, i, o, n, r, a, l, c, h, d, p) {
		const u = convexConvex_sepAxis;
		if (!(s.distanceTo(i) > e.boundingSphereRadius + t.boundingSphereRadius) && e.findSeparatingAxis(t, s, o, i, n, u, d, p)) {
			const d = [],
				p = convexConvex_q;
			e.clipAgainstHull(s, o, t, i, n, u, -100, 100, d);
			let m = 0;
			for (let o = 0; o !== d.length; o++) {
				if (h) return !0;
				const n = this.createContactEquation(r, a, e, t, l, c),
					v = n.ri,
					y = n.rj;
				u.negate(n.ni), d[o].normal.negate(p), p.scale(d[o].depth, p), d[o].point.vadd(p, v), y.copy(d[o].point), v.vsub(s, v), y.vsub(i, y), v.vadd(s, v), v.vsub(r.position, v), y.vadd(i, y), y.vsub(a.position, y), this.result.push(n), m++, this.enableFrictionReduction || this.createFrictionEquationsFromContact(n, this.frictionResult);
			}
			this.enableFrictionReduction && m && this.createFrictionFromAverage(m);
		}
	}
	sphereConvex(e, t, s, i, o, n, r, a, l, c, h) {
		const d = this.v3pool;
		s.vsub(i, convex_to_sphere);
		const p = t.faceNormals,
			u = t.faces,
			m = t.vertices,
			v = e.radius;
		let y = !1;
		for (let o = 0; o !== m.length; o++) {
			const d = m[o],
				p = sphereConvex_worldCorner;
			n.vmult(d, p), i.vadd(p, p);
			const u = sphereConvex_sphereToCorner;
			if ((p.vsub(s, u), u.lengthSquared() < v * v)) {
				if (h) return !0;
				y = !0;
				const o = this.createContactEquation(r, a, e, t, l, c);
				return o.ri.copy(u), o.ri.normalize(), o.ni.copy(o.ri), o.ri.scale(v, o.ri), p.vsub(i, o.rj), o.ri.vadd(s, o.ri), o.ri.vsub(r.position, o.ri), o.rj.vadd(i, o.rj), o.rj.vsub(a.position, o.rj), this.result.push(o), void this.createFrictionEquationsFromContact(o, this.frictionResult);
			}
		}
		for (let o = 0, g = u.length; o !== g && !1 === y; o++) {
			const g = p[o],
				x = u[o],
				f = sphereConvex_worldNormal;
			n.vmult(g, f);
			const w = sphereConvex_worldPoint;
			n.vmult(m[x[0]], w), w.vadd(i, w);
			const b = sphereConvex_worldSpherePointClosestToPlane;
			f.scale(-v, b), s.vadd(b, b);
			const _ = sphereConvex_penetrationVec;
			b.vsub(w, _);
			const B = _.dot(f),
				S = sphereConvex_sphereToWorldPoint;
			if ((s.vsub(w, S), B < 0 && S.dot(f) > 0)) {
				const o = [];
				for (let e = 0, t = x.length; e !== t; e++) {
					const t = d.get();
					n.vmult(m[x[e]], t), i.vadd(t, t), o.push(t);
				}
				if (pointInPolygon(o, f, s)) {
					if (h) return !0;
					y = !0;
					const n = this.createContactEquation(r, a, e, t, l, c);
					f.scale(-v, n.ri), f.negate(n.ni);
					const p = d.get();
					f.scale(-B, p);
					const u = d.get();
					f.scale(-v, u), s.vsub(i, n.rj), n.rj.vadd(u, n.rj), n.rj.vadd(p, n.rj), n.rj.vadd(i, n.rj), n.rj.vsub(a.position, n.rj), n.ri.vadd(s, n.ri), n.ri.vsub(r.position, n.ri), d.release(p), d.release(u), this.result.push(n), this.createFrictionEquationsFromContact(n, this.frictionResult);
					for (let e = 0, t = o.length; e !== t; e++) d.release(o[e]);
					return;
				}
				for (let p = 0; p !== x.length; p++) {
					const u = d.get(),
						y = d.get();
					n.vmult(m[x[(p + 1) % x.length]], u), n.vmult(m[x[(p + 2) % x.length]], y), i.vadd(u, u), i.vadd(y, y);
					const g = sphereConvex_edge;
					y.vsub(u, g);
					const f = sphereConvex_edgeUnit;
					g.unit(f);
					const w = d.get(),
						b = d.get();
					s.vsub(u, b);
					const _ = b.dot(f);
					f.scale(_, w), w.vadd(u, w);
					const B = d.get();
					if ((w.vsub(s, B), _ > 0 && _ * _ < g.lengthSquared() && B.lengthSquared() < v * v)) {
						if (h) return !0;
						const n = this.createContactEquation(r, a, e, t, l, c);
						w.vsub(i, n.rj), w.vsub(s, n.ni), n.ni.normalize(), n.ni.scale(v, n.ri), n.rj.vadd(i, n.rj), n.rj.vsub(a.position, n.rj), n.ri.vadd(s, n.ri), n.ri.vsub(r.position, n.ri), this.result.push(n), this.createFrictionEquationsFromContact(n, this.frictionResult);
						for (let e = 0, t = o.length; e !== t; e++) d.release(o[e]);
						return d.release(u), d.release(y), d.release(w), d.release(B), void d.release(b);
					}
					d.release(u), d.release(y), d.release(w), d.release(B), d.release(b);
				}
				for (let e = 0, t = o.length; e !== t; e++) d.release(o[e]);
			}
		}
	}
	planeConvex(e, t, s, i, o, n, r, a, l, c, h) {
		const d = planeConvex_v,
			p = planeConvex_normal;
		p.set(0, 0, 1), o.vmult(p, p);
		let u = 0;
		const m = planeConvex_relpos;
		for (let o = 0; o !== t.vertices.length; o++) {
			d.copy(t.vertices[o]), n.vmult(d, d), i.vadd(d, d), d.vsub(s, m);
			if (p.dot(m) <= 0) {
				if (h) return !0;
				const o = this.createContactEquation(r, a, e, t, l, c),
					n = planeConvex_projected;
				p.scale(p.dot(m), n), d.vsub(n, n), n.vsub(s, o.ri), o.ni.copy(p), d.vsub(i, o.rj), o.ri.vadd(s, o.ri), o.ri.vsub(r.position, o.ri), o.rj.vadd(i, o.rj), o.rj.vsub(a.position, o.rj), this.result.push(o), u++, this.enableFrictionReduction || this.createFrictionEquationsFromContact(o, this.frictionResult);
			}
		}
		this.enableFrictionReduction && u && this.createFrictionFromAverage(u);
	}
	boxConvex(e, t, s, i, o, n, r, a, l, c, h) {
		return (e.convexPolyhedronRepresentation.material = e.material), (e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse), this.convexConvex(e.convexPolyhedronRepresentation, t, s, i, o, n, r, a, e, t, h);
	}
	sphereHeightfield(e, t, s, i, o, n, r, a, l, c, h) {
		const d = t.data,
			p = e.radius,
			u = t.elementSize,
			m = sphereHeightfield_tmp2,
			v = sphereHeightfield_tmp1;
		Transform.pointToLocalFrame(i, n, s, v);
		let y = Math.floor((v.x - p) / u) - 1,
			g = Math.ceil((v.x + p) / u) + 1,
			x = Math.floor((v.y - p) / u) - 1,
			f = Math.ceil((v.y + p) / u) + 1;
		if (g < 0 || f < 0 || y > d.length || x > d[0].length) return;
		y < 0 && (y = 0), g < 0 && (g = 0), x < 0 && (x = 0), f < 0 && (f = 0), y >= d.length && (y = d.length - 1), g >= d.length && (g = d.length - 1), f >= d[0].length && (f = d[0].length - 1), x >= d[0].length && (x = d[0].length - 1);
		const w = [];
		t.getRectMinMax(y, x, g, f, w);
		const b = w[0],
			_ = w[1];
		if (v.z - p > _ || v.z + p < b) return;
		const B = this.result;
		for (let l = y; l < g; l++)
			for (let c = x; c < f; c++) {
				const d = B.length;
				let p = !1;
				if ((t.getConvexTrianglePillar(l, c, !1), Transform.pointToWorldFrame(i, n, t.pillarOffset, m), s.distanceTo(m) < t.pillarConvex.boundingSphereRadius + e.boundingSphereRadius && (p = this.sphereConvex(e, t.pillarConvex, s, m, o, n, r, a, e, t, h)), h && p)) return !0;
				if ((t.getConvexTrianglePillar(l, c, !0), Transform.pointToWorldFrame(i, n, t.pillarOffset, m), s.distanceTo(m) < t.pillarConvex.boundingSphereRadius + e.boundingSphereRadius && (p = this.sphereConvex(e, t.pillarConvex, s, m, o, n, r, a, e, t, h)), h && p)) return !0;
				if (B.length - d > 2) return;
			}
	}
	boxHeightfield(e, t, s, i, o, n, r, a, l, c, h) {
		return (e.convexPolyhedronRepresentation.material = e.material), (e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse), this.convexHeightfield(e.convexPolyhedronRepresentation, t, s, i, o, n, r, a, e, t, h);
	}
	convexHeightfield(e, t, s, i, o, n, r, a, l, c, h) {
		const d = t.data,
			p = t.elementSize,
			u = e.boundingSphereRadius,
			m = convexHeightfield_tmp2,
			v = convexHeightfield_faceList,
			y = convexHeightfield_tmp1;
		Transform.pointToLocalFrame(i, n, s, y);
		let g = Math.floor((y.x - u) / p) - 1,
			x = Math.ceil((y.x + u) / p) + 1,
			f = Math.floor((y.y - u) / p) - 1,
			w = Math.ceil((y.y + u) / p) + 1;
		if (x < 0 || w < 0 || g > d.length || f > d[0].length) return;
		g < 0 && (g = 0), x < 0 && (x = 0), f < 0 && (f = 0), w < 0 && (w = 0), g >= d.length && (g = d.length - 1), x >= d.length && (x = d.length - 1), w >= d[0].length && (w = d[0].length - 1), f >= d[0].length && (f = d[0].length - 1);
		const b = [];
		t.getRectMinMax(g, f, x, w, b);
		const _ = b[0],
			B = b[1];
		if (!(y.z - u > B || y.z + u < _))
			for (let l = g; l < x; l++)
				for (let c = f; c < w; c++) {
					let d = !1;
					if ((t.getConvexTrianglePillar(l, c, !1), Transform.pointToWorldFrame(i, n, t.pillarOffset, m), s.distanceTo(m) < t.pillarConvex.boundingSphereRadius + e.boundingSphereRadius && (d = this.convexConvex(e, t.pillarConvex, s, m, o, n, r, a, null, null, h, v, null)), h && d)) return !0;
					if ((t.getConvexTrianglePillar(l, c, !0), Transform.pointToWorldFrame(i, n, t.pillarOffset, m), s.distanceTo(m) < t.pillarConvex.boundingSphereRadius + e.boundingSphereRadius && (d = this.convexConvex(e, t.pillarConvex, s, m, o, n, r, a, null, null, h, v, null)), h && d)) return !0;
				}
	}
	sphereParticle(e, t, s, i, o, n, r, a, l, c, h) {
		const d = particleSphere_normal;
		d.set(0, 0, 1), i.vsub(s, d);
		if (d.lengthSquared() <= e.radius * e.radius) {
			if (h) return !0;
			const s = this.createContactEquation(a, r, t, e, l, c);
			d.normalize(), s.rj.copy(d), s.rj.scale(e.radius, s.rj), s.ni.copy(d), s.ni.negate(s.ni), s.ri.set(0, 0, 0), this.result.push(s), this.createFrictionEquationsFromContact(s, this.frictionResult);
		}
	}
	planeParticle(e, t, s, i, o, n, r, a, l, c, h) {
		const d = particlePlane_normal;
		d.set(0, 0, 1), r.quaternion.vmult(d, d);
		const p = particlePlane_relpos;
		i.vsub(r.position, p);
		if (d.dot(p) <= 0) {
			if (h) return !0;
			const s = this.createContactEquation(a, r, t, e, l, c);
			s.ni.copy(d), s.ni.negate(s.ni), s.ri.set(0, 0, 0);
			const o = particlePlane_projected;
			d.scale(d.dot(i), o), i.vsub(o, o), s.rj.copy(o), this.result.push(s), this.createFrictionEquationsFromContact(s, this.frictionResult);
		}
	}
	boxParticle(e, t, s, i, o, n, r, a, l, c, h) {
		return (e.convexPolyhedronRepresentation.material = e.material), (e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse), this.convexParticle(e.convexPolyhedronRepresentation, t, s, i, o, n, r, a, e, t, h);
	}
	convexParticle(e, t, s, i, o, n, r, a, l, c, h) {
		let d = -1;
		const p = convexParticle_penetratedFaceNormal,
			u = convexParticle_worldPenetrationVec;
		let m = null;
		const v = convexParticle_local;
		if ((v.copy(i), v.vsub(s, v), o.conjugate(cqj), cqj.vmult(v, v), e.pointIsInside(v))) {
			e.worldVerticesNeedsUpdate && e.computeWorldVertices(s, o), e.worldFaceNormalsNeedsUpdate && e.computeWorldFaceNormals(o);
			for (let t = 0, s = e.faces.length; t !== s; t++) {
				const s = [e.worldVertices[e.faces[t][0]]],
					o = e.worldFaceNormals[t];
				i.vsub(s[0], convexParticle_vertexToParticle);
				const n = -o.dot(convexParticle_vertexToParticle);
				if (null === m || Math.abs(n) < Math.abs(m)) {
					if (h) return !0;
					(m = n), (d = t), p.copy(o);
				}
			}
			if (-1 !== d) {
				const o = this.createContactEquation(a, r, t, e, l, c);
				p.scale(m, u), u.vadd(i, u), u.vsub(s, u), o.rj.copy(u), p.negate(o.ni), o.ri.set(0, 0, 0);
				const n = o.ri,
					h = o.rj;
				n.vadd(i, n), n.vsub(a.position, n), h.vadd(s, h), h.vsub(r.position, h), this.result.push(o), this.createFrictionEquationsFromContact(o, this.frictionResult);
			} else console.warn('Point found inside convex, but did not find penetrating face!');
		}
	}
	heightfieldCylinder(e, t, s, i, o, n, r, a, l, c, h) {
		return this.convexHeightfield(t, e, i, s, n, o, a, r, l, c, h);
	}
	particleCylinder(e, t, s, i, o, n, r, a, l, c, h) {
		return this.convexParticle(t, e, i, s, n, o, a, r, l, c, h);
	}
	sphereTrimesh(e, t, s, i, o, n, r, a, l, c, h) {
		const d = sphereTrimesh_edgeVertexA,
			p = sphereTrimesh_edgeVertexB,
			u = sphereTrimesh_edgeVector,
			m = sphereTrimesh_edgeVectorUnit,
			v = sphereTrimesh_localSpherePos,
			y = sphereTrimesh_tmp,
			g = sphereTrimesh_localSphereAABB,
			x = sphereTrimesh_v2,
			f = sphereTrimesh_relpos,
			w = sphereTrimesh_triangles;
		Transform.pointToLocalFrame(i, n, s, v);
		const b = e.radius;
		g.lowerBound.set(v.x - b, v.y - b, v.z - b), g.upperBound.set(v.x + b, v.y + b, v.z + b), t.getTrianglesInAABB(g, w);
		const _ = sphereTrimesh_v,
			B = e.radius * e.radius;
		for (let o = 0; o < w.length; o++)
			for (let d = 0; d < 3; d++)
				if ((t.getVertex(t.indices[3 * w[o] + d], _), _.vsub(v, f), f.lengthSquared() <= B)) {
					if ((x.copy(_), Transform.pointToWorldFrame(i, n, x, _), _.vsub(s, f), h)) return !0;
					let o = this.createContactEquation(r, a, e, t, l, c);
					o.ni.copy(f), o.ni.normalize(), o.ri.copy(o.ni), o.ri.scale(e.radius, o.ri), o.ri.vadd(s, o.ri), o.ri.vsub(r.position, o.ri), o.rj.copy(_), o.rj.vsub(a.position, o.rj), this.result.push(o), this.createFrictionEquationsFromContact(o, this.frictionResult);
				}
		for (let o = 0; o < w.length; o++)
			for (let g = 0; g < 3; g++) {
				t.getVertex(t.indices[3 * w[o] + g], d), t.getVertex(t.indices[3 * w[o] + ((g + 1) % 3)], p), p.vsub(d, u), v.vsub(p, y);
				const x = y.dot(u);
				v.vsub(d, y);
				let f = y.dot(u);
				if (f > 0 && x < 0) {
					v.vsub(d, y), m.copy(u), m.normalize(), (f = y.dot(m)), m.scale(f, y), y.vadd(d, y);
					if (y.distanceTo(v) < e.radius) {
						if (h) return !0;
						const o = this.createContactEquation(r, a, e, t, l, c);
						y.vsub(v, o.ni), o.ni.normalize(), o.ni.scale(e.radius, o.ri), o.ri.vadd(s, o.ri), o.ri.vsub(r.position, o.ri), Transform.pointToWorldFrame(i, n, y, y), y.vsub(a.position, o.rj), Transform.vectorToWorldFrame(n, o.ni, o.ni), Transform.vectorToWorldFrame(n, o.ri, o.ri), this.result.push(o), this.createFrictionEquationsFromContact(o, this.frictionResult);
					}
				}
			}
		const S = sphereTrimesh_va,
			V = sphereTrimesh_vb,
			A = sphereTrimesh_vc,
			E = sphereTrimesh_normal;
		for (let o = 0, d = w.length; o !== d; o++) {
			t.getTriangleVertices(w[o], S, V, A), t.getNormal(w[o], E), v.vsub(S, y);
			let d = y.dot(E);
			if ((E.scale(d, y), v.vsub(y, y), (d = y.distanceTo(v)), Ray.pointInTriangle(y, S, V, A) && d < e.radius)) {
				if (h) return !0;
				let o = this.createContactEquation(r, a, e, t, l, c);
				y.vsub(v, o.ni), o.ni.normalize(), o.ni.scale(e.radius, o.ri), o.ri.vadd(s, o.ri), o.ri.vsub(r.position, o.ri), Transform.pointToWorldFrame(i, n, y, y), y.vsub(a.position, o.rj), Transform.vectorToWorldFrame(n, o.ni, o.ni), Transform.vectorToWorldFrame(n, o.ri, o.ri), this.result.push(o), this.createFrictionEquationsFromContact(o, this.frictionResult);
			}
		}
		w.length = 0;
	}
	planeTrimesh(e, t, s, i, o, n, r, a, l, c, h) {
		const d = new Vec3(),
			p = planeTrimesh_normal;
		p.set(0, 0, 1), o.vmult(p, p);
		for (let o = 0; o < t.vertices.length / 3; o++) {
			t.getVertex(o, d);
			const u = new Vec3();
			u.copy(d), Transform.pointToWorldFrame(i, n, u, d);
			const m = planeTrimesh_relpos;
			d.vsub(s, m);
			if (p.dot(m) <= 0) {
				if (h) return !0;
				const s = this.createContactEquation(r, a, e, t, l, c);
				s.ni.copy(p);
				const i = planeTrimesh_projected;
				p.scale(m.dot(p), i), d.vsub(i, i), s.ri.copy(i), s.ri.vsub(r.position, s.ri), s.rj.copy(d), s.rj.vsub(a.position, s.rj), this.result.push(s), this.createFrictionEquationsFromContact(s, this.frictionResult);
			}
		}
	}
}
const averageNormal = new Vec3(),
	averageContactPointA = new Vec3(),
	averageContactPointB = new Vec3(),
	tmpVec1 = new Vec3(),
	tmpVec2 = new Vec3(),
	tmpQuat1 = new Quaternion(),
	tmpQuat2 = new Quaternion(),
	planeTrimesh_normal = new Vec3(),
	planeTrimesh_relpos = new Vec3(),
	planeTrimesh_projected = new Vec3(),
	sphereTrimesh_normal = new Vec3(),
	sphereTrimesh_relpos = new Vec3();
new Vec3();
const sphereTrimesh_v = new Vec3(),
	sphereTrimesh_v2 = new Vec3(),
	sphereTrimesh_edgeVertexA = new Vec3(),
	sphereTrimesh_edgeVertexB = new Vec3(),
	sphereTrimesh_edgeVector = new Vec3(),
	sphereTrimesh_edgeVectorUnit = new Vec3(),
	sphereTrimesh_localSpherePos = new Vec3(),
	sphereTrimesh_tmp = new Vec3(),
	sphereTrimesh_va = new Vec3(),
	sphereTrimesh_vb = new Vec3(),
	sphereTrimesh_vc = new Vec3(),
	sphereTrimesh_localSphereAABB = new AABB(),
	sphereTrimesh_triangles = [],
	point_on_plane_to_sphere = new Vec3(),
	plane_to_sphere_ortho = new Vec3(),
	pointInPolygon_edge = new Vec3(),
	pointInPolygon_edge_x_normal = new Vec3(),
	pointInPolygon_vtp = new Vec3();
function pointInPolygon(e, t, s) {
	let i = null;
	const o = e.length;
	for (let n = 0; n !== o; n++) {
		const r = e[n],
			a = pointInPolygon_edge;
		e[(n + 1) % o].vsub(r, a);
		const l = pointInPolygon_edge_x_normal;
		a.cross(t, l);
		const c = pointInPolygon_vtp;
		s.vsub(r, c);
		const h = l.dot(c);
		if (!(null === i || (h > 0 && !0 === i) || (h <= 0 && !1 === i))) return !1;
		null === i && (i = h > 0);
	}
	return !0;
}
const box_to_sphere = new Vec3(),
	sphereBox_ns = new Vec3(),
	sphereBox_ns1 = new Vec3(),
	sphereBox_ns2 = new Vec3(),
	sphereBox_sides = [new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3()],
	sphereBox_sphere_to_corner = new Vec3(),
	sphereBox_side_ns = new Vec3(),
	sphereBox_side_ns1 = new Vec3(),
	sphereBox_side_ns2 = new Vec3(),
	convex_to_sphere = new Vec3(),
	sphereConvex_edge = new Vec3(),
	sphereConvex_edgeUnit = new Vec3(),
	sphereConvex_sphereToCorner = new Vec3(),
	sphereConvex_worldCorner = new Vec3(),
	sphereConvex_worldNormal = new Vec3(),
	sphereConvex_worldPoint = new Vec3(),
	sphereConvex_worldSpherePointClosestToPlane = new Vec3(),
	sphereConvex_penetrationVec = new Vec3(),
	sphereConvex_sphereToWorldPoint = new Vec3();
new Vec3(), new Vec3();
const planeConvex_v = new Vec3(),
	planeConvex_normal = new Vec3(),
	planeConvex_relpos = new Vec3(),
	planeConvex_projected = new Vec3(),
	convexConvex_sepAxis = new Vec3(),
	convexConvex_q = new Vec3(),
	particlePlane_normal = new Vec3(),
	particlePlane_relpos = new Vec3(),
	particlePlane_projected = new Vec3(),
	particleSphere_normal = new Vec3(),
	cqj = new Quaternion(),
	convexParticle_local = new Vec3();
new Vec3();
const convexParticle_penetratedFaceNormal = new Vec3(),
	convexParticle_vertexToParticle = new Vec3(),
	convexParticle_worldPenetrationVec = new Vec3(),
	convexHeightfield_tmp1 = new Vec3(),
	convexHeightfield_tmp2 = new Vec3(),
	convexHeightfield_faceList = [0],
	sphereHeightfield_tmp1 = new Vec3(),
	sphereHeightfield_tmp2 = new Vec3();
class OverlapKeeper {
	constructor() {
		(this.current = []), (this.previous = []);
	}
	getKey(e, t) {
		if (t < e) {
			const s = t;
			(t = e), (e = s);
		}
		return (e << 16) | t;
	}
	set(e, t) {
		const s = this.getKey(e, t),
			i = this.current;
		let o = 0;
		for (; s > i[o]; ) o++;
		if (s !== i[o]) {
			for (let e = i.length - 1; e >= o; e--) i[e + 1] = i[e];
			i[o] = s;
		}
	}
	tick() {
		const e = this.current;
		(this.current = this.previous), (this.previous = e), (this.current.length = 0);
	}
	getDiff(e, t) {
		const s = this.current,
			i = this.previous,
			o = s.length,
			n = i.length;
		let r = 0;
		for (let t = 0; t < o; t++) {
			let o = !1;
			const n = s[t];
			for (; n > i[r]; ) r++;
			(o = n === i[r]), o || unpackAndPush(e, n);
		}
		r = 0;
		for (let e = 0; e < n; e++) {
			let o = !1;
			const n = i[e];
			for (; n > s[r]; ) r++;
			(o = s[r] === n), o || unpackAndPush(t, n);
		}
	}
}
function unpackAndPush(e, t) {
	e.push((4294901760 & t) >> 16, 65535 & t);
}
const getKey = (e, t) => (e < t ? `${e}-${t}` : `${t}-${e}`);
class TupleDictionary {
	constructor() {
		this.data = { keys: [] };
	}
	get(e, t) {
		const s = getKey(e, t);
		return this.data[s];
	}
	set(e, t, s) {
		const i = getKey(e, t);
		this.get(e, t) || this.data.keys.push(i), (this.data[i] = s);
	}
	delete(e, t) {
		const s = getKey(e, t),
			i = this.data.keys.indexOf(s);
		-1 !== i && this.data.keys.splice(i, 1), delete this.data[s];
	}
	reset() {
		const e = this.data,
			t = e.keys;
		for (; t.length > 0; ) {
			delete e[t.pop()];
		}
	}
}
class World extends EventTarget {
	constructor(e) {
		void 0 === e && (e = {}),
			super(),
			(this.dt = -1),
			(this.allowSleep = !!e.allowSleep),
			(this.contacts = []),
			(this.frictionEquations = []),
			(this.quatNormalizeSkip = void 0 !== e.quatNormalizeSkip ? e.quatNormalizeSkip : 0),
			(this.quatNormalizeFast = void 0 !== e.quatNormalizeFast && e.quatNormalizeFast),
			(this.time = 0),
			(this.stepnumber = 0),
			(this.default_dt = 1 / 60),
			(this.nextId = 0),
			(this.gravity = new Vec3()),
			e.gravity && this.gravity.copy(e.gravity),
			e.frictionGravity && ((this.frictionGravity = new Vec3()), this.frictionGravity.copy(e.frictionGravity)),
			(this.broadphase = void 0 !== e.broadphase ? e.broadphase : new NaiveBroadphase()),
			(this.bodies = []),
			(this.hasActiveBodies = !1),
			(this.solver = void 0 !== e.solver ? e.solver : new GSSolver()),
			(this.constraints = []),
			(this.narrowphase = new Narrowphase(this)),
			(this.collisionMatrix = new ArrayCollisionMatrix()),
			(this.collisionMatrixPrevious = new ArrayCollisionMatrix()),
			(this.bodyOverlapKeeper = new OverlapKeeper()),
			(this.shapeOverlapKeeper = new OverlapKeeper()),
			(this.contactmaterials = []),
			(this.contactMaterialTable = new TupleDictionary()),
			(this.defaultMaterial = new Material('default')),
			(this.defaultContactMaterial = new ContactMaterial(this.defaultMaterial, this.defaultMaterial, { friction: 0.3, restitution: 0 })),
			(this.doProfiling = !1),
			(this.profile = { solve: 0, makeContactConstraints: 0, broadphase: 0, integrate: 0, narrowphase: 0 }),
			(this.accumulator = 0),
			(this.subsystems = []),
			(this.addBodyEvent = { type: 'addBody', body: null }),
			(this.removeBodyEvent = { type: 'removeBody', body: null }),
			(this.idToBodyMap = {}),
			this.broadphase.setWorld(this);
	}
	getContactMaterial(e, t) {
		return this.contactMaterialTable.get(e.id, t.id);
	}
	collisionMatrixTick() {
		const e = this.collisionMatrixPrevious;
		(this.collisionMatrixPrevious = this.collisionMatrix), (this.collisionMatrix = e), this.collisionMatrix.reset(), this.bodyOverlapKeeper.tick(), this.shapeOverlapKeeper.tick();
	}
	addConstraint(e) {
		this.constraints.push(e);
	}
	removeConstraint(e) {
		const t = this.constraints.indexOf(e);
		-1 !== t && this.constraints.splice(t, 1);
	}
	rayTest(e, t, s) {
		s instanceof RaycastResult ? this.raycastClosest(e, t, { skipBackfaces: !0 }, s) : this.raycastAll(e, t, { skipBackfaces: !0 }, s);
	}
	raycastAll(e, t, s, i) {
		return void 0 === s && (s = {}), (s.mode = Ray.ALL), (s.from = e), (s.to = t), (s.callback = i), tmpRay.intersectWorld(this, s);
	}
	raycastAny(e, t, s, i) {
		return void 0 === s && (s = {}), (s.mode = Ray.ANY), (s.from = e), (s.to = t), (s.result = i), tmpRay.intersectWorld(this, s);
	}
	raycastClosest(e, t, s, i) {
		return void 0 === s && (s = {}), (s.mode = Ray.CLOSEST), (s.from = e), (s.to = t), (s.result = i), tmpRay.intersectWorld(this, s);
	}
	addBody(e) {
		this.bodies.includes(e) || ((e.index = this.bodies.length), this.bodies.push(e), (e.world = this), e.initPosition.copy(e.position), e.initVelocity.copy(e.velocity), (e.timeLastSleepy = this.time), e instanceof Body && (e.initAngularVelocity.copy(e.angularVelocity), e.initQuaternion.copy(e.quaternion)), this.collisionMatrix.setNumObjects(this.bodies.length), (this.addBodyEvent.body = e), (this.idToBodyMap[e.id] = e), this.dispatchEvent(this.addBodyEvent));
	}
	removeBody(e) {
		e.world = null;
		const t = this.bodies.length - 1,
			s = this.bodies,
			i = s.indexOf(e);
		if (-1 !== i) {
			s.splice(i, 1);
			for (let e = 0; e !== s.length; e++) s[e].index = e;
			this.collisionMatrix.setNumObjects(t), (this.removeBodyEvent.body = e), delete this.idToBodyMap[e.id], this.dispatchEvent(this.removeBodyEvent);
		}
	}
	getBodyById(e) {
		return this.idToBodyMap[e];
	}
	getShapeById(e) {
		const t = this.bodies;
		for (let s = 0; s < t.length; s++) {
			const i = t[s].shapes;
			for (let t = 0; t < i.length; t++) {
				const s = i[t];
				if (s.id === e) return s;
			}
		}
		return null;
	}
	addContactMaterial(e) {
		this.contactmaterials.push(e), this.contactMaterialTable.set(e.materials[0].id, e.materials[1].id, e);
	}
	removeContactMaterial(e) {
		const t = this.contactmaterials.indexOf(e);
		-1 !== t && (this.contactmaterials.splice(t, 1), this.contactMaterialTable.delete(e.materials[0].id, e.materials[1].id));
	}
	fixedStep(e, t) {
		void 0 === e && (e = 1 / 60), void 0 === t && (t = 10);
		const s = performance.now() / 1e3;
		if (this.lastCallTime) {
			const i = s - this.lastCallTime;
			this.step(e, i, t);
		} else this.step(e, void 0, t);
		this.lastCallTime = s;
	}
	step(e, t, s) {
		if ((void 0 === s && (s = 10), void 0 === t)) this.internalStep(e), (this.time += e);
		else {
			this.accumulator += t;
			const i = performance.now();
			let o = 0;
			for (; this.accumulator >= e && o < s && (this.internalStep(e), (this.accumulator -= e), o++, !(performance.now() - i > 1e3 * e)); );
			this.accumulator = this.accumulator % e;
			const n = this.accumulator / e;
			for (let e = 0; e !== this.bodies.length; e++) {
				const t = this.bodies[e];
				t.previousPosition.lerp(t.position, n, t.interpolatedPosition), t.previousQuaternion.slerp(t.quaternion, n, t.interpolatedQuaternion), t.previousQuaternion.normalize();
			}
			this.time += t;
		}
	}
	internalStep(e) {
		this.dt = e;
		const t = this.contacts,
			s = World_step_p1,
			i = World_step_p2,
			o = this.bodies.length,
			n = this.bodies,
			r = this.solver,
			a = this.gravity,
			l = this.doProfiling,
			c = this.profile,
			h = Body.DYNAMIC;
		let d = -1 / 0;
		const p = this.constraints,
			u = World_step_frictionEquationPool;
		a.length();
		const m = a.x,
			v = a.y,
			y = a.z;
		let g = 0;
		for (l && (d = performance.now()), g = 0; g !== o; g++) {
			const e = n[g];
			if (e.type === h) {
				const t = e.force,
					s = e.mass;
				(t.x += s * m), (t.y += s * v), (t.z += s * y);
			}
		}
		for (let e = 0, t = this.subsystems.length; e !== t; e++) this.subsystems[e].update();
		l && (d = performance.now()), (s.length = 0), (i.length = 0), this.broadphase.collisionPairs(this, s, i), l && (c.broadphase = performance.now() - d);
		let x = p.length;
		for (g = 0; g !== x; g++) {
			const e = p[g];
			if (!e.collideConnected) for (let t = s.length - 1; t >= 0; t -= 1) ((e.bodyA === s[t] && e.bodyB === i[t]) || (e.bodyB === s[t] && e.bodyA === i[t])) && (s.splice(t, 1), i.splice(t, 1));
		}
		this.collisionMatrixTick(), l && (d = performance.now());
		const f = World_step_oldContacts,
			w = t.length;
		for (g = 0; g !== w; g++) f.push(t[g]);
		t.length = 0;
		const b = this.frictionEquations.length;
		for (g = 0; g !== b; g++) u.push(this.frictionEquations[g]);
		for (this.frictionEquations.length = 0, this.narrowphase.getContacts(s, i, this, t, f, this.frictionEquations, u), l && (c.narrowphase = performance.now() - d), l && (d = performance.now()), g = 0; g < this.frictionEquations.length; g++) r.addEquation(this.frictionEquations[g]);
		const _ = t.length;
		for (let e = 0; e !== _; e++) {
			const s = t[e],
				i = s.bi,
				o = s.bj,
				n = s.si,
				a = s.sj;
			let l;
			if (
				((l = (i.material && o.material && this.getContactMaterial(i.material, o.material)) || this.defaultContactMaterial),
				l.friction,
				i.material && o.material && (i.material.friction >= 0 && o.material.friction >= 0 && (i.material.friction, o.material.friction), i.material.restitution >= 0 && o.material.restitution >= 0 && (s.restitution = i.material.restitution * o.material.restitution)),
				r.addEquation(s),
				i.allowSleep && i.type === Body.DYNAMIC && i.sleepState === Body.SLEEPING && o.sleepState === Body.AWAKE && o.type !== Body.STATIC)
			) {
				o.velocity.lengthSquared() + o.angularVelocity.lengthSquared() >= 2 * o.sleepSpeedLimit ** 2 && (i.wakeUpAfterNarrowphase = !0);
			}
			if (o.allowSleep && o.type === Body.DYNAMIC && o.sleepState === Body.SLEEPING && i.sleepState === Body.AWAKE && i.type !== Body.STATIC) {
				i.velocity.lengthSquared() + i.angularVelocity.lengthSquared() >= 2 * i.sleepSpeedLimit ** 2 && (o.wakeUpAfterNarrowphase = !0);
			}
			this.collisionMatrix.set(i, o, !0), this.collisionMatrixPrevious.get(i, o) || ((World_step_collideEvent.body = o), (World_step_collideEvent.contact = s), i.dispatchEvent(World_step_collideEvent), (World_step_collideEvent.body = i), o.dispatchEvent(World_step_collideEvent)), this.bodyOverlapKeeper.set(i.id, o.id), this.shapeOverlapKeeper.set(n.id, a.id);
		}
		for (this.emitContactEvents(), l && ((c.makeContactConstraints = performance.now() - d), (d = performance.now())), g = 0; g !== o; g++) {
			const e = n[g];
			e.wakeUpAfterNarrowphase && (e.wakeUp(), (e.wakeUpAfterNarrowphase = !1));
		}
		for (x = p.length, g = 0; g !== x; g++) {
			const e = p[g];
			e.update();
			for (let t = 0, s = e.equations.length; t !== s; t++) {
				const s = e.equations[t];
				r.addEquation(s);
			}
		}
		r.solve(e, this), l && (c.solve = performance.now() - d), r.removeAllEquations();
		const B = Math.pow;
		for (g = 0; g !== o; g++) {
			const t = n[g];
			if (t.type & h) {
				const s = B(1 - t.linearDamping, e),
					i = t.velocity;
				i.scale(s, i);
				const o = t.angularVelocity;
				if (o) {
					const s = B(1 - t.angularDamping, e);
					o.scale(s, o);
				}
			}
		}
		this.dispatchEvent(World_step_preStepEvent), l && (d = performance.now());
		const S = this.stepnumber % (this.quatNormalizeSkip + 1) == 0,
			V = this.quatNormalizeFast;
		for (g = 0; g !== o; g++) n[g].integrate(e, S, V);
		this.clearForces(), (this.broadphase.dirty = !0), l && (c.integrate = performance.now() - d), (this.stepnumber += 1), this.dispatchEvent(World_step_postStepEvent);
		let A = !0;
		if (this.allowSleep)
			for (A = !1, g = 0; g !== o; g++) {
				const e = n[g];
				e.sleepTick(this.time), e.sleepState !== Body.SLEEPING && (A = !0);
			}
		this.hasActiveBodies = A;
	}
	emitContactEvents() {
		const e = this.hasAnyEventListener('beginContact'),
			t = this.hasAnyEventListener('endContact');
		if (((e || t) && this.bodyOverlapKeeper.getDiff(additions, removals), e)) {
			for (let e = 0, t = additions.length; e < t; e += 2) (beginContactEvent.bodyA = this.getBodyById(additions[e])), (beginContactEvent.bodyB = this.getBodyById(additions[e + 1])), this.dispatchEvent(beginContactEvent);
			beginContactEvent.bodyA = beginContactEvent.bodyB = null;
		}
		if (t) {
			for (let e = 0, t = removals.length; e < t; e += 2) (endContactEvent.bodyA = this.getBodyById(removals[e])), (endContactEvent.bodyB = this.getBodyById(removals[e + 1])), this.dispatchEvent(endContactEvent);
			endContactEvent.bodyA = endContactEvent.bodyB = null;
		}
		additions.length = removals.length = 0;
		const s = this.hasAnyEventListener('beginShapeContact'),
			i = this.hasAnyEventListener('endShapeContact');
		if (((s || i) && this.shapeOverlapKeeper.getDiff(additions, removals), s)) {
			for (let e = 0, t = additions.length; e < t; e += 2) {
				const t = this.getShapeById(additions[e]),
					s = this.getShapeById(additions[e + 1]);
				(beginShapeContactEvent.shapeA = t), (beginShapeContactEvent.shapeB = s), t && (beginShapeContactEvent.bodyA = t.body), s && (beginShapeContactEvent.bodyB = s.body), this.dispatchEvent(beginShapeContactEvent);
			}
			beginShapeContactEvent.bodyA = beginShapeContactEvent.bodyB = beginShapeContactEvent.shapeA = beginShapeContactEvent.shapeB = null;
		}
		if (i) {
			for (let e = 0, t = removals.length; e < t; e += 2) {
				const t = this.getShapeById(removals[e]),
					s = this.getShapeById(removals[e + 1]);
				(endShapeContactEvent.shapeA = t), (endShapeContactEvent.shapeB = s), t && (endShapeContactEvent.bodyA = t.body), s && (endShapeContactEvent.bodyB = s.body), this.dispatchEvent(endShapeContactEvent);
			}
			endShapeContactEvent.bodyA = endShapeContactEvent.bodyB = endShapeContactEvent.shapeA = endShapeContactEvent.shapeB = null;
		}
	}
	clearForces() {
		const e = this.bodies,
			t = e.length;
		for (let s = 0; s !== t; s++) {
			const t = e[s];
			t.force, t.torque, t.force.set(0, 0, 0), t.torque.set(0, 0, 0);
		}
	}
}
new AABB();
const tmpRay = new Ray(),
	performance = globalThis.performance || {};
if (!performance.now) {
	let e = Date.now();
	performance.timing && performance.timing.navigationStart && (e = performance.timing.navigationStart), (performance.now = () => Date.now() - e);
}
new Vec3();
const World_step_postStepEvent = { type: 'postStep' },
	World_step_preStepEvent = { type: 'preStep' },
	World_step_collideEvent = { type: Body.COLLIDE_EVENT_NAME, body: null, contact: null },
	World_step_oldContacts = [],
	World_step_frictionEquationPool = [],
	World_step_p1 = [],
	World_step_p2 = [],
	additions = [],
	removals = [],
	beginContactEvent = { type: 'beginContact', bodyA: null, bodyB: null },
	endContactEvent = { type: 'endContact', bodyA: null, bodyB: null },
	beginShapeContactEvent = { type: 'beginShapeContact', bodyA: null, bodyB: null, shapeA: null, shapeB: null },
	endShapeContactEvent = { type: 'endShapeContact', bodyA: null, bodyB: null, shapeA: null, shapeB: null };
export {
	AABB,
	ArrayCollisionMatrix,
	BODY_SLEEP_STATES,
	BODY_TYPES,
	Body,
	Box,
	Broadphase,
	COLLISION_TYPES,
	ConeTwistConstraint,
	Constraint,
	ContactEquation,
	ContactMaterial,
	ConvexPolyhedron,
	Cylinder,
	DistanceConstraint,
	Equation,
	EventTarget,
	FrictionEquation,
	GSSolver,
	GridBroadphase,
	Heightfield,
	HingeConstraint,
	JacobianElement,
	LockConstraint,
	Mat3,
	Material,
	NaiveBroadphase,
	Narrowphase,
	ObjectCollisionMatrix,
	Particle,
	Plane,
	PointToPointConstraint,
	Pool,
	Quaternion,
	RAY_MODES,
	Ray,
	RaycastResult,
	RaycastVehicle,
	RigidVehicle,
	RotationalEquation,
	RotationalMotorEquation,
	SAPBroadphase,
	SHAPE_TYPES,
	SPHSystem,
	Shape,
	Solver,
	Sphere,
	SplitSolver,
	Spring,
	Transform,
	Trimesh,
	Vec3,
	Vec3Pool,
	WheelInfo,
	World,
};
//# sourceMappingURL=/sm/a86ad42cc8e8f90df543b9860f64b305609149297723f9c70258ca713409a4fd.map
