var dog,sadDog,happyDog, database;
var foodS, foodStock;
var fedTime, lastFed;
var feed;
var foodObj;
var food;

var foodS = 0;

var databse;



function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref("food");
  foodStock.on("value", readStock);

  
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedButton = createButton("Feed Dog");
  feedButton.position(750,150);
  feedButton.mousePressed(feedDog);

  addFoodButton = createButton("Add Food");
  addFoodButton.position(850,150);
  addFoodButton.mousePressed(addFood);



  
}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime = database.ref("feedTime");
  fedTime.on("value", function(data){
    lastFed=data.val();
  });

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>12){
    text("Last Feed"+ lastFed%12 + "PM", 350, 30);
  } else if(lastFed==0){
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : "+ lastFed + "AM", 350, 30);
  }

  
  
  
  
  
  
  drawSprites();
}

//function to read food Stock
function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref("/").update({
        food:foodObj.getFoodStock(),
        feedTime:hour()
    })
}

function readStock(data){
    foodS=data.val();
    foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time



//function to add food in stock
function addFood(){
  foodS++;
  database.ref("/").update({
    food:foodS
  })
}


