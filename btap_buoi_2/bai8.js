const a = {
    a: 'hehe',
    b: 'hoho'
};

const copyFunction = (arr) => {
    let copyObject={};
    for (const [key,value] of Object.entries(arr)) {
        copyObject[key] = value   
    }
    return copyObject;
}

let copyObject = copyFunction(a);
copyObject.a = "vua dep trai";
console.log(copyObject);
console.log(a);







