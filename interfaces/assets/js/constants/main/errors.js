const GENERAL_ERROR = "Something went wrong.";
const VISITOR_PROJECTS_SIZE_ERROR = "You cannot save more than 10 projects.";
const USER_PROJECTS_SIZE_ERROR = "You cannot save more than 1000 projects.";
const DELETE_OPENED_PROJECT_ERROR = "You cannot delete an  opened project.";
const PROJECT_NAME_ERROR = "Project name does not respect the pattern.";

const AJAX_SERVER_ERROR = {
    'fr': 'Le serveur n\'a pas répondu',
    'en': "Server failed to respond"
};
const AJAX_LOCKED = {
    'fr': 'Les appels ajax sont bloqués',
    'en': "Ajax calls are locked"
};

const GET_PUBLIC_PROJECTS_ERROR = "PUBLIC_PROJECTS_ERROR";
const GET_USER_PROJECTS_ERROR = "USER_PROJECTS_ERROR";
const GET_LINK_PROJECT_ERROR = "This link is corrupted, we opened for you a new project.";
const UPDATE_PROJECT_ERROR = "UPDATE_PROJECT_ERROR";
const SAVE_PROJECT_ERROR = "SAVE_PROJECT_ERROR";
const DELETE_PROJECT_ERROR = "DELETE_PROJECT_ERROR"; //already tons of error handling
const GENERATE_LINK_PROJECT_ERROR = "GENERATE_LINK_PROJECT_ERROR";
const SAVE_TIMEOUT = 2000;