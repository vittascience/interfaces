/**
 * @fileoverview Arabic messages for Python. (AR)
 */

'use strict';

// Display - console.
Blockly.Msg['DISPLAY_PRINT_TITLE'] = 'print %1';
Blockly.Msg['DISPLAY_PRINT_TOOLTIP'] = 'Print block content in python console.';
Blockly.Msg['DISPLAY_INPUT_TITLE'] = 'request user for a text with %1';
Blockly.Msg['DISPLAY_INPUT_TOOLTIP'] = 'Request user to input a value as text in python console.';
Blockly.Msg['DISPLAY_INPUT_NUMBER_TITLE'] = 'request user for a number with %1';
Blockly.Msg['DISPLAY_INPUT_NUMBER_TOOLTIP'] = 'Request user to input a value as float number in python console.';
// Display - time
Blockly.Msg['TIME_SLEEP_TITLE'] = '[time] wait %1 %2';
Blockly.Msg['TIME_SLEEP_TOOLTIP'] = 'Stop the code execution (duration in seconds or milliseconds).';
Blockly.Msg['TIME_SLEEP_SECOND'] = 'second(s)';
Blockly.Msg['TIME_SLEEP_MILLISECOND'] = 'millisecond(s)';
Blockly.Msg['TIME_SLEEP_MICROSECOND'] = 'microsecond(s)';
Blockly.Msg['TIME_TIME_TITLE'] = 'Have the current time in seconds';
Blockly.Msg['TIME_WAIT_UNTIL_TITLE'] = '[time] wait until %1';
Blockly.Msg['TIME_WAIT_UNTIL_TOOLTIP'] = 'Stop the code execution until the satisfied condition.';
Blockly.Msg['TIME_INITCHRONOMETER_TITLE'] = '[time] initialize the chronometer';
Blockly.Msg['TIME_INITCHRONOMETER_TOOLTIP'] = 'Allows you to initialize the chronometer (in seconds).';
Blockly.Msg['TIME_GETCHRONOMETER_TITLE'] = '[time] get chronometer in %1';
Blockly.Msg['TIME_GETCHRONOMETER_TOOLTIP'] = 'Returns the chronometer value from the initialization in seconds or milliseconds.';
Blockly.Msg['TIME_GET_DATE_TITLE'] = '[time] get date and clock';
Blockly.Msg['TIME_GET_DATE_TOOLTIP'] = 'Returns formatted date and clock in string.';
// Turtle blocks.
Blockly.Msg['TURTLE_DIRECTION_TITLE'] = 'move %1 by %2';
Blockly.Msg['TURTLE_DIRECTION_FORWARD'] = 'forward';
Blockly.Msg['TURTLE_DIRECTION_BACKWARD'] = 'backward';
Blockly.Msg['TURTLE_DIRECTION_TOOLTIP'] = 'Move by specifying the direction and the distance.';
Blockly.Msg['TURTLE_TURN_TITLE'] = 'turn %1 by %2°';
Blockly.Msg['TURTLE_TURN_RIGHT'] = 'right ↻';
Blockly.Msg['TURTLE_TURN_LEFT'] = 'left ↺';
Blockly.Msg['TURTLE_TURN_TOOLTIP'] = 'Turn by specifying the value of the angle.';
Blockly.Msg['TURTLE_GOTO_TITLE'] = 'go to position x %1 y %2';
Blockly.Msg['TURTLE_GOTO_TOOLTIP'] = 'Go to specified absciss and ordinate.';
Blockly.Msg['TURTLE_CIRCLE_TITLE'] = 'draw circle of radius %1';
Blockly.Msg['TURTLE_CIRCLE_TOOLTIP'] = 'Create a circle by specifying the radius.';
Blockly.Msg['TURTLE_ARC_TITLE'] = 'draw circle of radius %1 and angle %2°';
Blockly.Msg['TURTLE_ARC_TOOLTIP'] = 'Create an arc by specifying the radius and the angle.';
Blockly.Msg['TURTLE_WRITE_TITLE'] = 'write %1 fontsize %2';
Blockly.Msg['TURTLE_WRITE_TOOLTIP'] = 'Write text with specified fontsize.';
Blockly.Msg['TURTLE_FILL_TITLE'] = 'fill with color %1';
Blockly.Msg['TURTLE_FILL_TOOLTIP'] = 'Fill drawing with color';
Blockly.Msg['TURTLE_SHAPE_TITLE'] = 'set shape %1';
Blockly.Msg['TURTLE_SHAPE_TURTLE'] = 'turtle 🐢';
Blockly.Msg['TURTLE_SHAPE_CIRCLE'] = 'circle ⚫';
Blockly.Msg['TURTLE_SHAPE_CLASSIC'] = 'classic ➤';
Blockly.Msg['TURTLE_SHAPE_SQUARE'] = 'square ⬛';
Blockly.Msg['TURTLE_SHAPE_TRIANGLE'] = 'triangle ▶';
Blockly.Msg['TURTLE_SHAPE_TOOLTIP'] = 'Select the shape of the cursor';
Blockly.Msg['TURTLE_COLOR_TITLE'] = 'set color %1 width %2';
Blockly.Msg['TURTLE_COLOR_TOOLTIP'] = 'Color and width of the lines';
Blockly.Msg['TURTLE_PEN_TITLE'] = 'put pen %1';
Blockly.Msg['TURTLE_PEN_TOOLTIP'] = 'Put pen up or down to draw lines';
Blockly.Msg['TURTLE_PEN_UP'] = 'up';
Blockly.Msg['TURTLE_PEN_DOWN'] = 'down';
Blockly.Msg['TURTLE_VISIBILITY_TITLE'] = '%1 the turtle';
Blockly.Msg['TURTLE_VISIBILITY_TOOLTIP'] = 'Specify the visibility of the turtle';
Blockly.Msg['TURTLE_VISIBILITY_SHOW'] = 'show';
Blockly.Msg['TURTLE_VISIBILITY_HIDE'] = 'hide';
Blockly.Msg['TURTLE_STAMP_TITLE'] = 'stamp the turtle';
Blockly.Msg['TURTLE_STAMP_TOOLTIP'] = 'Stamp the cursor at the current position';
Blockly.Msg['TURTLE_SPEED_TITLE'] = 'set speed %1';
Blockly.Msg['TURTLE_SPEED_TOOLTIP'] = 'Specify the speed of the turtle';
Blockly.Msg['TURTLE_RESET_TITLE'] = 'reset the drawing';
Blockly.Msg['TURTLE_COLOR'] = 'set color %1';
Blockly.Msg['TURTLE_WIDTH'] = 'set width %1';
Blockly.Msg['TURTLE_FILLCOLOR'] = 'fill with color %1';
Blockly.Msg['TURTLE_FILLBEGIN'] = 'begin the fill';
Blockly.Msg['TURTLE_FILLEND'] = 'finish the fill';
Blockly.Msg['TURTLE_SCREEN_SETUP_TITLE'] = 'حجم اللوحة %1 × %2';
Blockly.Msg['TURTLE_SCREEN_SETUP_TOOLTIP'] = 'تحديد حجم اللوحة.';
Blockly.Msg['TURTLE_SCREEN_COLOR_TITLE'] = 'لون خلفية اللوحة %1';
Blockly.Msg['TURTLE_SCREEN_COLOR_TOOLTIP'] = 'تحديد لون خلفية اللوحة.';

