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
  return -1; // Target not found
}

let arrNum = [1, 2, 3, 4, 5, 6, 7];
let x = 3;

console.log(binarySearch(arrNum, x));
