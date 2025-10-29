// game //
let canvas;
let ctx;
let canvasWidth = 360;
let canvasHeight = 640;
let velocityY = 0;
let gravity = .3;
let gameOver = false;
let pipeGap = 150;
let score = 0;



// bird //
let birdImg = new Image();
birdImg.src = "img/flappybird.png"
let bird = {
    img: birdImg,
    x: canvasWidth / 8,
    y: canvasHeight / 2,
    width: 35,
    height: 35
};



// pipes //
let ArrayPipes = [];
let pipeX = canvasWidth;
let pipeWidth = 64;
let pipeHeight = 512;
let topPipeImg = new Image();
let bottomPipeImg = new Image();
topPipeImg.src = "img/toppipe.png";
bottomPipeImg.src = "img/bottompipe.png";




window.onload = () => {
    canvas = document.getElementById("birdCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    
    requestAnimationFrame(update);
    setInterval(setPipes, 1500);
    addEventListener("keydown", move);
};



function update() {
    if (gameOver) {
        return;
    }; 
    requestAnimationFrame(update);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    bird.y += velocityY;
    velocityY += gravity;
    bird.y = Math.max(bird.y, 0);
    // draw bird //
    ctx.drawImage(bird.img,bird.x,bird.y,bird.width,bird.height);

    // draw pipes //

    for (let i = 0; i < ArrayPipes.length; i++) {
        const pipe = ArrayPipes[i];
        pipe.x -= 2;
        ctx.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);

        

        if (detectCollision(bird,pipe)) {
            gameOver = true;
            alert(`Game-over ${score}`); 
            location.reload(" ");
        };


        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            pipe.passed = true;
            score += 0.5;
        };
    };

    if (bird.y + bird.width > canvas.height){
        gameOver = true;
        alert(`Game-over: Score = ${ + score}`); 
        location.reload(" ");
    };


    ctx.fillStyle = "red";
    ctx.font = "25px Arial";
    ctx.fillText("Score " + score, 5, 45);


    
};


function move(e) {
    if(e.key === " ") {
        velocityY = -5;
    };
};


function setPipes() {
    let randomY = -pipeHeight / 4 - Math.random() * (pipeHeight / 2);

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomY + pipeHeight + pipeGap,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };

    ArrayPipes.push(topPipe,bottomPipe);
};



function detectCollision(a,b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y 
};