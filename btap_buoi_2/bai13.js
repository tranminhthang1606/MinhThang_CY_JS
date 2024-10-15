let input = 132;

let checkPalindrome = (input)=>{
    let reversed = input.toString().split('').reverse().join('');
    return input === parseInt(reversed);
}

console.log(checkPalindrome(input)?'Is Palindrome':'Not Palindrome');
