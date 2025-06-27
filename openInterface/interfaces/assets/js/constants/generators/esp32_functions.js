
FUNCTIONS_ESP32_MICROCHIP = {

// Wifi _ configure station
DEF_WIFI_CONNECT_STATION:
`def connect_station(ssid='', password='', ip='', mask='', gateway='', dhcp_hostname=''):
  global station
  station = network.WLAN(network.STA_IF)
  if station.isconnected():
    if station.config('essid') is ssid:
      print("Already connected on ssid: '%s'" % station.config('essid'))
      return
    else:
      disconnect_station()
  print("\\nTrying to connect to '%s' ..." % ssid)
  if len(ip) is not 0:
    if len(gateway) == 0:
      gateway = ip.split('.')[0] + '.' + ip.split('.')[1] + '.' + ip.split('.')[2] + '.1'
    if len(mask) == 0:
      mask = '255.255.255.0'
    station.ifconfig([ip, mask, gateway, gateway])
  if not station.active():
    station.active(True)
  if len(dhcp_hostname) != 0:
    station.config(dhcp_hostname=dhcp_hostname)
  station.connect(ssid, password)
  while not station.isconnected():
    pass
  print("Station connected !")`,

// Wifi _ configure access point
DEF_WIFI_CONFIGURE_ACCESS_POINT:
`def configure_access_point(ssid='', ip='', activate=True, max_clients=50):
  ap = network.WLAN(network.AP_IF)
  if len(ip) is not 0:
    gateway = ip.split('.')[0] + '.' + ip.split('.')[1] + '.' + ip.split('.')[2] + '.1'
    ap.ifconfig([ip, '255.255.255.0', gateway, gateway])
  ap.active(activate)
  ap.config(essid=ssid, password='')
  ap.config(max_clients=max_clients)
  print("Access point started.")
  print("Note: Connecting to the access point on iOS may take ~1 min\\n")
  return ap`,

// Wifi _ disconnect station
DEF_WIFI_DISCONNECT_STATION:
`def disconnect_station():
  if station is not None and station.isconnected():
    ssid = station.config('essid')
    station.disconnect()
    for retry in range(100):
      connected = station.isconnected()
      if not connected:
        break
      utime.sleep(0.1)
    if not connected:
      station.active(False)
      utime.sleep(0.2)
      print("Disconnected from '%s'\\n" %ssid)
    else:
      print("Disconnection from '%s' failed.\\n" %ssid)
  else:
    print("Station already disconnected.\\n")`,

REQUEST_THINGSPEAK_WRITE:
`def request_thingspeak_write(api_key, readings):
  if api_key is not None:
    headers = {'Content-Type': 'application/json'}
    request = urequests.post('https://api.thingspeak.com/update?api_key=' + api_key.strip(), json = readings, headers = headers)
    if request is not None:
      response = request.text
      request.close()
      if response is '0':
        print("[ThingSpeak INFOS] Error: Please check if your API key or field index is correct. Check delay.")
        print("[ThingSpeak INFOS] Note: You have to wait at least 15 seconds between each value sending.")
      elif '400 Bad Request' in response:
        print("[ThingSpeak INFOS] unable to send data to Thingspeak. Error: 400 Bad Request")
      else:
        print("[ThingSpeak INFOS] readings = {} (entry n°{})".format(readings, response))
        return response`,

REQUEST_THINGSPEAK_READ_FIELD:
`def request_thingspeak_readFeeds(channelID, api_key, field = None, results = None):
  if channelID is not None and api_key is not None:
    url = 'https://api.thingspeak.com/channels/' + channelID
    if field is None:
      url += 'feeds'
    else:
      url += '/fields/' + str(field)
    url += '.json?api_key=' + api_key
    if results is not None:
      url += '&results=' + str(results)
    request = urequests.request(method = 'GET', url = url)
    if request.text is '-1':
      print("[ThingSpeak INFOS] Error: Please check if your API key is correct.")
    return request.json()
  else:
    print("Unable to get feeds from channel " + channelID)`,

UMAIL_SEND_MAIL:
`def umail_sendMail(smtp_config, data, img = False):
  if data is not None:
    smtp = esp32_umail.SMTP(smtp_config['type'][0], smtp_config['type'][1], ssl = True)
    smtp.login(smtp_config['user_mail'], smtp_config['password'])
    smtp.to(smtp_config['recipient'])
    if 'sender' in smtp_config:
      smtp.write('From:' + smtp_config['sender'] + '\\n')
    if 'subject' in smtp_config:
      smtp.write('Subject:' + smtp_config['subject'] + '\\n')
    if img:
      if isinstance(data, bytes):
        data = data.decode()
      smtp.write("Content-Type: text/html\\n")
      smtp.write('<html><body><img src="data:image/jpeg;base64,' + data + '"></body></html>' + '\\n')
    else:
      smtp.write(data + "\\n")
    smtp.send()
    smtp.quit()`,

// Javacript function for server //

JAVSCRIPT_ON_BUTTON_CLICK:
`const http_onButtonClick = function(id) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/" + id + "=1", true);
  xhttp.send(null);
};`,

JAVSCRIPT_SEND_SLIDER_VALUE:
`const http_sendSliderValue = function(slider, id) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/" + id + "=" + slider.value, true);
  xhttp.send(null);
};`,

JAVSCRIPT_ON_SWITCH_TOGGLE:
`const http_onSwitchToggle = function(id) {
  const state = document.getElementById(id).checked;
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/" + id + "=" + (state ? 1 : 0), true);
  xhttp.send(null);
};`,

JAVASCRIPT_REQUEST_VARIABLES_FROM_SERVER:
`const requestVariablesFromServer = function(ip) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200 && this.responseText != null) {
      try {
        const serverResponse = JSON.parse(request.responseText);
        if (serverResponse.spans) {
          for (var i in serverResponse.spans) {
            document.getElementById(i).innerText = serverResponse.spans[i];
          }
        }
        if (serverResponse.gauges) {
          for (var i in serverResponse.gauges) {
            if (myGauges[i]) {
              setGaugeValue(serverResponse.gauges[i], myGauges[i].min, myGauges[i].max, i);
            }
          }
        }
        if (serverResponse.images) {
          for (var i in serverResponse.images) {
            document.getElementById(i).src = 'data:image/jpeg;base64,' + serverResponse.images[i];
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  request.open('GET', "/requestVariables&ip=" + ip, true);
  request.send(null);
  setTimeout(function () {
    requestVariablesFromServer(ip);
  }, 150);
};`,

JAVASCRIPT_SET_GAUGE_VALUE:
`function setGaugeValue(value, min, max, gaugeId, unit="") {
  console.log(value, min, max, gaugeId)
  if (!isNaN(parseFloat(value))) {
    if (value > max) {
      value = max;
    }
    const newVal = gaugeScaleValue(parseFloat(value), [min, max], [0, 180]);
    const gaugeDiv = document.getElementById(gaugeId)
    const gaugeClass = gaugeDiv.querySelectorAll('.semi-circle--mask')[0]
    gaugeClass.style.transform = 'rotate(' + newVal + 'deg)  translate3d(0,0,0)';
    textValue = gaugeDiv.querySelector("#gauge_value").innerHTML = value + unit;
  }
};
function gaugeScaleValue(value, from, to) {
  const scale = (to[1] - to[0]) / (from[1] - from[0]);
  const capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return ~~(capped * scale + to[0]);
};`,

// Css style for server //
CSS_DEFAULT_SWITCHER:
`.switch {position:relative;display:inline-block;}
.switch input {opacity:0;width:0;height:0;}
.sw_slider {position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:.4s;}
.sw_slider:before {position:absolute;content:"";background-color:white;transition:.4s;}
.sw_slider.round {border-radius:34px;}
.sw_slider.round:before {border-radius:50%;}`,

CSS_DEFAULT_SLIDER:
`.slider {-webkit-appearance:none;background:#e3e3e3;outline:none;opacity:0.7;-webkit-transition:.2s;transition:opacity .2s;border:solid;border-color:#c3c3c3;margin-top:15px}
.slider::-webkit-slider-thumb {-webkit-appearance:none;appearance:none;background:#22b573;cursor:pointer;}`,

CSS_DEFAULT_INIT:
`div {margin-left:auto;margin-right:auto;}
.police {font-family: Montserrat, serif;}`,

CSS_GAUGE_STYLE:
`.mask {position:relative;overflow:hidden;display:block;width:12.5rem;height:6.25rem;margin:1.25rem;}
.semi-circle {position:relative;display:block;width:12.5rem;height:6.25rem;background:linear-gradient(to right,#3498db 0%,#05b027 33%,#f1c40f 70%,#c0392b 100%);border-radius:50% 50% 50% 50% / 100% 100% 0% 0%;}
.semi-circle::before {content:"";position:absolute;bottom:0;left:50%;z-index:2;display:block;width:8.75rem;height:4.375rem;margin-left:-4.375rem;background:#fff;border-radius:50% 50% 50% 50% / 100% 100% 0% 0%;}
.semi-circle--mask {position:absolute;top:0;left:0;width:12.5rem;height:12.5rem;background:transparent;transform:rotate(120deg) translate3d(0,0,0);transform-origin:center center;backface-visibility:hidden;transition:all 0.3s ease-in-out;}
.semi-circle--mask::before {content:"";position:absolute;top:0;left:0%;z-index:2;display:block;width:12.625rem;height:6.375rem;margin:-1px 0 0 -1px;background:#f2f2f2;border-radius:50% 50% 50% 50% / 100% 100% 0% 0%;}`,

CSS_IMAGE_STYLE:
`.frame {border: 3px solid #22b573;background: #e3e3e3;margin: auto;padding: 6px 10px;border-radius:10px;}
img {width: 100%;height: 100%;border-radius: 6px;}`

};