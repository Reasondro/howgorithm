let iterations = [];
let currentStep = 0;

function bubbleSort(arr) {
  const len = arr.length;
  iterations = []; // Reset iterations
  for (let i = 0; i < len - 1; i++) {
    const currentI = i; // Capture the current value of i
    for (let j = 0; j < len - i - 1; j++) {
      const currentJ = j; // Capture the current value of j
      // Record the state before any swap, along with indices
      iterations.push({
        array: arr.slice(),
        i: currentI,
        j: currentJ,
        swapped: false,
      });
      if (arr[j] > arr[j + 1]) {
        // Capture the values and indices to be swapped
        const swappedIndices = [j, j + 1];
        const swappedValues = [arr[j], arr[j + 1]];
        // Perform the swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // Record the state after swap
        iterations.push({
          array: arr.slice(),
          i: currentI,
          j: currentJ,
          swapped: true,
          swappedIndices: swappedIndices,
          swappedValues: swappedValues,
        });
      }
    }
  }
  // Record the final sorted array
  iterations.push({
    array: arr.slice(),
    i: null,
    j: null,
    swapped: false,
  });
}

function getInputArr() {
  let userInputArray = document.getElementById("user-input-array").value.trim();
  const arrNum = userInputArray
    .split(",")
    .map((num) => num.trim())
    .filter((num) => num !== "")
    .map(Number)
    .filter((num) => !isNaN(num));

  console.log("Got: " + arrNum + " with type of " + typeof arrNum);

  return arrNum;
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
  currentStep = 0;
  displayCurrentStep();
  document.getElementById("user-instructions").innerHTML = "";
  playBtn.style.animation = "none";
}

function displayCurrentStep() {
  if (currentStep >= 0 && currentStep < iterations.length) {
    const { array, i, j, swapped, swappedIndices, swappedValues } =
      iterations[currentStep];

    const arrayDisplay = array
      .map((num, index) => {
        if (index === j || index === j + 1) {
          // Highlight the elements being compared
          return `<span class="highlight">${num}</span>`;
        } else {
          return num;
        }
      })
      .join(", ");

    document.getElementById("result").innerHTML = `[${arrayDisplay}]`;
    document.getElementById("user-array").innerHTML = `Step ${currentStep + 1}`;

    // Display the outer loop index
    let outerLoopInfo;
    if (i !== null) {
      outerLoopInfo = `Outer Loop (i): ${i}`;
    } else {
      outerLoopInfo = "Sorting Complete";
    }
    document.getElementById("outer-loop-info").innerText = outerLoopInfo;

    // Display the inner loop index
    let innerLoopInfo;
    if (j !== null) {
      innerLoopInfo = `Inner Loop (j): ${j}`;
    } else {
      innerLoopInfo = "";
    }
    document.getElementById("inner-loop-info").innerText = innerLoopInfo;

    // Update the status-info element with swap details
    const statusInfoElement = document.getElementById("status-info");
    if (swapped) {
      const [index1, index2] = swappedIndices;
      const [value1, value2] = swappedValues;
      statusInfoElement.innerText = `Swapped numbers at [${index1}] and [${index2}]: ${value1} ↔ ${value2}`;
    } else {
      statusInfoElement.innerText = "";
    }
  }

  // Disable buttons at boundaries
  document.getElementById("previous-btn").disabled = currentStep === 0;
  document.getElementById("next-btn").disabled =
    currentStep === iterations.length - 1;
}

function nextStep() {
  if (currentStep < iterations.length - 1) {
    currentStep++;
    displayCurrentStep();
  }
}

function previousStep() {
  if (currentStep > 0) {
    currentStep--;
    displayCurrentStep();
  }
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

  // Bind next and previous buttons
  const nextBtn = document.getElementById("next-btn");
  const previousBtn = document.getElementById("previous-btn");
  nextBtn.addEventListener("click", nextStep);
  previousBtn.addEventListener("click", previousStep);

  // Bind play button
  const playBtn = document.getElementById("play-btn");
  playBtn.addEventListener("click", runBubbleSort);
});
