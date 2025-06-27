import { courseSchema } from "../../schemas/index.js"
import Galaxia from "./Galaxia.js"

const EXTENSION_STATE = {
    PORT_CLOSED: "PORT_CLOSE",
    PORT_OPENED: "PORT_OPENED",
    PORT_RESERVED: "PORT_RESERVED"
}

const thingzSerialProtocol = {
    type: {
        SYSTEM:1,
        USER:2,
        PLUGGED:3,
        UNPLUGGED:4,
        OVERRECEIVING: 5,
        GET_BRICKS: 6,
        PYTHON_INTERRUPT: 7,
        TOTAL:8
    }
}

class ExtensionCmd{
    constructor(promise, resolve, reject){
        this.promise = promise
        this.resolve = resolve
        this.reject = reject
    }

    stop(){
        this.reject("reset")
    }
}

class ExtensionWebSerial{
    constructor(){
        this.ports = []
        this.cmds = []
        this.galaxia = null
        this.onMessageCB = null;
        this.onDisconnectCB = null;
        this.ignoreReset = false
        this.reader = null
        this.writer = null
    
        this.state = EXTENSION_STATE.PORT_CLOSED;

        this.config = {
            useThingzProtocolOverSerial: false
        }

        //to be compatible with historical chrome port object
        //______________________________________________
        this.onMessage = {
            addListener: (callback) => {
                this.onMessageCB = callback;
            }
        }

        this.onDisconnect = {
            addListener: (callback) => {
                this.onDisconnectCB = callback;
            }
        }
        //______________________________________________

        this.init()
    }

    onSerialDisconnect = (event) => {
        let p = event.target
        // let callCb = this.onDisconnectCB //&& this.state !== EXTENSION_STATE.PORT_RESERVED;

        for(let i = 0; i < this.ports.length; i++){
            if(this.ports[i] == p){
                this.ports.splice(i, 1)
                break;
            }
        }

        if(p == this.port){
            this.port = null
            this.reader = null
            this.writer = null
            if(this.state !== EXTENSION_STATE.PORT_RESERVED)
                this.state = EXTENSION_STATE.PORT_CLOSED;
            
            if(!this.ignoreReset){
                this.reset()
                this.respond({cmd: "open", value: "BOARD_DISCONNECTED", status:1})
            }
            this.ignoreReset = false
        }
    }

    onSerialConnect = (event) => {
        this.ports.push(event.target)
    }

    async init(){
        try{
            let ports = await navigator.serial.getPorts()
            if(ports.length)
                this.ports = ports;
            
            navigator.serial.addEventListener("connect", this.onSerialConnect);

            navigator.serial.addEventListener("disconnect", this.onSerialDisconnect);
        }catch(e){
            console.log(e)
        }
    }

    getReader(){
        if(this.reader)
            return this.reader
        if(this.port){
            this.reader = this.port.readable.getReader()
            return this.reader;
        }
        return null
    }

    setReader(reader){
        this.reader = reader;
    }

    getWriter(){
        if(this.writer)
            return this.writer
        if(this.port){
            this.writer = this.port.writable.getWriter()
            return this.writer;
        }
        return null
    }

    prepareForWrite_(value){
        if(!this.config.useThingzProtocolOverSerial){
          let buf       = new ArrayBuffer(value.length);
          let bufView8  = new Uint8Array(buf);
         
          for(let i=0; i < value.length; i++){
            bufView8[i] = value.charCodeAt(i);
          }
          return bufView8;
        }else{
          let buf       = new ArrayBuffer(value.length+3);
          let bufView8  = new Uint8Array(buf);
          bufView8[0] = "s".charCodeAt(0);
          bufView8[1] = thingzSerialProtocol.type.USER;
          bufView8[2] = value.length;
          for(let i=0; i < value.length; i++){
            bufView8[i+3] = value.charCodeAt(i);
          }
          // bufView8[bufView8.length-2] = 0xD;
          // bufView8[bufView8.length-1] = 0xA;
          return bufView8;
        }
    }

    async close_(){
        if(this.port){
            if(this.reader){
                try{
                    await this.reader.cancel()
                }catch(e){
                    console.log(e)
                }
                try{
                    this.reader.releaseLock()
                }catch(e){
                    console.log(e)
                }
                this.reader = null
            }
            if(this.writer){
                try{
                    await this.writer.close()
                }catch(e){
                    console.log(e)
                }
                try{
                    this.writer.releaseLock()
                }catch(e){
                    console.log(e)
                }
                this.writer = null
            }
            
            try{
                await this.port.readable.cancel()
            }catch(e){
                console.log(e)
            }
            try{
                await this.port.close();
            }catch(e){
                console.error(e)
            }
            this.port = null;
            console.log("port closed")
        }
        this.state = EXTENSION_STATE.PORT_CLOSED
    }

