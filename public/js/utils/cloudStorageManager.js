

function getAsset(asset, target) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: `/routing/Routing.php?controller=cloud&action=get&name=${asset}&target=${target}`,
            datatype: "json",
            success: function (response) {
                resolve(response);
            },
            error: function () {
                reject();
            }
        })
    })
}

function deleteAsset(asset, target) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "DELETE",
            url: `/routing/Routing.php?controller=cloud&action=delete&name=${asset}&target=${target}`,
            success: function (response) {
                resolve(response);
            },
            error: function () {
                reject();
            }
        })
    })
}

function updateAsset(asset, target, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "PUT",
            url: `/routing/Routing.php?controller=cloud&action=update&name=${asset}&target=${target}`,
            data: data,
            success: function (response) {
                resolve(response);
            },
            error: function () {
                reject();
            }
        })
    })
}

function putAsset(asset, target, data, isPublic = true) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "PUT",
            url: `/routing/Routing.php?controller=cloud&action=put&name=${asset}&target=${target}&isPublic=${isPublic}`,
            data: data,
            success: function (response) {
                resolve(response);
            },
            error: function () {
                reject();
            }
        })
    })
}

/**
 * Custom functions for IA interface
 */
async function putMetaForAI(key, name, data, isPublic = true) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "PUT",
            url: `/routing/Routing.php?controller=cloud&action=ai-put-meta&key=${key}&isPublic=${isPublic}&name=${name}`,
            success: async function (response) {
                response = JSON.parse(response);
                if (response.success) {
                    let res = await sendMetaToUrl(response.metaUrl.url, data, response.metaUrl.key)
                    resolve(res);
                } else {
                    console.error(response.error);
                    reject();
                }
            },
            error: function () {
                reject();
            }
        })
    })
}



async function sendMetaToUrl(url, data, name) {

    let response = await fetch(url, {
        method: "PUT",
        body: data,
        headers: {
            "Accept": "*/*",
            "Content-Type": "text/json",
        }
    })

    if (response.status !== 200 && response.status === 409) {
        return sendMetaToUrl(url, data, name)
    } else {
        return {
            "success": true,
            "name": name,
        }
    }
}

function getAIAssets(key) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: `/routing/Routing.php?controller=cloud&action=ai-get&key=${key}`,
            datatype: "json",
            success: function (response) {
                const files64 = JSON.parse(response);
                const finalFiles = [];
                for (let file in files64.files) {
                    fetch(files64.files[file]).then(res => res.blob()).then(blob => {
                        finalFiles.push(new File([blob], file, { type: blob.type }))
                    })
                }
                resolve(finalFiles);
            },
            error: function () {
                reject();
            }
        })
    })
}

function deleteAIAssets(key) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "DELETE",
            url: `/routing/Routing.php?controller=cloud&action=ai-delete&key=${key}`,
            datatype: "json",
            success: function (response) {
                resolve(response);
            },
            error: function () {
                reject();
            }
        })
    })
}

