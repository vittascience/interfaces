window.lastFocusedElement = null;

/**
 * Some modals are not closed when a button is clicked, so we need to refocus the last focused element. 
 **/
export function registerModalButtons(){
    var buttonIds = [
      'edit-project-name',
    ] 

    buttonIds.forEach(function(buttonId){
      var button = document.getElementById(buttonId);
      if(button){
        button.addEventListener("click", function(){
          window.lastFocusedElement = this;
        });
      }
    });
}


