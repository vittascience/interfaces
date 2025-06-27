// BBC micro:bit - my9221 module

const $builtinmodule = function (name) {

	const my9221 = {};

	my9221.__name__ = new Sk.builtin.str('my9221');

	my9221.MY9221 = new Sk.misceval.buildClass(my9221, function ($gbl, $loc) {

		MY9221__init__ = function (self, di, dcki, reverse) {
			Sk.builtin.pyCheckArgsLen("__init__", arguments.length, 3, 4);
			Sk.builtin.pyCheckType("reverse", "boolean", Sk.builtin.checkBool(reverse));
			self.reverse = false;
			self.di = di.name;
			self.dcki = dcki.name;
			$("#ledBar_" + self.di).find(".subtitle-module").html('P' + self.di + ' / P' + self.dcki);
			const htmlString = `
                <div class="ledBar-container">
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                    <div class="ledBar"></div>
                </div>`;
			const ledBarModule = document.querySelector(`#ledBar_${self.di} > div.module-body.body-output`);
			if (ledBarModule && ledBarModule.children.length < 2) ledBarModule.insertAdjacentHTML('afterbegin', htmlString);
		};

		MY9221__init__.co_varnames = ['self', 'di', 'dcki', 'reverse'];
		MY9221__init__.$defaults = [new Sk.builtin.bool(false)];

		$loc.__init__ = new Sk.builtin.func(MY9221__init__);

		/**
		 * Colore les barres dans une direction donnée jusqu'à un indice spécifié.
		 * @param {number} index - L'indice jusqu'auquel colorer les barres.
		 * @param {string} direction - La direction 'greenToRed' : 0 ou 1.
		 */
		const colorLedBarsUntil = function (pinClock, index, direction = 0) {
			const ledBars = document.querySelectorAll(`#ledBar_${pinClock} > div.module-body.body-output > div.ledBar-container > div.ledBar`);

			// Vérifie que l'index est valide
			if (index < 0 || index > ledBars.length) {
				console.error('Index hors des limites des barres.');
				return;
			}

			ledBarReset(pinClock);

			if (!direction) {
				// Mode Rouge -> Vert (de gauche à droite)
				ledBars.forEach((bar, i) => {
					if (i > index) {
						return;
					} else if (i === 0) {
						bar.style.backgroundColor = 'red'; // Première barre rouge
					} else if (i === 1) {
						bar.style.backgroundColor = 'orange'; // Deuxième barre orange
					} else {
						bar.style.backgroundColor = 'green'; // Les autres barres vertes
					}
				});
			} else {
				// Mode Vert -> Rouge (de droite à gauche)
				const totalBars = ledBars.length;
				index = index + 1;
				for (let i = totalBars - index; i < totalBars; i++) {
					if (i === 0) {
						ledBars[i].style.backgroundColor = 'red'; // Barre rouge
					} else if (i === 1) {
						ledBars[i].style.backgroundColor = 'orange'; // Barre orange
					} else {
						ledBars[i].style.backgroundColor = 'green'; // Barres vertes
					}
				}
			}
		};

		const ledBarReset = function (pinClock) {
			const ledBars = document.querySelectorAll(`#ledBar_${pinClock} > div.module-body.body-output > div.ledBar-container > div.ledBar`);
			// Réinitialise toutes les barres
			ledBars.forEach((bar) => {
				bar.style.backgroundColor = ''; // Réinitialise les barres non concernées
			});
		};

		$loc.level = new Sk.builtin.func(function (self, level) {
			const mod = Simulator.getModuleByKey('ledBar');
			Simulator.setAnimator(mod, mod.id + '_' + self.di, level.v);
			const lebBarIndex = Math.round(level.v);
			if (lebBarIndex === 0) {
				ledBarReset(self.di);
			} else if (lebBarIndex - 1 >= 0) {
				colorLedBarsUntil(self.di, lebBarIndex - 1, self.reverse);
			}
		});

		$loc.reverse = new Sk.builtin.func(function (self, state) {
			self.reverse = state.v;
		});

	}, 'MY9221', []);

	return my9221;
};