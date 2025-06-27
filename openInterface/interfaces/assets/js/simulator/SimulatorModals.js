// Background Modal
const SimulatorModals = {
    eventsSetup: false,
    simulatorMode: null,
    backgroundChoice: "",
    imagesLoaded: 0,
    visibleImageCount: 1, // at least one image will be displayed
    errorNotif: new VittaNotif(5),
    simu_backgrounds: {
        'robot': [
            ["piste_robot_software-republique.png", "Piste Softaware République"],
            ["Parcours_sur_la_lune-1.png", "Parcours sur la lune 1"],
            ["Parcours_sur_la_luneprimaire-1.png", "Parcours sur la lune primaire 1"],
            ["Ramasse_minerai-1.png", "Ramasse minerai 1"],
            ["Image_circuit_cutebot.jpg", "Circuit Cutebot"],
            ["bache_ilorobot_moonweb.jpg", "Bâche robot Ilo"],
            ["community.jpg", "Piste communauté Bluebot"],
            ["city.jpg", "Piste ville Bluebot"],
            ["countryside.jpg", "Piste campagne Bluebot"],
            ["treasure_island.jpg", "Piste île au trésor Bluebot"],
            ["Image_tapis_Buddy.jpg", "Tapis Buddy"],
            ["Image_circuit_terre.png", "Circuit Terre"],
            ["Image_circuit_eau.png", "Circuit Eau"],
            ["Image_circuit_feu.png", "Circuit Feu"],
            ["Image_circuit_aire.png", "Circuit Air"],
            ["Image_circuit_minerale.png", "Circuit Minéral"],
            ["Image_circuit_aire(2).png", "Circuit Air 2"],
            ["piste_robot_bache_mars.jpg", "Piste Mars"],
            ["Image_piste_tello.png", "Piste Tello"],
            ["bache_entrepot1.jpg", "Piste Entrepôt 1"],
            ["bache_entrepot2.jpg", "Piste Entrepôt 2"],
            ["piste_kit_1.png", "Piste kit 1"],
            ["piste_kit_2.png", "Piste kit 2"],
            ["piste_kit_3.png", "Piste kit 3"],
            ["piste_kit_4.png", "Piste kit 4"],
            ["white_road.png", 'Piste blanche'],
            ["white_road1.png", 'Piste blanche bis'],
            ["Image_circuit_foot2.png", 'Circuit foot'],
            ["Fond_vittascience.png", 'Fond Vittascience'],
            ["Image_circuit_ti_white.png", 'Circuit blanc TI'],
            ["Image_circuit_ti_red.png", 'Circuit rouge TI'],
            ["Image_circuit_green.png", 'Circuit vert'],
            ["Image_circuit_white.png", "Circuit blanc"],
            ["Image_circuit_grey.png", 'Circuit gris'],
            ["Image_circuit_black.png", 'Circuit noir'],
            ["Image_circuit_blue.png", 'Circuit bleu'],
            ["Image_circuit_purple.png", 'Circuit violet'],
            ["Image_circuit_red.png", 'Circuit rouge'],
            ["Image_circuit_yellow.png", 'Circuit jaune'],
            ['defibot_2023.jpg', 'Circuit Robotcup Rescue 2023'],
            ['Défi_1_et_6.jpg', 'Défi bots n°1 et 6'],
            ['Défi_2.jpg', 'Défi bots n°2'],
            ['Défi_3.jpg', 'Défi bots n°3 : Cercle'],
            ['Défi_4.jpg', 'Défi bots n°4 : Arrêt ligne'],
            ['Défi_5.jpg', 'Défi bots n°5 : Arrêt zone'],
            ['Défi_7.jpg', 'Défi bots n°7 : Ring'],
            ['Défi_8.jpg', 'Défi bots n°8'],
            ['Défi_9.jpg', 'Défi bots n°9 : Labyrinthe'],
            ['Défi_10.jpg', 'Défi bots n°10 : Robot sumo'],
            ['Défi_11.jpg', 'Défi bots n°11 : Rond point'],
            ['Défi_12_1.jpg', 'Défi bots n°12.1 : Ligne discontinue'],
            ['Défi_12_2.jpg', 'Défi bots n°12.2 : Robot logistique'],
            ['Défi_13.jpg', 'Défi bots n°13 : Démineur'],
            ['Défi_14.jpg', 'Défi bots n°14 : Avancer et compter'],
            ['Défi_15.jpg', 'Défi bots n°15 : Compte et divise']
        ],
        'wiring': [
            ["Abris-bus.png", "Abris Bus"],
            ["Aquarium.png", "Aquarium"],
            ["Atmosphère.png", "Atmosphère"],
            ["Classe.png", "Classe"],
            ["Epoubelle.png", "Epoubelle"],
            ["Fenêtre.png", "Fenêtre"],
            ["Gazon.png", "Gazon"],
            ["Montre_connectée.png", "Montre connectée"],
            ["Mur_briques.png", "Mur briques"],
            ["Objet_connecté.png", "Objet connecté"],
            ["Parking_V2.png", "Parking"],
            ["Plante.png", "Plante"],
            ["Route.png", "Route"],
            ["Sol_Mars.png", "Sol Mars"],
            ["Trottinette.png", "Trottinette"],
            ["Blueprint.png", "Fond cadrillé bleu"],
            ["Cadrillage.png", "Cadrillage"],
            ["Computer.png", "Ordinateur"],
            ["Fond_Vittascience.png", "Fond Vittascience"],
            ["Game.png", "Jeu"],
            ["Millimètre.png", "Papier millimétré"],
            ["Orthonormé.png", "Repère orthonormé"]
        ]
    },
    obstacles: {
        'robot': [
            ["buisson_rond.png", "Buisson Rond", "Buisson"],
            ["buisson.png", "Buisson", "Buisson"],
            ["eau_rond.png", "Eau Rond", "Eau"],
            ["eau.png", "Eau", "Eau"],
            ["feu_rond.png", "Feu Rond", "Feu"],
            ["feu.png", "Feu", "Feu"],
            ["orage_rond.png", "Orage Rond", "Orage"],
            ["orage.png", "Orage", "Orage"],
            ["pierre_rond.png", "Pierre Rond", "Pierre"],
            ["pierre.png", "Pierre", "Pierre"],
            ["tornade_rond.png", "Tornade Rond", "Tornade"],
            ["tornade.png", "Tornade", "Tornade"],
            ["rond_blanc.png", "Rond Blanc", "Blanc"],
            ["rectangle_blanc.png", "Rectangle Blanc", "Blanc"],
            ["rond_gris.png", "Rond Gris", "Gris"],
            ["rectangle_gris.png", "Rectangle Gris", "Gris"],
            ["rond_noir.png", "Rond Noir", "Noir"],
            ["rectangle_noir.png", "Rectangle Blanc", "Noir"],
            ["rond_violet.png", "Rond Violet", "Violet"],
            ["rectangle_violet.png", "Rectangle Violet", "Violet"],
            ["rond_bleu.png", "Rond Bleu", "Bleu"],
            ["rectangle_bleu.png", "Rectangle Bleu", "Bleu"],
            ["rond_vert.png", "Rond Vert", "Vert"],
            ["rectangle_vert.png", "Rectangle Vert", "Vert"],
            ["rond_jaune.png", "Rond Jaune", "Jaune"],
            ["rectangle_jaune.png", "Rectangle Jaune", "Jaune"],
            ["rond_orange.png", "Rond Orange", "Orange"],
            ["rectangle_orange.png", "Rectangle Orange", "Orange"],
            ["rond_rouge.png", "Rond Rouge", "Rouge"],
            ["rectangle_rouge.png", "Rectangle Rouge", "Rouge"]
        ]
    },

    init: function () {
        if (Simulator.isInWiringMode) {
            this.simulatorMode = 'wiring';
        } else {
            this.simulatorMode = 'robot';
        }
        this.addBackground(this.simulatorMode);

        if (!SimulatorModals.eventsSetup) {
            const dropZoneElement = document.querySelector(".drop-zone"),
                backgroundInput = document.querySelector(".background-uploader");

            dropZoneElement.addEventListener("click", function () {
                backgroundInput.click();
            });

            dropZoneElement.addEventListener("change", function () {
                if (backgroundInput.files.length) {
                    SimulatorModals.updateThumbnail(dropZoneElement, backgroundInput.files[0]);
                }
            });

            dropZoneElement.addEventListener("dragover", function (e) {
                e.stopPropagation();
                e.preventDefault();
                dropZoneElement.classList.add("drop-zone--over");
            });

            dropZoneElement.addEventListener("drop", function (e) {
                e.stopPropagation();
                e.preventDefault();
                if (e.dataTransfer.files.length > 0) {
                    backgroundInput.files = e.dataTransfer.files;
                    SimulatorModals.updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
                }
                dropZoneElement.classList.remove("drop-zone--over");
            });

            dropZoneElement.addEventListener("dragleave", function () {
                dropZoneElement.classList.remove("drop-zone--over");
            });

            dropZoneElement.addEventListener("dragend", function () {
                dropZoneElement.classList.remove("drop-zone--over");
            });

            document.querySelector('#background-download').addEventListener('click', async () => {
                try {
                    let imageUrl = SimulatorModals.backgroundChoice;
                    if (imageUrl === '') {
                        const firstBackgroundImage = document.querySelector('.background-option');
                        if (firstBackgroundImage === 'null') {
                            console.error('No background image to pick!');
                            return;
                        }
                        imageUrl = firstBackgroundImage.src;
                    };
                    const fetchedImage = await fetch(imageUrl);
                    const blobedImage = await fetchedImage.blob();
                    const imageObjectUrl = window.URL.createObjectURL(blobedImage);
                    let a = document.createElement('a');
                    a.href = imageObjectUrl;
                    a.download = imageUrl.split('/').pop();
                    a.click();
                } catch (error) {
                    console.error(error);
                }
            });

            SimulatorModals.eventsSetup = true;
        }
    },
    displayDropZone: function (bool) {
        const dropZoneElement = document.querySelector(".drop-zone");
        if (bool) {
            dropZoneElement.querySelector(".drop-zone-prompt").style.display = "block";
            dropZoneElement.querySelector(".drop-zone-prompt-small").style.display = "block";
        } else {
            dropZoneElement.querySelector(".drop-zone-prompt").style.display = "none";
            dropZoneElement.querySelector(".drop-zone-prompt-small").style.display = "none";
        }
    },
    useBackground: function () {
        if (this.backgroundChoice !== "") {
            if (Simulator.isInWiringMode) {
                WiringSimulator.img.background.src = this.backgroundChoice;
            } else {
                if (Simulator._has3DRobotSimulator() && !Simulator._classicRobotSimulatorPrepareForRun) {
                    RobotSimulator3D.updateBackground(this.backgroundChoice);
                } else {
                    RobotSimulator.img.background.src = this.backgroundChoice;
                    SimulatorLS.setData(RobotSimulator.currentRobotName, 'backgrounds', RobotSimulator.img.background.src, SimulatorLS.backgroundFormat);
                }
            }

            const thumbnail = document.querySelector(".drop-zone-thumbnail");
            if (thumbnail !== null) {
                thumbnail.remove();
            }
            this.displayDropZone(true);
            this.backgroundChoice = '';
            pseudoModal.closeModal("modal-simulator-background");
        } else {
            alert('Image not found !');
        }
    },
    useObstacleRobot: function () {
        const linkSplitted = this.obstacleChoice.replace(".png", '').split('/');
        const id = linkSplitted.at(-1);
        if (Simulator._has3DRobotSimulator() && !Simulator._classicRobotSimulatorPrepareForRun) {
            RobotSimulator3D.Obstacle.obstaclesDB[randHex()] = Object.assign({}, RobotSimulator3D.Obstacle.obstaclesDef[id]);
            RobotSimulator3D.Obstacle.saveToLS();
            window.Simulator3D.addObstacles();
        } else {
            RobotSimulator.Obstacle.obstaclesDB[randHex()] = Object.assign({}, RobotSimulator.Obstacle.obstaclesDef[id]);
            RobotSimulator.Obstacle.saveToLS();
        }
        // simulator3D add obstacle here
        pseudoModal.closeModal("modal-robot-obstacle");
    },
    /**
     * @param {HTMLElement} dropZoneElement
     * @param {File} file
     */
    updateThumbnail: function (dropZoneElement, file) {
        this.displayDropZone(false);
        let thumbnailElement = document.querySelector(".drop-zone-thumbnail");
        if (!thumbnailElement) {
            thumbnailElement = document.createElement("div");
            thumbnailElement.classList.add("drop-zone-thumbnail");
            dropZoneElement.appendChild(thumbnailElement);
        }
        thumbnailElement.dataset.label = file.name;

        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                const dataUrl = event.target.result;

                // On crée un objet Image pour en vérifier le ratio
                const img = new Image();
                img.onload = () => {
                    const w = img.naturalWidth;
                    const h = img.naturalHeight;
                    const ratio = w / h;
                    const expected = 16 / 9;
                    const tolerance = 0.01; // 1% de marge

                    if (Math.abs(ratio - expected) > tolerance) {
                        SimulatorModals.errorNotif.displayNotification(null, "Attention : l'image importée n'est pas au format 16 :9 (" + w + "x" + h + ").\nMerci d'utiliser une image en 16:9.", 'bg-warning');
                    }

                    // Si OK, on affiche la miniature
                    thumbnailElement.style.backgroundImage = `url('${dataUrl}')`;
                    thumbnailElement.style.backgroundSize = "100% 100%";
                    this.backgroundChoice = dataUrl;
                };
                img.src = dataUrl;
            });
            reader.readAsDataURL(file);
        } else {
            thumbnailElement.style.backgroundImage = null;
            alert("Only Drag And Drop Images!");
        }
    },
    imageEvent: function (target) {
        const backgroundOption = document.querySelectorAll(".background-option");
        if (backgroundOption) {
            backgroundOption.forEach(function (bgOption) {
                bgOption.className = "background-option";
            });
            SimulatorModals.backgroundChoice = target.src;
            target.className = "background-option background-selected";
        }
    },
    imageLoadedCounter: function () {
        this.imagesLoaded++;
        if (this.imagesLoaded >= this.visibleImageCount) {
            pseudoModal.endBlocker("modal-simulator-background");
        }
    },
    calculateVisibleImages: function () {
        const modalContent = document.querySelector(".modal-background-content");
        const imageWidth = $(".background-option").css('width').replace('px', '');
        const imageHeight = $(".background-option").css('height').replace('px', '');
        const modalWidth = modalContent.offsetWidth;
        const modalHeight = modalContent.offsetHeight;
        const visibleImageCountWidth = Math.floor(modalWidth / imageWidth);
        const visibleImageCountHeight = Math.floor(modalHeight / imageHeight);
        this.visibleImageCount = visibleImageCountWidth * (visibleImageCountHeight + 1);
    },
    addBackground: function (type) {
        document.querySelectorAll(".background-option").forEach((e) => { e.remove() });
        this.simu_backgrounds[type].forEach((item) => {
            const image = new Image();
            image.src = `${CDN_PATH}/openInterface/interfaces/assets/media/simulator/${type}/backgrounds/${item[0]}`;
            image.crossOrigin = 'Anonymous';
            image.alt = `${item[1]}`;
            image.title = `${item[1]}`;
            image.className = "background-option";
            image.loading = "lazy";
            image.addEventListener("load", function () {
                SimulatorModals.imageLoadedCounter();
            });
            image.addEventListener("error", function () {
                pseudoModal.endBlocker("modal-simulator-background");
                SimulatorModals.errorNotif.displayNotification(null, `Image ${this.src} not found`, 'bg-danger');
            });
            image.addEventListener("click", function (e) {
                SimulatorModals.imageEvent(e.target);
            });
            $(".modal-background-content").append(image);
        });
        this.calculateVisibleImages();
    },
    addObstacles: function (type) {
        if (typeof Simulator3D !== 'undefined' && !Simulator._classicRobotSimulatorPrepareForRun && this.obstacles['robot'].findIndex((item) => item[0] === "mur_horizontal.png") === -1) {
            this.obstacles['robot'].unshift(["mur_horizontal.png", "Mur Horizontal", "Mur"]);
            this.obstacles['robot'].unshift(["mur_vertical.png", "Mur Vertical", "Mur"]);
            // specific obstacles for 3D simulator with physics
            if (Simulator3D.physics) {
                this.obstacles['robot'].unshift(["ramp_left_3D.png", "Ramp Left", "Rampe"]);
                this.obstacles['robot'].unshift(["ramp_right_3D.png", "Ramp Right", "Rampe"]);
                this.obstacles['robot'].unshift(["ramp_back_3D.png", "Ramp Back", "Rampe"]);
                this.obstacles['robot'].unshift(["ramp_front_3D.png", "Ramp Front", "Rampe"]);
                this.obstacles['robot'].unshift(["ramp_flat_3D.png", "Ramp Flat", "Rampe"]);
            }
        } else if (typeof Simulator3D !== 'undefined' && Simulator._classicRobotSimulatorPrepareForRun && this.obstacles['robot'].findIndex((item) => item[0] === "mur_horizontal.png") !== -1) {
            const obstacles3D = ["mur_horizontal.png", "mur_vertical.png", "ramp_left_3D.png", "ramp_right_3D.png", "ramp_back_3D.png", "ramp_front_3D.png", "ramp_flat_3D.png"];
            this.obstacles['robot'] = this.obstacles['robot'].filter((item) => !obstacles3D.includes(item[0]));

        }
        let html = "";
        this.obstacles[type].forEach((item) => {
            html +=
                `<div class="obstacle-option ${item[0] === "mur_horizontal.png" ? "obstacle-option-thin" : ""}">
        <img src="/openInterface/interfaces/assets/media/simulator/${type}/obstacles/${item[0]}" alt="${item[1]}"/>
        <span>${item[2]}</span>
        </div>`;
        });
        $(".modal-obstacle-body .modal-content").html(html);
    },
};

