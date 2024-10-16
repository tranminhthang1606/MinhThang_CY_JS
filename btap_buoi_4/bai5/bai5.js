let ul1 = document.querySelector('ul');
let ul2 = ul1.nextElementSibling;
console.log(ul1, ul2);

let copyMatchLi = () => {
    let childList = [];
    for (const li1 of ul1.children) {
        console.log(li1.innerText);
        for (const li2 of ul2.children)  {
            if(li1.innerText == li2.innerText){
                childList.push(li1);
            }
        }
    }
    childList.forEach(element => {
        ul2.nextElementSibling.appendChild(element);
    });   
}
