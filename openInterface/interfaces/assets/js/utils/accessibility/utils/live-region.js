const ariaLiveQueue = [];
let isAnnouncing = false;

/**
 * Updates the aria-live region to announce a message.
 * Messages are queued and announced one at a time to prevent interruptions.
 * @param {string} message - The message to announce.
 * @param {object} options - Configuration options for the aria-live region.
 */
export function updateAriaLiveRegion(message, options = {}) {
  const newMessage = { message, options };
  
  if (options.priority) {
    ariaLiveQueue.unshift(newMessage);
  } else {
    ariaLiveQueue.push(newMessage);
  }
  processAriaLiveQueue();
}
window.updateAriaLiveRegion = updateAriaLiveRegion;


/**
 * Forces an announcement by recreating the `aria-live` region in the DOM.
 * @param {string} message - The message to announce.
 */
export function forceAriaLiveAnnouncement(message) {
  let liveRegion = document.querySelector("#aria-live-region");
  
  if (liveRegion) {
      liveRegion.remove(); // delete previous feedback so we announce the new one
  }

  liveRegion = document.createElement("div");
  liveRegion.id = "aria-live-region";
  liveRegion.setAttribute("aria-live", "assertive");
  liveRegion.setAttribute("role", "status");
  liveRegion.style.position = "absolute";
  liveRegion.style.left = "-9999px";

  document.body.appendChild(liveRegion);

  setTimeout(() => {
      liveRegion.textContent = message;
  }, 100);
}



/**
 * Process the aria-live queue to announce messages one by one.
 */
function processAriaLiveQueue() {
  if (isAnnouncing || ariaLiveQueue.length === 0)
    return;

  isAnnouncing = true;
  const { message, options } = ariaLiveQueue.shift();

  let liveRegion = document.querySelector("#aria-live-region");
  if (!liveRegion) {
    liveRegion = document.createElement("div");
    liveRegion.id = "aria-live-region";
    liveRegion.setAttribute("aria-live", "assertive");
    liveRegion.style.position = "absolute";
    liveRegion.style.left = "-9999px";
    document.body.appendChild(liveRegion);
  }

  if (options.ariaAtomic !== undefined) liveRegion.setAttribute("aria-atomic", options.ariaAtomic);
  if (options.ariaLive !== undefined) liveRegion.setAttribute("aria-live", options.ariaLive);
  if (options.role !== undefined) liveRegion.setAttribute("role", options.role);

  liveRegion.textContent = ""; 
  setTimeout(() => {
    liveRegion.textContent = message;
    const delay = options.delay || 0;
    setTimeout(() => {
        isAnnouncing = false;
        processAriaLiveQueue();
    }, delay);
  }, 200);
}