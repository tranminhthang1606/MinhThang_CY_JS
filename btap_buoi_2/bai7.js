const nestedArray = [1, [2, [3, [4, 5,6,7,8,9]]]];

let newNestedArray = nestedArray.flat(Infinity);

console.log(newNestedArray);
