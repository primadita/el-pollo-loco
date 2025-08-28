import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";
// #region Global variables;
let canvas;
let world;
let keyboard = new Keyboard();
let audioRef = false;
// #endregion

// #region INIT
function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
    console.log("My character is ", world.character);
    getFromLocalStorage();
}
// #endregion

// #region Startscreen & Local storage
function startGame(){
    let startscreenRef = document.getElementById("startscreen");
    startscreenRef.classList.add('d-none');
    init();
}

function getFromLocalStorage(){
    audioRef = JSON.parse(localStorage.getItem("soundSettings"));
}

function saveSoundSetting(){
    localStorage.setItem("soundSettings",JSON.stringify(audioRef));
}

function toggleMute(){
    const audioBtnRef = document.getElementById("audio-btn-img");
    audioRef = !audioRef;
    audioBtnRef.src = !audioRef ? "./assets/icons/mute.png" : "./assets/icons/soundon.png";
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


