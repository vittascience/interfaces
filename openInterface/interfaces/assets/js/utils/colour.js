function hexToR(h) {
    return parseInt((cutHex(h)).substring(0, 2), 16)
}
function hexToG(h) {
    return parseInt((cutHex(h)).substring(2, 4), 16)
}
function hexToB(h) {
    return parseInt((cutHex(h)).substring(4, 6), 16)
}
function cutHex(h) {
    return (h.charAt(0) == "#") ? h.substring(1, 7) : h
}
function RGBtoGrayscale(r, g, b) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
}
function rgbToHex(rgb) {
    // Séparer les valeurs de rouge, vert et bleu
    let [r, g, b] = rgb;
    r = r < 0 ? 0 : r > 255 ? 255 : r;
    g = g < 0 ? 0 : g > 255 ? 255 : g;
    b = b < 0 ? 0 : b > 255 ? 255 : b;
    // Convertir en hexadécimal
    const hex = ((r << 16) | (g << 8) | b).toString(16);

    // Remplir avec des zéros à gauche si nécessaire
    const paddedHex = hex.padStart(6, '0');

    return `#${paddedHex}`;
};
/**
 * Convertit une couleur RGB en HSV.
 * @param {number} r - Rouge   (0–255)
 * @param {number} g - Vert    (0–255)
 * @param {number} b - Bleu    (0–255)
 * @returns {{h: number, s: number, v: number}} 
 * h en degrés [0–360], s et v en [0–1]
 */
function rgbToHsv(r, g, b) {
    // Normalisation [0–1]
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h, s, v;
    v = max; // value

    // Saturation
    s = max === 0 ? 0 : delta / max;

    // Teinte
    if (delta === 0) {
        h = 0; // gris (aucune teinte)
    } else if (max === r) {
        h = 60 * (((g - b) / delta) % 6);
    } else if (max === g) {
        h = 60 * ((b - r) / delta + 2);
    } else { // max === b
        h = 60 * ((r - g) / delta + 4);
    }

    if (h < 0) {
        h += 360;
    }

    return { h, s, v };
};
