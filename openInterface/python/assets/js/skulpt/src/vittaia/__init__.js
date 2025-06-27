/**
 * This file purpose an implementation of a custom machine learning library in Skulpt.
 */


/**
 * Loads a model image using an url
 * @param {*} self - The python self parameter
 * @param {*} url - A python string that contain the url value
 * @returns Model load promise result
 */
const loadModelImage = function (self, url) {
    Sk.builtin.pyCheckArgs("load_model", arguments, 2, 2);
    Sk.builtin.pyCheckType("url", "str", Sk.builtin.checkString(url));
    Sk.builtins.print.tp$call(["Chargement du modèle d'images ..."]);
    return new Sk.misceval.promiseToSuspension(
        loadModelImagePromise(self, url)
            .then((response) => {
                if (Sk.ffi.remapToJs(response) !== true) {
                    Sk.ffi.remapToPy(response);
                    return;
                }
                return Sk.ffi.remapToPy(Sk.ffi.remapToJs(response));
            })
    );
};

/**
 * The promise that the loadModel function calls
 * @param {*} self - The python self parameter
 * @param {*} url - A python string that contain the url value
 * @returns Python True value if the model was successfully loaded
 */
const loadModelImagePromise = (self, url) => {
    return new Promise(async (resolve, reject) => {
        const that = {};
        that._url = Sk.ffi.remapToJs(url);

        const isModelLoaded = checkLoadedModel(that._url);
        let index;
        if (!isModelLoaded) {
            try {
                let teachable;
                if (that._url === 'local') {
                    const metadataFromStorage = JSON.parse(localStorage.getItem('modelMetadata'));
                    teachable = await tmImage.load('indexeddb://vittascience-image-model', metadataFromStorage);
                } else {
                    teachable = await tmImage.load(`${that._url}model.json`, `${that._url}metadata.json`);
                }
                index = window.pythonAi.models.push({ url: that._url, teachable: teachable }) - 1;
            } catch (error) {
                reject(`Failed to load the model files!`);
                return;
            }
        } else {
            index = isModelLoaded.index;
        }
        if (typeof window.pythonAi.models[index].instances === 'undefined') {
            window.pythonAi.models[index].instances = [];
        }
        window.pythonAi.models[index].instances.push(self);
        resolve(new Sk.ffi.remapToPy(true));
        return;
    });
};

/**
 * Check if the provided url string has already been used among the previously loaded models
 * @param {*} url 
 * @returns An object containing the matched model index in the window.pythonAi.models array or false if not found
 */
const checkLoadedModel = (url) => {
    for (let i = 0; i < window.pythonAi.models.length; i++) {
        if (window.pythonAi.models[i].url === url) {
            return { index: i };
        }
    }
    return false;
};

/**
 * Gives the prediction of the provided image using the model associated to the self object
 * @param {*} self - The python self parameter
 * @param {*} imageSource - An image data string as a python string value
 * @returns predict promise result
 */
const predict = function (self, imageSource) {
    Sk.builtin.pyCheckArgs("predict", arguments, 2, 2);
    if (!Sk.builtin.checkString(imageSource)) {
        throw new Sk.builtin.ValueError('Image data "' + imageSource + '" must be string');
    }
    return new Sk.misceval.promiseToSuspension(
        predictPromise(self, imageSource)
            .then((response) => {
                if (Sk.ffi.remapToJs(response).success !== true) {
                    Sk.ffi.remapToPy(response.errorMessage);
                    return;
                }
                return Sk.ffi.remapToPy(Sk.ffi.remapToJs(response).prediction);
            })
    );
};

/**
 * The promise that the predict function calls
 * @param {*} self - The python self parameter
 * @param {*} imageSource - An image data string as a python string value
 * @returns an object containing the success boolean and the model prediction for the provided image data
 */
const predictPromise = (self, imageSource) => {
    return new Promise(async (resolve, reject) => {
        const currentModel = getSelfModel(self);
        if (!currentModel) {
            reject({
                success: false,
                errorMessage: 'You need to load the model before using it!'
            });
            return;
        }

        const imageSrc = Sk.ffi.remapToJs(imageSource);
        const image = new Image();
        image.addEventListener('load', async () => {
            var predictions = await currentModel.teachable.predict(image);
            for (let i = 0; i < predictions.length; i++) {
                predictions[i] = [predictions[i].className, predictions[i].probability];
            }
            const predictionResponse = {
                success: true,
                prediction: predictions
            }
            return resolve(new Sk.ffi.remapToPy(predictionResponse));
        });
        image.src = imageSrc;
    });
};

