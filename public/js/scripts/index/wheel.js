let currentInterface = 0;
let textCurrentInterface = "";
let linkCurrentInterface = "";


$("#wheel-button").click(function (event) {
    anime({
        targets: '#wheel-button',
        rotate: ['0deg', '2turn'],
        duration: 1000,
    });
})


$(".wheel-activator").click(function (event) {
    currentInterface = anime.random(0, 5);

    anime({
        targets: '#spinning-wheel',
        rotate: ['0deg', (360 * 5) + (currentInterface * 60)],
        duration: 6000,
        easing: 'easeOutElastic(1, .8)',
        complete: function (anim) {
            switch (currentInterface) {
                case (0):
                    textCurrentInterface = "Arduino"
                    linkCurrentInterface = "/arduino/";
                    break;
                case (2):
                    textCurrentInterface = "Quick-Pi"
                    linkCurrentInterface = "/quickpi";
                    break;
                case (3):
                    textCurrentInterface = "ESP32"
                    linkCurrentInterface = "/esp32/";
                    break;
                case (4):
                    textCurrentInterface = "Python"
                    linkCurrentInterface = "/python/";
                    break;
                case (5):
                    textCurrentInterface = "Micro:bit"
                    linkCurrentInterface = "/microbit/";
                    break;

                default:
                    textCurrentInterface = "Découvrir nos différentes interfaces"
                    linkCurrentInterface = "/code";
                    break;

            }

            if (currentInterface == 1) {
                $("#link-current-interface").attr("href", linkCurrentInterface)
                $("#link-current-interface").attr("data-i18n", "[html]index.interfaces.discover_all")
                $("#link-current-interface").localize()
            } else {
                $("#link-current-interface").attr("href", linkCurrentInterface)
                $("#link-current-interface").attr("data-i18n", "[html]index.interfaces.program_with")
                $("#link-current-interface").localize()
                $("#current-interface").text(textCurrentInterface)

            }

            $("#first-spin-wheel").hide()
            $("#link-current-interface").show()

            anime({
                targets: '#link-current-interface',
                scale: 1.25,
                direction: 'alternate',
                easing: "easeInBounce"
            });
        }
    });

});