let ul = document.querySelector('ul');

let copyUl = () => {
    ul.nextElementSibling.innerHTML = ul.innerHTML;
}