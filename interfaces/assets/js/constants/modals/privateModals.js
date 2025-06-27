const webSepFileButtonContent = `<div style="margin-top:15px; display:flex; gap:10px">
<input id="save-Project-separate-files" type="checkbox" data-i18n="[title]modals.standard.save.content.form.tooltipDownloadSeparateFiles" title="modals.standard.save.content.form.tooltipDownloadSeparateFiles">
<label for="save-Project-separate-files" data-i18n="modals.standard.save.content.form.tooltipDownloadSeparateFiles">Fichiers séparés (.html, .css, .js)</label>
</div>`;

const webSeparateFilesButton = INTERFACE_NAME === 'web' ? webSepFileButtonContent : '';

let fileImportInput = `
  <input
    id="importproject-fileinput"
    name="importproject-fileinput[]"
    type="file"
    data-i18n="[title]modals.standard.open.content.form.importCode"
    accept=".py,.txt,.ino"
  />
`;

if (INTERFACE_NAME === 'web') {
    fileImportInput =
    `
    <div class="file-input">
        
    </div>
    `;
}

const backModals = {
    'modal-openproject': {
        selector: '',
        optionalClass: {
            modal: 'vitta-modal-tall'
        },
        header: {
            icon: 'fas fa-folder-open',
            title: 'modals.standard.open.title'
        },
        content:
        `
        <!-- Bouton pour ouvrir/fermer la section -->
        <button 
            class="openproject-collapse-title btn btn-link" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#openproject-cloud-section" 
            aria-expanded="true" 
            aria-controls="openproject-cloud-section">
            <span data-i18n="modals.standard.open.content.notice.title" class="fw-bold" style="font-family: Montserrat;">1. Depuis le cloud</span>
        </button>

        <!-- Contenu de la section collapsible -->
        <div id="openproject-cloud-section" class="collapse show" role="region" aria-labelledby="openproject-cloud-section">
            <div class="input-group mt-1" id="search-project">
                <label for="search-project-input" class="visually-hidden">Rechercher un projet</label>
                <input 
                    id="search-project-input" 
                    class="form-control" 
                    type="text" 
                    placeholder="Rechercher un projet" 
                    aria-label="Rechercher un projet">
                <button 
                    type="button" 
                    id="search-button" 
                    class="btn btn-primary search-button" 
                    aria-label="Lancer la recherche">
                    <span class="fa fa-search" aria-hidden="true"></span>
                </button>
            </div>

            <!-- Arborescence des projets -->
            <div id="projects-tree" class="mt-4" role="tree">
                <!-- Liste de mes projets -->
                <div id="my-projects-list" class="openproject-list" role="treeitem" aria-expanded="false" tabindex="0">
                    <h2 id="my-openproject-subtitle" class="openproject-subtitle">
                        <button class="btn btn-link p-0" aria-expanded="false" aria-controls="my-projects">
                            <i class="fas fa-chevron-right list-dropdown" aria-hidden="true"></i>
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <span data-i18n="[html]modals.standard.open.content.categories.private">Mes projets</span>
                        </button>
                        <span id="my-projects-count" class="project-count" aria-hidden="true"></span>
                    </h2>
                    <div id="my-projects" class="collapse open-project-content" role="group" aria-labelledby="my-openproject-subtitle"></div>
                </div>

                <!-- Liste des projets partagés -->
                <div id="shared-projects-list" class="openproject-list" role="treeitem" aria-expanded="false" tabindex="0">
                    <h2 class="openproject-subtitle">
                        <button class="btn btn-link p-0" aria-expanded="false" aria-controls="shared-projects">
                            <i class="fas fa-chevron-right list-dropdown" aria-hidden="true"></i>
                            <i class="fa fa-globe" aria-hidden="true"></i>
                            <span data-i18n="[html]modals.standard.open.content.categories.public">Projets partagés</span>
                        </button>
                        <span id="shared-projects-count" class="project-count" aria-hidden="true"></span>
                    </h2>
                    <div id="shared-projects" class="collapse open-project-content" role="group" aria-labelledby="shared-projects-list"></div>
                </div>

                <!-- Liste des exemples -->
                <div id="example-projects-list" class="openproject-list" role="treeitem" aria-expanded="false" tabindex="0">
                    <h2 class="openproject-subtitle">
                        <button class="btn btn-link p-0" aria-expanded="false" aria-controls="example-projects">
                            <i class="fas fa-chevron-right list-dropdown" aria-hidden="true"></i>
                            <i class="fa fa-table" aria-hidden="true"></i>
                            <span data-i18n="[html]modals.standard.open.content.categories.example">Exemples</span>
                        </button>
                        <span id="example-projects-count" class="project-count" aria-hidden="true"></span>
                    </h2>
                    <div id="example-projects" class="collapse open-project-content" role="group" aria-labelledby="example-projects-list"></div>
                </div>
            </div>
        </div>

        <!-- Séparateur visuel avec un texte -->
        <div class="modal-openproject-separator d-flex align-items-center text-center">
            <hr class="flex-grow-1 bg-secondary" />
            <span class="px-3 text-muted">
                <span class="bg-light px-2" data-i18n="modals.standard.save.content.form.or">OU</span>
            </span>
            <hr class="flex-grow-1 bg-secondary" />
        </div>
        `,
        content:
            `
            <button class="openproject-collapse-title" type="button" data-bs-toggle="collapse" data-bs-target="#openproject-cloud-section" aria-expanded="true" aria-controls="openproject-cloud-section">
                <span data-i18n="modals.standard.open.content.notice.title" style="font-weight: bold; font-style: Montserrat;">1. Depuis le cloud</span>
            </button>
            <div id="openproject-cloud-section" class="collapse show">
                <div class="input-group mt-1" id="search-project">
                    <input id="search-project-input" class="form-control" data-i18n="[placeholder]modals.standard.open.content.search">
                    <button type="button" id="search-button" class="btn btn-primary search-button">
                        <span class="fa fa-search"></span>
                    </button>
                </div>
                <div id="projects-tree" class="mt-4">
                    <div id="my-projects-list" class="openproject-list" tabindex="0">
                        <h2 id="my-openproject-subtitle" class="openproject-subtitle">
                            <i class="fas fa-chevron-right list-dropdown"></i>
                            <i class="fa fa-user"></i>
                            <span data-i18n="[html]modals.standard.open.content.categories.private">Mes projets</span>
                            <span id="my-projects-count" class="project-count"></span>
                        </h2>
                        <div id="my-projects" class="open-project-content"></div>
                    </div>
                    <div id="shared-projects-list" class="openproject-list" tabindex="0">
                        <h2 class="openproject-subtitle">
                            <i class="fas fa-chevron-right list-dropdown"></i>
                            <i class="fa fa-globe"></i>
                            <span data-i18n="[html]modals.standard.open.content.categories.public">Projets partagés</span>
                            <span id="shared-projects-count" class="project-count"></span>
                        </h2>
                        <div id="shared-projects" class="open-project-content"></div>
                    </div>
                    <div id="example-projects-list" class="openproject-list" tabindex="0">
                        <h2 class="openproject-subtitle">
                            <i class="fas fa-chevron-right list-dropdown"></i>
                            <i class="fa fa-table"></i>
                            <span data-i18n="[html]modals.standard.open.content.categories.example">Exemples</span>
                            <span id="example-projects-count" class="project-count"></span>
                        </h2>
                        <div id="example-projects" class="open-project-content"></div>
                    </div>
                </div>
            </div>
            <div class="modal-openproject-separator" style="position: relative;text-align:center;display: grid;align-items: center;">
                <hr style="background-color: var(--bg-5);"/>
                <span style="position: absolute; background-color: transparent; left: 0; right: 0; padding-right: 7px; padding-left: 7px; color: var(--text-2);">
                    <span style="background-color: var(--bg-3); padding: 0 5px;" data-i18n="modals.standard.save.content.form.or">OU</span>
                </span>
            </div>
            `,
        footer:
            `
              <button class="openproject-collapse-title" type="button" data-bs-toggle="collapse" data-bs-target="#openproject-local-section" aria-expanded="true" aria-controls="openproject-local-section">
                  <span data-i18n="modals.standard.open.content.noticeCloud.title" style="font-weight: bold; font-style: Montserrat;">2. Depuis votre ordinateur</span>
              </button>
              <div id="openproject-local-section" class="collapse show">
                <div class="text-center mx-auto w-100 mh-100 mb-2">
                    ${fileImportInput}
                </div>
              </div>
            `,
    },
    'modal-saveproject': {
        selector: '',
        header: {
            icon: 'fa fa-save',
            title: 'modals.standard.save.title'
        },
        content: `
            <div id='content-login'>
                <div id="save-form-message" style="font-size:13px;"></div>
                <div class="form-group">
                    <label for="save-name" style="font-size: 13px;" data-i18n="[html]modals.standard.save.content.name">
                        <i class="fas fa-book"></i> Nom du projet
                        <span class="mandatory">*</span>
                    </label>
                    <input type="text" name="name" id="save-name" class="form-control" style="font-size: 13px;" data-i18n="[placeholder]modals.standard.save.content.placeholder.name" data-testid="interfaceModalContentInputName"/>
                </div>

                <div class="form-group">
                    <label for="desc-project" style="font-size: 13px;" data-i18n="[html]modals.standard.save.content.description">
                        <i class="far fa-edit"></i> Description du projet (facultatif)
                    </label>
                    <textarea class="form-control" name="desc" style="font-size: 13px;" id="save-description" data-i18n="[placeholder]modals.standard.save.content.placeholder.desc" data-testid="interfaceModalContentTextarea"></textarea>
                </div>

                <div id="check_box_hint" class="hint alert alert-info mb-2 mt-2" data-i18n="[html]modals.standard.save.content.notice">
                    <i class="fa fa-info-circle"></i> Vous pouvez cocher cette case pour rendre votre projet accessible à d'autres utilisateurs de la communauté Vittascience.
                </div>
                
                <div id="check_box_div" class="d-flex justify-content-center align-items-center mb-2">
                    <label class="switch">
                        <input type="checkbox" id="shareProjectSave">
                        <span class="slider round"></span>
                    </label>
                    <span class="ms-2" data-i18n="[html]modals.standard.save.content.shareMode">
                        Rendre Publique pour la communauté
                    </span>
                </div>

                <div style="display: flex; width: 100%;">
                    <button type="button" id="modal-save-btn-confirm" class="btn v-btn me-1" style="flex:1;" data-form-validator="save_project_form" data-i18n="[html]modals.standard.save.content.buttons.save" onclick="saveConfirm()"  data-testid="interfaceModalContentSubmitBtn">
                        Sauvegarder
                    </button>
                    <button type="button" id="modal-save-btn-copy" class="btn v-btn ms-1 me-1" style="flex:1;" data-i18n="[html]modals.standard.save.content.buttons.copy" onclick="pseudoModal.openModal('modal-saveproject-under')">
                        Sauvegarder sous ...
                    </button>
                    <button type="button" id="modal-save-btn-share" class="btn v-btn-important ms-1" style="flex:1;" data-i18n="[html]modals.standard.save.content.buttons.share">
                        Partager
                    </button>
                </div>
                <div id="check_box_ia_warning" class="alert alert-warning mt-2" style="display:none;" data-i18n="[html]modals.standard.save.content.iaWarning">
                    <i class="fa fa-exclamation-triangle"></i> Votre model IA est stocké dans la mémoire du navigateur et ne sera pas enregistré avec votre projet.
                </div>
            </div>
            <div style="position: relative; text-align:center;">
                <hr style="background-color: var(--bg-5);"/>
                <span style="position: absolute; top: -10px; background-color: transparent; left: 0; right: 0;padding-right: 7px; padding-left: 7px; color: var(--text-2);">
                    <span style="background-color: var(--bg-3); padding: 0 5px;" data-i18n="[html]modals.standard.save.content.form.or">OU</span>
                </span>
            </div>`,
        footer: `<div class="text-center mx-auto mb-2">
                    <div>
                        <button id="modal-save-btn-download" class="btn v-btn" data-toggle="tooltip" data-placement="top" 
                            data-i18n="[html]modals.standard.save.content.buttons.download; [title]modals.standard.save.content.form.tooltipDownload" 
                            onclick="downloadScript(true)"
                        >
                        </button>
                        <span id="download-project-info"><i class="fas fa-question"></i></span>
                        ${webSeparateFilesButton}
                    </div>
                </div>`,
        customAttributes: [
            { name: "data-testid", value: 'interfaceModalContentToSaveOrShareProject' }
        ]
    },
    'modal-saveproject-under': {
        selector: '',
        header: {
            icon: 'fa fa-save',
            title: 'modals.standard.save-as.title'
        },
        content: `<div id="save-form-message" style="font-size:13px;"></div>
            <div class="form-group">
                <label for="save-as-name" style="font-size: 13px;" data-i18n="[html]modals.standard.save-as.content.name">
                    <i class="fas fa-book"></i> Nom du projet
                    <span class="mandatory">*</span>
                </label>
                <input type="text" name="name" id="save-as-name" class="form-control" style="font-size: 13px;" data-i18n="[placeholder]modals.standard.save-as.content.placeholder.name"/>
            </div>

            <div class="form-group">
                <label for="desc-project" style="font-size: 13px;" data-i18n="[html]modals.standard.save-as.content.description">
                    <i class="far fa-edit"></i> Description du projet (facultatif)
                </label>
                <textarea class="form-control" name="desc" style="font-size: 13px;" id="save-as-description" data-i18n="[placeholder]modals.standard.save-as.content.placeholder.desc"></textarea>
            </div>

            <div id="check_box_hint" class="hint alert alert-info" data-i18n="[html]modals.standard.save-as.content.notice">
                <i class="fa fa-info-circle"></i> Vous pouvez cocher cette case pour rendre votre projet accessible à d'autres utilisateurs de la communauté Vittascience.
            </div>

            <div id="check_box_div" class="d-flex justify-content-center align-items-center mb-2">
                <label class="switch">
                    <input type="checkbox" id="shareProjectSaveUnder">
                    <span class="slider round"></span>
                </label>
                <span style="margin-left: 10px; margin-top: -8px;" data-i18n="[html]modals.standard.save-as.content.shareMode">
                    Rendre Publique pour la communauté
                </span>
            </div>

            <div class="mt-2" style="display: flex; width: 100%;">
                <button type="button" id="modal-save-as-btn-back" class="btn v-btn-basic me-1" style="flex:1;" data-i18n="[html]modals.standard.save-as.buttons.back" onclick="dsaveProjectbtn()">
                    Retour
                </button>
                <button type="button" id="modal-save-as-btn-confirm" data-form-validator="save_as_project_form" class="btn v-btn ms-1" style="flex:1;" data-i18n="[html]modals.standard.save-as.buttons.save" onclick="copyProject()">
                    Sauvegarder
                </button>
            </div>`,
        footer: ``
    },
    'modal-newproject': {
        selector: '',
        header: {
            icon: 'fas fa-lightbulb',
            title: 'modals.standard.new.title'
        },
        content: `<div id="new-form-message"></div>
            <div class="form-group mb-1">
                <label for="save-name" data-i18n="[html]modals.standard.new.content.name">
                    <i class="fas fa-book"></i> Nom du projet
                    <span class="mandatory">*</span>
                </label>
                <input type="text" name="name" id="new_name" class="form-control" data-i18n="[placeholder]modals.standard.new.content.placeholder.name" data-testid="interfaceModalContentToCreateNewProjectInputName"/>
            </div>
            <div class="form-group mb-1">
                <label for="desc-project" data-i18n="[html]modals.standard.new.content.description">
                    <i class="far fa-edit"></i> Description du projet (facultatif)
                </label>
                <textarea name="desc" id="new_description" class="form-control" data-i18n="[placeholder]modals.standard.new.content.placeholder.desc" placeholder="Décrivez votre projet, utile si vous souhaitez le partager ultérieurement." data-testid="interfaceModalContentToCreateNewProjectTextarea"></textarea>
            </div>
            <div class="form-group">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="shareProjectNewCopie">
                    <label class="form-check-label" for="shareProjectNewCopie">
                        Cochez cette case si vous souhaitez prendre comme base le projet en cours.                    </label>
                </div>
            </div>
            `,
        footer: `<button type="button" id="modal-new-btn-cancel" class="btn v-btn-basic me-1" style="flex:1;" data-i18n="[html]modals.standard.new.footer.buttons.cancel">
                    Annuler
                </button>
                <button type="button" id="modal-new-btn-create" data-form-validator="new_project_form" class="btn v-btn ms-1" style="flex:1;" data-i18n="[html]modals.standard.new.footer.buttons.create" data-testid="interfaceModalContentToCreateNewProjectSubmitBtn">
                    Créer
                </button>`,
        messages: {
            success: '',
            warning: '',
            error: ''
        },
        customAttributes: [
            { name: "data-testid", value: 'interfaceModalContentToCreateNewProject' }
        ]
    },
    'modal-edit-project-name': {
        selector: '',
        header: {
            icon: 'fas fa-lightbulb',
            title: 'modals.standard.edit.title'
        },
        content: `<div id="new-form-message" style="font-size:13px;"></div>
            <div class="form-group mb-1">
                <label style="font-size:13px;" for="save-name" data-i18n="[html]modals.standard.new.content.name">
                    <i class="fas fa-book"></i> Nom du projet
                    <span class="mandatory">*</span>
                </label>
                <input type="text" name="name" id="edit_name" class="form-control" style="font-size:13px;" data-i18n="[placeholder]modals.standard.new.content.placeholder.name"/>
            </div>
            <div class="form-group mb-1">
                <label style="font-size: 13px;" for="desc-project" data-i18n="[html]modals.standard.new.content.description">
                    <i class="far fa-edit"></i> Description du projet (facultatif)
                </label>
                <textarea name="desc" id="edit_description" class="form-control" style="font-size:13px;" data-i18n="[placeholder]modals.standard.new.content.placeholder.desc" placeholder="Décrivez votre projet, utile si vous souhaitez le partager ultérieurement."></textarea>
            </div>
            `,
        footer: `<button type="button" id="modal-edit-project-btn-cancel" class="btn v-btn-basic me-1" style="flex:1;" data-i18n="[html]modals.standard.new.footer.buttons.cancel">
                    Annuler
                </button>
                <button type="button" id="modal-edit-project-btn-edit" data-form-validator="edit_project_form" class="btn v-btn ms-1" style="flex:1;" data-i18n="[html]modals.standard.edit.footer.buttons.edit">
                    Modifier
                </button>`,
        messages: {
            success: '',
            warning: '',
            error: ''
        }
    },
    'modal-shareproject': (typeof rtcInterfaces != 'undefined' && !rtcInterfaces.includes(INTERFACE_NAME)) ? {
        selector: '',
        header: {
            icon: '',
            title: 'modals.standard.share.title'
        },
        content: `<ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                    <a id="modal-shareproject-tab-link" class="nav-link ide-share-tab active" data-toggle="tab" role="tab" aria-controls="Lien direct" aria-selected="true" data-i18n="modals.standard.share.content.link.title" style="cursor:pointer;">Lien</a>
                </li>
                <li class="nav-item">
                    <a id="modal-shareproject-tab-iframe" class="nav-link ide-share-tab" data-toggle="tab" role="tab" aria-controls="Intégrer à un autre site/blog" aria-selected="false" data-i18n="modals.standard.share.content.iframe.title" style="cursor:pointer;">Intégrer à un autre site</a>
                </li>
            </ul>
            <div class="tab-content" id="modal-shareproject-link-content">
                <div class="tab-pane fade show active" id="modal-shareproject-tab-link-content" role="tabpanel" aria-labelledby="link-tab">Link</div>
                <div class="tab-pane fade" id="modal-shareproject-tab-iframe-content" role="tabpanel" aria-labelledby="iframe-tab">Iframe</div>
            </div>
            <div class="mt-2" style="display: flex; width: 100%;">
                <button type="button" id="modal-save-as-btn-back" class="btn v-btn-basic" style="flex:1;" data-i18n="[html]modals.standard.save-as.content.buttons.back" onclick="saveProjectbtn()">
                    Retour
                </button>
            </div>`,
        footer: `<div id="modal-shareproject-footer" class="w-100"></div>`
    } : {
        selector: '',
        header: {
            icon: '',
            title: 'modals.standard.share.title'
        },
        content: `
        <div class="m-4">
    <ul class="nav nav-tabs" id="myTab">
        <li class="nav-item modal-shareproject-tab-title">
            <a href="#share-link" class="nav-link active" id="modal-shareproject-tab-link" data-bs-toggle="tab" data-i18n="[html]modals.standard.share.content.link.title2"><i class="fas fa-link"></i> Lien</a>
        </li>
        <li class="nav-item modal-shareproject-tab-title">
            <a href="#modal-shareproject-tab-iframe-content" id='modal-shareproject-tab-iframe' class="nav-link" data-bs-toggle="tab" data-i18n="[html]modals.standard.share.content.iframe.title2"><i class="fas fa-laptop-code"></i> Intégrer</a>
        </li>
        <li class="nav-item modal-shareproject-tab-title">
            <a href="#share-send" class="nav-link" data-bs-toggle="tab" id='modal-shareproject-tab-send' data-i18n="[html]modals.standard.share.content.send.title"><i class="fas fa-paper-plane"></i> Envoyer</a>
        </li>
        <li class="nav-item modal-shareproject-tab-title">
            <a href="#share-save" class="nav-link" data-bs-toggle="tab" id='modal-shareproject-tab-save' data-i18n="[html]modals.standard.share.content.save.title"><i class="fas fa-save"></i> Sauvegarder</a>
        </li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane fade show active" id="share-link">

                <div class="d-flex flex-column mw-100" style="width: fit-content;" id='rights-select-for-link'>
                    <span class="" data-i18n="modals.standard.share.content.link.rights">Droits d'accès par lien</span>
                    <!-- Switcher mode -->
                    <div class="switcher" style="overflow: auto;">
                        <input type="radio" name="shareLinkRights" value="private" id="shareLinkRightsPrivate" class="switcher__input switcher__input--left" checked="checked">
                        <label for="shareLinkRightsPrivate" class="switcher__label" data-i18n="modals.standard.share.content.link.private">Private</label>
                
                        <input type="radio" name="shareLinkRights" value="read" id="shareLinkRightsRead" class="switcher__input switcher__input--middle1">
                        <label for="shareLinkRightsRead" class="switcher__label" data-i18n="modals.standard.share.content.link.read">Lecture</label>

                        <input type="radio" name="shareLinkRights" value="write" id="shareLinkRightsWrite" class="switcher__input switcher__input--right">
                        <label for="shareLinkRightsWrite" class="switcher__label" data-i18n="modals.standard.share.content.link.write">Ecriture</label>
                                            
                        <span class="switcher__toggle"></span>
                    </div>
                </div>

            <div class="my-3" id="modal-shareproject-tab-link-content">
                <input type="text" id='link-value' class="form-control" placeholder="" aria-label="link" aria-describedby="button-addon2">
                <button class="btn btn-success" type="button" id="button-addon2"><i class="fas fa-copy"></i></button>
            </div>
        </div>
        <div class="tab-pane fade" id="modal-shareproject-tab-iframe-content">
        </div>
        <div class="tab-pane fade" id="share-send">
            <span data-i18n="modals.standard.share.content.send.usersInvited">Utilisateurs invités par e-mail</span>
            <div id='share-tab-invited-users'>
                <span data-i18n="modals.standard.share.content.send.noUserInvited" class="fst-italic mt-2">Aucun utilisateur invité pour le moment</span>
            </div>
            <hr>
            <div>
                <span data-i18n="modals.standard.share.content.send.newUser">Inviter un nouvel utilisateur</span>
                <div class="d-flex flex-column mw-100" style="width: fit-content;">
                    <span class="" data-i18n="modals.standard.share.content.send.rights">Accès accordé</span>
                    <!-- Switcher mode -->
                    <div class="switcher" style="overflow: auto;">
                        <input type="radio" name="right-select-mail" value="read" id="right-select-mail-read" class="switcher__input switcher__input--left" checked>
                        <label for="right-select-mail-read" class="switcher__label" data-i18n="modals.standard.share.content.send.read">Lecture</label>

                        <input type="radio" name="right-select-mail" value="write" id="right-select-mail-write" class="switcher__input switcher__input--right">
                        <label for="right-select-mail-write" class="switcher__label" data-i18n="modals.standard.share.content.send.write">Ecriture</label>
                                            
                        <span class="switcher__toggle"></span>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="formControlInputMail" class="form-label" data-i18n="[html]modals.standard.share.content.send.emailAddress"><i class="far fa-envelope"></i> Adresse email du destinataire</label>
                    <input type="email" class="form-control" id="formControlInputMail" placeholder="name@example.com">
                </div>
                <div class="mb-3">
                    <label for="formControlInputMessage" class="form-label" data-i18n="[html]modals.standard.share.content.send.message"><i class="fas fa-edit"></i> Message d'invitation</label>
                    <textarea class="form-control" id="formControlInputMessage" rows="3"></textarea>
                    <div id='email-notification-area' class='my-2'></div>
                    <button type='button' class='btn btn-success' id='btn-send-invite-mail' style='margin: auto;width: fit-content;display: block;margin-top: 10px;' data-i18n="modals.standard.share.content.send.sendInvite">Envoyer une invitation par email</button>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="share-save">
            <div style='display:flex; flex-direction:column; align-items: center;'>
                <p style='margin-top:10px;width:90%; text-align:center;' data-i18n="[html]modals.standard.share.content.save.saveLocally">Sauvegarder ce programme en local sur votre ordinateur.<br>
                Ce fichier python contient les codes textuels et les blocs visuels.<br>
                L’en-tête du fichier contient toutes les informations de votre projet Vittascience.</p>
                <button type='button' class='btn btn-success' style='width:fit-content;' onclick="downloadScript(true)" data-i18n="modals.standard.share.content.save.saveLocallyButton">Sauvegarder sur l'ordinateur</button>
            </div>
        </div>
    </div>
</div>
        `,
        footer: `<div id="modal-shareproject-footer" class="w-100"></div>`
    },
    'modal-users-rtc-owner': {
        selector: '',
        header: {
            icon: '',
            title: 'modals.standard.share.title2'
        },
        content: `<div class="accordion" id="accordionRtc">
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne" data-i18n="modals.standard.rtc.userOwner.linkProperties">
                Propriétés du lien d'invitation
            </button>
          </h2>
          <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
            <div class="accordion-body">
                <div class="d-flex flex-column mw-100" style="width: fit-content;">
                    <span class="" data-i18n="modals.standard.rtc.userOwner.linkAccess">Accès par lien : </span>
                    <!-- Switcher mode -->
                    <div class="switcher" style="overflow: auto;">
                        <input type="radio" name="right-select-control" value="private" id="right-select-control-private" class="switcher__input switcher__input--left">
                        <label for="right-select-control-private" class="switcher__label" data-i18n="modals.standard.rtc.userOwner.private">Private</label>
                
                        <input type="radio" name="right-select-control" value="read" id="right-select-control-read" class="switcher__input switcher__input--middle1">
                        <label for="right-select-control-read" class="switcher__label" data-i18n="modals.standard.rtc.userOwner.read">Lecture</label>

                        <input type="radio" name="right-select-control" value="write" id="right-select-control-write" class="switcher__input switcher__input--right">
                        <label for="right-select-control-write" class="switcher__label" data-i18n="modals.standard.rtc.userOwner.write">Ecriture</label>
                                            
                        <span class="switcher__toggle"></span>
                    </div>
                </div>
                <div class="input-group my-3">
                    <input type="text" id='share-link-control' class="form-control" placeholder="" aria-label="link" aria-describedby="button-addon2">
                    <button class="btn btn-success" type="button" id="button-addon2"><i class="fas fa-copy"></i></button>
                </div>
                <div id='users-anonymous-online'>
                    <span data-i18n="modals.standard.rtc.userOwner.usersNowOnline" class="mb-2">Utilisateurs actuellement en ligne :</span><br><br>
                </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo" data-i18n="modals.standard.rtc.userOwner.usersInvited">
                Utilisateurs invités par e-mail
            </button>
          </h2>
          <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
            <div class="accordion-body">
            Aucun utilisateurs invités par e-mail.
            </div>
          </div>
        </div>
    </div>`,
        footer: ``
    },
    'modal-users-rtc-user': {
        selector: '',
        header: {
            icon: '',
            title: 'modals.standard.share.title2'
        },
        content: `<div>
            <p class="text-center" data-i18n="modals.standard.rtc.user.usersOnline">Utilisateurs en ligne</p>
            <div id='users-anonymous-online-modal'></div>
        </div>`,
        footer: ``
    },
    'modal-private-project': {
        selector: '',
        header: {
            icon: '',
            title: 'modals.warning.project.privateProject'
        },
        content: `
        <div class='text-center'>
            <p class="text-center" data-i18n="modals.standard.rtc.privateProject.text">Ce projet est privé. Vous devez être invité par son propriétaire pour y accéder.</p>
            <p data-i18n="modals.standard.rtc.privateProject.text2">Souhaitez vous demander à son propriétaire l'accès à ce projet ?</p>
            <textarea class="form-control mb-3 mx-auto" id="privateProjectMessage" rows="3" placeholder="Ecrivez un message" style='max-width:50ch;'></textarea>
            <button type="button" class="btn btn-success" title='En développement' data-disabled="true" style="cursor: not-allowed; opacity: 0.5; filter: grayscale(1);" data-toggle='tooltip' data-i18n="modals.standard.rtc.privateProject.send">Envoyer</button>
        </div>
        <hr>
        <div class='text-center'>
            <p class="text-center" data-i18n="modals.standard.rtc.privateProject.newProject">Si vous souhaitez créer un nouveau projet, vous pouvez cliquer ci dessous.</p>
            <button type="button" class="btn btn-outline-success" onclick="newProject()" data-i18n="[html]modals.standard.rtc.privateProject.newProjectButton">Créer un nouveau projet <i class="fas fa-plus"></i></button>
        </div>
        `,
        footer: ``
    },
    'rtc-rights-change': {
        selector: '',
        header: {
            icon: '',
            title: 'modals.warning.project.rightsChange'
        },
        content: `
        <div>
            <p class="text-center" data-i18n="modals.standard.rtc.rightsChange.text">Les droits d'accès à ce projet ont changés.</p>
            <p class="text-center" >
                <span data-i18n="modals.standard.rtc.rightsChange.mode">Ce projet est désormais en mode : </span>
                <span id="modal-right-change-type" class='fw-bold'></span>
            </p>
            <hr class='mx-auto' style='max-width:50ch;'>
            <p class="text-center" data-i18n="modals.standard.rtc.rightsChange.reload">Votre interface va se recharger dans 5 secondes ...</p>
        </div>`,
        footer: ``
    },
    'rtc-user-rights-change': {
        selector: '',
        header: {
            icon: '',
            title: 'modals.warning.project.rightsChange'
        },
        content: `
        <div>
            <p class="text-center" data-i18n="modals.standard.rtc.userRightsChange.text">Vos droits d'accès à ce projet ont changés.</p>
            <p class="text-center" >
                <span data-i18n="modals.standard.rtc.userRightsChange.mode">Vous avez désormais accès à ce projet en mode : </span>
                <span id="modal-user-right-change-type" class='fw-bold'></span>
            </p>
            <hr class='mx-auto' style='max-width:50ch;'>
            <p class="text-center" data-i18n="modals.standard.rtc.userRightsChange.reload">Votre interface va se recharger dans 5 secondes ...</p>
        </div>`,
        footer: ``
    },
    'rtc-rights-attributed': {
        selector: '',
        header: {
            icon: '',
            title: 'modals.warning.project.rightsAttributed'
        },
        content: `
        <div>
            <p class="text-center" data-i18n="">Le propriétaire du projet vous a partagé ce dernier en mode lecture seule.</p>
            <p class="text-center" data-i18n="">Si vous souhaitez passer en éditeur afin de collaborer avec lui, vous pouvez cliquer sur le bouton "Envoyer une demande" ci-dessous, sinon cliquez sur le bouton "Ok".</p>
            <button type="button" class="btn btn-success" data-i18n="" onclick="">Envoyer une demande</button>
            <button type="button" class="btn btn-success" data-i18n="" onclick="">Ok</button>
        </div>`,
        footer: ``
    },
    'modal-newproject-nolink': {
        selector: '',
        header: {
            icon: '',
            title: 'modals.standard.share.title'
        },
        content: `
        <div>
            <p class="text-center" data-i18n="modals.standard.rtc.newProject.text">Vous devez créer un projet avant de pouvoir le partager.</p>
            <p class="text-center" data-i18n="modals.standard.rtc.newProject.click">Cliquez sur le bouton ci-dessous afin de créer un nouveau projet.</p>
            <button type="button" class="btn btn-success text-center" onclick="newProject()" data-i18n="[html]modals.standard.rtc.newProject.buttonCreate">Créer un nouveau projet <i class="fas fa-plus"></i></button>
        </div>`,
        footer: ``
    },
    'modal-link': {
        selector: '',
        header: {
            icon: '',
            title: ''
        },
        content: ``,
        footer: ``
    },
    'modal-exercise-statements': {
        selector: '',
        header: {
            icon: 'fas fa-tasks',
            title: 'modals.standard.exercise.title'
        },
        content: `
            <form id="exercise-statement-form">
                <div class="form-group col-md-12 ms-0 ps-0">
                    <label for="exercise-statement-input" class="tutorial-label">
                        <i class="far fa-edit"></i>
                        <span data-i18n="modals.standard.exercise.statement.label"></span>
                    </label>
                    <textarea class="form-control" id="exercise-statement-input" name="exercise-statement-input" data-i18n="[placeholder]modals.standard.exercise.statement.placeholder"></textarea>
                    <button type=submit class="btn vitta-button mt-2 text-light">
                        <span data-i18n="modals.standard.exercise.statement.submitButton"></span>
                    </button>
                    <button type="button" onclick="pseudoModal.openModal('exercise-statement-removal-confirm')" id="remove-statement-button" class="btn btn-danger mt-2 ms-2 text-light">
                        <span data-i18n="modals.standard.exercise.statement.removeButton"></span>
                    </button>
                </div>
            </form>

            ${INTERFACE_NAME !== 'adacraft' ?
                `<div id="check_box_div" class="d-flex mt-4">
                <span style="margin-top: 5px; margin-right: 10px;" data-i18n="[html]modals.standard.exercise.restriction.label">
                    Restreindre la bibliothèque de blocs seulement à ceux présent dans la zone d'assemblage.
                </span>
                <label class="switch">
                    <input type="checkbox" name="toolboxRestrictionName" id ="toolboxRestriction" onchange="Main.restrictToolbox()">
                    <span class="slider round"></span>
                </label>
            </div>` : ""}

            <div class="mt-2">
                <div class="form-group col-md-12 ms-0 ps-0">
                    <label class="tutorial-label">
                        <i class="fas fa-square-root-alt"></i>
                        <span data-i18n="modals.standard.exercise.autocorrector.label"></span>
                    </label>
                    <button id="autocorrector-modal-button" class="btn vitta-button d-block">
                        <span data-i18n="modals.standard.exercise.autocorrector.modalButton"></span>
                    </button>
                </div>
            </div>`,
        footer: ``
    },
    'exercise-statement-removal-confirm': {
        selector: '',
        header: {
            icon: 'fas fa-tasks',
            title: 'modals.standard.confirmStatement.title'
        },
        content: `
            <div class="form-group col-md-12 ms-0 ps-0">
                <label class="tutorial-label">
                    <i class="far fa-edit"></i>
                    <span data-i18n="modals.standard.confirmStatement.descriptionRemove"></span>
                </label>
                <div>
                    <a onclick="document.querySelector('#exercise-statement-form').dispatchEvent(new Event('submit', { bubbles: true }))" class="btn vitta-button mt-2 text-light">
                        <span data-i18n="modals.standard.confirmStatement.yes"></span>
                    </a>
                    <a onclick="pseudoModal.openModal('modal-exercise-statements')" class="btn btn-danger mt-2 ms-2 text-light">
                        <span data-i18n="modals.standard.confirmStatement.no"></span>
                    </a>
                </div>
            </div>`,
        footer: ``
    },
    'modal-formunittests': {
        selector: '',
        header: {
            icon: 'fas fa-tasks',
            title: 'code.popups.formTest.title'
        },
        content: `<input type="hidden" id="id-exercise" value=null>
            <div class="form-group col-md-12 ms-0 ps-0">
                <label class="tutorial-label">
                    <i class="fas fa-square-root-alt"></i>
                    <span data-i18n="code.popups.formTest.function"></span>
                </label>
                <input type="text" class="form-control" id="form-function"  data-i18n="[placeholder]code.popups.formTest.functionHolder"/>
            </div>
            <br>
            <div class="mb-3">
                <p class="d-flex collapsed" role="button" data-bs-toggle="collapse" data-bs-target="#collapsable-exercise-options" style="cursor: pointer;" aria-expanded="false">
                    <span class="caret-circle mx-2"><i class="fa fa-chevron-right caret-title"></i></span>
                    <span style="margin: auto 0; order: -1;" data-i18n="[html]code.popups.formTest.options">Options supplémentaires</span>
                </p>
                <div id="collapsable-exercise-options" class="collapse">
                    <div class="form-group col-md-12 ms-0 ps-0">
                        <label class="tutorial-label">
                            <i class="fas fa-link"></i>
                            <span data-i18n="code.popups.formTest.link">
                                Lien vers la solution de l'exercice
                            </span>
                        </label>
                        <input type="text" class="form-control" id="form-solution"  data-i18n="[placeholder]code.popups.formTest.linkHolder"/>
                    </div>
                    <div class="form-group col-md-12 ms-0 ps-0">
                        <label  class="tutorial-label">
                            <i class="fas fa-key"></i>
                            <span data-i18n="[html]code.popups.formTest.secret"></span>
                        </label>
                        <input type="text" class="form-control" id="form-secret" data-i18n="[placeholder]code.popups.formTest.secretHolder"/>
                    </div>
                </div>
                    
            </div>
            <div id="form-button-unitest" class="form-row ms-0 mb-1">
                <button id="add-unitest" class="btn btn-success my-3">
                    <span data-i18n="code.popups.formTest.addTest"></span>
                </button>
            </div>
            <div id='save-exercise-message'></div>
            <div class="d-flex justify-content-center flex-wrap">
                <button id="cancel-test" class="btn btn-secondary" style="margin-right: 5px;">
                    <span data-i18n="code.popups.formTest.cancel"></span>
                </button>
                <button id="save-test" class="btn btn-success" style="margin-left: 5px;">
                    <span data-i18n="code.popups.formTest.save"></span>
                </button>
            </div>`,
        footer: ``
    },
    'modal-unittests': {
        selector: '',
        header: {
            icon: 'fas fa-check',
            title: 'code.popups.unitTest.success'
        },
        content: `<div style="text-align: center;">
            <div class="big-icon">
                <i class="fas fa-circle-notch unit-test-icon-spin"></i>
            </div>
            <p id="unittests-progress" data-i18n="code.popups.unitTest.load"></p>
            <p>
                <span id="result1" style="display:none;"></span>
                <span id="result2" style="display:none"></span>
            </p>
            <p id="unittests-log"></p>
            <div id="unittests-content"></div>
            <div id="unittests-secret"></div>
            <div id="unittests-solution"></div>
            <button type="button" style="flex: 1;" id="return-exercise" class="btn btn-secondary">
                <span data-i18n="code.popups.unitTest.quit"></span>
            </button>
            </div>`,
        footer: ``
    },
    'modal-warningsave': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'modals.warning.default.title',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        selector: '#warning-save',
        customAttributes: [
            { name: 'role', value: 'dialog' },
            { name: 'aria-modal', value: 'true' },
            { name: 'aria-labelledby', value: 'modal-warningsave-title' },
            { name: 'aria-describedby', value: 'modal-warningsave-question modal-warningsave-hint' },
            { name: 'tabindex', value: '-1' }
        ],
        content: `
            <div id="modal-warningsave-question" style="text-align: center;">
                <div class="d-flex align-items-center justify-content-center gap-2">
                    <i class="fa fa-save" aria-hidden="true"></i>
                    <div data-i18n="[html]modals.warning.save.content.warn.question">
                        Voulez-vous sauvegarder votre travail avant de continuer ?
                    </div> 
                </div>
                <div>
                    <div id="modal-warningsave-hint"
                         class="hint"
                         style="margin-top: 0.5em;"
                         data-i18n="[html]modals.warning.save.content.warn.hint">
                        Si vous créez un nouveau projet sans avoir sauvegardé au préalable, votre travail actuel sera perdu...
                    </div>
                </div>
            </div>
        `,
        footer: `
            <button type="button"
                    id="modal-warning-save-btn-yes"
                    class="btn vitta-button"
                    style="flex:1;"
                    data-i18n="[aria-label]modals.warning.save.footer.buttons.yesAriaLabel;modals.warning.save.footer.buttons.yes"
            >
                Oui
            </button>
            <button type="button"
                    id="modal-warning-save-btn-no"
                    class="btn btn-secondary"
                    style="flex:1; margin-left:5px;"
                    data-i18n="[aria-label]modals.warning.save.footer.buttons.noAriaLabel;modals.warning.save.footer.buttons.no"
            >
                Non
            </button>
        `
    },
    'modal-warningoverride': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'modals.warning.default.title',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        selector: '#warning-override',
        content: `<span data-i18n="[html]modals.warning.override.content.warn">
                Etes vous sur de vouloir écraser la version déjà sauvegardée de ce projet ?
            </span>`,
        footer: `<button type="button" id="btn_warning_override_project" data-testid="interfaceOverrideAndSaveProjectSubmitBtn" class="btn vitta-button" style="flex:1;" data-i18n="modals.warning.override.footer.buttons.yes">
                Oui
            </button>
            <button type="button" id="btn_warning_override_project_decline" class="btn btn-secondary" style="flex:1; margin-left:5px;" data-i18n="modals.warning.override.footer.buttons.no">
                Non
            </button>`
    },
    'modal-warningdelete': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'modals.warning.default.title',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        selector: '#warning-delete',
        content: `<span data-i18n="[html]modals.warning.delete.content.warn">
                Etes vous sur de vouloir supprimer ce projet ?
            </span>`,
        footer: `<button type="button" id="btn_warning_delete_project" class="btn vitta-button" style="flex:1;" data-i18n="modals.warning.delete.footer.buttons.yes">
                Oui
            </button>
            <button type="button" id="btn_warning_delete_project_decline" class="btn btn-secondary" style="flex:1; margin-left:5px;" data-i18n="modals.warning.delete.footer.buttons.no">
                Non
            </button>`
    },
    'modal-warningexercise': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'modals.warning.default.title',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        selector: '',
        content: `<span class="fa fa-exclamation-circle"></span>
            <span data-i18n="code.popups.error.descExercise"></span><br>
            <a href="javascript:void(0)" class="login-modal" id="btn-login-duplicate" onClick="pseudoModal.closeLatestModal(); displayLogin();" data-i18n="navbar.items.user_shortcuts.willSignin"> Je me connecte </a> ou
            <a href="javascript:void(0)" class="login-modal" id="btn-signup-duplicate" onClick="pseudoModal.closeLatestModal(); displaySignup();" data-i18n="navbar.items.user_shortcuts.willSignup"> Je m'inscris !</a>`,
        footer: ``
    },
    'modal-warningexerciseother': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'modals.warning.default.title',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        selector: '',
        content: `<span class="fa fa-exclamation-circle"></span>
            <span data-i18n="code.popups.error.otherUser">
                Il n'est pas possible de modifier un exercice rédigé par un autre utilisateur. Nous vous invitions à créer vos propres exercices à partir de vos projets, ou bien à utiliser les exercices publics existants.
            </span>`,
        footer: ``
    },
    'modal-warningWrongLink': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'modals.warning.default.title',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        selector: '',
        content: `<span class="fa fa-exclamation-circle"></span>
            <span data-i18n="modals.warning.project.wrongLink">
                Ce lien dirige vers un projet inexistant ou n'a pas été créé avec cette interface. Vous pouvez chercher un projet depuis <br>Ouvrir un projet<br> ou en créer un nouveau.
            </span>`,
        footer: ``
    },
    'modal-warningWrongProjectFile': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'modals.warning.default.title',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        selector: '',
        content: `<span class="fa fa-exclamation-circle"></span>
            <span data-i18n="modals.warning.project.wrongFile">
                Ce fichier ne semble pas adapté à cette interface. Vérifier cette information dans l'en-tête du fichier à la ligne <br>Interface:<br>
            </span>`,
        footer: ``
    },
    'modal-warningexercisesave': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'modals.warning.default.title',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        selector: '',
        content: `<span class="fa fa-exclamation-circle"></span>
            <span data-i18n="code.popups.error.saveProjectForExercise">
            Il n'est pas possible de créer un exercice sur un projet non sauvegardé. Nous vous invitons à sauvegarder votre projet avant de créer votre exercice.
            </span>`,
        footer: `<button type="button" id="modal-warningexercisesave-btn-cancel" class="btn v-btn-basic me-1" style="flex:1;" data-i18n="[html]modals.standard.save.content.buttons.cancel" onclick="pseudoModal.closeModal('modal-warningexercisesave')">
                    Annuler
                </button>
                <button type="button" id="modal-warningexercisesave-btn-confirm" class="btn v-btn me-1" style="flex:1;" data-i18n="[html]modals.standard.save.content.buttons.save" onclick="(projectManager._currentProject.link == null || $('#save-name').val() === '' ? saveProjectbtn() : saveConfirm())">
                    Sauvegarder
                </button>`,
    },
    'python-server-warning-login': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'pythonServer.messages.modalTitles.needVM',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        content: `<div style="text-align: center;">
            <p data-i18n="[html]pythonServer.messages.modalTexts.programTooAdvanced"></p>
            <p data-i18n="[html]pythonServer.messages.modalTexts.needLogin"></p>
        </div>`,
        footer: `<button type="button" id="modal-warning-login-login" class="btn vitta-button" style="flex:1;" data-i18n="pythonServer.messages.buttons.login">
                Oui
            </button>
            <button type="button" id="modal-warning-login-cancel" class="btn btn-secondary" style="flex:1; margin-left:5px;" data-i18n="pythonServer.messages.buttons.cancel">
                Non
            </button>`
    },
    'python-server-warning-credentials': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'pythonServer.messages.modalTitles.credentials',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        content: `<div style="text-align: center;">
            <span data-i18n="[html]pythonServer.messages.modalTexts.credentials">
                "placeholder".
            </span><br/>`,
        footer: `<button type="button" id="modal-warning-credentials-continue" class="btn vitta-button" style="flex:1;" data-i18n="pythonServer.messages.buttons.continue">
                Oui
            </button>
            <button type="button" id="modal-warning-credentials-cancel" class="btn btn-secondary" style="flex:1; margin-left:5px;" data-i18n="pythonServer.messages.buttons.cancel">
                Non
            </button>`
    },
    'python-server-warning-vm-needed': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'pythonServer.messages.modalTitles.needVM',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        content: `<div style="text-align: center;">
            <span data-i18n="[html]pythonServer.messages.modalTexts.needVM">
                "placeholder".
            </span><br/>`,
        footer: `<button type="button" id="modal-warning-vm-continue" class="btn vitta-button" style="flex:1;" data-i18n="pythonServer.messages.buttons.continue">
                Oui
            </button>
            <button type="button" id="modal-warning-vm-cancel" class="btn btn-secondary" style="flex:1; margin-left:5px;" data-i18n="pythonServer.messages.buttons.cancel">
                Non
            </button>`
    },
    'lti-draft-notification-teacher': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'modals.lti-draft-notifications.teacher.title',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        content: `<div class="container text-center">
                    <p data-i18n="modals.lti-draft-notifications.teacher.informations" data-i18n-options='{"interface": "${INTERFACE_NAME}"}'></p>
                </div>`,
        footer: `
            <button type="button" id="modal-lti-draft-notification-teacher-clear" class="btn btn-orange" style="flex:1; margin-left:5px;" data-i18n="modals.lti-draft-notifications.teacher.clear">
                Clear
            </button>
            <button type="button" id="modal-lti-draft-notification-teacher-accept" class="btn vitta-button" style="flex:1; margin-left:5px;" data-i18n="modals.lti-draft-notifications.teacher.accept">
                Accept
            </button>`
    },
    'lti-draft-notification-student': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'modals.lti-draft-notifications.student.title',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        content: `<div class="container text-center">
                    <p data-i18n="modals.lti-draft-notifications.student.informations" data-i18n-options='{"interface": "${INTERFACE_NAME}"}'></p>
                </div>`,
        footer: `
            <button type="button" id="modal-lti-draft-notification-student-cancel" class="btn btn-secondary" style="flex:1; margin-left:5px;" data-i18n="modals.lti-draft-notifications.student.cancel">
                Cancel
            </button>
            <button type="button" id="modal-lti-draft-notification-student-reinitialize" class="btn btn-orange" style="flex:1; margin-left:5px;" data-i18n="modals.lti-draft-notifications.student.reinitialize">
                Reinitialize
            </button>`
    },
    'playlist-modal-deletion': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'modals.lti-draft-notifications.student.title',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        content: `<div class="container text-center">
                    <p>
                        vous êtes sur le point de supprimer la playlist <span id="playlist-modal-deletion-name"></span>
                    </p>
                </div>`,
        footer: `
            <button type="button" id="modal-playlist-delete-cancel" class="btn btn-secondary" style="flex:1; margin-left:5px;" data-i18n="modals.lti-draft-notifications.student.cancel">
                Cancel
            </button>
            <button type="button" id="modal-playlist-delete-confirm" class="btn btn-orange" style="flex:1; margin-left:5px;" data-i18n="modals.lti-draft-notifications.student.reinitialize">
                Reinitialize
            </button>`
    },
    'web-old-model-conversion': {
        header: {
            icon: 'fa fa-exclamation-circle',
            title: 'modals.web-old-model-conversion.title',
        },
        optionalClass: {
            "modal": 'vitta-modal-warning',
            "content": "text-center"
        },
        content: `<div class="container text-center">
                    <p data-i18n="[html]modals.web-old-model-conversion.content.description">
                    </p>
                </div>`,
        footer: `<div class="d-flex justify-content-center w-100">
                    <button type="button" class="btn btn-secondary" data-i18n="modals.web-old-model-conversion.footer.okayButton" onclick="pseudoModal.closeLatestModal();"></button>
                </div>`
    },
    'modal-codeOnly': {
        header: {
            icon: 'fa-solid fa-lock',
            title: 'modals.standard.codeOnly.title'
        },
        content: `<div class="container text-center">
                    <p data-i18n="modals.standard.codeOnly.content"></p>
                </div>`,
        footer: `
            <button type="button" id="modal-codeOnly-cancel" class="btn btn-secondary me-4 ms-5" style="flex:1;" data-i18n="modals.standard.codeOnly.cancel" onclick="pseudoModal.closeModal('modal-codeOnly')">
                Cancel
            </button>
            <button type="button" id="modal-codeOnly-confirm" class="btn btn-green me-5 ms-4" style="flex:1;" data-i18n="modals.standard.codeOnly.confirm" onclick="activateCodeOnly()">
                Confirm
            </button>`
    },
    'modal-codeOnly-info': {
        header: {
            icon: 'fa-solid fa-lock',
            title: 'modals.standard.codeOnly.info.title'
        },
        content: `<div class="container text-center">
                    <p data-i18n="modals.standard.codeOnly.info.content"></p>
                </div>`,
        footer: `
            <button type="button" id="modal-codeOnly-info-confirm" class="btn btn-green me-5 ms-4" style="flex:1;" data-i18n="modals.standard.codeOnly.confirm" onclick="pseudoModal.closeModal('modal-codeOnly-info')">
                Confirm
            </button>`
    },
    'modal-duo-settings': {
        selector: '',
        header: {
            icon: 'fa-solid fa-right-left',
            title: 'modals.duoSettings.title'
        },
        content: `<div class="container text-center mt-3">
                    <button id="close-duo-btn" class="btn btn-danger mb-2" data-i18n="modals.duoSettings.quitDuoBtn"></button>
                    <p data-i18n="modals.duoSettings.quitDuoDescription"></p>
                </div>`,
        footer: ``
    }
    // Template not modify, not delete
    // '0': {
    //     selector: '',
    //     header: {
    //         icon: '',
    //         title: ''
    //     },
    //     content: ``,
    //     footer: ``
    // }
};