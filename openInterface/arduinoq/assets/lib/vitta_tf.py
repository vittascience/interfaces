import sys
import re
import requests
import json
from pathlib import Path
from urllib.parse import urlparse, parse_qs
from datetime import datetime
from PIL import Image
import numpy as np
import subprocess
import shutil
import hashlib
import warnings
import base64
import math
import time
from decimal import Decimal, ROUND_HALF_UP

# tf.lite.Interpreter still works on the TensorFlow of the board, don't show its deprecation notice to the students
warnings.filterwarnings("ignore", category=UserWarning, message=r"\s*Warning: tf\.lite\.Interpreter is deprecated")

def tensorflow():
    """Full TensorFlow, about a minute to load on the board: only for the model conversions (first start)."""
    import tensorflow
    return tensorflow

def tflite_interpreter(**kwargs):
    """TFLite interpreter of the light LiteRT package (loads in seconds), or else of TensorFlow."""
    try:
        from ai_edge_litert.interpreter import Interpreter
    except ImportError:
        Interpreter = tensorflow().lite.Interpreter
    interpreter = Interpreter(**kwargs)
    interpreter.allocate_tensors()
    return interpreter

class VittaTF:
    def __init__(self, verbose=False):
        # verbose: print the model, tensor and score details (debug)
        self.verbose = verbose
        # TFLite interpreter of each model, created on its first prediction
        self.interpreters = {}
        self.current_model_ID = None
        # Name of the class found by the last prediction (from the model metadata labels)
        self.current_label = None
        # Sensor models: sliding window of the readings and last predictions, like the AI tool preview
        self.sensor_buffer = None
        self.sensor_next_time = 0
        self.sensor_predictions = []

    def load_vittascience_model(self, model_url):
        parsed = urlparse(model_url)
        self.current_model_ID = parse_qs(parsed.query).get("link", [None])[0] or (re.search(r"/ia/model/([a-fA-F0-9]{13})", parsed.path) or [None, None])[1]
        target_path = Path("models") / self.current_model_ID
        def download_model_file (filename):
            download_file(f"{model_url}/{filename}", target_path / filename, filename)
        download_model_file("metadata.json")
        download_model_file("model.json")
        download_model_file("model.weights.bin")
        
        t0 = datetime.now()
        
        self.convert_tfjs_model_to_tflite(self.current_model_ID)
        
        t1 = datetime.now()
        self.debug(f"Durée de la conversion totale: {(t1-t0).total_seconds()} s")

    def load_local_model(self):
        """Model trained in the Vittascience AI tool of the browser, pushed by the uploader in python/local_model/."""
        self.current_model_ID = "local"
        source_path = Path(__file__).resolve().parent / "local_model"
        target_path = Path("models") / self.current_model_ID
        target_path.mkdir(parents=True, exist_ok=True)
        for filename in ("metadata.json", "model.json", "model.weights.bin"):
            shutil.copyfile(source_path / filename, target_path / filename)

        t0 = datetime.now()

        self.convert_tfjs_model_to_tflite(self.current_model_ID)

        t1 = datetime.now()
        self.debug(f"Durée de la conversion totale: {(t1-t0).total_seconds()} s")

    def load_posture_model(self, model_url):
        """Posture model trained in the Vittascience AI tool and saved in the cloud."""
        self.load_cloud_classifier(model_url)
        prepare_posenet()

    def load_hand_model(self, model_url):
        """Hand model trained in the Vittascience AI tool and saved in the cloud."""
        self.load_cloud_classifier(model_url)
        prepare_hand_landmarker()

    def load_sound_model(self, model_url):
        """Sound model trained in the Vittascience AI tool and saved in the cloud (speech-commands model, spectrogram input)."""
        self.load_cloud_classifier(model_url)

    def load_cloud_classifier(self, model_url):
        """Classifier of a model saved in the cloud by the Vittascience AI tool (TensorFlow.js layers model)."""
        parsed = urlparse(model_url)
        self.current_model_ID = parse_qs(parsed.query).get("link", [None])[0] or (re.search(r"/ia/model/([a-fA-F0-9]{13})", parsed.path) or [None, None])[1]
        target_path = Path("models") / self.current_model_ID
        base_url = model_url.rstrip("/")
        download_file(f"{base_url}/metadata.json", target_path / "metadata.json", "metadata.json")
        download_file(f"{base_url}/model.json", target_path / "model.json", "model.json")
        # The weights file name is given by model.json: stored as model.weights.bin, like the image models
        model_json = json.loads((target_path / "model.json").read_text(encoding="utf-8"))
        manifest = model_json["weightsManifest"]
        paths = [path for group in manifest for path in group["paths"]]
        if paths != ["model.weights.bin"]:
            for path in paths:
                download_file(f"{base_url}/{path}", target_path / "weights" / path, path)
            weights = b"".join((target_path / "weights" / path).read_bytes() for path in paths)
            (target_path / "model.weights.bin").write_bytes(weights)
            model_json["weightsManifest"] = [{"paths": ["model.weights.bin"], "weights": [w for group in manifest for w in group["weights"]]}]
            (target_path / "model.json").write_text(json.dumps(model_json), encoding="utf-8")
        else:
            download_file(f"{base_url}/model.weights.bin", target_path / "model.weights.bin", "model.weights.bin")
        self.convert_tfjs_model_to_tflite(self.current_model_ID)

    def load_local_posture_model(self):
        """Posture model trained in the Vittascience AI tool of the browser, pushed by the uploader in python/local_posture_model/."""
        self.load_local_classifier("local_posture_model", "local_posture")
        prepare_posenet()

    def load_local_hand_model(self):
        """Hand model trained in the Vittascience AI tool of the browser, pushed by the uploader in python/local_hand_model/."""
        self.load_local_classifier("local_hand_model", "local_hand")
        prepare_hand_landmarker()

    def load_local_sound_model(self):
        """Sound model trained in the Vittascience AI tool of the browser, pushed by the uploader in python/local_sound_model/."""
        self.load_local_classifier("local_sound_model", "local_sound")

    def load_sensor_model(self, model_url):
        """Sensor model trained in the Vittascience AI tool and saved in the cloud (features of A0/A1 readings)."""
        self.load_cloud_classifier(model_url)

    def load_local_sensor_model(self):
        """Sensor model trained in the Vittascience AI tool of the browser, pushed by the uploader in python/local_sensor_model/."""
        self.load_local_classifier("local_sensor_model", "local_sensor")

    def load_local_classifier(self, folder, model_id):
        """Classifier of a model of this browser, pushed by the uploader in python/<folder>/."""
        self.current_model_ID = model_id
        source_path = Path(__file__).resolve().parent / folder
        target_path = Path("models") / self.current_model_ID
        target_path.mkdir(parents=True, exist_ok=True)
        for filename in ("metadata.json", "model.json", "model.weights.bin"):
            shutil.copyfile(source_path / filename, target_path / filename)
        self.convert_tfjs_model_to_tflite(self.current_model_ID)

    def predict_posture_on_image(self, model_id, image, mirror=True):
        """Posture of the image: PoseNet keypoint maps, then the classifier of the model (like tmPose).
        mirror: the AI tool trains on the mirrored webcam image, so the camera images are mirrored the same way."""
        features = self.get_interpreter(POSENET_ID)
        x = posenet_input(webcam_square(image, mirror))
        features.set_tensor(features.get_input_details()[0]["index"], x)
        features.invoke()
        posenet_output = features.get_tensor(features.get_output_details()[0]["index"])
        return self.classify(model_id, posenet_output.astype(np.float32))

    def predict_hands_on_image(self, model_id, image, mirror=False):
        """Hand gesture of the image: hand keypoints (3D, in meters) of the MediaPipe hand models, then the classifier.
        Like the AI tool: right hand then left hand (21 x, y, z points each, zeros if missing), 126 values.
        mirror: the camera image as is matches the AI tool hand models (mirrored, "thumb up" and "thumb down" were
        swapped on the board), unlike the posture models."""
        image = image.convert("RGB")
        if mirror:
            image = image.transpose(Image.FLIP_LEFT_RIGHT)
        best = {}
        for side, score, world in detect_hands(self, image):
            if side not in best or score > best[side][0]:
                best[side] = (score, [v for point in world for v in point])
        if not best:
            # No hand: no class, like the AI tool (all probabilities at 0)
            output = np.zeros(len(self.extract_labels(model_id)), np.float32)
            self.current_label = ""
            return (-1, 0.0, output)
        x = best.get("Right", (0, [0.0] * 63))[1] + best.get("Left", (0, [0.0] * 63))[1]
        return self.classify(model_id, np.array([x], np.float32))

    def predict_on_sound(self, model_id, samples, rate=44100):
        """Sound class of the last second of the samples (mono, -1 to 1): spectrogram like the AI tool, then the model."""
        return self.classify(model_id, sound_spectrogram(samples, rate))

    def sensor_settings(self, model_id):
        """Settings of the AI tool for the model: strategy (sensor name a0, a1 or a0/a1, frequency), window (number of
        samples) and features (names, in order)."""
        metadata = json.loads((Path("models") / model_id / "metadata.json").read_text(encoding="utf-8"))
        settings = metadata["settings"]
        strategy = settings["strategy"]
        window = settings.get("window", {}).get("samples")
        if not window:
            # Models saved before formatVersion 2: 50 is the AI tool default even when its sensor window differs
            # (only set if the user changes the duration), then the window of the sensor strategy is the one used
            window = metadata.get("userMetaData", {}).get("timeWindow")
            if not window or (window == 50 and strategy.get("frequency") != 50):
                window = strategy.get("timeWindow", 20)
        return strategy, int(window), settings.get("features")

    def read_sensors(self, model_id):
        """Readings of the model sensor (A0, A1 or both) at its frequency (20 per second), given by the sketch through
        the Bridge (vitta_read_analog, added by the interface). Like the AI tool preview: the window of the model is
        read once, then each call reads 2 * window / 10 + 1 new readings and gives the last window (sliding window).
        The full window is read again when the program did something else for longer than a window."""
        from arduino.app_utils import Bridge
        strategy, count, _ = self.sensor_settings(model_id)
        pins = {"a0": [0], "a1": [1]}.get(strategy["name"], [0, 1])
        period = 1 / strategy.get("frequency", 20)
        now = time.monotonic()
        if self.sensor_buffer is None or now - self.sensor_next_time > count * period:
            self.sensor_buffer = []
            self.sensor_predictions = []
            self.sensor_next_time = now
            readings = count
        else:
            readings = int(2 * count / 10) + 1
        for _ in range(readings):
            wait = self.sensor_next_time - time.monotonic()
            if wait > 0:
                time.sleep(wait)
            elif -wait > period:
                # Late (prediction time, program): go on from now, readings too close would change the features
                self.sensor_next_time = time.monotonic()
            self.sensor_buffer.append([Bridge.call("vitta_read_analog", pin) for pin in pins])
            self.sensor_next_time += period
        self.sensor_buffer = self.sensor_buffer[-count:]
        return list(self.sensor_buffer)

    def predict_on_sensors(self, model_id, values):
        """Class of the sensor readings (list of samples, one value per axis): features like the AI tool, the model,
        then like the AI tool preview the average of the last 3 predictions, and "Incertain" under 60 %."""
        strategy, _, features = self.sensor_settings(model_id)
        _, _, output = self.classify(model_id, np.array([sensor_features(values, strategy.get("name"), features)], np.float32))
        self.sensor_predictions = (self.sensor_predictions + [output])[-3:]
        output = np.mean(self.sensor_predictions, axis=0)
        best_index = int(np.argmax(output))
        best_score = float(output[best_index])
        labels = self.extract_labels(model_id)
        self.current_label = (str(labels[best_index]) if best_index < len(labels) else f"Classe {best_index}") if best_score >= 0.6 else "Incertain"
        return (best_index, best_score, output)

    def predict_on_image(self, model_id, image, image_label = "Aucune infos de l'image"):
        interpreter = self.get_interpreter(model_id)
        x = self.preprocess_image(image, interpreter.get_input_details())
        self.debug(f"Image : {image_label}")
        return self.classify(model_id, x)

    def get_interpreter(self, model_id):
        interpreter = self.interpreters.get(model_id)
        if interpreter is None:
            interpreter = tflite_interpreter(model_path=str(Path("models") / model_id / "model.tflite"))
            self.interpreters[model_id] = interpreter
        return interpreter

    def classify(self, model_id, x):
        """Run the classifier of the model on its prepared input x, keep the class found in current_label."""
        labels = self.extract_labels(model_id)

        self.debug("========== metadata ==========")
        self.debug(f"Labels : {labels}")

        t0 = datetime.now()
        interpreter = self.get_interpreter(model_id)

        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()

        self.debug("\n========== modèle TFLite ==========")
        self.debug(f"Input details : {input_details}")
        self.debug(f"Output details : {output_details}")

        self.debug("\n========== prédiction ==========")
        self.debug(f"Tensor input : {x.shape} / {x.dtype}")

        interpreter.set_tensor(input_details[0]["index"], x)
        interpreter.invoke()

        output = interpreter.get_tensor(output_details[0]["index"])
        output = dequantize_output(output, output_details)
        
        t1 = datetime.now()
        
        self.debug(f"Durée de l'inférence: {(t1-t0).total_seconds()} s")

        if output.ndim > 1:
            output = output[0]

        best_index = int(np.argmax(output))
        best_score = float(output[best_index])

        best_label = str(labels[best_index]) if isinstance(labels, list) and best_index < len(labels) else f"Classe {best_index}"

        self.debug(f"Résultat : {best_label}")
        self.debug(f"Score : {best_score:.4f}")

        self.debug("\nScores détaillés :")
        for i, score in enumerate(output):
            label = labels[i] if i < len(labels) else f"Classe {i}"
            self.debug(f"- {label}: {float(score):.4f}")

        self.current_label = best_label
        return (best_index, best_score, output)

    def debug(self, message):
        if self.verbose:
            print(message)

    def predict_on_image_url(self, model_id, image_url):
        filename = Path(urlparse(image_url).path).name
        download_file(image_url , Path(filename), f"Image en cloud - {filename}")
        return self.predict_on_image(model_id, Image.open(filename), Path(filename))

    def extract_labels(self, model_id):
        with open(Path("models") / model_id / "metadata.json", "r", encoding="utf-8") as f:
            metadata = json.load(f)

            # wordLabels: sound models (speech-commands)
            labels = metadata.get("labels") or metadata.get("wordLabels")
            if isinstance(labels, list):
                return labels

        return []
    
    def preprocess_image(self, image, input_details):
        input_shape = input_details[0]["shape"]
        input_dtype = input_details[0]["dtype"]

        self.debug(f"[input] shape : {input_shape}")
        self.debug(f"[input] dtype : {input_dtype}")

        # Format classique image : [1, height, width, channels]
        height = int(input_shape[1])
        width = int(input_shape[2])
        channels = int(input_shape[3])

        if channels == 1:
            image = image.convert("L")
        else:
            image = image.convert("RGB")

        image = image.resize((width, height))

        x = np.asarray(image)

        if channels == 1:
            x = np.expand_dims(x, axis=-1)

        if input_dtype == np.float32:
            x = x.astype(np.float32)

            # Même prétraitement que ton script TFJS précédent :
            # pixels [0, 255] -> [-1, 1]
            x = (x / 127.5) - 1.0
        else:
            x = x.astype(input_dtype)

        x = np.expand_dims(x, axis=0)

        return x
    
    def get_tfjs_source_signature(self, model_id):
        model_json_path = Path("models") / model_id / "model.json"
        weights_path = Path("models") / model_id / "model.weights.bin"

        if not model_json_path.exists() or not weights_path.exists():
            return None

        # A retrained model keeps the same file sizes: compare the contents too
        return {
            "model_json_size": model_json_path.stat().st_size,
            "model_weights_size": weights_path.stat().st_size,
            "model_sha256": hashlib.sha256(model_json_path.read_bytes() + weights_path.read_bytes()).hexdigest(),
        }
    
    def run_tensorflowjs_converter(self, args):
        wrapper_code = r"""
import os
import sys
import types
import numpy as np

os.environ["TF_USE_LEGACY_KERAS"] = "1"

np.__dict__.setdefault("object", object)
np.__dict__.setdefault("bool", bool)
np.__dict__.setdefault("int", int)
np.__dict__.setdefault("float", float)
np.__dict__.setdefault("complex", complex)

tensorflow_hub_stub = types.ModuleType("tensorflow_hub")
tensorflow_hub_estimator_stub = types.ModuleType("tensorflow_hub.estimator")

class _DummyKerasLayer:
    def __init__(self, *args, **kwargs):
        raise RuntimeError("tensorflow_hub.KerasLayer is not available in this environment")

class _DummyLatestModuleExporter:
    def __init__(self, *args, **kwargs):
        raise RuntimeError("tensorflow_hub.LatestModuleExporter is not available in this environment")

tensorflow_hub_stub.KerasLayer = _DummyKerasLayer
tensorflow_hub_stub.LatestModuleExporter = _DummyLatestModuleExporter
tensorflow_hub_estimator_stub.LatestModuleExporter = _DummyLatestModuleExporter

sys.modules["tensorflow_hub"] = tensorflow_hub_stub
sys.modules["tensorflow_hub.estimator"] = tensorflow_hub_estimator_stub

try:
    import tf_keras
except Exception as e:
    raise RuntimeError("Le paquet tf-keras est requis pour convertir ce modèle TFJS ancien. Installe-le avec: python3 -m pip install --break-system-packages tf-keras") from e

from tensorflowjs.converters.converter import pip_main

sys.argv = ["tensorflowjs_converter"] + sys.argv[1:]
pip_main()
    """

        cmd = [
            sys.executable,
            "-c",
            wrapper_code,
        ] + args

        print("[convert] Commande tensorflowjs_converter via legacy Keras")
        subprocess.run(cmd, check=True)
        
    def convert_tfjs_model_to_tflite(self, model_id):
        model_dir = Path("models") / model_id
        model_json_path = model_dir / "model.json"
        keras_model_path = model_dir / "model.h5"
        tflite_model_path = model_dir / "model.tflite"
        signature_path = model_dir / "model.tflite.signature.json"

        current_signature = self.get_tfjs_source_signature(model_id)

        if tflite_model_path.exists() and tflite_model_path.stat().st_size > 0 and signature_path.exists():
            try:
                saved_signature = json.loads(signature_path.read_text(encoding="utf-8"))

                if saved_signature == current_signature:
                    self.debug(f"[convert] TFLite déjà présent et à jour : {tflite_model_path}")
                    return tflite_model_path

                print("[convert] TFLite présent mais modèle source modifié, reconversion...")
            except Exception as e:
                print(f"[convert] Signature invalide, reconversion... ({e})")

        if not model_json_path.exists():
            raise FileNotFoundError(f"Fichier introuvable : {model_json_path}")

        print("[convert] Conversion du modèle d'IA pour la carte (une seule fois, peut prendre 1 à 2 minutes)...")
        print("[convert] Conversion TFJS -> Keras H5...")
        
        t0 = datetime.now()

        self.run_tensorflowjs_converter([
            "--input_format=tfjs_layers_model",
            "--output_format=keras",
            str(model_json_path),
            str(keras_model_path)
        ])
        
        t1 = datetime.now()
        print(f"Durée de la conversion tfjs -> Keras H5: {(t1-t0).total_seconds()} s")

        print("[convert] Conversion Keras H5 -> TFLite...")
        tf = tensorflow()
        
        t0 = datetime.now()

        try:
            import tf_keras
            model = tf_keras.models.load_model(keras_model_path, compile=False)
        except Exception:
            model = tf.keras.models.load_model(keras_model_path, compile=False)

        converter = tf.lite.TFLiteConverter.from_keras_model(model)
        tflite_model = converter.convert()

        tflite_model_path.write_bytes(tflite_model)
        
        t1 = datetime.now()
        print(f"Durée de la conversion Keras H5 -> TFLite: {(t1-t0).total_seconds()} s")

        signature_path.write_text(
            json.dumps(current_signature, indent=2),
            encoding="utf-8"
        )

        print(f"[convert] OK : {tflite_model_path} ({tflite_model_path.stat().st_size / 1024:.1f} Ko)")

        return tflite_model_path

