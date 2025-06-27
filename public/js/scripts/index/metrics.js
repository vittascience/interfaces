const TIMEOUT = 100;
const ADD = 20;

function isOnScreen(element)
{
    var curPos = element.offset();
    var curTop = curPos.top - $(window).scrollTop();
    var screenHeight = $(window).height();
    return !(curTop > screenHeight);
}

var seen = false;

document.onscroll = function (){
    if(isOnScreen($('.number-metric')) && !seen) {
        seen = true;
        timeout();
    }
};

var increments = 0;

function incrementNumbers (){
    var numbers = document.getElementsByClassName("number-metric");
    for(var i = 0; i < numbers.length; i ++){
        var finalValue = parseInt(numbers[i].getAttribute("data-value"));
        var currentValue = parseInt(numbers[i].innerHTML);
        var toAdd = Math.ceil(parseInt(numbers[i].getAttribute("data-value")) / ADD);
        if ((currentValue + toAdd) >= finalValue)
            numbers[i].innerHTML = (currentValue + (finalValue - currentValue)).toString();
        else
            numbers[i].innerHTML = (currentValue + toAdd).toString();
    }
}

function timeout (){
    setTimeout(function(){
        if (increments <= ADD){
            increments++;
            incrementNumbers();
            timeout();
        }
    },TIMEOUT);
}
