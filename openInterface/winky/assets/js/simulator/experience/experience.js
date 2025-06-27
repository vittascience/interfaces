import Experience from '/openInterface/interfaces/assets/js/simulator3d/Experience.js';
import config from './config.js';
import { gsap } from '/openInterface/interfaces/assets/js/simulator3d/libs/gsap.js';
import Gui from './utils/debug.js';
import * as THREE from '/openInterface/interfaces/assets/js/simulator3d/libs/three.js';

export default class Simulator3d {
    static instance;
    constructor(_options) {
        if (Simulator3d.instance) {
            return Simulator3d.instance;
        }

        // Common
        this.options = _options;
        this.experience = new Experience(this.options);
        this.loadedHierarchie = false;
        this._loadHierarchie();
        this._initAnimation();

        // Specific
        Simulator3d.instance = this;
    }

    _init() {
        this.isBusy = false;
        // stuff to do when the model is loaded
        this.startPosition = this.getBodyRot();
        this.savedPattern = {
            1: EYE_PRESET['Amused'][0],
            2: EYE_PRESET['Amused'][1]
        };
        this.reset();
    }

    async reset() {
        clearInterval(this.intervalLedAnim);
        await this.resetLEDS();
        await this.setLEDS(EYE_PRESET['Amused'][0]);
        await this.setLEDS(EYE_PRESET['Amused'][1]);
        await this.resetPosition();
    }

    // most important function for the simulator
    _loadHierarchie() {
        setTimeout(() => {
            if (this.experience.loaded) {
                if (this.options.params.debug) {
                    console.log('Model loaded');
                }
                this.experience.scene.traverse((child) => {
                    const elementsRegex = this.options.modelHierarchy.elementsRegex;

                    for (let i = 0; i < elementsRegex.length; i++) {
                        const regex = new RegExp(elementsRegex[i], 'g');
                        if (child.name.match(regex)) {
                            this.experience.hierarchie[child.name] = child;
                        }
                    }

                    if (child.name.match(/PerspectiveCamera/g)) {
                        this.experience.perspecticeCamera = child;
                    }
                });
                this.loadedHierarchie = true;
                this._init();
                // uncomment to activate the debug gui
                // new Gui(this.experience);
            } else {
                if (this.options.params.debug) console.log('model not loaded');
                this._loadHierarchie();
            }
        }, 100);
    }

    _initAnimation() {
        setTimeout(() => {
            if (!this.loadedHierarchie) {
                this._initAnimation();
                return;
            }

            const camera = this.experience.camera.modes.debug.instance;
            gsap.to(camera.position, {
                duration: 3.5,
                x: -2,
                y: 12.07873199620866,
                z: 7.845813161852047,
                onComplete: () => {
                    camera.update();
                },
                ease: 'power4.inOut',
            });
        }, 100);
    }

    resetAnimation() {
        return this._initAnimation();
    }

    resetPosition(duration = 1.2) {
        const body = this.experience.hierarchie['Face_Body_GEO'];
        const leftEar = this.experience.hierarchie['L_ears_GEO'];
        const rightEar = this.experience.hierarchie['R_ears_GEO'];
        const promises = [];
        this.isBusy = true;
        const bodyPromise = new Promise((resolve, reject) => {
            gsap.to(body.rotation, {
                duration: duration,
                z: this.startPosition[0],
                ease: 'power4.inOut',
                onComplete: () => {
                    this.isBusy = false
                    return resolve();
                }
            });
        });
        promises.push(bodyPromise);
        const leftEarPromise = new Promise((resolve, reject) => {
            gsap.to(leftEar.rotation, {
                duration: duration,
                z: this.startPosition[1],
                ease: 'power4.inOut',
                onComplete: () => {
                    this.isBusy = false
                    return resolve();
                }
            });
        });
        promises.push(leftEarPromise);
        const rightEarPromise = new Promise((resolve, reject) => {
            gsap.to(rightEar.rotation, {
                duration: duration,
                z: this.startPosition[2],
                ease: 'power4.inOut',
                onComplete: () => {
                    this.isBusy = false
                    return resolve();
                }
            });
        });
        promises.push(rightEarPromise);
        return Promise.all(promises);
    }

    getBodyRot() {
        const body = this.experience.hierarchie['Face_Body_GEO'].rotation.z;
        const earLeft = this.experience.hierarchie['L_ears_GEO'].rotation.z;
        const earRight = this.experience.hierarchie['R_ears_GEO'].rotation.z;
        return [body, earLeft, earRight];
    }

    degToRad(angle) {
        return (angle * Math.PI) / 180;
    }

