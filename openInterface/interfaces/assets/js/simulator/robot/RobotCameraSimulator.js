/**
 * @fileoverview RobotCameraSimulator.js
 * @author: AntoineEscriva (Antoine Escriva)
 * 
 * ──────────────────────────────────────────────────────────────────────────────
 * Rendu de la vue caméra d'un robot dans une arène 487×274 px.
 * Basé sur un moteur de raycasting 2D (calcul de la distance aux murs et obstacles
 * en fonction de la position et de l'orientation du robot) et un rendu en faux 3D
 * dans un canvas HTML5.
 * ──────────────────────────────────────────────────────────────────────────────
 * 
 * Copyright 2020 Vittascience.
 * https://vittascience.com 
 */

class RobotCamera {

    // ─── Constructeur ──────────────────────────────────────────────────────────

    /**
     * @param {HTMLCanvasElement} canvas   Canvas de destination (déjà dans le DOM)
     * @param {object}            options
     *   arenaWidth      {number}   Largeur  de l'arène en px  (défaut 487)
     *   arenaHeight     {number}   Hauteur  de l'arène en px  (défaut 274)
     *   resolution      {[w,h]}    Résolution du rendu caméra (défaut [320,240])
     *   fov             {number}   Champ de vision en degrés  (défaut 105)
     *   wallColor       {string}   Couleur des murs extérieurs (défaut '#888888')
     *   obstacleColor   {string}   Couleur des obstacles       (défaut '#4488cc')
     *   noiseAmount     {number}   Bruit gaussien [0..1]       (défaut 0.04)
     *   useIrFloor      {boolean}  Affiche la ligne IR au sol  (défaut true)
     *   irLineRect      {object}   {x0,y0,x1,y1,lineWidth} – zone de la ligne IR
     *   autoRender      {boolean}  Lance le rendu en continu   (défaut false)
     *   targetFps       {number}   FPS cible en mode autoRender (défaut 30, 0 = illimité)
     */
    constructor(canvas, options = {}) {
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d', { willReadFrequently: true });

        if (!canvas.style.width) canvas.style.width = (canvas.offsetWidth || 640) + 'px';
        if (!canvas.style.height) canvas.style.height = (canvas.offsetHeight || 480) + 'px';
        canvas.style.imageRendering = 'pixelated';

        const o = options;
        this._arenaW = o.arenaWidth ?? 487;
        this._arenaH = o.arenaHeight ?? 274;
        this._resolution = o.resolution ?? [160, 120];
        this._fov = (o.fov ?? 105) * Math.PI / 180;
        this._wallColor = o.wallColor ?? '#888888';
        this._obstColor = o.obstacleColor ?? '#4488cc';
        this._noiseAmt = o.noiseAmount ?? 0.04;
        this._useIR = o.useIrFloor ?? true;
        this._irRect = o.irLineRect ?? { x0: 80, y0: 70, x1: 400, y1: 200, lineWidth: 12 };

        // Position du robot  { x, y, ori }
        this._robot = { x: this._arenaW / 2, y: this._arenaH / 2, ori: 0 };

        // Obstacles  Map<id, {x, y, width, height}>  (rectangles AABB)
        this._obstacles = new Map();
        this._nextId = 1;

        // Boucle auto
        this._autoRender = false;
        this._rafHandle = null;
        this._boundRender = this._loop.bind(this);
        this._targetFps = o.targetFps ?? 15;   // 0 = illimité
        this._fpsInterval = this._targetFps > 0 ? 1000 / this._targetFps : 0;
        this._lastFrameTime = 0;
        this._dirty = true;  // forcer un premier rendu

        // Source de la piste (mode par défaut : rectangle fixe)
        this._showResolution = true;
        this._trackMode = 'rect';
        this._trackCanvas = null;
        this._trackCallback = null;
        this._trackPixels = null;
        this._darkThreshold = 100;

        if (o.autoRender) this.setAutoRender(true);
        else this.render();
    }

