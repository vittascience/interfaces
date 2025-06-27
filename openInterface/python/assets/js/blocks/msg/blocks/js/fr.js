/**
 * @fileoverview English messages for Python. (EN)
 */

'use strict';

// Display - console.
Blockly.Msg['DISPLAY_PRINT_TITLE'] = 'afficher %1';
Blockly.Msg['DISPLAY_PRINT_TOOLTIP'] = 'Permet d\'afficher le contenu du bloc dans la console python.';
Blockly.Msg['DISPLAY_INPUT_TITLE'] = 'demander un texte à l\'utilisateur %1';
Blockly.Msg['DISPLAY_INPUT_TOOLTIP'] = 'Demande à l\'utilisateur d\'entrer du texte dans la console python.';
Blockly.Msg['DISPLAY_INPUT_NUMBER_TITLE'] = 'demander un nombre à l\'utilisateur %1';
Blockly.Msg['DISPLAY_INPUT_NUMBER_TOOLTIP'] = 'Demande à l\'utilisateur d\'entrer un nombre dans la console python.';
// Display - time
Blockly.Msg['TIME_SLEEP_TITLE'] = '[time] attendre %1 %2';
Blockly.Msg['TIME_SLEEP_TOOLTIP'] = 'Effectue une pause dans l\'exécution du code.';
Blockly.Msg['TIME_SLEEP_SECOND'] = 'seconde(s)';
Blockly.Msg['TIME_SLEEP_MILLISECOND'] = 'milliseconde(s)';
Blockly.Msg['TIME_SLEEP_MICROSECOND'] = 'microseconde(s)';
Blockly.Msg['TIME_TIME_TITLE'] = 'Avoir l\'heure actuelle en seconde';
Blockly.Msg['TIME_WAIT_UNTIL_TITLE'] = '[time] attendre jusqu\'à %1';
Blockly.Msg['TIME_WAIT_UNTIL_TOOLTIP'] = 'Arrête l\'excution du code jusqu\'à ce que la condition soit satisfaite.';
Blockly.Msg['TIME_INITCHRONOMETER_TITLE'] = '[time] démarrer le chronomètre';
Blockly.Msg['TIME_INITCHRONOMETER_TOOLTIP'] = 'Initialise un chronomètre à 0 (en secondes).';
Blockly.Msg['TIME_GETCHRONOMETER_TITLE'] = '[time] valeur du chronomètre en %1';
Blockly.Msg['TIME_GETCHRONOMETER_TOOLTIP'] = 'Renvoie la valeur du chronomètre à partir de l\'initialisation (en secondes ou millisecondes).';
Blockly.Msg['TIME_GET_DATE_TITLE'] = '[time] obtenir la date et l\'heure';
Blockly.Msg['TIME_GET_DATE_TOOLTIP'] = 'Renvoie la date et l\'heure formatées dans une chaîne de caractères.';

