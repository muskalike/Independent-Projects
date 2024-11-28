const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Canvas dimensions
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Ball properties
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballRadius = 8;
let ballSpeedX = 2;
let ballSpeedY = 2;

// Player paddle properties
const paddleWidth = 10;
const paddleHeight = 80;
let playerY = (canvasHeight - paddleHeight) / 2;

// Movement variables for keyboard control
let upPressed = false;
let downPressed = false;

// Game score
let score = 0;

// Keyboard controls for the paddle
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        upPressed = true;
    } else if (e.key === "ArrowDown") {
        downPressed = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") {
        upPressed = false;
    } else if (e.key === "ArrowDown") {
        downPressed = false;
    }
});

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Move paddle based on keyboard input
    if (upPressed) {
        playerY -= 5; // Move up
        if (playerY < 0) playerY = 0; // Prevent moving above canvas
    }
    if (downPressed) {
        playerY += 5; // Move down
        if (playerY > canvasHeight - paddleHeight) playerY = canvasHeight - paddleHeight; // Prevent moving below canvas
    }

    // Draw left wall (always active)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 10, canvasHeight);

    // Draw player paddle
    ctx.fillStyle = "white";
    ctx.fillRect(canvasWidth - paddleWidth, playerY, paddleWidth, paddleHeight);

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
    if (ballY + ballRadius > canvasHeight || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY; // Reverse direction
    }

    // Ball collision with the left wall
    if (ballX - ballRadius < 10) {
        ballSpeedX = -ballSpeedX; // Reverse direction
    }

    // Ball collision with the player paddle
    if (
        ballX + ballRadius > canvasWidth - paddleWidth && // Near paddle
        ballY > playerY &&
        ballY < playerY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX; // Reverse direction
        score++; // Increment score when the ball hits the paddle
    }

    // Reset ball position if it goes past the paddle
    if (ballX + ballRadius > canvasWidth) {
        ballX = canvasWidth / 2;
        ballY = canvasHeight / 2;
        ballSpeedX = 3;
        ballSpeedY = 3;
        score = 0; // Reset the score
    }

    // Draw score
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, canvasWidth / 2 - 40, 30);

    requestAnimationFrame(gameLoop); // Keep the game running
}

// Start the game loop
gameLoop();

