let iterations = [];
let currentStep = 0;

function bubbleSort(arr) {
  const len = arr.length;
  let sortedArray = arr.slice();

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      // console.log(j);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}

// window.onload = function () {
//   let storedInput = localStorage.getItem("savedUserInputBinary");
//   if (storedInput) {
//     document.getElementById("result").innerHTML = "Cached array:" + storedInput;
//   }
// };

function getInputArr() {
  let userInputArray = document.getElementById("user-input-array").value.trim();
  const arrNum = userInputArray
    .split(",")
    .map((num) => num.trim())
    .filter((num) => num !== "")
    .map(Number)
    .filter((num) => !isNaN(num));

  console.log("Got: " + arrNum + "with type of" + typeof arrNum);

  return arrNum;
}

function saveInput(data) {
  const savedData = data;
  localStorage.setItem("savedUserInputBubble", savedData);
}

function runBubbleSort(event) {
  event.preventDefault();

  let arr = getInputArr();

  const playBtn = document.getElementById("play-btn");

  if (arr.length === 0) {
    document.getElementById(
      "user-instructions"
    ).innerHTML = `Fill your array first `;
    playBtn.style.animation = "none";
    return;
  }
  bubbleSort(arr);
  document.getElementById("user-instructions").innerHTML = "";
  document.getElementById("result").innerHTML = ` [${arr}] `;
  document.getElementById("user-array").innerHTML = `Your array: [${arr}] `;
  playBtn.style.animation = "none";
}

function handleInputChange(event) {
  const inputField = event.target;

  if (inputField.value.trim() !== "") {
    inputField.style.animation = "none";
    inputField.style.backgroundColor = "var(--color-secondary)";
    inputField.style.borderColor = "var(--color-accent-300)";
  } else {
    inputField.style.borderColor = "var(--color-grey-300)";
    inputField.style.animation = "colorCycleGrey 1s infinite";
  }
  checkInput();
}

function checkInput() {
  const inputArray = document.getElementById("user-input-array").value.trim();
  const instructions = document.getElementById("user-instructions");

  const userArray = document.getElementById("user-array");
  const playBtn = document.getElementById("play-btn");

  if (inputArray !== "") {
    instructions.innerText = "Now click the play button!";
    playBtn.style.animation = "colorCycle 1s infinite";
    userArray.innerText = "";
  } else {
    instructions.innerText = "Fill your array!";
    playBtn.style.animation = "none";
    userArray.innerText = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const inputArrayField = document.getElementById("user-input-array");
  inputArrayField.addEventListener("input", handleInputChange);
});

function nextStep() {}

function previousStep() {}