// Turtle blocks.
Blockly.Msg['TURTLE_DIRECTION_TITLE'] = '%1 de %2';
Blockly.Msg['TURTLE_DIRECTION_FORWARD'] = 'avancer';
Blockly.Msg['TURTLE_DIRECTION_BACKWARD'] = 'reculer';
Blockly.Msg['TURTLE_DIRECTION_TOOLTIP'] = 'Déplacer en spécifiant la direction et la distance.';
Blockly.Msg['TURTLE_TURN_TITLE'] = 'tourner à %1 de %2°';
Blockly.Msg['TURTLE_TURN_RIGHT'] = 'droite ↻';
Blockly.Msg['TURTLE_TURN_LEFT'] = 'gauche ↺';
Blockly.Msg['TURTLE_TURN_TOOLTIP'] = 'Tourner en précisant la valeur de l\'angle.';
Blockly.Msg['TURTLE_GOTO_TITLE'] = 'aller à la position x %1 y %2';
Blockly.Msg['TURTLE_GOTO_TOOLTIP'] = 'Aller à une postition à partir de l\'abscisse et l\'ordonnée.';
Blockly.Msg['TURTLE_CIRCLE_TITLE'] = 'dessiner un cercle de rayon %1';
Blockly.Msg['TURTLE_CIRCLE_TOOLTIP'] = 'Créer un cercle en spécifiant le rayon.';
Blockly.Msg['TURTLE_ARC_TITLE'] = 'dessiner un arc de cercle de rayon %1 et d\'angle %2°';
Blockly.Msg['TURTLE_ARC_TOOLTIP'] = 'Créer un arc cercle en spécifiant le rayon et l\'angle.';
Blockly.Msg['TURTLE_WRITE_TITLE'] = 'écrire %1 de taille %2';
Blockly.Msg['TURTLE_WRITE_TOOLTIP'] = 'Écrire un texte en spécifiant la taille.';
Blockly.Msg['TURTLE_FILL_TITLE'] = 'remplir avec la couleur %1';
Blockly.Msg['TURTLE_FILL_TOOLTIP'] = 'Remplir le tracé avec une couleur.';
Blockly.Msg['TURTLE_SHAPE_TITLE'] = 'choisir la forme %1';
Blockly.Msg['TURTLE_SHAPE_TURTLE'] = 'tortue 🐢';
Blockly.Msg['TURTLE_SHAPE_CIRCLE'] = 'cercle ⚫';
Blockly.Msg['TURTLE_SHAPE_CLASSIC'] = 'classique ➤';
Blockly.Msg['TURTLE_SHAPE_SQUARE'] = 'carré ⬛';
Blockly.Msg['TURTLE_SHAPE_TRIANGLE'] = 'triangle ▶';
Blockly.Msg['TURTLE_SHAPE_TOOLTIP'] = 'Sélectionner la forme du curseur.';
Blockly.Msg['TURTLE_COLOR_TITLE'] = 'définir le tracé de couleur %1 largeur %2';
Blockly.Msg['TURTLE_COLOR_TOOLTIP'] = 'Sélectionner la couleur et la largeur du trait.';
Blockly.Msg['TURTLE_PEN_TITLE'] = '%1 le crayon';
Blockly.Msg['TURTLE_PEN_TOOLTIP'] = 'Lever ou poser le crayon qui trace le trait.';
Blockly.Msg['TURTLE_PEN_UP'] = 'lever';
Blockly.Msg['TURTLE_PEN_DOWN'] = 'poser';
Blockly.Msg['TURTLE_VISIBILITY_TITLE'] = '%1 la tortue';
Blockly.Msg['TURTLE_VISIBILITY_TOOLTIP'] = 'Rendre visible ou non la tortue.';
Blockly.Msg['TURTLE_VISIBILITY_SHOW'] = 'voir';
Blockly.Msg['TURTLE_VISIBILITY_HIDE'] = 'cacher';
Blockly.Msg['TURTLE_STAMP_TITLE'] = 'tamponner la tortue';
Blockly.Msg['TURTLE_STAMP_TOOLTIP'] = 'Imprime la forme du curseur à la position actuelle.';
Blockly.Msg['TURTLE_SPEED_TITLE'] = 'définir la vitesse %1';
Blockly.Msg['TURTLE_SPEED_TOOLTIP'] = 'Sélectionner la vitesse de la tortue.';
Blockly.Msg['TURTLE_RESET_TITLE'] = 'réinitialiser le dessin';
Blockly.Msg['TURTLE_SCREEN_SETUP_TITLE'] = 'taille du canvas %1 x %2';
Blockly.Msg['TURTLE_SCREEN_SETUP_TOOLTIP'] = 'Définir la taille du canvas.';
Blockly.Msg['TURTLE_SCREEN_COLOR_TITLE'] = 'couleur de fond du canvas %1'; 
Blockly.Msg['TURTLE_SCREEN_COLOR_TOOLTIP'] = 'Définir la couleur de fond du canvas.'; 
Blockly.Msg['TURTLE_COLOR'] = 'set color %1';
Blockly.Msg['TURTLE_WIDTH'] = 'définir la largeur %1';
Blockly.Msg['TURTLE_FILLCOLOR'] = 'remplir avec la couleur %1';
Blockly.Msg['TURTLE_FILLBEGIN'] = 'commencer le remplissage';
Blockly.Msg['TURTLE_FILLEND'] = 'terminer le remplissage';

