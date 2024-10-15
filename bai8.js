const a = {
    a: 'hehe',
    b: 'hoho'
};
const copyFunction = (arr) => {
    return {...arr}
}

const result = copyFunction(a);
result.a = 'vua dep trai';
console.log(result);
console.log(a);

