function dateAsText(date = '') {
    return "<span data-i18n='[html]code.popups.openProject.categories.projectsList.modify'> Modifié le </span>" + new Date(date).toLocaleDateString(getCookie('lng'), {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateRandomString(length = 10) {
    let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(getRandomInt(characters.length - 1));
    }
    return randomString;
}