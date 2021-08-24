var dog, happyDog, database, foodS, foodStock;
var happyDogImg, hungryDogImg;
var feedTime,lastFeed,foodObj,feed,addFood;
var changeState,readState,gameState = 0;
var bedroom,garden,washroom,livingroom;


function preload()
{
	happyDogImg = loadImage("images/dogImg.png");
  hungryDogImg = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/BedRoom.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/WashRoom.png");
  livingroom = loadImage("images/LivingRoom.png");
  
}

function setup() {
  database = firebase.database();
	createCanvas(1000 ,500);
 /* foodi = database.ref('foodImg');
  foodImg.on("value",function (data){
    fImg = data.val;
  });*/
  foodObj = new Food();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function (data){
    lastFeed = data.val();
  });
  stock = database.ref('Food');
  stock.on("value",readStock)

  readState = database.ref('gameState');
  readState.on("value",function (data){
    gameState = data.val();
  });

  

  dog = createSprite(900,250,1,1);
  dog.addImage(happyDogImg);
  dog.scale=0.2;

  addFood=createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);

  //food=createButton("Feed the Dog");
  //food.position(800,95);
  //food.mousePressed(feedDog);
}


function draw() {  
background(46, 139, 87); 
fill("white");

foodObj.display();
//writeStock(foodS);

if(foodS == 0){
  dog.addImage(happyDogImg);
  foodObj.visible = false;
}else{
  dog.addImage(hungryDogImg);
  foodObj.visible = true;
}

if(gameState===1){
  dog.addImage(happyDogImg);
  dog.scale = 0.175;
  dog.y=250;
}

if (gameState===2){
  dog.addImage(hungryDogImg);
  dog.scale = 0.175;
  foodObj.visible=false;
  dog.y=250;
}

var Bath = createButton("I want to take a bath");
Bath.position(540,95);
if(Bath.mousePressed(function(){
  gameState=3;
  database.ref('/').update({'gameState':gameState});
}));
if(gameState===3){
  dog.addImage(washroom);
  dog.scale=1;
  foodObj.visible=false;
}

var sleep = createButton("I am very sleepy");
sleep.position(520,130);
if(sleep.mousePressed(function(){
  gameState=4;
  database.ref('/').update({'gameState':gameState});
}))
if(gameState===4){
  dog.addImage(bedroom);
  dog.scale=1;
  foodObj.visible=false;
}

var play = createButton("Lets play !");
play.position(650,130);
if(play.mousePressed(function(){
  gameState=5;
  database.ref('/').update({'gameState':gameState});
}));
if(gameState===5){
dog.addImage(livingroom);
dog.scale=1;
foodObj.visible=false;
}

var park = createButton("Lets play in park");
park.position(750,130);
if(park.mousePressed(function(){
  gameState=6;
  database.ref('/').update({'gameState':gameState});
}))
if(gameState===6){
  dog.addImage(garden);
  dog.scale=1;
  foodObj.visible=false;
}

var feed = createButton("Feed the Dog");
feed.position(800,95);
if(feed.mousePressed(function(){
  foodS=foodS-1;
  gameState=1;
  database.ref('/').update({'gameState':gameState});
}));


  


fill(255,255,254);
textSize(15);

if(lastFeed>=12){
  lastFeed = lastFeed%12;
    text("Last Feed : "+lastFeed+" PM",650,50);
}else if(lastFeed==0){
    text("Last Feed : 12 AM",650,50);
}else{
  text("Last Feed : "+lastFeed+" AM",650,50);
}
 /*
  if(gameState!="hungry"){
    food.hide();
    addFood.hide();
    dog.remove();
  }else{
    food.show();
    addFood.show();
    dog.addImage(hungryDogImg);
  }


  curruntTime = hour()%12;

  if(curruntTime==(lastFeed+1)){
    update("playing");
    foodObj.garden();
  }else if(curruntTime==(lastFeed+2)){
    update("sleeping");
    foodObj.bedroom();
  }else if(curruntTime>(lastFeed+2) && curruntTime<=(lastFeed+4)){
    update("bathing");
    foodObj.washroom();
  }else{
    update("hungry");
    foodObj.display();
  }
*/
 
drawSprites();


}

function readStock(data){
  foodS = data.val();
 // foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  database.ref('/').update({
    food:x
  })
}
/*function feedDog(){
    dog.addImage(hungryDogImg);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:lastFeed+1
  })
}
*/
function addFoods(){
  foodS++;
database.ref('/').update({
  Food:foodS
})
}
function update(state){
    database.ref('/').update({
      database:state
    });

  }


