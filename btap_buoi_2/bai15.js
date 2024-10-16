let keywords = "([])";


let matchKey ={
    ')':'(',
    ']':'[',
    '}':'{'
}

let checkMatch = (keywords)=>{
    let stack = [];
    for(let i = 0; i < keywords.length; i++){
        if(keywords[i] === '(' || keywords[i] === '[' || keywords[i] === '{'){
            stack.push(keywords[i]);
        }else if(keywords[i] === ')' || keywords[i] === ']' || keywords[i] === '}'){
            if(stack.length === 0 || matchKey[keywords[i]]!== stack.pop()){
                return false;
            }
        }
    }
    return stack.length === 0;
}

console.log(checkMatch(keywords));
