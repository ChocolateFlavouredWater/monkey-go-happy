 
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var ground;
var score=0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //createCanvas(600,600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.x = ground.width/2;
  
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();

  
}


function draw() {
  background("white");
  
  text("Score: "+ score,320,30);
  
  
  
  if (gameState === PLAY){
    spawnBananas();
    spawnObstacles();
    
    
    ground.velocityX = -4;
    
    if(ground.x < 0){
       ground.x = ground.width/2;
    }
      if(keyDown("space")){
    monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(monkey.isTouching(foodGroup)){
      score = score+1;   
      foodGroup.destroyEach();
    }
    
    if(monkey.isTouching(obstacleGroup)){  
       foodGroup.veloctyX = 0;
     
      ground.velocityX = 0;
      monkey.velocityY = 0
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     foodGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);  
     textSize(30);
     text("You lost!", 150,200);
     
  }
}

  
  
  monkey.collide(ground);  

  drawSprites();
}

function spawnBananas(){
  if (frameCount%120 === 0){
    banana = createSprite(600,250,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.velocityX = -5;
    banana.scale =0.1;
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount%300  === 0){
    obstacle = createSprite(800,325,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.scale =0.15;
    obstacleGroup.add(obstacle);
  }
}