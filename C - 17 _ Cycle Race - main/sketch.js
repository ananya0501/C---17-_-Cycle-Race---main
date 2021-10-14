// Creating the variables

var path, mainCyclist, player1, player2, player3, gameOver, restart;
var edges;
var invisbleGround1, invisibleGround2;
var pathImg, mainRacerImg1, mainRacerImg2, oppPink1Img, oppPink2Img, oppYellow1Img, oppYellow2Img, oppRed1Img,oppRed2Img, gameOverImg;
var cycleBell;
var pinkCG, yellowCG, redCG;
var distance = 0; 

// Defining the Game States

var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload()
{
  // Loading the animations, images & sound

  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2 = loadAnimation("mainPlayer3.png");
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  gameOverImg = loadImage("gameOver.png");
  cycleBell = loadSound("bell.mp3");
}

function setup()
{
  // Creating the canvas
  createCanvas(1200,300);

  // Making the edges as sprites
  edges = createEdgeSprites();

  // Creating the background
  path = createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;

  // Creating the main player
  mainCyclist = createSprite(70,150);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale = 0.07;
  mainCyclist.debug = false;
  mainCyclist.setCollider("circle",0,0,700);
    
  // Creating the game over sprite
  gameOver = createSprite(650,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false; 
  
  // Creating the invisible grounds

  invisibleGround1 = createSprite(width/2,5,width,10);
  invisibleGround1.visible = false;

  invisibleGround2 = createSprite(width/2,295,width,10);
  invisibleGround2.visible = false;

  // Creating the groups

  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();
}

function draw() 
{
  //Setting the background color
  background(0);
  
  drawSprites();

  // Displaying the distance
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  // Making the play & end game states

  if(gameState === PLAY)
  {
    // Increasing the distance value using frame rate
   distance = distance + Math.round(getFrameRate()/50);

   // Increasing the path velocity using the score variable
   path.velocityX = -(6 + 2*distance/150);
  
   // Movement of the main cyclist using the mouse
   mainCyclist.y = World.mouseY;
  
   // Colliding the cyclist with the edges & Invisible grounds

    mainCyclist.collide(edges);
 
   if(mainCyclist.isTouching(invisibleGround1))
   {
     mainCyclist.y = mainCyclist.y + 2;
   }
  
   if(mainCyclist.isTouching(invisibleGround2))
   {
     mainCyclist.y = mainCyclist.y - 2;
   }
  
   // Resetting the path's position
   if(path.x < 0 )
   {
     path.x = width/2;
   }
  
   // Playing the sound of the bell
   if(keyDown("space")) 
   {
     cycleBell.play();
   }
  
   // Caliing the opponents

   var select_oppPlayer = Math.round(random(1,3));
  
   if (World.frameCount % 150 == 0) 
   {
     if (select_oppPlayer == 1) 
     {
       pinkCyclists();
     } 
     else if (select_oppPlayer == 2) 
     {
       yellowCyclists();
     } 
     else 
     {
       redCyclists();
     }
    }
  
    // Ending the game when the player's groups touches the main cyclist

   if(pinkCG.isTouching(mainCyclist))
   {
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist))
    {
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist))
    {
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
  }  

  else if (gameState === END) 
  {
    // Making the game over image visible
    gameOver.visible = true;
  
    // Displaying the restart text
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    // Setting the path's & main cyclist's velocity
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    
    // Adding the main cyclist animation
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    // Setting the velocity & lifetime for the player's groups

    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
  
    // Pressing the up arrow key to restart the game
    if(keyDown("UP_ARROW")) 
    {
      reset();
    }
  }
}

// Creating the function for players and reset

function pinkCyclists()
{
  player1 = createSprite(1100,Math.round(random(50, 250)));
  player1.scale = 0.06;
  player1.velocityX = -(6 + 2*distance/150);
  player1.addAnimation("opponentPlayer1",oppPink1Img);
  player1.setLifetime = 170;
  pinkCG.add(player1);
}

function yellowCyclists()
{
  player2 = createSprite(1100,Math.round(random(50, 250)));
  player2.scale = 0.06;
  player2.velocityX = -(6 + 2*distance/150);
  player2.addAnimation("opponentPlayer2",oppYellow1Img);
  player2.setLifetime = 170;
  yellowCG.add(player2);
}

function redCyclists()
{
  player3 = createSprite(1100,Math.round(random(50, 250)));
  player3.scale = 0.06;
  player3.velocityX = -(6 + 2*distance/150);
  player3.addAnimation("opponentPlayer3",oppRed1Img);
  player3.setLifetime = 170;
  redCG.add(player3);
}

function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  distance = 0;
 }