/**
 * Finds the associated model for the provided self object
 * @param {*} self - The python self parameter
 * @returns the model if found, false otherwise
 */
const getSelfModel = (self) => {
    for (let model of window.pythonAi.models) {
        for (let instance of model.instances) {
            if (instance === self) {
                return model;
            }
        }
    }
    return false;
}


/**
 * Gets the video devices list
 * @returns get camera list promise result
 */
const getCameraList = function () {
    return new Sk.misceval.promiseToSuspension(
        getCameraListPromise()
            .then((response) => Sk.ffi.remapToPy(response)).catch((error) => {
                throw error;
            })
    );
};

/**
 * Gets the video device list and its related index number
 * @returns a python dictionary containing the device label and index number for all the video devices
 */
const getCameraListPromise = () => {
    return new Promise(async (resolve, reject) => {
        const cameraList = [];
        const devices = await getDevices();
        for (let i = 0; i < devices.length; i++) {
            cameraList.push({
                deviceIndex: i,
                deviceLabel: devices[i].label
            });
        }
        return resolve(new Sk.ffi.remapToPy(cameraList));
    });
};

/**
 * Set up the webcam using it's video device index
 * @param {*} self self - The python self parameter
 * @param {*} deviceIndex - A python integer that corresponds to a video device index
 * @returns setWebcam promise result
 */ 
const setWebcam = function (deviceIndex, Webcam) {
    Sk.builtin.pyCheckArgs("select_camera", arguments, 2, 2);
    if (!Sk.builtin.checkInt(deviceIndex)) {
        throw new Sk.builtin.ValueError('Webcam device index "' + deviceIndex + '" must be number');
    }
    return new Sk.misceval.promiseToSuspension(new Promise(async function (resolve, reject) {
        const deviceIndexJs = Sk.ffi.remapToJs(deviceIndex);
        let videoDevices;
        try {
            videoDevices = await getDevices();
        } catch (error) {
            throw new Sk.builtin.Exception('Error while looking for camera devices!');
        }

        try {
            if (videoDevices.length === 0) {
                throw new Sk.builtin.Exception('No camera device detected!');
            }
            if (videoDevices.length - 1 < deviceIndexJs) {
                throw new Sk.builtin.Exception(`The selected camera device doesn't exist!`);
            }
        } catch (error) {
            return reject(error);
        }

        const currentVideoDevice = videoDevices[deviceIndexJs];
        const webcam = new Webcam(
            224,
            224,
            true
        );
        await webcam.setup({
            deviceId: currentVideoDevice.deviceId,
            facingMode: 'environment'
        });
        window.pythonAi.webcam = webcam;
        await webcam.play();
        return resolve(new Sk.ffi.remapToPy(true));
    })
        .then((response) => Sk.ffi.remapToPy(response)).catch((error) => {
            throw error;
        })
    )
};

/**
 * Set up the webcam using it's video device index for image model.
 * @param {*} self self - The python self parameter
 * @param {*} deviceIndex - A python integer that corresponds to a video device index
 * @returns setWebcam promise result
 */
const select_camera_image = function (self, deviceIndex) {
    return setWebcam(deviceIndex, tmImage.Webcam);
};

/**
 * Updates the current tmImage webcam (the one in the window.pythonAi.webcam attribute)
 * @returns Python true value
 */
const displayWebcam = function () {
    const canvas = document.querySelector("#console").getElementsByTagName('canvas')[0]
    if (canvas) {
        const img = document.createElement('img');
        img.setAttribute('src', canvas.toDataURL());
        canvas.replaceWith(img);
    }
    document.querySelector('#console').appendChild(window.pythonAi.webcam.canvas);
    window.pythonAi.webcam.update();
    setTimeout(function () {
        const cons = document.querySelector(INTERFACE_NAME === 'python' ? "#console-wrapper" : "#console");
        cons.scrollTo(0, cons.scrollHeight);
    }, 50);
    return new Sk.ffi.remapToPy(true);
};

