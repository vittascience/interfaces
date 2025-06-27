const Resource = function   (id,
                            name,
                            description,
                            filename,
                            originalFilename,
                            userRef,
                            userNames,
                            dateInserted,
                            grade,
                            subject,
                            type,
                            thumbnail,
                            pages){
    this.id = id;
    this.name = name;
    this.description = description;
    this.filename = filename;
    this.originalFilename = originalFilename;
    this.userRef = userRef;
    this.userNames = userNames;
    this.dateInserted = dateInserted;
    this.grade = grade;
    this.subject = subject;
    this.type = type;
    this.thumbnail = thumbnail;
    this.pages = pages;
};

function arrayToResource(array){
    return new Resource(
        array.id,
        array.name,
        array.description,
        array.filename,
        array.originalFilename,
        array.userRef,
        array.userNames,
        array.dateInserted,
        array.grade,
        array.subject,
        array.type,
        array.thumbnail,
        array.pages
    );
}