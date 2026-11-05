// AI_EDGE_MODEL_WEIGHTS_INPUT_START
// AI_EDGE_MODEL_WEIGHTS_INPUT_END

int freeMemory()
{
  extern int __heap_start, *__brkval;
  int v;
  return (int)&v - (__brkval == 0 ? (int)&__heap_start : (int)__brkval);
}

// Same features, window and smoothing as the Vittascience AI tool (AIEdgeFilterData.js, AiChartData.js), so that the
// board finds the classes of the tool preview. window_samples and sample_frequency are given with the model weights.
#define EDGE_MAX_WINDOW 60
#define EDGE_SMOOTHING 3
#define EDGE_PEAKS_LAG 5

class Model
{
private:
  bool model_loaded;
  String *labels;
  int input_size;
  int hidden_size;
  int output_size;
  // Sliding window of the readings (A0, and A1 when two sensors), like the AI tool preview
  int buffer[2][EDGE_MAX_WINDOW];
  int buffered;
  int window;
  unsigned long period;
  unsigned long next_time;
  // Last predictions, averaged
  float *last_predictions;
  int predictions_count;
  int predictions_next;

  float get_dense0_weight(int i, int j)
  {
    return q15_to_float(dense0_weights[i][j]) / dense0_w_scale;
  }

  float get_dense1_weight(int i, int j)
  {
    return q15_to_float(dense1_weights[i][j]) / dense1_w_scale;
  }

public:
  Model(String model_type = "")
  {
    num_classes = sizeof(labelsInput) / sizeof(labelsInput[0]);
    if (num_classes == 0)
    {
      Serial.println("The Model is not loaded");
      model_loaded = false;
      return;
    }
    input_size = sizeof(dense0_weights) / sizeof(dense0_weights[0]);
    hidden_size = 16;
    output_size = sizeof(dense1_bias) / sizeof(dense1_bias[0]);
    labels = new String[num_classes];
    for (int i = 0; i < num_classes; i++)
    {
      labels[i] = labelsInput[i];
    }
    for (int i = 0; i < hidden_size; i++)
    {
      g_dense0_bias[i] = q15_to_float(dense0_bias[i]) / dense0_b_scale;
    }
    for (int i = 0; i < output_size; i++)
    {
      g_dense1_bias[i] = q15_to_float(dense1_bias[i]) / dense1_b_scale;
      g_class_predicted[i] = 0;
    }
    last_predictions = new float[EDGE_SMOOTHING * output_size];
    buffered = 0;
    predictions_count = 0;
    predictions_next = 0;
    model_loaded = true;
  }

