var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey , monkey_running;
var bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var Ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  

  
  
  createCanvas(600, 200);

  Ground = createSprite(200,200,1800,20);
  Ground.x = Ground.width/2;
  
  
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();

  
  score = 0;
  
}


function draw() {
   background("lightblue");
  
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
    
    Ground.velocityX = -6;
      if (Ground.x < 0){
      Ground.x = Ground.width/2;
    }
   
      monkey.collide(Ground);
    
    if(keyDown("space")&& monkey.y >= 135) {
    monkey.velocityY = -15;
    }    
    
      monkey.velocityY = monkey.velocityY + 0.8
    
      spawnObstacles();
      spawnFood();
  
        if(FoodGroup.isTouching(monkey)){
        FoodGroup.destroyEach();
        score = score + 1;  
    }    
    
        if(obstaclesGroup.isTouching(monkey)){
          gameState = END;
        }
  }
       else if (gameState === END) {
      Ground.velocityX = 0;
      monkey.velocityY = 0
         
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);   
         
          textSize(20);
          text("Game Over :(", 280, 100);
          text("Press 'R' to restart", 280, 120);

         if(keyDown("R") && gameState === END ){
           reset();
         }
       }

  drawSprites();
}

function reset(){
  
   gameState = PLAY;
   obstaclesGroup.destroyEach();
   FoodGroup.destroyEach();
   score = 0;
}


function spawnObstacles(){
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(600,150,40,10);
    obstacle.y = Math.round(random(149, 150));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;
    
      
  obstacle.setCollider("rectangle",0,0,300,300);
    //obstacle.debug = true;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //add each cloud to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnFood(){
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,95,40,10);
    banana.y = Math.round(random(95,96));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //banana.debug =true;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}


