const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEle = document.getElementById('current-time');
const durationEle = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
};

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
};

// Play or pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
};

// Starting with random song
let songIndex = Math.floor(Math.random() * songs.length);

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    };
    loadSong(songs[songIndex]);
    playSong();
};

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    };
    loadSong(songs[songIndex]);
    playSong();
};

// On Load - Select first song
loadSong(songs[songIndex]);

// Set Song Duration
function setSongDuration(e) {
    const totalSeconds = Math.floor(e.target.duration);
    const durationMinutes = Math.floor(totalSeconds / 60);
    let durationSeconds = totalSeconds % 60;
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    };
    durationEle.textContent = `${durationMinutes}:${durationSeconds}`;
};

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        };
        currentTimeEle.textContent = `${currentMinutes}:${currentSeconds}`;
    };
};

// Set Progress Bar and current time if and if not playing
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
    if (!isPlaying) {
        // currentTimeEle.textContent = music.currentTime;
        const {duration, currentTime} = music;
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        };
        currentTimeEle.textContent = `${currentMinutes}:${currentSeconds}`;

        const progressPercent = (music.currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    };
};

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('canplay', setSongDuration);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);