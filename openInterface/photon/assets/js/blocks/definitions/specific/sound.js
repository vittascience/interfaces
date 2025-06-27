/**
 * @fileoverview Sound blocks for Photon.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
    {
        "type": "sound_animal",
        "message0": "%{BKY_SOUND_ANIMAL_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "ANIMAL",
            "options": [
                ["%{BKY_SOUND_DOG}", "dog"],
                ["%{BKY_SOUND_RANDOM}", "random"],
                ["%{BKY_SOUND_COW}", "cow"],
                ["%{BKY_SOUND_BOAR}", "boar"],
                ["%{BKY_SOUND_CHICK}", "chick"],
                ["%{BKY_SOUND_FROG}", "frog"],
                ["%{BKY_SOUND_SHEEP}", "sheep"],
                ["%{BKY_SOUND_CUCKOO}", "cuckoo"],
                ["%{BKY_SOUND_WOLF}", "wolf"],
                ["%{BKY_SOUND_CHICKEN}", "chicken"],
                ["%{BKY_SOUND_DONKEY}", "donkey"],
                ["%{BKY_SOUND_OWL}", "owl"],
                ["%{BKY_SOUND_GOAT}", "goat"],
                ["%{BKY_SOUND_ROOSTER}", "rooster"],
                ["%{BKY_SOUND_ANGRY_DOG}", "angry_dog"],
                ["%{BKY_SOUND_PIG}", "pig"],
                ["%{BKY_SOUND_CAT}", "cat"],
                ["%{BKY_SOUND_HORSE}", "horse"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "sound_blocks",
        "tooltip": "%{BKY_SOUND_ANIMAL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sound_emotion",
        "message0": "%{BKY_SOUND_EMOTION_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "EMOTION",
            "options": [
                ["%{BKY_SOUND_YAHOO}", "yahoo"],
                ["%{BKY_SOUND_RANDOM}", "random"],
                ["%{BKY_SOUND_AAA}", "aaa"],
                ["%{BKY_SOUND_APPROVAL}", "approval"],
                ["%{BKY_SOUND_BE_BE_BE}", "be_be_be"],
                ["%{BKY_SOUND_CHANGE_DECISION}", "change_decision"],
                ["%{BKY_SOUND_YUCK}", "yuck"],
                ["%{BKY_SOUND_LAUGHING_MAD}", "laughing_mad"],
                ["%{BKY_SOUND_NICE}", "nice"],
                ["%{BKY_SOUND_OOO}", "ooo"],
                ["%{BKY_SOUND_ANGER}", "anger"],
                ["%{BKY_SOUND_FEAR}", "fear"],
                ["%{BKY_SOUND_SAD}", "sad"],
                ["%{BKY_SOUND_SIGH}", "sigh"],
                ["%{BKY_SOUND_DISAGREEMENT}", "disagreement"],
                ["%{BKY_SOUND_PPLPLPLPLP}", "pplplplplp"],
                ["%{BKY_SOUND_WOW}", "wow"],
                ["%{BKY_SOUND_BLEAH}", "bleah"],
                ["%{BKY_SOUND_LAUGHING}", "laughing"],
                ["%{BKY_SOUND_POSITIVE_SURPRISE}", "positive_surprise"],
                ["%{BKY_SOUND_WOOOOW}", "woooow"],
                ["%{BKY_SOUND_JUPIYEAH}", "jupiyeah"],
                ["%{BKY_SOUND_AWESOME}", "awesome"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "sound_blocks",
        "tooltip": "%{BKY_SOUND_EMOTION_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sound_special",
        "message0": "%{BKY_SOUND_SPECIAL_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "SPECIAL",
            "options": [
                ["%{BKY_SOUND_FIRE_BRIGADE}", "siren_fire_brigade"],
                ["%{BKY_SOUND_RANDOM}", "random"],
                ["%{BKY_SOUND_AMBULANCE}", "siren_ambulance"],
                ["%{BKY_SOUND_POLICE}", "siren_police"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "sound_blocks",
        "tooltip": "%{BKY_SOUND_SPECIAL_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    },
    {
        "type": "sound_behavior",
        "message0": "%{BKY_SOUND_BEHAVIOR_TITLE}",
        "args0": [{
            "type": "field_dropdown",
            "name": "BEHAVIOR",
            "options": [
                ["%{BKY_SOUND_BOO}", "boo"],
                ["%{BKY_SOUND_RANDOM}", "random"],
                ["%{BKY_SOUND_SHH}", "shh"],
                ["%{BKY_SOUND_COLD}", "cold"],
                ["%{BKY_SOUND_FART}", "fart"],
                ["%{BKY_SOUND_HIC}", "hic"],
                ["%{BKY_SOUND_SNEEZE}", "sneeze"]
            ]
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "sound_blocks",
        "tooltip": "%{BKY_SOUND_BEHAVIOR_TOOLTIP}",
        "extensions": [
            "block_init_helpurl"
        ]
    }
]); // END JSON EXTRACT (Do not delete this comment.)