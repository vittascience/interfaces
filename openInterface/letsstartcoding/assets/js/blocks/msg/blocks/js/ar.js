/**
 * @fileoverview English messages for Arduino. (EN)
 */
'use strict';
// START BLOCKS
Blockly.Msg['LSC_ON_START_TITLE'] = 'void setup( ) {';
Blockly.Msg['LSC_FOREVER_TITLE'] = 'void loop( ) {';
// I-O BLOCKS
Blockly.Msg['IO_WRITEDIGITALPIN_TITLE'] = 'digitalWrite(%1,%2)';
Blockly.Msg["IO_WRITEDIGITALPIN_TOOLTIP"] = "يتيح كتابة الحالة على دبوس رقمي.";
Blockly.Msg['IO_WRITEANALOGPIN_TITLE'] = 'analogWrite(%1,%2)';
Blockly.Msg['IO_WRITEANALOGPIN_TOOLTIP'] = 'يسمح بكتابة قيمة إلى مدخل تناظري (0-255).';
Blockly.Msg['IO_READDIGITALPIN_TITLE'] = 'digitalRead(%1)';
Blockly.Msg["IO_READDIGITALPIN_TOOLTIP"] = "تقرأ هذه الكتلة أحد المداخل الرقمية وتُعيد القيمة.";
Blockly.Msg['IO_READANALOGPIN_TITLE'] = 'analogRead(%1)';
Blockly.Msg["IO_READANALOGPIN_TOOLTIP"] = "يتيح قراءة القيمة التناظرية للأطراف (0-1023).";
Blockly.Msg['IO_PINMODE_TITLE'] = 'pinMode(%1,%2)';
Blockly.Msg['IO_PINMODE_TOOLTIP'] = '';
Blockly.Msg['IO_WAIT_TITLE'] = 'delay(%1)';
Blockly.Msg["IO_WAIT_TOOLTIP"] = "يوقف تنفيذ الشيفرة (المدة بالملي ثانية).";
Blockly.Msg['IO_DIGITAL_SIGNAL_TITLE'] = '%1';
Blockly.Msg['IO_DIGITAL_SIGNAL_HIGH'] = 'HIGH (1)';
Blockly.Msg['IO_DIGITAL_SIGNAL_LOW'] = 'LOW (0)';
Blockly.Msg["IO_DIGITAL_SIGNAL_TOOLTIP"] = "يعيد قيمة منطقية (HIGH أو LOW).";
// ACTUATORS
Blockly.Msg['ACTUATORS_TONE_TITLE'] = 'tone(%1,%2)';
Blockly.Msg["ACTUATORS_TONE_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "تتيح هذه الكتلة تشغيل تردد معين باستخدام وحدة مكبر صوت أو صافرة على الدبابيس الرقمية من D0 إلى D13.";
Blockly.Msg['ACTUATORS_NOTONE_TITLE'] = 'noTone(%1)';
Blockly.Msg["ACTUATORS_NOTONE_TOOLTIP"] = IMG_MODULE_BUZZER_SPEAKER + Blockly.Tooltip.SEP + "يتيح إيقاف النغمة قيد التشغيل.";
// MATH
Blockly.Msg['LSC_MATH_RANDOM_INT_TITLE'] = 'random(%1,%2)';
// CONTROLS
Blockly.Msg['LSC_CONTROLS_IF_MSG_IF'] = 'if (%1) {';
// LOOPS
Blockly.Msg["LSC_CONTROLS_FOR_TITLE"] = "عد بواسطة %1 من %2 إلى %3 بمقدار %4";