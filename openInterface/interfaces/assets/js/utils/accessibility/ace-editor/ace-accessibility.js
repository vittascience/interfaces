import { forceFocusOnClassName } from "/public/js/utils/debug/focus-debug.js";
import { setupDuplicateLineCommand } from "./commands/index.js";
import { updateAriaLiveRegion, forceAriaLiveAnnouncement } from "../utils/live-region.js";
import { onChangeCursor } from "./utils/cursor-utils.js";

let isAceEditorLoaded = false;

export const editorState = {
    aceEditor: null,
    aceSession: null,
    aceSelection: null,
    setAceEditor(editor) {
        this.aceEditor = editor;
    },
    setAceSelection(selection) {
        this.aceSelection = selection;
    },
    setAceSession(session) {
        this.aceSession = session;
    },
}

export function initAceEditorAccessibility() {
    const aceInputSelector = ".ace_text-input";
  
    initializeEditorObserver(aceInputSelector);
    setupEditorEvents();
    observeAceEditorFocus();
    enableCursorBlinkingOnFocus();
}


function observeAceEditorFocus() {
  const observer = new MutationObserver(() => {
      const aceEditors = document.querySelectorAll('.ace_editor.ace-tm');
      const msg = "Éditeur de code actif, appuyez sur Entrée pour y entrer";

      aceEditors.forEach(editor => {
          if (editor.dataset.eventsAttached) return;
          editor.dataset.eventsAttached = "true"; 

          editor.addEventListener("focus", () => {
            updateAriaLiveRegion(msg);
          });

          editor.addEventListener("blur", () => {
            forceAriaLiveAnnouncement(msg);
          });
      });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}



/**
 * Initializes a MutationObserver to monitor when the Ace editor container is added to the DOM
 * and sets up necessary attributes and events.
 */
function initializeEditorObserver(aceInputSelector) {
    const observer = new MutationObserver((mutations) => {
        const contentCode = document.querySelector('#content_code');
        if (!isAceEditorLoaded && contentCode) {
            observer.disconnect();
            isAceEditorLoaded = true;
            configureEditorContainer(contentCode, aceInputSelector);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}


/**
 * Configures the editor container for accessibility and sets up keyboard event handling.
 */
function configureEditorContainer(contentCode, aceInputSelector) {
    //console.log("configureEditorContainer")
    contentCode.setAttribute("tabindex", 0);

    contentCode.addEventListener('keydown', (event) => {
        handleEditorContainerKeydown(event, contentCode, aceInputSelector);
    });
}


/**
 * Sets up events and custom behavior for the Ace editor instance.
 */
function setupEditorEvents() {
    const editor = Main.getCodeEditor();

    if (!editor) {
        console.error("Editor instance could not be retrieved.");
        return;
    }

    document.addEventListener("onFocusChanged", (event) => {
        const leaveEditorPopup = $('#mixed-popup-leave-editor');
        if (leaveEditorPopup.css('display') !== 'none') {
            const eventDetails = event.detail;
            
            const newFocusedElement = document.getElementById(eventDetails.id) || 
                                      document.querySelector(`.${eventDetails.classList.join('.')}`);
            
            const isFocusInEditor = newFocusedElement &&
                (eventDetails.id === "content_code" || eventDetails.classList.includes("ace_text-input"));
    
            if (!isFocusInEditor) {
                toggleLeaveEditorPopup(false);
            }
        }
    });

    setTimeout(() => {
        editorState.setAceEditor(Main.getCodeEditor().container);
        editorState.setAceSession(editorState.aceEditor.getSession());
        editorState.setAceSelection(editorState.aceEditor.getSelection());
        setupEditorShortcuts();

        editorState.aceSelection.on("changeCursor", onChangeCursor);
        window.addEventListener("python_translation_error", onPythonTranslationError);
        window.addEventListener("python_evaluation_error", onPythonEvaluationError);
        window.addEventListener("python_evaluation_success", onPythonEvaluationSuccess);
    }, 1_000);
}

function setupEditorShortcuts() {
    setupDuplicateLineCommand(editorState.aceEditor, editorState.aceSession);
}

function onPythonTranslationError(event) {
    // console.log("onPythonTranslationError: ",event.detail.message);    
    updateAriaLiveRegion("Erreur: "+event.detail.message);
}

function onPythonEvaluationError(event) {
    // console.log("onPythonEvaluationError: ",event.detail.message);
    updateAriaLiveRegion("Erreur Python: "+event.detail.message);
}

function onPythonEvaluationSuccess(event) {
    // console.log("onPythonEvaluationSuccess: ",event.detail.message);
    updateAriaLiveRegion(event.detail.message);
}

function handleEditorContainerKeydown(event, contentCode, aceInputSelector) {
    const aceTextInput = document.querySelector(aceInputSelector);

    if (aceTextInput && aceTextInput.contains(event.target)) {
        contentCode.setAttribute("aria-label", "Éditeur de code actif");
    }

    if (event.key === "Enter") {
        const isFocusInEditor = aceTextInput && aceTextInput.contains(document.activeElement);
        if (!isFocusInEditor)
            event.preventDefault();
        forceFocusOnClassName(aceInputSelector);
        toggleLeaveEditorPopup(true);
    }

    if (event.key === "Tab" && aceTextInput) {
        aceTextInput.setAttribute("tabindex", -1);
    }
}

function toggleLeaveEditorPopup(show) {
  const leaveEditorPopup = $('#mixed-popup-leave-editor');
  if (show === true) {
      if (localStorage.getItem('codeLeaveEditorShortcutPopup') !== null) return;
      leaveEditorPopup.css('display', 'flex');
      leaveEditorPopup.one('click', function () {
          leaveEditorPopup.css('display', 'none');
          localStorage.setItem('codeLeaveEditorShortcutPopup', true);
      });
  } else if (show === false) {
      leaveEditorPopup.css('display', 'none');
  } else {
      const isVisible = leaveEditorPopup.css('display') !== 'none';
      toggleLeaveEditorPopup(!isVisible);
  }
}


function enableCursorBlinkingOnFocus() {
  const textInput = document.querySelector(".ace_text-input");
  if (!textInput) {
      // console.error("Élément .ace_text-input non trouvé.");
      return;
  }

  textInput.addEventListener("focus", function () {
      // console.log("Focus sur .ace_text-input");
      const editor = Main.getCodeEditor();
      if (!editor || !editor.container || !editor.container.renderer || !editor.container.renderer.$cursorLayer) {
          // console.error("Impossible d'accéder à l'éditeur ou au curseur.");
          return;
      }

      editor.container.renderer.$cursorLayer.setBlinking(true);
  });
}