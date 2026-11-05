import math
import time
from thingz import *
from machine import *
import gc

window_samples = 0
sample_frequency = 20
# Sensor of the model (strategy of the AI tool), given with the model weights
sensor = "accelerometer"

# AI_EDGE_MODEL_WEIGHTS_INPUT_START
# AI_EDGE_MODEL_WEIGHTS_INPUT_END

gc.collect()

# Same features, window and smoothing as the Vittascience AI tool (AIEdgeFilterData.js, AiChartData.js), so that the
# board finds the classes of the tool preview. window_samples and sample_frequency are given with the model weights.

UNCERTAIN = "Incertain"

def fixed3(x):
    # Number(x.toFixed(3)) of JavaScript
    r = math.floor(abs(x) * 1000 + 0.5) / 1000
    return r if x >= 0 else -r

def f_max(d):
    return fixed3(max(d))

def f_min(d):
    return fixed3(min(d))

def f_mean(d):
    return fixed3(sum(d) / len(d))

def f_std(d):
    m = f_mean(d)
    return (sum((x - m) ** 2 for x in d) / (len(d) - 1)) ** 0.5

def f_skewness(d):
    n = len(d)
    if n < 2:
        return 0
    m = sum(d) / n
    s = (sum((x - m) ** 2 for x in d) / n) ** 0.5
    if s == 0:
        return 0
    return sum(((x - m) / s) ** 3 for x in d) / n

def f_peaks(y, lag=5, thr=3.5, influence=0.3, min_amp=0.5):
    if len(y) < lag + 2:
        return 0
    abs_min = max(min_amp, 0.2 * (max(y) - min(y)))
    filtered = list(y[:lag])
    avg = f_mean(filtered)
    std = f_std(filtered)
    peaks = 0
    for i in range(lag, len(y)):
        dev = y[i] - avg
        if abs(dev) > thr * max(std, 0.02) and abs(dev) > abs_min:
            peaks += 1
        filtered.append(influence * y[i] + (1 - influence) * filtered[-1])
        # The lag values before this one
        last = filtered[-lag - 1:-1]
        avg = f_mean(last)
        std = f_std(last)
    return peaks

def f_rms(d):
    return (sum(x * x for x in d) / len(d)) ** 0.5

def f_regularity(d):
    diffs = [abs(d[i] - d[i - 1]) for i in range(1, len(d))]
    m = sum(diffs) / len(diffs)
    v = sum((x - m) ** 2 for x in diffs) / len(diffs)
    if v == 0:
        return 0
    return v ** 0.5 / m

def f_zcr(d):
    c = 0
    for i in range(1, len(d)):
        if (d[i] >= 0) != (d[i - 1] >= 0):
            c += 1
    return c / (len(d) - 1)

def apply_filter(axes):
    # For each feature, its value on each axis, like the AI tool: the last feature depends on the sensor of the axis
    return [float(f(a)) for f in FEATURES for a in axes] + [float(f(a)) for f, a in zip(last_features, axes)]

def pinADC(pinNumber, db=ADC.ATTN_11DB, bit=ADC.WIDTH_13BIT):
    pin = ADC(pinNumber)
    pin.atten(db)
    pin.width(bit)
    return pin

# ADC (GPIO) of the pins of the strategies: "p19/p7" reads P19 then P7
PINS = {"p0": 3, "p1": 2, "p2": 1, "p6": 6, "p7": 7, "p16": 15, "p19": 13, "p20": 14}

def sensor_reader(name):
    # Reading of a sensor and last feature of its values: zero crossings for the accelerometer (signed values),
    # regularity for the other sensors
    if name == "accelerometer":
        return lambda: [accelerometer.get_x() / 1000, accelerometer.get_y() / 1000, accelerometer.get_z() / 1000], [f_zcr] * 3
    if name in PINS:
        pin = pinADC(PINS[name])
        return lambda: [pin.read()], [f_regularity]
    return None

def make_reader(sensor):
    # Reading of the sensors of the strategy ("accelerometer/p0": accelerometer then P0) and last feature of each value;
    # unknown strategy: accelerometer
    readers = [sensor_reader(name) for name in sensor.split("/")]
    if None in readers:
        readers = [sensor_reader("accelerometer")]
    reads = [read for read, features in readers]
    return lambda: [value for read in reads for value in read()], [f for read, features in readers for f in features]

read_sample, last_features = make_reader(sensor)
FEATURES = [f_max, f_mean, f_min, f_std, f_skewness, f_peaks, f_rms]

