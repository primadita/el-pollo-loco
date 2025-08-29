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
    world = new World(canvas, keyboard);
    audioRef = getFromLocalStorage().audioRef;
    volumeRef = getFromLocalStorage().volumeRef;
    // AudioHub.playOne({_soundname: AudioHub.THEME_SOUND, _loop: true});
}
// #endregion

// #region Startscreen & Local storage
function startGame(){
    let startscreenRef = document.getElementById("startscreen");
    startscreenRef.classList.add('d-none');
    volumeRef = checkVolume();
    AudioHub.playOne({_soundName: AudioHub.GAME_START, _vol: volumeRef});
    init();
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
    const audioBtnRef = document.getElementById("audio-btn-img");
    audioRef = !audioRef;
    if(!audioRef){
        audioBtnRef.src = "./assets/icons/mute.png";
        AudioHub.stopAll();
        volumeRef = 0;
    } else {
        audioBtnRef.src = "./assets/icons/soundon.png";
        volumeRef = 0.2;
        AudioHub.playOne({_soundName: AudioHub.THEME_SOUND, _loop: true, _vol: volumeRef});
    }
    saveSoundSetting();
}
window.startGame = startGame;
window.toggleMute = toggleMute;
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


