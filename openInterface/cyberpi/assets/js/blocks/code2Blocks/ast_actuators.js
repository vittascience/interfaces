import utils from '/openInterface/interfaces/assets/js/code2blocks/python/utils/utils.js';

// ========== AUDIO BLOCKS ==========

// CyberPi Audio Play
utils.prototypeBlocks['cyberpi.audio.play'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultSound = 'hi';
    let soundArg = defaultSound;
    
    if (statementsNode && statementsNode[0] && statementsNode[0].type === 'string') {
        soundArg = statementsNode[0].text.replace(/["']/g, '');
    }
    
    // Validate sound against available options
    const validSounds = ['hi', 'bye', 'yeah', 'wow', 'laugh', 'hum', 'sad', 'sigh', 
                        'annoyed', 'angry', 'surprised', 'yummy', 'curious', 'embarrassed', 'ready', 'sprint'];
    if (!validSounds.includes(soundArg)) {
        soundArg = defaultSound;
    }
    
    return {
        type: 'actuators_audio_play',
        fields: {
            SOUND: soundArg
        },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};

// CyberPi Audio Play Tone
utils.prototypeBlocks['cyberpi.audio.play_tone'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultFrequency = { type: 'integer', text: '440' };
    const defaultDuration = { type: 'integer', text: '1' };
    
    const frequencyArg = (statementsNode && statementsNode[0]) ? statementsNode[0] : defaultFrequency;
    const hasDuration = statementsNode && statementsNode.length > 1;
    const durationArg = hasDuration ? statementsNode[1] : defaultDuration;
    
    const blockDef = {
        type: 'actuators_audio_play_tone',
        fields: {},
        values: {
            FREQUENCY: null
        },
        mutations: {
            duration: hasDuration
        },
        statementsNode: {
            FREQUENCY: frequencyArg
        },
        statement: null
    };
    
    if (hasDuration) {
        blockDef.values.DURATION = null;
        blockDef.statementsNode.DURATION = durationArg;
    }
    
    return blockDef;
};

// CyberPi Audio Play Note (mapped to play_music)
utils.prototypeBlocks['cyberpi.audio.play_music'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultNote = { type: 'integer', text: '60' };
    const defaultDuration = { type: 'integer', text: '0.5' };
    
    const noteArg = (statementsNode && statementsNode[0]) ? statementsNode[0] : defaultNote;
    const durationArg = (statementsNode && statementsNode[1]) ? statementsNode[1] : defaultDuration;
    
    return {
        type: 'actuators_audio_play_note',
        fields: {},
        values: {
            NOTE: null,
            DURATION: null
        },
        mutations: null,
        statementsNode: {
            NOTE: noteArg,
            DURATION: durationArg
        },
        statement: null
    };
};

// CyberPi Audio Play Drum
utils.prototypeBlocks['cyberpi.audio.play_drum'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultDrum = 'snare';
    const defaultDuration = { type: 'integer', text: '0.5' };
    
    let drumArg = defaultDrum;
    if (statementsNode && statementsNode[0] && statementsNode[0].type === 'string') {
        drumArg = statementsNode[0].text.replace(/["']/g, '');
    }
    
    // Validate drum against available options
    const validDrums = ['snare', 'bass-drum', 'side-stick', 'crash-cymbal', 'open-hi-hat', 
                       'closed-hi-hat', 'tamourine', 'hand-clap', 'claves'];
    if (!validDrums.includes(drumArg)) {
        drumArg = defaultDrum;
    }
    
    const durationArg = (statementsNode && statementsNode[1]) ? statementsNode[1] : defaultDuration;
    
    return {
        type: 'actuators_audio_play_drum',
        fields: {
            SONG: drumArg
        },
        values: {
            DURATION: null
        },
        mutations: null,
        statementsNode: {
            DURATION: durationArg
        },
        statement: null
    };
};

// CyberPi Audio Recording Functions
utils.prototypeBlocks['cyberpi.audio.record'] = function (type, identifier, values, mutations, statementsNode, statement) {
    return {
        type: 'actuators_audio_start_recording',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};

utils.prototypeBlocks['cyberpi.audio.stop_record'] = function (type, identifier, values, mutations, statementsNode, statement) {
    return {
        type: 'actuators_audio_stop_recording',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};

utils.prototypeBlocks['cyberpi.audio.play_record'] = function (type, identifier, values, mutations, statementsNode, statement) {
    return {
        type: 'actuators_audio_play_recording',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};

// CyberPi Audio Tempo Functions
utils.prototypeBlocks['cyberpi.audio.add_tempo'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultTempo = { type: 'integer', text: '0' };
    const tempoArg = (statementsNode && statementsNode[0]) ? statementsNode[0] : defaultTempo;
    
    return {
        type: 'actuators_audio_add_tempo',
        fields: {},
        values: {
            TEMPO: null
        },
        mutations: null,
        statementsNode: {
            TEMPO: tempoArg
        },
        statement: null
    };
};

utils.prototypeBlocks['cyberpi.audio.set_tempo'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultTempo = { type: 'integer', text: '60' };
    const tempoArg = (statementsNode && statementsNode[0]) ? statementsNode[0] : defaultTempo;
    
    return {
        type: 'actuators_audio_set_tempo',
        fields: {},
        values: {
            TEMPO: null
        },
        mutations: null,
        statementsNode: {
            TEMPO: tempoArg
        },
        statement: null
    };
};

utils.prototypeBlocks['cyberpi.audio.get_tempo'] = function (type, identifier, values, mutations, statementsNode, statement) {
    return {
        type: 'actuators_audio_get_tempo',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};

// CyberPi Audio Volume Functions
utils.prototypeBlocks['cyberpi.audio.add_vol'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultVolume = { type: 'integer', text: '0' };
    const volumeArg = (statementsNode && statementsNode[0]) ? statementsNode[0] : defaultVolume;
    
    return {
        type: 'actuators_audio_add_volume',
        fields: {},
        values: {
            VOLUME: null
        },
        mutations: null,
        statementsNode: {
            VOLUME: volumeArg
        },
        statement: null
    };
};

utils.prototypeBlocks['cyberpi.audio.set_vol'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultVolume = { type: 'integer', text: '50' };
    const volumeArg = (statementsNode && statementsNode[0]) ? statementsNode[0] : defaultVolume;
    
    return {
        type: 'actuators_audio_set_volume',
        fields: {},
        values: {
            VOLUME: null
        },
        mutations: null,
        statementsNode: {
            VOLUME: volumeArg
        },
        statement: null
    };
};

utils.prototypeBlocks['cyberpi.audio.get_vol'] = function (type, identifier, values, mutations, statementsNode, statement) {
    return {
        type: 'actuators_audio_get_volume',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};

// CyberPi Audio Stop
utils.prototypeBlocks['cyberpi.audio.stop'] = function (type, identifier, values, mutations, statementsNode, statement) {
    return {
        type: 'actuators_audio_stop',
        fields: {},
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};

// ========== MOTOR BLOCKS (mBot2) ==========

// mBot2 Motor Set Power
utils.prototypeBlocks['mbot2.motor_set'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultPower = { type: 'integer', text: '0' };
    const defaultMotor = 'M1';
    
    const powerArg = (statementsNode && statementsNode[0]) ? statementsNode[0] : defaultPower;
    let motorArg = defaultMotor;
    
    if (statementsNode && statementsNode[1] && statementsNode[1].type === 'string') {
        motorArg = statementsNode[1].text.replace(/["']/g, '');
    }
    
    // Validate motor
    const validMotors = ['M1', 'M2', 'all'];
    if (!validMotors.includes(motorArg)) {
        motorArg = defaultMotor;
    }
    
    return {
        type: 'mbot2_motors_set_power',
        fields: {
            MOTOR: motorArg
        },
        values: {
            POWER: null
        },
        mutations: null,
        statementsNode: {
            POWER: powerArg
        },
        statement: null
    };
};

// mBot2 Motor Add Power
utils.prototypeBlocks['mbot2.motor_add'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultPower = { type: 'integer', text: '0' };
    const defaultMotor = 'M1';
    
    const powerArg = (statementsNode && statementsNode[0]) ? statementsNode[0] : defaultPower;
    let motorArg = defaultMotor;
    
    if (statementsNode && statementsNode[1] && statementsNode[1].type === 'string') {
        motorArg = statementsNode[1].text.replace(/["']/g, '');
    }
    
    // Validate motor
    const validMotors = ['M1', 'M2', 'all'];
    if (!validMotors.includes(motorArg)) {
        motorArg = defaultMotor;
    }
    
    return {
        type: 'mbot2_motors_add_power',
        fields: {
            MOTOR: motorArg
        },
        values: {
            POWER: null
        },
        mutations: null,
        statementsNode: {
            POWER: powerArg
        },
        statement: null
    };
};

// mBot2 Motor Get Power
utils.prototypeBlocks['mbot2.motor_get'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultMotor = 'M1';
    let motorArg = defaultMotor;
    
    if (statementsNode && statementsNode[0] && statementsNode[0].type === 'string') {
        motorArg = statementsNode[0].text.replace(/["']/g, '');
    }
    
    // Validate motor
    const validMotors = ['M1', 'M2', 'all'];
    if (!validMotors.includes(motorArg)) {
        motorArg = defaultMotor;
    }
    
    return {
        type: 'mbot2_motors_get_power',
        fields: {
            MOTOR: motorArg
        },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};

// mBot2 Motor Stop
utils.prototypeBlocks['mbot2.motor_stop'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultMotor = 'all';
    let motorArg = defaultMotor;
    
    if (statementsNode && statementsNode[0] && statementsNode[0].type === 'string') {
        motorArg = statementsNode[0].text.replace(/["']/g, '');
    }
    
    // Validate motor
    const validMotors = ['M1', 'M2', 'all'];
    if (!validMotors.includes(motorArg)) {
        motorArg = defaultMotor;
    }
    
    return {
        type: 'mbot2_motors_stop',
        fields: {
            MOTOR: motorArg
        },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};

// ========== SERVO BLOCKS (mBot2) ==========

// mBot2 Servo Set Angle
utils.prototypeBlocks['mbot2.servo_set'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultAngle = { type: 'integer', text: '90' };
    const defaultPort = 'S1';
    
    const angleArg = (statementsNode && statementsNode[0]) ? statementsNode[0] : defaultAngle;
    let portArg = defaultPort;
    
    if (statementsNode && statementsNode[1] && statementsNode[1].type === 'string') {
        portArg = statementsNode[1].text.replace(/["']/g, '');
    }
    
    // Validate port
    const validPorts = ['S1', 'S2', 'S3', 'S4', 'all'];
    if (!validPorts.includes(portArg)) {
        portArg = defaultPort;
    }
    
    return {
        type: 'mbot2_servos_set_angle',
        fields: {
            PORT: portArg
        },
        values: {
            ANGLE: null
        },
        mutations: null,
        statementsNode: {
            ANGLE: angleArg
        },
        statement: null
    };
};

// mBot2 Servo Add Angle
utils.prototypeBlocks['mbot2.servo_add'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultAngle = { type: 'integer', text: '10' };
    const defaultPort = 'S1';
    
    const angleArg = (statementsNode && statementsNode[0]) ? statementsNode[0] : defaultAngle;
    let portArg = defaultPort;
    
    if (statementsNode && statementsNode[1] && statementsNode[1].type === 'string') {
        portArg = statementsNode[1].text.replace(/["']/g, '');
    }
    
    // Validate port
    const validPorts = ['S1', 'S2', 'S3', 'S4', 'all'];
    if (!validPorts.includes(portArg)) {
        portArg = defaultPort;
    }
    
    return {
        type: 'mbot2_servos_add_angle',
        fields: {
            PORT: portArg
        },
        values: {
            ANGLE: null
        },
        mutations: null,
        statementsNode: {
            ANGLE: angleArg
        },
        statement: null
    };
};

// mBot2 Servo Get Angle
utils.prototypeBlocks['mbot2.servo_get'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultPort = 'S1';
    let portArg = defaultPort;
    
    if (statementsNode && statementsNode[0] && statementsNode[0].type === 'string') {
        portArg = statementsNode[0].text.replace(/["']/g, '');
    }
    
    // Validate port
    const validPorts = ['S1', 'S2', 'S3', 'S4', 'all'];
    if (!validPorts.includes(portArg)) {
        portArg = defaultPort;
    }
    
    return {
        type: 'mbot2_servos_get_angle',
        fields: {
            PORT: portArg
        },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};

// mBot2 Servo Reset (mapped to servo_set with angle 0)
utils.prototypeBlocks['mbot2.servo_reset'] = function (type, identifier, values, mutations, statementsNode, statement) {
    const defaultPort = 'S1';
    let portArg = defaultPort;
    
    if (statementsNode && statementsNode[0] && statementsNode[0].type === 'string') {
        portArg = statementsNode[0].text.replace(/["']/g, '');
    }
    
    // Validate port
    const validPorts = ['S1', 'S2', 'S3', 'S4', 'all'];
    if (!validPorts.includes(portArg)) {
        portArg = defaultPort;
    }
    
    return {
        type: 'mbot2_servos_reset',
        fields: {
            PORT: portArg
        },
        values: {},
        mutations: null,
        statementsNode: {},
        statement: null
    };
};