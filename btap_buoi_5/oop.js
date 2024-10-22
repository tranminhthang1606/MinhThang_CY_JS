class MusicPlayer {
    constructor(musics) {
        this.linkMusics = musics;
        this.audioElement = document.createElement('audio');
        this.pauseNode = document.querySelector('.icon-pause');
        this.playNode = document.querySelector('.icon-play');
        this.progressBar = document.getElementById('progressBar');
        this.titleNode = document.querySelector('.container h2');
        this.imageNode = document.querySelector('.playlist img');
        this.progress = document.querySelector('#progress');
        this.isDragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.minutes = document.querySelector('#minutes');
        this.seconds = document.querySelector('#seconds');
        this.countTime = document.querySelector('#countTime');
        this.isCounting = false;
        this.songMinutes = 0;

        this.timerRef = new Proxy({ value: 0 }, {
            set: (target, prop, value) => this.updateTimer(target, prop, value)
        });

        this.linkMusicsRef = new Proxy({ value: '' }, {
            set: (target, prop, value) => this.updateMusic(target, prop, value),
            get: (target, prop) => target[prop]
        });

        this.playingRef = new Proxy({ value: false }, {
            set: (target, prop, value) => this.togglePlayPause(value)
        });

        this.init();
        this.renderMusicList();
        this.timerMusic();
    }

    updateMusic(target, prop, value) {
        if (target.value !== value) {
            if (value >= this.linkMusics.length - 1) {
                value = this.linkMusics.length - 1;
            }
            if (value <= 0) {
                value = 0;
            }
            this.audioElement.remove();
            this.audioElement = document.createElement('audio');
            this.audioElement.setAttribute('autoplay', '');
            let source = document.createElement('source');
            source.src = this.linkMusics[value].src;
            source.type = 'audio/mpeg';
            this.audioElement.appendChild(source);
            document.body.appendChild(this.audioElement);
            this.playingRef.value = true;
            this.titleNode.innerText = this.linkMusics[value].title;
            this.imageNode.src = this.linkMusics[value].img;
            this.timerMusic();
        }
        target[prop] = value;
        return true;
    }

    updateTimer(target, prop, value) {
        if (target.value !== value) {
            if (target.value > value && (value / 60) < this.songMinutes) {
                this.songMinutes = Math.floor(value / 60);
            }
            target.value = value;

            let formattedTime = this.formatTime(value);
            this.countTime.textContent = formattedTime;
        }
    }

    formatTime(value) {
        if (value < 60) {
            return this.songMinutes + ':' + (value < 10 ? '0' + value : value) + '/';
        } else {
            if (!this.isDragging && value >= 60 && (value / 60) > this.songMinutes) {
                this.songMinutes = Math.floor(value / 60);
            }
            let seconds = value % 60;
            return '0' + this.songMinutes + ':' + (seconds < 10 ? '0' + seconds : seconds) + '/';
        }
    }

    togglePlayPause(value) {
        if (value === false) {
            this.audioElement.pause();
            this.pauseNode.classList.add('hide');
            this.playNode.classList.remove('hide');
            document.querySelector('.playlist').classList.remove('isPlaying');
        } else {
            this.audioElement.play();
            this.pauseNode.classList.remove('hide');
            this.playNode.classList.add('hide');
            document.querySelector('.playlist').classList.add('isPlaying');
        }
    }

    playAudio() {
        if (this.linkMusicsRef.value === '') {
            this.linkMusicsRef.value = 0;
        }
        this.playingRef.value = true;
    }

    pauseAudio() {
        this.playingRef.value = false;
    }

    nextAudio() {
        this.linkMusicsRef.value++;
        this.playingRef.value = true;
    }

    prevAudio() {
        this.linkMusicsRef.value--;
        this.playingRef.value = true;
    }

    replayAudio() {
        this.audioElement.currentTime = 0;
        this.playingRef.value = true;
    }

    init() {
        this.progressBar.addEventListener('click', (e) => this.onProgressBarClick(e));
        this.progress.addEventListener('mousedown', (e) => this.onProgressMouseDown(e));
        this.progress.addEventListener('mousemove', (e) => this.onProgressMouseMove(e));
        this.progress.addEventListener('mouseup', (e) => this.onProgressMouseUp(e));
    }

    onProgressBarClick(e) {
        this.isDragging = false;
        this.isCounting = false;
        const clickX = e.offsetX;
        const progressBarWidth = this.progressBar.clientWidth;
        let newLeft = clickX;

        if (newLeft < 0) newLeft = 0;
        else if (newLeft > progressBarWidth - this.progress.clientWidth) newLeft = progressBarWidth - this.progress.clientWidth;

        const progressPercent = newLeft / (this.progressBar.clientWidth - this.progress.clientWidth);
        this.audioElement.currentTime = progressPercent * this.audioElement.duration;
        this.timerRef.value = Math.floor(this.audioElement.currentTime);
    }

    onProgressMouseDown(e) {
        this.isDragging = true;
        this.isCounting = false;
        this.offsetX = e.clientX - this.progress.offsetLeft;
        this.progress.style.cursor = 'grabbing';
        this.playingRef.value = !this.playingRef.value;
    }

    onProgressMouseMove(e) {
        if (this.isDragging) {
            let newLeft = e.clientX - this.offsetX;
            if (newLeft < 0) newLeft = 0;
            else if (newLeft > this.progressBar.clientWidth - this.progress.clientWidth) newLeft = this.progressBar.clientWidth - this.progress.clientWidth;

            this.progress.style.left = `${newLeft}px`;
            const progressPercent = newLeft / (this.progressBar.clientWidth - this.progress.clientWidth);
            this.audioElement.currentTime = progressPercent * this.audioElement.duration;
            this.timerRef.value = Math.floor(this.audioElement.currentTime);
        }
    }

    onProgressMouseUp(e) {
        this.isDragging = false;
        this.progress.style.cursor = 'grab';
        const newLeft = e.clientX - this.offsetX;
        const progressPercent = newLeft / (this.progressBar.clientWidth - this.progress.clientWidth);
        this.audioElement.currentTime = progressPercent * this.audioElement.duration;
        this.timerRef.value = Math.floor(this.audioElement.currentTime);
    }

    timerMusic() {
        this.audioElement.addEventListener('loadedmetadata', () => {
            this.seconds.textContent = Math.floor(this.audioElement.duration % 60) < 10 ? '0' + Math.floor(this.audioElement.duration % 60) : Math.floor(this.audioElement.duration % 60);
            this.minutes.textContent = Math.floor(this.audioElement.duration / 60) + ':';
        });

        this.audioElement.addEventListener('ended', () => {
            this.linkMusicsRef.value++;
        });

        this.audioElement.addEventListener('timeupdate', () => {
            this.isCounting = true;
            this.timerRef.value = Math.floor(this.audioElement.currentTime);
            if (!this.isDragging) {
                const progressPercent = (this.audioElement.currentTime / this.audioElement.duration) * 100;
                this.progress.style.left = (this.progressBar.clientWidth - this.progress.clientWidth) / 100 * progressPercent + 'px';
            }
        });
    }

    renderMusicList() {
        this.linkMusics.forEach((element) => {
            let musicCard = document.createElement('div');
            musicCard.classList.add('music-card');
            let musicImg = document.createElement('img');
            musicImg.src = element.img;
            musicCard.appendChild(musicImg);
            let musicTitle = document.createElement('p');
            musicTitle.textContent = element.title;
            musicCard.appendChild(musicTitle);

            musicCard.addEventListener('click', (e) => this.onMusicCardClick(e, element));
            document.querySelector('.container').appendChild(musicCard);
        });
    }

    onMusicCardClick(e, element) {
        document.querySelectorAll('.music-card').forEach(card => card.classList.remove('music-card-active'));
        this.linkMusicsRef.value = this.linkMusics.indexOf(element);
        e.currentTarget.classList.add('music-card-active');
    }
}

// Initialize the music player with the song data
const musics = [
    {
        title: 'Giá Như - Soobin',
        img: 'https://avatar-ex-swe.nixcdn.com/song/2024/07/02/3/c/c/f/1719908477631_500.jpg',
        src: './assets/gia-nhu.mp3'
    },
    {
        title: 'Chiều Nay Không Có Mưa Bay',
        img: 'https://avatar-ex-swe.nixcdn.com/song/2024/07/02/3/c/c/f/1719908477631_500.jpg',
        src: './assets/chieu-nay-khong-co-mua-bay.mp3'
    }
];

const player = new MusicPlayer(musics);