async function putImgsForAI(data) {
    let arrayImages = [];
    for (let i = 0; i < data.data.images.length; i++) {
        let updateWithoutContent = data.data.images[i].content == false ? true : false;
        arrayImages.push({
            id: data.data.images[i].id,
            update: updateWithoutContent
        })
    }

    let imagesContent = data.data.images.map((image) => {
        return image.content
    })

    let dataToSend = {
        data: {
            key: data.data.key,
            images: {
                ...arrayImages,
            },
        }
    }

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: `/routing/Routing.php?controller=cloud&action=ai-upload-imgs`,
            data: dataToSend,
            success: function (response) {
                response = JSON.parse(response);
                if (response.success) {
                    resolve(sendContentToUrl(response, imagesContent));
                } else {
                    console.error(response.error);
                    reject();
                }
            },
            error: function () {
                reject();
            }
        });
    });
}
// send content to scaleway url
async function sendContentToUrl(url, content, sound = false) {
    try {
        const urls = url.urls;
        const contentUrlTupple = [];
        for (let i = 0; i < urls.length; i++) {

            if (content[i] == false) {
                continue;
            }

            contentUrlTupple.push({
                url: urls[i].url,
                content: content[i]
            })
        }

        let resultats = [];
        // divide by 8 because we can only send 8 requests at the same time
        const nbOfRequest = Math.ceil(contentUrlTupple.length / 25);
        // do the requests separately by 1s with a timeout
        for (let i = 0; i < nbOfRequest; i++) {
            let start = i * 25;
            let end = start + 25;
            let contentUrlTupplePart = contentUrlTupple.slice(start, end);

            const resultatsPart = await Promise.all(contentUrlTupplePart.map(url => fetchDonnees(url.url, url.content, sound)));
            resultats = [...resultats, ...resultatsPart];
        }

        // Vérifie que toutes les requêtes ont réussi avec le code 200
        for (const resultat of resultats) {
            if (resultat.code !== 200) {
                throw new Error(`Erreur lors de l'envoi des données : ${resultat.code}`);
            }
        }

        return JSON.stringify({ success: true, key: url.key });
    } catch (erreur) {
        console.log(erreur);
        return JSON.stringify({ success: false, error: erreur });
    }
}

async function fetchDonnees(url, data, sound = false) {
    if (data == false) {
        return { code: 200 };
    }
    let base64Response,
        blob;


    if (!sound) {
        base64Response = await fetch(`${data}`);
        blob = await base64Response.blob();
    } else {
        blob = data;
    }

    let succes = false,
        response,
        errorCount = 0;


    while (!succes && errorCount < 6) {
        succes = true;
        let random = Math.floor(Math.random() * 750) + 250;
        await delay(random);
        response = await fetch(url, {
            method: "PUT",
            body: blob,
            headers: sound ? returnHeadersSound() : returnHeaders()
        }).catch((e) => {
            errorCount++;
            succes = false;
        });
    }
    return { code: response.status };
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function returnHeaders() {
    return {
        "Accept": "*/*",
        "Content-Type": "image/png",
    }
}

function returnHeadersSound() {
    return {
        "Accept": "*/*",
        "Content-Type": "application/json",
    }
}

function getImgsForAI(key) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: `/routing/Routing.php?controller=cloud&action=ai-get-imgs`,
            data: { key: key },
            success: function (response) {
                resolve(response);
            },
            error: function () {
                reject();
            }
        });
    });
}

function putSoundsForAI(data) {
    let arraySounds = [];

    for (let i = 0; i < data.data.sounds.length; i++) {
        let updateWithoutContent = data.data.sounds[i].content == false ? true : false;
        arraySounds.push({
            id: data.data.sounds[i].id,
            update: updateWithoutContent
        })
    }

    let soundsContent = data.data.sounds.map((sound) => {
        return sound.content
    })

    let dataToSend = {
        data: {
            key: data.data.key,
            sounds: {
                ...arraySounds,
            },
        }
    }

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: `/routing/Routing.php?controller=cloud&action=ai-upload-sounds`,
            data: dataToSend,
            success: function (response) {
                response = JSON.parse(response);
                if (response.success) {
                    resolve(sendContentToUrl(response, soundsContent, true));
                } else {
                    console.error(response.error);
                    reject();
                }
            },
            error: function () {
                reject();
            }
        });
    });
}

function getSoundsForAI(key) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: `/routing/Routing.php?controller=cloud&action=ai-get-sounds`,
            data: { key: key },
            success: function (response) {
                resolve(response);
            },
            error: function () {
                reject();
            }
        });
    });
}


function putRecordsForAI(data) {
    // return new Promise(function (resolve, reject) {
    //     to do
    // });
}

function deleteAssets(keys) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: `/routing/Routing.php?controller=cloud&action=delete-assets`,
            data: { keys: keys },
            success: function (response) {
                resolve(response);
            },
            error: function () {
                reject();
            }
        });
    });
}

