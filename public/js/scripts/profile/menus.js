$("#my-profile-button").click(function () {
    replaceParam("tab", "settings");
    displayPart(1);
});

$("#my-experiments-button").click(function () {
    replaceParam("tab", "experiments");
    displayPart(4);
});

$("#my-resources-button").click(function () {
    replaceParam("tab", "resources");
    displayPart(5);
});

$("#my-projects-button").click(function () {
    replaceParam("tab", "projects");
    displayPart(6);
});

$("#my-address-button").click(function () {
    replaceParam("tab", "address");
    displayPart(7);
});

$("#my-orders-button").click(function () {
    replaceParam("tab", "orders");
    displayPart(8);
});

$("#my-wishlist-button").click(function () {
    replaceParam("tab", "wishlist");
    displayPart(9);
});
$("#premium-button").click(function () {
    replaceParam("tab", "premium");
    displayPart(10);
});

displayPart(1)

function displayPart(index) {
    var parts = document.getElementsByClassName("profile-part");
    for (var i = 0; i < parts.length; i++) {
        if (parseInt(parts[i].getAttribute("index")) !== index) {
            if ($(parts[i]).is(":visible")) {
                $(parts[i]).fadeOut("fast", function () {
                    for (var i = 0; i < parts.length; i++) {
                        if (parseInt(parts[i].getAttribute("index")) === index) {
                            $(parts[i]).fadeIn("slow");
                        }
                    }
                });
            }
        }
    }
}

$(".btnProfileOrderDetails").on("click", function () {
    if (!$(this).parent().next("div").hasClass("showDetails")) {
        $(this).parent().next("div").addClass("showDetails")
        $(this).html("Masquer détails")
    } else {
        $(this).parent().next("div").removeClass("showDetails")
        $(this).html("Voir détails")
    }
})

$("#showFormAddAddress").on("click", function () {
    $(this).hide();
    $("#formAddAddress").slideDown();
})

$("#btnCancelAddAddress").on("click", function () {
    $("#showFormAddAddress").show();
    $("#formAddAddress").hide();
})

$(".editProfileAddress").on("click", function () {
    $(this).parent().parent().next(".formEditAddress").toggle();
})

$(".delProfileAddress").on("click", function () {
    let reponse = window.confirm("Etes-vous sûr de vouloir supprimer cette adresse ?");
    let id = $(this).attr("data-idAddress");
    if (reponse) {
        $.ajax({
            type: "POST",
            url: "/services/post/postProfile.php",
            data: "action=deleteAddressProfile&idAddress=" + id,
            success: function (data, text, xml) {
                document.location.reload();
            }
        });
    }
})

$(".btn-del-profileWl").on("click", function () {
    let iduser = $(this).attr("data-iduser");
    let idproduct = $(this).attr("data-idproduct");
    let reponse = window.confirm("Etes-vous sûr de vouloir supprimer cet article ?");
    if (reponse) {
        $.ajax({
            type: "POST",
            url: "/services/post/postProfile.php",
            data: "delFromWl=yes&idUser=" + iduser + "&idProduct=" + idproduct,
            success: function (data, text, xml) {
                document.location.reload();
            }
        });
    }
})

$(document).on("click", ".tile-picker input", function (e) {
    if ($(this).is(":checked")) {
        $(this).closest(".tile-picker").addClass("active");
    } else {
        $(this).closest(".tile-picker").removeClass("active");
    }
});
$(document).on("click", "#save-image-profil", function () {
    if (document.getElementById("profile-picture-file-input").files[0] == undefined) {
        let iconName = $("input[type='radio'][name='icon-picker']:checked").val();
        let picturePath = "";
        if (iconName.length == 1) {
            picturePath = "alphabet/" + iconName;
        } else {
            picturePath = "users-icons/" + iconName;
        }
        $.ajax({
            type: "POST",
            url: "/services/post/postProfile.php",
            data: "action=editPictureProfile&picture=" + picturePath,
            success: function (data, text, xml) {
                document.location.reload();
            }
        });
    } else {
        modifyProfile();
    }
});
