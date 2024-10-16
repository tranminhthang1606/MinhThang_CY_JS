let ul2 = document.querySelector('#bai2');

let removeLi = () => {
    let lastChild = ul2.lastElementChild;
    if(!lastChild){
        alert('Danh sách rỗng');
        return;
    }   
    lastChild.remove();
}