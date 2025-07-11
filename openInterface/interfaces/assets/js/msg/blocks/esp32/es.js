/**
 * @fileoverview Spanish messages for ESP32 microchips. (ES)
 */

'use strict';

// Network - Wifi
Blockly.Msg['NETWORK_CONNECT_STATION_TITLE'] = 'conectar estación: nombre de red %1 contraseña %2';
Blockly.Msg['NETWORK_CONNECT_STATION_TOOLTIP'] = 'Permite configurar una estación wifi en la tarjeta ' + Blockly.Msg.boardName + ' conectándose a una red wifi. Para recibir datos enviados por el servidor en un navegador: Conecte la placa ESP32 y el dispositivo en la misma red. Por ejemplo, si la dirección IP de mi red es 192.168.1.X, la puerta de enlace será 192.168.1.1. Ingrese la dirección IP del servidor en el navegador del dispositivo. Si desea acceder al servidor sin pasar por la dirección IP, puede configurar un nombre de host. Por ejemplo, servidor esp32. Ingrese el nombre del host en el navegador: http://esp32-server/';
Blockly.Msg['NETWORK_CONNECT_STATION_IP'] = 'IP fija';
Blockly.Msg['NETWORK_CONNECT_STATION_MASK'] = 'Máscara de subred';
Blockly.Msg['NETWORK_CONNECT_STATION_GATEWAY'] = 'Gateway';
Blockly.Msg['NETWORK_CONNECT_STATION_HOSTNAME'] = 'Nombre de host';
Blockly.Msg['NETWORK_CONFIGURE_ACCESS_POINT_TITLE'] = 'crear un punto de acceso: nombre de red %1 IP fija %2';
Blockly.Msg['NETWORK_CONFIGURE_ACCESS_POINT_TOOLTIP'] = 'Permite configurar un punto de acceso wif en la tarjeta ' + Blockly.Msg.boardName + '.';
Blockly.Msg['NETWORK_DISCONNECT_STATION_TITLE'] = 'desconectar estación';
Blockly.Msg['NETWORK_DISCONNECT_STATION_TOOLTIP'] = 'Permite desconectar la estación si está conectada a una red wifi.';
Blockly.Msg['NETWORK_IS_STATION_CONNECTED_TITLE'] = '¿La estación está conectada?';
Blockly.Msg['NETWORK_IS_STATION_CONNECTED_TOOLTIP'] = 'Devuelve True si la estación está habilitada, False en caso contrario. La estación wifi debe estar configurada de antemano para utilizar este bloque.';
Blockly.Msg['NETWORK_SET_NETWORK_TITLE'] = '%1 el wifi';
Blockly.Msg['NETWORK_SET_NETWORK_TOOLTIP'] = 'Activa o desactiva el módulo wifi de la ' + Blockly.Msg.boardName + '.';
Blockly.Msg['NETWORK_ACTIVATE'] = 'enable';
Blockly.Msg['NETWORK_DISABLE'] = 'desactivar';
Blockly.Msg['NETWORK_SCAN_NETWORK_PROFILES_TITLE'] = 'redes wifi disponibles';
Blockly.Msg['NETWORK_SCAN_NETWORK_PROFILES_TOOLTIP'] = 'Permite escanear las redes wifi disponibles.';
Blockly.Msg['NETWORK_GET_STATION_INFOS_TITLE'] = 'información de la estación';
Blockly.Msg['NETWORK_GET_STATION_INFOS_TOOLTIP'] = 'Devuelve una tupla que contiene la dirección IP, la máscara de subred, la puerta de enlace y el servidor DNS.';
Blockly.Msg['NETWORK_CHANGE_SERVER_PORT_TITLE'] = 'cambiar el puerto del servidor a %1';
Blockly.Msg['NETWORK_CHANGE_SERVER_PORT_TOOLTIP'] = 'Permite cambiar el puerto del servidor web de la ' + Blockly.Msg.boardName + '. Este debe estar conectado a una red wifi.';
// Network - Server
Blockly.Msg['NETWORK_SERVER_SEND_DATA_TITLE'] = '[servidor] enviar datos %1';
Blockly.Msg['NETWORK_SERVER_SEND_DATA_TOOLTIP'] = 'Permite enviar datos al cliente. La ' + Blockly.Msg.boardName + ' debe estar conectada a una red wifi.';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_TITLE'] = '[servidor] datos recibidos del cliente';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_TOOLTIP'] = 'Devuelve la solicitud del cliente. La ' + Blockly.Msg.boardName + ' debe estar conectada a una red wifi.';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_PARAM_TITLE'] = '[servidor] parámetro de solicitud';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_PARAM_TOOLTIP'] = 'Devuelve el parámetro de la solicitud del cliente. La ' + Blockly.Msg.boardName + ' debe estar conectada a una red wifi.';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_IP_TITLE'] = '[servidor] dirección IP del cliente';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_IP_TOOLTIP'] = 'Devuelve la dirección IP del cliente. La ' + Blockly.Msg.boardName + ' debe estar conectada a una red wifi.';
Blockly.Msg['NETWORK_SERVER_SEND_WEB_PAGE_TITLE'] = '[servidor] enviar página html';
Blockly.Msg['NETWORK_SERVER_SEND_WEB_PAGE_HTML'] = 'html';
Blockly.Msg['NETWORK_SERVER_SEND_WEB_PAGE_TOOLTIP'] = 'Permite enviar una página html al cliente. La ' + Blockly.Msg.boardName + ' debe estar conectada a una red wifi.';
// Network - Client
Blockly.Msg['NETWORK_CLIENT_GET_SERVER_DATA_TITLE'] = '[cliente] datos recibidos del servidor IP %1';
Blockly.Msg['NETWORK_CLIENT_GET_SERVER_DATA_TOOLTIP'] = 'Devuelve la solicitud del servidor. La ' + Blockly.Msg.boardName + ' debe estar conectada a una red wifi.';
Blockly.Msg['NETWORK_CLIENT_SEND_DATA_TITLE'] = '[cliente] envía datos %1 al servidor IP %2';
Blockly.Msg['NETWORK_CLIENT_SEND_DATA_TOOLTIP'] = 'Permite enviar datos al servidor. La ' + Blockly.Msg.boardName + ' debe estar conectada a una red wifi.';
Blockly.Msg['NETWORK_CLIENT_SEND_DATA_PORT'] = 'puerto';
// Network - Web page
Blockly.Msg['NETWORK_ADD_TITLE_TITLE'] = '[html] añadir título %1 nivel %2 color %3';
Blockly.Msg['NETWORK_ADD_TITLE_TOOLTIP'] = 'Permite añadir subtítulos dentro de la página web. Este bloque debe utilizarse en la sentencia \'html\' del bloque \'[Servidor] enviar página web\'.';
Blockly.Msg['NETWORK_ADD_TEXT_TITLE'] = '[html] mostrar texto %1';
Blockly.Msg['NETWORK_ADD_TEXT_TOOLTIP'] = 'Permite mostrar texto en la página web. Este bloque debe utilizarse en la sentencia \'html\' del bloque \'[Servidor] enviar página web\'. Haga clic en + para ajustar el tamaño de la fuente o el color del texto.';
Blockly.Msg['NETWORK_ADD_TEXT_SIZE'] = 'tamaño de letra';
Blockly.Msg['NETWORK_ADD_TEXT_COLOR'] = 'color';
Blockly.Msg['NETWORK_HTML_ADD_BUTTON_TITLE'] = '[html] añadir botón ID %1 texto %2';
Blockly.Msg['NETWORK_HTML_ADD_BUTTON_TOOLTIP'] = 'Permite añadir un botón a la página web. El ID se utiliza para recuperar el estado del botón. Este bloque debe utilizarse en la sentencia \'html\' del bloque \'[Servidor] enviar página web\'. Haga clic en + para establecer el color y el tamaño del botón.';
Blockly.Msg['NETWORK_HTML_ADD_BUTTON_COLOUR'] = 'color';
Blockly.Msg['NETWORK_HTML_ADD_BUTTON_HEIGHT'] = 'altura';
Blockly.Msg['NETWORK_HTML_ADD_BUTTON_WIDTH'] = 'width';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_TITLE'] = '[html] añadir ID de unidad %1';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_TOOLTIP'] = 'Añade un atenuador de rango de valor mínimo a máximo. El ID se utiliza para recuperar el valor del deslizador. Este bloque debe utilizarse en la sentencia \'html\' del bloque \'[Servidor] enviar página web\'.';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_MIN'] = 'min';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_MAX'] = 'max';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_HORIZONTAL'] = 'horizontal';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_VERTICAL'] = 'vertical';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_HEIGHT'] = 'altura';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_WIDTH'] = 'width';
Blockly.Msg['NETWORK_HTML_ADD_SWITCH_TITLE'] = '[html] add switch ID %1';
Blockly.Msg['NETWORK_HTML_ADD_SWITCH_COLOUR'] = 'color';
Blockly.Msg['NETWORK_HTML_ADD_SWITCH_SIZE'] = 'tamaño';
Blockly.Msg['NETWORK_HTML_ADD_SWITCH_TOOLTIP'] = 'Permite añadir un botón de cambio a la página web. Este bloque debe utilizarse en la sentencia \'html\' del bloque \'[Servidor] enviar página web\'.';
Blockly.Msg['NETWORK_HTML_ADD_GAUGE_TITLE'] = '[html] añadir un indicador %1 valor %2 min %3 max %4';
Blockly.Msg['NETWORK_HTML_ADD_GAUGE_TOOLTIP'] = 'Permite añadir un indicador desde el valor mínimo hasta el valor máximo de una variable. Es posible cambiar el título y la unidad del medidor. Este bloque debe utilizarse en la sentencia \'html\' del bloque \'[Servidor] enviar página web\'.';
Blockly.Msg['NETWORK_ADD_LINK_TITLE'] = '[html] agregar enlace %1 URL %2';
Blockly.Msg['NETWORK_ADD_LINK_TOOLTIP'] = 'Habilite la opción de agregar un enlace haciendo clic en el texto definido en la página web. Este bloque debe utilizarse en la sentencia \'[servidor] enviar página web\'. Haga clic en + para establecer el tamaño o el color de la fuente.';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_TITLE'] = '[html] mostrar imagen %1';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_TOOLTIP'] = 'Le permite agregar una imagen a la página web con datos base64. Presione el botón + para configurar la ventana de imagen en la página web. Este bloque debe usarse en la instrucción \'html\' del bloque \'[Servidor] envía la página web\'.';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_HEIGHT'] = 'altura';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_WIDTH'] = 'ancho';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_TITLE'] = '[html] mostrar secuencia de imágenes %1';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_TOOLTIP'] = 'Le permite enviar una transmisión de video a la página web con datos de imagen base64. Para que esto funcione, la variable \'image_data\' debe contener los datos de una captura. Este bloque debe usarse en la instrucción \'html\' del bloque \'[Servidor] envía la página web\'.';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_HEIGHT'] = 'altura';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_WIDTH'] = 'ancho';
Blockly.Msg['NETWORK_HTML_TAG_TITLE'] = '[html] balise %1';
Blockly.Msg['NETWORK_HTML_TAG_TOOLTIP'] = 'Permite añadir una etiqueta HTML del tipo <div></div>, <form></form> (para botones) o <center></center>. Este bloque debe ser utilizado en la declaración \'html\' del bloque \'[Servidor] envía la página web\'.';
Blockly.Msg["NETWORK_HTML_FORMAT_TEXT_TITLE"] = "[html] coloca el texto %1 en %2";
Blockly.Msg["NETWORK_HTML_FORMAT_TEXT_TOOLTIP"] = "Le permite formatear un texto. Este bloque debe usarse en la instrucción \'html\' del bloque \'[Servidor] para enviar la página web\'.";
Blockly.Msg["NETWORK_HTML_TAG_BOLD"] = "negrita <b>";
Blockly.Msg["NETWORK_HTML_TAG_ITALIC"] = "cursiva <i>";
Blockly.Msg["NETWORK_HTML_TAG_INSERTED"] = "subrayado <ins>";
Blockly.Msg["NETWORK_HTML_TAG_MARKED"] = "resaltada <mark>";
Blockly.Msg["NETWORK_HTML_TAG_DELETED"] = "tachado <del>";
Blockly.Msg["NETWORK_HTML_TAG_SMALL"] = "pequeño <small>";
Blockly.Msg['NETWORK_HTML_NEWLINE_TITLE'] = '[html] nueva línea <br>';
Blockly.Msg['NETWORK_HTML_NEWLINE_TOOLTIP'] = "Permite realizar un salto de línea en la página web. Este bloque debe usarse en la instrucción \'html\' del bloque \'[Servidor] enviar la página web\'.";
Blockly.Msg['NETWORK_HTML_ADD_SYMBOL_TITLE'] = '[html] agregar símbolo HTML %1 tamaño %2 formato %3';
Blockly.Msg['NETWORK_HTML_ADD_SYMBOL_TOOLTIP'] = "Permite agregar un símbolo HTML en la página web especificando su tamaño (por defecto 50px). Este bloque debe ser utilizado dentro de la instrucción 'html' del bloque '[servidor] enviar página html'.";
// Network - Get web page
Blockly.Msg['NETWORK_SERVER_GET_BUTTON_STATE_TITLE'] = '[servidor] botón ID estado %1';
Blockly.Msg['NETWORK_SERVER_GET_BUTTON_STATE_TOOLTIP'] = 'Recuperar el estado de un botón en la página web. Añade el ID del botón para seleccionarlo.';
Blockly.Msg['NETWORK_SERVER_GET_SLIDER_VALUE_TITLE'] = '[servidor] valor de la unidad ID %1';
Blockly.Msg['NETWORK_SERVER_GET_SLIDER_VALUE_TOOLTIP'] = 'Recupera el valor de la unidad de la página web rellenando el ID.';
Blockly.Msg['NETWORK_SERVER_GET_SWITCH_VALUE_TITLE'] = '[servidor] estado del ID del interruptor %1';
Blockly.Msg['NETWORK_SERVER_GET_SWITCH_VALUE_TOOLTIP'] = 'Recupera el estado del interruptor de la página web rellenando el ID.';
// Network - HTTP
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_TITLE'] = 'Método de solicitud HTTP %1 URL %2';
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_TOOLTIP'] = 'Le permite crear una solicitud HTTP de tipo GET/POST ingresando una dirección URL.';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_TITLE'] = '[ThingSpeak] envía datos con clave API';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_TOOLTIP'] = 'Este bloque le permite enviar mediciones de sensores a la aplicación ThingSpeakr utilizando el WiFi integrado del ESP32. Se puede utilizar con uno o más bloques de "Campo" y "Valor" presionando el botón más.';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_FIELD_TITLE'] = '[ThingSpeak] Campo %1 Valor %2';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_FIELD_TOOLTIP'] = 'Este bloque se utiliza como se indica en el bloque "Enviar datos en el canal". Ingrese el índice de campo y agregue la medida. Nota: Puede utilizar cualquier campo sólo una vez por envío de datos.';
Blockly.Msg['NETWORK_THINGSPEAK_READ_FEEDS_TITLE'] = 'Datos del gráfico [ThingSpeak]: ID de canal %1 Clave API %2 campo %3';
Blockly.Msg['NETWORK_THINGSPEAK_READ_FEEDS_TOOLTIP'] = 'Le permite recibir datos desde su interfaz ThingSpeak. La clave API está disponible en la sección \'Claves API\' del canal.';
// Network - uMail
Blockly.Msg['NETWORK_UMAIL_SMTP_TITLE'] = '[mail] configurar servidor SMTP %1';
Blockly.Msg['NETWORK_UMAIL_SMTP_TOOLTIP'] = 'Configurar el servidor SMTP para el buzón.';
Blockly.Msg['NETWORK_UMAIL_SETUP_TITLE'] = '[mail] iniciar sesión en la cuenta: %1 contraseña: %2';
Blockly.Msg['NETWORK_UMAIL_SETUP_TOOLTIP'] = 'Iniciar sesión en una cuenta de correo electrónico.';
Blockly.Msg['NETWORK_UMAIL_TO_TITLE'] = '[mail] dirección del destinatario: %1 asunto del correo: %2';
Blockly.Msg['NETWORK_UMAIL_TO_TOOLTIP'] = 'Enviar un correo electrónico a la dirección especificada.';
Blockly.Msg['NETWORK_UMAIL_WRITE_SENDER_TITLE'] = '[mail] nombre del remitente: %1';
Blockly.Msg['NETWORK_UMAIL_WRITE_SENDER_TOOLTIP'] = 'Especificar el nombre del ESP32. Sintaxis: Nombre <direccion@mail.com>';
Blockly.Msg['NETWORK_UMAIL_WRITE_TITLE'] = '[mail] escribir y enviar el correo electrónico: %1';
Blockly.Msg['NETWORK_UMAIL_WRITE_TOOLTIP'] = 'Escribir una cadena en el correo. "From:" especifica la dirección de correo electrónico del remitente, "Subject:" especifica el asunto del correo.';
Blockly.Msg['NETWORK_UMAIL_QUIT_TITLE'] = '[mail] cerrar sesión del buzón';
Blockly.Msg['NETWORK_UMAIL_QUIT_TOOLTIP'] = 'Cerrar sesión del buzón.';
Blockly.Msg['NETWORK_UMAIL_SEND_IMAGE_TITLE'] = '[mail] enviar imagen en base64: %1';
Blockly.Msg['NETWORK_UMAIL_SEND_IMAGE_TOOLTIP'] = 'Permite enviar una imagen en base64 por correo electrónico.';
// Red - MQTT
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_TITLE'] = '[MQTT] conectarse al corredor %1 nombre de usuario %2 contraseña %3';
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_TOOLTIP'] = 'Le permite conectarse a un broker MQTT proporcionando la dirección IP de la máquina en la que se está ejecutando. La conexión con el corredor está aquí asegurada con un nombre de usuario y contraseña definidos por el corredor.';
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_PORT'] = 'puerto';
Blockly.Msg['NETWORK_MQTT_SUBSCRIBE_TOPIC_TITLE'] = '[MQTT] suscríbete al canal %1';
Blockly.Msg['NETWORK_MQTT_SUBSCRIBE_TOPIC_TOOLTIP'] = 'Permite que el cliente conectado al broker se suscriba a un canal para recibir datos del mismo. Esto permite identificar los datos recibidos.';
Blockly.Msg['NETWORK_MQTT_PUBLISH_VALUE_TITLE'] = '[MQTT] publica el mensaje %1 en el canal %2';
Blockly.Msg['NETWORK_MQTT_PUBLISH_VALUE_TOOLTIP'] = 'Le permite publicar un mensaje en un canal MQTT. Cada vez que se envían datos, el broker MQTT o el cliente deben especificar el canal a utilizar. No es necesario suscribirse al canal de envío de datos.';
Blockly.Msg['NETWORK_MQTT_DISCONNECT_TITLE'] = '[MQTT] desconectarse del corredor';
Blockly.Msg['NETWORK_MQTT_DISCONNECT_TOOLTIP'] = 'Le permite desconectar el cliente del broker MQTT.';
Blockly.Msg['NETWORK_MQTT_ON_MESSAGE_RECEIVED_TITLE'] = '[MQTT] si se recibe un mensaje en un canal en %1 entonces';
Blockly.Msg['NETWORK_MQTT_ON_MESSAGE_RECEIVED_TOOLTIP'] = 'Le permite ejecutar instrucciones si se recibe un mensaje en un canal MQTT (tema). Utilice la variable \'mensaje\' para acceder al valor dentro de esta función. Para ejecutar instrucciones dependiendo del canal, utilice el bloque \'si el canal es... entonces...\'.';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_TITLE'] = '[MQTT] si el canal es %1 entonces';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_ELSEIF'] = 'de lo contrario, si el canal es';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_TOOLTIP'] = 'Le permite verificar el nombre del canal (tema) antes de ejecutar las instrucciones. Este bloque debe usarse en el bloque \"[MQTT] Si se recibe un mensaje en un canal entonces ...\"';
Blockly.Msg['NETWORK_MQTT_ON_CONNECT_TITLE'] = '[MQTT] Si la tarjeta se conecta al corredor entonces';
Blockly.Msg['NETWORK_MQTT_ON_CONNECT_TOOLTIP'] = 'Le permite ejecutar instrucciones cuando el cliente ESP32 se conecta al broker MQTT.';
Blockly.Msg['NETWORK_MQTT_ON_DISCONNECT_TITLE'] = '[MQTT] Si la tarjeta se desconecta del corredor, entonces';
Blockly.Msg['NETWORK_MQTT_ON_DISCONNECT_TOOLTIP'] = 'Le permite ejecutar instrucciones cuando el cliente ESP32 se conecta al broker MQTT. Tenga en cuenta que no es necesario utilizar el bloque \'[MQTT] conectarse al corredor...\' nuevamente, el cliente intenta reconectarse automáticamente cuando publica un nuevo valor.';