/**
 * @fileoverview IA blocks for BBC micro:bit.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // BLOCK VOICE RECOGNITION _ SET VOLUME
    {
        "type": "ia_voiceRecognition_setVolume",
        "message0": "%{BKY_IA_VOICERECOGNITION_SET_VOLUME_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "VOLUME",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ia_blocks",
        "tooltip": "%{BKY_IA_VOICERECOGNITION_SET_VOLUME_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // BLOCK VOICE RECOGNITION _ GET COMMAND ID
    {
        "type": "ia_voiceRecognition_getCMDID",
        "message0": "%{BKY_IA_VOICERECOGNITION_GET_CMDID_TITLE}",
        "output": "Number",
        "style": "ia_blocks",
        "tooltip": "%{BKY_IA_VOICERECOGNITION_GET_CMDID_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // BLOCK VOICE RECOGNITION _ ON FIXED COMMAND
    {
        "type": "ia_voiceRecognition_onCommand",
        "message0": "%{BKY_IA_VOICERECOGNITION_ON_COMMAND_TITLE}",
        "args0": [{
            "type": "field_search_dropdown",
            "name": "ID",
            "columns": 2,
            // phrases à prononcer en anglais (module SEN0539-EN), donc non traduites
            "options": [
                ["Go forward (22)", "22"],
                ["Retreat (23)", "23"],
                ["Park a car (24)", "24"],
                ["Turn left ninety degrees (25)", "25"],
                ["Turn left forty-five degrees (26)", "26"],
                ["Turn left thirty degrees (27)", "27"],
                ["Turn right ninety degrees (28)", "28"],
                ["Turn right forty-five degrees (29)", "29"],
                ["Turn right thirty degrees (30)", "30"],
                ["Shift down a gear (31)", "31"],
                ["Line tracking mode (32)", "32"],
                ["Light tracking mode (33)", "33"],
                ["Bluetooth mode (34)", "34"],
                ["Obstacle avoidance mode (35)", "35"],
                ["Face recognition (36)", "36"],
                ["Object tracking (37)", "37"],
                ["Object recognition (38)", "38"],
                ["Line tracking (39)", "39"],
                ["Color recognition (40)", "40"],
                ["Tag recognition (41)", "41"],
                ["Object sorting (42)", "42"],
                ["Qr code recognition (43)", "43"],
                ["General settings (44)", "44"],
                ["Clear screen (45)", "45"],
                ["Learn once (46)", "46"],
                ["Forget (47)", "47"],
                ["Load model (48)", "48"],
                ["Save model (49)", "49"],
                ["Take photos and save them (50)", "50"],
                ["Save and return (51)", "51"],
                ["Display number zero (52)", "52"],
                ["Display number one (53)", "53"],
                ["Display number two (54)", "54"],
                ["Display number three (55)", "55"],
                ["Display number four (56)", "56"],
                ["Display number five (57)", "57"],
                ["Display number six (58)", "58"],
                ["Display number seven (59)", "59"],
                ["Display number eight (60)", "60"],
                ["Display number nine (61)", "61"],
                ["Display smiley face (62)", "62"],
                ["Display crying face (63)", "63"],
                ["Display heart (64)", "64"],
                ["Turn off dot matrix (65)", "65"],
                ["Read current posture (66)", "66"],
                ["Read ambient light (67)", "67"],
                ["Read compass (68)", "68"],
                ["Read temperature (69)", "69"],
                ["Read acceleration (70)", "70"],
                ["Reading sound intensity (71)", "71"],
                ["Calibrate electronic gyroscope (72)", "72"],
                ["Turn on the camera (73)", "73"],
                ["Turn off the camera (74)", "74"],
                ["Turn on the fan (75)", "75"],
                ["Turn off the fan (76)", "76"],
                ["Turn fan speed to gear one (77)", "77"],
                ["Turn fan speed to gear two (78)", "78"],
                ["Turn fan speed to gear three (79)", "79"],
                ["Start oscillating (80)", "80"],
                ["Stop oscillating (81)", "81"],
                ["Reset (82)", "82"],
                ["Set servo to ten degrees (83)", "83"],
                ["Set servo to thirty degrees (84)", "84"],
                ["Set servo to forty-five degrees (85)", "85"],
                ["Set servo to sixty degrees (86)", "86"],
                ["Set servo to ninety degrees (87)", "87"],
                ["Turn on the buzzer (88)", "88"],
                ["Turn off the buzzer (89)", "89"],
                ["Turn on the speaker (90)", "90"],
                ["Turn off the speaker (91)", "91"],
                ["Play music (92)", "92"],
                ["Stop playing (93)", "93"],
                ["The last track (94)", "94"],
                ["The next track (95)", "95"],
                ["Repeat this track (96)", "96"],
                ["Volume up (97)", "97"],
                ["Volume down (98)", "98"],
                ["Change volume to maximum (99)", "99"],
                ["Change volume to minimum (100)", "100"],
                ["Change volume to medium (101)", "101"],
                ["Play poem (102)", "102"],
                ["Turn on the light (103)", "103"],
                ["Turn off the light (104)", "104"],
                ["Brighten the light (105)", "105"],
                ["Dim the light (106)", "106"],
                ["Adjust brightness to maximum (107)", "107"],
                ["Adjust brightness to minimum (108)", "108"],
                ["Increase color temperature (109)", "109"],
                ["Decrease color temperature (110)", "110"],
                ["Adjust color temperature to maximum (111)", "111"],
                ["Adjust color temperature to minimum (112)", "112"],
                ["Daylight mode (113)", "113"],
                ["Moonlight mode (114)", "114"],
                ["Color mode (115)", "115"],
                ["Set to red (116)", "116"],
                ["Set to orange (117)", "117"],
                ["Set to yellow (118)", "118"],
                ["Set to green (119)", "119"],
                ["Set to cyan (120)", "120"],
                ["Set to blue (121)", "121"],
                ["Set to purple (122)", "122"],
                ["Set to white (123)", "123"],
                ["Turn on ac (124)", "124"],
                ["Turn off ac (125)", "125"],
                ["Increase temperature (126)", "126"],
                ["Decrease temperature (127)", "127"],
                ["Cool mode (128)", "128"],
                ["Heat mode (129)", "129"],
                ["Auto mode (130)", "130"],
                ["Dry mode (131)", "131"],
                ["Fan mode (132)", "132"],
                ["Enable blowing up and down (133)", "133"],
                ["Disable blowing up and down (134)", "134"],
                ["Enable blowing right and left (135)", "135"],
                ["Disable blowing right and left (136)", "136"],
                ["Open the window (137)", "137"],
                ["Close the window (138)", "138"],
                ["Open curtain (139)", "139"],
                ["Close curtain (140)", "140"],
                ["Open the door (141)", "141"],
                ["Close the door (142)", "142"]
            ]
        }],
        "message1": "%1",
        "args1": [{
            "type": "input_statement",
            "name": "DO"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "style": "ia_blocks",
        "tooltip": "%{BKY_IA_VOICERECOGNITION_ON_COMMAND_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    // BLOCK VOICE RECOGNITION _ PLAY BY COMMAND ID
    {
        "type": "ia_voiceRecognition_playByCMDID",
        "message0": "%{BKY_IA_VOICERECOGNITION_PLAY_BY_CMDID_TITLE}",
        "args0": [{
            "type": "input_value",
            "name": "ID",
            "check": "Number"
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "ia_blocks",
        "tooltip": "%{BKY_IA_VOICERECOGNITION_PLAY_BY_CMDID_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }

]); // END JSON EXTRACT (Do not delete this comment.)

// Legacy types (before move to IA category), kept for saved projects
['setVolume', 'getCMDID', 'onCommand', 'playByCMDID'].forEach(function (name) {
    Blockly.Blocks['communication_voiceRecognition_' + name] = Blockly.Blocks['ia_voiceRecognition_' + name];
});
