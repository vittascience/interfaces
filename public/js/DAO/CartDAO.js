function getCartContent (callback){
    let request = getAjaxRequest();
    request.onreadystatechange = function (){
        if (this.readyState === XMLHttpRequest.DONE){
            let json = parseJson(this.responseText);
            if (json){
                callback(json);
            }
        }
    };
    request.open("GET","/services/get/getCartContent.php");
    request.send();
}

function updateItem (ref , quantity, callback){
    let request = getAjaxRequest();
    let formData = new FormData();
    formData.append("ref",ref.toString());
    formData.append("quantity",quantity.toString());

    request.onreadystatechange = function (){
        if (this.readyState === XMLHttpRequest.DONE){
            let jsonRes = JSON.parse(request.responseText);
            callback(jsonRes);
        }
    };

    request.open("POST","/services/post/updateCartItem.php");
    request.send(formData);
}