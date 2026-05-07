// share project modal
const specific_modeInterfaceOption = modeInterfaceOption;
const specific_simulatorInterfaceOption = simulatorInterfaceOption;
const specific_consoleInterfaceOption = consoleInterfaceOption;
const specific_toolboxInterfaceOption =
`<div class="d-flex flex-column mw-100">
    <span class="text-center">Toolbox</span>
    <div class="switcher">
        <input type="radio" name="toolboxModeShare" value="vittascience" id="toolboxModeVittascienceShare" class="switcher__input switcher__input--yin" checked="">
        <label for="toolboxModeVittascienceShare" class="switcher__label">Vittascience</label>
    
        <input type="radio" name="toolboxModeShare" value="scratch" id="toolboxModeScratchShare" class="switcher__input switcher__input--middle1">
        <label for="toolboxModeScratchShare" class="switcher__label">Scratch</label>
    
        <input type="radio" name="toolboxModeShare" value="hardware" id="toolboxModeHardwareShare" class="switcher__input switcher__input--right">
        <label for="toolboxModeHardwareShare" class="switcher__label">Texas Instruments</label>


        <span class="switcher__toggle"></span>
    </div>
</div>`;
// settings modal
const specific_toolboxToggler = function() {
    return `<div class="ide-modal-section">
        <h5>${ jsonPath('modals.standard.settings.content.toolbox.title') }</h5>
        <p class="mb-1">${ jsonPath('modals.standard.settings.content.toolbox.notice') }</p>
        <div class="d-flex">
            <div class="switcher">  
    
                <input type="radio" name="toolboxMode" value="vittascience" id="toolboxModeVittascience" class="switcher__input switcher__input--yin" checked="">
                <label for="toolboxModeVittascience" class="switcher__label" >Vittascience</label>
                                    
                <input type="radio" name="toolboxMode" value="scratch" id="toolboxModeScratch" class="switcher__input switcher__input--middle1">
                <label for="toolboxModeScratch" class="switcher__label" >Scratch</label>
                
                <input type="radio" name="toolboxMode" value="hardware" id="toolboxModeHardware" class="switcher__input switcher__input--right">
                <label for="toolboxModeHardware" class="switcher__label">Hardware</label>

                <span class="switcher__toggle"></span>
            </div>
        </div>
    </div>`;
};