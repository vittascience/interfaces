const Experiment = function (id,
    name,
    user,
    type,
    longitude,
    latitude,
    beginDate,
    endDate,
    insertDate,
    isDeleted,
    description,
    anectode,
    advice,
    pictures,
    videos,
    classes,
    location,
    thumbs,
    fullDate,
    school,
    isLive=false,
    receivedAt) {
    this.id = id;
    this.name = name;
    this.user = user;
    this.type = type;
    this.longitude = longitude;
    this.latitude = latitude;
    this.beginDate = beginDate;
    this.endDate = endDate;
    this.insertDate = insertDate;
    this.isDeleted = isDeleted;
    this.description = description;
    this.anectode = anectode;
    this.advice = advice;
    this.pictures = pictures;
    this.videos = videos;
    this.classes = classes;
    this.location = location;
    this.thumbs = thumbs;
    this.fullDate = fullDate;
    this.school = school;
    this.isLive = isLive,
    this.receivedAt = receivedAt;
};

function arrayToExperiment(array, receivedAt) {
    var expObj = new Experiment(
        array.id,
        array.name,
        array.user,
        array.type,
        array.longitude,
        array.latitude,
        array.beginDate,
        array.endDate,
        array.insertDate,
        array.isDeleted,
        array.description,
        array.anectode,
        array.advice,
        array.pictures,
        array.videos,
        array.classes,
        array.location,
        array.picturesThumbs,
        array.fullDate,
        array.school,
        array.isLive,
        receivedAt
    );
    return expObj;
}

Experiment.prototype.classesToString = function () {
    if (this.classes === false)
        return "Aucune";
    var str = "";
    for (var i = 0; i < this.classes.length; i++) {
        str += this.classes[i][0] + " (" + allGrades[this.classes[i][1]] + ")";
        if (i !== this.classes.length - 1)
            str += ", ";
    }
    return str;
};