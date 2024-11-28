// script.js
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Paddle settings
const paddleWidth = 10;
const paddleHeight = 80;
const paddleSpeed = 8;

// Ball settings
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 8;
let ballSpeedX = 4;
let ballSpeedY = 4;

// Player paddles
let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;

// Key press states
let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;

// Event listeners for keyboard input
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key === "ArrowUp") upPressed = true;
    if (e.key === "ArrowDown") downPressed = true;
    if (e.key === "w") wPressed = true;
    if (e.key === "s") sPressed = true;
}

function keyUpHandler(e) {
    if (e.key === "ArrowUp") upPressed = false;
    if (e.key === "ArrowDown") downPressed = false;
    if (e.key === "w") wPressed = false;
    if (e.key === "s") sPressed = false;
}

// Game loop
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = "white";
    ctx.fillRect(10, player1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - 20, player2Y, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    // Ball movement
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (
        ballX - ballRadius < 20 && 
        ballY > player1Y && 
        ballY < player1Y + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }
    if (
        ballX + ballRadius > canvas.width - 20 &&
        ballY > player2Y &&
        ballY < player2Y + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball reset if it goes off-screen
    if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }

    // Move player paddles
    if (upPressed && player2Y > 0) player2Y -= paddleSpeed;
    if (downPressed && player2Y < canvas.height - paddleHeight) player2Y += paddleSpeed;
    if (wPressed && player1Y > 0) player1Y -= paddleSpeed;
    if (sPressed && player1Y < canvas.height - paddleHeight) player1Y += paddleSpeed;

    requestAnimationFrame(draw);
}

// Start the game loop
draw();
