import math
import time
from microbit import *
import gc

# AI_EDGE_MODEL_WEIGHTS_INPUT_START
# AI_EDGE_MODEL_WEIGHTS_INPUT_END

gc.collect()

def regularity(d):
    diffs = [abs(d[i] - d[i-1]) for i in range(1, len(d))]
    
    if not diffs:
        return 0
    diff_mean = sum(diffs) / len(diffs)
    
    if diff_mean == 0:
        return 0
    
    diff_variance = sum((x - diff_mean) ** 2 for x in diffs) / len(diffs)
    
    diff_std = diff_variance ** 0.5

    return diff_std / diff_mean

def apply_filter(data):
    if not all(k in data for k in ['x', 'y']):
        return False
    
    feat = []
    for k in ['x', 'y']:
        d = data[k]
        n = len(d)
        
        sum_x = 0
        sum_x2 = 0
        min_val = d[0]
        max_val = d[0]
        
        for x in d:
            sum_x += x
            sum_x2 += x*x
            if x < min_val:
                min_val = x
            if x > max_val:
                max_val = x
        
        mean = sum_x / n
        variance = max(0, (sum_x2 / n) - (mean ** 2))
        std = variance ** 0.5
        rms = (sum_x2 / n) ** 0.5
        
        data[k + '_max'] = max_val
        data[k + '_mean'] = mean
        data[k + '_min'] = min_val
        data[k + '_std'] = std
        data[k + '_rms'] = rms
    
    for k in ['x', 'y']:
        feat.append(float(data[k + '_max']))
    for k in ['x', 'y']:
        feat.append(float(data[k + '_mean']))
    for k in ['x', 'y']:
        feat.append(float(data[k + '_min']))
    for k in ['x', 'y']:
        feat.append(float(data[k + '_std']))
    for k in ['x', 'y']:
        skew_val = optimized_skew(data[k], data[k + '_mean'], data[k + '_std'])
        feat.append(float(skew_val))
    for k in ['x', 'y']:
        p_count = optimized_peaks(data[k], data[k + '_mean'], data[k + '_std'])
        feat.append(float(p_count))
    for k in ['x', 'y']:
        feat.append(float(data[k + '_rms']))
    for k in ['x', 'y']:
        feat.append(float(regularity(data[k])))
    
    return feat

def optimized_peaks(y, pre_mean, pre_std, lag=5, thr=3.5, min_amp=0.5):
    if len(y) < lag + 2:
        return 0
    
    g_min, g_max = min(y), max(y)
    abs_min = max(min_amp, 0.2 * (g_max - g_min))
    
    peak_count = 0
    mean_val = pre_mean
    std_val = pre_std
    var_val = std_val ** 2
    
    for i in range(lag, len(y)):
        dev = y[i] - mean_val
        d_thr = thr * max(std_val, 0.02)
        if abs(dev) > d_thr and abs(dev) > abs_min:
            peak_count += 1
        mean_val = 0.9 * mean_val + 0.1 * y[i]
        var_val = 0.9 * var_val + 0.1 * (y[i] - mean_val)**2
        std_val = var_val ** 0.5
    
    return peak_count

def optimized_skew(data, pre_mean, pre_std):
    if len(data) < 2 or pre_std == 0:
        return 0
    
    skew_sum = 0
    for x in data:
        z = (x - pre_mean) / pre_std
        skew_sum += z ** 3
    
    return skew_sum / len(data)

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
        if val - max_val < -15:
            exp_val = 0
        else:
            try:
                exp_val = math.exp(val - max_val)
            except:
                exp_val = 0
        exp_x.append(exp_val)
        sum_exp += exp_val
    
    if sum_exp == 0:
        return [1.0 / len(x)] * len(x)
    
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
        self.class_predicted = softmax(x)
        return
    
    def predict(self, time_window=0.1):
        if not self.model_loaded:
            print("The Model is not loaded properly")
        #only accelerometer is supported for now
        if not isinstance(time_window, (float, int)):
            time_window = 0.1
        
        if time_window < 0.1:
            time_window = 0.1
        elif time_window > 1.2:
            time_window = 1.2
        
        time_window = int(time_window / 0.05)
        
        input_data = self.collect_features(time_window)
        return self.get_predictions(input_data)
        
    
    def collect_features(self, time_window):
        if not self.model_loaded:
            print("The Model is not loaded properly")
        gc.collect()
        data = {'x': [], 'y': []}
        for _ in range(time_window):
            x = pin0.read_analog()
            y = pin1.read_analog()
            data['x'].append(x)
            data['y'].append(y)
            time.sleep_ms(50)
        features = apply_filter(data)
        return features
    
    def detect_class(self):
        if not self.model_loaded:
            print("The Model is not loaded properly")
        class_detected = self.labels[self.class_predicted.index(max(self.class_predicted))]
        return class_detected