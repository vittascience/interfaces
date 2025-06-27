/**
 * @fileoverview Generators for TI-83 Premium CE - code version.
 */

// ********* PROCEDURES CATEGORY *********

Blockly.Python.procedures_defnoreturn_ti = function () {
    return "def ():";
};

Blockly.Python.procedures_return_ti = function () {
    return "return";
};

// ********* CONTROL CATEGORY *********

Blockly.Python.controls_if_code = function () {
    return 'if :\n  ';
};

Blockly.Python.controls_if_else_code = function () {
    return `if :\n${Blockly.Python.INDENT}\nelse:\n`;
};

Blockly.Python.controls_if_elif_else_code = function () {
    return `if :\n${Blockly.Python.PASS}elif :\n${Blockly.Python.PASS}else:\n`;
};

Blockly.Python.controls_repeat_code = function () {
    return 'for i in range():\n';
};

Blockly.Python.controls_repeat_start_end_code = function () {
    return 'for i in range(,):\n';
};

Blockly.Python.controls_repeat_start_end_step_code = function () {
    return 'for i in range(,,):\n';
};

Blockly.Python.controls_repeat_list_code = function () {
    return 'for i in :\n';
};

Blockly.Python.controls_whileUntil_code = function () {
    return "while :\n";
};

Blockly.Python.controls_elif_code = function () {
    return 'elif :\n  ';
};

Blockly.Python.controls_else_code = function () {
    return 'else:\n';
};

// ********* OPERATORS CATEGORY *********

//op_equal
Blockly.Python.ops_equal_code = function () {
    return '=';
};

//ops_strictly_equal
Blockly.Python.ops_strictly_equal_code = function () {
    return '==';
};

//ops_different
Blockly.Python.ops_different_code = function () {
    return '!=';
};

//ops_greater
Blockly.Python.ops_greater_code = function () {
    return '>';
};

//ops_greater_equal
Blockly.Python.ops_greater_equal_code = function () {
    return '>=';
};

//ops_lower
Blockly.Python.ops_lower_code = function () {
    return '<';
};

//ops_lower_equal
Blockly.Python.ops_lower_equal_code = function () {
    return '<=';
};

//ops_and
Blockly.Python.ops_and_code = function () {
    return 'and';
};

//ops_or
Blockly.Python.ops_or_code = function () {
    return 'or';
};

//ops_not
Blockly.Python.ops_not_code = function () {
    return 'not';
};

//ops_true
Blockly.Python.ops_true_code = function () {
    return 'True';
};

//ops_false
Blockly.Python.ops_false_code = function () {
    return 'False';
};

// ********* LISTS CATEGORY *********

// create
Blockly.Python.list_create_code = function () {
    return '[]';
};

// list
Blockly.Python.list_sequence_code = function () {
    return 'list()';
};

// length
Blockly.Python.list_length_code = function () {
    return 'len()';
};

// max
Blockly.Python.list_max_code = function () {
    return 'max()';
};

// min
Blockly.Python.list_min_code = function () {
    return 'min()';
};

Blockly.Python.list_append_code = function () {
    return '.append()';
};

// remove
Blockly.Python.list_remove_code = function () {
    return '.remove()';
};

// insert
Blockly.Python.list_insert_code = function () {
    return '.insert()';
};

// sum
Blockly.Python.list_sum_code = function () {
    return 'sum()';
};

// sorted
Blockly.Python.list_sorted_code = function () {
    return 'sorted()';
};

// sort
Blockly.Python.list_sort_code = function () {
    return '.sort()';
};

// count
Blockly.Python.list_count_code = function () {
    return '.count()';
};

// ********* TYPES CATEGORY *********

// int
Blockly.Python.type_int_code = function () {
    return 'int()';
};

// float
Blockly.Python.type_float_code = function () {
    return 'float()';
};

// round
Blockly.Python.type_round_code = function () {
    return 'round()';
};

// str
Blockly.Python.type_str_code = function () {
    return 'str()';
};

// complex
Blockly.Python.type_complex_code = function () {
    return 'complex()';
};

// type
Blockly.Python.type_type_code = function () {
    return 'type()';
};

// ********* IO CATEGORY *********

Blockly.Python.ti_io_print_code = function () {
    return 'print()';
};

Blockly.Python.ti_io_input_code = function () {
    return 'input()';
};

Blockly.Python.io_eval_code = function () {
    return 'eval()';
};

Blockly.Python.io_str_format_code = function () {
    return 'str.format()';
};

// ********* MATH CATEGORY *********

Blockly.Python.math_import_code = function () {
    return 'from math import *' + NEWLINE;
};

Blockly.Python.math_fabs_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.fabs()';
};

Blockly.Python.math_sqrt_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.sqrt()';
};

Blockly.Python.math_exp_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.exp()';
};

Blockly.Python.math_pow_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.pow()';
};

Blockly.Python.math_log_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.log()';
};

Blockly.Python.math_fmod_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.fmod()';
};

Blockly.Python.math_ceil_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.ceil()';
};

Blockly.Python.math_floor_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.floor()';
};

Blockly.Python.math_trunc_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.trunc()';
};

Blockly.Python.math_frexp_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.frexp()';
};

Blockly.Python.math_const_e_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.e';
};

Blockly.Python.math_const_pi_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.pi';
};

Blockly.Python.math_trig_radians_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.radians()';
};

Blockly.Python.math_trig_degrees_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.degrees()';
};

Blockly.Python.math_trig_sin_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.sin()';
};

Blockly.Python.math_trig_cos_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.cos()';
};

Blockly.Python.math_trig_tan_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.tan()';
};

Blockly.Python.math_trig_asin_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.asin()';
};

Blockly.Python.math_trig_acos_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.acos()';
};

Blockly.Python.math_trig_atan_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.atan()';
};

Blockly.Python.math_trig_atan2_code = function () {
    Blockly.Python.addImport("math", IMPORT_MATH);
    return 'math.atan2()';
};

// ********* RANDOM CATEGORY *********

Blockly.Python.math_random_import_code = function () {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    return '';
};

Blockly.Python.math_random_random_code = function () {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    return 'random.random()';
};

Blockly.Python.math_random_randint_code = function () {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    return 'random.randint(,)';
};

Blockly.Python.math_random_choice_code = function () {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    return 'random.choice()';
};

Blockly.Python.math_random_uniform_code = function () {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    return 'random.uniform(,)';
};

Blockly.Python.math_random_randrange_code = function () {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    return 'random.randrange(,,)';
};

Blockly.Python.math_random_seed_code = function () {
    Blockly.Python.addImport('random', IMPORT_RANDOM);
    return 'random.seed()';
};

// ********* TIME CATEGORY *********

Blockly.Python.time_import_code = function () {
    Blockly.Python.addImport("time", IMPORT_TIME);
    return '';
};

Blockly.Python.time_sleep_code = function () {
    Blockly.Python.addImport("time", IMPORT_TIME);
    return 'time.sleep()';
};

Blockly.Python.time_monotonic_code = function () {
    Blockly.Python.addImport("time", IMPORT_TIME);
    return 'time.monotonic()';
};

