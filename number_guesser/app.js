let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

const game = document.querySelector('#game'),
      form = document.querySelector('#form'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector("#guess-input"),
      message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown',function(e){
  if(e.target.className === "play-again"){
    window.location.reload();
  }
})

form.addEventListener('submit',function(e){
  let guess = parseInt(guessInput.value);

  if(isNaN(guess) || guess<min || guess>max){
    setMessage(`Please enter a number between ${min} and ${max}`,`red`);
    guessInput.value="";
  } else{
    if(guess===winningNum){
      // guessInput.disabled = true;
      // guessInput.style.borderColor = "green";
      // setMessage(`${winningNum} is correct, YOU WIN!`,`green`)
      gameOver(true,`${winningNum} is correct, YOU WIN!`)
    } else{
      guessesLeft-=1;
      if(guessesLeft===0){
        // setMessage(`GAME OVER, You lost. The correct number was ${winningNum}.`,`red`);
        gameOver(false, `GAME OVER, You lost. The correct number was ${winningNum}.`)
      } else{
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`,`red`);
        guessInput.value = "";
      }
    }
  }
  e.preventDefault();
})

function gameOver(won, msg){
  let color;
  won===true ? color="green" : color="red";
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);
  guessBtn.value = "Play Again?"
  guessBtn.className+="play-again";
}

function getRandomNum(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}
