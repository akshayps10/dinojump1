var character = document.getElementById("character");
var block = document.getElementById("block");
var startButton = document.getElementById("startButton");
var timerDisplay = document.getElementById("timer");
var gameStarted = false;
var timerInterval;
var seconds = 0;


function jump() {
    if (gameStarted && !character.classList.contains("animate")) {
        character.classList.add("animate");
        setTimeout(function() {
            character.classList.remove("animate");
        }, 500); 
    }
}


function checkCollision() {
    var characterRect = character.getBoundingClientRect();
    var blockRect = block.getBoundingClientRect();

    if (characterRect.bottom > blockRect.top &&
        characterRect.left < blockRect.right &&
        characterRect.right > blockRect.left &&
        characterRect.top < blockRect.bottom) {
        alert('Game Over!');
        clearInterval(timerInterval);
        window.location.reload(); 
    }
}


function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        startButton.style.display = 'none';

    
        block.classList.add('animate-block');

        seconds = 0;
        timerInterval = setInterval(function() {
            seconds++;
            var minutes = Math.floor(seconds / 60);
            var sec = seconds % 60;
            timerDisplay.textContent = minutes + ':' + (sec < 10 ? '0' : '') + sec;
        }, 1000);

      
        setInterval(checkCollision, 50);
    }
}


window.onload = function() {
   
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') { 
            jump();
        }
    });

    
    startButton.addEventListener('click', startGame);
};