// ********* TI_SYSTEM CATEGORY *********

Blockly.Python.ti_system_import_code = function () {
    return 'from ti_system import *' + NEWLINE;
};

Blockly.Python.ti_system_recall_list_code = function () {
    return '= recall_list()' + NEWLINE;
};

Blockly.Python.ti_system_store_list_code = function () {
    return 'store_list("",)' + NEWLINE;
};

Blockly.Python.ti_system_recall_RegEQ_code = function () {
    return '= recall_RegEQ()' + NEWLINE;
};

Blockly.Python.ti_system_while_condition_code = function () {
    return 'while not escape():' + NEWLINE + '  pass' + NEWLINE;
};

Blockly.Python.ti_system_if_condition_code = function () {
    return 'if escape():break' + NEWLINE;
};

Blockly.Python.ti_system_disp_at_code = function () {
    return 'disp_at(, "", "")' + NEWLINE;
};

Blockly.Python.ti_system_disp_clr_code = function () {
    return 'disp_clr()' + NEWLINE;
};

Blockly.Python.ti_system_disp_wait_code = function () {
    return 'disp_wait()' + NEWLINE;
};

Blockly.Python.ti_system_disp_cursor_code = function () {
    return 'disp_cursor()' + NEWLINE;
};

Blockly.Python.ti_system_sleep_code = function () {
    return 'sleep()' + NEWLINE;
};

Blockly.Python.ti_system_wait_key_code = function () {
    return 'wait_key()' + NEWLINE;
};

// ********* TI_PLOTLIB CATEGORY *********

Blockly.Python.ti_plotlib_import_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return "import ti_plotlib as plt" + NEWLINE;
};

Blockly.Python.ti_plotlib_cls_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return "plt.cls()" + NEWLINE;
};

Blockly.Python.ti_plotlib_grid_code = function (block) {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.grid(, , "dot")' + NEWLINE;
};

Blockly.Python.ti_plotlib_window_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.window(, , , )' + NEWLINE;
};

Blockly.Python.ti_plotlib_auto_window_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.auto_window(, )' + NEWLINE;
};

Blockly.Python.ti_plotlib_axes_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.axes("off")' + NEWLINE;
};

Blockly.Python.ti_plotlib_labels_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.labels("", "", 12, 2)' + NEWLINE;
};

Blockly.Python.ti_plotlib_title_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.title("")' + NEWLINE;
};

Blockly.Python.ti_plotlib_show_plot_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.show_plot()' + NEWLINE;
};

Blockly.Python.ti_plotlib_define_color_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.color( , , )' + NEWLINE;
};

Blockly.Python.ti_plotlib_draw_cls_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.draw_cls()' + NEWLINE;
};

Blockly.Python.ti_plotlib_draw_show_plot_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.show_plot()' + NEWLINE;
};

Blockly.Python.ti_plotlib_scatter_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.scatter(, , "o")' + NEWLINE;
};

Blockly.Python.ti_plotlib_plot_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.plot(, , "o")' + NEWLINE;
};

Blockly.Python.ti_plotlib_line_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.line(, , , , "solid")' + NEWLINE;
};

Blockly.Python.ti_plotlib_lin_reg_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.lin_reg(, , "left", 11)' + NEWLINE;
};

Blockly.Python.ti_plotlib_pen_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.pen("thin", "solid")' + NEWLINE;
};

Blockly.Python.ti_plotlib_text_at_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.text_at(, "", "left")' + NEWLINE;
};

Blockly.Python.ti_plotlib_xmin_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.xmin' + NEWLINE;
};

Blockly.Python.ti_plotlib_xmax_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.xmax' + NEWLINE;
};

Blockly.Python.ti_plotlib_ymin_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.ymin' + NEWLINE;
};

Blockly.Python.ti_plotlib_ymax_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.ymax' + NEWLINE;
};

Blockly.Python.ti_plotlib_a_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.a' + NEWLINE;
};

Blockly.Python.ti_plotlib_b_code = function () {
    Blockly.Python.addImport('ti_plotlib', IMPORT_TI_PLOTLIB);
    return 'plt.b' + NEWLINE;
};

// ********* TI_DRAW CATEGORY *********

Blockly.Python.ti_draw_draw_line_code = function () {
    Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
    return 'draw_line(0, 0, 100, 100)' + NEWLINE;
};

Blockly.Python.ti_draw_draw_rect_code = function () {
    Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
    return 'draw_rect(0, 0, 100, 100)' + NEWLINE;
};

Blockly.Python.ti_draw_fill_rect_code = function () {
    Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
    return 'fill_rect(0, 0, 100, 100)' + NEWLINE;
};

Blockly.Python.ti_draw_draw_circle_code = function () {
    Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
    return 'draw_circle(50, 50, 50)' + NEWLINE;
};

Blockly.Python.ti_draw_fill_circle_code = function () {
    Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
    return 'fill_circle(50, 50, 50)' + NEWLINE;
};

Blockly.Python.ti_draw_draw_text_code = function () {
    Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
    return 'draw_text(0, 0, "Hello World")' + NEWLINE;
};

Blockly.Python.ti_draw_draw_poly_code = function () {
    Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
    return 'draw_poly([135, 198, 173, 97, 72], [70, 116, 173, 173, 116])' + NEWLINE;
};

Blockly.Python.ti_draw_fill_poly_code = function () {
    Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
    return 'fill_poly([135, 198, 173, 97, 72], [70, 116, 173, 173, 116])' + NEWLINE;
};

Blockly.Python.ti_draw_plot_xy_code = function () {
    Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
    return 'plot_xy(150, 150, 5)' + NEWLINE;
};

Blockly.Python.ti_draw_set_color_code = function () {
    Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
    return 'set_color(255, 0, 0)' + NEWLINE;
};

Blockly.Python.ti_draw_set_pen_code = function () {
    Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
    return 'set_pen("medium", "solid")' + NEWLINE;
};

Blockly.Python.ti_draw_clear_code = function () {
    Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
    return 'clear()' + NEWLINE;
};

Blockly.Python.ti_draw_show_code = function () {
    Blockly.Python.addImport('ti_draw', IMPORT_TI_DRAW_ALL);
    return 'show_draw()' + NEWLINE;
};

// ********* TI_HUB CATEGORY *********

//Import Builtins

Blockly.Python.io_hub_imports_builtins_color_code = function () {
    Blockly.Python.addImport('color', IMPORT_COLOR);
    return "";
};

Blockly.Python.io_hub_imports_builtins_light_code = function () {
    Blockly.Python.addImport('light', IMPORT_LIGHT);
    return "";
};

Blockly.Python.io_hub_imports_builtins_sound_code = function () {
    Blockly.Python.addImport('sound', IMPORT_SOUND);
    return "";
};

Blockly.Python.io_hub_imports_builtins_brightness_code = function () {
    Blockly.Python.addImport('brightns', IMPORT_BRIGHTNS);
    return "";
};

//Import Inputs

