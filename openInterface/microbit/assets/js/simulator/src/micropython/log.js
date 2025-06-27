// micro:bit - log module

var $builtinmodule = function (name) {

    var log = {};
    log.__name__ = new Sk.builtin.str("log");
    
    
    self.LABLES= [];
    self.TIMESTAMP = null;
    self.INITIALIZE= false;
    self.counter= 0;
    self.startingCouter= 0;
    Simulator.Mosaic.specific.logTable.headers = []
    Simulator.Mosaic.specific.logTable.rows = []
    const RESULT_TABLE_HEADERS = Simulator.Mosaic.specific.logTable.headers
    const RESULT_TABLE = Simulator.Mosaic.specific.logTable.rows

    const pulesAnim =  () => {
        $('#mb-log_anim').css('opacity', '1');
        setTimeout(() => {
            $('#mb-log_anim').css('opacity', '0');
        }, 100);
    }

    // async wait board to ensure that log module is loaded before adding button
    const waitBoard = async () => {
        return new Promise(resolve => {
          const image = document.querySelector('.mb-log_base');
          if (image.complete) {
            resolve("board loaded");
          } else {
            image.addEventListener('load', () => resolve("board loaded"));
          }
        });
      };
      
      waitBoard().then(() => {
        Simulator.Mosaic.specific.logTable.openLog();
      });

    log.set_labels = new Sk.builtin.func(function (labels, timestamp) {
        const collumns = Sk.ffi.remapToJs(labels);
        self.TIMESTAMP = (timestamp.v).toLowerCase() ;
        self.LABELS = [...collumns ];
        return new Sk.builtin.none();
    });

    log.delete_log = new Sk.builtin.func(function () {
        return new Sk.builtin.none();
    });
    
    log.set_mirroring = new Sk.builtin.func(function () {
        return new Sk.builtin.none();
    });

    log.add_log = new Sk.builtin.func(function () {
        // argument is a list of values (from sensors for example) & labels in the right order => add_log(temperature, humidity, pressure, labels=["temperature", "humidity", "pressure"])
        const label= [...arguments];
        const list = label.pop();

        // necessary to get as many arguments as the user wants
        const finalList = Sk.ffi.remapToJs(list)
        const finalLabel = label.slice(0, label.length);

        // timestamp and labels 
        let firstRow = ""
        if (self.TIMESTAMP && self.LABELS.length > 0) {
            
            firstRow = 'time('+self.TIMESTAMP + ")," + self.LABELS.join(",") + "\n";
        }
        const finalArray = [counter];
        for(let i = 0; i < self.LABELS.length; i++) {
            order = finalList.indexOf(self.LABELS[i].trim());
            if (order !== -1) {
                finalArray.push(Number(finalLabel[order]).toFixed(2))
            } else {
                finalArray.push("")
            };
        }

        // get the right timestamp for simulation
        let divider
        switch (self.TIMESTAMP) {
            case "milliseconds":
                divider = 1;
                break;
            case "seconds":
                divider = 1000;
                break;
            case "minutes":
                divider = 60000;
                break;
            case "hours":
                divider = 3600000;
                break;
            default:
                divider = 1;
        }

        if (!self.INITIALIZE) {
            self.INITIALIZE = true;
            RESULT_TABLE_HEADERS.push('time('+self.TIMESTAMP + ")" , ...self.LABELS)
            returnData = firstRow;
            InterfaceMonitor.writeConsole(returnData)
            self.startingCouter = new Date().getTime();
            
        } else {
            RESULT_TABLE.push(finalArray.join(","))
            returnData = finalArray.join(",") + "\n";
            InterfaceMonitor.writeConsole(returnData)
            self.counter = (new Date().getTime() - self.startingCouter)/ divider;
        }
        // pulse log Animation 100ms
        pulesAnim();
        
        return new Sk.builtin.none();
    });

    
    

    return log;
};