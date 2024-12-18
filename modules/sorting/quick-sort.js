//?  ⬇️ mix algo quicksort skalian swap logic

let iterations = []; //? ini arr untuk nyimpen steps nya
let currentStep = 0;

function quickSort(arr) {
  iterations = []; // ? reset kumpulan steps/iterasi dari awal
  quickSortHelper(arr, 0, arr.length - 1);
  //? nge save array akhir
  iterations.push({
    array: arr.slice(),
    low: null,
    high: null,
    pivotIndex: null,
    i: null,
    j: null,
    swapped: false,
    message: "SORTED!",
  });
}

function quickSortHelper(arr, low, high) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSortHelper(arr, low, pi - 1);
    quickSortHelper(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  iterations.push({
    array: arr.slice(),
    low: low,
    high: high,
    pivotIndex: high,
    i: i,
    j: null,
    swapped: false,
    message: `Starting partition with pivot ${pivot} at index ${high}`,
  });

  for (let j = low; j <= high - 1; j++) {
    iterations.push({
      array: arr.slice(),
      low: low,
      high: high,
      pivotIndex: high,
      i: i,
      j: j,
      swapped: false,
      message: `Comparing arr[${j}] (${arr[j]}) with pivot (${pivot})`,
    });

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];

      iterations.push({
        array: arr.slice(),
        low: low,
        high: high,
        pivotIndex: high,
        i: i,
        j: j,
        swapped: true,
        swappedIndices: [i, j],
        swappedValues: [arr[j], arr[i]],
        message: `Swapped arr[${i}] (${arr[i]}) and arr[${j}] (${arr[j]})`,
      });
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  iterations.push({
    array: arr.slice(),
    low: low,
    high: high,
    pivotIndex: i + 1,
    i: i + 1,
    j: high,
    swapped: true,
    swappedIndices: [i + 1, high],
    swappedValues: [arr[high], arr[i + 1]],
    message: `Moved pivot to correct position by swapping arr[${
      i + 1
    }] and arr[${high}]`,
  });

  return i + 1;
}

function getInputArr() {
  let userInputArray = document.getElementById("user-input-array").value.trim();
  const arrNum = userInputArray
    .split(",")
    .map((num) => num.trim())
    .filter((num) => num !== "")
    .map(Number)
    .filter((num) => !isNaN(num));

  console.log("Got: " + arrNum + " with type of " + typeof arrNum); //? buat debugging doang

  return arrNum;
}

function runQuickSort(event) {
  iterations = []; //! INI SUMPAH BUAT NGE BUG, AAAAAAAAAAAAAAAAAAA

  event.preventDefault();
  let arr = getInputArr();
  const playBtn = document.getElementById("play-btn");

  if (arr.length === 0) {
    document.getElementById(
      "user-instructions"
    ).innerHTML = `Fill your array first `;
    document.getElementById("result").innerText = "";
    document.getElementById("status-info").innerText = "";
    document.getElementById("steps").innerText = "";
    document.getElementById("inner-loop-info").innerText = "";
    document.getElementById("outer-loop-info").innerText = "";
    return;
  }
  quickSort(arr);
  currentStep = 0;
  displayCurrentStep();

  playBtn.style.animation = "none";
}

function displayCurrentStep() {
  if (currentStep >= 0 && currentStep < iterations.length) {
    const {
      array,
      low,
      high,
      pivotIndex,
      i,
      j,
      swapped,
      swappedIndices,
      swappedValues,
      message,
    } = iterations[currentStep];

    let arrayDisplay = array
      .map((num, index) => {
        let classes = [];

        if (low === null && high === null) {
          classes.push("sorted");
        } else {
          if (index === pivotIndex) {
            classes.push("pivot");
          }
          if (index === j) {
            classes.push("highlight");
          }
          if (index === i) {
            classes.push("index-i");
          }
          if (
            swapped &&
            swappedIndices &&
            (index === swappedIndices[0] || index === swappedIndices[1])
          ) {
            classes.push("swapped");
          }
          if (index >= low && index <= high) {
            classes.push("active");
          }
        }

        let classString = classes.join(" ");
        return `<span class="${classString}">${num}</span>`;
      })
      .join(", ");

    document.getElementById("result").innerHTML = `[${arrayDisplay}]`;
    document.getElementById("steps").innerText = `Step ${currentStep + 1}`;
    const statusInfoElement = document.getElementById("status-info");

    if (message) {
      statusInfoElement.innerText = message;
    } else if (swapped) {
      const [index1, index2] = swappedIndices;
      const [value1, value2] = swappedValues;
      statusInfoElement.innerText = `Swap [${index1}] and [${index2}]: ${value1} ↔ ${value2}`;
    } else {
      statusInfoElement.innerText = "Comparing";
    }

    if (low === null && high === null) {
      document.getElementById("user-instructions").innerText =
        "Finished computing";
    } else {
      document.getElementById("user-instructions").innerText =
        "See the process below!";
      let outerLoopInfo = `Low: ${low !== null ? `[${low}]` : ""}, High: ${
        high !== null ? `[${high}]` : ""
      }`;
      document.getElementById("outer-loop-info").innerText = outerLoopInfo;

      let innerLoopInfo = `i: ${i !== null ? `[${i}]` : ""}, j: ${
        j !== null ? `[${j}]` : ""
      }`;
      document.getElementById("inner-loop-info").innerText = innerLoopInfo;
    }
  }

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

  const steps = document.getElementById("steps");
  const playBtn = document.getElementById("play-btn");

  if (inputArray !== "") {
    //? reset messages
    playBtn.style.animation = "colorCycle 1s infinite";
  } else if (inputArray === "" && steps !== "") {
    playBtn.style.animation = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const inputArrayField = document.getElementById("user-input-array");
  inputArrayField.addEventListener("input", handleInputChange);

  const nextBtn = document.getElementById("next-btn");
  const previousBtn = document.getElementById("previous-btn");
  nextBtn.addEventListener("click", nextStep);
  previousBtn.addEventListener("click", previousStep);

  const playBtn = document.getElementById("play-btn");
  playBtn.addEventListener("click", runQuickSort);
});
