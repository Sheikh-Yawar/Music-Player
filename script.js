const image = document.querySelector('img');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration')
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//*Music
const songs = [
    {
        name: 'Designer',
        displayName: 'Designer',
        artist: 'panda'
    },
    {
        name: 'Balenciaga',
        displayName: 'Balanciaga',
        artist: 'FILV'
    },
    {
        name: 'In the End',
        displayName: 'In The End',
        artist: 'Linkin Park'
    },
    {
        name: 'GTA',
        displayName: 'San Andrease',
        artist: 'Theme Song'
    },
    {
        name: 'Izmir Marsi',
        displayName: 'Izmir Marsi',
        artist: 'Cvrtoon'
    },
    {
        name: 'Mask Off',
        displayName: 'Mask Off',
        artist: 'Future'
    },
    {
        name: 'Rockstar',
        displayName: 'Rockstar',
        artist: 'Post Malone'
    },
    {
        name: 'Tuesday',
        displayName: 'Tuesday',
        artist: 'Burak Yeter'
    },
];
//* Check if playing
let isPlaying = false;
// * Play Song
const playSong = function () {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// * Pause
const pauseSong = function () {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}


// *Play or Pause Event Listener
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

//* Update DOM
const loadSong = function (song) {
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
}
// *Current Song
let songIndex = 0;

//*Prev Song
const prevSong = function () {
    songIndex--;
    if (songIndex < 0)
        songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}

//*Next Song
const nextSong = function () {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//* On Load -Select First  Song
loadSong(songs[songIndex]);

//*Update Progress Bar & Time
const updateProgressBar = function (e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        //* Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // *Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        //*Delay Switching duration Element to avoid NAN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // *Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}
//*Set Progress Bar
const setProgressBar = function (e) {
    playSong();
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;

}
//*Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);