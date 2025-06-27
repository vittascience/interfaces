var Teacher = function (id,firstname,surname,bio,picture,teacherData){
    User.apply(this,[id,firstname,surname,bio,picture]);
    this.subject = teacherData["subject"];
    this.school = teacherData["school"];
    this.grade = teacherData["grade"];
};

fextends(Teacher,User);

function arrayToTeacher(array){
    var user = new Teacher(array["id"],array["firstname"],array["surname"],array["bio"],array["picture"],array ["teacherData"]);
    return user;
}