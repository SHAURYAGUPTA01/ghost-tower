  var towerImg, tower;
  var doorImg, door, doorsGroup;
  var climberImg, climber, climbersGroup;
  var ghost, ghostImg;
  var invisibleBlockGroup, invisibleBlock;
  var gameState = "play";

  function preload(){
    towerImg = loadImage("tower.png");
    doorImg = loadImage("door.png");
    climberImg = loadImage("climber.png");
    ghostImg = loadImage("ghost-standing.png");
    spookySound = loadSound("spooky.wav");
  }

  function setup() {
    createCanvas(600, 600);
    tower = createSprite(300,300);
    tower.addImage("tower",towerImg);
    tower.velocityY = 1;

    ghost = createSprite(100,300);
    ghost.addImage("myGhost",ghostImg);
    ghost.scale = 0.4;
    doorsGroup = new Group();
    climbersGroup = new Group();
    invisibleBlockGroup = new Group();
  }

  function draw() {
    background(200);
    if(gameState === "play"){
      if(ghost.isTouching(climbersGroup)){
        ghost.velocityY = 0;
      }
      if(keyDown("space")){
        ghost.velocityY = -5;
        
      }
      if(keyDown("left")){
        ghost.x += -5;
        
        }
        if(keyDown("right")){
        ghost.x += 5;
        
        }
      ghost.velocityY += 0.8;
      
        if(ghost.y > 610 || ghost.isTouching(invisibleBlockGroup)){
          ghost.destroy();
          gameState = "end";
          spookySound.play()
        }
        
        spawnDoors();
    }
    drawSprites();
      if(gameState === "end"){
      textSize(40);
      fill("yellow");
      stroke("orange");
      strokeWeight(6);
      text("GAME OVER",200,300);
      }     
      if(tower.y > 400){
        tower.y = 300;
      } 
  }

  function spawnDoors(){
    if(frameCount % 200 === 0){
    door = createSprite(100,10);
    door.x = Math.round(random(100,500));
    door.addImage("myDoor",doorImg);
    door.velocityY = 1;
    door.lifetime = 600;
    doorsGroup.add(door);
    ghost.depth = door.depth;
    ghost.depth += 1; 

    climber = createSprite(100,80);
    climber.x = door.x;

    climber.addImage("myClimber",climberImg);
    climber.velocityY = 1;
    climber.lifetime = 600;
    climbersGroup.add(climber);


    invisibleBlock = createSprite(100,90);
    invisibleBlock.x = climber.x;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    }
  }