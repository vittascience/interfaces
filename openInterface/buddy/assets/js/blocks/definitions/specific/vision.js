/**
 * @fileoverview Vision blocks for Buddy.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
{
    "type": "vision_startCamera",
    "message0": "%{BKY_VISION_START_CAMERA_TITLE}",
    "args0" : [{
        "type": "field_grid_dropdown",
        "name": "LOCK",
        "options": [
            [{
                'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                'width': 12,
                'height': 12,
                'alt': 'Lock'
            }, "True"],
            [{
                'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                'width': 12,
                'height': 12,
                'alt': 'Lock'
            }, "False"],
        ]
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_START_CAMERA_TOOLTIP}",
    "extensions" : [
        "block_init_helpurl",
        "lock_tooltip"
    ]
},
{
    "type": "vision_stopCamera",
    "message0": "%{BKY_VISION_STOP_CAMERA_TITLE}", 
    "args0" : [{
        "type": "field_grid_dropdown",
        "name": "LOCK",
        "options": [
            [{
                'src': _PATH + '/buddy/assets/media/blocks_lock/lock-solid.svg',
                'width': 12,
                'height': 12,
                'alt': 'Lock'
            }, "True"],
            [{
                'src': _PATH + '/buddy/assets/media/blocks_lock/lock-open-solid.svg',
                'width': 12,
                'height': 12,
                'alt': 'Lock'
            }, "False"],
        ]
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_STOP_CAMERA_TOOLTIP}",
    "extensions" : [
        "block_init_helpurl",
        "lock_tooltip"
    ]
},
{
    "type": "vision_detectArucoMarkers",
    "message0": "%{BKY_VISION_DETECT_ARUKO_MARKERS_TITLE}",
    "output": "Array",
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_DETECT_ARUKO_MARKERS_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vision_detectFaces",
    "message0": "%{BKY_VISION_DETECT_FACES_TITLE}",
    "output": "Array",
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_DETECT_FACES_TOOLTIP}",
    "extensions": [
        "block_init_helpurl",
        "block_buttons_plus_minus",
        "vision_detect_faces_init_extension"
    ],
    "mutator" : "vision_detect_faces_thres_mutator",
},
{
    "type": "vision_ifPersonDetected",
    "message0": "%{BKY_VISION_IF_PERSON_DETECTED_TITLE}",
    "args0": [{
        "type": "field_grid_dropdown",
        "name": "STATE",
        "options": [
            ["%{BKY_SENSORS_ISDETECTED}", "is"],
            ["%{BKY_SENSORS_ISNTTOUCHED}", "isnt"],
        ]
    }],
    "message1": "%1",
    "args1": [{
        "type": "input_statement",
        "name": "DO"
    }],
    "style": "vision_hat_blocks",
    "tooltip": "%{BKY_VISION_IF_PERSON_DETECTED_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vision_ifPersonDetectedInArea",
    "message0": "%{BKY_VISION_IF_PERSON_DETECTED_IN_AREA_TITLE}",
    "args0": [{
        "type": "field_grid_dropdown",
        "name": "AREA",
        "options": [
            ["%{BKY_VISION_DETECTION_AREA_CENTER}", "CENTER"],
            ["%{BKY_VISION_DETECTION_AREA_RIGHT}", "RIGHT"],
            ["%{BKY_VISION_DETECTION_AREA_LEFT}", "LEFT"],
        ]
    },
    {
        "type": "field_grid_dropdown",
        "name": "STATE",
        "options": [
            ["%{BKY_SENSORS_ISDETECTED}", "is"],
            ["%{BKY_SENSORS_ISNTTOUCHED}", "isnt"],
        ]
    }],
    "message1": "%1",
    "args1": [{
        "type": "input_statement",
        "name": "DO"
    }],
    "style": "vision_hat_blocks",
    "tooltip": "%{BKY_VISION_IF_PERSON_DETECTED_IN_AREA_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vision_detectPerson",
    "message0": "%{BKY_VISION_DETECT_PERSON_TITLE}",
    "output": "Array",
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_DETECT_PERSON_TOOLTIP}",
    "extensions": [
        "block_init_helpurl",
        "block_buttons_plus_minus",
        "vision_detect_person_init_extension"
    ],
    "mutator" : "vision_detect_person_thres_mutator",
},
{
    "type": "vision_startMotionDetection",
    "message0": "%{BKY_VISION_START_MOTION_DETECTION_TITLE}",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_START_MOTION_DETECTION_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vision_stopMotionDetection",
    "message0": "%{BKY_VISION_STOP_MOTION_DETECTION_TITLE}",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_STOP_MOTION_DETECTION_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vision_motionDetect",
    "message0": "%{BKY_VISION_MOTION_DETECT_TITLE}",
    "output": "Boolean",
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_MOTION_DETECT_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vision_setMotionThres",
    "message0": "%{BKY_VISION_SET_MOTION_THRES_TITLE}",
    "args0": [{
        "type": "input_value",
        "name": "THRES",
        "check": "Number"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": true,
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_SET_MOTION_THRES_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ],
},
{
    "type": "vision_motionDetectWithThres",
    "message0": "%{BKY_VISION_MOTION_DETECT_WITH_TRESH_TITLE}",
    "args0": [{
        "type": "input_value",
        "name": "THRES",
        "check": "Number"
    }],
    "output": "Boolean",
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_MOTION_DETECT_WITH_TRESH_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ],
},
{
    "type": "vision_getMotionDetection",
    "message0": "%{BKY_VISION_GET_MOTION_DETECTION_TITLE}",
    "output": "Array",
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_GET_MOTION_DETECTION_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vision_startVisualTracking",
    "message0": "%{BKY_VISION_START_VISUAL_TRACKING_TITLE}",
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": true,
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_START_VISUAL_TRACKING_TOOLTIP}",
    "extensions": [
        "block_init_helpurl",
        "block_buttons_plus_minus",
        "vision_start_visual_tracking_init_extension"
    ],
    "mutator" : "vision_start_visual_tracking_thres_mutator",
},
{
    "type": "vision_stopVisualTracking",
    "message0": "%{BKY_VISION_STOP_VISUAL_TRACKING_TITLE}",
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": true,
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_STOP_VISUAL_TRACKING_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ],
},
{
    "type": "vision_getTracking",
    "message0": "%{BKY_VISION_GET_TRACKING_TITLE}",
    "output": "Array",
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_GET_TRACKING_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vision_getGrandAngleFrame",
    "message0": "%{BKY_VISION_GET_GRAND_ANGLE_FRAME_TITLE}",
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": true,
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_GET_GRAND_ANGLE_FRAME_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
{
    "type": "vision_getCVResultFrame",
    "message0": "%{BKY_VISION_GET_CV_RESULT_FRAME_TITLE}",
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": true,
    "style": "vision_blocks",
    "tooltip": "%{BKY_VISION_GET_CV_RESULT_FRAME_TOOLTIP}",
    "extensions": [
        "block_init_helpurl"
    ]
},
]); // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Vision = Object.create(null);

/**
* Performs final setup of 'vision_detectFaces' block.
* @this {Blockly.Block}
*/
Blockly.Constants.Vision.VISION_DETECT_FACES_INIT_EXTENSION = function () {
this.thres_ = false;
this.update_();
this.setInputsInline(true);
};

