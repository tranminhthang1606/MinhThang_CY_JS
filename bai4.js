
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
let myMail = 'minhthangtran1606@gmail.com';
console.log(isValidEmail(myMail) ? 'Hợp lệ' : 'Không hợp lệ');
