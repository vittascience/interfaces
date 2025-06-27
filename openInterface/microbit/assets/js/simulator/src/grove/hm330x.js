// micro:bit - hm330x module

var $builtinmodule = function () {

    const data = ['pm1', 'pm2_5', 'pm10'];

	var hm330x = {};

	hm330x.HM330X = new Sk.misceval.buildClass(hm330x, function ($gbl, $loc) {

		HM330X__init__ = function (self) {};

		HM330X__init__.co_varnames = ['self'];
		HM330X__init__.$defaults = [];

		$loc.__init__ = new Sk.builtin.func(HM330X__init__);

		$loc.getData = new Sk.builtin.func(function (self, select) {
            if (select === undefined) {
                select = 3;
            } else {
                select = select.v;
            }
            if (select >= 0 && select <= 5) {
                const pm = $('#hm330x_slider_' + data[select - 3]).slider('option', 'value');
                return new Sk.builtin.int_(pm);
            } else {
                // print range error
            }
		});

	}, "HM330X");


	return hm330x;
};
