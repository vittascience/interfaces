const $builtinmodule = function () {

    const apds9960Const = {};
    apds9960Const.__name__ = new Sk.builtin.str("apds9960.const");

    // Adresse I2C APDS9960
    apds9960Const.APDS9960_I2C_ADDR = new Sk.builtin.int_(0x39);

    // Paramètres de geste APDS9960
    apds9960Const.APDS9960_GESTURE_THRESHOLD_OUT = new Sk.builtin.int_(10);
    apds9960Const.APDS9960_GESTURE_SENSITIVITY_1 = new Sk.builtin.int_(50);
    apds9960Const.APDS9960_GESTURE_SENSITIVITY_2 = new Sk.builtin.int_(20);

    // IDs de périphérique APDS9960
    apds9960Const.APDS9960_DEV_ID = new Sk.builtin.list([
        new Sk.builtin.int_(0xAB),
        new Sk.builtin.int_(0x9C),
        new Sk.builtin.int_(0xA8),
        new Sk.builtin.int_(-0x55)
    ]);

    // Temps APDS9960
    apds9960Const.APDS9960_TIME_FIFO_PAUSE = new Sk.builtin.float_(0.03);

    // Adresses de registres APDS9960
    apds9960Const.APDS9960_REG_ENABLE = new Sk.builtin.int_(0x80);
    apds9960Const.APDS9960_REG_ATIME = new Sk.builtin.int_(0x81);
    apds9960Const.APDS9960_REG_WTIME = new Sk.builtin.int_(0x83);
    apds9960Const.APDS9960_REG_AILTL = new Sk.builtin.int_(0x84);
    apds9960Const.APDS9960_REG_AILTH = new Sk.builtin.int_(0x85);
    apds9960Const.APDS9960_REG_AIHTL = new Sk.builtin.int_(0x86);
    apds9960Const.APDS9960_REG_AIHTH = new Sk.builtin.int_(0x87);
    apds9960Const.APDS9960_REG_PILT = new Sk.builtin.int_(0x89);
    apds9960Const.APDS9960_REG_PIHT = new Sk.builtin.int_(0x8B);
    apds9960Const.APDS9960_REG_PERS = new Sk.builtin.int_(0x8C);
    apds9960Const.APDS9960_REG_CONFIG1 = new Sk.builtin.int_(0x8D);
    apds9960Const.APDS9960_REG_PPULSE = new Sk.builtin.int_(0x8E);
    apds9960Const.APDS9960_REG_CONTROL = new Sk.builtin.int_(0x8F);
    apds9960Const.APDS9960_REG_CONFIG2 = new Sk.builtin.int_(0x90);
    apds9960Const.APDS9960_REG_ID = new Sk.builtin.int_(0x92);
    apds9960Const.APDS9960_REG_STATUS = new Sk.builtin.int_(0x93);
    apds9960Const.APDS9960_REG_CDATAL = new Sk.builtin.int_(0x94);
    apds9960Const.APDS9960_REG_CDATAH = new Sk.builtin.int_(0x95);
    apds9960Const.APDS9960_REG_RDATAL = new Sk.builtin.int_(0x96);
    apds9960Const.APDS9960_REG_RDATAH = new Sk.builtin.int_(0x97);
    apds9960Const.APDS9960_REG_GDATAL = new Sk.builtin.int_(0x98);
    apds9960Const.APDS9960_REG_GDATAH = new Sk.builtin.int_(0x99);
    apds9960Const.APDS9960_REG_BDATAL = new Sk.builtin.int_(0x9A);
    apds9960Const.APDS9960_REG_BDATAH = new Sk.builtin.int_(0x9B);
    apds9960Const.APDS9960_REG_PDATA = new Sk.builtin.int_(0x9C);
    apds9960Const.APDS9960_REG_POFFSET_UR = new Sk.builtin.int_(0x9D);
    apds9960Const.APDS9960_REG_POFFSET_DL = new Sk.builtin.int_(0x9E);
    apds9960Const.APDS9960_REG_CONFIG3 = new Sk.builtin.int_(0x9F);
    apds9960Const.APDS9960_REG_GPENTH = new Sk.builtin.int_(0xA0);
    apds9960Const.APDS9960_REG_GEXTH = new Sk.builtin.int_(0xA1);
    apds9960Const.APDS9960_REG_GCONF1 = new Sk.builtin.int_(0xA2);
    apds9960Const.APDS9960_REG_GCONF2 = new Sk.builtin.int_(0xA3);
    apds9960Const.APDS9960_REG_GOFFSET_U = new Sk.builtin.int_(0xA4);
    apds9960Const.APDS9960_REG_GOFFSET_D = new Sk.builtin.int_(0xA5);
    apds9960Const.APDS9960_REG_GOFFSET_L = new Sk.builtin.int_(0xA7);
    apds9960Const.APDS9960_REG_GOFFSET_R = new Sk.builtin.int_(0xA9);
    apds9960Const.APDS9960_REG_GPULSE = new Sk.builtin.int_(0xA6);
    apds9960Const.APDS9960_REG_GCONF3 = new Sk.builtin.int_(0xAA);
    apds9960Const.APDS9960_REG_GCONF4 = new Sk.builtin.int_(0xAB);
    apds9960Const.APDS9960_REG_GFLVL = new Sk.builtin.int_(0xAE);
    apds9960Const.APDS9960_REG_GSTATUS = new Sk.builtin.int_(0xAF);
    apds9960Const.APDS9960_REG_IFORCE = new Sk.builtin.int_(0xE4);
    apds9960Const.APDS9960_REG_PICLEAR = new Sk.builtin.int_(0xE5);
    apds9960Const.APDS9960_REG_CICLEAR = new Sk.builtin.int_(0xE6);
    apds9960Const.APDS9960_REG_AICLEAR = new Sk.builtin.int_(0xE7);
    apds9960Const.APDS9960_REG_GFIFO_U = new Sk.builtin.int_(0xFC);
    apds9960Const.APDS9960_REG_GFIFO_D = new Sk.builtin.int_(0xFD);
    apds9960Const.APDS9960_REG_GFIFO_L = new Sk.builtin.int_(0xFE);
    apds9960Const.APDS9960_REG_GFIFO_R = new Sk.builtin.int_(0xFF);

    // Champs de bits APDS9960
    apds9960Const.APDS9960_BIT_PON = new Sk.builtin.int_(0b00000001);
    apds9960Const.APDS9960_BIT_AEN = new Sk.builtin.int_(0b00000010);
    apds9960Const.APDS9960_BIT_PEN = new Sk.builtin.int_(0b00000100);
    apds9960Const.APDS9960_BIT_WEN = new Sk.builtin.int_(0b00001000);
    apds9960Const.APSD9960_BIT_AIEN = new Sk.builtin.int_(0b00010000);
    apds9960Const.APDS9960_BIT_PIEN = new Sk.builtin.int_(0b00100000);
    apds9960Const.APDS9960_BIT_GEN = new Sk.builtin.int_(0b01000000);
    apds9960Const.APDS9960_BIT_GVALID = new Sk.builtin.int_(0b00000001);
    apds9960Const.APDS9960_BIT_AVALID = new Sk.builtin.int_(0b00000001);
    apds9960Const.APDS9960_BIT_PVALID = new Sk.builtin.int_(0b00000010);
    apds9960Const.APDS9960_BIT_GINT = new Sk.builtin.int_(0b00000100);
    apds9960Const.APDS9960_BIT_AINT = new Sk.builtin.int_(0b00010000);
    apds9960Const.APDS9960_BIT_PINT = new Sk.builtin.int_(0b00100000);
    apds9960Const.APDS9960_BIT_PGSAT = new Sk.builtin.int_(0b01000000);
    apds9960Const.APDS9960_BIT_CPSAT = new Sk.builtin.int_(0b10000000);

    // Modes APDS9960
    apds9960Const.APDS9960_MODE_POWER = new Sk.builtin.int_(0);
    apds9960Const.APDS9960_MODE_AMBIENT_LIGHT = new Sk.builtin.int_(1);
    apds9960Const.APDS9960_MODE_PROXIMITY = new Sk.builtin.int_(2);
    apds9960Const.APDS9960_MODE_WAIT = new Sk.builtin.int_(3);
    apds9960Const.APDS9960_MODE_AMBIENT_LIGHT_INT = new Sk.builtin.int_(4);
    apds9960Const.APDS9960_MODE_PROXIMITY_INT = new Sk.builtin.int_(5);
    apds9960Const.APDS9960_MODE_GESTURE = new Sk.builtin.int_(6);
    apds9960Const.APDS9960_MODE_ALL = new Sk.builtin.int_(7);

    // Valeurs de courant LED
    apds9960Const.APDS9960_LED_DRIVE_100MA = new Sk.builtin.int_(0);
    apds9960Const.APDS9960_LED_DRIVE_50MA = new Sk.builtin.int_(1);
    apds9960Const.APDS9960_LED_DRIVE_25MA = new Sk.builtin.int_(2);
    apds9960Const.APDS9960_LED_DRIVE_12_5MA = new Sk.builtin.int_(3);

    // Valeurs de gain de proximité (PGAIN)
    apds9960Const.APDS9960_PGAIN_1X = new Sk.builtin.int_(0);
    apds9960Const.APDS9960_PGAIN_2X = new Sk.builtin.int_(1);
    apds9960Const.APDS9960_PGAIN_4X = new Sk.builtin.int_(2);
    apds9960Const.APDS9960_PGAIN_8X = new Sk.builtin.int_(3);

    // Valeurs de gain ALS (AGAIN)
    apds9960Const.APDS9960_AGAIN_1X = new Sk.builtin.int_(0);
    apds9960Const.APDS9960_AGAIN_4X = new Sk.builtin.int_(1);
    apds9960Const.APDS9960_AGAIN_16X = new Sk.builtin.int_(2);
    apds9960Const.APDS9960_AGAIN_64X = new Sk.builtin.int_(3);

    // Valeurs de gain de geste (GGAIN)
    apds9960Const.APDS9960_GGAIN_1X = new Sk.builtin.int_(0);
    apds9960Const.APDS9960_GGAIN_2X = new Sk.builtin.int_(1);
    apds9960Const.APDS9960_GGAIN_4X = new Sk.builtin.int_(2);
    apds9960Const.APDS9960_GGAIN_8X = new Sk.builtin.int_(3);

    // Valeurs de boost LED
    apds9960Const.APDS9960_LED_BOOST_100 = new Sk.builtin.int_(0);
    apds9960Const.APDS9960_LED_BOOST_150 = new Sk.builtin.int_(1);
    apds9960Const.APDS9960_LED_BOOST_200 = new Sk.builtin.int_(2);
    apds9960Const.APDS9960_LED_BOOST_300 = new Sk.builtin.int_(3);

    // Valeurs de temps d'attente de geste
    apds9960Const.APDS9960_GWTIME_0MS = new Sk.builtin.int_(0);
    apds9960Const.APDS9960_GWTIME_2_8MS = new Sk.builtin.int_(1);
    apds9960Const.APDS9960_GWTIME_5_6MS = new Sk.builtin.int_(2);
    apds9960Const.APDS9960_GWTIME_8_4MS = new Sk.builtin.int_(3);
    apds9960Const.APDS9960_GWTIME_14_0MS = new Sk.builtin.int_(4);
    apds9960Const.APDS9960_GWTIME_22_4MS = new Sk.builtin.int_(5);
    apds9960Const.APDS9960_GWTIME_30_8MS = new Sk.builtin.int_(6);
    apds9960Const.APDS9960_GWTIME_39_2MS = new Sk.builtin.int_(7);

    // Valeurs par défaut
    apds9960Const.APDS9960_DEFAULT_ATIME = new Sk.builtin.int_(219);  // 103ms
    apds9960Const.APDS9960_DEFAULT_WTIME = new Sk.builtin.int_(246);  // 27ms
    apds9960Const.APDS9960_DEFAULT_PROX_PPULSE = new Sk.builtin.int_(0x87);  // 16us, 8 pulses
    apds9960Const.APDS9960_DEFAULT_GESTURE_PPULSE = new Sk.builtin.int_(0x89);  // 16us, 10 pulses
    apds9960Const.APDS9960_DEFAULT_POFFSET_UR = new Sk.builtin.int_(0);  // 0 offset
    apds9960Const.APDS9960_DEFAULT_POFFSET_DL = new Sk.builtin.int_(0);  // 0 offset
    apds9960Const.APDS9960_DEFAULT_CONFIG1 = new Sk.builtin.int_(0x60);  // No 12x wait (WTIME)
    apds9960Const.APDS9960_DEFAULT_LDRIVE = apds9960Const.APDS9960_LED_DRIVE_100MA;
    apds9960Const.APDS9960_DEFAULT_PGAIN = apds9960Const.APDS9960_PGAIN_4X;
    apds9960Const.APDS9960_DEFAULT_AGAIN = apds9960Const.APDS9960_AGAIN_4X;
    apds9960Const.APDS9960_DEFAULT_PILT = new Sk.builtin.int_(0);  // Seuil de proximité bas
    apds9960Const.APDS9960_DEFAULT_PIHT = new Sk.builtin.int_(50);  // Seuil de proximité haut
    apds9960Const.APDS9960_DEFAULT_AILT = new Sk.builtin.int_(0xFFFF);  // Force l'interruption pour calibration
    apds9960Const.APDS9960_DEFAULT_AIHT = new Sk.builtin.int_(0);
    apds9960Const.APDS9960_DEFAULT_PERS = new Sk.builtin.int_(0x11);  // 2 mesures consécutives prox ou ALS pour int.
    apds9960Const.APDS9960_DEFAULT_CONFIG2 = new Sk.builtin.int_(0x01);  // Pas d'interruptions de saturation ou de boost LED
    apds9960Const.APDS9960_DEFAULT_CONFIG3 = new Sk.builtin.int_(0);  // Active toutes les photodiodes, pas de SAI
    apds9960Const.APDS9960_DEFAULT_GPENTH = new Sk.builtin.int_(40);  // Seuil pour entrer en mode geste
    apds9960Const.APDS9960_DEFAULT_GEXTH = new Sk.builtin.int_(30);  // Seuil pour sortir du mode geste
    apds9960Const.APDS9960_DEFAULT_GCONF1 = new Sk.builtin.int_(0x40);  // 4 événements de geste pour int., 1 pour sortie
    apds9960Const.APDS9960_DEFAULT_GGAIN = apds9960Const.APDS9960_GGAIN_4X;
    apds9960Const.APDS9960_DEFAULT_GLDRIVE = apds9960Const.APDS9960_LED_DRIVE_100MA;
    apds9960Const.APDS9960_DEFAULT_GWTIME = apds9960Const.APDS9960_GWTIME_2_8MS;
    apds9960Const.APDS9960_DEFAULT_GOFFSET = new Sk.builtin.int_(0);  // Pas de scaling d'offset pour le mode geste
    apds9960Const.APDS9960_DEFAULT_GPULSE = new Sk.builtin.int_(0xC9);  // 32us, 10 pulses
    apds9960Const.APDS9960_DEFAULT_GCONF3 = new Sk.builtin.int_(0);  // Toutes les photodiodes actives pendant le geste
    apds9960Const.APDS9960_DEFAULT_GIEN = new Sk.builtin.int_(0);  // Désactive les interruptions de geste

    // Directions de geste
    apds9960Const.APDS9960_DIR_NONE = new Sk.builtin.int_(0);
    apds9960Const.APDS9960_DIR_LEFT = new Sk.builtin.int_(1);
    apds9960Const.APDS9960_DIR_RIGHT = new Sk.builtin.int_(2);
    apds9960Const.APDS9960_DIR_UP = new Sk.builtin.int_(3);
    apds9960Const.APDS9960_DIR_DOWN = new Sk.builtin.int_(4);
    apds9960Const.APDS9960_DIR_NEAR = new Sk.builtin.int_(5);
    apds9960Const.APDS9960_DIR_FAR = new Sk.builtin.int_(6);
    apds9960Const.APDS9960_DIR_ALL = new Sk.builtin.int_(7);

    // Définitions d'état
    apds9960Const.APDS9960_STATE_NA = new Sk.builtin.int_(0);
    apds9960Const.APDS9960_STATE_NEAR = new Sk.builtin.int_(1);
    apds9960Const.APDS9960_STATE_FAR = new Sk.builtin.int_(2);
    apds9960Const.APDS9960_STATE_ALL = new Sk.builtin.int_(3);

    return apds9960Const;
};