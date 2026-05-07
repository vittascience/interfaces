@echo off
setlocal EnableExtensions

where ssh >nul 2>nul
if errorlevel 1 (
    echo ERREUR : ssh n'est pas disponible sur ce PC.
    pause
    exit /b 1
)

where scp >nul 2>nul
if errorlevel 1 (
    echo ERREUR : scp n'est pas disponible sur ce PC.
    pause
    exit /b 1
)

echo Pendant toute la duree de l installation, laisser le Rapsberry Pi allume.

set /p PIHOST=Entre le nom d'hote du Raspberry Pi : 
if "%PIHOST%"=="" (
    echo Aucun nom d'hote saisi.
    pause
    exit /b 1
)

set /p PIUSER=Entre le nom d'utilisateur du Raspberry Pi : 
if "%PIUSER%"=="" (
    echo Aucun nom d'utilisateur saisi.
    pause
    exit /b 1
)

set "TMPDIR=%TEMP%\pi_web_runner"
if exist "%TMPDIR%" rmdir /s /q "%TMPDIR%"
mkdir "%TMPDIR%"

set "VITTAAPIDIR=vittascience-api"
set "VITTASERVICE=vitta-server.service"

set "SERVERPY=%TMPDIR%\server.py"
set "CADDYFILE=%TMPDIR%\Caddyfile"
set "PYSERVICE=%TMPDIR%\%VITTASERVICE%"
set "INSTALLSH=%TMPDIR%\install.sh"
set "STARTSH=%TMPDIR%\start.sh"

set "CERTDIR=%TEMP%\vitta-caddy-cert"
set "CERTFILE=%CERTDIR%\root.crt"

echo Creation des fichiers temporaires...
break> "%SERVERPY%"
break> "%CADDYFILE%"
break> "%PYSERVICE%"
break> "%INSTALLSH%"
break> "%STARTSH%"

$VITTASCIENCE_SERVER_PY$

>> "%CADDYFILE%" echo %PIHOST%.local {
>> "%CADDYFILE%" echo     reverse_proxy 127.0.0.1:5000
>> "%CADDYFILE%" echo     tls internal
>> "%CADDYFILE%" echo }

>> "%PYSERVICE%" echo [Unit]
>> "%PYSERVICE%" echo Description=Vittascience Python Server
>> "%PYSERVICE%" echo After=network.target
>> "%PYSERVICE%" echo.
>> "%PYSERVICE%" echo [Service]
>> "%PYSERVICE%" echo Type=simple
>> "%PYSERVICE%" echo WorkingDirectory=/home/%PIUSER%/%VITTAAPIDIR%
>> "%PYSERVICE%" echo ExecStart=/home/%PIUSER%/%VITTAAPIDIR%/.venv/bin/gunicorn -w 1 -b 127.0.0.1:5000 --worker-class gevent server:app
>> "%PYSERVICE%" echo StandardOutput=journal
>> "%PYSERVICE%" echo StandardError=journal
>> "%PYSERVICE%" echo Restart=always
>> "%PYSERVICE%" echo RestartSec=3
>> "%PYSERVICE%" echo.
>> "%PYSERVICE%" echo [Install]
>> "%PYSERVICE%" echo WantedBy=multi-user.target

> "%INSTALLSH%" echo #!/bin/bash
>> "%INSTALLSH%" echo set -e
>> "%INSTALLSH%" echo echo
>> "%INSTALLSH%" echo echo Installation et preparation du CaddyFile ...
>> "%INSTALLSH%" echo sudo apt update
>> "%INSTALLSH%" echo sudo apt install -y caddy
>> "%INSTALLSH%" echo sudo cp ~/%VITTAAPIDIR%/Caddyfile /etc/caddy/Caddyfile
>> "%INSTALLSH%" echo sudo systemctl restart caddy
>> "%INSTALLSH%" echo sudo caddy trust
>> "%INSTALLSH%" echo echo
>> "%INSTALLSH%" echo echo Preparation de l environnement Python...
>> "%INSTALLSH%" echo sudo apt install -y python3-picamera2 python3-rtimulib
>> "%INSTALLSH%" echo cd ~/%VITTAAPIDIR%
>> "%INSTALLSH%" echo rm -rf .venv
>> "%INSTALLSH%" echo python3 -m venv .venv --system-site-packages
>> "%INSTALLSH%" echo . .venv/bin/activate
>> "%INSTALLSH%" echo python3 -m pip install --upgrade pip
>> "%INSTALLSH%" echo python3 -m pip install gunicorn gevent flask flask-socketio flask-cors
>> "%INSTALLSH%" echo python3 -m pip install Seeed-grove.py opencv-python RPLCD sense-hat w1thermsensor adafruit-circuitpython-scd30 adafruit-circuitpython-bmp280 seeed-python-dht adafruit-circuitpython-sht31d seeed-python-si114x adafruit-circuitpython-tcs34725
>> "%INSTALLSH%" echo sudo cp /var/lib/caddy/.local/share/caddy/pki/authorities/local/root.crt /home/%PIUSER%/%VITTAAPIDIR%/root.crt
>> "%INSTALLSH%" echo sudo chown %PIUSER%:%PIUSER% /home/%PIUSER%/%VITTAAPIDIR%/root.crt
>> "%INSTALLSH%" echo echo Configuration du periphérique ...
>> "%INSTALLSH%" echo sudo raspi-config nonint do_i2c 0
>> "%INSTALLSH%" echo sudo raspi-config nonint do_spi 0
>> "%INSTALLSH%" echo sudo raspi-config nonint do_serial 0
>> "%INSTALLSH%" echo sudo raspi-config nonint do_camera 0
>> "%INSTALLSH%" echo echo
>> "%INSTALLSH%" echo cd ~/%VITTAAPIDIR%
>> "%INSTALLSH%" echo echo Suppression programme main.py
>> "%INSTALLSH%" echo rm -f workspace/main.py
>> "%INSTALLSH%" echo sudo sed -i 's/systemd.mask=%VITTASERVICE%//g' /boot/firmware/cmdline.txt
>> "%INSTALLSH%" echo cat /boot/firmware/cmdline.txt
>> "%INSTALLSH%" echo echo
>> "%INSTALLSH%" echo echo Redemarrage du Raspberry Pi...
>> "%INSTALLSH%" echo sudo reboot

