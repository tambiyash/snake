
// canvas lets
let context;
let canv;
// lets for velocities of snake
let xVelocity;
let yVelocity;
// lets for snake mouth position (in the middle somewhere)
let playerPosX;
let playerPosY;
// lets for red apple position
let appleX;
let appleY;
// Other snake lets (Starting with a tail length of 5)
let trail;
let tailLength;
// Other playground lets
let gridSize;
let tileCount;
// Snake turn lets
let canTurnHoriz;
let canTurnVer;
let score;
let highestScore = 0;
//Element lets
let scoreEl = document.getElementById("score");
let highestScoreEl = document.getElementById("highest-score")
let startButtonEl = document.getElementById("start-btn");
//Timer lets
let timer;

// Game launcher
window.onload = () => {
    canv = document.getElementById("gc");
    context = canv.getContext("2d");
    context.fillStyle = "#2e2e2e";
    context.fillRect(0, 0, canv.width, canv.height);
    document.addEventListener("keydown", keyPush);
    scoreEl.innerText = "Score: 0";
    highestScoreEl.innerText = "Best Score: " + highestScore;
    startButtonEl.addEventListener("click", startGame);
}

const resetGame = () => {
    xVelocity = 1;
    yVelocity = 0;
    playerPosX = 10;
    playerPosY = 10;
    appleX = 15;
    appleY = 15;
    trail = [];
    tailLength = 6;
    gridSize = 10;
    tileCount = 50;
    canTurnHoriz = true;
    canTurnVer = true;
    score = 0;
}

const startGame = () => {
    resetGame();
    scoreEl.innerText = "Score: 0";
    startButtonEl.style.display = "none";
    timer = setInterval(game, 1000/12);
}

const game = () => {
    playerPosX += xVelocity;
    playerPosY += yVelocity;

    if(playerPosX < 0) {
        playerPosX = tileCount - 1;
    }
    if(playerPosX > tileCount - 1) {
        playerPosX = 0;
    }
    if(playerPosY < 0) {
        playerPosY = tileCount - 1;
    }
    if(playerPosY > tileCount - 1) {
        playerPosY = 0;
    }

    // Color the game screen
    context.fillStyle = "#2e2e2e";
    context.fillRect(0, 0, canv.width, canv.height);

    // Color the snake trail
    context.fillStyle = "#33FF9F";
    for (let i = 0; i < trail.length; i++) {
        context.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
        //Game lost (Snake bites tail)
        if (trail[i].x === playerPosX && trail[i].y === playerPosY) {
            xVelocity = 0;
            yVelocity = 0;
            clearInterval(timer);
            startButtonEl.style.display = "block";
            scoreEl.innerText = "Sorry ! You lost."
        }
    }

    // Moving the snake
    trail.push({ x: playerPosX, y: playerPosY });
    while(trail.length > tailLength) {
        trail.shift();
    }

    // Every apple biting success and new apple at random place
    if (appleX === playerPosX && appleY === playerPosY) {
        tailLength++;
        score += 10;
        scoreEl.innerText = `Score: ${score}`;
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        if (highestScore < score) {
            highestScore = score;
            highestScoreEl.innerText = "Best Score: " + highestScore;
        }
    }

    // Color the apple
    context.fillStyle = "#ffa500";
    context.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2);
    
}
const keyPush = (e) => {
    switch(e.keyCode) {
        case 37:
            if (canTurnHoriz) {
                xVelocity = -1;
                yVelocity = 0;
                canTurnHoriz = false;
                canTurnVer = true;
            }
            break;
        case 38:
            if (canTurnVer) {
                xVelocity = 0;
                yVelocity = -1;
                canTurnHoriz = true;
                canTurnVer = false;
            }
            break;
        case 39:
            if (canTurnHoriz) {
                xVelocity = 1;
                yVelocity = 0;
                canTurnHoriz = false;
                canTurnVer = true;
            }
            break;
        case 40:
            if (canTurnVer) {
                xVelocity = 0;
                yVelocity = 1;
                canTurnHoriz = true;
                canTurnVer = false;
            }
            break;
    }
}
