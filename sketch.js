var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300, 10, 10);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 300, 10, 10);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;

  invisibleBlockGroup = new Group();
  climbersGroup = new Group();

  // ghost.debug = true;

  ghost.setCollider("circle", 0, 0, 150);

  // spookySound.loop();
}

function draw() {
  background(200);

  if (gameState === "play") {
    if (tower.y > 400) {
      tower.y = 300;
    }

    if (keyDown("space")) {
      ghost.velocityY = -10;
    }

    if (keyDown("LEFT_ARROW")) {
      ghost.x = ghost.x - 3;
    }

    if (keyDown("RIGHT_ARROW")) {
      ghost.x = ghost.x + 3;
    }

    ghost.velocityY = ghost.velocityY + 1;

    spawnDoors();

    if (ghost.isTouching(climbersGroup)) {
      ghost.velocityY = 0;
    }

    if (ghost.isTouching(invisibleBlockGroup) || ghost.y > 600) {
      gameState = "end";
    }

    drawSprites();
  } else {
    textSize(30);
    fill("cyan");
    text("Game Over", 250, 250);
  }
}

function spawnDoors() {
  if (frameCount % 300 == 0) {
    door = createSprite(100, -10, 10, 10);
    door.addImage("doors", doorImg);
    door.velocityY = 1;

    climber = createSprite(100, 50, 10, 10);
    climber.addImage("climber", climberImg);
    climber.velocityY = 1;

    invisibleBlock = createSprite(100, 55, 10, 10);
    invisibleBlock.visible = false;
    invisibleBlock.velocityY = 1;

    door.x = Math.round(random(100, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.lifetime = 605;
    climber.lifetime = 605;
    invisibleBlock.lifetime = 605;

    climber.depth = door.depth;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    invisibleBlockGroup.add(invisibleBlock);
    climbersGroup.add(climber);
  }
}
