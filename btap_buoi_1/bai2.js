const arr = [10, 2, 3, 2, 5];

function inscreaseBubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    console.log(arr);
}

function decreaseBubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] < arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    console.log(arr);
}

function bubbleSort(arr){
    inscreaseBubbleSort(arr);
    decreaseBubbleSort(arr);
}

bubbleSort(arr);