def q15_to_float(q15_val):
    return q15_val / 32768.0

def vector_dot(a, b):
    result = [0] * len(b[0])
    for j in range(len(b[0])):
        for k in range(len(b)):
            result[j] += a[k] * b[k][j]
    return result

def vector_add(a, b):
    return [a[i] + b[i] for i in range(len(a))]

def relu(x):
    return [max(0, val) for val in x]

def softmax(x):
    max_val = max(x)
    exp_x = []
    sum_exp = 0
    for val in x:
        exp_val = 0 if val - max_val < -15 else math.exp(val - max_val)
        exp_x.append(exp_val)
        sum_exp += exp_val
    return [val / sum_exp for val in exp_x]

class Model:
    def __init__(self, url="local"):
        try:
            if labels is None:
                raise ValueError("The Model is not loaded")
            self.class_predicted = None
            self.labels = labels
            self.float_dense0_weights = []
            for row in dense0_weights:
                self.float_dense0_weights.append([q15_to_float(val) / dense0_w_scale for val in row])
                gc.collect()
            self.float_dense0_bias = [q15_to_float(val) / dense0_b_scale for val in dense0_bias]
            gc.collect()
            self.float_dense1_weights = []
            for row in dense1_weights:
                self.float_dense1_weights.append([q15_to_float(val) / dense1_w_scale for val in row])
                gc.collect()
            self.float_dense1_bias = [q15_to_float(val) / dense1_b_scale for val in dense1_bias]
            self.model_loaded = True
            gc.collect()
        except NameError as e:
            print("The Model is not loaded properly:" + str(e))
            self.model_loaded = False
            return None
        # Sliding window of the readings (one list per axis) and last predictions, like the AI tool preview
        self.buffer = None
        self.next_time = None
        self.last_predictions = []

    def get_predictions(self, input_data):
        if not self.model_loaded:
            print("The Model is not loaded properly")
        gc.collect()
        x = vector_dot(input_data, self.float_dense0_weights)
        x = vector_add(x, self.float_dense0_bias)
        x = relu(x)
        gc.collect()
        x = vector_dot(x, self.float_dense1_weights)
        x = vector_add(x, self.float_dense1_bias)
        return softmax(x)

    def read(self, count):
        # count readings at the sensor frequency, the next one due at self.next_time
        for _ in range(count):
            wait = time.ticks_diff(self.next_time, time.ticks_ms())
            if wait > 0:
                time.sleep_ms(wait)
            elif -wait > self.period:
                # Late (prediction time, program): go on from now, readings too close would change the features
                self.next_time = time.ticks_ms()
            for axis, value in zip(self.buffer, read_sample()):
                axis.append(value)
            self.next_time = time.ticks_add(self.next_time, self.period)

    def predict(self, time_window=None):
        # time_window (seconds) of the block: only for models without window_samples (exported before it was stored)
        if not self.model_loaded:
            print("The Model is not loaded properly")
            return
        n = window_samples or int(min(max(time_window or 0.2, 0.1), 1.2) * sample_frequency)
        self.period = int(1000 / sample_frequency)
        # Like the AI tool: a new prediction every 2 * n / 10 + 1 readings on the last n readings, or a full window
        # again when the program did something else for longer than a window
        step = int(2 * n / 10) + 1
        if self.buffer is None or time.ticks_diff(time.ticks_ms(), self.next_time) > n * self.period:
            # First reading of the window: gives the number of axes
            self.buffer = [[value] for value in read_sample()]
            self.next_time = time.ticks_add(time.ticks_ms(), self.period)
            self.last_predictions = []
            self.read(n - 1)
        else:
            self.read(step)
        self.buffer = [axis[-n:] for axis in self.buffer]
        gc.collect()
        self.last_predictions.append(self.get_predictions(apply_filter(self.buffer)))
        self.last_predictions = self.last_predictions[-3:]
        count = len(self.last_predictions)
        self.class_predicted = [sum(p[i] for p in self.last_predictions) / count for i in range(len(self.labels))]

    def detect_class(self):
        if not self.model_loaded or self.class_predicted is None:
            print("The Model is not loaded properly")
            return UNCERTAIN
        best = max(self.class_predicted)
        # The model hesitates (best probability under 60 %): no class, like the AI tool preview
        if best < 0.6:
            return UNCERTAIN
        return self.labels[self.class_predicted.index(best)]
