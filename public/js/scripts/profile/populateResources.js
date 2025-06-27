/**
 * This function add a link block before each category
 * @public
 * @param {string} html
 * @param {array} resource
 * @param {string} page
 */
function prependHtml(html, resource, page) {
    let prepend = `<div id='profile-resources-counter'>`
    if (resource.length == 0) {
        prepend += `<div data-i18n='profile.res.noData'>Vous n'avez ajouté aucune ressource.</div>
    </div>`;
        if (page == "profile") {
            prepend += `<span data-i18n='[html]profile.pro.addData'>Cliquez <a href='/learn/form.php'>ici</a> pour en ajouter une nouvelle.</span>`
        }
    } else {
        return prepend += html
    }
}

/**
 * This function display all projects from a support for the connected user
 * @public
 * @param {string} support 
 * @param {string} page 
 */
function displayMyProjects(page) {
    $.ajax({
        type: "POST",
        url: "/routing/Routing.php?controller=project&action=get_all_user_projects_for_all_interfaces",
        data: {
            "user": $_GET('id'),
        },
        success: function (response) {
            var project = JSON.parse(response)
            if (project.length == 0) {
                var html = prependHtml('', project, page)
            } else {
                let projects = {};

                project.forEach(el => {
                    if (!projects[el.interface]) {
                        projects[el.interface] = [];
                    }
                    projects[el.interface].push(el);
                });

                for (let key in projects) {

                    let project = projects[key];
                    let support = key;

                    let listproject__html = generateListProjects(project, support, page);
                    // return;
    
                    let hintHtml =
                        `<h2 id="" data-testid="profileToggleProjects_${support}" class="openproject-subtitle" data-bs-toggle="collapse" data-bs-target="#container-${support}" aria-expanded="false" aria-controls="collapse-${support}">
                            <i class="fas fa-chevron-right list-dropdown dropped" style="transform: rotate(90deg); transform-origin: 50% 50%;"></i>
                            <i class="fa fa-user"></i>
                            <span data-i18n="[html]profile.pro.list.label" data-i18n-options='{"support": "${support}"}'>Mes projets</span>
                            <span id="projects-${support}-count" class="project-count badge bg-success">${project.length}</span>
                        </h2>`;
    
                    let support__html =
                        `<div id="container-${support}" class="container-fluid mt-2 collapse">
                            ${listproject__html}
                        </div>`;
    
                    let html = `<div class="mb-2 pb-2 openproject-list">${hintHtml}${support__html}</div>`
    
                    $('#collapse_projects').append(html).localize();
    
                    $("#search-project-input").keyup(function () {
                        let keyword = $("#search-project-input").val();
                        let emptySearch = (keyword.length === 0 || !keyword.trim());
                        if (emptySearch === true) {
                            $(`#projects-${support}-count`).html(project.length);
                            $(`#container-${support}`).html(generateListProjects(project, support, page));
                        } else {
                            let result_research = searchProject(project, keyword);
                            $(`#projects-${support}-count`).html(result_research.length);
                            $(`#container-${support}`).html(generateListProjects(result_research, support, page));
                        }
                    });
                }    
            }
            setTimeout(function () {
                $('#collapse_projects').localize();
                $(function () {
                    $('[data-toggle="tooltip"]').tooltip()
                });
            }, 100);
        },
        error: function () {
            console.log(AJAX_SERVER_ERROR);
            reject(AJAX_SERVER_ERROR);
        }
    });
}


