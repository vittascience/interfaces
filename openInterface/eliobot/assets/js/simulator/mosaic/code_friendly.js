Simulator.CodeFriendly.getAdaptedCode = function (code) {
	code = Simulator.CodeFriendly.eliobot(code);
	code = Simulator.CodeFriendly.unused_imports(code);
	return code;
};

Simulator.CodeFriendly.eliobot = function (code) {
	code = code.replace(/buttonPin\.value/g, 'buttonPin.is_pressed()');
    code = code.replace(/elio.getLine\((\d+)\) < seuil/g,`elio.getLineSensor($1)`);
	return code;
};

Simulator.CodeFriendly.unused_imports = function (code) {
	code = code.replace(/from analogio import AnalogIn/g, '');
	return code;
};