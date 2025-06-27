'use strict';

/**
 * Workspace Recorder: Recorder
 * Copyright 2021 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is Vittascience's intellectual property.
 * 
 * This class purpose to provide a video recorder of JS canvas and screenshot saving.
 */

/** 
 * @fileoverview WorkSpace Recorder 
 * @author: KarlGNassar (Karl Nassar)
 */

/**
 * @class Recorder
 */
class Recorder {

    /**
     * Creates an instance of Recorder.
     * @private
     */
    constructor(canvas, button, fileName = "canvas") {
        this.canvas = canvas;
        this.button = button;
        this.fileName = fileName;
        this.mediaSource = new MediaSource();
        this.mediaRecorder = null;
        this.recordedBlobs = [];
        this.sourceBuffer = null;
        if (!Simulator._has3DRobotSimulator()) this.mediaSource.addEventListener("sourceopen", this.handleSourceOpen, false);
        this.stream = this.canvas.captureStream();
        Recorder.instance = this;
        return this;
    }

    /**
     * Get screenshot of canvas.
     */
    screenshot() {
        if (window.navigator.msSaveBlob) {
            // IE
            window.navigator.msSaveBlob(this.canvas.msToBlob(), this.fileName + "-screenshot.png");
        } else {
            // Chrome, Edge, Firefox ...
            const anchorElement = document.createElement("a");
            document.body.appendChild(anchorElement);
            anchorElement.href = this.canvas.toDataURL(`image/png`);
            anchorElement.download = this.fileName + "-screenshot.png";
            anchorElement.click();
            document.body.removeChild(anchorElement);
        }
    };

    /**
     * Download recorded video.
     */
    download() {
        const blob = new Blob(this.recordedBlobs, { type: "video/mp4" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = this.fileName + "-record.mp4";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    };

    /**
     * Stop recording video.
     */
    stopRecording() {
        this.mediaRecorder.stop();
        this.button.removeClass("active");
    };

    /**
     * Start recording video.
     */
    startRecording() {
        this.button.addClass("active");
        
        let options = { mimeType: "video/webm" };
        this.recordedBlobs = [];
        try {
            this.mediaRecorder = new MediaRecorder(this.stream, options);
        } catch (error0) {
            console.log("Unable to Create MediaRecorder with Options Object: ", error0);
            try {
                options = { mimeType: "video/mp4,codecs=vp9" };
                this.mediaRecorder = new MediaRecorder(this.stream, options);
            } catch (error1) {
                console.log("Unable to create MediaRecorder with options Object: ", error1);
                try {
                    options = "video/vp8"; // Chrome 47
                    this.mediaRecorder = new MediaRecorder(this.stream, options);
                } catch (error2) {
                    alert(
                        "MediaRecorder is not supported by this browser.\n\n" +
                        "Try Firefox 29 or later, or Chrome 47 or later, " +
                        "with Enable experimental Web Platform features enabled from chrome://flags.",
                    );
                    console.error("Exception while creating MediaRecorder:", error2);
                    return;
                }
            }
        }
        this.mediaRecorder.ondataavailable = this.handleDataAvailable;
        this.mediaRecorder.start(100);
    
    };

    /**
     * Handle source recorded.
     * @param {Object} e
     */
    handleSourceOpen(e) {
        this.sourceBuffer = this.mediaSource.addSourceBuffer('video/mp4; codecs="vp8"');
    };

    /**
     * Handle data recorded.
     * @param {Object} e
     */
    handleDataAvailable(e) {
        if (e.data && e.data.size > 0) {
            Recorder.instance.recordedBlobs.push(e.data);
        }
    };

}