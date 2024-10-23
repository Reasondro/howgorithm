const canvas = document.getElementById("sortingCanvas");
const ctx = canvas.getContext("2d");

function createCanvas(width, height, set2dTransform = true) {
  const ratio = Math.ceil(window.devicePixelRatio);
  const canvas = document.createElement("canvas");
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  if (set2dTransform) {
    canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  return canvas;
}

ctx.font = "110px Arial";
ctx.fillText("Hello World", 10, 80);

function runBubbleSortC() {
  bubbleSort(array);
  return false;
}
