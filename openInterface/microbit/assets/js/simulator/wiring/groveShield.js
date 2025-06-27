let groveShield = {
    IMG_LINK: WiringSimulator.PATH_MEDIA + "/shields/microbit-grove-shield.svg",
    SIZE: {
      w: 140, // px
      h: 137 // px
    },
    INITIAL_POS_PERCENT: {
      x: 50, // %
      y: 35, // %
    },
    x: null, // px
    y: null, // px
    isDraggable: false,
    portOrientation: 'horizontal',
    wireSide: 'bottom',
    pins: {
      0: {
        x: -15,
        y: 58,
      },
      1: {
        x: 9,
        y: 58,
      },
      2: {
        x: 35,
        y: 58,
      },
      I2C: {
        0: {
          x: -42,
          y: 58,
        }
      }
    },
  };