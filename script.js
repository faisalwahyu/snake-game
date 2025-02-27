const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let score = 0;
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
        document.getElementById("eatSound").play(); // Play eating sound
        score += 10;
        document.getElementById("score").innerText = score;
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
    document.getElementById("gameOverSound").play(); // Play game over sound
    setTimeout(() => {
        score = 0; 
        document.getElementById("score").innerText = score;
        
        snake = [{ x: 200, y: 200 }];
        direction = "RIGHT"; 

        food = {
            x: Math.floor((Math.random() * canvas.width) / box) * box,
            y: Math.floor((Math.random() * canvas.height) / box) * box
        };
    }, 500); // Small delay so sound plays first
}

setInterval(draw, 100);
