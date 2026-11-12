Simulator.CodeFriendly.getAdaptedCode = function (code) {
	// Skulpt rejects async/await: calls become blocking (the sleeps are suspensions) and the runloop is the program itself.
	// ponytail: regex, touches "await" inside a string too; a single main() is assumed. Move to an AST if it gets in the way.
	return code.replace(/\basync def\b/g, 'def').replace(/\bawait\s+/g, '').replace(/^runloop\.run\((.*)\)$/gm, '$1');
};