// Numpy blocks.
Blockly.Msg['NUMPY_ARANGE_TITLE'] = 'tableau de %1 à %2 par pas de %3';
Blockly.Msg['NUMPY_ARANGE_TOOLTIP'] = 'Retourne un tableau numpy à 1 dimension de la valeur minimale à la valeur maximale avec un pas.';
Blockly.Msg['NUMPY_LINSPACE_TITLE'] = 'tableau de %1 à %2 avec %3 valeurs';
Blockly.Msg['NUMPY_LINSPACE_TOOLTIP'] = 'Retourne un tableau numpy à 1 dimension de la valeur minimale à la valeur maximale avec x valeurs';
Blockly.Msg['NUMPY_TABLE_WITH_SHAPE_TITLE'] = 'tableau de taille %1 * %2 avec l\'élément %3';
Blockly.Msg['NUMPY_TABLE_WITH_SHAPE_TOOLTIP'] = 'Initialise un tableau de taille i*j rempli avec l\'élément choisi.';
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_TOOLTIP'] = 'Créer un tableau avec les éléments choisis.';
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_INPUT_TITLE'] = 'create table with';
Blockly.Msg['NUMPY_CREATE_TABLE_WITH_INPUT_TOOLTIP'] = 'Create a table with any number of items.';
Blockly.Msg['NUMPY_CREATE_TABLE_EMPTY_TITLE'] = 'tableau vide';
Blockly.Msg['NUMPY_CREATE_TABLE_EMPTY_TOOLTIP'] = 'Retourne un tableau, de longueur 0, contenant aucune donnée.';
Blockly.Msg['NUMPY_SQUARE_MATRIX_TITLE'] = 'matrice avec les éléments';
Blockly.Msg['NUMPY_SQUARE_MATRIX_TOOLTIP'] = 'Permet d\'initialiser une matrice de tout type et de dimensions 2 à 10.';
Blockly.Msg['NUMPY_SIZESHAPE_TITLE'] = '%1 de %2';
Blockly.Msg['NUMPY_SIZESHAPE_TOOLTIP'] = 'Renvoie la taille ou les dimensions d\'un tableau numpy.';
Blockly.Msg['NUMPY_SIZE'] = 'taille';
Blockly.Msg['NUMPY_SHAPE'] = 'dimensions';
Blockly.Msg['NUMPY_GET_ELEMENT_MATRIX_TITLE'] = 'obtenir l\'élément [%1, %2] du tableau %3';
Blockly.Msg['NUMPY_GET_ELEMENT_MATRIX_TOOLTIP'] = 'Obtenir l\'élément [i,j] d\'un tableau numpy.';
Blockly.Msg['NUMPY_GET_ELEMENT_LIST_TITLE'] = 'obtenir l\'élément [%1] du tableau %2';
Blockly.Msg['NUMPY_GET_ELEMENT_LIST_TOOLTIP'] = 'Obtenir l\'élément [i] d\'un tableau numpy.';

