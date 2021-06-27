let character = document.getElementById("character"); //gets the character div and assigns it to character
let block = document.getElementById("block");
let body = document.getElementById("body");
let youAreDead = document.getElementById("youAreDead");
let youAreDeadImage = document.getElementById("youAreDeadImage");
let totalDeaths = 0;
let highScore = 0;
let gameScore = 0;
let increaseSpeed = false;
let randomSpeed = false;

document.getElementById("speedOnOff").innerHTML = increaseSpeed ? 'on' : 'off';
document.getElementById("randomOnOff").innerHTML = randomSpeed ? 'on' : 'off';

let restartButton = document.getElementById("restartButton");
restartButton.onclick = startBlockAnimation;

//let speedButton = document.getElementById("speedButton"); - dont need this?!
speedButton.onclick = () => {
    increaseSpeed = !increaseSpeed;  
    if(increaseSpeed) { 
        randomSpeed = false; 
    }
    document.getElementById("speedOnOff").innerHTML = increaseSpeed ? 'on' : 'off';
    document.getElementById("randomOnOff").innerHTML = randomSpeed ? 'on' : 'off';


    document.getElementById("speedButton").blur(); //unfocusses the button so pressing space or enter doesn't trigger it
}

randomButton.onclick = () => {
    randomSpeed = !randomSpeed;  
    if(randomSpeed) { 
        increaseSpeed = false; 
    }
    document.getElementById("speedOnOff").innerHTML = increaseSpeed ? 'on' : 'off';
    document.getElementById("randomOnOff").innerHTML = randomSpeed ? 'on' : 'off';

    document.getElementById("randomButton").blur(); //unfocusses the button so pressing space or enter doesn't trigger it
}

function startBlockAnimation() {  //onbuttonclick 
    document.getElementById("restartButton").blur();
    setBlockAnimationTime('1000ms');
    
    

    document.getElementById("gameScore").innerHTML = gameScore;
    if(block.classList != "animateBlock") {
        block.classList.add("animateBlock");
        removeDeadBody();
        removeYouAreDead();
        
    }

    

    
}
document.getElementById("totalDeaths").innerHTML = totalDeaths;
document.getElementById("highScore").innerHTML = highScore;
document.getElementById("gameScore").innerHTML = gameScore;



function setBlockAnimationTime(time) { //time should be in a string such as: 1s or 100ms
    
    let rootVariables = document.querySelector(":root");
    rootVariables.style.setProperty('--animationTime', time);
}

function getBlockAnimationTime() {
    let rootVariables = document.querySelector(":root");
    let time = getComputedStyle(rootVariables).getPropertyValue("--animationTime");
    return time;
}



document.addEventListener("click",startOrJump); //listens for a click and invokes startOrjump when it receives one
document.addEventListener("keydown",startOrJump);




function checkDead() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    
    if(blockLeft > -20 && blockLeft < 20 && characterTop  >= 130) { /*this means the divs are overlapping*/
       block.classList.remove("animateBlock");
       body.classList.add("deadBody");
       youAreDead.classList.add("youAreDead");
       youAreDeadImage.classList.add("youAreDeadImage");
       
      
      document.getElementById("totalDeaths").innerHTML = ++totalDeaths;
      if(gameScore > highScore) {
          highScore = gameScore;
          document.getElementById("highScore").innerHTML = highScore;
      }

      gameScore = 0;

    }
}



let timeOfMostRecentPoint = 0;

function checkIfPoint() { 
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    let d = new Date();
    if(blockLeft <= 20 && d.getTime() - timeOfMostRecentPoint >= 400) { //only adds a point if there has been at least 0.4s since last point. SHould be more than enough for any game
        document.getElementById("gameScore").innerHTML = ++gameScore; 
        let dd = new Date();
        timeOfMostRecentPoint = dd.getTime(); //this gives number of milliseconds since 1/1/70

        //code here to speed up the block animation
        //setBlockAnimationTime(getBlockAnimationTime()-10ms)
        if(increaseSpeed) {
          let currentSpeed = parseInt(getBlockAnimationTime());
          newSpeed = (currentSpeed - 10).toString() + 'ms';
          setBlockAnimationTime(newSpeed);
        }

        if(randomSpeed) {
            newSpeed = randomIntFromInterval(850,1000).toString() + 'ms';
            setBlockAnimationTime(newSpeed);
        }


        

    }
} 
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

setInterval(checkDead, 10);
setInterval(checkIfPoint, 30); 

function startOrJump(keyPress) {
    document.getElementById("restartButton").blur();
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    
 if(keyPress.key == " ") {  //starts the game 
     if(blockLeft >= 480) {
        startBlockAnimation(); 
        return;
     } 
     
 } 
 else if(keyPress.key == "ArrowUp" || keyPress.key == undefined) { //key.key == undefined is for mouse clicks
        
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft >= 480) { //if the block is in starting place then dont jump (ie when user clicks restart)
        return;
    }

    if(character.classList === "animateCharacter") { //doesnt do anything if animation is already occuring
        return; 
    } 

    character.classList.add("animateCharacter"); //adds the animate class to the charatcer div. This will make it move
    setTimeout(removeJump,300); //after 300ms it invokes removeJump (which will remove the class animate from character div)
 }
};

function removeJump() {
    character.classList.remove("animateCharacter");
}

function removeDeadBody() {
    body.classList.remove("deadBody");
    
}

function removeYouAreDead() {
    youAreDead.classList.remove("youAreDead");
}


//need block animation to stop if you die
