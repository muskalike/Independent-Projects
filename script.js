const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Canvas size
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Ball properties
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballRadius = 8;
let ballSpeedX = 3; // Ball horizontal speed
let ballSpeedY = 3; // Ball vertical speed

// Player paddle properties
const paddleWidth = 10;
const paddleHeight = 80;
let playerY = (canvasHeight - paddleHeight) / 2;
const paddleSpeed = 6;

// Counter
let score = 0;

// Controls
let upPressed = false;
let downPressed = false;

// Collision cooldown
let ballHitPaddle = false; // Tracks if the ball just hit the paddle

// Event listeners for paddle control
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") upPressed = true;
    if (e.key === "ArrowDown") downPressed = true;
});
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") upPressed = false;
    if (e.key === "ArrowDown") downPressed = false;
});

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw wall
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 10, canvasHeight); // Wall on the left side

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
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with the wall
    if (ballX - ballRadius < 10) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball collision with the player paddle
    if (
        ballX + ballRadius > canvasWidth - paddleWidth &&
        ballY > playerY &&
        ballY < playerY + paddleHeight
    ) {
        if (!ballHitPaddle) {
            ballSpeedX = -ballSpeedX;
            score++; // Increment the score
            ballHitPaddle = true; // Set collision cooldown
        }
    } else {
        ballHitPaddle = false; // Reset cooldown if the ball is away from the paddle
    }

    // Player paddle movement
    if (upPressed && playerY > 0) playerY -= paddleSpeed;
    if (downPressed && playerY < canvasHeight - paddleHeight) playerY += paddleSpeed;

    // Draw score
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, canvasWidth / 2 - 40, 30);

    requestAnimationFrame(gameLoop); // Loop the game
}

// Start the game loop
gameLoop();
