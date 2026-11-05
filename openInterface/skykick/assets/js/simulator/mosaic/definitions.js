// Front view of the drone (moved by SkykickSimLink): stage = room above the ground, led = glow of the dome; top view: robot.js
Simulator.Mosaic.BOARD_HEADER = `<div id="skykick-battery" class="text-center fw-bold mt-2" style="display: none;"><i class="fa-solid fa-battery-full"></i> <span></span></div>
<div id="skykick-stage"><div id="skykick-sim"><object id="board-viewer" class="mt-3" style="background-repeat: no-repeat; background-size: contain; background-position: center;" type="image/svg+xml" role="img" aria-labelledby="title-board"></object><div id="skykick-led"></div></div></div>
<div id="skykick-position" class="text-center small"><i class="fa-solid fa-location-arrow"></i> <span></span></div>`;

Simulator.Mosaic.externalLibraries = {
    // js common libraries
    'src/lib/utime.js': Simulator.PATH_LIB_COMMON + 'micropython/time.js',
    // js skykick library
    'src/lib/skykick.js': Simulator.PATH_LIB + 'skykick.js',
};

Simulator.Mosaic.specific = {
    definitions: []
};
