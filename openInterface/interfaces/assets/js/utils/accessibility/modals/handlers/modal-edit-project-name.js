import { registerModalAccessibility } from "../registry.js";

function bindEditProjectModal(modal) {
    const cancelButton = modal.querySelector("#modal-edit-project-btn-edit");
    cancelButton.parentElement.removeAttribute("tabindex")
}

function unbindEditProjectModal(modal) {}

registerModalAccessibility('modal-edit-project-name', bindEditProjectModal, unbindEditProjectModal);