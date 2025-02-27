const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let score = 0;
let level = 1;
let speed = 200; // Start speed (higher = slower)
let gameInterval;

let food = {
    x: Math.floor((Math.random() * canvas.width) / box) * box,
    y: Math.floor((Math.random() * canvas.height) / box) * box
};

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key === 38 && direction !== "DOWN") direction = "UP";
    else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key === 40 && direction !== "UP") direction = "DOWN";
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "lime";
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, box, box);
    });

    let newX = snake[0].x;
    let newY = snake[0].y;

    if (direction === "LEFT") newX -= box;
    if (direction === "UP") newY -= box;
    if (direction === "RIGHT") newX += box;
    if (direction === "DOWN") newY += box;

    if (newX === food.x && newY === food.y) {
        document.getElementById("eatSound").play();
        score += 10;
        document.getElementById("score").innerText = score;

        if (score % 50 === 0) { // Level up every 50 points
            level++;
            document.getElementById("level").innerText = level;
            speed *= 0.9; // Increase speed (reduce interval)
            clearInterval(gameInterval);
            gameInterval = setInterval(draw, speed);
        }

        food = {
            x: Math.floor((Math.random() * canvas.width) / box) * box,
            y: Math.floor((Math.random() * canvas.height) / box) * box
        };
    } else {
        snake.pop();
    }

    const newHead = { x: newX, y: newY };

    if (newX < 0 || newX >= canvas.width || newY < 0 || newY >= canvas.height || snake.some(segment => segment.x === newX && segment.y === newY)) {
        resetGame();
        return;
    }

    snake.unshift(newHead);
}

function resetGame() {
    document.getElementById("gameOverSound").play();
    setTimeout(() => {
        score = 0;
        level = 1;
        speed = 200;
        document.getElementById("score").innerText = score;
        document.getElementById("level").innerText = level;

        snake = [{ x: 200, y: 200 }];
        direction = "RIGHT";

        food = {
            x: Math.floor((Math.random() * canvas.width) / box) * box,
            y: Math.floor((Math.random() * canvas.height) / box) * box
        };

        startGame(); // Restart game after game over
    }, 500);
}

function countdown(callback) {
    let count = 3;
    document.getElementById("countdown").innerText = count;
    
    let interval = setInterval(() => {
        count--;
        if (count === 0) {
            document.getElementById("countdown").innerText = "Go!";
        } else if (count < 0) {
            document.getElementById("countdown").innerText = "";
            clearInterval(interval);
            callback(); // Start game
        } else {
            document.getElementById("countdown").innerText = count;
        }
    }, 1000);
}

function startGame() {
    clearInterval(gameInterval);
    countdown(() => {
        gameInterval = setInterval(draw, speed);
    });
}

startGame();