// Graph blocks.
Blockly.Msg['GRAPH_PLOT_TITLE'] = 'tracer le graphe %1 abscisses %2 ordonnées %3';
Blockly.Msg['GRAPH_PLOT_TOOLTIP'] = 'Tracer un graphique dans la console Python en fournissant des tableaux de valeurs en abscisses et en ordonnées.';
Blockly.Msg['GRAPH_SCATTER_TITLE'] = 'tracer le nuage de points %1 abscisses %2 ordonnées %3';
Blockly.Msg['GRAPH_SCATTER_TOOLTIP'] = 'Tracer un graphique dans la console Python en fournissant des tableaux de valeurs en abscisses et en ordonnées.';
Blockly.Msg['GRAPH_BAR_TITLE'] = 'tracer le graphe en barres %1 abscisses %2 ordonnées %3';
Blockly.Msg['GRAPH_BAR_TOOLTIP'] = 'Tracer un graphique dans la console Python en fournissant des tableaux de valeurs en abscisses et en ordonnées.';
Blockly.Msg['GRAPH_HIST_TITLE'] = 'tracer l\'histogramme %1 abscisses %2 ordonnées %3';
Blockly.Msg['GRAPH_HIST_TOOLTIP'] = 'Tracer un graphique dans la console Python en fournissant des tableaux de valeurs en abscisses et en ordonnées.';
Blockly.Msg['GRAPH_SETLABEL_TITLE'] = 'définir titre %1 xlabel %2 ylabel %3';
Blockly.Msg['GRAPH_SETLABEL_TOOLTIP'] = 'Définir le titre du graphique et les labels des abscisses et ordonnées.';
Blockly.Msg['GRAPH_LEGEND_TITLE'] = 'afficher une legende %1 position %2';
Blockly.Msg['GRAPH_LEGEND_TOOLTIP'] = 'Affiche une légende';
Blockly.Msg['GRAPH_SHOW_TITLE'] = 'afficher graphique';
Blockly.Msg['GRAPH_SHOW_TOOLTIP'] = 'Afficher le graphique dans la console Python.';
Blockly.Msg['GRAPH_SUBPLOT_TITLE'] = 'subplot %1 ligne(s) %2 colonne(s) %3 index %4';
Blockly.Msg['GRAPH_SUBPLOT_TOOLTIP'] = 'Diviser un graphique.';
Blockly.Msg['GRAPH_GRID_TITLE'] = 'afficher la grille';
Blockly.Msg['GRAPH_GRID_TOOLTIP'] = 'Affiche une grille sur le graphique';
Blockly.Msg['GRAPH_TEXT_TITLE'] = 'afficher un texte %1 pos. x %2 pos. y %3 texte %4';
Blockly.Msg['GRAPH_TEXT_TOOLTIP'] = 'Afficher un texte sur le graph';
Blockly.Msg['GRAPH_SET_TITLE'] = 'define title %1';
Blockly.Msg['GRAPH_SET_X_TITLE'] = 'xlabel %1';
Blockly.Msg['GRAPH_SET_Y_TITLE'] = 'ylabel %1';
Blockly.Msg['GRAPH_CREATE_PLOT_TITLE'] = 'créer un graphique avec %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_CREATE_SCATTER_TITLE'] = 'créer un graphique en nuage de points avec %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_CREATE_BAR_TITLE'] = 'créer un diagramme à barres avec %1 xaxis %2 yaxis %3';
Blockly.Msg['GRAPH_PLOT'] = 'afficher le graphique';

