// const bubbleSort = (arr) => {
//   const len = arr.length;

//   for (let i = 0; i < len; i++) {
//     for (let j = 0; j < len; j++) {
//       if (arr[j] > arr[j + 1]) {
//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//       }
//     }
//   }

//   return arr;
// };

function bubbleSort(arr) {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    console.log(i);
    for (let j = 0; j < len - 1; j++) {
      console.log(j);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}

const arrNums = [5, 3, 1, 4, 6, 6, 4, 7];

console.log(bubbleSort(arrNums));