/**
* Mixin for mutator functions in the 'VISION_DETECT_FACES_THRES' extension.
* @mixin
* @augments Blockly.Block
* @package
*/
Blockly.Constants.Vision.VISION_DETECT_FACES_THRES_MIXIN =
Blockly.Constants.Utils.addOptionMutatorMixin('thres', 'VISION_DETECT_FACES_THRES', 'input', 0.8);


// Initialization extensions
Blockly.Extensions.register("vision_detect_faces_init_extension",
Blockly.Constants.Vision.VISION_DETECT_FACES_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('vision_detect_faces_thres_mutator',
Blockly.Constants.Vision.VISION_DETECT_FACES_THRES_MIXIN);

/**
* Performs final setup of 'vision_detectPerson' block.
* @this {Blockly.Block}
*/
Blockly.Constants.Vision.VISION_DETECT_PERSON_INIT_EXTENSION = function () {
this.thres_ = false;
this.update_();
this.setInputsInline(true);
};

/**
* Mixin for mutator functions in the 'VISION_DETECT_PERSON_THRES' extension.
* @mixin
* @augments Blockly.Block
* @package
*/
Blockly.Constants.Vision.VISION_DETECT_PERSON_THRES_MIXIN =
Blockly.Constants.Utils.addOptionMutatorMixin('thres', 'VISION_DETECT_PERSON_THRES', 'input', 0.8);


// Initialization extensions
Blockly.Extensions.register("vision_detect_person_init_extension",
Blockly.Constants.Vision.VISION_DETECT_PERSON_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('vision_detect_person_thres_mutator',
Blockly.Constants.Vision.VISION_DETECT_PERSON_THRES_MIXIN);

/**
* Performs final setup of 'vision_startVisualTracking' block.
* @this {Blockly.Block}
*/
Blockly.Constants.Vision.VISION_START_VISUAL_TRACKING_INIT_EXTENSION = function () {
this.thres_ = false;
this.update_();
this.setInputsInline(true);
};

/**
* Mixin for mutator functions in the 'VISION_START_VISUAL_TRACKING' extension.
* @mixin
* @augments Blockly.Block
* @package
*/
Blockly.Constants.Vision.VISION_START_VISUAL_TRACKING_THRES_MIXIN =
Blockly.Constants.Utils.addOptionMutatorMixin('thres', 'VISION_START_VISUAL_TRACKING_THRES', 'input', 0.8);


// Initialization extensions
Blockly.Extensions.register("vision_start_visual_tracking_init_extension",
Blockly.Constants.Vision.VISION_START_VISUAL_TRACKING_INIT_EXTENSION);

// Mutator
Blockly.Extensions.registerMutator('vision_start_visual_tracking_thres_mutator',
Blockly.Constants.Vision.VISION_START_VISUAL_TRACKING_THRES_MIXIN);