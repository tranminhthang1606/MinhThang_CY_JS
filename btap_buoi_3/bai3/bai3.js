let ul3 = document.querySelector('#bai3');

let changePosition =()=>{
    let reverse = [...ul3.children].reverse();
    reverse.forEach(element => {
        ul3.appendChild(element)
    });
}