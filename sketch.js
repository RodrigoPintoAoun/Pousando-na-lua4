let ground;
let lander;
var lander_img;
var bg_img;
var thrust;
var crash;
var landing;
var left_thrust;
var right_thrust;
var obstacle_img;
var lz_img ,lz;
var fuel = 100;
var obstacle;
var isGameOver = false;
var isLanded = false;

var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg_sur.png");
  thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
  crash = loadAnimation("crash1.png", "crash2.png", "crash3.png");
  landing = loadAnimation("landing1.png","landing2.png","normal.png");
  left_thrust = loadAnimation("left_thruster_1.png", "left_thruster_2.png");
  right_thrust = loadAnimation("right_thruster_1.png","right_thruster_2.png");
  obstacle_img = loadImage("obstacle.png");
  lz_img = loadImage("lz.png");

  thrust.playing = true;
  thrust.looping = false;

  crash.looping = false;
  landing.looping = false;
  left_thrust.looping = false;
  right_thrust.looping = false;

}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
  thrust.frameDelay = 5;
  crash.frameDelay = 10;
  left_thrust.frameDelay = 5;
  right_thrust.frameDelay = 5;

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;

  lander.addAnimation("thrusting", thrust);
  lander.addAnimation("landing", landing);
  lander.addAnimation("crashing", crash);
  lander.addAnimation("left", left_thrust);
  lander.addAnimation("right", right_thrust);
  lander.addAnimation("normal", lander_img);
  
  ground = createSprite(500,690,1000,10);
  ground.visible = false;

  lz = createSprite(880,600,50,30);
  lz.addImage(lz_img);
  lz.scale = 0.3;
  lz.debug = false;
  lz.setCollider("rectangle",0,140,400,90)

  obstacle = createSprite(320,530,50,100);
  obstacle.addImage(obstacle_img);
  obstacle.scale = 0.5;
  obstacle.debug = false;
  obstacle.setCollider("rectangle", 0 , 100 , 300 , 200);
  

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Velocidade Vertical: "+round(vy),800,75);
  text("Velocidade horizontal: "+round(vx),800,95);
  text("Combústivel: "+fuel,600,75);
  pop();

  //descida
  vy +=g;
  lander.position.y+=vy;
  lander.position.x+=vx;
  
  var distance = dist(lander.position.x , lander.position.y , lz.position.x , lz.position.y);
  if (distance <= 11 /* &&(vy <2 && vy >-2) &&(vx <2 && vx >-2)*/) {
    vx = 0;
    vy = 0;
    g = 0;
    lander.changeAnimation("landing");
    isLanded = true;
  }


if (lander.collide(ground) == true) {
  lander.changeAnimation("crashing");
  vx = 0;
  vy = 0;
  g = 0;
  fuel = 0;
  isGameOver = true;
  
}
if (lander.collide(obstacle) == true) {
  lander.changeAnimation("crashing");
  vx = 0;
  vy = 0;
  g = 0;
  fuel = 0;
  isGameOver = true;
  
}
if (isGameOver == true) {
  strokeWeight(20);
  fill("red")
  textSize(50);
  textFont("Courier New")
  text("Houston we have a problem!",100,300);

}
if (isLanded == true) {
  fill("white")
  //strokeWeight(10);
  textSize(30);
  textFont("Cascadia Code")
  text("Congratulations you landed the space ship  successfully!",100,300);

}
  drawSprites();
}

function keyPressed(){
  if (keyCode == 87 && fuel > 0 ) {
    vy = -1
    fuel -= 1
    lander.changeAnimation("thrusting");
  }
  if (keyCode == 68 && fuel > 0) {
    vx += 0.5
    fuel -= 1
    lander.changeAnimation("left");
  }
  if (keyCode == 65 && fuel > 0) {
    vx -= 0.5
    fuel -= 1
    lander.changeAnimation("right")
  }
}





