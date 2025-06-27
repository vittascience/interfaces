export function setupConsoleSimulationAccessibility(){
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const buttonId = button.id;
            const includedButtons = ["simulator_faster", "simulator_slower", "simulator_step_forward"]
            if(includedButtons.includes(buttonId)){
              setTimeout(()=>{
                button.focus();
              }, 10)
            }
        }
    });
  });
}