/**
 * Captures the current displayed image in the webcam
 * @returns The image data as a python string value
 */
const captureWebcam = function () {
    const imageSource = window.pythonAi.webcam.canvas.toDataURL();
    return new Sk.ffi.remapToPy(imageSource);
};

/**
 * Get all the video devices
 * @returns an array containing all the video devices
 */
const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices(),
        videoDevices = [];
    for (let device of devices) {
        if (device.kind === 'videoinput') {
            videoDevices.push(device);
        }
    }
    return videoDevices;
};

const getUploadedImage = function (pictureName) {
    Sk.builtin.pyCheckArgs("getUploadedImage", arguments, 1, 1);
    Sk.builtin.pyCheckType("pictureName", "str", Sk.builtin.checkString(pictureName));
    const pythonPictures = localStorage.pythonPictures;
    if (pictureName.v && pythonPictures) {
        const pictures = JSON.parse(pythonPictures);
        const picture = pictures.filter((pic) => pic.name === pictureName.v)[0];
        if (picture) {
            return Sk.ffi.remapToPy(picture.data);
        } else {
            const errorNotif = new VittaNotif(6);
            errorNotif.displayNotification(null, `Impossible de trouver l'image \"${pictureName.v}. Veuillez la télécharger à nouveau dans le bloc en cliquant sur l'icône 'Upload'`, 'bg-danger');
        }
    }
    return Sk.builtin.none();
};

// Main Webcam class with its 4 methods
const webcamClass = function ($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function (self) {

    });
    $loc.select_camera = new Sk.builtin.func(select_camera_image);
    $loc.display = new Sk.builtin.func(displayWebcam);
    $loc.capture = new Sk.builtin.func(captureWebcam);
    $loc.get_camera_list = new Sk.builtin.func(getCameraList)
};

// Main ModelImage class with its 2 methods
const modelImageClass = function ($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function (self) {

    });
    $loc.load_model = new Sk.builtin.func(loadModelImage);
    $loc.predict = new Sk.builtin.func(predict);
};
//AI POSTURE
let loadModelPosture = function (self, url) {
    Sk.builtin.pyCheckArgs("load_model", arguments, 2, 2);
    if (!Sk.builtin.checkString(url)) {
        throw new Sk.builtin.ValueError('Url "' + url + '" must be string');
    }
    return new Sk.misceval.promiseToSuspension(
        loadModelPosturePromise(self, url)
            .then((response) => {
                if (Sk.ffi.remapToJs(response) !== true) {
                    Sk.ffi.remapToPy(response);
                    return;
                }
                return Sk.ffi.remapToPy(Sk.ffi.remapToJs(response));
            })
    );
};
/**
 * The promise that the loadModel function calls
 * @param {*} self - The python self parameter
 * @param {*} url - A python string that contain the url value
 * @returns Python True value if the model was successfully loaded
 */
let loadModelPosturePromise = (self, url) => {
    return new Promise(async (resolve, reject) => {
        const that = {};
        that._url = Sk.ffi.remapToJs(url);

        const isModelLoaded = checkLoadedModel(that._url);
        let index;
        if (!isModelLoaded) {
            try {
                let teachable;
                if (that._url === 'local') {
                    const metadataFromStorage = JSON.parse(localStorage.getItem('modelPoseMetadata'));
                    teachable = await tmPose.load('indexeddb://vittascience-ai-pose-model', metadataFromStorage);
                } else {
                    teachable = await tmPose.load(`${that._url}model.json`, `${that._url}metadata.json`);

                }
                index = window.pythonAi.models.push({ url: that._url, teachable: teachable }) - 1;

            } catch (error) {
                reject(`Failed to load the model files!`);
                return;
            }
        } else {
            index = isModelLoaded.index;
        }
        if (typeof window.pythonAi.models[index].instances === 'undefined') {
            window.pythonAi.models[index].instances = [];
        }
        window.pythonAi.models[index].instances.push(self);

        resolve(new Sk.ffi.remapToPy(true));
        return;
    });
};