> "%STARTSH%" echo #!/bin/bash
>> "%STARTSH%" echo set -e
>> "%STARTSH%" echo echo Lancement du service ...
>> "%STARTSH%" echo fuser -k 5000/tcp 2^>/dev/null ^|^| true
>> "%STARTSH%" echo sudo cp ~/%VITTAAPIDIR%/%VITTASERVICE% /etc/systemd/system/%VITTASERVICE%
>> "%STARTSH%" echo sudo systemctl daemon-reload
>> "%STARTSH%" echo sudo systemctl enable %VITTASERVICE%
>> "%STARTSH%" echo sudo systemctl restart %VITTASERVICE%
>> "%STARTSH%" echo sudo systemctl status %VITTASERVICE% --no-pager

if errorlevel 1 (
    echo ERREUR lors de la creation des fichiers temporaires.
    pause
    exit /b 1
)

echo.
echo Creation du dossier sur le Pi...
ssh %PIUSER%@%PIHOST%.local "mkdir -p ~/%VITTAAPIDIR%/workspace"
if errorlevel 1 (
    echo ERREUR lors de la connexion SSH.
    pause
    exit /b 1
)

echo.
echo Envoi des fichiers...
scp "%SERVERPY%" "%CADDYFILE%" "%INSTALLSH%" "%STARTSH%" "%PYSERVICE%" %PIUSER%@%PIHOST%.local:~/%VITTAAPIDIR%/
if errorlevel 1 (
    echo ERREUR lors de l'envoi des fichiers via SCP.
    pause
    exit /b 1
)

echo.
echo Installation...
ssh -t %PIUSER%@%PIHOST%.local "cd ~/%VITTAAPIDIR% && sed -i 's/\r$//' install.sh && chmod +x install.sh && bash install.sh"
if errorlevel 1 (
    echo ERREUR lors de l installation. 
    echo Retentez l installation. Si cela pose toujours des problemes,
    echo veuillez contacter le support de Vittascience: support@vittascience.chmod
    pause
    exit /b 1
)

echo Attente du redemarrage... (~1m)
timeout /t 60 /nobreak >nul

echo.
echo Installation du certificat dans Windows...
if not exist "%CERTDIR%" mkdir "%CERTDIR%"
scp %PIUSER%@%PIHOST%.local:~/%VITTAAPIDIR%/root.crt "%CERTFILE%"
if errorlevel 1 (
    echo ERREUR lors de la recuperation du certificat. Seconde tentative ...
    scp %PIUSER%@%PIHOST%.local:~/%VITTAAPIDIR%/root.crt "%CERTFILE%"
        if errorlevel 1 (
        scp %PIUSER%@%PIHOST%.local:~/%VITTAAPIDIR%/root.crt "%CERTFILE%"
        echo ERREUR lors de la recuperation du certificat.
        pause
        exit /b 1
    )
)
certutil -addstore -f Root "%CERTFILE%"
if errorlevel 1 (
    echo ERREUR lors de l'installation du certificat.
    pause
    exit /b 1
)

echo Raspberry Pi reconnecte. Activation du service...
ssh -t %PIUSER%@%PIHOST%.local "cd ~/%VITTAAPIDIR% && sed -i 's/\r$//' start.sh && chmod +x start.sh && bash start.sh"

echo.
echo Le serveur Vittascience demarrera maintenant automatiquement a la mise sous tension du Raspberry Pi.
echo Cet ordinateur est maintenant autorise a communiquer avec le Raspberry Pi.
@REM echo Le dernier programme main.py provenant de l interface sera egalement lance a chaque demarrage.
echo.
echo Installation terminee avec succes.
pause
endlocal