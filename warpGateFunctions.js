//===================================================
// To be refactored jens
//===================================================

function drawWarpGatesOnGameArea() { 
    let xLocalUp = selectedPlanet.xWarpGateUp - me.xGlobal;
    let yLocalUp = selectedPlanet.yWarpGateUp - me.yGlobal;

    let xLocalDown = selectedPlanet.xWarpGateDown - me.xGlobal;
    let yLocalDown = selectedPlanet.yWarpGateDown - me.yGlobal;

    const currentTime = millis();
    const isCooldown = currentTime - me.lastWarpTime < WARP_COOLDOWN_TIME;
    const cooldownRatio = isCooldown ?
        (currentTime - me.lastWarpTime) / WARP_COOLDOWN_TIME : 1;

    push();
    angleMode(RADIANS);
    if (onLocalScreenArea(xLocalUp, yLocalUp)) {
        if (isCooldown) {
            fill('darkblue');
            stroke('white');
            strokeWeight(2);
            circle(GAME_AREA_X + xLocalUp, GAME_AREA_Y + yLocalUp, selectedPlanet.diameterWarpGate);

            noFill();
            stroke('cyan');
            strokeWeight(4);

            arc(
                GAME_AREA_X + xLocalUp,
                GAME_AREA_Y + yLocalUp,
                selectedPlanet.diameterWarpGate * 0.8,
                selectedPlanet.diameterWarpGate * 0.8,
                0,
                cooldownRatio * TWO_PI
            );

        } else {
            fill('cyan');
            stroke('white');
            strokeWeight(2);
            circle(GAME_AREA_X + xLocalUp, GAME_AREA_Y + yLocalUp, selectedPlanet.diameterWarpGate);

        }
        noFill();
        stroke('white');
        circle(GAME_AREA_X + xLocalUp, GAME_AREA_Y + yLocalUp, selectedPlanet.diameterWarpGate * 0.7);

        fill('white');
        noStroke();

        triangle(
            GAME_AREA_X + xLocalUp, GAME_AREA_Y + yLocalUp - 15,
            GAME_AREA_X + xLocalUp - 10, GAME_AREA_Y + yLocalUp + 5,
            GAME_AREA_X + xLocalUp + 10, GAME_AREA_Y + yLocalUp + 5
        );
    }

    if (onLocalScreenArea(xLocalDown, yLocalDown)) {

        if (isCooldown) {
            fill('darkmagenta');
            stroke('white');
            strokeWeight(2);
            circle(GAME_AREA_X + xLocalDown, GAME_AREA_Y + yLocalDown, selectedPlanet.diameterWarpGate);

            noFill();
            stroke('magenta');
            strokeWeight(4);
            arc(
                GAME_AREA_X + xLocalDown,
                GAME_AREA_Y + yLocalDown,
                selectedPlanet.diameterWarpGate * 0.8,
                selectedPlanet.diameterWarpGate * 0.8,
                0,
                cooldownRatio * TWO_PI
            );


        } else {
            fill('magenta');
            stroke('white');
            strokeWeight(2);
            circle(GAME_AREA_X + xLocalDown, GAME_AREA_Y + yLocalDown, selectedPlanet.diameterWarpGate);
        }
        noFill();
        stroke('white');
        circle(GAME_AREA_X + xLocalDown, GAME_AREA_Y + yLocalDown, selectedPlanet.diameterWarpGate * 0.7);

        fill('white');
        noStroke();

        triangle(
            GAME_AREA_X + xLocalDown, GAME_AREA_Y + yLocalDown + 15,
            GAME_AREA_X + xLocalDown - 10, GAME_AREA_Y + yLocalDown - 5,
            GAME_AREA_X + xLocalDown + 10, GAME_AREA_Y + yLocalDown - 5
        );

    }
    pop();
}

function checkCollisionsWithWarpGate() {
    if (!selectedPlanet) {
        return; 
    }

    const currentTime = millis(); 
    const isCooldown = currentTime - me.lastWarpTime < WARP_COOLDOWN_TIME;

    if (isCooldown) {
        return; 
    }
 
//    let di = dist(me.xGlobal + me.xLocal, me.yGlobal + me.yLocal + selectedPlanet.yCropOffset, selectedPlanet.xWarpGateUp, selectedPlanet.yWarpGateUp);
    let di = dist(me.xGlobal + me.xLocal, me.yGlobal + me.yLocal + selectedPlanet.yCropOffset, selectedPlanet.xWarpGateUp, selectedPlanet.yWarpGateUp + selectedPlanet.yCropOffset);
 
//    text("me.xGlobal: " + me.xGlobal + "me.xLocal: " + me.xLocal + " me.yGlobal: " + me.yGlobal + " me.yLocal: " + me.yLocal + "selectedPlanet.yCropOffset: " + selectedPlanet.yCropOffset, 300, 10);
//    text("selectedPlanet.xWarpGateUp: " + selectedPlanet.xWarpGateUp + " selectedPlanet.yWarpGateUp: " + selectedPlanet.yWarpGateUp + " selectedPlanet.yCropOffset: " + selectedPlanet.yCropOffset, 300, 30);
//    text("di: " + di, 300, 40);

    //+ selectedPlanet.yCropOffset
    if (di < selectedPlanet.diameterWarpGate / 2) {
        console.log('Warping up');
        isWarpingUp = true;
        me.lastWarpTime = currentTime;

        if (me.planetIndex === 4) {
            me.planetIndex = 0;
        } else {
            me.planetIndex++;
        }
        console.log("me warping up to planet", me.planetIndex);
//        me.xGlobal = solarSystem.planets[me.planetIndex].xWarpGateUp - me.xLocal;
//        me.yGlobal = solarSystem.planets[me.planetIndex].yWarpGateUp - me.yLocal;
        me.xLocal = solarSystem.planets[me.planetIndex].xWarpGateUp;
        me.yLocal = solarSystem.planets[me.planetIndex].yWarpGateUp;

        return;
    }

    di = dist(me.xGlobal + me.xLocal, me.yGlobal + me.yLocal, selectedPlanet.xWarpGateDown, selectedPlanet.yWarpGateDown);

    if (di < selectedPlanet.diameterWarpGate / 2) {

        isWarpingUp = false;
        me.lastWarpTime = currentTime;

        if (me.planetIndex === 0) {
            me.planetIndex = 4;
        } else {
            me.planetIndex--;
        }
//        me.xGlobal = solarSystem.planets[me.planetIndex].xWarpGateDown - me.xLocal;
//        me.yGlobal = solarSystem.planets[me.planetIndex].yWarpGateDown - me.yLocal;
        me.xLocal = solarSystem.planets[me.planetIndex].xWarpGateDown;
        me.yLocal = solarSystem.planets[me.planetIndex].yWarpGateDown;
        return;
    }
}