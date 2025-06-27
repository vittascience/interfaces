function getAjaxRequest(){
    var request;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return request;
}

XMLHttpRequest.prototype.noCache = function (){
    this.setRequestHeader("Pragma","no-cache");
    this.setRequestHeader("Cache-Control","no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
    this.setRequestHeader("Last-Modified",new Date(0).toDateString());
    this.setRequestHeader("If-Modified-Since",new Date(0).toDateString());
};