function fextends(child,parent){
    child.prototype = new parent();
    child.prototype.constructor = child;
}