/**
 * Gives the prediction of the provided image using the model associated to the self object
 * @param {*} self - The python self parameter
 * @param {*} imageSource - An image data string as a python string value
 * @returns predict promise result
 */
const predictPosture = function (self, imageSource) {
    Sk.builtin.pyCheckArgs("predictPosture", arguments, 2, 2);
    if (!Sk.builtin.checkString(imageSource)) {
        throw new Sk.builtin.ValueError('Image data "' + imageSource + '" must be string');
    }
    return new Sk.misceval.promiseToSuspension(
        predictPosturePromise(self, imageSource)
            .then((response) => {
                if (Sk.ffi.remapToJs(response).success !== true) {
                    Sk.ffi.remapToPy(response.errorMessage);
                    return;
                }
                return Sk.ffi.remapToPy(Sk.ffi.remapToJs(response).prediction);
            })
    );
};



/**
 * The promise that the predict function calls
 * @param {*} self - The python self parameter
 * @param {*} imageSource - An image data string as a python string value
 * @returns an object containing the success boolean and the model prediction for the provided image data
 */
const predictPosturePromise = (self, imageSource) => {
    return new Promise(async (resolve, reject) => {
        const currentModel = getSelfModel(self);
        if (!currentModel) {
            reject({
                success: false,
                errorMessage: 'You need to load the model before using it!'
            });
            return;
        }

        const imageSrc = Sk.ffi.remapToJs(imageSource);
        const image = new Image();
        image.addEventListener('load', async () => {
            const { pose, posenetOutput } = await currentModel.teachable.estimatePose(image);
            var predictions = await currentModel.teachable.predict(posenetOutput);
            for (let i = 0; i < predictions.length; i++) {
                predictions[i] = [predictions[i].className, predictions[i].probability];
            }
            drawPose(pose, image)
            const predictionResponse = {
                success: true,
                prediction: predictions
            }
            return resolve(new Sk.ffi.remapToPy(predictionResponse));
        });
        image.src = imageSrc;
    });
};


const drawPose = (pose, image) => {
    const canvas = document.querySelector('#console canvas')
    canvas.width = 224;
    canvas.height = 224;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(
            pose.keypoints,
            minPartConfidence,
            ctx,
            2,
        );
        tmPose.drawSkeleton(
            pose.keypoints,
            minPartConfidence,
            ctx,
            1,
        );
    }
    // if(eltSrc instanceof HTMLImageElement) eltSrc.remove()
}

/**
 * Set up the webcam using it's video device index for posture model.
 * @param {*} self self - The python self parameter
 * @param {*} deviceIndex - A python integer that corresponds to a video device index
 * @returns setWebcam promise result
 */
const select_camera_posture = function (self, deviceIndex) {
    return setWebcam(deviceIndex, tmPose.Webcam);
};

// Main Webcam class with its 4 methods
const webcamPostureClass = function ($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function (self) {

    });
    $loc.select_camera = new Sk.builtin.func(select_camera_posture);
    $loc.display = new Sk.builtin.func(displayWebcam);
    $loc.capture = new Sk.builtin.func(captureWebcam);
    $loc.get_camera_list = new Sk.builtin.func(getCameraList)
};

// Main Model class with its 2 methods
const modelPostureClass = function ($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function (self) {

    });
    $loc.load_model = new Sk.builtin.func(loadModelPosture);
    $loc.predict = new Sk.builtin.func(predictPosture);
};

//AISound

/**
 * Loads a model using an url
 * @param {*} self - The python self parameter
 * @param {*} url - A python string that contain the url value
 * @returns Model load promise result
 */
let loadModelSound = function (self, url) {
    Sk.builtin.pyCheckArgs("load_model", arguments, 2, 2);
    if (!Sk.builtin.checkString(url)) {
        throw new Sk.builtin.ValueError('Url "' + url + '" must be string');
    }
    return new Sk.misceval.promiseToSuspension(
        loadModelSoundPromise(self, url)
            .then((response) => {
                if (Sk.ffi.remapToJs(response) !== true) {
                    Sk.ffi.remapToPy(response);
                    return;
                }
                return Sk.ffi.remapToPy(Sk.ffi.remapToJs(response));
            })
    );
};

