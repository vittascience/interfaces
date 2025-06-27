
// AI_EDGE_MODEL_WEIGHTS_INPUT_START
// AI_EDGE_MODEL_WEIGHTS_INPUT_END

int freeMemory()
{
  extern int __heap_start, *__brkval;
  int v;
  return (int)&v - (__brkval == 0 ? (int)&__heap_start : (int)__brkval);
}

class Model
{
private:
  bool model_loaded;
  String *labels;
  int num_labels;
  int input_size;
  int hidden_size;
  int output_size;
  float get_dense0_weight(int i, int j)
  {
    return q15_to_float(dense0_weights[i][j]) / dense0_w_scale;
  }

  float get_dense1_weight(int i, int j)
  {
    return q15_to_float(dense1_weights[i][j]) / dense1_w_scale;
  }

  struct SensorData
  {
    int *x;
    int *y;
    int size;
  };

public:
  Model(String model_type = "")
  {
    Serial.print("Initial free memory: ");
    Serial.println(freeMemory());

    num_classes = sizeof(labelsInput) / sizeof(labelsInput[0]);
    if (labelsInput == NULL || num_classes == 0)
    {
      Serial.println("The Model is not loaded");
      model_loaded = false;
      return;
    }
    input_size = sizeof(dense0_weights) / sizeof(dense0_weights[0]);
    hidden_size = 16;
    output_size = sizeof(dense1_bias) / sizeof(dense1_bias[0]);
    num_labels = num_classes;
    labels = new String[num_labels];
    for (int i = 0; i < num_labels; i++)
    {
      labels[i] = labelsInput[i];
    }

    Serial.print("Free memory after labels: ");
    Serial.println(freeMemory());

    for (int i = 0; i < hidden_size; i++)
    {
      g_dense0_bias[i] = q15_to_float(dense0_bias[i]) / dense0_b_scale;
    }

    for (int i = 0; i < output_size; i++)
    {
      g_dense1_bias[i] = q15_to_float(dense1_bias[i]) / dense1_b_scale;
    }

    Serial.print("Free memory after bias: ");
    Serial.println(freeMemory());

    model_loaded = true;
    Serial.println("Model loaded successfully");
  }

  ~Model()
  {
    if (labels != NULL)
    {
      delete[] labels;
    }
  }
  void get_predictions(float *input_data)
  {
    if (!model_loaded)
    {
      Serial.println("The Model is not loaded properly");
      return;
    }

    float x[16];

    for (int i = 0; i < hidden_size; i++)
    {
      x[i] = 0;
      for (int j = 0; j < input_size; j++)
      {
        x[i] += input_data[j] * get_dense0_weight(j, i);
      }
      x[i] += g_dense0_bias[i];
      x[i] = max(0.0f, x[i]);
    }

    for (int i = 0; i < output_size; i++)
    {
      g_class_predicted[i] = 0;
      for (int j = 0; j < hidden_size; j++)
      {
        g_class_predicted[i] += x[j] * get_dense1_weight(j, i);
      }
      g_class_predicted[i] += g_dense1_bias[i];
    }

    softmax(g_class_predicted, output_size);
  }
  void predict(float time_window = 0.1)
  {
    if (!model_loaded)
    {
      Serial.println("The Model is not loaded properly");
      return;
    }

    if (time_window < 0.1)
    {
      time_window = 0.1;
    }
    else if (time_window > 1.2)
    {
      time_window = 1.2;
    }

    int num_samples = int(time_window / 0.05);

    float features[input_size];
    collect_features(num_samples, features);
    get_predictions(features);
  }

  void collect_features(int time_window, float *features)
  {
    if (!model_loaded)
    {
      Serial.println("The Model is not loaded properly");
      return;
    }
    int max_window = 24;
    int actual_window = min(time_window, max_window);

    int x_data[max_window];
    int y_data[max_window];

    for (int i = 0; i < actual_window; i++)
    {
      x_data[i] = analogRead(sensorPin);
      if (sensorPin2 != -1)
      {
        y_data[i] = analogRead(sensorPin2);
      }
      else
      {
        y_data[i] = 0;
      }
      delay(50);
    }

    float x_max, x_mean, x_min, x_std, x_rms;
    float y_max, y_mean, y_min, y_std, y_rms;

    calculate_stats(x_data, actual_window, &x_max, &x_mean, &x_min, &x_std, &x_rms);

    if (sensorPin2 != -1)
    {
      calculate_stats(y_data, actual_window, &y_max, &y_mean, &y_min, &y_std, &y_rms);
    }
    else
    {
      y_max = y_mean = y_min = y_std = y_rms = 0.0f;
    }

    int idx = 0;
    features[idx++] = x_max;
    if (sensorPin2 != -1)
    {
      features[idx++] = y_max;
    }
    features[idx++] = x_mean;
    if (sensorPin2 != -1)
    {
      features[idx++] = y_mean;
    }
    features[idx++] = x_min;
    if (sensorPin2 != -1)
    {
      features[idx++] = y_min;
    }
    features[idx++] = x_std;
    if (sensorPin2 != -1)
    {
      features[idx++] = y_std;
    }

    features[idx++] = optimized_skew(x_data, actual_window, x_mean, x_std);
    if (sensorPin2 != -1)
    {
      features[idx++] = optimized_skew(y_data, actual_window, y_mean, y_std);
    }
    features[idx++] = optimized_peaks(x_data, actual_window, x_mean, x_std);
    if (sensorPin2 != -1)
    {
      features[idx++] = optimized_peaks(y_data, actual_window, y_mean, y_std);
    }
    features[idx++] = x_rms;
    if (sensorPin2 != -1)
    {
      features[idx++] = y_rms;
    }
    features[idx++] = regularity(x_data, actual_window);
    if (sensorPin2 != -1)
    {
      features[idx++] = regularity(y_data, actual_window);
    }
  }

