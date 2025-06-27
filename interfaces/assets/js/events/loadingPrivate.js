const privateSource = `
    <div class="ide-dropdown ide-dropdown-files">
        <button class="ide-btn ide-btn-toggle ide-btn-alone" id="ide-navbar-toggler">
            <i class="fas fa-ellipsis-v"></i>
        </button>
        <div id="manage-button-panel" class="ide-btn-group ide-btn-group-save hidden">
            <!-- Project information -->
            <div class="project-data">
                <span class="project-name" id="project-name" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="project-info-tooltip" data-bs-title="Nom du projet">no name</span>
                <div class="d-flex justify-content-between">
                <span id="project-is-saved" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Sauvegarder le projet">
                    <i class="fas fa-check"></i>
                </span>
                <button id="edit-project-name"
                    class="btn"
                    style="color: var(--text-1);cursor: pointer;"
                    data-i18n="[title]modals.standard.edit.title;[aria-label]modals.standard.edit.title" 
                    data-bs-toggle="tooltip" data-bs-placement="top"
                    data-bs-title="Modifier les informations du projet"
                >
                    <i class="far fa-edit"></i>
                </button>
                </div>
                <span style='font-size:11px; font-weight:normal;' id="project-shared-status" hidden></span>
                <span style='font-size:11px; font-weight:normal;' id="project-date-updated" hidden></span>
            </div>
        </div>
    </div>
    <!-- Button management project -->
    <div class="ide-btn-group ide-btn-group-save hide-sm hide-vsm" id="manage-button-panel"></div>
    <div class="ide-btn-group ide-btn-group-save hidden">
    <script>
        updateTooltips()
    </script>`;

/**
 * Load interface in private execution.
 * @param {string} interfaceName
 */
function loadingPrivate(interfaceName) {
    console.log("Private execution of interface: " + interfaceName);
    $(".ide-navbar").prepend(privateSource);
    $("#ide-navbar-toggler").on('click', function () {
        const elem = $(this).parent().children('div.ide-btn-group');
        $(".ide-btn-group").each(function () {
            if (!$(this).hasClass('hidden') && $(this).attr('class') != elem.attr('class')) {
                $(this).toggleClass('hidden');
            }
        });
        elem.toggleClass('hidden');
    });
    initPrivateModal();
    //init Project manager
    UserManager.init().then(
        // resolve ()
        async () => {
            if (UserManager.getUser() === null) {
                projectManager = new ProjectManagerVisitor(interfaceName);
                projectManager.isVisitor = true;
            } else {
                projectManager = new ProjectManagerUser(interfaceName, UserManager.getUser());
            }
            projectManager._refreshProjectStatus(true);
            if (typeof rtcInterfaces != 'undefined' && rtcInterfaces.includes(INTERFACE_NAME) && getParamValue('link') != null) {
                if (document.referrer.match(/\/(learn|classroom)/) == null && typeof ltiVariables13 === 'undefined') {
                    await projectManager.initializeRtc();
                }
            }
            if (INTERFACE_NAME == "TI-83" && getParamValue('action') != null) {
                projectManager.tiInterfaceEvents(getParamValue('action'));
            }

            if (Main.inIframe() == true && getParamValue('from') == 'technoHatier') {
                setTimeout(() => {
                    $("#monitor").removeClass('monitor-open');
                    $('#monitor-view, #monitor-controls').hide();
                    $('#monitor').animate({
                        height: '0'
                    }, {
                        step: function () {
                            $('.ide-editor').height('100%'); /* needed from the slideDown from top to bottom */
                            Main.resizeAceEditor();
                        },
                        complete: function () {
                            $('.ide-editor').height('100%');
                            $('#monitor-view').css('margin-top', '0px');
                            Main.resizeAceEditor();
                            if (!Main.hasDragAndDrop() && Main.getCodingMode != 'code')
                                Main.resizeWorkSpace();
                        }
                    }, 'fast');
                    $('#monitor-tools #monitor-toggler i').removeClass("fa-chevron-down");
                    $('#monitor-tools #monitor-toggler i').addClass("fa-chevron-up");
                }, 500);
            }
        },
        // reject()
        () => { }
    );
    // Init tooltips after loading private
    $("#manage-button-panel button").tooltip();
    fileUploaderInit();
};