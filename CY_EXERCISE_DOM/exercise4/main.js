let listText = []
function replaceTextWithInput() {
    const contentDiv = document.getElementById('content');
    let content = contentDiv.innerHTML;
    let count = 1;
    content = content.replace(/{{(.*?)}}/g, function (match) {
        match = match.replace('{{', '');
        match = match.replace('}}', '');
        listText.push(match);
        return `<span>${count++}</span><input type="text" id="autoWidthInput" oninput="adjustWidth(this)" placeholder="" />`;
    });
    contentDiv.innerHTML = content;
}
function adjustWidth(input) {
    const tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden";
    tempSpan.style.whiteSpace = "pre";
    tempSpan.style.font = window.getComputedStyle(input).font;
    tempSpan.textContent = input.value || input.placeholder;
    document.body.appendChild(tempSpan);
    input.style.width = tempSpan.offsetWidth + 10 + "px";
    document.body.removeChild(tempSpan);
}


const checkInput = () => {
    let listInput = document.querySelectorAll('input');
    listInput.forEach((element, index) => {
        console.log(element.previousElementSibling);

        if (element.value == listText[index]) {

            element.style.borderBottom = "1px dotted green";
            element.previousElementSibling.style.backgroundColor = 'green'
        } else {
            element.style.borderBottom = "1px dotted red";
            element.previousElementSibling.style.backgroundColor = 'red'
        };
    });
}

const resetText = () => {
    let listInput = document.querySelectorAll('input');
    listInput.forEach((element, index) => {
        element.value = "";
        element.style.borderBottom = "1px dotted #12264f";
        element.previousElementSibling.style.backgroundColor = '#12264f'
    }
    );
}
replaceTextWithInput()