// Numpy blocks.
Blockly.Msg['NUMPY_ARANGE_TITLE'] = 'aranged table from %1 to %2 by step %3';
Blockly.Msg['NUMPY_ARANGE_TOOLTIP'] = 'Returns an array aranged from min to max by step.';
Blockly.Msg['NUMPY_LINSPACE_TITLE'] = 'aranged table from %1 to %2 with %3 values';
Blockly.Msg['NUMPY_LINSPACE_TOOLTIP'] = 'Returns an array aranged from min to max with number of items choosen.';
Blockly.Msg['NUMPY_TABLE_WITH_SHAPE_TITLE'] = 'table size %1 * %2 with item %3';
Blockly.Msg['NUMPY_TABLE_WITH_SHAPE_TOOLTIP'] = 'Initialize table with shape [i*j] with one item';
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_TOOLTIP'] = 'Initialize table with any number of items';
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_INPUT_TITLE'] = 'create table with';
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_INPUT_TOOLTIP'] = 'Create a table with any number of items.';
Blockly.Msg['NUMPY_CREATE_TABLE_EMPTY_TITLE'] = 'create empty table';
Blockly.Msg['NUMPY_CREATE_TABLE_EMPTY_TOOLTIP'] = 'Returns a table, of length 0, containing no data records';
Blockly.Msg['NUMPY_SQUARE_MATRIX_TITLE'] = 'matrix with items';
Blockly.Msg['NUMPY_SQUARE_MATRIX_TOOLTIP'] = 'Initialize square matrix of any type, from size 2 to 10.';
Blockly.Msg['NUMPY_SIZESHAPE_TITLE'] = '%1 of %2';
Blockly.Msg['NUMPY_SIZESHAPE_TOOLTIP'] = 'Returns size or shape of numpy table.';
Blockly.Msg['NUMPY_SIZE'] = 'size';
Blockly.Msg['NUMPY_SHAPE'] = 'shape';
Blockly.Msg['NUMPY_GET_ELEMENT_MATRIX_TITLE'] = 'get item [%1, %2] of %3';
Blockly.Msg['NUMPY_GET_ELEMENT_MATRIX_TOOLTIP'] = 'Get item [i,j] from numpy array.';
Blockly.Msg['NUMPY_GET_ELEMENT_LIST_TITLE'] = 'get item [%1] of %2';
Blockly.Msg['NUMPY_GET_ELEMENT_LIST_TOOLTIP'] = 'Get item [i] from numpy array.';
// Graph blocks.
Blockly.Msg['GRAPH_PLOT_TITLE'] = 'plot %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_PLOT_TOOLTIP'] = 'Plot graph in Python console.';
Blockly.Msg['GRAPH_SCATTER_TITLE'] = 'plot scatter %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_SCATTER_TOOLTIP'] = 'Plot scatter in Python console.';
Blockly.Msg['GRAPH_BAR_TITLE'] = 'plot bar %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_BAR_TOOLTIP'] = 'Plot bar in Python console.';
Blockly.Msg['GRAPH_HIST_TITLE'] = 'plot histogram %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_HIST_TOOLTIP'] = 'Plot histogram in Python console.';
Blockly.Msg['GRAPH_SETLABEL_TITLE'] = 'define title %1 xlabel %2 ylabel %3';
Blockly.Msg['GRAPH_SETLABEL_TOOLTIP'] = 'Define title of graph and labels of xaxis and yaxis.';
Blockly.Msg['GRAPH_LEGEND_TITLE'] = 'set legend %1 location %2';
Blockly.Msg['GRAPH_LEGEND_TOOLTIP'] = 'Enable legend for plot(s)';
Blockly.Msg['GRAPH_SHOW_TITLE'] = 'show graph';
Blockly.Msg['GRAPH_SHOW_TOOLTIP'] = 'Show graph';
Blockly.Msg['GRAPH_SUBPLOT_TITLE'] = 'subplot %1 row %2 col %3 index %4';
Blockly.Msg['GRAPH_SUBPLOT_TOOLTIP'] = 'Subplot a graph in Python console.';
Blockly.Msg['GRAPH_GRID_TITLE'] = 'show grid';
Blockly.Msg['GRAPH_GRID_TOOLTIP'] = 'Show a grid on plot';
Blockly.Msg['GRAPH_TEXT_TITLE'] = 'display text %1 pos. x %2 pos. y %3 text %4';
Blockly.Msg['GRAPH_TEXT_TOOLTIP'] = 'Display a text on plot';
Blockly.Msg['GRAPH_SET_TITLE'] = 'define title %1';
Blockly.Msg['GRAPH_SET_X_TITLE'] = 'xlabel %1';
Blockly.Msg['GRAPH_SET_Y_TITLE'] = 'ylabel %1';
Blockly.Msg['GRAPH_CREATE_PLOT_TITLE'] = 'create chart with %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_CREATE_SCATTER_TITLE'] = 'create scatter chart with %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_CREATE_BAR_TITLE'] = 'create bar chart with %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_PLOT'] = 'create bar %1 xaxis %2 yaxis %3';
// Vittaia blocks.
Blockly.Msg['VITTAIA_INIT_MODEL'] = 'Init the model';
Blockly.Msg['VITTAIA_WEBCAM_REFRESH'] = 'Init the webcam';
Blockly.Msg['VITTAIA_SELECT_CAMERA'] = 'Select the camera';
Blockly.Msg['VITTAIA_CAPTURE'] = 'Capture the webcam';
Blockly.Msg['VITTAIA_PREDICT'] = 'Predict the model %1';
Blockly.Msg['VITTAIA_INIT_SOUND'] = 'Init the sound model';
Blockly.Msg['VITTAIA_INIT_MICRO'] = 'Init the micro model';
// AI IMAGE
Blockly.Msg['VITTAIA_LOAD_MODEL_TITLE'] = '%1 load the AI image model %2';
Blockly.Msg['VITTAIA_LOAD_MODEL_TOOLTIP'] = 'Loads the AI image model passed as a parameter. The default model is for recognizing cats and dogs. You can generate a new model from the "AI Training" interface of Vittascience available in the Programming section.';
Blockly.Msg['VITTAIA_LOAD_LOCAL_MODEL_TITLE'] = '%1 load the local AI image model';
Blockly.Msg['VITTAIA_LOAD_LOCAL_MODEL_TOOLTIP'] = 'Loads the already trained image model located in the browser\'s local memory';
Blockly.Msg['VITTAIA_LOAD_MODEL_DEFAULT_TITLE'] = '%1 load the AI image model %2';
Blockly.Msg['VITTAIA_LOAD_MODEL_DEFAULT_TOOLTIP'] = 'Loads an already trained image model. Change the model using the option.';
Blockly.Msg['VITTAIA_MODEL_DOGS_CATS'] = "Dogs and Cats";
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_WEBCAM_TITLE'] = '%1 start detection on the camera image';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_WEBCAM_TOOLTIP'] = 'Makes predictions from the camera image model. A prediction includes 2 elements: the class and the probability.';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_FILE_TITLE'] = '%1 start detection on the imported image';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_FILE_TOOLTIP'] = 'Makes predictions from the imported image model. A prediction includes 2 elements: the class and the probability.';
Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE'] = '%1 detected class';
Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TOOLTIP'] = 'Returns the class associated with the model having the highest detection probability.';
Blockly.Msg['VITTAIA_GET_CONFIDENCE_RATE_TITLE'] = '%1 confidence rate';
Blockly.Msg['VITTAIA_GET_CONFIDENCE_RATE_TOOLTIP'] = 'Returns the confidence rate of the class with the highest probability.';
Blockly.Msg['VITTAIA_GET_PREDICTIONS_TITLE'] = '%1 predictions';
Blockly.Msg['VITTAIA_GET_PREDICTIONS_TOOLTIP'] = 'Returns an array containing all the model\'s predictions.';
Blockly.Msg['VITTAIA_DETECT_CLASS_TITLE'] = '%1 if the class %2 %3 detected then';
Blockly.Msg['VITTAIA_IS'] = "is";
Blockly.Msg['VITTAIA_ISNOT'] = "is not";
Blockly.Msg['VITTAIA_DETECT_CLASS_TOOLTIP'] = 'Starts detection using a camera image or an imported image to make a prediction checks if the class indicated in the block is detected.';
Blockly.Msg['VITTAIA_IMAGE_UPLOADED_TITLE'] = '%1 image uploaded';
Blockly.Msg['VITTAIA_IMAGE_UPLOADED_TOOLTIP'] = 'Allows uploading an image from the computer to be then tested by the model by launching a detection. Press the \'Upload\' icon of the block to add the image.';
Blockly.Msg['VITTAIA_WEBCAM_CAPTURE_TITLE'] = '%1 [camera] capture';
Blockly.Msg['VITTAIA_WEBCAM_CAPTURE_TOOLTIP'] = 'Allows to perform a capture with the computer\'s camera.';
Blockly.Msg['VITTAIA_WEBCAM_LIST_AVAILABLES_TITLE'] = '%1 [camera] list of available cameras';
Blockly.Msg['VITTAIA_WEBCAM_LIST_AVAILABLES_TOOLTIP'] = 'Allows listing all the cameras available on the computer.';
Blockly.Msg['VITTAIA_WEBCAM_INIT_TITLE'] = '%1 [camera] select the camera %2';
Blockly.Msg['VITTAIA_WEBCAM_INIT_TOOLTIP'] = 'Allows initializing the computer\'s camera (by default 0).';
Blockly.Msg['VITTAIA_WEBCAM_REFRESH_TITLE'] = '%1 [camera] refresh the camera';
Blockly.Msg['VITTAIA_WEBCAM_REFRESH_TOOLTIP'] = 'Allows to refresh the camera window.';

