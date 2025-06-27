/**
 * @fileoverview excluded_blocks.js. The main function "retreive_all_blocks()" is called during the Python2Blocks initialization async initParser() after the interface is completely loaded.
 * @author: Nixoals (Nicolas G.)
 */
// array to be filled with all the blocks that are not in the authorized blocks
const EXCLUDED_BLOCKS_FOR_TRADUCTION = [];

// to modify each time we add a new block in reverse translation

const AUTHORIZED_BLOCKS_DISPLAY = [
    "cyberpi_led_on_all_palette",
    "cyberpi_led_on_all_RGB",
    "cyberpi_led_on_RGB",
    "cyberpi_led_on_palette",
    "cyberpi_led_play",
    "cyberpi_led_move",
    "cyberpi_led_set_brightness",
    "cyberpi_led_get_brightness",
    "cyberpi_console_print",
    "cyberpi_console_set_font",
    "cyberpi_display_show_label",
    "cyberpi_display_show_label_xy",
    'cyberpi_chart_set_brush_palette',
    'cyberpi_chart_set_brush',
    'cyberpi_linechart_set_step',
    'cyberpi_linechart_add',
    'cyberpi_barchart_add',
    'cyberpi_table_add',
    'cyberpi_chart_map',
];

const AUTHORIZED_BLOCKS_SENSORS = [
    'sensors_esp32_raw_temperature',
    'sensors_esp32_hall_sensor',
    'sensors_cyberpi_get_bri',
    'sensors_cyberpi_get_loudness'
];

const AUTHORIZED_BLOCKS_IO = [
    "io_initChronometer",
    "io_initChronometer_simple",
    "io_getChronometer",
    "io_pause",
    "io_waitUntil",
    "io_digital_signal",
    "io_writeDigitalPin",
    "io_readAnalogPin",
    // buttons
    'io_controller_onButtonPressed',
    'io_controller_isButtonPressed',
    'io_controller_get_count',
    'io_controller_reset_count',
    // Events
    'io_event_start',
    'io_event_is_press',
    'io_cyberpi_broadcast',
    'io_event_receive',
    // io blocks
    'io_readDigitalPin',
    "io_writePwm",
    "io_setPwm",
    "io_stopPwm",
];

const AUTHORIZED_BLOCKS_ACTUATORS = [
    'actuators_audio_play',
    'actuators_audio_play_tone',
    'actuators_audio_play_note',
    'actuators_audio_play_drum',
    'actuators_audio_start_recording',
    'actuators_audio_stop_recording',
    'actuators_audio_play_recording',
    'actuators_audio_add_tempo',
    'actuators_audio_set_tempo',
    'actuators_audio_get_tempo',
    'actuators_audio_add_volume',
    'actuators_audio_set_volume',
    'actuators_audio_get_volume',
    'actuators_audio_stop',
    'mbot2_motors_set_power',
    'mbot2_motors_add_power',
    'mbot2_motors_get_power',
    'mbot2_motors_stop',
    'mbot2_servos_set_angle',
    'mbot2_servos_add_angle',
    'mbot2_servos_get_angle',
    'mbot2_servos_reset',
];

const AUTHORIZED_BLOCKS_COMMUNICATION = [
    "communication_serialWrite",
    "communication_graphSerialWrite",
    "communication_graphSerialWrite_datasFormat",
    'communication_playComputerMusic',
    'communication_playComputerFrequency',
    'communication_stopComputerMusic'

]

const AUTHORIZED_BLOCKS_ROBOT = [
    'robots_mbot2_move',
    'robots_mbot2_move_by',
    'robots_mbot2_turn',
    'robots_mbot2_control_motor',
    'robots_mbot2_turn_motor',
    'robots_mbot2_stop_motor',
    'robots_mbot2_get_motor_encoding',
    'robots_mbot2_reset_motor_angular_position',
    'robots_mbot2_control_motor_locking',
    'robots_mbot2_ultrasonic_getDistance',
    'robots_mbot2_ultrasonic_setBrightness',
    'robots_mbot2_ultrasonic_getBrightness',
    'robots_mbot2_ultrasonic_stopLED',
    'robots_mbot2_ultrasonic_playLED',
    'sensors_mbuild_quad_RGB_detection_L1_R1_is',
    'sensors_mbuild_quad_RGB_get_detection_L1_R1',
    'sensors_mbuild_quad_RGB_detection_is',
    'sensors_mbuild_quad_RGB_get_detection',
    'sensors_mbuild_quad_RGB_is_color_detected',
    'sensors_mbuild_quad_RGB_get_probe_data',
    'sensors_mbuild_quad_RGB_get_offset_track',
    'sensors_mbuild_quad_RGB_define_color',
    'sensors_mbuild_quad_RGB_set_color_list',
    'sensors_mbuild_quad_RGB_close_led',
    'sensors_mbuild_quad_RGB_calibrate',
    'sensors_mbuild_quad_RGB_color_mode'
];

AUTHORIZED_BLOCKS_NETWORK = [
    'cyberpi_wifi_connect',
    'cyberpi_wifi_disconnect',
    'cyberpi_wifi_is_connect',
    'cyberpi_wifi_broadcast_set',
    'cyberpi_wifi_broadcast_get'
]

/**
 * List of all authorized blocks (concatenation of all the authorized blocks by category)
*/
const AUTHORIZED_BLOCKS = [...AUTHORIZED_BLOCKS_DISPLAY, ...AUTHORIZED_BLOCKS_SENSORS, ...AUTHORIZED_BLOCKS_IO, ...AUTHORIZED_BLOCKS_ACTUATORS, ...AUTHORIZED_BLOCKS_COMMUNICATION, ...AUTHORIZED_BLOCKS_ROBOT, ...AUTHORIZED_BLOCKS_NETWORK];

/**
 * List of all excluded categories that should be automatically added to reverse traduction
 */
const excludedCategories = ['loops', 'logic', 'math', 'text', 'lists', 'variables', 'procedures', 'exception'];