  String detect_class()
  {
    if (!model_loaded)
    {
      Serial.println("The Model is not loaded properly");
      return "";
    }

    int max_index = 0;
    float max_value = g_class_predicted[0];

    for (int i = 1; i < output_size; i++)
    {
      if (g_class_predicted[i] > max_value)
      {
        max_value = g_class_predicted[i];
        max_index = i;
      }
    }

    return labels[max_index];
  }

  float q15_to_float(int16_t q15_val)
  {
    return q15_val / 32768.0f;
  }

  void softmax(float *x, int size)
  {

    float max_val = x[0];
    for (int i = 1; i < size; i++)
    {
      if (x[i] > max_val)
      {
        max_val = x[i];
      }
    }

    float sum_exp = 0.0f;
    float exp_vals[4];

    for (int i = 0; i < size; i++)
    {
      if (x[i] - max_val < -15)
      {
        exp_vals[i] = 0;
      }
      else
      {
        exp_vals[i] = exp(x[i] - max_val);
      }
      sum_exp += exp_vals[i];
    }

    if (sum_exp == 0)
    {
      for (int i = 0; i < size; i++)
      {
        x[i] = 1.0f / size;
      }
    }
    else
    {
      for (int i = 0; i < size; i++)
      {
        x[i] = exp_vals[i] / sum_exp;
      }
    }
  }

  float optimized_skew(int *data, int size, float pre_mean, float pre_std)
  {
    if (size < 2 || pre_std == 0)
    {
      return 0;
    }

    float skew_sum = 0;
    for (int i = 0; i < size; i++)
    {
      float z = (data[i] - pre_mean) / pre_std;
      skew_sum += z * z * z;
    }

    return skew_sum / size;
  }

  int optimized_peaks(int *y, int size, float pre_mean, float pre_std, int lag = 5, float thr = 3.5, float min_amp = 0.5)
  {
    if (size < lag + 2)
    {
      return 0;
    }

    int g_min = y[0];
    int g_max = y[0];
    for (int i = 1; i < size; i++)
    {
      if (y[i] < g_min)
        g_min = y[i];
      if (y[i] > g_max)
        g_max = y[i];
    }

    float abs_min = max(min_amp, 0.2 * (g_max - g_min));

    int peak_count = 0;
    float mean_val = pre_mean;
    float std_val = pre_std;
    float var_val = std_val * std_val;

    for (int i = lag; i < size; i++)
    {
      float dev = y[i] - mean_val;
      float d_thr = thr * max(std_val, 0.02);

      if (abs(dev) > d_thr && abs(dev) > abs_min)
      {
        peak_count++;
      }

      mean_val = 0.9 * mean_val + 0.1 * y[i];
      var_val = 0.9 * var_val + 0.1 * (y[i] - mean_val) * (y[i] - mean_val);
      std_val = sqrt(var_val);
    }

    return peak_count;
  }

  void calculate_stats(int *data, int size, float *max_val, float *mean, float *min_val, float *std_dev, float *rms)
  {
    if (size == 0)
    {
      *max_val = 0;
      *mean = 0;
      *min_val = 0;
      *std_dev = 0;
      *rms = 0;
      return;
    }

    float sum = 0;
    float sum_sq = 0;
    *max_val = data[0];
    *min_val = data[0];

    for (int i = 0; i < size; i++)
    {
      float val = data[i];
      sum += val;
      sum_sq += val * val;

      if (val > *max_val)
        *max_val = val;
      if (val < *min_val)
        *min_val = val;
    }

    *mean = sum / size;
    *rms = sqrt(sum_sq / size);

    float variance = 0;
    for (int i = 0; i < size; i++)
    {
      float diff = data[i] - *mean;
      variance += diff * diff;
    }

    variance /= size;
    *std_dev = sqrt(variance);
  }

  float regularity(int *data, int size)
  {
    if (size <= 1)
      return 0;

    float diff_sum = 0;
    float diff_max = 0;

    for (int i = 1; i < size; i++)
    {
      float diff = abs(data[i] - data[i - 1]);
      diff_sum += diff;
      if (diff > diff_max)
        diff_max = diff;
    }

    float diff_mean = diff_sum / (size - 1);

    if (diff_mean == 0)
    {
      return 0;
    }

    float diff_variance = 0;
    for (int i = 1; i < size; i++)
    {
      float diff = abs(data[i] - data[i - 1]) - diff_mean;
      diff_variance += diff * diff;
    }

    diff_variance /= (size - 1);
    float diff_std = sqrt(diff_variance);

    return diff_std / diff_mean;
  }
};

Model *model = NULL;

