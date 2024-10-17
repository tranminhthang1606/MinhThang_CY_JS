const num_1 = document.querySelector('.num-1');
const num_2 = document.querySelector('.num-2');
const result = document.querySelector('#result');
const operator = document.querySelector('#operator');
const getResult = (method) => {
 
    if(!num_1.value || !num_2.value) {
        alert('Bạn chưa nhập số !');
        return;
    }
    let num1 = Number(num_1.value);
    let num2 = Number(num_2.value);
    switch (method) {
        case 'plus':
            operator.innerText = '+';
            result.innerText = num1 + num2;
            break;
        case 'sub':
            operator.innerText = '-';
            result.innerText = num1 - num2;
            break;
        case 'multiple':
            operator.innerText = 'x';
            result.innerText = num1 * num2;
            break;

        case 'divide':
            operator.innerText = ':';
            result.innerText = num1 / num2;
            break;

        default:
            break;
    }
}