// AI IMAGE
Blockly.Msg['VITTAIA_LOAD_MODEL_TITLE'] = '%1 charger le modèle d\'IA images %2';
Blockly.Msg['VITTAIA_LOAD_MODEL_TOOLTIP'] = 'Charge le modèle d\'IA images passé en paramètre. Le modèle par défaut est celui de la reconnaissance de chats et de chiens. Vous pouvez générer un nouveau modèle à partir de l\'interface "Entraînement IA" de Vittascience disponible dans la rubrique Programmer.';
Blockly.Msg['VITTAIA_LOAD_LOCAL_MODEL_TITLE'] = '%1 charger le modèle d\'IA images local';
Blockly.Msg['VITTAIA_LOAD_LOCAL_MODEL_TOOLTIP'] = 'Charge le modèle d\'images déjà entraîné situé dans la mémoire locale du navigateur';
Blockly.Msg['VITTAIA_LOAD_MODEL_DEFAULT_TITLE'] = '%1 charger le modèle d\'IA images %2';
Blockly.Msg['VITTAIA_LOAD_MODEL_DEFAULT_TOOLTIP'] = 'Charge un modèle d\'images déjà entraîné. Changer de modèle en utilisant l\'option.';
Blockly.Msg['VITTAIA_MODEL_DOGS_CATS'] = "Chiens et Chats";
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_WEBCAM_TITLE'] = '%1 lancer la détection sur l\'image de la caméra';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_WEBCAM_TOOLTIP'] = 'Effectue les prédictions du modèle de l\'image de la caméra. Une prediction comporte 2 éléments : la classe et le taux de confiance.';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_FILE_TITLE'] = '%1 lancer la détection sur l\'image importée';
Blockly.Msg['VITTAIA_MAKE_PREDICTIONS_FILE_TOOLTIP'] = 'Effectue les prédictions du modèle de l\'image importée. Une prediction comporte 2 éléments : la classe et le taux de confiance.';
Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE'] = '%1 classe détectée';
Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TOOLTIP'] = 'Retourne la classe associée au modèle ayant la plus haute taux de confiance de détection.';
Blockly.Msg['VITTAIA_GET_CONFIDENCE_RATE_TITLE'] = '%1 taux de confiance';
Blockly.Msg['VITTAIA_GET_CONFIDENCE_RATE_TOOLTIP'] = 'Retourne le plus haut taux de confiance parmi les prédictions.';
Blockly.Msg['VITTAIA_GET_PREDICTIONS_TITLE'] = '%1 prédictions';
Blockly.Msg['VITTAIA_GET_PREDICTIONS_TOOLTIP'] = 'Retourne un tableau contenant l\'ensemble des prédictions du modèle.';
Blockly.Msg['VITTAIA_DETECT_CLASS_TITLE'] = '%1 si la classe %2 %3 détectée alors';
Blockly.Msg['VITTAIA_IS'] = "est";
Blockly.Msg['VITTAIA_ISNOT'] = "n'est pas";
Blockly.Msg['VITTAIA_DETECT_CLASS_TOOLTIP'] = 'Lance la détection en utilisant une image de la caméra ou une image importée pour faire une prédiction vérifie si la classe indiqué dans le bloc est détectée.';
Blockly.Msg['VITTAIA_IMAGE_UPLOADED_TITLE'] = '%1 image importée';
Blockly.Msg['VITTAIA_IMAGE_UPLOADED_TOOLTIP'] = 'Permet de télécharger une image à partir de l\'ordinateur pour être ensuite testée par le modèle en lançant une détection. Appuyer sur l\'icône \'Upload\' du bloc pour ajouter l\'image.';
Blockly.Msg['VITTAIA_WEBCAM_CAPTURE_TITLE'] = '%1 [caméra] capture';
Blockly.Msg['VITTAIA_WEBCAM_CAPTURE_TOOLTIP'] = 'Permet d\'effectuer une capture avec la caméra de l\'ordinateur.';
Blockly.Msg['VITTAIA_WEBCAM_LIST_AVAILABLES_TITLE'] = '%1 [caméra] liste des caméras disponibles';
Blockly.Msg['VITTAIA_WEBCAM_LIST_AVAILABLES_TOOLTIP'] = 'Permet de lister l\'ensemble des caméras disponibles sur l\'ordinateur.';
Blockly.Msg['VITTAIA_WEBCAM_INIT_TITLE'] = '%1 [caméra] sélectionner la caméra %2';
Blockly.Msg['VITTAIA_WEBCAM_INIT_TOOLTIP'] = 'Permet d\'initialiser la caméra de l\'ordinateur (par défaut 0).';
Blockly.Msg['VITTAIA_WEBCAM_REFRESH_TITLE'] = '%1 [caméra] raffraichir la caméra';
Blockly.Msg['VITTAIA_WEBCAM_REFRESH_TOOLTIP'] = 'Permet de raffraichir la fenêtre de la caméra.';
// AI POSTURE
Blockly.Msg['VITTAIA_INIT_MODEL_POSTURE_TITLE'] = '%1 initialiser le modèle de posture';
Blockly.Msg['VITTAIA_INIT_MODEL_POSTURE_TOOLTIP'] = 'Initialise le modèle de posture. Le modèle par défaut est celui de la reconnaissance de postures humaines. Vous pouvez générer un nouveau modèle à partir de l\'interface "Entraînement IA" de Vittascience disponible dans la rubrique Programmer.';
Blockly.Msg['VITTAIA_LOAD_POSTURE_MODEL_TITLE'] = '%1 charger le modèle de posture %2';
Blockly.Msg['VITTAIA_LOAD_POSTURE_MODEL_TOOLTIP'] = 'Charge le modèle passé en paramètre';
Blockly.Msg['VITTAIA_INIT_WEBCAM_TITLE'] = '%1 initialiser la caméra';
Blockly.Msg['VITTAIA_INIT_WEBCAM_TOOLTIP'] = 'Initialise la caméra sélectionnée.';
Blockly.Msg['VITTAIA_POSTURE_MAKE_PREDICTIONS_TITLE'] = '%1 lancer la prediction sur l\'image de la caméra';
Blockly.Msg['VITTAIA_POSTURE_MAKE_PREDICTIONS_TOOLTIP'] = 'Effectue les prédictions du modèle de posture de la webcam. Une prediction comporte 2 éléments : la classe et la probabilité.';
Blockly.Msg['VITTAIA_INIT_POSTURE_WEBCAM_TITLE'] = '%1 [caméra] initialiser la caméra';
Blockly.Msg['VITTAIA_INIT_POSTURE_WEBCAM_TOOLTIP'] = 'Permet d\'initaliser la caméra (par defaut sur le port 0)';
// AI SOUND
Blockly.Msg['VITTAIA_LOAD_SOUND_MODEL_TITLE'] = '%1 sélectionner et initialiser le modèle %2';
Blockly.Msg['VITTAIA_LOAD_SOUND_MODEL_TOOLTIP'] = 'Charge le modèle passé en paramètre';
Blockly.Msg['VITTAIA_INIT_MICROPHONE_TITLE'] = '%1 initialiser le micro';
Blockly.Msg['VITTAIA_INIT_MICROPHONE_TOOLTIP'] = 'Permet d\'initaliser le micro de l\'ordinateur';
Blockly.Msg['VITTAIA_MAKE_SOUND_PREDICTIONS_TITLE'] = '%1 lancer la détection sur le son du micro';
Blockly.Msg['VITTAIA_MAKE_SOUND_PREDICTIONS_TOOLTIP'] = 'Lance la détection en utilisant un son du microphone pour faire une prédiction';
Blockly.Msg['VITTAIA_LIST_MICROPHONES_TITLE'] = '%1 lister les micros';
Blockly.Msg['VITTAIA_LIST_MICROPHONES_TOOLTIP'] = 'Permet de lister l\'ensemble des microphones disponibles';
Blockly.Msg['VITTAIA_LIST_MICRTEXT_OPHONES_TOOLTIP'] = 'Permet de lister l\'ensemble des microphones disponibles';
// AI TEXT
Blockly.Msg['VITTAIA_INIT_TEXT_AI_TITLE'] = '%1 initialiser le modèle de text';
Blockly.Msg['VITTAIA_INIT_TEXT_AI_TOOLTIP'] = 'Initialise le modèle de text. Le modèle par défaut est celui de la reconnaissance de texte. Vous pouvez générer un nouveau modèle à partir de l\'interface "Entraînement IA" de Vittascience disponible dans la rubrique Programmer.';
Blockly.Msg['VITTAIA_INIT_DISCUSSION_TITLE'] = '%1 initialiser la discussion';
Blockly.Msg['VITTAIA_INIT_DISCUSSION_TOOLTIP'] = 'Initialise la discussion avec l\'IA. Le modèle par défaut est celui de la reconnaissance de texte. Vous pouvez générer un nouveau modèle à partir de l\'interface "Entraînement IA" de Vittascience disponible dans la rubrique Programmer.';
Blockly.Msg['VITTAIA_LOAD_DISCUSSION_TITLE'] = '%1 sélectionner la conversation %2';
Blockly.Msg['VITTAIA_LOAD_DISCUSSION_TOOLTIP'] = 'Charge la conversation passé en paramètre';
Blockly.Msg['VITTAIA_MODEL_TEXT_PREDICT_TITLE'] = '%1 lance la prédiction du text %2';
Blockly.Msg['VITTAIA_MODEL_TEXT_PREDICT_TOOLTIP'] = 'Permet de faire la prediction du text';
Blockly.Msg['VITTAIA_GET_AI_MESSAGE_TITLE'] = 'afficher la réponse d\'IA';
Blockly.Msg['VITTAIA_GET_AI_MESSAGE_TOOLTIP'] = 'Affiche la résponsed\'IA';
Blockly.Msg['VITTAIA_SET_RANDOMNESS_TITLE'] = '%1 définir le taux d\'aléatoire %2 %';
Blockly.Msg['VITTAIA_SET_RANDOMNESS_TOOLTIP'] = 'Permet de définir le taux d\'aléatoire de prediction';
Blockly.Msg['VITTAIA_SET_MODEL_IA_TITLE'] = '%1 définir le model d\'IA %2';
Blockly.Msg['VITTAIA_SET_MODEL_IA_TOOLTIP'] = 'Permet de définir le modéle d\'IA';

