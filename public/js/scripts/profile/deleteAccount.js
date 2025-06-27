async function deleteAccount() {
    const form = document.getElementById('deleteAccountForm');
    const formData = new FormData(form);
    try {
        let response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let data = await response.json();
            if (data.success) {
                // Fermer la première modale après 3,5 secondes
                setTimeout(() => {
                    let closeModalBtn = document.getElementById('close-modal-deletion');
                    closeModalBtn.click();
                    // Afficher la deuxième modale
                    const emailConfirmationModal = new bootstrap.Modal(document.getElementById('emailConfirmationModal'));
                    emailConfirmationModal.show();
                }, 1500);
            }
        }
    } catch (error) {
        console.error('Erreur: ' + error.message);
    }
}
    
const confirmationInput = document.getElementById('confirmationInput');
const confirmDeletionButton = document.getElementById('confirmDeletionButton');

confirmationInput.addEventListener('input', () => {
    let deleteWord = i18next.t('profile.user.form.deletion.delete');
    if (!confirmationInput.value) {
        return
    }
    if (confirmationInput.value.toLowerCase() == deleteWord.toLowerCase()) {
        confirmDeletionButton.disabled = false;
    } else {
        confirmDeletionButton.disabled = true;
    }
});


async function resendEmail() {
    const responseDiv = document.getElementById('confirmation-mail-resent');
    const form = document.getElementById('deleteAccountForm');
    const formData = new FormData(form);

    let req = await fetch(form.action, {
        method: 'POST',
        body: formData
    });
    const data = await req.json();

    if (data.success) {
        responseDiv.className = 'alert alert-success';
        responseDiv.textContent = data.message;
        responseDiv.style.display = 'block';
    } else {
        responseDiv.className = 'alert alert-danger';
        responseDiv.textContent = data.message;
        responseDiv.style.display = 'block';
    }

    setTimeout(() => {
        responseDiv.style.display = 'none';
    }, 3500);
}