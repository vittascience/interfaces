Simulator.CodeFriendly.getAdaptedCode = function (code) {
	code = Simulator.CodeFriendly.remove_unusedCode(code);
	code = Simulator.CodeFriendly.requests(code);
	return code;
};

Simulator.CodeFriendly.remove_unusedCode = function (code) {
	// // removing object inits
	code = code.replace(/(.*)UART\((.*)/g, '#$1UART($2');
	code = code.replace(/(.*)uart_(.*)/gi, '#$1uart_$2');
	code = code.replace(/(.*)openlog_[0-9]{1,}(.*)/gi, '$1uart$2');
	code = code.replace(/.*P9813.*/gi, '');
	return code;
};

Simulator.CodeFriendly.requests = function (code) {
	code = code.replace(/((u|)requests\.|)request\((method=|)\'(POST|GET)\',( |)(url=|)(.*)(,( |)data=|)\).text/gi, "$1request($3'$4', $6$7$8).text()");
	code = code.replace(/request.text/gi, "request.text()");
	return code;
};