// AI POSTURE
Blockly.Msg['VITTAIA_INIT_MODEL_POSTURE_TITLE'] = '%1 تهيئة نموذج الوضعية';
Blockly.Msg['VITTAIA_INIT_MODEL_POSTURE_TOOLTIP'] = 'يقوم بتهيئة نموذج الوضعية. النموذج الافتراضي مخصص للتعرف على وضعيات الإنسان. يمكنك إنشاء نموذج جديد من خلال واجهة "تدريب الذكاء الاصطناعي" المتوفرة في قسم البرمجة.';
Blockly.Msg['VITTAIA_LOAD_POSTURE_MODEL_TITLE'] = '%1 تحميل نموذج الوضعية %2';
Blockly.Msg['VITTAIA_LOAD_POSTURE_MODEL_TOOLTIP'] = 'يحمّل النموذج المُمرر كوسيط.';
Blockly.Msg['VITTAIA_INIT_WEBCAM_TITLE'] = '%1 تهيئة الكاميرا';
Blockly.Msg['VITTAIA_INIT_WEBCAM_TOOLTIP'] = 'يهيئ الكاميرا المحددة.';
Blockly.Msg['VITTAIA_POSTURE_MAKE_PREDICTIONS_TITLE'] = '%1 تنفيذ التنبؤ على صورة الكاميرا';
Blockly.Msg['VITTAIA_POSTURE_MAKE_PREDICTIONS_TOOLTIP'] = 'يجري تنبؤات باستخدام نموذج الوضعية من الكاميرا. التنبؤ يتضمن عنصرين: الفئة والاحتمالية.';
Blockly.Msg['VITTAIA_INIT_POSTURE_WEBCAM_TITLE'] = '%1 [كاميرا] تهيئة الكاميرا';
Blockly.Msg['VITTAIA_INIT_POSTURE_WEBCAM_TOOLTIP'] = 'يهيئ الكاميرا (افتراضيًا على المنفذ 0).';
// AI SOUND
Blockly.Msg['VITTAIA_LOAD_SOUND_MODEL_TITLE'] = '%1 اختيار وتهيئة النموذج %2';
Blockly.Msg['VITTAIA_LOAD_SOUND_MODEL_TOOLTIP'] = 'يحمّل النموذج المُمرر كوسيط.';
Blockly.Msg['VITTAIA_INIT_MICROPHONE_TITLE'] = '%1 تهيئة الميكروفون';
Blockly.Msg['VITTAIA_INIT_MICROPHONE_TOOLTIP'] = 'يهيئ ميكروفون الحاسوب.';
Blockly.Msg['VITTAIA_MAKE_SOUND_PREDICTIONS_TITLE'] = '%1 بدء الكشف من صوت الميكروفون';
Blockly.Msg['VITTAIA_MAKE_SOUND_PREDICTIONS_TOOLTIP'] = 'يبدأ الكشف باستخدام صوت الميكروفون لتنفيذ تنبؤ.';
Blockly.Msg['VITTAIA_LIST_MICROPHONES_TITLE'] = '%1 عرض قائمة الميكروفونات';
Blockly.Msg['VITTAIA_LIST_MICROPHONES_TOOLTIP'] = 'يعرض جميع الميكروفونات المتوفرة.';
Blockly.Msg['VITTAIA_LIST_MICRTEXT_OPHONES_TOOLTIP'] = 'يعرض جميع الميكروفونات المتوفرة.';
// AI TEXT
Blockly.Msg['VITTAIA_INIT_TEXT_AI_TITLE'] = '%1 تهيئة نموذج النص';
Blockly.Msg['VITTAIA_INIT_TEXT_AI_TOOLTIP'] = 'يهيئ نموذج النص. النموذج الافتراضي مخصص للتعرف على النصوص. يمكنك إنشاء نموذج جديد من خلال واجهة "تدريب الذكاء الاصطناعي" في قسم البرمجة.';
Blockly.Msg['VITTAIA_INIT_DISCUSSION_TITLE'] = '%1 تهيئة المحادثة';
Blockly.Msg['VITTAIA_INIT_DISCUSSION_TOOLTIP'] = 'يهيئ المحادثة مع الذكاء الاصطناعي. النموذج الافتراضي مخصص للتعرف على النصوص. يمكنك إنشاء نموذج جديد من خلال واجهة "تدريب الذكاء الاصطناعي" في قسم البرمجة.';
Blockly.Msg['VITTAIA_LOAD_DISCUSSION_TITLE'] = '%1 اختيار المحادثة %2';
Blockly.Msg['VITTAIA_LOAD_DISCUSSION_TOOLTIP'] = 'يحمّل المحادثة المُمررة كوسيط.';
Blockly.Msg['VITTAIA_MODEL_TEXT_PREDICT_TITLE'] = '%1 تنفيذ التنبؤ للنص %2';
Blockly.Msg['VITTAIA_MODEL_TEXT_PREDICT_TOOLTIP'] = 'يقوم بتنفيذ التنبؤ للنص.';
Blockly.Msg['VITTAIA_GET_AI_MESSAGE_TITLE'] = 'عرض رد الذكاء الاصطناعي';
Blockly.Msg['VITTAIA_GET_AI_MESSAGE_TOOLTIP'] = 'يعرض رد الذكاء الاصطناعي.';
Blockly.Msg['VITTAIA_SET_RANDOMNESS_TITLE'] = '%1 تعيين نسبة العشوائية %2 %';
Blockly.Msg['VITTAIA_SET_RANDOMNESS_TOOLTIP'] = 'يحدد نسبة العشوائية في التنبؤ.';
Blockly.Msg['VITTAIA_SET_MODEL_IA_TITLE'] = '%1 تعيين نموذج الذكاء الاصطناعي %2';
Blockly.Msg['VITTAIA_SET_MODEL_IA_TOOLTIP'] = 'يحدد نموذج الذكاء الاصطناعي.';

