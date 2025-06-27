'use strict';

/**
 * Workspace LineFinder: LineFinder
 * Copyright 2024 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is Vittascience's intellectual property.
 * 
 * This class purpose to provide the line finders simulation in the Robot Simulator.
 */

/** 
 * @fileoverview WorkSpace LineFinderSimulator
 * @author: leomlr (Léo Meillier)
 */

/**
 * @class LineFinderSimulator
 */
class LineFinderSimulator {
    /**
     * Creates an instance of LineFinder.
     * @private
     */
    constructor(robot, slots, surface, callback) {
        this.robot = robot;
        this.slots = slots ? slots : [];
        this.initialSurface = surface ? surface : 3;
        this.surface = this.initialSurface;
        for (const slot of this.slots) {
            slot.position = [];
        }
        this.exportValue = callback;
    };
    /**
     * Set position of line finders.
     * @public
     * @returns {void}
     */
    updatePosition() {
        for (const sensor of this.slots) {
            if (!sensor.slotPos) {
                sensor.slotPos = [...sensor.initial];
            }
            sensor.position = getPointAfterRotation(
                this.robot.rotationCenter.x + sensor.slotPos[0],
                this.robot.rotationCenter.y + sensor.slotPos[1],
                degToRad(this.robot.angle), this.robot.rotationCenter.x, this.robot.rotationCenter.y
            );
        }
    };
    /**
     * Measure RGB value of line finder position and send value with callback function.
     * @public
     * @returns {void}
     */
    measure() {
        for (const sensor of this.slots) {
            try {
                sensor.rgb = RobotSimulator.ctx.getImageData(
                    sensor.position[0],
                    sensor.position[1],
                    this.surface,
                    this.surface
                ).data;
                sensor.value = RGBtoGrayscale(sensor.rgb[0], sensor.rgb[1], sensor.rgb[2]);
                this.exportValue(sensor.value, sensor.id, [sensor.rgb[0], sensor.rgb[1], sensor.rgb[2]]);
            } catch (e) {
                console.error(e);
            }
        }
    };
    /**
     * Draw line finder sensors in Robot simulator with disks.
     * @public
     * @returns {void}
     */
    draw() {
        for (const sensor of this.slots) {
            const color = [sensor.value, sensor.value, sensor.value];
            CanvasUtils.drawDisk(sensor.position[0], sensor.position[1], this.surface, color);
        }
    };
    /**
     * Resize disks of line finder sensors by changing the surface and the slot position.
     * @public
     * @param {int} zoom 
     * @returns {void}
     */
    resize(zoom) {
        this.surface *= zoom;
        for (const sensor of this.slots) {
            if (!sensor.slotPos) {
                sensor.slotPos = [...sensor.initial];
            }
            sensor.slotPos[0] *= zoom;
            sensor.slotPos[1] *= zoom;
        }
    };
    /**
     * Reset line finder sensors.
     * @public
     * @returns {void}
     */
    reset() {
        this.surface = this.initialSurface;
        for (const sensor of this.slots) {
            sensor.position = [];
            delete sensor.slotPos;
        }
    };

}