$("body").on("click", "#robot-background-button, #robot-background-button-3D, #wiring-background-button", async (e) => {
    pseudoModal.openModal("modal-simulator-background");
    if ((Simulator.isInWiringMode && SimulatorModals.simulatorMode !== 'wiring') || (!Simulator.isInWiringMode && SimulatorModals.simulatorMode !== 'robot')) {
        SimulatorModals.imagesLoaded = 0;
    }
    if (SimulatorModals.imagesLoaded < SimulatorModals.visibleImageCount) {
        pseudoModal.newBlocker('Veuillez patienter ...', 'modal-simulator-background');
    }
    SimulatorModals.init();
});

// Obstacle Modal

$("body").on("click", "#obstacles-button, #obstacles-button-3D", () => {
    pseudoModal.openModal("modal-robot-obstacle");
    SimulatorModals.addObstacles('robot');

    const obstacleOptions = document.querySelectorAll(".obstacle-option");

    obstacleOptions.forEach((obstacleOption) => {
        obstacleOption.removeEventListener("click", handleObstacleClick);
        obstacleOption.addEventListener("click", handleObstacleClick);
    });
});

function handleObstacleClick(event) {
    const obstacleOptions = document.querySelectorAll(".obstacle-option");

    obstacleOptions.forEach((obstacleOption) => {
        obstacleOption.classList.remove("obstacle-selected");
    });

    // updtate the selected obstacle
    const selectedObstacle = event.currentTarget;
    SimulatorModals.obstacleChoice = selectedObstacle.firstElementChild.attributes.src.nodeValue;
    selectedObstacle.classList.add("obstacle-selected");
};