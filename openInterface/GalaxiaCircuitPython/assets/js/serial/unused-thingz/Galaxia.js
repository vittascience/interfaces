class CmdInviteTransformer {
    constructor() {
        this.container = '';
    }
  
    transform(chunk, controller) {
        this.container += chunk;
        if(this.container.includes(">>>")){
            controller.enqueue(this.container)
            this.container = ""
        }
    }
  
    flush(controller) {
        controller.enqueue(this.container);
    }
}

class CmdSendCodeTransformer {
    constructor() {
        this.container = '';
    }
  
    transform(chunk, controller) {
        this.container += chunk;
        // console.log(chunk)
        if(this.container.includes("#thgz end of flash")){
            controller.enqueue(this.container)
            this.container = ""
        }else
            controller.enqueue("chunk")
    }
  
    flush(controller) {
        controller.enqueue(this.container);
    }
}

class Galaxia{

    constructor(port, operations){
        this.port = port;
        // this.reader = operations.getReader()
        // this.writer = operations.getWriter()
        this.operations = operations
        this.released = false;

        this.textEncoder = new TextEncoder()

        // this.reader.releaseLock();


    }

    async release(){
        try{
            await this.reader.cancel()
        }catch(e){
            console.log(e)
        }
        try{
            this.reader.releaseLock();
        }catch(e){
            console.log(e)
        }
        console.log(this.writer)
        try{
            await this.writer.close()
            this.writer.releaseLock();
        }catch(e){
            console.log(e)
        }
        this.released = true
    }

