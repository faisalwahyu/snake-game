const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const countdownElement = document.getElementById("countdown");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = generateFood();
let direction = "RIGHT";
let score = 0;
let level = 1;
let speed = 200; // Slow speed initially
let gameRunning = false;

// Countdown before game starts
function startGame() {
    let count = 3;
    countdownElement.innerText = count;
    let countdown = setInterval(() => {
        count--;
        countdownElement.innerText = count;
        if (count === 0) {
            clearInterval(countdown);
            countdownElement.innerText = "";
            gameRunning = true;
            gameLoop();
        }
    }, 1000);
}

startGame();

// Generate random food position
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
    };
}

// Change direction
document.addEventListener("keydown", (event) => {
    if ((event.keyCode === 37 || event.keyCode === 65) && direction !== "RIGHT") direction = "LEFT";
    if ((event.keyCode === 38
