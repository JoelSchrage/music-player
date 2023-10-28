const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEle = document.getElementById("current-time");
const durationEle = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const video = document.querySelector('video');

// Music
const songs = [
    {
        name: "Divine Failure Instrumental",
        displayName: "Divine Failure Instrumental",
        artist: "elsooyer",
    },
    {
        name: "Sleep walk",
        displayName: "Sleep walk [Original instrumental]",
        artist: "Santo & Johnny"
    },
    {
        name: "MARY ON A CROSS",
        displayName: "MARY ON A CROSS",
        artist: "GHOST"
    },
    {
        name: "Prolly The Spookiest Beat",
        displayName: "Prolly The Spookiest Beat",
        artist: "Trapbabyjerry"
    },
    {
        name: "Every Breath You Take",
        displayName: "Every Breath You Take",
        artist: "The Police"
    },
    {
        name: "Lost Memory",
        displayName: "Lost Memory",
        artist: "VØJ, Narvent"
    },
    {
        name: "Here With Me",
        displayName: "Here With Me",
        artist: "d4vd"
    },
    {
        name: "Ylang Ylang",
        displayName: "Ylang Ylang",
        artist: "FKJ"
    },
    {
        name: "Where Is My Mind",
        displayName: "Where Is My Mind",
        artist: "The Pixies"
    },
    {
        name: "snowfall",
        displayName: "snowfall",
        artist: "Øneheart"
    },
    {
        name: "MURDER IN MY MIND",
        displayName: "MURDER IN MY MIND",
        artist: "KORDHELL"
    },
    {
        name: "Sahara",
        displayName: "Sahara",
        artist: "Hensonn"
    },
    {
        name: "METAMORPHOSIS",
        displayName: "METAMORPHOSIS",
        artist: "INTERWORLD"
    },
    {
        name: "NEON BLADE",
        displayName: "NEON BLADE",
        artist: "MoonDeity"
    },
    {
        name: "GigaChad Theme",
        displayName: "GigaChad Theme",
        artist: "Phonk House"
    },
    {
        name: "WAKE UP",
        displayName: "WAKE UP!",
        artist: "MoonDeity"
    },
    {
        name: "Close Eyes",
        displayName: "Close Eyes",
        artist: "DVRST"
    },
    {
        name: "Why Not",
        displayName: "Why Not",
        artist: "Ghostface Playa"
    },
    {
        name: "After Dark",
        displayName: "After Dark",
        artist: "Mr.Kitty"
    },
    {
        name: "Call Me",
        displayName: "Call Me",
        artist: "plenka"
    },
    {
        name: "PRINCE OF DARKNESS",
        displayName: "PRINCE OF DARKNESS",
        artist: "KXNVRA"
    },
    {
        name: "The Perfect Girl",
        displayName: "The Perfect Girl",
        artist: "Mareux"
    },
    {
        name: "Moonlight",
        displayName: "Moonlight",
        artist: "Kali Uchis"
    },
    {
        name: "resonance",
        displayName: "resonance",
        artist: "HOME"
    },
    {
        name: "pastlive",
        displayName: "past lives",
        artist: "sapientdream"
    },
    {
        name: "waste",
        displayName: "waste",
        artist: "KXLLSWXTCH"
    },
    {
        name: "Sweater Weather",
        displayName: "Sweater Weather",
        artist: "The Neighbourhood"
    },
    {
        name: "mienman",
        displayName: "Miên Man",
        artist: "Minh Huy"
    }
];

// ,
// {
//     name: "",
//     displayName: "",
//     artist: ""
// }
// Check if playing
let isPlaying = false;

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//mute if playing
function vidCondition(){
    if(isPlaying){
        video.muted = true;
        return;
    }
    video.muted = false;
}

// On load: Select first song randomly
let songIndex = Math.floor(Math.random() * songs.length);
loadSong(songs[songIndex]);

// Set Song Duration when it's possible to play a song
function setSongDuration(e) {
    const totalSeconds = Math.floor(e.target.duration);
    const durationMinutes = Math.floor(totalSeconds / 60);
    let durationSeconds = totalSeconds % 60;
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    durationEle.textContent = `${durationMinutes}:${durationSeconds}`;
}

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
    vidCondition();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
    vidCondition();
}

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    progress.style.width = `0%`;
    playSong();
    
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    progress.style.width = `0%`;
    playSong();
}


// Display progress bar width and calculate display for current time function
function barWidthAndCurrentTime() {
    const { duration, currentTime } = music;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEle.textContent = `${currentMinutes}:${currentSeconds}`;
}

// Update Progress Bar & Time while playing
function updateProgressBar() {
    if (isPlaying) {
        barWidthAndCurrentTime();
    }
}

// Set Progress Bar and current time if and if not playing when user clicks on progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
    if (!isPlaying) {
        barWidthAndCurrentTime();
    }
}

// Event Listeners
music.addEventListener("canplay", setSongDuration);
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