    async open_(update_state){
        if(this.port)
            await this.close_()
        if(this.ports.length == 0)
            throw "NO_CARD"
        if(this.ports.length > 1)
            throw "MORE_THAN_ONE_CARD"

        await this.ports[0].open({ baudRate: 115200, buffersize:1024 });
        this.port = this.ports[0]
        
        if(update_state)
            this.state = EXTENSION_STATE.PORT_OPENED

        return this.port
    }

    search(){
        return this.ports.length === 1
    }

    ignoreReset_(ignore){
        this.ignoreReset = ignore
    }

    disconnect(){
        this.onDisconnectCB = null;
        this.onMessageCB = null;
        this.close_()
        this.ports = []
        this.state = EXTENSION_STATE.PORT_CLOSED;
        try{
            navigator.serial.removeEventListener("connect", this.onConnect);

            navigator.serial.removeEventListener("disconnect", this.onDisconnect);
        }catch(e){

        }
    }

    isBoardFound(){
        return this.ports.length;
    }

    askNewPermision = async() => {
        try{
            let port = await navigator.serial.requestPort({filters: [{usbVendorId: 0x239A, usbProductId: 0x80A8}]})
            this.ports = await navigator.serial.getPorts()
        }catch(e){
            console.error(e);
        }
    }

    async reset(){
        this.ignoreReset = false
        for(let cmd of this.cmds){
            cmd.stop()
        }
        this.cmds = []
        if(this.galaxia)
            this.galaxia.release()
        await this.close_()
    }

    respond(msg){
        if(this.onMessageCB)
            this.onMessageCB(msg)
    }