    timeout(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async read(timeout_ms){
        let data;
        let timeout = setTimeout(()=>{
            this.reader = this.operations.getReader()
            try{
                this.reader.cancel()
            }catch(e){
                console.log(e)
            }
        }, timeout_ms)
        data = await this.reader.read()
        clearTimeout(timeout)
        return data
    }

    async retry(func, number, delay, ...args){
        let exc;
        for(let i = 0; i < number; i++){
            if(this.released)
                throw "RELEASED";
            try{
                let status = await func(...args)
            }catch(e){
                console.log(e)
                exc = e
                await this.timeout(delay);
                continue;
            }
            return i+1;
        }
        throw exc;
    }

    async interrupt(){
        let data = "\x03\x03"
        
        this.reader = this.port.readable.pipeThrough(new window.TextDecoderStream()).pipeThrough(new window.TransformStream(new CmdInviteTransformer())).getReader();
        this.operations.setReader(this.reader)
        this.writer = this.operations.getWriter();
        try{
            await this.writer.write(this.textEncoder.encode(data));
            await this.timeout(100);
            await this.writer.write(this.textEncoder.encode(data));
            data = await this.read(750)
            if(!data.done){
                await this.reader.cancel()
                await this.reader.closed
                await this.reader.releaseLock()
                this.operations.setReader(null)
                return 0;
            }
        }catch(e){
            console.error(e)
            return -1;
        }

        throw "FAILED_INTERRUPT"
    }

    async repl(){
        let data = "import microcontroller\r\nmicrocontroller.enable_repl_flash()\r\n"
        this.writer = this.operations.getWriter();
        try{
            await this.writer.write(this.textEncoder.encode(data));
            await this.timeout(500);
            if(!this.port.readable && this.port.closed){
                return 0;
            }
        }catch(e){
            console.error(e)
            return -1;
        }
        throw "FAILED_REPL"
    }

    async wait_connection(){
        this.port = await this.operations.connect(false);
        return 0;
    }

    async send_code(files){
        let to_send = "import os\r\n"
        for(let file of files){
            if(file.main){
                this.main_file = file.path;
            }
            let dir = file.path.split('/')
            let mkdir = "/";
            for(let i = 0; i < dir.length -1; i++){
                mkdir += "/"+dir[i];
                if(dir[i]){
                    to_send += 'os.mkdir("'+mkdir+'")\r\n';
                }
            }
            if(file.mode && file.mode == "binary"){
                to_send += 'f = open("'+file.path+'", "wb")\r\n';
                to_send += file.content;
                to_send += 'f.close()\r\n';
            }else{
                to_send += 'f = open("'+file.path+'", "w")\r\n';
                let content = file.content;
                for(let i = 0; i < content.length; i += 100){
                    to_send += 'f.write(' + JSON.stringify(content.substring(i, i+100)) + ")\r\n";
                }
                to_send += 'f.close()\r\n';
            }
            
        }
        to_send += "#thgz end of flash\r\n";
        for(let i = 0; i < 10; i++){
            try{
                this.reader = this.port.readable.pipeThrough(new window.TextDecoderStream()).pipeThrough(new window.TransformStream(new CmdSendCodeTransformer())).getReader();
                this.operations.setReader(this.reader)
                // this.reader = this.operations.getReader()
                break;
            }catch(e){

            }
            await this.timeout(100)
        }
        try{
            for(let i = 0; i < to_send.length;){
                let next_i = to_send.indexOf('\r\n', i+200);
                if(next_i == -1)
                    next_i = to_send.length
                next_i+=3
                let sub = to_send.substring(i, next_i)
                i = next_i
                // console.log("WRITING", sub)
                await this.writer.write(this.textEncoder.encode(sub));
                let data = await this.read(5000)
                
                if(data.value && data.value.includes("#thgz end of flash")){
                    await this.reader.cancel()
                    await this.reader.closed
                    this.reader.releaseLock()
                    return 0;
                }
            }
            console.log("write done")
            while(true){
                let data = await this.read(5000)
                // console.log("READING", data)
                
                if(data.value && data.value.includes("#thgz end of flash")){
                    await this.reader.cancel()
                    await this.reader.closed
                    this.reader.releaseLock()
                    return 0;
                }

                if(data.done){
                    break
                }
            }
        }catch(e){
            console.error(e)
            throw "FAILED_SEND_CODE"
        }
        throw "FAILED_SEND_CODE"

    }

    async set_file_to_exec(){
        let data = "import microcontroller\r\nmicrocontroller.set_file_to_execute(\""+this.main_file+"\")\r\nmicrocontroller.reset()\r\n"
        this.writer = this.operations.getWriter()
        try{
            await this.writer.write(this.textEncoder.encode(data));
            await this.timeout(100);
            if(!this.port.readable){
                return 0;
            }
        }catch(e){
            console.error(e)
            return -1;
        }
        throw "FAILED_REPL"
    }

    async wait_discover(){
        if(this.operations.discover())
            return 0;
        throw "NO_CARD";
    }

    async step(func, ...args){
        // console.log(func, args)
        let result = await func(...args)
        if(this.released)
            throw "RELEASED"
        return result
    }

    async writeFiles(files){
        let retry = await this.step(this.retry.bind(this), this.interrupt.bind(this), 5, 250);
        console.log("interrupt success after "+retry+" tries")
        this.operations.willReset(true)
        retry = await this.step(this.retry.bind(this), this.repl.bind(this), 5, 250)
        this.operations.willReset(false)
        console.log("repl success after "+retry+" tries")
        retry = await this.step(this.retry.bind(this), this.wait_connection.bind(this), 20, 1000)
        console.log("reconnection success after "+retry+" tries")
        retry = await this.step(this.retry.bind(this), this.interrupt.bind(this), 5, 250);
        console.log("interrupt success after "+retry+" tries")
        await this.step(this.send_code.bind(this), files);
        console.log("send_code success")
        this.operations.willReset(true)
        retry = await this.step(this.retry.bind(this), this.set_file_to_exec.bind(this), 5, 250)
        this.operations.willReset(false)
        console.log("reset success")
        retry = await this.step(this.retry.bind(this), this.wait_discover.bind(this), 60, 1000)
        return 0;
    }
}

export default Galaxia