    // ─── API publique ──────────────────────────────────────────────────────────

    /** Déplace et oriente le robot.
     *  @param {number} x    Position X dans l'arène
     *  @param {number} y    Position Y dans l'arène
     *  @param {number} ori  Orientation en radians (0 = droite, trigonométrique)
     *
     *  NOTE : en mode autoRender, cette méthode se contente de mettre à jour
     *  les données — le rendu est assuré par la boucle RAF throttlée.
     *  En mode manuel (autoRender désactivé), le rendu est déclenché uniquement
     *  si le throttle FPS l'autorise, pour ne pas bloquer le thread principal.
     */
    setRobotPosition(x, y, ori) {
        this._robot = { x, y, ori };
        this._dirty = true;
        if (!this._autoRender) {
            // Throttle aussi en mode manuel : on ne rend que si l'intervalle est écoulé
            const now = performance.now();
            if (this._fpsInterval <= 0 || (now - this._lastFrameTime) >= this._fpsInterval) {
                this._lastFrameTime = now;
                this._render();
                this._dirty = false;
            }
        }
    }

    /** Retourne la position courante du robot { x, y, ori }. */
    getRobotPosition() {
        return { ...this._robot };
    }

    /** Ajoute un obstacle rectangulaire.
     *  @param {{ x, y, width, height, color? }} rect
     *         Coin haut-gauche + dimensions + couleur optionnelle
     *  @returns {number} id de l'obstacle
     */
    addObstacle(rect) {
        const id = this._nextId++;
        this._obstacles.set(id, {
            ...rect,
            color: rect.color ?? this._obstColor
        });
        this._dirty = true;
        return id;
    }

    /** Déplace un obstacle existant.
     *  @param {number} id   Identifiant retourné par addObstacle
     *  @param {number} x    Nouvelle position X (coin haut-gauche)
     *  @param {number} y    Nouvelle position Y (coin haut-gauche)
     */
    moveObstacle(id, x, y) {
        const obs = this._obstacles.get(id);
        if (!obs) return;
        obs.x = x;
        obs.y = y;
        this._dirty = true;
    }

    /** Redimensionne un obstacle existant.
     *  @param {number} id     Identifiant retourné par addObstacle
     *  @param {number} width  Nouvelle largeur
     *  @param {number} height Nouvelle hauteur
     */
    resizeObstacle(id, width, height) {
        const obs = this._obstacles.get(id);
        if (!obs) return;
        obs.width = width;
        obs.height = height;
        this._dirty = true;
    }

    /** Met à jour plusieurs propriétés d'un obstacle en une fois.
     *  @param {number} id    Identifiant retourné par addObstacle
     *  @param {object} props Propriétés à fusionner (x, y, width, height)
     */
    updateObstacle(id, props) {
        const obs = this._obstacles.get(id);
        if (!obs) return;
        Object.assign(obs, props);
        this._dirty = true;
    }

    /** Supprime un obstacle.
     *  @param {number} id Identifiant retourné par addObstacle
     */
    removeObstacle(id) {
        this._obstacles.delete(id);
        this._dirty = true;
    }

    /** Supprime tous les obstacles. */
    clearObstacles() {
        this._obstacles.clear();
        this._dirty = true;
    }

    /** Retourne la liste des obstacles  [ { id, x, y, width, height }, … ] */
    getObstacles() {
        return Array.from(this._obstacles.entries())
            .map(([id, o]) => ({ id, ...o }));
    }

    /** Change la résolution du rendu caméra (grille de raycasting).
     *  La taille d'affichage du canvas en CSS reste inchangée.
     *  Une résolution basse produit l'effet "pixels géants" pixelisés.
     *  @param {number} w  Colonnes de rayons (ex: 4, 16, 80, 320…)
     *  @param {number} h  Lignes de pixels   (ex: 3, 12, 60, 240…)
     */
    setResolution(w, h) {
        this._resolution = [w, h];
        this._showResolution = true;
        // canvas.width/height = résolution interne (modifié dans _render)
        // canvas style.width/height = taille d'affichage (on ne touche pas au CSS)
        this._dirty = true;
    }