    async handle_msg(msg){
        // let promise, p_resolve, p_reject
        // promise = new Promise(async (resolve, reject) => {
        //     p_resolve = resolve
        //     p_reject = reject
            
            switch(msg.cmd){
                case "version":
                    this.respond({cmd: msg.cmd, status:0, value:"webserial"})
                    // resolve()
                    break;
    
                case "write_files":
                case "compilation":
    
                    if(this.state == EXTENSION_STATE.PORT_RESERVED){
                        this.respond({cmd: msg.cmd, value:"FLASH_INPROGRESS", status: 1})
                        // resolve()
                        return
                    }
                    if(this.state == EXTENSION_STATE.PORT_OPENED){
                        try{
                            await this.close_()
                        }catch(e){
                            this.respond({cmd:msg.cmd, value:"CLOSE_ERROR", status: 1})
                            // resolve()
                            return
                        }
                    }
    
                    try{
                        await this.open_()
                    }catch(e){
                        if(e.toString() === "NO_CARD"){
                            await this.askNewPermision()
                            try{
                                await this.open_()
                            }catch(e){
                                this.respond({cmd:msg.cmd, value:e.toString(), status: 1})
                                return
                            }
                        }else{
                            this.respond({cmd:msg.cmd, value:e.toString(), status: 1})
                            return
                        }
                        // resolve()
                       
                    }
    
                    this.state = EXTENSION_STATE.PORT_RESERVED;
                    
                    let operations = {
                        connect: this.open_.bind(this),
                        discover: this.search.bind(this),
                        willReset: this.ignoreReset_.bind(this),
                        getReader: this.getReader.bind(this),
                        setReader: this.setReader.bind(this),
                        getWriter: this.getWriter.bind(this)
                    }
                    this.galaxia = new Galaxia(this.port, operations)
                    let files = msg.cmd == "write_files" ? msg.data : [{content: msg.data, path: "code.py", main:true}]
                
                    try{
                        await this.galaxia.writeFiles(files)
                        await this.close_()
                        this.respond({cmd:msg.cmd, status: 0})
                        // resolve()
                        return
                    }catch(e){
                        console.log(e)
                        await this.galaxia.release();
                        this.galaxia = null
                        await this.close_();
                        if(e && e.toString() !== "RELEASED")
                            this.respond({cmd:msg.cmd, value: e ? e.toString(): "UNKNOWN", status: 1})
                        // resolve()
                        return
                    }
                    break;
    
                case "open":
                    if(this.state == EXTENSION_STATE.PORT_RESERVED)
                        return this.respond({cmd: msg.cmd, value:"FLASH_INPROGRESS", status: 1})
    
                    if(this.state == EXTENSION_STATE.PORT_OPENED){
                        this.respond({cmd: msg.cmd, value:"ALREADY_OPENED", status: 1})
                        // resolve()
                    }else if(this.ports.length > 1){
                        this.respond({cmd: msg.cmd, value:"MORE_THAN_ONE_CARD", status: 1})
                        // resolve()
                    }else if(this.ports.length == 0){
                        this.respond({cmd: msg.cmd, value:"NO_CARD", status: 1})
                        // resolve()
                    }else{
                        try{
                            await this.open_(true)
                            this.respond({cmd: msg.cmd, value:"OPENED", status: 0})
                            // resolve()
                        }catch(e){
                            this.respond({cmd: msg.cmd, value:"CANT_CONNECT", status: 1})
                            // resolve()
                            return;
                        }
                    }
                    break;
    
                case "write":
    
                    if(this.state == EXTENSION_STATE.PORT_RESERVED){
                        this.respond({cmd: msg.cmd, value:"FLASH_INPROGRESS", status: 1})
                        // resolve()
                        return
                    }
                    
                    if(this.state == EXTENSION_STATE.PORT_OPENED){
                        try{
                            const writer = this.port.writable.getWriter();
                            const data = this.prepareForWrite_(msg.value)
                            await writer.write(data);
                            writer.releaseLock();
                        }catch(e){
                            this.respond({cmd:msg.cmd, value:"NOT_SEND", status: 1})
                            // resolve()
                            return
                        }
                    }else{
                        this.respond({cmd:msg.cmd, value:"COM_NOT_OPENED", status: 1})
                        // resolve()
                        return
                    }
                    break;
                
                case "close":
                    if(this.state == EXTENSION_STATE.PORT_RESERVED){
                        this.respond({cmd: msg.cmd, value:"FLASH_INPROGRESS", status: 1})
                        // resolve()
                        return
                    }
                    
                    if(this.state == EXTENSION_STATE.PORT_OPENED){
                        try{
                            await this.close_()
                            this.respond({cmd:msg.cmd, value:"SUCCESS", status: 0})
                            // resolve()
                            return
                        }catch(e){
                            this.respond({cmd:msg.cmd, value:"ERROR", status: 1})
                            // resolve()
                            return
                        }
                        
                    }else{
                        this.respond({cmd:msg.cmd, value:"COM_NOT_OPENED", status: 1})
                        // resolve()
                        return
                    }
                    break;
                case "search":
                    if(this.state == EXTENSION_STATE.PORT_RESERVED){
                        this.respond({cmd: msg.cmd, value:"FLASH_INPROGRESS", status: 1})
                        // resolve()
                        return
                    }
                    if(this.state == EXTENSION_STATE.PORT_OPENED){
                        this.respond({cmd: msg.cmd, value:"ALREADY_OPENED", status: 1})
                        // resolve()
                        return
                    }
                    if(this.ports.length == 1){
                        //TODO Thingz mini support: check vid/pid to verify if board is in bootloader
                        this.respond({cmd: msg.cmd, value:"FOUND", status: 0 })
                        // resolve()
                        return
                    }else if(this.ports.length == 0){
                        this.respond({cmd: msg.cmd, value:"NO_CARD", status: 1})
                        // resolve()
                        return
                    }else{
                        this.respond({cmd: msg.cmd, value:"MORE_THAN_ONE_CARD", status: 1})
                        // resolve()
                        return
                    }
                    break;
                case "getBricks":
                    this.respond({cmd: msg.cmd, value:"NOT_IMPLEMENTED", status: 1})
                    // resolve()
                    break;

                case "reset":
                    await this.reset()
                    this.respond({cmd: msg.cmd, status: 0})
                    // resolve()
                    break;
                default:
                    this.respond({cmd: msg.cmd, status: 0})
                    // resolve()
                    break;
            }
        // })

        // return new ExtensionCmd(promise, p_resolve, p_reject)
        
    }

    async postMessage(msg){
        console.log(msg)
        try{
            await this.handle_msg(msg)
            // this.cmds.push(cmd)
            // await cmd.promise
            // let index = 0;
            // for(let i = 0; i < this.cmds.length; i++){
            //     if(this.cmds[i] === cmd){
            //         index = i
            //     }
            // }
            // this.cmds.splice(index, 1)
        }catch(e){
            console.log(e)
            this.reset()
            this.respond({cmd: msg.cmd, value:"UNKNOWN_ERROR", status: 1})
        }
    }

}

let extensionWebSerial = new ExtensionWebSerial();
export {extensionWebSerial};