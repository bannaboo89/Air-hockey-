var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["f17e0176-3e0d-4959-abcf-5ba225670828","7cfbda09-2260-4a24-a9ff-e21553d52647","b67770da-a7b4-4c76-9f2c-8882eb3e6912","28500b92-a8bf-4c99-961f-bea62475d1f4"],"propsByKey":{"f17e0176-3e0d-4959-abcf-5ba225670828":{"name":"puck_1","sourceUrl":"assets/api/v1/animation-library/gamelab/wcuV7DcPEac2EjLNAPemwiDn.zqV1cHa/category_sports/puck.png","frameSize":{"x":393,"y":243},"frameCount":1,"looping":true,"frameDelay":2,"version":"wcuV7DcPEac2EjLNAPemwiDn.zqV1cHa","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":243},"rootRelativePath":"assets/api/v1/animation-library/gamelab/wcuV7DcPEac2EjLNAPemwiDn.zqV1cHa/category_sports/puck.png"},"7cfbda09-2260-4a24-a9ff-e21553d52647":{"name":"ai","sourceUrl":null,"frameSize":{"x":68,"y":27},"frameCount":1,"looping":true,"frameDelay":12,"version":"qECC_ExbBzb1XuAB19f922Qeyomh9K6.","loadedFromSource":true,"saved":true,"sourceSize":{"x":68,"y":27},"rootRelativePath":"assets/7cfbda09-2260-4a24-a9ff-e21553d52647.png"},"b67770da-a7b4-4c76-9f2c-8882eb3e6912":{"name":"player","sourceUrl":null,"frameSize":{"x":68,"y":27},"frameCount":1,"looping":true,"frameDelay":12,"version":"0_ZKYHCfDLPX6ttXnk_0TGw3m8Q9VIoY","loadedFromSource":true,"saved":true,"sourceSize":{"x":68,"y":27},"rootRelativePath":"assets/b67770da-a7b4-4c76-9f2c-8882eb3e6912.png"},"28500b92-a8bf-4c99-961f-bea62475d1f4":{"name":"background","sourceUrl":"assets/api/v1/animation-library/gamelab/qfPopOz8nFwcQdKvovnN6XVlIPvs5awQ/category_backgrounds/sports_hockey.png","frameSize":{"x":396,"y":374},"frameCount":1,"looping":true,"frameDelay":2,"version":"qfPopOz8nFwcQdKvovnN6XVlIPvs5awQ","categories":["backgrounds"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":396,"y":374},"rootRelativePath":"assets/api/v1/animation-library/gamelab/qfPopOz8nFwcQdKvovnN6XVlIPvs5awQ/category_backgrounds/sports_hockey.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var playerMallet;

var goal1=createSprite(200,18,100,20);
goal1.shapeColor=("yellow");

var goal2=createSprite(200,382,100,20);
goal2.shapeColor=("yellow");


// making court
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";



// creating objects and giving them colours
var striker = createSprite(200,200,10,10);
striker.setAnimation("puck_1");
striker.scale=0.05;

var playerMallet = createSprite(200,50,50,10);
playerMallet.setAnimation("player");

var computerMallet = createSprite(200,350,50,10);
computerMallet.setAnimation("ai");

//score and count thing
score = 0;
aiScore=0;

var gameState="Start"


function draw() {
  
  background("teal");
  //score 
  fill ("purple");
  textSize(20);
  stroke("yellow")
  text(" " +score,10,190);
   text(" " +aiScore,10,225);
  
  
  
  
  // noise 
  if (computerMallet.isTouching(striker)){
    playSound("assets/category_bell/quiet_bell_notification.mp3");
  }
  
  if (playerMallet.isTouching(striker)){
    playSound("assets/category_bell/quiet_bell_notification.mp3");
  }
   if (striker.isTouching(goal1)){
    playSound("assets/category_points/vibrant_game_gold_crystal_bling_touch_1.mp3");
  }
  
  
  
  //what happens when the ai scores
   if  (striker.isTouching(goal1)||striker.isTouching(goal2)){
  aiScore++;
  striker.x=200;
  striker.y=200;
  striker.velocityY=0;
  striker.velocityX=0;
  gameState="Start";
  
 }
  
  // ending the game
  

 if (aiScore===5){
  gameState="end";
 background(rgb((random(0,225)),(random(0,225)),(random(0,225))));
  fill ("purple");
   textSize(50);
   stroke("yellow");
text("You Lose", 100, 250);
    striker.velocityY=0;
    striker.velocityX=0;
    playerMallet.destroy();
    
    
 } 
 
  
  
  
  
  
  
  
 
  
  //make the player paddle move with the Arrow keys
  paddleMovement();
  
  
  //AI for the computer paddle
  //make it move with the striker's y position
  computerMallet.x = striker.x;

  
  //draw line at the centre
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  //create edge boundaries
  //make the striker bounce with the top and the bottom edges
  createEdgeSprites();
  

  


 
 
 
 
 
 
 
 
 
 
 
 
 
  drawSprites();
  
  
  
  
  if (gameState==="Start")
  {
  stroke ("red");
 fill ("lightblue");
  text("Space Bar To Start", 130,165);

if (keyDown( "space")){
  serve(); 
 gameState="Play";
    
} 

  }
  
if (gameState==="Play")
  {
 
    striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);
   
  }
 
 
 
}

//function draw ends









function serve() {
  striker.velocityX = 10;
  striker.velocityY = 5;
 
}

function paddleMovement()
{
  if(keyDown("left")){
    playerMallet.x = playerMallet.x-10;
    
  }
  
  if(keyDown("right")){
    playerMallet.x = playerMallet.x+10;
    
  }
  
  if(keyDown("up")){
   if(playerMallet.y>25)
   {
    playerMallet.y = playerMallet.y- 10;
   }
  }
  
  if(keyDown("down")){
    if(playerMallet.y<120)
   {
    playerMallet.y = playerMallet.y+10;
   }
  }
}




// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
