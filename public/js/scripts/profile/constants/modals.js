const profileModals = {
    'modal-sharetuto': {
        selector: '',
        optionalClass: {},
        header: {
            icon: '',
            title: 'code.popups.shareProject.title'
        },
        content: `<ul class="nav nav-tabs" id="modal-sharetuto-links" role="tablist">
                <li class="nav-item">
                    <a href="" id="modal-sharetuto-tab" class="nav-link ide-share-tab active" data-toggle="tab" role="tab" aria-controls="Lien direct" aria-selected="true">` + i18next.t('code.popups.shareProject.link.title') + `</a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane fade show active" id="modal-sharetuto-tab-content" role="tabpanel" aria-labelledby="home-tab"></div>
            </div>`,
        footer: ``
    },
    'modal-shareproject': {
        selector: '',
        header: {
            icon: '',
            title: 'modals.standard.share.title'
        },
        content: `<ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                    <a id="modal-shareproject-tab-link" class="nav-link ide-share-tab active" data-toggle="tab" role="tab" aria-controls="Lien direct" aria-selected="true" data-i18n="code.popups.shareProject.link.title" style="cursor:pointer;">Lien</a>
                </li>
                <li class="nav-item">
                    <a id="modal-shareproject-tab-iframe" class="nav-link ide-share-tab" data-toggle="tab" role="tab" aria-controls="Intégrer à un autre site/blog" aria-selected="false" data-i18n="code.popups.shareProject.iframe.title" style="cursor:pointer;">Intégrer à un autre site</a>
                </li>
            </ul>
            <div class="tab-content" id="modal-shareproject-link-content">
                <div class="tab-pane fade show active" id="modal-shareproject-tab-link-content" role="tabpanel" aria-labelledby="link-tab">Link</div>
                <div class="tab-pane fade" id="modal-shareproject-tab-iframe-content" role="tabpanel" aria-labelledby="iframe-tab">Iframe</div>
            </div>`,
        footer: `<div id="modal-shareproject-footer" class="w-100"></div>`
    }
}