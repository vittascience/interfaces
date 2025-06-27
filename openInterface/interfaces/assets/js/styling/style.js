$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover',
        container: 'body'
    });
    $('[data-toggle="tooltip"]').on('click', function () {
        $(this).tooltip('hide')
    });
    $('[data-toggle="tooltip"]').mouseleave(function () {
        $(this).tooltip('hide');
    });

    $('#workspace, #content_area, #content_blocks').height('100%');

    // buttonsModeDirection();
    Main.resizeWorkSpace();
    if (INTERFACE_NAME != "adacraft") {
        Main.resizeAceEditor();
    }

    $('#generator').on('keyup click touchstart', function (e) {
        $('#generator').find('.cm-keyword').each(function (e, item) {
            if ($(item).html() == "___")
                $(item).css('background-color', 'grey');
        });
    });

});

/**
 * Resize code div
 */

// we set the left edge to be resizable if the language is LTR, and the opposite if RTL
resizeableEdge = $('html').attr('dir') === 'rtl' ? 'right' : 'left';

interact('#generator')
    .resizable({
        edges: {
            top: false,
            left: resizeableEdge === 'left',
            bottom: false,
            right: resizeableEdge === 'right'
        },
        modifiers: [

            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
                outer: 'parent'
            })
        ],

        inertia: false
    })
    .on('resizemove', event => {
        if (!Main.hasDragAndDrop())
            resizeBlocklyToolBox();

        //Disable resize if wrong mode (python/blocks)
        if (Main.getCodingMode() != "mixed") {
            return;
        }
        Object.assign(event.target.style, {
            width: (event.rect.width) + 'px'
        });
        Main.resizeWorkSpace();
        if (INTERFACE_NAME != "adacraft") {
            Main.resizeAceEditor();
        }
    });

/**
 * Resize console
 */
interact('#monitor')
    .resizable({
        edges: {
            top: true,
            left: false,
            bottom: false,
            right: false
        },
        modifiers: [

            // minimum size
            interact.modifiers.restrictSize({
                min: {
                    height: 210
                },
                max: {
                    height: $('#ide-content').height() - 25
                }
            })
        ],
        inertia: false
    })
    .on('resizemove', event => {
        if ($('#monitor').height() == '0') {
            InterfaceMonitor.toggle();
        }
        $('#monitor').height(event.rect.height);
        $('.ide-editor').height($('.ide-base').height() - event.rect.height);
        Main.resizeWorkSpace();
        if (INTERFACE_NAME != "adacraft") {
            Main.resizeAceEditor();
        }
    });

/**
 * Change display to responsive if block size < 550
 */
function resizeBlocklyToolBox() {
    // TI-83 has toolbox in code mode only but no ide-block, in this case need to check the ide-editor width instead of ide-block
    if (INTERFACE_NAME === "TI-83" && ($_GET('mode') === 'code' || $_GET('mode') === 'python')) {
        if ($(".ide-editor").width() < 550 + 133) {
            $('.blocklyToolboxDiv').addClass('blocklyToolboxDiv-small');
        } else {
            $('.blocklyToolboxDiv').removeClass('blocklyToolboxDiv-small');
        }
    } else {
        if ($(".ide-block").width() < 550) {
            $('.blocklyToolboxDiv').addClass('blocklyToolboxDiv-small');
        } else {
            $('.blocklyToolboxDiv').removeClass('blocklyToolboxDiv-small');
        }
    }
    Main.resizeWorkSpace();
    if (Main.hasDragAndDrop() && Main.getCodingMode() === 'code') {
        if (document.getElementById("toolbox-toggler").children[0].classList.contains('fa-chevron-left')) {
            $("#generator").width(dragAndDrop.size());
        }
    }
}

/**
 * Change display to responsive if block size < 870
 */
function resizeModalLedsMatrix() {
    if (($('#leds_matrix').length || $('#edit_leds_matrix').length) != 0) {
        if ($(window).width() < 870) {
            $('#leds_matrix').after($('#suggestions'));
        } else {
            $('#edit_leds_matrix').after($('#suggestions'));
        }
    }
};

/**
 * Change renderer of blocks.
 */
function changeRenderer() {
    let form = $('#access-form-ide').serializeArray();
    for (let i = 0; i < form.length; i++) {
        if (form[i].name == 'block-style') {
            if (projectManager && projectManager._capytaleManager) {
                const reloadUrl = new URL(location.href);
                reloadUrl.searchParams.delete('renderer');
                reloadUrl.searchParams.append('renderer', form[i].value);
                projectManager._capytaleManager.reload(reloadUrl.href, {renderer: form[i].value, project: projectManager.getCurrentProjectDataForAppAgent()});
                break;
            }
            let url = removeParam("renderer", window.location.href);
            window.location = url + `&renderer=${form[i].value}`;
        }
    }
};

/** 
 * Manage display of the console controller
 */
function buttonsModeDirection() {
    let btnMode = $('.monitor-view-btn');
    if ($('#console').height() <= 140) {
        if ($('#monitor-view-group-btn')[0].style.flexDirection !== 'row') {
            $('#monitor-view-group-btn')[0].style.flexDirection = 'row';
            for (let i = 0; i < $(btnMode).length; i++)
                btnMode[i].style.marginRight = '0px';
            btnMode[0].style.borderRadius = '10px 0 0 10px';
            btnMode[btnMode.length - 1].style.borderRadius = '0px 10px 10px 0px';
        }
    } else {
        if ($('#monitor-view-group-btn')[0].style.flexDirection !== 'column') {
            $('#monitor-view-group-btn')[0].style.flexDirection = 'column';
            for (let i = 0; i < $(btnMode).length; i++)
                btnMode[i].style.marginRight = '3px';
            btnMode[0].style.borderRadius = '10px 10px 0 0';
            btnMode[btnMode.length - 1].style.borderRadius = '0 0 10px 10px';
        }
    }
};

/* Prevent break interfaces */
$("#navbar-toggle-button").on('click', function () {
    $("#navbarToggle").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
        Main.resizeWorkSpace();
        if (INTERFACE_NAME != "adacraft") {
            Main.resizeAceEditor();
        }
    });
});

/* Prevent break interfaces on resize */
$(window).resize(function () {
    $('#workspace, #content_area, #content_blocks').height('100%');
    Main.resizeWorkSpace();
    if (Main.hasDragAndDrop() && Main.getCodingMode() == 'code') {
        resizeBlocklyToolBox();
        if ($("#simulator").is(":visible") || $("#simulator-wires").is(":visible"))
            $('#generator').width($(window).width() - $('.blocklyToolboxDiv').width() - $('.ide-simulator').width());
        else
            $('#generator').width($(window).width() - $('.blocklyToolboxDiv').width());
    } else {
        resizeBlocklyToolBox();
        if (INTERFACE_NAME != "adacraft" && INTERFACE_NAME != "web" && Main.getCodingMode() != 'code'){
            if (!["python", "letsstartcoding"].includes(INTERFACE_NAME) && Simulator.isOpen) {
                const ideBase = document.querySelector('.ide-base');
                ideBase.style.width = $('#ide-content').width() - 500 + 'px';
            }
            Main.resizeAceEditor();
        }
    }
    resizeModalLedsMatrix();
});