document.addEventListener("DOMContentLoaded", () => {
  const message = document.querySelector("#message");
  const inputNumber = document.querySelector("#number");
  const guessButton = document.querySelector("#guessButton");
  const clearButton = document.querySelector("#clearButton");
  const passGuessesLi = document.querySelector("#pass-guesses--list");
  const filter = document.querySelector(".filter");
  const dialog = document.querySelector(".dialog");
  const playAgainButton = document.querySelector("#dialog--button");
  const notify = document.querySelector(".notify");

  let passGuesses = [];
  let limitGuess = 10;

  /**
   * Check Input
   * Return true if param str is Number
   */
  const validInput = (str) => !isNaN(str) && str != "";

  /**
   * Genarate Random Number
   * Return randomnumber from 0 to 9
   */
  const genarateRandomNumber = () => Math.floor(Math.random() * 10);

  /**
   * check
   * @param {*} guessNumber
   * @param {*} randomNumber
   *
   */
  const check = (guessNumber, randomNumber) => guessNumber - randomNumber;

  const messageText = (result) => {
    if (result > 0) return `Sorry your guess is too high`;
    if (result < 0) return `Sorry your guess is too low`;
    return `Congratulations!! You guessed correctly`;
  };

  const changeStyle = (result) => {
    message.classList.remove("message--true");
    message.classList.remove("message--false");

    if (result == 0) {
      message.classList.add("message--true");
      return;
    }
    message.classList.add("message--false");
  };

  const showNotify = (message) => {
    notify.innerHTML = message;
    notify.classList.remove("hide");
    setTimeout(() => {
      notify.classList.add("hide");
    }, 1500);
  };

  const handleInput = () => {
    if (!validInput(inputNumber.value)) {
      showNotify("You should input Number");
      inputNumber.value = "";
      return false;
    }
    return true;
  };

  const showPassGuesses = () => {
    passGuessesLi.innerHTML = passGuesses
      .map((guess) => `<li class="pass-guesses--item">${guess}</li>`)
      .join("");
  };

  inputNumber.addEventListener("keydown", () => {
    inputNumber.value = "";
  });

  inputNumber.addEventListener("keyup", () => {
    handleInput();
  });

  guessButton.addEventListener("click", () => {
    if (!handleInput()) return;
    if (limitGuess == 0) {
      limitGuess = 0;
      filter.classList.remove("hide");
      dialog.classList.remove("hide");
      return;
    }
    const randomNumber = genarateRandomNumber();
    const guessNumber = +inputNumber.value;
    const result = check(guessNumber, randomNumber);
    passGuesses.push(guessNumber);
    limitGuess -= 1;
    message.innerHTML =
      messageText(result) + `. You have ${limitGuess} gessses left`;
    showPassGuesses();
    changeStyle(result);
    inputNumber.focus();
  });

  clearButton.addEventListener("click", () => {
    inputNumber.value = "";
    inputNumber.focus();
  });

  playAgainButton.addEventListener("click", () => {
    passGuesses = [];
    limitGuess = 10;
    filter.classList.add("hide");
    dialog.classList.add("hide");
    inputNumber.value = "";
    inputNumber.focus();
    showPassGuesses();
  });
});
