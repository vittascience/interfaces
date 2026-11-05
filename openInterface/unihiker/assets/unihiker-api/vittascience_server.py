# Vittascience server of the UNIHIKER M10: runs the programs sent by the Vittascience interface and gives their
# output. Installed as the "vittascience" systemd service by install.py (Python 3.7, standard library only).
#   GET  /status              version and state of the program
#   POST /run                 {"code": "...", "files": {"name": "base64"}}: stops the program, then runs the new one
#   POST /stop                stops the program
#   GET  /output?from=N       output lines from the line N, and the state of the program
#   POST /input               {"text": "..."}: line sent to the program (its standard input)
import base64
import json
import os
import re
import signal
import subprocess
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

VERSION = 3
PORT = 8765
PROGRAM_DIR = "/root/vittascience"
MAX_LINES = 2000
# Only the Vittascience pages can run programs (the board runs them as root)
ALLOWED_ORIGINS = re.compile(r"^(https://([a-z0-9-]+\.)*vittascience\.com|https?://([a-z0-9-]+\.)*localhost(:\d+)?|https://([a-z0-9-]+\.)*ac-[a-z-]+\.fr)$")

lock = threading.Lock()
state = {"process": None, "lines": [], "first": 0, "exit_code": None}


def read_output(process):
    for line in iter(process.stdout.readline, ""):
        with lock:
            # The last lines of a stopped program aren't mixed with the output of the next one
            if state["process"] is not process:
                continue
            state["lines"].append(line.rstrip("\n"))
            # Last lines only: the line numbers go on
            drop = len(state["lines"]) - MAX_LINES
            if drop > 0:
                del state["lines"][:drop]
                state["first"] += drop
    process.wait()
    with lock:
        if state["process"] is process:
            state["exit_code"] = process.returncode


def stop_program():
    process = state["process"]
    if process and process.poll() is None:
        # The program and the processes it started
        try:
            os.killpg(process.pid, signal.SIGTERM)
            process.wait(timeout=3)
        except Exception:
            try:
                os.killpg(process.pid, signal.SIGKILL)
            except Exception:
                pass


def run_program(code, files):
    stop_program()
    os.makedirs(PROGRAM_DIR, exist_ok=True)
    for name, content in (files or {}).items():
        path = os.path.join(PROGRAM_DIR, os.path.basename(name))
        with open(path, "wb") as f:
            f.write(base64.b64decode(content))
    with open(os.path.join(PROGRAM_DIR, "main.py"), "w") as f:
        f.write(code)
    # The display of the board for the unihiker GUI (tkinter)
    env = dict(os.environ, DISPLAY=os.environ.get("DISPLAY", ":0"), PYTHONUNBUFFERED="1")
    process = subprocess.Popen(["/usr/bin/python3", "-u", "main.py"], cwd=PROGRAM_DIR, env=env, stdin=subprocess.PIPE,
                               stdout=subprocess.PIPE, stderr=subprocess.STDOUT, universal_newlines=True,
                               start_new_session=True)
    with lock:
        state["process"] = process
        state["exit_code"] = None
        state["first"] += len(state["lines"])
        state["lines"] = []
    threading.Thread(target=read_output, args=(process,), daemon=True).start()


def send_input(text):
    process = state["process"]
    if not process or process.poll() is not None:
        return False
    try:
        process.stdin.write(text.rstrip("\n") + "\n")
        process.stdin.flush()
    except (BrokenPipeError, OSError, ValueError):
        return False
    return True


def program_state():
    process = state["process"]
    return {"running": bool(process and process.poll() is None), "exitCode": state["exit_code"]}


class Handler(BaseHTTPRequestHandler):
    def send_json(self, data, code=200):
        body = json.dumps(data).encode()
        self.send_response(code)
        self.send_cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_cors(self):
        origin = self.headers.get("Origin", "")
        if ALLOWED_ORIGINS.match(origin):
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.send_header("Access-Control-Allow-Private-Network", "true")
            self.send_header("Vary", "Origin")

    def allowed(self):
        # Requests without Origin come from other tools (curl...), not from a web page
        origin = self.headers.get("Origin")
        if origin is None or ALLOWED_ORIGINS.match(origin):
            return True
        self.send_json({"error": "origin not allowed"}, 403)
        return False

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_cors()
        self.end_headers()

    def do_GET(self):
        if not self.allowed():
            return
        url = urlparse(self.path)
        if url.path == "/status":
            with lock:
                self.send_json(dict(program_state(), version=VERSION))
        elif url.path == "/output":
            start = int(parse_qs(url.query).get("from", ["0"])[0])
            with lock:
                lines = state["lines"][max(0, start - state["first"]):]
                self.send_json(dict(program_state(), lines=lines, next=state["first"] + len(state["lines"])))
        else:
            self.send_json({"error": "not found"}, 404)

    def do_POST(self):
        if not self.allowed():
            return
        length = int(self.headers.get("Content-Length", 0))
        try:
            data = json.loads(self.rfile.read(length) or b"{}")
        except ValueError:
            return self.send_json({"error": "invalid JSON"}, 400)
        if self.path == "/run":
            run_program(data.get("code", ""), data.get("files"))
            self.send_json({"started": True})
        elif self.path == "/stop":
            stop_program()
            self.send_json({"stopped": True})
        elif self.path == "/input":
            self.send_json({"sent": send_input(str(data.get("text", "")))})
        else:
            self.send_json({"error": "not found"}, 404)

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
