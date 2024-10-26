//? Utils ( sort for sorting the array)
function merge(arr, left, mid, right) {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  const L = new Array(n1);
  const R = new Array(n2);

  for (let i = 0; i < n1; i++) L[i] = arr[left + i];
  for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

  let i = 0,
    j = 0;
  let k = left;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

function mergeSort(arr, left, right) {
  if (left >= right) return;

  const mid = Math.floor(left + (right - left) / 2);
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
}

let iterations = [];
let currentStep = 0;

function binarySearch(arr, target) {
  let l = 0;
  let r = arr.length - 1;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);

    iterations.push({
      array: arr.slice(),
      l: l,
      r: r,
      mid: mid,
      comparison:
        arr[mid] === target ? "found" : arr[mid] < target ? "less" : "greater",
    });

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  iterations.push({
    array: arr.slice(),
    l: l,
    r: r,
    mid: null,
    comparison: "not found",
  });

  return -1;
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

function getInputEl() {
  let userInputEl = document.getElementById("user-input-el").value.trim();

  const el = Number(userInputEl);

  if (userInputEl === "") {
    console.log("Invalid input: empty string");
    return null;
  } else if (isNaN(el)) {
    console.log("Invalid input: not a number");
    return null;
  }
  console.log("Got: " + el + " with type of " + typeof el);

  return el;
}

function runBinarySearch(event) {
  iterations = []; //! INI SUMPAH BUAT NGE BUG, AAAAAAAAAAAAAAAAAAA
  event.preventDefault();

  let arr = getInputArr();
  mergeSort(arr, 0, arr.length - 1);
  let target = getInputEl();

  if (arr.length === 0 || target === null) {
    document.getElementById("user-instructions").innerText =
      "Please fill both inputs correctly.";
    document.getElementById("steps").innerText = "";
    document.getElementById("index-info").innerText = "";
    document.getElementById("result").innerText = "";
    document.getElementById("status-info").innerText = "";
    document.getElementById("play-btn").style.animation = "none";

    return;
  }

  const index = binarySearch(arr, target);

  currentStep = 0;
  displayCurrentStep();

  const playBtn = document.getElementById("play-btn");

  if (index === -1) {
    playBtn.style.animation = "none";
  } else {
    document.getElementById("user-instructions").innerHTML =
      "See the process below!";
    playBtn.style.animation = "none";
  }
}

function displayCurrentStep() {
  if (currentStep >= 0 && currentStep < iterations.length) {
    const { array, l, r, mid, comparison } = iterations[currentStep];

    document.getElementById("steps").innerText = `Step ${currentStep + 1}`;

    let arrayDisplay = array
      .map((num, index) => {
        let classes = [];

        if (index === mid) {
          classes.push("mid");
        }
        if (index >= l && index <= r) {
          classes.push("active-range");
        } else {
          classes.push("inactive");
        }
        if (comparison === "found" && index === mid) {
          classes.push("found");
        }
        return `<span class="${classes.join(" ")}">${num}</span>`;
      })
      .join(", ");

    document.getElementById("result").innerHTML = `[${arrayDisplay}]`;

    let statusMessage = "";
    if (comparison === "found") {
      statusMessage = `Element found at index ${mid}.`;
    } else if (comparison === "less") {
      statusMessage = `Target is greater than ${array[mid]}. Moving right.`;
    } else if (comparison === "greater") {
      statusMessage = `Target is less than ${array[mid]}. Moving left.`;
    } else if (comparison === "not found") {
      statusMessage = `Element not found in the array.`;
    }

    document.getElementById("status-info").innerText = statusMessage;

    let indexInfo = `Left: [${l}], Right: [${r}]`;
    if (mid !== null) {
      indexInfo += `, Mid: [${mid}]`;
    }
    document.getElementById("index-info").innerText = indexInfo;
    if (comparison === "found" || comparison === "not found") {
      document.getElementById("user-instructions").innerText =
        "Finished computing";
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
  checkBothInputs();
}

function checkBothInputs() {
  const inputArray = document.getElementById("user-input-array").value.trim();
  const inputEl = document.getElementById("user-input-el").value.trim();
  const instructions = document.getElementById("user-instructions");

  const playBtn = document.getElementById("play-btn");

  if (inputArray === "" && inputEl === "" && instructions === "") {
    instructions.innerText = "Please fill both inputs.";
    playBtn.style.animation = "none";
    document.getElementById("status-info").innerText = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("index-info").innerText = "";
  } else if (inputArray !== "" && inputEl !== "") {
    playBtn.style.animation = "colorCycle 1s infinite";
  } else if ((inputArray === "" || inputEl === "") && instructions !== "") {
    playBtn.style.animation = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const inputArrayField = document.getElementById("user-input-array");
  const inputElField = document.getElementById("user-input-el");

  inputArrayField.addEventListener("input", handleInputChange);
  inputElField.addEventListener("input", handleInputChange);

  const playBtn = document.getElementById("play-btn");
  playBtn.addEventListener("click", runBinarySearch);

  const nextBtn = document.getElementById("next-btn");
  const previousBtn = document.getElementById("previous-btn");
  nextBtn.addEventListener("click", nextStep);
  previousBtn.addEventListener("click", previousStep);
});
