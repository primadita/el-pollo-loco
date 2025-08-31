import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";
import { AudioHub } from "./audio-hub.class.js";
// #region Global variables;
let canvas;
let world;
let keyboard = new Keyboard();
let audioRef = false;
let volumeRef;
// #endregion

// #region INIT
function init(){
    canvas = document.getElementById('canvas');
    audioRef = getFromLocalStorage().audioRef;
    volumeRef = getFromLocalStorage().volumeRef;
    world = null;
    world = new World(canvas, keyboard, volumeRef);
    console.log("Backgrounds:", world.level.backgrounds.length);
}
// #endregion

// #region Startscreen & Local storage
function startGame(){
    let startscreenRef = document.getElementById("startscreen");
    startscreenRef.classList.add('d-none');
    init();
    volumeRef = checkVolume();
    AudioHub.playOne({_soundName: AudioHub.GAME_START});
}

function getFromLocalStorage(){
    audioRef = JSON.parse(localStorage.getItem("soundSettings"));
    volumeRef = JSON.parse(localStorage.getItem("volume"));
    return {audioRef, volumeRef};
}

function saveSoundSetting(){
    localStorage.setItem("soundSettings",JSON.stringify(audioRef));
    localStorage.setItem("volume", JSON.stringify(volumeRef));
}

function checkVolume(){
    if(audioRef){
        volumeRef = 0.2;
    } else {
        volumeRef = 0;
    }
    return volumeRef;
}
function toggleMute(){
    audioRef = !audioRef;
    volumeRef = checkVolume();
    AudioHub.setVolume(volumeRef);
    checkVolumeSettings();
    saveSoundSetting();
}

function checkVolumeSettings(){
    const audioBtnRef = document.getElementById("audio-btn-img");
    if(!audioRef){
        audioBtnRef.src = "./assets/icons/mute.png";
        AudioHub.stopAll();
    } else {
        audioBtnRef.src = "./assets/icons/soundon.png";
        AudioHub.playOne({_soundName: AudioHub.THEME_SOUND, _loop: true});
    }
}

function restartGame(){
    const endscreenRef = document.getElementById('endscreen');
    endscreenRef.classList.add('d-none');
    world.destroy();
    init();  
    AudioHub.playOne({_soundName: AudioHub.GAME_START});      
};

window.startGame = startGame;
window.toggleMute = toggleMute;
window.restartGame = restartGame;
// #endregion

// #region Keyboard Settings
window.addEventListener('keydown', (e) => {
    if(e.key == 'ArrowRight'){
        keyboard.RIGHT = true;
    }
    if(e.key == 'ArrowLeft'){
        keyboard.LEFT = true;
    }
    if(e.key == ' '){
        keyboard.SPACE = true;
    }
    if(e.key == 'd'){
        keyboard.D = true;
    }
})

window.addEventListener("keyup",(e) => {
    if(e.key == 'ArrowRight'){
        keyboard.RIGHT = false;
    }
    if(e.key == 'ArrowLeft'){
        keyboard.LEFT = false;
    }
    if(e.key == ' '){
        keyboard.SPACE = false;
    }
    if(e.key == 'd'){
        keyboard.D = false;
    }
});
// #endregion