function generateListProjects(projects, support, page = 'profile') {
    let list__project = ``
    let item__project = ``;
    $.each(projects, function (index, project_element) {

        if (project_element.dateUpdated != null) {
            var date = new Date(project_element.dateUpdated.date);
            // format like 13 october 2021, 15:00
            date = new Intl.DateTimeFormat(getCookie('lng'),
                {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                }).format(date);

        } else {
            var date = i18next.t("profile.pro.list.item.dateUnknown");
        }

        if (page == "profile" || project_element.public == 1) {
            var checked = project_element.public == 0 ?  "" : " checked";
            if (project_element.description == '') {
                var desc = i18next.t("profile.pro.list.item.noDesc");
            } else {
                var desc = decodeURI(project_element.description)
            }

            item__project =
                `<div class="border rounded mb-3 p-2">
                    <div class="d-flex flex-column" data-resource-id="${project_element.link}">
                        <p class="project-title fw-bold mb-1">${decodeURI(project_element.name)}</p>
                        <p class="project-date mb-1" style="font-size: 0.9em; color: var(--text-3)">${date}</p>
                        <p class="project-desc">${desc}</p>`

                        if (page == "profile") {
                            item__project += `<div class="project-visibility form-check form-switch mx-1">
                                <input class="form-check-input shareProjectToggle" type="checkbox" role="switch" id="shareProjectToggle-${index}" data-id="${project_element.link}" ${checked}>
                                <label class="form-check-label project-status" for="shareProjectToggle-${index}" data-i18n="[html]modals.standard.save.content.shareMode">
                                    Partager avec la communauté ?
                                </label>
                            </div>`
                        }

            item__project += `<div class="d-flex gap-2">
                    <a target="_blank" href="${window.location.origin}/${support}/?link=${project_element.link}" class='btn btn-primary btn-sm' data-i18n='profile.res.buttons.open' style="flex:1;">
                        Voir
                    </a>
                    <button type='button' class='btn btn-orange btn-sm' data-i18n='profile.res.buttons.share' data-id="${project_element.link}" onclick=shareProjectChoice('#link','${project_element.link}','${support}') style="flex:1;">
                        Partager
                    </button>`
            if (page == "profile") {
                item__project += `<button type='button' class='btn btn-danger btn-sm delete-item' data-i18n='profile.res.buttons.delete' data-id="${project_element.link}" data-testid="userProfileDeleteProjectBtn_${project_element.link}" style="flex:1;">
                    Supprimer
                </button>`
            }
            item__project +=
                `
                </div>
            </div></div>`;
            list__project += item__project;
        }
    });

    let listproject__html =
        `<div class="row">
            ${list__project}
        </div>`;

    return listproject__html;
}

/**
 * Filter projects using a keyword.
 * @public
 * @param {Array} projects
 * @param {string} keyword
 * @returns {Array} An array of projects filtred based on the keyword.
 */
function searchProject(projects, keyword) {
    keyword = keyword.toLowerCase();
    keyword = keyword.replace(/\s+$/, '');
    if (projects.length == 0) {
        return projects;
    } else {
        var projectBis = [];
        for (let i = 0; i < projects.length - 1; i++) {
            if (projects[i].user !== null && projects[i].user !== undefined && projects[i].user.user_firstname !== null && projects[i].user.user_firstname !== undefined) {
                if (projects[i].name.toLowerCase().indexOf(keyword) > -1 || projects[i].description.toLowerCase().indexOf(keyword) > -1 ||
                    projects[i].user.firstname.toLowerCase().indexOf(keyword) > -1 || projects[i].user.surname.toLowerCase().indexOf(keyword) > -1) {
                    projectBis.push(projects[i]);
                }
            } else {
                if (projects[i].name.toLowerCase().indexOf(keyword) > -1 || projects[i].description.toLowerCase().indexOf(keyword) > -1) {
                    projectBis.push(projects[i]);
                }


            }
        }
        return projectBis;
    }
}


