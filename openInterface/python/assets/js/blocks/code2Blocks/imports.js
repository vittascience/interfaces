/**
 * @fileoverview imports.js. Configuration of the reverse translation (Python code => blocks) of the Python interface.
 * The specific blocks (display, turtle, graph, numpy, vittaia) are translated by the templates learned from their
 * generators (interfaces/assets/js/code2blocks/python/learnedTranslations.js).
 */

const LIB_IMPORT = {
    IMPORT_RANDOM: "import random",
    IMPORT_MATH: "import math",
    IMPORT_TIME: "import time",
    IMPORT_TURTLE_ALL: "import turtle",
    IMPORT_NUMPY: "import numpy as np",
    IMPORT_MATPLOTLIB: "import matplotlib.pyplot as plt",
    IMPORT_VITTAIA: "import vittaia as via",
};

const EXCLUDED_COMMENTS = [];

const CLASS_METHODS = {};

const MICROPYTHON_CLASSES = {};

export default { LIB_IMPORT, EXCLUDED_COMMENTS, CLASS_METHODS, MICROPYTHON_CLASSES };
