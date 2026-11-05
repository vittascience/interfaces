// SkyKick Evo in the robot simulator (top view, like the Tello): no motors, on each frame of a run the drone of the
// track is placed at the state displayed by the simulated drone (SkykickSimLink.shown()), from the start position and
// angle of the track (dragged by the user).
const Robots = {
  'skykick': {
    CODE_REGEXP: /import skykick/,
    INITIAL_ZOOM: -20, // track about 5 m x 2.8 m around the helipad (each step: 20 cm)
    IMG_LINK: `${_PATH}/skykick/assets/media/simulator/robot/skykick-top.png`,
    IMG_INITIAL_BACKGROUND: "Image_piste_tello.png",
    WIDTH_CM: 35, // cm, a bit bigger than the real drone to be seen on the track
    RATIO: 1,
    POSITIVE_Y_TO_UP: true,
    POSITIVE_X_TO_RIGHT: true,
    AXIS_UNIT: 'cm',
    INITIAL_POS_PERCENT: {
      x: 50, // %: helipad of the track
      y: 50, // %
    },
    WHEELS_X_POSITION: 0, // cm
    WHEELS_CENTER_RADIUS: 1, // cm, any value: the wheels of the simulator never turn (angle computed from it)
    image: null,
    rotationCenter: {
      x: 0,
      y: 0
    },
    angle: 0, // °
    previousAngle: 0, // °
    angularSpeed: 0, // rad.s-1
    motorLeft: {
      speed: 0,
      dir: 0
    },
    motorRight: {
      speed: 0,
      dir: 0
    },
    altitude: 0, // m
    color: '#2c7fae',

    // called on each frame of a run
    getMotorSpeed: function () {
      this.motorLeft.speed = 0;
      this.motorRight.speed = 0;
      const state = SkykickDroneAPI.sim.shown();
      const pxPerMeter = 100 * RobotSimulator.width.px / RobotSimulator.width.cm;
      const startAngle = parseInt(SimulatorLS.getData(RobotSimulator.currentRobotName, 'initialAngles')) || 0;
      const a = degToRad(startAngle);
      const start = RobotSimulator.Axis.position;
      // canvas: y down, angles clockwise; drone: x forward, y left, heading counterclockwise
      // the edges of the track stop the drone of the view (its position stays given by the front view)
      const r = this.size.width / 2;
      const inTrack = (v, max) => Math.max(r, Math.min(v, max - r));
      this.rotationCenter.x = inTrack(start.x + (state.x * Math.cos(a) + state.y * Math.sin(a)) * pxPerMeter, RobotSimulator.canvas.width);
      this.rotationCenter.y = inTrack(start.y + (state.x * Math.sin(a) - state.y * Math.cos(a)) * pxPerMeter, RobotSimulator.canvas.height);
      this.angle = startAngle - state.heading;
      this.altitude = state.z;
      // higher: closer to the viewer
      this.image.width = this.image.height = this.size.width * (1 + Math.min(state.z, 3) * 0.15);
    },

    // front of the drone and its altitude
    drawObjects: function () {
      const ctx = RobotSimulator.ctx;
      const r = this.image.width / 2;
      ctx.save();
      ctx.translate(this.rotationCenter.x, this.rotationCenter.y);
      ctx.rotate(degToRad(this.angle));
      ctx.fillStyle = '#ff9403';
      ctx.beginPath();
      ctx.moveTo(r + 10, 0);
      ctx.lineTo(r + 2, -6);
      ctx.lineTo(r + 2, 6);
      ctx.fill();
      ctx.restore();
      if (this.altitude > 0.05) {
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        const above = this.rotationCenter.y - r - 8;
        ctx.fillText(`${this.altitude.toFixed(1)} m`, this.rotationCenter.x, above > 14 ? above : this.rotationCenter.y + r + 16);
      }
    }
  }
};