# Features of the sensor models of the AI tool (AIEdgeFilterData.js), with its roundings: for each filter, the value
# of each axis
def js_fixed3(x):
    """Number(x.toFixed(3)) of JavaScript."""
    return float(Decimal(float(x)).quantize(Decimal("0.001"), rounding=ROUND_HALF_UP))

def edge_mean(data):
    return js_fixed3(sum(data) / len(data))

def edge_std(data):
    mean = edge_mean(data)
    return math.sqrt(sum((n - mean) ** 2 for n in data) / (len(data) - 1))

def edge_skewness(data):
    n = len(data)
    if n < 2:
        return 0
    mean = sum(data) / n
    std = math.sqrt(sum((x - mean) ** 2 for x in data) / n)
    if std == 0:
        return 0
    return sum(((x - mean) / std) ** 3 for x in data) / n

def edge_peaks(y, lag=5, threshold=3.5, influence=0.3, min_peak_amplitude=0.5):
    filtered = list(y)
    avg = [0.0] * len(y)
    std = [0.0] * len(y)
    min_amplitude = max(min_peak_amplitude, 0.2 * (max(y) - min(y)))
    avg[lag - 1] = edge_mean(y[:lag])
    std[lag - 1] = edge_std(y[:lag])
    peaks = 0
    for i in range(lag, len(y)):
        deviation = y[i] - avg[i - 1]
        if abs(deviation) > threshold * max(std[i - 1], 0.02) and abs(deviation) > min_amplitude:
            peaks += 1
        filtered[i] = influence * y[i] + (1 - influence) * filtered[i - 1]
        avg[i] = edge_mean(filtered[i - lag:i])
        std[i] = edge_std(filtered[i - lag:i])
    return peaks

