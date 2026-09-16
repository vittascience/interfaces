# SPDX-FileCopyrightText: Copyright (C) ARDUINO SRL (http://www.arduino.cc)
# SPDX-License-Identifier: MPL-2.0

import json
import sys
from pathlib import Path

import numpy as np
import requests
from PIL import Image
import tflite_runtime.interpreter as tflite

MODEL_ID = "644237cc1072c"
BASE_URL = f"https://fr.vittascience.com/ia/model/{MODEL_ID}"

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


def load_metadata(model_id):
    with open(Path("models") / model_id / "metadata.json", "r", encoding="utf-8") as f:
        return json.load(f)


def extract_labels(metadata):
    labels = metadata.get("labels")
    if isinstance(labels, list):
        return labels
    return []


# def load_interpreter(model_path):
#     try:
#         import tflite_runtime.interpreter as tflite
#         print("[tflite] Runtime : tflite-runtime")
#         interpreter = tflite.Interpreter(model_path=str(model_path))
#         return interpreter
#     except ImportError:
#         try:
#             import tensorflow as tf
#             print("[tflite] Runtime : tensorflow.lite")
#             interpreter = tf.lite.Interpreter(model_path=str(model_path))
#             return interpreter
#         except ImportError:
#             print("[erreur] Installe tflite-runtime ou tensorflow :")
#             print("python3 -m pip install tflite-runtime")
#             print("ou")
#             print("python3 -m pip install tensorflow")
#             raise


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


def predict(model_id, image, image_label = "Aucune infos de l'image"):
    metadata = load_metadata(model_id)
    labels = extract_labels(metadata)

    print("========== metadata ==========")
    print(f"Labels : {labels}")

    interpreter = tflite.Interpreter(model_path=str(Path("models") / model_id / "model.tflite"))
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


def main():
    print("======== Vittascience IA TFLite ========")
    print(f"MODEL_ID : {MODEL_ID}")

    try:
        download_file(f"{BASE_URL}/metadata.json", Path("models") / MODEL_ID / "metadata.json", "metadata.json")
        download_file(f"{BASE_URL}/model.tflite",  Path("models") / MODEL_ID / "model.tflite", "model.tflite")
        download_file("https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg", Path("Cat03.jpg"), "image de test")
        predict(MODEL_ID, Image.open(Path("Cat03.jpg")), Path("Cat03.jpg"))
    except Exception as e:
        print(f"\n[erreur] {type(e).__name__}: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()