    /** Active / désactive l'affichage de la ligne IR au sol. */
    setIrFloor(enabled) {
        this._useIR = enabled;
        this._dirty = true;
    }

    /** Active / désactive le rendu automatique en continu (RAF). */
    setAutoRender(enabled) {
        if (enabled && !this._autoRender) {
            this._autoRender = true;
            this._lastFrameTime = 0;
            this._rafHandle = requestAnimationFrame(this._boundRender);
        } else if (!enabled && this._autoRender) {
            this._autoRender = false;
            if (this._rafHandle) cancelAnimationFrame(this._rafHandle);
            this._rafHandle = null;
        }
    }

    /**
     * Définit le nombre de FPS cible pour le rendu automatique.
     * @param {number} fps  FPS souhaités (ex: 10, 15, 24, 30). Passer 0 pour illimité.
     */
    setTargetFps(fps) {
        this._targetFps = fps;
        this._fpsInterval = fps > 0 ? 1000 / fps : 0;
    }

    /** Force un rendu immédiat. */
    render() {
        this._render();
    }

    /**
     * Renvoie l'image capturée par la caméra sous forme de tableau de pixels RGB.
     *
     * - Résolution 1×1  → [R, G, B]                         (liste de 3 entiers)
     * - Résolution W×1  → [[R,G,B], [R,G,B], …]             (1 ligne, W colonnes)
     * - Résolution W×H  → [ [[R,G,B],…], [[R,G,B],…], … ]  (H lignes, W colonnes)
     *
     * Les valeurs R, G, B sont des entiers entre 0 et 255.
     * Un rendu est déclenché juste avant la lecture pour garantir l'image à jour.
     *
     * @returns {number[]|number[][]|number[][][]}
     */
    getCameraData() {
        // S'assurer que le canvas est à jour
        this._render();

        const [nx, ny] = this._resolution;
        const pixels = this._ctx.getImageData(0, 0, nx, ny).data;

        // Cas spécial 1×1 : un seul pixel → [R, G, B]
        if (nx === 1 && ny === 1) {
            return [pixels[0], pixels[1], pixels[2]];
        }

        // Cas général : tableau de ny lignes × nx colonnes
        const rows = [];
        for (let row = 0; row < ny; row++) {
            const cols = [];
            for (let col = 0; col < nx; col++) {
                const i = (row * nx + col) * 4;
                cols.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
            }
            rows.push(cols);
        }

        // Cas 1 seule ligne : on aplatit d'un niveau (liste de colonnes directement)
        if (ny === 1) return rows[0];

        return rows;
    }

    // ─── Boucle RAF ───────────────────────────────────────────────────────────

    _loop(timestamp) {
        if (this._autoRender) {
            this._rafHandle = requestAnimationFrame(this._boundRender);
        }
        // Limitation FPS : on saute le rendu si l'intervalle n'est pas écoulé
        if (this._fpsInterval > 0) {
            const elapsed = timestamp - this._lastFrameTime;
            if (elapsed < this._fpsInterval) return;
            // Ajustement pour compenser les dérives d'horloge
            this._lastFrameTime = timestamp - (elapsed % this._fpsInterval);
        }
        // Rendu uniquement si quelque chose a changé
        if (this._dirty) {
            this._render();
            this._dirty = false;
        }
    }

    // ─── Lancer de rayons ─────────────────────────────────────────────────────

    /** Retourne la distance et le type de surface touchée par un rayon.
     *  @returns {{ dist: number, surfaceType: 'wall'|'obstacle' }}
     */
    /** Retourne la distance, le type de surface, et la couleur touchée par un rayon.
 *  @returns {{ dist: number, surfaceType: 'wall'|'obstacle', color: string }}
 */
    _castRay(ox, oy, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        let minDist = Infinity;
        let surfaceType = 'wall';
        let color = this._wallColor;

        // ── Murs extérieurs ──────────────────────────────────────────────────────
        const walls = [
            { nx: 0, ny: -1, d: -oy },
            { nx: 0, ny: 1, d: oy - this._arenaH },
            { nx: -1, ny: 0, d: -ox },
            { nx: 1, ny: 0, d: ox - this._arenaW },
        ];

        for (const w of walls) {
            const denom = w.nx * cos + w.ny * sin;
            if (denom > 1e-6) {
                const t = -w.d / denom;
                if (t > 0.01 && t < minDist) {
                    minDist = t;
                    surfaceType = 'wall';
                    color = this._wallColor;
                }
            }
        }

        // ── Obstacles AABB ────────────────────────────────────────────────────────
        for (const obs of this._obstacles.values()) {
            const t = this._rayAABB(ox, oy, cos, sin, obs);
            if (t !== null && t < minDist) {
                minDist = t;
                surfaceType = 'obstacle';
                color = obs.color ?? this._obstColor;
            }
        }

        return {
            dist: Math.max(minDist, 0.1),
            surfaceType,
            color
        };
    }

    /** Intersection rayon / AABB. Retourne t ou null. */
    _rayAABB(ox, oy, cos, sin, aabb) {
        const { x, y, width, height } = aabb;
        const x1 = x, x2 = x + width;
        const y1 = y, y2 = y + height;

        let tmin = -Infinity, tmax = Infinity;

        if (Math.abs(cos) > 1e-9) {
            const tx1 = (x1 - ox) / cos;
            const tx2 = (x2 - ox) / cos;
            tmin = Math.max(tmin, Math.min(tx1, tx2));
            tmax = Math.min(tmax, Math.max(tx1, tx2));
        } else if (ox < x1 || ox > x2) return null;

        if (Math.abs(sin) > 1e-9) {
            const ty1 = (y1 - oy) / sin;
            const ty2 = (y2 - oy) / sin;
            tmin = Math.max(tmin, Math.min(ty1, ty2));
            tmax = Math.min(tmax, Math.max(ty1, ty2));
        } else if (oy < y1 || oy > y2) return null;

        if (tmax < tmin || tmax < 0.01) return null;
        const t = tmin > 0.01 ? tmin : tmax;
        return t > 0.01 ? t : null;
    }

    // ─── Source de la piste ───────────────────────────────────────────────────

    /**
     * Définit la source utilisée pour lire la couleur du sol (piste IR).
     *
     *   1. Canvas de l'arène (rééchantillonné à chaque frame) :
     *        cam.setTrackSource(myArenaCanvas);
     *
     *   2. Callback  (px, py) → float [0..1]  (0=piste noire, 1=hors piste) :
     *        cam.setTrackSource((px, py) => myFn(px, py));
     *
     *   3. null → revient au rectangle IR fixe (options.irLineRect) :
     *        cam.setTrackSource(null);
     *
     * @param {HTMLCanvasElement|function|null} source
     * @param {number} [darkThreshold=100]  Seuil luminosité (0-255) sous lequel
     *                                       un pixel est considéré "piste noire"
     */
    setTrackSource(source, darkThreshold = 100) {
        this._darkThreshold = darkThreshold;
        if (source === null) {
            this._trackMode = 'rect';
            this._trackCanvas = null;
            this._trackCallback = null;
        } else if (typeof source === 'function') {
            this._trackMode = 'callback';
            this._trackCallback = source;
            this._trackCanvas = null;
        } else if (source instanceof HTMLCanvasElement) {
            this._trackMode = 'canvas';
            this._trackCanvas = source;
            this._trackCallback = null;
        } else {
            console.warn('RobotCamera.setTrackSource: source invalide');
            return;
        }
        this._trackPixels = null;
        this._dirty = true;
    }