/**
 * The promise that the loadModel function calls
 * @param {*} self - The python self parameter
 * @param {*} url - A python string that contain the url value
 * @returns Python True value if the model was successfully loaded
 */
let loadModelSoundPromise = (self, url) => {
    return new Promise(async (resolve, reject) => {
        const that = {};
        that._url = Sk.ffi.remapToJs(url);

        const isModelLoaded = checkLoadedModel(that._url);

        let index;
        if (!isModelLoaded) {
            try {
                let teachable;
                if (that._url === 'local') {
                    const metadataFromStorage = JSON.parse(localStorage.getItem('modelSoundMetadata'));
                    teachable = await speechCommands.create(
                        "BROWSER_FFT", // fourier transform type, not useful to change
                        undefined, // speech commands vocabulary feature, not useful for your models
                        'indexeddb://vittascience-sound-model',
                        metadataFromStorage);
                } else {
                    teachable = await speechCommands.create(
                        "BROWSER_FFT", // fourier transform type, not useful to change
                        undefined, // speech commands vocabulary feature, not useful for your models
                        that._url + 'model.json',
                        that._url + 'metadata.json');
                }
                await teachable.ensureModelLoaded();
                index = window.pythonAi.models.push({ url: that._url, teachable: teachable }) - 1;

            } catch (error) {
                reject(`Failed to load the model files!`);
                return;
            }
        } else {
            index = isModelLoaded.index;
        }
        if (typeof window.pythonAi.models[index].instances === 'undefined') {
            window.pythonAi.models[index].instances = [];
        }
        window.pythonAi.models[index].instances.push(self);

        resolve(new Sk.ffi.remapToPy(true));
        return;
    });
};

/**
 * Gives the prediction of the provided image using the model associated to the self object
 * @param {*} self - The python self parameter
 * @param {*} imageSource - An image data string as a python string value
 * @returns predict promise result
 */
const listen = function (self) {
    return new Sk.misceval.promiseToSuspension(
        listenPromise(self)
            .then((response) => {
                if (Sk.ffi.remapToJs(response).success !== true) {
                    Sk.ffi.remapToPy(response.errorMessage);
                    return;
                }
                return Sk.ffi.remapToPy(Sk.ffi.remapToJs(response).prediction);
            })
    );
};

/**
 * The promise that the predict function calls
 * @param {*} self - The python self parameter
 * @param {*} imageSource - An image data string as a python string value
 * @returns an object containing the success boolean and the model prediction for the provided image data
 */
const listenPromise = (self) => {

    return new Promise(async (resolve, reject) => {
        const currentModel = getSelfModel(self);
        if (!currentModel) {
            reject({
                success: false,
                errorMessage: 'You need to load the model before using it!'
            });
            return;
        }
        let predictions;
        let listeningCount = 0
        currentModel.teachable
            .listen(
                result => {
                    if (listeningCount === 0) {
                        listeningCount++
                        return
                    }
                    predictions = Array.from(result.scores)
                    const words = currentModel.teachable.wordLabels()
                    for (let i = 0; i < predictions.length; i++) {
                        predictions[i] = [words[i], predictions[i]]
                    }
                    const predictionResponse = {
                        success: true,
                        prediction: predictions
                    }
                    currentModel.teachable.stopListening()
                    return resolve(new Sk.ffi.remapToPy(predictionResponse));
                },
                {
                    probabilityThreshold: 0.75,
                    overlapFactor: 0.5, //Controls how often the recognizer performs prediction on spectrograms
                    invokeCallbackOnNoiseAndUnknown: true,
                    suppressionTimeMillis: 1000,
                    includeEmbedding: true
                });
    });
};

/**
 * Captures the current displayed image in the webcam
 * @returns The image data as a python string value
 */
const playMicro = function () {
    return new Promise(async (resolve, reject) => {
        // const devices = await getDevicesAudio();
        navigator.mediaDevices
            .getUserMedia({ video: false, audio: true })
            .then((stream) => {
                audio = stream; // A
                audio.srcObject = stream; // B
                audio.autoplay = true; // C
            })
            .catch((err) => {
                console.error(`you got an error: ${err}`);
            });
        return;
    })

};

