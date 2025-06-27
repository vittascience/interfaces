// Galaxia ui module
var $builtinmodule = function (name) {

    $("#galaxia_screen-value").html(GALAXIA_SHELL_START);
    
    
    var galaxiaUi = {};

    // galaxiaUi.__name__= new Sk.builtin.str("thingz");
    var Display = new Sk.misceval.buildClass(galaxiaUi, function($gbl, $loc) {
        console.log(Simulator.pinList)
        

        $loc.add_point = new Sk.builtin.func(function (self) {
            Simulator.pinList.map((pin)=>{
                const pinNum=pin.id
                // console.log(pinNum)
                // const suffix = mod.listeners ? mod.listeners[0].suffix : "";
                const value = $("#" + pinNum + "_slider").slider('option', 'value');
                console.log(value)
            });
        });
        $loc.show = new Sk.builtin.func(function (self) {
            console.log('la')
            }
        );
        $loc.set_y_scale= new Sk.builtin.func(function (self) {
            console.log('coucou')
        }
        );


    });

    galaxiaUi.galaxyUi = new Display();

    return galaxiaUi
}