# Vittascience AI on the UNIHIKER M10: image models of the Vittascience AI tool (Teachable Machine, TensorFlow.js
# layers model: MobileNetV2 then the trained classifier) run with NumPy only. TensorFlow takes 40 s to import on the
# board and its conversion to TFLite 13 min: the layers are computed here, the batch normalizations folded in the
# convolutions when the model is loaded.
import json
import os
import threading
import time

import numpy as np

UNCERTAIN = "Incertain"

# names of "from vitta_ai import *" (blocks of the interface)
__all__ = ["ImageModel", "Camera", "UNCERTAIN", "camera_image", "last_camera_image", "use_camera", "rotate_camera", "list_cameras", "image_from_url"]


def same_padding(size, kernel, stride):
    # padding "same" of TensorFlow: (before, after)
    out = -(-size // stride)
    total = max((out - 1) * stride + kernel - size, 0)
    return total // 2, total - total // 2


class Layer:
    def __init__(self, config, weights):
        self.config = config
        self.name = config.get("name")
        self.weights = weights


class ImageModel:
    """Image classifier of the Vittascience AI tool. source: "local" (model of the AI tool of the browser) or the link
    of a Vittascience model, the interface sends its files with the program (model, weights and metadata: labels)."""

    def __init__(self, source="local", model="image_model.json", weights="image_model.weights.bin", metadata="image_metadata.json"):
        if not os.path.exists(model):
            raise RuntimeError("Modèle d'images introuvable : entraînez un modèle dans l'outil IA de Vittascience, ou donnez son lien.")
        with open(model, "r", encoding="utf-8") as f:
            model_json = json.load(f)
        with open(metadata, "r", encoding="utf-8") as f:
            self.labels = json.load(f).get("labels", [])
        self.weights = self.read_weights(model_json, weights)
        topology = model_json["modelTopology"]
        topology = topology.get("model_config", topology)
        self.run = self.build(topology)
        self.size = 224
        self.probabilities = None
        # class with the best probability and this probability (0 to 1) of the last prediction
        self.class_predicted = None
        self.score = 0

    # Weights of the layers by name (layer/param), from the weights manifest of the model
    def read_weights(self, model_json, path):
        data = np.fromfile(path, dtype=np.uint8)
        weights, offset = {}, 0
        for group in model_json["weightsManifest"]:
            for spec in group["weights"]:
                count = int(np.prod(spec["shape"])) if spec["shape"] else 1
                if spec.get("dtype", "float32") != "float32":
                    raise ValueError("Type de poids non pris en charge : " + str(spec.get("dtype")))
                weights[spec["name"]] = np.frombuffer(data[offset:offset + count * 4].tobytes(), dtype=np.float32).reshape(spec["shape"])
                offset += count * 4
        return weights

    def layer_weights(self, name):
        prefix = name + "/"
        return {key[len(prefix):]: value for key, value in self.weights.items() if key.startswith(prefix)}

    # Function computing a layer, a Sequential or a functional model (graph of the inbound nodes)
    def build(self, spec):
        kind, config = spec["class_name"], spec["config"]
        if kind == "Sequential":
            layers = config["layers"] if isinstance(config, dict) else config
            steps = self.fold([self.build(layer) for layer in layers], layers)
            def sequential(x):
                for step in steps:
                    x = step(x)
                return x
            return sequential
        if kind in ("Model", "Functional"):
            return self.build_graph(config)
        return self.build_layer(kind, config)

    def build_graph(self, config):
        layers = {layer["config"]["name"]: layer for layer in config["layers"]}
        functions = {name: self.build(layer) for name, layer in layers.items()}
        inputs = {name: [node[0] for node in layer.get("inbound_nodes", [[]])[0]] if layer.get("inbound_nodes") else []
                  for name, layer in layers.items()}
        # batch normalization folded in the convolution before it when the convolution has no other output
        consumers = {}
        for name, sources in inputs.items():
            for source in sources:
                consumers.setdefault(source, []).append(name)
        for name, layer in layers.items():
            sources = inputs[name]
            if layer["class_name"] == "BatchNormalization" and len(sources) == 1 and len(consumers.get(sources[0], [])) == 1:
                conv = functions[sources[0]]
                if getattr(conv, "fold", None):
                    conv.fold(self.layer_weights(name), layer["config"])
                    functions[name] = lambda x: x
        input_name = config["input_layers"][0][0]
        output_name = config["output_layers"][0][0]
        order = []
        def visit(name):
            if name in order:
                return
            for source in inputs[name]:
                visit(source)
            order.append(name)
        visit(output_name)
        def graph(x):
            values = {}
            for name in order:
                if name == input_name:
                    values[name] = x
                elif len(inputs[name]) > 1:
                    values[name] = functions[name]([values[source] for source in inputs[name]])
                else:
                    values[name] = functions[name](values[inputs[name][0]])
            return values[output_name]
        return graph

    def fold(self, steps, layers):
        # batch normalization right after a convolution of a Sequential
        result = []
        for step, layer in zip(steps, layers):
            if layer["class_name"] == "BatchNormalization" and result and getattr(result[-1], "fold", None):
                result[-1].fold(self.layer_weights(layer["config"]["name"]), layer["config"])
                continue
            result.append(step)
        return result

    def build_layer(self, kind, config):
        weights = self.layer_weights(config.get("name", ""))
        if kind in ("InputLayer", "Dropout", "Flatten") and kind != "Flatten":
            return lambda x: x
        if kind == "Flatten":
            return lambda x: x.reshape(-1)
        if kind == "ZeroPadding2D":
            (top, bottom), (left, right) = config["padding"]
            return lambda x: np.pad(x, ((top, bottom), (left, right), (0, 0)))
        if kind in ("Conv2D", "DepthwiseConv2D"):
            return Convolution(kind, config, weights)
        if kind == "BatchNormalization":
            scale, shift = batch_norm(weights, config)
            return lambda x: x * scale + shift
        if kind == "ReLU":
            maximum = config.get("max_value")
            return (lambda x: np.clip(x, 0, maximum)) if maximum is not None else (lambda x: np.maximum(x, 0))
        if kind == "Add":
            return lambda xs: sum(xs[1:], xs[0])
        if kind == "GlobalAveragePooling2D":
            return lambda x: x.mean(axis=(0, 1))
        if kind == "Activation":
            return activation(config.get("activation"))
        if kind == "Dense":
            kernel, bias = weights["kernel"], weights.get("bias")
            act = activation(config.get("activation"))
            return lambda x: act(x @ kernel + (bias if bias is not None else 0))
        raise ValueError("Couche non prise en charge : " + kind)

    # Image (RGB array height x width x 3, 0-255) as the AI tool: square of the center, 224 x 224, x / 127 - 1
    def prepare(self, image):
        import cv2
        height, width = image.shape[:2]
        side = min(height, width)
        top, left = (height - side) // 2, (width - side) // 2
        square = image[top:top + side, left:left + side]
        square = cv2.resize(square, (self.size, self.size), interpolation=cv2.INTER_AREA if side > self.size else cv2.INTER_LINEAR)
        return square.astype(np.float32) / 127 - 1

    def predict(self, image):
        """Probabilities of the classes for an RGB image (array 0-255), the class found in class_predicted."""
        self.probabilities = self.run(self.prepare(image))
        best = int(np.argmax(self.probabilities))
        self.class_predicted = self.labels[best] if best < len(self.labels) else str(best)
        self.score = round(float(self.probabilities[best]), 4)
        return self.probabilities

    def predictions(self):
        # probability of each class of the last prediction
        return [] if self.probabilities is None else [round(float(p), 4) for p in self.probabilities]

    def detect_class(self, threshold=0.6):
        # the model hesitates (best probability under 60 %): no class, like the AI tool preview
        if self.probabilities is None or float(np.max(self.probabilities)) < threshold:
            return UNCERTAIN
        return self.class_predicted

    def confidence(self, label=None):
        if self.probabilities is None:
            return 0
        if label is None:
            return round(float(np.max(self.probabilities)) * 100, 1)
        return round(float(self.probabilities[self.labels.index(label)]) * 100, 1) if label in self.labels else 0


class Convolution:
    def __init__(self, kind, config, weights):
        self.depthwise = kind == "DepthwiseConv2D"
        self.kernel = weights["depthwise_kernel" if self.depthwise else "kernel"].astype(np.float32)
        self.bias = weights.get("bias")
        self.strides = config.get("strides", [1, 1])
        self.padding = config.get("padding", "valid")
        self.activation = activation(config.get("activation"))
        if self.depthwise:
            self.kernel = self.kernel[:, :, :, 0]

    def fold(self, weights, config):
        scale, shift = batch_norm(weights, config)
        self.kernel = self.kernel * scale
        self.bias = (self.bias * scale if self.bias is not None else 0) + shift

    def __call__(self, x):
        kh, kw = self.kernel.shape[:2]
        sh, sw = self.strides
        if self.padding == "same":
            x = np.pad(x, (same_padding(x.shape[0], kh, sh), same_padding(x.shape[1], kw, sw), (0, 0)))
        oh, ow = (x.shape[0] - kh) // sh + 1, (x.shape[1] - kw) // sw + 1
        if self.depthwise:
            out = np.zeros((oh, ow, x.shape[2]), dtype=np.float32)
            for i in range(kh):
                for j in range(kw):
                    out += x[i:i + sh * oh:sh, j:j + sw * ow:sw] * self.kernel[i, j]
        elif kh == 1 and kw == 1:
            out = x[::sh, ::sw].reshape(-1, x.shape[2]) @ self.kernel[0, 0]
            out = out.reshape(oh, ow, -1)
        else:
            s = x.strides
            patches = np.lib.stride_tricks.as_strided(x, (oh, ow, kh, kw, x.shape[2]), (s[0] * sh, s[1] * sw, s[0], s[1], s[2]))
            out = patches.reshape(oh * ow, -1) @ self.kernel.reshape(-1, self.kernel.shape[3])
            out = out.reshape(oh, ow, -1)
        if self.bias is not None:
            out = out + self.bias
        return self.activation(out)


def batch_norm(weights, config):
    epsilon = config.get("epsilon", 1e-3)
    scale = weights.get("gamma", 1) / np.sqrt(weights["moving_variance"] + epsilon)
    return scale.astype(np.float32), (weights.get("beta", 0) - weights["moving_mean"] * scale).astype(np.float32)


def activation(name):
    if name in (None, "linear"):
        return lambda x: x
    if name == "relu":
        return lambda x: np.maximum(x, 0)
    if name == "relu6":
        return lambda x: np.clip(x, 0, 6)
    if name == "sigmoid":
        return lambda x: 1 / (1 + np.exp(-x))
    if name == "softmax":
        def softmax(x):
            e = np.exp(x - np.max(x))
            return e / e.sum()
        return softmax
    raise ValueError("Activation non prise en charge : " + str(name))


class Camera:
    """USB camera of the board (OpenCV): RGB images."""

    def __init__(self, index=0):
        import cv2
        self.capture = cv2.VideoCapture(index)
        self.last = None
        # the video on the screen and the predictions read the camera from two threads
        import threading
        self.lock = threading.Lock()
        if not self.capture.isOpened():
            raise RuntimeError("Caméra USB introuvable : branchez une caméra sur le port USB de la carte.")

    def read(self):
        import cv2
        with self.lock:
            # the frames waiting in the buffer of the camera are old: the last one is read
            for _ in range(2):
                self.capture.grab()
            ok, frame = self.capture.read()
        if not ok:
            raise RuntimeError("Impossible de lire l'image de la caméra.")
        if camera_rotation:
            frame = cv2.rotate(frame, ROTATIONS[camera_rotation])
        self.last = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        return self.last


# Camera of the programs: opened at the first image (index chosen by use_camera)
camera_index = 0
camera = None
# the video on the screen and the predictions ask their first image at the same time: the camera is opened once
camera_open_lock = threading.Lock()
# rotation of the images of the camera (degrees clockwise), for the video and the predictions
camera_rotation = 0
ROTATIONS = {90: 0, 180: 1, 270: 2}  # cv2.ROTATE_90_CLOCKWISE, ROTATE_180, ROTATE_90_COUNTERCLOCKWISE


def rotate_camera(angle):
    global camera_rotation
    angle = int(angle) % 360
    if angle not in (0, 90, 180, 270):
        raise ValueError("Rotation de la caméra : 0, 90, 180 ou 270 degrés")
    camera_rotation = angle


def use_camera(index):
    global camera_index, camera
    if camera is not None:
        camera.capture.release()
    camera_index, camera = int(index), None


def camera_image():
    global camera
    with camera_open_lock:
        if camera is None:
            camera = Camera(camera_index)
    return camera.read()


def last_camera_image():
    # last image of the camera (a new one when none was taken)
    return camera.last if camera is not None and camera.last is not None else camera_image()


def list_cameras():
    import glob
    return sorted(int(path[len("/dev/video"):]) for path in glob.glob("/dev/video[0-9]*"))


def image_from_url(url):
    import cv2
    from urllib.request import urlopen
    data = np.frombuffer(urlopen(url, timeout=10).read(), dtype=np.uint8)
    image = cv2.imdecode(data, cv2.IMREAD_COLOR)
    if image is None:
        raise RuntimeError("Image illisible : " + url)
    return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
