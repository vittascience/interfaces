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

Blockly.Msg["NETWORK_CONNECT_STATION_TITLE"] = "konfigurera station: inloggning (SSID) %1 lösenord %2";
Blockly.Msg["NETWORK_CONNECT_STATION_TOOLTIP"] = "Använd för att konfigurera stationen genom att ansluta " + Blockly.Msg.Esp32BoardName + " till Wi-Fi-nätverket. För att ta emot data som servern skickar i en webbläsare: anslut ESP32-kortet och enheten till samma nätverk. Till exempel, om nätverkets IP-adress är 192.168.1.X blir gateway 192.168.1.1. Ange serverns IP-adress i enhetens webbläsare. Om du vill nå servern utan att använda IP-adressen kan du sätta ett värdnamn, till exempel esp32-server. Ange värdnamnet i webbläsaren: http://esp32-server/";
Blockly.Msg['NETWORK_CONNECT_STATION_IP'] = "statisk IP";
Blockly.Msg['NETWORK_CONNECT_STATION_MASK'] = "subnätmask";
Blockly.Msg['NETWORK_CONNECT_STATION_GATEWAY'] = "gateway";
Blockly.Msg['NETWORK_CONNECT_STATION_HOSTNAME'] = 'DHCP-värdnamn';
Blockly.Msg["NETWORK_CONFIGURE_ACCESS_POINT_TITLE"] = "konfigurera accesspunkt: inloggning (SSID) %1 statisk IP %2";
Blockly.Msg["NETWORK_CONFIGURE_ACCESS_POINT_TOOLTIP"] = "Använd för att konfigurera en Wi-Fi-accesspunkt på " + Blockly.Msg.Esp32BoardName + ".";
Blockly.Msg["NETWORK_DISCONNECT_STATION_TITLE"] = "koppla från station";
Blockly.Msg["NETWORK_DISCONNECT_STATION_TOOLTIP"] = "Använd för att koppla bort stationen om den är ansluten till Wi-Fi.";
Blockly.Msg["NETWORK_IS_STATION_CONNECTED_TITLE"] = "är stationen ansluten ?";
Blockly.Msg["NETWORK_IS_STATION_CONNECTED_TOOLTIP"] = "Returnerar True om Wi-Fi-stationen är aktiv, annars False. Stationen måste vara konfigurerad för att använda denna funktion.";
Blockly.Msg["NETWORK_SET_NETWORK_TITLE"] = "%1 Wi-Fi";
Blockly.Msg["NETWORK_SET_NETWORK_TOOLTIP"] = "Använd för att aktivera eller inaktivera Wi-Fi-modulen på " + Blockly.Msg.Esp32BoardName + ".";
Blockly.Msg["NETWORK_ACTIVATE"] = "aktivera";
Blockly.Msg["NETWORK_DISABLE"] = "inaktivera";
Blockly.Msg["NETWORK_SCAN_NETWORK_PROFILES_TITLE"] = "sök tillgängliga Wi-Fi-nätverk";
Blockly.Msg["NETWORK_SCAN_NETWORK_PROFILES_TOOLTIP"] = "Returnerar en lista med tillgängliga Wi-Fi-nätverk.";
Blockly.Msg["NETWORK_GET_STATION_INFOS_TITLE"] = "stationsinformation";
Blockly.Msg["NETWORK_GET_STATION_INFOS_TOOLTIP"] = "Returnerar en fyrtuple med IP-adress, subnätmask, gateway och DNS-server.";
Blockly.Msg["NETWORK_CHANGE_SERVER_PORT_TITLE"] = "ändra serverns port till %1";
Blockly.Msg["NETWORK_CHANGE_SERVER_PORT_TOOLTIP"] = "Använd för att ändra porten för servern på " + Blockly.Msg.Esp32BoardName + ". " + Blockly.Msg.Esp32BoardName + " måste vara ansluten till ett Wi-Fi-nätverk.";
Blockly.Msg["NETWORK_SERVER_SEND_DATA_TITLE"] = "[server] skicka data %1";
Blockly.Msg["NETWORK_SERVER_SEND_DATA_TOOLTIP"] = "Använd för att skicka data från servern till klienten. " + Blockly.Msg.Esp32BoardName + " måste vara ansluten till ett Wi-Fi-nätverk.";
Blockly.Msg["NETWORK_SERVER_GET_CLIENT_DATA_TITLE"] = "[server] klientdata";
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_TOOLTIP'] = 'Returnerar data som tagits emot från klienten. Som standard stängs anslutningen till klienten automatiskt vid varje serverloop. För att hålla anslutningen öppen, klicka på ⊕-knappen och ändra den till False. Kortet ' + Blockly.Msg.Esp32BoardName + ' måste vara anslutet till ett Wi-Fi-nätverk.';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_CLOSING'] = 'stäng anslutningen ?';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_PARAM_TITLE'] = '[server] begäransparameter';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_PARAM_TOOLTIP'] = 'Returnerar parametern i förfrågan som klienten skickade. ' + Blockly.Msg.Esp32BoardName + ' måste vara anslutet till ett Wi-Fi-nätverk.';
Blockly.Msg["NETWORK_SERVER_GET_CLIENT_IP_TITLE"] = "[server] hämta klientens IP";
Blockly.Msg["NETWORK_SERVER_GET_CLIENT_IP_TOOLTIP"] = "Returnerar klientens IP. " + Blockly.Msg.Esp32BoardName + " måste vara anslutet till ett Wi-Fi-nätverk.";
Blockly.Msg['NETWORK_SERVER_CLOSE_CLIENT_CONNECTION_TITLE'] = '[server] stäng anslutningen till klienten';
Blockly.Msg['NETWORK_SERVER_CLOSE_CLIENT_CONNECTION_TOOLTIP'] = 'Stänger anslutningen till klienten. ' + Blockly.Msg.Esp32BoardName + ' måste vara anslutet till ett Wi-Fi-nätverk.';
Blockly.Msg["NETWORK_SERVER_SEND_WEB_PAGE_TITLE"] = "[server] skicka webbsida";
Blockly.Msg["NETWORK_SERVER_SEND_WEB_PAGE_HTML"] = "html";
Blockly.Msg["NETWORK_SERVER_SEND_WEB_PAGE_TOOLTIP"] = "Använd för att skicka en webbsida till klienten. " + Blockly.Msg.Esp32BoardName + " måste vara anslutet till ett Wi-Fi-nätverk.";
Blockly.Msg["NETWORK_CLIENT_GET_SERVER_DATA_TITLE"] = "[client] hämta data från serverns IP %1";
Blockly.Msg["NETWORK_CLIENT_GET_SERVER_DATA_TOOLTIP"] = "Returnerar svar från servern. " + Blockly.Msg.Esp32BoardName + " måste vara anslutet till ett Wi-Fi-nätverk.";
Blockly.Msg["NETWORK_CLIENT_SEND_DATA_TITLE"] = "[client] skicka data %1 till serverns IP %2";
Blockly.Msg["NETWORK_CLIENT_SEND_DATA_TOOLTIP"] = "Använd för att skicka data från klienten till servern. " + Blockly.Msg.Esp32BoardName + " måste vara anslutet till ett Wi-Fi-nätverk.";
Blockly.Msg["NETWORK_CLIENT_SEND_DATA_PORT"] = "port";
Blockly.Msg["NETWORK_ADD_TITLE_TITLE"] = "[html] lägg till underrubrik %1 nivå %2 färg %3";
Blockly.Msg["NETWORK_ADD_TITLE_TOOLTIP"] = "Använd för att lägga till underrubriker på webbsidan. Det här blocket måste användas i '[server] send web page'-blocket.";
Blockly.Msg["NETWORK_ADD_TEXT_TITLE"] = "[html] lägg till text %1";
Blockly.Msg["NETWORK_ADD_TEXT_TOOLTIP"] = "Använd för att lägga till text på webbsidan. Det här blocket måste användas i '[server] send web page'-blocket. Klicka på + för att ange teckenstorlek eller teckenfärg.";
Blockly.Msg["NETWORK_ADD_TEXT_SIZE"] = "teckenstorlek";
Blockly.Msg["NETWORK_ADD_TEXT_COLOR"] = "färg";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_TITLE"] = "[html] lägg till knapp ID %1 text %2";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_TOOLTIP"] = "Använd för att lägga till en knapp på webbsidan. ID gör att du kan läsa knappens status. Det här blocket måste användas i '[server] send web page'-blocket. Klicka på + för att välja knappens färg och form.";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_COLOUR"] = "färg";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_HEIGHT"] = "höjd";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_WIDTH"] = "bredd";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_TITLE"] = "[html] lägg till skjutreglage ID %1";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_TOOLTIP"] = "Använd för att lägga till ett skjutreglage på webbsidan. ID låter dig hämta reglagets värde. Det här blocket måste användas i '[server] send web page'-blocket.";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_MIN"] = "min";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_MAX"] = "max";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_HORIZONTAL"] = "horisontell";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_VERTICAL"] = "vertikal";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_HEIGHT"] = "höjd";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_WIDTH"] = "bredd";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_TITLE"] = "[html] lägg till omkopplare ID %1";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_COLOUR"] = "färg";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_SIZE"] = "storlek";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_TOOLTIP"] = "Använd för att lägga till en omkopplare på webbsidan. ID låter dig läsa av omkopplarens värde. Det här blocket måste användas i '[server] send web page'-blocket.";
Blockly.Msg["NETWORK_HTML_ADD_GAUGE_TITLE"] = "[html] lägg till mätare %1 värde %2 min %3 max %4";
Blockly.Msg["NETWORK_HTML_ADD_GAUGE_TOOLTIP"] = "Använd för att lägga till en mätare på webbsidan. Du kan ange mätarens titel och enhet. Det här blocket måste användas i '[server] send web page'-blocket.";
Blockly.Msg['NETWORK_ADD_LINK_TITLE'] = '[html] lägg till länk %1 URL %2';
Blockly.Msg['NETWORK_ADD_LINK_TOOLTIP'] = 'Använd för att lägga till en länk som öppnas när man klickar på en definierad text på webbsidan. Det här blocket måste användas i \'[server] send web page\'-blocket. Klicka på + för att ange teckenstorlek eller teckenfärg.';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_TITLE'] = '[html] visa bild %1';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_TOOLTIP'] = 'Gör att du kan lägga till en bild på webbsidan med base64-data. Tryck på + för att konfigurera bildens visningsfönster på webbsidan. Det här blocket måste användas i \'html\'-instruktionen i \'[Server] send web page\'.';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_HEIGHT'] = 'höjd';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_WIDTH'] = 'bredd';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_TITLE'] = '[html] visa bildström %1';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_TOOLTIP'] = 'Gör att du kan skicka en videoström till webbsidan med base64-bilddata. För att detta ska fungera måste variabeln \'image_data\' innehålla data från en bildtagning. Det här blocket måste användas i \'html\'-instruktionen i \'[Server] send web page\'.';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_HEIGHT'] = 'höjd';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_WIDTH'] = 'bredd';
Blockly.Msg["NETWORK_HTML_TAG_TITLE"] = "[html] tagg %1";
Blockly.Msg["NETWORK_HTML_TAG_TOOLTIP"] = "Gör att du kan lägga till HTML-taggar som <div></div>, <form></form> (för knappar) eller <center></center>. Det här blocket ska användas i '[server] send web page'-blocket.";
Blockly.Msg["NETWORK_HTML_FORMAT_TEXT_TITLE"] = "[html] sätt text %1 till %2";
Blockly.Msg["NETWORK_HTML_FORMAT_TEXT_TOOLTIP"] = "Gör det möjligt att lägga till HTML-formattering för text. Detta block ska användas i '[server] send web page'-blocket.";
Blockly.Msg["NETWORK_HTML_TAG_BOLD"] = "fet <b>";
Blockly.Msg["NETWORK_HTML_TAG_ITALIC"] = "kursiv <i>";
Blockly.Msg["NETWORK_HTML_TAG_INSERTED"] = "infogad <ins>";
Blockly.Msg["NETWORK_HTML_TAG_MARKED"] = "markerad <mark>";
Blockly.Msg["NETWORK_HTML_TAG_DELETED"] = "borttagen <del>";
Blockly.Msg["NETWORK_HTML_TAG_SMALL"] = "liten <small>";
Blockly.Msg['NETWORK_HTML_NEWLINE_TITLE'] = '[html] ny rad <br>';
Blockly.Msg['NETWORK_HTML_NEWLINE_TOOLTIP'] = "Gör att du kan göra en radbrytning på webbsidan. Detta block måste användas i \'html\'-instruktionen i \'[Server] block send the web page\'.";
Blockly.Msg['NETWORK_HTML_ADD_TITLE'] = '[html] lägg till HTML-kod %1';
Blockly.Msg['NETWORK_HTML_ADD_TOOLTIP'] = "Gör det möjligt att lägga till HTML-kod på webbsidan. Det här blocket måste användas i \'html\'-instruktionen i blocket \'[server] send html page\'.";
Blockly.Msg['NETWORK_HTML_ADD_SYMBOL_TITLE'] = 'Blockly.Msg[\'NETWORK_HTML_ADD_SYMBOL_TITLE\'] = \'[html] lägg till HTML-symbol %1 storlek %2 format %3\';';
Blockly.Msg['NETWORK_HTML_ADD_SYMBOL_TOOLTIP'] = "Gör det möjligt att lägga till en HTML-symbol på webbsidan genom att ange dess storlek (standard 50px). Det här blocket måste användas i 'html'-instruktionen i '[server] send html page'-blocket.";
Blockly.Msg["NETWORK_SERVER_GET_BUTTON_STATE_TITLE"] = "[server] hämta knappens tillstånd för ID %1";
Blockly.Msg["NETWORK_SERVER_GET_BUTTON_STATE_TOOLTIP"] = "Gör det möjligt att få knappens tillstånd från webbsidan genom att ange knappens ID.";
Blockly.Msg["NETWORK_SERVER_GET_SLIDER_VALUE_TITLE"] = "[server] hämta reglagets värde för ID %1";
Blockly.Msg["NETWORK_SERVER_GET_SLIDER_VALUE_TOOLTIP"] = "Gör det möjligt att hämta reglagets värde från webbsidan genom att ange reglagets ID.";
Blockly.Msg["NETWORK_SERVER_GET_SWITCH_VALUE_TITLE"] = "[server] hämta värde från strömbrytare, ID %1";
Blockly.Msg["NETWORK_SERVER_GET_SWITCH_VALUE_TOOLTIP"] = "Gör det möjligt att hämta strömbrytarens värde från webbsidan genom att ange dess ID.";
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_TITLE'] = 'HTTP-förfrågan metod %1 url %2';
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_TOOLTIP'] = 'Gör det möjligt att skapa en HTTP-förfrågan (GET/POST) genom att ange en url-adress.';
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_CONTENT'] = 'innehåll:';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_TITLE'] = '[ThingSpeak] skicka data med API-nyckel';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_TOOLTIP'] = 'Detta block låter dig skicka sensormätningar till ThingSpeak med ESP32\'s inbyggda WiFi. Det kan användas med ett eller flera "Field" och "Value"-block genom att trycka på plusknappen.';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_FIELD_TITLE'] = '[ThingSpeak] Fält %1 Värde %2';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_FIELD_TOOLTIP'] = 'Detta block används i "Send data in channel"-blocket. Ange fältets index och lägg till mätvärdet. Obs: Du kan använda varje fält högst en gång per data-skickning.';
Blockly.Msg['NETWORK_THINGSPEAK_READ_FEEDS_TITLE'] = '[ThingSpeak] läs diagramdata: kanal-ID %1 API-nyckel %2 fält %3';
Blockly.Msg['NETWORK_THINGSPEAK_READ_FEEDS_TOOLTIP'] = 'Gör det möjligt att hämta data från ditt ThingSpeak-konto. API-nyckeln finns i sektionen \'API Keys\' för kanalen.';
Blockly.Msg['NETWORK_UMAIL_SMTP_TITLE'] = '[mail] konfigurera SMTP-server %1';
Blockly.Msg['NETWORK_UMAIL_SMTP_TOOLTIP'] = 'Konfigurera SMTP-servern för e-postkontot.';
Blockly.Msg['NETWORK_UMAIL_SETUP_TITLE'] = '[mail] logga in på konto: %1 lösenord: %2';
Blockly.Msg['NETWORK_UMAIL_SETUP_TOOLTIP'] = 'Logga in på ett e-postkonto.';
Blockly.Msg['NETWORK_UMAIL_TO_TITLE'] = '[mail] mottagaradress: %1 ämne: %2';
Blockly.Msg['NETWORK_UMAIL_TO_TOOLTIP'] = 'Skicka ett e-postmeddelande till den angivna adressen.';
Blockly.Msg['NETWORK_UMAIL_WRITE_SENDER_TITLE'] = '[mail] avsändarnamn: %1';
Blockly.Msg['NETWORK_UMAIL_WRITE_SENDER_TOOLTIP'] = 'Ange ESP32:s namn. Syntax: Namn <address@mail.com>';
Blockly.Msg['NETWORK_UMAIL_WRITE_TITLE'] = '[mail] skriv och skicka e-post: %1';
Blockly.Msg['NETWORK_UMAIL_WRITE_TOOLTIP'] = 'Skriv en textsträng i e-postmeddelandet. "From:" anger avsändarens e-postadress, "Subject:" anger e-postens ämne.';
Blockly.Msg['NETWORK_UMAIL_QUIT_TITLE'] = '[mail] logga ut från e-postkontot';
Blockly.Msg['NETWORK_UMAIL_QUIT_TOOLTIP'] = 'Logga ut från e-postkontot.';
Blockly.Msg['NETWORK_UMAIL_SEND_IMAGE_TITLE'] = '[mail] skicka bild i base64: %1';
Blockly.Msg['NETWORK_UMAIL_SEND_IMAGE_TOOLTIP'] = 'Gör det möjligt att skicka en base64-kodad bild via e-post.';
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_TITLE'] = '[MQTT] anslut till broker %1 användarnamn %2 lösenord %3';
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_TOOLTIP'] = 'Gör det möjligt att ansluta till en MQTT-broker genom att ange IP-adressen till maskinen där den körs. Anslutningen till brokern säkras här med ett användarnamn och lösenord som brokern anger.';
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_PORT'] = 'port';
Blockly.Msg['NETWORK_MQTT_SUBSCRIBE_TOPIC_TITLE'] = '[MQTT] prenumerera på kanal %1';
Blockly.Msg['NETWORK_MQTT_SUBSCRIBE_TOPIC_TOOLTIP'] = 'Låter klienten som är ansluten till brokern prenumerera på en kanal för att ta emot data från den. Det gör det möjligt att identifiera vilken data som kommer in.';
Blockly.Msg['NETWORK_MQTT_PUBLISH_VALUE_TITLE'] = '[MQTT] publicera meddelande %1 till kanal %2';
Blockly.Msg['NETWORK_MQTT_PUBLISH_VALUE_TOOLTIP'] = 'Låter dig publicera ett meddelande till en MQTT-kanal. Varje gång data skickas måste brokern eller klienten ange vilken kanal som används. Det är inte nödvändigt att prenumerera på kanalen för att skicka data.';
Blockly.Msg['NETWORK_MQTT_DISCONNECT_TITLE'] = '[MQTT] koppla från broker';
Blockly.Msg['NETWORK_MQTT_DISCONNECT_TOOLTIP'] = 'Låter klienten koppla från MQTT-brokern.';
Blockly.Msg['NETWORK_MQTT_ON_MESSAGE_RECEIVED_TITLE'] = '[MQTT] om ett meddelande mottas på kanal %1 då';
Blockly.Msg['NETWORK_MQTT_ON_MESSAGE_RECEIVED_TOOLTIP'] = 'Gör det möjligt att köra instruktioner när ett meddelande tas emot på en MQTT-kanal (topic). Använd variabeln \'message\' för att komma åt meddelandets värde i denna funktion. För att utföra instruktioner baserat på kanalen, använd blocket \'if channel is .. then ..\'.';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_TITLE'] = '[MQTT] om kanal är %1 då';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_ELSEIF'] = 'annars om kanal är';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_TOOLTIP'] = 'Gör det möjligt att kontrollera kanalens namn (topic) innan instruktioner körs. Detta block måste användas inom blocket \"[MQTT] If a message is received in a channel then ...\"';
Blockly.Msg['NETWORK_MQTT_ON_CONNECT_TITLE'] = '[MQTT] Om kortet ansluter till brokern då';
Blockly.Msg['NETWORK_MQTT_ON_CONNECT_TOOLTIP'] = 'Gör det möjligt att köra instruktioner när ESP32-klienten ansluter till MQTT-brokern.';
Blockly.Msg['NETWORK_MQTT_ON_DISCONNECT_TITLE'] = '[MQTT] Om kortet kopplas från brokern då';
Blockly.Msg['NETWORK_MQTT_ON_DISCONNECT_TOOLTIP'] = 'Gör det möjligt att köra instruktioner när ESP32-klienten kopplas från MQTT-brokern. Observera att det inte är nödvändigt att använda blocket \'[MQTT] connect to broker ...\' igen; klienten försöker automatiskt återansluta när den publicerar ett nytt värde.'
