var User = function (id,firstname,surname,bio,picture){
    this.id = id;
    this.firstname = firstname;
    this.surname = surname;
    this.bio = bio;
    this.picture = picture;
};

function arrayToUser(array){
    var user = new User(array["id"],array["firstname"],array["surname"],array["bio"],array["picture"]);
    return user;
}