def edge_regularity(data):
    diffs = [abs(data[i] - data[i - 1]) for i in range(1, len(data))]
    mean = sum(diffs) / len(diffs)
    variance = sum((d - mean) ** 2 for d in diffs) / len(diffs)
    return 0 if variance == 0 else math.sqrt(variance) / mean

def edge_zero_crossing_rate(data):
    count = sum(1 for i in range(1, len(data)) if (data[i] >= 0) != (data[i - 1] >= 0))
    return count / (len(data) - 1)

EDGE_FEATURES = {
    "max": lambda d: js_fixed3(max(d)),
    "mean": edge_mean,
    "min": lambda d: js_fixed3(min(d)),
    "std": edge_std,
    "skewness": edge_skewness,
    "peaks": edge_peaks,
    "rootMeanSquare": lambda d: math.sqrt(sum(x * x for x in d) / len(d)),
    "regularity": edge_regularity,
    "zeroCrossingRate": edge_zero_crossing_rate,
}

def sensor_features(values, sensor=None, names=None):
    """Model input of the readings (one [value per axis] per sample), in the AI tool order: for each feature (names
    saved with the model, else the AI tool ones for this sensor), its value on each axis."""
    if names is None:
        names = ["max", "mean", "min", "std", "skewness", "peaks", "rootMeanSquare",
                 "zeroCrossingRate" if sensor == "accelerometer" else "regularity"]
    unknown = [name for name in names if name not in EDGE_FEATURES]
    if unknown:
        raise ValueError(f"Caractéristiques du modèle inconnues sur la carte : {unknown}. Mets à jour la bibliothèque vitta_tf.")
    axes = [list(map(float, axis)) for axis in zip(*values)]
    return [float(EDGE_FEATURES[name](axis)) for name in names for axis in axes]

