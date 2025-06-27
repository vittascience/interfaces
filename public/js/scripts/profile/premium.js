document.addEventListener('DOMContentLoaded', async function () {
    const cancelBtn = document.getElementById('cancel-premium-btn');
    const cancelGiftedsBtn = document.querySelectorAll('.cancel-gifted-premium-btn');
    const subscribeBtn = document.getElementById('subscribe-btn');
    const reactivateBtn = document.getElementById('reactivate-premium-btn');
    const reactivateGiftedsBtn = document.querySelectorAll('.reactivate-gifted-premium-btn');
    const estimateBtn = document.getElementById('estimate-btn');
    const giftBtn = document.getElementById('gift-btn');
    const subscribeModal = document.getElementById('premium-modal');
    const btnOpenModal = document.querySelectorAll('.btn-subscribe-open-modal');
    const btnShowPremiumOffers = document.getElementById('premium-offers-btn');

    if (btnShowPremiumOffers) {
        btnShowPremiumOffers.addEventListener('click', function () {
            const premiumOffersDiv = document.getElementById('premium-offers-div');
            if (premiumOffersDiv) {
                if (premiumOffersDiv.classList.contains('d-none')) {
                    premiumOffersDiv.classList.remove('d-none');
                    premiumOffersDiv.classList.add('d-flex');
                    this.innerText = "Masquer les offres";
                } else {
                    premiumOffersDiv.classList.add('d-none');
                    premiumOffersDiv.classList.remove('d-flex');
                    this.innerText = "Découvrir les offres";
                }
            }
        });
    }


    if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
            window.location.href = `/shop/premium/editSubscription.php?type=cancel`;
        });
    }
    if (cancelGiftedsBtn) {
        cancelGiftedsBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const id = this.getAttribute('data-subid');
                window.location.href = `/shop/premium/editSubscription.php?type=cancel&subId=${id}`;
            });
        });
    }
    if (reactivateBtn) {
        reactivateBtn.addEventListener('click', function () {
            window.location.href = `/shop/premium/editSubscription.php?type=reactivate`;
        });
    }
    if (reactivateGiftedsBtn) {
        reactivateGiftedsBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const id = this.getAttribute('data-subid');
                window.location.href = `/shop/premium/editSubscription.php?type=reactivate&subId=${id}`;
            });
        });
    }
    if (btnOpenModal) {
        btnOpenModal.forEach(function (btn) {
            btn.addEventListener('click', function () {
                //set the value of the radio button to "prof"
                const dataType = this.getAttribute("data-type");
                if (dataType === "prof") {
                    subscribeModal.querySelector('#premium-type').innerText = "Professeur";
                    if (subscribeBtn && subscribeBtn.classList.contains('d-none')) {
                        subscribeBtn.classList.remove('d-none');
                        subscribeBtn.nextElementSibling.classList.remove('d-none');
                    }
                } else {
                    subscribeModal.querySelector('#premium-type').innerText = "Etablissement";
                    if (subscribeBtn && !subscribeBtn.classList.contains('d-none')) {
                        subscribeBtn.classList.add('d-none');
                        subscribeBtn.nextElementSibling.classList.add('d-none');
                    }
                }
                let refData = "";
                if (dataType === "school") {
                    let teacherNumber = document.querySelector('input[name="teacher-number"][id="teacher-number"]').value;
                    if (teacherNumber == 1) {
                        alert("Veuillez choisir plus d'un professeur pour cette formule.");
                        return;
                    }
                    if (teacherNumber <= 5) {
                        refData = "1";
                    } else if (teacherNumber <= 20) {
                        refData = "2";
                    } else if (teacherNumber <= 50) {
                        refData = "3";
                    } else if (teacherNumber <= 200) {
                        refData = "4";
                    } else {
                        alert("Pour plus de 200 professeurs, veuillez nous contacter à l'adresse mail : contact@vittascience.com.");
                        return;
                    }
                }
                const ref = getPremiumRef(dataType + refData);
                //get the input with name subscription and value month
                subscribeModal.querySelector('input[name="subscription"][id="month"]').value = ref + "M";
                subscribeModal.querySelector('input[name="subscription"][id="year"]').value = ref + "Y";
                subscribeModal.querySelector('input[name="subscription"][id="tri-year"]').value = ref + "T";

                //get the input with name email-subscription 
                subscribeModal.querySelectorAll('input[name="email-subscription"]').forEach(function (input) {
                    input.addEventListener('change', function () {
                        //get the value of the checked radio button
                        const subscriptionValue = subscribeModal.querySelector('input[name="email-subscription"]:checked').value;
                        console.log(subscriptionValue);
                        if (subscriptionValue == "other") {
                            if (subscribeModal.querySelector('#other-email-subscription-div').classList.contains('d-none')) {
                                subscribeModal.querySelector('#other-email-subscription-div').classList.remove('d-none');
                            }
                        } else {
                            if (!subscribeModal.querySelector('#other-email-subscription-div').classList.contains('d-none')) {
                                subscribeModal.querySelector('#other-email-subscription-div').classList.add('d-none');
                            }
                        }
                    });
                });
                //gar-connect
                subscribeModal.querySelector('input[name="gar-connect"]').addEventListener('change', function () {
                    if (this.checked) {
                        if (subscribeModal.querySelector('#gar-connect-div').classList.contains('d-none')) {
                            subscribeModal.querySelector('#gar-connect-div').classList.remove('d-none');
                        }
                    } else {
                        if (!subscribeModal.querySelector('#gar-connect-div').classList.contains('d-none')) {
                            subscribeModal.querySelector('#gar-connect-div').classList.add('d-none');
                        }
                    }
                });
                subscribeModal.querySelectorAll('input[name="subscription"]').forEach(function (input) {
                    input.addEventListener('change', function () {
                        console.log(input);
                        if (input.id == "month") {
                            //hide the GAR div
                            if (!subscribeModal.querySelector('#gar-connect-div').classList.contains('d-none')) {
                                subscribeModal.querySelector('#gar-connect-div').classList.add('d-none');
                            }
                            subscribeModal.querySelector('input[name="code-uai"]').value = "";
                            subscribeModal.querySelector('input[name="gar-connect"]').checked = false;
                            subscribeModal.querySelector('input[name="gar-connect"]').disabled = true;
                        } else {
                            subscribeModal.querySelector('input[name="gar-connect"]').disabled = false;
                        }
                    });
                });

            });
        });
    }
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function () {
            //get the value of the checked "subscription" radio button
            const subscriptionValue = subscribeModal.querySelector('input[name="subscription"]:checked').value;
            const adressId = subscribeModal.querySelector('input[name="address"]:checked').value;
            let subscribeEmail = subscribeModal.querySelector('input[name="email-subscription"]:checked').value;
            let teacherNumber = 1;
            const garConnect = subscribeModal.querySelector('input[name="gar-connect"]').checked;
            let garCode = null;
            if (garConnect) {
                garCode = subscribeModal.querySelector('input[name="code-uai"]').value;
            }
            if (subscribeEmail == "other") {
                subscribeEmail = subscribeModal.querySelector('#subscription-other-email').value;
            }
            if (subscriptionValue.includes("3760327670207S")) {
                teacherNumber = subscribeModal.querySelector('input[name="teacher-number"]').value;
            }
            //redirect to php file
            const url = "/shop/premium/checkout-stripe.php?subscription=" + subscriptionValue + "&addressId=" + adressId + "&subscribeEmail=" + subscribeEmail + "&teacherNumber=" + teacherNumber + "&garCode=" + garCode;
            /* if (teacherNumber > 1) {
                url += "&teacherNumber=" + teacherNumber;
            }
            if (garConnect) {
                url += "&garCode=" + garCode;
            } */
            window.location.href = url;
        });
    }
    if (estimateBtn) {
        estimateBtn.addEventListener('click', function () {
            //get the value of the checked "subscription" radio button
            const subscriptionValue = subscribeModal.querySelector('input[name="subscription"]:checked').value;
            //check if a cookie with the name "profilePremiumEstimate" exists and if its value is the same as the subscriptionValue
            const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('profilePremiumEstimate='));
            if (cookie) {
                const cookieValue = cookie.split('=')[1];
                if (cookieValue === subscriptionValue) {
                    const divResult = document.createElement('div');
                    divResult.innerText = `Un devis a déjà été créé pour cette formule. Vous le retrouverez sur la partie devis de votre compte.`;
                    divResult.classList.add('alert', 'alert-warning');
                    subscribeModal.querySelector('.modal-body').appendChild(divResult);
                    return;
                }
            }
            const adressId = subscribeModal.querySelector('input[name="address"]:checked').value;
            let teacherNumber = 1;
            if (subscriptionValue.includes("3760327670207S")) {
                teacherNumber = subscribeModal.querySelector('input[name="teacher-number"]').value;
            }
            //rfetch the estimate.php file
            const formData = new FormData();
            formData.append('subscription', subscriptionValue);
            formData.append('addressId', adressId);
            formData.append('teacherNumber', teacherNumber);

            fetch('/shop/pennylane/estimate.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    //desactivate the estimate button
                    estimateBtn.disabled = true;
                    //create a cookie with the name "profilePremiumEstimate" with a 24h expiration date
                    document.cookie = `profilePremiumEstimate=${subscriptionValue}; expires=${new Date(Date.now() + 86400e3).toUTCString()}; path=/`;

                    if (data.success === true) {
                        const divResult = document.createElement('div');
                        divResult.innerText = `Votre devis a été créé avec succès. Vous le retrouverez sur la partie devis de votre compte ainsi que par e-mail.`;
                        divResult.classList.add('alert', 'alert-success');
                        subscribeModal.querySelector('.modal-body').appendChild(divResult);
                    } else {
                        const divResult = document.createElement('div');
                        divResult.innerText = `Une erreur est survenue lors de la création de votre devis. Veuillez réessayer.`;
                        divResult.classList.add('alert', 'alert-danger');
                        subscribeModal.querySelector('.modal-body').appendChild(divResult);
                    }
                });
        });
    }
    const toastDiv = document.getElementById('liveToast');
    if (toastDiv) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastDiv)
        //check if is set tab=premium in the url and if is set payment=success
        if (window.location.search.includes('tab=premium') && (window.location.search.includes('payment=success') || window.location.search.includes('payment=reactivate'))) {
            toastDiv.querySelector('.toast-body').innerText = 'Votre abonnement a été activé avec succès. Vous pouvez dès à présent profiter de vos avantages.';
            toastBootstrap.show();
            //remove the payment=success from the url
            window.history.replaceState({}, document.title, window.location.pathname + "?tab=premium");
        }
        if (window.location.search.includes('tab=premium') && window.location.search.includes('payment=failed')) {
            toastDiv.querySelector('.toast-body').innerText = 'Une erreur est survenue lors de la création de votre abonnement. Veuillez réessayer.';
            toastBootstrap.show();
            //remove the payment=success from the url
            window.history.replaceState({}, document.title, window.location.pathname + "?tab=premium");
        }
        if (window.location.search.includes('tab=premium') && window.location.search.includes('payment=cancel')) {
            toastDiv.querySelector('.toast-body').innerText = 'Votre abonnement a été résilié avec succès. Vous bé,éficier de vos avantages jusqu\'à la fin de la période en cours.';
            toastBootstrap.show();
            //remove the payment=success from the url
            window.history.replaceState({}, document.title, window.location.pathname + "?tab=premium");
        }
    }

});

function getPremiumRef(type) {
    let ref;
    switch (type) {
        case "prof":
            ref = "3760327670207";
            break;
        case "school1":
            ref = "3760327670207S5";
            break;
        case "school2":
            ref = "3760327670207S20";
            break;
        case "school3":
            ref = "3760327670207S50";
            break;
        case "school4":
            ref = "3760327670207S200";
            break;
        default:
            ref = "3760327670207";
            break;
    }
    return ref;
}