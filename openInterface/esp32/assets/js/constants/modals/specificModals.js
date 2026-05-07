const specificModals = {
    'esp32-board-selector': {
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
                    <p>${jsonPath('modals.board-selector.esp32.welcome')}</p>
                </div>
                <div class="mb-1">
                    <p>${jsonPath('modals.board-selector.content.intro')}</p>
                </div>
                <div class="board-selector-grid">
                    <div class="board-option" data-board="${BOARD_VITTA_ESP32}">
                        <input type="radio" name="boardChoice" value="${BOARD_VITTA_ESP32}" id="board-choice-${BOARD_VITTA_ESP32}" checked>
                        <label for="board-choice-${BOARD_VITTA_ESP32}" class="board-card">
                            <div class="board-image">
                                <img src="/openInterface/esp32/assets/media/simulator/board/${INTERFACE_BOARDS[BOARD_VITTA_ESP32].link}" alt="${INTERFACE_BOARDS[BOARD_VITTA_ESP32].name}">
                            </div>
                            <div class="board-name-container">
                                <span class="board-radio-indicator"></span>
                                <span class="board-name">${INTERFACE_BOARDS[BOARD_VITTA_ESP32].name}</span>
                            </div>
                        </label>
                    </div>
                    <div class="board-option" data-board="${BOARD_ESP32_CAM}">
                        <input type="radio" name="boardChoice" value="${BOARD_ESP32_CAM}" id="board-choice-${BOARD_ESP32_CAM}" checked>
                        <label for="board-choice-${BOARD_ESP32_CAM}" class="board-card">
                            <div class="board-image">
                                <img src="/openInterface/esp32/assets/media/simulator/board/${INTERFACE_BOARDS[BOARD_ESP32_CAM].link}" alt="${INTERFACE_BOARDS[BOARD_ESP32_CAM].name}">
                            </div>
                            <div class="board-name-container">
                                <span class="board-radio-indicator"></span>
                                <span class="board-name">${INTERFACE_BOARDS[BOARD_ESP32_CAM].name}</span>
                            </div>
                        </label>
                    </div>
                    <div class="board-option" data-board="${BOARD_ILO}">
                        <input type="radio" name="boardChoice" value="${BOARD_ILO}" id="board-choice-${BOARD_ILO}">
                        <label for="board-choice-${BOARD_ILO}" class="board-card">
                            <div class="board-image">
                                <img src="/openInterface/esp32/assets/media/simulator/board/${INTERFACE_BOARDS[BOARD_ILO].link}" alt="${INTERFACE_BOARDS[BOARD_ILO].name}">
                            </div>
                            <div class="board-name-container">
                                <span class="board-radio-indicator"></span>
                                <span class="board-name">${INTERFACE_BOARDS[BOARD_ILO].name}</span>
                            </div>
                        </label>
                    </div>
                    <!-- <div class="board-option" data-board="${BOARD_NANO_ESP32}">
                        <input type="radio" name="boardChoice" value="${BOARD_NANO_ESP32}" id="board-choice-${BOARD_NANO_ESP32}">
                        <label for="board-choice-${BOARD_NANO_ESP32}" class="board-card">
                            <div class="board-image">
                                <img src="/openInterface/esp32/assets/media/simulator/board/${INTERFACE_BOARDS[BOARD_NANO_ESP32].link}" alt="${INTERFACE_BOARDS[BOARD_NANO_ESP32].name}">
                            </div>
                            <div class="board-name-container">
                                <span class="board-radio-indicator"></span>
                                <span class="board-name">${INTERFACE_BOARDS[BOARD_NANO_ESP32].name}</span>
                            </div>
                        </label>
                    </div> -->
                    <div class="board-option" data-board="${BOARD_WEMOS_D1R32}">
                        <input type="radio" name="boardChoice" value="${BOARD_WEMOS_D1R32}" id="board-choice-${BOARD_WEMOS_D1R32}">
                        <label for="board-choice-${BOARD_WEMOS_D1R32}" class="board-card">
                            <div class="board-image">
                                <img src="/openInterface/esp32/assets/media/simulator/board/${INTERFACE_BOARDS[BOARD_WEMOS_D1R32].link}" alt="${INTERFACE_BOARDS[BOARD_WEMOS_D1R32].name}">
                            </div>
                            <div class="board-name-container">
                                <span class="board-radio-indicator"></span>
                                <span class="board-name">${INTERFACE_BOARDS[BOARD_WEMOS_D1R32].name}</span>
                            </div>
                        </label>
                    </div>
                    <!-- <div class="board-option" data-board="${BOARD_ESP_WROOM_32_30PINS}">
                        <input type="radio" name="boardChoice" value="${BOARD_ESP_WROOM_32_30PINS}" id="board-choice-${BOARD_ESP_WROOM_32_30PINS}">
                        <label for="board-choice-${BOARD_ESP_WROOM_32_30PINS}" class="board-card">
                            <div class="board-image">
                                <img src="/openInterface/esp32/assets/media/simulator/board/${INTERFACE_BOARDS[BOARD_ESP_WROOM_32_30PINS].link}" alt="${INTERFACE_BOARDS[BOARD_ESP_WROOM_32_30PINS].name}">
                            </div>
                            <div class="board-name-container">
                                <span class="board-radio-indicator"></span>
                                <span class="board-name">${INTERFACE_BOARDS[BOARD_ESP_WROOM_32_30PINS].name}</span>
                            </div>
                        </label>
                    </div> -->
                    <div class="board-option" data-board="${BOARD_ESP_WROOM_32_38PINS}">
                        <input type="radio" name="boardChoice" value="${BOARD_ESP_WROOM_32_38PINS}" id="board-choice-${BOARD_ESP_WROOM_32_38PINS}">
                        <label for="board-choice-${BOARD_ESP_WROOM_32_38PINS}" class="board-card">
                            <div class="board-image">
                                <img src="/openInterface/esp32/assets/media/simulator/board/${INTERFACE_BOARDS[BOARD_ESP_WROOM_32_38PINS].link}" alt="${INTERFACE_BOARDS[BOARD_ESP_WROOM_32_38PINS].name}">
                            </div>
                            <div class="board-name-container">
                                <span class="board-radio-indicator"></span>
                                <span class="board-name">${INTERFACE_BOARDS[BOARD_ESP_WROOM_32_38PINS].name}</span>
                            </div>
                        </label>
                    </div>
                </div>
                <div id="board-selector-shield-grove-section" class="ide-modal-section mt-3" style="display: none">
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
                        <a href="https://vittascience.com/learn/playlist?id=21" class="board-selector-link" target="_blank" rel="noopener noreferrer">
                            ${jsonPath('modals.board-selector.esp32.tutorial_link')}
                        </a>
                        <a href="https://vittascience.com/shop/" class="board-selector-link" target="_blank" rel="noopener noreferrer">
                            ${jsonPath('modals.board-selector.content.compatibility_link')}
                        </a>
                    </div>
                </div>
            `,
        footer: ``
    }
};