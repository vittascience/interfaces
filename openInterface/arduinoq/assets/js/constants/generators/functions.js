const FUNCTIONS_ARDUINO_Q = {
    'py': {
        DEF_CAPTURE_WEBCAM_IMAGE:
`def capture_webcam_image(output_dir=".", camera_index=0):
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    image_path = output_dir / f"image_{timestamp}.jpg"

    # The UNO Q exposes non-camera video devices (e.g. /dev/video0 = Venus decoder),
    # so if the requested index is not a camera, try the other /dev/video* devices
    global current_webcam_index
    import time

    # At boot the app can start before the USB camera is ready, so keep rescanning for a while
    ret, frame = False, None
    for attempt in range(30):
        indexes = [camera_index] + sorted(
            int(p.name[5:]) for p in Path("/dev").glob("video*")
            if p.name[5:].isdigit() and int(p.name[5:]) != camera_index
        )

        for index in indexes:
            cap = cv2.VideoCapture(index)
            if cap.isOpened():
                # Optionnel : force une résolution raisonnable
                cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
                cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

                # On lit quelques frames pour laisser la caméra s'initialiser
                for _ in range(5):
                    ret, frame = cap.read()
            cap.release()

            if ret and frame is not None:
                if index != camera_index:
                    print(f"[camera] Caméra index {camera_index} indisponible, utilisation de l'index {index}")
                    current_webcam_index = index
                break

        if ret and frame is not None:
            break
        print("[camera] Aucune caméra prête, nouvelle tentative dans 2 s...")
        time.sleep(2)

    if not ret or frame is None:
        raise RuntimeError("Impossible de capturer une image depuis une caméra USB")

    cv2.imwrite(str(image_path), frame)

    print(f"[camera] Image capturée : {image_path}")

    return Image.open(image_path)`,

        // The Vittascience interface pushes the computer webcam image to python/pc_webcam.jpg over USB (unoqUploader.startPcWebcam)
        DEF_CAPTURE_PC_WEBCAM_IMAGE:
`def capture_pc_webcam_image():
    global pc_webcam_last_time
    import time
    import io

    image_path = Path(__file__).resolve().parent / "pc_webcam.jpg"
    # Wait as long as needed (e.g. app started on boot, before the interface is connected), with a reminder
    last_reminder = time.time()
    while True:
        try:
            # ctime changes on each push (the mtime set by ADB is rounded to the second)
            changed = image_path.stat().st_ctime_ns
            if changed != pc_webcam_last_time:
                image = Image.open(io.BytesIO(image_path.read_bytes()))
                image.load()
                pc_webcam_last_time = changed
                return image
        except Exception:
            # No image yet, or image being written: read it again
            pass
        if time.time() - last_reminder > 30:
            print("[webcam] En attente de la webcam de l'ordinateur : ouvre l'interface Vittascience et branche la carte en USB")
            last_reminder = time.time()
        time.sleep(0.1)`,

        DEF_CAPTURE_PC_MICROPHONE_SOUND:
`def capture_pc_microphone_sound():
    global pc_microphone_last_time
    import time
    import wave
    import numpy as np

    sound_path = Path(__file__).resolve().parent / "pc_microphone.wav"
    # Wait as long as needed (e.g. app started on boot, before the interface is connected), with a reminder
    last_reminder = time.time()
    while True:
        try:
            # ctime changes on each push (the mtime set by ADB is rounded to the second)
            changed = sound_path.stat().st_ctime_ns
            if changed != pc_microphone_last_time:
                with wave.open(str(sound_path), "rb") as sound:
                    rate = sound.getframerate()
                    count = sound.getnframes()
                    data = sound.readframes(count)
                if len(data) < count * 2:
                    raise EOFError("sound being written")
                pc_microphone_last_time = changed
                return np.frombuffer(data, "<i2") / 32768, rate
        except Exception:
            # No sound yet, or sound being written: read it again
            pass
        if time.time() - last_reminder > 30:
            print("[micro] En attente du micro de l'ordinateur : ouvre l'interface Vittascience et branche la carte en USB")
            last_reminder = time.time()
        time.sleep(0.05)`,

        DEF_CAPTURE_MICROPHONE_SOUND:
`def capture_microphone_sound(duration=1.05):
    import re
    import subprocess
    import numpy as np

    # First USB sound card (microphone, or webcam with a microphone) plugged into the board
    cards_path = Path("/proc/asound/cards")
    cards = re.findall(r"^\\s*\\d+ \\[(\\S+)\\s*\\]:.*USB", cards_path.read_text() if cards_path.exists() else "", re.M)
    if not cards:
        raise RuntimeError("Aucun micro USB trouvé : branche un micro (ou une webcam avec micro) en USB sur la carte")
    device = "plughw:CARD=" + cards[0]
    rate = 44100
    count = int(rate * duration)
    try:
        import alsaaudio
        pcm = alsaaudio.PCM(alsaaudio.PCM_CAPTURE, alsaaudio.PCM_NORMAL, device=device, channels=1, rate=rate,
                            format=alsaaudio.PCM_FORMAT_S16_LE, periodsize=1024)
        data = b""
        while len(data) < count * 2:
            length, chunk = pcm.read()
            if length > 0:
                data += chunk
        pcm.close()
    except ImportError:
        data = subprocess.run(["arecord", "-q", "-D", device, "-f", "S16_LE", "-r", str(rate), "-c", "1", "-t", "raw", "-s", str(count)],
                              capture_output=True, check=True).stdout
    return np.frombuffer(data[:count * 2], "<i2") / 32768, rate`,

        DEF_GET_CAMERA_LIST:
`def get_camera_list():
    cameras = []

    for video_path in sorted(Path("/dev").glob("video*")):
        video_id = video_path.name.replace("video", "")

        if not video_id.isdigit():
            continue

        name_path = Path("/sys/class/video4linux") / video_path.name / "name"

        if name_path.exists():
            try:
                name = name_path.read_text(encoding="utf-8").strip()
            except Exception:
                name = str(video_path)
        else:
            name = str(video_path)

        cameras.append({
            "id": int(video_id),
            "device": str(video_path),
            "name": name
        })

    return cameras`,

        // Sound of the computer: the line is read by the Vittascience interface, which speaks or plays it
        // (UnoQuploader.appLogLine), like the computer webcam and microphone
        DEF_SAY_ON_COMPUTER:
`def say_on_computer(text):
    print("[vitta:say] " + str(text).replace("\\n", " "), flush=True)`,

        // Speech synthesis on the board: Piper (piper-tts in requirements.txt), voice downloaded once next to main.py,
        // played by the Sound Generator brick (sound_player): its speaker is the only one the app container can use
        // Speech recognition on the board: Vosk (vosk in requirements.txt), small model of the language downloaded
        // once next to main.py, sound of the first microphone plugged into the board (16 kHz mono, as Vosk expects)
        DEF_LISTEN_ON_BOARD:
`def listen_on_board(duration=3, model_name="vosk-model-small-fr-0.22"):
    import json
    import shutil
    import urllib.request
    import zipfile
    import numpy as np
    from vosk import KaldiRecognizer, Model, SetLogLevel
    from arduino.app_peripherals.microphone import Microphone

    global vosk_models
    if model_name not in vosk_models:
        SetLogLevel(-1)
        folder = Path(__file__).resolve().parent / "vosk_models"
        path = folder / model_name
        if not path.exists():
            print("[écoute] Téléchargement du modèle " + model_name + " (une seule fois, environ 40 Mo)...", flush=True)
            # Downloaded and unzipped in a separate folder, then moved: an interrupted download is never taken for a model
            part = folder / "download"
            shutil.rmtree(part, ignore_errors=True)
            part.mkdir(parents=True)
            archive = part / "model.zip"
            urllib.request.urlretrieve("https://alphacephei.com/vosk/models/" + model_name + ".zip", archive)
            with zipfile.ZipFile(archive) as content:
                content.extractall(part)
            (part / model_name).replace(path)
            shutil.rmtree(part, ignore_errors=True)
        vosk_models[model_name] = Model(str(path))

    print("[écoute] Parle maintenant (" + str(duration) + " s)...", flush=True)
    samples = Microphone.record_pcm(max(0.5, float(duration)), 16000, 1, np.int16)
    recognizer = KaldiRecognizer(vosk_models[model_name], 16000)
    recognizer.AcceptWaveform(np.asarray(samples, dtype=np.int16).tobytes())
    text = json.loads(recognizer.FinalResult()).get("text", "")
    print("[écoute] Entendu : " + (text or "(rien)"), flush=True)
    return text`,

        DEF_SAY_ON_BOARD:
`def say_on_board(text, voice="fr_FR-siwis-low"):
    import shutil
    import wave
    import numpy as np
    from piper import PiperVoice
    from piper.download_voices import download_voice

    global piper_voices
    if voice not in piper_voices:
        folder = Path(__file__).resolve().parent / "piper_voices"
        model = folder / (voice + ".onnx")
        if not model.exists():
            print("[voix] Téléchargement de la voix " + voice + " (une seule fois, quelques dizaines de Mo)...", flush=True)
            # Downloaded in a separate folder, then moved: an interrupted download is never taken for a voice
            part = folder / "download"
            shutil.rmtree(part, ignore_errors=True)
            part.mkdir(parents=True)
            download_voice(voice, part)
            (part / (voice + ".onnx.json")).replace(folder / (voice + ".onnx.json"))
            (part / (voice + ".onnx")).replace(model)
        piper_voices[voice] = PiperVoice.load(model)

    chunks = list(piper_voices[voice].synthesize(str(text)))
    if not chunks:
        return
    samples = np.frombuffer(b"".join(chunk.audio_int16_bytes for chunk in chunks), "<i2")
    # The brick only plays WAV files at the sample rate of its speaker (32 kHz): the voice (16 or 22 kHz) is resampled
    rate = sound_player._output_device.sample_rate
    positions = np.arange(0, len(samples) - 1, chunks[0].sample_rate / rate)
    samples = np.interp(positions, np.arange(len(samples)), samples).astype("<i2")
    sound_path = "/tmp/say_on_board.wav"
    with wave.open(sound_path, "wb") as sound:
        sound.setnchannels(1)
        sound.setsampwidth(2)
        sound.setframerate(rate)
        sound.writeframes(samples.tobytes())
    sound_player.play_wav(sound_path, block=True)`,

        DEF_PLAY_FREQUENCY_ON_COMPUTER:
`def play_frequency_on_computer(frequency, duration):
    import time
    print("[vitta:tone] " + str(float(frequency)) + " " + str(float(duration)), flush=True)
    time.sleep(duration)`,

        // Web (standard library only: nothing to install on the board)
        DEF_HTTP_GET_TEXT:
`def http_get_text(url):
    import urllib.request
    try:
        with urllib.request.urlopen(str(url), timeout=10) as response:
            return response.read().decode("utf-8", errors="replace")
    except Exception as error:
        print("[http] Page " + str(url) + " non disponible : " + str(error))
        return ""`,

        DEF_HTTP_GET_JSON:
`def http_get_json(url):
    import json
    import urllib.request
    try:
        with urllib.request.urlopen(str(url), timeout=10) as response:
            return json.loads(response.read().decode("utf-8"))
    except Exception as error:
        print("[http] Données de " + str(url) + " non disponibles : " + str(error))
        return {}`,

        DEF_HTTP_POST_JSON:
`def http_post_json(url, data):
    import json
    import urllib.request
    request = urllib.request.Request(str(url), data=json.dumps(data).encode("utf-8"),
                                     headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return response.read().decode("utf-8", errors="replace")
    except Exception as error:
        print("[http] Envoi à " + str(url) + " impossible : " + str(error))
        return ""`,

        // Weather of Open-Meteo (open-meteo.com, no API key): position of the city, then its current weather
        DEF_GET_WEATHER:
`weather_places = {}

def weather_request(city, params):
    # Open-Meteo forecast of the city (position found once by name), None when not available
    import json
    import urllib.parse
    import urllib.request
    try:
        if city not in weather_places:
            query = urllib.parse.urlencode({"name": city, "count": 1, "language": "fr"})
            with urllib.request.urlopen("https://geocoding-api.open-meteo.com/v1/search?" + query, timeout=10) as response:
                results = json.loads(response.read().decode("utf-8")).get("results")
            if not results:
                print("[météo] Ville " + str(city) + " introuvable")
                return None
            weather_places[city] = (results[0]["latitude"], results[0]["longitude"])
        latitude, longitude = weather_places[city]
        query = urllib.parse.urlencode(dict({"latitude": latitude, "longitude": longitude, "timezone": "auto"}, **params))
        with urllib.request.urlopen("https://api.open-meteo.com/v1/forecast?" + query, timeout=10) as response:
            return json.loads(response.read().decode("utf-8"))
    except Exception as error:
        print("[météo] Météo de " + str(city) + " non disponible : " + str(error))
        return None

def get_weather(city, measure):
    data = weather_request(city, {"current": measure})
    return data["current"][measure] if data else None

def get_weather_forecast(city, measure, days):
    # Daily value in "days" days (0: today), up to 15 days
    days = max(0, min(15, int(days)))
    data = weather_request(city, {"daily": measure, "forecast_days": days + 1})
    return data["daily"][measure][days] if data else None`,

        // Weather of the coming days (Weather Forecast brick): sunny, cloudy, rainy, snowy or foggy
        DEF_WEATHER_FORECAST:
`weather_forecaster = None

def weather_forecast_is(city, days, category):
    global weather_forecaster
    if weather_forecaster is None:
        weather_forecaster = WeatherForecast()
    try:
        days = max(0, min(15, int(days)))
        return weather_forecaster.get_forecast_by_city(str(city), timezone="auto", forecast_days=days + 1).category == category
    except Exception as error:
        print("[météo] Prévision de " + str(city) + " non disponible : " + str(error))
        return False`,

        // Data logging: CSV files next to main.py, on the board in /home/arduino/ArduinoApps/vittascience-app/python/
        // (";" between the values, for the spreadsheets set in French)
        DEF_DATALOG_FILE:
`def datalog_file(name):
    name = Path(str(name)).name or "donnees.csv"
    if "." not in name:
        name += ".csv"
    return Path(__file__).resolve().parent / name`,

        DEF_DATALOG_SET_COLUMNS:
`def datalog_set_columns(name, columns):
    path = datalog_file(name)
    # Only for a new or empty file: the data already recorded keep their columns
    if not path.exists() or path.stat().st_size == 0:
        with open(path, "w", encoding="utf-8") as file:
            file.write(";".join(["date"] + [str(column) for column in columns]) + "\\n")`,

        DEF_DATALOG_ADD_LINE:
`def datalog_add_line(name, values):
    from datetime import datetime
    if not isinstance(values, (list, tuple)):
        values = [values]
    with open(datalog_file(name), "a", encoding="utf-8") as file:
        file.write(";".join([datetime.now().strftime("%Y-%m-%d %H:%M:%S")] + [str(value) for value in values]) + "\\n")`,

        DEF_DATALOG_CLEAR:
`def datalog_clear(name):
    datalog_file(name).unlink(missing_ok=True)`,

        // Bricks of Arduino App Lab started at once (App.start_brick), next to the loop of the program; their events
        // call the functions of the "when..." blocks (handlers)

        // Sound Generator brick: chord of notes given as a text ("C4 E4 G4"), duration in seconds
        DEF_SOUND_CHORD:
`def play_chord_on_board(notes, duration):
    # The brick counts the chord duration in note fractions: seconds / duration of a whole note at its tempo.
    # ponytail: _compute_time_duration is private to the brick, its own conversion
    whole = sound_player._compute_time_duration(1)
    sound_player.play_chord(str(notes).upper().split(), float(duration) / whole, block=True)`,

        // Image of the camera of the bricks (blocks "rotate / mirror / adjust the camera image"): applied to each
        // frame by the camera (adjustments of App Lab), so the detections, photos and videos are changed too
        DEF_CAMERA:
`camera_rotation = 0
camera_flip = ""
camera_brightness = 0.0
camera_contrast = 1.0
camera_greyscale = False

def set_camera_rotation(angle):
    global camera_rotation
    camera_rotation = int(angle) % 360

def set_camera_flip(direction):
    global camera_flip
    camera_flip = direction

def set_camera_image(brightness, contrast):
    global camera_brightness, camera_contrast
    camera_brightness = max(-1.0, min(1.0, float(brightness) / 100))
    camera_contrast = max(0.0, float(contrast) / 100)

def set_camera_colors(greyscale):
    global camera_greyscale
    camera_greyscale = greyscale

def adjust_camera_image(frame):
    # np.rot90 turns counter-clockwise: the angle of the block is clockwise
    frame = np.rot90(frame, -(camera_rotation // 90))
    if camera_flip == "h":
        frame = frame[:, ::-1]
    elif camera_flip == "v":
        frame = frame[::-1]
    frame = np.ascontiguousarray(frame)
    if camera_brightness != 0 or camera_contrast != 1:
        frame = adjust(frame, brightness=camera_brightness, contrast=camera_contrast)
    if camera_greyscale:
        frame = greyscale(frame)
    return frame`,

        // Photo of the camera of the board (JPEG), for Telegram or a file
        DEF_CAMERA_PHOTO:
`camera_photo_handle = None

def camera_photo():
    import time
    global camera_photo_handle
    if camera_photo_handle is None:
        # Shares the camera with the bricks (Camera of App Lab), with the same image settings
        camera_photo_handle = Camera(adjustments=adjust_camera_image)
        camera_photo_handle.start()
    # ponytail: up to 2 s for the first image of a camera just started
    for _ in range(20):
        frame = camera_photo_handle.capture()
        if frame is not None:
            jpeg = compress_to_jpeg(frame)
            return jpeg.tobytes() if jpeg is not None else None
        time.sleep(0.1)
    print("[camera] Pas d'image : la caméra est-elle branchée à la carte ?")
    return None

def save_camera_photo(name):
    from pathlib import Path
    photo = camera_photo()
    if photo:
        # Next to main.py, like the data log files
        (Path(__file__).resolve().parent / str(name)).write_bytes(photo)`,

        // Web terminal of the board on /console (WebUI brick, next to the page of the program on /): SSH session on the
        // board system (paramiko in requirements.txt) with its own user and password, shown by xterm.js
        DEF_WEB_TERMINAL:
`WEB_TERMINAL_PAGE = """<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Terminal</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/css/xterm.css">
<style>
:root { color-scheme: dark; }
body { margin: 0; height: 100vh; display: flex; flex-direction: column; background: #0d1117; color: #c9d1d9; font: 14px/1.45 system-ui, sans-serif; }
header { display: flex; align-items: center; gap: 12px; padding: 8px 16px; background: #161b22; border-bottom: 1px solid #30363d; }
header span { flex: 1; font-weight: 600; }
#terminal { flex: 1; min-height: 0; padding: 6px 0 0 8px; }
form { margin: auto; display: flex; flex-direction: column; gap: 8px; width: min(320px, 90vw); padding: 20px; border: 1px solid #30363d; border-radius: 8px; background: #161b22; }
input { padding: 8px 10px; background: #0d1117; color: #e6edf3; border: 1px solid #30363d; border-radius: 6px; font: inherit; }
button { padding: 8px 14px; background: #238636; color: #fff; border: 0; border-radius: 6px; font: inherit; cursor: pointer; }
header button { background: #30363d; }
.error { color: #f85149; min-height: 1.4em; }
[hidden] { display: none !important; }
</style>
</head>
<body>
<header><span id="title"></span><button id="logs" hidden></button></header>
<form id="login">
<label for="user" id="userLabel"></label><input id="user" value="arduino" autocomplete="username">
<label for="password" id="passwordLabel"></label><input id="password" type="password" autocomplete="current-password">
<button id="enter"></button><span id="error" class="error"></span>
</form>
<div id="terminal" hidden></div>
<script src="https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/lib/xterm.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/lib/addon-fit.min.js"></script>
<script src="/libs/socket.io.min.js"></script>
<script>
const L = __LABELS__;
const CR = String.fromCharCode(13), NL = String.fromCharCode(10);
const $ = id => document.getElementById(id);
document.title = $("title").textContent = L.title;
$("userLabel").textContent = L.user; $("passwordLabel").textContent = L.password; $("enter").textContent = L.enter; $("logs").textContent = L.logs;
const term = new Terminal({ cursorBlink: true, fontSize: 14, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", theme: { background: "#0d1117" } });
const fit = new FitAddon.FitAddon();
term.loadAddon(fit);
const socket = io();
let opened = false;
const size = () => ({ cols: term.cols, rows: term.rows });
$("login").onsubmit = event => {
  event.preventDefault();
  $("error").textContent = "";
  $("enter").disabled = true;
  socket.emit("vitta_terminal_login", Object.assign({ user: $("user").value, password: $("password").value }, size()));
};
socket.on("vitta_terminal_login_response", answer => {
  $("enter").disabled = false;
  if (!answer.ok) { $("error").textContent = answer.error || L.wrong; return; }
  $("password").value = "";
  $("login").hidden = true; $("terminal").hidden = false; $("logs").hidden = false;
  if (!opened) { term.open($("terminal")); opened = true; }
  term.reset(); fit.fit(); socket.emit("vitta_terminal_resize", size()); term.focus();
});
socket.on("vitta_terminal_output", data => term.write(data));
// Session closed (exit, or app restarted): log in again
const closed = () => {
  if ($("terminal").hidden) return;
  term.write(CR + NL + "[" + L.closed + "]" + CR + NL);
  $("terminal").hidden = true; $("logs").hidden = true; $("login").hidden = false; $("password").focus();
};
socket.on("vitta_terminal_closed", closed);
socket.on("disconnect", closed);
term.onData(data => socket.emit("vitta_terminal_input", data));
window.addEventListener("resize", () => { if (!$("terminal").hidden) { fit.fit(); socket.emit("vitta_terminal_resize", size()); } });
$("logs").onclick = () => { socket.emit("vitta_terminal_input", "arduino-app-cli app logs --follow ~/ArduinoApps/vittascience-app" + CR); term.focus(); };
</script>
</body>
</html>"""

web_terminal_sessions = {}

def web_terminal_start(labels):
    import json
    from fastapi.responses import HTMLResponse
    page = WEB_TERMINAL_PAGE.replace("__LABELS__", json.dumps(labels))
    ui.expose_api("GET", "/console", lambda: HTMLResponse(page, headers={"Cache-Control": "no-store"}))
    ui.on_message("vitta_terminal_login", web_terminal_login)
    ui.on_message("vitta_terminal_input", web_terminal_input)
    ui.on_message("vitta_terminal_resize", web_terminal_resize)
    # The page closed: its SSH session too (after a handler of the program, if any)
    previous = getattr(ui, "_on_disconnect_cb", None)
    def disconnected(sid):
        web_terminal_close(sid)
        if previous:
            previous(sid)
    ui.on_disconnect(disconnected)

def web_terminal_hosts():
    import os
    import socket
    import struct
    # The board system seen from the app container: its address given by App Lab, the gateway of the container
    hosts = [os.getenv("HOST_IP", "")]
    try:
        with open("/proc/net/route") as routes:
            for route in routes.read().splitlines()[1:]:
                fields = route.split()
                if fields[1] == "00000000":
                    hosts.append(socket.inet_ntoa(struct.pack("<L", int(fields[2], 16))))
    except Exception:
        pass
    hosts.append("127.0.0.1")
    return [host for i, host in enumerate(hosts) if host and host not in hosts[:i]]

def web_terminal_login(sid, data):
    import paramiko
    web_terminal_close(sid)
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    error = None
    for host in web_terminal_hosts():
        try:
            client.connect(host, username=str(data.get("user") or "arduino"), password=str(data.get("password") or ""),
                           timeout=5, look_for_keys=False, allow_agent=False)
            break
        except paramiko.AuthenticationException:
            return {"ok": False}
        except Exception as exception:
            error = str(exception)
    else:
        return {"ok": False, "error": "SSH : " + str(error)}
    channel = client.invoke_shell(term="xterm-256color", width=int(data.get("cols") or 80), height=int(data.get("rows") or 24))
    web_terminal_sessions[sid] = (client, channel)
    threading.Thread(target=web_terminal_read, args=(sid, channel), daemon=True).start()
    return {"ok": True}

def web_terminal_read(sid, channel):
    import codecs
    # Characters cut between two reads are joined
    decoder = codecs.getincrementaldecoder("utf-8")(errors="replace")
    while True:
        data = channel.recv(4096)
        if not data:
            break
        ui.send_message("vitta_terminal_output", decoder.decode(data), room=sid)
    session = web_terminal_sessions.get(sid)
    if session and session[1] is channel:
        web_terminal_close(sid)
        ui.send_message("vitta_terminal_closed", "", room=sid)

def web_terminal_input(sid, data):
    session = web_terminal_sessions.get(sid)
    if session:
        session[1].send(str(data))

def web_terminal_resize(sid, data):
    session = web_terminal_sessions.get(sid)
    if session:
        session[1].resize_pty(width=int(data.get("cols") or 80), height=int(data.get("rows") or 24))

def web_terminal_close(sid):
    session = web_terminal_sessions.pop(sid, None)
    if session:
        session[0].close()`,

        // Stop motion: numbered photos in a folder next to main.py, assembled into an animated GIF in the assets of the
        // web page (served by the WebUI brick: shown by the HTML block "image" with the file name)
        DEF_STOPMOTION_FOLDER:
`def stopmotion_folder(folder):
    path = Path(__file__).resolve().parent / (Path(str(folder)).name or "photos")
    path.mkdir(exist_ok=True)
    return path

def stopmotion_photos(folder):
    photos = [p for p in stopmotion_folder(folder).glob("photo_*.jpg") if p.stem[6:].isdigit()]
    return sorted(photos, key=lambda p: int(p.stem[6:]))`,

        DEF_SAVE_CAMERA_PHOTO_IN_FOLDER:
`def save_camera_photo_in_folder(folder):
    photo = camera_photo()
    if photo:
        # Numbered after the last photo of the folder: the order is kept, also after a restart of the app
        photos = stopmotion_photos(folder)
        number = int(photos[-1].stem[6:]) + 1 if photos else 1
        (stopmotion_folder(folder) / ("photo_%04d.jpg" % number)).write_bytes(photo)`,

        DEF_MAKE_STOPMOTION:
`def make_stopmotion(name, folder, fps, video_format="gif"):
    from PIL import Image
    photos = stopmotion_photos(folder)
    if not photos:
        print("[stop motion] Aucune photo dans le dossier " + str(folder))
        return
    name = (Path(str(name)).stem or "film") + "." + video_format
    assets = Path(__file__).resolve().parent.parent / "assets"
    assets.mkdir(exist_ok=True)
    frames = [Image.open(photo).convert("RGB") for photo in photos]
    fps = max(0.1, min(50, float(fps)))
    if video_format == "mp4":
        # H.264 in yuv420p, the format all the browsers play: PyAV (av in requirements.txt) embeds FFmpeg with libx264
        from fractions import Fraction
        import av
        with av.open(str(assets / name), "w") as video:
            stream = video.add_stream("libx264", rate=Fraction(fps).limit_denominator(1000))
            # yuv420p needs an even width and height
            stream.width = frames[0].width // 2 * 2
            stream.height = frames[0].height // 2 * 2
            stream.pix_fmt = "yuv420p"
            for frame in frames:
                frame = frame.crop((0, 0, stream.width, stream.height))
                for packet in stream.encode(av.VideoFrame.from_image(frame)):
                    video.mux(packet)
            for packet in stream.encode():
                video.mux(packet)
    else:
        # GIF: durations in hundredths of a second, the browsers slow down the frames under 0.02 s (50 images/s)
        frames[0].save(assets / name, save_all=True, append_images=frames[1:], duration=round(1000 / fps), loop=0)
    print("[stop motion] " + name + " : " + str(len(frames)) + " photos, visible sur la page web de la carte à l'adresse /" + name)`,

        // QR codes and barcodes of the camera plugged into the board (Camera Code Detection brick)
        DEF_CODE_DETECTION:
`code_detector = None
last_code = ""
last_code_type = ""
code_kinds = "all"
code_last_times = {}
code_handlers = []

def code_detection_start():
    global code_detector
    if code_detector is None:
        code_detector = CameraCodeDetection(camera=Camera(adjustments=adjust_camera_image))
        code_detector.on_detect(code_detected)
        App.start_brick(code_detector)

def set_code_kinds(kinds):
    global code_kinds
    code_kinds = kinds

def code_detected(frame, detection: Detection):
    import time
    global last_code, last_code_type
    is_qr = detection.type in ("QRCODE", "SQCODE")
    if (code_kinds == "qr" and not is_qr) or (code_kinds == "barcode" and is_qr):
        return
    # The brick reports each code only once: the same code is read again after 3 seconds
    code_detector.already_seen_codes.clear()
    if time.time() - code_last_times.get(detection.content, 0) < 3:
        return
    code_last_times[detection.content] = time.time()
    last_code = detection.content
    last_code_type = detection.type
    for handler in code_handlers:
        handler()`,

        // Objects seen by the camera plugged into the board (Video Object Detection brick, pre-trained model)
        DEF_OBJECT_DETECTION:
`object_detector = None
object_detections = {}
object_detections_time = 0
object_last_times = {}
object_handlers = {}

def object_detection_start():
    global object_detector
    if object_detector is None:
        object_detector = VideoObjectDetection(camera=Camera(adjustments=adjust_camera_image), confidence=0.5)
        object_detector.on_detect_all(objects_detected)
        App.start_brick(object_detector)

def objects_detected(detections):
    import time
    global object_detections, object_detections_time
    object_detections = detections
    object_detections_time = time.time()
    for label, handlers in object_handlers.items():
        # Reported again every 2 seconds while the object stays in view
        if label in detections and time.time() - object_last_times.get(label, 0) >= 2:
            object_last_times[label] = time.time()
            for handler in handlers:
                handler()

def count_objects(label):
    import time
    object_detection_start()
    # Detections older than a second: the object is gone
    if time.time() - object_detections_time > 1:
        return 0
    return len(object_detections.get(label, []))

def object_set_confidence(percent):
    import threading
    object_detection_start()
    value = max(0.01, min(1.0, float(percent) / 100))
    # Sent to the model runner (can wait for it a few seconds: in the background); before the runner answers,
    # the value is kept by the brick and sent when it connects.
    # ponytail: _confidence is a private attribute of the brick, its own value for the next connection
    object_detector._confidence = value
    def send():
        try:
            object_detector.override_threshold(value)
        except Exception as error:
            print("[objets] Seuil non transmis au modèle :", error)
    threading.Thread(target=send, daemon=True).start()

def object_seen():
    import time
    object_detection_start()
    # Detections older than a second: the objects are gone
    return object_detections if time.time() - object_detections_time <= 1 else {}

def object_confidence(label):
    boxes = object_seen().get(label, [])
    return round(max(box.get("confidence", 0) for box in boxes) * 100, 1) if boxes else 0

def objects_list():
    return list(object_seen().keys())

def object_position(label, measure):
    import time
    object_detection_start()
    # Most confident detection of the object, -1 when it is not seen (no detection for a second)
    boxes = object_detections.get(label, []) if time.time() - object_detections_time <= 1 else []
    if not boxes:
        return -1
    x1, y1, x2, y2 = max(boxes, key=lambda box: box.get("confidence", 0))["bounding_box_xyxy"]
    # In % of the image of the model (the centre square of the camera image): 0 left / top, 100 right / bottom.
    # ponytail: image size from a private attribute of the brick (_model_info), pixels when it is unknown
    info = getattr(object_detector, "_model_info", None)
    width = info.image_input_width if info and info.image_input_width > 0 else 100
    height = info.image_input_height if info and info.image_input_height > 0 else 100
    values = {"x": (x1 + x2) / 2 / width, "y": (y1 + y2) / 2 / height, "width": (x2 - x1) / width, "height": (y2 - y1) / height}
    return round(values[measure] * 100, 1)`,

        // "Hey Arduino" heard by the microphone plugged into the board (Keyword Spotting brick, pre-trained model)
        DEF_KEYWORD_SPOTTING:
`keyword_detector = None
keyword_handlers = []

def keyword_start():
    global keyword_detector
    if keyword_detector is None:
        keyword_detector = KeywordSpotting()
        keyword_detector.on_detect("hey_arduino", keyword_heard)
        App.start_brick(keyword_detector)

def keyword_heard():
    for handler in keyword_handlers:
        handler()`,

        // Language model run on the board (Large Language Model brick, llama.cpp), created at the first question
        // with the personality and memory chosen by the blocks
        DEF_LOCAL_LLM:
`local_llm = None
local_llm_personality = ""
local_llm_memory = False
local_llm_model = None
local_llm_stream = False
local_llm_options = {}
# Tools of the model (blocks "local AI tool"): Python functions it can call, described by their docstring
local_llm_tools = []

def local_llm_set(personality=None, memory=None, model=None, stream=None, creativity=None, max_tokens=None):
    global local_llm, local_llm_personality, local_llm_memory, local_llm_model, local_llm_stream
    # Creativity in % (temperature 0 to 1 of the model), answer length in tokens (about 3/4 of a word each)
    if creativity is not None:
        local_llm_options["temperature"] = max(0.0, min(1.0, float(creativity) / 100))
    if max_tokens is not None:
        local_llm_options["max_tokens"] = max(1, int(max_tokens))
    if stream is not None:
        local_llm_stream = stream
    if model is not None:
        local_llm_model = model
    if personality is not None:
        local_llm_personality = str(personality)
    if memory is not None:
        local_llm_memory = memory
    local_llm = None

def local_llm_get():
    # Created at the first question with the settings of the blocks (again after a change)
    global local_llm
    if local_llm is None:
        local_llm = LargeLanguageModel(system_prompt=local_llm_personality, model=local_llm_model, tools=local_llm_tools or None,
                                       **local_llm_options)
        if local_llm_memory:
            local_llm = local_llm.with_memory(max_messages=10)
    return local_llm

def local_llm_ask(question):
    try:
        local_llm_get()
        if local_llm_stream:
            # Shown while written in the conversation of a Telegram event (else the whole answer is given)
            stream = globals().get("telegram_stream")
            chunks = local_llm.chat_stream(str(question))
            return (stream(chunks) if stream else "".join(chunks)).strip()
        return local_llm.chat(str(question)).strip()
    except Exception as error:
        print("[IA] Pas de réponse du modèle de langage :", error)
        return ""

def local_llm_clear():
    if local_llm is not None and local_llm_memory:
        local_llm.clear_memory()

local_llm_chooser = None

def local_llm_choose(actions, sentence):
    # The model only has to name one of the actions: much more reliable than tools for a small model
    global local_llm_chooser
    actions = [str(action) for action in actions]
    try:
        if local_llm_chooser is None:
            local_llm_chooser = LargeLanguageModel(model=local_llm_model, temperature=0, max_tokens=20, system_prompt=
                "You choose the action matching the sentence. Answer only with the name of one action of the list, nothing else.")
        answer = local_llm_chooser.chat("Actions: " + ", ".join(actions) + "\\nSentence: " + str(sentence) + "\\nAction:").strip().lower()
    except Exception as error:
        print("[IA] Pas de réponse du modèle de langage :", error)
        return ""
    # The exact name, else the longest action named in the answer, else nothing
    for action in actions:
        if answer.strip(" .'\\"") == action.lower():
            return action
    found = [action for action in actions if action.lower() in answer]
    return max(found, key=len) if found else ""`,

        // Chat of the web page with the local AI (block html_llm_chat): answer streamed to the page that asked
        DEF_LOCAL_LLM_WEB_CHAT:
`def local_llm_web_chat(sid, question):
    # ponytail: one answer at a time (the model runner computes one anyway)
    try:
        for chunk in local_llm_get().chat_stream(str(question)):
            ui.send_message("vitta_llm_chunk", chunk, room=sid)
    except Exception as error:
        print("[IA] Pas de réponse du modèle de langage :", error)
        ui.send_message("vitta_llm_chunk", "⚠ " + str(error), room=sid)
    ui.send_message("vitta_llm_done", "", room=sid)`,

        // MQTT messages (MQTT Connector brick, paho-mqtt client)
        DEF_MQTT:
`mqtt_client = None
mqtt_message = ""
mqtt_topic = ""
mqtt_handlers = {}

def mqtt_connect(server, port=1883, user="", password=""):
    global mqtt_client
    if mqtt_client is None:
        mqtt_client = MQTT(broker_address=str(server), broker_port=int(port), username=str(user) or None,
                           password=str(password) or None, topics=list(mqtt_handlers) or None)
        for topic in mqtt_handlers:
            mqtt_client.on_message(topic, lambda client, userdata, message, topic=topic: mqtt_received(message, mqtt_handlers[topic]))
        App.start_brick(mqtt_client)

def mqtt_received(message, handlers):
    global mqtt_message, mqtt_topic
    mqtt_topic = message.topic
    mqtt_message = message.payload.decode(errors="replace")
    for handler in handlers:
        handler()

def mqtt_publish(text, topic):
    if mqtt_client is None:
        print("[MQTT] Pas de connexion : utilise d'abord le bloc de connexion au serveur MQTT")
        return
    mqtt_client.publish(str(topic), str(text))`,

        // Bluetooth messages: BLE client (bleak). The container has no D-Bus: the system bus comes from the Bluetooth
        // bridge of the uploader, in the app folder. bleak has its own event loop, the handlers run in order in a thread
        DEF_BLE:
`os.environ["DBUS_SYSTEM_BUS_ADDRESS"] = "unix:path=/app/.ble-dbus.sock"
ble_client = None
ble_message = ""
ble_handlers = {}
ble_loop = None
ble_queue = queue.Queue()

def ble_run(coroutine, timeout=30):
    global ble_loop
    if ble_loop is None:
        ble_loop = asyncio.new_event_loop()
        # not a daemon thread: it keeps the program running after the last line, for the messages to come
        threading.Thread(target=ble_loop.run_forever).start()
        threading.Thread(target=ble_worker).start()
    return asyncio.run_coroutine_threadsafe(coroutine, ble_loop).result(timeout)

def ble_received(data, handlers):
    global ble_message
    ble_message = bytes(data).decode(errors="replace").rstrip("\\r\\n")
    for handler in handlers:
        handler()

def ble_worker():
    while True:
        ble_received(*ble_queue.get())

async def ble_open(name):
    global ble_client
    from bleak import BleakClient, BleakScanner
    device = await BleakScanner.find_device_by_filter(lambda d, a: str(name) in (d.name, a.local_name, d.address), timeout=10)
    if device is None:
        print("[Bluetooth] Appareil introuvable : " + str(name))
        return
    ble_client = BleakClient(device)
    await ble_client.connect()
    for uuid, handlers in ble_handlers.items():
        await ble_client.start_notify(uuid, lambda _, data, handlers=handlers: ble_queue.put((data, handlers)))

def ble_connect(name):
    try:
        ble_run(ble_open(name))
    except Exception as error:
        print("[Bluetooth] Connexion impossible :", error)

def ble_is_connected():
    return ble_client is not None and ble_client.is_connected

async def ble_write(text, uuid):
    characteristic = ble_client.services.get_characteristic(uuid)
    if characteristic is None:
        print("[Bluetooth] Caractéristique introuvable : " + uuid)
        return
    await ble_client.write_gatt_char(characteristic, str(text).encode(), response="write" in characteristic.properties)

def ble_send(text, uuid):
    if not ble_is_connected():
        print("[Bluetooth] Pas de connexion : utilise d'abord le bloc de connexion à un appareil")
        return
    try:
        ble_run(ble_write(text, str(uuid)))
    except Exception as error:
        print("[Bluetooth] Envoi impossible :", error)

def ble_disconnect():
    if ble_is_connected():
        ble_run(ble_client.disconnect())`,

        // Bluetooth server: Nordic UART service of BlueZ, the board waits for a phone. Without "discoverable" on the adapter
        // the advertisement of the UNO Q (WCN3988) is not connectable. Needs DEF_BLE
        DEF_BLE_SERVER:
`BLE_UART_SERVICE = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
BLE_UART_RX = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
BLE_UART_TX = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"
BLE_ROOT = "/vitta"
ble_server_handlers = []
ble_server_tx = None
ble_server_bus = None

class BleService(ServiceInterface):
    def __init__(self):
        super().__init__("org.bluez.GattService1")

    @dbus_property(access=PropertyAccess.READ)
    def UUID(self) -> "s":
        return BLE_UART_SERVICE

    @dbus_property(access=PropertyAccess.READ)
    def Primary(self) -> "b":
        return True

class BleCharacteristic(ServiceInterface):
    def __init__(self, uuid, flags):
        super().__init__("org.bluez.GattCharacteristic1")
        self.uuid = uuid
        self.flags = flags
        self.value = b""
        self.notifying = False

    @dbus_property(access=PropertyAccess.READ)
    def UUID(self) -> "s":
        return self.uuid

    @dbus_property(access=PropertyAccess.READ)
    def Service(self) -> "o":
        return BLE_ROOT + "/service0"

    @dbus_property(access=PropertyAccess.READ)
    def Flags(self) -> "as":
        return self.flags

    @dbus_property(access=PropertyAccess.READ)
    def Value(self) -> "ay":
        return self.value

    @method()
    def ReadValue(self, options: "a{sv}") -> "ay":
        return self.value

    @method()
    def WriteValue(self, value: "ay", options: "a{sv}"):
        ble_queue.put((value, ble_server_handlers))

    @method()
    def StartNotify(self):
        self.notifying = True

    @method()
    def StopNotify(self):
        self.notifying = False

    def send(self, data):
        self.value = data
        if self.notifying:
            self.emit_properties_changed({"Value": data})

class BleAdvertisement(ServiceInterface):
    def __init__(self, name):
        super().__init__("org.bluez.LEAdvertisement1")
        self.name = name

    @dbus_property(access=PropertyAccess.READ)
    def Type(self) -> "s":
        return "peripheral"

    @dbus_property(access=PropertyAccess.READ)
    def ServiceUUIDs(self) -> "as":
        return [BLE_UART_SERVICE]

    @dbus_property(access=PropertyAccess.READ)
    def LocalName(self) -> "s":
        return self.name

    @dbus_property(access=PropertyAccess.READ)
    def Discoverable(self) -> "b":
        return True

    @method()
    def Release(self):
        pass

async def ble_server_open(name):
    global ble_server_bus, ble_server_tx
    ble_server_bus = await MessageBus(bus_type=BusType.SYSTEM).connect()
    ble_server_tx = BleCharacteristic(BLE_UART_TX, ["notify", "read"])
    ble_server_bus.export(BLE_ROOT + "/service0", BleService())
    ble_server_bus.export(BLE_ROOT + "/service0/char0", BleCharacteristic(BLE_UART_RX, ["write", "write-without-response"]))
    ble_server_bus.export(BLE_ROOT + "/service0/char1", ble_server_tx)
    ble_server_bus.export(BLE_ROOT + "/adv0", BleAdvertisement(name))
    node = await ble_server_bus.introspect("org.bluez", "/org/bluez/hci0")
    hci = ble_server_bus.get_proxy_object("org.bluez", "/org/bluez/hci0", node)
    adapter = hci.get_interface("org.bluez.Adapter1")
    await adapter.set_alias(name)
    await hci.get_interface("org.bluez.GattManager1").call_register_application(BLE_ROOT, {})
    await hci.get_interface("org.bluez.LEAdvertisingManager1").call_register_advertisement(BLE_ROOT + "/adv0", {})
    # after the advertisement: the other way round the board is not seen
    await adapter.set_discoverable_timeout(0)
    await adapter.set_discoverable(True)

def ble_server_start(name):
    try:
        ble_run(ble_server_open(str(name)))
    except Exception as error:
        print("[Bluetooth] Serveur impossible à démarrer :", error)

def ble_server_connected():
    return ble_server_tx is not None and ble_server_tx.notifying

def ble_server_send(text):
    if not ble_server_connected():
        print("[Bluetooth] Aucun appareil connecté au serveur")
        return
    ble_loop.call_soon_threadsafe(ble_server_tx.send, str(text).encode())`,

        // Variables of an Arduino Cloud Thing (Arduino Cloud brick): board connected to Arduino Cloud in App Lab
        DEF_ARDUINO_CLOUD:
`arduino_cloud = None
cloud_variables = set()
cloud_handlers = {}

def cloud_variable(name):
    global arduino_cloud
    name = str(name)
    if arduino_cloud is None:
        arduino_cloud = ArduinoCloud()
        App.start_brick(arduino_cloud)
    if name not in cloud_variables:
        cloud_variables.add(name)
        arduino_cloud.register(name, on_write=lambda client, value, name=name: cloud_changed(name))
    return name

def cloud_changed(name):
    for handler in cloud_handlers.get(name, []):
        handler()

def cloud_get(name):
    return arduino_cloud.get(cloud_variable(name))

def cloud_set(name, value):
    setattr(arduino_cloud, cloud_variable(name), value)`,

        // Telegram bot (Telegram Bot brick): token given by @BotFather
        DEF_TELEGRAM:
`telegram_bot = None
telegram_text = ""
telegram_chat = None
telegram_handlers = []
telegram_commands = {}
telegram_token = ""
# Conversation of the Telegram event running (answers of the local AI streamed there), last text streamed per chat
telegram_event_chat = None
telegram_streamed = {}

def telegram_start(token):
    global telegram_bot, telegram_token
    if telegram_bot is None:
        telegram_token = str(token)
        telegram_bot = TelegramBot(token=str(token))
        telegram_bot.on_text(telegram_received)
        for command in telegram_commands:
            telegram_bot.add_command(command, lambda sender, message, command=command: telegram_received(sender, message, telegram_commands[command]))
        App.start_brick(telegram_bot)

def telegram_received(sender, message, handlers=None):
    global telegram_text, telegram_chat, telegram_event_chat
    telegram_text = message.text or ""
    telegram_chat = sender.chat_id
    # ponytail: one event at a time assumed for the streamed answers (messages received together share the chat)
    telegram_event_chat = sender.chat_id
    try:
        for handler in telegram_handlers if handlers is None else handlers:
            handler()
    finally:
        telegram_event_chat = None

def telegram_api(method, **params):
    # Telegram Bot API called directly: the brick gives no message id to edit a message
    import json, urllib.request
    request = urllib.request.Request("https://api.telegram.org/bot" + telegram_token + "/" + method,
                                     data=json.dumps(params).encode(), headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(request, timeout=10) as response:
        return json.load(response).get("result")

def telegram_stream(chunks):
    # Answer of the local AI shown while it is written: sent, then edited about once a second (Telegram limits)
    import time
    chat = telegram_event_chat
    text = ""
    if chat is None:
        return "".join(chunks)
    message_id = None
    shown = ""
    last = 0
    for chunk in chunks:
        text += chunk
        if text.strip() and time.time() - last >= 1:
            message_id, shown = telegram_show(chat, message_id, text, shown)
            last = time.time()
    if text.strip():
        telegram_show(chat, message_id, text, shown)
    telegram_streamed[chat] = text.strip()
    return text

def telegram_show(chat, message_id, text, shown):
    text = text.strip()
    try:
        if message_id is None:
            message_id = telegram_api("sendMessage", chat_id=chat, text=text)["message_id"]
        elif text != shown:
            telegram_api("editMessageText", chat_id=chat, message_id=message_id, text=text)
    except Exception as error:
        print("[telegram] Réponse en continu :", error)
    return message_id, text

def telegram_chat_for(chat):
    # 0 or nothing: the last conversation that wrote to the bot
    chat = int(chat) if chat else telegram_chat
    if telegram_bot is None or chat is None:
        print("[telegram] Pas de conversation : démarre le bot, puis envoie-lui d'abord un message depuis Telegram")
    return chat if telegram_bot is not None else None

def telegram_send(text, chat=None):
    chat = telegram_chat_for(chat)
    # Already shown in this chat while the local AI wrote it (streamed answer): not sent twice
    if chat is not None and telegram_streamed.pop(chat, None) == str(text).strip():
        return
    if chat is not None:
        telegram_bot.send_message(chat, str(text))

def telegram_send_photo(caption, chat=None):
    chat = telegram_chat_for(chat)
    photo = camera_photo()
    if chat is not None and photo:
        telegram_bot.send_photo(chat, photo, str(caption))`
    },
    'cpp': {
        
    },
    'js': {

    }
}