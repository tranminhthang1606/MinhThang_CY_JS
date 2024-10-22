let startButton = document.querySelector('#startButton');

const container = document.querySelector('.container');
function Observe() {

    this.listeners = {
        'cart': new Set(),
        'block': new Set()
    }

    this.subscribe = function (name, event) {
        this.listeners[name].add(event);
    }

    this.unsubsribe = function (name, event) {
        this.listeners[name].delete(event);
    }

    this.notify = function (name) {
        if (this.listeners[name]) {
            this.listeners[name].forEach(function (event) {
                event();
            })
        }
    }
}


// const Block = function () {
//     this.getRandomKey = function () {
//         const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:",.<>?/`~';
//         const randomIndex = Math.floor(Math.random() * keys.length);
//         return keys[randomIndex];
//     }
// }
// const TypingBlock = function (keyword) {
//     this.keyword = keyword;
// }
let score = document.querySelector('.score span');
document.addEventListener('keydown', function (e) {
    blockRef.inputKey = e.key;
})
let mark = 0;
let cart = document.querySelector('.cart');
let step = 30;
const initGame = function () {
    const game = new Observe();
    game.subscribe('cart', createCart())
    game.subscribe('block', createBlockWord())
    game.notify('cart');
}
const getRandomKey = function () {
    const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:",.<>?/`~';
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
}

const getRandomColorRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
const createCart = function () {
    blockRef.cartWidth = cart.offsetWidth;
}


let isLose = false;
const createBlockWord = function () {
    let maxWidth = container.clientWidth - 100;
    let maxheight = container.clientHeight;
    let block = document.createElement('div');
    block.classList.add('block')
    block.style.backgroundColor = `${getRandomColorRGB()}`;
    block.style.left = Math.floor(Math.random() * (maxWidth - 0 + 1)) + 'px';
    let timing = Math.floor(Math.random() * (8 - 3 + 1)) + 3
    block.style.animation = `moving ${timing}s linear`
    let randomKey = getRandomKey();
    block.innerText = randomKey;
    container.appendChild(block);
    blockRef.blockWidth = block.offsetLeft;
    blockRef.randomKey = randomKey;
    let matchWidth = false;
    let matchHeight = false;
    function trackPosition() {
        const rect = block.getBoundingClientRect();
        if (maxheight - cart.clientHeight - 50 < (Math.floor(rect.top))) {
            matchHeight = true;
        }
        if (cart.offsetLeft > Math.floor(rect.left) - 100 && cart.offsetLeft < Math.floor(rect.right) + 100) {
            matchWidth = true;
        }
        
        console.log(matchHeight, matchWidth);

        if (matchHeight && matchWidth) {
            mark++;
            console.log(mark);
            block.remove();
            score.innerText = mark;
            let audio = new Audio('./assets/drop.mp3');
            audio.play();
            keyWordsRef.value = '';
            return;
        } else if (maxheight - cart.clientHeight + 50 < (Math.floor(rect.top))) {
            isLose = true;
            block.remove();
            let audio = new Audio('./assets/lose.mp3');
            audio.play();
            alert('Game Over!');
            return;
        }
        requestAnimationFrame(trackPosition);
    }
    trackPosition();
}
const blockRef = new Proxy({
    blockWidth: 0,
    cartWidth: 0,
    inputKey: '',
    randomKey: ''
}, {
    set: function (target, prop, value) {
        let prev = target.blockWidth;
        target[prop] = value;
        if (target.blockWidth === prev) {
            if (target.inputKey === target.randomKey) {
                cart.style.left = target.blockWidth - 75 + 'px';
            }
        }
        return true;
    }
})
const keyWordsRef = new Proxy({
    value: ''
}, {
    set: function () {
        createBlockWord()
    },
})


initGame();