function sendProject(formData,callbacks,callbackArg) {
    let request = getAjaxRequest();
    request.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
            let json = parseJson(this.responseText);
            if (!json){
                if (callbacks[0])
                    callbacks[0](false,[],null);
            }
            else {
                if (!json.project)
                    json.project = false;
                if (callbacks.length === 2 && callbackArg)
                    callbacks[0](json.success, json.errors,json.project,callbacks[1],callbackArg);
                else if (callbacks.length === 2)
                    callbacks[0](json.success, json.errors,json.project,callbacks[1],null);
                else
                    callbacks[0](json.success, json.errors, json.project ,null,null);
            }
        }
    };

    request.open("POST", "/services/post/postProject.php");
    request.send(formData);
}

function getUserProjects (callback,args){
    let request = getAjaxRequest();
    request.onreadystatechange = function (){
        if (this.readyState === XMLHttpRequest.DONE){
            let json = parseJson(this.responseText);
            if (!json){
                callback({"success": false});
            } else {
                let tab = [ json ];
                for (let i = 0; i < args.length; i ++){
                    tab.push(args[i]);
                }
                callback.apply(null, tab);
            }
        }
    };
    request.open("GET","/services/get/getProjectsByUser.php");
    //request.noCache();
    request.send();
}

function getSharedProjects (callback,args){
    let request = getAjaxRequest();
    request.onreadystatechange = function (){
        if (this.readyState === XMLHttpRequest.DONE){
            let json = parseJson(this.responseText);
            if (!json){
                callback({"success": false});
            } else {
                let tab = [ json ];
                for (let i = 0; i < args.length; i ++){
                    tab.push(args[i]);
                }
                callback.apply(null, tab);
            }
        }
    };
    request.open("GET","/services/get/getSharedProjects");
    //request.noCache();
    request.send();
}

function deleteProjectProfile(id, callback) {
    if (confirm(i18next.t('code.popups.openProject.categories.confirmProjectRemove')))
        deleteProject(id, callback);
}

function deleteProject (id,callback){
    let request = getAjaxRequest();

    let formData = new FormData();
    formData.append("id",id);

    request.onreadystatechange = function (){
        if (this.readyState === XMLHttpRequest.DONE){
            let json = parseJson(this.responseText);
            if (!json){
                callback({"success": false},id);
            }
            else {
                callback(json,id);
            }
        }
    };
    request.open("POST","/services/delete/deleteProject.php");
    request.send(formData);
}

function getProjectById(id,callback){
    let request = getAjaxRequest();
    request.onreadystatechange = function (){
        if (this.readyState === XMLHttpRequest.DONE){
            let json = parseJson(this.responseText);
            if (json){
                if (json.success && json.project){
                    callback(json.project);
                }
            }
        }
    };

    request.open("GET","/services/get/getProject.php?id=" + id.toString());
    //request.noCache();
    request.send();

}