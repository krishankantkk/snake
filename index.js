var lastPaintTime=0;
let SNAKE_SPEED=5;
let inputDirection={x:-1,y:0};
let gameOver=false;
let food={x:15,y:14};
let score=0;
const EXPENTION_AMOUNT=2;
const scoreBox=document.getElementById("score");
let lastInputDirection=inputDirection;
const snakeBody=[
    {x:8,y:8},
    {x:8,y:9},
    {x:8,y:10},
    {x:8,y:11},
]

const gameboard=document.querySelector(".game-board")
function paint(currentTime) {
    var TimeSeconds = (currentTime - lastPaintTime) / 1000;
    requestAnimationFrame(paint);
    if (TimeSeconds < 1 / SNAKE_SPEED) return;
    lastPaintTime = currentTime;
    if(gameOver!=true){
        update();
        draw();
    }
   
}
window.requestAnimationFrame(paint);


function draw() {
    drawsnake();
    drawFood();

}
function update() {
    gameboard.innerHTML ="";
 sankeMove();
 snakeEatFood();

}
function drawsnake() {
    snakeBody.forEach((segment,index)=>{
        var snakeElement=document.createElement("div");
        snakeElement.style.gridColumnStart=segment.x;
        snakeElement.style.gridRowStart=segment.y;
       // snakeElement.innerHTML = index;
        snakeElement.style.transform="rotate(0deg)";
        if(index==0){
            snakeElement.classList.add("head");
            if(inputDirection.x==1){
                snakeElement.style.transform="rotate(-90deg)";
            }else if(inputDirection.x==-1){
                snakeElement.style.transform="rotate(90deg)";
            }else if(inputDirection.y==1-1){
                snakeElement.style.transform="rotate(180deg)";
            }else if(inputDirection.y==1){
                snakeElement.style.transform="rotate(0deg)";
            }
        }else{
            snakeElement.classList.add("snake");
        }
        
        gameboard.appendChild(snakeElement);

    })
}
function drawFood(){
    var foodElement=document.createElement("div");
        foodElement.style.gridColumnStart=food.x;
        foodElement.style.gridRowStart=food.y;
        foodElement.classList.add("food");
        gameboard.appendChild(foodElement);
}
 function sankeMove(){
    inputDirection = getInputDirection();
    for(i=snakeBody.length-2;i>=0;i--){
        snakeBody[i+1]={...snakeBody[i]};
    }
    snakeBody[0].x+=inputDirection.x;
    snakeBody[0].y+=inputDirection.y;
   checkGameOver();
 }
  function getInputDirection(){
    window.addEventListener("keydown",e=>{
        
    switch(e.key){
        case 'ArrowUp' :
            if(lastInputDirection.y==1) break;
             inputDirection={x:0, y:-1}
        break;
        case 'ArrowDown' :
        if(lastInputDirection.y==-1) break;
         inputDirection={x:0, y:1}
        break;
        case 'ArrowLeft' :if(lastInputDirection.x==1) break;
         inputDirection={x:-1, y:0}
        break;
        case 'ArrowRight' : if(lastInputDirection.x==-1) break;
        inputDirection={x:1, y:0}
        break;
        default : inputDirection={x:0, y:0}


    }
 } )
 lastInputDirection = inputDirection;
    return inputDirection;
}
function snakeEatFood() {
    if(isEat()){
        score+=10;
        scoreBox.innerHTML=score;
        console.log('eat');
        food=getFoodrandomPosition();
        SNAKE_SPEED++;
        expendSnake();
    }
 }
 function getFoodrandomPosition(){
    let a,b,mycondition=true;
    while(mycondition){
        a=Math.ceil(Math.random()*16);
        b=Math.ceil(Math.random()*16);
        mycondition=snakeBody.some(segment=>{
            return segment.x===a && segment===b;
        })
    return {x:a,
    y:b};
}
 }
function isEat() {
return snakeBody[0].x===food.x && snakeBody[0].y===food.y;
}
function expendSnake() {
 for(i=0;i<EXPENTION_AMOUNT;i++){
    snakeBody.push(snakeBody[snakeBody.lenght-1]);
 }
}
function checkGameOver(){
    if(snakeOutOfGrid()||sankeIntesection()){
      
        alert("Game Over");
        gameOver=true;
        location.reload();

    }
}
function snakeOutOfGrid(){
 return snakeBody[0].x<0||snakeBody[0].x>16||snakeBody[0].y<0||snakeBody[0].y>16;
}
function sankeIntesection(){
   for(i=1;i<snakeBody.length;i++){
    if(snakeBody[0].x===snakeBody[i].x && snakeBody[0].y===snakeBody[i].y){
        return true;
    }
   }
}