Blockly.Msg['VITTAIA_TEXT_MODEL_GPT-3.5_TURBO'] = 'gpt-3.5';
Blockly.Msg['VITTAIA_TEXT_MODEL_LLAMA_3.1'] = 'llama-v3.1';
Blockly.Msg['VITTAIA_TEXT_MODEL_LLAMA_3.3'] = 'llama-v3.3';
Blockly.Msg['VITTAIA_TEXT_MODEL_GPT_4'] = 'gpt-4o';
Blockly.Msg['VITTAIA_TEXT_MODEL_MIXTRAL'] = 'mixtral';
Blockly.Msg['VITTAIA_TEXT_MODEL_GPT_MINI'] = 'gpt-4o-mini';

// Vittaia blocks. AST Python <-> Blocks
Blockly.Msg['VITTAIA_INIT_MODEL'] = '%1 تهيئة النموذج';
Blockly.Msg['VITTAIA_INIT_WEBCAM'] = '%1 تهيئة الكاميرا';
Blockly.Msg['VITTAIA_INIT_SOUND'] = '%1 تهيئة نموذج الصوت';
Blockly.Msg['VITTAIA_INIT_MICRO_VAR'] = '%1 تهيئة متغير الميكروفون';
Blockly.Msg['VITTAIA_INIT_MICRO'] = '%1 تهيئة الميكروفون';
Blockly.Msg['VITTAIA_SELECT_CAMERA'] = '%1 اختيار الكاميرا %2';
Blockly.Msg['VITTAIA_DISPLAY_CAMERA'] = '%1 تحديث الكاميرا';
Blockly.Msg['VITTAIA_CAPTURE'] = 'صورة الكاميرا';
Blockly.Msg['VITTAIA_PREDICT'] = '%1 تنفيذ الكشف على %2';
Blockly.Msg['VITTAIA_GET_BEST_PROBALITY_CLASS'] = Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE'];

// Exception
Blockly.Msg['EXCEPTION_RAISE_TOOLTIP'] = 'إثارة استثناء';
Blockly.Msg['EXCEPTION_EXCEPTION_TOOLTIP'] = 'إنشاء استثناء';
Blockly.Msg['EXCEPTION_TYPE_TOOLTIP'] = 'جميع أنواع الاستثناءات الممكنة';
Blockly.Msg['EXCEPTION_TRY_TOOLTIP'] = 'ينفذ كتلة من التعليمات البرمجية ويسمح بتنفيذ كتلة في حال وقوع استثناء.';

// Other Block
Blockly.Msg['OTHER_AST_RAW'] = 'كود غير مترجم';
