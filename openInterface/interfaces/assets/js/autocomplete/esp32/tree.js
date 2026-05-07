function getCompleterTrees_esp32(_interface) {
    const DOC_URL = "https://docs.micropython.org/en/latest/library/";
    const tree = {};
    const typeTree = {};

    let esp = [];
    if (_interface == "esp8266") {
        esp = esp.concat([
            { title: "SLEEP_NONE", value: "SLEEP_NONE", meta: "esp", description: "MPY_ESP_SLEEP_NONE", docUrl: DOC_URL + "esp.html#esp.sleep_type" },
            { title: "SLEEP_MODEM", value: "SLEEP_MODEM", meta: "esp", description: "MPY_ESP_SLEEP_MODEM", docUrl: DOC_URL + "esp.html#esp.sleep_type" },
            { title: "SLEEP_LIGHT", value: "SLEEP_LIGHT", meta: "esp", description: "MPY_ESP_SLEEP_LIGHT", docUrl: DOC_URL + "esp.html#esp.sleep_type" }
        ]);
    }
    if (['cyberpi', 'esp32', 'galaxia', 'm5stack'].includes(_interface)) {
        esp = esp.concat([
            { title: "LOG_NONE", value: "LOG_NONE", meta: "esp", description: "MPY_ESP_LOG_NONE", docUrl: DOC_URL + "esp.html#esp.osdebug" },
            { title: "LOG_ERROR", value: "LOG_ERROR", meta: "esp", description: "MPY_ESP_LOG_ERROR", docUrl: DOC_URL + "esp.html#esp.osdebug" },
            { title: "LOG_WARN", value: "LOG_WARN", meta: "esp", description: "MPY_ESP_LOG_WARN", docUrl: DOC_URL + "esp.html#esp.osdebug" },
            { title: "LOG_INFO", value: "LOG_INFO", meta: "esp", description: "MPY_ESP_LOG_INFO", docUrl: DOC_URL + "esp.html#esp.osdebug" },
            { title: "LOG_DEBUG", value: "LOG_DEBUG", meta: "esp", description: "MPY_ESP_LOG_DEBUG", docUrl: DOC_URL + "esp.html#esp.osdebug" },
            { title: "LOG_VERBOSE", value: "LOG_VERBOSE", meta: "esp", description: "MPY_ESP_LOG_VERBOSE", docUrl: DOC_URL + "esp.html#esp.osdebug" }
        ]);
    }
    if (_interface !== 'pico') {
        esp = esp.concat([
            { title: "sleep_type([sleep_type])", value: "sleep_type", meta: "-- <function>", snippet: "sleep_type(${1:})", description: "MPY_ESP_SLEEP_TYPE", returns: "int", docUrl: DOC_URL + "esp.html#esp.sleep_type" },
            { title: "deepsleep(time_us=0)", value: "deepsleep", meta: "-- <function>", snippet: "deepsleep(${1:})", description: "MPY_ESP_DEEPSLEEP", docUrl: DOC_URL + "esp.html#esp.deepsleep" },
            { title: "flash_id()", value: "flash_id", meta: "-- <function>", snippet: "flash_id()", description: "MPY_ESP_FLASH_ID", returns: "int", docUrl: DOC_URL + "esp.html#esp.flash_id" },
            { title: "flash_size()", value: "flash_size", meta: "-- <function>", snippet: "flash_size()", description: "MPY_ESP_FLASH_SIZE", returns: "int", docUrl: DOC_URL + "esp.html#esp.flash_size" },
            { title: "flash_user_start()", value: "flash_user_start", meta: "-- <function>", snippet: "flash_user_start()", description: "MPY_ESP_FLASH_USER_START", returns: "int", docUrl: DOC_URL + "esp.html#esp.flash_user_start" },
            { title: "flash_read(byte_offset, length_or_buffer)", value: "flash_read", meta: "-- <function>", snippet: "flash_read(${1:})", description: "MPY_ESP_FLASH_READ", returns: "bytes", docUrl: DOC_URL + "esp.html#esp.flash_read" },
            { title: "flash_write(byte_offset, bytes)", value: "flash_write", meta: "-- <function>", snippet: "flash_write(${1:})", description: "MPY_ESP_FLASH_WRITE", docUrl: DOC_URL + "esp.html#esp.flash_write" },
            { title: "flash_erase(sector_no)", value: "flash_erase", meta: "-- <function>", snippet: "flash_erase(${1:})", description: "MPY_ESP_FLASH_ERASE", docUrl: DOC_URL + "esp.html#esp.flash_erase" },
            { title: "osdebug(uart_no)", value: "osdebug", meta: "-- <function>", snippet: "osdebug(${1:})", description: "MPY_ESP_OSDEBUG_ESP8266", docUrl: DOC_URL + "esp.html#esp.osdebug" },
            { title: "osdebug(uart_no, level)", value: "osdebug", meta: "-- <function>", snippet: "osdebug(${1:})", description: "MPY_ESP_OSDEBUG_ESP32", docUrl: DOC_URL + "esp.html#esp.osdebug" },
            { title: "set_native_code_location(start, length)", value: "set_native_code_location", meta: "-- <function>", snippet: "set_native_code_location(${1:})", description: "MPY_ESP_SET_NATIVE_CODE_LOCATION", docUrl: DOC_URL + "esp.html#esp.set_native_code_location" },
            { value: "__name__", meta: "esp", description: "MPY_ESP_MODULE", docUrl: DOC_URL }
        ]);
        tree.esp = esp;
        tree.esp32 = [
            { title: "wake_on_touch(wake)", value: "wake_on_touch", meta: "-- <function>", snippet: "wake_on_touch($1)", description: "MPY_ESP32_WAKE_ON_TOUCH", docUrl: DOC_URL + "esp32.html#esp32.wake_on_touch" },
            { title: "wake_on_ulp(wake)", value: "wake_on_ulp", meta: "-- <function>", snippet: "wake_on_ulp($1)", description: "MPY_ESP32_WAKE_ON_ULP", docUrl: DOC_URL + "esp32.html#esp32.wake_on_ulp" },
            { title: "wake_on_ext0(pin, level)", value: "wake_on_ext0", meta: "-- <function>", snippet: "wake_on_ext0($1)", description: "MPY_ESP32_WAKE_ON_EXT0", docUrl: DOC_URL + "esp32.html#esp32.wake_on_ext0" },
            { title: "wake_on_ext1(pins, level)", value: "wake_on_ext1", meta: "-- <function>", snippet: "wake_on_ext1($1)", description: "MPY_ESP32_WAKE_ON_EXT1", docUrl: DOC_URL + "esp32.html#esp32.wake_on_ext1" },
            { title: "gpio_deep_sleep_hold(enable)", value: "gpio_deep_sleep_hold", meta: "-- <function>", snippet: "gpio_deep_sleep_hold($1)", description: "MPY_ESP32_GPIO_DEEP_SLEEP_HOLD", docUrl: DOC_URL + "esp32.html#esp32.gpio_deep_sleep_hold" },
            { title: "raw_temperature()", value: "raw_temperature", meta: "-- <function>", snippet: "raw_temperature()", description: "MPY_ESP32_RAW_TEMPERATURE", docUrl: DOC_URL + "esp32.html#esp32.raw_temperature", returns: "int" },
            { title: "idf_heap_info(capabilities)", value: "idf_heap_info", meta: "-- <function>", snippet: "idf_heap_info($1)", description: "MPY_ESP32_IDF_HEAP_INFO", docUrl: DOC_URL + "esp32.html#esp32.idf_heap_info", returns: "list" },
            { title: "idf_task_info()", value: "idf_task_info", meta: "-- <function>", snippet: "idf_task_info()", description: "MPY_ESP32_IDF_TASK_INFO", docUrl: DOC_URL + "esp32.html#esp32.idf_task_info", returns: "tuple" },
            { title: "HEAP_DATA", value: "HEAP_DATA", meta: "-- <data>", description: "MPY_ESP32_HEAP_DATA", docUrl: DOC_URL + "esp32.html#esp32.idf_heap_info" },
            { title: "HEAP_EXEC", value: "HEAP_EXEC", meta: "-- <data>", description: "MPY_ESP32_HEAP_EXEC", docUrl: DOC_URL + "esp32.html#esp32.idf_heap_info" },
            { title: "WAKEUP_ALL_LOW", value: "WAKEUP_ALL_LOW", meta: "-- <data>", description: "MPY_ESP32_WAKEUP_ALL_LOW", docUrl: DOC_URL + "esp32.html#esp32.WAKEUP_ALL_LOW" },
            { title: "WAKEUP_ANY_HIGH", value: "WAKEUP_ANY_HIGH", meta: "-- <data>", description: "MPY_ESP32_WAKEUP_ANY_HIGH", docUrl: DOC_URL + "esp32.html#esp32.WAKEUP_ANY_HIGH" },
            { value: "Partition", meta: "esp32", description: "MPY_ESP32_PARTITION", docUrl: DOC_URL + "esp32.html#esp32.Partition", kind: "class" },
            { title: "Partition(id, block_size=4096, /)", value: "Partition()", meta: "constructor", snippet: "Partition($1)", description: "MPY_ESP32_PARTITION", docUrl: DOC_URL + "esp32.html#esp32.Partition", returns: "Partition" },
            { value: "PCNT", meta: "esp32", description: "MPY_ESP32_PCNT", docUrl: DOC_URL + "esp32.html#esp32.PCNT", kind: "class" },
            { title: "PCNT(id, *, ...)", value: "PCNT()", meta: "constructor", snippet: "PCNT($1)", description: "MPY_ESP32_PCNT", docUrl: DOC_URL + "esp32.html#esp32.PCNT", returns: "PCNT" },
            { value: "RMT", meta: "esp32", description: "MPY_ESP32_RMT", docUrl: DOC_URL + "esp32.html#esp32.RMT", kind: "class" },
            { title: "RMT(channel, *, pin=None, clock_div=8, idle_level=False, tx_carrier=None)", value: "RMT()", meta: "constructor", snippet: "RMT($1)", description: "MPY_ESP32_RMT", docUrl: DOC_URL + "esp32.html#esp32.RMT", returns: "RMT" },
            { value: "ULP", meta: "esp32", description: "MPY_ESP32_ULP", docUrl: DOC_URL + "esp32.html#esp32.ULP", kind: "class" },
            { title: "ULP()", value: "ULP()", meta: "constructor", snippet: "ULP()", description: "MPY_ESP32_ULP", docUrl: DOC_URL + "esp32.html#esp32.ULP", returns: "ULP" },
            { value: "NVS", meta: "esp32", description: "MPY_ESP32_NVS", docUrl: DOC_URL + "esp32.html#esp32.NVS", kind: "class" },
            { title: "NVS(namespace)", value: "NVS()", meta: "constructor", snippet: "NVS($1)", description: "MPY_ESP32_NVS", docUrl: DOC_URL + "esp32.html#esp32.NVS", returns: "NVS" }
        ];
        typeTree.Partition = [
            { title: "find(type=TYPE_APP, subtype=0xff, label=None, block_size=4096)", value: "find", meta: "-- <function>", snippet: "find($1)", description: "MPY_ESP32_PARTITION_FIND", docUrl: DOC_URL + "esp32.html#esp32.Partition.find", returns: "list" },
            { title: "info()", value: "info", meta: "-- <function>", snippet: "info()", description: "MPY_ESP32_PARTITION_INFO", docUrl: DOC_URL + "esp32.html#esp32.Partition.info", returns: "tuple" },
            { title: "readblocks(block_num, buf)", value: "readblocks", meta: "-- <function>", snippet: "readblocks($1)", description: "MPY_ESP32_PARTITION_READBLOCKS", docUrl: DOC_URL + "esp32.html#esp32.Partition.readblocks" },
            { title: "writeblocks(block_num, buf)", value: "writeblocks", meta: "-- <function>", snippet: "writeblocks($1)", description: "MPY_ESP32_PARTITION_WRITEBLOCKS", docUrl: DOC_URL + "esp32.html#esp32.Partition.writeblocks" },
            { title: "ioctl(cmd, arg)", value: "ioctl", meta: "-- <function>", snippet: "ioctl($1)", description: "MPY_ESP32_PARTITION_IOCTL", docUrl: DOC_URL + "esp32.html#esp32.Partition.ioctl" },
            { title: "set_boot()", value: "set_boot", meta: "-- <function>", snippet: "set_boot()", description: "MPY_ESP32_PARTITION_SET_BOOT", docUrl: DOC_URL + "esp32.html#esp32.Partition.set_boot" },
            { title: "get_next_update()", value: "get_next_update", meta: "-- <function>", snippet: "get_next_update()", description: "MPY_ESP32_PARTITION_GET_NEXT_UPDATE", docUrl: DOC_URL + "esp32.html#esp32.Partition.get_next_update", returns: "Partition" },
            { title: "mark_app_valid_cancel_rollback()", value: "mark_app_valid_cancel_rollback", meta: "-- <function>", snippet: "mark_app_valid_cancel_rollback()", description: "MPY_ESP32_PARTITION_MARK_APP_VALID", docUrl: DOC_URL + "esp32.html#esp32.Partition.mark_app_valid_cancel_rollback" },
            { title: "BOOT", value: "BOOT", meta: "-- <data>", description: "MPY_ESP32_PARTITION_BOOT", docUrl: DOC_URL + "esp32.html#esp32.Partition.BOOT" },
            { title: "RUNNING", value: "RUNNING", meta: "-- <data>", description: "MPY_ESP32_PARTITION_RUNNING", docUrl: DOC_URL + "esp32.html#esp32.Partition.RUNNING" },
            { title: "TYPE_APP", value: "TYPE_APP", meta: "-- <data>", description: "MPY_ESP32_PARTITION_TYPE_APP", docUrl: DOC_URL + "esp32.html#esp32.Partition.TYPE_APP" },
            { title: "TYPE_DATA", value: "TYPE_DATA", meta: "-- <data>", description: "MPY_ESP32_PARTITION_TYPE_DATA", docUrl: DOC_URL + "esp32.html#esp32.Partition.TYPE_DATA" },
        ];
        typeTree.PCNT = [
            { title: "init(*, ...)", value: "init", meta: "-- <function>", snippet: "init($1)", description: "MPY_ESP32_PCNT_INIT", docUrl: DOC_URL + "esp32.html#esp32.PCNT.init" },
            { title: "value([value])", value: "value", meta: "-- <function>", snippet: "value($1)", description: "MPY_ESP32_PCNT_VALUE", docUrl: DOC_URL + "esp32.html#esp32.PCNT.value", returns: "int" },
            { title: "irq(handler=None, trigger=PCNT.IRQ_ZERO)", value: "irq", meta: "-- <function>", snippet: "irq($1)", description: "MPY_ESP32_PCNT_IRQ", docUrl: DOC_URL + "esp32.html#esp32.PCNT.irq" },
            { title: "INCREMENT", value: "INCREMENT", meta: "-- <data>", description: "MPY_ESP32_PCNT_INCREMENT", docUrl: DOC_URL + "esp32.html#esp32.PCNT.init" },
            { title: "DECREMENT", value: "DECREMENT", meta: "-- <data>", description: "MPY_ESP32_PCNT_DECREMENT", docUrl: DOC_URL + "esp32.html#esp32.PCNT.init" },
            { title: "IGNORE", value: "IGNORE", meta: "-- <data>", description: "MPY_ESP32_PCNT_IGNORE", docUrl: DOC_URL + "esp32.html#esp32.PCNT.init" },
            { title: "HOLD", value: "HOLD", meta: "-- <data>", description: "MPY_ESP32_PCNT_HOLD", docUrl: DOC_URL + "esp32.html#esp32.PCNT.init" },
            { title: "REVERSE", value: "REVERSE", meta: "-- <data>", description: "MPY_ESP32_PCNT_REVERSE", docUrl: DOC_URL + "esp32.html#esp32.PCNT.init" },
            { title: "NORMAL", value: "NORMAL", meta: "-- <data>", description: "MPY_ESP32_PCNT_NORMAL", docUrl: DOC_URL + "esp32.html#esp32.PCNT.init" },
            { title: "IRQ_ZERO", value: "IRQ_ZERO", meta: "-- <data>", description: "MPY_ESP32_PCNT_IRQ_ZERO", docUrl: DOC_URL + "esp32.html#esp32.PCNT.irq" },
            { title: "IRQ_MIN", value: "IRQ_MIN", meta: "-- <data>", description: "MPY_ESP32_PCNT_IRQ_MIN", docUrl: DOC_URL + "esp32.html#esp32.PCNT.irq" },
            { title: "IRQ_MAX", value: "IRQ_MAX", meta: "-- <data>", description: "MPY_ESP32_PCNT_IRQ_MAX", docUrl: DOC_URL + "esp32.html#esp32.PCNT.irq" },
            { title: "IRQ_THRESHOLD0", value: "IRQ_THRESHOLD0", meta: "-- <data>", description: "MPY_ESP32_PCNT_IRQ_THRESHOLD0", docUrl: DOC_URL + "esp32.html#esp32.PCNT.irq" },
            { title: "IRQ_THRESHOLD1", value: "IRQ_THRESHOLD1", meta: "-- <data>", description: "MPY_ESP32_PCNT_IRQ_THRESHOLD1", docUrl: DOC_URL + "esp32.html#esp32.PCNT.irq" },
        ];
        typeTree.RMT = [
            { title: "source_freq()", value: "source_freq", meta: "-- <function>", snippet: "source_freq()", description: "MPY_ESP32_RMT_SOURCE_FREQ", docUrl: DOC_URL + "esp32.html#esp32.RMT.source_freq", returns: "int" },
            { title: "clock_div()", value: "clock_div", meta: "-- <function>", snippet: "clock_div()", description: "MPY_ESP32_RMT_CLOCK_DIV", docUrl: DOC_URL + "esp32.html#esp32.RMT.clock_div", returns: "int" },
            { title: "wait_done(*, timeout=0)", value: "wait_done", meta: "-- <function>", snippet: "wait_done($1)", description: "MPY_ESP32_RMT_WAIT_DONE", docUrl: DOC_URL + "esp32.html#esp32.RMT.wait_done", returns: "bool" },
            { title: "loop(enable_loop)", value: "loop", meta: "-- <function>", snippet: "loop($1)", description: "MPY_ESP32_RMT_LOOP", docUrl: DOC_URL + "esp32.html#esp32.RMT.loop" },
            { title: "write_pulses(duration, data=True)", value: "write_pulses", meta: "-- <function>", snippet: "write_pulses($1)", description: "MPY_ESP32_RMT_WRITE_PULSES", docUrl: DOC_URL + "esp32.html#esp32.RMT.write_pulses" },
            { title: "bitstream_channel([value])", value: "bitstream_channel", meta: "-- <function>", snippet: "bitstream_channel($1)", description: "MPY_ESP32_RMT_BITSTREAM_CHANNEL", docUrl: DOC_URL + "esp32.html#esp32.RMT.bitstream_channel", returns: "int" },
            { title: "PULSE_MAX", value: "PULSE_MAX", meta: "-- <data>", description: "MPY_ESP32_RMT_PULSE_MAX", docUrl: DOC_URL + "esp32.html#esp32.RMT.PULSE_MAX" },
        ];
        typeTree.ULP = [
            { title: "set_wakeup_period(period_index, period_us)", value: "set_wakeup_period", meta: "-- <function>", snippet: "set_wakeup_period($1)", description: "MPY_ESP32_ULP_SET_WAKEUP_PERIOD", docUrl: DOC_URL + "esp32.html#esp32.ULP.set_wakeup_period" },
            { title: "load_binary(load_addr, program_binary)", value: "load_binary", meta: "-- <function>", snippet: "load_binary($1)", description: "MPY_ESP32_ULP_LOAD_BINARY", docUrl: DOC_URL + "esp32.html#esp32.ULP.load_binary" },
            { title: "run(entry_point)", value: "run", meta: "-- <function>", snippet: "run($1)", description: "MPY_ESP32_ULP_RUN", docUrl: DOC_URL + "esp32.html#esp32.ULP.run" },
        ];
        typeTree.NVS = [
            { title: "set_i32(key, value)", value: "set_i32", meta: "-- <function>", snippet: "set_i32($1)", description: "MPY_ESP32_NVS_SET_I32", docUrl: DOC_URL + "esp32.html#esp32.NVS.set_i32" },
            { title: "get_i32(key)", value: "get_i32", meta: "-- <function>", snippet: "get_i32($1)", description: "MPY_ESP32_NVS_GET_I32", docUrl: DOC_URL + "esp32.html#esp32.NVS.get_i32", returns: "int" },
            { title: "set_blob(key, value)", value: "set_blob", meta: "-- <function>", snippet: "set_blob($1)", description: "MPY_ESP32_NVS_SET_BLOB", docUrl: DOC_URL + "esp32.html#esp32.NVS.set_blob" },
            { title: "get_blob(key, buffer)", value: "get_blob", meta: "-- <function>", snippet: "get_blob($1)", description: "MPY_ESP32_NVS_GET_BLOB", docUrl: DOC_URL + "esp32.html#esp32.NVS.get_blob", returns: "int" },
            { title: "erase_key(key)", value: "erase_key", meta: "-- <function>", snippet: "erase_key($1)", description: "MPY_ESP32_NVS_ERASE_KEY", docUrl: DOC_URL + "esp32.html#esp32.NVS.erase_key" },
            { title: "commit()", value: "commit", meta: "-- <function>", snippet: "commit()", description: "MPY_ESP32_NVS_COMMIT", docUrl: DOC_URL + "esp32.html#esp32.NVS.commit" },
        ];
    }

    const network = [
        { value: "WLAN", meta: "network", description: "MPY_NETWORK_WLAN_CLASS", docUrl: DOC_URL + "network.WLAN.html", kind: "class" },
        { value: "WLAN()", title: "WLAN(interface_id)", meta: "constructor", description: "MPY_NETWORK_WLAN_CONSTRUCTOR", snippet: "WLAN(${1:})", returns: "WLAN", docUrl: DOC_URL + "network.WLAN.html#network.WLAN" },
        { value: "STA_IF", meta: "network", description: "MPY_NETWORK_STA_IF", docUrl: DOC_URL + "network.WLAN.html" },
        { value: "AP_IF", meta: "network", description: "MPY_NETWORK_AP_IF", docUrl: DOC_URL + "network.WLAN.html" },
        { value: "STAT_IDLE", meta: "network", description: "MPY_NETWORK_STAT_IDLE", docUrl: DOC_URL + "network.WLAN.html" },
        { value: "STAT_CONNECTING", meta: "network", description: "MPY_NETWORK_STAT_CONNECTING", docUrl: DOC_URL + "network.WLAN.html" },
        { value: "STAT_WRONG_PASSWORD", meta: "network", description: "MPY_NETWORK_STAT_WRONG_PASSWORD", docUrl: DOC_URL + "network.WLAN.html" },
        { value: "STAT_NO_AP_FOUND", meta: "network", description: "MPY_NETWORK_STAT_NO_AP_FOUND", docUrl: DOC_URL + "network.WLAN.html" },
        { value: "STAT_CONNECT_FAIL", meta: "network", description: "MPY_NETWORK_STAT_CONNECT_FAIL", docUrl: DOC_URL + "network.WLAN.html" },
        { value: "STAT_GOT_IP", meta: "network", description: "MPY_NETWORK_STAT_GOT_IP", docUrl: DOC_URL + "network.WLAN.html" },
        { title: "country([code])", value: "country", meta: "-- <function>", snippet: "country(${1:})", description: "MPY_NETWORK_COUNTRY", returns: "str", docUrl: DOC_URL + "network.html#network.country" },
        { title: "hostname([name])", value: "hostname", meta: "-- <function>", snippet: "hostname(${1:})", description: "MPY_NETWORK_HOSTNAME", returns: "str", docUrl: DOC_URL + "network.html#network.hostname" },
        { title: "ipconfig('param')", value: "ipconfig", meta: "-- <function>", snippet: "ipconfig(${1:})", description: "MPY_NETWORK_IPCONFIG", returns: "object", docUrl: DOC_URL + "network.html#network.ipconfig" },
        { value: "__name__", meta: "network", description: "MPY_NETWORK_MODULE", docUrl: DOC_URL + "network.html" },
    ];
    tree.network = network;
    typeTree.WLAN = [
        { title: "active([is_active])", value: "active", meta: "-- <function>", snippet: "active(${1:})", description: "MPY_NETWORK_WLAN_ACTIVE", returns: "bool", docUrl: DOC_URL + "network.WLAN.html#network.WLAN.active" },
        { title: "connect(ssid=None, key=None, *, bssid=None)", value: "connect", meta: "-- <function>", snippet: "connect(${1:})", description: "MPY_NETWORK_WLAN_CONNECT", docUrl: DOC_URL + "network.WLAN.html#network.WLAN.connect" },
        { title: "disconnect()", value: "disconnect", meta: "-- <function>", snippet: "disconnect()", description: "MPY_NETWORK_WLAN_DISCONNECT", docUrl: DOC_URL + "network.WLAN.html#network.WLAN.disconnect" },
        { title: "scan()", value: "scan", meta: "-- <function>", snippet: "scan()", description: "MPY_NETWORK_WLAN_SCAN", returns: "list", docUrl: DOC_URL + "network.WLAN.html#network.WLAN.scan" },
        { title: "status([param])", value: "status", meta: "-- <function>", snippet: "status(${1:})", description: "MPY_NETWORK_WLAN_STATUS", returns: "int", docUrl: DOC_URL + "network.WLAN.html#network.WLAN.status" },
        { title: "isconnected()", value: "isconnected", meta: "-- <function>", snippet: "isconnected()", description: "MPY_NETWORK_WLAN_ISCONNECTED", returns: "bool", docUrl: DOC_URL + "network.WLAN.html#network.WLAN.isconnected" },
        { title: "ifconfig([(ip, subnet, gateway, dns)])", value: "ifconfig", meta: "-- <function>", snippet: "ifconfig(${1:})", description: "MPY_NETWORK_WLAN_IFCONFIG", returns: "tuple", docUrl: DOC_URL + "network.WLAN.html#network.WLAN.ifconfig" },
        { title: "config('param') / config(param=value, ...)", value: "config", meta: "-- <function>", snippet: "config(${1:})", description: "MPY_NETWORK_WLAN_CONFIG", returns: "object", docUrl: DOC_URL + "network.WLAN.html#network.WLAN.config" },
        { value: "PM_PERFORMANCE", meta: "WLAN", description: "MPY_NETWORK_WLAN_PM_PERFORMANCE", docUrl: DOC_URL + "network.WLAN.html" },
        { value: "PM_POWERSAVE", meta: "WLAN", description: "MPY_NETWORK_WLAN_PM_POWERSAVE", docUrl: DOC_URL + "network.WLAN.html" },
        { value: "PM_NONE", meta: "WLAN", description: "MPY_NETWORK_WLAN_PM_NONE", docUrl: DOC_URL + "network.WLAN.html" },
        { value: "PROTOCOL_DEFAULT", meta: "WLAN", description: "MPY_NETWORK_WLAN_PROTOCOL_DEFAULT", docUrl: DOC_URL + "network.WLAN.html" },
        { value: "PROTOCOL_LR", meta: "WLAN", description: "MPY_NETWORK_WLAN_PROTOCOL_LR", docUrl: DOC_URL + "network.WLAN.html" },
        { value: "__qualname__", meta: "WLAN" },
        { value: "__module__", meta: "WLAN" }
    ];
    const usocket = [
        { title: "socket(af=AF_INET, type=SOCK_STREAM, proto=IPPROTO_TCP)", value: "socket", meta: "-- <function>", snippet: "socket(${1:})", description: "MPY_USOCKET_SOCKET", returns: "socket", docUrl: DOC_URL + "usocket.html#usocket.socket" },
        { title: "getaddrinfo(host, port, af=0, type=0, proto=0, flags=0)", value: "getaddrinfo", meta: "-- <function>", snippet: "getaddrinfo(${1:})", description: "MPY_USOCKET_GETADDRINFO", returns: "list", docUrl: DOC_URL + "usocket.html#usocket.getaddrinfo" },
        { title: "inet_ntop(af, bin_addr)", value: "inet_ntop", meta: "-- <function>", snippet: "inet_ntop(${1:})", description: "MPY_USOCKET_INET_NTOP", returns: "str", docUrl: DOC_URL + "usocket.html#usocket.inet_ntop" },
        { title: "inet_pton(af, txt_addr)", value: "inet_pton", meta: "-- <function>", snippet: "inet_pton(${1:})", description: "MPY_USOCKET_INET_PTON", returns: "bytes", docUrl: DOC_URL + "usocket.html#usocket.inet_pton" },
        { value: "AF_INET", meta: "usocket", description: "MPY_USOCKET_AF_INET", docUrl: DOC_URL + "usocket.html" },
        { value: "AF_INET6", meta: "usocket", description: "MPY_USOCKET_AF_INET6", docUrl: DOC_URL + "usocket.html" },
        { value: "SOCK_STREAM", meta: "usocket", description: "MPY_USOCKET_SOCK_STREAM", docUrl: DOC_URL + "usocket.html" },
        { value: "SOCK_DGRAM", meta: "usocket", description: "MPY_USOCKET_SOCK_DGRAM", docUrl: DOC_URL + "usocket.html" },
        { value: "IPPROTO_TCP", meta: "usocket", description: "MPY_USOCKET_IPPROTO_TCP", docUrl: DOC_URL + "usocket.html" },
        { value: "IPPROTO_UDP", meta: "usocket", description: "MPY_USOCKET_IPPROTO_UDP", docUrl: DOC_URL + "usocket.html" },
        { value: "__name__", meta: "usocket", description: "MPY_USOCKET_MODULE", docUrl: DOC_URL + "usocket.html" },
    ];
    tree.usocket = usocket;
    tree.socket = usocket;
    typeTree.socket = [
        { title: "close()", value: "close", meta: "-- <function>", snippet: "close()", description: "MPY_SOCKET_CLOSE", docUrl: DOC_URL + "usocket.html#socket.close" },
        { title: "bind(address)", value: "bind", meta: "-- <function>", snippet: "bind(${1:})", description: "MPY_SOCKET_BIND", docUrl: DOC_URL + "usocket.html#socket.bind" },
        { title: "listen([backlog])", value: "listen", meta: "-- <function>", snippet: "listen(${1:})", description: "MPY_SOCKET_LISTEN", docUrl: DOC_URL + "usocket.html#socket.listen" },
        { title: "accept()", value: "accept", meta: "-- <function>", snippet: "accept()", description: "MPY_SOCKET_ACCEPT", returns: "tuple", docUrl: DOC_URL + "usocket.html#socket.accept" },
        { title: "connect(address)", value: "connect", meta: "-- <function>", snippet: "connect(${1:})", description: "MPY_SOCKET_CONNECT", docUrl: DOC_URL + "usocket.html#socket.connect" },
        { title: "send(bytes)", value: "send", meta: "-- <function>", snippet: "send(${1:})", description: "MPY_SOCKET_SEND", returns: "int", docUrl: DOC_URL + "usocket.html#socket.send" },
        { title: "sendall(bytes)", value: "sendall", meta: "-- <function>", snippet: "sendall(${1:})", description: "MPY_SOCKET_SENDALL", docUrl: DOC_URL + "usocket.html#socket.sendall" },
        { title: "recv(bufsize)", value: "recv", meta: "-- <function>", snippet: "recv(${1:})", description: "MPY_SOCKET_RECV", returns: "bytes", docUrl: DOC_URL + "usocket.html#socket.recv" },
        { title: "sendto(bytes, address)", value: "sendto", meta: "-- <function>", snippet: "sendto(${1:})", description: "MPY_SOCKET_SENDTO", returns: "int", docUrl: DOC_URL + "usocket.html#socket.sendto" },
        { title: "recvfrom(bufsize)", value: "recvfrom", meta: "-- <function>", snippet: "recvfrom(${1:})", description: "MPY_SOCKET_RECVFROM", returns: "tuple", docUrl: DOC_URL + "usocket.html#socket.recvfrom" },
        { title: "setsockopt(level, optname, value)", value: "setsockopt", meta: "-- <function>", snippet: "setsockopt(${1:})", description: "MPY_SOCKET_SETSOCKOPT", docUrl: DOC_URL + "usocket.html#socket.setsockopt" },
        { title: "settimeout(value)", value: "settimeout", meta: "-- <function>", snippet: "settimeout(${1:})", description: "MPY_SOCKET_SETTIMEOUT", docUrl: DOC_URL + "usocket.html#socket.settimeout" },
        { title: "setblocking(flag)", value: "setblocking", meta: "-- <function>", snippet: "setblocking(${1:})", description: "MPY_SOCKET_SETBLOCKING", docUrl: DOC_URL + "usocket.html#socket.setblocking" },
        { title: "makefile(mode='rb', buffering=0)", value: "makefile", meta: "-- <function>", snippet: "makefile(${1:})", description: "MPY_SOCKET_MAKEFILE", returns: "socket", docUrl: DOC_URL + "usocket.html#socket.makefile" },
        { title: "read([size])", value: "read", meta: "-- <function>", snippet: "read(${1:})", description: "MPY_SOCKET_READ", returns: "bytes", docUrl: DOC_URL + "usocket.html" },
        { title: "readline()", value: "readline", meta: "-- <function>", snippet: "readline()", description: "MPY_SOCKET_READLINE", returns: "bytes", docUrl: DOC_URL + "usocket.html" },
        { title: "write(buf)", value: "write", meta: "-- <function>", snippet: "write(${1:})", description: "MPY_SOCKET_WRITE", returns: "int", docUrl: DOC_URL + "usocket.html" },
        { value: "__qualname__", meta: "socket" },
        { value: "__module__", meta: "socket" }
    ];
    const urequests = [
        { title: "request(method, url, data=None, json=None, headers={})", value: "request", meta: "-- <function>", snippet: "request(${1:})", description: "MPY_UREQUESTS_REQUEST", returns: "Response", docUrl: "https://github.com/micropython/micropython-lib/tree/master/python-ecosys/urequests" },
        { title: "get(url, **kwargs)", value: "get", meta: "-- <function>", snippet: "get(${1:})", description: "MPY_UREQUESTS_GET", returns: "Response", docUrl: "https://github.com/micropython/micropython-lib/tree/master/python-ecosys/urequests" },
        { title: "post(url, **kwargs)", value: "post", meta: "-- <function>", snippet: "post(${1:})", description: "MPY_UREQUESTS_POST", returns: "Response", docUrl: "https://github.com/micropython/micropython-lib/tree/master/python-ecosys/urequests" },
        { title: "put(url, **kwargs)", value: "put", meta: "-- <function>", snippet: "put(${1:})", description: "MPY_UREQUESTS_PUT", returns: "Response", docUrl: "https://github.com/micropython/micropython-lib/tree/master/python-ecosys/urequests" },
        { title: "patch(url, **kwargs)", value: "patch", meta: "-- <function>", snippet: "patch(${1:})", description: "MPY_UREQUESTS_PATCH", returns: "Response", docUrl: "https://github.com/micropython/micropython-lib/tree/master/python-ecosys/urequests" },
        { title: "head(url, **kwargs)", value: "head", meta: "-- <function>", snippet: "head(${1:})", description: "MPY_UREQUESTS_HEAD", returns: "Response", docUrl: "https://github.com/micropython/micropython-lib/tree/master/python-ecosys/urequests" },
        { title: "delete(url, **kwargs)", value: "delete", meta: "-- <function>", snippet: "delete(${1:})", description: "MPY_UREQUESTS_DELETE", returns: "Response", docUrl: "https://github.com/micropython/micropython-lib/tree/master/python-ecosys/urequests" },
        { value: "Response", meta: "urequests", description: "MPY_UREQUESTS_RESPONSE_CLASS", docUrl: "https://github.com/micropython/micropython-lib/tree/master/python-ecosys/urequests", kind: "class" },
        { value: "__name__", meta: "urequests", description: "MPY_UREQUESTS_MODULE", docUrl: "https://github.com/micropython/micropython-lib/tree/master/python-ecosys/urequests" },
    ];
    tree.urequests = urequests;
    tree.requests = urequests;
    typeTree.Response = [
        { title: "close()", value: "close", meta: "-- <function>", snippet: "close()", description: "MPY_UREQUESTS_RESPONSE_CLOSE" },
        { title: "json()", value: "json", meta: "-- <function>", snippet: "json()", description: "MPY_UREQUESTS_RESPONSE_JSON", returns: "object" },
        { title: "iter_lines()", value: "iter_lines", meta: "-- <function>", snippet: "iter_lines()", description: "MPY_UREQUESTS_RESPONSE_ITER_LINES", returns: "iterator" },
        { title: "iter_content([chunk_size])", value: "iter_content", meta: "-- <function>", snippet: "iter_content(${1:})", description: "MPY_UREQUESTS_RESPONSE_ITER_CONTENT", returns: "iterator" },
        { title: "__enter__()", value: "__enter__", meta: "-- <function>", snippet: "__enter__()", description: "MPY_UREQUESTS_RESPONSE_ENTER", returns: "Response" },
        { title: "__exit__(exc_type, exc, tb)", value: "__exit__", meta: "-- <function>", snippet: "__exit__(${1:})", description: "MPY_UREQUESTS_RESPONSE_EXIT" },
        { title: "__iter__()", value: "__iter__", meta: "-- <function>", snippet: "__iter__()", description: "MPY_UREQUESTS_RESPONSE_ITER", returns: "iterator" },
        { value: "status_code", meta: "Response", description: "MPY_UREQUESTS_RESPONSE_STATUS_CODE" },
        { value: "reason", meta: "Response", description: "MPY_UREQUESTS_RESPONSE_REASON" },
        { value: "headers", meta: "Response", description: "MPY_UREQUESTS_RESPONSE_HEADERS" },
        { value: "content", meta: "Response", description: "MPY_UREQUESTS_RESPONSE_CONTENT", returns: "bytes" },
        { value: "text", meta: "Response", description: "MPY_UREQUESTS_RESPONSE_TEXT", returns: "str" },
        { value: "encoding", meta: "Response", description: "MPY_UREQUESTS_RESPONSE_ENCODING", returns: "str" },
        { value: "raw", meta: "Response", description: "MPY_UREQUESTS_RESPONSE_RAW", returns: "socket" },
        { value: "__qualname__", meta: "Response" },
        { value: "__module__", meta: "Response" }
    ];

    tree.vitta_server = [
        { title: "CMD_RECEIVE_SIMPLE_DATA", value: "CMD_RECEIVE_SIMPLE_DATA", description: "VITTA_SERVER_CMD_RECEIVE_SIMPLE_DATA" },
        { title: "CMD_SEND_SIMPLE_DATA", value: "CMD_SEND_SIMPLE_DATA", description: "VITTA_SERVER_CMD_SEND_SIMPLE_DATA" },
        { title: "CMD_SEND_WEB_PAGE", value: "CMD_SEND_WEB_PAGE", description: "VITTA_SERVER_CMD_SEND_WEB_PAGE" },
        { title: "CMD_SEND_VARIABLES", value: "CMD_SEND_VARIABLES", description: "VITTA_SERVER_CMD_SEND_VARIABLES" },
        { title: "SERVER()", value: "SERVER()", meta: "constructor", snippet: "SERVER()", description: "VITTA_SERVER_SERVER", returns: "SERVER" },
        { value: "SERVER", description: "VITTA_SERVER_SERVER", content: [] },
    ];
    typeTree.SERVER = [
        { title: "start(sta, ap, ip, port)", value: "start", meta: "-- <function>", snippet: "start(${1:})", description: "VITTA_SERVER_SERVER_START" },
        { title: "waitingClient()", value: "waitingClient", meta: "-- <function>", snippet: "waitingClient()", description: "VITTA_SERVER_SERVER_WAITINGCLIENT", returns: "tuple" },
        { title: "sendHTTPSocket(type, content, data)", value: "sendHTTPSocket", meta: "-- <function>", snippet: "sendHTTPSocket(${1:})", description: "VITTA_SERVER_SERVER_SENDHTTPSOCKET" },
        { title: "manageSocket(cmd, data)", value: "manageSocket", meta: "-- <function>", snippet: "manageSocket(${1:})", description: "VITTA_SERVER_SERVER_MANAGESOCKET" },
        { title: "getClientData(parameter)", value: "getClientData", meta: "-- <function>", snippet: "getClientData(${1:})", description: "VITTA_SERVER_SERVER_GETCLIENTDATA" },
        { title: "getClientIp()", value: "getClientIp", meta: "-- <function>", snippet: "getClientIp()", description: "VITTA_SERVER_SERVER_GETCLIENTIP" },
        { title: "sendDataToClient(data)", value: "sendDataToClient", meta: "-- <function>", snippet: "sendDataToClient(${1:})", description: "VITTA_SERVER_SERVER_SENDDATATOCLIENT" },
        { title: "closeClient(force)", value: "closeClient", meta: "-- <function>", snippet: "closeClient(${1:})", description: "VITTA_SERVER_SERVER_CLOSECLIENT" },
        { title: "sendHtmlPage(with_vars)", value: "sendHtmlPage", meta: "-- <function>", snippet: "sendHtmlPage(${1:})", description: "VITTA_SERVER_SERVER_SENDHTMLPAGE" },
        { title: "addCodeIntoHtml(fileName, headerScript)", value: "addCodeIntoHtml", meta: "-- <function>", snippet: "addCodeIntoHtml(${1:})", description: "VITTA_SERVER_SERVER_ADDCODEINTOHTML" },
        { title: "updateDataWithRequest()", value: "updateDataWithRequest", meta: "-- <function>", snippet: "updateDataWithRequest()", description: "VITTA_SERVER_SERVER_UPDATEDATAWITHREQUEST" },
        { title: "getValueById(id, default, isBoolean)", value: "getValueById", meta: "-- <function>", snippet: "getValueById(${1:})", description: "VITTA_SERVER_SERVER_GETVALUEBYID" },
        { title: "updateSwitchState(id)", value: "updateSwitchState", meta: "-- <function>", snippet: "updateSwitchState(${1:})", description: "VITTA_SERVER_SERVER_UPDATESWITCHSTATE" },
        { title: "sendVariables(vars)", value: "sendVariables", meta: "-- <function>", snippet: "sendVariables(${1:})", description: "VITTA_SERVER_SERVER_SENDVARIABLES" },
    ];

    tree.vitta_client = [
        { title: "CLIENT(port)", value: "CLIENT()", meta: "constructor", snippet: "CLIENT(${1:})", description: "VITTA_CLIENT_CLIENT", returns: "CLIENT" },
        { value: "CLIENT", description: "VITTA_CLIENT_CLIENT", content: [] },
    ];
    typeTree.CLIENT = [
        { title: "init(sta, ap)", value: "init", meta: "-- <function>", snippet: "init(${1:})", description: "VITTA_CLIENT_CLIENT_INIT" },
        { title: "waitingServer(ip)", value: "waitingServer", meta: "-- <function>", snippet: "waitingServer(${1:})", description: "VITTA_CLIENT_CLIENT_WAITINGSERVER" },
        { title: "manageSocket(ip)", value: "manageSocket", meta: "-- <function>", snippet: "manageSocket(${1:})", description: "VITTA_CLIENT_CLIENT_MANAGESOCKET" },
        { title: "getServerData(ip)", value: "getServerData", meta: "-- <function>", snippet: "getServerData(${1:})", description: "VITTA_CLIENT_CLIENT_GETSERVERDATA" },
        { title: "sendDataToServer(data, ip, port)", value: "sendDataToServer", meta: "-- <function>", snippet: "sendDataToServer(${1:})", description: "VITTA_CLIENT_CLIENT_SENDDATATOSERVER" },
        { title: "clearBufferData()", value: "clearBufferData", meta: "-- <function>", snippet: "clearBufferData()", description: "VITTA_CLIENT_CLIENT_CLEARBUFFERDATA" },
    ];

    tree.vitta_mqtt = [
        { title: "MACHINE_ID", value: "MACHINE_ID", description: "VITTA_MQTT_MACHINE_ID" },
        { title: "SimpleMQTTClient(broker, username, password, port, on_message, on_connect, on_disconnect)", value: "SimpleMQTTClient()", meta: "constructor", snippet: "SimpleMQTTClient(${1:broker}, ${2:username}, ${3:password}, ${4:port}, ${5:on_message}, ${6:on_connect}, ${7:on_disconnect})", description: "VITTA_MQTT_SIMPLEMQTTCLIENT", returns: "SimpleMQTTClient" },
        { value: "SimpleMQTTClient", description: "VITTA_MQTT_SIMPLEMQTTCLIENT", content: [] },
    ];
    typeTree.SimpleMQTTClient = [
        { title: "connectToBroker()", value: "connectToBroker", meta: "-- <function>", snippet: "connectToBroker()", description: "VITTA_MQTT_SIMPLEMQTTCLIENT_CONNECTTOBROKER" },
        { title: "disconnectFromBroker()", value: "disconnectFromBroker", meta: "-- <function>", snippet: "disconnectFromBroker()", description: "VITTA_MQTT_SIMPLEMQTTCLIENT_DISCONNECTFROMBROKER" },
        { title: "onMessageReceived_cb(topic, message)", value: "onMessageReceived_cb", meta: "-- <function>", snippet: "onMessageReceived_cb(${1:})", description: "VITTA_MQTT_SIMPLEMQTTCLIENT_ONMESSAGERECEIVED_CB" },
        { title: "subscribeTopic(topic)", value: "subscribeTopic", meta: "-- <function>", snippet: "subscribeTopic(${1:})", description: "VITTA_MQTT_SIMPLEMQTTCLIENT_SUBSCRIBETOPIC" },
        { title: "publishValue(topic, value)", value: "publishValue", meta: "-- <function>", snippet: "publishValue(${1:})", description: "VITTA_MQTT_SIMPLEMQTTCLIENT_PUBLISHVALUE" },
    ];

    tree.esp32_umail = [
        { title: "DEFAULT_TIMEOUT", value: "DEFAULT_TIMEOUT", description: "ESP32_UMAIL_DEFAULT_TIMEOUT" },
        { title: "LOCAL_DOMAIN", value: "LOCAL_DOMAIN", description: "ESP32_UMAIL_LOCAL_DOMAIN" },
        { title: "CMD_EHLO", value: "CMD_EHLO", description: "ESP32_UMAIL_CMD_EHLO" },
        { title: "CMD_STARTTLS", value: "CMD_STARTTLS", description: "ESP32_UMAIL_CMD_STARTTLS" },
        { title: "CMD_AUTH", value: "CMD_AUTH", description: "ESP32_UMAIL_CMD_AUTH" },
        { title: "CMD_MAIL", value: "CMD_MAIL", description: "ESP32_UMAIL_CMD_MAIL" },
        { title: "AUTH_PLAIN", value: "AUTH_PLAIN", description: "ESP32_UMAIL_AUTH_PLAIN" },
        { title: "AUTH_LOGIN", value: "AUTH_LOGIN", description: "ESP32_UMAIL_AUTH_LOGIN" },
        { title: "SMTP(host, port, ssl, username, password)", value: "SMTP()", meta: "constructor", snippet: "SMTP(${1:})", description: "ESP32_UMAIL_SMTP", returns: "SMTP" },
        { value: "SMTP", description: "ESP32_UMAIL_SMTP", content: [] },
    ];
    typeTree.SMTP = [
        { title: "cmd(cmd_str)", value: "cmd", meta: "-- <function>", snippet: "cmd(${1:})", description: "ESP32_UMAIL_SMTP_CMD", returns: "tuple" },
        { title: "login(username, password)", value: "login", meta: "-- <function>", snippet: "login(${1:})", description: "ESP32_UMAIL_SMTP_LOGIN", returns: "tuple" },
        { title: "to(addrs, mail_from)", value: "to", meta: "-- <function>", snippet: "to(${1:})", description: "ESP32_UMAIL_SMTP_TO", returns: "tuple" },
        { title: "write(content)", value: "write", meta: "-- <function>", snippet: "write(${1:})", description: "ESP32_UMAIL_SMTP_WRITE" },
        { title: "send(content)", value: "send", meta: "-- <function>", snippet: "send(${1:})", description: "ESP32_UMAIL_SMTP_SEND", returns: "tuple" },
        { title: "quit()", value: "quit", meta: "-- <function>", snippet: "quit()", description: "ESP32_UMAIL_SMTP_QUIT" },
    ];

    tree.esp32_ble = [
        { value: "_ADV_APPEARANCE_GENERIC_COMPUTER", description: "ESP32_BLE__ADV_APPEARANCE_GENERIC_COMPUTER" },
        { value: "_ADV_TYPE_APPEARANCE", description: "ESP32_BLE__ADV_TYPE_APPEARANCE" },
        { value: "_ADV_TYPE_FLAGS", description: "ESP32_BLE__ADV_TYPE_FLAGS" },
        { value: "_ADV_TYPE_NAME", description: "ESP32_BLE__ADV_TYPE_NAME" },
        { value: "_ADV_TYPE_UUID128_COMPLETE", description: "ESP32_BLE__ADV_TYPE_UUID128_COMPLETE" },
        { value: "_ADV_TYPE_UUID128_MORE", description: "ESP32_BLE__ADV_TYPE_UUID128_MORE" },
        { value: "_ADV_TYPE_UUID16_COMPLETE", description: "ESP32_BLE__ADV_TYPE_UUID16_COMPLETE" },
        { value: "_ADV_TYPE_UUID16_MORE", description: "ESP32_BLE__ADV_TYPE_UUID16_MORE" },
        { value: "_ADV_TYPE_UUID32_COMPLETE", description: "ESP32_BLE__ADV_TYPE_UUID32_COMPLETE" },
        { value: "_ADV_TYPE_UUID32_MORE", description: "ESP32_BLE__ADV_TYPE_UUID32_MORE" },
        { title: "advertising_payload(limited_disc=False, br_edr=False, name=None, services=None, appearance=0)", value: "advertising_payload", meta: "-- <function>", snippet: "advertising_payload(${1:})", description: "ESP32_BLE_ADVERTISING_PAYLOAD", returns: "bytearray" },
        { title: "decode_field(payload, adv_type)", value: "decode_field", meta: "-- <function>", snippet: "decode_field(${1:})", description: "ESP32_BLE_DECODE_FIELD", returns: "list[bytes]" },
        { title: "decode_name(payload)", value: "decode_name", meta: "-- <function>", snippet: "decode_name(${1:})", description: "ESP32_BLE_DECODE_NAME", returns: "str" },
        { title: "decode_services(payload)", value: "decode_services", meta: "-- <function>", snippet: "decode_services(${1:})", description: "ESP32_BLE_DECODE_SERVICES", returns: "list[UUID]" },
        { value: "BlueUart", meta: "esp32_ble", kind: "class", description: "ESP32_BLE_BLUEUART", content: [] },
        { title: "BlueUart(name, UUID_UART, UUID_TX, UUID_RX, rxbuf=100)", value: "BlueUart()", meta: "constructor", description: "ESP32_BLE_BLUEUART_CTOR", returns: "BlueUart", snippet: "BlueUart(${1:})" },
        { value: "__name__", meta: "esp32_ble", description: "ESP32_BLE_MODULE" }
    ];
    typeTree.BlueUart = [
        { title: "irq(handler)", value: "irq", meta: "-- <function>", snippet: "irq(${1:})", description: "ESP32_BLE_BLUEUART_IRQ", returns: "None" },
        { title: "_irq(event, data)", value: "_irq", meta: "-- <function>", snippet: "_irq(${1:})", description: "ESP32_BLE_BLUEUART__IRQ", returns: "None" },
        { title: "any()", value: "any", meta: "-- <function>", snippet: "any()", description: "ESP32_BLE_BLUEUART_ANY", returns: "int" },
        { title: "read(sz=None)", value: "read", meta: "-- <function>", snippet: "read(${1:})", description: "ESP32_BLE_BLUEUART_READ", returns: "bytearray" },
        { title: "write(data)", value: "write", meta: "-- <function>", snippet: "write(${1:})", description: "ESP32_BLE_BLUEUART_WRITE", returns: "None" },
        { title: "close()", value: "close", meta: "-- <function>", snippet: "close()", description: "ESP32_BLE_BLUEUART_CLOSE", returns: "None" },
        { title: "_advertise(interval_us=500000)", value: "_advertise", meta: "-- <function>", snippet: "_advertise(${1:})", description: "ESP32_BLE_BLUEUART__ADVERTISE", returns: "None" }
    ];

    tree.esp32_ble_uart = [
        { value: "_ADV_APPEARANCE_GENERIC_COMPUTER", description: "ESP32_BLE_UART__ADV_APPEARANCE_GENERIC_COMPUTER" },
        { value: "_ADV_TYPE_APPEARANCE", description: "ESP32_BLE_UART__ADV_TYPE_APPEARANCE" },
        { value: "_ADV_TYPE_FLAGS", description: "ESP32_BLE_UART__ADV_TYPE_FLAGS" },
        { value: "_ADV_TYPE_MANUFACTURER", description: "ESP32_BLE_UART__ADV_TYPE_MANUFACTURER" },
        { value: "_ADV_TYPE_NAME", description: "ESP32_BLE_UART__ADV_TYPE_NAME" },
        { value: "_ADV_TYPE_UUID128_COMPLETE", description: "ESP32_BLE_UART__ADV_TYPE_UUID128_COMPLETE" },
        { value: "_ADV_TYPE_UUID128_MORE", description: "ESP32_BLE_UART__ADV_TYPE_UUID128_MORE" },
        { value: "_ADV_TYPE_UUID16_COMPLETE", description: "ESP32_BLE_UART__ADV_TYPE_UUID16_COMPLETE" },
        { value: "_ADV_TYPE_UUID16_MORE", description: "ESP32_BLE_UART__ADV_TYPE_UUID16_MORE" },
        { value: "_ADV_TYPE_UUID32_COMPLETE", description: "ESP32_BLE_UART__ADV_TYPE_UUID32_COMPLETE" },
        { value: "_ADV_TYPE_UUID32_MORE", description: "ESP32_BLE_UART__ADV_TYPE_UUID32_MORE" },
        { value: "_FLAG_NOTIFY", description: "ESP32_BLE_UART__FLAG_NOTIFY" },
        { value: "_FLAG_WRITE", description: "ESP32_BLE_UART__FLAG_WRITE" },
        { value: "_IRQ_CENTRAL_CONNECT", description: "ESP32_BLE_UART__IRQ_CENTRAL_CONNECT" },
        { value: "_IRQ_CENTRAL_DISCONNECT", description: "ESP32_BLE_UART__IRQ_CENTRAL_DISCONNECT" },
        { value: "_IRQ_GATTS_WRITE", description: "ESP32_BLE_UART__IRQ_GATTS_WRITE" },
        { value: "_MAX_NB_BYTES", description: "ESP32_BLE_UART__MAX_NB_BYTES" },
        { value: "ascii_mac", meta: "esp32_ble_uart", description: "ESP32_BLE_UART_ascii_mac" },
        { title: "adv_payload(limited_disc=False, br_edr=False, name=None, services=None, appearance=0, manufacturer=0)", value: "adv_payload", meta: "-- <function>", snippet: "adv_payload(${1:})", description: "ESP32_BLE_UART_ADV_PAYLOAD", returns: "bytearray" },
        { title: "decode_field(payload, adv_type)", value: "decode_field", meta: "-- <function>", snippet: "decode_field(${1:})", description: "ESP32_BLE_UART_DECODE_FIELD", returns: "list[bytes]" },
        { title: "decode_name(payload)", value: "decode_name", meta: "-- <function>", snippet: "decode_name(${1:})", description: "ESP32_BLE_UART_DECODE_NAME", returns: "str" },
        { title: "decode_services(payload)", value: "decode_services", meta: "-- <function>", snippet: "decode_services(${1:})", description: "ESP32_BLE_UART_DECODE_SERVICES", returns: "list[UUID]" },
        { value: "UART_BLE", meta: "esp32_ble_uart", kind: "class", description: "ESP32_BLE_UART_UART_BLE", content: [] },
        { title: "UART_BLE(ble, name='ESP32-UART', rxbuf=_MAX_NB_BYTES)", value: "UART_BLE()", meta: "constructor", description: "ESP32_BLE_UART_UART_BLE_CTOR", returns: "UART_BLE", snippet: "UART_BLE(${1:})" },
        { value: "__name__", meta: "esp32_ble_uart", description: "ESP32_BLE_UART_MODULE" }
    ];
    typeTree.UART_BLE = [
        { title: "irq(handler)", value: "irq", meta: "-- <function>", snippet: "irq(${1:})", description: "ESP32_BLE_UART_UART_BLE_IRQ", returns: "None" },
        { title: "_irq(event, data)", value: "_irq", meta: "-- <function>", snippet: "_irq(${1:})", description: "ESP32_BLE_UART_UART_BLE__IRQ", returns: "None" },
        { title: "any()", value: "any", meta: "-- <function>", snippet: "any()", description: "ESP32_BLE_UART_UART_BLE_ANY", returns: "int" },
        { title: "read(sz=None)", value: "read", meta: "-- <function>", snippet: "read(${1:})", description: "ESP32_BLE_UART_UART_BLE_READ", returns: "bytearray" },
        { title: "write(data)", value: "write", meta: "-- <function>", snippet: "write(${1:})", description: "ESP32_BLE_UART_UART_BLE_WRITE", returns: "None" },
        { title: "close()", value: "close", meta: "-- <function>", snippet: "close()", description: "ESP32_BLE_UART_UART_BLE_CLOSE", returns: "None" },
        { title: "_advertise(interval_us=500000)", value: "_advertise", meta: "-- <function>", snippet: "_advertise(${1:})", description: "ESP32_BLE_UART_UART_BLE__ADVERTISE", returns: "None" }
    ];

    tree.esp32_bmp280 = [
        { value: "BMP280", meta: "esp32_bmp280", kind: "class", description: "ESP32_BMP280_BMP280", content: [] },
        { title: "BMP280(i2c, addr, use_case)", value: "BMP280()", meta: "constructor", snippet: "BMP280($1)", description: "ESP32_BMP280_BMP280_CTOR", returns: "BMP280" },
        { value: "BMP280_CASE_DROP", description: "ESP32_BMP280_BMP280_CASE_DROP" },
        { value: "BMP280_CASE_FLOOR", description: "ESP32_BMP280_BMP280_CASE_FLOOR" },
        { value: "BMP280_CASE_HANDHELD_DYN", description: "ESP32_BMP280_BMP280_CASE_HANDHELD_DYN" },
        { value: "BMP280_CASE_HANDHELD_LOW", description: "ESP32_BMP280_BMP280_CASE_HANDHELD_LOW" },
        { value: "BMP280_CASE_INDOOR", description: "ESP32_BMP280_BMP280_CASE_INDOOR" },
        { value: "BMP280_CASE_WEATHER", description: "ESP32_BMP280_BMP280_CASE_WEATHER" },
        { value: "BMP280_DEFAULT_I2C_ADDR", description: "ESP32_BMP280_BMP280_DEFAULT_I2_C_ADDR" },
        { value: "BMP280_IIR_FILTER_16", description: "ESP32_BMP280_BMP280_IIR_FILTER_16" },
        { value: "BMP280_IIR_FILTER_2", description: "ESP32_BMP280_BMP280_IIR_FILTER_2" },
        { value: "BMP280_IIR_FILTER_4", description: "ESP32_BMP280_BMP280_IIR_FILTER_4" },
        { value: "BMP280_IIR_FILTER_8", description: "ESP32_BMP280_BMP280_IIR_FILTER_8" },
        { value: "BMP280_IIR_FILTER_OFF", description: "ESP32_BMP280_BMP280_IIR_FILTER_OFF" },
        { value: "BMP280_OS_HIGH", description: "ESP32_BMP280_BMP280_OS_HIGH" },
        { value: "BMP280_OS_LOW", description: "ESP32_BMP280_BMP280_OS_LOW" },
        { value: "BMP280_OS_STANDARD", description: "ESP32_BMP280_BMP280_OS_STANDARD" },
        { value: "BMP280_OS_ULTRAHIGH", description: "ESP32_BMP280_BMP280_OS_ULTRAHIGH" },
        { value: "BMP280_OS_ULTRALOW", description: "ESP32_BMP280_BMP280_OS_ULTRALOW" },
        { value: "BMP280_POWER_FORCED", description: "ESP32_BMP280_BMP280_POWER_FORCED" },
        { value: "BMP280_POWER_NORMAL", description: "ESP32_BMP280_BMP280_POWER_NORMAL" },
        { value: "BMP280_POWER_SLEEP", description: "ESP32_BMP280_BMP280_POWER_SLEEP" },
        { value: "BMP280_PRES_OS_1", description: "ESP32_BMP280_BMP280_PRES_OS_1" },
        { value: "BMP280_PRES_OS_16", description: "ESP32_BMP280_BMP280_PRES_OS_16" },
        { value: "BMP280_PRES_OS_2", description: "ESP32_BMP280_BMP280_PRES_OS_2" },
        { value: "BMP280_PRES_OS_4", description: "ESP32_BMP280_BMP280_PRES_OS_4" },
        { value: "BMP280_PRES_OS_8", description: "ESP32_BMP280_BMP280_PRES_OS_8" },
        { value: "BMP280_PRES_OS_SKIP", description: "ESP32_BMP280_BMP280_PRES_OS_SKIP" },
        { value: "BMP280_SPI3W_OFF", description: "ESP32_BMP280_BMP280_SPI3_W_OFF" },
        { value: "BMP280_SPI3W_ON", description: "ESP32_BMP280_BMP280_SPI3_W_ON" },
        { value: "BMP280_STANDBY_0_5", description: "ESP32_BMP280_BMP280_STANDBY_0_5" },
        { value: "BMP280_STANDBY_1000", description: "ESP32_BMP280_BMP280_STANDBY_1000" },
        { value: "BMP280_STANDBY_125", description: "ESP32_BMP280_BMP280_STANDBY_125" },
        { value: "BMP280_STANDBY_2000", description: "ESP32_BMP280_BMP280_STANDBY_2000" },
        { value: "BMP280_STANDBY_250", description: "ESP32_BMP280_BMP280_STANDBY_250" },
        { value: "BMP280_STANDBY_4000", description: "ESP32_BMP280_BMP280_STANDBY_4000" },
        { value: "BMP280_STANDBY_500", description: "ESP32_BMP280_BMP280_STANDBY_500" },
        { value: "BMP280_STANDBY_62_5", description: "ESP32_BMP280_BMP280_STANDBY_62_5" },
        { value: "BMP280_TEMP_OS_1", description: "ESP32_BMP280_BMP280_TEMP_OS_1" },
        { value: "BMP280_TEMP_OS_16", description: "ESP32_BMP280_BMP280_TEMP_OS_16" },
        { value: "BMP280_TEMP_OS_2", description: "ESP32_BMP280_BMP280_TEMP_OS_2" },
        { value: "BMP280_TEMP_OS_4", description: "ESP32_BMP280_BMP280_TEMP_OS_4" },
        { value: "BMP280_TEMP_OS_8", description: "ESP32_BMP280_BMP280_TEMP_OS_8" },
        { value: "BMP280_TEMP_OS_SKIP", description: "ESP32_BMP280_BMP280_TEMP_OS_SKIP" },
        { value: "_BMP280_CASE_MATRIX", description: "ESP32_BMP280_BMP280_CASE_MATRIX" },
        { value: "_BMP280_OS_MATRIX", description: "ESP32_BMP280_BMP280_OS_MATRIX" },
        { value: "_BMP280_REGISTER_CONFIG", description: "ESP32_BMP280_BMP280_REGISTER_CONFIG" },
        { value: "_BMP280_REGISTER_CONTROL", description: "ESP32_BMP280_BMP280_REGISTER_CONTROL" },
        { value: "_BMP280_REGISTER_DATA", description: "ESP32_BMP280_BMP280_REGISTER_DATA" },
        { value: "_BMP280_REGISTER_ID", description: "ESP32_BMP280_BMP280_REGISTER_ID" },
        { value: "_BMP280_REGISTER_RESET", description: "ESP32_BMP280_BMP280_REGISTER_RESET" },
        { value: "_BMP280_REGISTER_STATUS", description: "ESP32_BMP280_BMP280_REGISTER_STATUS" },
        { value: "__name__", meta: "esp32_bmp280", description: "ESP32_BMP280_MODULE" }
    ];
    typeTree.BMP280 = [
        { title: "set_default_measure()", value: "set_default_measure", meta: "-- <function>", kind: "method", snippet: "set_default_measure()", description: "ESP32_BMP280_BMP280_SET_DEFAULT_MEASURE" },
        { title: "reset()", value: "reset", meta: "-- <function>", kind: "method", snippet: "reset()", description: "ESP32_BMP280_BMP280_RESET" },
        { title: "load_test_calibration()", value: "load_test_calibration", meta: "-- <function>", kind: "method", snippet: "load_test_calibration()", description: "ESP32_BMP280_BMP280_LOAD_TEST_CALIBRATION" },
        { title: "load_test_data()", value: "load_test_data", meta: "-- <function>", kind: "method", snippet: "load_test_data()", description: "ESP32_BMP280_BMP280_LOAD_TEST_DATA" },
        { title: "print_calibration()", value: "print_calibration", meta: "-- <function>", kind: "method", snippet: "print_calibration()", description: "ESP32_BMP280_BMP280_PRINT_CALIBRATION" },
        { title: "temperature()", value: "temperature", meta: "-- <function>", kind: "method", snippet: "temperature()", description: "ESP32_BMP280_BMP280_TEMPERATURE" },
        { title: "pressure()", value: "pressure", meta: "-- <function>", kind: "method", snippet: "pressure()", description: "ESP32_BMP280_BMP280_PRESSURE" },
        { title: "altitude()", value: "altitude", meta: "-- <function>", kind: "method", snippet: "altitude()", description: "ESP32_BMP280_BMP280_ALTITUDE" },
        { title: "standby()", value: "standby", meta: "-- <function>", kind: "method", snippet: "standby()", description: "ESP32_BMP280_BMP280_STANDBY" },
        { title: "standby(v)", value: "standby", meta: "-- <function>", kind: "method", snippet: "standby($1)", description: "ESP32_BMP280_BMP280_STANDBY" },
        { title: "iir()", value: "iir", meta: "-- <function>", kind: "method", snippet: "iir()", description: "ESP32_BMP280_BMP280_IIR" },
        { title: "iir(v)", value: "iir", meta: "-- <function>", kind: "method", snippet: "iir($1)", description: "ESP32_BMP280_BMP280_IIR" },
        { title: "spi3w()", value: "spi3w", meta: "-- <function>", kind: "method", snippet: "spi3w()", description: "ESP32_BMP280_BMP280_SPI3W" },
        { title: "spi3w(v)", value: "spi3w", meta: "-- <function>", kind: "method", snippet: "spi3w($1)", description: "ESP32_BMP280_BMP280_SPI3W" },
        { title: "temp_os()", value: "temp_os", meta: "-- <function>", kind: "method", snippet: "temp_os()", description: "ESP32_BMP280_BMP280_TEMP_OS" },
        { title: "temp_os(v)", value: "temp_os", meta: "-- <function>", kind: "method", snippet: "temp_os($1)", description: "ESP32_BMP280_BMP280_TEMP_OS" },
        { title: "press_os()", value: "press_os", meta: "-- <function>", kind: "method", snippet: "press_os()", description: "ESP32_BMP280_BMP280_PRESS_OS" },
        { title: "press_os(v)", value: "press_os", meta: "-- <function>", kind: "method", snippet: "press_os($1)", description: "ESP32_BMP280_BMP280_PRESS_OS" },
        { title: "power_mode()", value: "power_mode", meta: "-- <function>", kind: "method", snippet: "power_mode()", description: "ESP32_BMP280_BMP280_POWER_MODE" },
        { title: "power_mode(v)", value: "power_mode", meta: "-- <function>", kind: "method", snippet: "power_mode($1)", description: "ESP32_BMP280_BMP280_POWER_MODE" },
        { title: "is_measuring()", value: "is_measuring", meta: "-- <function>", kind: "method", snippet: "is_measuring()", description: "ESP32_BMP280_BMP280_IS_MEASURING" },
        { title: "is_updating()", value: "is_updating", meta: "-- <function>", kind: "method", snippet: "is_updating()", description: "ESP32_BMP280_BMP280_IS_UPDATING" },
        { title: "chip_id()", value: "chip_id", meta: "-- <function>", kind: "method", snippet: "chip_id()", description: "ESP32_BMP280_BMP280_CHIP_ID" },
        { title: "in_normal_mode()", value: "in_normal_mode", meta: "-- <function>", kind: "method", snippet: "in_normal_mode()", description: "ESP32_BMP280_BMP280_IN_NORMAL_MODE" },
        { title: "force_measure()", value: "force_measure", meta: "-- <function>", kind: "method", snippet: "force_measure()", description: "ESP32_BMP280_BMP280_FORCE_MEASURE" },
        { title: "normal_measure()", value: "normal_measure", meta: "-- <function>", kind: "method", snippet: "normal_measure()", description: "ESP32_BMP280_BMP280_NORMAL_MEASURE" },
        { title: "sleep()", value: "sleep", meta: "-- <function>", kind: "method", snippet: "sleep()", description: "ESP32_BMP280_BMP280_SLEEP" },
        { title: "use_case(uc)", value: "use_case", meta: "-- <function>", kind: "method", snippet: "use_case($1)", description: "ESP32_BMP280_BMP280_USE_CASE" },
        { title: "oversample(oss)", value: "oversample", meta: "-- <function>", kind: "method", snippet: "oversample($1)", description: "ESP32_BMP280_BMP280_OVERSAMPLE" },
        { value: "__class__", meta: "BMP280" },
        { value: "__name__", meta: "BMP280" },
        { value: "__dict__", meta: "BMP280" }
    ];

    tree.esp32_chainableLED = [
        { value: "P9813", meta: "esp32_chainableLED", kind: "class", description: "ESP32_CHAINABLE_LED_P9813", content: [] },
        { title: "P9813(pin_clk, pin_data, num_leds)", value: "P9813()", meta: "constructor", snippet: "P9813($1)", description: "ESP32_CHAINABLE_LED_P9813_CTOR", returns: "P9813" },
        { value: "__name__", meta: "esp32_chainableLED", description: "ESP32_CHAINABLE_LED_MODULE" }
    ];
    typeTree.P9813 = [
        { title: "fill(color)", value: "fill", meta: "-- <function>", kind: "method", snippet: "fill($1)", description: "ESP32_CHAINABLE_LED_P9813_FILL" },
        { title: "reset()", value: "reset", meta: "-- <function>", kind: "method", snippet: "reset()", description: "ESP32_CHAINABLE_LED_P9813_RESET" },
        { title: "write()", value: "write", meta: "-- <function>", kind: "method", snippet: "write()", description: "ESP32_CHAINABLE_LED_P9813_WRITE" },
        { value: "__class__", meta: "P9813" },
        { value: "__name__", meta: "P9813" },
        { value: "__dict__", meta: "P9813" }
    ];

    tree.esp32_colorSensor = [
        { value: "TCS34725", meta: "esp32_colorSensor", kind: "class", description: "ESP32_COLOR_SENSOR_TCS34725", content: [] },
        { title: "TCS34725(i2c, addr)", value: "TCS34725()", meta: "constructor", snippet: "TCS34725($1)", description: "ESP32_COLOR_SENSOR_TCS34725_CTOR", returns: "TCS34725" },
        { value: "_COMMAND_BIT", description: "ESP32_COLOR_SENSOR_COMMAND_BIT" },
        { value: "_CYCLES", description: "ESP32_COLOR_SENSOR_CYCLES" },
        { value: "_DS1307_DEFAULT_I2C_ADDR", description: "ESP32_COLOR_SENSOR_DS1307_DEFAULT_I2_C_ADDR" },
        { value: "_ENABLE_AEN", description: "ESP32_COLOR_SENSOR_ENABLE_AEN" },
        { value: "_ENABLE_AIEN", description: "ESP32_COLOR_SENSOR_ENABLE_AIEN" },
        { value: "_ENABLE_PON", description: "ESP32_COLOR_SENSOR_ENABLE_PON" },
        { value: "_ENABLE_WEN", description: "ESP32_COLOR_SENSOR_ENABLE_WEN" },
        { value: "_GAINS", description: "ESP32_COLOR_SENSOR_GAINS" },
        { value: "_REGISTER_AIHT", description: "ESP32_COLOR_SENSOR_REGISTER_AIHT" },
        { value: "_REGISTER_AILT", description: "ESP32_COLOR_SENSOR_REGISTER_AILT" },
        { value: "_REGISTER_APERS", description: "ESP32_COLOR_SENSOR_REGISTER_APERS" },
        { value: "_REGISTER_ATIME", description: "ESP32_COLOR_SENSOR_REGISTER_ATIME" },
        { value: "_REGISTER_BDATA", description: "ESP32_COLOR_SENSOR_REGISTER_BDATA" },
        { value: "_REGISTER_CDATA", description: "ESP32_COLOR_SENSOR_REGISTER_CDATA" },
        { value: "_REGISTER_CONTROL", description: "ESP32_COLOR_SENSOR_REGISTER_CONTROL" },
        { value: "_REGISTER_ENABLE", description: "ESP32_COLOR_SENSOR_REGISTER_ENABLE" },
        { value: "_REGISTER_GDATA", description: "ESP32_COLOR_SENSOR_REGISTER_GDATA" },
        { value: "_REGISTER_ID", description: "ESP32_COLOR_SENSOR_REGISTER_ID" },
        { value: "_REGISTER_RDATA", description: "ESP32_COLOR_SENSOR_REGISTER_RDATA" },
        { value: "_REGISTER_SENSORID", description: "ESP32_COLOR_SENSOR_REGISTER_SENSORID" },
        { value: "_REGISTER_STATUS", description: "ESP32_COLOR_SENSOR_REGISTER_STATUS" },
        { value: "__name__", meta: "esp32_colorSensor", description: "ESP32_COLOR_SENSOR_MODULE" }
    ];
    typeTree.TCS34725 = [
        { title: "active(value)", value: "active", meta: "-- <function>", kind: "method", snippet: "active($1)", description: "ESP32_COLOR_SENSOR_TCS34725_ACTIVE" },
        { title: "sensor_id()", value: "sensor_id", meta: "-- <function>", kind: "method", snippet: "sensor_id()", description: "ESP32_COLOR_SENSOR_TCS34725_SENSOR_ID" },
        { title: "integration_time(value)", value: "integration_time", meta: "-- <function>", kind: "method", snippet: "integration_time($1)", description: "ESP32_COLOR_SENSOR_TCS34725_INTEGRATION_TIME" },
        { title: "gain(value)", value: "gain", meta: "-- <function>", kind: "method", snippet: "gain($1)", description: "ESP32_COLOR_SENSOR_TCS34725_GAIN" },
        { title: "read(raw)", value: "read", meta: "-- <function>", kind: "method", snippet: "read($1)", description: "ESP32_COLOR_SENSOR_TCS34725_READ" },
        { title: "threshold(cycles, min_value, max_value)", value: "threshold", meta: "-- <function>", kind: "method", snippet: "threshold($1)", description: "ESP32_COLOR_SENSOR_TCS34725_THRESHOLD" },
        { title: "interrupt(value)", value: "interrupt", meta: "-- <function>", kind: "method", snippet: "interrupt($1)", description: "ESP32_COLOR_SENSOR_TCS34725_INTERRUPT" },
        { title: "html_rgb(data)", value: "html_rgb", meta: "-- <function>", kind: "method", snippet: "html_rgb($1)", description: "ESP32_COLOR_SENSOR_TCS34725_HTML_RGB" },
        { title: "html_hex(data)", value: "html_hex", meta: "-- <function>", kind: "method", snippet: "html_hex($1)", description: "ESP32_COLOR_SENSOR_TCS34725_HTML_HEX" },
        { value: "__class__", meta: "TCS34725" },
        { value: "__name__", meta: "TCS34725" },
        { value: "__dict__", meta: "TCS34725" }
    ];

    tree.esp32_ds1307 = [
        { value: "DS1307", meta: "esp32_ds1307", kind: "class", description: "ESP32_DS1307_DS1307", content: [] },
        { title: "DS1307(i2c, addr)", value: "DS1307()", meta: "constructor", snippet: "DS1307($1)", description: "ESP32_DS1307_DS1307_CTOR", returns: "DS1307" },
        { value: "DAY_OF_WEEK", description: "ESP32_DS1307_DAY_OF_WEEK" },
        { value: "RTC_CTRL_1", description: "ESP32_DS1307_RTC_CTRL_1" },
        { value: "RTC_CTRL_2", description: "ESP32_DS1307_RTC_CTRL_2" },
        { value: "RTC_DAY_ADDR", description: "ESP32_DS1307_RTC_DAY_ADDR" },
        { value: "RTC_HOUR_ADDR", description: "ESP32_DS1307_RTC_HOUR_ADDR" },
        { value: "RTC_MINUTE_ADDR", description: "ESP32_DS1307_RTC_MINUTE_ADDR" },
        { value: "RTC_MONTH_ADDR", description: "ESP32_DS1307_RTC_MONTH_ADDR" },
        { value: "RTC_SECOND_ADDR", description: "ESP32_DS1307_RTC_SECOND_ADDR" },
        { value: "RTC_V1_ADDRESS", description: "ESP32_DS1307_RTC_V1_ADDRESS" },
        { value: "RTC_WDAY_ADDR", description: "ESP32_DS1307_RTC_WDAY_ADDR" },
        { value: "RTC_YEAR_ADDR", description: "ESP32_DS1307_RTC_YEAR_ADDR" },
        { value: "__name__", meta: "esp32_ds1307", description: "ESP32_DS1307_MODULE" }
    ];
    typeTree.DS1307 = [
        { title: "decToBcd(val)", value: "decToBcd", meta: "-- <function>", kind: "method", snippet: "decToBcd($1)", description: "ESP32_DS1307_DS1307_DEC_TO_BCD" },
        { title: "bcdToDec(val)", value: "bcdToDec", meta: "-- <function>", kind: "method", snippet: "bcdToDec($1)", description: "ESP32_DS1307_DS1307_BCD_TO_DEC" },
        { title: "reset()", value: "reset", meta: "-- <function>", kind: "method", snippet: "reset()", description: "ESP32_DS1307_DS1307_RESET" },
        { title: "fillByHMS(hour, minute, second)", value: "fillByHMS", meta: "-- <function>", kind: "method", snippet: "fillByHMS($1)", description: "ESP32_DS1307_DS1307_FILL_BY_HMS" },
        { title: "fillByYMD(year, month, day)", value: "fillByYMD", meta: "-- <function>", kind: "method", snippet: "fillByYMD($1)", description: "ESP32_DS1307_DS1307_FILL_BY_YMD" },
        { title: "fillDayOfWeek(dayOfWeek)", value: "fillDayOfWeek", meta: "-- <function>", kind: "method", snippet: "fillDayOfWeek($1)", description: "ESP32_DS1307_DS1307_FILL_DAY_OF_WEEK" },
        { title: "startClock()", value: "startClock", meta: "-- <function>", kind: "method", snippet: "startClock()", description: "ESP32_DS1307_DS1307_START_CLOCK" },
        { title: "readTime()", value: "readTime", meta: "-- <function>", kind: "method", snippet: "readTime()", description: "ESP32_DS1307_DS1307_READ_TIME" },
        { value: "__class__", meta: "DS1307" },
        { value: "__name__", meta: "DS1307" },
        { value: "__dict__", meta: "DS1307" }
    ];

    tree.esp32_gas = [
        { value: "GAS", meta: "esp32_gas", kind: "class", description: "ESP32_GAS_GAS", content: [] },
        { title: "GAS(i2c, addr)", value: "GAS()", meta: "constructor", snippet: "GAS($1)", description: "ESP32_GAS_GAS_CTOR", returns: "GAS" },
        { value: "__name__", meta: "esp32_gas", description: "ESP32_GAS_MODULE" }
    ];
    typeTree.GAS = [
        { title: "cmd(cmd, nbytes)", value: "cmd", meta: "-- <function>", kind: "method", snippet: "cmd($1)", description: "ESP32_GAS_GAS_CMD" },
        { title: "get_version()", value: "get_version", meta: "-- <function>", kind: "method", snippet: "get_version()", description: "ESP32_GAS_GAS_GET_VERSION" },
        { title: "change_addr(new_addr)", value: "change_addr", meta: "-- <function>", kind: "method", snippet: "change_addr($1)", description: "ESP32_GAS_GAS_CHANGE_ADDR" },
        { title: "power_on()", value: "power_on", meta: "-- <function>", kind: "method", snippet: "power_on()", description: "ESP32_GAS_GAS_POWER_ON" },
        { title: "power_off()", value: "power_off", meta: "-- <function>", kind: "method", snippet: "power_off()", description: "ESP32_GAS_GAS_POWER_OFF" },
        { title: "led_on()", value: "led_on", meta: "-- <function>", kind: "method", snippet: "led_on()", description: "ESP32_GAS_GAS_LED_ON" },
        { title: "led_off()", value: "led_off", meta: "-- <function>", kind: "method", snippet: "led_off()", description: "ESP32_GAS_GAS_LED_OFF" },
        { title: "calc_gas(gas)", value: "calc_gas", meta: "-- <function>", kind: "method", snippet: "calc_gas($1)", description: "ESP32_GAS_GAS_CALC_GAS" },
        { title: "display_eeprom()", value: "display_eeprom", meta: "-- <function>", kind: "method", snippet: "display_eeprom()", description: "ESP32_GAS_GAS_DISPLAY_EEPROM" },
        { title: "do_calibrate()", value: "do_calibrate", meta: "-- <function>", kind: "method", snippet: "do_calibrate()", description: "ESP32_GAS_GAS_DO_CALIBRATE" },
        { title: "gas_dump()", value: "gas_dump", meta: "-- <function>", kind: "method", snippet: "gas_dump()", description: "ESP32_GAS_GAS_GAS_DUMP" },
        { value: "__class__", meta: "GAS" },
        { value: "__name__", meta: "GAS" },
        { value: "__dict__", meta: "GAS" }
    ];

    tree.esp32_gas_gmxxx = [
        { value: "GAS_GMXXX", meta: "esp32_gas_gmxxx", kind: "class", description: "ESP32_GAS_GMXXX_GAS_GMXXX", content: [] },
        { title: "GAS_GMXXX(addr)", value: "GAS_GMXXX()", meta: "constructor", snippet: "GAS_GMXXX($1)", description: "ESP32_GAS_GMXXX_GAS_GMXXX_CTOR", returns: "GAS_GMXXX" },
        { value: "__name__", meta: "esp32_gas_gmxxx", description: "ESP32_GAS_GMXXX_MODULE" }
    ];
    typeTree.GAS_GMXXX = [
        { title: "preheated()", value: "preheated", meta: "-- <function>", kind: "method", snippet: "preheated()", description: "ESP32_GAS_GMXXX_GAS_GMXXX_PREHEATED" },
        { title: "unPreheated()", value: "unPreheated", meta: "-- <function>", kind: "method", snippet: "unPreheated()", description: "ESP32_GAS_GMXXX_GAS_GMXXX_UN_PREHEATED" },
        { title: "measure(cmd)", value: "measure", meta: "-- <function>", kind: "method", snippet: "measure($1)", description: "ESP32_GAS_GMXXX_GAS_GMXXX_MEASURE" },
        { title: "measure_NO2()", value: "measure_NO2", meta: "-- <function>", kind: "method", snippet: "measure_NO2()", description: "ESP32_GAS_GMXXX_GAS_GMXXX_MEASURE_NO2" },
        { title: "measure_C2H5OH()", value: "measure_C2H5OH", meta: "-- <function>", kind: "method", snippet: "measure_C2H5OH()", description: "ESP32_GAS_GMXXX_GAS_GMXXX_MEASURE_C2_H5_OH" },
        { title: "measure_VOC()", value: "measure_VOC", meta: "-- <function>", kind: "method", snippet: "measure_VOC()", description: "ESP32_GAS_GMXXX_GAS_GMXXX_MEASURE_VOC" },
        { title: "measure_CO()", value: "measure_CO", meta: "-- <function>", kind: "method", snippet: "measure_CO()", description: "ESP32_GAS_GMXXX_GAS_GMXXX_MEASURE_CO" },
        { title: "changeAddr(addr)", value: "changeAddr", meta: "-- <function>", kind: "method", snippet: "changeAddr($1)", description: "ESP32_GAS_GMXXX_GAS_GMXXX_CHANGE_ADDR" },
        { title: "calcVol(adc)", value: "calcVol", meta: "-- <function>", kind: "method", snippet: "calcVol($1)", description: "ESP32_GAS_GMXXX_GAS_GMXXX_CALC_VOL" },
        { value: "__class__", meta: "GAS_GMXXX" },
        { value: "__name__", meta: "GAS_GMXXX" },
        { value: "__dict__", meta: "GAS_GMXXX" }
    ];

    tree.esp32_hm330x = [
        { value: "HM330X", meta: "esp32_hm330x", kind: "class", description: "ESP32_HM330X_HM330_X", content: [] },
        { title: "HM330X(i2c, addr)", value: "HM330X()", meta: "constructor", snippet: "HM330X($1)", description: "ESP32_HM330X_HM330_X_CTOR", returns: "HM330X" },
        { value: "HM330_I2C_ADDR", description: "ESP32_HM330X_HM330_I2_C_ADDR" },
        { value: "HM330_INIT", description: "ESP32_HM330X_HM330_INIT" },
        { value: "HM330_MEM_ADDR", description: "ESP32_HM330X_HM330_MEM_ADDR" },
        { value: "__name__", meta: "esp32_hm330x", description: "ESP32_HM330X_MODULE" }
    ];
    typeTree.HM330X = [
        { title: "read_data()", value: "read_data", meta: "-- <function>", kind: "method", snippet: "read_data()", description: "ESP32_HM330X_HM330_X_READ_DATA" },
        { title: "check_crc(data)", value: "check_crc", meta: "-- <function>", kind: "method", snippet: "check_crc($1)", description: "ESP32_HM330X_HM330_X_CHECK_CRC" },
        { title: "parse_data(data)", value: "parse_data", meta: "-- <function>", kind: "method", snippet: "parse_data($1)", description: "ESP32_HM330X_HM330_X_PARSE_DATA" },
        { title: "getData(select)", value: "getData", meta: "-- <function>", kind: "method", snippet: "getData($1)", description: "ESP32_HM330X_HM330_X_GET_DATA" },
        { value: "__class__", meta: "HM330X" },
        { value: "__name__", meta: "HM330X" },
        { value: "__dict__", meta: "HM330X" }
    ];

    tree.esp32_hp206c = [
        { value: "HP206C", meta: "esp32_hp206c", kind: "class", description: "ESP32_HP206C_HP206_C", content: [] },
        { title: "HP206C(i2c, address)", value: "HP206C()", meta: "constructor", snippet: "HP206C($1)", description: "ESP32_HP206C_HP206_C_CTOR", returns: "HP206C" },
        { value: "__name__", meta: "esp32_hp206c", description: "ESP32_HP206C_MODULE" }
    ];
    typeTree.HP206C = [
        { title: "read_temperature_and_pressure()", value: "read_temperature_and_pressure", meta: "-- <function>", kind: "method", snippet: "read_temperature_and_pressure()", description: "ESP32_HP206C_HP206_C_READ_TEMPERATURE_AND_PRESSURE" },
        { title: "read_altitude()", value: "read_altitude", meta: "-- <function>", kind: "method", snippet: "read_altitude()", description: "ESP32_HP206C_HP206_C_READ_ALTITUDE" },
        { title: "get_measurement(data_type)", value: "get_measurement", meta: "-- <function>", kind: "method", snippet: "get_measurement($1)", description: "ESP32_HP206C_HP206_C_GET_MEASUREMENT" },
        { value: "__class__", meta: "HP206C" },
        { value: "__name__", meta: "HP206C" },
        { value: "__dict__", meta: "HP206C" }
    ];

    tree.esp32_lcd_i2c = [
        { value: "LCD1602", meta: "esp32_lcd_i2c", kind: "class", description: "ESP32_LCD_I2C_LCD1602", content: [] },
        { title: "LCD1602(i2c, addr)", value: "LCD1602()", meta: "constructor", snippet: "LCD1602($1)", description: "ESP32_LCD_I2C_LCD1602_CTOR", returns: "LCD1602" },
        { value: "LCD_1LINE", description: "ESP32_LCD_I2C_LCD_1_LINE" },
        { value: "LCD_2LINE", description: "ESP32_LCD_I2C_LCD_2_LINE" },
        { value: "LCD_4BITMODE", description: "ESP32_LCD_I2C_LCD_4_BITMODE" },
        { value: "LCD_8BITMODE", description: "ESP32_LCD_I2C_LCD_8_BITMODE" },
        { value: "LCD_BLINKOFF", description: "ESP32_LCD_I2C_LCD_BLINKOFF" },
        { value: "LCD_BLINKON", description: "ESP32_LCD_I2C_LCD_BLINKON" },
        { value: "LCD_CLEARDISPLAY", description: "ESP32_LCD_I2C_LCD_CLEARDISPLAY" },
        { value: "LCD_COMMAND", description: "ESP32_LCD_I2C_LCD_COMMAND" },
        { value: "LCD_CURSORMOVE", description: "ESP32_LCD_I2C_LCD_CURSORMOVE" },
        { value: "LCD_CURSOROFF", description: "ESP32_LCD_I2C_LCD_CURSOROFF" },
        { value: "LCD_CURSORON", description: "ESP32_LCD_I2C_LCD_CURSORON" },
        { value: "LCD_CURSORSHIFT", description: "ESP32_LCD_I2C_LCD_CURSORSHIFT" },
        { value: "LCD_DISPLAYCONTROL", description: "ESP32_LCD_I2C_LCD_DISPLAYCONTROL" },
        { value: "LCD_DISPLAYMOVE", description: "ESP32_LCD_I2C_LCD_DISPLAYMOVE" },
        { value: "LCD_DISPLAYOFF", description: "ESP32_LCD_I2C_LCD_DISPLAYOFF" },
        { value: "LCD_DISPLAYON", description: "ESP32_LCD_I2C_LCD_DISPLAYON" },
        { value: "LCD_ENTRYLEFT", description: "ESP32_LCD_I2C_LCD_ENTRYLEFT" },
        { value: "LCD_ENTRYMODESET", description: "ESP32_LCD_I2C_LCD_ENTRYMODESET" },
        { value: "LCD_ENTRYRIGHT", description: "ESP32_LCD_I2C_LCD_ENTRYRIGHT" },
        { value: "LCD_ENTRYSHIFTDECREMENT", description: "ESP32_LCD_I2C_LCD_ENTRYSHIFTDECREMENT" },
        { value: "LCD_ENTRYSHIFTINCREMENT", description: "ESP32_LCD_I2C_LCD_ENTRYSHIFTINCREMENT" },
        { value: "LCD_FUNCTIONSET", description: "ESP32_LCD_I2C_LCD_FUNCTIONSET" },
        { value: "LCD_I2C_ADDR", description: "ESP32_LCD_I2C_LCD_I2_C_ADDR" },
        { value: "LCD_MOVELEFT", description: "ESP32_LCD_I2C_LCD_MOVELEFT" },
        { value: "LCD_MOVERIGHT", description: "ESP32_LCD_I2C_LCD_MOVERIGHT" },
        { value: "LCD_RETURNHOME", description: "ESP32_LCD_I2C_LCD_RETURNHOME" },
        { value: "LCD_SETCGRAMADDR", description: "ESP32_LCD_I2C_LCD_SETCGRAMADDR" },
        { value: "LCD_SETDDRAMADDR", description: "ESP32_LCD_I2C_LCD_SETDDRAMADDR" },
        { value: "__name__", meta: "esp32_lcd_i2c", description: "ESP32_LCD_I2C_MODULE" }
    ];
    typeTree.LCD1602 = [
        { title: "writeTxt(text)", value: "writeTxt", meta: "-- <function>", kind: "method", snippet: "writeTxt($1)", description: "ESP32_LCD_I2C_LCD1602_WRITE_TXT" },
        { title: "write_char(char)", value: "write_char", meta: "-- <function>", kind: "method", snippet: "write_char($1)", description: "ESP32_LCD_I2C_LCD1602_WRITE_CHAR" },
        { title: "setCursor(x, y)", value: "setCursor", meta: "-- <function>", kind: "method", snippet: "setCursor($1)", description: "ESP32_LCD_I2C_LCD1602_SET_CURSOR" },
        { title: "display(s)", value: "display", meta: "-- <function>", kind: "method", snippet: "display($1)", description: "ESP32_LCD_I2C_LCD1602_DISPLAY" },
        { title: "cursor(s)", value: "cursor", meta: "-- <function>", kind: "method", snippet: "cursor($1)", description: "ESP32_LCD_I2C_LCD1602_CURSOR" },
        { title: "home()", value: "home", meta: "-- <function>", kind: "method", snippet: "home()", description: "ESP32_LCD_I2C_LCD1602_HOME" },
        { title: "clear()", value: "clear", meta: "-- <function>", kind: "method", snippet: "clear()", description: "ESP32_LCD_I2C_LCD1602_CLEAR" },
        { value: "__class__", meta: "LCD1602" },
        { value: "__name__", meta: "LCD1602" },
        { value: "__dict__", meta: "LCD1602" }
    ];

    tree.esp32_mpu6050 = [
        { title: "signedIntFromBytes(x, endian)", value: "signedIntFromBytes", meta: "-- <function>", snippet: "signedIntFromBytes($1)", description: "ESP32_MPU6050_SIGNED_INT_FROM_BYTES" },
        { value: "MPU6050", meta: "esp32_mpu6050", kind: "class", description: "ESP32_MPU6050_MPU6050", content: [] },
        { title: "MPU6050(bus, i2c, addr = 0x68)", value: "MPU6050()", meta: "constructor", snippet: "MPU6050($1)", description: "ESP32_MPU6050_MPU6050_CTOR", returns: "MPU6050" },
        { value: "_ACCEL_CONFIG", description: "ESP32_MPU6050_ACCEL_CONFIG" },
        { value: "_ACCEL_XOUT0", description: "ESP32_MPU6050_ACCEL_XOUT0" },
        { value: "_ACC_RNG_16G", description: "ESP32_MPU6050_ACC_RNG_16_G" },
        { value: "_ACC_RNG_2G", description: "ESP32_MPU6050_ACC_RNG_2_G" },
        { value: "_ACC_RNG_4G", description: "ESP32_MPU6050_ACC_RNG_4_G" },
        { value: "_ACC_RNG_8G", description: "ESP32_MPU6050_ACC_RNG_8_G" },
        { value: "_ACC_SCLR_16G", description: "ESP32_MPU6050_ACC_SCLR_16_G" },
        { value: "_ACC_SCLR_2G", description: "ESP32_MPU6050_ACC_SCLR_2_G" },
        { value: "_ACC_SCLR_4G", description: "ESP32_MPU6050_ACC_SCLR_4_G" },
        { value: "_ACC_SCLR_8G", description: "ESP32_MPU6050_ACC_SCLR_8_G" },
        { value: "_GRAVITIY_MS2", description: "ESP32_MPU6050_GRAVITIY_MS2" },
        { value: "_GYRO_CONFIG", description: "ESP32_MPU6050_GYRO_CONFIG" },
        { value: "_GYRO_XOUT0", description: "ESP32_MPU6050_GYRO_XOUT0" },
        { value: "_GYR_RNG_1000DEG", description: "ESP32_MPU6050_GYR_RNG_1000_DEG" },
        { value: "_GYR_RNG_2000DEG", description: "ESP32_MPU6050_GYR_RNG_2000_DEG" },
        { value: "_GYR_RNG_250DEG", description: "ESP32_MPU6050_GYR_RNG_250_DEG" },
        { value: "_GYR_RNG_500DEG", description: "ESP32_MPU6050_GYR_RNG_500_DEG" },
        { value: "_GYR_SCLR_1000DEG", description: "ESP32_MPU6050_GYR_SCLR_1000_DEG" },
        { value: "_GYR_SCLR_2000DEG", description: "ESP32_MPU6050_GYR_SCLR_2000_DEG" },
        { value: "_GYR_SCLR_250DEG", description: "ESP32_MPU6050_GYR_SCLR_250_DEG" },
        { value: "_GYR_SCLR_500DEG", description: "ESP32_MPU6050_GYR_SCLR_500_DEG" },
        { value: "_MPU6050_ADDRESS", description: "ESP32_MPU6050_MPU6050_ADDRESS" },
        { value: "_PWR_MGMT_1", description: "ESP32_MPU6050_PWR_MGMT_1" },
        { value: "_TEMP_OUT0", description: "ESP32_MPU6050_TEMP_OUT0" },
        { value: "__name__", meta: "esp32_mpu6050", description: "ESP32_MPU6050_MODULE" }
    ];
    typeTree.MPU6050 = [
        { title: "read_temperature()", value: "read_temperature", meta: "-- <function>", kind: "method", snippet: "read_temperature()", description: "ESP32_MPU6050_MPU6050_READ_TEMPERATURE" },
        { title: "set_accel_range(accel_range)", value: "set_accel_range", meta: "-- <function>", kind: "method", snippet: "set_accel_range($1)", description: "ESP32_MPU6050_MPU6050_SET_ACCEL_RANGE" },
        { title: "get_accel_range(raw)", value: "get_accel_range", meta: "-- <function>", kind: "method", snippet: "get_accel_range($1)", description: "ESP32_MPU6050_MPU6050_GET_ACCEL_RANGE" },
        { title: "read_accel_data(g)", value: "read_accel_data", meta: "-- <function>", kind: "method", snippet: "read_accel_data($1)", description: "ESP32_MPU6050_MPU6050_READ_ACCEL_DATA" },
        { title: "read_accel_abs(g)", value: "read_accel_abs", meta: "-- <function>", kind: "method", snippet: "read_accel_abs($1)", description: "ESP32_MPU6050_MPU6050_READ_ACCEL_ABS" },
        { title: "set_gyro_range(gyro_range)", value: "set_gyro_range", meta: "-- <function>", kind: "method", snippet: "set_gyro_range($1)", description: "ESP32_MPU6050_MPU6050_SET_GYRO_RANGE" },
        { title: "get_gyro_range(raw)", value: "get_gyro_range", meta: "-- <function>", kind: "method", snippet: "get_gyro_range($1)", description: "ESP32_MPU6050_MPU6050_GET_GYRO_RANGE" },
        { title: "read_gyro_data()", value: "read_gyro_data", meta: "-- <function>", kind: "method", snippet: "read_gyro_data()", description: "ESP32_MPU6050_MPU6050_READ_GYRO_DATA" },
        { title: "read_angle()", value: "read_angle", meta: "-- <function>", kind: "method", snippet: "read_angle()", description: "ESP32_MPU6050_MPU6050_READ_ANGLE" },
        { value: "__class__", meta: "MPU6050" },
        { value: "__name__", meta: "MPU6050" },
        { value: "__dict__", meta: "MPU6050" }
    ];

    tree.esp32_my9221 = [
        { value: "MY9221", meta: "esp32_my9221", kind: "class", description: "ESP32_MY9221_MY9221", content: [] },
        { title: "MY9221(di, dcki, reverse)", value: "MY9221()", meta: "constructor", snippet: "MY9221($1)", description: "ESP32_MY9221_MY9221_CTOR", returns: "MY9221" },
        { value: "__name__", meta: "esp32_my9221", description: "ESP32_MY9221_MODULE" }
    ];
    typeTree.MY9221 = [
        { title: "reverse(val)", value: "reverse", meta: "-- <function>", kind: "method", snippet: "reverse($1)", description: "ESP32_MY9221_MY9221_REVERSE" },
        { title: "level(val, brightness)", value: "level", meta: "-- <function>", kind: "method", snippet: "level($1)", description: "ESP32_MY9221_MY9221_LEVEL" },
        { title: "bits(val, brightness)", value: "bits", meta: "-- <function>", kind: "method", snippet: "bits($1)", description: "ESP32_MY9221_MY9221_BITS" },
        { title: "bytes(buf)", value: "bytes", meta: "-- <function>", kind: "method", snippet: "bytes($1)", description: "ESP32_MY9221_MY9221_BYTES" },
        { value: "__class__", meta: "MY9221" },
        { value: "__name__", meta: "MY9221" },
        { value: "__dict__", meta: "MY9221" }
    ];

    tree.esp32_paj7620 = [
        { value: "ANTI_CLOCKWISE", meta: "esp32_paj7620", description: "ESP32_PAJ7620_ANTI_CLOCKWISE" },
        { value: "BACKWARD", meta: "esp32_paj7620", description: "ESP32_PAJ7620_BACKWARD" },
        { value: "BANK0", meta: "esp32_paj7620", description: "ESP32_PAJ7620_BANK0" },
        { value: "BANK1", meta: "esp32_paj7620", description: "ESP32_PAJ7620_BANK1" },
        { value: "CLOCKWISE", meta: "esp32_paj7620", description: "ESP32_PAJ7620_CLOCKWISE" },
        { value: "DOWN", meta: "esp32_paj7620", description: "ESP32_PAJ7620_DOWN" },
        { value: "FORWARD", meta: "esp32_paj7620", description: "ESP32_PAJ7620_FORWARD" },
        { value: "GES_BACKWARD_FLAG", meta: "esp32_paj7620", description: "ESP32_PAJ7620_GES_BACKWARD_FLAG" },
        { value: "GES_CLOCKWISE_FLAG", meta: "esp32_paj7620", description: "ESP32_PAJ7620_GES_CLOCKWISE_FLAG" },
        { value: "GES_COUNT_CLOCKWISE_FLAG", meta: "esp32_paj7620", description: "ESP32_PAJ7620_GES_COUNT_CLOCKWISE_FLAG" },
        { value: "GES_DOWN_FLAG", meta: "esp32_paj7620", description: "ESP32_PAJ7620_GES_DOWN_FLAG" },
        { value: "GES_ENTRY_TIME", meta: "esp32_paj7620", description: "ESP32_PAJ7620_GES_ENTRY_TIME" },
        { value: "GES_FORWARD_FLAG", meta: "esp32_paj7620", description: "ESP32_PAJ7620_GES_FORWARD_FLAG" },
        { value: "GES_LEFT_FLAG", meta: "esp32_paj7620", description: "ESP32_PAJ7620_GES_LEFT_FLAG" },
        { value: "GES_REACTION_TIME", meta: "esp32_paj7620", description: "ESP32_PAJ7620_GES_REACTION_TIME" },
        { value: "GES_RIGHT_FLAG", meta: "esp32_paj7620", description: "ESP32_PAJ7620_GES_RIGHT_FLAG" },
        { value: "GES_UP_FLAG", meta: "esp32_paj7620", description: "ESP32_PAJ7620_GES_UP_FLAG" },
        { value: "GES_WAVE_FLAG", meta: "esp32_paj7620", description: "ESP32_PAJ7620_GES_WAVE_FLAG" },
        { value: "LEFT", meta: "esp32_paj7620", description: "ESP32_PAJ7620_LEFT" },
        { value: "NOTHING", meta: "esp32_paj7620", description: "ESP32_PAJ7620_NOTHING" },
        { value: "PAJ7620_ADDR_BASE", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_BASE" },
        { value: "PAJ7620_ADDR_GES_PS_DET_FLAG_0", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_GES_PS_DET_FLAG_0" },
        { value: "PAJ7620_ADDR_GES_PS_DET_FLAG_1", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_GES_PS_DET_FLAG_1" },
        { value: "PAJ7620_ADDR_GES_PS_DET_MASK_0", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_GES_PS_DET_MASK_0" },
        { value: "PAJ7620_ADDR_GES_PS_DET_MASK_1", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_GES_PS_DET_MASK_1" },
        { value: "PAJ7620_ADDR_IDLE_S1_STEP_0", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_IDLE_S1_STEP_0" },
        { value: "PAJ7620_ADDR_IDLE_S1_STEP_1", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_IDLE_S1_STEP_1" },
        { value: "PAJ7620_ADDR_IDLE_S2_STEP_0", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_IDLE_S2_STEP_0" },
        { value: "PAJ7620_ADDR_IDLE_S2_STEP_1", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_IDLE_S2_STEP_1" },
        { value: "PAJ7620_ADDR_OPERATION_ENABLE", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_OPERATION_ENABLE" },
        { value: "PAJ7620_ADDR_OP_TO_S1_STEP_0", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_OP_TO_S1_STEP_0" },
        { value: "PAJ7620_ADDR_OP_TO_S1_STEP_1", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_OP_TO_S1_STEP_1" },
        { value: "PAJ7620_ADDR_OP_TO_S2_STEP_0", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_OP_TO_S2_STEP_0" },
        { value: "PAJ7620_ADDR_OP_TO_S2_STEP_1", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_OP_TO_S2_STEP_1" },
        { value: "PAJ7620_ADDR_PS_APPROACH_STATE", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_PS_APPROACH_STATE" },
        { value: "PAJ7620_ADDR_PS_GAIN", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_PS_GAIN" },
        { value: "PAJ7620_ADDR_PS_HIGH_THRESHOLD", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_PS_HIGH_THRESHOLD" },
        { value: "PAJ7620_ADDR_PS_LOW_THRESHOLD", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_PS_LOW_THRESHOLD" },
        { value: "PAJ7620_ADDR_PS_RAW_DATA", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_PS_RAW_DATA" },
        { value: "PAJ7620_ADDR_STATE_INDICATOR", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_STATE_INDICATOR" },
        { value: "PAJ7620_ADDR_SUSPEND_CMD", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_ADDR_SUSPEND_CMD" },
        { value: "PAJ7620_BANK0", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_BANK0" },
        { value: "PAJ7620_BANK1", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_BANK1" },
        { value: "PAJ7620_DEFAULT_I2C_ADDR", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_DEFAULT_I2C_ADDR" },
        { value: "PAJ7620_REGISTER_BANK_SEL", meta: "esp32_paj7620", description: "ESP32_PAJ7620_PAJ7620_REGISTER_BANK_SEL" },
        { value: "RIGHT", meta: "esp32_paj7620", description: "ESP32_PAJ7620_RIGHT" },
        { value: "UP", meta: "esp32_paj7620", description: "ESP32_PAJ7620_UP" },
        { value: "WAVE", meta: "esp32_paj7620", description: "ESP32_PAJ7620_WAVE" },
        { value: "initRegisterArray", meta: "esp32_paj7620", description: "ESP32_PAJ7620_INITREGISTERARRAY" },
        { value: "PAJ7620", meta: "esp32_paj7620", kind: "class", description: "ESP32_PAJ7620_PAJ7620" },
        { title: "PAJ7620()(i2c, addr=PAJ7620_DEFAULT_I2C_ADDR)", value: "PAJ7620()", meta: "constructor", snippet: "PAJ7620($1)", description: "ESP32_PAJ7620_PAJ7620", returns: "PAJ7620" },
        { value: "__name__", meta: "esp32_paj7620", description: "ESP32_PAJ7620_MODULE" }
    ];
    typeTree.PAJ7620 = [
        { title: "paj7620WriteReg(addr, cmd)", value: "paj7620WriteReg", meta: "-- <function>", snippet: "paj7620WriteReg($1)", description: "ESP32_PAJ7620_PAJ7620_PAJ7620WRITEREG" },
        { title: "paj7620SelectBank(bank)", value: "paj7620SelectBank", meta: "-- <function>", snippet: "paj7620SelectBank($1)", description: "ESP32_PAJ7620_PAJ7620_PAJ7620SELECTBANK" },
        { title: "paj7620ReadReg(addr, size)", value: "paj7620ReadReg", meta: "-- <function>", snippet: "paj7620ReadReg($1)", description: "ESP32_PAJ7620_PAJ7620_PAJ7620READREG", returns: "readfrom_mem" },
        { title: "gesture()", value: "gesture", meta: "-- <function>", snippet: "gesture()", description: "ESP32_PAJ7620_PAJ7620_GESTURE" }
    ];

    tree.esp32_pcf85063tp = [
        { value: "DAY_OF_WEEK", meta: "esp32_pcf85063tp", description: "ESP32_PCF85063TP_DAY_OF_WEEK" },
        { value: "RTC_CTRL_1", meta: "esp32_pcf85063tp", description: "ESP32_PCF85063TP_RTC_CTRL_1" },
        { value: "RTC_CTRL_2", meta: "esp32_pcf85063tp", description: "ESP32_PCF85063TP_RTC_CTRL_2" },
        { value: "RTC_DAY_ADDR", meta: "esp32_pcf85063tp", description: "ESP32_PCF85063TP_RTC_DAY_ADDR" },
        { value: "RTC_HOUR_ADDR", meta: "esp32_pcf85063tp", description: "ESP32_PCF85063TP_RTC_HOUR_ADDR" },
        { value: "RTC_HP_ADDRESS", meta: "esp32_pcf85063tp", description: "ESP32_PCF85063TP_RTC_HP_ADDRESS" },
        { value: "RTC_MINUTE_ADDR", meta: "esp32_pcf85063tp", description: "ESP32_PCF85063TP_RTC_MINUTE_ADDR" },
        { value: "RTC_MONTH_ADDR", meta: "esp32_pcf85063tp", description: "ESP32_PCF85063TP_RTC_MONTH_ADDR" },
        { value: "RTC_OFFSET", meta: "esp32_pcf85063tp", description: "ESP32_PCF85063TP_RTC_OFFSET" },
        { value: "RTC_RAM_by", meta: "esp32_pcf85063tp", description: "ESP32_PCF85063TP_RTC_RAM_BY" },
        { value: "RTC_SECOND_ADDR", meta: "esp32_pcf85063tp", description: "ESP32_PCF85063TP_RTC_SECOND_ADDR" },
        { value: "RTC_WDAY_ADDR", meta: "esp32_pcf85063tp", description: "ESP32_PCF85063TP_RTC_WDAY_ADDR" },
        { value: "RTC_YEAR_ADDR", meta: "esp32_pcf85063tp", description: "ESP32_PCF85063TP_RTC_YEAR_ADDR" },
        { value: "RTC_HP", meta: "esp32_pcf85063tp", kind: "class", description: "ESP32_PCF85063TP_RTC_HP" },
        { title: "RTC_HP()(i2c, addr=RTC_HP_ADDRESS)", value: "RTC_HP()", meta: "constructor", snippet: "RTC_HP($1)", description: "ESP32_PCF85063TP_RTC_HP", returns: "RTC_HP" },
        { value: "__name__", meta: "esp32_pcf85063tp", description: "ESP32_PCF85063TP_MODULE" }
    ];
    typeTree.RTC_HP = [
        { title: "decToBcd(val)", value: "decToBcd", meta: "-- <function>", snippet: "decToBcd($1)", description: "ESP32_PCF85063TP_RTC_HP_DECTOBCD" },
        { title: "bcdToDec(val)", value: "bcdToDec", meta: "-- <function>", snippet: "bcdToDec($1)", description: "ESP32_PCF85063TP_RTC_HP_BCDTODEC" },
        { title: "reset()", value: "reset", meta: "-- <function>", snippet: "reset()", description: "ESP32_PCF85063TP_RTC_HP_RESET" },
        { title: "fillByHMS(hour, minute, second)", value: "fillByHMS", meta: "-- <function>", snippet: "fillByHMS($1)", description: "ESP32_PCF85063TP_RTC_HP_FILLBYHMS" },
        { title: "fillByYMD(year, month, day)", value: "fillByYMD", meta: "-- <function>", snippet: "fillByYMD($1)", description: "ESP32_PCF85063TP_RTC_HP_FILLBYYMD" },
        { title: "fillDayOfWeek(dayOfWeek)", value: "fillDayOfWeek", meta: "-- <function>", snippet: "fillDayOfWeek($1)", description: "ESP32_PCF85063TP_RTC_HP_FILLDAYOFWEEK" },
        { title: "startClock()", value: "startClock", meta: "-- <function>", snippet: "startClock()", description: "ESP32_PCF85063TP_RTC_HP_STARTCLOCK" },
        { title: "readTime()", value: "readTime", meta: "-- <function>", snippet: "readTime()", description: "ESP32_PCF85063TP_RTC_HP_READTIME", returns: "tuple" }
    ];

    tree.esp32_scd30 = [
        { value: "_SCD30_DEFAULT_I2C_ADDR", meta: "esp32_scd30", description: "ESP32_SCD30__SCD30_DEFAULT_I2C_ADDR" },
        { value: "SCD30", meta: "esp32_scd30", kind: "class", description: "ESP32_SCD30_SCD30" },
        { title: "SCD30()(i2c, addr=_SCD30_DEFAULT_I2C_ADDR, pause=1000)", value: "SCD30()", meta: "constructor", snippet: "SCD30($1)", description: "ESP32_SCD30_SCD30", returns: "SCD30" },
        { value: "__name__", meta: "esp32_scd30", description: "ESP32_SCD30_MODULE" }
    ];
    typeTree.SCD30 = [
        { title: "start_continous_measurement(ambient_pressure=0)", value: "start_continous_measurement", meta: "-- <function>", snippet: "start_continous_measurement($1)", description: "ESP32_SCD30_SCD30_START_CONTINOUS_MEASUREMENT" },
        { title: "stop_continous_measurement()", value: "stop_continous_measurement", meta: "-- <function>", snippet: "stop_continous_measurement()", description: "ESP32_SCD30_SCD30_STOP_CONTINOUS_MEASUREMENT" },
        { title: "soft_reset()", value: "soft_reset", meta: "-- <function>", snippet: "soft_reset()", description: "ESP32_SCD30_SCD30_SOFT_RESET" },
        { title: "get_firmware_version()", value: "get_firmware_version", meta: "-- <function>", snippet: "get_firmware_version()", description: "ESP32_SCD30_SCD30_GET_FIRMWARE_VERSION", returns: "unpack" },
        { title: "read_measurement()", value: "read_measurement", meta: "-- <function>", snippet: "read_measurement()", description: "ESP32_SCD30_SCD30_READ_MEASUREMENT", returns: "tuple" },
        { title: "get_status_ready()", value: "get_status_ready", meta: "-- <function>", snippet: "get_status_ready()", description: "ESP32_SCD30_SCD30_GET_STATUS_READY" },
        { title: "get_measurement_interval()", value: "get_measurement_interval", meta: "-- <function>", snippet: "get_measurement_interval()", description: "ESP32_SCD30_SCD30_GET_MEASUREMENT_INTERVAL" },
        { title: "set_measurement_interval(interval)", value: "set_measurement_interval", meta: "-- <function>", snippet: "set_measurement_interval($1)", description: "ESP32_SCD30_SCD30_SET_MEASUREMENT_INTERVAL" },
        { title: "get_automatic_recalibration()", value: "get_automatic_recalibration", meta: "-- <function>", snippet: "get_automatic_recalibration()", description: "ESP32_SCD30_SCD30_GET_AUTOMATIC_RECALIBRATION" },
        { title: "set_automatic_recalibration(enable)", value: "set_automatic_recalibration", meta: "-- <function>", snippet: "set_automatic_recalibration($1)", description: "ESP32_SCD30_SCD30_SET_AUTOMATIC_RECALIBRATION" },
        { title: "get_forced_recalibration()", value: "get_forced_recalibration", meta: "-- <function>", snippet: "get_forced_recalibration()", description: "ESP32_SCD30_SCD30_GET_FORCED_RECALIBRATION" },
        { title: "set_forced_recalibration(co2ppm)", value: "set_forced_recalibration", meta: "-- <function>", snippet: "set_forced_recalibration($1)", description: "ESP32_SCD30_SCD30_SET_FORCED_RECALIBRATION" },
        { title: "get_temperature_offset()", value: "get_temperature_offset", meta: "-- <function>", snippet: "get_temperature_offset()", description: "ESP32_SCD30_SCD30_GET_TEMPERATURE_OFFSET" },
        { title: "set_temperature_offset(offset)", value: "set_temperature_offset", meta: "-- <function>", snippet: "set_temperature_offset($1)", description: "ESP32_SCD30_SCD30_SET_TEMPERATURE_OFFSET" },
        { title: "get_altitude_comp()", value: "get_altitude_comp", meta: "-- <function>", snippet: "get_altitude_comp()", description: "ESP32_SCD30_SCD30_GET_ALTITUDE_COMP" },
        { title: "set_altitude_comp(altitude)", value: "set_altitude_comp", meta: "-- <function>", snippet: "set_altitude_comp($1)", description: "ESP32_SCD30_SCD30_SET_ALTITUDE_COMP" },
        { title: "__write_command(cmd)", value: "__write_command", meta: "-- <function>", snippet: "__write_command($1)", description: "ESP32_SCD30_SCD30___WRITE_COMMAND" },
        { title: "__read_bytes(cmd, count)", value: "__read_bytes", meta: "-- <function>", snippet: "__read_bytes($1)", description: "ESP32_SCD30_SCD30___READ_BYTES", returns: "readfrom" },
        { title: "__check_crc(arr)", value: "__check_crc", meta: "-- <function>", snippet: "__check_crc($1)", description: "ESP32_SCD30_SCD30___CHECK_CRC" },
        { title: "__crc(msb, lsb)", value: "__crc", meta: "-- <function>", snippet: "__crc($1)", description: "ESP32_SCD30_SCD30___CRC" },
        { value: "CLOCK_TIME_US", meta: "SCD30", description: "ESP32_SCD30_SCD30_CLOCK_TIME_US" },
        { value: "CRC_TABLE", meta: "SCD30", description: "ESP32_SCD30_SCD30_CRC_TABLE" },
        { value: "GET_FIRMWARE_VER", meta: "SCD30", description: "ESP32_SCD30_SCD30_GET_FIRMWARE_VER" },
        { value: "GET_STATUS_READY", meta: "SCD30", description: "ESP32_SCD30_SCD30_GET_STATUS_READY" },
        { value: "READ_MEASUREMENT", meta: "SCD30", description: "ESP32_SCD30_SCD30_READ_MEASUREMENT" },
        { value: "SET_ALT_COMP", meta: "SCD30", description: "ESP32_SCD30_SCD30_SET_ALT_COMP" },
        { value: "SET_ASC", meta: "SCD30", description: "ESP32_SCD30_SCD30_SET_ASC" },
        { value: "SET_FRC", meta: "SCD30", description: "ESP32_SCD30_SCD30_SET_FRC" },
        { value: "SET_MEASURE_INTERVAL", meta: "SCD30", description: "ESP32_SCD30_SCD30_SET_MEASURE_INTERVAL" },
        { value: "SET_TEMP_OFFSET", meta: "SCD30", description: "ESP32_SCD30_SCD30_SET_TEMP_OFFSET" },
        { value: "SOFT_RESET", meta: "SCD30", description: "ESP32_SCD30_SCD30_SOFT_RESET" },
        { value: "START_CONT_MEASURE", meta: "SCD30", description: "ESP32_SCD30_SCD30_START_CONT_MEASURE" },
        { value: "STOP_CONT_MEASURE", meta: "SCD30", description: "ESP32_SCD30_SCD30_STOP_CONT_MEASURE" }
    ];

    tree.esp32_sgp30 = [
        { value: "_SGP30_CRC8_INIT", meta: "esp32_sgp30", description: "ESP32_SGP30__SGP30_CRC8_INIT" },
        { value: "_SGP30_CRC8_POLYNOMIAL", meta: "esp32_sgp30", description: "ESP32_SGP30__SGP30_CRC8_POLYNOMIAL" },
        { value: "_SGP30_DEFAULT_I2C_ADDR", meta: "esp32_sgp30", description: "ESP32_SGP30__SGP30_DEFAULT_I2C_ADDR" },
        { value: "_SGP30_FEATURESETS", meta: "esp32_sgp30", description: "ESP32_SGP30__SGP30_FEATURESETS" },
        { value: "_SGP30_WORD_LEN", meta: "esp32_sgp30", description: "ESP32_SGP30__SGP30_WORD_LEN" },
        { title: "generate_crc(data)", value: "generate_crc", meta: "-- <function>", snippet: "generate_crc($1)", description: "ESP32_SGP30_GENERATE_CRC" },
        { value: "SGP30", meta: "esp32_sgp30", kind: "class", description: "ESP32_SGP30_SGP30" },
        { title: "SGP30()(i2c, addr=_SGP30_DEFAULT_I2C_ADDR)", value: "SGP30()", meta: "constructor", snippet: "SGP30($1)", description: "ESP32_SGP30_SGP30", returns: "SGP30" },
        { value: "__name__", meta: "esp32_sgp30", description: "ESP32_SGP30_MODULE" }
    ];
    typeTree.SGP30 = [
        { title: "total_organic_compound()", value: "total_organic_compound", meta: "-- <function>", snippet: "total_organic_compound()", description: "ESP32_SGP30_SGP30_TOTAL_ORGANIC_COMPOUND" },
        { title: "baseline_total_organic_compound()", value: "baseline_total_organic_compound", meta: "-- <function>", snippet: "baseline_total_organic_compound()", description: "ESP32_SGP30_SGP30_BASELINE_TOTAL_ORGANIC_COMPOUND" },
        { title: "co2_equivalent()", value: "co2_equivalent", meta: "-- <function>", snippet: "co2_equivalent()", description: "ESP32_SGP30_SGP30_CO2_EQUIVALENT" },
        { title: "baseline_co2_equivilant()", value: "baseline_co2_equivilant", meta: "-- <function>", snippet: "baseline_co2_equivilant()", description: "ESP32_SGP30_SGP30_BASELINE_CO2_EQUIVILANT" },
        { title: "initialise_indoor_air_quality()", value: "initialise_indoor_air_quality", meta: "-- <function>", snippet: "initialise_indoor_air_quality()", description: "ESP32_SGP30_SGP30_INITIALISE_INDOOR_AIR_QUALITY" },
        { title: "indoor_air_quality()", value: "indoor_air_quality", meta: "-- <function>", snippet: "indoor_air_quality()", description: "ESP32_SGP30_SGP30_INDOOR_AIR_QUALITY", returns: "_i2c_read_words_from_cmd" },
        { title: "indoor_air_quality_baseline()", value: "indoor_air_quality_baseline", meta: "-- <function>", snippet: "indoor_air_quality_baseline()", description: "ESP32_SGP30_SGP30_INDOOR_AIR_QUALITY_BASELINE", returns: "_i2c_read_words_from_cmd" },
        { title: "set_indoor_air_quality_baseline(co2_equivalent, total_volatile_organic_compounds)", value: "set_indoor_air_quality_baseline", meta: "-- <function>", snippet: "set_indoor_air_quality_baseline($1)", description: "ESP32_SGP30_SGP30_SET_INDOOR_AIR_QUALITY_BASELINE" },
        { title: "_i2c_read_words_from_cmd(command, reply_size, delay=10)", value: "_i2c_read_words_from_cmd", meta: "-- <function>", snippet: "_i2c_read_words_from_cmd($1)", description: "ESP32_SGP30_SGP30__I2C_READ_WORDS_FROM_CMD" }
    ];

    tree.esp32_sht31 = [
        { value: "R_HIGH", meta: "esp32_sht31", description: "ESP32_SHT31_R_HIGH" },
        { value: "R_LOW", meta: "esp32_sht31", description: "ESP32_SHT31_R_LOW" },
        { value: "R_MEDIUM", meta: "esp32_sht31", description: "ESP32_SHT31_R_MEDIUM" },
        { value: "SHT31_DEFAULT_I2C_ADDR", meta: "esp32_sht31", description: "ESP32_SHT31_SHT31_DEFAULT_I2C_ADDR" },
        { value: "SHT31", meta: "esp32_sht31", kind: "class", description: "ESP32_SHT31_SHT31" },
        { title: "SHT31()(i2c, addr=SHT31_DEFAULT_I2C_ADDR)", value: "SHT31()", meta: "constructor", snippet: "SHT31($1)", description: "ESP32_SHT31_SHT31", returns: "SHT31" },
        { value: "__name__", meta: "esp32_sht31", description: "ESP32_SHT31_MODULE" }
    ];
    typeTree.SHT31 = [
        { title: "_send(buf)", value: "_send", meta: "-- <function>", snippet: "_send($1)", description: "ESP32_SHT31_SHT31__SEND" },
        { title: "_recv(count)", value: "_recv", meta: "-- <function>", snippet: "_recv($1)", description: "ESP32_SHT31_SHT31__RECV", returns: "readfrom" },
        { title: "_raw_temp_humi(r=R_HIGH, cs=True)", value: "_raw_temp_humi", meta: "-- <function>", snippet: "_raw_temp_humi($1)", description: "ESP32_SHT31_SHT31__RAW_TEMP_HUMI", returns: "tuple" },
        { title: "get_temp_humi(resolution=R_HIGH, clock_stretch=True, celsius=True)", value: "get_temp_humi", meta: "-- <function>", snippet: "get_temp_humi($1)", description: "ESP32_SHT31_SHT31_GET_TEMP_HUMI", returns: "tuple" },
        { value: "_map_cs_r", meta: "SHT31", description: "ESP32_SHT31_SHT31__MAP_CS_R" }
    ];

    tree.esp32_sht3x = [
        { value: "SHT3X", meta: "esp32_sht3x", kind: "class", description: "ESP32_SHT3X_SHT3X" },
        { title: "SHT3X(i2c, addr)", value: "SHT3X()", meta: "constructor", snippet: "SHT3X($1)", description: "ESP32_SHT3X_SHT3X", returns: "SHT3X" },
        { value: "SHT31", meta: "esp32_sht3x", kind: "class", description: "ESP32_SHT3X_SHT31" },
        { title: "SHT31(i2c, addr=0x44)", value: "SHT31()", meta: "constructor", snippet: "SHT31($1)", description: "ESP32_SHT3X_SHT31", returns: "SHT31" },
        { value: "SHT35", meta: "esp32_sht3x", kind: "class", description: "ESP32_SHT3X_SHT35" },
        { title: "SHT35(i2c, addr=0x45)", value: "SHT35()", meta: "constructor", snippet: "SHT35($1)", description: "ESP32_SHT3X_SHT35", returns: "SHT35" },
        { value: "__name__", meta: "esp32_sht3x", description: "ESP32_SHT3X_MODULE" }
    ];
    typeTree.SHT3X = [
        { title: "get_temperature_in_celsius(data)", value: "get_temperature_in_celsius", meta: "-- <function>", snippet: "get_temperature_in_celsius($1)", description: "ESP32_SHT3X_SHT3X_GET_TEMPERATURE_IN_CELSIUS", returns: "round" },
        { title: "get_temperature_in_fahrenheit(data)", value: "get_temperature_in_fahrenheit", meta: "-- <function>", snippet: "get_temperature_in_fahrenheit($1)", description: "ESP32_SHT3X_SHT3X_GET_TEMPERATURE_IN_FAHRENHEIT", returns: "round" },
        { title: "get_relative_humidity(data)", value: "get_relative_humidity", meta: "-- <function>", snippet: "get_relative_humidity($1)", description: "ESP32_SHT3X_SHT3X_GET_RELATIVE_HUMIDITY", returns: "round" },
        { title: "get_measurement(data_type)", value: "get_measurement", meta: "-- <function>", snippet: "get_measurement($1)", description: "ESP32_SHT3X_SHT3X_GET_MEASUREMENT", returns: "object" }
    ];

    tree.esp32_si1145 = [
        { value: "SI1145_DEFAULT_I2C_ADDR", meta: "esp32_si1145", description: "ESP32_SI1145_SI1145_DEFAULT_I2C_ADDR" },
        { value: "SI1145", meta: "esp32_si1145", kind: "class", description: "ESP32_SI1145_SI1145" },
        { title: "SI1145()(i2c, addr=SI1145_DEFAULT_I2C_ADDR)", value: "SI1145()", meta: "constructor", snippet: "SI1145($1)", description: "ESP32_SI1145_SI1145", returns: "SI1145" },
        { value: "__name__", meta: "esp32_si1145", description: "ESP32_SI1145_MODULE" }
    ];
    typeTree.SI1145 = [
        { title: "_read8(register)", value: "_read8", meta: "-- <function>", snippet: "_read8($1)", description: "ESP32_SI1145_SI1145__READ8" },
        { title: "_read16(register, little_endian=True)", value: "_read16", meta: "-- <function>", snippet: "_read16($1)", description: "ESP32_SI1145_SI1145__READ16" },
        { title: "_write8(register, value)", value: "_write8", meta: "-- <function>", snippet: "_write8($1)", description: "ESP32_SI1145_SI1145__WRITE8" },
        { title: "_reset()", value: "_reset", meta: "-- <function>", snippet: "_reset()", description: "ESP32_SI1145_SI1145__RESET" },
        { title: "_write_param(parameter, value)", value: "_write_param", meta: "-- <function>", snippet: "_write_param($1)", description: "ESP32_SI1145_SI1145__WRITE_PARAM", returns: "_read8" },
        { title: "_load_calibration()", value: "_load_calibration", meta: "-- <function>", snippet: "_load_calibration()", description: "ESP32_SI1145_SI1145__LOAD_CALIBRATION" },
        { title: "read_uv()", value: "read_uv", meta: "-- <function>", snippet: "read_uv()", description: "ESP32_SI1145_SI1145_READ_UV" },
        { title: "read_visible()", value: "read_visible", meta: "-- <function>", snippet: "read_visible()", description: "ESP32_SI1145_SI1145_READ_VISIBLE", returns: "_read16" },
        { title: "read_ir()", value: "read_ir", meta: "-- <function>", snippet: "read_ir()", description: "ESP32_SI1145_SI1145_READ_IR", returns: "_read16" },
        { title: "read_prox()", value: "read_prox", meta: "-- <function>", snippet: "read_prox()", description: "ESP32_SI1145_SI1145_READ_PROX", returns: "_read16" }
    ];

    tree.esp32_ssd1306 = [
        { value: "SET_CHARGE_PUMP", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_CHARGE_PUMP" },
        { value: "SET_COL_ADDR", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_COL_ADDR" },
        { value: "SET_COM_OUT_DIR", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_COM_OUT_DIR" },
        { value: "SET_COM_PIN_CFG", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_COM_PIN_CFG" },
        { value: "SET_CONTRAST", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_CONTRAST" },
        { value: "SET_DISP", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_DISP" },
        { value: "SET_DISP_CLK_DIV", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_DISP_CLK_DIV" },
        { value: "SET_DISP_OFFSET", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_DISP_OFFSET" },
        { value: "SET_DISP_START_LINE", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_DISP_START_LINE" },
        { value: "SET_ENTIRE_ON", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_ENTIRE_ON" },
        { value: "SET_MEM_ADDR", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_MEM_ADDR" },
        { value: "SET_MUX_RATIO", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_MUX_RATIO" },
        { value: "SET_NORM_INV", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_NORM_INV" },
        { value: "SET_PAGE_ADDR", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_PAGE_ADDR" },
        { value: "SET_PRECHARGE", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_PRECHARGE" },
        { value: "SET_SEG_REMAP", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_SEG_REMAP" },
        { value: "SET_VCOM_DESEL", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SET_VCOM_DESEL" },
        { value: "SSD1306_DEFAULT_I2C_ADDR", meta: "esp32_ssd1306", description: "ESP32_SSD1306_SSD1306_DEFAULT_I2C_ADDR" },
        { value: "SSD1306", meta: "esp32_ssd1306", kind: "class", description: "ESP32_SSD1306_SSD1306" },
        { title: "SSD1306()(width, height, external_vcc)", value: "SSD1306()", meta: "constructor", snippet: "SSD1306($1)", description: "ESP32_SSD1306_SSD1306", returns: "SSD1306" },
        { value: "SSD1306_I2C", meta: "esp32_ssd1306", kind: "class", description: "ESP32_SSD1306_SSD1306_I2C" },
        { title: "SSD1306_I2C()(width, height, i2c, addr=SSD1306_DEFAULT_I2C_ADDR, external_vcc=False)", value: "SSD1306_I2C()", meta: "constructor", snippet: "SSD1306_I2C($1)", description: "ESP32_SSD1306_SSD1306_I2C", returns: "SSD1306_I2C" },
        { value: "__name__", meta: "esp32_ssd1306", description: "ESP32_SSD1306_MODULE" }
    ];
    typeTree.SSD1306 = [
        { title: "init_display()", value: "init_display", meta: "-- <function>", snippet: "init_display()", description: "ESP32_SSD1306_SSD1306_INIT_DISPLAY" },
        { title: "poweroff()", value: "poweroff", meta: "-- <function>", snippet: "poweroff()", description: "ESP32_SSD1306_SSD1306_POWEROFF" },
        { title: "poweron()", value: "poweron", meta: "-- <function>", snippet: "poweron()", description: "ESP32_SSD1306_SSD1306_POWERON" },
        { title: "contrast(contrast)", value: "contrast", meta: "-- <function>", snippet: "contrast($1)", description: "ESP32_SSD1306_SSD1306_CONTRAST" },
        { title: "invert(invert)", value: "invert", meta: "-- <function>", snippet: "invert($1)", description: "ESP32_SSD1306_SSD1306_INVERT" },
        { title: "rotate(rotate)", value: "rotate", meta: "-- <function>", snippet: "rotate($1)", description: "ESP32_SSD1306_SSD1306_ROTATE" },
        { title: "show()", value: "show", meta: "-- <function>", snippet: "show()", description: "ESP32_SSD1306_SSD1306_SHOW" }
    ];
    typeTree.SSD1306_I2C = [
        { title: "write_cmd(cmd)", value: "write_cmd", meta: "-- <function>", snippet: "write_cmd($1)", description: "ESP32_SSD1306_SSD1306_I2C_WRITE_CMD" },
        { title: "write_data(buf)", value: "write_data", meta: "-- <function>", snippet: "write_data($1)", description: "ESP32_SSD1306_SSD1306_I2C_WRITE_DATA" },
        { value: "STAMP_BATTERY1", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_BATTERY1" },
        { value: "STAMP_BATTERY2", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_BATTERY2" },
        { value: "STAMP_BATTERY3", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_BATTERY3" },
        { value: "STAMP_BUTTERFLY", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_BUTTERFLY" },
        { value: "STAMP_FORK", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_FORK" },
        { value: "STAMP_GRID", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_GRID" },
        { value: "STAMP_HAPPY", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_HAPPY" },
        { value: "STAMP_HEART", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_HEART" },
        { value: "STAMP_LOCK", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_LOCK" },
        { value: "STAMP_MAN", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_MAN" },
        { value: "STAMP_NET", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_NET" },
        { value: "STAMP_NO", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_NO" },
        { value: "STAMP_SAD", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_SAD" },
        { value: "STAMP_SKULL", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_SKULL" },
        { value: "STAMP_SWORD", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_SWORD" },
        { value: "STAMP_UMBRELLA", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_UMBRELLA" },
        { value: "STAMP_WINE", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_WINE" },
        { value: "STAMP_YES", meta: "SSD1306_I2C", description: "ESP32_SSD1306_SSD1306_I2C_STAMP_YES" }
    ];

    tree.esp32_th02 = [
        { value: "TH02_DEFAULT_I2C_ADDR", meta: "esp32_th02", description: "ESP32_TH02_TH02_DEFAULT_I2C_ADDR" },
        { value: "TH02", meta: "esp32_th02", kind: "class", description: "ESP32_TH02_TH02" },
        { title: "TH02()(i2c, addr=TH02_DEFAULT_I2C_ADDR)", value: "TH02()", meta: "constructor", snippet: "TH02($1)", description: "ESP32_TH02_TH02", returns: "TH02" },
        { value: "__name__", meta: "esp32_th02", description: "ESP32_TH02_MODULE" }
    ];
    typeTree.TH02 = [
        { title: "init_temp()", value: "init_temp", meta: "-- <function>", snippet: "init_temp()", description: "ESP32_TH02_TH02_INIT_TEMP" },
        { title: "init_humidity()", value: "init_humidity", meta: "-- <function>", snippet: "init_humidity()", description: "ESP32_TH02_TH02_INIT_HUMIDITY" },
        { title: "is_ready()", value: "is_ready", meta: "-- <function>", snippet: "is_ready()", description: "ESP32_TH02_TH02_IS_READY", returns: "bool" },
        { title: "wait_until_ready()", value: "wait_until_ready", meta: "-- <function>", snippet: "wait_until_ready()", description: "ESP32_TH02_TH02_WAIT_UNTIL_READY", returns: "bool" },
        { title: "read_data()", value: "read_data", meta: "-- <function>", snippet: "read_data()", description: "ESP32_TH02_TH02_READ_DATA" },
        { title: "calculate_temp(data)", value: "calculate_temp", meta: "-- <function>", snippet: "calculate_temp($1)", description: "ESP32_TH02_TH02_CALCULATE_TEMP" },
        { title: "calculate_humidity(data)", value: "calculate_humidity", meta: "-- <function>", snippet: "calculate_humidity($1)", description: "ESP32_TH02_TH02_CALCULATE_HUMIDITY" },
        { title: "get_temperature()", value: "get_temperature", meta: "-- <function>", snippet: "get_temperature()", description: "ESP32_TH02_TH02_GET_TEMPERATURE", returns: "calculate_temp" },
        { title: "get_humidity()", value: "get_humidity", meta: "-- <function>", snippet: "get_humidity()", description: "ESP32_TH02_TH02_GET_HUMIDITY", returns: "calculate_humidity" },
        { value: "CHECK_DELAY_MS", meta: "TH02", description: "ESP32_TH02_TH02_CHECK_DELAY_MS" },
        { value: "CONVERSION_HUMIDITY", meta: "TH02", description: "ESP32_TH02_TH02_CONVERSION_HUMIDITY" },
        { value: "CONVERSION_TEMP", meta: "TH02", description: "ESP32_TH02_TH02_CONVERSION_TEMP" },
        { value: "REGISTER_CONFIG", meta: "TH02", description: "ESP32_TH02_TH02_REGISTER_CONFIG" },
        { value: "REGISTER_DATAH", meta: "TH02", description: "ESP32_TH02_TH02_REGISTER_DATAH" },
        { value: "REGISTER_DATAL", meta: "TH02", description: "ESP32_TH02_TH02_REGISTER_DATAL" },
        { value: "REGISTER_STATUS", meta: "TH02", description: "ESP32_TH02_TH02_REGISTER_STATUS" }
    ];

    tree.esp32_tm1637 = [
        { value: "_SEG", meta: "esp32_tm1637", description: "ESP32_TM1637__SEG" },
        { value: "TM1637", meta: "esp32_tm1637", kind: "class", description: "ESP32_TM1637_TM1637" },
        { title: "TM1637()(clk, dio, bright=7)", value: "TM1637()", meta: "constructor", snippet: "TM1637($1)", description: "ESP32_TM1637_TM1637", returns: "TM1637" },
        { value: "__name__", meta: "esp32_tm1637", description: "ESP32_TM1637_MODULE" }
    ];
    typeTree.TM1637 = [
        { title: "_write_digital(pin, state)", value: "_write_digital", meta: "-- <function>", snippet: "_write_digital($1)", description: "ESP32_TM1637_TM1637__WRITE_DIGITAL" },
        { title: "_start()", value: "_start", meta: "-- <function>", snippet: "_start()", description: "ESP32_TM1637_TM1637__START" },
        { title: "_stop()", value: "_stop", meta: "-- <function>", snippet: "_stop()", description: "ESP32_TM1637_TM1637__STOP" },
        { title: "_write_data_cmd()", value: "_write_data_cmd", meta: "-- <function>", snippet: "_write_data_cmd()", description: "ESP32_TM1637_TM1637__WRITE_DATA_CMD" },
        { title: "_write_dsp_ctrl()", value: "_write_dsp_ctrl", meta: "-- <function>", snippet: "_write_dsp_ctrl()", description: "ESP32_TM1637_TM1637__WRITE_DSP_CTRL" },
        { title: "_write_byte(b)", value: "_write_byte", meta: "-- <function>", snippet: "_write_byte($1)", description: "ESP32_TM1637_TM1637__WRITE_BYTE" },
        { title: "brightness(val=None)", value: "brightness", meta: "-- <function>", snippet: "brightness($1)", description: "ESP32_TM1637_TM1637_BRIGHTNESS" },
        { title: "write(segs, pos=0)", value: "write", meta: "-- <function>", snippet: "write($1)", description: "ESP32_TM1637_TM1637_WRITE" },
        { title: "encode_str(str)", value: "encode_str", meta: "-- <function>", snippet: "encode_str($1)", description: "ESP32_TM1637_TM1637_ENCODE_STR" },
        { title: "encode_char(char)", value: "encode_char", meta: "-- <function>", snippet: "encode_char($1)", description: "ESP32_TM1637_TM1637_ENCODE_CHAR" },
        { title: "number(num)", value: "number", meta: "-- <function>", snippet: "number($1)", description: "ESP32_TM1637_TM1637_NUMBER" },
        { title: "numbers(num1, num2, colon=True)", value: "numbers", meta: "-- <function>", snippet: "numbers($1)", description: "ESP32_TM1637_TM1637_NUMBERS" },
        { title: "temperature(num)", value: "temperature", meta: "-- <function>", snippet: "temperature($1)", description: "ESP32_TM1637_TM1637_TEMPERATURE" },
        { title: "show(str, colon=False)", value: "show", meta: "-- <function>", snippet: "show($1)", description: "ESP32_TM1637_TM1637_SHOW" },
        { title: "scroll(str, delay=250)", value: "scroll", meta: "-- <function>", snippet: "scroll($1)", description: "ESP32_TM1637_TM1637_SCROLL" },
        { title: "clock(time, colon=True)", value: "clock", meta: "-- <function>", snippet: "clock($1)", description: "ESP32_TM1637_TM1637_CLOCK" }
    ];

    tree.esp32_water_level = [
        { value: "ATTINY1_HIGH_ADDR", meta: "esp32_water_level", description: "ESP32_WATER_LEVEL_ATTINY1_HIGH_ADDR" },
        { value: "ATTINY2_LOW_ADDR", meta: "esp32_water_level", description: "ESP32_WATER_LEVEL_ATTINY2_LOW_ADDR" },
        { value: "THRESHOLD", meta: "esp32_water_level", description: "ESP32_WATER_LEVEL_THRESHOLD" },
        { value: "i2c", meta: "esp32_water_level", description: "ESP32_WATER_LEVEL_I2C" },
        { title: "getHigh12SectionValue()", value: "getHigh12SectionValue", meta: "-- <function>", snippet: "getHigh12SectionValue()", description: "ESP32_WATER_LEVEL_GETHIGH12SECTIONVALUE", returns: "list" },
        { title: "getLow8SectionValue()", value: "getLow8SectionValue", meta: "-- <function>", snippet: "getLow8SectionValue()", description: "ESP32_WATER_LEVEL_GETLOW8SECTIONVALUE", returns: "list" },
        { title: "measurePercentLevel()", value: "measurePercentLevel", meta: "-- <function>", snippet: "measurePercentLevel()", description: "ESP32_WATER_LEVEL_CHECK_WATER_LEVEL" },
        { value: "__name__", meta: "esp32_water_level", description: "ESP32_WATER_LEVEL_MODULE" }
    ];

    return { tree, typeTree };
}