/**
 * Gets the video devices list
 * @returns get camera list promise result
 */
const getMicroList = function () {
    return new Sk.misceval.promiseToSuspension(
        getMicroListPromise()
            .then((response) => Sk.ffi.remapToPy(response)).catch((error) => {
                throw error;
            })
    );
};

/**
 * Gets the video device list and its related index number
 * @returns a python dictionary containing the device label and index number for all the video devices
 */
const getMicroListPromise = () => {
    return new Promise(async (resolve, reject) => {
        const list = [];
        const devices = await getDevicesAudio();
        for (let i = 0; i < devices.length; i++) {
            list.push({
                deviceIndex: i,
                deviceLabel: devices[i].label
            });
        }
        return resolve(new Sk.ffi.remapToPy(list));
    });
};

/**
 * Get all microphones
 * @returns an array containing all microphones
 */
let getDevicesAudio = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices(),
        audioDevices = [];
    for (let device of devices) {
        if (device.kind === 'audioinput') {
            audioDevices.push(device);
        }
    }
    return audioDevices;
};


// Main ModelSound class with its 2 methods
let modelSoundClass = function ($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function (self) {
    });
    $loc.load_model = new Sk.builtin.func(loadModelSound);
    $loc.listen = new Sk.builtin.func(listen);
};


// Micro
const microClass = function ($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function (self) { });
    // $loc.select_micro = new Sk.builtin.func(setMicro);
    $loc.play = new Sk.builtin.func(playMicro);
    $loc.get_micros_list = new Sk.builtin.func(getMicroList)
};

// ai-text Connection Socket server
let modelAItextClass = function ($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function (self) {
    });
    $loc.set_randomness = new Sk.builtin.func(setTemperature);
    $loc.set_model_ia = new Sk.builtin.func(setTextModel);
    $loc.predict = new Sk.builtin.func(predictText);
};

let discussionClass = function ($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function (self) {
    });
    $loc.load_discussion = new Sk.builtin.func(loadDiscussion);
};

// Module definition
var $builtinmodule = function () {
    var vittaia = {};
    // Javascript object containing "real" model(s) data - Created at the very first python code evaluation
    if (typeof pythonAi === 'undefined') {
        window.pythonAi = { models: [] };
    }
    for (let model of window.pythonAi.models) {
        model.instances = [];
    }
    vittaia.ModelImage = Sk.misceval.buildClass(vittaia, modelImageClass, 'ModelImage', []);
    vittaia.Webcam = Sk.misceval.buildClass(vittaia, webcamClass, 'Webcam', []);

    vittaia.ModelPosture = Sk.misceval.buildClass(vittaia, modelPostureClass, 'ModelPosture', []);
    vittaia.WebcamPosture = Sk.misceval.buildClass(vittaia, webcamPostureClass, 'WebcamPosture', []);
    vittaia.getUploadedImage = new Sk.builtin.func(getUploadedImage);

    vittaia.ModelSound = Sk.misceval.buildClass(vittaia, modelSoundClass, 'ModelSound', []);
    vittaia.Micro = Sk.misceval.buildClass(vittaia, microClass, 'Micro', []);

    vittaia.TextAI = Sk.misceval.buildClass(vittaia, modelAItextClass, 'TextAI', []);
    vittaia.Discussion = Sk.misceval.buildClass(vittaia, discussionClass, 'Discussion', []);

    return vittaia;
};

const refactoringOldConversation=(data)=> {
    const newConversation = []
    data.forEach(el => {
        const obj = {
            role: el.role || el.from,
            content: el.text || el.content
        }
        newConversation.push(obj)
    })
    return newConversation
}
/**
 * Loads a model using an url
 * @param {*} self - The python self parameter
 * @param {*} url - A python string that contain the url value
 * @returns Model load promise result
 */