    /** Capture les pixels du canvas arène une fois par frame (appelé depuis _render). */
    _refreshTrackPixels() {
        if (this._trackMode !== 'canvas' || !this._trackCanvas) return;
        const c = this._trackCanvas;
        const ctx = c.getContext('2d', { willReadFrequently: true });
        this._trackPixels = ctx.getImageData(0, 0, c.width, c.height);
        this._trackCanvasW = c.width;
        this._trackCanvasH = c.height;
    }

    // ─── Ligne IR ─────────────────────────────────────────────────────────────

    _getIrValues(xyFloor) {
        const n = xyFloor.length / 2;
        const out = new Float32Array(n);
        const threshold = this._darkThreshold ?? 100;

        for (let i = 0; i < n; i++) {
            const px = xyFloor[i * 2];
            const py = xyFloor[i * 2 + 1];
            let val = 1.0;

            if (this._trackMode === 'canvas' && this._trackPixels) {
                // Conversion coordonnées arène → pixels canvas (si tailles différentes)
                const scaleX = this._trackCanvasW / this._arenaW;
                const scaleY = this._trackCanvasH / this._arenaH;
                const cx = Math.round(px * scaleX);
                const cy = Math.round(py * scaleY);
                if (cx >= 0 && cx < this._trackCanvasW && cy >= 0 && cy < this._trackCanvasH) {
                    const idx = (cy * this._trackCanvasW + cx) * 4;
                    const d = this._trackPixels.data;
                    const lum = (d[idx] + d[idx + 1] + d[idx + 2]) / 3;
                    val = lum < threshold ? 0.1 : 1.0;
                }

            } else if (this._trackMode === 'callback') {
                val = this._trackCallback(px, py);

            } else {
                // Mode rect IR fixe (comportement original)
                const { x0, y0, x1, y1, lineWidth: lw } = this._irRect;
                const onLine =
                    px > x0 && px < x1 && py > y0 && py < y1 &&
                    (px < x0 + lw || px > x1 - lw || py < y0 + lw || py > y1 - lw);
                val = onLine ? 0.15 : 1.0;
            }

            out[i] = val;
        }
        return out;
    }


    // ─── Rendu principal ──────────────────────────────────────────────────────

