const createProjectAdacraft = function () {
  console.log('createProject')

  const promise = new Promise(function (resolve, reject) {
    $.ajax({
      type: "POST",
      url: "/routing/Routing.php?controller=project&action=add",
      data: {
        'name': `adacraft project ${Math.floor(Math.random() * 1000)}`,
        'description': `created: ${new Date()}`,
        'code': projectCodeJson,
        'dateUpdated': new Date(),
        'codeText': 'N/A for adacraft',
        'codeManuallyModified': false,
        'public': false,
        'interface': 'adacraft',
      },
      dataType: "JSON",
      success: function (response) {
        console.log('project created')
        console.log(response);
        resolve(response);
        loadProjectById(response.link)
      },
      error: function () {
        UIManager.showErrorMessage('error-display', AJAX_SERVER_ERROR[getCookie('lng')]);
      }
    });
  });
}

const saveProjectToComputerAdacraft = function () {
  adacraft.saveProjectToComputer()
}

const loadProjectFromComputerAdacraft = function () {
  adacraft.loadProjectFromComputer()
}

const undoAdacraft = function () {
  adacraft.undo()
}

const redoAdacraft = function () {
  adacraft.redo()
}