const specificModals = {
    'arduino-board-selector': {
        header: {
            icon: 'fas fa-microchip',
            title: 'modals.board-selector.title',
        },
        optionalClass: {
            "modal": 'board-selector-dialog',
            "content": 'board-selector-content'
        },
        selector: '',
        content: `
                <div id="board-selector-welcome-text" class="board-selector-welcome" style="display: none;">
                    <p>${jsonPath('modals.board-selector.arduino.welcome')}</p>
                </div>
                <p>${jsonPath('modals.board-selector.content.intro')}</p>
                <div class="board-selector-grid">
                    <div class="board-option" data-board="${BOARD_ARDUINO_UNO}">
                        <input type="radio" name="boardChoice" value="${BOARD_ARDUINO_UNO}" id="board-choice-${BOARD_ARDUINO_UNO}" checked>
                        <label for="board-choice-${BOARD_ARDUINO_UNO}" class="board-card">
                            <div class="board-image">
                                <img src="/openInterface/arduino/assets/media/simulator/board/${INTERFACE_BOARDS[BOARD_ARDUINO_UNO].link}" alt="${INTERFACE_BOARDS[BOARD_ARDUINO_UNO].name}">
                            </div>
                            <div class="board-name-container">
                                <span class="board-radio-indicator"></span>
                                <span class="board-name">${INTERFACE_BOARDS[BOARD_ARDUINO_UNO].name}</span>
                            </div>
                        </label>
                    </div>
                    <div class="board-option" data-board="${BOARD_ARDUINO_NANO}">
                        <input type="radio" name="boardChoice" value="${BOARD_ARDUINO_NANO}" id="board-choice-${BOARD_ARDUINO_NANO}">
                        <label for="board-choice-${BOARD_ARDUINO_NANO}" class="board-card">
                            <div class="board-image">
                                <img src="/openInterface/arduino/assets/media/simulator/board/${INTERFACE_BOARDS[BOARD_ARDUINO_NANO].link}" alt="${INTERFACE_BOARDS[BOARD_ARDUINO_NANO].name}">
                            </div>
                            <div class="board-name-container">
                                <span class="board-radio-indicator"></span>
                                <span class="board-name">${INTERFACE_BOARDS[BOARD_ARDUINO_NANO].name}</span>
                            </div>
                        </label>
                    </div>
                    <div class="board-option" data-board="${BOARD_ARDUINO_MEGA}">
                        <input type="radio" name="boardChoice" value="${BOARD_ARDUINO_MEGA}" id="board-choice-${BOARD_ARDUINO_MEGA}">
                        <label for="board-choice-${BOARD_ARDUINO_MEGA}" class="board-card">
                            <div class="board-image">
                                <img src="/openInterface/arduino/assets/media/simulator/board/${INTERFACE_BOARDS[BOARD_ARDUINO_MEGA].link}" alt="${INTERFACE_BOARDS[BOARD_ARDUINO_MEGA].name}">
                            </div>
                            <div class="board-name-container">
                                <span class="board-radio-indicator"></span>
                                <span class="board-name">${INTERFACE_BOARDS[BOARD_ARDUINO_MEGA].name}</span>
                            </div>
                        </label>
                    </div>
                    <!-- <div class="board-option" data-board="${BOARD_ARDUINO_UNO_R4_WIFI}">
                        <input type="radio" name="boardChoice" value="${BOARD_ARDUINO_UNO_R4_WIFI}" id="board-choice-${BOARD_ARDUINO_UNO_R4_WIFI}">
                        <label for="board-choice-${BOARD_ARDUINO_UNO_R4_WIFI}" class="board-card">
                            <div class="board-image">
                                <img src="/openInterface/arduino/assets/media/simulator/board/${INTERFACE_BOARDS[BOARD_ARDUINO_UNO_R4_WIFI].link}" alt="${INTERFACE_BOARDS[BOARD_ARDUINO_UNO_R4_WIFI].name}">
                            </div>
                            <div class="board-name-container">
                                <span class="board-radio-indicator"></span>
                                <span class="board-name">${INTERFACE_BOARDS[BOARD_ARDUINO_UNO_R4_WIFI].name}</span>
                            </div>
                        </label>
                    </div> -->
                    <!-- <div class="board-option" data-board="${BOARD_ARDUINO_UNO_R4_MINIMA}">
                        <input type="radio" name="boardChoice" value="${BOARD_ARDUINO_UNO_R4_MINIMA}" id="board-choice-${BOARD_ARDUINO_UNO_R4_MINIMA}">
                        <label for="board-choice-${BOARD_ARDUINO_UNO_R4_MINIMA}" class="board-card">
                            <div class="board-image">
                                <img src="/openInterface/arduino/assets/media/simulator/board/${INTERFACE_BOARDS[BOARD_ARDUINO_UNO_R4_MINIMA].link}" alt="${INTERFACE_BOARDS[BOARD_ARDUINO_UNO_R4_MINIMA].name}">
                            </div>
                            <div class="board-name-container">
                                <span class="board-radio-indicator"></span>
                                <span class="board-name">${INTERFACE_BOARDS[BOARD_ARDUINO_UNO_R4_MINIMA].name}</span>
                            </div>
                        </label>
                    </div> -->
                </div>
                <div class="ide-modal-section mb-3 d-flex align-items-center">
                    <button data-toggle="tooltip" data-placement="top" title="${jsonPath('code.topbar.tooltips.board')}" aria-label="${jsonPath('code.topbar.tooltips.board')}" class="btn_ide btn_ide_left" aria-hidden="true" tabindex="-1">
                        <i class="fas fa-microchip" aria-hidden="true"></i>
                    </button>
                    <select class="board-firmware-selector" id="firmware-options">
                        <option>Arduino Uno</option>
                    </select>
                    <label for="firmware-options" class="mb-1">${jsonPath('modals.board-selector.arduino.firmware')}</label>
                </div>
                <div id="board-selector-shield-grove-section" class="ide-modal-section mt-3" style="display: none;">
                    <h5>${jsonPath('modals.board-selector.content.shield-grove.title')}</h5>
                    <div class="board-selector-shield-grove mb-2">
                        <label class="switch">
                            <input type="checkbox" id="shieldGroveCheckBox">
                            <span class="slider round"></span>
                        </label>
                        <span  style="margin-left: 10px; vertical-align: top;">${jsonPath('modals.board-selector.content.shield-grove.text')}</span>
                    </div>
                </div>
                <div class="board-selector-footer-container">
                    <button type="button" class="btn v-btn board-choice-validate-btn" onclick="VittaInterface.validateSelectedBoard()">
                        ${jsonPath('modals.board-selector.buttons.validate')}
                    </button>
                    <div class="board-selector-links">
                        <a href="https://vittascience.com/learn/tutorial.php?id=911" class="board-selector-link" target="_blank" rel="noopener noreferrer">
                            ${jsonPath('modals.board-selector.arduino.tutorial_link')}
                        </a>
                        <a href="https://vittascience.com/shop/" class="board-selector-link" target="_blank" rel="noopener noreferrer">
                            ${jsonPath('modals.board-selector.content.compatibility_link')}
                        </a>
                    </div>
                </div>
            `,
        footer: ``
    },
};