function confirmExperimentDelete(id){
    var boxes = document.getElementsByClassName("experiment-box");
    for (var i = 0; i < boxes.length; i ++){
        if (parseInt(boxes[i].getAttribute("expid")) === id){
            $(boxes[i]).fadeOut("slow",function (){
                var counter = 0;
                for (i = 0; i < boxes.length; i++){
                    if ($(boxes[i]).is(":visible")){
                        counter++;
                    }
                }
                if (counter === 0) {
                    $("#profile-experiment-counter").text(i18next.t("profile.exp.noData", { defaultValue: "Vous n'avez ajouté aucune expérience." }));
                    $("#experiments-list-title").html("");
                }
                else {
                    $("#profile-experiment-counter").html(i18next.t("profile.exp.countData", { count: counter, defaultValue: "Vous avez <span class='badge bg-info'>{{ count }}</span> expérience(s) à votre actif !" }));
                    $("#experiments-list-title").text(i18next.t("profile.exp.listTitle", { defaultValue: "Liste des expériences" }));
                }
            });
        }
    }
}