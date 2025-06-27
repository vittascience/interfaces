'use strict';

/**
 * Workspace DistanceSensor: DistanceSensor
 * Copyright 2023 Vittascience.
 * https://vittascience.com 
 * 
 * Please note that not the entirety of this code is Vittascience's intellectual property.
 * 
 * This class purpose to provide the distance sensors simulation in the Robot Simulator.
 */

/** 
 * @fileoverview WorkSpace DistanceSensorSimulator
 * @author: leomlr (Léo Meillier)
 */

/**
 * @class DistanceSensorSimulator
 */
class DistanceSensorSimulator {
  /**
   * Creates an instance of DistanceSensor.
   * @private
   */
  constructor(robot, slots, lineWidth, blinkerDiameter) {
    this.robot = robot;
    this.ERROR_DX_NUL = 1e-3;
    this.slots = slots ? slots : [];
    this.lineWidth = lineWidth ? lineWidth : 3;
    this.blinkerDiameter = blinkerDiameter ? blinkerDiameter : 30;
    this.sensors = null;
  };

  /**
   * Update sensor position with slot position & define imaginary end point.
   */
  updatePosition() {
    this.sensors = {};
    for (let i = 0; i < this.slots.length; i++) {
      const slot = this.slots[i];
      slot.active = false;
      if (slot.pin) {
        slot.pin = null;
      }
    }
    const modules = Simulator.getSimulatedModules();
    for (let n = 0; n < modules.length; n++) {
      const id = modules[n].id;
      const coreId = id.split('_')[0];
      const pin = id.split('_')[1];
      for (let i = 0; i < this.slots.length; i++) {
        const slot = this.slots[i];
        if (!slot.active) {
          if ((slot.id == coreId) && pin && (slot.pin === null)) {
            // sensor multiple
            this.active(slot, id);
            slot.pin = pin;
            break;
          } else if (slot.id == id) {
            // sensor unique
            this.active(slot, id);
            break;
          }
        }
      }
    }
  };

  /**
   * Link new sensor to robot slot.
   * @param {Object} slot 
   * @param {String} id 
   */
  active(slot, id) {
    if (typeof slot.position == 'undefined') {
      slot.position = [...slot.initial];
    }
    this.sensors[id] = new DistanceSensor(this.robot, id, slot.suffix, slot.angle, slot.position, slot.unit);
    this.sensors[id].init();
    slot.active = true;
  };

  /**
   * Measure distance of the closest point obstacle.
   */
  measure() {
    if (this.sensors) {
      for (const id in this.sensors) {
        const distance = this.sensors[id].measure();
        this.sensors[id].setSliderValue(distance ? distance : 0);
      }
    }
  };

  /**
   * Draw distance sensors.
   */
  draw() {
    if (this.sensors) {
      for (const id in this.sensors) {
        this.sensors[id].drawRange(this.lineWidth);
        this.sensors[id].drawBlinker(this.blinkerDiameter);
      }
    }
  };

  /**
   * Resize distance sensors & set up slot positions.
   * @param {Number} zoom
   */
  resize(zoom) {
    this.lineWidth *= zoom;
    this.blinkerDiameter *= zoom;
    for (var i = 0; i < this.slots.length; i++) {
      if (this.slots[i].active) {
        const slot = this.slots[i];
        if (slot.position) {
          slot.position[0] *= zoom;
          slot.position[1] *= zoom;
        } else {
          slot.initial[0] *= zoom;
          slot.initial[1] *= zoom;
        }
      }
    }
  };

  /**
   * Reset slots parameters to inital.
   */
  reset() {
    const lineWidth = this.robot.distanceSensorsSlots.lineWidth;
    this.lineWidth = lineWidth ? lineWidth : 3;
    const blinkerDiameter = this.robot.distanceSensorsSlots.blinkerDiameter;
    this.blinkerDiameter = blinkerDiameter ? blinkerDiameter : 30;
    for (let i = 0; i < this.slots.length; i++) {
      delete this.slots[i].position;
    }
    // if distance sensor is a grove module there is no function 'initDistanceSensorsSlots' e.g Kitro:bot, BitCar
    if (typeof this.robot.initDistanceSensorsSlots === 'function') {
      this.robot.initDistanceSensorsSlots();
    }
  };
}

/**
 * @class DistanceSensor
 */
