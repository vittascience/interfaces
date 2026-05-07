Simulator.CodeFriendly.getAdaptedCode = function (code) {
	code = Simulator.CodeFriendly.requests(code);
	return code;
};

Simulator.CodeFriendly.requests = function (code) {
	code = code.replace(/((u|)requests\.|)request\((method=|)\'(POST|GET)\',( |)(url=|)(.*)(,( |)data=|)\).text/gi, "$1request($3'$4', $6$7$8).text()");
	code = code.replace(/request.text/gi, "request.text()");
	return code;
};