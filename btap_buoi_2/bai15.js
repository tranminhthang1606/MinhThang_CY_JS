let keywords = "()";

let closeKey = [')','}',']'];


let checkMatch = (keywords)=>{
    let stack = [];
    for(let i = 0; i < keywords.length; i++){
        if(keywords[i] === '(' || keywords[i] === '[' || keywords[i] === '{'){
            stack.push(keywords[i]);
        }else if(keywords[i] === ')' || keywords[i] === ']' || keywords[i] === '}'){
            if(stack.length === 0 || closeKey.indexOf(keywords[i])!== closeKey.indexOf(stack.pop())){
                return false;
            }
        }
    }
    return stack.length === 0;
}