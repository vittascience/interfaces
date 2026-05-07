

const $builtinmodule = function () {

    const mcp23009eConst = {};
    mcp23009eConst.__name__ = new Sk.builtin.str("mcp23009e.const");

    // Registres MCP23009E
    mcp23009eConst.MCP23009_IODIR = new Sk.builtin.int_(0x00)  // Registre de direction I/O (1=entrée, 0=sortie)
    mcp23009eConst.MCP23009_IPOL = new Sk.builtin.int_(0x01)  // Registre de polarité d'entrée
    mcp23009eConst.MCP23009_GPINTEN = new Sk.builtin.int_(0x02)  // Registre d'activation d'interruption
    mcp23009eConst.MCP23009_DEFVAL = new Sk.builtin.int_(0x03)  // Valeur par défaut pour comparaison d'interruption
    mcp23009eConst.MCP23009_INTCON = new Sk.builtin.int_(0x04)  // Registre de configuration d'interruption
    mcp23009eConst.MCP23009_IOCON = new Sk.builtin.int_(0x05)  // Registre de configuration I/O
    mcp23009eConst.MCP23009_GPPU = new Sk.builtin.int_(0x06)  // Registre de pull-up GPIO
    mcp23009eConst.MCP23009_INTF = new Sk.builtin.int_(0x07)  // Registre de flag d'interruption
    mcp23009eConst.MCP23009_INTCAP = new Sk.builtin.int_(0x08)  // Registre de capture d'interruption
    mcp23009eConst.MCP23009_GPIO = new Sk.builtin.int_(0x09)  // Registre GPIO (lecture/écriture)
    mcp23009eConst.MCP23009_OLAT = new Sk.builtin.int_(0x0A)  // Registre de latch de sortie

    // Valeurs pour IOCON
    mcp23009eConst.MCP23009_IOCON_SEQOP = new Sk.builtin.int_(0x20)  // Mode d'opération séquentielle
    mcp23009eConst.MCP23009_IOCON_DISSLW = new Sk.builtin.int_(0x10)  // Désactive le slew rate
    mcp23009eConst.MCP23009_IOCON_ODR = new Sk.builtin.int_(0x04)  // Configure INT comme drain ouvert
    mcp23009eConst.MCP23009_IOCON_INTPOL = new Sk.builtin.int_(0x02)  // Polarité de la sortie INT

    // Adresse I2C mise à jour pour 0x20
    mcp23009eConst.MCP23009_I2C_ADDR = new Sk.builtin.int_(0x20)

    // Énumérations pour la configuration des GPIO
    // Direction
    mcp23009eConst.MCP23009_DIR_OUTPUT = new Sk.builtin.int_(0)
    mcp23009eConst.MCP23009_DIR_INPUT = new Sk.builtin.int_(1)

    // Pull-up
    mcp23009eConst.MCP23009_NO_PULLUP = new Sk.builtin.int_(0)
    mcp23009eConst.MCP23009_PULLUP = new Sk.builtin.int_(1)

    // Polarité
    mcp23009eConst.MCP23009_POL_SAME = new Sk.builtin.int_(0)
    mcp23009eConst.MCP23009_POL_INVERTED = new Sk.builtin.int_(1)

    // Niveau logique
    mcp23009eConst.MCP23009_LOGIC_LOW = new Sk.builtin.int_(0)
    mcp23009eConst.MCP23009_LOGIC_HIGH = new Sk.builtin.int_(1)

    // Interruptions
    mcp23009eConst.MCP23009_INTEN_DISABLE = new Sk.builtin.int_(0)
    mcp23009eConst.MCP23009_INTEN_ENABLE = new Sk.builtin.int_(1)

    // Comparaison interruption
    mcp23009eConst.MCP23009_INTCON_PREVIOUS_STATE = new Sk.builtin.int_(0)
    mcp23009eConst.MCP23009_INTCON_DEFVAL = new Sk.builtin.int_(1)

    // GPIO mapping for the D-PAD
    mcp23009eConst.MCP23009_BTN_UP = new Sk.builtin.int_(7)
    mcp23009eConst.MCP23009_BTN_DOWN = new Sk.builtin.int_(5)
    mcp23009eConst.MCP23009_BTN_LEFT = new Sk.builtin.int_(6)
    mcp23009eConst.MCP23009_BTN_RIGHT = new Sk.builtin.int_(4)

    // GPIO mapping for the croc connectors
    mcp23009eConst.MCP23009_GPIO1 = new Sk.builtin.int_(0)
    mcp23009eConst.MCP23009_GPIO2 = new Sk.builtin.int_(1)
    mcp23009eConst.MCP23009_GPIO3 = new Sk.builtin.int_(2)
    mcp23009eConst.MCP23009_GPIO4 = new Sk.builtin.int_(3)
    mcp23009eConst.MCP23009_GPIO5 = new Sk.builtin.int_(4)
    mcp23009eConst.MCP23009_GPIO6 = new Sk.builtin.int_(5)
    mcp23009eConst.MCP23009_GPIO7 = new Sk.builtin.int_(6)
    mcp23009eConst.MCP23009_GPIO8 = new Sk.builtin.int_(7)

    mcp23009eConst.MCP23009_GPIOS = new Sk.builtin.list([
        mcp23009eConst.MCP23009_GPIO1,
        mcp23009eConst.MCP23009_GPIO2,
        mcp23009eConst.MCP23009_GPIO3,
        mcp23009eConst.MCP23009_GPIO4,
        mcp23009eConst.MCP23009_GPIO5,
        mcp23009eConst.MCP23009_GPIO6,
        mcp23009eConst.MCP23009_GPIO7,
        mcp23009eConst.MCP23009_GPIO8
    ]);

    return mcp23009eConst;
};