Blockly.Python.io_hub_imports_inputs_dht_code = function () {
    Blockly.Python.addImport('dht_all', IMPORT_DHT_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_ranger_code = function () {
    Blockly.Python.addImport('ranger_all', IMPORT_RANGER_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_lightLevel_code = function () {
    Blockly.Python.addImport('lightlvl_all', IMPORT_LIGHTLVL_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_temperature_code = function () {
    Blockly.Python.addImport('temperat_all', IMPORT_TEMPERAT_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_moisture_code = function () {
    Blockly.Python.addImport('moisture_all', IMPORT_MOISTURE_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_magnetic_code = function () {
    Blockly.Python.addImport('magnetic_all', IMPORT_MAGNETIC_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_vernier_code = function () {
    Blockly.Python.addImport('vernier_all', IMPORT_VERNIER_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_analogin_code = function () {
    Blockly.Python.addImport('analogin_all', IMPORT_ANALOGIN_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_digitalin_code = function () {
    Blockly.Python.addImport('digital_all', IMPORT_DIGITAL_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_potentiometer_code = function () {
    Blockly.Python.addImport('potentio_all', IMPORT_POTENTIO_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_thermistors_code = function () {
    Blockly.Python.addImport('thermist_all', IMPORT_THERMIST_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_loundness_code = function () {
    Blockly.Python.addImport('loudness_all', IMPORT_LOUDNESS_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_color_code = function () {
    Blockly.Python.addImport('colorinp_all', IMPORT_COLORINP_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_bbports_code = function () {
    Blockly.Python.addImport('bbport_all', IMPORT_BBPORT_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_hubtime_code = function () {
    Blockly.Python.addImport('timer_all', IMPORT_TIMER_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_tiRGBarray_code = function () {
    Blockly.Python.addImport('rgb_arr_all', IMPORT_RGB_ARR_ALL);
    return "";
};

Blockly.Python.io_hub_imports_inputs_varrelease_code = function () {
    return '.release()';
};

Blockly.Python.io_hub_imports_outputs_led_code = function () {
    Blockly.Python.addImport('led_all', IMPORT_LED_ALL);
    return "";
};

Blockly.Python.io_hub_imports_outputs_rgb_code = function () {
    Blockly.Python.addImport('rgb_all', IMPORT_RGB_ALL);
    return "";
};

Blockly.Python.io_hub_imports_outputs_tiRGBarray_code = function () {
    Blockly.Python.addImport('rgb_arr_all', IMPORT_RGB_ARR_ALL);
    return "";
};

Blockly.Python.io_hub_imports_outputs_speaker_code = function () {
    Blockly.Python.addImport('speaker_all', IMPORT_SPEAKER_ALL);
    return "";
};

Blockly.Python.io_hub_imports_outputs_power_code = function () {
    Blockly.Python.addImport('power_all', IMPORT_POWER_ALL);
    return "";
};

Blockly.Python.io_hub_imports_outputs_continuousServo_code = function () {
    Blockly.Python.addImport('servo_all', IMPORT_SERVO_ALL);
    return "";
};

Blockly.Python.io_hub_imports_outputs_analogout_code = function () {
    Blockly.Python.addImport('analogout_all', IMPORT_ANALOGOUT_ALL);
    return "";
};

Blockly.Python.io_hub_imports_outputs_vibrationMotor_code = function () {
    Blockly.Python.addImport('vibmotor_all', IMPORT_VIBMOTOR_ALL);
    return "";
};

Blockly.Python.io_hub_imports_outputs_relay_code = function () {
    Blockly.Python.addImport('relay_all', IMPORT_RELAY_ALL);
    return "";
};

Blockly.Python.io_hub_imports_outputs_servo_code = function () {
    Blockly.Python.addImport('servo_all', IMPORT_SERVO_ALL);
    return "";
};

Blockly.Python.io_hub_imports_outputs_squarewave_code = function () {
    Blockly.Python.addImport('squarevw_all', IMPORT_SQUAREWV_ALL);
    return "";
};

Blockly.Python.io_hub_imports_outputs_digitalout_code = function () {
    Blockly.Python.addImport('digital_all', IMPORT_DIGITAL_ALL);
    return "";
};

Blockly.Python.io_hub_imports_outputs_bbport_code = function () {
    Blockly.Python.addImport('bbport_all', IMPORT_BBPORT_ALL);
    return "";
};

Blockly.Python.io_hub_imports_outputs_varrelease_code = function () {
    return '.release()';
};

Blockly.Python.io_hub_commands_ti_system_code = function () {
    Blockly.Python.addImport('system_all', IMPORT_SYSTEM_ALL);
    return "";
};

Blockly.Python.io_hub_commands_sleep_code = function () {
    Blockly.Python.addImport('time', IMPORT_TIME);
    return 'time.sleep()';
};

Blockly.Python.io_hub_commands_disp_at_code = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return 'disp_at(,"", "left")';
};

Blockly.Python.io_hub_commands_disp_clear_code = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return 'disp_clr()';
};

Blockly.Python.io_hub_commands_disp_wait_code = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return 'disp_wait()';
};

Blockly.Python.io_hub_commands_disp_cursor_code = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return 'disp_cursor()';
};

Blockly.Python.io_hub_commands_whileNotEscape_code = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return 'while not escape():' + NEWLINE + Blockly.Python.INDENT + 'pass' + NEWLINE;
};

Blockly.Python.io_hub_ports_out1_code = function () {
    return 'OUT 1';
};

Blockly.Python.io_hub_ports_out2_code = function () {
    return 'OUT 2';
};

Blockly.Python.io_hub_ports_out3_code = function () {
    return 'OUT 3';
};

Blockly.Python.io_hub_ports_in1_code = function () {
    return 'IN 1';
};

Blockly.Python.io_hub_ports_in2_code = function () {
    return 'IN 2';
};

Blockly.Python.io_hub_ports_in3_code = function () {
    return 'IN 3';
};

Blockly.Python.io_hub_ports_bb1_code = function () {
    return 'BB 1';
};

Blockly.Python.io_hub_ports_bb2_code = function () {
    return 'BB 2';
};

Blockly.Python.io_hub_ports_bb3_code = function () {
    return 'BB 3';
};

Blockly.Python.io_hub_ports_bb4_code = function () {
    return 'BB 4';
};

Blockly.Python.io_hub_ports_bb5_code = function () {
    return 'BB 5';
};

Blockly.Python.io_hub_ports_bb6_code = function () {
    return 'BB 6';
};

Blockly.Python.io_hub_ports_bb7_code = function () {
    return 'BB 7';
};

Blockly.Python.io_hub_ports_bb8_code = function () {
    return 'BB 8';
};

Blockly.Python.io_hub_ports_bb9_code = function () {
    return 'BB 9';
};

Blockly.Python.io_hub_ports_bb10_code = function () {
    return 'BB 10';
};

Blockly.Python.io_hub_ports_I2C_code = function () {
    return 'I2C';
};

Blockly.Python.io_hub_advanced_imports_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return "";
};

Blockly.Python.io_hub_advanced_connect_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return 'connect("","")';
};

Blockly.Python.io_hub_advanced_disconnect_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return 'disconnect("","")';
};

Blockly.Python.io_hub_advanced_set_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return 'set("","")';
};

Blockly.Python.io_hub_advanced_read_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return 'read("","")';
};

Blockly.Python.io_hub_advanced_calibrate_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return 'calibrate("","")';
};

Blockly.Python.io_hub_advanced_range_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return 'range("","")';
};

Blockly.Python.io_hub_advanced_version_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return 'version("","")';
};

Blockly.Python.io_hub_advanced_begin_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return 'begin()';
};

Blockly.Python.io_hub_advanced_start_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return 'start()';
};

Blockly.Python.io_hub_advanced_about_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return 'about()';
};

Blockly.Python.io_hub_advanced_isti_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return 'isti()';
};

Blockly.Python.io_hub_advanced_what_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return 'what()';
};

Blockly.Python.io_hub_advanced_who_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return 'who()';
};

Blockly.Python.io_hub_advanced_last_error_code = function () {
    Blockly.Python.addImport('ti_hub_all', IMPORT_TI_HUB_ALL);
    return 'last_error()';
};

Blockly.Python.io_hub_advanced_sleep_code = function () {
    Blockly.Python.addImport('time', IMPORT_TIME);
    return 'time.sleep()';
};

// ********* TI_ROVER CATEGORY *********

Blockly.Python.ti_rover_drive_import_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "";
};

Blockly.Python.ti_rover_drive_forward_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.forward(3)" + NEWLINE;
};

Blockly.Python.ti_rover_drive_backward_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.backward(3)" + NEWLINE;
};

Blockly.Python.ti_rover_drive_turn_left_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.left(90)" + NEWLINE;
};

Blockly.Python.ti_rover_drive_turn_right_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.right(90)" + NEWLINE;
};

Blockly.Python.ti_rover_drive_stop_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.stop()" + NEWLINE;
};

Blockly.Python.ti_rover_drive_stay_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.stay(3)" + NEWLINE;
};

Blockly.Python.ti_rover_drive_to_xy_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.to_xy(3, 3)" + NEWLINE;
};

Blockly.Python.ti_rover_drive_to_polar_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.to_polar(3, 3)" + NEWLINE;
};

Blockly.Python.ti_rover_drive_to_angle_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.to_angle(90)" + NEWLINE;
};

Blockly.Python.ti_rover_drive_forward_time_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.forward_time(3)" + NEWLINE;
};

Blockly.Python.ti_rover_drive_backward_time_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.backward_time(3)" + NEWLINE;
};

Blockly.Python.ti_rover_drive_forward_unit_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.forward(3, 'units')" + NEWLINE;
};

Blockly.Python.ti_rover_drive_backward_unit_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.backward(3, 'units')" + NEWLINE;
};

Blockly.Python.ti_rover_drive_left_unit_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.left(90, 'units')" + NEWLINE;
};

Blockly.Python.ti_rover_drive_right_unit_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.right(90, 'units')" + NEWLINE;
};


Blockly.Python.ti_rover_drive_disconnect_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.disconnect_rv()" + NEWLINE;
};

// io Input

Blockly.Python.ti_rover_io_ranger_measurement_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.ranger_measurement()" + NEWLINE;
};

Blockly.Python.ti_rover_io_color_measurement_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.color_measurement()" + NEWLINE;
};

Blockly.Python.ti_rover_io_red_measurement_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.red_measurement()" + NEWLINE;
};

Blockly.Python.ti_rover_io_green_measurement_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.green_measurement()" + NEWLINE;
};

Blockly.Python.ti_rover_io_blue_measurement_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.blue_measurement()" + NEWLINE;
};

Blockly.Python.ti_rover_io_measurement_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.gray_measurement()" + NEWLINE;
};


Blockly.Python.ti_rover_io_encodeurs_gyroscope_measurement_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.encoders_gyro_measurement()" + NEWLINE;
};


Blockly.Python.ti_rover_io_gyroscope_measurement_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.gyro_measurement()" + NEWLINE;
};

Blockly.Python.ti_rover_io_ranger_time_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.ranger_time()" + NEWLINE;
};
// io Output

Blockly.Python.ti_rover_io_color_rgb_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.color_rgb(255, 0, 0)" + NEWLINE;
};

Blockly.Python.ti_rover_io_rgb_blink_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.color_blink(1, 3)" + NEWLINE;
};

Blockly.Python.ti_rover_io_color_off_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.color_off()" + NEWLINE;
};

Blockly.Python.ti_rover_io_motor_left_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.motor_left(255, 3)" + NEWLINE;
};

Blockly.Python.ti_rover_io_motor_right_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.motor_right(255, 3)" + NEWLINE;
};

Blockly.Python.ti_rover_io_motors_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return 'rv.motors("cw", 255,"cw", 150)' + NEWLINE;
};

// IO path

Blockly.Python.ti_rover_io_waypoint_xythdrn_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.waypoint()" + NEWLINE;
};

Blockly.Python.ti_rover_io_waypoint_prev_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.waypoint_prev()" + NEWLINE;
};

Blockly.Python.ti_rover_io_waypoint_etat_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.waypoint_eta()" + NEWLINE;
};

Blockly.Python.ti_rover_io_path_done_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.path_done()" + NEWLINE;
};

Blockly.Python.ti_rover_io_pathlist_x_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.pathlist_x()" + NEWLINE;
};

Blockly.Python.ti_rover_io_pathlist_y_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.pathlist_y()" + NEWLINE;
};

Blockly.Python.ti_rover_io_pathlist_time_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.pathlist_time()" + NEWLINE;
};

Blockly.Python.ti_rover_io_pathlist_heading_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.pathlist_heading()" + NEWLINE;
};

Blockly.Python.ti_rover_io_pathlist_distance_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.pathlist_distance()" + NEWLINE;
};

Blockly.Python.ti_rover_io_pathlist_revs_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.pathlist_revs()" + NEWLINE;
};

Blockly.Python.ti_rover_io_pathlist_cmdnum_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.pathlist_cmdnum()" + NEWLINE;
};

Blockly.Python.ti_rover_io_waypoint_x_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.waypoint_x()" + NEWLINE;
};

Blockly.Python.ti_rover_io_waypoint_y_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.waypoint_y()" + NEWLINE;
};

Blockly.Python.ti_rover_io_waypoint_time_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.waypoint_time()" + NEWLINE;
};

Blockly.Python.ti_rover_io_waypoint_heading_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.waypoint_heading()" + NEWLINE;
};

Blockly.Python.ti_rover_io_waypoint_distance_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.waypoint_distance()" + NEWLINE;
};

Blockly.Python.ti_rover_io_waypoint_revs_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.waypoint_revs()" + NEWLINE;
};

// settings
Blockly.Python.ti_rover_settings_unitss_code = function () {
    return "units/s"
};

Blockly.Python.ti_rover_settings_ms_code = function () {
    return "m/s"
};

Blockly.Python.ti_rover_settings_revss_code = function () {
    return "revs/s"
};

Blockly.Python.ti_rover_settings_units_code = function () {
    return "units"
};

Blockly.Python.ti_rover_settings_m_code = function () {
    return "m"
};

Blockly.Python.ti_rover_settings_revs_code = function () {
    return "revs"
};

Blockly.Python.ti_rover_settings_degrees_code = function () {
    return "degrees"
};

Blockly.Python.ti_rover_settings_radians_code = function () {
    return "radians"
};

Blockly.Python.ti_rover_settings_grads_code = function () {
    return "grads"
};

Blockly.Python.ti_rover_settings_clockwise_code = function () {
    return "cw"
};

Blockly.Python.ti_rover_settings_counterclockwise_code = function () {
    return "ccw"
};
// Commands

Blockly.Python.ti_rover_commands_import_code = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return "";
};

Blockly.Python.ti_rover_commands_sleep_code = function () {
    Blockly.Python.addImport('time', IMPORT_TIME);
    return "time.sleep()" + NEWLINE;
};

Blockly.Python.ti_rover_commands_disp_at_code = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return "disp_at()" + NEWLINE;
};

Blockly.Python.ti_rover_commands_disp_clr_code = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return "disp_clr()" + NEWLINE;
};

Blockly.Python.ti_rover_commands_disp_wait_code = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return "disp_wait()" + NEWLINE;
};

Blockly.Python.ti_rover_commands_disp_cursor_code = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return "disp_cursor()" + NEWLINE;
};

Blockly.Python.ti_rover_commands_whileNOTescape_code = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return "while not escape():" + NEWLINE + Blockly.Python.INDENT + 'pass' + NEWLINE;
};

Blockly.Python.ti_rover_commands_wait_until_done_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.wait_until_done()" + NEWLINE;
};

Blockly.Python.ti_rover_commands_while_not_path_done_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "while not rv.path_done():" + NEWLINE + Blockly.Python.INDENT + "pass" + NEWLINE;
};

Blockly.Python.ti_rover_commands_position_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.position()" + NEWLINE;
};

Blockly.Python.ti_rover_commands_position_angle_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return 'rv.position(,,,"degrees")' + NEWLINE;
};

Blockly.Python.ti_rover_commands_grid_origin_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.grid_origin()" + NEWLINE;
};

Blockly.Python.ti_rover_commands_grid_m_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.grid_m_unit()" + NEWLINE;
};

Blockly.Python.ti_rover_commands_path_clear_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.path_clear()" + NEWLINE;
};

Blockly.Python.ti_rover_commands_zero_gyro_code = function () {
    Blockly.Python.addImport('ti_rover', IMPORT_TI_ROVER);
    return "rv.zero_gyro()" + NEWLINE;
};

// ********* MICROBIT CATEGORY *********

// Commands

Blockly.Python.microbit_sleep_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "sleep(1000)" + NEWLINE;
};

Blockly.Python.microbit_forever_code = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return "while not escape():\n" + Blockly.Python.INDENT + "pass" + NEWLINE;
};

Blockly.Python.microbit_disp_clr_code = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return "disp_clr()" + NEWLINE;
};

Blockly.Python.microbit_store_list_code = function () {
    Blockly.Python.addImport('ti_system', IMPORT_TI_SYSTEM_ALL);
    return 'store_list("",)' + NEWLINE;
};

Blockly.Python.microbit_temperature_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "=temperature()" + NEWLINE;
};

// Display

Blockly.Python.microbit_disp_show_code = function () {
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return 'display.show()' + NEWLINE;
};

Blockly.Python.microbit_disp_scroll_code = function () {
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return "display.scroll()" + NEWLINE;
};

Blockly.Python.microbit_disp_clear_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return "display.clear()" + NEWLINE;
};

Blockly.Python.microbit_disp_set_pixel_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return "display.set_pixel()" + NEWLINE;
};

Blockly.Python.microbit_disp_image_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return "Image(':'':'':'':'':')" + NEWLINE;
};

Blockly.Python.microbit_read_light_level_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "=display.read_light_level()" + NEWLINE;
};

Blockly.Python.microbit_image_heart_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.HEART"`;
};

Blockly.Python.microbit_image_heart_small_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.HEART_SMALL"` + NEWLINE;
};

Blockly.Python.microbit_image_happy_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.HAPPY"` + NEWLINE;
};

Blockly.Python.microbit_image_smile_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.SMILE"` + NEWLINE;
};

Blockly.Python.microbit_image_sad_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.SAD"` + NEWLINE;
};

Blockly.Python.microbit_image_confused_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.CONFUSED"` + NEWLINE;
};

Blockly.Python.microbit_image_angry_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.ANGRY"` + NEWLINE;
};

Blockly.Python.microbit_image_asleep_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.ASLEEP"` + NEWLINE;
};

Blockly.Python.microbit_image_surprised_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.SURPRISED"` + NEWLINE;
};

Blockly.Python.microbit_image_silly_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.SILLY"` + NEWLINE;
};

Blockly.Python.microbit_image_fabulous_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.FABULOUS"` + NEWLINE;
};

Blockly.Python.microbit_image_meh_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.MEH"` + NEWLINE;
};

Blockly.Python.microbit_image_yes_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.YES"` + NEWLINE;
};

Blockly.Python.microbit_image_no_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.NO"` + NEWLINE;
};

Blockly.Python.microbit_image_triangle_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.TRIANGLE"` + NEWLINE;
};

Blockly.Python.microbit_image_triangle_left_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.TRIANGLE_LEFT"` + NEWLINE;
};

Blockly.Python.microbit_image_chessboard_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.CHESSBOARD"` + NEWLINE;
};

Blockly.Python.microbit_image_diamond_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.DIAMOND"` + NEWLINE;
};

Blockly.Python.microbit_image_diamond_small_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.DIAMOND_SMALL"` + NEWLINE;
};

Blockly.Python.microbit_image_square_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.SQUARE"` + NEWLINE;
};

Blockly.Python.microbit_image_square_small_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.SQUARE_SMALL"` + NEWLINE;
};

Blockly.Python.microbit_image_rabbit_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.RABBIT"` + NEWLINE;
};

Blockly.Python.microbit_image_cow_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.COW"` + NEWLINE;
};

Blockly.Python.microbit_image_music_crotchet_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.MUSIC_CROTCHET"` + NEWLINE;
};

Blockly.Python.microbit_image_music_quaver_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.MUSIC_QUAVER"` + NEWLINE;
};

Blockly.Python.microbit_image_music_quavers_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.MUSIC_QUAVERS"` + NEWLINE;
};

Blockly.Python.microbit_image_pitchfork_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.PITCHFORK"` + NEWLINE;
};

Blockly.Python.microbit_image_xmas_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.XMAS"` + NEWLINE;
};

Blockly.Python.microbit_image_pacman_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.PACMAN"` + NEWLINE;
};

Blockly.Python.microbit_image_target_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.TARGET"` + NEWLINE;
};

Blockly.Python.microbit_image_tshirt_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.TSHIRT"` + NEWLINE;
};

Blockly.Python.microbit_image_rollerskate_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.ROLLERSKATE"` + NEWLINE;
};

Blockly.Python.microbit_image_duck_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.DUCK"` + NEWLINE;
};

Blockly.Python.microbit_image_house_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.HOUSE"` + NEWLINE;
};

Blockly.Python.microbit_image_tortoise_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.TORTOISE"` + NEWLINE;
};

Blockly.Python.microbit_image_butterfly_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.BUTTERFLY"` + NEWLINE;
};

Blockly.Python.microbit_image_stickfigure_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.STICKFIGURE"` + NEWLINE;
};

Blockly.Python.microbit_image_ghost_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.GHOST"` + NEWLINE;
};

Blockly.Python.microbit_image_sword_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.SWORD"` + NEWLINE;
};

Blockly.Python.microbit_image_giraffe_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.GIRAFFE"` + NEWLINE;
};

Blockly.Python.microbit_image_skull_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_disp', IMPORT_MB_DISP);
    return `"Image.SKULL"` + NEWLINE;
};

// Audio

Blockly.Python.microbit_audio_play_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_audio', IMPORT_MB_AUDIO);
    return "audio.play()" + NEWLINE;
};

Blockly.Python.microbit_audio_stop_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_audio', IMPORT_MB_AUDIO);
    return "audio.stop()" + NEWLINE;
};

Blockly.Python.microbit_audio_sound_giggle_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_audio', IMPORT_MB_AUDIO);
    return "'Sound.GIGGLE'" + NEWLINE;
};

Blockly.Python.microbit_audio_sound_happy_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_audio', IMPORT_MB_AUDIO);
    return "'Sound.HAPPY'" + NEWLINE;
};

Blockly.Python.microbit_audio_sound_hello_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_audio', IMPORT_MB_AUDIO);
    return "'Sound.HELLO'" + NEWLINE;
};

Blockly.Python.microbit_audio_sound_mysterious_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_audio', IMPORT_MB_AUDIO);
    return "'Sound.MYSTERIOUS'" + NEWLINE;
};

Blockly.Python.microbit_audio_sound_sad_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_audio', IMPORT_MB_AUDIO);
    return "'Sound.SAD'" + NEWLINE;
};

Blockly.Python.microbit_audio_sound_slide_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_audio', IMPORT_MB_AUDIO);
    return "'Sound.SLIDE'" + NEWLINE;
};

Blockly.Python.microbit_audio_sound_soaring_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_audio', IMPORT_MB_AUDIO);
    return "'Sound.SOARING'" + NEWLINE;
};

Blockly.Python.microbit_audio_sound_spring_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_audio', IMPORT_MB_AUDIO);
    return "'Sound.SPRING'" + NEWLINE;
};

Blockly.Python.microbit_audio_sound_twinkle_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_audio', IMPORT_MB_AUDIO);
    return "'Sound.TWINKLE'" + NEWLINE;
};

Blockly.Python.microbit_audio_sound_yawn_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_audio', IMPORT_MB_AUDIO);
    return "'Sound.YAWN'" + NEWLINE;
};

// Music

Blockly.Python.microbit_music_play_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "music.play()" + NEWLINE;
};

Blockly.Python.microbit_music_pitch_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "music.pitch(,)" + NEWLINE;
};

Blockly.Python.microbit_music_set_tempo_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "music.set_tempo(,)" + NEWLINE;
};

Blockly.Python.microbit_music_set_volume_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "music.set_volume()" + NEWLINE;
};

Blockly.Python.microbit_music_note_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "=[]" + NEWLINE;
};

// Melodies

Blockly.Python.microbit_music_melody_dadadadum_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.DADADADUM'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_entertainer_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.ENTERTAINER'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_prelude_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.PRELUDE'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_ode_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.ODE'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_nyan_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.NYAN'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_ringtone_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.RINGTONE'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_funk_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.FUNK'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_blues_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.BLUES'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_birthday_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.BIRTHDAY'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_wedding_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.WEDDING'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_funeral_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.FUNERAL'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_ba_ding_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.BA_DING'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_wawawawaa_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.WAWAWAWAA'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_jump_up_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.JUMP_UP'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_jump_down_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.JUMP_DOWN'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_power_up_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.POWER_UP'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_power_down_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.POWER_DOWN'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_python_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.PYTHON'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_baddy_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.BADDY'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_chase_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.CHASE'" + NEWLINE;
};

Blockly.Python.microbit_music_melody_punchline_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_music', IMPORT_MB_MUSIC);
    return "'music.PUNCHLINE'" + NEWLINE;
};

// Microphone

Blockly.Python.microbit_microphone_sound_level_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_mic', IMPORT_MB_MIC);
    return "=microphone.sound_level()" + NEWLINE;
};

Blockly.Python.microbit_microphone_current_level_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_mic', IMPORT_MB_MIC);
    return "=microphone.current_level()" + NEWLINE;
};

Blockly.Python.microbit_microphone_is_event_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_mic', IMPORT_MB_MIC);
    return "microphone.is_event()" + NEWLINE;
};

Blockly.Python.microbit_microphone_was_event_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_mic', IMPORT_MB_MIC);
    return "microphone.was_event()" + NEWLINE;
};

Blockly.Python.microbit_microphone_set_threshold_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_mic', IMPORT_MB_MIC);
    return "microphone.set_threshold(,)" + NEWLINE;
};

Blockly.Python.microbit_microphone_event_loud_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_mic', IMPORT_MB_MIC);
    return "SoundEvent.LOUD" + NEWLINE;
};

Blockly.Python.microbit_microphone_event_quiet_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_mic', IMPORT_MB_MIC);
    return "SoundEvent.QUIET" + NEWLINE;
};

// Buttons

Blockly.Python.microbit_button_a_is_pressed_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_butns', IMPORT_MB_BUTNS);
    return "button_a.is_pressed()" + NEWLINE;
};

Blockly.Python.microbit_button_b_is_pressed_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_butns', IMPORT_MB_BUTNS);
    return "button_b.is_pressed()" + NEWLINE;
};

Blockly.Python.microbit_button_a_was_pressed_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_butns', IMPORT_MB_BUTNS);
    return "button_a.was_pressed()" + NEWLINE;
};

Blockly.Python.microbit_button_b_was_pressed_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_butns', IMPORT_MB_BUTNS);
    return "button_b.was_pressed()" + NEWLINE;
};

Blockly.Python.microbit_button_a_get_presses_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_butns', IMPORT_MB_BUTNS);
    return "button_a.get_presses()" + NEWLINE;
};

Blockly.Python.microbit_button_b_get_presses_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_butns', IMPORT_MB_BUTNS);
    return "button_b.get_presses()" + NEWLINE;
};

Blockly.Python.microbit_button_logo_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_butns', IMPORT_MB_BUTNS);
    return "pin_logo.is_touched()" + NEWLINE;
};

// Accelerometer

Blockly.Python.microbit_accelerometer_get_x_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "=accelerometer.get_x()" + NEWLINE;
};

Blockly.Python.microbit_accelerometer_get_y_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "=accelerometer.get_y()" + NEWLINE;
};

Blockly.Python.microbit_accelerometer_get_z_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "=accelerometer.get_z()" + NEWLINE;
};

Blockly.Python.microbit_accelerometer_get_values_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return ",,=accelerometer.get_values()" + NEWLINE;
};

Blockly.Python.microbit_accelerometer_magnitude_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "=accelerometer.magnitude()" + NEWLINE;
};

// Compass

Blockly.Python.microbit_compass_heading_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "=compass.heading()" + NEWLINE;
};

Blockly.Python.microbit_compass_get_x_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "=compass.get_x()" + NEWLINE;
};

Blockly.Python.microbit_compass_get_y_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "=compass.get_y()" + NEWLINE;
};

Blockly.Python.microbit_compass_get_z_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "=compass.get_z()" + NEWLINE;
};

Blockly.Python.microbit_compass_is_calibrated_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "=compass.is_calibrated()" + NEWLINE;
};

Blockly.Python.microbit_compass_get_field_strength_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "=compass.get_field_strength()" + NEWLINE;
};

Blockly.Python.microbit_compass_calibrate_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "compass.calibrate()" + NEWLINE;
};

Blockly.Python.microbit_compass_clear_calibration_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "compass.clear_calibration()" + NEWLINE;
};

// Gestures

Blockly.Python.microbit_gestures_current_gesture_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "accelerometer.current_gesture()" + NEWLINE;
};

Blockly.Python.microbit_gestures_is_gesture_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "accelerometer.is_gesture()" + NEWLINE;
};

Blockly.Python.microbit_gestures_was_gesture_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "accelerometer.was_gesture()" + NEWLINE;
};

Blockly.Python.microbit_gestures_up_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "'up'" + NEWLINE;
};

Blockly.Python.microbit_gestures_down_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "'down'" + NEWLINE;
};

Blockly.Python.microbit_gestures_left_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "'left'" + NEWLINE;
}

Blockly.Python.microbit_gestures_right_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "'right'" + NEWLINE;
};

Blockly.Python.microbit_gestures_face_up_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "'face up'" + NEWLINE;
};

Blockly.Python.microbit_gestures_face_down_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "'face down'" + NEWLINE;
};

Blockly.Python.microbit_gestures_shake_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_sensr', IMPORT_MB_SENSR);
    return "'shake'" + NEWLINE;
};

// Radio

Blockly.Python.microbit_radio_on_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_radio', IMPORT_MB_RADIO);
    return "radio.on()" + NEWLINE;
};

Blockly.Python.microbit_radio_off_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_radio', IMPORT_MB_RADIO);
    return "radio.off()" + NEWLINE;
};

Blockly.Python.microbit_radio_config_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_radio', IMPORT_MB_RADIO);
    return "radio.config(length=32, channel=7, power=6, group=0)" + NEWLINE;
};

Blockly.Python.microbit_radio_send_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_radio', IMPORT_MB_RADIO);
    return 'radio.send("")' + NEWLINE;
};

Blockly.Python.microbit_radio_receive_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_radio', IMPORT_MB_RADIO);
    return '=radio.receive()' + NEWLINE;
};

Blockly.Python.microbit_radio_receive_number_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_radio', IMPORT_MB_RADIO);
    return '=radio.receive_number()' + NEWLINE;
};

// Pins

Blockly.Python.microbit_pins_digital_read_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "=.read_digital()" + NEWLINE;
};

Blockly.Python.microbit_pins_digital_write_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return ".write_digital()" + NEWLINE;
};

Blockly.Python.microbit_pins_analog_read_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "=.read_analog()" + NEWLINE;
};

Blockly.Python.microbit_pins_analog_write_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return ".write_analog()" + NEWLINE;
};

Blockly.Python.microbit_pins_analog_set_period_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return ".set_analog_period()" + NEWLINE;
};

Blockly.Python.microbit_pins_pin0_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "pin0" + NEWLINE;
};

Blockly.Python.microbit_pins_pin1_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "pin1" + NEWLINE;
};

Blockly.Python.microbit_pins_pin2_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "pin2" + NEWLINE;
};

Blockly.Python.microbit_pins_pin3_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "pin3" + NEWLINE;
};

Blockly.Python.microbit_pins_pin8_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "pin8" + NEWLINE;
};

Blockly.Python.microbit_pins_pin13_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "pin13" + NEWLINE;
};

Blockly.Python.microbit_pins_pin14_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "pin14" + NEWLINE;
};

Blockly.Python.microbit_pins_pin15_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "pin15" + NEWLINE;
};

Blockly.Python.microbit_pins_pin16_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "pin16" + NEWLINE;
};

Blockly.Python.microbit_pins_pin_speaker_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "'pin_speaker'" + NEWLINE;
};

// Input

Blockly.Python.microbit_grove_input_dht20_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    return ",=grove.read_dht20()" + NEWLINE;
};

Blockly.Python.microbit_grove_input_dht20_temperature_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    return "=grove.read_temperature()" + NEWLINE;
};

Blockly.Python.microbit_grove_input_dht20_lightlevel_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    return "=grove.read_lightlevel()" + NEWLINE;
};

Blockly.Python.microbit_grove_input_dht20_moisture_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    return "=grove.read_moisture()" + NEWLINE;
};

Blockly.Python.microbit_grove_input_dht20_pressure_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    return "=grove.read_pressure()" + NEWLINE;
};

Blockly.Python.microbit_grove_input_dht20_calibrate_pressure_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    return "grove.calibrate_pressure(,)" + NEWLINE;
};

Blockly.Python.microbit_grove_input_ranger_time_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    return "=grove.read_ranger_time()" + NEWLINE;
};

Blockly.Python.microbit_grove_input_ranger_distance_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    return "=grove.read_ranger_cm()" + NEWLINE;
};

Blockly.Python.microbit_grove_input_bme280_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    return ",,=grove.read_bme280()" + NEWLINE;
};

Blockly.Python.microbit_grove_input_sgp30_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    return ",=grove.read_sgp30()" + NEWLINE;
};

// Output

Blockly.Python.microbit_grove_output_power_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    return "grove.power(,)" + NEWLINE;
};

Blockly.Python.microbit_grove_output_relay_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    return "#external power is required!\ngrove.relay(,)" + NEWLINE;
};

Blockly.Python.microbit_grove_output_servo_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_grove', IMPORT_MB_GROVE);
    return "#external power is required!\ngrove.set_servo(,)" + NEWLINE;
};

// Neopixel

Blockly.Python.microbit_neopixel_set_color_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_neopx', IMPORT_MB_NEOPX);
    return "color.rgb(,,)" + NEWLINE;
};

Blockly.Python.microbit_neopixel_set_pin_color_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_neopx', IMPORT_MB_NEOPX);

    return "=Color()" + NEWLINE;
};

Blockly.Python.microbit_neopixel_set_rgb_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_neopx', IMPORT_MB_NEOPX);
    return ".rgb(,,)" + NEWLINE;
};

Blockly.Python.microbit_set_neopixel_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_neopx', IMPORT_MB_NEOPX);
    return "np=NeoPixel('pin1', 20)" + NEWLINE;
};

Blockly.Python.microbit_neopixel_pin0_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "'pin0'" + NEWLINE;
};

Blockly.Python.microbit_neopixel_pin1_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "'pin1'" + NEWLINE;
};

Blockly.Python.microbit_neopixel_pin2_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "'pin2'" + NEWLINE;
};

Blockly.Python.microbit_neopixel_pin13_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "'pin13'" + NEWLINE;
};

