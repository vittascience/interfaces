PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["ModelImage"] = function () {
  return {
    name: "vittaia_init_model",
    fields: {},
    values: {},
    statements: {},
    foundType: "vittaia",
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["load_model"] = function (
  args,
  node,
) {
  if (args[1].s.v === 'local') {
    if (args[0].id.v === "modelPosture") {
      return;
    }
    return {
      name: "vittaia_load_local_model",
      fields: {},
      values: {},
      statements: {},
    };
  }
  if (args[0].id.v === "modelPosture") {
    return {
      name: "vittaia_load_posture_model",
      fields: {},
      values: {
        MODEL_URL: PyBlock.prototype.convert(args[1], node),
      },
      statements: {},
    }
  } else if (args[0].id.v === "modelSound") {
    return {
      name: "vittaia_load_sound_model",
      fields: {},
      values: {
        MODEL_URL: PyBlock.prototype.convert(args[1], node),
      },
      statements: {},
    };
  }
  return {
    name: "vittaia_load_model",
    fields: {},
    values: {
      MODEL_URL: PyBlock.prototype.convert(args[1], node),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["Webcam"] = function () {
  return {
    name: "vittaia_init_webcam_1",
    fields: {},
    values: {},
    statements: {},
    foundType: "vittaia"
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["select_camera"] = function (
  args,
  node
) {
  if (args[0].id.v === "webcamPosture") {
    return {
      name: "vittaia_select_webcam_posture",
      fields: {},
      values: {
        ID: PyBlock.prototype.convert(args[1], node),
      },
      statements: {},
    };
  }

  return {
    name: "vittaia_init_webcam_2",
    fields: {},
    values: {
      ID: PyBlock.prototype.convert(args[1], node),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["display"] = function (args, node) {
  if (args[0].id.v === "webcamPosture") {
    return {
      name: "vittaia_refresh_webcam_posture",
      fields: {},
      values: {},
      statements: {},
    };
  }
  return {
    name: "vittaia_init_webcam_3",
    fields: {},
    values: {},
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["capture"] = function (args, node) {

  if (args[0].id.v === "webcamPosture") {
    return {
      name: "vittaia_capture_webcam_posture",
      fields: {},
      values: {},
      statements: {},
      foundType: "vittaia",
    };
  }
  return {
    name: "vittaia_init_capture",
    fields: {},
    values: {},
    statements: {},
  };
};


PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["predict"] = function (
  args,
  node,
) {
  if (args[0].id.v === "modelPosture") {
    return {
      name: "vittaia_predict_webcam_posture",
      fields: {},
      values: {
        MODEL_PRE: PyBlock.prototype.convert(args[1], node),
      },
      statements: {},
      foundType: "vittaia",
    };
  } else if (args[0].id.v === "ai") {
    return {
      name: "vittaia_model_text_predict_standalone",
      fields: {},
      values: {
        MESSAGE: PyBlock.prototype.convert(args[1], node),
      },
      statements: {},
      foundType: "vittaia",
    };
  }
  return {
    name: "vittaia_predict",
    fields: {},
    values: {
      MODEL_PRE: PyBlock.prototype.convert(args[1], node),
    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["get_camera_list"] = function (args, node) {
  if (args[0].id.v === "webcamPosture") {
    return {
      name: "vittaia_list_webcams_posture",
      fields: {},
      values: {},
      statements: {},
    };
  }
  return {
    name: "vittaia_list_webcams",
    fields: {},
    values: {},
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["ModelSound"] = function () {
  return {
    name: "vittaia_init_model_sound",
    fields: {},
    values: {},
    statements: {},
    foundType: "vittaia",
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["Micro"] = function () {
  return {
    name: "vittaia_init_micro",
    fields: {},
    values: {},
    statements: {},
    foundType: "vittaia",
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["play"] = function () {
  return {
    name: "vittaia_init_micro_play",
    fields: {},
    values: {},
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["listen"] = function () {
  return {
    name: "vittaia_make_sound_predictions_standalone",
    fields: {},
    values: {},
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["get_micros_list"] = function () {
  return {
    name: "vittaia_list_microphones_standalone",
    fields: {},
    values: {},
    statements: {},
  };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["load_discussion"] = function (
  args,
  node,
) {
  return {
    name: "vittaia_load_discussion",
    fields: {},
    values: {
      MODEL_URL: PyBlock.prototype.convert(args[1], node),
    },
    statements: {},
  };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["set_randomness"] = function (args, node) {
  return {
    name: "vittaia_set_randomness_standalone",
    fields: {},
    values: {
      TEMPERATURE: PyBlock.prototype.convert(args[1], node),
    },
    statements: {},
  };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["set_model_ia"] = function (args, node) {
  return {
    name: "vittaia_set_model_ia_standalone",
    fields: {},
    values: {
      model: PyBlock.prototype.convert(args[1], node),
    },
    statements: {},
  };
};
PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["model_text_predict"] = function (args, node) {
  return {
    name: "vittaia_model_text_predict",
    fields: {},
    values: {
      message: PyBlock.prototype.convert(args[1], node),

    },
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["get_ai_message"] = function () {
  return {
    name: "vittaia_get_ai_message",
    fields: {},
    values: {},
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["get_best_probability_class"] = function (args, node) {
  if (args.length >1) {
    if (args[1].s.v === "class") {
      return {
        name: "vittaia_get_best_probability_class",
        fields: {},
        values: {},
        statements: {},
      };
    } else if (args[1].s.v === "rate") {
      return {
        name: "vittaia_get_confidence_rate",
        fields: {},
        values: {},
        statements: {},
      };
    }
  }
  return {
    name: "vittaia_get_best_probability_class",
    fields: {},
    values: {},
    statements: {},
  };
};

PyBlock.prototype.FUNCTIONS_BLOCKS["modelPredictions"] = function (args, node) {
  return {
    name: "vittaia_get_predictions",
    fields: {},
    values: {},
    statements: {},
  };
}


PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["ModelPosture"] = function (args, node) {
  return {
    name: "vittaia_init_model_posture",
    fields: {},
    values: {},
    statements: {},
    foundType: "vittaia",
  };
}

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["WebcamPosture"] = function () {
  return {
    name: "vittaia_init_webcam_posture",
    fields: {},
    values: {},
    statements: {},
    foundType: "vittaia"
  };
}

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["ModelSound"] = function (args, node) {
  return {
    name: "vittaia_init_model_sound",
    fields: {},
    values: {},
    statements: {},
    foundType: "vittaia",
  };
}

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["Micro"] = function (args, node) {
  return {
    name: "vittaia_init_micro_var",
    fields: {},
    values: {},
    statements: {},
    foundType: "vittaia",
  };
}


PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["Discussion"] = function (args, node) {
  return {
    name: "vittaia_init_discussion",
    fields: {},
    values: {},
    statements: {},
    foundType: "vittaia",
  };
}

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["TextAI"] = function (args, node) {
  return {
    name: "vittaia_init_text_ai",
    fields: {},
    values: {},
    statements: {},
    foundType: "vittaia",
  };
}

PyBlock.prototype.FUNCTIONS_BLOCKS["vittaia"]["getUploadedImage"] = function (args, node) {
  return {
    name: "vittaia_make_predictions_file_standalone",
    fields: {},
    values: {},
    statements: {},
    foundType: "vittaia",
  };
}