class DistanceSensor {
  /**
   * Creates an instance of DistanceSensor.
   * @private
   */
  constructor(robot, id, suffix, angle, initial, unit, round) {
    this.robot = robot;
    this.LASER_LENGTH = 1000;
    this.id = id;
    this.suffix = suffix ? suffix : '';
    this.angle = angle;
    this.initial = initial;
    this.unit = unit ? unit : -2;
    this.round = round ? round : 1;
    this.position = null;
  };

  /**
   * Initialize sensor position and imaginary ending point.
   */
  init() {
    // start point
    const position = {
      x: this.robot.rotationCenter.x + this.initial[0],
      y: this.robot.rotationCenter.y + this.initial[1]
    };
    const sensorPosition = getPointAfterRotation(
      position.x, position.y,
      degToRad(this.robot.angle), this.robot.rotationCenter.x, this.robot.rotationCenter.y
    );
    this.position = { x: sensorPosition[0], y: sensorPosition[1] };
    // end point
    const endPoint = {
      x: position.x + this.LASER_LENGTH * Math.cos(degToRad(-this.angle)),
      y: position.y + this.LASER_LENGTH * Math.sin(degToRad(-this.angle))
    };
    const sensorEndPoint = getPointAfterRotation(
      endPoint.x, endPoint.y,
      degToRad(this.robot.angle), this.robot.rotationCenter.x, this.robot.rotationCenter.y
    );
    this.endPoint = { x: sensorEndPoint[0], y: sensorEndPoint[1] };
  };

  /**
   * Returns measure of sensor.
   * @returns {Number} distance
   */
  measure() {
    // Get intersections
    this.wallIntersection = this._getWallIntersection();
    this.obstacleIntersection = this._getObstacleIntersection(RobotSimulator.Obstacle.obstaclesDB);
    // Calculates distances
    this.wallDistance = this._getDistance(this.position, this.wallIntersection);
    this.obstacleDistance = this._getDistance(this.position, this.obstacleIntersection);
    // Compare wall & obstacle
    if (this.obstacleDistance && this.obstacleDistance < this.LASER_LENGTH && this.obstacleDistance < this.wallDistance) {
      this.endPoint = this.obstacleIntersection;
      return this.obstacleDistance;
    } else if (this.wallDistance < this.LASER_LENGTH && this.wallDistance > 5) {
      this.endPoint = this.wallIntersection;
      return this.wallDistance;
    }
  };

  /**
   * Draw the point detected by the sensor.
   * @param {Number} diameter
   */
  drawBlinker(diameter) {
    RobotSimulator.ctx.save();
    RobotSimulator.ctx.translate(this.endPoint.x, this.endPoint.y);
    RobotSimulator.ctx.drawImage(
      RobotSimulator.img.blinker,
      -(diameter / 2), -(diameter / 2),
      diameter, diameter
    );
    RobotSimulator.ctx.restore();
  };

  /**
   * Draw the line of detection sensor.
   * @param {Number} lineWidth
   */
  drawRange(lineWidth) {
    if (this.id.includes('ultrasonic')) {
      CanvasUtils.drawDashLine(this.position, this.endPoint, 'lightgrey', lineWidth);
    } else {
      CanvasUtils.drawDashLine(this.position, this.endPoint, 'grey', lineWidth);
    }
  };

