const numberInput = document.getElementById("guess-number");
const correct = document.getElementById("correct");
const higher = document.getElementById("higher");
const lower = document.getElementById("lower");
const owlImg = document.getElementById("owl");
const leftBar = document.getElementById("left-bar");
const rightBar = document.getElementById("right-bar");
const chanceRemain = document.getElementById("chance-remain");
const higherNo = document.getElementById("higher-no");
const lowerNo = document.getElementById("lower-no");
const errorHandling = document.getElementById("error-handling");
document.getElementById("submit-btn").addEventListener("click", handleGuess);

const randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(randomNumber);
let guessNumber = 10;

maxLower = null;
minHigher = null;

function handleGuess(event) {
  errorHandling.classList.add("error-handling");
  errorHandling.textContent = "";
  const userInput = numberInput.value.trim();

  if (userInput === "" || isNaN(userInput)) {
    errorHandling.classList.remove("error-handling");
    errorHandling.textContent = "Please add a number";
    numberInput.value = "";
    return;
  }

  const userGuess = +userInput;

  if (userGuess < 1 || userGuess > 100) {
    errorHandling.classList.remove("error-handling");
    errorHandling.textContent =
      "your number should be lower than 100 & higher than 1.";
    numberInput.value = "";
    return;
  }

  if (randomNumber === userGuess) {
    correct.classList.add("fire-color");
    higher.classList.remove("fire-color");
    lower.classList.remove("fire-color");

    setTimeout(() => {
      leftBar.innerHTML = `
        <h1 class="result-header" id="result-header">You Won!!!</h1>
        <span class="result-text">The Correct Number Is: ${userGuess}</span>
      `;
      owlImg.src = "./assets/imgs/happy.png";
      rightBar.style.display = "none";
    }, 1000);
    return;
  }

  if (guessNumber === 1) {
    leftBar.innerHTML = `
      <h1 class="result-header" id="result-header">You Lost!</h1>
    `;
    owlImg.src = "./assets/imgs/Picsart_24-11-22_14-41-40-977.png";
    rightBar.style.display = "none";
    return;
  }

  if (randomNumber > userGuess) {
    lower.classList.add("fire-color");
    higher.classList.remove("fire-color");

    if (maxLower === null || userGuess > maxLower) {
      maxLower = userGuess;
    }
    lowerNo.innerHTML = maxLower;
  }

  if (randomNumber < userGuess) {
    higher.classList.add("fire-color");
    lower.classList.remove("fire-color");

    if (minHigher === null || userGuess < minHigher) {
      minHigher = userGuess;
    }
    higherNo.innerHTML = minHigher;
  }

  guessNumber--;
  chanceRemain.innerHTML = guessNumber;
  numberInput.value = "";
}

numberInput.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    handleGuess();
  }
});

document.getElementById("submit-btn").addEventListener("click", handleGuess);
