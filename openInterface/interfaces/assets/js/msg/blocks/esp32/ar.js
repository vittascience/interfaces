/**
 * @fileoverview Arabic messages for ESP32 microchips. (AR)
 * Not translated yet.
 */

'use strict';

// Network - Wifi
Blockly.Msg["NETWORK_CONNECT_STATION_TITLE"] = "تهيئة المحطة: اسم الشبكة (SSID) %1 كلمة المرور %2";
Blockly.Msg["NETWORK_CONNECT_STATION_TOOLTIP"] = "يمكن تهيئة المحطة بربط " + Blockly.Msg.Esp32BoardName + " بشبكة Wi-Fi. لاستقبال البيانات المرسلة من الخادم في المتصفح: قم بتوصيل لوحة ESP32 والجهاز بنفس الشبكة. على سبيل المثال، إذا كان عنوان IP لشبكتي 192.168.1.X، فالبوابة ستكون 192.168.1.1. أدخل عنوان IP الخاص بالخادم في متصفح الجهاز. إذا أردت الوصول إلى الخادم دون استخدام عنوان IP، يمكنك تعيين اسم مضيف. على سبيل المثال esp32-server. أدخل اسم المضيف في المتصفح: http://esp32-server/";
Blockly.Msg['NETWORK_CONNECT_STATION_IP'] = "عنوان IP ثابت";
Blockly.Msg['NETWORK_CONNECT_STATION_MASK'] = "قناع الشبكة الفرعية";
Blockly.Msg['NETWORK_CONNECT_STATION_GATEWAY'] = "البوابة";
Blockly.Msg['NETWORK_CONNECT_STATION_HOSTNAME'] = 'اسم المضيف DHCP';
Blockly.Msg["NETWORK_CONFIGURE_ACCESS_POINT_TITLE"] = "تهيئة نقطة الوصول: اسم الشبكة (SSID) %1 عنوان IP ثابت %2";
Blockly.Msg["NETWORK_CONFIGURE_ACCESS_POINT_TOOLTIP"] = "يتيح تهيئة نقطة وصول Wi-Fi على " + Blockly.Msg.Esp32BoardName + ".";
Blockly.Msg["NETWORK_DISCONNECT_STATION_TITLE"] = "فصل المحطة";
Blockly.Msg["NETWORK_DISCONNECT_STATION_TOOLTIP"] = "يتيح فصل المحطة إذا كانت متصلة بشبكة Wi-Fi.";
Blockly.Msg["NETWORK_IS_STATION_CONNECTED_TITLE"] = "هل المحطة متصلة ؟";
Blockly.Msg["NETWORK_IS_STATION_CONNECTED_TOOLTIP"] = "تعيد True إذا كانت المحطة اللاسلكية مفعلة، وإلا تعيد False. يجب تهيئة المحطة اللاسلكية لاستخدام هذه الدالة.";
Blockly.Msg["NETWORK_SET_NETWORK_TITLE"] = "%1 شبكة Wi-Fi";
Blockly.Msg["NETWORK_SET_NETWORK_TOOLTIP"] = "يتيح تفعيل أو تعطيل وحدة Wi-Fi على " + Blockly.Msg.Esp32BoardName + ".";
Blockly.Msg["NETWORK_ACTIVATE"] = "تفعيل";
Blockly.Msg["NETWORK_DISABLE"] = "تعطيل";
Blockly.Msg["NETWORK_SCAN_NETWORK_PROFILES_TITLE"] = "مسح الشبكات اللاسلكية المتاحة";
Blockly.Msg["NETWORK_SCAN_NETWORK_PROFILES_TOOLTIP"] = "تعيد قائمة بالشبكات اللاسلكية المتاحة.";
Blockly.Msg["NETWORK_GET_STATION_INFOS_TITLE"] = "معلومات المحطة";
Blockly.Msg["NETWORK_GET_STATION_INFOS_TOOLTIP"] = "تعيد رباعية تحتوي عنوان IP، قناع الشبكة الفرعية، البوابة وخادم DNS.";
Blockly.Msg["NETWORK_CHANGE_SERVER_PORT_TITLE"] = "تغيير منفذ الخادم إلى %1";
Blockly.Msg["NETWORK_CHANGE_SERVER_PORT_TOOLTIP"] = "يتيح تغيير منفذ خادم " + Blockly.Msg.Esp32BoardName + ". " + Blockly.Msg.Esp32BoardName + " يجب أن تكون متصلة بشبكة Wi-Fi.";
// Network - Server
Blockly.Msg["NETWORK_SERVER_SEND_DATA_TITLE"] = "[الخادم] أرسل بيانات %1";
Blockly.Msg["NETWORK_SERVER_SEND_DATA_TOOLTIP"] = "يتيح إرسال بيانات من الخادم إلى العميل. " + Blockly.Msg.Esp32BoardName + " يجب أن تكون متصلة بشبكة Wi-Fi.";
Blockly.Msg["NETWORK_SERVER_GET_CLIENT_DATA_TITLE"] = "[الخادم] بيانات العميل";
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_TOOLTIP'] = 'تعيد البيانات المستلمة من العميل. افتراضيًا يُغلق الاتصال مع العميل تلقائيًا في كل دورة من حلقة الخادم. للحفاظ على الاتصال مفتوحًا، اضغط زر ⊕ وغيّره إلى False. بطاقة ' + Blockly.Msg.Esp32BoardName + ' يجب أن تكون متصلة بشبكة Wi-Fi.';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_CLOSING'] = 'إغلاق الاتصال ؟';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_PARAM_TITLE'] = '[الخادم] معامل الطلب';
Blockly.Msg['NETWORK_SERVER_GET_CLIENT_DATA_PARAM_TOOLTIP'] = 'تعيد معامل الطلب المرسل من العميل. ' + Blockly.Msg.Esp32BoardName + ' يجب أن تكون متصلة بشبكة Wi-Fi.';
Blockly.Msg["NETWORK_SERVER_GET_CLIENT_IP_TITLE"] = "[الخادم] عنوان IP العميل";
Blockly.Msg["NETWORK_SERVER_GET_CLIENT_IP_TOOLTIP"] = "تعيد عنوان IP الخاص بالعميل. " + Blockly.Msg.Esp32BoardName + " يجب أن تكون متصلة بشبكة Wi-Fi.";
Blockly.Msg['NETWORK_SERVER_CLOSE_CLIENT_CONNECTION_TITLE'] = '[الخادم] أغلق الاتصال مع العميل';
Blockly.Msg['NETWORK_SERVER_CLOSE_CLIENT_CONNECTION_TOOLTIP'] = 'يغلق الاتصال مع العميل.' + Blockly.Msg.Esp32BoardName + ' يجب أن تكون متصلة بشبكة Wi-Fi.';
Blockly.Msg["NETWORK_SERVER_SEND_WEB_PAGE_TITLE"] = "[الخادم] أرسل صفحة ويب";
Blockly.Msg["NETWORK_SERVER_SEND_WEB_PAGE_HTML"] = "html";
Blockly.Msg["NETWORK_SERVER_SEND_WEB_PAGE_TOOLTIP"] = "يتيح إرسال صفحة ويب إلى العميل. " + Blockly.Msg.Esp32BoardName + " يجب أن تكون متصلة بشبكة Wi-Fi.";
// Network - Client
Blockly.Msg["NETWORK_CLIENT_GET_SERVER_DATA_TITLE"] = "[العميل] الحصول على بيانات من الخادم بعنوان IP %1";
Blockly.Msg["NETWORK_CLIENT_GET_SERVER_DATA_TOOLTIP"] = "تعيد الاستجابة من الخادم. " + Blockly.Msg.Esp32BoardName + " يجب أن تكون متصلة بشبكة Wi-Fi.";
Blockly.Msg["NETWORK_CLIENT_SEND_DATA_TITLE"] = "[العميل] أرسل بيانات %1 إلى الخادم IP %2";
Blockly.Msg["NETWORK_CLIENT_SEND_DATA_TOOLTIP"] = "يتيح إرسال بيانات من العميل إلى الخادم. " + Blockly.Msg.Esp32BoardName + " يجب أن تكون متصلة بشبكة Wi-Fi.";
Blockly.Msg["NETWORK_CLIENT_SEND_DATA_PORT"] = "المنفذ";
// Network - Web page
Blockly.Msg["NETWORK_ADD_TITLE_TITLE"] = "[HTML] أضف عنوانًا فرعيًا %1 المستوى %2 اللون %3";
Blockly.Msg["NETWORK_ADD_TITLE_TOOLTIP"] = "يتيح إضافة عناوين فرعية في صفحة الويب. يجب استخدام هذه الكتلة داخل كتلة '[الخادم] أرسل صفحة ويب'.";
Blockly.Msg["NETWORK_ADD_TEXT_TITLE"] = "[HTML] أضف نصًا %1";
Blockly.Msg["NETWORK_ADD_TEXT_TOOLTIP"] = "يتيح إضافة نص في صفحة الويب. يجب استخدام هذه الكتلة داخل كتلة '[الخادم] أرسل صفحة ويب'. اضغط + لتعيين حجم الخط أو لونه.";
Blockly.Msg["NETWORK_ADD_TEXT_SIZE"] = "حجم الخط";
Blockly.Msg["NETWORK_ADD_TEXT_COLOR"] = "اللون";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_TITLE"] = "[HTML] أضف زر معرف %1 نص %2";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_TOOLTIP"] = "يتيح إضافة زر في صفحة الويب. يتيح المعرّف الحصول على حالة الزر. يجب استخدام هذه الكتلة داخل كتلة '[الخادم] أرسل صفحة ويب'. اضغط + لتعيين لون الزر وشكله.";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_COLOUR"] = "اللون";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_HEIGHT"] = "الارتفاع";
Blockly.Msg["NETWORK_HTML_ADD_BUTTON_WIDTH"] = "العرض";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_TITLE"] = "[HTML] أضف شريط تمرير معرف %1";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_TOOLTIP"] = "يتيح إضافة شريط تمرير نطاق في صفحة الويب. يتيح المعرّف الحصول على قيمة الشريط. يجب استخدام هذه الكتلة داخل كتلة '[الخادم] أرسل صفحة ويب'.";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_MIN"] = "min";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_MAX"] = "max";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_HORIZONTAL"] = "أفقي";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_VERTICAL"] = "عمودي";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_HEIGHT"] = "الارتفاع";
Blockly.Msg["NETWORK_HTML_ADD_SLIDER_WIDTH"] = "العرض";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_TITLE"] = "[HTML] أضف مفتاحًا معرف %1";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_COLOUR"] = "اللون";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_SIZE"] = "الحجم";
Blockly.Msg["NETWORK_HTML_ADD_SWITCH_TOOLTIP"] = "يتيح إضافة زر تبديل في صفحة الويب. يتيح المعرّف الحصول على قيمة المفتاح. يجب استخدام هذه الكتلة داخل كتلة '[الخادم] أرسل صفحة ويب'.";
Blockly.Msg["NETWORK_HTML_ADD_GAUGE_TITLE"] = "[HTML] أضف مقياس %1 القيمة %2 الحد الأدنى %3 الحد الأقصى %4";
Blockly.Msg["NETWORK_HTML_ADD_GAUGE_TOOLTIP"] = "يتيح إضافة مقياس في صفحة الويب. يمكنك تعيين العنوان والوحدة للمقياس. يجب استخدام هذه الكتلة داخل كتلة '[الخادم] أرسل صفحة ويب'.";
Blockly.Msg['NETWORK_ADD_LINK_TITLE'] = '[HTML] أضف رابط %1 URL %2';
Blockly.Msg['NETWORK_ADD_LINK_TOOLTIP'] = 'يتيح إضافة رابط عبر النقر على النص المحدد في صفحة الويب. يجب استخدام هذه الكتلة في كتلة \'[الخادم] أرسل صفحة ويب\'. اضغط + لتعيين حجم الخط أو لونه.';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_TITLE'] = '[HTML] عرض صورة %1';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_TOOLTIP'] = 'يسمح بإضافة صورة إلى صفحة الويب باستخدام بيانات base64. اضغط زر + لتكوين نافذة الصورة في صفحة الويب. يجب استخدام هذه الكتلة في تعليمة \'html\' من كتلة \'[الخادم] أرسل صفحة ويب\'.';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_HEIGHT'] = 'الارتفاع';
Blockly.Msg['NETWORK_HTML_ADD_IMAGE_WIDTH'] = 'العرض';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_TITLE'] = '[HTML] عرض تدفق الصور %1';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_TOOLTIP'] = 'يسمح بإرسال بث فيديو إلى صفحة الويب باستخدام بيانات الصور بصيغة base64. لتعمل هذه الميزة، يجب أن يحتوي المتغير \'image_data\' على بيانات الالتقاط. يجب استخدام هذه الكتلة في تعليمة \'html\' من كتلة \'[الخادم] أرسل صفحة ويب\'.';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_HEIGHT'] = 'الارتفاع';
Blockly.Msg['NETWORK_HTML_ADD_STREAM_WIDTH'] = 'العرض';
Blockly.Msg["NETWORK_HTML_TAG_TITLE"] = "[HTML] وسم %1";
Blockly.Msg["NETWORK_HTML_TAG_TOOLTIP"] = "يتيح إضافة وسم HTML مثل <div></div>، <form></form> (للأزرار) أو <center></center>. يجب استخدام هذه الكتلة داخل كتلة '[الخادم] أرسل صفحة ويب'.";
Blockly.Msg["NETWORK_HTML_FORMAT_TEXT_TITLE"] = "[html] اضبط النص %1 على %2";
Blockly.Msg["NETWORK_HTML_FORMAT_TEXT_TOOLTIP"] = "تتيح إضافة عنصر تنسيق نص HTML. يجب استخدام هذه الكتلة في '[server] send web page' block.";
Blockly.Msg["NETWORK_HTML_TAG_BOLD"] = "غامق <b>";
Blockly.Msg["NETWORK_HTML_TAG_ITALIC"] = "مائل <i>";
Blockly.Msg["NETWORK_HTML_TAG_INSERTED"] = "مدرج <ins>";
Blockly.Msg["NETWORK_HTML_TAG_MARKED"] = "مميّز <mark>";
Blockly.Msg["NETWORK_HTML_TAG_DELETED"] = "محذوف <del>";
Blockly.Msg["NETWORK_HTML_TAG_SMALL"] = "صغير <small>";
Blockly.Msg['NETWORK_HTML_NEWLINE_TITLE'] = '[html] سطر جديد <br>';
Blockly.Msg['NETWORK_HTML_NEWLINE_TOOLTIP'] = "تتيح إجراء فاصل سطر في صفحة الويب. يجب استخدام هذه الكتلة في التعليمات \'html\' داخل كتلة \'[Server] block send the web page\'.";
Blockly.Msg['NETWORK_HTML_ADD_TITLE'] = '[html] أضف كود HTML %1';
Blockly.Msg['NETWORK_HTML_ADD_TOOLTIP'] = "تتيح إضافة كود HTML إلى صفحة الويب. يجب استخدام هذه الكتلة في تعليمات \'html\' داخل كتلة \'[server] send html page\'." ;
Blockly.Msg['NETWORK_HTML_ADD_SYMBOL_TITLE'] = '[html] إضافة رمز HTML %1 الحجم %2 التنسيق %3';
Blockly.Msg['NETWORK_HTML_ADD_SYMBOL_TOOLTIP'] = "يتيح إضافة رمز HTML إلى صفحة الويب بتحديد حجمه (الافتراضي 50px). يجب استخدام هذه الكتلة داخل تعليمة 'html' في الكتلة '[الخادم] إرسال صفحة html'.";
// Network - Get web page
Blockly.Msg["NETWORK_SERVER_GET_BUTTON_STATE_TITLE"] = "[server] احصل على حالة الزر بالمعرف %1";
Blockly.Msg["NETWORK_SERVER_GET_BUTTON_STATE_TOOLTIP"] = "تتيح الحصول على حالة زر في صفحة الويب عن طريق تزويد معرفه.";
Blockly.Msg["NETWORK_SERVER_GET_SLIDER_VALUE_TITLE"] = "[server] احصل على قيمة المنزلق بالمعرف %1";
Blockly.Msg["NETWORK_SERVER_GET_SLIDER_VALUE_TOOLTIP"] = "تتيح الحصول على قيمة المنزلق من صفحة الويب عن طريق تزويد معرف المنزلق.";
Blockly.Msg["NETWORK_SERVER_GET_SWITCH_VALUE_TITLE"] = "[server] احصل على قيمة مفتاح التبديل بالمعرف %1";
Blockly.Msg["NETWORK_SERVER_GET_SWITCH_VALUE_TOOLTIP"] = "تتيح الحصول على قيمة مفتاح التبديل من صفحة الويب عن طريق تزويد معرف المفتاح.";
// Network - HTTP
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_TITLE'] = 'طريقة طلب HTTP %1 عنوان URL %2';
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_TOOLTIP'] = 'تتيح إنشاء طلب HTTP بنوعي GET/POST عن طريق إدخال عنوان URL.';
Blockly.Msg['NETWORK_GET_HTTP_REQUEST_CONTENT'] = 'المحتوى:';
// Netzwerk – ThingSpeak
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_TITLE'] = '[ThingSpeak] أرسل بيانات بمفتاح API';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_TOOLTIP'] = 'تتيح هذه الكتلة إرسال قياسات المستشعر إلى تطبيق ThingSpeak باستخدام شبكة WiFi المدمجة في ESP32. يمكن استخدامها مع كتلة أو أكثر من كتل "حقل" و"قيمة" بالضغط على زر الزائد.';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_FIELD_TITLE'] = '[ThingSpeak] حقل %1 قيمة %2';
Blockly.Msg['NETWORK_THINGSPEAK_SEND_DATA_FIELD_TOOLTIP'] = 'تُستخدم هذه الكتلة كما هو موضح في كتلة "إرسال البيانات في القناة". أدخل مؤشر الحقل وأضف القياس. ملاحظة: يمكنك استخدام كل حقل مرة واحدة فقط لكل إرسال بيانات.';
Blockly.Msg['NETWORK_THINGSPEAK_READ_FEEDS_TITLE'] = '[ThingSpeak] بيانات الرسم البياني: معرف القناة %1 مفتاح API %2 الحقل %3';
Blockly.Msg['NETWORK_THINGSPEAK_READ_FEEDS_TOOLTIP'] = 'تتيح استلام البيانات من واجهة ThingSpeak الخاصة بك. يتوفر مفتاح API في قسم \'مفاتيح API\' داخل القناة.';
// Network - uMail
Blockly.Msg['NETWORK_UMAIL_SMTP_TITLE'] = '[mail] تكوين خادم SMTP %1';
Blockly.Msg['NETWORK_UMAIL_SMTP_TOOLTIP'] = 'تكوين خادم SMTP لصندوق البريد.';
Blockly.Msg['NETWORK_UMAIL_SETUP_TITLE'] = '[mail] تسجيل الدخول إلى الحساب: %1 كلمة المرور: %2';
Blockly.Msg['NETWORK_UMAIL_SETUP_TOOLTIP'] = 'تسجيل الدخول إلى حساب البريد الإلكتروني.';
Blockly.Msg['NETWORK_UMAIL_TO_TITLE'] = '[mail] عنوان المستلم: %1 موضوع البريد: %2';
Blockly.Msg['NETWORK_UMAIL_TO_TOOLTIP'] = 'إرسال بريد إلكتروني إلى العنوان المحدد.';
Blockly.Msg['NETWORK_UMAIL_WRITE_SENDER_TITLE'] = '[mail] اسم المرسل: %1';
Blockly.Msg['NETWORK_UMAIL_WRITE_SENDER_TOOLTIP'] = 'حدد اسم ESP32. الصيغة: Name <address@mail.com>';
Blockly.Msg['NETWORK_UMAIL_WRITE_TITLE'] = '[mail] اكتب وأرسل البريد الإلكتروني: %1';
Blockly.Msg['NETWORK_UMAIL_WRITE_TOOLTIP'] = 'اكتب نصاً في البريد الإلكتروني. الحقل "From:" يحدد عنوان البريد الإلكتروني للمرسل، والحقل "Subject:" يحدد موضوع البريد.';
Blockly.Msg['NETWORK_UMAIL_QUIT_TITLE'] = '[mail] تسجيل الخروج من صندوق البريد';
Blockly.Msg['NETWORK_UMAIL_QUIT_TOOLTIP'] = 'تسجيل الخروج من صندوق البريد.';
Blockly.Msg['NETWORK_UMAIL_SEND_IMAGE_TITLE'] = '[mail] أرسل صورة بصيغة base64: %1';
Blockly.Msg['NETWORK_UMAIL_SEND_IMAGE_TOOLTIP'] = 'تتيح إرسال صورة بصيغة base64 عبر البريد الإلكتروني.';
// Network - MQTT
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_TITLE'] = '[MQTT] اتصل بالوسيط %1 اسم المستخدم %2 كلمة المرور %3';
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_TOOLTIP'] = 'تتيح الاتصال بوسيط MQTT عبر إدخال عنوان IP للجهاز الذي يعمل عليه. يتم تأمين الاتصال هنا باستخدام اسم مستخدم وكلمة مرور يحددها الوسيط.';
Blockly.Msg['NETWORK_MQTT_CONNECT_WITH_AUTH_PORT'] = 'المنفذ';
Blockly.Msg['NETWORK_MQTT_SUBSCRIBE_TOPIC_TITLE'] = '[MQTT] اشترك في القناة %1';
Blockly.Msg['NETWORK_MQTT_SUBSCRIBE_TOPIC_TOOLTIP'] = 'تتيح للعميل المتصل بالوسيط الاشتراك في قناة لاستقبال البيانات منها. يسهّل ذلك تحديد البيانات المستلمة.';
Blockly.Msg['NETWORK_MQTT_PUBLISH_VALUE_TITLE'] = '[MQTT] انشر رسالة %1 إلى القناة %2';
Blockly.Msg['NETWORK_MQTT_PUBLISH_VALUE_TOOLTIP'] = 'تتيح نشر رسالة إلى قناة MQTT. في كل مرة تُرسل بيانات، يجب على الوسيط أو العميل تحديد القناة المستخدمة. ليس من الضروري الاشتراك في قناة الإرسال.';
Blockly.Msg['NETWORK_MQTT_DISCONNECT_TITLE'] = '[MQTT] قطع الاتصال بالوسيط';
Blockly.Msg['NETWORK_MQTT_DISCONNECT_TOOLTIP'] = 'تتيح فصل العميل عن وسيط MQTT.';
Blockly.Msg['NETWORK_MQTT_ON_MESSAGE_RECEIVED_TITLE'] = '[MQTT] إذا استُلمت رسالة في القناة %1 إذًا';
Blockly.Msg['NETWORK_MQTT_ON_MESSAGE_RECEIVED_TOOLTIP'] = 'يسمح بتنفيذ التعليمات عند استقبال رسالة في قناة MQTT (الموضوع). استخدم المتغير \'message\' للوصول إلى القيمة داخل هذه الدالة. لتنفيذ تعليمات اعتمادًا على القناة، استخدم كتلة \'إذا كانت القناة .. فـ ..\'';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_TITLE'] = '[MQTT] إذا كانت القناة %1 فـ';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_ELSEIF'] = 'وإلا إذا كانت القناة';
Blockly.Msg['NETWORK_MQTT_IF_TOPIC_IS_TOOLTIP'] = 'يتيح التحقق من اسم القناة (الموضوع) قبل تنفيذ التعليمات. يجب استخدام هذه الكتلة داخل كتلة \"[MQTT] عند استقبال رسالة في قناة فـ ...\"';
Blockly.Msg['NETWORK_MQTT_ON_CONNECT_TITLE'] = '[MQTT] إذا اتصلت اللوحة بالوسيط فـ';
Blockly.Msg['NETWORK_MQTT_ON_CONNECT_TOOLTIP'] = 'تتيح تنفيذ تعليمات عندما يتصل عميل ESP32 بوسيط MQTT.';
Blockly.Msg['NETWORK_MQTT_ON_DISCONNECT_TITLE'] = '[MQTT] إذا انفصلت اللوحة عن الوسيط فـ';
Blockly.Msg['NETWORK_MQTT_ON_DISCONNECT_TOOLTIP'] = 'تتيح تنفيذ تعليمات عند فصل عميل ESP32 عن وسيط MQTT. يرجى ملاحظة أنه ليس من الضروري استخدام الكتلة \'[MQTT] connect to broker ...\' مرة أخرى، فالعميل يحاول إعادة الاتصال تلقائيًا عند نشر قيمة جديدة.'

