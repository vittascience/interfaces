const ProjectHandler = function () {
    this.id = null;
    this.name = null;
    this.description = null;
    this.shared = null;

    this.opened = false;

    this.OPENING_FLAG = false;

    this.blocklyWorkspace = null;
    this.editor = null;
};