  ~Model()
  {
    delete[] labels;
    delete[] last_predictions;
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

  // time_window (seconds) of the block: only for models without window_samples (exported before it was stored)
  void predict(float time_window = 0.2)
  {
    if (!model_loaded)
    {
      Serial.println("The Model is not loaded properly");
      return;
    }
    int n = window_samples > 0 ? window_samples : int(constrain(time_window, 0.1, 1.2) * sample_frequency);
    window = constrain(n, EDGE_PEAKS_LAG + 2, EDGE_MAX_WINDOW);
    period = 1000UL / sample_frequency;
    // Like the AI tool: a new prediction every 2 * n / 10 + 1 readings on the last n readings, or a full window
    // again when the program did something else for longer than a window
    if (buffered == 0 || (long)(millis() - next_time) > (long)(window * period))
    {
      buffered = 0;
      predictions_count = 0;
      next_time = millis();
      read(window);
    }
    else
    {
      read(2 * window / 10 + 1);
    }
    int axes = sensorPin2 != -1 ? 2 : 1;
    float features[16];
    int idx = 0;
    for (int f = 0; f < 8; f++)
    {
      for (int a = 0; a < axes; a++)
      {
        features[idx++] = feature(f, buffer[a], buffered);
      }
    }
    get_predictions(features);
    // Average of the last predictions
    for (int i = 0; i < output_size; i++)
    {
      last_predictions[predictions_next * output_size + i] = g_class_predicted[i];
    }
    predictions_next = (predictions_next + 1) % EDGE_SMOOTHING;
    if (predictions_count < EDGE_SMOOTHING)
    {
      predictions_count++;
    }
    for (int i = 0; i < output_size; i++)
    {
      float sum = 0;
      for (int k = 0; k < predictions_count; k++)
      {
        sum += last_predictions[k * output_size + i];
      }
      g_class_predicted[i] = sum / predictions_count;
    }
  }

  // count readings at the sensor frequency, the next one due at next_time
  void read(int count)
  {
    for (int c = 0; c < count; c++)
    {
      long wait = (long)(next_time - millis());
      if (wait > 0)
      {
        delay(wait);
      }
      else if (-wait > (long)period)
      {
        // Late (prediction time, program): go on from now, readings too close would change the features
        next_time = millis();
      }
      if (buffered == window)
      {
        memmove(buffer[0], buffer[0] + 1, (window - 1) * sizeof(int));
        memmove(buffer[1], buffer[1] + 1, (window - 1) * sizeof(int));
        buffered--;
      }
      buffer[0][buffered] = analogRead(sensorPin);
      buffer[1][buffered] = sensorPin2 != -1 ? analogRead(sensorPin2) : 0;
      buffered++;
      next_time += period;
    }
  }

  String detect_class()
  {
    if (!model_loaded)
    {
      Serial.println("The Model is not loaded properly");
      return "Incertain";
    }
    int max_index = 0;
    for (int i = 1; i < output_size; i++)
    {
      if (g_class_predicted[i] > g_class_predicted[max_index])
      {
        max_index = i;
      }
    }
    // The model hesitates (best probability under 60 %): no class, like the AI tool preview
    if (g_class_predicted[max_index] < 0.6)
    {
      return "Incertain";
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
      max_val = max(max_val, x[i]);
    }
    float sum_exp = 0;
    for (int i = 0; i < size; i++)
    {
      x[i] = x[i] - max_val < -15 ? 0 : exp(x[i] - max_val);
      sum_exp += x[i];
    }
    for (int i = 0; i < size; i++)
    {
      x[i] /= sum_exp;
    }
  }

  // Features of the AI tool, in its order: max, mean, min, std, skewness, peaks, rms, regularity
  float feature(int f, const int *d, int n)
  {
    switch (f)
    {
    case 0:
    {
      int m = d[0];
      for (int i = 1; i < n; i++)
        m = max(m, d[i]);
      return m;
    }
    case 1:
      return mean3(d, n);
    case 2:
    {
      int m = d[0];
      for (int i = 1; i < n; i++)
        m = min(m, d[i]);
      return m;
    }
    case 3:
      return std_dev(d, n);
    case 4:
      return skewness(d, n);
    case 5:
      return peaks(d, n);
    case 6:
    {
      float sum = 0;
      for (int i = 0; i < n; i++)
        sum += (float)d[i] * d[i];
      return sqrt(sum / n);
    }
    default:
      return regularity(d, n);
    }
  }

  // Number(x.toFixed(3)) of JavaScript
  static float fixed3(float x)
  {
    float r = floor(fabs(x) * 1000 + 0.5) / 1000;
    return x >= 0 ? r : -r;
  }

  template <typename T>
  static float mean3(const T *d, int n)
  {
    float sum = 0;
    for (int i = 0; i < n; i++)
      sum += d[i];
    return fixed3(sum / n);
  }

  // With the rounded mean and n - 1, like the AI tool
  template <typename T>
  static float std_dev(const T *d, int n)
  {
    float m = mean3(d, n);
    float sum = 0;
    for (int i = 0; i < n; i++)
      sum += (d[i] - m) * (d[i] - m);
    return sqrt(sum / (n - 1));
  }

  static float skewness(const int *d, int n)
  {
    if (n < 2)
      return 0;
    float m = 0;
    for (int i = 0; i < n; i++)
      m += d[i];
    m /= n;
    float s = 0;
    for (int i = 0; i < n; i++)
      s += (d[i] - m) * (d[i] - m);
    s = sqrt(s / n);
    if (s == 0)
      return 0;
    float sum = 0;
    for (int i = 0; i < n; i++)
    {
      float z = (d[i] - m) / s;
      sum += z * z * z;
    }
    return sum / n;
  }

  // Peaks of the AI tool (z-score on the 5 previous filtered values), keeping only these 5 values (Arduino memory)
  static float peaks(const int *y, int n)
  {
    const int lag = EDGE_PEAKS_LAG;
    if (n < lag + 2)
      return 0;
    int lo = y[0], hi = y[0];
    for (int i = 1; i < n; i++)
    {
      lo = min(lo, y[i]);
      hi = max(hi, y[i]);
    }
    float abs_min = max(0.5f, 0.2f * (hi - lo));
    float win[lag];
    for (int k = 0; k < lag; k++)
      win[k] = y[k];
    float avg = mean3(win, lag);
    float std = std_dev(win, lag);
    float previous = y[lag - 1];
    int count = 0;
    for (int i = lag; i < n; i++)
    {
      float dev = y[i] - avg;
      if (fabs(dev) > 3.5f * max(std, 0.02f) && fabs(dev) > abs_min)
        count++;
      float filtered = 0.3f * y[i] + 0.7f * previous;
      // win: the lag filtered values before this one
      avg = mean3(win, lag);
      std = std_dev(win, lag);
      memmove(win, win + 1, (lag - 1) * sizeof(float));
      win[lag - 1] = filtered;
      previous = filtered;
    }
    return count;
  }

  static float regularity(const int *d, int n)
  {
    float m = 0;
    for (int i = 1; i < n; i++)
      m += abs(d[i] - d[i - 1]);
    m /= (n - 1);
    float v = 0;
    for (int i = 1; i < n; i++)
    {
      float diff = abs(d[i] - d[i - 1]) - m;
      v += diff * diff;
    }
    v /= (n - 1);
    return v == 0 ? 0 : sqrt(v) / m;
  }
};
Model *model = NULL;
