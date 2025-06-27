const monitorToolsModal =
    `<div id="monitorTools-div" class="ide-modal">
        <div class="ide-modal-header">
            <h1 class="ide-modal-title" data-i18n="[html]code.popups.x.x">
                <i class="fas fa-cog"></i> Paramètres
            </h1>
            <button id="closeButtonMonitorToolsModal" class="btn vitta-button quit-button ide-modal-quit-button" type="button">
                <span class="fa fa-times-circle"></span>
            </button>
        </div>
        <div class="ide-modal-body">
            <div class="ide-modal-section">
                <h5 data-i18n="[html]code.popups.generalSettings.scroll.title">Défilement automatique</h5>
                <div>
                    <label class="switch">
                        <input type="checkbox" id="auto-scroll-toggle" checked>
                        <span class="slider round"></span>
                    </label>
                    <span data-i18n="[html]code.popups.generalSettings.scroll.text" style="margin-left: 10px; vertical-align: top;">Activer le défilement automatique</span>
                </div>
            </div>

        </div>
    </div>`;

var optionsModal =
`<div id="modal-shareproject-options-title" style="cursor: pointer;" role="button" data-bs-toggle="collapse" data-bs-target="#modal-shareproject-options" aria-expanded="false" class="collapsed">
    <b data-i18n="[html]modals.standard.share.content.options.title">Options <i class="fas fa-caret-down"></i></b>
</div>
<div id="modal-shareproject-options" class="collapse">
    <div class="flex-wrap mt-1 justify-content-between" style="display: flex;">

        <div class="d-flex flex-column ms-1">
            <span class="text-center" data-i18n="modals.standard.share.content.options.embed.title">Embed</span>
            <!-- Embed mode -->
            <div class="switcher">
                <input type="radio" name="shareOptionsEmbed" value="" id="shareOptionsEmbedYes" class="switcher__input switcher__input--left" checked>
                <label for="shareOptionsEmbedYes" class="switcher__label" data-i18n="modals.standard.share.content.options.embed.yes">Oui</label>
                
                <input type="radio" name="shareOptionsEmbed" value="1" id="shareOptionsEmbedNo" class="switcher__input switcher__input--right">
                <label for="shareOptionsEmbedNo" class="switcher__label" data-i18n="modals.standard.share.content.options.embed.no">Non</label>
                
                <span class="switcher__toggle"></span>
            </div>    
        </div>

        <div class="d-flex flex-column mw-100">
            <span class="text-center" data-i18n="modals.standard.share.content.options.mode.title">Mode</span>
            <!-- Switcher mode -->
            <div class="switcher" style="overflow: auto;">
                <input type="radio" name="shareOptionsMode" value="blocks" id="shareOptionsModeBlocks" class="switcher__input switcher__input--left">
                <label for="shareOptionsModeBlocks" class="switcher__label" data-i18n="modals.standard.share.content.options.mode.block">Block</label>
                
                <input type="radio" name="shareOptionsMode" value="mixed" id="shareOptionsModeMixed" class="switcher__input switcher__input--middle1" checked>
                <label for="shareOptionsModeMixed" class="switcher__label" data-i18n="modals.standard.share.content.options.mode.hybrid">Mixte</label>
                
                <input type="radio" name="shareOptionsMode" value="code" id="shareOptionsModeCode" class="switcher__input switcher__input--middle2">
                <label for="shareOptionsModeCode" class="switcher__label" data-i18n="modals.standard.share.content.options.mode.code">Code</label>

                <input type="radio" name="shareOptionsMode" value="codeOnly" id="shareOptionsModeCodeOnly" class="switcher__input switcher__input--middle3">
                <label for="shareOptionsModeCodeOnly" class="switcher__label" data-i18n="modals.standard.share.content.options.mode.codeonly">Code only</label>

                ${typeof specific_modeInterfaceOption != 'undefined' ? specific_modeInterfaceOption : ''}
                                            
                <span class="switcher__toggle"></span>
            </div>
        </div>

    </div>

    <div class="flex-wrap mt-1 justify-content-between" style="display: flex;">

        ${typeof specific_toolboxInterfaceOption != 'undefined' ? specific_toolboxInterfaceOption : ''}

        ${typeof specific_consoleInterfaceOption != 'undefined' ? specific_consoleInterfaceOption : ''}

        ${typeof specific_simulatorInterfaceOption != 'undefined' ? specific_simulatorInterfaceOption : ''}

        ${typeof specific_boardInterfaceOption !== 'undefined' ? specific_boardInterfaceOption : ''}

    </div>
</div>`;

