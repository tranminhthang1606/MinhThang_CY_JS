const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [9, 10, 11]
]
// [
//     [9,4,1],
//     [10,5,2],
//     [11,6,3]
// ]

const changeMatrix = (matrix) => {
    matrix = matrix.reverse();
    let flatMatrix = matrix.flat();
    let newMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < flatMatrix.length; j += 3) {
            if (newMatrix[i]) {
                newMatrix[i].push(flatMatrix[j]);
            } else {
                newMatrix[i] = [flatMatrix[j]];
            }
        }
    }
    return newMatrix
}

console.log(changeMatrix(matrix));