Blockly.Msg['VITTAIA_TEXT_MODEL_GPT-3.5_TURBO'] = 'gpt-3.5';
Blockly.Msg['VITTAIA_TEXT_MODEL_LLAMA_3.1'] = 'llama-v3.1';
Blockly.Msg['VITTAIA_TEXT_MODEL_LLAMA_3.3'] = 'llama-v3.3';
Blockly.Msg['VITTAIA_TEXT_MODEL_GPT_4'] = 'gpt-4o';
Blockly.Msg['VITTAIA_TEXT_MODEL_MIXTRAL'] = 'mixtral';
Blockly.Msg['VITTAIA_TEXT_MODEL_GPT_MINI'] = 'gpt-4o-mini';

// Vittaia blocks. AST Python <-> Blocks
Blockly.Msg['VITTAIA_INIT_MODEL'] = '%1 initialiser le modèle';
Blockly.Msg['VITTAIA_INIT_WEBCAM'] = '%1 initiliser la caméra';
Blockly.Msg['VITTAIA_INIT_SOUND'] = '%1 initialiser le modèle de son';
Blockly.Msg['VITTAIA_INIT_MICRO_VAR'] = '%1 initialiser la variable du micro';
Blockly.Msg['VITTAIA_INIT_MICRO'] = '%1 initialiser le micro';
Blockly.Msg['VITTAIA_SELECT_CAMERA'] = '%1 sélectionner la caméra %2';
Blockly.Msg['VITTAIA_DISPLAY_CAMERA'] = '%1 rafraîchir la caméra';
Blockly.Msg['VITTAIA_CAPTURE'] = 'image de la caméra';
Blockly.Msg['VITTAIA_PREDICT'] = '%1 lancer la détection sur %2';
Blockly.Msg['VITTAIA_GET_BEST_PROBALITY_CLASS'] = Blockly.Msg['VITTAIA_GET_HIGHEST_PROBABILITY_CLASS_TITLE'];

// Exception
Blockly.Msg['EXCEPTION_RAISE_TOOLTIP'] = 'soulever une exception';
Blockly.Msg['EXCEPTION_EXCEPTION_TOOLTIP'] = 'créer une exception';
Blockly.Msg['EXCEPTION_TYPE_TOOLTIP'] = 'Tout les type d\'exceptions possible';
Blockly.Msg['EXCEPTION_TRY_TOOLTIP'] = 'Exécute un bloc de code et permet d\'exécuter un bloc de code en cas d\'exception';

// Other Block
Blockly.Msg['OTHER_AST_RAW'] = 'Code non traduit';