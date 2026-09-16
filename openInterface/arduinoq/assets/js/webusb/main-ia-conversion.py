# SPDX-FileCopyrightText: Copyright (C) ARDUINO SRL (http://www.arduino.cc)
# SPDX-License-Identifier: MPL-2.0

from pathlib import Path
from urllib.parse import urlparse, parse_qs
import json
import re
import requests
import tensorflow as tf
from PIL import Image
import numpy as np
from datetime import datetime
import subprocess
import sys


current_model_ID = None

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

def load_vittascience_model(model_url):
    global current_model_ID
    parsed = urlparse(model_url)
    current_model_ID = parse_qs(parsed.query).get("link", [None])[0] or (re.search(r"/ia/model/([a-fA-F0-9]{13})", parsed.path) or [None, None])[1]
    target_path = Path("models") / current_model_ID
    def download_model_file (filename):
        download_file(f"{model_url}/{filename}", target_path / filename, filename)
    download_model_file("metadata.json")
    download_model_file("model.json")
    download_model_file("model.weights.bin")
    
    t0 = datetime.now()
    
    convert_tfjs_model_to_tflite(current_model_ID)
    
    t1 = datetime.now()
    print(f"Durée de la conversion: {(t1-t0).total_seconds()} s")
    
    

def load_metadata(model_id):
    with open(Path("models") / model_id / "metadata.json", "r", encoding="utf-8") as f:
        return json.load(f)

def extract_labels(metadata):
    labels = metadata.get("labels")
    if isinstance(labels, list):
        return labels
    return []

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

def preprocess_image(image, input_details):
    input_shape = input_details[0]["shape"]
    input_dtype = input_details[0]["dtype"]

    print(f"[input] shape : {input_shape}")
    print(f"[input] dtype : {input_dtype}")

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
    
def get_tfjs_source_signature(model_dir):
    model_json_path = model_dir / "model.json"
    weights_path = model_dir / "model.weights.bin"

    if not model_json_path.exists() or not weights_path.exists():
        return None

    return {
        "model_json_size": model_json_path.stat().st_size,
        "model_weights_size": weights_path.stat().st_size,
    }
    
def run_tensorflowjs_converter(args):
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
    
def convert_tfjs_model_to_tflite(model_id):
    model_dir = Path("models") / model_id
    model_json_path = model_dir / "model.json"
    keras_model_path = model_dir / "model.h5"
    tflite_model_path = model_dir / "model.tflite"
    signature_path = model_dir / "model.tflite.signature.json"

    current_signature = get_tfjs_source_signature(model_dir)

    if tflite_model_path.exists() and tflite_model_path.stat().st_size > 0 and signature_path.exists():
        try:
            saved_signature = json.loads(signature_path.read_text(encoding="utf-8"))

            if saved_signature == current_signature:
                print(f"[convert] TFLite déjà présent et à jour : {tflite_model_path}")
                return tflite_model_path

            print("[convert] TFLite présent mais modèle source modifié, reconversion...")
        except Exception as e:
            print(f"[convert] Signature invalide, reconversion... ({e})")

    if not model_json_path.exists():
        raise FileNotFoundError(f"Fichier introuvable : {model_json_path}")

    print("[convert] Conversion TFJS -> Keras H5...")
    
    t0 = datetime.now()

    run_tensorflowjs_converter([
        "--input_format=tfjs_layers_model",
        "--output_format=keras",
        str(model_json_path),
        str(keras_model_path)
    ])
    
    t1 = datetime.now()
    print(f"Durée de la conversion tfjs -> Keras H5: {(t1-t0).total_seconds()} s")

    print("[convert] Conversion Keras H5 -> TFLite...")
    
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

def predict_on_image(model_id, image, image_label = "Aucune infos de l'image"):
    metadata = load_metadata(model_id)
    labels = extract_labels(metadata)

    print("========== metadata ==========")
    print(f"Labels : {labels}")

    t0 = datetime.now()
    interpreter = tf.lite.Interpreter(model_path=str(Path("models") / model_id / "model.tflite"))
    interpreter.allocate_tensors()

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    print("\n========== modèle TFLite ==========")
    print(f"Input details : {input_details}")
    print(f"Output details : {output_details}")

    x = preprocess_image(image, input_details)

    print("\n========== prédiction ==========")
    print(f"Image : {image_label}")
    print(f"Tensor input : {x.shape} / {x.dtype}")

    interpreter.set_tensor(input_details[0]["index"], x)
    interpreter.invoke()

    output = interpreter.get_tensor(output_details[0]["index"])
    output = dequantize_output(output, output_details)
    
    t1 = datetime.now()
    
    print(f"Durée de l'inférence: {(t1-t0).total_seconds()} s")

    if output.ndim > 1:
        output = output[0]

    best_index = int(np.argmax(output))
    best_score = float(output[best_index])

    best_label = labels[best_index] if best_index < len(labels) else f"Classe {best_index}"

    print(f"Résultat : {best_label}")
    print(f"Score : {best_score:.4f}")

    print("\nScores détaillés :")
    for i, score in enumerate(output):
        label = labels[i] if i < len(labels) else f"Classe {i}"
        print(f"- {label}: {float(score):.4f}")

    return (best_index, best_score, output)

def predict_on_image_url(model_id, image_url):
    filename = Path(urlparse(image_url).path).name
    download_file(image_url , Path(filename), f"Image en cloud - {filename}")
    return predict_on_image(model_id, Image.open(filename), Path(filename))

load_vittascience_model('https://fr.vittascience.com/ia/model/644237cc1072c/')
modelPredictionIndex, modelPredictionScore, modelPredictionOutput = predict_on_image_url(current_model_ID, 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg')