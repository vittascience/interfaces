/**
 * @fileoverview Blocks for TI-83 Premium CE - code version.
 */

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT

    // ********* PROCEDURES CATEGORY *********

    // def no return
    {
        "type": "procedures_defnoreturn_ti",
        "message0": "1: def fonction():"
    },
    // def return
    {
        "type": "procedures_return_ti",
        "message0": "2: return"
    },

    // ********* CONTROL CATEGORY *********

    // if
    {
        "type": "controls_if_code",
        "message0": "1: if ..",
    },
    // if else
    {
        "type": "controls_if_else_code",
        "message0": "2: if .. else ..",
    },
    // if elif else
    {
        "type": "controls_if_elif_else_code",
        "message0": "3: if .. elif .. else ..",
    },
    // for i in range(len)
    {
        "type": "controls_repeat_code",
        "message0": "4: for i in range(taille):",
        "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    },
    // for i in range
    {
        "type": "controls_repeat_start_end_code",
        "message0": "5: for i in range(début, fin):",
        "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    },
    // for i in range step
    {
        "type": "controls_repeat_start_end_step_code",
        "message0": "6: for i in range(début, fin, pas):",
        "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    },
    // for i in list
    {
        "type": "controls_repeat_list_code",
        "message0": "7: for i in liste:",
        "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    },
    // while until
    {
        "type": "controls_whileUntil_code",
        "message0": "8: while condition:",
    },
    // elif
    {
        "type": "controls_elif_code",
        "message0": "9: elif :",
    },
    // else
    {
        "type": "controls_else_code",
        "message0": "0: else :",
    },

    // ********* OPERATORS CATEGORY *********

    // equal
    {
        "type": "ops_equal_code",
        "message0": "1: x = y  [sto ->]",
    },
    // stricly equal
    {
        "type": "ops_strictly_equal_code",
        "message0": "2: x == y  égal",
    },
    // different
    {
        "type": "ops_different_code",
        "message0": "3: x != y  différent de",
    },
    // greater
    {
        "type": "ops_greater_code",
        "message0": "4: x > y",
    },
    // greater or equal
    {
        "type": "ops_greater_equal_code",
        "message0": "5: x >= y",
    },
    // lower
    {
        "type": "ops_lower_code",
        "message0": "6: x < y",
    },
    // lower or equal
    {
        "type": "ops_lower_equal_code",
        "message0": "7: x <= y",
    },
    // and
    {
        "type": "ops_and_code",
        "message0": "8: and",
    },
    // or
    {
        "type": "ops_or_code",
        "message0": "9: or",
    },
    // not
    {
        "type": "ops_not_code",
        "message0": "0: not",
    },
    // True
    {
        "type": "ops_true_code",
        "message0": "A: True",
    },
    // False
    {
        "type": "ops_false_code",
        "message0": "B: False",
    },

    // ********* LISTS CATEGORY *********

    {
        "type": 'list_create_code',
        "message0": '1: [   ]',
    },
    {
        "type": 'list_sequence_code',
        "message0": '2: list(séquence)',
    },
    //length
    {
        "type": 'list_length_code',
        "message0": '3: len()',
    },
    //max
    {
        "type": 'list_max_code',
        "message0": '4: max()',
    },
    //min
    {
        "type": 'list_min_code',
        "message0": '5: min()',
    },
    //append
    {
        "type": 'list_append_code',
        "message0": '6: .append(x)',
    },
    //remove
    {
        "type": 'list_remove_code',
        "message0": '7: .remove(x)',
    },
    //insert
    {
        "type": 'list_insert_code',
        "message0": '8: .insert(indice, x)',

    },
    //sum
    {
        "type": 'list_sum_code',
        "message0": '9: sum()',
    },
    //sort
    {
        "type": 'list_sorted_code',
        "message0": '0: sorted()',
    },
    //sort
    {
        "type": 'list_sort_code',
        "message0": 'A: .sort()',
    },
    //count
    {
        "type": 'list_count_code',
        "message0": 'B: .count()',
    },

    // ********* TYPES CATEGORY *********

    // int
    {
        "type": 'type_int_code',
        "message0": '1: int()',
    },
    // float
    {
        "type": 'type_float_code',
        "message0": '2: float()',
    },
    // round
    {
        "type": 'type_round_code',
        "message0": '3: round()',
    },
    // str
    {
        "type": 'type_str_code',
        "message0": '4: str()',
    },
    // complex
    {
        "type": 'type_complex_code',
        "message0": '5: complex(real, imag)',
    },
    // type
    {
        "type": 'type_type_code',
        "message0": '6: type()',
    },

    // ********* IO CATEGORY *********

    // print()
    {
        "type": "ti_io_print_code",
        "message0": "1: print()",
    },
    // input()
    {
        "type": "ti_io_input_code",
        "message0": "2: input()",
    },
    // eval()
    {
        "type": "io_eval_code",
        "message0": "3: eval()",
    },
    // str.format()
    {
        "type": "io_str_format_code",
        "message0": "4: str.format() format de chaîne",
    },

    // ********* MATH CATEGORY *********

    // improt math
    {
        "type": "math_import_code",
        "message0": "1: from math import *",
    },
    // fabs
    {
        "type": 'math_fabs_code',
        "message0": '2: fabs()',
    },
    // sqrt 
    {
        "type": "math_sqrt_code",
        "message0": "3: sqrt()",
    },
    // exp
    {
        "type": "math_exp_code",
        "message0": "4: exp()",
    },
    // pow
    {
        "type": "math_pow_code",
        "message0": "5: pow(x, y)",
    },
    // log
    {
        "type": "math_log_code",
        "message0": "6: log(x, base)",
    },
    // fmod
    {
        "type": "math_fmod_code",
        "message0": "7: fmod(x, y)",
    },
    // ceil
    {
        "type": "math_ceil_code",
        "message0": "8: ceil(x)",
    },
    // floor
    {
        "type": "math_floor_code",
        "message0": "9: floor()",
    },
    // trunc
    {
        "type": "math_trunc_code",
        "message0": "0: trunc()",
    },
    // frexp
    {
        "type": "math_frexp_code",
        "message0": "A: frexp()",
    },
    // e 
    {
        "type": "math_const_e_code",
        "message0": "1: e",
    },
    // pi
    {
        "type": "math_const_pi_code",
        "message0": "2: pi",
    },
    // trig radians
    {
        "type": "math_trig_radians_code",
        "message0": "1: radians()   degrès > radians",
    },
    // degrees
    {
        "type": "math_trig_degrees_code",
        "message0": "2: degrees()   radians > degrès",
    },
    // sin
    {
        "type": "math_trig_sin_code",
        "message0": "3: sin()",
    },
    // cos
    {
        "type": "math_trig_cos_code",
        "message0": "4: cos()",
    },
    // tan
    {
        "type": "math_trig_tan_code",
        "message0": "5: tan()",
    },
    // asin
    {
        "type": "math_trig_asin_code",
        "message0": "6: asin()",
    },
    // acos
    {
        "type": "math_trig_acos_code",
        "message0": "7: acos()",
    },
    // atan
    {
        "type": "math_trig_atan_code",
        "message0": "8: atan()",
    },
    // atan2
    {
        "type": "math_trig_atan2_code",
        "message0": "9: atan2(x, y)",
    },

    // ********* RANDOM CATEGORY *********

    // import random
    {
        "type": "math_random_import_code",
        "message0": "1: from random import *",
    },
    // random
    {
        "type": "math_random_random_code",
        "message0": "2: random()",
    },
    // random uniform
    {
        "type": "math_random_uniform_code",
        "message0": "3: uniform(min, max)",
    },
    // random randint
    {
        "type": "math_random_randint_code",
        "message0": "4: randint(min, max)",
    },
    // random choice
    {
        "type": "math_random_choice_code",
        "message0": "5: choice(séquence)",
    },
    // randrange
    {
        "type": "math_random_randrange_code",
        "message0": "6: randrange(début, fin, pas)",
    },
    // seed
    {
        "type": "math_random_seed_code",
        "message0": "7: seed()",
    },

    // ********* TIME CATEGORY *********

    // import time 
    {
        "type": "time_import_code",
        "message0": "1: from time import *",
    },
    // time.sleep()
    {
        "type": "time_sleep_code",
        "message0": "2: sleep(secondes)",
    },
    // monotonic
    {
        "type": "time_monotonic_code",
        "message0": "3: monotonic()     temps écoulé",
    },

    // ********* TI_SYSTEM CATEGORY *********

    // import ti_system
    {
        "type": "ti_system_import_code",
        "message0": "1: from ti_system import *",
    },
    // recall_list
    {
        "type": "ti_system_recall_list_code",
        "message0": '2: var=recall_list("nom")      1-6',
    },
    // store_list
    {
        "type": "ti_system_store_list_code",
        "message0": '3: store_list("nom", var)      1-6',
    },
    // recall_RegEQ
    {
        "type": "ti_system_recall_RegEQ_code",
        "message0": '4: var=recall_RegEQ()',
    },
    // while condition
    {
        "type": "ti_system_while_condition_code",
        "message0": '5: while not escape():     [annul]',
    },
    // if escape:break
    {
        "type": "ti_system_if_condition_code",
        "message0": '6: if escape():break     [annul]',
    },
    // disp_at
    {
        "type": "ti_system_disp_at_code",
        "message0": '7: disp_at(ligne, "texte", "align")',
    },
    // disp_clr
    {
        "type": "ti_system_disp_clr_code",
        "message0": '8: disp_clr()     efface texte',
    },
    // disp_wait
    {
        "type": "ti_system_disp_wait_code",
        "message0": '9: disp_wait()     [annul]',
    },
    // disp cursor
    {
        "type": "ti_system_disp_cursor_code",
        "message0": '0: disp_cursor()     0=Naff 1=aff',
    },
    // sleep
    {
        "type": "ti_system_sleep_code",
        "message0": 'A: sleep(secondes)',
    },
    // wait_key
    {
        "type": "ti_system_wait_key_code",
        "message0": 'B: wait_key()',
    },

    // ********* TI_PLOTLIB CATEGORY *********

    //import 
    {
        "type": "ti_plotlib_import_code",
        "message0": "1: import ti_plotlib as plt"
    },
    // cls
    {
        "type": "ti_plotlib_cls_code",
        "message0": "2: cls()   effacer l'écran"
    },
    // grid
    {
        "type": "ti_plotlib_grid_code",
        "message0": '3: grid(xscl, yscl, "type")'
    },
    // window
    {
        "type": "ti_plotlib_window_code",
        "message0": '4: window(xmin, xmax, ymin, ymax)'
    },
    // auto window
    {
        "type": "ti_plotlib_auto_window_code",
        "message0": '5: auto_window(xlist, ylist)'
    },
    // axes
    {
        "type": "ti_plotlib_axes_code",
        "message0": '6: axes("mode")'
    },
    // labels
    {
        "type": "ti_plotlib_labels_code",
        "message0": '7: labels("xétiq", "yétiq", y)'
    },
    // title
    {
        "type": "ti_plotlib_title_code",
        "message0": '8: title("titre")'
    },
    // show plot
    {
        "type": "ti_plotlib_show_plot_code",
        "message0": '9: show_plot()     afficher > [annul]'
    },
    // define color
    {
        "type": "ti_plotlib_define_color_code",
        "message0": '1: color(r, v, b)     0-255'
    },
    // cls
    {
        "type": "ti_plotlib_draw_cls_code",
        "message0": "2: cls()   effacer l'écran"
    },
    //show plot
    {
        "type": "ti_plotlib_draw_show_plot_code",
        "message0": '3: show_plot()     afficher > [annul]'
    },
    // scatter
    {
        "type": "ti_plotlib_scatter_code",
        "message0": '4: scatter(xlist, ylist, "marq")'
    },
    // plot
    {
        "type": "ti_plotlib_plot_code",
        "message0": '5: plot(xlist, ylist, "marq")'
    },
    // line 
    {
        "type": "ti_plotlib_line_code",
        "message0": '6: line(x1, y1, x2, y2, "mode")'
    },
    // lin reg
    {
        "type": "ti_plotlib_lin_reg_code",
        "message0": '7: lin_reg(xlist, ylist, "aff")'
    },
    // pen
    {
        "type": "ti_plotlib_pen_code",
        "message0": '8: pen("taille", "type")'
    },
    // text at
    {
        "type": "ti_plotlib_text_at_code",
        "message0": '9: text_at(ligne, "texte", "align")'
    },
    // props
    {
        "type": "ti_plotlib_xmin_code",
        "message0": '1: xmin    défaut = -10.00'
    },
    {
        "type": "ti_plotlib_xmax_code",
        "message0": '2: xmax    défaut = 10.00'
    },
    {
        "type": "ti_plotlib_ymin_code",
        "message0": '3: ymin    défaut = -6.56'
    },
    {
        "type": "ti_plotlib_ymax_code",
        "message0": '4: ymax    défaut = 6.56'
    },
    {
        "type": "ti_plotlib_a_code",
        "message0": '5: a    gradient; pente'
    },
    {
        "type": "ti_plotlib_b_code",
        "message0": '6: b    ordonnée à l\'origine'
    },

    // ********* TI_DRAW CATEGORY *********

    // line
    {
        "type": "ti_draw_draw_line_code",
        "message0": "1: draw_line(x1, y1, x2, y2)"
    },
    // rect
    {
        "type": "ti_draw_draw_rect_code",
        "message0": "2: draw_rect(x, y, w, h)"
    },
    // fill rect
    {
        "type": "ti_draw_fill_rect_code",
        "message0": "3: draw_fill_rect(x, y, w, h)"
    },
    // circle
    {
        "type": "ti_draw_draw_circle_code",
        "message0": "4: draw_circle(x, y, r)"
    },
    // fill circle
    {
        "type": "ti_draw_fill_circle_code",
        "message0": "5: draw_fill_circle(x, y, r)"
    },
    // text
    {
        "type": "ti_draw_draw_text_code",
        "message0": '6: draw_text(x, y, "string")'
    },
    // polygon
    {
        "type": "ti_draw_draw_poly_code",
        "message0": "7: draw_poly(x-list, y-list)"
    },
    // fill polygon
    {
        "type": "ti_draw_fill_poly_code",
        "message0": "8: draw_fill_poly(x-list, y-list)"
    },
    // plot xy
    {
        "type": "ti_draw_plot_xy_code",
        "message0": "9: plot_xy(x, y, shape)    sh=1-13"
    },
    // clear
    {
        "type": "ti_draw_clear_code",
        "message0": "0: clear()"
    },
    // set_color
    {
        "type": "ti_draw_set_color_code",
        "message0": "1: set_color(r, g, b)  0-255"
    },
    // set_pen
    {
        "type": "ti_draw_set_pen_code",
        "message0": '2: set_pen("size", "style")'
    },
    //show_draw
    {
        "type": "ti_draw_show_code",
        "message0": "3: show_draw()     [clear]"
    },

    // ********* TI_HUB CATEGORY *********

    //imports builtins
    {
        "type": "io_hub_imports_builtins_color_code",
        "message0": '1: Color   DEL RVG de sortie'
    },
    {
        "type": "io_hub_imports_builtins_light_code",
        "message0": '2: Light   DEL Rouge de sortie'
    },
    {
        "type": "io_hub_imports_builtins_sound_code",
        "message0": '3: Sound   Sortie son'
    },
    {
        "type": "io_hub_imports_builtins_brightness_code",
        "message0": '4: Brightness   Entrée de lumière'
    },
    //imports inputs
    {
        "type": "io_hub_imports_inputs_dht_code",
        "message0": '1: DHT   Humidité et Temp'
    },
    {
        "type": "io_hub_imports_inputs_ranger_code",
        "message0": '2: Ranger'
    },
    {
        "type": "io_hub_imports_inputs_lightLevel_code",
        "message0": '3: Light Level'
    },
    {
        "type": "io_hub_imports_inputs_temperature_code",
        "message0": '4: Temperature'
    },
    {
        "type": "io_hub_imports_inputs_moisture_code",
        "message0": '5: Moisture'
    },
    {
        "type": "io_hub_imports_inputs_magnetic_code",
        "message0": '6: Magnetic'
    },
    {
        "type": "io_hub_imports_inputs_vernier_code",
        "message0": '7: Vernier Entrée TI-SensorLink'
    },
    {
        "type": "io_hub_imports_inputs_analogin_code",
        "message0": '8: Analog in'
    },
    {
        "type": "io_hub_imports_inputs_digitalin_code",
        "message0": '9: Digital in'
    },
    {
        "type": "io_hub_imports_inputs_potentiometer_code",
        "message0": '0: Potentiometer'
    },
    {
        "type": "io_hub_imports_inputs_thermistors_code",
        "message0": 'A: Thermistors'
    },
    {
        "type": "io_hub_imports_inputs_loundness_code",
        "message0": 'B: Loundness'
    },
    {
        "type": "io_hub_imports_inputs_color_code",
        "message0": 'C: Color Input'
    },
    {
        "type": "io_hub_imports_inputs_bbports_code",
        "message0": "D: BB Ports Port Platine d'essais"
    },
    {
        "type": "io_hub_imports_inputs_hubtime_code",
        "message0": "E: Hub Time Comptage de temps"
    },
    {
        "type": "io_hub_imports_inputs_tiRGBarray_code",
        "message0": "F: TI-RGB Array Entrée|Sortie"
    },
    {
        "type": "io_hub_imports_inputs_varrelease_code",
        "message0": "G: var.release()"
    },
    //imports outputs
    //LED
    {
        "type": "io_hub_imports_outputs_led_code",
        "message0": '1: LED'
    },
    //RGB
    {
        "type": "io_hub_imports_outputs_rgb_code",
        "message0": '2: RGB'
    },
    // TI-RGB Array
    {
        "type": "io_hub_imports_outputs_tiRGBarray_code",
        "message0": '3: TI-RGB Array Entrée|Sortie'
    },
    //Speaker
    {
        "type": "io_hub_imports_outputs_speaker_code",
        "message0": '4: Speaker Sortie haut-parleur'
    },
    // Power
    {
        "type": "io_hub_imports_outputs_power_code",
        "message0": '5: Power'
    },
    //Continuous Servo
    {
        "type": "io_hub_imports_outputs_continuousServo_code",
        "message0": '6: Continuous Servo'
    },
    //Analog out
    {
        "type": "io_hub_imports_outputs_analogout_code",
        "message0": '7: Analog out'
    },
    // Vibration Motor
    {
        "type": "io_hub_imports_outputs_vibrationMotor_code",
        "message0": '8: Vibration Motor'
    },
    // Relay
    {
        "type": "io_hub_imports_outputs_relay_code",
        "message0": '9: Relay'
    },
    //Servo
    {
        "type": "io_hub_imports_outputs_servo_code",
        "message0": '0: Servo'
    },
    //Squarwave
    {
        "type": "io_hub_imports_outputs_squarewave_code",
        "message0": 'A: Squarewave'
    },
    //Digital out
    {
        "type": "io_hub_imports_outputs_digitalout_code",
        "message0": 'B: Digital out'
    },
    //BB Port
    {
        "type": "io_hub_imports_outputs_bbport_code",
        "message0": "C: BB Port Port Platine d'essais"
    },
    //var.release()
    {
        "type": "io_hub_imports_outputs_varrelease_code",
        "message0": "D: var.release()"
    },
    //Commands
    {
        "type": "io_hub_commands_ti_system_code",
        "message0": '1: from ti_system import *'
    },
    {
        "type": "io_hub_commands_sleep_code",
        "message0": '2: sleep(secondes)'
    },
    {
        "type": "io_hub_commands_disp_at_code",
        "message0": '3: disp.at(ligne, "txt", "align")'
    },
    {
        "type": "io_hub_commands_disp_clear_code",
        "message0": '4: disp.clr() efface texte'
    },
    {
        "type": "io_hub_commands_disp_wait_code",
        "message0": '5: disp.wait()     [annul]'
    },
    {
        "type": "io_hub_commands_disp_cursor_code",
        "message0": '6: disp.cursor()  0=Naff 1=aff'
    },
    {
        "type": "io_hub_commands_whileNotEscape_code",
        "message0": '7: while not escape()   [annul]'
    },
    // Ports
    {
        "type": "io_hub_ports_out1_code",
        "message0": '1: OUT 1'
    },
    {
        "type": "io_hub_ports_out2_code",
        "message0": '2: OUT 2'
    },
    {
        "type": "io_hub_ports_out3_code",
        "message0": '3: OUT 3'
    },
    {
        "type": "io_hub_ports_in1_code",
        "message0": '4: IN 1'
    },
    {
        "type": "io_hub_ports_in2_code",
        "message0": '5: IN 2'
    },
    {
        "type": "io_hub_ports_in3_code",
        "message0": '6: IN 3'
    },
    {
        "type": "io_hub_ports_bb1_code",
        "message0": '7: BB 1'
    },
    {
        "type": "io_hub_ports_bb2_code",
        "message0": '8: BB 2'
    },
    {
        "type": "io_hub_ports_bb3_code",
        "message0": '9: BB 3'
    },
    {
        "type": "io_hub_ports_bb4_code",
        "message0": '0: BB 4'
    },
    {
        "type": "io_hub_ports_bb5_code",
        "message0": 'A: BB 5'
    },
    {
        "type": "io_hub_ports_bb6_code",
        "message0": 'B: BB 6'
    },
    {
        "type": "io_hub_ports_bb7_code",
        "message0": 'C: BB 7'
    },
    {
        "type": "io_hub_ports_bb8_code",
        "message0": 'D: BB 8'
    },
    {
        "type": "io_hub_ports_bb9_code",
        "message0": 'E: BB 9'
    },
    {
        "type": "io_hub_ports_bb10_code",
        "message0": 'F: BB 10'
    },
    {
        "type": "io_hub_ports_I2C_code",
        "message0": 'G: I2C'
    },
    // Advanced
    {
        "type": "io_hub_advanced_imports_code",
        "message0": '1: from ti_hub import *'
    },
    {
        "type": "io_hub_advanced_connect_code",
        "message0": '2: connect("obj","arg")'
    },
    {
        "type": "io_hub_advanced_disconnect_code",
        "message0": '3: disconnect("obj", "arg")'
    },
    {
        "type": "io_hub_advanced_set_code",
        "message0": '4: set("obj", "arg")'
    },
    {
        "type": "io_hub_advanced_read_code",
        "message0": '5: read("obj", "arg")'
    },
    {
        "type": "io_hub_advanced_calibrate_code",
        "message0": '6: calibrate("obj", "arg")'
    },
    {
        "type": "io_hub_advanced_range_code",
        "message0": '7: range("obj", "arg")'
    },
    {
        "type": "io_hub_advanced_version_code",
        "message0": '8: version()'
    },
    {
        "type": "io_hub_advanced_begin_code",
        "message0": '9: begin()'
    },
    {
        "type": "io_hub_advanced_start_code",
        "message0": '0: start()'
    },
    {
        "type": "io_hub_advanced_about_code",
        "message0": 'A: about()'
    },
    {
        "type": "io_hub_advanced_isti_code",
        "message0": 'B: isti()'
    },
    {
        "type": "io_hub_advanced_what_code",
        "message0": 'C: what()'
    },
    {
        "type": "io_hub_advanced_who_code",
        "message0": 'D: who()'
    },
    {
        "type": "io_hub_advanced_last_error_code",
        "message0": 'E: last_error()'
    },
    {
        "type": "io_hub_advanced_sleep_code",
        "message0": 'F: sleep()'
    },

    // ********* TI_ROVER CATEGORY *********

    // rover drive
    {
        "type": "ti_rover_drive_import_code",
        "message0": "1: import ti_rover as rv"
    },
    {
        "type": "ti_rover_drive_forward_code",
        "message0": "2: forward(distance)   unité"
    },
    {
        "type": "ti_rover_drive_backward_code",
        "message0": "3: backward(distance)    unité"
    },
    {
        "type": "ti_rover_drive_turn_right_code",
        "message0": "4: right(angle)    degrés"
    },
    {
        "type": "ti_rover_drive_turn_left_code",
        "message0": "5: left(angle)    degrés"
    },
    {
        "type": "ti_rover_drive_stop_code",
        "message0": "6: stop()"
    },
    {
        "type": "ti_rover_drive_resume_code",
        "message0": "7: resume()"
    },
    {
        "type": "ti_rover_drive_stay_code",
        "message0": "8: stay(temps)    secondes"
    },
    {
        "type": "ti_rover_drive_to_xy_code",
        "message0": "9: to_xy(x,y)"
    },
    {
        "type": "ti_rover_drive_to_polar_code",
        "message0": "0: to_polar(r,theta)    degrés"
    },
    {
        "type": "ti_rover_drive_to_angle_code",
        "message0": "A: to_angle(angle)    degrés"
    },
    {
        "type": "ti_rover_drive_forward_time_code",
        "message0": "B: forward_time(temps)    secondes"
    },
    {
        "type": "ti_rover_drive_backward_time_code",
        "message0": "C: backward_time(temps)    secondes"
    },
    {
        "type": "ti_rover_drive_forward_unit_code",
        "message0": 'D: forward(distance, "unité")'
    },
    {
        "type": "ti_rover_drive_backward_unit_code",
        "message0": 'E: backward(distance, "unité")'
    },
    {
        "type": "ti_rover_drive_left_unit_code",
        "message0": 'F: left(angle, "unité")    degrés'
    },
    {
        "type": "ti_rover_drive_right_unit_code",
        "message0": 'G: right(angle, "unité")    degrés'
    },
    {
        "type": "ti_rover_drive_disconnect_code",
        "message0": "H: disconnect_rv()"
    },
    // Rover IO cat
    // io input
    {
        "type": "ti_rover_io_ranger_measurement_code",
        "message0": "1: ranger_measurement()  mètres"
    },
    {
        "type": "ti_rover_io_color_measurement_code",
        "message0": "2: color_measurement()  1-9"
    },
    {
        "type": "ti_rover_io_red_measurement_code",
        "message0": "3: red_measurement()  1-255"
    },
    {
        "type": "ti_rover_io_green_measurement_code",
        "message0": "4: green_measurement()  1-255"
    },
    {
        "type": "ti_rover_io_blue_measurement_code",
        "message0": "5: blue_measurement()  1-255"
    },
    {
        "type": "ti_rover_io_gray_measurement_code",
        "message0": "6: gray_measurement()  1-255"
    },
    {
        "type": "ti_rover_io_encodeurs_gyroscope_measurement_code",
        "message0": "7: encodeur_gyro_measurement()"
    },
    {
        "type": "ti_rover_io_gyroscope_measurement_code",
        "message0": "8: gyro_measurement()  degrés"
    },
    {
        "type": "ti_rover_io_ranger_time_code",
        "message0": "9: ranger_time()  seconds"
    },
    // io output
    {
        "type": "ti_rover_io_color_rgb_code",
        "message0": "1: color_rgb(r,v,b)  0-255"
    },
    {
        "type": "ti_rover_io_rgb_blink_code",
        "message0": "2: rgb_blink(freq, temps)"
    },
    {
        "type": "ti_rover_io_color_off_code",
        "message0": "3: color_off()"
    },
    {
        "type": "ti_rover_io_motor_left_code",
        "message0": "4: motor_left(vitesse, temps)  ±255"
    },
    {
        "type": "ti_rover_io_motor_right_code",
        "message0": "5: motor_right(vitesse, temps)  ±255"
    },
    {
        "type": "ti_rover_io_motors_code",
        "message0": '6: motors("dirG", G, "dirD", D, T)'
    },
    // IO path
    {
        "type": "ti_rover_io_waypoint_xythdrn_code",
        "message0": "1: waypoint_xythdrn()"
    },
    {
        "type": "ti_rover_io_waypoint_prev_code",
        "message0": "2: waypoint_prev()"
    },
    {
        "type": "ti_rover_io_waypoint_etat_code",
        "message0": "3: waypoint_eta()"
    },
    {
        "type": "ti_rover_io_path_done_code",
        "message0": "4: path_done()"
    },
    {
        "type": "ti_rover_io_pathlist_x_code",
        "message0": "5: pathlist_x()"
    },
    {
        "type": "ti_rover_io_pathlist_y_code",
        "message0": "6: pathlist_y()"
    },
    {
        "type": "ti_rover_io_pathlist_time_code",
        "message0": "7: pathlist_time()"
    },
    {
        "type": "ti_rover_io_pathlist_heading_code",
        "message0": "8: pathlist_heading()"
    },
    {
        "type": "ti_rover_io_pathlist_distance_code",
        "message0": "9: pathlist_distance()"
    },
    {
        "type": "ti_rover_io_pathlist_revs_code",
        "message0": "0: pathlist_revs()"
    },
    {
        "type": "ti_rover_io_pathlist_cmdnum_code",
        "message0": "A: pathlist_cmdnum()"
    },
    {
        "type": "ti_rover_io_waypoint_x_code",
        "message0": "B: waypoint_x()"
    },
    {
        "type": "ti_rover_io_waypoint_y_code",
        "message0": "C: waypoint_y()"
    },
    {
        "type": "ti_rover_io_waypoint_time_code",
        "message0": "D: waypoint_time()"
    },
    {
        "type": "ti_rover_io_waypoint_heading_code",
        "message0": "E: waypoint_heading()"
    },
    {
        "type": "ti_rover_io_waypoint_distance_code",
        "message0": "F: waypoint_distance()"
    },
    {
        "type": "ti_rover_io_waypoint_revs_code",
        "message0": "G: waypoint_revs()"
    },
    
    // settings
    {
        "type": "ti_rover_settings_unitss_code",
        "message0": "1: units/s"
    },
    {
        "type": "ti_rover_settings_ms_code",
        "message0": "2: m/s"
    },
    {
        "type": "ti_rover_settings_revss_code",
        "message0": "3: revs/s"
    },
    {
        "type": "ti_rover_settings_units_code",
        "message0": "4: units"
    },
    {
        "type": "ti_rover_settings_m_code",
        "message0": "5: m"
    },
    {
        "type": "ti_rover_settings_revs_code",
        "message0": "6: revs"
    },
    {
        "type": "ti_rover_settings_degrees_code",
        "message0": "7: degrees   degrés"
    },
    {
        "type": "ti_rover_settings_radians_code",
        "message0": "8: radians"
    },
    {
        "type": "ti_rover_settings_grads_code",
        "message0": "9: grads"
    },
    {
        "type": "ti_rover_settings_clockwise_code",
        "message0": "0: clockwise   horaire"
    },
    {
        "type": "ti_rover_settings_counterclockwise_code",
        "message0": "A: counterclockwise  anti-horaire"
    },
    // Commands
    {
        "type": "ti_rover_commands_import_code",
        "message0": "1: from ti_system import *"
    },
    {
        "type": "ti_rover_commands_sleep_code",
        "message0": "2: sleep(secondes)"
    },
    {
        "type": "ti_rover_commands_disp_at_code",
        "message0": '3: disp_at(ligne, "txt", "align")'
    },
    {
        "type": "ti_rover_commands_disp_clr_code",
        "message0": "4: disp_clr()    efface texte"
    },
    {
        "type": "ti_rover_commands_disp_wait_code",
        "message0": "5: disp_wait()    [annul]"
    },
    {
        "type": "ti_rover_commands_disp_cursor_code",
        "message0": "6: disp_cursor()    0=Naff 1=aff"
    },
    {
        "type": "ti_rover_commands_whileNOTescape_code",
        "message0": "7: while not escape():   [annul]"
    },
    {
        "type": "ti_rover_commands_wait_until_done_code",
        "message0": "8: wait_until_done()"
    },
    {
        "type": "ti_rover_commands_while_not_path_done_code",
        "message0": "9: while not path_done():"
    },
    {
        "type": "ti_rover_commands_position_code",
        "message0": "0: position(x, y)"
    },
    {
        "type": "ti_rover_commands_position_angle_code",
        "message0": 'A: position(x, y, direct, "unité")'
    },
    {
        "type": "ti_rover_commands_grid_origin_code",
        "message0": 'B: grid_origin()'
    },
    {
        "type": "ti_rover_commands_grid_m_code",
        "message0": "C: grid_m_unit(valeur d'échelle)"
    },
    {
        "type": "ti_rover_commands_path_clear_code",
        "message0": "D: path_clear()"
    },
    {
        "type": "ti_rover_commands_zero_gyro_code",
        "message0": "E: zero_gyro()"
    },

    // ********* MICROBIT CATEGORY *********

    //commands
    {
        'type': 'microbit_sleep_code',
        'message0': '1: sleep(ms)'
    },
    {
        'type': 'microbit_forever_code',
        'message0': '2: while not escape():     [annul]'
    },
    {
        'type': 'microbit_disp_clr_code',
        'message0': '3: disp_clr()'
    },
    {
        'type': 'microbit_store_list_code',
        'message0': '4: store_list = ("1 - "6", list)'
    },
    {
        'type': 'microbit_temperature_code',
        'message0': '5: var=temperature()'
    },
    //DISPLAY
    {
        'type': 'microbit_disp_show_code',
        'message0': '1: .show(val)'
    },
    {
        'type': 'microbit_disp_scroll_code',
        'message0': '2: .scroll(val)'
    },
    {
        'type': 'microbit_disp_clear_code',
        'message0': '3: .clear()'
    },
    {
        'type': 'microbit_disp_set_pixel_code',
        'message0': '4: .set_pixel(x, y, val)'
    },
    {
        'type': 'microbit_disp_image_code',
        'message0': "5: Image(':'':'':'':'':')"
    },
    {
        'type': 'microbit_read_light_level_code',
        'message0': '6: var=.read_light_level()'
    },
    //DISPLAY - Images
    {
        'type': 'microbit_image_heart_code',
        'message0': '1: HEART'
    },
    {
        'type': 'microbit_image_heart_small_code',
        'message0': '2: HEART_SMALL'
    },
    {
        'type': 'microbit_image_happy_code',
        'message0': '3: HAPPY'
    },
    {
        'type': 'microbit_image_smile_code',
        'message0': '4: SMILE'
    },
    {
        'type': 'microbit_image_sad_code',
        'message0': '5: SAD'
    },
    {
        'type': 'microbit_image_confused_code',
        'message0': '6: CONFUSED'
    },
    {
        'type': 'microbit_image_angry_code',
        'message0': '7: ANGRY'
    },
    {
        'type': 'microbit_image_asleep_code',
        'message0': '8: ASLEEP'
    },
    {
        'type': 'microbit_image_surprised_code',
        'message0': '9: SURPRISED'
    },
    {
        'type': 'microbit_image_silly_code',
        'message0': '0: SILLY'
    },
    {
        'type': 'microbit_image_fabulous_code',
        'message0': 'A: FABULOUS'
    },
    {
        'type': 'microbit_image_meh_code',
        'message0': 'B: MEH'
    },
    {
        'type': 'microbit_image_yes_code',
        'message0': 'C: YES'
    },
    {
        'type': 'microbit_image_no_code',
        'message0': 'D: NO'
    },
    {
        'type': 'microbit_image_triangle_code',
        'message0': 'E: TRIANGLE'
    },
    {
        'type': 'microbit_image_triangle_left_code',
        'message0': 'F: TRIANGLE_LEFT'
    },
    {
        'type': 'microbit_image_chessboard_code',
        'message0': 'G: CHESSBOARD'
    },
    {
        'type': 'microbit_image_diamond_code',
        'message0': 'H: DIAMOND'
    },
    {
        'type': 'microbit_image_diamond_small_code',
        'message0': 'I: DIAMOND_SMALL'
    },
    {
        'type': 'microbit_image_square_code',
        'message0': 'J: SQUARE'
    },
    {
        'type': 'microbit_image_square_small_code',
        'message0': 'K: SQUARE_SMALL'
    },
    {
        'type': 'microbit_image_rabbit_code',
        'message0': 'L: RABBIT'
    },
    {
        'type': 'microbit_image_cow_code',
        'message0': 'M: COW'
    },
    {
        'type': 'microbit_image_music_crotchet_code',
        'message0': 'N: MUSIC_CROTCHET'
    },
    {
        'type': 'microbit_image_music_quaver_code',
        'message0': 'O: MUSIC_QUAVER'
    },
    {
        'type': 'microbit_image_music_quavers_code',
        'message0': 'P: MUSIC_QUAVERS'
    },
    {
        'type': 'microbit_image_pitchfork_code',
        'message0': 'Q: PITCHFORK'
    },
    {
        'type': 'microbit_image_xmas_code',
        'message0': 'R: XMAS'
    },
    {
        'type': 'microbit_image_pacman_code',
        'message0': 'S: PACMAN'
    },
    {
        'type': 'microbit_image_target_code',
        'message0': 'T: TARGET'
    },
    {
        'type': 'microbit_image_tshirt_code',
        'message0': 'U: TSHIRT'
    },
    {
        'type': 'microbit_image_rollerskate_code',
        'message0': 'V: ROLLERSKATE'
    },
    {
        'type': 'microbit_image_duck_code',
        'message0': 'W: DUCK'
    },
    {
        'type': 'microbit_image_house_code',
        'message0': 'X: HOUSE'
    },
    {
        'type': 'microbit_image_tortoise_code',
        'message0': 'Y: TORTOISE'
    },
    {
        'type': 'microbit_image_butterfly_code',
        'message0': 'Z: BUTTERFLY'
    },
    {
        'type': 'microbit_image_stickfigure_code',
        'message0': 'A1: STICKFIGURE'
    },
    {
        'type': 'microbit_image_ghost_code',
        'message0': 'A2: GHOST'
    },
    {
        'type': 'microbit_image_sword_code',
        'message0': 'A3: SWORD'
    },
    {
        'type': 'microbit_image_giraffe_code',
        'message0': 'A4: GIRAFFE'
    },
    {
        'type': 'microbit_image_skull_code',
        'message0': 'A5: SKULL'
    },
    //music
    {
        'type': 'microbit_music_play_code',
        'message0': '1: .play(melodie)'
    },
    {
        'type': 'microbit_music_pitch_code',
        'message0': '2: .pitch(freq, duration)'
    },
    {
        'type': 'microbit_music_set_tempo_code',
        'message0': '3: .set_tempo(ticks, BPM)'
    },
    {
        'type': 'microbit_music_set_volume_code',
        'message0': '4: .set_volume(0-255)'
    },
    {
        'type': 'microbit_music_note_code',
        'message0': '5: var= ["note:ticks",]'
    },
    // music melodies
    {
        "type": "microbit_music_melody_dadadadum_code",
        "message0": "1: DADADADUM"
    },
    {
        "type": "microbit_music_melody_entertainer_code",
        "message0": "2: ENTERTAINER"
    },
    {
        "type": "microbit_music_melody_prelude_code",
        "message0": "3: PRELUDE"
    },
    {
        "type": "microbit_music_melody_ode_code",
        "message0": "4: ODE"
    },
    {
        "type": "microbit_music_melody_nyan_code",
        "message0": "5: NYAN"
    },
    {
        "type": "microbit_music_melody_ringtone_code",
        "message0": "6: RINGTONE"
    },
    {
        "type": "microbit_music_melody_funk_code",
        "message0": "7: FUNK"
    },
    {
        "type": "microbit_music_melody_blues_code",
        "message0": "8: BLUES"
    },
    {
        "type": "microbit_music_melody_birthday_code",
        "message0": "9: BIRTHDAY"
    },
    {
        "type": "microbit_music_melody_wedding_code",
        "message0": "0: WEDDING"
    },
    {
        "type": "microbit_music_melody_funeral_code",
        "message0": "A: FUNERAL"
    },
    {
        "type": "microbit_music_melody_ba_ding_code",
        "message0": "B: BA_DING"
    },
    {
        "type": "microbit_music_melody_wawawawaa_code",
        "message0": "C: WAWAWAWAA"
    },
    {
        "type": "microbit_music_melody_jump_up_code",
        "message0": "D: JUMP_UP"
    },
    {
        "type": "microbit_music_melody_jump_down_code",
        "message0": "E: JUMP_DOWN"
    },
    {
        "type": "microbit_music_melody_power_up_code",
        "message0": "F: POWER_UP"
    },
    {
        "type": "microbit_music_melody_power_down_code",
        "message0": "G: POWER_DOWN"
    },
    {
        "type": "microbit_music_melody_python_code",
        "message0": "H: PYTHON"
    },
    {
        "type": "microbit_music_melody_baddy_code",
        "message0": "I: BADDY"
    },
    {
        "type": "microbit_music_melody_chase_code",
        "message0": "J: CHASE"
    },
    {
        "type": "microbit_music_melody_punchline_code",
        "message0": "K: PUNCHLINE"
    },
    // audio
    {
        "type": "microbit_audio_play_code",
        "message0": "1: .play(son)"
    },
    {
        "type": "microbit_audio_stop_code",
        "message0": "2: .stop()"
    },
    // audio - sounds
    {
        "type": "microbit_audio_sound_giggle_code",
        "message0": "1: GIGGLE"
    },
    {
        "type": "microbit_audio_sound_happy_code",
        "message0": "2: HAPPY"
    },
    {
        "type": "microbit_audio_sound_hello_code",
        "message0": "3: HELLO"
    },
    {
        "type": "microbit_audio_sound_mysterious_code",
        "message0": "4: MYSTERIOUS"
    },
    {
        "type": "microbit_audio_sound_sad_code",
        "message0": "5: SAD"
    },
    {
        "type": "microbit_audio_sound_slide_code",
        "message0": "6: SLIDE"
    },
    {
        "type": "microbit_audio_sound_soaring_code",
        "message0": "7: SOARING"
    },
    {
        "type": "microbit_audio_sound_spring_code",
        "message0": "8: SPRING"
    },
    {
        "type": "microbit_audio_sound_twinkle_code",
        "message0": "9: TWINKLE"
    },
    {
        "type": "microbit_audio_sound_yawn_code",
        "message0": "0: YAWN"
    },
    // Microphone
    {
        "type": "microbit_microphone_sound_level_code",
        "message0": "1: var=.sound_level()"
    },
    {
        "type": "microbit_microphone_current_level_code",
        "message0": "2: var=.current_level()"
    },
    {
        "type": "microbit_microphone_is_event_code",
        "message0": "3: .is_event(EventSon)"
    },
    {
        "type": "microbit_microphone_was_event_code",
        "message0": "4: .was_event(EventSon)"
    },
    {
        "type": "microbit_microphone_set_threshold_code",
        "message0": "5: .set_threshold(EventSon, val)"
    },
    // Microphone - Events
    {
        "type": "microbit_microphone_event_loud_code",
        "message0": "1: SoundEvent.LOUD"
    },
    {
        "type": "microbit_microphone_event_quiet_code",
        "message0": "2: SoundEvent.QUIET"
    },
    // Buttons
    {
        "type": "microbit_button_a_is_pressed_code",
        "message0": "1: .is_pressed()"
    },
    {
        "type": "microbit_button_a_was_pressed_code",
        "message0": "2: .was_pressed()"
    },
    {
        "type": "microbit_button_a_get_presses_code",
        "message0": "3: .get_presses()"
    },
    {
        "type": "microbit_button_b_is_pressed_code",
        "message0": "1: .is_pressed()"
    },
    {
        "type": "microbit_button_b_was_pressed_code",
        "message0": "2: .was_pressed()"
    },
    {
        "type": "microbit_button_b_get_presses_code",
        "message0": "3: .get_presses()"
    },
    {
        "type": "microbit_button_logo_code",
        "message0": "1: .is_touched()"
    },
    // ACC
    {
        "type": "microbit_accelerometer_get_x_code",
        "message0": "1: var=.get_x()"
    },
    {
        "type": "microbit_accelerometer_get_y_code",
        "message0": "2: var=.get_y()"
    },
    {
        "type": "microbit_accelerometer_get_z_code",
        "message0": "3: var=.get_z()"
    },
    {
        "type": "microbit_accelerometer_get_values_code",
        "message0": "4: var, var, var=.get_values()"
    },
    {
        "type": "microbit_accelerometer_magnitude_code",
        "message0": "5: var=.magnitude()"
    },
    //COMPASS
    {
        "type": "microbit_compass_heading_code",
        "message0": "1: var=.heading()"
    },
    {
        "type": "microbit_compass_get_x_code",
        "message0": "2: var=.get_x()"
    },
    {
        "type": "microbit_compass_get_y_code",
        "message0": "3: var=.get_y()"
    },
    {
        "type": "microbit_compass_get_z_code",
        "message0": "4: var=.get_z()"
    },
    {
        "type": "microbit_compass_is_calibrated_code",
        "message0": "5: var=.is_calibrated()"
    },
    {
        "type": "microbit_compass_get_field_strngth_code",
        "message0": "6: var=.get_field_strength()"
    },
    {
        "type": "microbit_compass_calibrate_code",
        "message0": "7: .calibrate()"
    },
    {
        "type": "microbit_compass_clear_calibration_code",
        "message0": "8: .clear_calibration()"
    },
    // GESTURES
    {
        "type": "microbit_gestures_current_gesture_code",
        "message0": "1: .current_gesture()"
    },
    {
        "type": "microbit_gestures_is_gesture_code",
        "message0": '2: .is_gesture("geste")'
    },
    {
        "type": "microbit_gestures_was_gesture_code",
        "message0": '3: .was_gesture("geste")'
    },
    {
        "type": "microbit_gestures_up_code",
        "message0": "4: 'up'"
    },
    {
        "type": "microbit_gestures_down_code",
        "message0": "5: 'down'"
    },
    {
        "type": "microbit_gestures_left_code",
        "message0": "6: 'left'"
    },
    {
        "type": "microbit_gestures_right_code",
        "message0": "7: 'right'"
    },
    {
        "type": "microbit_gestures_face_up_code",
        "message0": "8: 'face up'"
    },
    {
        "type": "microbit_gestures_face_down_code",
        "message0": "9: 'face down'"
    },
    {
        "type": "microbit_gestures_shake_code",
        "message0": "0: 'shake'"
    },
    // RADIO - radio
    {
        "type": "microbit_radio_on_code",
        "message0": "1: .on()"
    },
    {
        "type": "microbit_radio_off_code",
        "message0": "2: .off()"
    },
    {
        "type": "microbit_radio_config_code",
        "message0": "3: .config(long, chn, puiss, grp)"
    },
    // RADIO - send/receive
    {
        "type": "microbit_radio_send_code",
        "message0": '1: .send("message")'
    },
    {
        "type": "microbit_radio_receive_code",
        "message0": "2: var=.receive()"
    },
    {
        "type": "microbit_radio_receive_number_code",
        "message0": "3: var=.receive_number()"
    },
    //PINS
    // Digital
    {
        "type": "microbit_pins_digital_read_code",
        "message0": "1: var=.digital_read()"
    },
    {
        "type": "microbit_pins_digital_write_code",
        "message0": "2: pin.write_digital(valeur)"
    },
    // Analog
    {
        "type": "microbit_pins_analog_read_code",
        "message0": "1: var=pin.read_analog()"
    },
    {
        "type": "microbit_pins_analog_write_code",
        "message0": "2: pin.write_analog(valeur)"
    },
    {
        "type": "microbit_pins_analog_set_period_code",
        "message0": "3: pin.set_analog_period(valeur)"
    },
    // Pins
    {
        "type": "microbit_pins_pin0_code",
        "message0": "1: pin0"
    },
    {
        "type": "microbit_pins_pin1_code",
        "message0": "2: pin1"
    },
    {
        "type": "microbit_pins_pin2_code",
        "message0": "3: pin2"
    },
    {
        "type": "microbit_pins_pin8_code",
        "message0": "4: pin8"
    },
    {
        "type": "microbit_pins_pin13_code",
        "message0": "5: pin13"
    },
    {
        "type": "microbit_pins_pin14_code",
        "message0": "6: pin14"
    },
    {
        "type": "microbit_pins_pin15_code",
        "message0": "7: pin15"
    },
    {
        "type": "microbit_pins_pin16_code",
        "message0": "8: pin16"
    },
    {
        "type": "microbit_pins_pin_speaker_code",
        "message0": "9: pin_speaker"
    },
    // Grove
    // Input
    {
        "type": "microbit_grove_input_dht20_code",
        "message0": "1: var(t), var(h)=.dht20_read()"
    },
    {
        "type": "microbit_grove_input_dht20_temperature_code",
        "message0": "2: var=.read_temperature(pin)"
    },
    {
        "type": "microbit_grove_input_dht20_lightlevel_code",
        "message0": "3: var=.read_lightlevel(pin)"
    },
    {
        "type": "microbit_grove_input_dht20_moisture_code",
        "message0": "4: var=.read_moisture(pin)"
    },
    {
        "type": "microbit_grove_input_dht20_pressure_code",
        "message0": "5: var=.read_pressure(pin)"
    },
    {
        "type": "microbit_grove_input_dht20_calibrate_pressure_code",
        "message0": "6: calibrate_pressure(m,b)"
    },
    {
        "type": "microbit_grove_input_ranger_time_code",
        "message0": "7: var=.read_ranger_time(pin)"
    },
    {
        "type": "microbit_grove_input_ranger_distance_code",
        "message0": "8: var=.read_ranger_cm(pin)"
    },
    {
        "type": "microbit_grove_input_bme280_code",
        "message0": "9: t,h,p=.read_bme280()"
    },
    {
        "type": "microbit_grove_input_sgp30_code",
        "message0": "0: eco2, tvoc=.read_sgp30()"
    },
    // Output
    {
        "type": "microbit_grove_output_power_code",
        "message0": "1: .power(pin, valeur)"
    },
    {
        "type": "microbit_grove_output_relay_code",
        "message0": "2: .relay(pin, valeur)"
    },
    {
        "type": "microbit_grove_output_servo_code",
        "message0": "3: .set_servo(pin, deg, min, max)"
    },
    // NEOPIXEL
    //COLOR
    {
        "type": "microbit_neopixel_set_color_code",
        "message0": "1: color.rgb(r, g, b)"
    },
    {
        "type": "microbit_neopixel_set_pin_color_code",
        "message0": "2: var=Color(pin)"
    },
    {
        "type": "microbit_neopixel_set_rgb_code",
        "message0": "3: .rgb(r, g, b)"
    },
    // CONFIGURATION
    {
        "type": "microbit_set_neopixel_code",
        "message0": "1: np=Neopixel(pin, pixel)"
    },
    {
        "type": "microbit_neopixel_pin0_code",
        "message0": "2: pin0"
    },
    {
        "type": "microbit_neopixel_pin1_code",
        "message0": "3: pin1"
    },
    {
        "type": "microbit_neopixel_pin2_code",
        "message0": "4: pin2"
    },
    {
        "type": "microbit_neopixel_pin13_code",
        "message0": "5: pin13"
    },
    {
        "type": "microbit_neopixel_pin14_code",
        "message0": "6: pin14"
    },
    {
        "type": "microbit_neopixel_pin15_code",
        "message0": "7: pin15"
    },
    {
        "type": "microbit_neopixel_pin16_code",
        "message0": "8: pin16"
    },
    // CONTROL
    {
        "type": "microbit_neopixel_set_at_index_code",
        "message0": "1: np[index]=(red, green, blue)"
    },
    {
        "type": "microbit_neopixel_show_code",
        "message0": "2: .show()"
    },
    {
        "type": "microbit_neopixel_clear_code",
        "message0": "3: .clear()"
    },

    // ********* CE CATEGORY *********

    // box define list
    {
        "type": "ce_box_define_data_code",
        "message0": "1: data = liste"
    },
    // box
    {
        "type": "ce_box_box_code",
        "message0": "2: var = box(data)"
    },
    // box title
    {
        "type": "ce_box_title_code",
        "message0": '3: var.title("Titre")'
    },
    // box show
    {
        "type": "ce_box_show_code",
        "message0": "4: var.show()"
    },
    // chart define data
    {
        "type": "ce_chart_define_data_code",
        "message0": '1: data = [("étiquette", valeur), ...]'
    },
    // chart
    {
        "type": "ce_chart_chart_code",
        "message0": "2: var = chart()"
    },
    // chart data
    {
        "type": "ce_chart_data_code",
        "message0": "3: var.data(liste de tuples)"
    },
    // chart title
    {
        "type": "ce_chart_title_code",
        "message0": '4: var.title("Titre")'
    },
    // chart frequencies
    {
        "type": "ce_chart_frequencies_code",
        "message0": "5: var.frequencies(nombres)"
    },
    // chart show
    {
        "type": "ce_chart_show_code",
        "message0": "6: var.show()"
    },
    // chart rectangle
    {
        "type": "ce_chart_rectangle_code",
        "message0": "1: var.rectangle(x, y, w, h, couleur)"
    },
    // chart area
    {
        "type": "ce_chart_area_code",
        "message0": "2: var.area()"
    },
    // chart draw
    {
        "type": "ce_chart_draw_code",
        "message0": "3: var.draw()"
    },
    // chart lambda
    {
        "type": "ce_chart_lambda_code",
        "message0": "4: f=lambda x:f(x)"
    },
    // chart draw fx
    {
        "type": "ce_chart_draw_fx_code",
        "message0": "5: draw_fx(x_mn, x_mx, f, n, couleur)"
    },

    // ********* TURTLE CATEGORY *********

    //Mouvements
    {
        "type": "turtle_forward_code",
        "message0": '1: t.forward(distance)'
    },
    {
        "type": "turtle_backward_code",
        "message0": '2: t.backward(distance)'
    },
    {
        "type": "turtle_right_code",
        "message0": '3: t.right(degrés)'
    },
    {
        "type": "turtle_left_code",
        "message0": '4: t.left(degrés)'
    },
    {
        "type": "turtle_goto_code",
        "message0": '5: t.goto(x, y)'
    },
    {
        "type": "turtle_done_code",
        "message0": '6: t.done()    en fin de script'
    },
    //Dessin
    {
        "type": "turtle_fillcolor_code",
        "message0": '1: t.fillcolor(r, g, b)'
    },
    {
        "type": "turtle_begin_fill_code",
        "message0": '2: t.begin_fill()'
    },
    {
        "type": "turtle_end_fill_code",
        "message0": '3: t.end_fill()'
    },
    {
        "type": "turtle_circle_code",
        "message0": '4: t.circle(rayon, arc)   optionnel'
    },
    {
        "type": "turtle_dot_code",
        "message0": '5: t.dot(diamètre)'
    },
    {
        "type": "turtle_write_code",
        "message0": '6: t.write(texte)'
    },
    //Pen
    {
        "type": "turtle_up_code",
        "message0": '1: t.penup()'
    },
    {
        "type": "turtle_down_code",
        "message0": '2: t.pendown()'
    },
    {
        "type": "turtle_pencolor_code",
        "message0": '3: t.pencolor(r, g, b)'
    },
    {
        "type": "turtle_pensize_code",
        "message0": '4: t.pensize(1-4)'
    },
    //Settings
    {
        "type": "turtle_clear_code",
        "message0": '1: t.clear()'
    },
    {
        "type": "turtle_hide_turtle_code",
        "message0": '2: t.hideturtle()'
    },
    {
        "type": "turtle_show_turtle_code",
        "message0": '3: t.showturtle()'
    },
    {
        "type": "turtle_hidegrid_code",
        "message0": '4: t.hidegrid()'
    },
    {
        "type": "turtle_speed_code",
        "message0": '5: t.speed(0-10)'
    },
    //State
    {
        'type': 'turtle_home_code',
        'message0': '1: t.home()'
    },
    {
        'type': 'turtle_setheading_code',
        'message0': '2: t.setheading(degrés)'
    },
    {
        'type': 'turtle_getx_code',
        'message0': '3: var=t.xcor()'
    },
    {
        'type': 'turtle_gety_code',
        'message0': '4: var=t.ycor()'
    },
    {
        'type': 'turtle_getpos_code',
        'message0': '5: var=t.pos()'
    },
    {
        'type': 'turtle_heading_code',
        'message0': '6: var=t.heading()'
    },

    // ********* TELLO CATEGORY *********

    {
        "type": "tello_takeoff_code",
        "message0": "1: tello.takeoff()"
    },
    {
        "type": "tello_land_code",
        "message0": "2: tello.land()"
    },
    {
        "type": "tello_forward_code",
        "message0": "3: tello.forward(distance)"
    },
    {
        "type": "tello_backward_code",
        "message0": "4: tello.backward(distance)"
    },
    {
        "type": "tello_turn_right_code",
        "message0": "5: tello.turn_right(angle)"
    },
    {
        "type": "tello_turn_left_code",
        "message0": "6: tello.turn_left(angle)"
    },
    {
        "type": "tello_fly_right_code",
        "message0": "7: tello.fly_right(distance)"
    },
    {
        "type": "tello_fly_left_code",
        "message0": "8: tello.fly_left(distance)"
    },
    {
        "type": "tello_up_code",
        "message0": "9: tello.up(distance)"
    },
    {
        "type": "tello_down_code",
        "message0": "0: tello.down(distance)"
    },
    {
        "type": "tello_getAltitude_code",
        "message0": "A: tello.altitude()"
    }

]);