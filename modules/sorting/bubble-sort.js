//?  ⬇️ mix algo bubble skalian swapp logic

let iterations = []; //? ini arr untuk nyimpen steps nya
let currentStep = 0;

function bubbleSort(arr) {
  const len = arr.length;
  iterations = []; // ? reset kumpulan steps/iterasi dari awal
  for (let i = 0; i < len - 1; i++) {
    const currentI = i; //? simpen i untuk state tersebut
    for (let j = 0; j < len - i - 1; j++) {
      const currentJ = j; //?  simpen  j untuk state
      // ? SAVE si arr nya jdi objek, both i dan j ny jga (swapped cman bonus supaya nanti ketauan)
      iterations.push({
        array: arr.slice(),
        i: currentI,
        j: currentJ,
        swapped: false,
      });
      if (arr[j] > arr[j + 1]) {
        const swappedIndices = [j, j + 1];
        const swappedValues = [arr[j], arr[j + 1]];
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
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
  //? nge save array akhir
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

  console.log("Got: " + arrNum + " with type of " + typeof arrNum); //? buat debugging doang

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

    let arrayDisplay;

    if (i === null && j === null) {
      //? array slesai, ditandaain sama class sendiri, beda warna
      arrayDisplay = array
        .map((num) => `<span class="sorted">${num}</span>`)
        .join(", ");
    } else {
      //? array msih di "compare" (display) ,  ini juga sama di warna
      arrayDisplay = array
        .map((num, index) => {
          if (index === j || index === j + 1) {
            //? ⬇️ bedany ini cman 2 element yg lgi di compare di highlight
            return `<span class="highlight">${num}</span>`;
          } else {
            return num;
          }
        })
        .join(", ");
    }

    document.getElementById("result").innerHTML = `[${arrayDisplay}]`;
    document.getElementById("user-array").innerHTML = `Step ${currentStep + 1}`;
    const statusInfoElement = document.getElementById("status-info");

    let outerLoopInfo;
    if (i !== null) {
      outerLoopInfo = `Outer Loop (i): ${i}`;
    } else {
      outerLoopInfo = "";
    }
    document.getElementById("outer-loop-info").innerText = outerLoopInfo;

    let innerLoopInfo;
    if (j !== null) {
      innerLoopInfo = `Inner Loop (j): ${j}`;
    } else {
      innerLoopInfo = "";
    }
    document.getElementById("inner-loop-info").innerText = innerLoopInfo;

    if (swapped) {
      const [index1, index2] = swappedIndices;
      const [value1, value2] = swappedValues;
      statusInfoElement.innerText = `Swap [${index1}] and [${index2}]: ${value1} ↔ ${value2}`;
    } else if (i === null) {
      statusInfoElement.innerText = "SORTED!";
    } else {
      statusInfoElement.innerText = "";
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
  const instructions = document.getElementById("user-instructions");

  const userArray = document.getElementById("user-array");
  const playBtn = document.getElementById("play-btn");

  const outerLoopInfo = document.getElementById("outer-loop-info");

  if (inputArray !== "") {
    //? reset message, entah knapa bbrapa hrus di reset manual (reformat nanti)
    instructions.innerText = "Now click the play button!!!!";
    playBtn.style.animation = "colorCycle 1s infinite";
    userArray.innerText = "";
    outerLoopInfo.innerText = "";
  } else {
    //? reset message, entah knapa bbrapa hrus di reset manual (reformat nanti)

    instructions.innerText = "Fill your array!";
    playBtn.style.animation = "none";
    outerLoopInfo.innerText = "";

    userArray.innerText = "";
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
  playBtn.addEventListener("click", runBubbleSort);
});
