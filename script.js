
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const progressContainer = document.getElementById('progress-container');
const progess = document.getElementById('progess');


//song titles
const songs = ['African Queen', 'Kilometre', 'Question'];

//keep track of song using index
let songIndex = 0;

//initially load song from DOM
loadSong(songs[songIndex]);

//this function loads song info while playing
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `image/${song}.jpg`;
}

//this function plays song
playBtn.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
        pauseSong();
    }else{
        playSong();
    }
})

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

//this functin pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

//this function plays previous song
prevBtn.addEventListener('click', prevSong);
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);

    playSong();
}

//this function will play next song
nextBtn.addEventListener('click', nextSong);
function nextSong() {
    songIndex++;
    if (songIndex > songs.length-1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);

    playSong();
}

//this function makes progress bar moves as song plays
audio.addEventListener('timeupdate', updateProgess);
function updateProgess(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
}

//this function is used to skip progress position (forward/backward)
progressContainer.addEventListener('click', setProgress);
function setProgress(e) {
    const width = this.clientWidth; //clientWidth returns viewable width of an element in px.
    const clickX = e.offsetX; //offsetX returns x-cordinate of the mouse pointer of the target ele.
    const duration = audio.duration; //this returns the total duration of the audio

    audio.currentTime = (clickX / width) * duration;
}

audio.addEventListener('ended', nextSong); //this plays next song automatically

