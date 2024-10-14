const string = '[{(trần minh thắng16 06  - 2002  @vua    #đẹp    !trai)}]';

let processedString = string.replace(/[@#!\{\}\[\]\(\)]/g, '');

processedString = processedString.replace(/\s+/g, ' ').trim();
function handleStringA(string) {
    if(string.trim()==''){
        console.log('[]');
        return;
    }
    const splitArr = string.split(' ').reverse();
    splitArr.forEach((e, index) => {
        let splittedElements = e.split('');
        splittedElements[0] = splittedElements[0].toUpperCase();
        splitArr[index] = splittedElements.join('');

    });
    console.log(splitArr);
}

function handleStringB(string) {
    if(string.trim()==''){
        console.log(0);
        return;
    }
    const splitArr = string.split(' ');
    let numList = [];
    splitArr.forEach(e => {
        if (!isNaN(e)) {
            numList.push(Number(e));
        }
    });
    let total;
    if (numList.length > 0) {
        total = numList.reduce((acc, curr) => acc + curr, 0) / numList.length;
    } else {
        total = 0;
    }
    console.log(total);
}
function handleString(string) {
    handleStringA(string)
    handleStringB(string);
}
handleString(processedString)