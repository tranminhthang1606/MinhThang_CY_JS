// bai 1
function checkPrimeNumber(number) {
    if (number <= 1) {
        return false;
    }
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return number+' không phải số nguyên tố';
        }
    }
    return number+' là số nguyên tố';
}

function checkPerfectNumber(number) {
    let arrNum = [];
    for (let i = 1; i < number; i++) {
        if (number % i === 0) {
            arrNum.push(i);
        }
    }
    let sum = arrNum.reduce((acc, curr) => acc + curr, 0);
    if (sum === number) {
        return number + ' là số hoàn hảo';
    } else {
        return number + ' không phải là số hoàn hảo';
    }
}


function checkNum(number) {
    if (number) {
        console.log(checkPrimeNumber(number));
        console.log(checkPerfectNumber(number));
    } else {
        console.log('Số không hợp lệ');
    }
}

// let checkNumList = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
// for (const item of checkNumList) {
//     checkNum(item);
// }

checkNum(3623);
