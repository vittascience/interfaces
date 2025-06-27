function openContactUser() {
    $('#profil_contact').fadeIn('fast');
}

function closeContactUser() {
    $('#profil_contact').fadeOut('fast');
}

function showAlert(type, msg) {
    let div = document.createElement('div');
    if ($('.alert').length !== 0) {
        $('.alert').fadeOut('fast', function () {
            $(this).remove();
            $(div).addClass('alert');
            if (type === 'success') {
                $(div).addClass('alert-success');
            } else {
                $(div).addClass('alert-danger');
            }
            $(div).html(msg);
            $('#msg-profil').append(div);
        });
    } else {
        $(div).addClass('alert');
        if (type === 'success') {
            $(div).addClass('alert-success');
        } else {
            $(div).addClass('alert-danger');
        }
        $(div).html(msg);
        $('#msg-profil').append(div);
    }
    enableButton(document.getElementById('contact-send-profil'));
}

$('#contact-send-profil').on('click', function (e) {
    if ($('#za78e-username-profil').val() == '') {
        $('#za78e-username-profil').val($('#homepage').val())
    }

    let honeyNumber = $('#za78e-number-profil').val();
    let honeyUsername = $('#za78e-username-profil').val();

    if (honeyNumber.length > 0 || honeyUsername.length != 13) {
        Modal.closeLatestModal();
        throw "Lorem Ipsum";
    }

    e.preventDefault();
    disableButton(this);
    let formData = new FormData(document.getElementById('contact-form'));
    formData.append('id', $(this).data('userid'));
    formData.append('za78e', $('#za78e-username-profil').val());
    let request = getAjaxRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let resp = JSON.parse(request.responseText);
                if (resp.success)
                    showAlert('success', 'La personne a été contactée avec succès.');
                else {
                    $('#za78e-username-profil').val(request['za78e-number'])
                    let html = "";
                    for (let i = 0; i < resp.errors.length; i++) {
                        html += '<li>' + resp.errors[i] + '</li>';
                    }
                    showAlert('danger', 'Erreur(s) :<br><ul>' + html + '</ul>');
                }
            } else {
                $('#za78e-username-profil').val(request['za78e-number'])
                showAlert('danger', 'Une erreur s\'est produite. Merci de réessayer dans un instant.');
            }
        }
    }
    request.open("POST", "/services/post/postContactUser.php");
    request.send(formData);
})