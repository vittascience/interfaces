import { setupCheckboxAccessibility } from './checkbox.js';
import { setupTextInputAccessibility } from './text-input.js';

export function handleSetupSpecialTagsAccessibility(){
  setupCheckboxAccessibility();
  setupTextInputAccessibility();
}