# Spectrogram of the sound models of the AI tool (speech-commands BROWSER_FFT): Web Audio analyser of 2048 samples
# (Blackman window, dB) every 1024 samples at 44.1 kHz, 43 frames of the 232 lowest frequencies, normalized
SOUND_RATE = 44100
SOUND_STEP = 1024
SOUND_FRAMES = 43
SOUND_BINS = 232
SOUND_SAMPLES = SOUND_STEP * (SOUND_FRAMES + 1)

def sound_spectrogram(samples, rate=SOUND_RATE):
    """Model input (1, 43, 232, 1) of the last second of the samples."""
    samples = np.asarray(samples, np.float64).ravel()
    if rate != SOUND_RATE:
        # ponytail: linear resampling, enough for a classification
        times = np.arange(len(samples) * SOUND_RATE // rate) * rate / SOUND_RATE
        samples = np.interp(times, np.arange(len(samples)), samples)
    samples = np.concatenate([np.zeros(max(0, SOUND_SAMPLES - len(samples))), samples])[-SOUND_SAMPLES:]
    size = 2 * SOUND_STEP
    n = np.arange(size)
    window = 0.42 - 0.5 * np.cos(2 * np.pi * n / size) + 0.08 * np.cos(4 * np.pi * n / size)
    frames = np.stack([samples[i * SOUND_STEP:i * SOUND_STEP + size] for i in range(SOUND_FRAMES)]) * window
    magnitude = np.abs(np.fft.rfft(frames, axis=1))[:, :SOUND_BINS] / size
    with np.errstate(divide="ignore"):
        db = 20 * np.log10(magnitude)
    # Silence (-Infinity) is 0 in the AI tool
    db[np.isinf(db)] = 0
    x = (db - db.mean()) / (db.std() + 1e-7)
    return x.reshape(1, SOUND_FRAMES, SOUND_BINS, 1).astype(np.float32)

# PoseNet of tmPose (Teachable Machine pose library used by the Vittascience AI tool): MobileNetV1 0.75, stride 16, 257 px
POSENET_ID = "posenet"
POSENET_URL = "https://storage.googleapis.com/tfjs-models/savedmodel/posenet/mobilenet/float/075/"
POSENET_JSON = "model-stride16.json"
POSENET_RESOLUTION = 257

def webcam_square(image, mirror=True, size=224):
    """Image as taken by the webcam of the AI tool (tmPose.Webcam(224, 224, flip)): centered square, 224 px, mirrored."""
    image = image.convert("RGB")
    side = min(image.size)
    left = (image.width - side) // 2
    top = (image.height - side) // 2
    image = image.crop((left, top, left + side, top + side)).resize((size, size), Image.BILINEAR)
    if mirror:
        image = image.transpose(Image.FLIP_LEFT_RIGHT)
    return np.asarray(image)

def tfjs_resize_bilinear(pixels, height, width):
    """tf.image.resizeBilinear of TensorFlow.js (alignCorners and halfPixelCenters false), on a [h, w, c] array."""
    in_h, in_w = pixels.shape[:2]
    def axis(size_in, size_out):
        source = np.arange(size_out) * (size_in / size_out)
        low = np.floor(source).astype(int)
        high = np.minimum(low + 1, size_in - 1)
        return low, high, (source - low).astype(np.float32)
    y0, y1, dy = axis(in_h, height)
    x0, x1, dx = axis(in_w, width)
    pixels = pixels.astype(np.float32)
    top = pixels[y0][:, x0] + (pixels[y0][:, x1] - pixels[y0][:, x0]) * dx[None, :, None]
    bottom = pixels[y1][:, x0] + (pixels[y1][:, x1] - pixels[y1][:, x0]) * dx[None, :, None]
    return top + (bottom - top) * dy[:, None, None]

def posenet_input(pixels, resolution=POSENET_RESOLUTION):
    """padAndResizeTo of tmPose: zero padding to a square, then resized to the PoseNet resolution: [1, 257, 257, 3]."""
    height, width = pixels.shape[:2]
    js_round = lambda value: math.floor(value + 0.5)
    if width / height < 1:
        top = bottom = 0
        left = right = js_round(0.5 * (height - width))
    else:
        top = bottom = js_round(0.5 * (width - height))
        left = right = 0
    pixels = np.pad(pixels, ((top, bottom), (left, right), (0, 0)))
    return tfjs_resize_bilinear(pixels, resolution, resolution)[None].astype(np.float32)

def build_posenet_tflite(source_dir, tflite_path):
    """TFLite model computing tmPose's posenetOutput (sigmoid(heatmaps) and offsets, flattened) from the 257 px pixels.
    The TensorFlow.js graph only uses Conv2D, DepthwiseConv2dNative, BiasAdd and Relu6: it is rebuilt with TensorFlow."""
    tf = tensorflow()
    model = json.loads((source_dir / POSENET_JSON).read_text(encoding="utf-8"))
    weights = {}
    for group in model["weightsManifest"]:
        data = b"".join((source_dir / path).read_bytes() for path in group["paths"])
        offset = 0
        for spec in group["weights"]:
            if spec["dtype"] != "float32":
                raise ValueError(f"Poids PoseNet non pris en charge : {spec['dtype']}")
            count = int(np.prod(spec["shape"])) if spec["shape"] else 1
            weights[spec["name"]] = np.frombuffer(data, np.float32, count, offset).reshape(spec["shape"])
            offset += count * 4
    nodes = {node["name"]: node for node in model["modelTopology"]["node"]}
    input_name = next(name for name, node in nodes.items() if node["op"] == "Placeholder")

    def ints(node, key):
        return [int(v) for v in node["attr"][key]["list"]["i"]]

    def padding(node):
        return base64.b64decode(node["attr"]["padding"]["s"]).decode()

    # No AutoGraph: plain Python loop on the graph nodes, without control flow
    @tf.function(input_signature=[tf.TensorSpec([1, POSENET_RESOLUTION, POSENET_RESOLUTION, 3], tf.float32)], autograph=False)
    def posenet(pixels):
        # MobileNet preprocessing of tmPose
        values = {input_name: pixels / 127.5 - 1.0}
        pending = [node for name, node in nodes.items() if name != input_name]
        # Compute each node once its inputs are known (the graph node list is not always in order)
        while pending:
            waiting = []
            for node in pending:
                inputs = node.get("input", [])
                if any(name not in values for name in inputs):
                    waiting.append(node)
                    continue
                op = node["op"]
                args = [values[name] for name in inputs]
                if op == "Const":
                    out = tf.constant(weights[node["name"]])
                elif op == "Conv2D":
                    out = tf.nn.conv2d(args[0], args[1], strides=ints(node, "strides"),
                                       padding=padding(node), dilations=ints(node, "dilations"))
                elif op == "DepthwiseConv2dNative":
                    out = tf.nn.depthwise_conv2d(args[0], args[1], strides=ints(node, "strides"),
                                                 padding=padding(node), dilations=ints(node, "dilations")[1:3])
                elif op == "BiasAdd":
                    out = tf.nn.bias_add(args[0], args[1])
                elif op == "Relu6":
                    out = tf.nn.relu6(args[0])
                else:
                    raise ValueError(f"Opération PoseNet non prise en charge : {op}")
                values[node["name"]] = out
            if len(waiting) == len(pending):
                raise ValueError("Graphe PoseNet incomplet")
            pending = waiting

        value = values.__getitem__
        heatmap_scores = tf.sigmoid(value("MobilenetV1/heatmap_2/BiasAdd"))
        offsets = value("MobilenetV1/offset_2/BiasAdd")
        return tf.reshape(tf.concat([heatmap_scores, offsets], axis=3), [1, -1])

    converter = tf.lite.TFLiteConverter.from_concrete_functions([posenet.get_concrete_function()], posenet)
    tflite_path.parent.mkdir(parents=True, exist_ok=True)
    tflite_path.write_bytes(converter.convert())

def prepare_posenet():
    """models/posenet/model.tflite, built once from the PoseNet files pushed by the interface (python/posenet/)
    or else downloaded from Google."""
    tflite_path = Path("models") / POSENET_ID / "model.tflite"
    if tflite_path.exists() and tflite_path.stat().st_size > 0:
        return tflite_path
    source_dir = Path(__file__).resolve().parent / "posenet"
    if not (source_dir / POSENET_JSON).exists():
        source_dir = Path("models") / POSENET_ID / "tfjs"
        download_file(POSENET_URL + POSENET_JSON, source_dir / POSENET_JSON, "PoseNet")
        for group in json.loads((source_dir / POSENET_JSON).read_text(encoding="utf-8"))["weightsManifest"]:
            for path in group["paths"]:
                download_file(POSENET_URL + path, source_dir / path, f"PoseNet {path}")
    print("[convert] Préparation de PoseNet (une seule fois, peut prendre 1 à 2 minutes)...")
    build_posenet_tflite(source_dir, tflite_path)
    print(f"[convert] OK : {tflite_path} ({tflite_path.stat().st_size / 1024:.1f} Ko)")
    return tflite_path

# MediaPipe hand landmarker (palm detection + hand landmarks), for the hand models of the AI tool. Its two TFLite models
# run with TensorFlow: the mediapipe package needs system libraries (libGL) missing in the app container.
HAND_LANDMARKER_URL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task"
PALM_SIZE = 192
HAND_SIZE = 224

def prepare_hand_landmarker():
    """hand_landmarker.task pushed by the interface (python/mediapipe/), or else downloaded from Google."""
    task_path = Path(__file__).resolve().parent / "mediapipe" / "hand_landmarker.task"
    if task_path.exists() and task_path.stat().st_size > 0:
        return task_path
    task_path = Path("models") / "hands" / "hand_landmarker.task"
    download_file(HAND_LANDMARKER_URL, task_path, "MediaPipe hand landmarker")
    return task_path

def hand_interpreters(vittamodel):
    """Palm detector and hand landmark TFLite interpreters, taken from the .task file (a zip) on first use."""
    if "hand_detector" not in vittamodel.interpreters:
        import zipfile
        print("[mains] Chargement des modèles de mains (quelques secondes)...")
        with zipfile.ZipFile(prepare_hand_landmarker()) as task:
            for name in ("hand_detector", "hand_landmarks_detector"):
                vittamodel.interpreters[name] = tflite_interpreter(model_content=task.read(name + ".tflite"))
    return vittamodel.interpreters["hand_detector"], vittamodel.interpreters["hand_landmarks_detector"]

def palm_anchors():
    """SSD anchors of the palm detector (192 px): 2 per cell of the 24x24 grid, 6 per cell of the 12x12 grid."""
    anchors = []
    for stride, per_cell in ((8, 2), (16, 6)):
        cells = PALM_SIZE // stride
        for y in range(cells):
            for x in range(cells):
                anchors += [((x + 0.5) / cells, (y + 0.5) / cells)] * per_cell
    return np.array(anchors, np.float32)

PALM_ANCHORS = palm_anchors()

def run_model(interpreter, x):
    interpreter.set_tensor(interpreter.get_input_details()[0]["index"], x)
    interpreter.invoke()
    return {d["name"]: interpreter.get_tensor(d["index"])[0] for d in interpreter.get_output_details()}

def detect_palms(detector, image, max_hands=2, threshold=0.5, overlap=0.3):
    """Palms of the image: (score, box [cx, cy, w, h], keypoints [7, 2]) in normalized image coordinates."""
    width, height = image.size
    # Letterbox to a 192 px square, keeping the aspect ratio
    scale = PALM_SIZE / max(width, height)
    resized = image.resize((max(1, round(width * scale)), max(1, round(height * scale))), Image.BILINEAR)
    square = Image.new("RGB", (PALM_SIZE, PALM_SIZE))
    left, top = (PALM_SIZE - resized.width) // 2, (PALM_SIZE - resized.height) // 2
    square.paste(resized, (left, top))
    outputs = run_model(detector, (np.asarray(square, np.float32) / 255.0)[None])
    raw_boxes, raw_scores = outputs["Identity"], outputs["Identity_1"][:, 0]
    scores = 1 / (1 + np.exp(-np.clip(raw_scores, -100, 100)))
    palms = []
    for i in np.argsort(-scores):
        if scores[i] < threshold:
            break
        values = raw_boxes[i] / PALM_SIZE
        points = values[4:].reshape(7, 2) + PALM_ANCHORS[i]
        box = np.array([values[0] + PALM_ANCHORS[i][0], values[1] + PALM_ANCHORS[i][1], values[2], values[3]])
        palms.append((float(scores[i]), box, points))
    # Weighted non maximum suppression, like MediaPipe
    merged = []
    while palms and len(merged) < max_hands:
        score, box, points = palms[0]
        group = [p for p in palms if box_iou(box, p[1]) > overlap]
        palms = [p for p in palms if box_iou(box, p[1]) <= overlap]
        weights = np.array([p[0] for p in group])[:, None]
        merged.append((score, (np.array([p[1] for p in group]) * weights).sum(0) / weights.sum(),
                       (np.array([p[2] for p in group]) * weights[:, :, None]).sum(0) / weights.sum()))
    # Back from the letterbox to the image
    unscale = np.array([PALM_SIZE / resized.width, PALM_SIZE / resized.height])
    shift = np.array([left / PALM_SIZE, top / PALM_SIZE])
    return [(score, np.concatenate([(box[:2] - shift) * unscale, box[2:] * unscale]), (points - shift) * unscale)
            for score, box, points in merged]

def box_iou(a, b):
    ax0, ay0, ax1, ay1 = a[0] - a[2] / 2, a[1] - a[3] / 2, a[0] + a[2] / 2, a[1] + a[3] / 2
    bx0, by0, bx1, by1 = b[0] - b[2] / 2, b[1] - b[3] / 2, b[0] + b[2] / 2, b[1] + b[3] / 2
    inter = max(0, min(ax1, bx1) - max(ax0, bx0)) * max(0, min(ay1, by1) - max(ay0, by0))
    union = a[2] * a[3] + b[2] * b[3] - inter
    return inter / union if union > 0 else 0

def hand_region(box, points, width, height):
    """Rotated square around the hand (MediaPipe hand ROI): center, side (pixels) and rotation (radians)."""
    # Rotation: wrist (point 0) to middle finger base (point 2) points up
    x0, y0 = points[0] * (width, height)
    x2, y2 = points[2] * (width, height)
    rotation = np.pi / 2 - np.arctan2(-(y2 - y0), x2 - x0)
    rotation = rotation - 2 * np.pi * np.floor((rotation + np.pi) / (2 * np.pi))
    box_width, box_height = box[2] * width, box[3] * height
    # Shifted towards the fingers by half the box height, then a 2.6 times larger square
    center_x = box[0] * width + box_height * 0.5 * np.sin(rotation)
    center_y = box[1] * height - box_height * 0.5 * np.cos(rotation)
    return center_x, center_y, max(box_width, box_height) * 2.6, rotation

def detect_hands(vittamodel, image):
    """Hands of the image: (side "Right"/"Left", score, 21 world points [x, y, z] in meters)."""
    detector, landmarker = hand_interpreters(vittamodel)
    width, height = image.size
    hands = []
    for _, box, points in detect_palms(detector, image):
        center_x, center_y, side, rotation = hand_region(box, points, width, height)
        # Rotated crop of the hand region (affine transform from the 224 px crop to the image)
        cos, sin = np.cos(rotation), np.sin(rotation)
        step = side / HAND_SIZE
        crop = image.transform((HAND_SIZE, HAND_SIZE), Image.AFFINE, (
            step * cos, -step * sin, center_x - side / 2 * cos + side / 2 * sin,
            step * sin, step * cos, center_y - side / 2 * sin - side / 2 * cos), resample=Image.BILINEAR)
        outputs = run_model(landmarker, (np.asarray(crop, np.float32) / 255.0)[None])
        if float(outputs["Identity_1"][0]) < 0.5:
            continue
        right = float(outputs["Identity_2"][0])
        # World points are given in the crop orientation: back to the image orientation
        world = outputs["Identity_3"].reshape(21, 3).astype(float)
        world[:, 0], world[:, 1] = world[:, 0] * cos - world[:, 1] * sin, world[:, 0] * sin + world[:, 1] * cos
        hands.append(("Right", right, world.tolist()) if right >= 0.5 else ("Left", 1 - right, world.tolist()))
    return hands

def dequantize_output(output, output_details):
    output_dtype = output_details[0]["dtype"]

    if output_dtype == np.float32:
        return output.astype(np.float32)

    quantization = output_details[0].get("quantization", None)
    if not quantization:
        return output.astype(np.float32)

    scale, zero_point = quantization

    if scale == 0:
        return output.astype(np.float32)

    return (output.astype(np.float32) - zero_point) * scale
    
def download_file(url, output_path, label):
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    if output_path.exists() and output_path.stat().st_size > 0:
        print(f"[download] Déjà présent : {output_path}")
        return

    print(f"[download] Téléchargement de {label}...")
    print(f"[download] URL : {url}")

    headers = {
        "User-Agent": "Vittascience-ArduinoQ-Test/1.0",
        "Accept": "*/*",
    }

    response = requests.get(url, headers=headers, allow_redirects=True, timeout=60)
    response.raise_for_status()

    output_path.write_bytes(response.content)

    print(f"[download] OK : {output_path} ({output_path.stat().st_size / 1024:.1f} Ko)")