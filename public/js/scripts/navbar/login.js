let loginDiv = null,
    loginModal = null;

function displayLogin() {
    if (mobileDetect != null) {
        window.location = ("/login");
    } else {
        // Display the modal
        if (loginModal == null) {
            loginModal = new bootstrap.Modal(loginDiv, {}).show();
            loginDiv.addEventListener('shown.bs.modal', () => {
                // focus the first input element in #nav-login-form
                document.getElementById("nav-login-form").querySelector("input").focus();
            })
        } else {
            loginModal.show();
        }
    }
}

/**
 * Close the login modal
 */
function closeLogin() {
    loginModal.hide();
}

/**
 * Check the login form and send the request to the server
 * @param {boolean} fromLoginPage 
 */
function checkNavLogin(fromLoginPage = false) {

    if ($('#za78e-username-nav').val() == '') {
        $('#za78e-username-nav').val($('#homepage').val())
    }
    let honeyNumber = $('#za78e-number-nav').val();
    let honeyUsername = $('#za78e-username-nav').val();

    if (honeyNumber.length > 0 || honeyUsername.length != 13) {
        Modal.closeLatestModal();
        throw "Lorem Ipsum";
    }

    const button = document.getElementById("nav-login-button");
    disableButton(button);

    let formData = null;

    if (fromLoginPage) {
        formData = new FormData(document.getElementById("login-form"));
    } else {
        formData = new FormData(document.getElementById("nav-login-form"));
    }

    formData.append("za78e-username-nav", honeyUsername)
    let request = getAjaxRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                const infoBox = returnContextualInfoBoxNav(fromLoginPage);
                if (response.success === true) {
                    infoBox.className = "alert alert-success";
                    infoBox.innerHTML = i18next.t('login_popup.success');
                    $("#nav-login-info-box").fadeIn("slow", function () {
                        setTimeout(function () {
                            if($_GET('embeded')) {
                                console.log('login-campus-numeria');
                                parent.postMessage('logged-in-campus-numeria', '*');
                                return;
                            };
                            let interfaces = ['/arduino/', '/microbit/', '/python/', 'wb55', '/esp32/', '/TI-83/']
                            if (interfaces.includes(window.location.pathname)) {
                                document.location.reload();
                                document.location = window.location.href;
                            } else {
                                document.location.reload();
                            }
                        });
                    });
                } else {
                    enableButton(button);
                    // handle differents errors
                    if (typeof response.canNotLoginBefore != 'undefined') {
                        const diffInMinutes = (response.canNotLoginBefore - (new Date().getTime() / 1000)) / 60
                        const timeToWait = Math.ceil(diffInMinutes)
                        return setUpInfoDivNav("danger", "login_popup.canNotLoginBefore", { failedLoginAttempts: response.failedLoginAttempts, timeToWait: timeToWait }, "navbarLoginFailedWrongCredentials", fromLoginPage);
                    }
                    if (response.error === "badInput") {
                        return setUpInfoDivNav("danger", "login_popup.badInput", false, "navbarLoginFailedBadInput", fromLoginPage);
                    } else if (response.error === "wrong_credentials") {
                        return setUpInfoDivNav("danger", "login_popup.error", false, "navbarLoginFailedWrongCredentials", fromLoginPage);
                    } else if (response.error === "user_not_found") {
                        return setUpInfoDivNav("danger", "login_popup.userNotFound", false, "navbarLoginFailedNoUserFound", fromLoginPage);
                    } else if (response.error === "user_not_active") {
                        let opt = null;
                        let linkWorkd = i18next.t("kits.catalogue.link");
                        if (fromLoginPage) {
                            opt = {"link": `<span class='font-weight-bold text-decoration-underline pe-auto' style='cursor: pointer;' onclick='sendActivationMailNav(true)'>${linkWorkd}</span>`};
                        } else {
                            opt = {"link": `<span class='font-weight-bold text-decoration-underline pe-auto' style='cursor: pointer;' onclick='sendActivationMailNav()'>${linkWorkd}</span>`};
                        }
                        setUpInfoDivNav("danger", "login_popup.inactiveAccount", opt, "loginFailedUserNotActive", fromLoginPage);
                        //$('#btn-activate-account-nav').show();
                        return
                    } else if (response.error === "totp_code_required") {
                        clearDivErrorNav(fromLoginPage);
                        showTotpState(fromLoginPage);
                        return;
                    } else if (response.error === "wrong_totp_code") {
                        return setUpInfoDivNav("danger", "login_popup.wrongTotpCode", false, "navbarLoginFailedWrongTotpCode", fromLoginPage);
                    }
                }
            } else {
                $('#za78e-username-nav').val(request['za78e-number-nav'])
                enableButton(button);
                //console.log("Request failed: " + request.status);
            }
        }
    };
    request.open("POST", "/routing/Routing.php?controller=user&action=login");
    request.send(formData);
}

