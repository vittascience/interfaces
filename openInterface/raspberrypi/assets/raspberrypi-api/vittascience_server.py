# -*- coding: utf-8 -*-

import sys
import os
import subprocess
import signal
import threading
from flask import Flask, request, Response, send_from_directory, abort
from flask_socketio import SocketIO
from flask_cors import CORS
from gunicorn.app.base import BaseApplication
from pathlib import Path
from collections import deque
import logging

app = Flask(__name__, static_folder="static")

CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="gevent")

BASE_DIR = Path(__file__).parent
WORK_DIR = BASE_DIR / "workspace"
IMAGES_DIR = WORK_DIR / "static/images"
VIDEOS_DIR = WORK_DIR / "static/videos"
WORK_DIR.mkdir(exist_ok=True)
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
VIDEOS_DIR.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)

logger = logging.getLogger(__name__)

PID_FILE = "current_main_pid.txt"

current_process = None
current_process_lock = threading.Lock()

process_event = threading.Event()
main_start_process = None

def launch_main_in_background():
    if Path(WORK_DIR / "main.py").exists():
        def process():
            msg, status = terminate_main_process()
            logger.info(str(status) + ": " + msg)
            global current_process
            with current_process_lock:
                current_process = subprocess.Popen(
                    [sys.executable, "-u", str(WORK_DIR / "main.py")],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.STDOUT,
                    text=True,
                    bufsize=1,
                )
                with open(PID_FILE, "w") as pid_f:
                    logger.info("New start process: " + str(current_process.pid))
                    pid_f.write(str(current_process.pid))
                process_event.set()  # Signale que le processus est lancé

                if current_process.stdout is not None:
                    for line in current_process.stdout:
                        logger.info(line)
        main_start_process = threading.Thread(target=process, daemon=True)
        main_start_process.start()
        
        # Attends que le processus soit bien lancé avant de continuer
        process_event.wait()
        logger.info("Processus main.py lancé et prêt.")

@socketio.on("connect")
def handle_connect():
    logger.info("New client connected !")

@socketio.on("disconnect")
def handle_disconnect():
    logger.info("Client connection lost.")

@socketio.on("connection")
def handle_message(data):
    if isinstance(data, dict) and data.get("data") == "connection request":
        socketio.emit("connection", "connected")
    else:
        socketio.emit("connection", "failed")

@app.get("/")
def home():
    return "Raspberry Pi server for https://vittascience.com/raspberrypi/ is running ! :)", 200

def run_main_process():
    global current_process
    try:
        with current_process_lock:
            current_process = subprocess.Popen(
                [sys.executable, "-u", str(WORK_DIR / "main.py")],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
            )
            with open(PID_FILE, "w") as pid_f:
                logger.info("New process: " + str(current_process.pid))
                pid_f.write(str(current_process.pid))

        if current_process.stdout is not None:
            for line in current_process.stdout:
                yield line

        return_code = current_process.wait()
        yield f"\nProcess terminated with code {return_code}\n"

    except Exception as e:
        logger.info(str(e))
        yield f"Server Error: {str(e)}\n"
    finally:
        with current_process_lock:
            current_process = None

@app.post("/send-main-code")
def send_main_code():
    logger.info("Receive request: /send-main-code")
    global current_process
    content = request.form.get("content", "")
    main_path = WORK_DIR / "main.py"
    main_path.write_text(content, encoding="utf-8")
    return Response(run_main_process(), mimetype="text/plain")

def terminate_main_process():
    global current_process
    msg, status = "No process to kill", 200
    with current_process_lock:
        if current_process and current_process.poll() is None:
            current_process.send_signal(signal.SIGINT)
            if current_process:
                current_process.wait()
            logger.info("Current PID process killed:" + str(current_process.pid))
            return "Process terminated by global current_process: " + str(pid), 200

    if Path(PID_FILE).exists():
        pid = None
        with open(PID_FILE, "r") as f:
            pid = int(f.read().strip())
        try:
            os.kill(pid, signal.SIGINT)
            logger.info("Process " + str(pid) + " killed.")
            os.remove(PID_FILE)
            msg, status = "Process terminated by PID: " + str(pid), 200
        except Exception as e:
            logger.info(str(e))
            msg, status = "No process with " + str(pid), 404
    else:
        msg, status = "No process PID file", 404

    logger.info(str(status) + ": " + msg)
    return msg, status

@app.route("/terminate-process")
def request_terminate_process():
    logger.info("Receive request: /terminate-process")
    try:
        return terminate_main_process()
    except Exception as e:
        return f"Server Error: {str(e)}", 200

@app.route("/start-process")
def start_process():
    threading.Thread(target=run_main_process, daemon=True).start()
    return "Process started", 200

@app.route("/static/images/<path:filename>")
def serve_image(filename):
    try:
        return send_from_directory(IMAGES_DIR, filename)
    except FileNotFoundError:
        abort(404)

@app.route("/static/videos/<path:filename>")
def serve_video(filename):
    return send_from_directory(VIDEOS_DIR, filename)

logger.info("Launch main in background if main.py exists.")
#launch_main_in_background() => WAITING BETA TESTS

if __name__ == "__main__":

    class FlaskGunicornApplication(BaseApplication):
        def __init__(self, app):
            self.app = app
            super().__init__()

        def load(self):
            return self.app

    options = {
        'bind': '127.0.0.1:5000',
        'workers': 2,
        'worker_class': 'gevent'
        #'debug': True  # Pour activer le mode débogage dans Flask (attention avec Gunicorn en prod)
    }
    FlaskGunicornApplication(app, options).run()