    _render() {
        const [nx, ny] = this._resolution;
        this._canvas.width = nx;
        this._canvas.height = ny;

        // Capture les pixels du canvas arène si mode 'canvas'
        this._refreshTrackPixels();

        const horizon = Math.floor(ny / 2);
        const distMin = 30;
        const { x, y, ori } = this._robot;

        const img = new Float32Array(ny * nx * 3);

        // Plafond (blanc cassé) + sol initial
        const ceiling = [0.95, 0.95, 1.0];
        for (let row = horizon; row < ny; row++)
            for (let col = 0; col < nx; col++) {
                const idx = (row * nx + col) * 3;
                img[idx] = ceiling[0]; img[idx + 1] = ceiling[1]; img[idx + 2] = ceiling[2];
            }

        // ── Sol : projection perspective pixel par pixel ─────────────────────────
        // Projection correcte : on décompose chaque rayon en composante avant (fwd)
        // et latérale (right), toutes deux unitaires et perpendiculaires.
        // La distance au sol est calculée depuis la hauteur de caméra h_cam,
        // ce qui garantit une projection correcte quelle que soit la position du robot.
        if (horizon > 0) {
            const cosOri = Math.cos(ori);
            const sinOri = Math.sin(ori);
            // Vecteur avant (direction du robot) et vecteur droite (perpendiculaire)
            const fwdX = cosOri, fwdY = sinOri;
            const rgtX = -sinOri, rgtY = cosOri;
            // Demi-largeur du plan image à distance focale 1
            const planW = Math.tan(this._fov / 2);
            // Hauteur virtuelle de la caméra au-dessus du sol (détermine la perspective)
            const h_cam = distMin * 0.5;

            for (let row = 0; row < horizon; row++) {
                // rowFrac ∈ ]0..1] : 0 = horizon (loin), 1 = pied du robot (proche)
                const rowFrac = (horizon - row) / horizon;
                const rowDistPerspective = h_cam / Math.max(rowFrac, 1e-6);

                for (let col = 0; col < nx; col++) {
                    // camX ∈ [-1..+1] : -1 = gauche, +1 = droite
                    const camX = 1 - (col / Math.max(nx - 1, 1)) * 2;
                    // Direction du rayon normalisée
                    const rayLen = Math.sqrt(1 + (camX * planW) ** 2);
                    const dirX = (fwdX + rgtX * camX * planW) / rayLen;
                    const dirY = (fwdY + rgtY * camX * planW) / rayLen;

                    // Distance maximale avant de sortir de l'arène dans cette direction
                    // (même logique que le raycasting murs : intersection plan par plan)
                    let maxDist = rowDistPerspective;
                    if (Math.abs(dirX) > 1e-6) {
                        const tx = dirX > 0 ? (this._arenaW - x) / dirX : -x / dirX;
                        if (tx > 0) maxDist = Math.min(maxDist, tx);
                    }
                    if (Math.abs(dirY) > 1e-6) {
                        const ty = dirY > 0 ? (this._arenaH - y) / dirY : -y / dirY;
                        if (ty > 0) maxDist = Math.min(maxDist, ty);
                    }
                    // Distance effective : on ne dépasse jamais les murs
                    const rowDist = Math.min(rowDistPerspective, maxDist * 0.9999);

                    // Coordonnées réelles dans l'arène
                    const floorX = x + dirX * rowDist;
                    const floorY = y + dirY * rowDist;

                    const idx = (row * nx + col) * 3;

                    if (this._trackMode === 'canvas' && this._trackPixels) {
                        // Lecture directe de la couleur depuis le canvas arène
                        const scaleX = this._trackCanvasW / this._arenaW;
                        const scaleY = this._trackCanvasH / this._arenaH;
                        const cx = Math.round(floorX * scaleX);
                        const cy = Math.round(floorY * scaleY);
                        if (cx >= 0 && cx < this._trackCanvasW && cy >= 0 && cy < this._trackCanvasH) {
                            const pi = (cy * this._trackCanvasW + cx) * 4;
                            const d = this._trackPixels.data;
                            img[idx] = d[pi] / 255;
                            img[idx + 1] = d[pi + 1] / 255;
                            img[idx + 2] = d[pi + 2] / 255;
                        } else {
                            img[idx] = img[idx + 1] = img[idx + 2] = 0.45; // hors arène
                        }

                    } else if (this._trackMode === 'callback') {
                        const val = this._trackCallback(floorX, floorY);
                        img[idx] = img[idx + 1] = img[idx + 2] = (typeof val === 'number') ? val : 1.0;

                    } else {
                        // Mode rect IR fixe (comportement original)
                        const { x0, y0, x1, y1, lineWidth: lw } = this._irRect;
                        const onLine =
                            floorX > x0 && floorX < x1 && floorY > y0 && floorY < y1 &&
                            (floorX < x0 + lw || floorX > x1 - lw || floorY < y0 + lw || floorY > y1 - lw);
                        const val = onLine ? 0.15 : 1.0;
                        img[idx] = img[idx + 1] = img[idx + 2] = val;
                    }
                }
            }
        }

        // ── Lancer de rayons (murs + obstacles) ───────────────────────────────────
        for (let j = 0; j < nx; j++) {
            const angle = ori + this._fov / 2 - j * (this._fov / Math.max(nx - 1, 1));
            const { dist, color: hitColor } = this._castRay(x, y, angle);

            const wallH = (ny / 2) * distMin / dist;
            const n = Math.floor(wallH / 2);
            const color = this._hexToRgb(hitColor);

            const rStart = Math.max(0, horizon - n);
            const rEnd = Math.min(ny, horizon + n);
            for (let row = rStart; row < rEnd; row++) {
                const idx = (row * nx + j) * 3;
                img[idx] = color[0];
                img[idx + 1] = color[1];
                img[idx + 2] = color[2];
            }

            if (n < horizon) {
                const alpha = (wallH / 2) % 1;
                for (const row of [horizon - n - 1, horizon + n]) {
                    if (row < 0 || row >= ny) continue;
                    const idx = (row * nx + j) * 3;
                    for (let c = 0; c < 3; c++) {
                        img[idx + c] = (1 - alpha) * img[idx + c] + alpha * color[c];
                    }
                }
            }
        }

        // ── Flip vertical (image renversée → axe Y vers le bas) ──────────────────
        const flipped = new Float32Array(ny * nx * 3);
        for (let row = 0; row < ny; row++) {
            const srcOff = (ny - 1 - row) * nx * 3;
            flipped.set(img.subarray(srcOff, srcOff + nx * 3), row * nx * 3);
        }

        // ── Bruit gaussien ────────────────────────────────────────────────────────
        if (this._noiseAmt > 0) {
            for (let i = 0; i < flipped.length; i += 3) {
                const n = this._gaussian() * this._noiseAmt;
                flipped[i] = Math.min(1, Math.max(0, flipped[i] + n));
                flipped[i + 1] = Math.min(1, Math.max(0, flipped[i + 1] + n));
                flipped[i + 2] = Math.min(1, Math.max(0, flipped[i + 2] + n));
            }
        }

        // ── ImageData → canvas ────────────────────────────────────────────────────
        const imgData = this._ctx.createImageData(nx, ny);
        for (let i = 0; i < nx * ny; i++) {
            imgData.data[i * 4] = flipped[i * 3] * 255;
            imgData.data[i * 4 + 1] = flipped[i * 3 + 1] * 255;
            imgData.data[i * 4 + 2] = flipped[i * 3 + 2] * 255;
            imgData.data[i * 4 + 3] = 255;
        }
        this._ctx.putImageData(imgData, 0, 0);

        // ── Miroir horizontal ─────────────────────────────────────────────────────
        // On copie l'image sur elle-même avec un flip X pour corriger l'orientation
        // de la piste par rapport à la vue 2D du simulateur.
        this._ctx.save();
        this._ctx.scale(-1, 1);
        this._ctx.drawImage(this._canvas, -nx, 0);
        this._ctx.restore();

        // ── Affichage de la résolution en haut à gauche ───────────────────────────
        // Le texte est dessiné dans l'espace canvas interne MAIS avec une taille
        // compensée par le ratio affichage/résolution, pour qu'il reste toujours
        // net et de taille fixe (12px CSS) quelle que soit la résolution.
        if (this._showResolution) {
            const label = `${nx}x${ny}`;
            const displayW = parseFloat(this._canvas.style.width) || nx;
            const displayH = parseFloat(this._canvas.style.height) || ny;
            const scaleX = nx / displayW;   // px internes / px CSS
            const scaleY = ny / displayH;
            const targetCssPx = 12;         // taille visuelle souhaitée en px CSS
            const fs = Math.ceil(targetCssPx * Math.max(scaleX, scaleY));
            this._ctx.font = `bold ${fs}px monospace`;
            const tw = this._ctx.measureText(label).width;
            const pad = Math.ceil(2 * scaleX);
            this._ctx.fillStyle = 'rgba(0,0,0,0.55)';
            this._ctx.fillRect(0, 0, tw + pad * 2, fs + pad);
            this._ctx.fillStyle = '#ffffff';
            this._ctx.fillText(label, pad, fs);
        }
    }

    // ─── Utilitaires ──────────────────────────────────────────────────────────

    _hexToRgb(hex) {
        const n = parseInt(hex.replace('#', ''), 16);
        return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
    }

    _gaussian() {
        let u = 0, v = 0;
        while (!u) u = Math.random();
        while (!v) v = Math.random();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }
}