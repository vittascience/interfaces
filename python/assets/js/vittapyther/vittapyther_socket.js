
/**
 * The socket object that will be in charge of communication with node server
 * @param {Object} args - Contains all the necessary parameters to instanciate the socket
 * @param {Element} args.pythonOutputElt - The DOM element where the python evaluation output will be added
 * @param {Element} args.poetryOutputElt - The DOM element where the poetry output will be added
 * @param {boolean} args.promptArrows - Boolean that define if the repl prompt arrows (>>>) will be displayed (true by default)
 * @param {string} args.serverAddress - Server address provided as argument of the VittapytherSocket class
 */
class VittapytherSocket{
	constructor(args){
		// The DOM element where the python evaluation output will be added
		this.pythonOutputElt = args.pythonOutputElt;
		// The DOM element where the poetry output will be added
		this.poetryOutputElt = args.poetryOutputElt;
		// Boolean that define if the repl prompt arrows (>>>) will be displayed (true by default)
		this.promptArrows = args.promptArrows !== false;
		// The server address provided as argument of the VittapytherSocket class
		this.serverAddress = args.serverAddress;
		// The instanciation of the socket (false by default)
		this.socket = false;
		this.lang
	}

	/**
	 * Initialize the connection and all the event listeners
	 */
	init(){
		this.socket = io(this.serverAddress, {transports: ['websocket']});
		this.events();
	}

	/**
	 * Execute all the methods that add socket listeners
	 */
	events(){
		this.pythonResultsListener();
		this.poetryResultsListener();
	}
	
	/**
	 * Add the listener that listen to the incoming socket "python_result" messages
	 */
	pythonResultsListener(){
		this.socket.on('python_result', (data) => {
			PythonREPL.clear();
			if(!this.promptArrows){
				if(data.match(/^>>>/) || data.match(/^\.\.\./)){
					PythonREPL.init();
					PythonREPL.toggleCaret();
					return;
				}
			}
			this.pythonOutputElt.innerHTML = this.pythonOutputElt.innerHTML + data;
			PythonREPL.init();
			PythonREPL.toggleCaret();
		});
	}

	/**
	 * Add the listener that listen to the incoming socket "poetry_stdout" and "poetry_stdout_error" messages
	 */
	poetryResultsListener(){
		this.socket.on('poetry_stdout', (data) => {
			PythonREPL.terminal.innerHTML += data + '\n';
			
		})

		this.socket.on('poetry_stdout_error', (data)=>{
			console.warn(data);
		})
	}

	/**
	 * Send the code to the server to be evaluated as "regular python script"
	 * @param {string} code Code that will be sent to the server to be evaluated
	 * @param {function} callback Callback function that will be run when the python process close it's current task
	 */
	runPython(code, callback){
		this.socket.emit('python_code', code);
		if(callback){
			this.socket.on('python_eval_end', ()=>{
				callback();
			});
		}
		PythonREPL.clear();
		PythonREPL.init();
		PythonREPL.toggleCaret();
	}

	/**
	 * Send the code to the server to be evaluated as "repl python prompts"
	 * @param {string} code Python nstructions that will be sent to the server to be evaluated
	 * @param {function} callback Callback function that will be run when the python process close it's current task
	 */
	runReplPython(code, callback){
		this.socket.emit('repl_code', code);
		if(callback){
			this.socket.on('python_repl_end', ()=>{
				callback();
			});
		}
	}

	sendResize(dimension, callback){
        this.socket.emit('resize', dimension);
    }

	/**
	 * Send the request to clear the python on the server (reset the repl and remove all the graphic elements)
	 */
	clearPython(){
		this.socket.emit('clear', '');
	}
}

export default VittapytherSocket;