const loadDiscussion = function (self, url) {
    initConnection();
    const _url = Sk.ffi.remapToJs(url);

    let h_conversation, context;
    Sk.builtin.pyCheckArgs("load_discussion", arguments, 2, 2);
    if (!Sk.builtin.checkString(url)) {
        throw new Sk.builtin.ValueError('Url "' + _url + '" must be string');
    }
    if (_url === "local") {
        if(localStorage.getItem('vitta-ai-text')!==null && localStorage.getItem('vitta-ai-text') !==0){
            h_conversation = JSON.parse(localStorage.getItem('vitta-ai-text'));
            context = refactoringOldConversation(h_conversation.text)
            window.pythonAi.connection.instruction = h_conversation.instruction
            window.pythonAi.connection.context = context
            }
    } else {
        return new Sk.misceval.promiseToSuspension(
            loadProjectCode(self, _url)
                .then((response) => {
                    h_conversation = JSON.parse(response).categories;
                    context = refactoringOldConversation(h_conversation.text)
                    // return Sk.ffi.remapToPy(`${h_conversation.instruction}, ${context}`);
                    window.pythonAi.connection.context = context
                })
        );


    }
    context = clearTokensBeforeJoin(self, context.join(""))
    return Sk.ffi.remapToPy(context);
};

