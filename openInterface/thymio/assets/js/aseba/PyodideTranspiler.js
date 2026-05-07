class ATranspiler {
	static instance = null;
	constructor() {
		if (ATranspiler.instance) {
			return ATranspiler.instance;
		}
		this.pyodide = null;
		this.initPromise = this.initPyodide();
		ATranspiler.instance = this;
	}

	async initPyodide() {
		this.pyodide = await loadPyodide({
            indexURL: '/openInterface/interfaces/assets/js/external/pyodide-0.29/',
            fullStdLib: false
        });
		await this.pyodide.loadPackage('micropip');
		await this.pyodide.runPythonAsync(`
            import micropip
            await micropip.install('/openInterface/interfaces/assets/js/external/pyodide-0.29/tdmclient-0.1.21-py3-none-any.whl')
        `);
		console.log('tdmclient installed successfully');
	}

	async transpile(code) {
		await this.initPromise;
		if (!this.pyodide) {
			console.error('Pyodide is not initialized yet.');
			return { success: false, code: null };
		}
		let codePython = code;
		this.pyodide.globals.set('codePython', codePython);
		try {
			let transpiledCode = this.pyodide.runPython(`
                from tdmclient.atranspiler import ATranspiler
                # Transpile the code
                code = ATranspiler.simple_transpile(codePython)
                code
            `);
			return { success: true, code: transpiledCode };
		} catch (e) {
			console.error('error:', e);
			return { success: false, error: e.toString() };
		}
	}
}

window.PyodideATranspiler = ATranspiler;