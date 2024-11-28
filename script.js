const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Canvas size
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Ball properties
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballRadius = 8;
let ballSpeedX = 3;
let ballSpeedY = 3;

// Player paddle properties
const paddleWidth = 10;
const paddleHeight = 80;
let playerY = (canvasHeight - paddleHeight) / 2;

// Counter
let score = 0;

// Collision cooldown
let ballHitPaddle = false; // Tracks if the ball just hit the paddle

// Detect touch events for paddle dragging
let isDragging = false;

canvas.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const touchY = touch.clientY - canvas.getBoundingClientRect().top;

    // Check if touch starts near the paddle
    if (
        touch.clientX > canvasWidth - paddleWidth &&
        touchY >= playerY &&
        touchY <= playerY + paddleHeight
    ) {
        isDragging = true;
    }
});

canvas.addEventListener("touchmove", (e) => {
    if (isDragging) {
        const touch = e.touches[0];
        const touchY = touch.clientY - canvas.getBoundingClientRect().top;

        // Update the paddle's Y position, keeping it within bounds
        playerY = touchY - paddleHeight / 2;
        if (playerY < 0) playerY = 0;
        if (playerY > canvasHeight - paddleHeight) playerY = canvasHeight - paddleHeight;
    }
    e.preventDefault(); // Prevent scrolling during touch
});

canvas.addEventListener("touchend", () => {
    isDragging = false;
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

    // Draw score
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, canvasWidth / 2 - 40, 30);

    requestAnimationFrame(gameLoop); // Loop the game
}

// Start the game loop
gameLoop();
