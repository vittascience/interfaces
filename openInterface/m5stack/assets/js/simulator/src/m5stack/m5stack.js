// M5Stack - m5stack module

var $builtinmodule = function (name) {

	var m5stack = {};

	m5stack.__name__ = new Sk.builtin.str('m5stack');

	var M5Screen = new Sk.misceval.buildClass(m5stack, function ($gbl, $loc) {

		$loc.FONT_Default = new Sk.builtin.int_(0);
		$loc.FONT_DejaVu18 = new Sk.builtin.int_(1);
		$loc.FONT_DejaVu24 = new Sk.builtin.int_(2);
		$loc.FONT_Ubuntu = new Sk.builtin.int_(3);
		$loc.FONT_Comic = new Sk.builtin.int_(4);
		$loc.FONT_Minya = new Sk.builtin.int_(5);
		$loc.FONT_Tooney = new Sk.builtin.int_(6);
		$loc.FONT_Small = new Sk.builtin.int_(7);
		$loc.FONT_DefaultSmall = new Sk.builtin.int_(8);
		$loc.FONT_7seg = new Sk.builtin.int_(9);
		$loc.FONT_DejaVu40 = new Sk.builtin.int_(11);
		$loc.FONT_DejaVu56 = new Sk.builtin.int_(12);
		$loc.FONT_DejaVu72 = new Sk.builtin.int_(13);
		$loc.FONT_UNICODE = new Sk.builtin.int_(16);

		M5Screen__init__ = function (self) {
			return Sk.builtin.none();
		};

		$loc.__init__ = new Sk.builtin.func(M5Screen__init__);

		$loc.setRotation = new Sk.builtin.func(function (self, id) {
			return Sk.builtin.none();
		});

	}, "M5Screen", []);

	m5stack.lcd = new M5Screen();

	var BtnChild = new Sk.misceval.buildClass(m5stack, function ($gbl, $loc) {

		BtnChild__init__ = function (self, btn) {
			self.state = false;
			self.presses = 0;
			self.releases = 0;
			self.press_last_check = 0;
			self.rel_last_check = 0;
			self.btn = btn.v;
			// Move the slider if a button is pressed
			const buttons = ['A_BTN', 'B_BTN', 'C_BTN'],
				events = ['mouseup', 'mousedown', 'click'];
			const board = document.getElementById("board-viewer").contentDocument;
			if (board !== null) {
				for (let i = 0; i < buttons.length; i++) {
					const button = board.querySelector("#" + buttons[i]);
					if (button !== null) {
						for (let j = 0; j < events.length; j++) {
							button.addEventListener(events[j], function (e) {
								const btn = this.id.replace('_BTN', '').toLowerCase();
								switch (e.type) {
									case 'mousedown':
										$("#m5stack-button-" + btn + '_slider').slider('value', 1);
										break;
									case 'mouseup':
										$("#m5stack-button-" + btn + '_slider').slider('value', 0);
										break;
									case 'click':
										self.presses++;
										break;
								}
							});
						}
					}
				}
			}
		};

		BtnChild__init__.co_varnames = ['self', 'btn'];
		BtnChild__init__.$defaults = [Sk.builtin.none()];

		$loc.__init__ = new Sk.builtin.func(BtnChild__init__);

		$loc.__qualname__ = new Sk.builtin.str("BtnChild");

		$loc.isPressed = new Sk.builtin.func(function (self) {
			const state = $("#m5stack-button-" + self.btn + '_slider').slider('option', 'value');
			return new Sk.builtin.bool(state);
		});

		$loc.isReleased = new Sk.builtin.func(function (self) {
			const state = $("#m5stack-button-" + self.btn + '_slider').slider('option', 'value');
			return new Sk.builtin.bool(!state);
		});

		$loc.wasPressed = new Sk.builtin.func(function (self, callback) {
			Simulator.getModuleByKey('m5stack-button-' + self.btn).events.pressed = function () {
				Sk.misceval.asyncToPromise(function () {
					return Sk.misceval.callsimOrSuspendArray(callback, []);
				})
					.then(function () { }, Simulator.handleError);
			};
			return Sk.builtin.none();
		});

		$loc.wasReleased = new Sk.builtin.func(function (self, callback) {
			Simulator.getModuleByKey('m5stack-button-' + self.btn).events.released = function () {
				Sk.misceval.asyncToPromise(function () {
					return Sk.misceval.callsimOrSuspendArray(callback, []);
				})
					.then(function () { }, Simulator.handleError);
			};
			return Sk.builtin.none();
		});

		$loc.pressFor = new Sk.builtin.func(function (self) {
			UIManager.showErrorMessage('error-message', "BtnChild.pressFor is not yet implemented");
		});

		$loc.wasDoublePress = new Sk.builtin.func(function (self) {
			UIManager.showErrorMessage('error-message', "BtnChild.wasDoublePress is not yet implemented");
		});

		$loc.update = new Sk.builtin.func(function (self) {
			UIManager.showErrorMessage('error-message', "BtnChild.update is not yet implemented");
		});

		$loc.deinit = new Sk.builtin.func(function (self) {
			UIManager.showErrorMessage('error-message', "BtnChild.deinit is not yet implemented");
		});

		$loc.restart = new Sk.builtin.func(function (self) {
			UIManager.showErrorMessage('error-message', "BtnChild.restart is not yet implemented");
		});

	}, 'BtnChild', []);

	m5stack.btnA = new BtnChild();
	m5stack.btnA.tp$init([new Sk.builtin.str('a')]);

	m5stack.btnB = new BtnChild();
	m5stack.btnB.tp$init([new Sk.builtin.str('b')]);

	m5stack.btnC = new BtnChild();
	m5stack.btnC.tp$init([new Sk.builtin.str('c')]);

	return m5stack;
};