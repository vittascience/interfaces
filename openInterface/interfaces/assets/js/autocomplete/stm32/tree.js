function getCompleterTrees_stm32(_interface) {
    const DOC_URL = "https://docs.micropython.org/en/latest/library/";
    const tree = {};
    const typeTree = {};

    tree.pyb = [
        { title: "delay(ms)", value: "delay", meta: "-- <function>", snippet: "delay($1)", description: "MPY_PYB_DELAY", docUrl: DOC_URL + "pyb.html#pyb.delay" },
        { title: "udelay(us)", value: "udelay", meta: "-- <function>", snippet: "udelay($1)", description: "MPY_PYB_UDELAY", docUrl: DOC_URL + "pyb.html#pyb.udelay" },
        { title: "millis()", value: "millis", meta: "-- <function>", snippet: "millis()", description: "MPY_PYB_MILLIS", returns: "int", docUrl: DOC_URL + "pyb.html#pyb.millis" },
        { title: "micros()", value: "micros", meta: "-- <function>", snippet: "micros()", description: "MPY_PYB_MICROS", returns: "int", docUrl: DOC_URL + "pyb.html#pyb.micros" },
        { title: "elapsed_millis(start)", value: "elapsed_millis", meta: "-- <function>", snippet: "elapsed_millis($1)", description: "MPY_PYB_ELAPSED_MILLIS", returns: "int", docUrl: DOC_URL + "pyb.html#pyb.elapsed_millis" },
        { title: "elapsed_micros(start)", value: "elapsed_micros", meta: "-- <function>", snippet: "elapsed_micros($1)", description: "MPY_PYB_ELAPSED_MICROS", returns: "int", docUrl: DOC_URL + "pyb.html#pyb.elapsed_micros" },
        { title: "hard_reset()", value: "hard_reset", meta: "-- <function>", snippet: "hard_reset()", description: "MPY_PYB_HARD_RESET", docUrl: DOC_URL + "pyb.html#pyb.hard_reset" },
        { title: "bootloader()", value: "bootloader", meta: "-- <function>", snippet: "bootloader()", description: "MPY_PYB_BOOTLOADER", docUrl: DOC_URL + "pyb.html#pyb.bootloader" },
        { title: "fault_debug(value)", value: "fault_debug", meta: "-- <function>", snippet: "fault_debug($1)", description: "MPY_PYB_FAULT_DEBUG", docUrl: DOC_URL + "pyb.html#pyb.fault_debug" },
        { title: "disable_irq()", value: "disable_irq", meta: "-- <function>", snippet: "disable_irq()", description: "MPY_PYB_DISABLE_IRQ", returns: "bool", docUrl: DOC_URL + "pyb.html#pyb.disable_irq" },
        { title: "enable_irq(state=True)", value: "enable_irq", meta: "-- <function>", snippet: "enable_irq($1)", description: "MPY_PYB_ENABLE_IRQ", docUrl: DOC_URL + "pyb.html#pyb.enable_irq" },
        { title: "freq([sysclk[, hclk[, pclk1[, pclk2]]]])", value: "freq", meta: "-- <function>", snippet: "freq($1)", description: "MPY_PYB_FREQ", returns: "tuple", docUrl: DOC_URL + "pyb.html#pyb.freq" },
        { title: "wfi()", value: "wfi", meta: "-- <function>", snippet: "wfi()", description: "MPY_PYB_WFI", docUrl: DOC_URL + "pyb.html#pyb.wfi" },
        { title: "stop()", value: "stop", meta: "-- <function>", snippet: "stop()", description: "MPY_PYB_STOP", docUrl: DOC_URL + "pyb.html#pyb.stop" },
        { title: "standby()", value: "standby", meta: "-- <function>", snippet: "standby()", description: "MPY_PYB_STANDBY", docUrl: DOC_URL + "pyb.html#pyb.standby" },
        { title: "info([dump_alloc_table])", value: "info", meta: "-- <function>", snippet: "info($1)", description: "MPY_PYB_INFO", docUrl: DOC_URL + "pyb.html#pyb.info" },
        { title: "main(filename)", value: "main", meta: "-- <function>", snippet: "main($1)", description: "MPY_PYB_MAIN", docUrl: DOC_URL + "pyb.html#pyb.main" },
        { title: "repl_uart(uart)", value: "repl_uart", meta: "-- <function>", snippet: "repl_uart($1)", description: "MPY_PYB_REPL_UART", returns: "UART@pyb", docUrl: DOC_URL + "pyb.html#pyb.repl_uart" },
        { title: "rng()", value: "rng", meta: "-- <function>", snippet: "rng()", description: "MPY_PYB_RNG", returns: "int", docUrl: DOC_URL + "pyb.html#pyb.rng" },
        { title: "sync()", value: "sync", meta: "-- <function>", snippet: "sync()", description: "MPY_PYB_SYNC", docUrl: DOC_URL + "pyb.html#pyb.sync" },
        { title: "unique_id()", value: "unique_id", meta: "-- <function>", snippet: "unique_id()", description: "MPY_PYB_UNIQUE_ID", returns: "bytes", docUrl: DOC_URL + "pyb.html#pyb.unique_id" },
        { title: "usb_mode([modestr, ]port=-1, vid=0xf055, pid=-1, msc=(), hid=pyb.hid_mouse, high_speed=False)", value: "usb_mode", meta: "-- <function>", snippet: "usb_mode($1)", description: "MPY_PYB_USB_MODE", returns: "str", docUrl: DOC_URL + "pyb.html#pyb.usb_mode" },
        { value: "hid_mouse", description: "MPY_PYB_HID_MOUSE", docUrl: DOC_URL + "pyb.html#pyb.hid_mouse" },
        { value: "hid_keyboard", description: "MPY_PYB_HID_KEYBOARD", docUrl: DOC_URL + "pyb.html#pyb.hid_keyboard" },
        { value: "Pin", description: "MPY_PYB_PIN_CLASS", docUrl: DOC_URL + "pyb.Pin.html#module-pyb.Pin", kind: "class" },
        { title: "Pin(pin, mode=Pin.IN, pull=Pin.PULL_NONE, *, value=None, alt=-1)", value: "Pin()", meta: "constructor", snippet: "Pin($1)", description: "MPY_PYB_PIN_CTOR", returns: "Pin@pyb", docUrl: DOC_URL + "pyb.Pin.html#module-pyb.Pin" },
        { value: "PinAF", description: "MPY_PYB_PINAF_CLASS", docUrl: DOC_URL + "pyb.Pin.html#module-pyb.Pin", kind: "class" },
        { title: "PinAF()", value: "PinAF()", meta: "constructor", snippet: "PinAF($1)", description: "MPY_PYB_PINAF_CTOR", returns: "PinAF@pyb", docUrl: DOC_URL + "pyb.Pin.html#module-pyb.Pin" },
        { value: "ADC", description: "MPY_PYB_ADC_CLASS", docUrl: DOC_URL + "pyb.ADC.html#module-pyb.ADC", kind: "class" },
        { title: "ADC(pin)", value: "ADC()", meta: "constructor", snippet: "ADC($1)", description: "MPY_PYB_ADC_CTOR", returns: "ADC@pyb", docUrl: DOC_URL + "pyb.ADC.html#module-pyb.ADC" },
        { value: "ADCAll", description: "MPY_PYB_ADCALL_CLASS", docUrl: DOC_URL + "pyb.ADC.html#module-pyb.ADC", kind: "class" },
        { title: "ADCAll(resolution)", value: "ADCAll()", meta: "constructor", snippet: "ADCAll($1)", description: "MPY_PYB_ADCALL_CTOR", returns: "ADCAll@pyb", docUrl: DOC_URL + "pyb.ADC.html#module-pyb.ADC" },
        { value: "I2C", description: "MPY_PYB_I2C_CLASS", docUrl: DOC_URL + "pyb.I2C.html#module-pyb.I2C", kind: "class" },
        { title: "I2C(bus, mode=I2C.CONTROLLER, *, addr=0x12, baudrate=400000, gencall=False, dma=False)", value: "I2C()", meta: "constructor", snippet: "I2C($1)", description: "MPY_PYB_I2C_CTOR", returns: "I2C@pyb", docUrl: DOC_URL + "pyb.I2C.html#module-pyb.I2C" },
        { value: "SPI", description: "MPY_PYB_SPI_CLASS", docUrl: DOC_URL + "pyb.SPI.html#module-pyb.SPI", kind: "class" },
        { title: "SPI(bus, mode=SPI.CONTROLLER, baudrate=328125, *, polarity=1, phase=0, bits=8, firstbit=SPI.MSB, ti=False, crc=None)", value: "SPI()", meta: "constructor", snippet: "SPI($1)", description: "MPY_PYB_SPI_CTOR", returns: "SPI@pyb", docUrl: DOC_URL + "pyb.SPI.html#module-pyb.SPI" },
        { value: "UART", description: "MPY_PYB_UART_CLASS", docUrl: DOC_URL + "pyb.UART.html#module-pyb.UART", kind: "class" },
        { title: "UART(bus, baudrate=9600, bits=8, parity=None, stop=1, *, timeout=0, timeout_char=0, read_buf_len=64, flow=0)", value: "UART()", meta: "constructor", snippet: "UART($1)", description: "MPY_PYB_UART_CTOR", returns: "UART@pyb", docUrl: DOC_URL + "pyb.UART.html#module-pyb.UART" },
        { value: "Timer", description: "MPY_PYB_TIMER_CLASS", docUrl: DOC_URL + "pyb.Timer.html#module-pyb.Timer", kind: "class" },
        { title: "Timer(id, /, ...)", value: "Timer()", meta: "constructor", snippet: "Timer($1)", description: "MPY_PYB_TIMER_CTOR", returns: "Timer@pyb", docUrl: DOC_URL + "pyb.Timer.html#module-pyb.Timer" },
        { value: "TimerChannel", description: "MPY_PYB_TIMERCHANNEL_CLASS", docUrl: DOC_URL + "pyb.Timer.html#pyb.Timer.channel", kind: "class" },
        { title: "TimerChannel()", value: "TimerChannel()", meta: "constructor", snippet: "TimerChannel($1)", description: "MPY_PYB_TIMERCHANNEL_CTOR", returns: "TimerChannel@pyb", docUrl: DOC_URL + "pyb.Timer.html#pyb.Timer.channel" },
        { value: "LED", description: "MPY_PYB_LED_CLASS", docUrl: DOC_URL + "pyb.LED.html#module-pyb.LED", kind: "class" },
        { title: "LED(id)", value: "LED()", meta: "constructor", snippet: "LED($1)", description: "MPY_PYB_LED_CTOR", returns: "LED@pyb", docUrl: DOC_URL + "pyb.LED.html#module-pyb.LED" },
        { value: "ExtInt", description: "MPY_PYB_EXTINT_CLASS", docUrl: DOC_URL + "pyb.ExtInt.html#module-pyb.ExtInt", kind: "class" },
        { title: "ExtInt(pin, mode, pull, callback)", value: "ExtInt()", meta: "constructor", snippet: "ExtInt($1)", description: "MPY_PYB_EXTINT_CTOR", returns: "ExtInt@pyb", docUrl: DOC_URL + "pyb.ExtInt.html#module-pyb.ExtInt" },
        { value: "USB_VCP", description: "MPY_PYB_USB_VCP_CLASS", docUrl: DOC_URL + "pyb.USB_VCP.html#module-pyb.USB_VCP", kind: "class" },
        { title: "USB_VCP()", value: "USB_VCP()", meta: "constructor", snippet: "USB_VCP($1)", description: "MPY_PYB_USB_VCP_CTOR", returns: "USB_VCP@pyb", docUrl: DOC_URL + "pyb.USB_VCP.html#module-pyb.USB_VCP" },
        { value: "USB_HID", description: "MPY_PYB_USB_HID_CLASS", docUrl: DOC_URL + "pyb.USB_HID.html#module-pyb.USB_HID", kind: "class" },
        { title: "USB_HID()", value: "USB_HID()", meta: "constructor", snippet: "USB_HID($1)", description: "MPY_PYB_USB_HID_CTOR", returns: "USB_HID@pyb", docUrl: DOC_URL + "pyb.USB_HID.html#module-pyb.USB_HID" },
        { value: "CAN", description: "MPY_PYB_CAN_CLASS", docUrl: DOC_URL + "pyb.CAN.html#module-pyb.CAN", kind: "class" },
        { title: "CAN(bus, mode, *, ...)", value: "CAN()", meta: "constructor", snippet: "CAN($1)", description: "MPY_PYB_CAN_CTOR", returns: "CAN@pyb", docUrl: DOC_URL + "pyb.CAN.html#module-pyb.CAN" },
        { value: "DAC", description: "MPY_PYB_DAC_CLASS", docUrl: DOC_URL + "pyb.DAC.html#module-pyb.DAC", kind: "class" },
        { title: "DAC(port, bits=8, *, buf=None)", value: "DAC()", meta: "constructor", snippet: "DAC($1)", description: "MPY_PYB_DAC_CTOR", returns: "DAC@pyb", docUrl: DOC_URL + "pyb.DAC.html#module-pyb.DAC" },
        { value: "RTC", description: "MPY_PYB_RTC_CLASS", docUrl: DOC_URL + "pyb.RTC.html#module-pyb.RTC", kind: "class" },
        { title: "RTC()", value: "RTC()", meta: "constructor", snippet: "RTC($1)", description: "MPY_PYB_RTC_CTOR", returns: "RTC@pyb", docUrl: DOC_URL + "pyb.RTC.html#module-pyb.RTC" },
        { value: "Servo", description: "MPY_PYB_SERVO_CLASS", docUrl: DOC_URL + "pyb.Servo.html#module-pyb.Servo", kind: "class" },
        { title: "Servo(id)", value: "Servo()", meta: "constructor", snippet: "Servo($1)", description: "MPY_PYB_SERVO_CTOR", returns: "Servo@pyb", docUrl: DOC_URL + "pyb.Servo.html#module-pyb.Servo" },
        { value: "Switch", description: "MPY_PYB_SWITCH_CLASS", docUrl: DOC_URL + "pyb.Switch.html#module-pyb.Switch", kind: "class" },
        { title: "Switch()", value: "Switch()", meta: "constructor", snippet: "Switch($1)", description: "MPY_PYB_SWITCH_CTOR", returns: "Switch@pyb", docUrl: DOC_URL + "pyb.Switch.html#module-pyb.Switch" },
        { value: "Flash", description: "MPY_PYB_FLASH_CLASS", docUrl: DOC_URL + "pyb.Flash.html#module-pyb.Flash", kind: "class" },
        { title: "Flash()", value: "Flash()", meta: "constructor", snippet: "Flash($1)", description: "MPY_PYB_FLASH_CTOR", returns: "Flash@pyb", docUrl: DOC_URL + "pyb.Flash.html#module-pyb.Flash" },
        { value: "Accel", description: "MPY_PYB_ACCEL_CLASS", docUrl: DOC_URL + "pyb.Accel.html#module-pyb.Accel", kind: "class" },
        { title: "Accel()", value: "Accel()", meta: "constructor", snippet: "Accel($1)", description: "MPY_PYB_ACCEL_CTOR", returns: "Accel@pyb", docUrl: DOC_URL + "pyb.Accel.html#module-pyb.Accel" },
        { value: "__name__", meta: "pyb" }
    ];

    typeTree["Pin@pyb"] = [
        { title: "init(mode, pull=Pin.PULL_NONE, *, value=None, alt=-1)", value: "init", meta: "-- <function>", snippet: "init($1)", description: "MPY_PYB_PIN_INIT", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.init" },
        { title: "value([value])", value: "value", meta: "-- <function>", snippet: "value($1)", description: "MPY_PYB_PIN_VALUE", returns: "int", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.value" },
        { title: "af()", value: "af", meta: "-- <function>", snippet: "af()", description: "MPY_PYB_PIN_AF", returns: "int", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.af" },
        { title: "af_list()", value: "af_list", meta: "-- <function>", snippet: "af_list()", description: "MPY_PYB_PIN_AF_LIST", returns: "list", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.af_list" },
        { title: "mode()", value: "mode", meta: "-- <function>", snippet: "mode()", description: "MPY_PYB_PIN_MODE", returns: "int", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.mode" },
        { title: "name()", value: "name", meta: "-- <function>", snippet: "name()", description: "MPY_PYB_PIN_NAME", returns: "str", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.name" },
        { title: "names()", value: "names", meta: "-- <function>", snippet: "names()", description: "MPY_PYB_PIN_NAMES", returns: "tuple", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.names" },
        { title: "pin()", value: "pin", meta: "-- <function>", snippet: "pin()", description: "MPY_PYB_PIN_PIN", returns: "int", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.pin" },
        { title: "port()", value: "port", meta: "-- <function>", snippet: "port()", description: "MPY_PYB_PIN_PORT", returns: "str", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.port" },
        { title: "pull()", value: "pull", meta: "-- <function>", snippet: "pull()", description: "MPY_PYB_PIN_PULL", returns: "int", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.pull" },
        { title: "debug([state])", value: "debug", meta: "classmethod", snippet: "debug(${1:})", description: "MPY_PYB_PIN_DEBUG", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.debug" },
        { title: "dict([dict])", value: "dict", meta: "classmethod", snippet: "dict(${1:})", description: "MPY_PYB_PIN_DICT", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.dict" },
        { title: "mapper([fun])", value: "mapper", meta: "classmethod", snippet: "mapper(${1:})", description: "MPY_PYB_PIN_MAPPER", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.mapper" },
        { value: "IN", description: "MPY_PYB_PIN_IN", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.IN", kind: "constant" },
        { value: "OUT_PP", description: "MPY_PYB_PIN_OUT_PP", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.OUT_PP", kind: "constant" },
        { value: "OUT_OD", description: "MPY_PYB_PIN_OUT_OD", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.OUT_OD", kind: "constant" },
        { value: "ALT", description: "MPY_PYB_PIN_ALT", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.ALT", kind: "constant" },
        { value: "ANALOG", description: "MPY_PYB_PIN_ANALOG", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.ANALOG", kind: "constant" },
        { value: "PULL_NONE", description: "MPY_PYB_PIN_PULL_NONE", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.PULL_NONE", kind: "constant" },
        { value: "PULL_UP", description: "MPY_PYB_PIN_PULL_UP", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.PULL_UP", kind: "constant" },
        { value: "PULL_DOWN", description: "MPY_PYB_PIN_PULL_DOWN", docUrl: DOC_URL + "pyb.Pin.html#pyb.Pin.PULL_DOWN", kind: "constant" }
    ];

    typeTree["ADC@pyb"] = [
        { title: "read()", value: "read", meta: "-- <function>", snippet: "read()", description: "MPY_PYB_ADC_READ", returns: "int", docUrl: DOC_URL + "pyb.ADC.html#pyb.ADC.read" },
        { title: "read_timed(buf, timer)", value: "read_timed", meta: "-- <function>", snippet: "read_timed($1)", description: "MPY_PYB_ADC_READ_TIMED", docUrl: DOC_URL + "pyb.ADC.html#pyb.ADC.read_timed" },
        { title: "read_timed_multi((adcx, ...), (bufx, ...), timer)", value: "read_timed_multi", meta: "classmethod", snippet: "read_timed_multi(${1:})", description: "MPY_PYB_ADC_READ_TIMED_MULTI", docUrl: DOC_URL + "pyb.ADC.html#pyb.ADC.read_timed_multi" }
    ];

    typeTree["I2C@pyb"] = [
        { title: "init(mode, *, addr=0x12, baudrate=400000, gencall=False, dma=False)", value: "init", meta: "-- <function>", snippet: "init($1)", description: "MPY_PYB_I2C_INIT", docUrl: DOC_URL + "pyb.I2C.html#pyb.I2C.init" },
        { title: "deinit()", value: "deinit", meta: "-- <function>", snippet: "deinit()", description: "MPY_PYB_I2C_DEINIT", docUrl: DOC_URL + "pyb.I2C.html#pyb.I2C.deinit" },
        { title: "scan()", value: "scan", meta: "-- <function>", snippet: "scan()", description: "MPY_PYB_I2C_SCAN", returns: "list", docUrl: DOC_URL + "pyb.I2C.html#pyb.I2C.scan" },
        { title: "is_ready(addr)", value: "is_ready", meta: "-- <function>", snippet: "is_ready($1)", description: "MPY_PYB_I2C_IS_READY", returns: "bool", docUrl: DOC_URL + "pyb.I2C.html#pyb.I2C.is_ready" },
        { title: "send(send, addr=0x00, *, timeout=5000)", value: "send", meta: "-- <function>", snippet: "send($1)", description: "MPY_PYB_I2C_SEND", docUrl: DOC_URL + "pyb.I2C.html#pyb.I2C.send" },
        { title: "recv(recv, addr=0x00, *, timeout=5000)", value: "recv", meta: "-- <function>", snippet: "recv($1)", description: "MPY_PYB_I2C_RECV", returns: "bytes", docUrl: DOC_URL + "pyb.I2C.html#pyb.I2C.recv" },
        { title: "mem_read(data, addr, memaddr, *, timeout=5000, addr_size=8)", value: "mem_read", meta: "-- <function>", snippet: "mem_read($1)", description: "MPY_PYB_I2C_MEM_READ", returns: "bytes", docUrl: DOC_URL + "pyb.I2C.html#pyb.I2C.mem_read" },
        { title: "mem_write(data, addr, memaddr, *, timeout=5000, addr_size=8)", value: "mem_write", meta: "-- <function>", snippet: "mem_write($1)", description: "MPY_PYB_I2C_MEM_WRITE", docUrl: DOC_URL + "pyb.I2C.html#pyb.I2C.mem_write" },
        { value: "CONTROLLER", description: "MPY_PYB_I2C_CONTROLLER", docUrl: DOC_URL + "pyb.I2C.html#pyb.I2C.CONTROLLER", kind: "constant" },
        { value: "PERIPHERAL", description: "MPY_PYB_I2C_PERIPHERAL", docUrl: DOC_URL + "pyb.I2C.html#pyb.I2C.PERIPHERAL", kind: "constant" }
    ];

    typeTree["SPI@pyb"] = [
        { title: "init(mode, baudrate=328125, *, polarity=1, phase=0, bits=8, firstbit=SPI.MSB, ti=False, crc=None)", value: "init", meta: "-- <function>", snippet: "init($1)", description: "MPY_PYB_SPI_INIT", docUrl: DOC_URL + "pyb.SPI.html#pyb.SPI.init" },
        { title: "deinit()", value: "deinit", meta: "-- <function>", snippet: "deinit()", description: "MPY_PYB_SPI_DEINIT", docUrl: DOC_URL + "pyb.SPI.html#pyb.SPI.deinit" },
        { title: "send(send, timeout=5000)", value: "send", meta: "-- <function>", snippet: "send($1)", description: "MPY_PYB_SPI_SEND", docUrl: DOC_URL + "pyb.SPI.html#pyb.SPI.send" },
        { title: "recv(recv, timeout=5000)", value: "recv", meta: "-- <function>", snippet: "recv($1)", description: "MPY_PYB_SPI_RECV", returns: "bytes", docUrl: DOC_URL + "pyb.SPI.html#pyb.SPI.recv" },
        { title: "send_recv(send, recv=None, timeout=5000)", value: "send_recv", meta: "-- <function>", snippet: "send_recv($1)", description: "MPY_PYB_SPI_SEND_RECV", returns: "bytes", docUrl: DOC_URL + "pyb.SPI.html#pyb.SPI.send_recv" },
        { value: "CONTROLLER", description: "MPY_PYB_SPI_CONTROLLER", docUrl: DOC_URL + "pyb.SPI.html#pyb.SPI.CONTROLLER", kind: "constant" },
        { value: "PERIPHERAL", description: "MPY_PYB_SPI_PERIPHERAL", docUrl: DOC_URL + "pyb.SPI.html#pyb.SPI.PERIPHERAL", kind: "constant" },
        { value: "MSB", description: "MPY_PYB_SPI_MSB", docUrl: DOC_URL + "pyb.SPI.html#pyb.SPI.MSB", kind: "constant" },
        { value: "LSB", description: "MPY_PYB_SPI_LSB", docUrl: DOC_URL + "pyb.SPI.html#pyb.SPI.LSB", kind: "constant" }
    ];

    typeTree["UART@pyb"] = [
        { title: "init(baudrate, bits=8, parity=None, stop=1, *, timeout=0, timeout_char=0, read_buf_len=64, flow=0)", value: "init", meta: "-- <function>", snippet: "init($1)", description: "MPY_PYB_UART_INIT", docUrl: DOC_URL + "pyb.UART.html#pyb.UART.init" },
        { title: "deinit()", value: "deinit", meta: "-- <function>", snippet: "deinit()", description: "MPY_PYB_UART_DEINIT", docUrl: DOC_URL + "pyb.UART.html#pyb.UART.deinit" },
        { title: "any()", value: "any", meta: "-- <function>", snippet: "any()", description: "MPY_PYB_UART_ANY", returns: "int", docUrl: DOC_URL + "pyb.UART.html#pyb.UART.any" },
        { title: "read([nbytes])", value: "read", meta: "-- <function>", snippet: "read($1)", description: "MPY_PYB_UART_READ", returns: "bytes", docUrl: DOC_URL + "pyb.UART.html#pyb.UART.read" },
        { title: "readinto(buf[, nbytes])", value: "readinto", meta: "-- <function>", snippet: "readinto($1)", description: "MPY_PYB_UART_READINTO", returns: "int", docUrl: DOC_URL + "pyb.UART.html#pyb.UART.readinto" },
        { title: "readline()", value: "readline", meta: "-- <function>", snippet: "readline()", description: "MPY_PYB_UART_READLINE", returns: "bytes", docUrl: DOC_URL + "pyb.UART.html#pyb.UART.readline" },
        { title: "write(buf)", value: "write", meta: "-- <function>", snippet: "write($1)", description: "MPY_PYB_UART_WRITE", returns: "int", docUrl: DOC_URL + "pyb.UART.html#pyb.UART.write" },
        { title: "writechar(char)", value: "writechar", meta: "-- <function>", snippet: "writechar($1)", description: "MPY_PYB_UART_WRITECHAR", docUrl: DOC_URL + "pyb.UART.html#pyb.UART.writechar" }
    ];

    typeTree["Timer@pyb"] = [
        { title: "init(*, freq, prescaler, period, mode=Timer.UP, div=1, callback=None, deadtime=0, brk=Timer.BRK_OFF, hard=True)", value: "init", meta: "-- <function>", snippet: "init($1)", description: "MPY_PYB_TIMER_INIT", docUrl: DOC_URL + "pyb.Timer.html#pyb.Timer.init" },
        { title: "deinit()", value: "deinit", meta: "-- <function>", snippet: "deinit()", description: "MPY_PYB_TIMER_DEINIT", docUrl: DOC_URL + "pyb.Timer.html#pyb.Timer.deinit" },
        { title: "callback(fun)", value: "callback", meta: "-- <function>", snippet: "callback($1)", description: "MPY_PYB_TIMER_CALLBACK", docUrl: DOC_URL + "pyb.Timer.html#pyb.Timer.callback" },
        { title: "channel(channel, mode, ...)", value: "channel", meta: "-- <function>", snippet: "channel($1)", description: "MPY_PYB_TIMER_CHANNEL", returns: "TimerChannel@pyb", docUrl: DOC_URL + "pyb.Timer.html#pyb.Timer.channel" },
        { title: "counter([value])", value: "counter", meta: "-- <function>", snippet: "counter($1)", description: "MPY_PYB_TIMER_COUNTER", returns: "int", docUrl: DOC_URL + "pyb.Timer.html#pyb.Timer.counter" },
        { title: "freq([value])", value: "freq", meta: "-- <function>", snippet: "freq($1)", description: "MPY_PYB_TIMER_FREQ", returns: "int", docUrl: DOC_URL + "pyb.Timer.html#pyb.Timer.freq" },
        { value: "UP", description: "MPY_PYB_TIMER_UP", docUrl: DOC_URL + "pyb.Timer.html#pyb.Timer.UP", kind: "constant" },
        { value: "DOWN", description: "MPY_PYB_TIMER_DOWN", docUrl: DOC_URL + "pyb.Timer.html#pyb.Timer.DOWN", kind: "constant" },
        { value: "PWM", description: "MPY_PYB_TIMER_PWM", docUrl: DOC_URL + "pyb.Timer.html#pyb.Timer.PWM", kind: "constant" },
        { value: "PWM_INVERTED", description: "MPY_PYB_TIMER_PWM_INVERTED", docUrl: DOC_URL + "pyb.Timer.html#pyb.Timer.PWM_INVERTED", kind: "constant" }
    ];

    typeTree["USB_VCP@pyb"] = [
        { title: "isconnected()", value: "isconnected", meta: "-- <function>", snippet: "isconnected()", description: "MPY_PYB_USB_VCP_ISCONNECTED", returns: "bool", docUrl: DOC_URL + "pyb.USB_VCP.html#pyb.USB_VCP.isconnected" },
        { title: "any()", value: "any", meta: "-- <function>", snippet: "any()", description: "MPY_PYB_USB_VCP_ANY", returns: "int", docUrl: DOC_URL + "pyb.USB_VCP.html#pyb.USB_VCP.any" },
        { title: "read([nbytes])", value: "read", meta: "-- <function>", snippet: "read($1)", description: "MPY_PYB_USB_VCP_READ", returns: "bytes", docUrl: DOC_URL + "pyb.USB_VCP.html#pyb.USB_VCP.read" },
        { title: "write(buf)", value: "write", meta: "-- <function>", snippet: "write($1)", description: "MPY_PYB_USB_VCP_WRITE", returns: "int", docUrl: DOC_URL + "pyb.USB_VCP.html#pyb.USB_VCP.write" }
    ];

    typeTree["LED@pyb"] = [
        { title: "on()", value: "on", meta: "-- <function>", snippet: "on()", description: "MPY_PYB_LED_ON", docUrl: DOC_URL + "pyb.LED.html#pyb.LED.on" },
        { title: "off()", value: "off", meta: "-- <function>", snippet: "off()", description: "MPY_PYB_LED_OFF", docUrl: DOC_URL + "pyb.LED.html#pyb.LED.off" },
        { title: "toggle()", value: "toggle", meta: "-- <function>", snippet: "toggle()", description: "MPY_PYB_LED_TOGGLE", docUrl: DOC_URL + "pyb.LED.html#pyb.LED.toggle" },
        { title: "intensity([value])", value: "intensity", meta: "-- <function>", snippet: "intensity($1)", description: "MPY_PYB_LED_INTENSITY", returns: "int", docUrl: DOC_URL + "pyb.LED.html#pyb.LED.intensity" }
    ];

    typeTree["ExtInt@pyb"] = [
        { title: "regs()", value: "regs", meta: "classmethod", snippet: "regs()", description: "MPY_PYB_EXTINT_REGS", returns: "tuple", docUrl: DOC_URL + "pyb.ExtInt.html#pyb.ExtInt.regs" },
        { title: "enable()", value: "enable", meta: "-- <function>", snippet: "enable()", description: "MPY_PYB_EXTINT_ENABLE", docUrl: DOC_URL + "pyb.ExtInt.html#pyb.ExtInt.enable" },
        { title: "disable()", value: "disable", meta: "-- <function>", snippet: "disable()", description: "MPY_PYB_EXTINT_DISABLE", docUrl: DOC_URL + "pyb.ExtInt.html#pyb.ExtInt.disable" },
        { value: "IRQ_RISING", description: "MPY_PYB_EXTINT_IRQ_RISING", docUrl: DOC_URL + "pyb.ExtInt.html#pyb.ExtInt.IRQ_RISING", kind: "constant" },
        { value: "IRQ_FALLING", description: "MPY_PYB_EXTINT_IRQ_FALLING", docUrl: DOC_URL + "pyb.ExtInt.html#pyb.ExtInt.IRQ_FALLING", kind: "constant" },
        { value: "IRQ_RISING_FALLING", description: "MPY_PYB_EXTINT_IRQ_RISING_FALLING", docUrl: DOC_URL + "pyb.ExtInt.html#pyb.ExtInt.IRQ_RISING_FALLING", kind: "constant" }
    ];

    typeTree["Accel@pyb"] = [
        { title: "x()", value: "x", meta: "-- <function>", snippet: "x()", description: "MPY_PYB_ACCEL_X", docUrl: DOC_URL + "pyb.Accel.html#pyb.Accel.x" },
        { title: "y()", value: "y", meta: "-- <function>", snippet: "y()", description: "MPY_PYB_ACCEL_Y", docUrl: DOC_URL + "pyb.Accel.html#pyb.Accel.y" },
        { title: "z()", value: "z", meta: "-- <function>", snippet: "z()", description: "MPY_PYB_ACCEL_Z", docUrl: DOC_URL + "pyb.Accel.html#pyb.Accel.z" },
    ];

    typeTree["PinAF@pyb"] = [
        { title: "__str__()", value: "__str__", meta: "-- <function>", snippet: "__str__()", description: "MPY_PYB_PINAF_STR", docUrl: DOC_URL + "pyb.Pin.html#pyb.PinAF.__str__" },
        { title: "index()", value: "index", meta: "-- <function>", snippet: "index()", description: "MPY_PYB_PINAF_INDEX", returns: "int", docUrl: DOC_URL + "pyb.Pin.html#pyb.PinAF.index" },
        { title: "name()", value: "name", meta: "-- <function>", snippet: "name()", description: "MPY_PYB_PINAF_NAME", returns: "str", docUrl: DOC_URL + "pyb.Pin.html#pyb.PinAF.name" },
        { title: "reg()", value: "reg", meta: "-- <function>", snippet: "reg()", description: "MPY_PYB_PINAF_REG", returns: "int", docUrl: DOC_URL + "pyb.Pin.html#pyb.PinAF.reg" },
    ];

    typeTree["RTC@pyb"] = [
        { title: "wakeup(timeout, callback=None)", value: "wakeup", meta: "-- <function>", snippet: "wakeup(${1:})", description: "MPY_PYB_RTC_WAKEUP", docUrl: DOC_URL + "pyb.RTC.html#pyb.RTC.wakeup" },
        { title: "calibration([cal])", value: "calibration", meta: "-- <function>", snippet: "calibration(${1:})", description: "MPY_PYB_RTC_CALIBRATION", docUrl: DOC_URL + "pyb.RTC.html#pyb.RTC.calibration" },
        { title: "info()", value: "info", meta: "-- <function>", snippet: "info()", description: "MPY_PYB_RTC_INFO", docUrl: DOC_URL + "pyb.RTC.html#pyb.RTC.info" },
    ];

    typeTree["Servo@pyb"] = [
        { title: "angle([angle, time=0])", value: "angle", meta: "-- <function>", snippet: "angle(${1:})", description: "MPY_PYB_SERVO_ANGLE", docUrl: DOC_URL + "pyb.Servo.html#pyb.Servo.angle" },
        { title: "speed([speed, time=0])", value: "speed", meta: "-- <function>", snippet: "speed(${1:})", description: "MPY_PYB_SERVO_SPEED", docUrl: DOC_URL + "pyb.Servo.html#pyb.Servo.speed" },
        { title: "pulse_width([value])", value: "pulse_width", meta: "-- <function>", snippet: "pulse_width(${1:})", description: "MPY_PYB_SERVO_PULSE_WIDTH", docUrl: DOC_URL + "pyb.Servo.html#pyb.Servo.pulse_width" },
        { title: "calibration([pulse_min, pulse_max, pulse_centre])", value: "calibration", meta: "-- <function>", snippet: "calibration(${1:})", description: "MPY_PYB_SERVO_CALIBRATION", docUrl: DOC_URL + "pyb.Servo.html#pyb.Servo.calibration" },
    ];

    typeTree["Flash@pyb"] = [
        { title: "readblocks(blocknum, buf)", value: "readblocks", meta: "-- <function>", snippet: "readblocks($1)", description: "MPY_PYB_FLASH_READBLOCKS", docUrl: DOC_URL + "pyb.Flash.html#pyb.Flash.readblocks" },
        { title: "writeblocks(blocknum, buf)", value: "writeblocks", meta: "-- <function>", snippet: "writeblocks($1)", description: "MPY_PYB_FLASH_WRITEBLOCKS", docUrl: DOC_URL + "pyb.Flash.html#pyb.Flash.writeblocks" },
        { title: "ioctl(op, arg)", value: "ioctl", meta: "-- <function>", snippet: "ioctl($1)", description: "MPY_PYB_FLASH_IOCTL", docUrl: DOC_URL + "pyb.Flash.html#pyb.Flash.ioctl" }
    ];

    typeTree["Switch@pyb"] = [
        { title: "value()", value: "value", meta: "-- <function>", snippet: "value()", description: "MPY_PYB_SWITCH_VALUE", docUrl: DOC_URL + "pyb.Switch.html#pyb.Switch.value" },
        { title: "__call__()", value: "__call__", meta: "-- <function>", snippet: "__call__()", description: "MPY_PYB_SWITCH_CALL", docUrl: DOC_URL + "pyb.Switch.html#pyb.Switch.__call__" },
        { title: "callback(fun)", value: "callback", meta: "-- <function>", snippet: "callback($1)", description: "MPY_PYB_SWITCH_CALLBACK", docUrl: DOC_URL + "pyb.Switch.html#pyb.Switch.callback" }
    ];

    typeTree["DAC@pyb"] = [
        { title: "write(value)", value: "write", meta: "-- <function>", snippet: "write($1)", description: "MPY_PYB_DAC_WRITE", docUrl: DOC_URL + "pyb.DAC.html#pyb.DAC.write" },
        { title: "write_timed(data, freq, *, mode=DAC.NORMAL)", value: "write_timed", meta: "-- <function>", snippet: "write_timed($1)", description: "MPY_PYB_DAC_WRITE_TIMED", docUrl: DOC_URL + "pyb.DAC.html#pyb.DAC.write_timed" },
        { title: "noise(freq)", value: "noise", meta: "-- <function>", snippet: "noise($1)", description: "MPY_PYB_DAC_NOISE", docUrl: DOC_URL + "pyb.DAC.html#pyb.DAC.noise" },
        { title: "triangle(freq)", value: "triangle", meta: "-- <function>", snippet: "triangle($1)", description: "MPY_PYB_DAC_TRIANGLE", docUrl: DOC_URL + "pyb.DAC.html#pyb.DAC.triangle" },
        { value: "NORMAL", description: "MPY_PYB_DAC_NORMAL", docUrl: DOC_URL + "pyb.DAC.html#pyb.DAC.NORMAL", kind: "constant" },
        { value: "CIRCULAR", description: "MPY_PYB_DAC_CIRCULAR", docUrl: DOC_URL + "pyb.DAC.html#pyb.DAC.CIRCULAR", kind: "constant" }
    ];

    typeTree["CAN@pyb"] = [
        { title: "init(mode, *, ...)", value: "init", meta: "-- <function>", snippet: "init($1)", description: "MPY_PYB_CAN_INIT", docUrl: DOC_URL + "pyb.CAN.html#pyb.CAN.init" },
        { title: "deinit()", value: "deinit", meta: "-- <function>", snippet: "deinit()", description: "MPY_PYB_CAN_DEINIT", docUrl: DOC_URL + "pyb.CAN.html#pyb.CAN.deinit" },
        { title: "restart()", value: "restart", meta: "-- <function>", snippet: "restart()", description: "MPY_PYB_CAN_RESTART", docUrl: DOC_URL + "pyb.CAN.html#pyb.CAN.restart" },
        { title: "state()", value: "state", meta: "-- <function>", snippet: "state()", description: "MPY_PYB_CAN_STATE", docUrl: DOC_URL + "pyb.CAN.html#pyb.CAN.state" },
        { title: "info([list])", value: "info", meta: "-- <function>", snippet: "info($1)", description: "MPY_PYB_CAN_INFO", docUrl: DOC_URL + "pyb.CAN.html#pyb.CAN.info" },
        { title: "setfilter(bank, mode, fifo, params, *, ...)", value: "setfilter", meta: "-- <function>", snippet: "setfilter($1)", description: "MPY_PYB_CAN_SETFILTER", docUrl: DOC_URL + "pyb.CAN.html#pyb.CAN.setfilter" },
        { title: "send(data, id, *, ...)", value: "send", meta: "-- <function>", snippet: "send($1)", description: "MPY_PYB_CAN_SEND", docUrl: DOC_URL + "pyb.CAN.html#pyb.CAN.send" },
        { title: "recv(fifo, *, timeout=5000)", value: "recv", meta: "-- <function>", snippet: "recv($1)", description: "MPY_PYB_CAN_RECV", docUrl: DOC_URL + "pyb.CAN.html#pyb.CAN.recv" }
    ];
    if (['steami', 'wb55']) {

        tree.stm32_ble = [
            { value: "_ADV_TYPE_FLAGS", description: "STM32_STM32_BLE__ADV_TYPE_FLAGS" },
            { value: "_ADV_TYPE_NAME", description: "STM32_STM32_BLE__ADV_TYPE_NAME" },
            { value: "_ADV_TYPE_UUID16_COMPLETE", description: "STM32_STM32_BLE__ADV_TYPE_UUID16_COMPLETE" },
            { value: "_ADV_TYPE_UUID32_COMPLETE", description: "STM32_STM32_BLE__ADV_TYPE_UUID32_COMPLETE" },
            { value: "_ADV_TYPE_UUID128_COMPLETE", description: "STM32_STM32_BLE__ADV_TYPE_UUID128_COMPLETE" },
            { value: "_ADV_TYPE_UUID16_MORE", description: "STM32_STM32_BLE__ADV_TYPE_UUID16_MORE" },
            { value: "_ADV_TYPE_UUID32_MORE", description: "STM32_STM32_BLE__ADV_TYPE_UUID32_MORE" },
            { value: "_ADV_TYPE_UUID128_MORE", description: "STM32_STM32_BLE__ADV_TYPE_UUID128_MORE" },
            { value: "_ADV_TYPE_APPEARANCE", description: "STM32_STM32_BLE__ADV_TYPE_APPEARANCE" },
            { value: "_IRQ_CENTRAL_CONNECT", description: "STM32_STM32_BLE__IRQ_CENTRAL_CONNECT" },
            { value: "_IRQ_CENTRAL_DISCONNECT", description: "STM32_STM32_BLE__IRQ_CENTRAL_DISCONNECT" },
            { value: "_IRQ_GATTS_WRITE", description: "STM32_STM32_BLE__IRQ_GATTS_WRITE" },
            { value: "_ADV_APPEARANCE_GENERIC_COMPUTER", description: "STM32_STM32_BLE__ADV_APPEARANCE_GENERIC_COMPUTER" },
            { title: "advertising_payload(limited_disc, br_edr, name, services, appearance)", value: "advertising_payload", meta: "-- <function>", description: "STM32_STM32_BLE_ADVERTISING_PAYLOAD", snippet: "advertising_payload($1)" },
            { title: "decode_field(payload, adv_type)", value: "decode_field", meta: "-- <function>", description: "STM32_STM32_BLE_DECODE_FIELD", snippet: "decode_field($1)" },
            { title: "decode_name(payload)", value: "decode_name", meta: "-- <function>", description: "STM32_STM32_BLE_DECODE_NAME", snippet: "decode_name($1)" },
            { title: "decode_services(payload)", value: "decode_services", meta: "-- <function>", description: "STM32_STM32_BLE_DECODE_SERVICES", snippet: "decode_services($1)" },
            { value: "BlueUart", meta: "stm32_ble", kind: "class", description: "STM32_STM32_BLE_BLUEUART", content: [] },
            { title: "BlueUart(name, UUID_UART, UUID_TX, UUID_RX, rxbuf=100)", value: "BlueUart()", meta: "constructor", description: "STM32_STM32_BLE_BLUEUART_CTOR", returns: "BlueUart", snippet: "BlueUart($1)" },
            { value: "__name__", meta: "stm32_ble", description: "STM32_STM32_BLE_MODULE" }
        ];

        tree.stm32_bleAdvertising = [
            { value: "_ADV_TYPE_FLAGS", description: "STM32_STM32_BLEADVERTISING__ADV_TYPE_FLAGS" },
            { value: "_ADV_TYPE_NAME", description: "STM32_STM32_BLEADVERTISING__ADV_TYPE_NAME" },
            { value: "_ADV_TYPE_UUID16_COMPLETE", description: "STM32_STM32_BLEADVERTISING__ADV_TYPE_UUID16_COMPLETE" },
            { value: "_ADV_TYPE_UUID32_COMPLETE", description: "STM32_STM32_BLEADVERTISING__ADV_TYPE_UUID32_COMPLETE" },
            { value: "_ADV_TYPE_UUID128_COMPLETE", description: "STM32_STM32_BLEADVERTISING__ADV_TYPE_UUID128_COMPLETE" },
            { value: "_ADV_TYPE_UUID16_MORE", description: "STM32_STM32_BLEADVERTISING__ADV_TYPE_UUID16_MORE" },
            { value: "_ADV_TYPE_UUID32_MORE", description: "STM32_STM32_BLEADVERTISING__ADV_TYPE_UUID32_MORE" },
            { value: "_ADV_TYPE_UUID128_MORE", description: "STM32_STM32_BLEADVERTISING__ADV_TYPE_UUID128_MORE" },
            { value: "_ADV_TYPE_APPEARANCE", description: "STM32_STM32_BLEADVERTISING__ADV_TYPE_APPEARANCE" },
            { value: "_ADV_TYPE_MANUFACTURER", description: "STM32_STM32_BLEADVERTISING__ADV_TYPE_MANUFACTURER" },
            { title: "adv_payload(limited_disc, br_edr, name, services, appearance, manufacturer)", value: "adv_payload", meta: "-- <function>", description: "STM32_STM32_BLEADVERTISING_ADV_PAYLOAD", snippet: "adv_payload($1)" },
            { title: "decode_field(payload, adv_type)", value: "decode_field", meta: "-- <function>", description: "STM32_STM32_BLEADVERTISING_DECODE_FIELD", snippet: "decode_field($1)" },
            { title: "decode_name(payload)", value: "decode_name", meta: "-- <function>", description: "STM32_STM32_BLEADVERTISING_DECODE_NAME", snippet: "decode_name($1)" },
            { title: "decode_services(payload)", value: "decode_services", meta: "-- <function>", description: "STM32_STM32_BLEADVERTISING_DECODE_SERVICES", snippet: "decode_services($1)" },
            { value: "__name__", meta: "stm32_bleAdvertising", description: "STM32_STM32_BLEADVERTISING_MODULE" }
        ];

        tree.stm32_ble_sensor = [
            { value: "_IRQ_CENTRAL_CONNECT", description: "STM32_STM32_BLE_SENSOR__IRQ_CENTRAL_CONNECT" },
            { value: "_IRQ_CENTRAL_DISCONNECT", description: "STM32_STM32_BLE_SENSOR__IRQ_CENTRAL_DISCONNECT" },
            { value: "_IRQ_GATTS_WRITE", description: "STM32_STM32_BLE_SENSOR__IRQ_GATTS_WRITE" },
            { value: "_ST_APP_UUID", description: "STM32_STM32_BLE_SENSOR__ST_APP_UUID" },
            { value: "_PROTOCOL_VERSION", description: "STM32_STM32_BLE_SENSOR__PROTOCOL_VERSION" },
            { value: "_DEVICE_ID", description: "STM32_STM32_BLE_SENSOR__DEVICE_ID" },
            { value: "_DEVICE_MAC", description: "STM32_STM32_BLE_SENSOR__DEVICE_MAC" },
            { value: "BLESensor", meta: "stm32_ble_sensor", kind: "class", description: "STM32_STM32_BLE_SENSOR_BLESENSOR", content: [] },
            { title: "BLESensor(ble, services, mask)", value: "BLESensor()", meta: "constructor", description: "STM32_STM32_BLE_SENSOR_BLESENSOR_CTOR", returns: "BLESensor", snippet: "BLESensor($1)" },
            { value: "__name__", meta: "stm32_ble_sensor", description: "STM32_STM32_BLE_SENSOR_MODULE" }
        ];

        tree.stm32_ble_uart = [
            { value: "_IRQ_CENTRAL_CONNECT", description: "STM32_STM32_BLE_UART__IRQ_CENTRAL_CONNECT" },
            { value: "_IRQ_CENTRAL_DISCONNECT", description: "STM32_STM32_BLE_UART__IRQ_CENTRAL_DISCONNECT" },
            { value: "_IRQ_GATTS_WRITE", description: "STM32_STM32_BLE_UART__IRQ_GATTS_WRITE" },
            { value: "_FLAG_WRITE", description: "STM32_STM32_BLE_UART__FLAG_WRITE" },
            { value: "_FLAG_NOTIFY", description: "STM32_STM32_BLE_UART__FLAG_NOTIFY" },
            { value: "_UART_UUID", description: "STM32_STM32_BLE_UART__UART_UUID" },
            { value: "_UART_TX", description: "STM32_STM32_BLE_UART__UART_TX" },
            { value: "_UART_RX", description: "STM32_STM32_BLE_UART__UART_RX" },
            { value: "_UART_SERVICE", description: "STM32_STM32_BLE_UART__UART_SERVICE" },
            { value: "_ADV_APPEARANCE_GENERIC_COMPUTER", description: "STM32_STM32_BLE_UART__ADV_APPEARANCE_GENERIC_COMPUTER" },
            { value: "_MAX_NB_BYTES", description: "STM32_STM32_BLE_UART__MAX_NB_BYTES" },
            { value: "UART_BLE", meta: "stm32_ble_uart", kind: "class", description: "STM32_STM32_BLE_UART_UART_BLE", content: [] },
            { title: "UART_BLE(ble, name=\"WB55-UART\", rxbuf=stm32_ble_uart._MAX_NB_BYTES)", value: "UART_BLE()", meta: "constructor", description: "STM32_STM32_BLE_UART_UART_BLE_CTOR", returns: "UART_BLE", snippet: "UART_BLE($1)" },
            { value: "__name__", meta: "stm32_ble_uart", description: "STM32_STM32_BLE_UART_MODULE" }
        ];

        typeTree.BLESensor = [
            { title: "init_service(registerCallback, name)", value: "init_service", meta: "-- <function>", snippet: "init_service($1)", description: "STM32_STM32_BLE_SENSOR_BLESENSOR_INIT_SERVICE" },
            { title: "_irq(event, data)", value: "_irq", meta: "-- <function>", snippet: "_irq($1)", description: "STM32_STM32_BLE_SENSOR_BLESENSOR__IRQ" },
            { title: "set_data(package, data_handle, notify)", value: "set_data", meta: "-- <function>", snippet: "set_data($1)", description: "STM32_STM32_BLE_SENSOR_BLESENSOR_SET_DATA" },
            { title: "_advertise(interval_us)", value: "_advertise", meta: "-- <function>", snippet: "_advertise($1)", description: "STM32_STM32_BLE_SENSOR_BLESENSOR__ADVERTISE" }
        ];

        typeTree.BlueUart = [
            { title: "irq(handler)", value: "irq", meta: "-- <function>", snippet: "irq($1)", description: "STM32_STM32_BLE_BLUEUART_IRQ" },
            { title: "_irq(event, data)", value: "_irq", meta: "-- <function>", snippet: "_irq($1)", description: "STM32_STM32_BLE_BLUEUART__IRQ" },
            { title: "any()", value: "any", meta: "-- <function>", snippet: "any()", description: "STM32_STM32_BLE_BLUEUART_ANY" },
            { title: "read(sz)", value: "read", meta: "-- <function>", snippet: "read($1)", description: "STM32_STM32_BLE_BLUEUART_READ" },
            { title: "write(data)", value: "write", meta: "-- <function>", snippet: "write($1)", description: "STM32_STM32_BLE_BLUEUART_WRITE" },
            { title: "close()", value: "close", meta: "-- <function>", snippet: "close()", description: "STM32_STM32_BLE_BLUEUART_CLOSE" },
            { title: "_advertise(interval_us)", value: "_advertise", meta: "-- <function>", snippet: "_advertise($1)", description: "STM32_STM32_BLE_BLUEUART__ADVERTISE" }
        ];

        typeTree.UART_BLE = [
            { title: "irq(handler)", value: "irq", meta: "-- <function>", snippet: "irq($1)", description: "STM32_STM32_BLE_UART_UART_BLE_IRQ" },
            { title: "_irq(event, data)", value: "_irq", meta: "-- <function>", snippet: "_irq($1)", description: "STM32_STM32_BLE_UART_UART_BLE__IRQ" },
            { title: "any()", value: "any", meta: "-- <function>", snippet: "any()", description: "STM32_STM32_BLE_UART_UART_BLE_ANY" },
            { title: "read(sz)", value: "read", meta: "-- <function>", snippet: "read($1)", description: "STM32_STM32_BLE_UART_UART_BLE_READ" },
            { title: "write(data)", value: "write", meta: "-- <function>", snippet: "write($1)", description: "STM32_STM32_BLE_UART_UART_BLE_WRITE" },
            { title: "close()", value: "close", meta: "-- <function>", snippet: "close()", description: "STM32_STM32_BLE_UART_UART_BLE_CLOSE" },
            { title: "_advertise(interval_us)", value: "_advertise", meta: "-- <function>", snippet: "_advertise($1)", description: "STM32_STM32_BLE_UART_UART_BLE__ADVERTISE" }
        ];

    }

    if (['wb55', 'l476'].includes(_interface)) {

        tree.HTS221 = [
            { value: "I2C_ADDRESS", description: "STM32_IKS01A3_HTS221_I2C_ADDRESS" },
            { value: "HTS221", meta: "HTS221", kind: "class", description: "STM32_IKS01A3_HTS221_HTS221", content: [] },
            { title: "HTS221(i2c, address=I2C_ADDRESS)", value: "HTS221()", meta: "constructor", description: "STM32_IKS01A3_HTS221_HTS221_CTOR", returns: "HTS221", snippet: "HTS221($1)" },
            { value: "__name__", meta: "HTS221", description: "STM32_IKS01A3_HTS221_MODULE" }
        ];
        typeTree.HTS221 = [
            { title: "oneshot_mode(oneshot=None)", value: "oneshot_mode", meta: "-- <function>", snippet: "oneshot_mode($1)", description: "STM32_IKS01A3_HTS221_HTS221_ONESHOT_MODE" },
            { title: "ONE_SHOT(b)", value: "ONE_SHOT", meta: "-- <function>", snippet: "ONE_SHOT($1)", description: "STM32_IKS01A3_HTS221_HTS221_ONE_SHOT" },
            { title: "int16(d)", value: "int16", meta: "-- <function>", snippet: "int16($1)", description: "STM32_IKS01A3_HTS221_HTS221_INT16" },
            { title: "setreg(reg, dat)", value: "setreg", meta: "-- <function>", snippet: "setreg($1)", description: "STM32_IKS01A3_HTS221_HTS221_SETREG" },
            { title: "getreg(reg)", value: "getreg", meta: "-- <function>", snippet: "getreg($1)", description: "STM32_IKS01A3_HTS221_HTS221_GETREG" },
            { title: "get2reg(reg)", value: "get2reg", meta: "-- <function>", snippet: "get2reg($1)", description: "STM32_IKS01A3_HTS221_HTS221_GET2REG" },
            { title: "temperature()", value: "temperature", meta: "-- <function>", snippet: "temperature()", description: "STM32_IKS01A3_HTS221_HTS221_TEMPERATURE" },
            { title: "humidity()", value: "humidity", meta: "-- <function>", snippet: "humidity()", description: "STM32_IKS01A3_HTS221_HTS221_HUMIDITY" },
            { title: "get()", value: "get", meta: "-- <function>", snippet: "get()", description: "STM32_IKS01A3_HTS221_HTS221_GET" },
            { title: "temperature_irq()", value: "temperature_irq", meta: "-- <function>", snippet: "temperature_irq()", description: "STM32_IKS01A3_HTS221_HTS221_TEMPERATURE_IRQ" },
            { title: "humidity_irq()", value: "humidity_irq", meta: "-- <function>", snippet: "humidity_irq()", description: "STM32_IKS01A3_HTS221_HTS221_HUMIDITY_IRQ" },
            { title: "get_irq()", value: "get_irq", meta: "-- <function>", snippet: "get_irq()", description: "STM32_IKS01A3_HTS221_HTS221_GET_IRQ" },
            { title: "power(on=None)", value: "power", meta: "-- <function>", snippet: "power($1)", description: "STM32_IKS01A3_HTS221_HTS221_POWER" }
        ];

        tree.LIS2DW12 = [
            { value: "LIS2DW12_CTRL1", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_CTRL1" },
            { value: "LIS2DW12_CTRL2", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_CTRL2" },
            { value: "LIS2DW12_CTRL3", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_CTRL3" },
            { value: "LIS2DW12_CTRL6", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_CTRL6" },
            { value: "LIS2DW12_STATUS", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_STATUS" },
            { value: "LIS2DW12_OUT_T_L", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_OUT_T_L" },
            { value: "LIS2DW12_OUT_X_L", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_OUT_X_L" },
            { value: "LIS2DW12_OUT_Y_L", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_OUT_Y_L" },
            { value: "LIS2DW12_OUT_Z_L", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_OUT_Z_L" },
            { value: "LIS2DW12_SCALE", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_SCALE" },
            { value: "I2C_ADDRESS", description: "STM32_IKS01A3_LIS2DW12_I2C_ADDRESS" },
            { value: "LIS2DW12", meta: "LIS2DW12", kind: "class", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12", content: [] },
            { title: "LIS2DW12(i2c, address=I2C_ADDRESS)", value: "LIS2DW12()", meta: "constructor", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_CTOR", returns: "LIS2DW12", snippet: "LIS2DW12($1)" },
            { value: "__name__", meta: "LIS2DW12", description: "STM32_IKS01A3_LIS2DW12_MODULE" }
        ];
        typeTree.LIS2DW12 = [
            { title: "int16(d)", value: "int16", meta: "-- <function>", snippet: "int16($1)", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_INT16" },
            { title: "setreg(reg, dat)", value: "setreg", meta: "-- <function>", snippet: "setreg($1)", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_SETREG" },
            { title: "getreg(reg)", value: "getreg", meta: "-- <function>", snippet: "getreg($1)", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_GETREG" },
            { title: "get2reg(reg)", value: "get2reg", meta: "-- <function>", snippet: "get2reg($1)", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_GET2REG" },
            { title: "r_w_reg(reg, dat, mask)", value: "r_w_reg", meta: "-- <function>", snippet: "r_w_reg($1)", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_R_W_REG" },
            { title: "oneshot_mode(oneshot=None)", value: "oneshot_mode", meta: "-- <function>", snippet: "oneshot_mode($1)", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_ONESHOT_MODE" },
            { title: "ONE_SHOT()", value: "ONE_SHOT", meta: "-- <function>", snippet: "ONE_SHOT()", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_ONE_SHOT" },
            { title: "x_raw()", value: "x_raw", meta: "-- <function>", snippet: "x_raw()", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_X_RAW" },
            { title: "y_raw()", value: "y_raw", meta: "-- <function>", snippet: "y_raw()", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_Y_RAW" },
            { title: "z_raw()", value: "z_raw", meta: "-- <function>", snippet: "z_raw()", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_Z_RAW" },
            { title: "get_raw()", value: "get_raw", meta: "-- <function>", snippet: "get_raw()", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_GET_RAW" },
            { title: "mg(reg)", value: "mg", meta: "-- <function>", snippet: "mg($1)", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_MG" },
            { title: "x()", value: "x", meta: "-- <function>", snippet: "x()", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_X" },
            { title: "y()", value: "y", meta: "-- <function>", snippet: "y()", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_Y" },
            { title: "z()", value: "z", meta: "-- <function>", snippet: "z()", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_Z" },
            { title: "get()", value: "get", meta: "-- <function>", snippet: "get()", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_GET" },
            { title: "temperature()", value: "temperature", meta: "-- <function>", snippet: "temperature()", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_TEMPERATURE" },
            { title: "temperature_irq()", value: "temperature_irq", meta: "-- <function>", snippet: "temperature_irq()", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_TEMPERATURE_IRQ" },
            { title: "scale(dat=None)", value: "scale", meta: "-- <function>", snippet: "scale($1)", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_SCALE" },
            { title: "power(on=None)", value: "power", meta: "-- <function>", snippet: "power($1)", description: "STM32_IKS01A3_LIS2DW12_LIS2DW12_POWER" }
        ];

        tree.LIS2MDL = [
            { value: "LIS2MDL_CFG_REG_A", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_CFG_REG_A" },
            { value: "LIS2MDL_CFG_REG_C", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_CFG_REG_C" },
            { value: "LIS2MDL_STATUS_REG", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_STATUS_REG" },
            { value: "LIS2MDL_OUTX_L_REG", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_OUTX_L_REG" },
            { value: "LIS2MDL_OUTY_L_REG", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_OUTY_L_REG" },
            { value: "LIS2MDL_OUTZ_L_REG", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_OUTZ_L_REG" },
            { value: "I2C_ADDRESS", description: "STM32_IKS01A3_LIS2MDL_I2C_ADDRESS" },
            { value: "LIS2MDL", meta: "LIS2MDL", kind: "class", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL", content: [] },
            { title: "LIS2MDL(i2c, address=I2C_ADDRESS)", value: "LIS2MDL()", meta: "constructor", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_CTOR", returns: "LIS2MDL", snippet: "LIS2MDL($1)" },
            { value: "__name__", meta: "LIS2MDL", description: "STM32_IKS01A3_LIS2MDL_MODULE" }
        ];
        typeTree.LIS2MDL = [
            { title: "int16(d)", value: "int16", meta: "-- <function>", snippet: "int16($1)", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_INT16" },
            { title: "setreg(reg, dat)", value: "setreg", meta: "-- <function>", snippet: "setreg($1)", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_SETREG" },
            { title: "getreg(reg)", value: "getreg", meta: "-- <function>", snippet: "getreg($1)", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_GETREG" },
            { title: "get2reg(reg)", value: "get2reg", meta: "-- <function>", snippet: "get2reg($1)", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_GET2REG" },
            { title: "oneshot_mode(oneshot=None)", value: "oneshot_mode", meta: "-- <function>", snippet: "oneshot_mode($1)", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_ONESHOT_MODE" },
            { title: "ONE_SHOT()", value: "ONE_SHOT", meta: "-- <function>", snippet: "ONE_SHOT()", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_ONE_SHOT" },
            { title: "x_raw()", value: "x_raw", meta: "-- <function>", snippet: "x_raw()", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_X_RAW" },
            { title: "y_raw()", value: "y_raw", meta: "-- <function>", snippet: "y_raw()", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_Y_RAW" },
            { title: "z_raw()", value: "z_raw", meta: "-- <function>", snippet: "z_raw()", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_Z_RAW" },
            { title: "get_raw()", value: "get_raw", meta: "-- <function>", snippet: "get_raw()", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_GET_RAW" },
            { title: "x()", value: "x", meta: "-- <function>", snippet: "x()", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_X" },
            { title: "y()", value: "y", meta: "-- <function>", snippet: "y()", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_Y" },
            { title: "z()", value: "z", meta: "-- <function>", snippet: "z()", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_Z" },
            { title: "get()", value: "get", meta: "-- <function>", snippet: "get()", description: "STM32_IKS01A3_LIS2MDL_LIS2MDL_GET" }
        ];

        tree.LPS22 = [
            { value: "LPS22_CTRL_REG1", description: "STM32_IKS01A3_LPS22_LPS22_CTRL_REG1" },
            { value: "LPS22_CTRL_REG2", description: "STM32_IKS01A3_LPS22_LPS22_CTRL_REG2" },
            { value: "LPS22_STATUS", description: "STM32_IKS01A3_LPS22_LPS22_STATUS" },
            { value: "LPS22_TEMP_OUT_L", description: "STM32_IKS01A3_LPS22_LPS22_TEMP_OUT_L" },
            { value: "LPS22_PRESS_OUT_XL", description: "STM32_IKS01A3_LPS22_LPS22_PRESS_OUT_XL" },
            { value: "LPS22_PRESS_OUT_L", description: "STM32_IKS01A3_LPS22_LPS22_PRESS_OUT_L" },
            { value: "I2C_ADDRESS", description: "STM32_IKS01A3_LPS22_I2C_ADDRESS" },
            { value: "LPS22", meta: "LPS22", kind: "class", description: "STM32_IKS01A3_LPS22_LPS22", content: [] },
            { title: "LPS22(i2c, addr=I2C_ADDRESS)", value: "LPS22()", meta: "constructor", description: "STM32_IKS01A3_LPS22_LPS22_CTOR", returns: "LPS22", snippet: "LPS22($1)" },
            { value: "__name__", meta: "LPS22", description: "STM32_IKS01A3_LPS22_MODULE" }
        ];
        typeTree.LPS22 = [
            { title: "oneshot_mode(oneshot=None)", value: "oneshot_mode", meta: "-- <function>", snippet: "oneshot_mode($1)", description: "STM32_IKS01A3_LPS22_LPS22_ONESHOT_MODE" },
            { title: "int16(d)", value: "int16", meta: "-- <function>", snippet: "int16($1)", description: "STM32_IKS01A3_LPS22_LPS22_INT16" },
            { title: "setreg(reg, dat)", value: "setreg", meta: "-- <function>", snippet: "setreg($1)", description: "STM32_IKS01A3_LPS22_LPS22_SETREG" },
            { title: "getreg(reg)", value: "getreg", meta: "-- <function>", snippet: "getreg($1)", description: "STM32_IKS01A3_LPS22_LPS22_GETREG" },
            { title: "get2reg(reg)", value: "get2reg", meta: "-- <function>", snippet: "get2reg($1)", description: "STM32_IKS01A3_LPS22_LPS22_GET2REG" },
            { title: "ONE_SHOT(b)", value: "ONE_SHOT", meta: "-- <function>", snippet: "ONE_SHOT($1)", description: "STM32_IKS01A3_LPS22_LPS22_ONE_SHOT" },
            { title: "temperature()", value: "temperature", meta: "-- <function>", snippet: "temperature()", description: "STM32_IKS01A3_LPS22_LPS22_TEMPERATURE" },
            { title: "pressure()", value: "pressure", meta: "-- <function>", snippet: "pressure()", description: "STM32_IKS01A3_LPS22_LPS22_PRESSURE" },
            { title: "get()", value: "get", meta: "-- <function>", snippet: "get()", description: "STM32_IKS01A3_LPS22_LPS22_GET" },
            { title: "altitude()", value: "altitude", meta: "-- <function>", snippet: "altitude()", description: "STM32_IKS01A3_LPS22_LPS22_ALTITUDE" },
            { title: "temperature_irq()", value: "temperature_irq", meta: "-- <function>", snippet: "temperature_irq()", description: "STM32_IKS01A3_LPS22_LPS22_TEMPERATURE_IRQ" },
            { title: "pressure_irq()", value: "pressure_irq", meta: "-- <function>", snippet: "pressure_irq()", description: "STM32_IKS01A3_LPS22_LPS22_PRESSURE_IRQ" },
            { title: "get_irq()", value: "get_irq", meta: "-- <function>", snippet: "get_irq()", description: "STM32_IKS01A3_LPS22_LPS22_GET_IRQ" }
        ];

        tree.LSM6DSO = [
            { value: "LSM6DSO_CTRL1_XL", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_CTRL1_XL" },
            { value: "LSM6DSO_CTRL2_G", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_CTRL2_G" },
            { value: "LSM6DSO_CTRL3_C", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_CTRL3_C" },
            { value: "LSM6DSO_CTRL6_C", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_CTRL6_C" },
            { value: "LSM6DSO_CTRL8_XL", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_CTRL8_XL" },
            { value: "LSM6DSO_STATUS", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_STATUS" },
            { value: "LSM6DSO_OUT_TEMP_L", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_OUT_TEMP_L" },
            { value: "LSM6DSO_OUTX_L_G", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_OUTX_L_G" },
            { value: "LSM6DSO_OUTY_L_G", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_OUTY_L_G" },
            { value: "LSM6DSO_OUTZ_L_G", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_OUTZ_L_G" },
            { value: "LSM6DSO_OUTX_L_A", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_OUTX_L_A" },
            { value: "LSM6DSO_OUTY_L_A", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_OUTY_L_A" },
            { value: "LSM6DSO_OUTZ_L_A", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_OUTZ_L_A" },
            { value: "LSM6DSO_SCALEA", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_SCALEA" },
            { value: "LSM6DSO_SCALEG", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_SCALEG" },
            { value: "I2C_ADDRESS", description: "STM32_IKS01A3_LSM6DSO_I2C_ADDRESS" },
            { value: "LSM6DSO", meta: "LSM6DSO", kind: "class", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO", content: [] },
            { title: "LSM6DSO(i2c, addr=I2C_ADDRESS)", value: "LSM6DSO()", meta: "constructor", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_CTOR", returns: "LSM6DSO", snippet: "LSM6DSO($1)" },
            { value: "__name__", meta: "LSM6DSO", description: "STM32_IKS01A3_LSM6DSO_MODULE" }
        ];
        typeTree.LSM6DSO = [
            { title: "int16(d)", value: "int16", meta: "-- <function>", snippet: "int16($1)", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_INT16" },
            { title: "setreg(reg, dat)", value: "setreg", meta: "-- <function>", snippet: "setreg($1)", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_SETREG" },
            { title: "getreg(reg)", value: "getreg", meta: "-- <function>", snippet: "getreg($1)", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_GETREG" },
            { title: "get2reg(reg)", value: "get2reg", meta: "-- <function>", snippet: "get2reg($1)", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_GET2REG" },
            { title: "r_w_reg(reg, dat, mask)", value: "r_w_reg", meta: "-- <function>", snippet: "r_w_reg($1)", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_R_W_REG" },
            { title: "ax_raw()", value: "ax_raw", meta: "-- <function>", snippet: "ax_raw()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_AX_RAW" },
            { title: "ay_raw()", value: "ay_raw", meta: "-- <function>", snippet: "ay_raw()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_AY_RAW" },
            { title: "az_raw()", value: "az_raw", meta: "-- <function>", snippet: "az_raw()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_AZ_RAW" },
            { title: "gx_raw()", value: "gx_raw", meta: "-- <function>", snippet: "gx_raw()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_GX_RAW" },
            { title: "gy_raw()", value: "gy_raw", meta: "-- <function>", snippet: "gy_raw()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_GY_RAW" },
            { title: "gz_raw()", value: "gz_raw", meta: "-- <function>", snippet: "gz_raw()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_GZ_RAW" },
            { title: "mg(reg)", value: "mg", meta: "-- <function>", snippet: "mg($1)", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_MG" },
            { title: "mdps(reg)", value: "mdps", meta: "-- <function>", snippet: "mdps($1)", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_MDPS" },
            { title: "ax()", value: "ax", meta: "-- <function>", snippet: "ax()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_AX" },
            { title: "ay()", value: "ay", meta: "-- <function>", snippet: "ay()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_AY" },
            { title: "az()", value: "az", meta: "-- <function>", snippet: "az()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_AZ" },
            { title: "gx()", value: "gx", meta: "-- <function>", snippet: "gx()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_GX" },
            { title: "gy()", value: "gy", meta: "-- <function>", snippet: "gy()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_GY" },
            { title: "gz()", value: "gz", meta: "-- <function>", snippet: "gz()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_GZ" },
            { title: "get_a()", value: "get_a", meta: "-- <function>", snippet: "get_a()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_GET_A" },
            { title: "get_g()", value: "get_g", meta: "-- <function>", snippet: "get_g()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_GET_G" },
            { title: "get()", value: "get", meta: "-- <function>", snippet: "get()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_GET" },
            { title: "get_a_raw()", value: "get_a_raw", meta: "-- <function>", snippet: "get_a_raw()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_GET_A_RAW" },
            { title: "get_g()", value: "get_g", meta: "-- <function>", snippet: "get_g()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_GET_G" },
            { title: "get()", value: "get", meta: "-- <function>", snippet: "get()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_GET" },
            { title: "temperature()", value: "temperature", meta: "-- <function>", snippet: "temperature()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_TEMPERATURE" },
            { title: "temperature_irq()", value: "temperature_irq", meta: "-- <function>", snippet: "temperature_irq()", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_TEMPERATURE_IRQ" },
            { title: "scale_a(dat=None)", value: "scale_a", meta: "-- <function>", snippet: "scale_a($1)", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_SCALE_A" },
            { title: "scale_g(dat=None)", value: "scale_g", meta: "-- <function>", snippet: "scale_g($1)", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_SCALE_G" },
            { title: "power(on=None)", value: "power", meta: "-- <function>", snippet: "power($1)", description: "STM32_IKS01A3_LSM6DSO_LSM6DSO_POWER" }
        ];

        tree.STTS751 = [
            { value: "STTS751_RESOLUTION", description: "STM32_IKS01A3_STTS751_STTS751_RESOLUTION" },
            { value: "STTS751_REG_STATUS", description: "STM32_IKS01A3_STTS751_STTS751_REG_STATUS" },
            { value: "STTS751_REG_CONFIG", description: "STM32_IKS01A3_STTS751_STTS751_REG_CONFIG" },
            { value: "STTS751_REG_CONRAT", description: "STM32_IKS01A3_STTS751_STTS751_REG_CONRAT" },
            { value: "STTS751_REG_TEMPVH", description: "STM32_IKS01A3_STTS751_STTS751_REG_TEMPVH" },
            { value: "STTS751_REG_TEMPVL", description: "STM32_IKS01A3_STTS751_STTS751_REG_TEMPVL" },
            { value: "STTS751_REG_TEMPHH", description: "STM32_IKS01A3_STTS751_STTS751_REG_TEMPHH" },
            { value: "STTS751_REG_TEMPHL", description: "STM32_IKS01A3_STTS751_STTS751_REG_TEMPHL" },
            { value: "STTS751_REG_TEMPLH", description: "STM32_IKS01A3_STTS751_STTS751_REG_TEMPLH" },
            { value: "STTS751_REG_TEMPLL", description: "STM32_IKS01A3_STTS751_STTS751_REG_TEMPLL" },
            { value: "STTS751_REG_ONESHOT", description: "STM32_IKS01A3_STTS751_STTS751_REG_ONESHOT" },
            { value: "STTS751_REG_THERM", description: "STM32_IKS01A3_STTS751_STTS751_REG_THERM" },
            { value: "STTS751_REG_THERMHYS", description: "STM32_IKS01A3_STTS751_STTS751_REG_THERMHYS" },
            { value: "I2C_ADDRESS", description: "STM32_IKS01A3_STTS751_I2C_ADDRESS" },
            { value: "STTS751", meta: "STTS751", kind: "class", description: "STM32_IKS01A3_STTS751_STTS751", content: [] },
            { title: "STTS751(i2c, addr=I2C_ADDRESS)", value: "STTS751()", meta: "constructor", description: "STM32_IKS01A3_STTS751_STTS751_CTOR", returns: "STTS751", snippet: "STTS751($1)" },
            { value: "__name__", meta: "STTS751", description: "STM32_IKS01A3_STTS751_MODULE" }
        ];
        typeTree.STTS751 = [
            { title: "int16(d)", value: "int16", meta: "-- <function>", snippet: "int16($1)", description: "STM32_IKS01A3_STTS751_STTS751_INT16" },
            { title: "setreg(reg, dat)", value: "setreg", meta: "-- <function>", snippet: "setreg($1)", description: "STM32_IKS01A3_STTS751_STTS751_SETREG" },
            { title: "getreg(reg)", value: "getreg", meta: "-- <function>", snippet: "getreg($1)", description: "STM32_IKS01A3_STTS751_STTS751_GETREG" },
            { title: "get2reg(reg)", value: "get2reg", meta: "-- <function>", snippet: "get2reg($1)", description: "STM32_IKS01A3_STTS751_STTS751_GET2REG" },
            { title: "resolution(res=None)", value: "resolution", meta: "-- <function>", snippet: "resolution($1)", description: "STM32_IKS01A3_STTS751_STTS751_RESOLUTION" },
            { title: "oneshot_mode(oneshot=None)", value: "oneshot_mode", meta: "-- <function>", snippet: "oneshot_mode($1)", description: "STM32_IKS01A3_STTS751_STTS751_ONESHOT_MODE" },
            { title: "ONE_SHOT()", value: "ONE_SHOT", meta: "-- <function>", snippet: "ONE_SHOT()", description: "STM32_IKS01A3_STTS751_STTS751_ONE_SHOT" },
            { title: "temperature()", value: "temperature", meta: "-- <function>", snippet: "temperature()", description: "STM32_IKS01A3_STTS751_STTS751_TEMPERATURE" },
            { title: "temperature_irq()", value: "temperature_irq", meta: "-- <function>", snippet: "temperature_irq()", description: "STM32_IKS01A3_STTS751_STTS751_TEMPERATURE_IRQ" }
        ];

        tree.stm32_alphabot_v2 = [
            { value: "ALPHABOT_V2_PIN_AIN2", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_AIN2" },
            { value: "ALPHABOT_V2_PIN_AIN1", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_AIN1" },
            { value: "ALPHABOT_V2_PIN_BIN1", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_BIN1" },
            { value: "ALPHABOT_V2_PIN_BIN2", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_BIN2" },
            { value: "ALPHABOT_V2_PIN_ECHO", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_ECHO" },
            { value: "ALPHABOT_V2_PIN_TRIG", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_TRIG" },
            { value: "ALPHABOT_V2_PIN_IR", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_IR" },
            { value: "ALPHABOT_V2_PIN_PWMB", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_PWMB" },
            { value: "ALPHABOT_V2_PIN_PWMA", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_PWMA" },
            { value: "ALPHABOT_V2_PIN_RGB", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_RGB" },
            { value: "ALPHABOT_V2_PIN_OLED_D_C", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_OLED_D_C" },
            { value: "ALPHABOT_V2_PIN_OLED_RESET", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_OLED_RESET" },
            { value: "ALPHABOT_V2_PIN_TRS_CS", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_TRS_CS" },
            { value: "ALPHABOT_V2_PIN_TRS_DOUT", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_TRS_DOUT" },
            { value: "ALPHABOT_V2_PIN_TRS_ADDR", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_TRS_ADDR" },
            { value: "ALPHABOT_V2_PIN_TRS_CLK", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PIN_TRS_CLK" },
            { value: "ALPHABOT_V2_PCF8574_I2C_ADDR", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_PCF8574_I2C_ADDR" },
            { value: "ALPHABOT_V2_OLED_I2C_ADDR_DC_OFF", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_OLED_I2C_ADDR_DC_OFF" },
            { value: "ALPHABOT_V2_OLED_I2C_ADDR_DC_ON", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_OLED_I2C_ADDR_DC_ON" },
            { value: "AlphaBot_v2", meta: "stm32_alphabot_v2", kind: "class", description: "STM32_ALPHABOT_V2_ALPHABOT_V2", content: [] },
            { title: "AlphaBot_v2()", value: "AlphaBot_v2()", meta: "constructor", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_CTOR", snippet: "AlphaBot_v2($1)", returns: "AlphaBot_v2" },
            { value: "__name__", meta: "stm32_alphabot_v2", description: "STM32_ALPHABOT_V2_MODULE" }
        ];

        tree.stm32_TRsensors = [
            { value: "PIN_CS", description: "STM32_TRSENSORS_PIN_CS" },
            { value: "PIN_DOUT", description: "STM32_TRSENSORS_PIN_DOUT" },
            { value: "PIN_ADDR", description: "STM32_TRSENSORS_PIN_ADDR" },
            { value: "PIN_CLK", description: "STM32_TRSENSORS_PIN_CLK" },
            { value: "NUMSENSORS", description: "STM32_TRSENSORS_NUMSENSORS" },
            { value: "ADC_TYPE_1543", description: "STM32_TRSENSORS_ADC_TYPE_1543" },
            { value: "ADC_TYPE_2543", description: "STM32_TRSENSORS_ADC_TYPE_2543" },
            { value: "ADC_TYPE", description: "STM32_TRSENSORS_ADC_TYPE" },
            { value: "QTR_EMITTERS_OFF", description: "STM32_TRSENSORS_QTR_EMITTERS_OFF" },
            { value: "QTR_EMITTERS_ON", description: "STM32_TRSENSORS_QTR_EMITTERS_ON" },
            { value: "QTR_EMITTERS_ON_AND_OFF", description: "STM32_TRSENSORS_QTR_EMITTERS_ON_AND_OFF" },
            { value: "QTR_NO_EMITTER_PIN", description: "STM32_TRSENSORS_QTR_NO_EMITTER_PIN" },
            { value: "QTR_MAX_SENSORS", description: "STM32_TRSENSORS_QTR_MAX_SENSORS" },
            { value: "TRSensors", meta: "stm32_TRsensors", kind: "class", description: "STM32_TRSENSORS_TRSENSORS", content: [] },
            { title: "TRSensors(cs=PIN_CS, dout=PIN_DOUT, addr=PIN_ADDR, clk=PIN_CLK)", value: "TRSensors()", meta: "constructor", description: "STM32_TRSENSORS_TRSENSORS_CTOR", snippet: "TRSensors($1)", returns: "TRSensors" },
            { value: "__name__", meta: "stm32_TRsensors", description: "STM32_TRSENSORS_MODULE" }
        ];

        typeTree.AlphaBot_v2 = [
            { title: "setPWMA(value)", value: "setPWMA", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_SETPWMA", snippet: "setPWMA($1)" },
            { title: "setPWMB(value)", value: "setPWMB", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_SETPWMB", snippet: "setPWMB($1)" },
            { title: "setMotorLeft(speed)", value: "setMotorLeft", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_SETMOTORLEFT", snippet: "setMotorLeft($1)" },
            { title: "setMotorRight(speed)", value: "setMotorRight", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_SETMOTORRIGHT", snippet: "setMotorRight($1)" },
            { title: "stop()", value: "stop", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_STOP", snippet: "stop()" },
            { title: "moveForward(speed, duration_ms=None)", value: "moveForward", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_MOVEFORWARD", snippet: "moveForward($1)" },
            { title: "moveBackward(speed, duration_ms=None)", value: "moveBackward", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_MOVEBACKWARD", snippet: "moveBackward($1)" },
            { title: "turnLeft(speed, duration_ms=None)", value: "turnLeft", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_TURNLEFT", snippet: "turnLeft($1)" },
            { title: "turnRight(speed, duration_ms=None)", value: "turnRight", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_TURNRIGHT", snippet: "turnRight($1)" },
            { title: "calibrateLineFinder()", value: "calibrateLineFinder", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_CALIBRATELINEFINDER", snippet: "calibrateLineFinder()" },
            { title: "TRSensors_calibrate()", value: "TRSensors_calibrate", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_TRSENSORS_CALIBRATE", snippet: "TRSensors_calibrate()" },
            { title: "TRSensors_readLine(sensor=0)", value: "TRSensors_readLine", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_TRSENSORS_READLINE", returns: "list", snippet: "TRSensors_readLine($1)" },
            { title: "readUltrasonicDistance(length=15, timeout_us=30000)", value: "readUltrasonicDistance", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_READULTRASONICDISTANCE", returns: "float", snippet: "readUltrasonicDistance($1)" },
            { title: "getOLEDaddr()", value: "getOLEDaddr", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_GETOLEDADDR", returns: "int", snippet: "getOLEDaddr()" },
            { title: "controlBuzzer(state)", value: "controlBuzzer", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_CONTROLBUZZER", snippet: "controlBuzzer($1)" },
            { title: "getJoystickValue()", value: "getJoystickValue", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_GETJOYSTICKVALUE", returns: "str", snippet: "getJoystickValue()" },
            { title: "readInfrared()", value: "readInfrared", meta: "-- <function>", description: "STM32_ALPHABOT_V2_ALPHABOT_V2_READINFRARED", returns: "str", snippet: "readInfrared()" }
        ];

        typeTree.TRSensors = [
            { title: "analogRead_old()", value: "analogRead_old", meta: "-- <function>", description: "STM32_TRSENSORS_TRSENSORS_ANALOGREAD_OLD", returns: "list", snippet: "analogRead_old()" },
            { title: "_getBitValue(value, bit_position)", value: "_getBitValue", meta: "-- <function>", description: "STM32_TRSENSORS_TRSENSORS__GETBITVALUE", returns: "int", snippet: "_getBitValue($1)" },
            { title: "_writeAddressBit(sensor_address, bit_number)", value: "_writeAddressBit", meta: "-- <function>", description: "STM32_TRSENSORS_TRSENSORS__WRITEADDRESSBIT", snippet: "_writeAddressBit($1)" },
            { title: "_readDataBit(prev_sensor_value)", value: "_readDataBit", meta: "-- <function>", description: "STM32_TRSENSORS_TRSENSORS__READDATABIT", returns: "int", snippet: "_readDataBit($1)" },
            { title: "_sendCycleSignal()", value: "_sendCycleSignal", meta: "-- <function>", description: "STM32_TRSENSORS_TRSENSORS__SENDCYCLESIGNAL", snippet: "_sendCycleSignal()" },
            { title: "_writeCurrentAddressAndReadPrevValue_V2_2(sensor_address)", value: "_writeCurrentAddressAndReadPrevValue_V2_2", meta: "-- <function>", description: "STM32_TRSENSORS_TRSENSORS__WRITECURRENTADDRESSANDREADPREVVALUE_V2_2", returns: "int", snippet: "_writeCurrentAddressAndReadPrevValue_V2_2($1)" },
            { title: "_writeCurrentAddressAndReadPrevValue_V2_1(sensor_address)", value: "_writeCurrentAddressAndReadPrevValue_V2_1", meta: "-- <function>", description: "STM32_TRSENSORS_TRSENSORS__WRITECURRENTADDRESSANDREADPREVVALUE_V2_1", returns: "int", snippet: "_writeCurrentAddressAndReadPrevValue_V2_1($1)" },
            { title: "analogRead()", value: "analogRead", meta: "-- <function>", description: "STM32_TRSENSORS_TRSENSORS_ANALOGREAD", returns: "list", snippet: "analogRead()" },
            { title: "calibrate()", value: "calibrate", meta: "-- <function>", description: "STM32_TRSENSORS_TRSENSORS_CALIBRATE", snippet: "calibrate()" },
            { title: "readCalibrated()", value: "readCalibrated", meta: "-- <function>", description: "STM32_TRSENSORS_TRSENSORS_READCALIBRATED", returns: "list", snippet: "readCalibrated()" },
            { title: "readLine(white_line=0)", value: "readLine", meta: "-- <function>", description: "STM32_TRSENSORS_TRSENSORS_READLINE", returns: "tuple", snippet: "readLine($1)" }
        ];
    }

    if (['l476', 'steami'].includes(_interface)) {
        tree.stm32_donutbot = [
            { title: "TCA9548A(bus)", value: "TCA9548A", meta: "-- <function>", snippet: "TCA9548A($1)", description: "STM32_DONUTBOT_TCA9548A" },
            { title: "donutbot_get_distance(sensor, unit=\"cm\")", value: "donutbot_get_distance", meta: "-- <function>", snippet: "donutbot_get_distance($1)", description: "STM32_DONUTBOT_DONUTBOT_GET_DISTANCE", returns: "float" },
            { title: "donutbot_get_color()", value: "donutbot_get_color", meta: "-- <function>", snippet: "donutbot_get_color()", description: "STM32_DONUTBOT_DONUTBOT_GET_COLOR", returns: "tuple" },
            { title: "donutbot_get_color_left()", value: "donutbot_get_color_left", meta: "-- <function>", snippet: "donutbot_get_color_left()", description: "STM32_DONUTBOT_DONUTBOT_GET_COLOR_LEFT", returns: "tuple" },
            { title: "donutbot_get_color_center()", value: "donutbot_get_color_center", meta: "-- <function>", snippet: "donutbot_get_color_center()", description: "STM32_DONUTBOT_DONUTBOT_GET_COLOR_CENTER", returns: "tuple" },
            { title: "donutbot_get_color_right()", value: "donutbot_get_color_right", meta: "-- <function>", snippet: "donutbot_get_color_right()", description: "STM32_DONUTBOT_DONUTBOT_GET_COLOR_RIGHT", returns: "tuple" },
            { title: "donutbot_get_color_clear()", value: "donutbot_get_color_clear", meta: "-- <function>", snippet: "donutbot_get_color_clear()", description: "STM32_DONUTBOT_DONUTBOT_GET_COLOR_CLEAR", returns: "int" },
            { title: "donutbot_scale_rgb_to_max(r, g, b)", value: "donutbot_scale_rgb_to_max", meta: "-- <function>", snippet: "donutbot_scale_rgb_to_max($1)", description: "STM32_DONUTBOT_DONUTBOT_SCALE_RGB_TO_MAX", returns: "tuple" },
            { title: "donutbot_get_color_name(r, g, b)", value: "donutbot_get_color_name", meta: "-- <function>", snippet: "donutbot_get_color_name($1)", description: "STM32_DONUTBOT_DONUTBOT_GET_COLOR_NAME", returns: "str" },
            { title: "donutbot_get_color_name_left()", value: "donutbot_get_color_name_left", meta: "-- <function>", snippet: "donutbot_get_color_name_left()", description: "STM32_DONUTBOT_DONUTBOT_GET_COLOR_NAME_LEFT", returns: "str" },
            { title: "donutbot_get_color_name_center()", value: "donutbot_get_color_name_center", meta: "-- <function>", snippet: "donutbot_get_color_name_center()", description: "STM32_DONUTBOT_DONUTBOT_GET_COLOR_NAME_CENTER", returns: "str" },
            { title: "donutbot_get_color_name_right()", value: "donutbot_get_color_name_right", meta: "-- <function>", snippet: "donutbot_get_color_name_right()", description: "STM32_DONUTBOT_DONUTBOT_GET_COLOR_NAME_RIGHT", returns: "str" },
            { title: "donutbot_get_line(side=None)", value: "donutbot_get_line", meta: "-- <function>", snippet: "donutbot_get_line($1)", description: "STM32_DONUTBOT_DONUTBOT_GET_LINE", returns: "tuple" },
            { title: "donutbot_set_treshold_value(value)", value: "donutbot_set_treshold_value", meta: "-- <function>", snippet: "donutbot_set_treshold_value($1)", description: "STM32_DONUTBOT_DONUTBOT_SET_TRESHOLD_VALUE" },
            { title: "donutbot_get_treshold_value()", value: "donutbot_get_treshold_value", meta: "-- <function>", snippet: "donutbot_get_treshold_value()", description: "STM32_DONUTBOT_DONUTBOT_GET_TRESHOLD_VALUE", returns: "int" },
            { title: "donutbot_set_led_captor(state)", value: "donutbot_set_led_captor", meta: "-- <function>", snippet: "donutbot_set_led_captor($1)", description: "STM32_DONUTBOT_DONUTBOT_SET_LED_CAPTOR" },
            { title: "donutbot_get_motor_infos(id=10)", value: "donutbot_get_motor_infos", meta: "-- <function>", snippet: "donutbot_get_motor_infos($1)", description: "STM32_DONUTBOT_DONUTBOT_GET_MOTOR_INFOS" },
            { title: "donutbot_ping_motor(id)", value: "donutbot_ping_motor", meta: "-- <function>", snippet: "donutbot_ping_motor($1)", description: "STM32_DONUTBOT_DONUTBOT_PING_MOTOR" },
            { title: "donutbot_move_forward(speed, acceleration=200)", value: "donutbot_move_forward", meta: "-- <function>", snippet: "donutbot_move_forward($1)", description: "STM32_DONUTBOT_DONUTBOT_MOVE_FORWARD" },
            { title: "donutbot_move_backward(speed, acceleration=200)", value: "donutbot_move_backward", meta: "-- <function>", snippet: "donutbot_move_backward($1)", description: "STM32_DONUTBOT_DONUTBOT_MOVE_BACKWARD" },
            { title: "donutbot_rot_clock(speed, acceleration=200)", value: "donutbot_rot_clock", meta: "-- <function>", snippet: "donutbot_rot_clock($1)", description: "STM32_DONUTBOT_DONUTBOT_ROT_CLOCK" },
            { title: "donutbot_rot_trigo(speed, acceleration=200)", value: "donutbot_rot_trigo", meta: "-- <function>", snippet: "donutbot_rot_trigo($1)", description: "STM32_DONUTBOT_DONUTBOT_ROT_TRIGO" },
            { title: "donutbot_controlMotor(motorSide, speed, acceleration=200)", value: "donutbot_controlMotor", meta: "-- <function>", snippet: "donutbot_controlMotor($1)", description: "STM32_DONUTBOT_DONUTBOT_CONTROLMOTOR" },
            { title: "donutbot_stop()", value: "donutbot_stop", meta: "-- <function>", snippet: "donutbot_stop()", description: "STM32_DONUTBOT_DONUTBOT_STOP" },
            { title: "donutbot_pause(motorSide=\"both\")", value: "donutbot_pause", meta: "-- <function>", snippet: "donutbot_pause($1)", description: "STM32_DONUTBOT_DONUTBOT_PAUSE" },
            { title: "convertSpeed_mps(speed, max_speed, max_rpm, wheels_diameter)", value: "convertSpeed_mps", meta: "-- <function>", snippet: "convertSpeed_mps($1)", description: "STM32_DONUTBOT_CONVERTSPEED_MPS", returns: "float" },
            { title: "donutbot_turnAngle(angle, speed=7000)", value: "donutbot_turnAngle", meta: "-- <function>", snippet: "donutbot_turnAngle($1)", description: "STM32_DONUTBOT_DONUTBOT_TURNANGLE" },
            { title: "donutbot_moveWithSquare(side_length=0.3, speed=7000)", value: "donutbot_moveWithSquare", meta: "-- <function>", snippet: "donutbot_moveWithSquare($1)", description: "STM32_DONUTBOT_DONUTBOT_MOVEWITHSQUARE" },
            { value: "__name__", meta: "stm32_donutbot", description: "STM32_DONUTBOT_MODULE" }
        ];

        tree.stm32_veml6040 = [
            { value: "CONF", description: "STM32_VEML6040_CONF" },
            { value: "DEFAULT_SETTINGS", description: "STM32_VEML6040_DEFAULT_SETTINGS" },
            { value: "G_SENSITIVITY", description: "STM32_VEML6040_G_SENSITIVITY" },
            { value: "INTEGRATION_TIME", description: "STM32_VEML6040_INTEGRATION_TIME" },
            { value: "REG_BLUE", description: "STM32_VEML6040_REG_BLUE" },
            { value: "REG_GREEN", description: "STM32_VEML6040_REG_GREEN" },
            { value: "REG_RED", description: "STM32_VEML6040_REG_RED" },
            { value: "REG_WHITE", description: "STM32_VEML6040_REG_WHITE" },
            { value: "SHUTDOWN", description: "STM32_VEML6040_SHUTDOWN" },
            { value: "VEML6040_ADDR", description: "STM32_VEML6040_VEML6040_ADDR" },
            { value: "VEML6040_CONF", description: "STM32_VEML6040_VEML6040_CONF" },
            { value: "VEML6040", meta: "stm32_veml6040", kind: "class", description: "STM32_VEML6040_VEML6040", content: [] },
            { title: "VEML6040(i2c=None)", value: "VEML6040()", meta: "constructor", description: "STM32_VEML6040_VEML6040_CTOR", returns: "VEML6040", snippet: "VEML6040($1)" },
            { value: "__name__", meta: "stm32_veml6040", description: "STM32_VEML6040_MODULE" }
        ];
        typeTree.VEML6040 = [
            { title: "write8(reg, val)", value: "write8", meta: "-- <function>", snippet: "write8($1)", description: "STM32_VEML6040_VEML6040_WRITE8" },
            { title: "readfrom_mem(addr, memaddr, nbytes, addrsize=8)", value: "readfrom_mem", meta: "-- <function>", snippet: "readfrom_mem($1)", description: "STM32_VEML6040_VEML6040_READFROM_MEM", returns: "bytes" },
            { title: "readRGB()", value: "readRGB", meta: "-- <function>", snippet: "readRGB()", description: "STM32_VEML6040_VEML6040_READRGB", returns: "dict" }
        ];

        tree.stm32_sts3032 = [
            { value: "INST_PING", description: "STM32_STS3032_INST_PING" },
            { value: "INST_READ", description: "STM32_STS3032_INST_READ" },
            { value: "INST_WRITE", description: "STM32_STS3032_INST_WRITE" },
            { value: "MOTOR_MODE_POSITION", description: "STM32_STS3032_MOTOR_MODE_POSITION" },
            { value: "MOTOR_MODE_SPEED", description: "STM32_STS3032_MOTOR_MODE_SPEED" },
            { value: "NULL", description: "STM32_STS3032_NULL" },
            { value: "SCSCL_GOAL_POSITION_L", description: "STM32_STS3032_SCSCL_GOAL_POSITION_L" },
            { value: "SCSCL_TORQUE_ENABLE", description: "STM32_STS3032_SCSCL_TORQUE_ENABLE" },
            { value: "SMS_STS_ACC", description: "STM32_STS3032_SMS_STS_ACC" },
            { value: "SMS_STS_GOAL_SPEED_L", description: "STM32_STS3032_SMS_STS_GOAL_SPEED_L" },
            { value: "SMS_STS_LOCK", description: "STM32_STS3032_SMS_STS_LOCK" },
            { value: "SMS_STS_MODE", description: "STM32_STS3032_SMS_STS_MODE" },
            { value: "SMS_STS_PRESENT_CURRENT_H", description: "STM32_STS3032_SMS_STS_PRESENT_CURRENT_H" },
            { value: "SMS_STS_PRESENT_POSITION_L", description: "STM32_STS3032_SMS_STS_PRESENT_POSITION_L" },
            { value: "SMS_STS_PRESENT_TEMPERATURE", description: "STM32_STS3032_SMS_STS_PRESENT_TEMPERATURE" },
            { value: "SMS_STS_PRESENT_VOLTAGE", description: "STM32_STS3032_SMS_STS_PRESENT_VOLTAGE" },
            { value: "S_RXD", description: "STM32_STS3032_S_RXD" },
            { value: "S_TXD", description: "STM32_STS3032_S_TXD" },
            { value: "Sts3032", meta: "stm32_sts3032", kind: "class", description: "STM32_STS3032_STS3032", content: [] },
            { title: "Sts3032(uart_id=1, baudrate=115200, rx=S_RXD, tx=S_TXD)", value: "Sts3032()", meta: "constructor", description: "STM32_STS3032_STS3032_CTOR", returns: "Sts3032", snippet: "Sts3032($1)" },
            { value: "__name__", meta: "stm32_sts3032", description: "STM32_STS3032_MODULE" }
        ];
        typeTree.Sts3032 = [
            { title: "lockEprom(ID)", value: "lockEprom", meta: "-- <function>", snippet: "lockEprom($1)", description: "STM32_STS3032_STS3032_LOCKEPROM", returns: "int" },
            { title: "unlockEprom(ID)", value: "unlockEprom", meta: "-- <function>", snippet: "unlockEprom($1)", description: "STM32_STS3032_STS3032_UNLOCKEPROM", returns: "int" },
            { title: "ping_single_motor(id)", value: "ping_single_motor", meta: "-- <function>", snippet: "ping_single_motor($1)", description: "STM32_STS3032_STS3032_PING_SINGLE_MOTOR", returns: "int" },
            { title: "testPing(id_max=50)", value: "testPing", meta: "-- <function>", snippet: "testPing($1)", description: "STM32_STS3032_STS3032_TESTPING" },
            { title: "setMotorMode(ID, Mode)", value: "setMotorMode", meta: "-- <function>", snippet: "setMotorMode($1)", description: "STM32_STS3032_STS3032_SETMOTORMODE", returns: "int" },
            { title: "releaseMotor(ID)", value: "releaseMotor", meta: "-- <function>", snippet: "releaseMotor($1)", description: "STM32_STS3032_STS3032_RELEASEMOTOR", returns: "int" },
            { title: "setSpeed(ID, Speed, ACC)", value: "setSpeed", meta: "-- <function>", snippet: "setSpeed($1)", description: "STM32_STS3032_STS3032_SETSPEED", returns: "int" },
            { title: "setPosition(ID, Position, Speed, ACC)", value: "setPosition", meta: "-- <function>", snippet: "setPosition($1)", description: "STM32_STS3032_STS3032_SETPOSITION", returns: "int" },
            { title: "getVoltage(ID)", value: "getVoltage", meta: "-- <function>", snippet: "getVoltage($1)", description: "STM32_STS3032_STS3032_GETVOLTAGE", returns: "float" },
            { title: "getTemperature(ID)", value: "getTemperature", meta: "-- <function>", snippet: "getTemperature($1)", description: "STM32_STS3032_STS3032_GETTEMPERATURE", returns: "int" }
        ];
    }

    tree.stm32_ir_receiver = [
        { value: "IR_RX", meta: "IR_RX", kind: "class", description: "STM32_IR_RECEIVER_IR_RX", content: [] },
        { title: "IR_RX(pin, nedges, tblock, callback, *args)", value: "IR_RX()", meta: "constructor", kind: "constructor", description: "STM32_IR_RECEIVER_IR_RX_CTOR", returns: "IR_RX", snippet: "IR_RX($1)" },
        { value: "__name__", meta: "stm32_ir_receiver", description: "STM32_IR_RECEIVER_MODULE" }
    ];
    typeTree.IR_RX = [
        { value: "REPEAT", description: "STM32_IR_RECEIVER_IR_RX_REPEAT" },
        { value: "BADSTART", description: "STM32_IR_RECEIVER_IR_RX_BADSTART" },
        { value: "BADBLOCK", description: "STM32_IR_RECEIVER_IR_RX_BADBLOCK" },
        { value: "BADREP", description: "STM32_IR_RECEIVER_IR_RX_BADREP" },
        { value: "OVERRUN", description: "STM32_IR_RECEIVER_IR_RX_OVERRUN" },
        { value: "BADDATA", description: "STM32_IR_RECEIVER_IR_RX_BADDATA" },
        { value: "BADADDR", description: "STM32_IR_RECEIVER_IR_RX_BADADDR" },
        { title: "__init__(pin, nedges, tblock, callback, *args)", value: "__init__", meta: "-- <function>", snippet: "__init__($1)", description: "STM32_IR_RECEIVER_IR_RX___INIT__" },
        { title: "_cb_pin(line)", value: "_cb_pin", meta: "-- <function>", snippet: "_cb_pin($1)", description: "STM32_IR_RECEIVER_IR_RX__CB_PIN" },
        { title: "do_callback(cmd, addr, ext, thresh=0)", value: "do_callback", meta: "-- <function>", snippet: "do_callback($1)", description: "STM32_IR_RECEIVER_IR_RX_DO_CALLBACK" },
        { title: "error_function(func)", value: "error_function", meta: "-- <function>", snippet: "error_function($1)", description: "STM32_IR_RECEIVER_IR_RX_ERROR_FUNCTION" },
        { title: "close()", value: "close", meta: "-- <function>", snippet: "close()", description: "STM32_IR_RECEIVER_IR_RX_CLOSE" }
    ];

    tree.stm32_nec = [
        { value: "NEC_ABC", meta: "NEC_ABC", kind: "class", description: "STM32_NEC_NEC_ABC", content: [], extends: "IR_RX" },
        { title: "NEC_ABC(pin, extended, callback, *args)", value: "NEC_ABC()", meta: "constructor", kind: "constructor", description: "STM32_NEC_NEC_ABC_CTOR", returns: "NEC_ABC", snippet: "NEC_ABC($1)" },
        { value: "NEC_8", meta: "NEC_8", kind: "class", description: "STM32_NEC_NEC_8", content: [], extends: "NEC_ABC" },
        { title: "NEC_8(pin, callback, *args)", value: "NEC_8()", meta: "constructor", kind: "constructor", description: "STM32_NEC_NEC_8_CTOR", returns: "NEC_8", snippet: "NEC_8($1)" },
        { value: "NEC_16", meta: "NEC_16", kind: "class", description: "STM32_NEC_NEC_16", content: [], extends: "NEC_ABC" },
        { title: "NEC_16(pin, callback, *args)", value: "NEC_16()", meta: "constructor", kind: "constructor", description: "STM32_NEC_NEC_16_CTOR", returns: "NEC_16", snippet: "NEC_16($1)" },
        { value: "__name__", meta: "stm32_nec", description: "STM32_NEC_MODULE" }
    ];
    typeTree.NEC_ABC = [
        { title: "__init__(pin, extended, callback, *args)", value: "__init__", meta: "-- <function>", snippet: "__init__($1)", description: "STM32_NEC_NEC_ABC___INIT__" },
        { title: "decode(_)", value: "decode", meta: "-- <function>", snippet: "decode($1)", description: "STM32_NEC_NEC_ABC_DECODE" }
    ];
    typeTree.NEC_8 = [
        { title: "__init__(pin, callback, *args)", value: "__init__", meta: "-- <function>", snippet: "__init__($1)", description: "STM32_NEC_NEC_8___INIT__" }
    ];
    typeTree.NEC_16 = [
        { title: "__init__(pin, callback, *args)", value: "__init__", meta: "-- <function>", snippet: "__init__($1)", description: "STM32_NEC_NEC_16___INIT__" }
    ];

    tree.stm32_m24sr64 = [
        { value: "NFC_TAG_I2C_ADDR", description: "STM32_M24SR64_NFC_TAG_I2C_ADDR" },
        { value: "NFCTag", meta: "NFCTag", kind: "class", description: "STM32_M24SR64_NFCTAG", content: [] },
        { title: "NFCTag($1)", value: "NFCTag()", meta: "constructor", kind: "constructor", description: "STM32_M24SR64_NFCTAG_CTOR", returns: "NFCTag", snippet: "NFCTag($1)" },
        { value: "CRC", meta: "CRC", kind: "class", description: "STM32_M24SR64_CRC", content: [] },
        { title: "CRC($1)", value: "CRC()", meta: "constructor", kind: "constructor", description: "STM32_M24SR64_CRC_CTOR", returns: "CRC", snippet: "CRC($1)" },
        { title: "byte0($1)", value: "byte0", meta: "-- <function>", snippet: "byte0($1)", returns: "int", description: "STM32_M24SR64_BYTE0" },
        { title: "byte1($1)", value: "byte1", meta: "-- <function>", snippet: "byte1($1)", returns: "int", description: "STM32_M24SR64_BYTE1" },
        { value: "__name__", meta: "stm32_m24sr64", description: "STM32_M24SR64_MODULE" }
    ];
    typeTree.NFCTag = [
        { value: "SYSTEM", description: "STM32_M24SR64_NFCTAG_SYSTEM" },
        { value: "CC", description: "STM32_M24SR64_NFCTAG_CC" },
        { value: "NDEF", description: "STM32_M24SR64_NFCTAG_NDEF" },
        { value: "NDEF_HEADER", description: "STM32_M24SR64_NFCTAG_NDEF_HEADER" },
        { title: "__init__(i2c, addr=NFC_TAG_I2C_ADDR)", value: "__init__", meta: "-- <function>", snippet: "__init__($1)", description: "STM32_M24SR64_NFCTAG___INIT__" },
        { title: "wait(msg)", value: "wait", meta: "-- <function>", snippet: "wait($1)", description: "STM32_M24SR64_NFCTAG_WAIT" },
        { title: "write(data, crc=False)", value: "write", meta: "-- <function>", snippet: "write($1)", description: "STM32_M24SR64_NFCTAG_WRITE" },
        { title: "read(len, checkCrc=False)", value: "read", meta: "-- <function>", snippet: "read($1)", returns: "bytes", description: "STM32_M24SR64_NFCTAG_READ" },
        { title: "killRFSelectI2C()", value: "killRFSelectI2C", meta: "-- <function>", snippet: "killRFSelectI2C()", description: "STM32_M24SR64_NFCTAG_KILLRFSELECTI2C" },
        { title: "selectNFCT4Application(pcb=2)", value: "selectNFCT4Application", meta: "-- <function>", snippet: "selectNFCT4Application($1)", returns: "bytes", description: "STM32_M24SR64_NFCTAG_SELECTNFCT4APPLICATION" },
        { title: "selectFile(fileId, pcb=2)", value: "selectFile", meta: "-- <function>", snippet: "selectFile($1)", returns: "bytes", description: "STM32_M24SR64_NFCTAG_SELECTFILE" },
        { title: "readBinary(offset, length, pcb=2)", value: "readBinary", meta: "-- <function>", snippet: "readBinary($1)", returns: "bytes", description: "STM32_M24SR64_NFCTAG_READBINARY" },
        { title: "updateBinaryLength(data, pcb=3)", value: "updateBinaryLength", meta: "-- <function>", snippet: "updateBinaryLength($1)", returns: "bytes", description: "STM32_M24SR64_NFCTAG_UPDATEBINARYLENGTH" },
        { title: "updateBinary(offset, length, data, pcb=2)", value: "updateBinary", meta: "-- <function>", snippet: "updateBinary($1)", returns: "bytes", description: "STM32_M24SR64_NFCTAG_UPDATEBINARY" },
        { title: "deselect()", value: "deselect", meta: "-- <function>", snippet: "deselect()", returns: "bytes", description: "STM32_M24SR64_NFCTAG_DESELECT" },
        { title: "readNDEFFile()", value: "readNDEFFile", meta: "-- <function>", snippet: "readNDEFFile()", returns: "str", description: "STM32_M24SR64_NFCTAG_READNDEFFILE" },
        { title: "eraseNDEFFile()", value: "eraseNDEFFile", meta: "-- <function>", snippet: "eraseNDEFFile()", description: "STM32_M24SR64_NFCTAG_ERASENDEFFILE" },
        { title: "writeNDEFFile(text)", value: "writeNDEFFile", meta: "-- <function>", snippet: "writeNDEFFile($1)", description: "STM32_M24SR64_NFCTAG_WRITENDEFFILE" }
    ];
    typeTree.CRC = [
        { title: "__init__(initial=25443)", value: "__init__", meta: "-- <function>", snippet: "__init__($1)", description: "STM32_M24SR64_CRC___INIT__" },
        { title: "start()", value: "start", meta: "-- <function>", snippet: "start()", description: "STM32_M24SR64_CRC_START" },
        { title: "getCRC()", value: "getCRC", meta: "-- <function>", snippet: "getCRC()", returns: "tuple", description: "STM32_M24SR64_CRC_GETCRC" },
        { title: "compute(block)", value: "compute", meta: "-- <function>", snippet: "compute($1)", returns: "tuple", description: "STM32_M24SR64_CRC_COMPUTE" }
    ];

    tree.stm32_pcf8574 = [
        { value: "PCF8574", meta: "PCF8574", kind: "class", description: "STM32_PCF8574_PCF8574", content: [] },
        { title: "PCF8574($1)", value: "PCF8574()", meta: "constructor", kind: "constructor", description: "STM32_PCF8574_PCF8574_CTOR", returns: "PCF8574", snippet: "PCF8574($1)" },
        { value: "__name__", meta: "stm32_pcf8574", description: "STM32_PCF8574_MODULE" }
    ];
    typeTree.PCF8574 = [
        { title: "__init__(i2c, addr=32)", value: "__init__", meta: "-- <function>", snippet: "__init__($1)", description: "STM32_PCF8574_PCF8574___INIT__" },
        { title: "port()", value: "port", meta: "-- <function>", snippet: "port()", returns: "int", description: "STM32_PCF8574_PCF8574_PORT" },
        { title: "port(value)", value: "port", meta: "-- <function>", snippet: "port($1)", description: "STM32_PCF8574_PCF8574_PORT" },
        { title: "pin(pin, value=None)", value: "pin", meta: "-- <function>", snippet: "pin($1)", returns: "int", description: "STM32_PCF8574_PCF8574_PIN" },
        { title: "toggle(pin)", value: "toggle", meta: "-- <function>", snippet: "toggle($1)", description: "STM32_PCF8574_PCF8574_TOGGLE" },
        { title: "validate_pin(pin)", value: "validate_pin", meta: "-- <function>", snippet: "validate_pin($1)", description: "STM32_PCF8574_PCF8574_VALIDATE_PIN" },
        { title: "_read()", value: "_read", meta: "-- <function>", snippet: "_read()", description: "STM32_PCF8574_PCF8574__READ" },
        { title: "_write()", value: "_write", meta: "-- <function>", snippet: "_write()", description: "STM32_PCF8574_PCF8574__WRITE" }
    ];

    tree.stm32_ht16k33 = [
        { value: "HT16K33_GENERIC_DISPLAY_ON", description: "STM32_HT16K33_HT16K33_HT16K33_GENERIC_DISPLAY_ON" },
        { value: "HT16K33_GENERIC_DISPLAY_OFF", description: "STM32_HT16K33_HT16K33_HT16K33_GENERIC_DISPLAY_OFF" },
        { value: "HT16K33_GENERIC_SYSTEM_ON", description: "STM32_HT16K33_HT16K33_HT16K33_GENERIC_SYSTEM_ON" },
        { value: "HT16K33_GENERIC_SYSTEM_OFF", description: "STM32_HT16K33_HT16K33_HT16K33_GENERIC_SYSTEM_OFF" },
        { value: "HT16K33_GENERIC_DISPLAY_ADDRESS", description: "STM32_HT16K33_HT16K33_HT16K33_GENERIC_DISPLAY_ADDRESS" },
        { value: "HT16K33_GENERIC_CMD_BRIGHTNESS", description: "STM32_HT16K33_HT16K33_HT16K33_GENERIC_CMD_BRIGHTNESS" },
        { value: "HT16K33_GENERIC_CMD_BLINK", description: "STM32_HT16K33_HT16K33_HT16K33_GENERIC_CMD_BLINK" },
        { value: "HT16K33", meta: "HT16K33", kind: "class", description: "STM32_HT16K33_HT16K33", content: [] },
        { title: "HT16K33(i2c, i2c_address)", value: "HT16K33()", meta: "constructor", snippet: "HT16K33($1)", returns: "HT16K33", description: "STM32_HT16K33_HT16K33_CTOR" },
        { value: "__name__", meta: "stm32_ht16k33", description: "STM32_HT16K33_MODULE" }
    ];
    typeTree.HT16K33 = [
        { title: "set_blink_rate(rate=0)", value: "set_blink_rate", meta: "-- <function>", snippet: "set_blink_rate($1)", description: "STM32_HT16K33_HT16K33_SET_BLINK_RATE" },
        { title: "set_brightness(brightness=15)", value: "set_brightness", meta: "-- <function>", snippet: "set_brightness($1)", description: "STM32_HT16K33_HT16K33_SET_BRIGHTNESS" },
        { title: "draw()", value: "draw", meta: "-- <function>", snippet: "draw()", description: "STM32_HT16K33_HT16K33_DRAW" },
        { title: "update()", value: "update", meta: "-- <function>", snippet: "update()", description: "STM32_HT16K33_HT16K33_UPDATE" },
        { title: "clear()", value: "clear", meta: "-- <function>", snippet: "clear()", returns: "HT16K33", description: "STM32_HT16K33_HT16K33_CLEAR" },
        { title: "power_on()", value: "power_on", meta: "-- <function>", snippet: "power_on()", description: "STM32_HT16K33_HT16K33_POWER_ON" },
        { title: "power_off()", value: "power_off", meta: "-- <function>", snippet: "power_off()", description: "STM32_HT16K33_HT16K33_POWER_OFF" },
        { title: "_render()", value: "_render", meta: "-- <function>", snippet: "_render()", description: "STM32_HT16K33_HT16K33__RENDER" },
        { title: "_write_cmd(byte)", value: "_write_cmd", meta: "-- <function>", snippet: "_write_cmd($1)", description: "STM32_HT16K33_HT16K33__WRITE_CMD" }
    ];

    tree.stm32_ht16k33matrix = [
        { value: "CHARSET", description: "STM32_HT16K33MATRIX_HT16K33MATRIX_CHARSET" },
        { value: "HT16K33Matrix", meta: "HT16K33matrix", kind: "class", description: "STM32_HT16K33MATRIX_HT16K33MATRIX", content: [], extends: "HT16K33" },
        { title: "HT16K33Matrix(i2c, i2c_address=112)", value: "HT16K33Matrix()", meta: "constructor", snippet: "HT16K33Matrix($1)", returns: "HT16K33Matrix", description: "STM32_HT16K33MATRIX_HT16K33MATRIX_CTOR", extends: "HT16K33" },
        { value: "__name__", meta: "stm32_ht16k33matrix", description: "STM32_HT16K33MATRIX_MODULE" }
    ];
    typeTree.HT16K33Matrix = [
        { title: "set_angle(angle=0)", value: "set_angle", meta: "-- <function>", snippet: "set_angle($1)", returns: "HT16K33Matrix", description: "STM32_HT16K33MATRIX_HT16K33MATRIX_SET_ANGLE" },
        { title: "set_inverse()", value: "set_inverse", meta: "-- <function>", snippet: "set_inverse()", returns: "HT16K33Matrix", description: "STM32_HT16K33MATRIX_HT16K33MATRIX_SET_INVERSE" },
        { title: "set_icon(glyph, centre=False)", value: "set_icon", meta: "-- <function>", snippet: "set_icon($1)", returns: "HT16K33Matrix", description: "STM32_HT16K33MATRIX_HT16K33MATRIX_SET_ICON" },
        { title: "set_character(ascii_value=32, centre=False)", value: "set_character", meta: "-- <function>", snippet: "set_character($1)", returns: "HT16K33Matrix", description: "STM32_HT16K33MATRIX_HT16K33MATRIX_SET_CHARACTER" },
        { title: "scroll_text(the_line, speed=0.1)", value: "scroll_text", meta: "-- <function>", snippet: "scroll_text($1)", description: "STM32_HT16K33MATRIX_HT16K33MATRIX_SCROLL_TEXT" },
        { title: "define_character(glyph, char_code=0)", value: "define_character", meta: "-- <function>", snippet: "define_character($1)", returns: "HT16K33Matrix", description: "STM32_HT16K33MATRIX_HT16K33MATRIX_DEFINE_CHARACTER" },
        { title: "plot(x, y, ink=1, xor=False)", value: "plot", meta: "-- <function>", snippet: "plot($1)", returns: "HT16K33Matrix", description: "STM32_HT16K33MATRIX_HT16K33MATRIX_PLOT" },
        { title: "is_set(x, y)", value: "is_set", meta: "-- <function>", snippet: "is_set($1)", description: "STM32_HT16K33MATRIX_HT16K33MATRIX_IS_SET" },
        { title: "draw()", value: "draw", meta: "-- <function>", snippet: "draw()", description: "STM32_HT16K33MATRIX_HT16K33MATRIX_DRAW" },
        { title: "_rotate_matrix(input_matrix, angle=0)", value: "_rotate_matrix", meta: "-- <function>", snippet: "_rotate_matrix($1)", description: "STM32_HT16K33MATRIX_HT16K33MATRIX__ROTATE_MATRIX" },
        { title: "_fill(value=255)", value: "_fill", meta: "-- <function>", snippet: "_fill($1)", description: "STM32_HT16K33MATRIX_HT16K33MATRIX__FILL" }
    ];

    tree.stm32_ht16k33matrixcolour = [
        { value: "COLOUR_NONE", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_COLOUR_NONE" },
        { value: "COLOUR_GREEN", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_COLOUR_GREEN" },
        { value: "COLOUR_RED", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_COLOUR_RED" },
        { value: "COLOUR_YELLOW", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_COLOUR_YELLOW" },
        { value: "CHARSET", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_CHARSET" },
        { value: "HT16K33MatrixColour", meta: "HT16K33MatrixColour", kind: "class", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR", content: [], extends: "HT16K33" },
        { title: "HT16K33MatrixColour(i2c, i2c_address=112)", value: "HT16K33MatrixColour()", meta: "constructor", snippet: "HT16K33MatrixColour($1)", returns: "HT16K33MatrixColour", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_CTOR", extends: "HT16K33" },
        { value: "__name__", meta: "stm32_ht16k33matrixcolour", description: "STM32_HT16K33MATRIXCOLOUR_MODULE" }
    ];
    typeTree.HT16K33MatrixColour = [
        { title: "set_angle(angle=0)", value: "set_angle", meta: "-- <function>", snippet: "set_angle($1)", returns: "HT16K33MatrixColour", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_SET_ANGLE" },
        { title: "set_icon(glyph, centre=False)", value: "set_icon", meta: "-- <function>", snippet: "set_icon($1)", returns: "HT16K33MatrixColour", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_SET_ICON" },
        { title: "set_character(ascii_value=32, ink=1, paper=0, centre=False)", value: "set_character", meta: "-- <function>", snippet: "set_character($1)", returns: "HT16K33MatrixColour", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_SET_CHARACTER" },
        { title: "scroll_text(the_line, ink=1, paper=0, speed=0.1)", value: "scroll_text", meta: "-- <function>", snippet: "scroll_text($1)", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_SCROLL_TEXT" },
        { title: "define_character(glyph, char_code=0)", value: "define_character", meta: "-- <function>", snippet: "define_character($1)", returns: "HT16K33MatrixColour", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_DEFINE_CHARACTER" },
        { title: "plot(x, y, ink=1)", value: "plot", meta: "-- <function>", snippet: "plot($1)", returns: "HT16K33MatrixColour", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_PLOT" },
        { title: "is_set(x, y)", value: "is_set", meta: "-- <function>", snippet: "is_set($1)", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_IS_SET" },
        { title: "fill(ink)", value: "fill", meta: "-- <function>", snippet: "fill($1)", returns: "HT16K33MatrixColour", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_FILL" },
        { title: "draw()", value: "draw", meta: "-- <function>", snippet: "draw()", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR_DRAW" },
        { title: "_rotate_matrix(input_matrix, angle=0)", value: "_rotate_matrix", meta: "-- <function>", snippet: "_rotate_matrix($1)", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR__ROTATE_MATRIX" },
        { title: "_colour_glyph(glyph, ink, paper)", value: "_colour_glyph", meta: "-- <function>", snippet: "_colour_glyph($1)", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR__COLOUR_GLYPH" },
        { title: "_calc_offset(length)", value: "_calc_offset", meta: "-- <function>", snippet: "_calc_offset($1)", description: "STM32_HT16K33MATRIXCOLOUR_HT16K33MATRIXCOLOUR__CALC_OFFSET" }
    ];

    tree.stm32_ht16k33matrixfeatherwing = [
        { value: "CHARSET", description: "STM32_HT16K33MATRIXFEATHERWING_HT16K33MATRIXFEATHERWING_CHARSET" },
        { value: "HT16K33MatrixFeatherWing", meta: "HT16K33MatrixFeatherWing", kind: "class", description: "STM32_HT16K33MATRIXFEATHERWING_HT16K33MATRIXFEATHERWING", content: [], extends: "HT16K33" },
        { title: "HT16K33MatrixFeatherWing(i2c, i2c_address=112)", value: "HT16K33MatrixFeatherWing()", meta: "constructor", snippet: "HT16K33MatrixFeatherWing($1)", returns: "HT16K33MatrixFeatherWing", description: "STM32_HT16K33MATRIXFEATHERWING_HT16K33MATRIXFEATHERWING_CTOR", extends: "HT16K33" },
        { value: "__name__", meta: "stm32_ht16k33matrixfeatherwing", description: "STM32_HT16K33MATRIXFEATHERWING_MODULE" }
    ];
    typeTree.HT16K33MatrixFeatherWing = [
        { title: "set_inverse()", value: "set_inverse", meta: "-- <function>", snippet: "set_inverse()", returns: "HT16K33MatrixFeatherWing", description: "STM32_HT16K33MATRIXFEATHERWING_HT16K33MATRIXFEATHERWING_SET_INVERSE" },
        { title: "set_icon(glyph, column=0)", value: "set_icon", meta: "-- <function>", snippet: "set_icon($1)", returns: "HT16K33MatrixFeatherWing", description: "STM32_HT16K33MATRIXFEATHERWING_HT16K33MATRIXFEATHERWING_SET_ICON" },
        { title: "set_character(ascii_value=32, column=0)", value: "set_character", meta: "-- <function>", snippet: "set_character($1)", returns: "HT16K33MatrixFeatherWing", description: "STM32_HT16K33MATRIXFEATHERWING_HT16K33MATRIXFEATHERWING_SET_CHARACTER" },
        { title: "scroll_text(the_line, speed=0.1)", value: "scroll_text", meta: "-- <function>", snippet: "scroll_text($1)", description: "STM32_HT16K33MATRIXFEATHERWING_HT16K33MATRIXFEATHERWING_SCROLL_TEXT" },
        { title: "define_character(glyph, char_code=0)", value: "define_character", meta: "-- <function>", snippet: "define_character($1)", returns: "HT16K33MatrixFeatherWing", description: "STM32_HT16K33MATRIXFEATHERWING_HT16K33MATRIXFEATHERWING_DEFINE_CHARACTER" },
        { title: "plot(x, y, ink=1, xor=False)", value: "plot", meta: "-- <function>", snippet: "plot($1)", returns: "HT16K33MatrixFeatherWing", description: "STM32_HT16K33MATRIXFEATHERWING_HT16K33MATRIXFEATHERWING_PLOT" },
        { title: "is_set(x, y)", value: "is_set", meta: "-- <function>", snippet: "is_set($1)", description: "STM32_HT16K33MATRIXFEATHERWING_HT16K33MATRIXFEATHERWING_IS_SET" },
        { title: "_get_row(x)", value: "_get_row", meta: "-- <function>", snippet: "_get_row($1)", returns: "bool", description: "STM32_HT16K33MATRIXFEATHERWING_HT16K33MATRIXFEATHERWING__GET_ROW" }
    ];

    tree.stm32_ht16k33segment = [
        { value: "HT16K33_SEGMENT_COLON_ROW", description: "STM32_HT16K33SEGMENT_HT16K33SEGMENT_HT16K33_SEGMENT_COLON_ROW" },
        { value: "HT16K33_SEGMENT_MINUS_CHAR", description: "STM32_HT16K33SEGMENT_HT16K33SEGMENT_HT16K33_SEGMENT_MINUS_CHAR" },
        { value: "HT16K33_SEGMENT_DEGREE_CHAR", description: "STM32_HT16K33SEGMENT_HT16K33SEGMENT_HT16K33_SEGMENT_DEGREE_CHAR" },
        { value: "HT16K33_SEGMENT_SPACE_CHAR", description: "STM32_HT16K33SEGMENT_HT16K33SEGMENT_HT16K33_SEGMENT_SPACE_CHAR" },
        { value: "POS", description: "STM32_HT16K33SEGMENT_HT16K33SEGMENT_POS" },
        { value: "CHARSET", description: "STM32_HT16K33SEGMENT_HT16K33SEGMENT_CHARSET" },
        { value: "HT16K33Segment", meta: "HT16K33Segment", kind: "class", description: "STM32_HT16K33SEGMENT_HT16K33SEGMENT", content: [], extends: "HT16K33" },
        { title: "HT16K33Segment(i2c, i2c_address=112)", value: "HT16K33Segment()", meta: "constructor", snippet: "HT16K33Segment($1)", returns: "HT16K33Segment", description: "STM32_HT16K33SEGMENT_HT16K33SEGMENT_CTOR", extends: "HT16K33" },
        { value: "__name__", meta: "stm32_ht16k33segment", description: "STM32_HT16K33SEGMENT_MODULE" }
    ];
    typeTree.HT16K33Segment = [
        { title: "set_colon(is_set=True)", value: "set_colon", meta: "-- <function>", snippet: "set_colon($1)", returns: "HT16K33Segment", description: "STM32_HT16K33SEGMENT_HT16K33SEGMENT_SET_COLON" },
        { title: "set_glyph(glyph, digit=0, has_dot=False)", value: "set_glyph", meta: "-- <function>", snippet: "set_glyph($1)", returns: "HT16K33Segment", description: "STM32_HT16K33SEGMENT_HT16K33SEGMENT_SET_GLYPH" },
        { title: "set_number(number, digit=0, has_dot=False)", value: "set_number", meta: "-- <function>", snippet: "set_number($1)", returns: "HT16K33Segment", description: "STM32_HT16K33SEGMENT_HT16K33SEGMENT_SET_NUMBER" },
        { title: "set_character(char, digit=0, has_dot=False)", value: "set_character", meta: "-- <function>", snippet: "set_character($1)", returns: "HT16K33Segment", description: "STM32_HT16K33SEGMENT_HT16K33SEGMENT_SET_CHARACTER" }
    ];

    tree.stm32_ht16k33segment14 = [
        { value: "HT16K33_SEG14_DP_VALUE", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_HT16K33_SEG14_DP_VALUE" },
        { value: "HT16K33_SEG14_BLANK_CHAR", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_HT16K33_SEG14_BLANK_CHAR" },
        { value: "HT16K33_SEG14_DQUOTE_CHAR", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_HT16K33_SEG14_DQUOTE_CHAR" },
        { value: "HT16K33_SEG14_QUESTN_CHAR", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_HT16K33_SEG14_QUESTN_CHAR" },
        { value: "HT16K33_SEG14_DOLLAR_CHAR", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_HT16K33_SEG14_DOLLAR_CHAR" },
        { value: "HT16K33_SEG14_PRCENT_CHAR", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_HT16K33_SEG14_PRCENT_CHAR" },
        { value: "HT16K33_SEG14_DEGREE_CHAR", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_HT16K33_SEG14_DEGREE_CHAR" },
        { value: "HT16K33_SEG14_STAR_CHAR", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_HT16K33_SEG14_STAR_CHAR" },
        { value: "HT16K33_SEG14_PLUS_CHAR", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_HT16K33_SEG14_PLUS_CHAR" },
        { value: "HT16K33_SEG14_MINUS_CHAR", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_HT16K33_SEG14_MINUS_CHAR" },
        { value: "HT16K33_SEG14_DIVSN_CHAR", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_HT16K33_SEG14_DIVSN_CHAR" },
        { value: "HT16K33_SEG14_CHAR_COUNT", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_HT16K33_SEG14_CHAR_COUNT" },
        { value: "CHARSET", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_CHARSET" },
        { value: "HT16K33Segment14", meta: "HT16K33Segment14", kind: "class", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14", content: [], extends: "HT16K33" },
        { title: "HT16K33Segment14(i2c, i2c_address=112)", value: "HT16K33Segment14()", meta: "constructor", snippet: "HT16K33Segment14($1)", returns: "HT16K33Segment14", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_CTOR", extends: "HT16K33" },
        { value: "__name__", meta: "stm32_ht16k33segment14", description: "STM32_HT16K33SEGMENT14_MODULE" }
    ];
    typeTree.HT16K33Segment14 = [
        { title: "set_glyph(glyph, digit=0, has_dot=False)", value: "set_glyph", meta: "-- <function>", snippet: "set_glyph($1)", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_SET_GLYPH" },
        { title: "set_number(number, digit=0, has_dot=False)", value: "set_number", meta: "-- <function>", snippet: "set_number($1)", returns: "HT16K33Segment14", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_SET_NUMBER" },
        { title: "set_character(char, digit=0)", value: "set_character", meta: "-- <function>", snippet: "set_character($1)", returns: "HT16K33Segment14", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_SET_CHARACTER" },
        { title: "set_code(code, digit)", value: "set_code", meta: "-- <function>", snippet: "set_code($1)", returns: "HT16K33Segment14", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14_SET_CODE" },
        { title: "_set_digit(value, digit)", value: "_set_digit", meta: "-- <function>", snippet: "_set_digit($1)", returns: "HT16K33Segment14", description: "STM32_HT16K33SEGMENT14_HT16K33SEGMENT14__SET_DIGIT" }
    ];

    tree.stm32_ht16k33segmentbig = [
        { value: "HT16K33_SEGMENT_COLON_ROW", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_HT16K33_SEGMENT_COLON_ROW" },
        { value: "HT16K33_SEGMENT_MINUS_CHAR", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_HT16K33_SEGMENT_MINUS_CHAR" },
        { value: "HT16K33_SEGMENT_DEGREE_CHAR", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_HT16K33_SEGMENT_DEGREE_CHAR" },
        { value: "HT16K33_SEGMENT_SPACE_CHAR", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_HT16K33_SEGMENT_SPACE_CHAR" },
        { value: "COLON_CENTRE", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_COLON_CENTRE" },
        { value: "COLON_LEFT_UPPER", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_COLON_LEFT_UPPER" },
        { value: "COLON_LEFT_LOWER", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_COLON_LEFT_LOWER" },
        { value: "COLON_LEFT", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_COLON_LEFT" },
        { value: "DECIMAL_POINT", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_DECIMAL_POINT" },
        { value: "POS", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_POS" },
        { value: "CHARSET", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_CHARSET" },
        { value: "HT16K33SegmentBig", meta: "HT16K33SegmentBig", kind: "class", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG", content: [], extends: "HT16K33" },
        { title: "HT16K33SegmentBig(i2c, i2c_address=112)", value: "HT16K33SegmentBig()", meta: "constructor", snippet: "HT16K33SegmentBig($1)", returns: "HT16K33SegmentBig", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_CTOR", extends: "HT16K33" },
        { value: "__name__", meta: "stm32_ht16k33segmentbig", description: "STM32_HT16K33SEGMENTBIG_MODULE" }
    ];
    typeTree.HT16K33SegmentBig = [
        { title: "set_colon(pattern=2)", value: "set_colon", meta: "-- <function>", snippet: "set_colon($1)", returns: "HT16K33SegmentBig", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_SET_COLON" },
        { title: "set_glyph(glyph, digit=0)", value: "set_glyph", meta: "-- <function>", snippet: "set_glyph($1)", returns: "HT16K33SegmentBig", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_SET_GLYPH" },
        { title: "set_number(number, digit=0)", value: "set_number", meta: "-- <function>", snippet: "set_number($1)", returns: "HT16K33SegmentBig", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_SET_NUMBER" },
        { title: "set_character(char, digit=0)", value: "set_character", meta: "-- <function>", snippet: "set_character($1)", returns: "HT16K33SegmentBig", description: "STM32_HT16K33SEGMENTBIG_HT16K33SEGMENTBIG_SET_CHARACTER" }
    ];

    tree.stm32_bmp280 = [
        { value: "BMP280_I2C_ADDR", description: "STM32_BMP280_BMP280_I2C_ADDR" },
        { value: "BMP280_POWER_SLEEP", description: "STM32_BMP280_BMP280_POWER_SLEEP" },
        { value: "BMP280_POWER_FORCED", description: "STM32_BMP280_BMP280_POWER_FORCED" },
        { value: "BMP280_POWER_NORMAL", description: "STM32_BMP280_BMP280_POWER_NORMAL" },
        { value: "BMP280_SPI3W_ON", description: "STM32_BMP280_BMP280_SPI3W_ON" },
        { value: "BMP280_SPI3W_OFF", description: "STM32_BMP280_BMP280_SPI3W_OFF" },
        { value: "BMP280_TEMP_OS_SKIP", description: "STM32_BMP280_BMP280_TEMP_OS_SKIP" },
        { value: "BMP280_TEMP_OS_1", description: "STM32_BMP280_BMP280_TEMP_OS_1" },
        { value: "BMP280_TEMP_OS_2", description: "STM32_BMP280_BMP280_TEMP_OS_2" },
        { value: "BMP280_TEMP_OS_4", description: "STM32_BMP280_BMP280_TEMP_OS_4" },
        { value: "BMP280_TEMP_OS_8", description: "STM32_BMP280_BMP280_TEMP_OS_8" },
        { value: "BMP280_TEMP_OS_16", description: "STM32_BMP280_BMP280_TEMP_OS_16" },
        { value: "BMP280_PRES_OS_SKIP", description: "STM32_BMP280_BMP280_PRES_OS_SKIP" },
        { value: "BMP280_PRES_OS_1", description: "STM32_BMP280_BMP280_PRES_OS_1" },
        { value: "BMP280_PRES_OS_2", description: "STM32_BMP280_BMP280_PRES_OS_2" },
        { value: "BMP280_PRES_OS_4", description: "STM32_BMP280_BMP280_PRES_OS_4" },
        { value: "BMP280_PRES_OS_8", description: "STM32_BMP280_BMP280_PRES_OS_8" },
        { value: "BMP280_PRES_OS_16", description: "STM32_BMP280_BMP280_PRES_OS_16" },
        { value: "BMP280_STANDBY_0_5", description: "STM32_BMP280_BMP280_STANDBY_0_5" },
        { value: "BMP280_STANDBY_62_5", description: "STM32_BMP280_BMP280_STANDBY_62_5" },
        { value: "BMP280_STANDBY_125", description: "STM32_BMP280_BMP280_STANDBY_125" },
        { value: "BMP280_STANDBY_250", description: "STM32_BMP280_BMP280_STANDBY_250" },
        { value: "BMP280_STANDBY_500", description: "STM32_BMP280_BMP280_STANDBY_500" },
        { value: "BMP280_STANDBY_1000", description: "STM32_BMP280_BMP280_STANDBY_1000" },
        { value: "BMP280_STANDBY_2000", description: "STM32_BMP280_BMP280_STANDBY_2000" },
        { value: "BMP280_STANDBY_4000", description: "STM32_BMP280_BMP280_STANDBY_4000" },
        { value: "BMP280_IIR_FILTER_OFF", description: "STM32_BMP280_BMP280_IIR_FILTER_OFF" },
        { value: "BMP280_IIR_FILTER_2", description: "STM32_BMP280_BMP280_IIR_FILTER_2" },
        { value: "BMP280_IIR_FILTER_4", description: "STM32_BMP280_BMP280_IIR_FILTER_4" },
        { value: "BMP280_IIR_FILTER_8", description: "STM32_BMP280_BMP280_IIR_FILTER_8" },
        { value: "BMP280_IIR_FILTER_16", description: "STM32_BMP280_BMP280_IIR_FILTER_16" },
        { value: "BMP280_OS_ULTRALOW", description: "STM32_BMP280_BMP280_OS_ULTRALOW" },
        { value: "BMP280_OS_LOW", description: "STM32_BMP280_BMP280_OS_LOW" },
        { value: "BMP280_OS_STANDARD", description: "STM32_BMP280_BMP280_OS_STANDARD" },
        { value: "BMP280_OS_HIGH", description: "STM32_BMP280_BMP280_OS_HIGH" },
        { value: "BMP280_OS_ULTRAHIGH", description: "STM32_BMP280_BMP280_OS_ULTRAHIGH" },
        { value: "_BMP280_OS_MATRIX", description: "STM32_BMP280__BMP280_OS_MATRIX" },
        { value: "BMP280_CASE_HANDHELD_LOW", description: "STM32_BMP280_BMP280_CASE_HANDHELD_LOW" },
        { value: "BMP280_CASE_HANDHELD_DYN", description: "STM32_BMP280_BMP280_CASE_HANDHELD_DYN" },
        { value: "BMP280_CASE_WEATHER", description: "STM32_BMP280_BMP280_CASE_WEATHER" },
        { value: "BMP280_CASE_FLOOR", description: "STM32_BMP280_BMP280_CASE_FLOOR" },
        { value: "BMP280_CASE_DROP", description: "STM32_BMP280_BMP280_CASE_DROP" },
        { value: "BMP280_CASE_INDOOR", description: "STM32_BMP280_BMP280_CASE_INDOOR" },
        { value: "_BMP280_CASE_MATRIX", description: "STM32_BMP280__BMP280_CASE_MATRIX" },
        { value: "_BMP280_REGISTER_ID", description: "STM32_BMP280__BMP280_REGISTER_ID" },
        { value: "_BMP280_REGISTER_RESET", description: "STM32_BMP280__BMP280_REGISTER_RESET" },
        { value: "_BMP280_REGISTER_STATUS", description: "STM32_BMP280__BMP280_REGISTER_STATUS" },
        { value: "_BMP280_REGISTER_CONTROL", description: "STM32_BMP280__BMP280_REGISTER_CONTROL" },
        { value: "_BMP280_REGISTER_CONFIG", description: "STM32_BMP280__BMP280_REGISTER_CONFIG" },
        { value: "_BMP280_REGISTER_DATA", description: "STM32_BMP280__BMP280_REGISTER_DATA" },
        { value: "BMP280", meta: "stm32_bmp280", kind: "class", description: "STM32_BMP280_BMP280", content: [] },
        { title: "BMP280(i2c, addr=BMP280_I2C_ADDR, use_case=BMP280_CASE_HANDHELD_DYN)", value: "BMP280()", meta: "constructor", description: "STM32_BMP280_BMP280_CTOR", returns: "BMP280@stm32_bmp280", snippet: "BMP280($1)" },
        { value: "__name__", meta: "stm32_bmp280", description: "STM32_BMP280_MODULE" }
    ];
    typeTree.BMP280 = [
        { title: "set_default_measure()", value: "set_default_measure", meta: "-- <function>", description: "STM32_BMP280_BMP280_SET_DEFAULT_MEASURE", snippet: "set_default_measure()" },
        { title: "reset()", value: "reset", meta: "-- <function>", description: "STM32_BMP280_BMP280_RESET", snippet: "reset()" },
        { title: "load_test_calibration()", value: "load_test_calibration", meta: "-- <function>", description: "STM32_BMP280_BMP280_LOAD_TEST_CALIBRATION", snippet: "load_test_calibration()" },
        { title: "load_test_data()", value: "load_test_data", meta: "-- <function>", description: "STM32_BMP280_BMP280_LOAD_TEST_DATA", snippet: "load_test_data()" },
        { title: "print_calibration()", value: "print_calibration", meta: "-- <function>", description: "STM32_BMP280_BMP280_PRINT_CALIBRATION", snippet: "print_calibration()" },
        { title: "temperature()", value: "temperature", meta: "-- <function>", description: "STM32_BMP280_BMP280_TEMPERATURE", snippet: "temperature()" },
        { title: "pressure()", value: "pressure", meta: "-- <function>", description: "STM32_BMP280_BMP280_PRESSURE", snippet: "pressure()" },
        { title: "altitude()", value: "altitude", meta: "-- <function>", description: "STM32_BMP280_BMP280_ALTITUDE", snippet: "altitude()" },
        { title: "standby([value])", value: "standby", meta: "-- <function>", description: "STM32_BMP280_BMP280_STANDBY", snippet: "standby($1)" },
        { title: "iir([value])", value: "iir", meta: "-- <function>", description: "STM32_BMP280_BMP280_IIR", snippet: "iir($1)" },
        { title: "spi3w([value])", value: "spi3w", meta: "-- <function>", description: "STM32_BMP280_BMP280_SPI3W", snippet: "spi3w($1)" },
        { title: "temp_os([value])", value: "temp_os", meta: "-- <function>", description: "STM32_BMP280_BMP280_TEMP_OS", snippet: "temp_os($1)" },
        { title: "press_os([value])", value: "press_os", meta: "-- <function>", description: "STM32_BMP280_BMP280_PRESS_OS", snippet: "press_os($1)" },
        { title: "power_mode([value])", value: "power_mode", meta: "-- <function>", description: "STM32_BMP280_BMP280_POWER_MODE", snippet: "power_mode($1)" },
        { title: "is_measuring()", value: "is_measuring", meta: "-- <function>", description: "STM32_BMP280_BMP280_IS_MEASURING", snippet: "is_measuring()" },
        { title: "is_updating()", value: "is_updating", meta: "-- <function>", description: "STM32_BMP280_BMP280_IS_UPDATING", snippet: "is_updating()" },
        { title: "chip_id()", value: "chip_id", meta: "-- <function>", description: "STM32_BMP280_BMP280_CHIP_ID", snippet: "chip_id()" },
        { title: "in_normal_mode()", value: "in_normal_mode", meta: "-- <function>", description: "STM32_BMP280_BMP280_IN_NORMAL_MODE", snippet: "in_normal_mode()" },
        { title: "force_measure()", value: "force_measure", meta: "-- <function>", description: "STM32_BMP280_BMP280_FORCE_MEASURE", snippet: "force_measure()" },
        { title: "normal_measure()", value: "normal_measure", meta: "-- <function>", description: "STM32_BMP280_BMP280_NORMAL_MEASURE", snippet: "normal_measure()" },
        { title: "sleep()", value: "sleep", meta: "-- <function>", description: "STM32_BMP280_BMP280_SLEEP", snippet: "sleep()" },
        { title: "use_case(uc)", value: "use_case", meta: "-- <function>", description: "STM32_BMP280_BMP280_USE_CASE", snippet: "use_case($1)" },
        { title: "oversample(oss)", value: "oversample", meta: "-- <function>", description: "STM32_BMP280_BMP280_OVERSAMPLE", snippet: "oversample($1)" },
    ];

    tree.stm32_chainableLED = [
        { value: "P9813", meta: "stm32_chainableLED", kind: "class", description: "STM32_CHAINABLELED_P9813", content: [] },
        { title: "P9813(pin_clk, pin_data, num_leds)", value: "P9813()", meta: "constructor", description: "STM32_CHAINABLELED_P9813_CTOR", returns: "P9813@stm32_chainableLED", snippet: "P9813($1)" },
        { value: "__name__", meta: "stm32_chainableLED", description: "STM32_CHAINABLELED_MODULE" }
    ];
    typeTree.P9813 = [
        { title: "fill(color)", value: "fill", meta: "-- <function>", description: "STM32_CHAINABLELED_P9813_FILL", snippet: "fill($1)" },
        { title: "reset()", value: "reset", meta: "-- <function>", description: "STM32_CHAINABLELED_P9813_RESET", snippet: "reset()" },
        { title: "write()", value: "write", meta: "-- <function>", description: "STM32_CHAINABLELED_P9813_WRITE", snippet: "write()" },
    ];

    tree.stm32_colorSensor = [
        { value: "_COLOR_SENSOR_I2C_ADDR", description: "STM32_COLORSENSOR__COLOR_SENSOR_I2C_ADDR" },
        { value: "_COMMAND_BIT", description: "STM32_COLORSENSOR__COMMAND_BIT" },
        { value: "_REGISTER_ENABLE", description: "STM32_COLORSENSOR__REGISTER_ENABLE" },
        { value: "_REGISTER_ATIME", description: "STM32_COLORSENSOR__REGISTER_ATIME" },
        { value: "_REGISTER_AILT", description: "STM32_COLORSENSOR__REGISTER_AILT" },
        { value: "_REGISTER_AIHT", description: "STM32_COLORSENSOR__REGISTER_AIHT" },
        { value: "_REGISTER_ID", description: "STM32_COLORSENSOR__REGISTER_ID" },
        { value: "_REGISTER_APERS", description: "STM32_COLORSENSOR__REGISTER_APERS" },
        { value: "_REGISTER_CONTROL", description: "STM32_COLORSENSOR__REGISTER_CONTROL" },
        { value: "_REGISTER_SENSORID", description: "STM32_COLORSENSOR__REGISTER_SENSORID" },
        { value: "_REGISTER_STATUS", description: "STM32_COLORSENSOR__REGISTER_STATUS" },
        { value: "_REGISTER_CDATA", description: "STM32_COLORSENSOR__REGISTER_CDATA" },
        { value: "_REGISTER_RDATA", description: "STM32_COLORSENSOR__REGISTER_RDATA" },
        { value: "_REGISTER_GDATA", description: "STM32_COLORSENSOR__REGISTER_GDATA" },
        { value: "_REGISTER_BDATA", description: "STM32_COLORSENSOR__REGISTER_BDATA" },
        { value: "_ENABLE_AIEN", description: "STM32_COLORSENSOR__ENABLE_AIEN" },
        { value: "_ENABLE_WEN", description: "STM32_COLORSENSOR__ENABLE_WEN" },
        { value: "_ENABLE_AEN", description: "STM32_COLORSENSOR__ENABLE_AEN" },
        { value: "_ENABLE_PON", description: "STM32_COLORSENSOR__ENABLE_PON" },
        { value: "_GAINS", description: "STM32_COLORSENSOR__GAINS" },
        { value: "_CYCLES", description: "STM32_COLORSENSOR__CYCLES" },
        { value: "TCS34725", meta: "stm32_colorSensor", kind: "class", description: "STM32_COLORSENSOR_TCS34725", content: [] },
        { title: "TCS34725(i2c, addr=_COLOR_SENSOR_I2C_ADDR)", value: "TCS34725()", meta: "constructor", description: "STM32_COLORSENSOR_TCS34725_CTOR", returns: "TCS34725@stm32_colorSensor", snippet: "TCS34725($1)" },
        { value: "__name__", meta: "stm32_colorSensor", description: "STM32_COLORSENSOR_MODULE" }
    ];
    typeTree.TCS34725 = [
        { title: "active(value=None)", value: "active", meta: "-- <function>", description: "STM32_COLORSENSOR_TCS34725_ACTIVE", snippet: "active($1)" },
        { title: "sensor_id()", value: "sensor_id", meta: "-- <function>", description: "STM32_COLORSENSOR_TCS34725_SENSOR_ID", snippet: "sensor_id()" },
        { title: "integration_time(value=None)", value: "integration_time", meta: "-- <function>", description: "STM32_COLORSENSOR_TCS34725_INTEGRATION_TIME", snippet: "integration_time($1)" },
        { title: "gain(value)", value: "gain", meta: "-- <function>", description: "STM32_COLORSENSOR_TCS34725_GAIN", snippet: "gain($1)" },
        { title: "read(raw=False)", value: "read", meta: "-- <function>", description: "STM32_COLORSENSOR_TCS34725_READ", snippet: "read($1)" },
        { title: "threshold(cycles=None, min_value=None, max_value=None)", value: "threshold", meta: "-- <function>", description: "STM32_COLORSENSOR_TCS34725_THRESHOLD", snippet: "threshold($1)" },
        { title: "interrupt(value=None)", value: "interrupt", meta: "-- <function>", description: "STM32_COLORSENSOR_TCS34725_INTERRUPT", snippet: "interrupt($1)" },
        { title: "html_rgb(data)", value: "html_rgb", meta: "-- <function>", description: "STM32_COLORSENSOR_TCS34725_HTML_RGB", snippet: "html_rgb($1)" },
        { title: "html_hex(data)", value: "html_hex", meta: "-- <function>", description: "STM32_COLORSENSOR_TCS34725_HTML_HEX", snippet: "html_hex($1)" },
    ];

    tree.stm32_dht = [
        { value: "DHTBase", meta: "stm32_dht", kind: "class", description: "STM32_DHT_DHTBase", content: [] },
        { title: "DHTBase(pin)", value: "DHTBase()", meta: "constructor", description: "STM32_DHT_DHTBase_CTOR", returns: "DHTBase@stm32_dht", snippet: "DHTBase($1)" },
        { value: "DHT11", meta: "stm32_dht", kind: "class", description: "STM32_DHT_DHT11", content: [], extends: "DHTBase" },
        { title: "DHT11(pin)", value: "DHT11()", meta: "constructor", description: "STM32_DHT_DHT11_CTOR", returns: "DHT11@stm32_dht", snippet: "DHT11($1)", extends: "DHTBase" },
        { value: "DHT22", meta: "stm32_dht", kind: "class", description: "STM32_DHT_DHT22", content: [], extends: "DHTBase" },
        { title: "DHT22(pin)", value: "DHT22()", meta: "constructor", description: "STM32_DHT_DHT22_CTOR", returns: "DHT22@stm32_dht", snippet: "DHT22($1)", extends: "DHTBase" },
        { value: "__name__", meta: "stm32_dht", description: "STM32_DHT_MODULE" }
    ];
    typeTree.DHTBase = [
        { title: "measure()", value: "measure", meta: "-- <function>", description: "STM32_DHT_DHTBase_MEASURE", snippet: "measure()" },
    ];
    typeTree.DHT11 = [
        { title: "humidity()", value: "humidity", meta: "-- <function>", description: "STM32_DHT_DHT11_HUMIDITY", snippet: "humidity()" },
        { title: "temperature()", value: "temperature", meta: "-- <function>", description: "STM32_DHT_DHT11_TEMPERATURE", snippet: "temperature()" },
    ];
    typeTree.DHT22 = [
        { title: "humidity()", value: "humidity", meta: "-- <function>", description: "STM32_DHT_DHT22_HUMIDITY", snippet: "humidity()" },
        { title: "temperature()", value: "temperature", meta: "-- <function>", description: "STM32_DHT_DHT22_TEMPERATURE", snippet: "temperature()" },
    ];

    tree.stm32_driverAT = [
        { value: "AtCmd", meta: "stm32_driverAT", kind: "class", description: "STM32_DRIVERAT_AtCmd", content: [] },
        { title: "AtCmd(Cmd, Response=\"None\", Timeout=2500)", value: "AtCmd()", meta: "constructor", description: "STM32_DRIVERAT_AtCmd_CTOR", returns: "AtCmd@stm32_driverAT", snippet: "AtCmd($1)" },
        { value: "DriverAtCmd", meta: "stm32_driverAT", kind: "class", description: "STM32_DRIVERAT_DriverAtCmd", content: [] },
        { title: "DriverAtCmd(Baudrate, UartId, ListAtCmd, VerboseMode=False)", value: "DriverAtCmd()", meta: "constructor", description: "STM32_DRIVERAT_DriverAtCmd_CTOR", returns: "DriverAtCmd@stm32_driverAT", snippet: "DriverAtCmd($1)" },
        { value: "__name__", meta: "stm32_driverAT", description: "STM32_DRIVERAT_MODULE" }
    ];
    typeTree.AtCmd = [];
    typeTree.DriverAtCmd = [
        { title: "sendCmd(AtCmdKey)", value: "sendCmd", meta: "-- <function>", description: "STM32_DRIVERAT_DriverAtCmd_SENDCMD", snippet: "sendCmd($1)" },
        { title: "getCmd(AtCmdKey)", value: "getCmd", meta: "-- <function>", description: "STM32_DRIVERAT_DriverAtCmd_GETCMD", snippet: "getCmd($1)" },
    ];

    tree.stm32_ds18x20 = [
        { value: "_CONVERT", description: "STM32_DS18X20__CONVERT" },
        { value: "_RD_SCRATCH", description: "STM32_DS18X20__RD_SCRATCH" },
        { value: "_WR_SCRATCH", description: "STM32_DS18X20__WR_SCRATCH" },
        { value: "DS18X20", meta: "stm32_ds18x20", kind: "class", description: "STM32_DS18X20_DS18X20", content: [] },
        { title: "DS18X20(onewire)", value: "DS18X20()", meta: "constructor", description: "STM32_DS18X20_DS18X20_CTOR", returns: "DS18X20@stm32_ds18x20", snippet: "DS18X20($1)" },
        { value: "__name__", meta: "stm32_ds18x20", description: "STM32_DS18X20_MODULE" }
    ];
    typeTree.DS18X20 = [
        { title: "scan()", value: "scan", meta: "-- <function>", description: "STM32_DS18X20_DS18X20_SCAN", snippet: "scan()" },
        { title: "convert_temp()", value: "convert_temp", meta: "-- <function>", description: "STM32_DS18X20_DS18X20_CONVERT_TEMP", snippet: "convert_temp()" },
        { title: "read_scratch(rom)", value: "read_scratch", meta: "-- <function>", description: "STM32_DS18X20_DS18X20_READ_SCRATCH", snippet: "read_scratch($1)" },
        { title: "write_scratch(rom, buf)", value: "write_scratch", meta: "-- <function>", description: "STM32_DS18X20_DS18X20_WRITE_SCRATCH", snippet: "write_scratch($1)" },
        { title: "read_temp(rom)", value: "read_temp", meta: "-- <function>", description: "STM32_DS18X20_DS18X20_READ_TEMP", snippet: "read_temp($1)" },
    ];

    tree.stm32_gas = [
        { value: "MULTICHANNEL_GAS_I2C_ADDR", description: "STM32_GAS_MULTICHANNEL_GAS_I2C_ADDR" },
        { value: "GAS", meta: "stm32_gas", kind: "class", description: "STM32_GAS_GAS", content: [] },
        { title: "GAS(i2c, addr=MULTICHANNEL_GAS_I2C_ADDR)", value: "GAS()", meta: "constructor", description: "STM32_GAS_GAS_CTOR", returns: "GAS@stm32_gas", snippet: "GAS($1)" },
        { value: "__name__", meta: "stm32_gas", description: "STM32_GAS_MODULE" }
    ];
    typeTree.GAS = [
        { title: "cmd(cmd, nbytes=2)", value: "cmd", meta: "-- <function>", description: "STM32_GAS_GAS_CMD", snippet: "cmd($1)" },
        { title: "get_version()", value: "get_version", meta: "-- <function>", description: "STM32_GAS_GAS_GET_VERSION", snippet: "get_version()" },
        { title: "change_addr(new_addr)", value: "change_addr", meta: "-- <function>", description: "STM32_GAS_GAS_CHANGE_ADDR", snippet: "change_addr($1)" },
        { title: "power_on()", value: "power_on", meta: "-- <function>", description: "STM32_GAS_GAS_POWER_ON", snippet: "power_on()" },
        { title: "power_off()", value: "power_off", meta: "-- <function>", description: "STM32_GAS_GAS_POWER_OFF", snippet: "power_off()" },
        { title: "led_on()", value: "led_on", meta: "-- <function>", description: "STM32_GAS_GAS_LED_ON", snippet: "led_on()" },
        { title: "led_off()", value: "led_off", meta: "-- <function>", description: "STM32_GAS_GAS_LED_OFF", snippet: "led_off()" },
        { title: "calc_gas(gas)", value: "calc_gas", meta: "-- <function>", description: "STM32_GAS_GAS_CALC_GAS", snippet: "calc_gas($1)" },
        { title: "display_eeprom()", value: "display_eeprom", meta: "-- <function>", description: "STM32_GAS_GAS_DISPLAY_EEPROM", snippet: "display_eeprom()" },
        { title: "do_calibrate()", value: "do_calibrate", meta: "-- <function>", description: "STM32_GAS_GAS_DO_CALIBRATE", snippet: "do_calibrate()" },
        { title: "gas_dump()", value: "gas_dump", meta: "-- <function>", description: "STM32_GAS_GAS_GAS_DUMP", snippet: "gas_dump()" },
        { value: "ADDR_IS_SET", description: "STM32_GAS_GAS_ADDR_IS_SET" },
        { value: "ADDR_FACTORY_ADC_NH3", description: "STM32_GAS_GAS_ADDR_FACTORY_ADC_NH3" },
        { value: "ADDR_FACTORY_ADC_CO", description: "STM32_GAS_GAS_ADDR_FACTORY_ADC_CO" },
        { value: "ADDR_FACTORY_ADC_NO2", description: "STM32_GAS_GAS_ADDR_FACTORY_ADC_NO2" },
        { value: "ADDR_USER_ADC_HN3", description: "STM32_GAS_GAS_ADDR_USER_ADC_HN3" },
        { value: "ADDR_USER_ADC_CO", description: "STM32_GAS_GAS_ADDR_USER_ADC_CO" },
        { value: "ADDR_USER_ADC_NO2", description: "STM32_GAS_GAS_ADDR_USER_ADC_NO2" },
        { value: "ADDR_IF_CALI", description: "STM32_GAS_GAS_ADDR_IF_CALI" },
        { value: "ADDR_I2C_ADDRESS", description: "STM32_GAS_GAS_ADDR_I2C_ADDRESS" },
        { value: "CH_VALUE_NH3", description: "STM32_GAS_GAS_CH_VALUE_NH3" },
        { value: "CH_VALUE_CO", description: "STM32_GAS_GAS_CH_VALUE_CO" },
        { value: "CH_VALUE_NO2", description: "STM32_GAS_GAS_CH_VALUE_NO2" },
        { value: "CMD_ADC_RES0", description: "STM32_GAS_GAS_CMD_ADC_RES0" },
        { value: "CMD_ADC_RES1", description: "STM32_GAS_GAS_CMD_ADC_RES1" },
        { value: "CMD_ADC_RES2", description: "STM32_GAS_GAS_CMD_ADC_RES2" },
        { value: "CMD_ADC_RESALL", description: "STM32_GAS_GAS_CMD_ADC_RESALL" },
        { value: "CMD_CHANGE_I2C", description: "STM32_GAS_GAS_CMD_CHANGE_I2C" },
        { value: "CMD_READ_EEPROM", description: "STM32_GAS_GAS_CMD_READ_EEPROM" },
        { value: "CMD_SET_R0_ADC", description: "STM32_GAS_GAS_CMD_SET_R0_ADC" },
        { value: "CMD_GET_R0_ADC", description: "STM32_GAS_GAS_CMD_GET_R0_ADC" },
        { value: "CMD_GET_R0_ADC_FACTORY", description: "STM32_GAS_GAS_CMD_GET_R0_ADC_FACTORY" },
        { value: "CMD_CONTROL_LED", description: "STM32_GAS_GAS_CMD_CONTROL_LED" },
        { value: "CMD_CONTROL_PWR", description: "STM32_GAS_GAS_CMD_CONTROL_PWR" },
        { value: "CO", description: "STM32_GAS_GAS_CO" },
        { value: "NO2", description: "STM32_GAS_GAS_NO2" },
        { value: "NH3", description: "STM32_GAS_GAS_NH3" },
        { value: "C3H8", description: "STM32_GAS_GAS_C3H8" },
        { value: "C4H10", description: "STM32_GAS_GAS_C4H10" },
        { value: "CH4", description: "STM32_GAS_GAS_CH4" },
        { value: "H2", description: "STM32_GAS_GAS_H2" },
        { value: "C2H5OH", description: "STM32_GAS_GAS_C2H5OH" },
    ];

    tree.stm32_hm330x = [
        { value: "HM330_I2C_ADDR", description: "STM32_HM330X_HM330_I2C_ADDR" },
        { value: "HM330_INIT", description: "STM32_HM330X_HM330_INIT" },
        { value: "HM330_MEM_ADDR", description: "STM32_HM330X_HM330_MEM_ADDR" },
        { value: "HM330X", meta: "stm32_hm330x", kind: "class", description: "STM32_HM330X_HM330X", content: [] },
        { title: "HM330X(i2c, addr=HM330_I2C_ADDR)", value: "HM330X()", meta: "constructor", description: "STM32_HM330X_HM330X_CTOR", returns: "HM330X@stm32_hm330x", snippet: "HM330X($1)" },
        { value: "__name__", meta: "stm32_hm330x", description: "STM32_HM330X_MODULE" }
    ];
    typeTree.HM330X = [
        { title: "read_data()", value: "read_data", meta: "-- <function>", description: "STM32_HM330X_HM330X_READ_DATA", snippet: "read_data()" },
        { title: "check_crc(data)", value: "check_crc", meta: "-- <function>", description: "STM32_HM330X_HM330X_CHECK_CRC", snippet: "check_crc($1)" },
        { title: "parse_data(data)", value: "parse_data", meta: "-- <function>", description: "STM32_HM330X_HM330X_PARSE_DATA", snippet: "parse_data($1)" },
        { title: "getData(select)", value: "getData", meta: "-- <function>", description: "STM32_HM330X_HM330X_GETDATA", snippet: "getData($1)" },
    ];

    tree.stm32_lcd_i2c = [
        { value: "_LCD_I2C_ADDR", description: "STM32_LCD_I2C__LCD_I2C_ADDR" },
        { value: "_LCD_BACKLIGHT_I2C_ADDR", description: "STM32_LCD_I2C__LCD_BACKLIGHT_I2C_ADDR" },
        { value: "_LCD_COMMAND", description: "STM32_LCD_I2C__LCD_COMMAND" },
        { value: "_LCD_CLEARDISPLAY", description: "STM32_LCD_I2C__LCD_CLEARDISPLAY" },
        { value: "_LCD_RETURNHOME", description: "STM32_LCD_I2C__LCD_RETURNHOME" },
        { value: "_LCD_ENTRYMODESET", description: "STM32_LCD_I2C__LCD_ENTRYMODESET" },
        { value: "_LCD_DISPLAYCONTROL", description: "STM32_LCD_I2C__LCD_DISPLAYCONTROL" },
        { value: "_LCD_CURSORSHIFT", description: "STM32_LCD_I2C__LCD_CURSORSHIFT" },
        { value: "_LCD_FUNCTIONSET", description: "STM32_LCD_I2C__LCD_FUNCTIONSET" },
        { value: "_LCD_SETCGRAMADDR", description: "STM32_LCD_I2C__LCD_SETCGRAMADDR" },
        { value: "_LCD_SETDDRAMADDR", description: "STM32_LCD_I2C__LCD_SETDDRAMADDR" },
        { value: "_LCD_ENTRYRIGHT", description: "STM32_LCD_I2C__LCD_ENTRYRIGHT" },
        { value: "_LCD_ENTRYLEFT", description: "STM32_LCD_I2C__LCD_ENTRYLEFT" },
        { value: "_LCD_ENTRYSHIFTINCREMENT", description: "STM32_LCD_I2C__LCD_ENTRYSHIFTINCREMENT" },
        { value: "_LCD_ENTRYSHIFTDECREMENT", description: "STM32_LCD_I2C__LCD_ENTRYSHIFTDECREMENT" },
        { value: "_LCD_DISPLAYON", description: "STM32_LCD_I2C__LCD_DISPLAYON" },
        { value: "_LCD_DISPLAYOFF", description: "STM32_LCD_I2C__LCD_DISPLAYOFF" },
        { value: "_LCD_CURSORON", description: "STM32_LCD_I2C__LCD_CURSORON" },
        { value: "_LCD_CURSOROFF", description: "STM32_LCD_I2C__LCD_CURSOROFF" },
        { value: "_LCD_BLINKON", description: "STM32_LCD_I2C__LCD_BLINKON" },
        { value: "_LCD_BLINKOFF", description: "STM32_LCD_I2C__LCD_BLINKOFF" },
        { value: "_LCD_DISPLAYMOVE", description: "STM32_LCD_I2C__LCD_DISPLAYMOVE" },
        { value: "_LCD_CURSORMOVE", description: "STM32_LCD_I2C__LCD_CURSORMOVE" },
        { value: "_LCD_MOVERIGHT", description: "STM32_LCD_I2C__LCD_MOVERIGHT" },
        { value: "_LCD_MOVELEFT", description: "STM32_LCD_I2C__LCD_MOVELEFT" },
        { value: "_LCD_8BITMODE", description: "STM32_LCD_I2C__LCD_8BITMODE" },
        { value: "_LCD_4BITMODE", description: "STM32_LCD_I2C__LCD_4BITMODE" },
        { value: "_LCD_2LINE", description: "STM32_LCD_I2C__LCD_2LINE" },
        { value: "_LCD_1LINE", description: "STM32_LCD_I2C__LCD_1LINE" },
        { value: "LCD1602", meta: "stm32_lcd_i2c", kind: "class", description: "STM32_LCD_I2C_LCD1602", content: [] },
        { title: "LCD1602(i2c, addr=_LCD_I2C_ADDR, backlight=None, oneline=None, charsize=0)", value: "LCD1602()", meta: "constructor", description: "STM32_LCD_I2C_LCD1602_CTOR", returns: "LCD1602@stm32_lcd_i2c", snippet: "LCD1602($1)" },
        { value: "Backlight", meta: "stm32_lcd_i2c", kind: "class", description: "STM32_LCD_I2C_BACKLIGHT", content: [] },
        { title: "Backlight(i2c, addr=_LCD_BACKLIGHT_I2C_ADDR)", value: "Backlight()", meta: "constructor", description: "STM32_LCD_I2C_BACKLIGHT_CTOR", returns: "Backlight@stm32_lcd_i2c", snippet: "Backlight($1)" },
        { value: "__name__", meta: "stm32_lcd_i2c", description: "STM32_LCD_I2C_MODULE" }
    ];
    typeTree.LCD1602 = [
        { title: "writeTxt(text)", value: "writeTxt", meta: "-- <function>", description: "STM32_LCD_I2C_LCD1602_WRITETXT", snippet: "writeTxt($1)" },
        { title: "write_char(char)", value: "write_char", meta: "-- <function>", description: "STM32_LCD_I2C_LCD1602_WRITE_CHAR", snippet: "write_char($1)" },
        { title: "setCursor(x, y)", value: "setCursor", meta: "-- <function>", description: "STM32_LCD_I2C_LCD1602_SETCURSOR", snippet: "setCursor($1)" },
        { title: "display(s)", value: "display", meta: "-- <function>", description: "STM32_LCD_I2C_LCD1602_DISPLAY", snippet: "display($1)" },
        { title: "cursor(s)", value: "cursor", meta: "-- <function>", description: "STM32_LCD_I2C_LCD1602_CURSOR", snippet: "cursor($1)" },
        { title: "home()", value: "home", meta: "-- <function>", description: "STM32_LCD_I2C_LCD1602_HOME", snippet: "home()" },
        { title: "clear()", value: "clear", meta: "-- <function>", description: "STM32_LCD_I2C_LCD1602_CLEAR", snippet: "clear()" },
        { title: "color(color)", value: "color", meta: "-- <function>", description: "STM32_LCD_I2C_LCD1602_COLOR", snippet: "color($1)" },
        { title: "blinkLed()", value: "blinkLed", meta: "-- <function>", description: "STM32_LCD_I2C_LCD1602_BLINKLED", snippet: "blinkLed()" },
    ];
    typeTree.Backlight = [
        { title: "set_color(color)", value: "set_color", meta: "-- <function>", description: "STM32_LCD_I2C_BACKLIGHT_SET_COLOR", snippet: "set_color($1)" },
        { title: "blinkLed()", value: "blinkLed", meta: "-- <function>", description: "STM32_LCD_I2C_BACKLIGHT_BLINKLED", snippet: "blinkLed()" },
        { value: "REG_RED", description: "STM32_LCD_I2C_BACKLIGHT_REG_RED" },
        { value: "REG_GREEN", description: "STM32_LCD_I2C_BACKLIGHT_REG_GREEN" },
        { value: "REG_BLUE", description: "STM32_LCD_I2C_BACKLIGHT_REG_BLUE" },
        { value: "REG_MODE1", description: "STM32_LCD_I2C_BACKLIGHT_REG_MODE1" },
        { value: "REG_MODE2", description: "STM32_LCD_I2C_BACKLIGHT_REG_MODE2" },
        { value: "REG_OUTPUT", description: "STM32_LCD_I2C_BACKLIGHT_REG_OUTPUT" },
    ];

    tree.stm32_LoRa = [
        { value: "LoRa", meta: "stm32_LoRa", kind: "class", description: "STM32_LORA_LORA", content: [] },
        { title: "LoRa(Baudrate=9600, UartId=0, DataReceiveCallback=None, VerboseMode=False)", value: "LoRa()", meta: "constructor", description: "STM32_LORA_LORA_CTOR", returns: "LoRa@stm32_LoRa", snippet: "LoRa($1)" },
        { value: "__name__", meta: "stm32_LoRa", description: "STM32_LORA_MODULE" }
    ];
    typeTree.LoRa = [
        { title: "getDriverVersion()", value: "getDriverVersion", meta: "-- <function>", description: "STM32_LORA_LORA_GETDRIVERVERSION", snippet: "getDriverVersion()" },
        { title: "setIdentify(DevAddr=\"00 00 00 00\", DevEui=None, AppEui=\"48 83 C7 DF 30 06 00 00\", AppKey=\"71 A4 36 4B 48 45 03 5D D7 8A 4E D8 AC 7F 90 17\", AppSKey=None, NWKSKEY=None)", value: "setIdentify", meta: "-- <function>", description: "STM32_LORA_LORA_SETIDENTIFY", snippet: "setIdentify($1)" },
        { title: "getIdentify()", value: "getIdentify", meta: "-- <function>", description: "STM32_LORA_LORA_GETIDENTIFY", snippet: "getIdentify()" },
        { title: "join()", value: "join", meta: "-- <function>", description: "STM32_LORA_LORA_JOIN", snippet: "join()" },
        { title: "sendData(Data, Port=1, NeedAck=False)", value: "sendData", meta: "-- <function>", description: "STM32_LORA_LORA_SENDDATA", snippet: "sendData($1)" },
        { title: "sendString(Data, Port=1, NeedAck=False)", value: "sendString", meta: "-- <function>", description: "STM32_LORA_LORA_SENDSTRING", snippet: "sendString($1)" },
        { title: "setPort(Port=1)", value: "setPort", meta: "-- <function>", description: "STM32_LORA_LORA_SETPORT", snippet: "setPort($1)" },
        { title: "reset()", value: "reset", meta: "-- <function>", description: "STM32_LORA_LORA_RESET", snippet: "reset()" },
        { title: "factorySettings()", value: "factorySettings", meta: "-- <function>", description: "STM32_LORA_LORA_FACTORYSETTINGS", snippet: "factorySettings()" },
        { title: "setDfu(DfuState=False)", value: "setDfu", meta: "-- <function>", description: "STM32_LORA_LORA_SETDFU", snippet: "setDfu($1)" },
        { title: "getDfu()", value: "getDfu", meta: "-- <function>", description: "STM32_LORA_LORA_GETDFU", snippet: "getDfu()" },
        { title: "setMode(Mode)", value: "setMode", meta: "-- <function>", description: "STM32_LORA_LORA_SETMODE", snippet: "setMode($1)" },
        { title: "getMode()", value: "getMode", meta: "-- <function>", description: "STM32_LORA_LORA_GETMODE", snippet: "getMode()" },
        { title: "setClass(Class=\"A\")", value: "setClass", meta: "-- <function>", description: "STM32_LORA_LORA_SETCLASS", snippet: "setClass($1)" },
        { title: "getClass()", value: "getClass", meta: "-- <function>", description: "STM32_LORA_LORA_GETCLASS", snippet: "getClass()" },
        { title: "setDelays(JRX1=5000, JRX2=6000, RX1=1000, RX2=2000)", value: "setDelays", meta: "-- <function>", description: "STM32_LORA_LORA_SETDELAYS", snippet: "setDelays($1)" },
        { title: "getDelays()", value: "getDelays", meta: "-- <function>", description: "STM32_LORA_LORA_GETDELAYS", snippet: "getDelays()" },
        { title: "setDutyCycle(Enable=False, MaxDutyCycle=0)", value: "setDutyCycle", meta: "-- <function>", description: "STM32_LORA_LORA_SETDUTYCYCLE", snippet: "setDutyCycle($1)" },
        { title: "getDutyCycle()", value: "getDutyCycle", meta: "-- <function>", description: "STM32_LORA_LORA_GETDUTYCYCLE", snippet: "getDutyCycle()" },
        { title: "setPublicNetwork(PublicNetworkState=True)", value: "setPublicNetwork", meta: "-- <function>", description: "STM32_LORA_LORA_SETPUBLICNETWORK", snippet: "setPublicNetwork($1)" },
        { title: "getPublicNetwork()", value: "getPublicNetwork", meta: "-- <function>", description: "STM32_LORA_LORA_GETPUBLICNETWORK", snippet: "getPublicNetwork()" },
        { title: "enterLowPowerMode()", value: "enterLowPowerMode", meta: "-- <function>", description: "STM32_LORA_LORA_ENTERLOWPOWERMODE", snippet: "enterLowPowerMode()" },
        { title: "wakeUp()", value: "wakeUp", meta: "-- <function>", description: "STM32_LORA_LORA_WAKEUP", snippet: "wakeUp()" },
        { title: "getRegion()", value: "getRegion", meta: "-- <function>", description: "STM32_LORA_LORA_GETREGION", snippet: "getRegion()" },
        { title: "setRtc(Year=2000, Month=1, Day=1, Hour=0, Minute=0, Second=0)", value: "setRtc", meta: "-- <function>", description: "STM32_LORA_LORA_SETRTC", snippet: "setRtc($1)" },
        { title: "getRtc()", value: "getRtc", meta: "-- <function>", description: "STM32_LORA_LORA_GETRTC", snippet: "getRtc()" },
        { title: "setBatteryLevel(BatteryLevel=255)", value: "setBatteryLevel", meta: "-- <function>", description: "STM32_LORA_LORA_SETBATTERYLEVEL", snippet: "setBatteryLevel($1)" },
        { title: "getBatteryLevel()", value: "getBatteryLevel", meta: "-- <function>", description: "STM32_LORA_LORA_GETBATTERYLEVEL", snippet: "getBatteryLevel()" },
        { title: "getVersion()", value: "getVersion", meta: "-- <function>", description: "STM32_LORA_LORA_GETVERSION", snippet: "getVersion()" },
        { title: "getTemperature()", value: "getTemperature", meta: "-- <function>", description: "STM32_LORA_LORA_GETTEMPERATURE", snippet: "getTemperature()" },
    ];

    tree.stm32_my9221 = [
        { value: "MY9221", meta: "stm32_my9221", kind: "class", description: "STM32_MY9221_MY9221", content: [] },
        { title: "MY9221(di, dcki, reverse=False)", value: "MY9221()", meta: "constructor", description: "STM32_MY9221_MY9221_CTOR", returns: "MY9221@stm32_my9221", snippet: "MY9221($1)" },
        { value: "__name__", meta: "stm32_my9221", description: "STM32_MY9221_MODULE" }
    ];
    typeTree.MY9221 = [
        { title: "reverse(val=None)", value: "reverse", meta: "-- <function>", description: "STM32_MY9221_MY9221_REVERSE", snippet: "reverse($1)" },
        { title: "level(val, brightness=255)", value: "level", meta: "-- <function>", description: "STM32_MY9221_MY9221_LEVEL", snippet: "level($1)" },
        { title: "bits(val, brightness=255)", value: "bits", meta: "-- <function>", description: "STM32_MY9221_MY9221_BITS", snippet: "bits($1)" },
        { title: "bytes(buf)", value: "bytes", meta: "-- <function>", description: "STM32_MY9221_MY9221_BYTES", snippet: "bytes($1)" },
    ];

    tree.stm32_pcf85063tp = [
        { value: "RTC_PCF85063TP_I2C_ADDR", description: "STM32_PCF85063TP_RTC_PCF85063TP_I2C_ADDR", returns: "int" },
        { value: "RTC_CTRL_1", description: "STM32_PCF85063TP_RTC_CTRL_1", returns: "int" },
        { value: "RTC_CTRL_2", description: "STM32_PCF85063TP_RTC_CTRL_2", returns: "int" },
        { value: "RTC_OFFSET", description: "STM32_PCF85063TP_RTC_OFFSET", returns: "int" },
        { value: "RTC_SECOND_ADDR", description: "STM32_PCF85063TP_RTC_SECOND_ADDR", returns: "int" },
        { value: "RTC_MINUTE_ADDR", description: "STM32_PCF85063TP_RTC_MINUTE_ADDR", returns: "int" },
        { value: "RTC_HOUR_ADDR", description: "STM32_PCF85063TP_RTC_HOUR_ADDR", returns: "int" },
        { value: "RTC_DAY_ADDR", description: "STM32_PCF85063TP_RTC_DAY_ADDR", returns: "int" },
        { value: "RTC_WDAY_ADDR", description: "STM32_PCF85063TP_RTC_WDAY_ADDR", returns: "int" },
        { value: "RTC_MONTH_ADDR", description: "STM32_PCF85063TP_RTC_MONTH_ADDR", returns: "int" },
        { value: "RTC_YEAR_ADDR", description: "STM32_PCF85063TP_RTC_YEAR_ADDR", returns: "int" },
        { value: "DAY_OF_WEEK", description: "STM32_PCF85063TP_DAY_OF_WEEK", returns: "list" },
        { value: "RTC", meta: "stm32_pcf85063tp", kind: "class", description: "STM32_PCF85063TP_RTC", content: [] },
        { title: "RTC(i2c, addr=RTC_PCF85063TP_I2C_ADDR)", value: "RTC()", meta: "constructor", description: "STM32_PCF85063TP_RTC_CTOR", returns: "RTC@stm32_pcf85063tp", snippet: "RTC($1)" },
        { value: "__name__", meta: "stm32_pcf85063tp", description: "STM32_PCF85063TP_MODULE" }
    ];
    typeTree["RTC@stm32_pcf85063tp"] = [
        { title: "decToBcd(val)", value: "decToBcd", meta: "-- <function>", description: "STM32_PCF85063TP_RTC_DECTOBCD", snippet: "decToBcd($1)", returns: "int" },
        { title: "bcdToDec(val)", value: "bcdToDec", meta: "-- <function>", description: "STM32_PCF85063TP_RTC_BCDTODEC", snippet: "bcdToDec($1)", returns: "int" },
        { title: "reset()", value: "reset", meta: "-- <function>", description: "STM32_PCF85063TP_RTC_RESET", snippet: "reset()" },
        { title: "fillByHMS(hour, minute, second)", value: "fillByHMS", meta: "-- <function>", description: "STM32_PCF85063TP_RTC_FILLBYHMS", snippet: "fillByHMS($1)" },
        { title: "fillByYMD(year, month, day)", value: "fillByYMD", meta: "-- <function>", description: "STM32_PCF85063TP_RTC_FILLBYYMD", snippet: "fillByYMD($1)" },
        { title: "fillDayOfWeek(dayOfWeek)", value: "fillDayOfWeek", meta: "-- <function>", description: "STM32_PCF85063TP_RTC_FILLDAYOFWEEK", snippet: "fillDayOfWeek($1)" },
        { title: "startClock()", value: "startClock", meta: "-- <function>", description: "STM32_PCF85063TP_RTC_STARTCLOCK", snippet: "startClock()" },
        { title: "readTime()", value: "readTime", meta: "-- <function>", description: "STM32_PCF85063TP_RTC_READTIME", snippet: "readTime()", returns: "tuple" },
    ];

    tree.stm32_rgb_led_matrix = [
        { value: "I2C_CMD_CONTINUE_DATA", description: "STM32_RGB_LED_MATRIX_I2C_CMD_CONTINUE_DATA", returns: "int" },
        { value: "GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR", description: "STM32_RGB_LED_MATRIX_GROVE_TWO_RGB_LED_MATRIX_DEF_I2C_ADDR", returns: "int" },
        { value: "GROVE_TWO_RGB_LED_MATRIX_VID", description: "STM32_RGB_LED_MATRIX_GROVE_TWO_RGB_LED_MATRIX_VID", returns: "int" },
        { value: "GROVE_TWO_RGB_LED_MATRIX_PID", description: "STM32_RGB_LED_MATRIX_GROVE_TWO_RGB_LED_MATRIX_PID", returns: "int" },
        { value: "I2C_CMD_GET_DEV_ID", description: "STM32_RGB_LED_MATRIX_I2C_CMD_GET_DEV_ID", returns: "int" },
        { value: "I2C_CMD_DISP_BAR", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_BAR", returns: "int" },
        { value: "I2C_CMD_DISP_EMOJI", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_EMOJI", returns: "int" },
        { value: "I2C_CMD_DISP_NUM", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_NUM", returns: "int" },
        { value: "I2C_CMD_DISP_STR", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_STR", returns: "int" },
        { value: "I2C_CMD_DISP_CUSTOM", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_CUSTOM", returns: "int" },
        { value: "I2C_CMD_DISP_OFF", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_OFF", returns: "int" },
        { value: "I2C_CMD_DISP_ASCII", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_ASCII", returns: "int" },
        { value: "I2C_CMD_DISP_FLASH", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_FLASH", returns: "int" },
        { value: "I2C_CMD_DISP_COLOR_BAR", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_COLOR_BAR", returns: "int" },
        { value: "I2C_CMD_DISP_COLOR_WAVE", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_COLOR_WAVE", returns: "int" },
        { value: "I2C_CMD_DISP_COLOR_CLOCKWISE", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_COLOR_CLOCKWISE", returns: "int" },
        { value: "I2C_CMD_DISP_COLOR_ANIMATION", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_COLOR_ANIMATION", returns: "int" },
        { value: "I2C_CMD_DISP_COLOR_BLOCK", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_COLOR_BLOCK", returns: "int" },
        { value: "I2C_CMD_STORE_FLASH", description: "STM32_RGB_LED_MATRIX_I2C_CMD_STORE_FLASH", returns: "int" },
        { value: "I2C_CMD_DELETE_FLASH", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DELETE_FLASH", returns: "int" },
        { value: "I2C_CMD_LED_ON", description: "STM32_RGB_LED_MATRIX_I2C_CMD_LED_ON", returns: "int" },
        { value: "I2C_CMD_LED_OFF", description: "STM32_RGB_LED_MATRIX_I2C_CMD_LED_OFF", returns: "int" },
        { value: "I2C_CMD_AUTO_SLEEP_ON", description: "STM32_RGB_LED_MATRIX_I2C_CMD_AUTO_SLEEP_ON", returns: "int" },
        { value: "I2C_CMD_AUTO_SLEEP_OFF", description: "STM32_RGB_LED_MATRIX_I2C_CMD_AUTO_SLEEP_OFF", returns: "int" },
        { value: "I2C_CMD_DISP_ROTATE", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_ROTATE", returns: "int" },
        { value: "I2C_CMD_DISP_OFFSET", description: "STM32_RGB_LED_MATRIX_I2C_CMD_DISP_OFFSET", returns: "int" },
        { value: "I2C_CMD_SET_ADDR", description: "STM32_RGB_LED_MATRIX_I2C_CMD_SET_ADDR", returns: "int" },
        { value: "I2C_CMD_RST_ADDR", description: "STM32_RGB_LED_MATRIX_I2C_CMD_RST_ADDR", returns: "int" },
        { value: "I2C_CMD_TEST_TX_RX_ON", description: "STM32_RGB_LED_MATRIX_I2C_CMD_TEST_TX_RX_ON", returns: "int" },
        { value: "I2C_CMD_TEST_TX_RX_OFF", description: "STM32_RGB_LED_MATRIX_I2C_CMD_TEST_TX_RX_OFF", returns: "int" },
        { value: "I2C_CMD_TEST_GET_VER", description: "STM32_RGB_LED_MATRIX_I2C_CMD_TEST_GET_VER", returns: "int" },
        { value: "I2C_CMD_GET_DEVICE_UID", description: "STM32_RGB_LED_MATRIX_I2C_CMD_GET_DEVICE_UID", returns: "int" },
        { value: "COULEURS", description: "STM32_RGB_LED_MATRIX_COULEURS", returns: "dict" },
        { value: "GroveTwoRGBLedMatrix", meta: "stm32_rgb_led_matrix", kind: "class", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX", content: [] },
        { title: "GroveTwoRGBLedMatrix(i2c=None, base=GROVE_TWO_RGB_LED_MATRIX_DEF_...", value: "GroveTwoRGBLedMatrix()", meta: "constructor", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_CTOR", returns: "GroveTwoRGBLedMatrix@stm32_rgb_led_matrix", snippet: "GroveTwoRGBLedMatrix($1)" },
        { value: "__name__", meta: "stm32_rgb_led_matrix", description: "STM32_RGB_LED_MATRIX_MODULE" }
    ];
    typeTree.GroveTwoRGBLedMatrix = [
        { title: "getDeviceVID()", value: "getDeviceVID", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_GETDEVICEVID", snippet: "getDeviceVID()", returns: "int" },
        { title: "getDevicePID()", value: "getDevicePID", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_GETDEVICEPID", snippet: "getDevicePID()", returns: "int" },
        { title: "changeDeviceBaseAddress(newAddress)", value: "changeDeviceBaseAddress", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_CHANGEDEVICEBASEADDRESS", snippet: "changeDeviceBaseAddress($1)" },
        { title: "defaultDeviceAddress()", value: "defaultDeviceAddress", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DEFAULTDEVICEADDRESS", snippet: "defaultDeviceAddress()" },
        { title: "turnOnLedFlash()", value: "turnOnLedFlash", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_TURNONLEDFLASH", snippet: "turnOnLedFlash()" },
        { title: "turnOffLedFlash()", value: "turnOffLedFlash", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_TURNOFFLEDFLASH", snippet: "turnOffLedFlash()" },
        { title: "enableAutoSleep()", value: "enableAutoSleep", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_ENABLEAUTOSLEEP", snippet: "enableAutoSleep()" },
        { title: "wakeDevice()", value: "wakeDevice", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_WAKEDEVICE", snippet: "wakeDevice()" },
        { title: "disableAutoSleep()", value: "disableAutoSleep", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISABLEAUTOSLEEP", snippet: "disableAutoSleep()" },
        { title: "setDisplayOrientation(orientation)", value: "setDisplayOrientation", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_SETDISPLAYORIENTATION", snippet: "setDisplayOrientation($1)" },
        { title: "setDisplayOffset(offset_x, offset_y)", value: "setDisplayOffset", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_SETDISPLAYOFFSET", snippet: "setDisplayOffset($1)" },
        { title: "displayBar(bar, duration_time, forever_flag, color)", value: "displayBar", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISPLAYBAR", snippet: "displayBar($1)" },
        { title: "displayEmoji(emoji, duration_time, forever_flag)", value: "displayEmoji", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISPLAYEMOJI", snippet: "displayEmoji($1)" },
        { title: "displayNumber(number, duration_time, forever_flag, color)", value: "displayNumber", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISPLAYNUMBER", snippet: "displayNumber($1)" },
        { title: "displayString(str, duration_time, forever_flag, color)", value: "displayString", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISPLAYSTRING", snippet: "displayString($1)" },
        { title: "displayFramesColor(buffer, duration_time, forever_flag, frames_nu...", value: "displayFramesColor", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISPLAYFRAMESCOLOR", snippet: "displayFramesColor($1)" },
        { title: "displayFrames(buffer, duration_time, forever_flag, frames_number)", value: "displayFrames", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISPLAYFRAMES", snippet: "displayFrames($1)" },
        { title: "stopDisplay()", value: "stopDisplay", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_STOPDISPLAY", snippet: "stopDisplay()" },
        { title: "storeFrames()", value: "storeFrames", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_STOREFRAMES", snippet: "storeFrames()" },
        { title: "deleteFrames()", value: "deleteFrames", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DELETEFRAMES", snippet: "deleteFrames()" },
        { title: "displayFramesFromFlash(duration_time, forever_flag, _from, to)", value: "displayFramesFromFlash", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISPLAYFRAMESFROMFLASH", snippet: "displayFramesFromFlash($1)" },
        { title: "displayColorBlock(rgb, duration_time, forever_flag)", value: "displayColorBlock", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISPLAYCOLORBLOCK", snippet: "displayColorBlock($1)" },
        { title: "displayColorBar(bar, duration_time, forever_flag)", value: "displayColorBar", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISPLAYCOLORBAR", snippet: "displayColorBar($1)" },
        { title: "displayColorWave(color, duration_time, forever_flag)", value: "displayColorWave", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISPLAYCOLORWAVE", snippet: "displayColorWave($1)" },
        { title: "displayClockwise(is_cw, is_big, duration_time, forever_flag)", value: "displayClockwise", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISPLAYCLOCKWISE", snippet: "displayClockwise($1)" },
        { title: "displayColorAnimation(index, duration_time, forever_flag)", value: "displayColorAnimation", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISPLAYCOLORANIMATION", snippet: "displayColorAnimation($1)" },
        { title: "enableTestMode()", value: "enableTestMode", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_ENABLETESTMODE", snippet: "enableTestMode()" },
        { title: "disableTestMode()", value: "disableTestMode", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_DISABLETESTMODE", snippet: "disableTestMode()" },
        { title: "getTestVersion()", value: "getTestVersion", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_GETTESTVERSION", snippet: "getTestVersion()", returns: "int" },
        { title: "resetDevice()", value: "resetDevice", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_RESETDEVICE", snippet: "resetDevice()" },
        { title: "getDeviceId()", value: "getDeviceId", meta: "-- <function>", description: "STM32_RGB_LED_MATRIX_GROVETWORGBLEDMATRIX_GETDEVICEID", snippet: "getDeviceId()", returns: "bytes" },
    ];

    tree.stm32_scd30 = [
        { value: "SCD30_I2C_ADDR", description: "STM32_SCD30_SCD30_I2C_ADDR", returns: "int" },
        { value: "SCD30", meta: "stm32_scd30", kind: "class", description: "STM32_SCD30_SCD30", content: [] },
        { title: "SCD30(i2c, addr=SCD30_I2C_ADDR, pause=1000)", value: "SCD30()", meta: "constructor", description: "STM32_SCD30_SCD30_CTOR", returns: "SCD30@stm32_scd30", snippet: "SCD30($1)" },
        { value: "__name__", meta: "stm32_scd30", description: "STM32_SCD30_MODULE" }
    ];
    typeTree.SCD30 = [
        { title: "start_continous_measurement(ambient_pressure)", value: "start_continous_measurement", meta: "-- <function>", description: "STM32_SCD30_SCD30_START_CONTINOUS_MEASUREMENT", snippet: "start_continous_measurement($1)" },
        { title: "stop_continous_measurement()", value: "stop_continous_measurement", meta: "-- <function>", description: "STM32_SCD30_SCD30_STOP_CONTINOUS_MEASUREMENT", snippet: "stop_continous_measurement()" },
        { title: "soft_reset()", value: "soft_reset", meta: "-- <function>", description: "STM32_SCD30_SCD30_SOFT_RESET", snippet: "soft_reset()", returns: "int" },
        { title: "get_firmware_version()", value: "get_firmware_version", meta: "-- <function>", description: "STM32_SCD30_SCD30_GET_FIRMWARE_VERSION", snippet: "get_firmware_version()", returns: "tuple" },
        { title: "read_measurement()", value: "read_measurement", meta: "-- <function>", description: "STM32_SCD30_SCD30_READ_MEASUREMENT", snippet: "read_measurement()", returns: "int" },
        { title: "get_status_ready()", value: "get_status_ready", meta: "-- <function>", description: "STM32_SCD30_SCD30_GET_STATUS_READY", snippet: "get_status_ready()", returns: "int" },
        { title: "get_measurement_interval()", value: "get_measurement_interval", meta: "-- <function>", description: "STM32_SCD30_SCD30_GET_MEASUREMENT_INTERVAL", snippet: "get_measurement_interval()", returns: "int" },
        { title: "set_measurement_interval(interval)", value: "set_measurement_interval", meta: "-- <function>", description: "STM32_SCD30_SCD30_SET_MEASUREMENT_INTERVAL", snippet: "set_measurement_interval($1)" },
        { title: "get_automatic_recalibration()", value: "get_automatic_recalibration", meta: "-- <function>", description: "STM32_SCD30_SCD30_GET_AUTOMATIC_RECALIBRATION", snippet: "get_automatic_recalibration()", returns: "bool" },
        { title: "set_automatic_recalibration(enable)", value: "set_automatic_recalibration", meta: "-- <function>", description: "STM32_SCD30_SCD30_SET_AUTOMATIC_RECALIBRATION", snippet: "set_automatic_recalibration($1)" },
        { title: "get_forced_recalibration()", value: "get_forced_recalibration", meta: "-- <function>", description: "STM32_SCD30_SCD30_GET_FORCED_RECALIBRATION", snippet: "get_forced_recalibration()", returns: "int" },
        { title: "set_forced_recalibration(co2ppm)", value: "set_forced_recalibration", meta: "-- <function>", description: "STM32_SCD30_SCD30_SET_FORCED_RECALIBRATION", snippet: "set_forced_recalibration($1)" },
        { title: "get_temperature_offset()", value: "get_temperature_offset", meta: "-- <function>", description: "STM32_SCD30_SCD30_GET_TEMPERATURE_OFFSET", snippet: "get_temperature_offset()", returns: "float" },
        { title: "set_temperature_offset(offset)", value: "set_temperature_offset", meta: "-- <function>", description: "STM32_SCD30_SCD30_SET_TEMPERATURE_OFFSET", snippet: "set_temperature_offset($1)" },
        { title: "get_altitude_comp()", value: "get_altitude_comp", meta: "-- <function>", description: "STM32_SCD30_SCD30_GET_ALTITUDE_COMP", snippet: "get_altitude_comp()", returns: "int" },
        { title: "set_altitude_comp(altitude)", value: "set_altitude_comp", meta: "-- <function>", description: "STM32_SCD30_SCD30_SET_ALTITUDE_COMP", snippet: "set_altitude_comp($1)" },
    ];

    tree.stm32_sgp30 = [
        { value: "_SGP30_I2C_ADDR", description: "STM32_SGP30__SGP30_I2C_ADDR", returns: "int" },
        { value: "_SGP30_FEATURESETS", description: "STM32_SGP30__SGP30_FEATURESETS", returns: "tuple" },
        { value: "_SGP30_CRC8_POLYNOMIAL", description: "STM32_SGP30__SGP30_CRC8_POLYNOMIAL", returns: "int" },
        { value: "_SGP30_CRC8_INIT", description: "STM32_SGP30__SGP30_CRC8_INIT", returns: "int" },
        { value: "_SGP30_WORD_LEN", description: "STM32_SGP30__SGP30_WORD_LEN", returns: "int" },
        { value: "SGP30", meta: "stm32_sgp30", kind: "class", description: "STM32_SGP30_SGP30", content: [] },
        { title: "SGP30(i2c, addr=_SGP30_I2C_ADDR)", value: "SGP30()", meta: "constructor", description: "STM32_SGP30_SGP30_CTOR", returns: "SGP30@stm32_sgp30", snippet: "SGP30($1)" },
        { title: "generate_crc(data)", value: "generate_crc", meta: "-- <function>", description: "STM32_SGP30_GENERATE_CRC", snippet: "generate_crc($1)", returns: "int" },
        { value: "__name__", meta: "stm32_sgp30", description: "STM32_SGP30_MODULE" }
    ];
    typeTree.SGP30 = [
        { title: "total_organic_compound()", value: "total_organic_compound", meta: "-- <function>", description: "STM32_SGP30_SGP30_TOTAL_ORGANIC_COMPOUND", snippet: "total_organic_compound()" },
        { title: "baseline_total_organic_compound()", value: "baseline_total_organic_compound", meta: "-- <function>", description: "STM32_SGP30_SGP30_BASELINE_TOTAL_ORGANIC_COMPOUND", snippet: "baseline_total_organic_compound()" },
        { title: "co2_equivalent()", value: "co2_equivalent", meta: "-- <function>", description: "STM32_SGP30_SGP30_CO2_EQUIVALENT", snippet: "co2_equivalent()" },
        { title: "baseline_co2_equivilant()", value: "baseline_co2_equivilant", meta: "-- <function>", description: "STM32_SGP30_SGP30_BASELINE_CO2_EQUIVILANT", snippet: "baseline_co2_equivilant()" },
        { title: "initialise_indoor_air_quality()", value: "initialise_indoor_air_quality", meta: "-- <function>", description: "STM32_SGP30_SGP30_INITIALISE_INDOOR_AIR_QUALITY", snippet: "initialise_indoor_air_quality()" },
        { title: "indoor_air_quality()", value: "indoor_air_quality", meta: "-- <function>", description: "STM32_SGP30_SGP30_INDOOR_AIR_QUALITY", snippet: "indoor_air_quality()" },
        { title: "indoor_air_quality_baseline()", value: "indoor_air_quality_baseline", meta: "-- <function>", description: "STM32_SGP30_SGP30_INDOOR_AIR_QUALITY_BASELINE", snippet: "indoor_air_quality_baseline()" },
        { title: "set_indoor_air_quality_baseline(co2_equivalent, total_volatile_or...", value: "set_indoor_air_quality_baseline", meta: "-- <function>", description: "STM32_SGP30_SGP30_SET_INDOOR_AIR_QUALITY_BASELINE", snippet: "set_indoor_air_quality_baseline($1)" },
    ];

    tree.stm32_sht31 = [
        { value: "SHT31_I2C_ADDR", description: "STM32_SHT31_SHT31_I2C_ADDR", returns: "int" },
        { value: "R_HIGH", description: "STM32_SHT31_R_HIGH", returns: "int" },
        { value: "R_MEDIUM", description: "STM32_SHT31_R_MEDIUM", returns: "int" },
        { value: "R_LOW", description: "STM32_SHT31_R_LOW", returns: "int" },
        { value: "SHT31", meta: "stm32_sht31", kind: "class", description: "STM32_SHT31_SHT31", content: [] },
        { title: "SHT31(i2c, addr=SHT31_I2C_ADDR)", value: "SHT31()", meta: "constructor", description: "STM32_SHT31_SHT31_CTOR", returns: "SHT31@stm32_sht31", snippet: "SHT31($1)" },
        { value: "__name__", meta: "stm32_sht31", description: "STM32_SHT31_MODULE" }
    ];
    typeTree.SHT31 = [
        { title: "get_temp_humi(resolution, clock_stretch, celsius)", value: "get_temp_humi", meta: "-- <function>", description: "STM32_SHT31_SHT31_GET_TEMP_HUMI", snippet: "get_temp_humi($1)", returns: "tuple" },
    ];

    tree.stm32_si1145 = [
        { value: "SI1145_I2C_ADDR", description: "STM32_SI1145_SI1145_I2C_ADDR", returns: "int" },
        { value: "SI1145", meta: "stm32_si1145", kind: "class", description: "STM32_SI1145_SI1145", content: [] },
        { title: "SI1145(i2c, addr=SI1145_I2C_ADDR)", value: "SI1145()", meta: "constructor", description: "STM32_SI1145_SI1145_CTOR", returns: "SI1145@stm32_si1145", snippet: "SI1145($1)" },
        { value: "__name__", meta: "stm32_si1145", description: "STM32_SI1145_MODULE" }
    ];
    typeTree.SI1145 = [
        { title: "read_uv()", value: "read_uv", meta: "-- <function>", description: "STM32_SI1145_SI1145_READ_UV", snippet: "read_uv()", returns: "int" },
        { title: "read_visible()", value: "read_visible", meta: "-- <function>", description: "STM32_SI1145_SI1145_READ_VISIBLE", snippet: "read_visible()" },
        { title: "read_ir()", value: "read_ir", meta: "-- <function>", description: "STM32_SI1145_SI1145_READ_IR", snippet: "read_ir()" },
        { title: "read_prox()", value: "read_prox", meta: "-- <function>", description: "STM32_SI1145_SI1145_READ_PROX", snippet: "read_prox()" },
    ];

    tree.stm32_ssd1306 = [
        { value: "SSD1306_I2C_ADDR", description: "STM32_SSD1306_SSD1306_I2C_ADDR", returns: "int" },
        { value: "SET_CONTRAST", description: "STM32_SSD1306_SET_CONTRAST", returns: "int" },
        { value: "SET_ENTIRE_ON", description: "STM32_SSD1306_SET_ENTIRE_ON", returns: "int" },
        { value: "SET_NORM_INV", description: "STM32_SSD1306_SET_NORM_INV", returns: "int" },
        { value: "SET_DISP", description: "STM32_SSD1306_SET_DISP", returns: "int" },
        { value: "SET_MEM_ADDR", description: "STM32_SSD1306_SET_MEM_ADDR", returns: "int" },
        { value: "SET_COL_ADDR", description: "STM32_SSD1306_SET_COL_ADDR", returns: "int" },
        { value: "SET_PAGE_ADDR", description: "STM32_SSD1306_SET_PAGE_ADDR", returns: "int" },
        { value: "SET_DISP_START_LINE", description: "STM32_SSD1306_SET_DISP_START_LINE", returns: "int" },
        { value: "SET_SEG_REMAP", description: "STM32_SSD1306_SET_SEG_REMAP", returns: "int" },
        { value: "SET_MUX_RATIO", description: "STM32_SSD1306_SET_MUX_RATIO", returns: "int" },
        { value: "SET_COM_OUT_DIR", description: "STM32_SSD1306_SET_COM_OUT_DIR", returns: "int" },
        { value: "SET_DISP_OFFSET", description: "STM32_SSD1306_SET_DISP_OFFSET", returns: "int" },
        { value: "SET_COM_PIN_CFG", description: "STM32_SSD1306_SET_COM_PIN_CFG", returns: "int" },
        { value: "SET_DISP_CLK_DIV", description: "STM32_SSD1306_SET_DISP_CLK_DIV", returns: "int" },
        { value: "SET_PRECHARGE", description: "STM32_SSD1306_SET_PRECHARGE", returns: "int" },
        { value: "SET_VCOM_DESEL", description: "STM32_SSD1306_SET_VCOM_DESEL", returns: "int" },
        { value: "SET_CHARGE_PUMP", description: "STM32_SSD1306_SET_CHARGE_PUMP", returns: "int" },
        { value: "SSD1306", meta: "stm32_ssd1306", kind: "class", description: "STM32_SSD1306_SSD1306", content: [] },
        { title: "SSD1306(width, height, external_vcc)", value: "SSD1306()", meta: "constructor", description: "STM32_SSD1306_SSD1306_CTOR", returns: "SSD1306@stm32_ssd1306", snippet: "SSD1306($1)" },
        { value: "SSD1306_I2C", meta: "stm32_ssd1306", kind: "class", description: "STM32_SSD1306_SSD1306_I2C", content: [] },
        { title: "SSD1306_I2C(width, height, i2c, addr=SSD1306_I2C_ADDR, external_v...", value: "SSD1306_I2C()", meta: "constructor", description: "STM32_SSD1306_SSD1306_I2C_CTOR", returns: "SSD1306_I2C@stm32_ssd1306", snippet: "SSD1306_I2C($1)" },
        { value: "__name__", meta: "stm32_ssd1306", description: "STM32_SSD1306_MODULE" }
    ];
    typeTree.SSD1306 = [
        { title: "init_display()", value: "init_display", meta: "-- <function>", description: "STM32_SSD1306_SSD1306_INIT_DISPLAY", snippet: "init_display()" },
        { title: "poweroff()", value: "poweroff", meta: "-- <function>", description: "STM32_SSD1306_SSD1306_POWEROFF", snippet: "poweroff()" },
        { title: "poweron()", value: "poweron", meta: "-- <function>", description: "STM32_SSD1306_SSD1306_POWERON", snippet: "poweron()" },
        { title: "contrast(contrast)", value: "contrast", meta: "-- <function>", description: "STM32_SSD1306_SSD1306_CONTRAST", snippet: "contrast($1)" },
        { title: "invert(invert)", value: "invert", meta: "-- <function>", description: "STM32_SSD1306_SSD1306_INVERT", snippet: "invert($1)" },
        { title: "rotate(rotate)", value: "rotate", meta: "-- <function>", description: "STM32_SSD1306_SSD1306_ROTATE", snippet: "rotate($1)" },
        { title: "show()", value: "show", meta: "-- <function>", description: "STM32_SSD1306_SSD1306_SHOW", snippet: "show()" },
    ];
    typeTree.SSD1306_I2C = [
        { title: "write_cmd(cmd)", value: "write_cmd", meta: "-- <function>", description: "STM32_SSD1306_SSD1306_I2C_WRITE_CMD", snippet: "write_cmd($1)", extends: "SSD1306" },
        { title: "write_data(buf)", value: "write_data", meta: "-- <function>", description: "STM32_SSD1306_SSD1306_I2C_WRITE_DATA", snippet: "write_data($1)", extends: "SSD1306" },
    ];

    tree.stm32_th02 = [
        { value: "TH02_DEFAULT_I2C_ADDR", description: "STM32_TH02_TH02_DEFAULT_I2C_ADDR", returns: "int" },
        { value: "TH02", meta: "stm32_th02", kind: "class", description: "STM32_TH02_TH02", content: [] },
        { title: "TH02(i2c, addr=TH02_DEFAULT_I2C_ADDR)", value: "TH02()", meta: "constructor", description: "STM32_TH02_TH02_CTOR", returns: "TH02@stm32_th02", snippet: "TH02($1)" },
        { value: "__name__", meta: "stm32_th02", description: "STM32_TH02_MODULE" }
    ];
    typeTree.TH02 = [
        { title: "init_humidity()", value: "init_humidity", meta: "-- <function>", description: "STM32_TH02_TH02_INIT_HUMIDITY", snippet: "init_humidity()" },
        { title: "is_ready()", value: "is_ready", meta: "-- <function>", description: "STM32_TH02_TH02_IS_READY", snippet: "is_ready()", returns: "bool" },
        { title: "wait_until_ready()", value: "wait_until_ready", meta: "-- <function>", description: "STM32_TH02_TH02_WAIT_UNTIL_READY", snippet: "wait_until_ready()", returns: "bool" },
        { title: "read_data()", value: "read_data", meta: "-- <function>", description: "STM32_TH02_TH02_READ_DATA", snippet: "read_data()", returns: "int" },
        { title: "calculate_temp(data)", value: "calculate_temp", meta: "-- <function>", description: "STM32_TH02_TH02_CALCULATE_TEMP", snippet: "calculate_temp($1)", returns: "float" },
        { title: "calculate_humidity(data)", value: "calculate_humidity", meta: "-- <function>", description: "STM32_TH02_TH02_CALCULATE_HUMIDITY", snippet: "calculate_humidity($1)", returns: "float" },
        { title: "get_temperature()", value: "get_temperature", meta: "-- <function>", description: "STM32_TH02_TH02_GET_TEMPERATURE", snippet: "get_temperature()", returns: "int" },
        { title: "get_humidity()", value: "get_humidity", meta: "-- <function>", description: "STM32_TH02_TH02_GET_HUMIDITY", snippet: "get_humidity()", returns: "int" },
    ];

    tree.stm32_tm1637 = [
        { value: "_SEG", description: "STM32_TM1637__SEG", returns: "bytearray" },
        { value: "TM1637", meta: "stm32_tm1637", kind: "class", description: "STM32_TM1637_TM1637", content: [] },
        { title: "TM1637(clk, dio, bright=7)", value: "TM1637()", meta: "constructor", description: "STM32_TM1637_TM1637_CTOR", returns: "TM1637@stm32_tm1637", snippet: "TM1637($1)" },
        { value: "__name__", meta: "stm32_tm1637", description: "STM32_TM1637_MODULE" }
    ];
    typeTree.TM1637 = [
        { title: "brightness(val)", value: "brightness", meta: "-- <function>", description: "STM32_TM1637_TM1637_BRIGHTNESS", snippet: "brightness($1)" },
        { title: "write(segs, pos)", value: "write", meta: "-- <function>", description: "STM32_TM1637_TM1637_WRITE", snippet: "write($1)" },
        { title: "encode_str(str)", value: "encode_str", meta: "-- <function>", description: "STM32_TM1637_TM1637_ENCODE_STR", snippet: "encode_str($1)", returns: "bytearray" },
        { title: "encode_char(char)", value: "encode_char", meta: "-- <function>", description: "STM32_TM1637_TM1637_ENCODE_CHAR", snippet: "encode_char($1)" },
        { title: "number(num)", value: "number", meta: "-- <function>", description: "STM32_TM1637_TM1637_NUMBER", snippet: "number($1)" },
        { title: "numbers(num1, num2, colon)", value: "numbers", meta: "-- <function>", description: "STM32_TM1637_TM1637_NUMBERS", snippet: "numbers($1)" },
        { title: "temperature(num)", value: "temperature", meta: "-- <function>", description: "STM32_TM1637_TM1637_TEMPERATURE", snippet: "temperature($1)" },
        { title: "show(str, colon)", value: "show", meta: "-- <function>", description: "STM32_TM1637_TM1637_SHOW", snippet: "show($1)" },
        { title: "scroll(str, delay)", value: "scroll", meta: "-- <function>", description: "STM32_TM1637_TM1637_SCROLL", snippet: "scroll($1)" },
        { title: "clock(time, colon)", value: "clock", meta: "-- <function>", description: "STM32_TM1637_TM1637_CLOCK", snippet: "clock($1)" },
    ];

    tree.stm32_vl53l0x = [
        { value: "_VL53L0X_IIC_ADDR", description: "STM32_VL53L0X__VL53L0X_IIC_ADDR", returns: "int" },
        { value: "_SYSRANGE_START", description: "STM32_VL53L0X__SYSRANGE_START", returns: "int" },
        { value: "_SYSTEM_THRESH_HIGH", description: "STM32_VL53L0X__SYSTEM_THRESH_HIGH", returns: "int" },
        { value: "_SYSTEM_THRESH_LOW", description: "STM32_VL53L0X__SYSTEM_THRESH_LOW", returns: "int" },
        { value: "_SYSTEM_SEQUENCE_CONFIG", description: "STM32_VL53L0X__SYSTEM_SEQUENCE_CONFIG", returns: "int" },
        { value: "_SYSTEM_RANGE_CONFIG", description: "STM32_VL53L0X__SYSTEM_RANGE_CONFIG", returns: "int" },
        { value: "_SYSTEM_INTERMEASUREMENT_PERIOD", description: "STM32_VL53L0X__SYSTEM_INTERMEASUREMENT_PERIOD", returns: "int" },
        { value: "_SYSTEM_INTERRUPT_CONFIG_GPIO", description: "STM32_VL53L0X__SYSTEM_INTERRUPT_CONFIG_GPIO", returns: "int" },
        { value: "_GPIO_HV_MUX_ACTIVE_HIGH", description: "STM32_VL53L0X__GPIO_HV_MUX_ACTIVE_HIGH", returns: "int" },
        { value: "_SYSTEM_INTERRUPT_CLEAR", description: "STM32_VL53L0X__SYSTEM_INTERRUPT_CLEAR", returns: "int" },
        { value: "_RESULT_INTERRUPT_STATUS", description: "STM32_VL53L0X__RESULT_INTERRUPT_STATUS", returns: "int" },
        { value: "_RESULT_RANGE_STATUS", description: "STM32_VL53L0X__RESULT_RANGE_STATUS", returns: "int" },
        { value: "_RESULT_CORE_AMBIENT_WINDOW_EVENTS_RTN", description: "STM32_VL53L0X__RESULT_CORE_AMBIENT_WINDOW_EVENTS_RTN", returns: "int" },
        { value: "_RESULT_CORE_RANGING_TOTAL_EVENTS_RTN", description: "STM32_VL53L0X__RESULT_CORE_RANGING_TOTAL_EVENTS_RTN", returns: "int" },
        { value: "_RESULT_CORE_AMBIENT_WINDOW_EVENTS_REF", description: "STM32_VL53L0X__RESULT_CORE_AMBIENT_WINDOW_EVENTS_REF", returns: "int" },
        { value: "_RESULT_CORE_RANGING_TOTAL_EVENTS_REF", description: "STM32_VL53L0X__RESULT_CORE_RANGING_TOTAL_EVENTS_REF", returns: "int" },
        { value: "_RESULT_PEAK_SIGNAL_RATE_REF", description: "STM32_VL53L0X__RESULT_PEAK_SIGNAL_RATE_REF", returns: "int" },
        { value: "_ALGO_PART_TO_PART_RANGE_OFFSET_MM", description: "STM32_VL53L0X__ALGO_PART_TO_PART_RANGE_OFFSET_MM", returns: "int" },
        { value: "_I2C_SLAVE_DEVICE_ADDRESS", description: "STM32_VL53L0X__I2C_SLAVE_DEVICE_ADDRESS", returns: "int" },
        { value: "_MSRC_CONFIG_CONTROL", description: "STM32_VL53L0X__MSRC_CONFIG_CONTROL", returns: "int" },
        { value: "_PRE_RANGE_CONFIG_MIN_SNR", description: "STM32_VL53L0X__PRE_RANGE_CONFIG_MIN_SNR", returns: "int" },
        { value: "_PRE_RANGE_CONFIG_VALID_PHASE_LOW", description: "STM32_VL53L0X__PRE_RANGE_CONFIG_VALID_PHASE_LOW", returns: "int" },
        { value: "_PRE_RANGE_CONFIG_VALID_PHASE_HIGH", description: "STM32_VL53L0X__PRE_RANGE_CONFIG_VALID_PHASE_HIGH", returns: "int" },
        { value: "_PRE_RANGE_MIN_COUNT_RATE_RTN_LIMIT", description: "STM32_VL53L0X__PRE_RANGE_MIN_COUNT_RATE_RTN_LIMIT", returns: "int" },
        { value: "_FINAL_RANGE_CONFIG_MIN_SNR", description: "STM32_VL53L0X__FINAL_RANGE_CONFIG_MIN_SNR", returns: "int" },
        { value: "_FINAL_RANGE_CONFIG_VALID_PHASE_LOW", description: "STM32_VL53L0X__FINAL_RANGE_CONFIG_VALID_PHASE_LOW", returns: "int" },
        { value: "_FINAL_RANGE_CONFIG_VALID_PHASE_HIGH", description: "STM32_VL53L0X__FINAL_RANGE_CONFIG_VALID_PHASE_HIGH", returns: "int" },
        { value: "_FINAL_RANGE_CONFIG_MIN_COUNT_RATE_RTN_LIMIT", description: "STM32_VL53L0X__FINAL_RANGE_CONFIG_MIN_COUNT_RATE_RTN_LIMIT", returns: "int" },
        { value: "_PRE_RANGE_CONFIG_SIGMA_THRESH_HI", description: "STM32_VL53L0X__PRE_RANGE_CONFIG_SIGMA_THRESH_HI", returns: "int" },
        { value: "_PRE_RANGE_CONFIG_SIGMA_THRESH_LO", description: "STM32_VL53L0X__PRE_RANGE_CONFIG_SIGMA_THRESH_LO", returns: "int" },
        { value: "_PRE_RANGE_CONFIG_VCSEL_PERIOD", description: "STM32_VL53L0X__PRE_RANGE_CONFIG_VCSEL_PERIOD", returns: "int" },
        { value: "_PRE_RANGE_CONFIG_TIMEOUT_MACROP_HI", description: "STM32_VL53L0X__PRE_RANGE_CONFIG_TIMEOUT_MACROP_HI", returns: "int" },
        { value: "_PRE_RANGE_CONFIG_TIMEOUT_MACROP_LO", description: "STM32_VL53L0X__PRE_RANGE_CONFIG_TIMEOUT_MACROP_LO", returns: "int" },
        { value: "_SYSTEM_HISTOGRAM_BIN", description: "STM32_VL53L0X__SYSTEM_HISTOGRAM_BIN", returns: "int" },
        { value: "_HISTOGRAM_CONFIG_INITIAL_PHASE_SELECT", description: "STM32_VL53L0X__HISTOGRAM_CONFIG_INITIAL_PHASE_SELECT", returns: "int" },
        { value: "_HISTOGRAM_CONFIG_READOUT_CTRL", description: "STM32_VL53L0X__HISTOGRAM_CONFIG_READOUT_CTRL", returns: "int" },
        { value: "_FINAL_RANGE_CONFIG_VCSEL_PERIOD", description: "STM32_VL53L0X__FINAL_RANGE_CONFIG_VCSEL_PERIOD", returns: "int" },
        { value: "_FINAL_RANGE_CONFIG_TIMEOUT_MACROP_HI", description: "STM32_VL53L0X__FINAL_RANGE_CONFIG_TIMEOUT_MACROP_HI", returns: "int" },
        { value: "_FINAL_RANGE_CONFIG_TIMEOUT_MACROP_LO", description: "STM32_VL53L0X__FINAL_RANGE_CONFIG_TIMEOUT_MACROP_LO", returns: "int" },
        { value: "_CROSSTALK_COMPENSATION_PEAK_RATE_MCPS", description: "STM32_VL53L0X__CROSSTALK_COMPENSATION_PEAK_RATE_MCPS", returns: "int" },
        { value: "_MSRC_CONFIG_TIMEOUT_MACROP", description: "STM32_VL53L0X__MSRC_CONFIG_TIMEOUT_MACROP", returns: "int" },
        { value: "_SOFT_RESET_GO2_SOFT_RESET_N", description: "STM32_VL53L0X__SOFT_RESET_GO2_SOFT_RESET_N", returns: "int" },
        { value: "_IDENTIFICATION_MODEL_ID", description: "STM32_VL53L0X__IDENTIFICATION_MODEL_ID", returns: "int" },
        { value: "_IDENTIFICATION_REVISION_ID", description: "STM32_VL53L0X__IDENTIFICATION_REVISION_ID", returns: "int" },
        { value: "_OSC_CALIBRATE_VAL", description: "STM32_VL53L0X__OSC_CALIBRATE_VAL", returns: "int" },
        { value: "_GLOBAL_CONFIG_VCSEL_WIDTH", description: "STM32_VL53L0X__GLOBAL_CONFIG_VCSEL_WIDTH", returns: "int" },
        { value: "_GLOBAL_CONFIG_SPAD_ENABLES_REF_0", description: "STM32_VL53L0X__GLOBAL_CONFIG_SPAD_ENABLES_REF_0", returns: "int" },
        { value: "_GLOBAL_CONFIG_SPAD_ENABLES_REF_1", description: "STM32_VL53L0X__GLOBAL_CONFIG_SPAD_ENABLES_REF_1", returns: "int" },
        { value: "_GLOBAL_CONFIG_SPAD_ENABLES_REF_2", description: "STM32_VL53L0X__GLOBAL_CONFIG_SPAD_ENABLES_REF_2", returns: "int" },
        { value: "_GLOBAL_CONFIG_SPAD_ENABLES_REF_3", description: "STM32_VL53L0X__GLOBAL_CONFIG_SPAD_ENABLES_REF_3", returns: "int" },
        { value: "_GLOBAL_CONFIG_SPAD_ENABLES_REF_4", description: "STM32_VL53L0X__GLOBAL_CONFIG_SPAD_ENABLES_REF_4", returns: "int" },
        { value: "_GLOBAL_CONFIG_SPAD_ENABLES_REF_5", description: "STM32_VL53L0X__GLOBAL_CONFIG_SPAD_ENABLES_REF_5", returns: "int" },
        { value: "_GLOBAL_CONFIG_REF_EN_START_SELECT", description: "STM32_VL53L0X__GLOBAL_CONFIG_REF_EN_START_SELECT", returns: "int" },
        { value: "_DYNAMIC_SPAD_NUM_REQUESTED_REF_SPAD", description: "STM32_VL53L0X__DYNAMIC_SPAD_NUM_REQUESTED_REF_SPAD", returns: "int" },
        { value: "_DYNAMIC_SPAD_REF_EN_START_OFFSET", description: "STM32_VL53L0X__DYNAMIC_SPAD_REF_EN_START_OFFSET", returns: "int" },
        { value: "_POWER_MANAGEMENT_GO1_POWER_FORCE", description: "STM32_VL53L0X__POWER_MANAGEMENT_GO1_POWER_FORCE", returns: "int" },
        { value: "_VHV_CONFIG_PAD_SCL_SDA__EXTSUP_HV", description: "STM32_VL53L0X__VHV_CONFIG_PAD_SCL_SDA__EXTSUP_HV", returns: "int" },
        { value: "_ALGO_PHASECAL_LIM", description: "STM32_VL53L0X__ALGO_PHASECAL_LIM", returns: "int" },
        { value: "_ALGO_PHASECAL_CONFIG_TIMEOUT", description: "STM32_VL53L0X__ALGO_PHASECAL_CONFIG_TIMEOUT", returns: "int" },
        { value: "_VCSEL_PERIOD_PRE_RANGE", description: "STM32_VL53L0X__VCSEL_PERIOD_PRE_RANGE", returns: "int" },
        { value: "_VCSEL_PERIOD_FINAL_RANGE", description: "STM32_VL53L0X__VCSEL_PERIOD_FINAL_RANGE", returns: "int" },
        { value: "VL53L0X", meta: "stm32_vl53l0x", kind: "class", description: "STM32_VL53L0X_VL53L0X", content: [] },
        { title: "VL53L0X(i2c, addr=_VL53L0X_IIC_ADDR, io_timeout_s=0)", value: "VL53L0X()", meta: "constructor", description: "STM32_VL53L0X_VL53L0X_CTOR", returns: "VL53L0X@stm32_vl53l0x", snippet: "VL53L0X($1)" },
        { title: "_decode_timeout(val)", value: "_decode_timeout", meta: "-- <function>", description: "STM32_VL53L0X__DECODE_TIMEOUT", snippet: "_decode_timeout($1)", returns: "float" },
        { title: "_encode_timeout(timeout_mclks)", value: "_encode_timeout", meta: "-- <function>", description: "STM32_VL53L0X__ENCODE_TIMEOUT", snippet: "_encode_timeout($1)", returns: "int" },
        { title: "_timeout_mclks_to_microseconds(timeout_period_mclks, vcsel_period...", value: "_timeout_mclks_to_microseconds", meta: "-- <function>", description: "STM32_VL53L0X__TIMEOUT_MCLKS_TO_MICROSECONDS", snippet: "_timeout_mclks_to_microseconds($1)", returns: "int" },
        { title: "_timeout_microseconds_to_mclks(timeout_period_us, vcsel_period_pc...", value: "_timeout_microseconds_to_mclks", meta: "-- <function>", description: "STM32_VL53L0X__TIMEOUT_MICROSECONDS_TO_MCLKS", snippet: "_timeout_microseconds_to_mclks($1)", returns: "int" },
        { value: "__name__", meta: "stm32_vl53l0x", description: "STM32_VL53L0X_MODULE" }
    ];
    typeTree.VL53L0X = [
        { title: "signal_rate_limit()", value: "signal_rate_limit", meta: "-- <function>", description: "STM32_VL53L0X_VL53L0X_SIGNAL_RATE_LIMIT", snippet: "signal_rate_limit()" },
        { title: "signal_rate_limit()", value: "signal_rate_limit", meta: "-- <function>", description: "STM32_VL53L0X_VL53L0X_SIGNAL_RATE_LIMIT", snippet: "signal_rate_limit()" },
        { title: "measurement_timing_budget()", value: "measurement_timing_budget", meta: "-- <function>", description: "STM32_VL53L0X_VL53L0X_MEASUREMENT_TIMING_BUDGET", snippet: "measurement_timing_budget()" },
        { title: "measurement_timing_budget()", value: "measurement_timing_budget", meta: "-- <function>", description: "STM32_VL53L0X_VL53L0X_MEASUREMENT_TIMING_BUDGET", snippet: "measurement_timing_budget()" },
        { title: "getRangeMillimeters()", value: "getRangeMillimeters", meta: "-- <function>", description: "STM32_VL53L0X_VL53L0X_GETRANGEMILLIMETERS", snippet: "getRangeMillimeters()" },
        { title: "set_address(new_address)", value: "set_address", meta: "-- <function>", description: "STM32_VL53L0X_VL53L0X_SET_ADDRESS", snippet: "set_address($1)" },
    ];

    return { tree, typeTree };
}