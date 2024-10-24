//? utils (shitty type module bug can't make me import stuffs)
// ? Merge Sort CREDITS TO GEEKSFORGEES. GOATED website
function merge(arr, left, mid, right) {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  // Create temp arrays
  const L = new Array(n1);
  const R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) L[i] = arr[left + i];
  for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

  let i = 0,
    j = 0;
  let k = left;

  // Merge the temp arrays back into arr[left..right]
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

  // Copy the remaining elements of L[], if there are any
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  // Copy the remaining elements of R[], if there are any
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

function binarySearch(arr, target) {
  let l = 0;
  let r = arr.length - 1;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      l = mid + 1; //? l piondah ke kanan MID, karena masih MID lebih kecil dari target
    } else {
      r = mid - 1; //? r pindah ke kiri MID, karena masih MID lebih besar dari target
    }
  }
  return -1; //? ya kalo gaaad target
}

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
  event.preventDefault();

  let arr = getInputArr();
  let el = getInputEl();

  if (arr.length === 0 || el === null) {
    return;
  }

  mergeSort(arr, 0, arr.length - 1);
  binarySearch(arr, el);

  let index = binarySearch(arr, el);
  console.log("Found at index:" + index);
  const playBtn = document.getElementById("play-btn");

  if (index === -1) {
    document.getElementById(
      "user-instructions"
    ).innerHTML = `Element does not exist in your array `;
    playBtn.style.animation = "none";
    return;
  }
  document.getElementById("user-instructions").innerHTML = "";
  document.getElementById(
    "result"
  ).innerHTML = ` ${el} located at index ${index} `;
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
  checkBothInputs();
}

function checkBothInputs() {
  const inputArray = document.getElementById("user-input-array").value.trim();
  const inputEl = document.getElementById("user-input-el").value.trim();
  const instructions = document.getElementById("user-instructions");

  const playBtn = document.getElementById("play-btn");

  if (inputArray !== "" && inputEl !== "") {
    instructions.innerText = "Now click the play button!";
    playBtn.style.animation = "colorCycle 1s infinite";
    userArray.innerText = "";
    userEl.innerText = "";
  } else {
    instructions.innerText = "Please fill both inputs.";
    playBtn.style.animation = "none";
    userArray.innerText = "";
    userEl.innerText = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const inputArrayField = document.getElementById("user-input-array");
  const inputElField = document.getElementById("user-input-el");

  inputArrayField.addEventListener("input", handleInputChange);
  inputElField.addEventListener("input", handleInputChange);
});
