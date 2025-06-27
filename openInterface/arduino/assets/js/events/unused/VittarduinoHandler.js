// the main handler for VittaInterface.

const VittarduinoHandler = function () {
    this.MIN_PORT = 8990; // arduino create agent use a range of ports from 8990 to 9000.
    this.MAX_PORT = 9000; // see the docs for more (https://github.com/arduino/arduino-create-agent)

    this.INFO_PATH = "/info"; // the path to the endpoints provider.

    this.WS_METHOD = "wss"; // can be ws or wss.
    this.HTTP_METHOD = "https"; // can be http or https.

    this.HTTP_ENDPOINT = null; // listing the agent endpoints (WebSocket and HTTP).
    this.HTTPS_ENDPOINT = null;
    this.WS_ENDPOINT = null;
    this.WSS_ENDPOINT = null;
    this.SERVER_DOMAIN = "localhost";

    this.port = null; // where we store the port on success when discovering the agent port.

    this.socket = null; // the main socket for the connection to the arduino agent.

    this.SDK_VERSION = 184; // the Arduino SDK version used on the backend
    this.COMPILE_SERVICE_URL = "/services/post/postCompile.php"; // service URL for sending request to the compiler server.

    this.UPLOAD_PATH = "/upload";
    this.uploadWaitingState = false; // this flag is used while we upload code in the arduino
    // when we must close the registred opened ports before uploading.
    // the upload process will stop until the port closure
    // has been confirmed by the agent.

    this.openedPorts = [];
    this.currentPort = null; // the current open port on the agent (in practice this is the port where we uploaded  some code).

    this.initFlagUSB = true;
    this.initFlagNetwork = true;

    this.mainInitFlag = true;

    this.LIST_DELAY = 3000; // delay before re-listing new devices.

    this.DISCOVERY_DELAY = 500;

    this.MAX_CONSOLE_LINES = 500;
    this.MAX_CONSOLE_CHARS = 5000;

    this.AUTO_SCROLL = true;

    this.PARSING_MESSAGE = false;

    this.tools = ["windows-drivers", "bossac", "avrdude"];

    this.NO_PLUGIN = false;

    this.IS_FIREFOX = false;
    this.CONSOLE_MESSAGE = {
        "default": "var(--text-0)",
        "warning": "red",
        "neutral": "grey",
        "success": "green",
        "interrupt": "orange",
    };
    this.history = [];
    this.historyCursor = 'no';
};