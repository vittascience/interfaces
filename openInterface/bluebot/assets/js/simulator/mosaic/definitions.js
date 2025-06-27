Simulator.Mosaic.BOARD_HEADER = `<object id="board-viewer" class="mt-3 mb-3" type="image/svg+xml"></object>`;

Simulator.Mosaic.externalLibraries = {
    // js common libraries
    'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    // js tts library
    'src/lib/tts.js': Simulator.PATH_LIB + 'tts.js',
};

Simulator.Mosaic.addSpecificInitializations = async function () {
    await Simulator.waitBoardViewer();
    const board = document.getElementById("board-viewer").contentDocument;
    if (board !== null) {
        const up = 'translate(1px, 0px)',
            down = 'translate(0px, 0px)';
        const buttons_id = ['go', 'up', 'down', 'left', 'right', 'erase', 'pause'];

        const playButtonAnimation = function (id, animation) {
            ['16', '7', '10'].forEach(className => {
                const button = board.querySelector(`#${id} .cls-${className}`);
                if (button !== null) {
                    button.style.transform = animation;
                }
            });
        };

        const addBlock = function (id) {
            const content_blocks = document.querySelector("#content_blocks > div");
            if (typeof content_blocks !== 'undefined') content_blocks.focus();

            const blocks_type = {
                'up': `<block type="actuators_move_forward"></block>`,
                'down': `<block type="actuators_move_backward"></block>`,
                'left': `<block type="actuators_turnLeft"><field name="ANGLE">90</field></block>`,
                'right': `<block type="actuators_turnRight"><field name="ANGLE">90</field></block>`,
                'pause': `<block type="io_pause"><field name="UNIT">SEC</field><value name="TIME"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>`
            };
            const workspace = Main.getWorkSpace();
            const allBlocks = workspace.getAllBlocks();
            let targetBlock = null;

            for (let i = 0; i < allBlocks.length; i++) {
                if (allBlocks[i].type === 'on_start' || allBlocks[i].type === 'scratch_on_start') {
                    targetBlock = allBlocks[i];
                    break; // Sortir de la boucle une fois trouvé
                }
            }

            // Créer le nouveau bloc en xml
            const xmlText = blocks_type[id];
            const xml = Blockly.Xml.textToDom(xmlText);
            const newBlock = Blockly.Xml.domToBlock(xml, workspace);

            // Si le targetBlock est vide (n'a pas de child blocks)
            const statementInput = targetBlock.getInput("DO");
            if (targetBlock.childBlocks_.length === 0) {
                if (statementInput && statementInput.connection) {
                    statementInput.connection.connect(newBlock.previousConnection);
                } else {
                    console.error("No valid input found on target block to connect to.");
                }
            } else {
                // // Si le targetBlock a des enfants, connecte après le dernier
                const statementConnection = statementInput.connection;
                let lastBlock = statementConnection.targetBlock();
                while (lastBlock && lastBlock.getNextBlock()) {
                    lastBlock = lastBlock.getNextBlock();
                }

                // Parcourir jusqu'au dernier bloc
                let currentBlock = lastBlock;
                while (currentBlock.getNextBlock()) {
                    currentBlock = currentBlock.getNextBlock();
                }
                lastBlock.nextConnection.connect(newBlock.previousConnection);
            }
        };

        const removeAllBlocks = function () {
            const workspace = Main.getWorkSpace();
            const targetBlock = workspace.getBlockById('G[=T#8yqB70`NFgYq}GP');

            if (!targetBlock) {
                console.error("Target block not found");
                return;
            }

            const statementInput = targetBlock.getInput("DO");
            if (statementInput && statementInput.connection) {
                let connectedBlock = statementInput.connection.targetBlock();

                // Tant qu'il y a des blocs enfants, on les supprime
                while (connectedBlock) {
                    let nextBlock = connectedBlock.getNextBlock();  // Obtenir le bloc suivant avant suppression
                    connectedBlock.dispose();  // Supprimer le bloc actuel
                    connectedBlock = nextBlock;  // Passer au bloc suivant
                }
            } else {
                console.error("No 'DO' input or child blocks found.");
            }
        };

        buttons_id.forEach(button_id => {
            const button = board.getElementById(button_id);
            if (button != null) {
                ['mousedown', 'touchstart'].forEach(evt => {
                    button.addEventListener(evt, async function (e) {
                        e.preventDefault();
                        switch (this.id) {
                            case 'erase':
                                removeAllBlocks();
                                break;
                            case 'pause':
                                Simulator.Mosaic.specific.arrowsCoding = true;
                                addBlock(this.id);
                                break;
                            case 'go':
                                playButtonAnimation(this.id, down);
                                Simulator.Mosaic.specific.arrowsCoding = false;
                                break;
                            default:
                                playButtonAnimation(this.id, down);
                                Simulator.Mosaic.specific.arrowsCoding = true;
                                addBlock(this.id);
                        }
                    });
                });
                ['mouseup', 'touchend'].forEach(evt => {
                    button.addEventListener(evt, function (e) {
                        e.preventDefault();
                        if (!['pause', 'erase'].includes(this.id)) playButtonAnimation(this.id, up);
                        if (localStorage.isBluebotButtonsTooltipClosed === 'false') $('#close-bluebot-buttons-tooltip').click();
                    });
                });
            }
        });

        (() => {
            if (typeof localStorage.isBluebotButtonsTooltipClosed === 'undefined' || localStorage.isBluebotButtonsTooltipClosed === 'false') {
                localStorage.isBluebotButtonsTooltipClosed = false;
                const bluebotButtonsTooltip = document.querySelector('.bluebot-buttons-tooltip');
                if (bluebotButtonsTooltip) {
                    bluebotButtonsTooltip.style.display = 'block';
                    return;
                }
                const boardContainer = document.querySelector('#headerOut');
                const tooltipElt = document.createElement('div');
                tooltipElt.classList.add('bluebot-buttons-tooltip');
                tooltipElt.innerHTML = `
                <div class="tooltip-inner-wrapper tooltip-inner-wrapper-bluebot-buttons">
                    <div class="bluebot-buttons-tooltip-triangle"></div>
                    <i class="fa-solid fa-circle-info"></i>
                    <span>${jsonPath('code.simulator.tooltips.bluebot-buttons')}</span>
                    <button id="close-bluebot-buttons-tooltip" class="btn v-btn-grey">
                        <i class="fa-sharp fa-solid fa-xmark"></i></button>
                </div>`;
                boardContainer.appendChild(tooltipElt);
                $("body").on('click', '#close-bluebot-buttons-tooltip', () => {
                    const bluebotButtonsTooltip = document.querySelector('.bluebot-buttons-tooltip');
                    if (typeof bluebotButtonsTooltip === 'undefined') {
                        return;
                    }
                    bluebotButtonsTooltip.style.display = 'none';
                    localStorage.isBluebotButtonsTooltipClosed = true;
                });
            }
        })();
    }
};

Simulator.Mosaic.groveRegex = {};

Simulator.Mosaic.specific = {

    arrowsCoding: false,

    isRunning: false,

    definitions: [
        {
            regex: /(move(Forward|Backward)|turn(Left|Right))/,
            id: "bluebot-motorLeft",
            title: "Moteur Gauche",
            pin: "Blue-bot",
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        },
        {
            regex: /(move(Forward|Backward)|turn(Left|Right))/,
            id: "bluebot-motorRight",
            title: "Moteur Droit",
            pin: "Blue-bot",
            type: 'output',
            value: 0,
            picture: "Roue.png",
            pictureAnimation: "Roue-animation.png"
        }
    ]
};