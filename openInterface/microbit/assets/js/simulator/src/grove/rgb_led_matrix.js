// STM32 - rgb_led_matrix module

var $builtinmodule = function () {

    var rgb_led_matrix = {};

    rgb_led_matrix.GroveTwoRGBLedMatrix = new Sk.misceval.buildClass(rgb_led_matrix, function ($gbl, $loc) {

        GroveTwoRGBLedMatrix__init__ = function (self, i2c, addr) {
            Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 1, 3);
            Sk.builtin.pyCheckType("addr", "integer", Sk.builtin.checkInt(addr));
            self.i2c = i2c;
            self.addr = addr.v;
            self.x = 0;
            self.y = 0;

            let size = 64;
            self.matrix = new Array(size);
            let html = '<div class="led-grid">',
                row = '<div class="led-row">';
            row += '<div class="led"></div>';
            
            for (var led = 0; led < self.matrix.length; led++) {
                if ((led + 1) % 8 == 0) {
                    html += row + "</div>";
                    row = '<div class="led-row">';
                }
                row += '<div class="led"></div>';
            }
            html += "</div>";
            $('#RGBLEDMatrix_value').html(html);
        };

        GroveTwoRGBLedMatrix__init__.co_varnames = ['self', 'i2c', 'addr'];
        GroveTwoRGBLedMatrix__init__.$defaults = [Sk.builtin.none(), Sk.builtin.none(), new Sk.builtin.int_(0)];

        $loc.__init__ = new Sk.builtin.func(GroveTwoRGBLedMatrix__init__);

        $loc.displayFrames = new Sk.builtin.func(async function (self, draw, duration_time, forever_flag, frames_number) {
            const led_rows = $('#RGBLEDMatrix_value .led-grid .led-row');    
            let icon = draw.v,
                hex_icon = [],
                row = [];
                      
            for (var i = 0; i < icon.length; i++) {
                let hex_color = COLOURS[icon[i].v];
                if (row.length < 8) {
                    row.push(hex_color);
                } else {
                    hex_icon.push(row.reverse());
                    row = [];
                    row.push(hex_color);
                }
            }
            hex_icon.push(row.reverse());
            for (var i = 0; i < hex_icon.length; i++) {
                for (var j = 0; j < hex_icon[i].length; j++) {
                    let row = $(led_rows[i]).children();
                    $(row[j]).css('background-color', hex_icon[j][i]);
                }
            }
            if (!forever_flag.v) {
                await new Promise(r => setTimeout(r, duration_time.v));
                const rgb_led_rows = $('#RGBLEDMatrix_value .led-grid .led-row');
                for (let i = 0; i < rgb_led_rows.length ; i++){
                    let row = $(rgb_led_rows[i]).children();
                    for (let j = 0 ; j < row.length ; j++)
                        $(row[j]).css('background-color', '#000000');
                }   
            }
        });        
        
        $loc.stopDisplay = new Sk.builtin.func(function (self) {
            const rgb_led_rows = $('#RGBLEDMatrix_value .led-grid .led-row');
            for (let i = 0; i < rgb_led_rows.length ; i++){
                let row = $(rgb_led_rows[i]).children();
                for (let j = 0 ; j < row.length ; j++)
                    $(row[j]).css('background-color', '#000000');
            }    
        });
    });
    
    const COLOURS = {
        '0' : '#ff0000',
        '1' : '#ff0600',
        '2' : '#ff0c00',
        '3' : '#ff1200',
        '4' : '#ff1800',
        '5' : '#ff1e00',
        '6' : '#ff2400',
        '7' : '#ff2a00',
        '8' : '#ff3000',
        '9' : '#ff3600',
        '10' : '#ff3c00',
        '11' : '#ff4200',
        '12' : '#ff4800',
        '13' : '#ff4e00',
        '14' : '#ff5400',
        '15' : '#ff5a00',
        '16' : '#ff6000',
        '17' : '#ff6600',
        '18' : '#ff6c00',
        '19' : '#ff7200',
        '20' : '#ff7800',
        '21' : '#ff7e00',
        '22' : '#ff8400',
        '23' : '#ff8a00',
        '24' : '#ff9000',
        '25' : '#ff9600',
        '26' : '#ff9c00',
        '27' : '#ffa200',
        '28' : '#ffa800',
        '29' : '#ffae00',
        '30' : '#ffb400',
        '31' : '#ffba00',
        '32' : '#ffc000',
        '33' : '#ffc600',
        '34' : '#ffcc00',
        '35' : '#ffd200',
        '36' : '#ffd800',
        '37' : '#ffde00',
        '38' : '#ffe400',
        '39' : '#ffea00',
        '40' : '#fff000',
        '41' : '#fff600',
        '42' : '#ffff00',
        '43' : '#f9ff00',
        '44' : '#f3ff00',
        '45' : '#edff00',
        '46' : '#e7ff00',
        '47' : '#e1ff00',
        '48' : '#dbff00',
        '49' : '#d5ff00',
        '50' : '#cfff00',
        '51' : '#c9ff00',
        '52' : '#c3ff00',
        '53' : '#bdff00',
        '54' : '#b7ff00',
        '55' : '#b1ff00',
        '56' : '#abff00',
        '57' : '#a5ff00',
        '58' : '#9fff00',
        '59' : '#99ff00',
        '60' : '#93ff00',
        '61' : '#8dff00',
        '62' : '#87ff00',
        '63' : '#81ff00',
        '64' : '#7bff00',
        '65' : '#75ff00',
        '66' : '#6fff00',
        '67' : '#69ff00',
        '68' : '#63ff00',
        '69' : '#5dff00',
        '70' : '#57ff00',
        '71' : '#51ff00',
        '72' : '#4bff00',
        '73' : '#45ff00',
        '74' : '#3fff00',
        '75' : '#39ff00',
        '76' : '#33ff00',
        '77' : '#2dff00',
        '78' : '#27ff00',
        '79' : '#21ff00',
        '80' : '#1bff00',
        '81' : '#15ff00',
        '82' : '#0fff00',
        '83' : '#09ff00',
        '84' : '#03ff00',
        '85' : '#00ff00',
        '86' : '#00ff06',
        '87' : '#00ff0c',
        '88' : '#00ff12',
        '89' : '#00ff18',
        '90' : '#00ff1e',
        '91' : '#00ff24',
        '92' : '#00ff2a',
        '93' : '#00ff30',
        '94' : '#00ff36',
        '95' : '#00ff3c',
        '96' : '#00ff42',
        '97' : '#00ff48',
        '98' : '#00ff4e',
        '99' : '#00ff54',
        '100' : '#00ff5a',
        '101' : '#00ff60',
        '102' : '#00ff66',
        '103' : '#00ff6c',
        '104' : '#00ff72',
        '105' : '#00ff78',
        '106' : '#00ff7e',
        '107' : '#00ff84',
        '108' : '#00ff8a',
        '109' : '#00ff90',
        '110' : '#00ff96',
        '111' : '#00ff9c',
        '112' : '#00ffa2',
        '113' : '#00ffa8',
        '114' : '#00ffae',
        '115' : '#00ffb4',
        '116' : '#00ffba',
        '117' : '#00ffc0',
        '118' : '#00ffc6',
        '119' : '#00ffcc',
        '120' : '#00ffd2',
        '121' : '#00ffd8',
        '122' : '#00ffde',
        '123' : '#00ffe4',
        '124' : '#00ffea',
        '125' : '#00fff0',
        '126' : '#00fff6',
        '127' : '#00fffc',
        '128' : '#00ffff',
        '129' : '#00f9ff',
        '130' : '#00f3ff',
        '131' : '#00edff',
        '132' : '#00e7ff',
        '133' : '#00e1ff',
        '134' : '#00dbff',
        '135' : '#00d5ff',
        '136' : '#00cfff',
        '137' : '#00c9ff',
        '138' : '#00c3ff',
        '139' : '#00bdff',
        '140' : '#00b7ff',
        '141' : '#00b1ff',
        '142' : '#00abff',
        '143' : '#00a5ff',
        '144' : '#009fff',
        '145' : '#0099ff',
        '146' : '#0093ff',
        '147' : '#008dff',
        '148' : '#0087ff',
        '149' : '#0081ff',
        '150' : '#007bff',
        '151' : '#0075ff',
        '152' : '#006fff',
        '153' : '#0069ff',
        '154' : '#0063ff',
        '155' : '#005dff',
        '156' : '#0057ff',
        '157' : '#0051ff',
        '158' : '#004bff',
        '159' : '#0045ff',
        '160' : '#003fff',
        '161' : '#0039ff',
        '162' : '#0033ff',
        '163' : '#002dff',
        '164' : '#0027ff',
        '165' : '#0021ff',
        '166' : '#001bff',
        '167' : '#0015ff',
        '168' : '#000fff',
        '169' : '#0009ff',
        '170' : '#0000ff',
        '171' : '#0600ff',
        '172' : '#0c00ff',
        '173' : '#1200ff',
        '174' : '#1800ff',
        '175' : '#1e00ff',
        '176' : '#2400ff',
        '177' : '#2a00ff',
        '178' : '#3000ff',
        '179' : '#3600ff',
        '180' : '#3c00ff',
        '181' : '#4200ff',
        '182' : '#4800ff',
        '183' : '#4e00ff',
        '184' : '#5400ff',
        '185' : '#5a00ff',
        '186' : '#6000ff',
        '187' : '#6600ff',
        '188' : '#6c00ff',
        '189' : '#7200ff',
        '190' : '#7800ff',
        '191' : '#7e00ff',
        '192' : '#8400ff',
        '193' : '#8a00ff',
        '194' : '#9000ff',
        '195' : '#9600ff',
        '196' : '#9c00ff',
        '197' : '#a200ff',
        '198' : '#a800ff',
        '199' : '#ae00ff',
        '200' : '#b400ff',
        '201' : '#ba00ff',
        '202' : '#c000ff',
        '203' : '#c600ff',
        '204' : '#cc00ff',
        '205' : '#d200ff',
        '206' : '#d800ff',
        '207' : '#de00ff',
        '208' : '#e400ff',
        '209' : '#ea00ff',
        '210' : '#f000ff',
        '211' : '#f600ff',
        '212' : '#ff00ff',
        '213' : '#ff00f9',
        '214' : '#ff00f3',
        '215' : '#ff00ed',
        '216' : '#ff00e7',
        '217' : '#ff00e1',
        '218' : '#ff00db',
        '219' : '#ff00d5',
        '220' : '#ff00cf',
        '221' : '#ff00c9',
        '222' : '#ff00c3',
        '223' : '#ff00bd',
        '224' : '#ff00b7',
        '225' : '#ff00b1',
        '226' : '#ff00ab',
        '227' : '#ff00a5',
        '228' : '#ff009f',
        '229' : '#ff0099',
        '230' : '#ff0093',
        '231' : '#ff008d',
        '232' : '#ff0087',
        '233' : '#ff0081',
        '234' : '#ff007b',
        '235' : '#ff0075',
        '236' : '#ff006f',
        '237' : '#ff0069',
        '238' : '#ff0063',
        '239' : '#ff005d',
        '240' : '#ff0057',
        '241' : '#ff0051',
        '242' : '#ff004b',
        '243' : '#ff0045',
        '244' : '#ff003f',
        '245' : '#ff0039',
        '246' : '#ff0033',
        '247' : '#ff002d',
        '248' : '#ff0027',
        '249' : '#ff0021',
        '250' : '#ff001b',
        '251' : '#ff0015',
        '252' : '#ff000f',
        '253' : '#ff0009',
        '254' : '#ffffff',
        '255' : '#000000'
    };
    return rgb_led_matrix;
};