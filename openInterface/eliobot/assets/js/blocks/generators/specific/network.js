/**
 * @fileoverview Network generators for Eliobot.
 */

const addWifiDefs = function () {
    Blockly.Python.addImport('elio', IMPORT_ELIO);
    Blockly.Python.addInit('elio_wifi', 'WiFiConnectivity = WiFiConnectivity()');
};

Blockly.Python.network_wifi_connect = function (block) {
    addWifiDefs();
    const ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_NONE) || "''";
    const password = Blockly.Python.valueToCode(block, 'PASSWORD', Blockly.Python.ORDER_NONE) || "''";
    const webpassword = "'webpassword'";
    Blockly.Python.addInit('setup_wifi',
        'SSID = ' + ssid + NEWLINE +
        'PASSWORD = ' + password + NEWLINE +
        'WEBPASSWORD = ' + webpassword
    );
    return 'WiFiConnectivity.connect_to_wifi(SSID, PASSWORD, WEBPASSWORD)' + NEWLINE;
};

Blockly.Python.network_wifi_disconnect = function () {
    addWifiDefs();
    return 'WiFiConnectivity.disconnect_from_wifi()' + NEWLINE;
};

Blockly.Python.network_wifi_open_access_point = function (block) {
    addWifiDefs();
    const ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_NONE) || "''";
    const password = Blockly.Python.valueToCode(block, 'PASSWORD', Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addInit('setup_ap',
        'AP_SSID = ' + ssid + NEWLINE +
        'AP_PASSWORD = ' + password
    );
    Blockly.Python.addInit('start_ap', 'WiFiConnectivity.set_access_point(AP_SSID, AP_PASSWORD)');
    return '';
};

Blockly.Python.network_wifi_define_host_name = function (block) {
    Blockly.Python.addImport('mdns', IMPORT_MDNS);
    Blockly.Python.addImport('wifi', IMPORT_WIFI);
    const name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE) || "''";
    Blockly.Python.addInit('define_mdns', 'mdns_server = mdns.Server(wifi.radio)');
    return `mdns_server.hostname = ${name}` + NEWLINE +
        "mdns_server.advertise_service(service_type='_http', protocol='_tcp', port=80)" + NEWLINE;
};

Blockly.Python.network_wifi_define_antenna_power = function (block) {
    Blockly.Python.addImport('wifi', IMPORT_WIFI);
    const power = Blockly.Python.valueToCode(block, 'POWER', Blockly.Python.ORDER_NONE) || '0';
    return `wifi.radio.tx_power = ${power}` + NEWLINE;
};

