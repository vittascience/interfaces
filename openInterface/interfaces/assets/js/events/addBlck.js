function sendAddBlock() {
    if ($('#za78e-username-block').val() == '') {
        $('#za78e-username-block').val($('#homepage').val())
    }
    let name = $('#addblock-name');
    let mail = $('#addblock-mail');
    let idea = $('#addblock-idea');
    let za78e = $('#za78e-username-block');

    let honeyNumber = $('#za78e-number-block').val();
    let honeyUsername = $('#za78e-username-block').val();

    if (honeyNumber.length > 0 || honeyUsername.length != 13) {
        pseudoModal.closeLatestModal();
        throw "Lorem ipsum";
    }

    let errors = [];

    if ($(name).val().length === 0 || $(name).val().length > 100) {
        errors.push("Votre nom doit faire entre 1 et 100 caractères.");
    }
    if ($(mail).val().length === 0) {
        errors.push("Votre adresse mail est invalide.");
    }
    if ($(idea).val().length < 10 || $(idea).val().length > 3000) {
        errors.push("Votre idée doit faire entre 10 et 3000 caractères");
    }
    if (errors.length !== 0) {
        if ($('#addblock-error').is(':visible'))
            $('#addblock-error').hide();
        let errors_html = "";
        errors.forEach(element => {
            errors_html += "<li>" + element + "</li>"
        });
        $('.addblock-errors-list').html(errors_html);
        $('#addblock-error').fadeIn('fast');
    } else {
        let formData = new FormData();
        formData.append('name', $(name).val());
        formData.append('mail', $(mail).val());
        formData.append('idea', $(idea).val());
        formData.append('za78e', $(za78e).val());
        let interface = window.location.href.replace(/.+(arduino|microbit|GalaxiaCircuitPython|python|adacraft|wb55|l476|esp32|TI-83|galaxia|raspberrypi|niryo|nao|mBot|buddy|cyberpi|eliobot|letsstartcoding|pico|winky|sphero|lotibot|bluebot|spike|photon).+/, '$1')
        formData.append('interface', interface);
        let request = getAjaxRequest();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    let resp = JSON.parse(request.responseText);
                    if (resp.success === true) {
                        document.querySelector('#add-block-form-response').innerHTML = 
                            '<div id="addblock-success" class="alert alert-success" role="alert">' +
                            '<b>Succès !</b> Votre message a bien été envoyé. On revient vers vous rapidement ! :)' +
                            '</div>';

                        setTimeout(() => {
                            resetModal();
                        }, 3000);
                    } else {
                        if ($('#addblock-error').is(':visible')) {
                            $('#addblock-error').hide();
                        }
                        $('.addblock-errors-list').html("<li>Veuillez vérifier votre formulaire.</li>");
                        $('#addblock-error').fadeIn('fast');
                    }
                } else {
                    $('#za78e-username-block').val(request['za78e-number'])
                    console.error("Request error : " + request.status);
                    if ($('#addblock-error').is(':visible'))
                        $('#addblock-error').hide();
                    $('.addblock-errors-list').html("<li>Erreur serveur. Merci de réessayer dans un instant</li>");
                    $('#addblock-error').fadeIn('fast');
                }
            }
        }
        request.open("POST", "/services/post/postAddBlock.php");
        request.send(formData);
    }
}

function resetModal() {
    $('#addblock-name').val('');
    $('#addblock-mail').val('');
    $('#addblock-idea').val('');

    if ($('#addblock-error').is(':visible'))
        $('#addblock-error').hide();
    if ($('#addblock-success').is(':visible'))
        $('#addblock-success').hide();

    $('.addblock-errors-list').html('');

    $('#addblock-submit').prop('disabled', false);

    pseudoModal.closeLatestModal();

    document.querySelector('#add-block-form-response').innerHTML = '';

    $('#za78e-username-block').val('');
    $('#za78e-number-block').val('');
}