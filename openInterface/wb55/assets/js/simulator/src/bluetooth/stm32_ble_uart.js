// STM32 stm32_ble_uart module

var $builtinmodule = function () {

	var stm32_ble_uart = {};

    const bluetooth = Sk.globals.bluetooth.$d;

	stm32_ble_uart.__name__ = new Sk.builtin.str("stm32_ble_uart");

    stm32_ble_uart._IRQ_CENTRAL_CONNECT = new Sk.builtin.int_(1);
    stm32_ble_uart._IRQ_CENTRAL_DISCONNECT = new Sk.builtin.int_(2);
    stm32_ble_uart._IRQ_GATTS_WRITE = new Sk.builtin.int_(3);
    stm32_ble_uart._FLAG_WRITE = new Sk.builtin.int_(0x0008);
    stm32_ble_uart._FLAG_NOTIFY = new Sk.builtin.int_(0x0010);
    
    stm32_ble_uart._UART_UUID = bluetooth.UUID({}, new Sk.builtin.str('6E400001-B5A3-F393-E0A9-E50E24DCCA9E'));
    stm32_ble_uart._UART_TX = new Sk.builtin.tuple([
        Object.getPrototypeOf(bluetooth.UUID({}, new Sk.builtin.str("6E400003-B5A3-F393-E0A9-E50E24DCCA9E"))),
        stm32_ble_uart._FLAG_NOTIFY.v // Cette caractéristique notifiera le central des modifications que lui apportera le périphérique
    ]);
    stm32_ble_uart._UART_RX = new Sk.builtin.tuple([
        Object.getPrototypeOf(bluetooth.UUID({}, new Sk.builtin.str("6E400002-B5A3-F393-E0A9-E50E24DCCA9E"))),
        stm32_ble_uart._FLAG_WRITE.v // Le central pourra écrire dans cette caractéristique
    ]);

    stm32_ble_uart._UART_SERVICE = new Sk.builtin.tuple([
        Object.getPrototypeOf(stm32_ble_uart._UART_UUID),
        (stm32_ble_uart._UART_TX.v, stm32_ble_uart._UART_RX.v)
    ]);

    // org.bluetooth.characteristic.gap.appearance.xml
    stm32_ble_uart._ADV_APPEARANCE_GENERIC_COMPUTER = new Sk.builtin.int_(128)
    
    // Nombre maximum d'octets qui peuvent être échangés par la caractéristique RX
    stm32_ble_uart._MAX_NB_BYTES = new Sk.builtin.int_(100);
    
    stm32_ble_uart.ascii_mac = Sk.builtin.none();

	stm32_ble_uart.UART_BLE = new Sk.misceval.buildClass(stm32_ble_uart, function ($gbl, $loc) {

		UART_BLE__init__ = function (self, ble, name, rxbuf) {

            self._ble = Object.getPrototypeOf(ble);
            self._ble.active.func_code(ble, new Sk.builtin.bool(true));
            self._ble.irq.func_code(ble, Sk.builtin.func(_irq));

            // Enregistrement du service
            handles = self._ble.gatts_register_services.func_code(ble, stm32_ble_uart._UART_SERVICE);
            self._tx_handle = handles.v[0];
            self._rx_handle = handles.v[1];

            // Augmente la taille du tampon rx et active le mode "append"
            //self._ble.gatts_set_buffer.func_code({}, new Sk.builtin.str(self._rx_handle), rxbuf, new Sk.builtin.bool(true))

            self._connections = {};
            self._rx_buffer = new Array()
            self._handler = null

            // Advertising du service :
            // On peut ajouter en option services=[_UART_UUID], mais cela risque de rendre la payload de la caractéristique trop longue
            
            // self._payload = adv_payload(name=name, appearance=_ADV_APPEARANCE_GENERIC_COMPUTER)
            // self._advertise()
        
            // // Affiche l'adresse MAC de l'objet
            // dummy, byte_mac = self._ble.config('mac')
            // hex_mac = hexlify(byte_mac) 

            // Sk.builtins.ascii_mac = hex_mac.decode("ascii")
            // print("Adresse MAC : %s" %Sk.builtins.ascii_mac)
		};

        UART_BLE__init__.co_varnames = ['self', 'ble', 'name', 'rxbuf'];
		UART_BLE__init__.$defaults = [new Sk.builtin.str("WB55-UART"), stm32_ble_uart._MAX_NB_BYTES];

		$loc.__init__ = new Sk.builtin.func(UART_BLE__init__);

        var _irq = function (self, event, data) {
            // Si un central se connecte
            if (event.v == stm32_ble_uart._IRQ_CENTRAL_CONNECT.v) {
                conn_handle, _, _ = data;
                self._connections.add(conn_handle);
            // Si un central se déconnecte
            } else if (event.v == _IRQ_CENTRAL_DISCONNECT.v) {
                conn_handle, _, _ = data
                if (conn_handle in self._connections) {
                  self._connections.remove(conn_handle);
                }
                // Redémarre l'advertising pour permettre de nouvelles connexions
                self._advertise()
            // Lorsqu'un client écrit dans une caractéristique exposée par le serveur
            // (gestion des évènements de recéption depuis le central)
            } else if (event.v == stm32_ble_uart._IRQ_GATTS_WRITE.v) {
                conn_handle, value_handle = data
                if (conn_handle in self._connections && value_handle == self._rx_handle) {
                    self._rx_buffer += self._ble.gatts_read.func_code(ble, self._rx_handle);
                    if (self._handler) {
                        self._handler();
                    }
                }
            }
		};

        $loc._irq = new Sk.builtin.func(_irq);

        $loc.any = new Sk.builtin.func(function (self) {
            if (self._rx_buffer.length !== 0) {
                return new Sk.builtin.int_(self._rx_buffer.length);
            } else {
                // Appelée pour vérifier s'il y a des messages en attente de lecture dans RX
                const multiEditorLS = localStorage.getItem('multiEditor');
                if (multiEditorLS) {
                    const multiEditor = JSON.parse(multiEditorLS);
                    const mutiEditorInterface = multiEditor[INTERFACE_NAME];
                    let validEditors = []
                    for (var id in mutiEditorInterface) {
                        if (mutiEditorInterface[id].dateUpdated && mutiEditorInterface[id].ble_uart) {
                            validEditors.push({
                                "id": id,
                                "dateUpdated": mutiEditorInterface[id].dateUpdated,
                                "ble_uart": mutiEditorInterface[id].ble_uart
                            });
                        }
                    }
                    const editor = validEditors.sort(function(a, b) {
                        return b.dateUpdated - a.dateUpdated;
                    })[0];
                    if (editor !== undefined && editor.ble_uart._tx_buffer && editor.ble_uart._tx_buffer.length != 0) {
                        const dataArray = editor.ble_uart._tx_buffer;
                        self._rx_buffer = dataArray.map(function (data) {
                            return data.content;
                        });
                        multiEditor[INTERFACE_NAME][editor.id].dateUpdated = Math.floor(new Date() / 1000);
                        multiEditor[INTERFACE_NAME][editor.id].ble_uart = {
                            '_tx_buffer': new Array()
                        };
                        localStorage.setItem('multiEditor', JSON.stringify(multiEditor));
                        return new Sk.builtin.int_(self._rx_buffer.length);
                    }
                } else {
                    InterfaceMonitor.writeConsole("BLE Error: no service");
                }
                return new Sk.builtin.int_(0);
            }
        });
        
        var read = function (self, sz) {
            // Retourne les catactères reçus dans RX
            let size;
            if (size === undefined) {
                size = self._rx_buffer.length;
            } else {
                size = sz.v;
            }
            return new Sk.builtin.str(self._rx_buffer.shift());
        };

        read.co_varnames = ['self', 'sz'];
		read.$defaults = [Sk.builtin.none(), undefined];
		read.co_numargs = 2;

        $loc.read = new Sk.builtin.func(read);

        $loc.write = new Sk.builtin.func(function (self, data) {
            if (data !== undefined) {
                // Ecrit dans TX un message à l'attention du central
                function sendBluetoothData(buffer) {    
                    const data = {
                        'timestamp': Date.now(),
                        'content': buffer
                    };
                    const multiEditorLS = localStorage.getItem('multiEditor');
                    if (multiEditorLS) {
                        const multiEditor = JSON.parse(multiEditorLS);
                        const currentEditor = multiEditor[INTERFACE_NAME][VittaInterface.id]
                        multiEditor[INTERFACE_NAME][VittaInterface.id].dateUpdated = Math.floor(new Date() / 1000);
                        if (currentEditor.ble_uart) {
                            multiEditor[INTERFACE_NAME][VittaInterface.id].ble_uart['_tx_buffer'].push(data);
                        } else {
                            multiEditor[INTERFACE_NAME][VittaInterface.id].ble_uart = {
                                '_tx_buffer': [data]
                            };
                        }
                        localStorage.setItem('multiEditor', JSON.stringify(multiEditor));    
                    } else {
                        InterfaceMonitor.writeConsole("BLE Error: no service");
                    }
                };
                sendBluetoothData(data.v);
                const date = new Date();
                let s;
                if (date.getSeconds() < 10) {
                    s = "0" + date.getSeconds();
                } else {
                    s = date.getSeconds();
                }
                const strClock = date.getHours() + ":" + date.getMinutes() + ":" + s;
                InterfaceMonitor.writeConsole(strClock + " - Donnée envoyée par le module BLE : '" + data.v + "'\n")
                // TO DO
                for (conn_handle in self._connections) {
                    //self._ble.gatts_notify.func_code(ble, conn_handle, self._tx_handle, data);
                }
            }
        });

	});

	return stm32_ble_uart;
};

