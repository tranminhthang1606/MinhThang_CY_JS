let n = 10;
let array = ['a', 'a', 'ar', 'arr', 'arr', 'arr2', 'arr2'];
let highest = 0;
const filterArray = (arr) => {
    let listFiltedArr = [];
    let longestLength = 0;
    arr.forEach(el => {
        if (!listFiltedArr.includes(el)) {
            listFiltedArr.push(el);
        }
    });
    for (const item of listFiltedArr) {
        let temp = 0;
        for (const text of arr) {
            if (text == item) {
                temp += 1;
            }
            if (temp >= longestLength) {
                longestLength = temp;
            }
        }
    }
    return longestLength
}
console.log(filterArray(array));
const plusNFunc = (n, arr) => {
    let count = filterArray(arr);
    let tempArr = [];
    for (let i = 0; i < count; i++) {
        tempArr.push(n);
        n+=1;    
    }
    return [...tempArr,n];
}

console.log(plusNFunc(n, array));