const loadProjectCode = function (self, url) {
    const link = url.split('/')[5]
    return new Promise(async (resolve, reject) => {
        const data = new URLSearchParams();
        data.append('link', `${link}`);
        data.append('interface', 'ai');
        const code = await (
            await fetch('/routing/Routing.php?controller=project&action=get_by_link', {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
        ).json();
        resolve(code.code);

        return;
    });
};

/**
 * initialiser la connection
 * @param {*} self - The python self parameter
 * @param {*} url - A python string that contain the url value
 * @returns Model load promise result
 */

let tries = 0
const initConnection = function (self) {
    return new Sk.misceval.promiseToSuspension(
        connectSocket(self)
            .then((response) => {
                if (Sk.ffi.remapToJs(response) !== true) {
                    Sk.ffi.remapToPy(response);
                    return;
                }
                return Sk.ffi.remapToPy(response);
            })
    );
};

/**

 * @param {*} self - The python self parameter
 * @returns Python True value if the model was successfully loaded
 */
const connectSocket = (self) => {
    return new Promise(async (resolve, reject) => {
        let protocol, port, host;
        if (location.protocol === 'http:') {
            protocol = "ws";
            host = "localhost";
            port = "1337";
        } else {
            protocol = "wss";
            port = "443";
            host = "vmoodle.vittascience.com/node-llm";
            if (isProduction()) {
                host = "llminterfacer.vittascience.com/node-llm";
            }
        }

        let connexion = null;
        try {
            connexion = new WebSocket(`${protocol}://${host}:${port}/completions`);
            connexion.addEventListener('open', () => {
                console.log('Connexion opened ✅');
            });
            connexion.addEventListener('message', (message) => {
                // unstringify the message
                message = JSON.parse(message.data);
                switch (message.type) {
                    case 'acknowledge':
                        console.log('Connexion acknowledged.');
                        break;
                    case 'info':
                        if (message.data == 'stream_closed') {
                            console.log('Stream closed!');
                        }
                        if (message.data == 'maximum_token_reached') {
                            console.log('Stream closed!');
                        }
                        break;
                    case 'error-length':
                        break;
                    case 'text-data':
                        break;
                    case 'message':
                        break;
                    case 'error':
                        console.log('error');
                        console.error(message);
                        break;
                    default:
                        console.log('unknown message type');
                        break;
                }

            });
            connexion.addEventListener('close', () => {
                console.log('Connexion closed ❌');
                connexion = null;

                // Try to reconnect
                if (connexion === null) {
                    tries++;
                    setTimeout(() => initConnection(), 50 + tries * tries);
                }
            });

        } catch (error) {
            reject(error);
            return;
        }

        if (typeof window.pythonAi.connection === 'undefined') {
            window.pythonAi.connection = {};
        }
        window.pythonAi.connection.current = connexion;
        window.pythonAi.connection.self = self;
        return resolve(new Sk.ffi.remapToPy(connexion));

    });
};
const isProduction = function (self) {
    const hostName = location.hostname;
    const splitHostname = hostName.split('.');
    if (splitHostname.length !== 3) return false;
    if (splitHostname[0].length !== 2) return false;
    return true;
}

const setTemperature = function (self, temperature) {
    getSelfConnection()
    Sk.builtin.pyCheckArgs("set_randomness", arguments, 2, 2);
    window.pythonAi.connection.temperature = Sk.ffi.remapToJs(temperature) * 0.02
};

const setTextModel = function (self, model) {
    getSelfConnection()
    Sk.builtin.pyCheckArgs("set_model_ia", arguments, 2, 2);
    window.pythonAi.connection.model = Sk.ffi.remapToJs(model)
};

/**
 * Predict text by using current model.
 * @param {*} self - The python self parameter
 * @param {*} message - A python string
 * @returns Model prediction promise result
 */
const predictText = function (self, message) {
    Sk.builtin.pyCheckArgs("predict_with_text", arguments, 2, 2);
    if (!Sk.builtin.checkString(message)) {
        throw new Sk.builtin.ValueError('message "' + Sk.ffi.remapToJs(message) + '" must be string');
    }
    return new Sk.misceval.promiseToSuspension(
        sendMessagePromise(self, Sk.ffi.remapToJs(message))
            .then((response) => {
                if (Sk.ffi.remapToJs(response) !== true) {
                    Sk.ffi.remapToPy(response);
                    return;
                }
                return new Sk.misceval.promiseToSuspension(
                    loadResponsePromise(self)
                        .then((response) => {
                            const res = clearTokensBeforeJoin(self, Sk.ffi.remapToJs(response))
                            return Sk.ffi.remapToPy(res);

                        })
                );
            })
    );
};

const sendMessagePromise = function (self, message) {
    const timeLimit = 60
    Sk.execLimit = timeLimit * 1000
    return new Promise(async (resolve, reject) => {
        const messageJwt = new Sk.misceval.promiseToSuspension(
            sendMessageWithJWT(self, message)
                .then((response) => {
                    if (Sk.ffi.remapToJs(response) !== true) {
                        Sk.ffi.remapToPy(response);
                        return;
                    }
                    return resolve(Sk.ffi.remapToPy(response));
                })
        );
    });
};

const sendMessageWithJWT = (self, message) => {
    const currentConnection = getSelfConnection()
    return new Promise(async (resolve, reject) => {
        const data = new URLSearchParams();
        data.append('link', 'aiTextToken');
        const token = await (
            await fetch('/routing/Routing.php?controller=project&action=get_signed_link', {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
        ).json();
        const instruction = {
            "role": "system",
            "content": window.pythonAi.connection.instruction.content
        }
        const prompt = {
            "role": "user",
            "content": message
        }
        const context = window.pythonAi.connection.context;
        const currentTemperature = window.pythonAi.connection.temperature;
        const currentModel = window.pythonAi.connection.model;
        let text = []
        if(window.pythonAi.connection.instruction) text.push(instruction)
        if(window.pythonAi.connection.context) text.push(...context)
        text.push(prompt)

        const JSONMessage = {
            "text": text,
            "temperature": currentTemperature || 1,
            "max_tokens": 132,
            "model": currentModel,
            "jwt": token,
        }
        currentConnection.send(JSON.stringify(JSONMessage));
        resolve(new Sk.ffi.remapToPy(true));
        return;
    });
};

const getMessage = function (self) {
    return new Sk.misceval.promiseToSuspension(
        loadResponsePromise(self)
            .then((response) => {
                return Sk.ffi.remapToPy(response);
            })
    );
};

const loadResponsePromise = (self) => {
    const currentConnection = getSelfConnection()
    return new Promise(async (resolve, reject) => {
        let text = ""
        currentConnection.onmessage = function (event) {
            data = JSON.parse(event.data)
            if (data.data == "stream_closed" || data.text == "stream_stopped" || data.data == 'maximum_token_reached' || data.data== undefined) {
                window.pythonAi.connection.context = ""
                return resolve(new Sk.ffi.remapToPy(text))
            }
            else {
                text += data.data.text //pour transformer le retour texte en JSON
            }
        };
    });
};

const clearTokensBeforeJoin = (self, message) => {
    message = message.replace('\n', '');
    message = message.replace('\\n', '');
    message = message.replace('\n\n', '');
    return message;
};

const getSelfConnection = () => {
    const currentConnection = window.pythonAi.connection;
    if (!currentConnection) initConnection();
    else return window.pythonAi.connection.current;
};