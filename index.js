let randomColor;
let levelCount = 0;
var keyPressed = false;
var screenTouch = false;
let documentReady = false;

var colorSequence = [];
var playerSequence = [];

function randomizer() {
    const random = Math.floor(Math.random() * 4 + 1);
    
    if (random === 1) {
        return randomColor = "red";
    } else if (random === 2) {
        return randomColor = "blue";
    } else if (random === 3) {
        return randomColor = "green";
    } else if (random === 4) {
        return randomColor = "yellow";
    }
    
}

function nextSequence() {
    const level = document.getElementById("level-title");
    levelCount++;
    level.innerText = "Level " + levelCount;
    randomizer();
    colorSequence.push(randomColor);
    const selectedButton = document.getElementById(randomColor);
    selectedButton.classList.add('fadeEffect');
    setTimeout(() => {
      selectedButton.classList.remove('fadeEffect')},500
    )

}

function checkResult(player,game,pickedColor) {
  if (playerSequence[player.length - 1] === game[player.length - 1]) {
    const audio = new Audio('sounds/' + pickedColor + '.mp3')
    audio.play();
    if (player.length === game.length) {
      playerSequence = [];
      nextSequence();
    }
  } else {
    const audio = new Audio('sounds/wrong.mp3');
    audio.play();
    const row = document.getElementsByClassName('row');
    Array.from(row).forEach(function(row) {
      row.classList.add('gameOver');
    });
    
    const h1 = document.getElementById('level-title');
    h1.innerText = "Game Over!"// \nReload page to play again."

    const reloadMessage = document.createElement('p');
    reloadMessage.textContent = 'Reload page to play again.';

    h1.appendChild(reloadMessage);

  }
}


document.addEventListener('keydown', function(event) {
    if (!keyPressed) {
      keyPressed = true;
  
      if (documentReady) {
        nextSequence();

        const button = document.querySelectorAll(".btn");
        button.forEach(button => {
            button.addEventListener("click", (event) => {
            const playerColor = event.target.id;
            const clickedButton = document.getElementById(playerColor);
            
            clickedButton.classList.add('pressed');
            setTimeout(() => {
              clickedButton.classList.remove('pressed');
            },100)
            playerSequence.push(playerColor);
            checkResult(playerSequence,colorSequence,playerColor); 
            })

        })

        

      }
    }
  });

  document.addEventListener('touchstart', function(event) {
    if (!screenTouch) {
      screenTouch = true;

      if (documentReady){
        nextSequence();
        button.forEach(button => {
          button.addEventListener('touchstart', (event) => {
            const playerColor = event.target.id;
            const clickedButton = document.getElementById(playerColor);
    
            clickedButton.classList.add('pressed');
            setTimeout(() => {
              clickedButton.classList.remove('pressed');
            },100)
            playerSequence.push(playerColor);
            checkResult(playerSequence,colorSequence,playerColor); 
    
          })
        })
      }
    }
  })

  document.addEventListener('DOMContentLoaded', function() {
    documentReady = true;

  });