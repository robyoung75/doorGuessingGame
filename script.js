

let doorImage1 = document.getElementById('door1'); // asigns the img with the #id door1 to doorImage1, reference Html for id door1.
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let startButton = document.getElementById('start');
let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg"; // path to image with robot view.
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg"; // path to image with beach view.
let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg"; // path to image with space view.
let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg"; // path to image, closed door.
let numClosedDoors =3;
let openDoor1; // openDoor1...3 will be assigned their values from the randomChoreDoorGenerator.
let openDoor2;
let openDoor3;
let currentlyPlaying = true;

// function isBot determines if a bot image is shown and if so ends the game as a looser.
const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
}


// isClicked fucntion makes each door clickable once so that a play can't click the same door three times and win the game.
const isClicked = (door) => {
  if (door.src === closedDoorPath) {  // checks if door.src = closedDoorPath if they share the same value then the door hasn't been opened and should return false, otherwise, the door must be open and return true.
    return false;
  } else {
    return true;
  }
}

// playDoor function is called in each of the doorImage onclick functions.
const playDoor = (door) => {
  numClosedDoors--; // decreased numClosedDoors by one with each click of the door.
  if (numClosedDoors === 0) { // means game is over, so run gameOver function with arguement win.
    gameOver('win');
  } else if (isBot(door)) { // if isBot or robot image is shown run gameOver fuction with lose.
    gameOver('lose');
  }  
}


const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);  // randdom number generator for a number between 0 and 2 that rounds down and assigns  value to choreDoor.
  if (choreDoor === 0) {  // if, else if, else statement makes each possibility 0 - 2 possible.
    openDoor1 = botDoorPath; // assigns openDoor1 to bot.
    openDoor2 = beachDoorPath; // assigns openDoor2 to beach.
    openDoor3 = spaceDoorPath; // assign opendDoor 3 to space.
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor3 = beachDoorPath;
    openDoor1 = spaceDoorPath;
  } else {
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  } 
};


// onclick function: doorImage1.onclick...startButton.onclick: function run when element is clicked.

doorImage1.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage1)) { // currentPlaying and not isClicked for doorImage1 protects against cheat allowing user to click one door three times for a victory.
    doorImage1.src = openDoor1; // sets doorImage1.scr(source) to openDoor1 when doorImage1 is clicked.
    playDoor(doorImage1); 
  }
}

doorImage2.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2; 
    playDoor(doorImage2);
  }
}


doorImage3.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3; 
    playDoor(doorImage3);
  }
}

startButton.onclick = () => {
  if (currentlyPlaying === false) { //if this condition player cannot reset game mid round.
    startRound(); // call startRound function.
  } 
}

// resets values to game start conditions.
const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = "Good Luck";  
  randomChoreDoorGenerator();
}

const gameOver = (status) => {
  if (status === 'win') {
    startButton.innerHTML = "You win! Play again?" // button text displays...
  } else {
    startButton.innerHTML =  "Game over! Play again?"; // if not win button displays...
  }
  currentlyPlaying = false; // this value makes sure that additional doors can't be clicked after the ChoreBot door is clicked.
}
startRound();





