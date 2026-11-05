const specificModals = {
    'unihiker-board-selector': {
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
                    <p>${jsonPath('modals.board-selector.unihiker.welcome')}</p>
                </div>
                <div class="mb-1">
                    <p>${jsonPath('modals.board-selector.content.intro')}</p>
                </div>
                <div class="board-selector-grid">
                    ${Object.entries(INTERFACE_BOARDS).map(([id, board]) => `
                    <div class="board-option" data-board="${id}">
                        <input type="radio" name="boardChoice" value="${id}" id="board-choice-${id}">
                        <label for="board-choice-${id}" class="board-card">
                            <div class="board-image">
                                <img src="/openInterface/unihiker/assets/media/simulator/board/${board.link}" alt="${board.name}">
                            </div>
                            <div class="board-name-container">
                                <span class="board-radio-indicator"></span>
                                <span class="board-name">${board.name}</span>
                            </div>
                        </label>
                    </div>`).join('')}
                </div>
                <div class="board-selector-footer-container">
                    <button type="button" class="btn v-btn board-choice-validate-btn" onclick="VittaInterface.validateSelectedBoard()">
                        ${jsonPath('modals.board-selector.buttons.validate')}
                    </button>
                </div>
            `,
        footer: ``
    }
};
