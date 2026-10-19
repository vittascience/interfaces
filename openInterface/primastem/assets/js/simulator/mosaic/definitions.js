Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3 mb-3" type="image/svg+xml" role="img" aria-label="Board simulator view"></object>`;

Simulator.Mosaic.externalLibraries = {
    // js common libraries
    'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    // js primastem library
    'src/lib/primastem.js': Simulator.PATH_LIB + 'primastem.js',
};

Simulator.Mosaic.addSpecificInitializations = async function () {
    await Simulator.waitBoardViewer();
    const board = document.getElementById("board-viewer").contentDocument;
};

Simulator.Mosaic.groveRegex = {};

Simulator.Mosaic.specific = {

    arrowsCoding: false,

    isRunning: false,

    definitions: [
        {
            regex: /(move(Forward|Backward)|turn(Left|Right))/,
            id: "primastem-motorLeft",
            title: "Moteur Gauche",
            pin: "primaSTEM",
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /(move(Forward|Backward)|turn(Left|Right))/,
            id: "primastem-motorRight",
            title: "Moteur Droit",
            pin: "primaSTEM",
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /primastem\.setLed\("(l|b)",/gi,
            id: "primastem-left-led",
            title: "LED RGB (gauche)",
            pin: 'primaSTEM',
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        },
        {
            regex: /primastem\.setLed\("(r|b)",/gi,
            id: "primastem-right-led",
            title: "LED RGB (droite)",
            pin: 'primaSTEM',
            type: 'output',
            value: [75, 75, 75],
            class: 'RGB-circle',
            pictureAnimation: "Transparent.png",
            animate: function (Animator) {
                $(Animator.animId).css('background', "rgb(" + Animator.value[0] + "," + Animator.value[1] + "," + Animator.value[2] + ")");
            }
        }
    ]
};