$(document).ready(function () {
    if ($_GET('id') == undefined) {
        var page = "profile"
    } else {
        var page = "userDetails"
    }
    $.ajax({
        type: "POST",
        url: "/routing/Routing.php?controller=course&action=get_all_user_resources",
        data: {
            "user": $_GET('id')
        },
        success: function (response) {
            var tutorials = JSON.parse(response)
            if (tutorials.length == 0) {
                var html = prependHtml('', tutorials, page)
            } else {

                //Count the number of resources
                var html = `<div class="mt-3"><span data-i18n=\'[html]profile.res.countData\' data-i18n-options=\'{"count": ` + tutorials.length + `}\' ></span>
            </div>
            <span data-i18n='[html]profile.res.addData'>Cliquez <a href='/learn/form.php'>ici</a> pour en ajouter une nouvelle.</span>
            <h4 class='grey-vitta' data-i18n='profile.res.listTitle'>Liste des tutoriels</h4>
            `
                for (let i = 0; i < tutorials.length; i++) {
                    if (tutorials[i].createdAt != null) {
                        var date = new Date(tutorials[i].createdAt.date);
                        var day = date.getDate();
                        var month = date.getMonth() + 1;
                        var year = date.getFullYear();
                        date = day + "/" + month + "/" + year
                    } else {
                        var date = i18next.t("profile.pro.list.item.dateUnknown");;
                    }

                    let title = tutorials[i].title.replace(/[ '"’]/g, '-')
                    //Display title & description, allows to open or share
                    html += `<div class='resource-box-profile' data-resource-id='${tutorials[i].id}'>
                        <div><span class='h6 mb-1'>#${i + 1 + " "  + tutorials[i].title}</span></div>
                        <div class='mb-1'>
                            <i class='fa fa-calendar'></i> ${date}
                        </div>
                        <div class="d-flex gap-2">
                            <a target='_blank' href='/learn/tutorial.php?id=${tutorials[i].id}' type='button' class='btn btn-primary btn-sm' data-i18n='profile.res.buttons.seeMore'>Voir fiche</a>
                            <button type='button' class='btn btn-primary btn-sm' data-resource-id='${tutorials[i].id}' data-resource-title='${title}' id="share-resource-button">
                                <i class="fa-solid fa-share-nodes"></i>
                                ${i18next.t('profile.res.buttons.share')}
                            </button>`
                    if (page == "profile") {
                        html += `<a href='/learn/form.php?id=` + tutorials[i].id + `&action=modify' type='button' class='btn btn-orange btn-sm' data-i18n='profile.res.buttons.modify'>Modifier</a>`
                    }
                    html += `</div>
                </div>
                `
                }
                html = prependHtml(html, tutorials, page)
                $(html).localize();
            }
            $("#collapse_resources").html(html);
        },
        error: function () {
            console.log(AJAX_SERVER_ERROR);
            reject(AJAX_SERVER_ERROR);
        }
    });

    displayMyProjects(page);

});

/*     
displayMyProjects("arduino", page);
displayMyProjects("microbit", page);
displayMyProjects("python", page);
displayMyProjects("esp32", page);
displayMyProjects("stm32", page);
displayMyProjects("TI-83", page);
displayMyProjects("galaxia", page);
displayMyProjects("mBot", page);
displayMyProjects("m5stack", page);
displayMyProjects("buddy", page);  
*/



//Action to put a project private/public
$('body').on('click', '.shareProjectToggle', function () {
    let link = $(this).attr('data-id')
    let isPublic = 0
    if ($(this).is(':checked')) {
        isPublic = 1  
    }

    $.ajax({
        type: "POST",
        url: "/routing/Routing.php?controller=project&action=toggle_public",
        data: {
            'link': link,
            'isPublic': isPublic
        }

    });
});
//Action to delete a project 
$('body').on('click', '.delete-item', function () {
    if (confirm("Voulez vous supprimer le projet?")) {
        let link = $(this).attr('data-id')
        var el = $(this)
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=project&action=delete_project",
            data: {
                'link': link
            },
            success() {
                el.parent().parent().parent().remove()
            }
        });
    }
});
$('body').on('click', '#share-resource-button', function () {
    let link = window.location.origin + '/learn/tutorial.php?id=' + $(this).attr('data-resource-id') + '/' + $(this).attr('data-resource-title')
    link = link.replace(/ '"’/g, '-')
    openShareTuto(link);
})

function shareProjectChoice(frame, project, support) {

    $("html, body").animate({
        scrollTop: 0
    }, "slow");

    var projectLink = (typeof project == typeof "") ? project : project.link;

    let linkStruct = {
        base: window.location.origin + `/${support}/`,
        args: {
            link: projectLink,
            mode: '',
            console: '',
            simu: '',
            embed: '',
            nocloud: ''
        }
    };

    projectLink = stringifyLinkShare(linkStruct);

    $('#modal-shareproject-tab-link, #modal-shareproject-tab-iframe').unbind('click');

    /**
     * Conditional options
     */
    let specificInterfaceOption = ``;
    let specificInterfaceOptionSimulator = ``;
    if (support !== 'python') {
        specificInterfaceOption =
            `<input type="radio" name="shareOptionsMode" value="simuOnly" id="shareOptionsModeSimuOnly" class="switcher__input switcher__input--right">
            <label for="shareOptionsModeSimuOnly" class="switcher__label" data-i18n="modals.standard.share.content.options.mode.simuonly">Simu only</label>`;

        specificInterfaceOptionSimulator =
            `<div id="modal-share-options-simulator" class="flex-column ms-1" style="display: flex;">
                <span class="text-center" data-i18n="modals.standard.share.content.options.simulator.title">Simulateur</span>
                <!-- Simultor mode -->
                <div class="switcher">
                    <input type="radio" name="shareOptionsSimulator" value="1" id="shareOptionsSimulatorEnable" class="switcher__input switcher__input--left">
                    <label for="shareOptionsSimulatorEnable" class="switcher__label" data-i18n="modals.standard.share.content.options.simulator.enable">Activé</label>

                    <input type="radio" name="shareOptionsSimulator" value="" id="shareOptionsSimulatorDisable" class="switcher__input switcher__input--right" checked>
                    <label for="shareOptionsSimulatorDisable" class="switcher__label" data-i18n="modals.standard.share.content.options.simulator.disable">Désactivé</label>

                    <span class="switcher__toggle"></span>
                </div>
            </div>`
    } else {
        specificInterfaceOption =
            `<input type="radio" name="shareOptionsMode" value="consoleOnly" id="shareOptionsModeConsoleOnly" class="switcher__input switcher__input--right">
            <label for="shareOptionsModeConsoleOnly" class="switcher__label" data-i18n="modals.standard.share.content.options.mode.consoleonly">Console</label>`;
    }

    if (frame == '#iframe') {
        $('#modal-shareproject-tab-link, #modal-shareproject-tab-link-content').removeClass('active show');
        $('#modal-shareproject-tab-iframe, #modal-shareproject-tab-iframe-content').addClass('active show');
        $('#modal-shareproject-tab-iframe-content').html(IFRAME);
        $('#modal-shareproject-tab-iframe-content').after(optionsModal)
        $('#iframe-value').attr('src', projectLink + '&embed=1')
        $('#iframe-value').html(`<iframe width='100%' height='500' allowfullscreen frameborder='0' style='border:1px #d6d6d6 solid;' src="` + projectLink + `"></iframe>`)
        $("#modal-shareproject-tab-link-content").html('');

        $('#copy-frame').click(function () {
            $('#copy-frame').unbind('click');
            copyToClipboard($('#iframe-value'), $("#copy-frame-msg"));
        });

    } else {
        $('#modal-shareproject-options').remove()
        $('#modal-shareproject-options-title').remove()
        $('#modal-shareproject-tab-iframe, #modal-shareproject-tab-iframe-content').removeClass('active show');
        $('#modal-shareproject-tab-link, #modal-shareproject-tab-link-content').addClass('active show');
        $("#modal-shareproject-tab-link-content").html(linkHtml);
        $('#link-value').val(projectLink);
        $('#modal-shareproject-tab-iframe-content').html('');

        QrCreator.render({
            text: projectLink,
            radius: 0, // 0.0 to 0.5
            ecLevel: 'L', // L, M, Q, H
            fill: '#22b573', // foreground color
            background: 'white', // color or null for transparent
            size: 150 // in pixels
        }, document.querySelector('#qrcode'));

        $('#copy-link').click(function () {
            $('#copy-link').unbind('click');
            copyToClipboard($('#link-value'), $("#copy-link-msg"));
        });
    }

    $('#modal-shareproject-tab-link').click(function () {
        shareProjectChoice('#link', project, support);
    });
    $('#modal-shareproject-tab-iframe').click(function () {
        shareProjectChoice('#iframe', project, support);
    });

    function updateLinkShare(linkStruct) {
        let link = stringifyLinkShare(linkStruct);
        $('#link-value').val(link);
    }

    function updateLinkIntegrate(linkStruct) {
        let link = stringifyLinkShare(linkStruct);
        let iframe = `<iframe width='100%' height='500' allowfullscreen frameborder='0' style='border:1px #d6d6d6 solid;' src="${link}"></iframe>`;
        $('#iframe-value').val(iframe);
    }

    function updateValueLinkShare(key, value, linkStruct) {
        console.log(key)
        console.log(value)
        if (linkStruct.args.hasOwnProperty(key)) {
            linkStruct.args[key] = value;
        }
        updateLinkShare(linkStruct);
        updateLinkIntegrate(linkStruct);
    }

    $('input[type=radio][name=shareOptionsConsole]').change(function () {
        updateValueLinkShare('console', this.value, linkStruct);
    });
    $('input[type=radio][name=shareOptionsMode]').change(function () {
        updateValueLinkShare('mode', this.value, linkStruct);
        if (this.value == "simuOnly") {
            $('#modal-share-options-simulator').hide();
            $('#shareOptionsSimulatorDisable').prop('checked', true);

            $('#modal-share-options-console').hide();
            $('#shareOptionsConsoleBottom').prop('checked', true);

            updateValueLinkShare('simu', $('#shareOptionsSimulatorDisable').val(), linkStruct);
        } else {
            $('#modal-share-options-simulator').css('display', 'flex');
            $('#modal-share-options-console').css('display', 'flex');
        }

    });
    $('input[type=radio][name=shareOptionsEmbed]').change(function () {
        updateValueLinkShare('embed', this.value, linkStruct);
    });
    $('input[type=radio][name=shareOptionsSimulator]').change(function () {
        updateValueLinkShare('simu', this.value, linkStruct);
    });
    $('input[type=radio][name=shareOptionsNoCloud]').change(function () {
        updateValueLinkShare('nocloud', this.value, linkStruct);
    });



    $(`#shareOptionsModeMixed`).click();

    $(`#shareOptionsConsoleBottom`).click();



    $(`#shareOptionsEmbedNo`).click();

    $('#modal-shareproject').localize()
    $('#modal-shareproject').show();
}

function stringifyLinkShare(linkObject) {
    let link = linkObject.base + '?';
    $.each(linkObject.args, (k, v) => {
        if (v != '') {
            link += `${k}=${v}&`;
        }
    });

    /* Substr to remove last character either ? or & */
    return link.substr(0, link.length - 1);
}