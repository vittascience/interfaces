# Vittascience – Interfaces de Programmation / Programming Interfaces (Standalone)

Ce dépôt contient les **interfaces de programmation** de la plateforme [Vittascience](https://fr.vittascience.com) en version **standalone**, fonctionnant localement sans serveur applicatif ni connexion à la plateforme principale.  
Chaque interface est développée en **HTML, JavaScript et CSS**, et peut être utilisée via un simple **serveur web local**.

---

This repository contains the **programming interfaces** of the [Vittascience](https://en.vittascience.com) platform in a **standalone version**, running locally without any backend server or connection to the main platform.  
Each interface is built with **HTML, JavaScript, and CSS**, and can be used through a simple **local web server**.

---

## 🇫🇷 Installation (FR)

### 1. Cloner le dépôt

```bash
git clone https://github.com/vittascience/interfaces.git
cd interfaces
```

### 2. Démarrer un serveur web local

Il est possible d’utiliser n’importe quel serveur web (Apache, Nginx, etc.).  
Pour un test rapide, un serveur HTTP simple peut être lancé avec Python :

```bash
# Python 3
python3 -m http.server 8000
```

Assurez-vous que la **racine du serveur** pointe vers le **répertoire du dépôt cloné**.

---

## 🇬🇧 Installation (EN)

### 1. Clone the repository

```bash
git clone https://github.com/vittascience/interfaces.git
cd interfaces
```

### 2. Start a local web server

You can use any web server (Apache, Nginx, etc.).  
For quick testing, you can start a simple HTTP server with Python:

```bash
# Python 3
python3 -m http.server 8000
```

Make sure the **server root** points to the **repository directory**.

---

## 🇫🇷 Utilisation (FR)

Une fois le serveur démarré, ouvrez votre navigateur à l’adresse locale correspondante :

```
http://localhost:8000/nom_de_l_interface
```

Par exemple :

- Arduino → [http://localhost:8000/arduino](http://localhost:8000/arduino)
- Micro:bit → [http://localhost:8000/microbit](http://localhost:8000/microbit)
- Raspberry Pi → [http://localhost:8000/raspberrypi](http://localhost:8000/raspberrypi)

---

## 🇬🇧 Usage (EN)

Once the server is running, open your browser at the corresponding local address:

```
http://localhost:8000/interface_name
```

Examples:

- Arduino → [http://localhost:8000/arduino](http://localhost:8000/arduino)
- Micro:bit → [http://localhost:8000/microbit](http://localhost:8000/microbit)
- Raspberry Pi → [http://localhost:8000/raspberrypi](http://localhost:8000/raspberrypi)

---

## 📚 Interfaces disponibles / Available Interfaces

| Interface | Description (FR) | Description (EN) |
|------------|------------------|------------------|
| `arduino` | Programmation visuelle et textuelle des cartes Arduino UNO, Nano et Mega 2560  | Visual and text programming for Arduino Arduino UNO, Nano and Mega 2560 boards |
| `bluebot` | Contrôle du robot Blue-Bot | Control the Blue-Bot robot |
| `buddy` | Interface pour le robot Buddy | Interface for the robot Buddy |
| `cyberpi` | Programmation du robot mBot2 / CyberPi | Programming for mBot2 / CyberPi robot |
| `eliobot` | Interface pour le robot Eliobot | Interface for the Eliobot robot |
| `esp32` | Programmation des cartes ESP32 | Programming for ESP32 boards |
| `galaxia` | Interface pour la carte Galaxia | Interface for the Galaxia board |
| `l476` | Programmation de la carte STM32L476 | Programming for STM32L476 board |
| `lotibot` | Interface du robot Lotibot | Interface for the Lotibot robot |
| `m5stack` | Programmation des modules M5Stack | Programming for M5Stack modules |
| `mBot` | Interface pour le robot mBot classique | Interface for the classic mBot robot |
| `microbit` | Programmation du micro:bit (V1/V2) | Programming for BBC micro:bit (V1/V2) |
| `nao` | Programmation du robot NAO | Programming for the NAO robot |
| `niryo` | Contrôle du bras robotique Niryo | Control of the Niryo robotic arm |
| `pico` | Programmation du Raspberry Pi Pico | Programming for Raspberry Pi Pico |
| `photon` | Programmation de la carte Particle Photon | Programming for Particle Photon board |
| `python` | Éditeur Python universel | Universal Python editor |
| `raspberrypi` | Programmation des cartes Raspberry Pi | Programming for Raspberry Pi boards |
| `sphero` | Interface pour le robot Sphero | Interface for the Sphero robot |
| `spike` | Programmation du robot LEGO Spike | Programming for LEGO Spike robot |
| `thymio` | Interface pour le robot Thymio | Interface for the Thymio robot |
| `wb55` | Interface pour la carte STM32WB55 | Interface for STM32WB55 board |
| `web` | Interface web | Web interface |
| `winky` | Interface pour le robot Winky | Interface for the Winky robot |
| `codey` | Interface pour le robot Codey Rocky | Interface for the Codey Rocky robot |

---

## 🛠️ Architecture

### 🇫🇷
Chaque dossier d’interface contient la structure suivante :

```
/nom_de_l_interface/
├── index.html
```

Les fichiers index.html utilisent des assets présents dans les répertoires /interfaces et /openInterface/interfaces pour les assets communs aux interfaces ainsi que ceux présents dans /openInterface/nom_de_l_interface pour les assets propres à l'interface courante.

### 🇬🇧
Each interface folder follows this structure:

```
/interface_name/
├── index.html
```

The files index.html use assets located in the /interfaces and /openInterface/interfaces directories for assets common to all interfaces, as well as those located in /openInterface/interface_name for assets specific to the current interface.

## Guide des interfaces / Interfaces guide
Vous trouverez les tutoriels pour les interfaces sur la [chaîne Youtube de Vittascience](https://www.youtube.com/watch?v=OMeVVxMjj2A&list=PL4kYXTRKwr4FVDSQ5nGFjTIUamQiWsH_5).

You can find tutorials for the interfaces at [Vittascience Youtube channel](https://www.youtube.com/watch?v=OMeVVxMjj2A&list=PL4kYXTRKwr4FVDSQ5nGFjTIUamQiWsH_5).


## 🤝 Contribution / Contributing

### 🇫🇷
Les contributions sont les bienvenues.  
Pour proposer une amélioration ou corriger un bug :

1. Forkez le dépôt  
2. Créez une branche pour votre modification :
   ```bash
   git checkout -b fix/nom-du-bug
   ```
3. Effectuez un commit clair et descriptif  
4. Ouvrez une Pull Request

### 🇬🇧
Contributions are welcome!  
To suggest an improvement or fix a bug:

1. Fork the repository  
2. Create a new branch for your modification:
   ```bash
   git checkout -b fix/bug-name
   ```
3. Make a clear and descriptive commit  
4. Open a Pull Request

---

## 🧾 Licence / License

### 🇫🇷
Ce projet est distribué sous licence **"Commons Clause" License Condition v1.0**, sauf mention contraire dans les sous-dossiers.  
© Vittascience – [https://vittascience.com](https://vittascience.com)

### 🇬🇧
This project is distributed under the **"Commons Clause" License Condition v1.0**, unless otherwise specified in subfolders.  
© Vittascience – [https://vittascience.com](https://vittascience.com)

---

## 🌐 Ressources / Resources

- [Plateforme Vittascience / Vittascience Platform](https://fr.vittascience.com)
- [Blog Vittascience / Vittascience Blog](https://blog.vittascience.com)
