/* **************************
Human Tester v1.0
Developed by Aining Wang
************************** */
function setup() {
  createCanvas(500, 500);
}

/* **************************
Variables defination 
************************** */
var backgroundImage;
var balloonClickSound;
var missClickSound;
var gameoverSound;
var score = 0;
var heart = 3;

var gameStatus = 0;

var ballX = 250;
var ballY = 250;
var ballSize = 30;

var timer = 100;
var timerSpeed = 100;

/* **************************
Functions defination 
************************** */
//recurring run in backgroud
function draw(){
  
  loadBackgroundPicture();
  clickToStart();
  
  if(gameStatus == 1){
    inGame();
  }else if(gameStatus == 2){
    gameOver();
  }else{
    startPage();
  }
  
}

// preload he backgroud image, useful resources by p5.js
function preload() {
  backgroundImage = loadImage('background.jpg');
  soundFormats("wav");
  ballClickSound = loadSound("ballClick.wav");
  missClickSound = loadSound("missClick.wav");
  gameoverSound = loadSound("gameover.wav");
}

// loadBackgroundPicture
function loadBackgroundPicture(){
  image(backgroundImage, 0, 0, 500, 500);
}

// draw the start page
function startPage(){
  fill(225);
  textSize(15);
  text("Score: " + score, 400, 25);
  text("Heart: " + heart, 400, 45);
  textSize(25);
  text("Click to start", 180, 150);
  textSize(15);
  text("Use mouse to click stars", 165, 200);
}

function clickToStart(){ 
  if(mouseIsPressed){
    gameStatus = 1;
  }
}

// function during Game
function inGame(){
  fill(225);
  textSize(15);
  text("Score: " + score, 400, 25);
  text("Heart: " + heart, 400, 45);
  //text("timerSpeed:" + timerSpeed, 400, 60);
  //text("Time: " + timer, 400, 80);
  
  fill(214,236,240);
  // ellipse(ballX, ballY, ballSize);
  star(ballX, ballY, ballSize, ballSize / 2, 5);
  
  timer--;
  speedControl();
  checkMissClick();
  checkGameOver();
}

// mousePressed function by p5.js
function mousePressed(){
  let distance = dist(ballX, ballY, mouseX, mouseY);
  if(distance <= ballSize){
    score++;
    ballY=random(50, 350);
    ballX=random(50, 350);
    timer=timerSpeed;
    ballClickSound.play();
  }
}

function speedControl(){
  if(score >= 5 && score < 10){
    timerSpeed = 80;
  }else if(score >= 10 && score < 20){
    timerSpeed = 60;
  }else if(score >= 20){
    timerSpeed = 40;       
  }else{
    timerSpeed = 100;
  }
}

function checkMissClick(){
  if(timer < 0){
    heart--;
    ballY=random(50, 350);
    ballX=random(50, 350);
    timer=timerSpeed;
    missClickSound.play();
  }
}

function checkGameOver(){
  if(heart <= 0){
    gameStatus = 2;
  }
}

function gameOver(){
  gameoverSound.play();
  textSize(30);
  text("Game Over", 175, 150);
  text("Your Score is: " + score, 150, 250);
  if(score < 5){
    text("You are BAD", 165, 350);
  }else if(score >= 5 && score < 25){
    text("You are in AVERAGE", 120, 350); 
  }else{
    text("You are EXCELLENT", 120, 350);
  }
  noLoop();
}

// example on p5.js: https://p5js.org/examples/form-star.html
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
