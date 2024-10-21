const linkMusics = [
    {
        title: 'Giá Như - Soobin',
        img: 'https://avatar-ex-swe.nixcdn.com/song/2024/07/02/3/c/c/f/1719908477631_500.jpg',
        src: './assets/gia-nhu.mp3'
    },
    {
        title: 'Chiều Nay Không Có Mưa Bay',
        img: 'https://avatar-ex-swe.nixcdn.com/singer/avatar/2022/09/15/d/c/b/c/1663237004941_600.jpg',
        src: './assets/chieu-nay-ko-co-mua-bay.mp3'
    },
    {
        title: 'Người Ta Dau Thương Em',
        img: 'https://avatar-ex-swe.nixcdn.com/song/2021/02/02/f/6/0/9/1612257024442_500.jpg',
        src: './assets/ngta-dau-thuong-em.mp3'
    },
]
let audioElement = document.createElement('audio');
let pauseNode = document.querySelector('.icon-pause');
let playNode = document.querySelector('.icon-play');
const progressBar = document.getElementById('progressBar');
let titleNode = document.querySelector('.container h2');
let imageNode = document.querySelector('.playlist img');
const progress = document.querySelector('#progress');
let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let minutes = document.querySelector('#minutes');
let seconds = document.querySelector('#seconds');
let countTime = document.querySelector('#countTime')
let linkMusicsRef = new Proxy({
    value: '',
}, {
    set: function (target, prop, value) {
        if (target.value !== value) {
            if (value >= linkMusics.length - 1) {
                value = linkMusics.length - 1;
            }
            if (value <= 0) {
                value = 0;
            }
            audioElement.remove();
            audioElement = document.createElement('audio');
            audioElement.setAttribute('autoplay', '');
            let source = document.createElement('source');
            source.src = linkMusics[value].src;
            source.type = 'audio/mpeg';
            audioElement.appendChild(source);
            document.body.appendChild(audioElement);
            playingRef.value = true;
            titleNode.innerText = linkMusics[value].title;
            imageNode.src = linkMusics[value].img;
            timerMusic();
        }
        target[prop] = value;
        return true;
    },
    get: function (target, prop) {
        return target[prop];
    }
})
let songMinutes = 0;
let timerRef = new Proxy({
    value: 0
}, {
    set: function (target, prop, value) {

        if (target.value !== value) {
            if (target.value > value) {
                if ((value / 60) < songMinutes) {
                    songMinutes--;
                }
            }
            target.value = value;
            if (value < 10) {
                countTime.textContent = songMinutes + ':0' + Math.floor(value) + '/';
            }
            if (value > 10) {
                countTime.textContent = songMinutes + ':' + Math.floor(value) + '/';
            }
            if (value >= 60) {
                if (value % 60 == 0 && (value / 60) > songMinutes) {
                    songMinutes++;
                }
                if (value % 60 < 10) {
                    countTime.textContent = '0' + songMinutes + ':0' + value % 60 + '/';
                }
                countTime.textContent = '0' + songMinutes + ':' + value % 60 + '/';
            }
        }
    }
})

const timerMusic = () => {
    audioElement.addEventListener('loadedmetadata', () => {
        seconds.textContent = Math.floor(audioElement.duration % 60);
        minutes.textContent = Math.floor(audioElement.duration / 60) + ':';
    });
    audioElement.addEventListener('ended', () => {
        linkMusicsRef.value++;
    });
    audioElement.addEventListener('timeupdate', () => {

        timerRef.value = Math.floor(audioElement.currentTime);

        if (!isDragging) {
            const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
            progress.style.left = (progressBar.clientWidth - progress.clientWidth) / 100 * progressPercent + 'px';
        }
    });

    progressBar.addEventListener('click', function (e) {
        isDragging = false;
        const clickX = e.offsetX;
        const progressBarWidth = progressBar.clientWidth;
        let newLeft = clickX;
        console.log(clickX, progressBarWidth);
        if (newLeft < 0) {
            newLeft = 0;
        } else if (newLeft > progressBarWidth - progress.clientWidth) {
            newLeft = progressBarWidth - progress.clientWidth;
        }
        progress.style.left = `${newLeft}px`;
    })

    progress.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - progress.offsetLeft;
        progress.style.cursor = 'grabbing';
        playingRef.value = !playingRef.value;
        linkMusicsRef.value += 0
    });

    progress.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let newLeft = e.clientX - offsetX;
            if (newLeft < 0) {
                newLeft = 0;
            } else if (newLeft > progressBar.clientWidth - progress.clientWidth) {
                newLeft = progressBar.clientWidth - progress.clientWidth;
            }
            progress.style.left = `${newLeft}px`;
            const progressPercent = newLeft / (progressBar.clientWidth - progress.clientWidth);
            console.log(progressPercent * audioElement.duration);
            
            audioElement.currentTime = progressPercent * audioElement.duration;
        }
    });

    progress.addEventListener('mouseup', (e) => {
        isDragging = false;
        progress.style.cursor = 'grab';
        const newLeft = e.clientX - offsetX;
        const progressPercent = newLeft / (progressBar.clientWidth - progress.clientWidth);
        audioElement.currentTime = progressPercent * audioElement.duration;
    });

}

let playingRef = new Proxy({
    value: false,
}, {
    set: function (target, prop, value) {
        if (value == false) {
            audioElement.pause();
            pauseNode.classList.add('hide');
            playNode.classList.remove('hide');
            document.querySelector('.playlist').classList.remove('isPlaying')

        } else {
            audioElement.play();
            pauseNode.classList.remove('hide');
            playNode.classList.add('hide');
            document.querySelector('.playlist').classList.add('isPlaying')
        }
    }
})

const playAudio = () => {
    if (linkMusicsRef.value === '') {
        linkMusicsRef.value = 0;
    }
    playingRef.value = true;

}

const pauseAudio = () => {
    playingRef.value = false;
}

const nextAudio = () => {
    linkMusicsRef.value++;
    playingRef.value = true;
}

const prevAudio = () => {
    linkMusicsRef.value--;
    playingRef.value = true;
}
const replayAudio = () => {
    audioElement.currentTime = 0;
    playingRef.value = true;
}
linkMusics.forEach(element => {
    let musicCard = document.createElement('div');
    musicCard.classList.add('music-card');
    let musicImg = document.createElement('img');
    musicImg.src = element.img;
    musicCard.appendChild(musicImg);
    let musicTitle = document.createElement('p');
    musicTitle.textContent = element.title;
    musicCard.appendChild(musicTitle);

    musicCard.addEventListener('click', (e) => {
        document.querySelectorAll('.music-card').forEach(card => {
            card.classList.remove('music-card-active');
        });
        linkMusicsRef.value = linkMusics.indexOf(element);
        e.currentTarget.classList.add('music-card-active')
    });
    document.querySelector('.container').appendChild(musicCard);
});

timerMusic();