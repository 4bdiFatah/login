//  snake-Game //
let board;
let ctx;
let blockSize = 25;
let cols = 20;
let rows = 20;
let score = 0;
let gameOVER = false;
let velocityX = 0;
let velocityY = 0;
let speed = 100;
let gameLoop;

// food-snake
let snake = [[5 * blockSize, 5 * blockSize]];
let foodX = 10 * blockSize;
let foodY = 10 * blockSize;

window.onload = () => {
    board = document.getElementById("board");
    ctx = board.getContext("2d");
    board.width = cols * blockSize;
    board.height = rows * blockSize;

    gameLoop = setInterval(updateSnake, speed);
    addEventListener("keydown", moveSnake);
};

function updateSnake() {
    if (gameOVER) return;

    ctx.clearRect(0, 0, board.width, board.height);

    let headX = snake[snake.length - 1][0] + velocityX;
    let headY = snake[snake.length - 1][1] + velocityY;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, board.width, board.height);

    detectFood(headX, headY);

    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, blockSize, blockSize);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 5, 25);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i][0], snake[i][1], blockSize, blockSize);
    }

    if (headX < 0 || headX >= board.width || headY < 0 || headY >= board.height) {
        endGame();
    }

    for (let i = 0; i < snake.length - 1; i++) {
        if (headX === snake[i][0] && headY === snake[i][1]) {
            endGame();
        }
    }
}

function moveSnake(e) {
    if (e.key === "w" && velocityY !== blockSize) {
        velocityX = 0;
        velocityY = -blockSize;
    } else if (e.key === "s" && velocityY !== -blockSize) {
        velocityX = 0;
        velocityY = blockSize;
    } else if (e.key === "a" && velocityX !== blockSize) {
        velocityX = -blockSize;
        velocityY = 0;
    } else if (e.key === "d" && velocityX !== -blockSize) {
        velocityX = blockSize;
        velocityY = 0;
    }
}

function detectFood(headX, headY) {
    if (headX === foodX && headY === foodY) {
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
        score++;

        if (speed > 40) {
            speed -= 5;
        }

        clearInterval(gameLoop);
        gameLoop = setInterval(updateSnake, speed);
    } else {
        snake.shift();
    }

    snake.push([headX, headY]);
}

function endGame() {
    gameOVER = true;
    alert(`Game Over! Score: ${score}`);
    location.reload();
}
