export class CommunicationManager {
    constructor(targetWindow) {
        this.targetWindow = targetWindow;
        this.listeners = new Map();
        this.pendingRequests = new Map();
        this._idCounter = 0;
        window.addEventListener('message', this._handleMessage.bind(this));
    }

    sendRequest(type, data) {
        const id = `req_${this._idCounter++}_${Date.now()}`;
        const message = { id, type, data };

        this.targetWindow.postMessage(message);

        return new Promise((resolve, reject) => {
            this.pendingRequests.set(id, { resolve, reject, timeout: setTimeout(() => {
            reject(new Error(`Timeout for request ${id}`));
            this.pendingRequests.delete(id);
            }, 5000) });
        });
    }

    sendEvent(type, data) {
        const message = { type, data };
        this.targetWindow.postMessage(message);
    }

    addListener(type, callback) {
        this.listeners.set(type, callback);
    }

    _handleMessage(event) {
        const message = event.data;
        if (!message || typeof message !== 'object') return;

        if (message.id && this.pendingRequests.has(message.id)) {
            const { resolve, reject, timeout } = this.pendingRequests.get(message.id);
            clearTimeout(timeout);
            this.pendingRequests.delete(message.id);
            if (message.error) {
                reject(new Error(message.error));
            } else {
                resolve(message.data);
            }
        } else if (message.type && this.listeners.has(message.type)) {
            const callback = this.listeners.get(message.type);
            Promise.resolve(callback(message.data))
            .then((responseData) => {
                if (message.id) {
                    event.source.postMessage({ id: message.id, data: responseData }, event.origin);
                }
            })
            .catch((err) => {
                console.error(err);
                if (message.id) {
                    event.source.postMessage({ id: message.id, error: err.message }, event.origin);
                }
            });
        }
    }
}