Blockly.Python.network_wifi_is_connected = function () {
    Blockly.Python.addImport('wifi', IMPORT_WIFI);
    return ['wifi.radio.connected', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.network_wifi_scan_networks = function () {
    addWifiDefs();
    return ['WiFiConnectivity.scan_wifi_networks()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.network_wifi_get_ip = function () {
    Blockly.Python.addImport('wifi', IMPORT_WIFI);
    return ['str(wifi.radio.ipv4_address)', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.network_html_create_page = function (block) {
    Blockly.Python.addImport('os', IMPORT_OS);
    Blockly.Python.addImport('wifi', IMPORT_WIFI);
    Blockly.Python.addImport('socketpool', IMPORT_SOCKETPOOL);
    Blockly.Python.addImport('adafruit_httpserver', IMPORT_ADAFRUIT_HTTPSERVER);
    Blockly.Python.addInit('define_pool', 'pool = socketpool.SocketPool(wifi.radio)');
    Blockly.Python.addInit('define_server', 'server = Server(pool, "/www", debug=True)');
    Blockly.Python.addInit('serve_html_file',
        "@server.route('/serve_file', methods=['POST'])" + NEWLINE +
        'def serve_file(request: Request):' + NEWLINE +
        TAB + 'return (FileResponse(request, "index.html", "/www"))'
    );

    const title = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || "''";
    let bodyContent = Blockly.Python.statementToCode(block, 'DO');
    if (!bodyContent || bodyContent.trim() === '') {
        bodyContent = '<h1>Voici ta page !</h1>';
    }

    let code =
        'html_page = (' + NEWLINE +
        '    """<!DOCTYPE html>' + NEWLINE +
        '<html>' + NEWLINE +
        '<head>' + NEWLINE +
        '  <meta name="viewport" content="width=device-width, initial-scale=1">""" +' + NEWLINE +
        '    "<title>" + str(' + title + ') + "</title>" +' + NEWLINE +
        '    """<style>' + NEWLINE +
        '    body { margin: 0; font-family: Arial, sans-serif; }' + NEWLINE +
        '    .container { width: 100%; padding: 20px; box-sizing: border-box; }' + NEWLINE +
        '    @media (max-width: 600px) { .container { padding: 10px; } }' + NEWLINE +
        '  </style>' + NEWLINE +
        '</head>' + NEWLINE +
        '<body>' + NEWLINE +
        bodyContent + NEWLINE +
        '</body>' + NEWLINE +
        '</html>"""' + NEWLINE +
        ')' + NEWLINE + NEWLINE;

    code +=
        'try:' + NEWLINE +
        TAB + "os.mkdir('/www')" + NEWLINE +
        'except OSError:' + NEWLINE +
        TAB + 'pass' + NEWLINE +
        "with open('/www/index.html', 'w') as f:" + NEWLINE +
        TAB + 'f.write(html_page)' + NEWLINE + NEWLINE;

    code += 'server.serve_forever(str(wifi.radio.ipv4_address), 80)' + NEWLINE;
    return code;
};

Blockly.Python.network_html_create_button = function (block) {
    const rgbToHex = (rgb) => {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        return '#' + [r, g, b]
            .map(v => v.toString(16).padStart(2, '0'))
            .join('');
    };

    Blockly.Python.addImport('adafruit_httpserver', 'from adafruit_httpserver import Server, Request, FileResponse, Response, JSONResponse');
    const text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE).replaceAll("'", "");
    const hex = rgbToHex(Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_NONE));
    let statements = Blockly.Python.statementToCode(block, 'DO') || TAB + 'pass' + NEWLINE;
    const endpoint =
        `@server.route("/${text}", methods=['POST'])` + NEWLINE +
        `def ${text}(request: Request):` + NEWLINE +
        TAB + `if request.json().get('action', False):` + NEWLINE +
        statements.replace(/^(?=.)/gm, TAB) + NEWLINE;

    Blockly.Python.addInit('button_' + text, endpoint);
    const htmlButton =
        `<button style="background-color: ${hex}; color: white;padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" ` +
        `onclick="fetch('/${text}', {method:'POST', ` +
        `body:JSON.stringify({action:true}), ` +
        `headers:{'Content-Type':'application/json'}})">""" + str(${text}) + """</button>` + NEWLINE;

    return htmlButton;
};

Blockly.Python.network_html_display_value = function (block) {
    Blockly.Python.addImport('adafruit_httpserver', 'from adafruit_httpserver import Server, Request, FileResponse, Response, JSONResponse');

    const value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || '0';
    const name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE).replaceAll("'", "");

    const endpoint =
        `@server.route("/${name}", methods=['GET'])` + NEWLINE +
        `def ${name}_handler(request: Request):` + NEWLINE +
        TAB + `return JSONResponse(request, {"name": str(${name}), "value": ${value}})` + NEWLINE;

    Blockly.Python.addInit('value_route_' + name, endpoint);

    const htmlCode =
        `<div id="${name}">Chargement...</div>` + NEWLINE +
        `<script>` + NEWLINE +
        `  (function() {` + NEWLINE +
        `    function refresh() {` + NEWLINE +
        `      fetch('/${name}')` + NEWLINE +
        `        .then(r => r.json())` + NEWLINE +
        `        .then(d => { document.getElementById('${name}').textContent = d.name + ': ' + d.value; })` + NEWLINE +
        `        .catch(() => {});` + NEWLINE +
        `    }` + NEWLINE +
        `    refresh(); setInterval(refresh, 1000);` + NEWLINE +
        `  })();` + NEWLINE +
        `</script>` + NEWLINE;

    return htmlCode;
};

Blockly.Python.network_html_create_tag = function (block) {
    const tag = block.getFieldValue('TAG');
    const statements = Blockly.Python.statementToCode(block, 'DO');
    return `<${tag}>` + NEWLINE + statements + `</${tag}>` + NEWLINE;
};

Blockly.Python.network_html_create_title_tag = function (block) {
    const tag = block.getFieldValue('TAG');
    const title = Blockly.Python.valueToCode(block, 'TITLE', Blockly.Python.ORDER_NONE) || "''";
    return `<${tag}>""" + str(${title}) + """</${tag}>` + NEWLINE;
};

Blockly.Python.network_html_create_paragraph = function (block) {
    const text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || "''";
    return `<p>""" + str(${text}) + """</p>` + NEWLINE;
};