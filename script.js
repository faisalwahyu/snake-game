const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let direction = "right";
let food = generateFood();
let score = 0;
let level = 1;
let speed = 300;
let countdown = 3;

// Countdown before game starts
document.getElementById("countdown").innerText = countdown;
let countdownInterval = setInterval(() => {
    countdown--;
    document.getElementById("countdown").innerText = countdown;
    if (countdown === 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerText = "";
        gameLoop();
    }
}, 1000);

function gameLoop() {
    moveSnake();
    if (checkCollision()) return resetGame();
    if (eatFood()) updateFood();
    
    draw();
    setTimeout(gameLoop, speed);
}

function moveSnake() {
    let head = { ...snake[0] };
    if (direction === "right") head.x += 20;
    if (direction === "left") head.x -= 20;
    if (direction === "up") head.y -= 20;
    if (direction === "down") head.y += 20;
    snake.unshift(head);
    snake.pop();
}

function checkCollision() {
    let head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) return true;
    }
    return false;
}

function eatFood() {
    let head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        snake.push({});
        score++;
        if (score % 5 === 0) levelUp();
        document.getElementById("score").innerText = score;
        return true;
    }
    return false;
}

function levelUp() {
    level++;
    speed -= 20;
    document.getElementById("level").innerText = level;
}

function updateFood() {
    food = generateFood();
}

function generateFood() {
    let x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
    let y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
    return { x, y };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 20, 20));

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 20, 20);
}

function resetGame() {
    alert("Game Over!");
    snake = [{ x: 200, y: 200 }];
    direction = "right";
    food = generateFood();
    score = 0;
    level = 1;
    speed = 300;
    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
    gameLoop();
}

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction !== "down") direction = "up";
    if (e.key === "ArrowDown" && direction !== "up") direction = "down";
    if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (e.key === "ArrowRight" && direction !== "left") direction = "right";
});

function changeDirection(dir) {
    if (dir === "up" && direction !== "down") direction = "up";
    if (dir === "down" && direction !== "up") direction = "down";
    if (dir === "left" && direction !== "right") direction = "left";
    if (dir === "right" && direction !== "left") direction = "right";
}
