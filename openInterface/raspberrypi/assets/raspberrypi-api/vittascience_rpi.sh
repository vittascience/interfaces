#!/bin/bash
set -euo pipefail

if ! command -v ssh >/dev/null 2>&1; then
  echo "ERREUR : ssh n'est pas disponible sur ce Mac."
  read -r -p "Appuyez sur Entrée pour quitter..."
  exit 1
fi

if ! command -v scp >/dev/null 2>&1; then
  echo "ERREUR : scp n'est pas disponible sur ce Mac."
  read -r -p "Appuyez sur Entrée pour quitter..."
  exit 1
fi

echo "Pendant toute la durée de l'installation, laisser le Raspberry Pi allumé."

read -r -p "Entre le nom d'hôte du Raspberry Pi : " PIHOST
if [ -z "$PIHOST" ]; then
  echo "Aucun nom d'hôte saisi."
  read -r -p "Appuyez sur Entrée pour quitter..."
  exit 1
fi

read -r -p "Entre le nom d'utilisateur du Raspberry Pi : " PIUSER
if [ -z "$PIUSER" ]; then
  echo "Aucun nom d'utilisateur saisi."
  read -r -p "Appuyez sur Entrée pour quitter..."
  exit 1
fi

TMPDIR="$(mktemp -d /tmp/pi_web_runner.XXXXXX)"
VITTAAPIDIR="vittascience-api"
VITTASERVICE="vitta-server.service"

SERVERPY="$TMPDIR/server.py"
CADDYFILE="$TMPDIR/Caddyfile"
PYSERVICE="$TMPDIR/$VITTASERVICE"
INSTALLSH="$TMPDIR/install.sh"
STARTSH="$TMPDIR/start.sh"

CERTDIR="$(mktemp -d /tmp/vitta-caddy-cert.XXXXXX)"
CERTFILE="$CERTDIR/root.crt"

echo "Création des fichiers temporaires..."
: > "$SERVERPY"
: > "$CADDYFILE"
: > "$PYSERVICE"
: > "$INSTALLSH"
: > "$STARTSH"

cat > "$SERVERPY" <<'PYEOF'
$VITTASCIENCE_SERVER_PY$
PYEOF

cat > "$CADDYFILE" <<EOF2
${PIHOST}.local {
    reverse_proxy 127.0.0.1:5000
    tls internal
}
EOF2

cat > "$PYSERVICE" <<EOF2
[Unit]
Description=Vittascience Python Server
After=network.target

[Service]
Type=simple
WorkingDirectory=/home/${PIUSER}/${VITTAAPIDIR}
ExecStart=/home/${PIUSER}/${VITTAAPIDIR}/.venv/bin/gunicorn -w 1 -b 127.0.0.1:5000 --worker-class gevent server:app
StandardOutput=journal
StandardError=journal
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF2

cat > "$INSTALLSH" <<EOF2
#!/bin/bash
set -e
echo
echo Installation et preparation du CaddyFile ...
sudo apt update
sudo apt install -y caddy
sudo cp ~/${VITTAAPIDIR}/Caddyfile /etc/caddy/Caddyfile
sudo systemctl restart caddy
sudo caddy trust
echo
echo Preparation de l environnement Python...
sudo apt install -y python3-picamera2 python3-rtimulib
cd ~/${VITTAAPIDIR}
rm -rf .venv
python3 -m venv .venv --system-site-packages
. .venv/bin/activate
python3 -m pip install --upgrade pip
python3 -m pip install gunicorn gevent flask flask-socketio flask-cors
python3 -m pip install Seeed-grove.py opencv-python RPLCD sense-hat w1thermsensor adafruit-circuitpython-scd30 adafruit-circuitpython-bmp280 seeed-python-dht adafruit-circuitpython-sht31d seeed-python-si114x adafruit-circuitpython-tcs34725
sudo cp /var/lib/caddy/.local/share/caddy/pki/authorities/local/root.crt /home/${PIUSER}/${VITTAAPIDIR}/root.crt
sudo chown ${PIUSER}:${PIUSER} /home/${PIUSER}/${VITTAAPIDIR}/root.crt
echo Configuration du peripherique ...
sudo raspi-config nonint do_i2c 0
sudo raspi-config nonint do_spi 0
sudo raspi-config nonint do_serial 0
sudo raspi-config nonint do_camera 0
echo
cd ~/${VITTAAPIDIR}
echo Suppression programme main.py
rm -f workspace/main.py
sudo sed -i 's/systemd.mask=${VITTASERVICE}//g' /boot/firmware/cmdline.txt
cat /boot/firmware/cmdline.txt
echo
echo Redemarrage du Raspberry Pi...
sudo reboot
EOF2

