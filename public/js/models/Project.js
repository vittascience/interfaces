const Project = function (id, name, description, refUser, dateCreated, dateUpdated, code,shared,fullName){
    this.id = id;
    this.name = name;
    this.description = description;
    this.refUser = refUser;
    this.dateCreated = dateCreated;
    this.dateUpdated = dateUpdated;
    this.code = code;
    this.shared = shared;
    this.fullName = fullName;
};

function arrayToProject (array){
    return new Project (
        array.id,
        array.name,
        array.desc,
        array.userRef,
        array.dateCreated,
        array.dateUpdated,
        array.code,
        array.shared,
        array.fullName
    );

}