/**
 * Show the TOTP state according to the page
 * @param {boolean} fromLoginPage 
 */
function showTotpState(fromLoginPage = false) {
    if (fromLoginPage) {
        document.getElementById("login-main-div-login-page").classList.add("d-none");
        document.getElementById("login-totp-div-login-page").classList.remove("d-none");
    } else {
        document.getElementById("login-main-div").classList.add("d-none");
        document.getElementById("login-totp-div").classList.remove("d-none");
        document.getElementById("login-title-details").classList.add("d-none");
    }
}

/**
 * @param {boolean} fromLoginPage
 */
function clearDivErrorNav(fromLoginPage = false) {
    let infoBox = returnContextualInfoBoxNav(fromLoginPage);
    infoBox.innerHTML = "";
    infoBox.className = "";
}

/**
 * Send a new activation mail to the user
 * @param {boolean} ifFromLoginPage 
 */
function sendActivationMailNav(ifFromLoginPage = false) {
    let mail = $('#login-mail-input-nav').val();
    // Disable the button for 45s 
    $('#btn-activate-account-nav').attr("disabled", true);
    setTimeout(() => {
        $('#btn-activate-account-nav').attr("disabled", false);
    }, 45000);
    $.ajax({
        type: "POST",
        url: "/services/post/postNewValidationMail.php",
        data: {
            email: mail,
        },
        success: function () {
            setUpInfoDivNav("success", "login_popup.mailSuccess", false, false, ifFromLoginPage);
        },
        error: function () {
            setUpInfoDivNav("danger", "login_popup.mailError", false, false, ifFromLoginPage);
        }
    });
}

/**
 * Return the contextual info box for the login page
 * @param {boolean} fromLoginPage 
 * @returns {HTMLElement} The contextual info box
 */
function returnContextualInfoBoxNav(fromLoginPage = false) {
    if (fromLoginPage) {
        return document.getElementById("info-div-login-page");
    } else {
        return document.getElementById("nav-login-info-box");
    }
}

/**
 * @param {string} type 
 * @param {string} messageID 
 * @param {?object} options 
 * @param {?string} dataTestId 
 * @param {boolean} fromLoginPage 
 */
function setUpInfoDivNav(type, messageID, options = false, dataTestId = null, fromLoginPage = false) {
    let infoBox = returnContextualInfoBoxNav(fromLoginPage);
    // Create the info box and the message with the right class
    infoBox.className = "alert alert-" + type;
    if (dataTestId) infoBox.setAttribute('data-testid', dataTestId)

    const messageText = options ? i18next.t(messageID, options) : i18next.t(messageID);
    infoBox.innerHTML = decodeHtml(messageText);
}

/**
 * @param {HTMLElement} button 
 * @returns {string}
 */
function decodeHtml(stringEncoded) {
    const txt = document.createElement("textarea");
    txt.innerHTML = stringEncoded;
    return txt.value;
}

function toggleLoginPassword() {
    const loginInput = document.getElementById("login-pwd-input-nav");
    const toggler = document.getElementById("login-pwd-toggler-icon");

    if (loginInput.getAttribute("type") == "password") {
        toggler.classList.remove("fa-eye");
        toggler.classList.add("fa-eye-slash");
        loginInput.setAttribute("type", "text");
    } else {
        toggler.classList.remove("fa-eye-slash");
        toggler.classList.add("fa-eye");
        loginInput.setAttribute("type", "password");
    }
}

// setup listeners on the login form submit  on dom load
document.addEventListener('DOMContentLoaded', function () {
    loginDiv = document.getElementById("nav-login-div");
    const loginForm = document.getElementById("nav-login-form");

    if (loginDiv != null) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            checkNavLogin();
        });
    }
});