const IFRAME =
`<label for='iframe-value' data-i18n="modals.standard.share.content.iframe.contentTitle" class='mt-3'>
    <b>Balise HTML d'intégration</b>
</label>
<p class='hint mb-0' data-i18n="modals.standard.share.content.iframe.notice">Intégrer l'interface de programmation dans votre blog ou site internet</p>
<div style='font-size:12px;' class='mt-1 mb-1 alert alert-info' data-i18n="[html]modals.standard.share.content.iframe.hint">
    <i class='fa fa-info-circle'></i>Vous pouvez modifier les attributs <i>width</i> et <i>height</i> pour adapter la balise à votre site. Vous pouvez aussi la personnaliser via l'attribut <i>style</i>.
</div>
<textarea id='iframe-value' style='font-size: 15px;' class='form-control mt-1' readonly='readonly'><iframe width='100%' height='500' allowfullscreen frameborder='0' style='border:1px #d6d6d6 solid;' src=""></iframe></textarea>
<div class='alert alert-success mt-2 mb-0' style='display:none;' id='copy-frame-msg'data-i18n="modals.standard.share.content.iframe.successCopy">
    <span class='fa fa-valid' >La balise a été copiée avec succès !</span>
</div>
<button class='btn vitta-button mt-2' id='copy-frame' data-i18n="modals.standard.share.content.iframe.buttonCopy" style="display: block; margin: auto;">
    Copier la balise
</button>`;

const linkHtml =
`<label for='link-value' data-i18n="modals.standard.share.content.link.contentTitle" class='mt-3'>
    <b>Lien direct vers le projet</b>
</label>
<div class='d-flex mt-1'>
    <input id='link-value' class='form-control' readonly='readonly' style="border-top-right-radius:0; border-bottom-right-radius: 0;"/>
    <button class='btn vitta-button' id='copy-link' style="border-top-left-radius: 0; border-bottom-left-radius: 0;" onclick='copyToClipboard($("#link-value"), $("#copy-link-msg"))'>
    <i class="fas fa-copy"></i>
    </button>
</div>
<div class='alert alert-success mt-2 mb-0' style='display:none;' id='copy-link-msg' data-i18n="modals.standard.share.content.link.successCopy">
    <span class='fa fa-valid'>Le lien a été copié avec succès !</span> 
</div>
<p class='hint mb-0' data-i18n="code.popups.shareProject.link.expiration">
    Ce lien n'a pas de date d'expiration.
</p>
<div style="position: relative; text-align:center;">
                <hr style="background-color: var(--bg-5);">
                <span style="position: absolute; top: -10px; background-color: transparent; left: 0; right: 0; padding-right: 7px; padding-left: 7px; color: var(--text-2);">
                    <span style="background-color: var(--bg-3);padding: 0 5px;border-radius: 5px;" data-i18n="modals.standard.save.content.form.or">ou</span>
                </span>
            </div>
            <p data-i18n="modals.standard.share.content.qrcode.title">Scannez le qr-code ci-dessous</p>
<div id="share-project-qrcode">
    <div id='qrcode'></div>
    <div id="qrcode-actions">
        <button class='btn btn-primary' id='copy-qrcode' data-i18n="modals.standard.share.content.qrcode.copy">Copier le Qr-code</button>
        <button class='btn btn-primary' id='download-qrcode' data-i18n="modals.standard.share.content.qrcode.download">Télécharger le Qr-code</button>
    </div>
</div>
<div id='qr-action-notif'></div>
`;