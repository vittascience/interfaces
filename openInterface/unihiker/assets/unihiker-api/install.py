# Installer of the Vittascience server on the UNIHIKER M10, run once from the Home menu of the board (as root):
# copies vittascience_server.py next to this file to /opt/vittascience and starts it as a systemd service.
import os
import shutil
import subprocess
import time

SERVICE = """[Unit]
Description=Vittascience server (runs the programs sent by the Vittascience interface)
After=network.target

[Service]
ExecStart=/usr/bin/python3 /opt/vittascience/vittascience_server.py
Restart=always
Environment=DISPLAY=:0

[Install]
WantedBy=multi-user.target
"""


def install():
    os.makedirs("/opt/vittascience", exist_ok=True)
    here = os.path.dirname(os.path.abspath(__file__))
    shutil.copy(os.path.join(here, "vittascience_server.py"), "/opt/vittascience/vittascience_server.py")
    with open("/etc/systemd/system/vittascience.service", "w") as f:
        f.write(SERVICE)
    subprocess.run(["systemctl", "daemon-reload"], check=True)
    subprocess.run(["systemctl", "enable", "vittascience"], check=True)
    subprocess.run(["systemctl", "restart", "vittascience"], check=True)


try:
    install()
    message = ["Vittascience", "installed", ""]
except Exception as e:
    message = ["Installation", "failed", str(e)[:30]]
print(" ".join(message))
try:
    from unihiker import GUI
    gui = GUI()
    for i, text in enumerate(message):
        gui.draw_text(text=text, x=120, y=110 + i * 35, origin="center", font_size=16)
    time.sleep(5)
except Exception as e:
    print("GUI:", e)
