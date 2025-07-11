/**
 * @fileoverview French messages for ESP32 microchips. (FR)
 */

'use strict';

// Network - Wifi
Blockly.Msg['NETWORK_CONNECT_STATION_TITLE'] = 'connecter la station: nom du réseau %1 mot de passe %2';
Blockly.Msg['NETWORK_CONNECT_STATION_TOOLTIP'] = 'Permet de configurer une station wifi sur la carte ' + Blockly.Msg.boardName + ' en se connectant à un réseau wifi. Pour recevoir les données envoyées par le serveur dans un navigateur: Connecter la carte ESP32 et l\'appareil sur le même réseau. Par exemple, si l\'addresse IP de mon réseau est 192.168.1.X, la passerelle sera 192.168.1.1. Entrer l\'addresse IP du serveur dans le navigateur de l\'appareil.Si vous souhaitez accéder au serveur sans passer par l\'addresse IP, vous pouvez définir un nom d\'hôte. Par exemple, esp32-server. Entrer le nom de l\'hôte dans le navigateur : http://esp32-server/';
Blockly.Msg['NETWORK_CONNECT_STATION_IP'] = 'IP fixe';
Blockly.Msg['NETWORK_CONNECT_STATION_MASK'] = 'Masque du sous réseau';
Blockly.Msg['NETWORK_CONNECT_STATION_GATEWAY'] = 'Passerelle';
Blockly.Msg['NETWORK_CONNECT_STATION_HOSTNAME'] = 'Nom de l\'hôte';
Blockly.Msg['NETWORK_CONFIGURE_ACCESS_POINT_TITLE'] = 'créer un point d\'accès: nom du réseau %1 IP fixe %2';
Blockly.Msg['NETWORK_CONFIGURE_ACCESS_POINT_TOOLTIP'] = 'Permet de configurer un point d\'accès wif sur la carte ' + Blockly.Msg.boardName + '.';
Blockly.Msg['NETWORK_DISCONNECT_STATION_TITLE'] = 'déconnecter la station';
Blockly.Msg['NETWORK_DISCONNECT_STATION_TOOLTIP'] = 'Permet de déconnecter la station si elle est connectée à un réseau wifi.';
Blockly.Msg['NETWORK_IS_STATION_CONNECTED_TITLE'] = 'station est connecté ?';
Blockly.Msg['NETWORK_IS_STATION_CONNECTED_TOOLTIP'] = 'Retourne True si la station est activée, False sinon. La station wifi doit être configurée au préalable pour utilise ce bloc.';
Blockly.Msg['NETWORK_SET_NETWORK_TITLE'] = '%1 le wifi';
Blockly.Msg['NETWORK_SET_NETWORK_TOOLTIP'] = 'Permet d\'activer ou désactiver le module wifi de la carte ' + Blockly.Msg.boardName + '.';
Blockly.Msg['NETWORK_ACTIVATE'] = 'activer';
Blockly.Msg['NETWORK_DISABLE'] = 'désactiver';
Blockly.Msg['NETWORK_SCAN_NETWORK_PROFILES_TITLE'] = 'réseaux wifi disponibles';
Blockly.Msg['NETWORK_SCAN_NETWORK_PROFILES_TOOLTIP'] = 'Permet de scanner les réseaux wifi disponibles.';
Blockly.Msg['NETWORK_GET_STATION_INFOS_TITLE'] = 'informations de la station';
Blockly.Msg['NETWORK_GET_STATION_INFOS_TOOLTIP'] = 'Retourne un tuple contenant l\'addresse IP, le masque du sous-réseau, la passerelle et le serveur DNS.';
Blockly.Msg['NETWORK_CHANGE_SERVER_PORT_TITLE'] = 'changer le port du serveur à %1';
Blockly.Msg['NETWORK_CHANGE_SERVER_PORT_TOOLTIP'] = 'Permet de changer le port du serveur web de la carte ' + Blockly.Msg.boardName + '. Celle-ci doit être connectée à un réseau wifi.';
// Network - Server
Blockly.Msg['NETWORK_SERVER_SEND_DATA_TITLE'] = '[serveur] envoyer données %1';
Blockly.Msg['NETWORK_SERVER_SEND_DATA_TOOLTIP'] = 'Permet d\'envoyer des données au client. La carte ' + Blockly.Msg.boardName + ' doit être connectée à un réseau wifi.';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_TITLE'] = '[serveur] données reçues du client';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_TOOLTIP'] = 'Renvoie la requête du client. La carte ' + Blockly.Msg.boardName + ' doit être connectée à un réseau wifi.';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_PARAM_TITLE'] = '[serveur] paramètre de la requête';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_PARAM_TOOLTIP'] = 'Renvoie le paramètre de la requête du client. La carte ' + Blockly.Msg.boardName + ' doit être connectée à un réseau wifi.';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_IP_TITLE'] = '[serveur] addresse IP du client';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_IP_TOOLTIP'] = 'Renvoie l\'addresse IP du client. La carte ' + Blockly.Msg.boardName + ' doit être connectée à un réseau wifi.';
Blockly.Msg['NETWORK_SERVER_SEND_WEB_PAGE_TITLE'] = '[serveur] envoyer la page html';
Blockly.Msg['NETWORK_SERVER_SEND_WEB_PAGE_HTML'] = 'html';
Blockly.Msg['NETWORK_SERVER_SEND_WEB_PAGE_TOOLTIP'] = 'Permet d\'envoyer une page html au client. La carte ' + Blockly.Msg.boardName + ' doit être connectée à un réseau wifi.';
// Network - Client
Blockly.Msg['NETWORK_CLIENT_GET_SERVER_DATA_TITLE'] = '[client] données reçues du serveur IP %1';
Blockly.Msg['NETWORK_CLIENT_GET_SERVER_DATA_TOOLTIP'] = 'Renvoie la requête du serveur. La carte ' + Blockly.Msg.boardName + ' doit être connectée à un réseau wifi.';
Blockly.Msg['NETWORK_CLIENT_SEND_DATA_TITLE'] = '[client] envoyer données %1 au serveur IP %2';
Blockly.Msg['NETWORK_CLIENT_SEND_DATA_TOOLTIP'] = 'Permet d\'envoyer des données au serveur. La carte ' + Blockly.Msg.boardName + ' doit être connectée à un réseau wifi.';
Blockly.Msg['NETWORK_CLIENT_SEND_DATA_PORT'] = 'port';
// Network - Web page
Blockly.Msg['NETWORK_ADD_TITLE_TITLE'] = '[html] ajouter le titre %1 niveau %2 couleur %3';
Blockly.Msg['NETWORK_ADD_TITLE_TOOLTIP'] = 'Permet d\'ajouter des sous-titres au sein de la page web. Ce bloc doit être utilisé dans l\'instruction \'html\' du bloc \'[serveur] envoyer la page html.';
Blockly.Msg['NETWORK_ADD_TEXT_TITLE'] = '[html] afficher le texte %1';
Blockly.Msg['NETWORK_ADD_TEXT_TOOLTIP'] = 'Permet d\'afficher du texte sur la page web. Ce bloc doit être utilisé dans l\'instruction \'html\' du bloc \'[serveur] envoyer la page html. Cliquer sur + pour paramétrer la taille de police ou la couleur du texte.';
Blockly.Msg['NETWORK_ADD_TEXT_SIZE'] = 'taille de police';
Blockly.Msg['NETWORK_ADD_TEXT_COLOR'] = 'couleur';
Blockly.Msg['NETWORK_HTML_ADD_BUTTON_TITLE'] = '[html] ajouter un bouton ID %1 texte %2';
Blockly.Msg['NETWORK_HTML_ADD_BUTTON_TOOLTIP'] = 'Permet d\'ajouter un bouton dans la page web. L\'ID permet de récupérer l\'état du bouton. Ce bloc doit être utilisé dans l\'instruction \'html\' du bloc \'[serveur] envoyer la page html. Cliquer sur + pour paramétrer la couleur du bouton et sa taille.';
Blockly.Msg['NETWORK_HTML_ADD_BUTTON_COLOUR'] = 'couleur';
Blockly.Msg['NETWORK_HTML_ADD_BUTTON_HEIGHT'] = 'hauteur';
Blockly.Msg['NETWORK_HTML_ADD_BUTTON_WIDTH'] = 'largeur';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_TITLE'] = '[html] ajouter un variateur ID %1';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_TOOLTIP'] = 'Permet d\'ajouter un variateur de plage de la valeur minimale à la valeur maximale. L\'ID permet de récupérer la valeur du curseur. Ce bloc doit être utilisé dans l\'instruction \'html\' du bloc \'[serveur] envoyer la page html.';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_MIN'] = 'min';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_MAX'] = 'max';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_HORIZONTAL'] = 'horizontal';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_VERTICAL'] = 'vertical';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_HEIGHT'] = 'hauteur';
Blockly.Msg['NETWORK_HTML_ADD_SLIDER_WIDTH'] = 'largeur';
Blockly.Msg['NETWORK_HTML_ADD_SWITCH_TITLE'] = '[html] ajouter un interrupteur ID %1';
Blockly.Msg['NETWORK_HTML_ADD_SWITCH_COLOUR'] = 'couleur';
Blockly.Msg['NETWORK_HTML_ADD_SWITCH_SIZE'] = 'taille';
Blockly.Msg['NETWORK_HTML_ADD_SWITCH_TOOLTIP'] = 'Permet d\'ajouter un bouton interrupteur dans la page web L\'ID permet de récupérer l\'état de l\'interrupteur. Ce bloc doit être utilisé dans l\'instruction \'html\' du bloc \'[serveur] envoyer la page html.';
Blockly.Msg['NETWORK_HTML_ADD_GAUGE_TITLE'] = '[html] ajouter une jauge %1 valeur %2 min %3 max %4';
Blockly.Msg['NETWORK_HTML_ADD_GAUGE_TOOLTIP'] = 'Permet d\'ajouter une jauge de la valeur minimale à la valeur maximale d\'une variable. Il est possible de changer le titre et l\'unité de la jauge. Ce bloc doit être utilisé dans l\'instruction \'html\' du bloc \'[serveur] envoyer la page html.';
Blockly.Msg['NETWORK_ADD_LINK_TITLE'] = '[html] ajouter le lien %1 URL %2';
Blockly.Msg['NETWORK_ADD_LINK_TOOLTIP'] = 'Permet d\'ajouter un lien en cliquant sur du texte dans la page web. Ce bloc doit être utilisé dans l\'instruction \'html\' du bloc \'[serveur] envoyer la page html. Cliquer sur + pour paramétrer la taille de police ou la couleur du texte.';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_TITLE'] = '[html] afficher l\'image  %1';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_TOOLTIP'] = 'Permet d\'ajouter une image dans la page web avec les données en base64. Appuyer sur le bouton + pour paramétrer la fenêtre de l\'image dans la page web. Ce bloc doit être utilisé dans l\'instruction \'html\' du bloc \'[serveur] envoyer la page html.';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_HEIGHT'] = 'hauteur';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_WIDTH'] = 'largeur';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_TITLE'] = '[html] afficher le flux d\'images %1';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_TOOLTIP'] = 'Permet d\'envoyer un flux vidéo dans la page web avec les données des images en base64. Pour que cela fonctionne, la variable \'image_data\' doit contenir les données d\'une capture. Ce bloc doit être utilisé dans l\'instruction \'html\' du bloc \'[serveur] envoyer la page html.';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_HEIGHT'] = 'hauteur';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_WIDTH'] = 'largeur';
Blockly.Msg['NETWORK_HTML_TAG_TITLE'] = '[html] balise %1';
Blockly.Msg['NETWORK_HTML_TAG_TOOLTIP'] = 'Permet d\'ajouter une balise HTML de type <div></div>, <form></form> (pour les boutons) ou <center></center>. Ce bloc doit être utilisé dans l\'instruction \'html\' du bloc \'[serveur] envoyer la page html.';
Blockly.Msg["NETWORK_HTML_FORMAT_TEXT_TITLE"] = "[html] mettre le texte %1 en %2";
Blockly.Msg["NETWORK_HTML_FORMAT_TEXT_TOOLTIP"] = "Permet de formatter un texte. Ce bloc doit être utilisé dans l\'instruction \'html\' du bloc \'[serveur] envoyer la page html.";
Blockly.Msg["NETWORK_HTML_TAG_BOLD"] = "gras ";
Blockly.Msg["NETWORK_HTML_TAG_ITALIC"] = "italique <i>";
Blockly.Msg["NETWORK_HTML_TAG_INSERTED"] = "souligné <ins>";
Blockly.Msg["NETWORK_HTML_TAG_MARKED"] = "surligné <mark>";
Blockly.Msg["NETWORK_HTML_TAG_DELETED"] = "barré <del>";
Blockly.Msg["NETWORK_HTML_TAG_SMALL"] = "petit <small>";
Blockly.Msg['NETWORK_HTML_NEWLINE_TITLE'] = '[html] saut de ligne </br>';
Blockly.Msg['NETWORK_HTML_NEWLINE_TOOLTIP'] = "Permet d\'effectuer un saut de ligne dans la page web. Ce bloc doit être utilisé dans l\'instruction \'html\' du bloc \'[serveur] envoyer la page html\'.";
Blockly.Msg['NETWORK_HTML_ADD_TITLE'] = '[html] ajouter le code HTML %1';
Blockly.Msg['NETWORK_HTML_ADD_TOOLTIP'] = "Permet d\'ajouter du code HTML dans la page web. Ce bloc doit être utilisé dans l\'instruction \'html\' du bloc \'[serveur] envoyer la page html\'.";
Blockly.Msg['NETWORK_HTML_ADD_SYMBOL_TITLE'] = '[html] ajouter le symbole HTML %1 taille %2 format %3';
Blockly.Msg['NETWORK_HTML_ADD_SYMBOL_TOOLTIP'] = "Permet d\'ajouter un symbole HTML dans la page web en spécifiant sa taille (par défaut 50px). Ce bloc doit être utilisé dans l\'instruction \'html\' du bloc \'[serveur] envoyer la page html\'.";
// Network - Get web page
Blockly.Msg['NETWORK_SERVER_GET_BUTTON_STATE_TITLE'] = '[serveur] état du bouton ID %1';
Blockly.Msg['NETWORK_SERVER_GET_BUTTON_STATE_TOOLTIP'] = 'Permet de récupérer l\'état d\'un bouton de la page web. Ajouter l\'ID du bouton pour le sélectionner.';
Blockly.Msg['NETWORK_SERVER_GET_SLIDER_VALUE_TITLE'] = '[serveur] valeur du variateur ID %1';
Blockly.Msg['NETWORK_SERVER_GET_SLIDER_VALUE_TOOLTIP'] = 'Permet de récupérer la valeur du variateur de la page web en renseignant l\'ID.';
Blockly.Msg['NETWORK_SERVER_GET_SWITCH_VALUE_TITLE'] = '[serveur] état de l\'interrupteur ID %1';
Blockly.Msg['NETWORK_SERVER_GET_SWITCH_VALUE_TOOLTIP'] = 'Permet de récupérer l\'état de l\'interrupteur fr la page web en renseignant l\'ID.';
// Network - HTTP
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_TITLE'] = 'requête HTTP méthode %1 url %2';
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_TOOLTIP'] = 'Permet de créer une requête HTTP de type GET/POST en renseignant une addresse url.';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_TITLE'] = '[ThingSpeak] envoyer données avec la clé API';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_TOOLTIP'] = 'Ce bloc permet d\'envoyer des mesures de capteurs à l\'application ThingSpeakr grâce au WiFi intégré de l\'ESP32. Il peut être utilisé avec un ou plusieurs blocs "Field" et "Valeur" en appuyant sur le bouton plus.';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_FIELD_TITLE'] = '[ThingSpeak] Field %1 Valeur %2';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_FIELD_TOOLTIP'] = 'Ce bloc est utilisé comme donnée dans le bloc "Envoyer données dans le cannal". Renseigner l\'indice du Field, et ajouter la mesure. Note: Vous pouvez utiliser n\'importe quel field qu\'une seule fois par envoi de données.';
Blockly.Msg['NETWORK_THINGSPEAK_READ_FEEDS_TITLE'] = '[ThingSpeak] données du graphique: channel ID %1 clé API %2 field %3';
Blockly.Msg['NETWORK_THINGSPEAK_READ_FEEDS_TOOLTIP'] = 'Permet de recevoir les données de votre interface ThingSpeak. La clé API est disponible dans la rubrique \'API keys\' du cannal.';
// Network - uMail
Blockly.Msg['NETWORK_UMAIL_SMTP_TITLE'] = '[mail] configurer le serveur SMTP %1';
Blockly.Msg['NETWORK_UMAIL_SMTP_TOOLTIP'] = 'Permet de configurer le serveur SMTP de la boîte mail.';
Blockly.Msg['NETWORK_UMAIL_SETUP_TITLE'] = '[mail] se connecter au compte : %1 mot de passe : %2';
Blockly.Msg['NETWORK_UMAIL_SETUP_TOOLTIP'] = 'Permet de se connecter à une boîte mail.';
Blockly.Msg['NETWORK_UMAIL_TO_TITLE'] = '[mail] adresse du destinataire : %1 objet du mail : %2';
Blockly.Msg['NETWORK_UMAIL_TO_TOOLTIP'] = 'Permet d\'envoyer un mail à l\'adresse spécifiée.';
Blockly.Msg['NETWORK_UMAIL_WRITE_SENDER_TITLE'] = '[mail] nom de l\'expéditeur : %1';
Blockly.Msg['NETWORK_UMAIL_WRITE_SENDER_TOOLTIP'] = 'Permet de modifier le nom de l\'expéditeur qui sera affiché pour le destinataire.';
Blockly.Msg['NETWORK_UMAIL_WRITE_TITLE'] = '[mail] écrire et envoyer le mail : %1';
Blockly.Msg['NETWORK_UMAIL_WRITE_TOOLTIP'] = 'Permet d\'écrire une chaîne de caractère dans le mail. "From:" permet d\'indiquer l\'adresse mail de l\'expéditeur, "Subject:" permet d\'indiquer le sujet du mail.';
Blockly.Msg['NETWORK_UMAIL_SEND_IMAGE_TITLE'] = '[mail] envoyer l\'image en base64 : %1';
Blockly.Msg['NETWORK_UMAIL_SEND_IMAGE_TOOLTIP'] = 'Permet d\'envoyer une image en base64 par mail.';
Blockly.Msg['NETWORK_UMAIL_QUIT_TITLE'] = '[mail] se déconnecter de la boite mail';
Blockly.Msg['NETWORK_UMAIL_QUIT_TOOLTIP'] = 'Permet de se déconnecter de la boîte mail.';
// Network - MQTT
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_TITLE'] = '[MQTT] connecter au broker %1 nom d\'utilisateur %2 mot de passe %3';
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_TOOLTIP'] = 'Permet de se connecter à un broker MQTT en renseignant l\'addresse IP de la machine sur lequel il est exécuté. La connexion au broker est ici sécurisée avec un nom d\'utilisateur et un mot de passe définis par le broker.';
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_PORT'] = 'port';
Blockly.Msg['NETWORK_MQTT_SUBSCRIBE_TOPIC_TITLE'] = '[MQTT] souscrire au canal %1';
Blockly.Msg['NETWORK_MQTT_SUBSCRIBE_TOPIC_TOOLTIP'] = 'Permet au client connecté au broker de souscrire à un canal afin de recevoir les données de celui-ci. Cela permet d\'identifier les données reçues.';
Blockly.Msg['NETWORK_MQTT_PUBLISH_VALUE_TITLE'] = '[MQTT] publier le message %1 dans le canal %2';
Blockly.Msg['NETWORK_MQTT_PUBLISH_VALUE_TOOLTIP'] = 'Permet de publier un message dans un canal MQTT. A chaque envoi de donnée, le broker MQTT ou le client doit spécifier le canal à utiliser. Il n\'est pas nécéssaire de souscrire au canal d\'envoi de données.';
Blockly.Msg['NETWORK_MQTT_DISCONNECT_TITLE'] = '[MQTT] déconnecter du broker';
Blockly.Msg['NETWORK_MQTT_DISCONNECT_TOOLTIP'] = 'Permet de déconnecter le client du broker MQTT.';
Blockly.Msg['NETWORK_MQTT_ON_MESSAGE_RECEIVED_TITLE'] = '[MQTT] si un message est reçu dans un canal dans %1 alors';
Blockly.Msg['NETWORK_MQTT_ON_MESSAGE_RECEIVED_TOOLTIP'] = 'Permet d\'exécuter des instructions si un message est reçu dans un canal MQTT (topic). Utiliser la variable \'message\' pour accéder à la valeur au sein de cette fonction. Pour exécuter des instructions selon le canal, utiliser le bloc \'si le canal est .. alors ..\'.';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_TITLE'] = '[MQTT] si le canal est %1 alors';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_ELSEIF'] = 'sinon si le canal est';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_TOOLTIP'] = 'Permet de vérifier le nom du canal (topic) avant d\'exécuter les instructions. Ce bloc doit être utilisé dans le bloc \"[MQTT] Si un message est reçu dans un canal alors ...\"';
Blockly.Msg['NETWORK_MQTT_ON_CONNECT_TITLE'] = '[MQTT] Si la carte se connecte au broker alors';
Blockly.Msg['NETWORK_MQTT_ON_CONNECT_TOOLTIP'] = 'Permet d\'exécuter des instructions lorsque le client ESP32 se connecte au broker MQTT.';
Blockly.Msg['NETWORK_MQTT_ON_DISCONNECT_TITLE'] = '[MQTT] Si la carte se déconnecte du broker alors';
Blockly.Msg['NETWORK_MQTT_ON_DISCONNECT_TOOLTIP'] = 'Permet d\'exécuter des instructions lorsque le client ESP32 se connecte au broker MQTT. Attention, il n\'est pas nécéssaire d\'utiliser de nouveau le bloc \'[MQTT] connecter au broker ...\', le client tente de se reconnecter automatiquement quand il publie une nouvelle valeur.';
