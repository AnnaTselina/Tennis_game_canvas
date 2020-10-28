var cnvs = document.getElementById('canvas');
var ctx = cnvs.getContext('2d');

//размеры поля
const W = 760;
const H = 460;
cnvs.width = W;
cnvs.height = H;

//габариты ракетки
const rocW = 10;
const rocH = 85;

//положения ракеток
let firstPaddleY =  (H/2-rocH/2);
let secondPaddleY =  (H/2-rocH/2);

//шаг передвижения ракетки
let step = 2;

//движение
let action = false;
let intervalID;

//мяч выскакивает рандомно
const randomXNumber = () => {
    let num = Math.random();
    if (num < 0.5) {
        num = (-2.5);
    } else {
        num = 2.5;
    }
    return num;}

const randomYNumber = (min, max) => {
    let num = Math.floor(Math.random() * (max - min)) + min;
    if (num === 0) {
        num = 3;
    }
    return num;
}

//координаты мяча
let ballX = W/2;
let ballY = H/2;
let rad = 15; //радиус мяча
let xv = randomXNumber();
let yv = randomYNumber(-2.5, 2.5); //скорость передвижения мяча
let bd = 40; //ширина и высота мяча

draw();

function start(){
    ballReset();
    document.getElementById('startButton').disabled = true;
    intervalID = setInterval(update, 10);
    action = true;
}

function stop() {
    document.getElementById('startButton').disabled = false;
    action = false;
    clearInterval(intervalID);
}

function draw() {
    ctx.fillStyle = '#fbfd99';
    ctx.fillRect(0, 0, W, H);

     //отрисовываем ракетки
     ctx.fillStyle = '#008000';
     ctx.fillRect(0, firstPaddleY, rocW, rocH); //левая ракетка
     ctx.fillStyle = '#0000cc';
     ctx.fillRect((W-rocW), secondPaddleY, rocW, rocH); //правая ракетка

     ctx.fillStyle = '#ff0000';
     ctx.beginPath();
     ctx.arc(ballX, ballY, rad, 0, 2 *Math.PI, false);
     ctx.closePath();
     ctx.fill();
}


function update() {
    draw();

    ballX += xv;
    ballY += yv;

    //проверяем пол
    if ((ballY + rad) > H) {
        yv = -yv;
    }
    //проверяем потолок
    if ((ballY - rad) < 0 ) {
        yv = -yv;
    }
    //проверяем правую стену
    if ((ballX + rad) === (W - rocW) && ballY > secondPaddleY && ballY-rad < secondPaddleY + rocH) {
        xv = -xv;}         
    if (ballX + rad -step > W) {
        xv = 0;
        yv = 0;
        stop();
        document.getElementById('leftPlayer').innerHTML++;
        
    }

    //проверяем левую стену
    if (ballX - rad === rocW && ballY + rad > firstPaddleY && ballY-rad < firstPaddleY + rocH) {
       xv = -xv;
    }
    if (ballX - rad + step < 0) {
        xv = 0;
        yv = 0;
        stop();
        document.getElementById('rightPlayer').innerHTML++;
        
    }
    
    if (action == true) {moveRockets();}
    
}

var UPleftpaddle = false;
var DOWNleftpaddle = false;
var UPrightpaddle = false;
var DOWNrightpaddle = false;


//движение ракеток
function moveRockets() {
    if (UPleftpaddle) {
        firstPaddleY -= step;
        if (firstPaddleY < 0) {firstPaddleY = 0;}
    }
    if (DOWNleftpaddle) {
        firstPaddleY = firstPaddleY + step;
        if (firstPaddleY + rocH > H) {firstPaddleY = H-rocH;}
    }
    if (UPrightpaddle) {
        secondPaddleY -= step;
        if (secondPaddleY < 0) {secondPaddleY = 0;}
    }
    if (DOWNrightpaddle) {
        secondPaddleY = secondPaddleY + step;
        if (secondPaddleY + rocH > H) {secondPaddleY = H - rocH;}
    }
}

document.onkeydown = function(e) {
    if (e.keyCode == 16) {UPleftpaddle = true;}
    if (e.keyCode == 17) {DOWNleftpaddle = true;}
    if (e.keyCode == 38) {UPrightpaddle = true;}
    if (e.keyCode == 40) {DOWNrightpaddle = true;}
}

document.onkeyup = function(e) {
    if (e.keyCode == 16) {UPleftpaddle = false;}
    if (e.keyCode == 17) {DOWNleftpaddle = false;}
    if (e.keyCode == 38) {UPrightpaddle = false;}
    if (e.keyCode == 40) {DOWNrightpaddle = false;}
}

function ballReset() {
    ballX = W/2;
    ballY = H/2;
    xv = randomXNumber();
    yv = randomYNumber(-3, 3);
    firstPaddleY =  (H/2-rocH/2);
    secondPaddleY =  (H/2-rocH/2);
}