Blockly.Python.microbit_neopixel_pin14_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "'pin14'" + NEWLINE;
};

Blockly.Python.microbit_neopixel_pin15_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);

    return "'pin15'" + NEWLINE;
};

Blockly.Python.microbit_neopixel_pin16_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    return "'pin16'" + NEWLINE;
};

// Control

Blockly.Python.microbit_neopixel_set_at_index_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_neopx', IMPORT_MB_NEOPX);
    return "np[]=(,,)" + NEWLINE;
};

Blockly.Python.microbit_neopixel_show_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_neopx', IMPORT_MB_NEOPX);
    return "np.show()" + NEWLINE;
};

Blockly.Python.microbit_neopixel_clear_code = function () {
    Blockly.Python.addImport('microbit_all', IMPORT_MICROBIT_ALL);
    Blockly.Python.addImport('mb_neopx', IMPORT_MB_NEOPX);
    return "np.clear()" + NEWLINE;
};

// ********* CE CATEGORY *********

// ce_box

Blockly.Python.ce_box_define_data_code = function () {
    Blockly.Python.addImport('ce_box', IMPORT_CE_BOX);
    return "data = []" + NEWLINE;
};

Blockly.Python.ce_box_box_code = function () {
    Blockly.Python.addImport('ce_box', IMPORT_CE_BOX);
    return "= box(data)" + NEWLINE;
};

Blockly.Python.ce_box_title_code = function () {
    Blockly.Python.addImport('ce_box', IMPORT_CE_BOX);
    return ".title('Titre')" + NEWLINE;
};

Blockly.Python.ce_box_show_code = function () {
    Blockly.Python.addImport('ce_box', IMPORT_CE_BOX);
    return ".show()" + NEWLINE;
};

// ce_chart

Blockly.Python.ce_chart_define_data_code = function () {
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return 'data = [("",),]' + NEWLINE;
};

Blockly.Python.ce_chart_chart_code = function () {
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return "= chart()" + NEWLINE;
};

Blockly.Python.ce_chart_data_code = function () {
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return ".data()" + NEWLINE;
};

Blockly.Python.ce_chart_title_code = function () {
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return '.title("")' + NEWLINE;
};

Blockly.Python.ce_chart_frequencies_code = function () {
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return '.frequencies()' + NEWLINE;
};

Blockly.Python.ce_chart_show_code = function () {
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return ".show()" + NEWLINE;
};

// Rectangle

Blockly.Python.ce_chart_rectangle_code = function () {
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return '.rectangle(,,,,"")' + NEWLINE;
};

Blockly.Python.ce_chart_area_code = function () {
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return '=.area()' + NEWLINE;
};

Blockly.Python.ce_chart_draw_code = function () {
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return '.draw()' + NEWLINE;
};

Blockly.Python.ce_chart_lambda_code = function () {
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return '.lambda x:' + NEWLINE;
};

Blockly.Python.ce_chart_draw_fx_code = function () {
    Blockly.Python.addImport('ce_chart', IMPORT_CE_CHART);
    return '.draw_fx(,,f,,"")' + NEWLINE;
};

// ********* TURTLE CATEGORY *********

// Mouvement

Blockly.Python.turtle_forward_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.forward()" + NEWLINE;
};

Blockly.Python.turtle_backward_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.backward()" + NEWLINE;
};

Blockly.Python.turtle_left_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.left()" + NEWLINE;
};

Blockly.Python.turtle_right_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.right()" + NEWLINE;
};

Blockly.Python.turtle_goto_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.goto(,)" + NEWLINE;
};

Blockly.Python.turtle_done_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.done()" + NEWLINE;
};

// Draw

Blockly.Python.turtle_fillcolor_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.fillcolor(,,)" + NEWLINE;
};

Blockly.Python.turtle_begin_fill_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.begin_fill()" + NEWLINE;
};

Blockly.Python.turtle_end_fill_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.end_fill()" + NEWLINE;
};

Blockly.Python.turtle_circle_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.circle()" + NEWLINE;
};

Blockly.Python.turtle_dot_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.dot()" + NEWLINE;
};

Blockly.Python.turtle_write_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.write('')" + NEWLINE;
};

// Pen

Blockly.Python.turtle_up_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return NEWLINE + "t.penup()" + NEWLINE;
};

Blockly.Python.turtle_down_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return NEWLINE + "t.pendown()" + NEWLINE;
};

Blockly.Python.turtle_pencolor_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.pencolor(,,)" + NEWLINE;
};

Blockly.Python.turtle_pensize_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "t.pensize()" + NEWLINE;
};

// Settings

Blockly.Python.turtle_clear_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return NEWLINE + "t.clear()" + NEWLINE;
};

Blockly.Python.turtle_show_turtle_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return NEWLINE + "t.showturtle()" + NEWLINE;
};

Blockly.Python.turtle_hide_turtle_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return NEWLINE + "t.hideturtle()" + NEWLINE;
};

Blockly.Python.turtle_hidegrid_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return NEWLINE + "t.hidegrid()" + NEWLINE;
};

Blockly.Python.turtle_speed_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return NEWLINE + "t.speed()" + NEWLINE;
};

// Turtle - State

Blockly.Python.turtle_home_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return NEWLINE + "t.home()" + NEWLINE;
};

Blockly.Python.turtle_setheading_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return NEWLINE + "t.setheading()" + NEWLINE;
};

Blockly.Python.turtle_getx_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "=t.xcor()" + NEWLINE;
};

Blockly.Python.turtle_gety_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "=t.ycor()" + NEWLINE;
};

Blockly.Python.turtle_heading_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "=t.heading()" + NEWLINE;
};

Blockly.Python.turtle_getpos_code = function () {
    Blockly.Python.addImport('turtle', IMPORT_TURTLE_ALL);
    Blockly.Python.addInit('turtle', "t = Turtle()");
    return "=t.pos()" + NEWLINE;
};

// ********* TELLO CATEGORY *********

Blockly.Python.tello_takeoff_code = function () {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    return "tello.takeoff()" + NEWLINE;
};

Blockly.Python.tello_land_code = function () {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    return "tello.land()" + NEWLINE;
};

Blockly.Python.tello_forward_code = function () {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    return "tello.forward()" + NEWLINE;
};

Blockly.Python.tello_backward_code = function () {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    return "tello.backward()" + NEWLINE;
};

Blockly.Python.tello_turn_right_code = function () {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    return "tello.turn_right()" + NEWLINE;
};

Blockly.Python.tello_turn_left_code = function () {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    return "tello.turn_left()" + NEWLINE;
};

Blockly.Python.tello_fly_right_code = function () {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    return "tello.fly_right()" + NEWLINE;
};

Blockly.Python.tello_fly_left_code = function () {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    return "tello.fly_left()" + NEWLINE;
};

Blockly.Python.tello_up_code = function () {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    return "tello.up()" + NEWLINE;
};

Blockly.Python.tello_down_code = function () {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    return "tello.down()" + NEWLINE;
};

Blockly.Python.tello_getAltitude_code = function () {
    Blockly.Python.addImport('tello', IMPORT_TELLO_ALL);
    return "tello.altitude()" + NEWLINE;
};