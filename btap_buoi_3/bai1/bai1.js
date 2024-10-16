let ul = document.querySelector('#bai1');

let addLi = () => {
    let lastChild = ul.lastElementChild.innerText;
    let li = document.createElement('li');
    li.innerText = Number(lastChild) + 1;
    ul.appendChild(li);
}