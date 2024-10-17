const questions = [
    {
        content: 'Sông nào chảy qua Hà Nội',
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/MatnuocSongHong-06112008333.JPG',
        correctAnswer: 'Sông Hồng',
        maxShowingCharacter: 2
    },
    {
        content: 'Ai là người phát minh ra bóng đèn sợi đốt',
        image: 'https://st.quantrimang.com/photos/image/2016/10/25/thomsa-edison-4.jpg',
        correctAnswer: 'Edison',
        maxShowingCharacter: 3
    },
    {
        content: 'Nguời giàu nhất thế giới ',
        image: 'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5bb22ae84bbe6f67d2e82e05%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D560%26cropX2%3D1783%26cropY1%3D231%26cropY2%3D1455',
        correctAnswer: 'Jezz Bezos',
        maxShowingCharacter: 2
    },
    {
        content: 'Thủ đô của Belarus',
        image: '',
        correctAnswer: 'Minsk',
        maxShowingCharacter: 3
    }
]

const notification = document.querySelector('.notification');
const question = document.querySelector('.question');
const answerNode = document.querySelector('.answer');
const formInput = document.querySelector('.user-answer form');
let inputValue = document.querySelector('.user-answer form input');
let countdown = document.querySelector('.countdown');
let currentIndex = 0;
let flipCountNumber = 0;
const flipCards = (e, count) => {
    if (flipCountNumber == count) {
        return;
    }
    flipCountNumber++;
    console.log(flipCountNumber);

    e.target.style.transform = 'rotateX(180deg)';
    e.target.children[0].innerText = e.target.children[0].dataset.keyword;
}
const initQuestion = (index) => {
    let flipCount = questions[index].maxShowingCharacter;
    flipCountNumber = 0;
    answerNode.innerHTML = '';
    inputValue.value = ''
    notification.innerText = `Bạn được phép chọn ${questions[index].maxShowingCharacter} lần`;
    question.innerHTML = `${questions[index].content} <br> <img width="200px" src="${questions[index].image}" />`;
    let answer = questions[index].correctAnswer.split('');
    answer.forEach(el => {
        let divNode = document.createElement('div');
        if (el == " ") {
            return;
        }
        let divNodeContent = document.createElement('div');
        divNodeContent.setAttribute('data-keyword', el);
        divNode.appendChild(divNodeContent);
        divNode.classList.add('answer-item');
        divNode.addEventListener('click', (e) => flipCards(e, flipCount));
        answerNode.appendChild(divNode);
    });
}
formInput.addEventListener('submit', function (e) {
    e.preventDefault();
    let trimmedInputValue = '';
    if (inputValue.value) {
        trimmedInputValue = inputValue.value.replaceAll(' ', '');
    }
    console.log(questions[currentIndex].correctAnswer);
    let trimmedCorrectAnswer = questions[currentIndex].correctAnswer.replaceAll(' ', '');
    if (trimmedInputValue.toLowerCase() == trimmedCorrectAnswer.toLowerCase()) {
        alert('Dung roi');
        currentIndex++;
        let countTime = 4;
        console.log(answerNode.children);
        let listAnswer = [...answerNode.children];
        listAnswer.forEach(node => {
            node.innerText = node.children[0].dataset.keyword;
        });
        let timer = setInterval(() => {
            countdown.innerText = 'Bạn sẽ được chuyển đến bài tiếp theo trong ' + countTime + ' giây';
            console.log(countTime);
            countTime--;
            if (countTime < 0) {
                initQuestion(currentIndex);
                countdown.innerText = '';
                clearInterval(timer);
                return;
            }
        }, 1000);
    } else {
        alert('Sai roi');
    }
})

initQuestion(currentIndex);

