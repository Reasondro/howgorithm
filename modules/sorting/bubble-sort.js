function bubbleSort(arr) {
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      // console.log(j);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}

const arrNums = [5, 3, 1, 4, 6, 4, 7];
console.log("Original array:", arrNums);

bubbleSort(arrNums); // Sorts the array in place
console.log("Sorted array:", arrNums); // Logs the sorted array