async function putAI(modelData) {

    let getUrls = await fetch(`${location.origin}/routing/Routing.php?controller=cloud&action=ai-put`, {
        method: 'GET',
    });
    let url = await getUrls.json();
    // 1 for json and 0 for bin
    let responseCodes = [];


    for (let i = 0; i < url.urls.length; i++) {
        const model = modelData[i];
        let ext = i == 0 ? 'application/octet-stream' : 'text/json';
        const savedModelFiles = await fetch(url.urls[i].url, {
            method: 'PUT',
            body: model,
            headers: {
                "Accept": "*/*",
                'Content-Type': ext,
            }
        });
        if (savedModelFiles.status != 200) {
            console.error("upload failed")
        }
        responseCodes.push(savedModelFiles.status)
    }

    return [responseCodes, url];
}


function testAssets() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: `/routing/Routing.php?controller=cloud&action=test_method`,
            success: function (response) {
                resolve(response);
            },
            error: function () {
                reject();
            }
        });
    });
}

function getAllPublicAssets(page, filter) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=get_public_generative_assets_per_page", 
            data: {
                page: page,
                filter: filter
            },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}
function getBestAssets(start, end, from) {
     return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=get_best_assets_of_this_week", 
            data: {
                start: start,
                end: end,
                from: from


            },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}
function getAllCompetitions() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=get_all_competition", 
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}
function getAllGames() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=get_all_games", 
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}
function getCurrentGame() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=get_current_game", 
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}
function getAssetsOfCurrentGame(start, end, from){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=get_assets_of_game", 
            data: {
                start: start,
                end: end, 
                from: from
    
            },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}

function getPublicAssetsByIds(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=get_public_generative_assets_by_ids", 
            data: {
                ids: id
            },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}

function getMyFavoriteAssets(page, filter) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "/routing/Routing.php?controller=cloud&action=get_list_of_my_favorite_generative_assets_per_page", 
                data: {
                    page: page,
                    filter: filter
                },
                success: function (response) {
                    resolve(response);
                },
                error: function (error) {
                    new VittaControllerNotif().manageError(error, this);
                    reject(null);
                }
            });
        })
}

function synchroniseUserLikes(ids) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=synchronise_like_with_local_db", 
            data: {
                ids: ids
            },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}

function getGenAssetsLength(filter) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=get_generative_assets_length",
            data: {
                filter: filter
            },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}

function getMyAssets(page, filter) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=get_my_generative_assets",
            data: {
                page: page,
                filter: filter
            },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}
function getMyGenAssetsLength(filter) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=get_my_assets_length",
            data: {
                filter: filter
            },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}

function getSameAsset(userData) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=check_duplicate_generative_assets",
            data: userData,
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}
function validateDuplicateAsset(uuid, score) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=validate_duplicate_asset",
            data: {
                uuid: uuid,
                score: score
            },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}

function getAssetsByCreator(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=get_one_creator_generative_assets",
            data: {
                id: id
            },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}

function getDefaultGenerativeAsset(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=get_one_default_generative_assets",
            data: {
                id: id
            },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}


function isImageLikedByUser(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=is_image_liked_by_user",
            data: {
                id: id
            },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}
function likeGenerativeAsset(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=increment_like_generative_assets",
            data: {
                id: id
            },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}
function dislikeGenerativeAsset(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/routing/Routing.php?controller=cloud&action=decrement_like_generative_assets",
            data: {
                id: id
            },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                new VittaControllerNotif().manageError(error, this);
                reject(null);
            }
        });
    })
}
function deleteGenerativeAssetByCreator(id) {
    return new Promise((resolve, reject) => {
    $.ajax({
        type: "POST",
        url: "/routing/Routing.php?controller=cloud&action=set_private_generative_asset",
        data: {
            id: id
        },
        success: function (response) {
            resolve(response);
        },
        error: function (error) {
            new VittaControllerNotif().manageError(error, this);
            reject(null);
        }
    });
})
}

// get file from input field and parse it to base64
const assetFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
