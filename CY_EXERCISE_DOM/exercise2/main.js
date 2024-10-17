const questions = [
    {
        content: "Câu hỏi 1: Đông Lào là nước nào ?",
        answers: [
            "A.Việt Nam",
            "B.Lào",
            "C.Philipine",
            "D.Indonesia"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 2: Tây Lào là nước nào",
        answers: [
            "A.Miến Điện",
            "B.Ấn Độ",
            "C.Nepal",
            "D.Thái Lan"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 3: Nam Lào là nước nào",
        answers: [
            "A.Campuchia",
            "B.Malaysia",
            "C.Singapore",
            "D.Việt Nam"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 4: Bắc Lào là nước nào",
        answers: [
            "A.Trung Quốc",
            "B.Hàn Quốc",
            "C.Nhật Bản",
            "D.Hoa Kỳ"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 5: Lào có bao nhiêu tỉnh thành",
        answers: [
            "A.14",
            "B.15",
            "C.16",
            "D.17"
        ],
        correctAnswer: 1
    },
    {
        content: "Câu hỏi 6: Đâu là thủ đô của Lào",
        answers: [
            "A.Hà Nội",
            "B.Bangkok",
            "C.Vientiane",
            "D.Phnom Penh"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 7: Lào có biển không",
        answers: [
            "A.Có",
            "B.Không",
            "C.Có và không",
            "D.Không và có"
        ],
        correctAnswer: 1
    },
    {
        content: "Câu hỏi 8: Lào có sân bay quốc tế không",
        answers: [
            "A.Có",
            "B.Không",
            "C.Có và không",
            "D.Không và có"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 9: Lào có biên giới với Việt Nam không",
        answers: [
            "A.Có",
            "B.Không",
            "C.Có và không",
            "D.Không và có"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 10: Thủ đô của Brueni là gì",
        answers: [
            "A.Bangkok",
            "B.Bandar Seri Begawan",
            "C.Vientiane",
            "D.Phnom Penh"
        ],
        correctAnswer: 1
    }
];
const wrapper = document.querySelector('.wrapper');
const answersGroup = document.querySelector('.answers');
const question = document.querySelector('.question');
const table_list = document.querySelector('.table-container tbody');
const table = document.querySelector('.table-container');
const pointNode = document.querySelector('.score span');
let listDoneQuizz = [];
const initQuestion = (stt) => {
    answersGroup.innerHTML = '';
    question.innerText = questions[stt].content;
    questions[stt].answers.forEach((element, index) => {
        let divNode = document.createElement('div');
        divNode.innerText = element;
        divNode.classList.add('answer');
        if (questions[stt].answered && index == questions[stt].answer) {
            divNode.classList.add('answered');
        }
        answersGroup.appendChild(divNode);
    });
    let answers = document.querySelectorAll('.answer');
    answers.forEach((answer, index) => {
        answer.addEventListener('click', () => checkAnswer(questions, stt, index));
    });
}
let currentIndex = 0;
function checkAnswer(questions, stt, answer) {
    questions[stt].answer = answer;
    questions[stt].answered = true;
    listDoneQuizz = [...questions]
    if (currentIndex + 1 >= questions.length) {
        currentIndex = currentIndex;
        initQuestion(currentIndex);
        return;
    }
    currentIndex++;
    initQuestion(currentIndex);
}
const changeQuestion = (step) => {
    currentIndex += step
    console.log(currentIndex);
    if (currentIndex < 0) {
        currentIndex = 0;
        return;
    }
    if (currentIndex >= questions.length) {
        currentIndex = questions.length - 1
        return;
    }
    initQuestion(currentIndex);
}
let total_point = 0;
const submitAnswer = () => {
    table.classList.remove('hide');
    total_point = 0;
    table_list.innerHTML = '';
    listDoneQuizz.forEach((item) => {
        if (item.correctAnswer == item.answer) {
            total_point += 1;
        }
        let html = `<tr><td>${item.content}</td><td>${item.answers[item.correctAnswer]}</td><td>${item.answers[item.answer] ? item.answers[item.answer] : 'Bỏ Trống'}</td><td>${item.correctAnswer == item.answer ? 1 : 0}</td></tr>`;
        table_list.innerHTML += html;
    })
    pointNode.innerText = total_point;
}
initQuestion(0);

