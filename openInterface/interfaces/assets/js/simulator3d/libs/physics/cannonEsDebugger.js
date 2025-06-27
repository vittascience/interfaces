import { Vec3 as e, Quaternion as t, Shape as n } from './cannon.js';
import { MeshBasicMaterial as s, SphereGeometry as o, BoxGeometry as r, PlaneGeometry as a, Mesh as c, CylinderGeometry as i, BufferGeometry as p, Float32BufferAttribute as l } from '../three.js';
function u(u, d, m) {
	let { color: y = 65280, scale: f = 1, onInit: h, onUpdate: E } = void 0 === m ? {} : m;
	const g = [],
		w = new s({ color: null != y ? y : 65280, wireframe: !0 }),
		I = new e(),
		b = new e(),
		H = new e(),
		N = new t(),
		O = new o(1),
		S = new r(1, 1, 1),
		k = new a(10, 10, 10, 10);
	function L(e) {
		let t = new c();
		const { SPHERE: s, BOX: o, PLANE: r, CYLINDER: a, CONVEXPOLYHEDRON: d, TRIMESH: m, HEIGHTFIELD: y } = n.types;
		switch (e.type) {
			case s:
				t = new c(O, w);
				break;
			case o:
				t = new c(S, w);
				break;
			case r:
				t = new c(k, w);
				break;
			case a: {
				const n = new i(e.radiusTop, e.radiusBottom, e.height, e.numSegments);
				(t = new c(n, w)), (e.geometryId = n.id);
				break;
			}
			case d: {
				const n = (function (e) {
					const t = new p(),
						n = [];
					for (let t = 0; t < e.vertices.length; t++) {
						const s = e.vertices[t];
						n.push(s.x, s.y, s.z);
					}
					t.setAttribute('position', new l(n, 3));
					const s = [];
					for (let t = 0; t < e.faces.length; t++) {
						const n = e.faces[t],
							o = n[0];
						for (let e = 1; e < n.length - 1; e++) {
							const t = n[e],
								r = n[e + 1];
							s.push(o, t, r);
						}
					}
					return t.setIndex(s), t.computeBoundingSphere(), t.computeVertexNormals(), t;
				})(e);
				(t = new c(n, w)), (e.geometryId = n.id);
				break;
			}
			case m: {
				const n = (function (e) {
					const t = new p(),
						n = [],
						s = I,
						o = b,
						r = H;
					for (let t = 0; t < e.indices.length / 3; t++) e.getTriangleVertices(t, s, o, r), n.push(s.x, s.y, s.z), n.push(o.x, o.y, o.z), n.push(r.x, r.y, r.z);
					return t.setAttribute('position', new l(n, 3)), t.computeBoundingSphere(), t.computeVertexNormals(), t;
				})(e);
				(t = new c(n, w)), (e.geometryId = n.id);
				break;
			}
			case y: {
				const n = (function (e) {
					const t = new p(),
						n = e.elementSize || 1,
						s = e.data.flatMap((e, t) => e.flatMap((e, s) => [t * n, s * n, e])),
						o = [];
					for (let t = 0; t < e.data.length - 1; t++)
						for (let n = 0; n < e.data[t].length - 1; n++) {
							const s = e.data[t].length,
								r = t * s + n;
							o.push(r + 1, r + s, r + s + 1), o.push(r + s, r + 1, r);
						}
					return t.setIndex(o), t.setAttribute('position', new l(s, 3)), t.computeBoundingSphere(), t.computeVertexNormals(), t;
				})(e);
				(t = new c(n, w)), (e.geometryId = n.id);
				break;
			}
		}
		return u.add(t), t;
	}
	function R(e, t) {
		let s = g[e],
			c = !1;
		return (
			(function (e, t) {
				if (!e) return !1;
				const { geometry: s } = e;
				return (s instanceof o && t.type === n.types.SPHERE) || (s instanceof r && t.type === n.types.BOX) || (s instanceof a && t.type === n.types.PLANE) || (s.id === t.geometryId && t.type === n.types.CYLINDER) || (s.id === t.geometryId && t.type === n.types.CONVEXPOLYHEDRON) || (s.id === t.geometryId && t.type === n.types.TRIMESH) || (s.id === t.geometryId && t.type === n.types.HEIGHTFIELD);
			})(s, t) || (s && u.remove(s), (g[e] = s = L(t)), (c = !0)),
			(function (e, t) {
				const { SPHERE: s, BOX: o, PLANE: r, CYLINDER: a, CONVEXPOLYHEDRON: c, TRIMESH: i, HEIGHTFIELD: p } = n.types;
				switch (t.type) {
					case s: {
						const { radius: n } = t;
						e.scale.set(n * f, n * f, n * f);
						break;
					}
					case o:
						e.scale.copy(t.halfExtents), e.scale.multiplyScalar(2 * f);
						break;
					case r:
						break;
					case a:
					case c:
						e.scale.set(1 * f, 1 * f, 1 * f);
						break;
					case i:
						e.scale.copy(t.scale).multiplyScalar(f);
						break;
					case p:
						e.scale.set(1 * f, 1 * f, 1 * f);
				}
			})(s, t),
			c
		);
	}
	return (
		k.translate(0, 0, 1e-4),
		{
			update: function () {
				const e = g,
					t = I,
					n = N;
				let s = 0;
				for (const o of d.bodies)
					for (let r = 0; r !== o.shapes.length; r++) {
						const a = o.shapes[r],
							c = R(s, a),
							i = e[s];
						i && (o.quaternion.vmult(o.shapeOffsets[r], t), o.position.vadd(t, t), o.quaternion.mult(o.shapeOrientations[r], n), i.position.copy(t), i.quaternion.copy(n), c && h instanceof Function && h(o, i, a), !c && E instanceof Function && E(o, i, a)), s++;
					}
				for (let t = s; t < e.length; t++) {
					const n = e[t];
					n && u.remove(n);
				}
				e.length = s;
			},
		}
	);
}
export { u as default };
//# sourceMappingURL=/sm/67e420c8f8bf99532d50530825e4b03ab055b309ba480cb33ed6c96e4d58e0fd.map
