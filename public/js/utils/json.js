function parseJson (data){
    try {
        var json = JSON.parse(data);
    } catch (e){
        return false;
    }
    return json;
}