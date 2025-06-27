// RFB holds the API to connect and communicate with a VNC server
import RFB from './core/rfb.js';

/**
 * The VNC client object that will be in charge of communication with vnc server
 * @param {Object} args - Contains all the necessary parameters to instanciate the socket
 * @param {Element} args.serverAddress - The address and port to access the vnc server
 * @param {Element} args.password - The password to be allowed to connect to the server (undefined by default)
 * @param {boolean} args.screenElt - The DOM element where the graphic display will take place
 */
class VittapytherVnc{
	constructor(args){
		this.rfb;
		this.url = args.serverAddress;
		this.password = args.password || undefined;
		this.screenElt = args.screenElt;
		this.events();
	}

	/**
	 * (Method called in the constructor) Runs all the initial methods (the connection and listeners)
	 */
	events(){
		this.startConnection();
		this.listenConnection();
		this.listenDisconnection();
	}

	/**
	 * Set the listener that listens to the connect event
	 */
	listenConnection(){
		this.rfb.addEventListener("connect",  () => {this.connectedToServer});
	}

	/**
	 * Set the listener that listens to the disconnect event
	 */
	listenDisconnection(){
		this.rfb.addEventListener("disconnect", (e) => {this.disconnectedFromServer(e)});
	}

	/**
	 * Instanciate the RFB object to connect and communicate with the server
	 */
	startConnection(){
		this.rfb = new RFB(this.screenElt, this.url, {
				credentials: { password: this.password } 
			});
	}

	/**
	 * Runs the scripts that need to be executed when connected to the vnc server
	 */
	connectedToServer(){
		this.status('VNC connected');
	}

	/**
	 * Runs the scripts that need to be executed when disconnected from the vnc server
	 * @param {object} e The error object generated when disconnected
	 */
	disconnectedFromServer(e){
		if (e.detail.clean) {
			const sleepMode = i18next.t('pythonServer.messages.sleepModeOn');
			PythonREPL.clear();
			PythonREPL.terminal.innerText += "\n " + sleepMode;
			PythonREPL.init();
			PythonREPL.toggleCaret();
			//this.status('Disconnected');
		} else {
			this.status('Something went wrong, connection is closed');
		}
	}

	/**
	 * Manage the way that the status are displayed
	 * @param {string} text 
	 */
	status(text){
		console.log(text);
	}

}

export default VittapytherVnc;