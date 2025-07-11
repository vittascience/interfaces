/**
 * @fileoverview Arabic messages for ESP32 microchips. (AR)
 * Not translated yet.
 */

'use strict';

// Network - Wifi
Blockly.Msg["NETWORK_CONNECT_STATION_TITLE"] = "configure station: login (ssid) %1 password %2";
Blockly.Msg["NETWORK_CONNECT_STATION_TOOLTIP"] = "Enable to configure station by connecting " + Blockly.Msg.boardName + " on Wifi network. To receive data sent by the server in a browser: Connect the ESP32 board and the device on the same network. For example, if my network IP address is 192.168.1.X, the gateway will be 192.168.1.1. Enter the server's IP address into the device's browser. If you want to access the server without going through the IP address, you can set a host name. For example, esp32-server. Enter the host name in the browser: http://esp32-server/";
Blockly.Msg['NETWORK_CONNECT_STATION_IP'] = "static IP";
Blockly.Msg['NETWORK_CONNECT_STATION_MASK'] = "subnet mask";
Blockly.Msg['NETWORK_CONNECT_STATION_GATEWAY'] = "gateway";
Blockly.Msg['NETWORK_CONNECT_STATION_HOSTNAME'] = 'DHCP hostname';
Blockly.Msg["NETWORK_CONFIGURE_ACCESS_POINT_TITLE"] = "configure access point: login (ssid) %1 static IP %2";
Blockly.Msg["NETWORK_CONFIGURE_ACCESS_POINT_TOOLTIP"] = "Enable to configure a wifi access point wifi on " + Blockly.Msg.boardName + ".";
Blockly.Msg["NETWORK_DISCONNECT_STATION_TITLE"] = "disconnect station";
Blockly.Msg["NETWORK_DISCONNECT_STATION_TOOLTIP"] = "Enable to disconnect station if it's connected on wifi network.";
Blockly.Msg["NETWORK_IS_STATION_CONNECTED_TITLE"] = "is station connected ?";
Blockly.Msg["NETWORK_IS_STATION_CONNECTED_TOOLTIP"] = "Returns True if wifi station is activated, else return False. The wifi station had to be configure to use this function.";
Blockly.Msg["NETWORK_SET_NETWORK_TITLE"] = "%1 wifi";
Blockly.Msg["NETWORK_SET_NETWORK_TOOLTIP"] = "Enable to activate or disable wifi module of " + Blockly.Msg.boardName + ".";
Blockly.Msg["NETWORK_ACTIVATE"] = "activate";
Blockly.Msg["NETWORK_DISABLE"] = "disable";
Blockly.Msg["NETWORK_SCAN_NETWORK_PROFILES_TITLE"] = "scan available wifi networks";
Blockly.Msg["NETWORK_SCAN_NETWORK_PROFILES_TOOLTIP"] = "Returns available wifi networks in list.";
Blockly.Msg["NETWORK_GET_STATION_INFOS_TITLE"] = "station informations";
Blockly.Msg["NETWORK_GET_STATION_INFOS_TOOLTIP"] = "Returns 4-tuple containing IP address, subnet mask, gateway and DNS server.";
Blockly.Msg["NETWORK_CHANGE_SERVER_PORT_TITLE"] = "change server port to %1";
Blockly.Msg["NETWORK_CHANGE_SERVER_PORT_TOOLTIP"] = "Enable to change the port of " + Blockly.Msg.boardName + " server. " + Blockly.Msg.boardName + " has to be connected on a network wifi.";
// Network - Server
Blockly.Msg["NETWORK_SERVER_SEND_DATA_TITLE"] = "[server] send data %1";
Blockly.Msg["NETWORK_SERVER_SEND_DATA_TOOLTIP"] = "Enable to send data from server to client. " + Blockly.Msg.boardName + " has to be connected on a network wifi.";
Blockly.Msg["NETWORK_SERVER_GET_CLIENT_DATA_TITLE"] = "[server] client data";
Blockly.Msg["NETWORK_SERVER_GET_CLIENT_DATA_TOOLTIP"] = "Returns client request. " + Blockly.Msg.boardName + " has to be connected on a network wifi.";
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_PARAM_TITLE'] = '[server] request parameter';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_PARAM_TOOLTIP'] = 'Returns the parameter of the request sent by the client. ' + Blockly.Msg.boardName + ' must be connected to a Wi-Fi network.';
Blockly.Msg["NETWORK_SERVER_GET_CLIENT_IP_TITLE"] = "[server] get client IP";
Blockly.Msg["NETWORK_SERVER_GET_CLIENT_IP_TOOLTIP"] = "Returns client IP. " + Blockly.Msg.boardName + " has to be connected on a network wifi.";
Blockly.Msg["NETWORK_SERVER_SEND_WEB_PAGE_TITLE"] = "[server] send web page";
Blockly.Msg["NETWORK_SERVER_SEND_WEB_PAGE_HTML"] = "html";
Blockly.Msg["NETWORK_SERVER_SEND_WEB_PAGE_TOOLTIP"] = "Enable to send web page to client. " + Blockly.Msg.boardName + " has to be connected on a network wifi.";
// Network - Client
Blockly.Msg["NETWORK_CLIENT_GET_SERVER_DATA_TITLE"] = "[client] get data from server IP %1";
Blockly.Msg["NETWORK_CLIENT_GET_SERVER_DATA_TOOLTIP"] = "Returns request from server. " + Blockly.Msg.boardName + " has to be connected on a network wifi.";
Blockly.Msg["NETWORK_CLIENT_SEND_DATA_TITLE"] = "[client] send data %1 to server IP %2";
Blockly.Msg["NETWORK_CLIENT_SEND_DATA_TOOLTIP"] = "Enable to send data from client to server. " + Blockly.Msg.boardName + " has to be connected on a network wifi.";
Blockly.Msg["NETWORK_CLIENT_SEND_DATA_PORT"] = "port";
// Network - Web page
Blockly.Msg["NETWORK_ADD_TITLE_TITLE"] = "[html] add a subtitle %1 level %2 colour %3";
Blockly.Msg["NETWORK_ADD_TITLE_TOOLTIP"] = "Enable to add subtitles on web page. This bloc has to be used in '[server] send web page' block.";
Blockly.Msg["NETWORK_ADD_TEXT_TITLE"] = "[html] add text %1";
Blockly.Msg["NETWORK_ADD_TEXT_TOOLTIP"] = "Enable to add some text in web page. This bloc has to be used in '[server] send web page' block. Click on + to set font size or font colour.";
Blockly.Msg["NETWORK_ADD_TEXT_SIZE"] = "font size";
Blockly.Msg["NETWORK_ADD_TEXT_COLOR"] = "color";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_TITLE"] = "[html] add button ID %1 text %2";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_TOOLTIP"] = "Enable to add a button in web page. ID allows you to get state of the button. This bloc has to be used in '[server] send web page' block.  Click on + to set colour of button and its shape.";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_COLOUR"] = "colour";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_HEIGHT"] = "height";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_WIDTH"] = "width";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_TITLE"] = "[html] add slider ID %1";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_TOOLTIP"] = "Enable to add a range slider in web page. ID allows you to get value of the slider. This bloc has to be used in '[server] send web page' block.";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_MIN"] = "min";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_MAX"] = "max";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_HORIZONTAL"] = "horizontal";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_VERTICAL"] = "vertical";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_HEIGHT"] = "height";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_WIDTH"] = "width";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_TITLE"] = "[html] add switch ID %1";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_COLOUR"] = "colour";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_SIZE"] = "size";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_TOOLTIP"] = "Enable to add a switch button in web page. ID allows you to get value of the switch. This bloc has to be used in '[server] send web page' block.";
Blockly.Msg["NETWORK_HTML_ADD_GAUGE_TITLE"] = "[html] add gauge %1 value %2 min %3 max %4";
Blockly.Msg["NETWORK_HTML_ADD_GAUGE_TOOLTIP"] = "Enable to add a gauge in web page. You can set the title and unit of the gauge. This bloc has to be used in '[server] send web page' block.";
Blockly.Msg['NETWORK_ADD_LINK_TITLE'] = '[html] add link %1 URL %2';
Blockly.Msg['NETWORK_ADD_LINK_TOOLTIP'] = 'Enable to add a link by clicking on defined text in web page. This bloc has to be used in \'[server] send web page\' block. Click on + to set font size or font colour.';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_TITLE'] = '[html] display image %1';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_TOOLTIP'] = 'Allows you to add an image to the web page with base64 data. Press the + button to configure the image window in the web page. This block must be used in the \'html\' instruction of the \'[Server] send web page.';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_HEIGHT'] = 'height';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_WIDTH'] = 'width';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_TITLE'] = '[html] display image stream %1';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_TOOLTIP'] = 'Allows you to send a video stream to the web page with base64 image data. For this to work, the \'image_data\' variable must contain the data of a capture. This block must be used in the \'html\' instruction of the \'[Server] send web page.';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_HEIGHT'] = 'height';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_WIDTH'] = 'width';
Blockly.Msg["NETWORK_HTML_TAG_TITLE"] = "[html] tag %1";
Blockly.Msg["NETWORK_HTML_TAG_TOOLTIP"] = "Enable to add HTML tag as <div></div>, <form></form> (for buttons) or <center></center>. This bloc has to be used in '[server] send web page' block.";
Blockly.Msg["NETWORK_HTML_FORMAT_TEXT_TITLE"] = "[html] set text %1 to %2";
Blockly.Msg["NETWORK_HTML_FORMAT_TEXT_TOOLTIP"] = "Enable to add HTML text formatting element. This bloc has to be used in '[server] send web page' block.";
Blockly.Msg["NETWORK_HTML_TAG_BOLD"] = "bold <b>";
Blockly.Msg["NETWORK_HTML_TAG_ITALIC"] = "italic <i>";
Blockly.Msg["NETWORK_HTML_TAG_INSERTED"] = "inserted <ins>";
Blockly.Msg["NETWORK_HTML_TAG_MARKED"] = "marked <mark>";
Blockly.Msg["NETWORK_HTML_TAG_DELETED"] = "deleted <del>";
Blockly.Msg["NETWORK_HTML_TAG_SMALL"] = "smalled <small>";
Blockly.Msg['NETWORK_HTML_NEWLINE_TITLE'] = '[html] newline <br>';
Blockly.Msg['NETWORK_HTML_NEWLINE_TOOLTIP'] = "Allows you to perform a line break in the web page. This block must be used in the \'html\' instruction of the \'[Server] block send the web page\'.";
Blockly.Msg['NETWORK_HTML_ADD_SYMBOL_TITLE'] = '[html] إضافة رمز HTML %1 الحجم %2 التنسيق %3';
Blockly.Msg['NETWORK_HTML_ADD_SYMBOL_TOOLTIP'] = "يتيح إضافة رمز HTML إلى صفحة الويب بتحديد حجمه (الافتراضي 50px). يجب استخدام هذه الكتلة داخل تعليمة 'html' في الكتلة '[الخادم] إرسال صفحة html'.";
// Network - Get web page
Blockly.Msg["NETWORK_SERVER_GET_BUTTON_STATE_TITLE"] = "[server] get state of button ID %1";
Blockly.Msg["NETWORK_SERVER_GET_BUTTON_STATE_TOOLTIP"] = "Enable to get state of button from web page by giving the button ID.";
Blockly.Msg["NETWORK_SERVER_GET_SLIDER_VALUE_TITLE"] = "[server] get slider value from ID %1";
Blockly.Msg["NETWORK_SERVER_GET_SLIDER_VALUE_TOOLTIP"] = "Enable to get slider value from web page by giving the slider id.";
Blockly.Msg["NETWORK_SERVER_GET_SWITCH_VALUE_TITLE"] = "[server] get switch value from ID %1";
Blockly.Msg["NETWORK_SERVER_GET_SWITCH_VALUE_TOOLTIP"] = "Enable to get switch value from web page by giving the switch id.";
// Network - HTTP
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_TITLE'] = 'HTTP request method %1 url %2';
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_TOOLTIP'] = 'Allows you to create a GET/POST type HTTP request by entering a url address.';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_TITLE'] = '[ThingSpeak] send data with API key';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_TOOLTIP'] = 'This block allows you to send sensor measurements to the ThingSpeakr application using the ESP32\'s integrated WiFi. It can be used with one or more "Field" and "Value" blocks by pressing the plus button.';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_FIELD_TITLE'] = '[ThingSpeak] Field %1 Value %2';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_FIELD_TOOLTIP'] = 'This block is used as given in the "Send data in channel" block. Enter the Field index, and add the measurement. Note: You can use any field only once per data submission.';
Blockly.Msg['NETWORK_THINGSPEAK_READ_FEEDS_TITLE'] = '[ThingSpeak] chart data: channel ID %1 API key %2 field %3';
Blockly.Msg['NETWORK_THINGSPEAK_READ_FEEDS_TOOLTIP'] = 'Allows you to receive data from your ThingSpeak interface. The API key is available in the \'API Keys\' section of the channel.';
// Network - uMail
Blockly.Msg['NETWORK_UMAIL_SMTP_TITLE'] = '[mail] configure SMTP server %1';
Blockly.Msg['NETWORK_UMAIL_SMTP_TOOLTIP'] = 'Configure the SMTP server for the mailbox.';
Blockly.Msg['NETWORK_UMAIL_SETUP_TITLE'] = '[mail] log in to account: %1 password: %2';
Blockly.Msg['NETWORK_UMAIL_SETUP_TOOLTIP'] = 'Log in to an email account.';
Blockly.Msg['NETWORK_UMAIL_TO_TITLE'] = '[mail] recipient addres: %1 email subject: %2';
Blockly.Msg['NETWORK_UMAIL_TO_TOOLTIP'] = 'Send an email to the specified address.';
Blockly.Msg['NETWORK_UMAIL_WRITE_SENDER_TITLE'] = '[mail] sender name: %1';
Blockly.Msg['NETWORK_UMAIL_WRITE_SENDER_TOOLTIP'] = 'Specify the ESP32 name. Syntax: Name <address@mail.com>';
Blockly.Msg['NETWORK_UMAIL_WRITE_TITLE'] = '[mail] write and send the e-mail: %1';
Blockly.Msg['NETWORK_UMAIL_WRITE_TOOLTIP'] = 'Write a string into the email. "From:" specifies the sender\'s email address, "Subject:" specifies the subject of the email.';
Blockly.Msg['NETWORK_UMAIL_QUIT_TITLE'] = '[mail] log out from the mailbox';
Blockly.Msg['NETWORK_UMAIL_QUIT_TOOLTIP'] = 'Log out from the mailbox.';
Blockly.Msg['NETWORK_UMAIL_SEND_IMAGE_TITLE'] = '[mail] send image in base64: %1';
Blockly.Msg['NETWORK_UMAIL_SEND_IMAGE_TOOLTIP'] = 'Allows to send an image in base64 via email.';
// Network - MQTT
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_TITLE'] = '[MQTT] connect to broker %1 username %2 password %3';
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_TOOLTIP'] = 'Allows you to connect to an MQTT broker by entering the IP address of the machine on which it is running. The connection to the broker is secured here with a username and password defined by the broker.';
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_PORT'] = 'port';
Blockly.Msg['NETWORK_MQTT_SUBSCRIBE_TOPIC_TITLE'] = '[MQTT] subscribe to channel %1';
Blockly.Msg['NETWORK_MQTT_SUBSCRIBE_TOPIC_TOOLTIP'] = 'Allows the client connected to the broker to subscribe to a channel in order to receive data from it. This allows to identify the data received.';
Blockly.Msg['NETWORK_MQTT_PUBLISH_VALUE_TITLE'] = '[MQTT] publish message %1 to channel %2';
Blockly.Msg['NETWORK_MQTT_PUBLISH_VALUE_TOOLTIP'] = 'Allows to publish a message to an MQTT channel. Each time data is sent, the MQTT broker or the client must specify the channel to use. It is not necessary to subscribe to the data sending channel.';
Blockly.Msg['NETWORK_MQTT_DISCONNECT_TITLE'] = '[MQTT] disconnect from broker';
Blockly.Msg['NETWORK_MQTT_DISCONNECT_TOOLTIP'] = 'Allows to disconnect the client from the MQTT broker.';
Blockly.Msg['NETWORK_MQTT_ON_MESSAGE_RECEIVED_TITLE'] = '[MQTT] if a message is received in a channel in %1 then';
Blockly.Msg['NETWORK_MQTT_ON_MESSAGE_RECEIVED_TOOLTIP'] = 'Allows to execute instructions if a message is received in an MQTT channel (topic). Use the \'message\' variable to access the value within this function. To execute instructions based on the channel, use the \'if channel is .. then ..\' block.';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_TITLE'] = '[MQTT] if channel is %1 then';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_ELSEIF'] = 'else if channel is';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_TOOLTIP'] = 'Allows to check the channel name (topic) before executing instructions. This block must be used within the \"[MQTT] If a message is received in a channel then ...\" block';
Blockly.Msg['NETWORK_MQTT_ON_CONNECT_TITLE'] = '[MQTT] If the card connects to the broker then';
Blockly.Msg['NETWORK_MQTT_ON_CONNECT_TOOLTIP'] = 'Allows to execute instructions when the ESP32 client connects to the MQTT broker.';
Blockly.Msg['NETWORK_MQTT_ON_DISCONNECT_TITLE'] = '[MQTT] If the card disconnects from the broker then';
Blockly.Msg['NETWORK_MQTT_ON_DISCONNECT_TOOLTIP'] = 'Allows to execute instructions when the ESP32 client connects to the MQTT broker. Please note that it is not necessary to use the \'[MQTT] connect to broker ...\' block again, the client tries to reconnect automatically when it publishes a new value.';

