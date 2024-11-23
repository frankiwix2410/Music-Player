const image = document.querySelector('img');
const titulo = document.getElementById('titulo');
const artista = document.getElementById('artista');

const progressContainer = document.getElementById('progressBar');
const progress = document.getElementById('progress');

const tiempoActual = document.getElementById('tiempoActual');
const duracion = document.getElementById('tiempoDuracion');

const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Playlist
const songs = [
    {
        name: 'song1',
        displayName: 'Peaches',
        artista: 'Justin Bieber',
    },
    {
        name: 'song2',
        displayName: 'Me late',
        artista: 'Alleh - Yorghaki',
    },
    {
        name: 'song3',
        displayName: 'Hasta Aqui Llegue',
        artista: 'Beele - Nanpa Basico',
    },
];

let isPlaying = false;

// Función play
function playSong() {
    isPlaying = true;
    playBtn.setAttribute('name', 'pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Función pause
function pauseSong() {
    isPlaying = false;
    playBtn.setAttribute('name', 'play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Toggle play/pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Cargar canción
function loadSong(song) {
    titulo.textContent = song.displayName;
    artista.textContent = song.artista;
    music.src = `Canciones/${song.name}.mp3`;
    image.src = `Imagenes/${song.name}.jpeg`;
}

let songIndex = 0;

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Actualizar barra de progreso y tiempo
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (duration) {
            duracion.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        let currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        tiempoActual.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

// Inicializar canción
loadSong(songs[songIndex]);