cat > "$STARTSH" <<EOF2
#!/bin/bash
set -e
echo Lancement du service ...
fuser -k 5000/tcp 2>/dev/null || true
sudo cp ~/${VITTAAPIDIR}/${VITTASERVICE} /etc/systemd/system/${VITTASERVICE}
sudo systemctl daemon-reload
sudo systemctl enable ${VITTASERVICE}
sudo systemctl restart ${VITTASERVICE}
sudo systemctl status ${VITTASERVICE} --no-pager
EOF2

chmod +x "$INSTALLSH" "$STARTSH"

echo
echo "Création du dossier sur le Pi..."
if ! ssh "${PIUSER}@${PIHOST}.local" "mkdir -p ~/${VITTAAPIDIR}/workspace"; then
  echo "ERREUR lors de la connexion SSH."
  read -r -p "Appuyez sur Entrée pour quitter..."
  exit 1
fi

echo
echo "Envoi des fichiers..."
if ! scp "$SERVERPY" "$CADDYFILE" "$INSTALLSH" "$STARTSH" "$PYSERVICE" "${PIUSER}@${PIHOST}.local:~/${VITTAAPIDIR}/"; then
  echo "ERREUR lors de l'envoi des fichiers via SCP."
  read -r -p "Appuyez sur Entrée pour quitter..."
  exit 1
fi

echo
echo "Installation..."
if ! ssh -t "${PIUSER}@${PIHOST}.local" "cd ~/${VITTAAPIDIR} && chmod +x install.sh && bash install.sh"; then
  echo "ERREUR lors de l'installation."
  echo "Retentez l'installation. Si cela pose toujours des problèmes,"
  echo "veuillez contacter le support de Vittascience : support@vittascience.com"
  read -r -p "Appuyez sur Entrée pour quitter..."
  exit 1
fi

echo "Attente du redémarrage... (~1 min)"
sleep 60

echo
echo "Installation du certificat dans macOS..."
if ! scp "${PIUSER}@${PIHOST}.local:~/${VITTAAPIDIR}/root.crt" "$CERTFILE"; then
  echo "ERREUR lors de la récupération du certificat. Seconde tentative..."
  if ! scp "${PIUSER}@${PIHOST}.local:~/${VITTAAPIDIR}/root.crt" "$CERTFILE"; then
    if ! scp "${PIUSER}@${PIHOST}.local:~/${VITTAAPIDIR}/root.crt" "$CERTFILE"; then
      echo "ERREUR lors de la récupération du certificat."
      read -r -p "Appuyez sur Entrée pour quitter..."
      exit 1
    fi
  fi
fi

if ! sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain "$CERTFILE"; then
  echo "ERREUR lors de l'installation du certificat dans macOS."
  read -r -p "Appuyez sur Entrée pour quitter..."
  exit 1
fi

echo "Raspberry Pi reconnecté. Activation du service..."
ssh -t "${PIUSER}@${PIHOST}.local" "cd ~/${VITTAAPIDIR} && chmod +x start.sh && bash start.sh"

echo
echo "Le serveur Vittascience démarrera maintenant automatiquement à la mise sous tension du Raspberry Pi."
echo "Cet ordinateur est maintenant autorisé à communiquer avec le Raspberry Pi."
echo
echo "Installation terminée avec succès."
read -r -p "Appuyez sur Entrée pour quitter..."
