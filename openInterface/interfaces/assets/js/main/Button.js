function Button(json) {
    let html = "";

    if (json.isDropdown) {
        html += `
          <div class="ide-dropdown ide-dropdown-always" id="download-options">
            <button class="ide-btn ide-btn-toggle ${json.style} ide-btn-alone-dropdown dropdown-toggle" data-i18n="[aria-label]code.topbar.tooltips.openUploadDownloadMenu"></button>
            <div class="ide-btn-group ${json.classes} hidden"></div>
          </div>`;
    } else {
        if (typeof json.hasIdeBtnClass !== 'undefined' && !json.hasIdeBtnClass) {
            html += `<button class="${json.classes}" `;
        } else {
            html += `<button class="ide-btn ${json.classes}" `;
        }
        let title;
        if(json.title){
            title = jsonPath(json.title);
            html += `aria-label="${title}" `;
        }

        if (json.id) {
            html += `id="${json.id}" `;
        }
        if (json.title && json.i18 == true) {
            if (!json.tooltipPlacement) {
                json.tooltipPlacement = "top";
            }
            html += `data-i18n="[title]${json.title}" data-bs-toggle="tooltip" data-bs-placement="${json.tooltipPlacement}" `;
        } else if (title) {
            if (!json.tooltipPlacement) {
                json.tooltipPlacement = "top";
            }
            html += `title="${title}" data-bs-toggle="tooltip" data-bs-placement="${json.tooltipPlacement}" `;
        }
        if (json.onclick) {
            html += ` onclick="${json.onclick}" `;
        }
        if (json.show == false) {
            html += ` style="display:none;" `;
        }
        if (json.customAttributes) {
            json.customAttributes.map(item => {
                html += `${item.name}="${item.value}" `;
            });
        }
        html += `>`;
        if (json.fontAwesome) {
            html += `<i class="${json.fontAwesome}"></i>`;
        }
        if (json.icon) {
            html += `<img src="${json.icon}" x="0" y="0" height="15px" width="15px"/>`;
        }
        if (json.label && json.i18 == true) {
            if (json.label.hidden == true) {
                html += `<span class="label-button hide${json.label.class ? ' ' + json.label.class : ''}" data-i18n="${json.label.value}" aria-hidden="true"></span>`;
            } else {
                html += `<span class="label-button${json.label.class ? ' ' + json.label.class : ''}" data-i18n="${json.label.value}" aria-hidden="true"></span>`;
            }
        } else if (json.label) {
            let label = jsonPath(json.label.value);
            if (json.label.hidden == true) {
                html += `<span class="label-button hide${json.label.class ? ' ' + json.label.class : ''}" aria-hidden="true">${label}</span>`;
            } else {
                html += `<span class="label-button${json.label.class ? ' ' + json.label.class : ''}" aria-hidden="true">${label}</span>`;
            }
        }
        html += `</button>`;
    }
    if (json.infoModalId && json.id) {
        html += `<span id="${json.id}-info" class="button-info" onclick="pseudoModal.openModal('${json.infoModalId}')"><i class="fas fa-question"></i></span>`;
    }
    return html;
};
