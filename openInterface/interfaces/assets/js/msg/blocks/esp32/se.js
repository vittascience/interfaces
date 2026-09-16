/**
 * @fileoverview English messages for ESP32 microchips. (EN)
 */

'use strict';

// Network - Wifi
// Network - Server
// Network - Client
// Network - Web page
// Network - Get web page
// Network - HTTP
// Netzwerk – ThingSpeak
// Network - uMail
// Network - MQTT

Blockly.Msg["NETWORK_CONNECT_STATION_TITLE"] = "konfigurera station: inloggning (ssid) %1 lösenord %2";
Blockly.Msg["NETWORK_CONNECT_STATION_TOOLTIP"] = "Gör det möjligt att konfigurera stationen genom att ansluta " + Blockly.Msg.Esp32BoardName + " till ett Wi‑Fi‑nätverk. För att ta emot data som servern skickar i en webbläsare: anslut ESP32‑kortet och enheten till samma nätverk. Till exempel, om min nätverks IP‑adress är 192.168.1.X blir gateway 192.168.1.1. Skriv in serverns IP‑adress i enhetens webbläsare. Om du vill nå servern utan att använda IP‑adressen kan du ange ett värdnamn. Till exempel esp32-server. Skriv värdnamnet i webbläsaren: http://esp32-server/";
Blockly.Msg['NETWORK_CONNECT_STATION_IP'] = "statisk IP";
Blockly.Msg['NETWORK_CONNECT_STATION_MASK'] = "nätmask";
Blockly.Msg['NETWORK_CONNECT_STATION_GATEWAY'] = "gateway";
Blockly.Msg['NETWORK_CONNECT_STATION_HOSTNAME'] = 'DHCP-värdnamn';
Blockly.Msg["NETWORK_CONFIGURE_ACCESS_POINT_TITLE"] = "konfigurera åtkomstpunkt: inloggning (ssid) %1 statisk IP %2";
Blockly.Msg["NETWORK_CONFIGURE_ACCESS_POINT_TOOLTIP"] = "Gör det möjligt att konfigurera en Wi‑Fi-åtkomstpunkt på " + Blockly.Msg.Esp32BoardName + ".";
Blockly.Msg["NETWORK_DISCONNECT_STATION_TITLE"] = "koppla från station";
Blockly.Msg["NETWORK_DISCONNECT_STATION_TOOLTIP"] = "Gör det möjligt att koppla från stationen om den är ansluten till ett Wi‑Fi-nätverk.";
Blockly.Msg["NETWORK_IS_STATION_CONNECTED_TITLE"] = "Är stationen ansluten?";
Blockly.Msg["NETWORK_IS_STATION_CONNECTED_TOOLTIP"] = "Returnerar True om Wi‑Fi-stationen är aktiverad, annars False. Wi‑Fi-stationen måste vara konfigurerad för att använda denna funktion.";
Blockly.Msg["NETWORK_SET_NETWORK_TITLE"] = "%1 Wi‑Fi";
Blockly.Msg["NETWORK_SET_NETWORK_TOOLTIP"] = "Gör det möjligt att aktivera eller inaktivera Wi‑Fi‑modulen på " + Blockly.Msg.Esp32BoardName + ".";
Blockly.Msg["NETWORK_ACTIVATE"] = "aktivera";
Blockly.Msg["NETWORK_DISABLE"] = "inaktivera";
Blockly.Msg["NETWORK_SCAN_NETWORK_PROFILES_TITLE"] = "sök efter tillgängliga Wi‑Fi‑nätverk";
Blockly.Msg["NETWORK_SCAN_NETWORK_PROFILES_TOOLTIP"] = "Returnerar tillgängliga Wi‑Fi‑nätverk som en lista.";
Blockly.Msg["NETWORK_GET_STATION_INFOS_TITLE"] = "stationsinformation";
Blockly.Msg["NETWORK_GET_STATION_INFOS_TOOLTIP"] = "Returnerar en fyrtuple med IP‑adress, nätmask, gateway och DNS‑server.";
Blockly.Msg["NETWORK_CHANGE_SERVER_PORT_TITLE"] = "ändra serverns port till %1";
Blockly.Msg["NETWORK_CHANGE_SERVER_PORT_TOOLTIP"] = "Gör det möjligt att ändra porten för " + Blockly.Msg.Esp32BoardName + "-servern. " + Blockly.Msg.Esp32BoardName + " måste vara ansluten till ett Wi‑Fi‑nätverk.";
Blockly.Msg["NETWORK_SERVER_SEND_DATA_TITLE"] = "[server] skicka data %1";
Blockly.Msg["NETWORK_SERVER_SEND_DATA_TOOLTIP"] = "Gör det möjligt att skicka data från servern till klienten. " + Blockly.Msg.Esp32BoardName + " måste vara anslutet till ett Wi‑Fi‑nätverk.";
Blockly.Msg["NETWORK_SERVER_GET_CLIENT_DATA_TITLE"] = "[server] klientdata";
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_TOOLTIP'] = 'Returnerar data som tas emot från klienten. Som standard stängs anslutningen till klienten automatiskt vid varje serverloop. För att hålla anslutningen öppen klickar du på ⊕-knappen och ändrar den till False. Kortet ' + Blockly.Msg.Esp32BoardName + ' måste vara anslutet till ett Wi‑Fi‑nätverk.';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_CLOSING'] = 'stäng anslutningen?';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_PARAM_TITLE'] = '[server] begäransparameter';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_PARAM_TOOLTIP'] = 'Returnerar parametern i förfrågan som klienten skickade. ' + Blockly.Msg.Esp32BoardName + ' måste vara anslutet till ett Wi‑Fi‑nätverk.';
Blockly.Msg["NETWORK_SERVER_GET_CLIENT_IP_TITLE"] = "[server] hämta klientens IP";
Blockly.Msg["NETWORK_SERVER_GET_CLIENT_IP_TOOLTIP"] = "Returnerar klientens IP. " + Blockly.Msg.Esp32BoardName + " måste vara anslutet till ett Wi‑Fi‑nätverk.";
Blockly.Msg['NETWORK_SERVER_CLOSE_CLIENT_CONNECTION_TITLE'] = '[server] stäng anslutningen till klienten';
Blockly.Msg['NETWORK_SERVER_CLOSE_CLIENT_CONNECTION_TOOLTIP'] = 'Stänger anslutningen till klienten.' + Blockly.Msg.Esp32BoardName + ' måste vara anslutet till ett Wi‑Fi‑nätverk.';
Blockly.Msg["NETWORK_SERVER_SEND_WEB_PAGE_TITLE"] = "[server] skicka webbsida";
Blockly.Msg["NETWORK_SERVER_SEND_WEB_PAGE_HTML"] = "html";
Blockly.Msg["NETWORK_SERVER_SEND_WEB_PAGE_TOOLTIP"] = "Gör det möjligt att skicka en webbsida till klienten. " + Blockly.Msg.Esp32BoardName + " måste vara anslutet till ett Wi‑Fi‑nätverk.";
Blockly.Msg["NETWORK_CLIENT_GET_SERVER_DATA_TITLE"] = "[client] hämta data från server IP %1";
Blockly.Msg["NETWORK_CLIENT_GET_SERVER_DATA_TOOLTIP"] = "Returnerar data från servern. " + Blockly.Msg.Esp32BoardName + " måste vara anslutet till ett Wi‑Fi‑nätverk.";
Blockly.Msg["NETWORK_CLIENT_SEND_DATA_TITLE"] = "[client] skicka data %1 till server IP %2";
Blockly.Msg["NETWORK_CLIENT_SEND_DATA_TOOLTIP"] = "Gör det möjligt att skicka data från klienten till servern. " + Blockly.Msg.Esp32BoardName + " måste vara anslutet till ett Wi‑Fi‑nätverk.";
Blockly.Msg["NETWORK_CLIENT_SEND_DATA_PORT"] = "port";
Blockly.Msg["NETWORK_ADD_TITLE_TITLE"] = "[html] lägg till underrubrik %1 nivå %2 färg %3";
Blockly.Msg["NETWORK_ADD_TITLE_TOOLTIP"] = "Gör det möjligt att lägga till underrubriker på webbsidan. Detta block måste användas i '[server] send web page'-blocket.";
Blockly.Msg["NETWORK_ADD_TEXT_TITLE"] = "[html] lägg till text %1";
Blockly.Msg["NETWORK_ADD_TEXT_TOOLTIP"] = "Gör det möjligt att lägga till text på webbsidan. Detta block måste användas i '[server] send web page'-blocket. Klicka på + för att ange teckenstorlek eller textfärg.";
Blockly.Msg["NETWORK_ADD_TEXT_SIZE"] = "teckenstorlek";
Blockly.Msg["NETWORK_ADD_TEXT_COLOR"] = "färg";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_TITLE"] = "[html] lägg till knapp ID %1 text %2";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_TOOLTIP"] = "Gör det möjligt att lägga till en knapp på webbsidan. ID gör att du kan läsa knappens status. Detta block måste användas i '[server] send web page'-blocket. Klicka på + för att ange knappens färg och form.";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_COLOUR"] = "färg";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_HEIGHT"] = "höjd";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_WIDTH"] = "bredd";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_TITLE"] = "[html] lägg till reglage ID %1";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_TOOLTIP"] = "Gör det möjligt att lägga till ett reglage på webbsidan. ID gör att du kan få reglagets värde. Detta block måste användas i '[server] send web page'-blocket.";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_MIN"] = "min";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_MAX"] = "max";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_HORIZONTAL"] = "horisontell";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_VERTICAL"] = "vertikal";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_HEIGHT"] = "höjd";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_WIDTH"] = "bredd";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_TITLE"] = "[html] lägg till strömbrytare ID %1";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_COLOUR"] = "färg";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_SIZE"] = "storlek";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_TOOLTIP"] = "Gör det möjligt att lägga till en växlingsknapp på webbsidan. ID gör att du kan läsa växlarens värde. Detta block måste användas i '[server] send web page'-blocket.";
Blockly.Msg["NETWORK_HTML_ADD_GAUGE_TITLE"] = "[html] lägg till mätare %1 värde %2 min %3 max %4";
Blockly.Msg["NETWORK_HTML_ADD_GAUGE_TOOLTIP"] = "Gör det möjligt att lägga till en mätare på webbsidan. Du kan ange mätarens titel och enhet. Detta block måste användas i '[server] send web page'-blocket.";
Blockly.Msg['NETWORK_ADD_LINK_TITLE'] = '[html] lägg till länk %1 URL %2';
Blockly.Msg['NETWORK_ADD_LINK_TOOLTIP'] = 'Gör det möjligt att lägga till en länk genom att klicka på en definierad text på webbsidan. Detta block måste användas i \'[server] send web page\'-blocket. Klicka på + för att ange teckenstorlek eller textfärg.';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_TITLE'] = '[html] visa bild %1';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_TOOLTIP'] = 'Gör det möjligt att lägga till en bild på webbsidan med base64-data. Tryck på + knappen för att konfigurera bildfönstret på webbsidan. Detta block måste användas i \'html\'-instruktionen i \'[Server] send web page\'.';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_HEIGHT'] = 'höjd';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_WIDTH'] = 'bredd';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_TITLE'] = '[html] visa bildström %1';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_TOOLTIP'] = 'Gör det möjligt att skicka en videoström till webbsidan med base64-bilddata. För att detta ska fungera måste variabeln \'image_data\' innehålla data från en bildtagning. Detta block måste användas i \'html\'-instruktionen i \'[Server] send web page\'.';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_HEIGHT'] = 'höjd';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_WIDTH'] = 'bredd';
Blockly.Msg["NETWORK_HTML_TAG_TITLE"] = "[html] tagg %1";
Blockly.Msg["NETWORK_HTML_TAG_TOOLTIP"] = "Låter dig lägga till en HTML-tagg som <div></div>, <form></form> (för knappar) eller <center></center>. Detta block måste användas i '[server] send web page' block.";
Blockly.Msg["NETWORK_HTML_FORMAT_TEXT_TITLE"] = "[html] sätt text %1 till %2";
Blockly.Msg["NETWORK_HTML_FORMAT_TEXT_TOOLTIP"] = "Låter dig lägga till ett HTML-element för textformatering. Detta block måste användas i '[server] send web page' block.";
Blockly.Msg["NETWORK_HTML_TAG_BOLD"] = "fetstil <b>";
Blockly.Msg["NETWORK_HTML_TAG_ITALIC"] = "kursiv <i>";
Blockly.Msg["NETWORK_HTML_TAG_INSERTED"] = "insatt <ins>";
Blockly.Msg["NETWORK_HTML_TAG_MARKED"] = "markerad <mark>";
Blockly.Msg["NETWORK_HTML_TAG_DELETED"] = "struken <del>";
Blockly.Msg["NETWORK_HTML_TAG_SMALL"] = "mindre <small>";
Blockly.Msg['NETWORK_HTML_NEWLINE_TITLE'] = '[html] ny rad <br>';
Blockly.Msg['NETWORK_HTML_NEWLINE_TOOLTIP'] = "Gör det möjligt att infoga en radbrytning i webbsidan. Detta block måste användas i \'html\'-instruktionen i \'[Server] block send the web page\'." ;
Blockly.Msg['NETWORK_HTML_ADD_TITLE'] = '[html] lägg till HTML-kod %1';
Blockly.Msg['NETWORK_HTML_ADD_TOOLTIP'] = "Gör det möjligt att lägga till HTML-kod i webbsidan. Detta block måste användas i \'html\'-instruktionen i blocket \'[server] send html page\'." ;
Blockly.Msg['NETWORK_HTML_ADD_SYMBOL_TITLE'] = 'Blockly.Msg[\'NETWORK_HTML_ADD_SYMBOL_TITLE\'] = \'[html] lägg till HTML-symbol %1 storlek %2 format %3\';';
Blockly.Msg['NETWORK_HTML_ADD_SYMBOL_TOOLTIP'] = "Låter dig lägga till en HTML-symbol på webbsidan genom att ange dess storlek (standard 50px). Detta block måste användas i 'html'-instruktionen i '[server] send html page' block.";
Blockly.Msg["NETWORK_SERVER_GET_BUTTON_STATE_TITLE"] = "[server] hämta tillstånd för knapp-ID %1";
Blockly.Msg["NETWORK_SERVER_GET_BUTTON_STATE_TOOLTIP"] = "Låter dig hämta knappens tillstånd från webbsidan genom att ange knappens ID.";
Blockly.Msg["NETWORK_SERVER_GET_SLIDER_VALUE_TITLE"] = "[server] hämta reglagevärde från ID %1";
Blockly.Msg["NETWORK_SERVER_GET_SLIDER_VALUE_TOOLTIP"] = "Låter dig hämta reglagets värde från webbsidan genom att ange reglagets ID.";
Blockly.Msg["NETWORK_SERVER_GET_SWITCH_VALUE_TITLE"] = "[server] hämta värde från strömbrytare ID %1";
Blockly.Msg["NETWORK_SERVER_GET_SWITCH_VALUE_TOOLTIP"] = "Låter dig hämta strömbrytarens värde från webbsidan genom att ange brytarens ID.";
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_TITLE'] = 'HTTP-förfrågan metod %1 URL %2';
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_TOOLTIP'] = 'Låter dig skapa en HTTP-förfrågan av typen GET/POST genom att ange en URL-adress.';
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_CONTENT'] = 'innehåll:';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_TITLE'] = '[ThingSpeak] skicka data med API-nyckel';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_TOOLTIP'] = 'Blockly.Msg[\'NETWORK_THINGSPEAK_SEND_DATA_TOOLTIP\'] = \'Detta block låter dig skicka sensormätningar till ThingSpeak med hjälp av ESP32:s inbyggda WiFi. Det kan användas med ett eller flera "Field"- och "Value"-block genom att trycka på plustecknet.\';';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_FIELD_TITLE'] = '[ThingSpeak] Fält %1 Värde %2';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_FIELD_TOOLTIP'] = 'Detta block används som i "Send data in channel"-blocket. Ange fältets index och lägg till mätvärdet. Obs: Du kan använda ett fält endast en gång per dataskick.';
Blockly.Msg['NETWORK_THINGSPEAK_READ_FEEDS_TITLE'] = '[ThingSpeak] diagramdata: kanal-ID %1 API-nyckel %2 fält %3';
Blockly.Msg['NETWORK_THINGSPEAK_READ_FEEDS_TOOLTIP'] = 'Låter dig ta emot data från ditt ThingSpeak-konto. API-nyckeln finns i sektionen \'API Keys\' för kanalen.';
Blockly.Msg['NETWORK_UMAIL_SMTP_TITLE'] = '[mail] konfigurera SMTP-server %1';
Blockly.Msg['NETWORK_UMAIL_SMTP_TOOLTIP'] = 'Konfigurera SMTP-servern för e-postkontot.';
Blockly.Msg['NETWORK_UMAIL_SETUP_TITLE'] = '[mail] logga in på konto: %1 lösenord: %2';
Blockly.Msg['NETWORK_UMAIL_SETUP_TOOLTIP'] = 'Logga in på ett e-postkonto.';
Blockly.Msg['NETWORK_UMAIL_TO_TITLE'] = '[mail] mottagaradress: %1 ämne: %2';
Blockly.Msg['NETWORK_UMAIL_TO_TOOLTIP'] = 'Skicka ett e-postmeddelande till den angivna adressen.';
Blockly.Msg['NETWORK_UMAIL_WRITE_SENDER_TITLE'] = '[mail] avsändarnamn: %1';
Blockly.Msg['NETWORK_UMAIL_WRITE_SENDER_TOOLTIP'] = 'Blockly.Msg[\'NETWORK_UMAIL_WRITE_SENDER_TOOLTIP\'] = \'Ange ESP32:s namn. Syntax: Namn <address@mail.com>\';';
Blockly.Msg['NETWORK_UMAIL_WRITE_TITLE'] = '[mail] skriv och skicka e-post: %1';
Blockly.Msg['NETWORK_UMAIL_WRITE_TOOLTIP'] = 'Skriv en sträng i e-postmeddelandet. "From:" anger avsändarens e-postadress, "Subject:" anger meddelandets ämne.';
Blockly.Msg['NETWORK_UMAIL_QUIT_TITLE'] = '[mail] logga ut från e-postkontot';
Blockly.Msg['NETWORK_UMAIL_QUIT_TOOLTIP'] = 'Logga ut från e-postkontot.';
Blockly.Msg['NETWORK_UMAIL_SEND_IMAGE_TITLE'] = '[mail] skicka bild i base64: %1';
Blockly.Msg['NETWORK_UMAIL_SEND_IMAGE_TOOLTIP'] = 'Gör det möjligt att skicka en bild i base64 via e-post.';
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_TITLE'] = '[MQTT] anslut till broker %1 användarnamn %2 lösenord %3';
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_TOOLTIP'] = 'Gör det möjligt att ansluta till en MQTT-broker genom att ange IP-adressen till maskinen där den körs. Anslutningen till brokern säkras här med ett användarnamn och lösenord som definieras av brokern.';
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_PORT'] = 'port';
Blockly.Msg['NETWORK_MQTT_SUBSCRIBE_TOPIC_TITLE'] = '[MQTT] prenumerera på kanal %1';
Blockly.Msg['NETWORK_MQTT_SUBSCRIBE_TOPIC_TOOLTIP'] = 'Gör att klienten ansluten till brokern kan prenumerera på en kanal för att ta emot data från den. Det gör det möjligt att identifiera den mottagna datan.';
Blockly.Msg['NETWORK_MQTT_PUBLISH_VALUE_TITLE'] = '[MQTT] publicera meddelande %1 till kanal %2';
Blockly.Msg['NETWORK_MQTT_PUBLISH_VALUE_TOOLTIP'] = 'Gör det möjligt att publicera ett meddelande till en MQTT-kanal. Varje gång data skickas måste MQTT-brokern eller klienten ange vilken kanal som används. Det är inte nödvändigt att prenumerera på den kanal som används för att skicka data.';
Blockly.Msg['NETWORK_MQTT_DISCONNECT_TITLE'] = '[MQTT] koppla från broker';
Blockly.Msg['NETWORK_MQTT_DISCONNECT_TOOLTIP'] = 'Gör det möjligt att koppla klienten från MQTT-brokern.';
Blockly.Msg['NETWORK_MQTT_ON_MESSAGE_RECEIVED_TITLE'] = '[MQTT] om ett meddelande tas emot i kanal %1 då';
Blockly.Msg['NETWORK_MQTT_ON_MESSAGE_RECEIVED_TOOLTIP'] = 'Gör det möjligt att köra instruktioner när ett meddelande tas emot i en MQTT-kanal (topic). Använd variabeln \'message\' för att komma åt värdet i denna funktion. För att köra instruktioner baserat på kanalen, använd blocket \'if channel is .. then ..\'.';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_TITLE'] = '[MQTT] om kanal är %1 då';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_ELSEIF'] = 'annars om kanal är';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_TOOLTIP'] = 'Gör det möjligt att kontrollera kanalnamnet (topic) innan instruktionerna körs. Detta block måste användas inom \"[MQTT] If a message is received in a channel then ...\"-blocket';
Blockly.Msg['NETWORK_MQTT_ON_CONNECT_TITLE'] = '[MQTT] Om kortet ansluter till brokern då';
Blockly.Msg['NETWORK_MQTT_ON_CONNECT_TOOLTIP'] = 'Gör det möjligt att köra instruktioner när ESP32-klienten ansluter till MQTT-brokern.';
Blockly.Msg['NETWORK_MQTT_ON_DISCONNECT_TITLE'] = '[MQTT] Om kortet kopplas från brokern då';
Blockly.Msg['NETWORK_MQTT_ON_DISCONNECT_TOOLTIP'] = 'Gör det möjligt att köra instruktioner när ESP32-klienten kopplas från MQTT-brokern. Observera att det inte är nödvändigt att använda blocket \'[MQTT] connect to broker ...\' igen; klienten försöker automatiskt återansluta när den publicerar ett nytt värde.';