    radToDeg(radians) {
        return radians * 180 / Math.PI;
    }

    movementDuration(angle, speed) {
        const degDuration = (speed / 360);
        return degDuration * angle;
    }

    moveBody(position = true, angle = 0, speed = 4) {
        const body = this.experience.hierarchie['Face_Body_GEO'];
        const rot = this.getBodyRot();
        this.isBusy = true;
        if (position) {
            if (angle > 360 || angle < 0) return;
            const currentPosition = Math.round(Math.abs(this.radToDeg(rot[0])));
            const distance = Math.abs(angle - currentPosition);
            const movementDuration = this.movementDuration(distance, speed);
            //    For debug
            // console.log("Angle : " + angle); // target angle
            // console.log("Current position :" + currentPosition); // current angle
            // console.log("distance " + distance);
            // console.log("gsap angle : " + angle);
            return new Promise((resolve, reject) => {
                gsap.to(body.rotation, {
                    duration: movementDuration,
                    z: this.degToRad(-angle),
                    ease: 'power4.inOut',
                    onComplete: () => {
                        if (angle === 360) {
                            body.rotation.z = 0;
                        }
                        this.isBusy = false;
                        return resolve();
                    }
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                gsap.to(body.rotation, {
                    duration: this.movementDuration(Math.abs(angle), speed),
                    z: rot[0] + this.degToRad(-angle),
                    ease: 'power4.inOut',
                    onComplete: () => {
                        this.isBusy = false;
                        body.rotation.z = this.getBodyRot()[0] % (2 * Math.PI);
                        return resolve();
                    }
                });
            });
        }
    }

    moveEars(ear = 'right', angle = 0, speed = 4) {
        const earLeft = this.experience.hierarchie['R_ears_GEO']; // inversé par rapport au robot
        const earRight = this.experience.hierarchie['L_ears_GEO'];
        this.isBusy = true;
        if (ear === 'random') {
            const ears = ['right', 'left', 'both'];
            ear = ears[Math.floor(Math.random() * ears.length)];
        }
        switch (ear) {
            case 'right':
                return new Promise((resolve, reject) => {
                    let movementDuration = this.movementDuration(Math.abs(angle - earRight.rotation.z), speed);
                    gsap.to(earRight.rotation, {
                        duration: movementDuration,
                        z: this.degToRad(-angle),
                        ease: 'power4.inOut',
                        onComplete: () => {
                            this.isBusy = false;
                            return resolve();
                        }
                    });
                });
            case 'left':
                return new Promise((resolve, reject) => {
                    let movementDuration = this.movementDuration(Math.abs(angle - earLeft.rotation.z), speed);
                    gsap.to(earLeft.rotation, {
                        duration: movementDuration,
                        z: this.degToRad(-angle),
                        ease: 'power4.inOut',
                        onComplete: () => {
                            this.isBusy = false;
                            return resolve();
                        }
                    });
                });
            case 'both':
                const rightEarPromise = new Promise(async (resolve, reject) => {
                    const movementDuration = this.movementDuration(Math.abs(angle - earRight.rotation.z), speed);
                    gsap.to(earRight.rotation, {
                        duration: movementDuration,
                        z: this.degToRad(-angle),
                        ease: 'power4.inOut',
                        onComplete: () => {
                            this.isBusy = false;
                            return resolve();
                        }
                    });
                });
                const leftEarPromise = new Promise(async (resolve, reject) => {
                    const movementDuration = this.movementDuration(Math.abs(angle - earLeft.rotation.z), speed);
                    gsap.to(earLeft.rotation, {
                        duration: movementDuration,
                        z: this.degToRad(-angle),
                        ease: 'power4.inOut',
                        onComplete: () => {
                            this.isBusy = false;
                            return resolve();
                        }
                    });
                });
                return Promise.all([rightEarPromise, leftEarPromise]);
        }
    }

    resetLEDS(side = 'both') {
        this.isBusy = true;
        return new Promise((resolve, reject) => {
            const LEDS = this.experience.hierarchie;
            let regex = "";
            switch (side) {
                case 'both':
                    regex = new RegExp(/LED_(L|R)_/g);
                    break;
                case 'L':
                    regex = new RegExp(/LED_L_/g);
                    break;
                case 'R':
                    regex = new RegExp(/LED_R_/g);
                    break;
            }
            Object.keys(LEDS).forEach((element) => {
                const led = LEDS[element];
                if (led.name.match(regex)) {
                    led.material.color.setRGB(0, 0, 0);
                    led.material.emissive.setRGB(0, 0, 0);
                    led.visible = false;
                }
            });
            this.isBusy = false;
            return resolve();
        });
    }

    getLEDsUp() {
        const LEDS = this.experience.hierarchie;
        const output = [];
        Object.keys(LEDS).forEach((element) => {
            const led = LEDS[element];
            if (led.name.match(/LED_(R|L)_/g) && led.visible) {
                output.push(`'${led.name}'`);
            }
        });
        return output.join(',');
    }

    setLEDS(leds) {
        if (typeof leds !== 'undefined' && leds.length > 0) {
            if (leds[0].includes('R')) {
                this.savedPattern[1] = leds;
            } else if (leds[0].includes('L')) {
                this.savedPattern[2] = leds;
            }
        }
        return new Promise((resolve, reject) => {
            leds.forEach((element) => {
                this.setLED(element);
            });
            return resolve();
        })
    }

    setLED(ledId) {
        const led = this.experience.hierarchie[ledId];
        led.visible = true;
        const material = led.material;
        material.color.setHex(0x5bd3ff);
        material.emissive.setHex(0x5bd3ff);
    }

    set_display_text(text, direction, transition = 7) {
        // 0 > 3 => replacement, 4 > 7 => scrolling
        const transitionSpeed = {
            0: 1000,
            1: 800,
            2: 500,
            3: 200,
            4: 500,
            5: 400,
            6: 300,
            7: 200,
        }
        // interval speed in ms
        const speed = transitionSpeed[transition];
        this.isBusy = true;
        return new Promise((resolve, reject) => {
            clearInterval(this.intervalLedAnim);
            this.resetLEDS();

            const initMatrix = new Array(16).fill(null).map(() => new Array(8).fill(0));
            const col = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

            if (text.length % 2 !== 0) text = text + ' ';

            for (let i = 0; i < text.length; i++) {
                const letter = ALPHABET_8X8[text[i]];
                initMatrix.push(...letter);
            }

            let leftIndex, rightIndex;
            if (direction === 'left') {
                leftIndex = 0;
                rightIndex = 8;
            } else { // 'right'
                leftIndex = initMatrix.length - 16;
                rightIndex = initMatrix.length - 8;
            }

            this.intervalLedAnim = setInterval(() => {
                this.resetLEDS();
                const LED_ARRAY = [];
                const left = initMatrix.slice(leftIndex, leftIndex + 8);
                const right = initMatrix.slice(rightIndex, rightIndex + 8);

                for (let j = 0; j < 8; j++) {
                    for (let k = 0; k < 8; k++) {
                        if (left[j][k] === 1) {
                            LED_ARRAY.push(`LED_L_${k + 1}${col[j]}`);
                        }
                        if (right[j][k] === 1) {
                            LED_ARRAY.push(`LED_R_${k + 1}${col[j]}`);
                        }
                    }
                }

                // Mise à jour des LEDs
                this.setLEDS(LED_ARRAY);

                if (direction === 'left') {
                    if (transition > 3) {
                        leftIndex++;
                        rightIndex++;
                    } else {
                        leftIndex = leftIndex + 16;
                        rightIndex = rightIndex + 16;
                    }
                    // Condition pour s'arrêter sur les deux derniers caractères
                    if (rightIndex > initMatrix.length - 8) {
                        this.isBusy = false;
                        resolve();
                        clearInterval(this.intervalLedAnim);
                    }
                } else { // 'right'
                    if (transition > 3) {
                        leftIndex--;
                        rightIndex--;
                    } else {
                        leftIndex = leftIndex - 16;
                        rightIndex = rightIndex - 16;
                    }
                    // Condition pour s'arrêter sur les deux derniers caractères
                    if (leftIndex < 16) {
                        this.isBusy = false;
                        resolve();
                        clearInterval(this.intervalLedAnim);
                    }
                }
            }, speed);
        });
    }

    convertBinaryToLedIds(binaryStr, row, side) {
        const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const ledIds = [];
        for (let i = 0; i < binaryStr.length; i++) {
            if (binaryStr[i] === '1') {
                ledIds.push(`LED_${side}_${row + 1}${columns[i]}`);
            }
        }
        return ledIds;
    }

    _rotMatrix(matrix, deg) {
        let tempMatrix = matrix.map(el => el.split(''));
        for (let step = 0; step < deg / 90; step++) {
            tempMatrix = this._rotate90(tempMatrix);
        }
        return tempMatrix.map(el => el.join(''));
    }

    _rotate90(matrix) {
        const newMatrix = [];
        const numRows = matrix.length;
        const numCols = matrix[0].length;

        for (let col = 0; col < numCols; col++) {
            newMatrix.push([]);
            for (let row = numRows - 1; row >= 0; row--) {
                newMatrix[col].push(matrix[row][col]);
            }
        }
        return newMatrix;
    }

    set_display_pattern(initialPattern, option, second_pattern = '') {
        this.resetLEDS();
        this.isBusy = true;
        return new Promise((resolve, reject) => {
            let pattern = initialPattern;
            const sidesOptions = {
                0: 'both',
                1: 'R',
                2: 'L',
                3: 'random',
                4: 'both',
                5: 'both',
                6: 'both',
                7: 'both',
                8: 'both',
            };

            if (option > 3) {
                switch (option) {
                    case 4:
                        pattern = initialPattern.reverse();
                        break;
                    case 5:
                        const tempPatternVert = [];
                        for (let i = 0; i < pattern.length; i++) {
                            const reversed = pattern[i].split('').reverse()
                            tempPatternVert.push(reversed.join(''));
                        }
                        pattern = tempPatternVert;
                        break;
                    case 6:
                        pattern = this._rotMatrix(pattern, 90);
                        break;
                    case 7:
                        pattern = this._rotMatrix(pattern, 180);
                        break;
                    case 8:
                        pattern = this._rotMatrix(pattern, 270);
                        break;
                }
            }

            let side = sidesOptions[option];
            if (side === 'random') {
                const sideOption = ['R', 'L', 'both'];
                side = sideOption[Math.floor(Math.random() * sideOption.length)];
            }

            if (side === 'both') {
                if (option > 3 && option < 9) {
                    let LEDS = '';
                    for (let i = 0; i < pattern.length; i++) {
                        LEDS += this.convertBinaryToLedIds(pattern[i], i, 'L').join(',');
                        LEDS += ',';
                    }
                    LEDS = LEDS.split(',').filter((led) => led.trim() !== '');
                    this.setLEDS(LEDS);
                    LEDS = '';
                    for (let i = 0; i < second_pattern.length; i++) {
                        LEDS += this.convertBinaryToLedIds(second_pattern[i], i, 'R').join(',');
                        LEDS += ',';
                    }
                    LEDS = LEDS.split(',').filter((led) => led.trim() !== '');
                    this.setLEDS(LEDS);
                } else {
                    let LEDS = '';
                    for (let i = 0; i < pattern.length; i++) {
                        LEDS += this.convertBinaryToLedIds(pattern[i], i, 'R').join(',');
                        LEDS += ',';
                    }
                    LEDS = LEDS.split(',').filter((led) => led.trim() !== '');
                    this.setLEDS(LEDS);
                    this.setLEDS(LEDS.map((ledId) => ledId.replace('R', 'L')));
                }
                this.isBusy = false;
                return resolve();
            }
            let LEDS = '';
            for (let i = 0; i < pattern.length; i++) {
                LEDS += this.convertBinaryToLedIds(pattern[i], i, side).join(',');
                LEDS += ',';
            }
            LEDS = LEDS.split(',').filter((led) => led.trim() !== '');
            this.setLEDS(LEDS);

            if (option === 1 || option == 2) {
                this.savedPattern[option] = LEDS;
                const otherSide = option === 1 ? 2 : 1;
                if (this.savedPattern[otherSide] !== null) {
                    this.setLEDS(this.savedPattern[otherSide]);
                }
            }
            this.isBusy = false;
            return resolve();
        });
    }

    shiftLeftLedId(ledId, shiftAmount) {
        const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        let parts = ledId.split('');

        let columnIndex = columns.indexOf(parts[parts.length - 1]);
        let newIndex = columnIndex - shiftAmount;

        while (newIndex < 0) {
            newIndex += columns.length;
        }

        parts[parts.length - 1] = columns[newIndex];
        return parts.join('');
    }

    set_display_1_digit(number, side = 'R') {
        const numberMatrix = ALPHABET_8X8[number];
        const col = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const LED_ARRAY = [];

        for (let j = 0; j < 8; j++) {
            for (let k = 0; k < 8; k++) {
                if (numberMatrix[j][k] === 1) {
                    LED_ARRAY.push(`LED_${side}_${k + 1}${col[j]}`);
                }
            }
        }
        // Mise à jour des LEDs
        this.setLEDS(LED_ARRAY);
    }

    set_display_2_digits(number, side = 'R') {
        const col = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        let offset = 0;

        for (let i = number.length - 1; i >= 0; i--) {
            let numberMatrix = ALPHABET_8X8[number[i]];
            for (let j = 0; j < 8; j++) {
                for (let k = 0; k < 8; k++) {
                    if (numberMatrix[j][k] === 1) {
                        let shiftedLedId = this.shiftLeftLedId(`LED_${side}_${k + 1}${col[j]}`, offset);
                        const ledEl = this.experience.hierarchie[shiftedLedId];
                        if (ledEl) {
                            ledEl.visible = true;
                            const material = ledEl.material;
                            material.color.setHex(0x5bd3ff);
                            material.emissive.setHex(0x5bd3ff);
                        }
                    }
                }

            }
            offset += 4;
        }
    }

    set_display_3_digits(number) {
        this.set_display_1_digit(number.substring(0, 1), 'L');
        this.set_display_2_digits(number.substring(1));
    }

    set_display_4_digits(number) {
        this.set_display_2_digits(number.substring(0, 2), 'L');
        this.set_display_2_digits(number.substring(2, 4));
    }

    async set_display_number(number) {
        this.isBusy = true;
        this.resetLEDS();
        switch (number.length) {
            case 1:
                this.set_display_1_digit(number);
                break;
            case 2:
                this.set_display_2_digits(number);
                break;
            case 3:
                this.set_display_3_digits(number);
                break;
            default:
                this.set_display_4_digits(number);
        }
        await sleep_ms(500);
        this.isBusy = false;
    }

    _rotPreset(pattern, deg, side, reverse = false) {
        let LEDS = '';
        pattern = this._rotMatrix(pattern, deg);
        // if need reverse
        const tempPatternVert = [];
        if (reverse) {
            for (let i = 0; i < pattern.length; i++) {
                const reversed = pattern[i].split('').reverse()
                tempPatternVert.push(reversed.join(''));
            }
            pattern = tempPatternVert;
        }
        for (let i = 0; i < pattern.length; i++) {
            LEDS += this.convertBinaryToLedIds(pattern[i], i, side).join(',');
            LEDS += ',';
        }
        LEDS = LEDS.split(',').filter((led) => led.trim() !== '');
        this.setLEDS(LEDS);
    }

    set_display_preset(firstPreset, secondPreset, option) {
        this.resetLEDS();
        this.isBusy = true;
        return new Promise((resolve, reject) => {
            switch (option) {
                case 0:
                    this.setLEDS(firstPreset[0]);
                    this.setLEDS(firstPreset[1]);
                    break;
                case 1:
                    this.setLEDS(firstPreset[0]);
                    this.setLEDS(this.savedPattern[2]);
                    break;
                case 2:
                    this.setLEDS(firstPreset[1]);
                    this.setLEDS(this.savedPattern[1]);
                    break;
                case 3:
                    const options = [0, 1, 2];
                    this.setLEDS(firstPreset, secondPreset, options[Math.floor(Math.random() * options.length)]);
                    break;
                case 4:
                    const copy_firstPreset = [...firstPreset]; // to not modify the original array
                    const copy_secondPreset = [...secondPreset]; // to not modify the original array
                    this.set_display_pattern(copy_firstPreset.reverse(), 2);
                    this.set_display_pattern(copy_secondPreset.reverse(), 1);
                    break;
                case 5:
                    const tempPatternVertLeft = [];
                    const copy_first = [...firstPreset]; // to not modify the original array
                    for (let i = 0; i < copy_first.length; i++) {
                        const reversedLeft = copy_first[i].split('').reverse()
                        tempPatternVertLeft.push(reversedLeft.join(''));
                    }
                    this.set_display_pattern(tempPatternVertLeft, 2);

                    const tempPatternVertRight = [];
                    const copy_second = [...secondPreset]; // to not modify the original array
                    for (let i = 0; i < copy_second.length; i++) {
                        const reversedRight = copy_second[i].split('').reverse()
                        tempPatternVertRight.push(reversedRight.join(''));
                    }
                    this.set_display_pattern(tempPatternVertRight, 1);
                    break;
                case 6:
                    this._rotPreset(firstPreset, 90, 'L');
                    this._rotPreset(secondPreset, 90, 'R');
                    break;
                case 7:
                    this._rotPreset(firstPreset, 180, 'L');
                    this._rotPreset(secondPreset, 180, 'R');
                    break;
                case 8:
                    this._rotPreset(firstPreset, 270, 'L');
                    this._rotPreset(secondPreset, 270, 'R');
                    break;
                case 9:
                    this.setLEDS(firstPreset[1]);
                    this.setLEDS(secondPreset[0]);
                    break;
            }
            this.isBusy = false;
            return resolve()
        });
    }
}

window.Simulator3D = new Simulator3d(config);