  /**
   * Update sensor module value in Mosaic of simulator.
   * @param {Number} distance_px
   */
  setSliderValue(distance_px) {
    let value = distance_px / RobotSimulator.canvas.width * RobotSimulator.width.cm / 100;
    if (this.suffix == '_t') {
      value = Math.round(value * 2 * 1e6 / 343);
    } else {
      value /= Math.pow(10, this.unit);
      value = roundFloat(value, this.round);
    }
    const sliderId = '#' + this.id + '_slider' + this.suffix;
    try {
      if ($(sliderId).hasClass("ui-slider")) {
        $(sliderId).slider('value', value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Calculates the distance between the robot and the canvas borders
   * @returns {Object} instersection
   */
  _getWallIntersection() {
    const corners = [
      { x: 0, y: 0 },
      { x: RobotSimulator.canvas.width, y: 0 },
      { x: RobotSimulator.canvas.width, y: RobotSimulator.canvas.height },
      { x: 0, y: RobotSimulator.canvas.height }
    ];
    for (var i = 0; i < corners.length; i++) {
      const instersection = getLinesIntersectionPoint(
        corners[i], i == 3 ? corners[0] : corners[i + 1],
        this.position, this.endPoint
      );
      if (instersection) {
        return instersection;
      }
    }
  };

  /**
   * Calculates the distance between the robot and the closest obstacle.
   * @param {Object} obstacles
   * @returns {Object} instersection
   */
  _getObstacleIntersection(obstacles) {
    let intersections = [];
    for (var i in obstacles) {
      if (obstacles[i].shape == "circle") {
        intersections = intersections.concat(this._getCircleIntersections(obstacles[i]));
      } else {
        intersections = intersections.concat(this._getRectangleIntersections(obstacles[i]));
      }
    }
    if (intersections.length > 0) {
      const distances = intersections.map(point => this._getDistance(this.position, point));
      return intersections[distances.indexOf(Math.min(...distances))];
    }
  };

  /**
   * Calculates the distance between the robot and the closest obstacle.
   * @param {Object} obstacle
   * @returns {Array<Object>} instersections
   */
  _getCircleIntersections(obstacle) {

    // Define circle parameters
    const h = obstacle.x + obstacle.w / 2;
    const k = obstacle.y + obstacle.h / 2;
    const r = obstacle.w / 2;  // Rayon du cercle

    let intersections = [];

    if (this.position && this.wallIntersection) {

      // Define line
      const dx = this.wallIntersection.x - this.position.x;
      const dy = this.wallIntersection.y - this.position.y;
      let m, c; // (as y = m * x + c)

      if (dx !== 0) {
        m = dy / dx;
        c = this.position.y - m * this.position.x;
      }
      // else {
      //   m = 0;
      //   c = dy !== 0 ? this.position.x : 0;
      // }

      const a = m * m + 1;
      const b = 2 * m * (c - k) - 2 * h;
      const cValue = h * h + k * k - r * r + c * c - 2 * c * k;
      const delta = b * b - 4 * a * cValue;

      function getIntersection(f) {
        const x = (-b + f * Math.sqrt(delta)) / (2 * a);
        const y = m * x + c;
        return { x, y };
      };

      if (delta === 0) {
        const pointIntersection = getIntersection(0);
        if (this.isOnLineSegment(pointIntersection)) {
          intersections.push(pointIntersection);
        }
      } else if (delta > 0) {
        const pointIntersection1 = getIntersection(1);
        if (this.isOnLineSegment(pointIntersection1)) {
          intersections.push(pointIntersection1);
        }
        const pointIntersection2 = getIntersection(-1);
        if (this.isOnLineSegment(pointIntersection2)) {
          intersections.push(pointIntersection2);
        }
      }
    }
    return intersections;
  };

  /**
   * Check if intersection point is defined segment.
   * @param {Object} point
   * @returns {Boolean}
   */
  isOnLineSegment(point) {
    return point.x >= Math.min(this.position.x, this.wallIntersection.x)
      && point.x <= Math.max(this.position.x, this.wallIntersection.x)
      && point.y >= Math.min(this.position.y, this.wallIntersection.y)
      && point.y <= Math.max(this.position.y, this.wallIntersection.y);
  };

  /**
   * Calculates the distance between the robot and a rectangle obstacle.
   * @param {Object} obstacle
   * @returns {Array<Object>} intersections
   */
  _getRectangleIntersections(obstacle) {
    const defineIntersection = (xA, yA, xB, yB) => {
      let instersection = null;
      if (this.position, this.wallIntersection) {
        instersection = getLinesIntersectionPoint(
          this.position, this.wallIntersection,
          { x: obstacle.x + xA, y: obstacle.y + yA }, { x: obstacle.x + xB, y: obstacle.y + yB }
        );
      }
      return instersection;
    };

    // Checking intersection with all sides of rectangle
    const intersections = [
      defineIntersection(0, 0, 0, obstacle.h), // left
      defineIntersection(obstacle.w, 0, obstacle.w, obstacle.h), // right
      defineIntersection(0, 0, obstacle.w, 0), // top
      defineIntersection(0, obstacle.h, obstacle.w, obstacle.h) // bottom
    ];
    return intersections.filter(value => value !== null);
  };

  _getDistance(a, b) {
    if (a && b) {
      return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    } else {
      return 0;
    }
  };

}