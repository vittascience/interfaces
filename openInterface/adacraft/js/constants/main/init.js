//name
const INTERFACE_NAME = "adacraft";
//code
const DEFAULT_XML_START = '{"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["ma variable",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"cd21514d0531fdffb22204e0ec5ed84a","name":"arrière-plan1","md5ext":"cd21514d0531fdffb22204e0ec5ed84a.svg","dataFormat":"svg","rotationCenterX":240,"rotationCenterY":180}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"VittaBot","variables":{},"lists":{},"broadcasts":{},"blocks":{"^J6p3^:4weg)AoDq2E3Q":{"opcode":"event_whenflagclicked","next":"UMN=a*UxIePF)/x/5kNZ","parent":null,"inputs":{},"fields":{},"shadow":false,"topLevel":true,"x":187,"y":123},"UMN=a*UxIePF)/x/5kNZ":{"opcode":"looks_sayforsecs","next":null,"parent":"^J6p3^:4weg)AoDq2E3Q","inputs":{"MESSAGE":[1,[10,"Bonjour !"]],"SECS":[1,[4,"2"]]},"fields":{},"shadow":false,"topLevel":false}},"comments":{},"currentCostume":0,"costumes":[{"assetId":"3071275c1077cd6b11953b25eece18ae","name":"VittaBot","bitmapResolution":1,"md5ext":"3071275c1077cd6b11953b25eece18ae.svg","dataFormat":"svg","rotationCenterX":24,"rotationCenterY":23}],"sounds":[],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}],"monitors":[],"extensions":[],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":""}}';
const DEFAULT_CODE_START = '';
//modes
const MODE_CODE = "code";
const MODE_BLOCKS = "blocks";
const MODE_MIXED = "mixed";
const MODE_CODE_ONLY = "codeOnly";
const MODE_CONSOLE_ONLY = "consoleOnly";
const MODE_SIMU_ONLY = ""; //no simulator in adacraft
//example projects
const EXAMPLE_PROJECT_LINKS = [];
//autocorrector
const AUTOCORRECTOR_DISABLED = true;