/**
 * @file Main entry point for the game "El Pollo Loco".
 * Handles initialization, game start, audio settings, local storage, keyboard input, and screen transitions.
 * This file manages the game lifecycle, user interactions, and global state.
 */

import { DesertFirstLayer } from "../models/desert-first-layer.class.js";
import { DesertSecondLayer } from "../models/desert-second-layer.class.js";
import { DesertThirdLayer } from "../models/desert-third-layer.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { Sky } from "../models/sky.class.js";
import { World } from "../models/world.class.js";
import { AudioHub } from "./audio-hub.class.js";

// #region Global variables

/** @type {HTMLCanvasElement} The main game canvas. */
let canvas;
/** @type {World} The current game world instance. */
let world;
/** @type {Keyboard} Keyboard input handler. */
let keyboard = new Keyboard();
/** @type {boolean} Whether audio is enabled. */
let audioRef = false;
/** @type {number} The current audio volume. */
let volumeRef;
/** @type {HTMLElement} Reference to the endscreen element. */
const endscreenRef = document.getElementById('endscreen');
/** @type {HTMLElement} Reference to the startscreen element. */
const startscreenRef = document.getElementById("startscreen");
// #endregion
const loadingscreenRef = document.getElementById("loading-scr");
const mobileButtonRef = document.getElementById("mobile-btn");
const legalNoticeRef = document.getElementById("imprint-btn");
// #region INIT

/**
 * Initializes the game world and canvas.
 * Resets background positions and creates a new World instance.
 */
function init(){
    canvas = document.getElementById('canvas');
    resetBackground();
    world = null;
    world = new World(canvas, keyboard, volumeRef);
    if(mobileButtonRef){
        mobileButtonRef.classList.remove("d-none");
        mobileButtonRef.classList.add("d-flex");
    }
}

/**
 * Loads site settings from local storage and applies audio settings.
 * Called on page load.
 */
function loadSiteInBackground(){
    getFromLocalStorage();
    checkVolumeSettings();
    setThemeSound();
}

/**
 * Retrieves audio settings from local storage.
 * Updates the global audioRef variable.
 */
function getFromLocalStorage(){
    let soundSettings = JSON.parse(localStorage.getItem("audioRef"));
    if (soundSettings !== null){
        audioRef = soundSettings;
    }
}

function showLegalNotice(){
    startscreenRef.classList.remove("d-flex");
    startscreenRef.classList.add("d-none");
    legalNoticeRef.classList.remove("d-none");
    legalNoticeRef.classList.add("d-flex");
}

function closeLegalNotice(){
    legalNoticeRef.classList.remove("d-flex");
    legalNoticeRef.classList.add("d-none");
    startscreenRef.classList.remove("d-none");
    startscreenRef.classList.add("d-flex");
}

function showLoadScreen(){
    loadingscreenRef.classList.add('d-flex');
}

function openGameCanvas(){
    loadingscreenRef.classList.remove('d-flex');
    loadingscreenRef.classList.add('d-none');
    init();
    console.log('the game starts');
}
// #endregion

// #region Startscreen & Local storage

/**
 * Starts the game by hiding the start screen and initializing the world.
 * Also sets the theme sound.
 */
function startGame(){
    AudioHub.playOne({_soundName: AudioHub.GAME_START}); 
    startscreenRef.classList.add('d-none');
    legalNoticeRef.classList.remove('d-flex');
    legalNoticeRef.classList.add('d-none');
    loadingscreenRef.classList.remove('d-none');
    mobileButtonRef.classList.remove("allowed");
    // if(mobileButtonRef){
    //     mobileButtonRef.classList.add("d-none");
    // }
    setTimeout(() => {
        setTimeout(() => {
            showLoadScreen();
            loadSiteInBackground();
        },3000);
        openGameCanvas();
        setThemeSound();
        if(window.innerWidth <= 720 || window.innerHeight <= 480){
            mobileButtonRef.classList.add("allowed");
        }
        
    }, 3000);
}

/**
 * Toggles the mute state for game audio.
 * Updates UI and saves the new setting to local storage.
 */
function toggleMute(){
    audioRef = !audioRef;
    checkVolumeSettings();
    saveVolumeSettings();
}

/**
 * Updates the audio button UI and sets the global audio volume.
 * Called whenever audioRef changes.
 */
function checkVolumeSettings(){
    const audioBtnRef = document.getElementById("audio-btn-img");
    if(!audioRef){
        audioBtnRef.src = "./assets/icons/mute.png";
        AudioHub.VOLUME = 0;
    } else {
        audioBtnRef.src = "./assets/icons/soundon.png";
        AudioHub.VOLUME = 0.2;
    }
}

/**
 * Sets the theme sound volume and starts playback.
 * Called when the game starts or restarts.
 */
function setThemeSound(){
    if(audioRef){
        AudioHub.VOLUME = 0.2;
    } else {
        AudioHub.VOLUME = 0;
    }
    // TODO: Nochmal einkommentieren
    // AudioHub.playOne({_soundName: AudioHub.THEME_SOUND, _loop: true});
}

/**
 * Saves the current audio setting to local storage.
 */
function saveVolumeSettings(){
    localStorage.setItem("audioRef", JSON.stringify(audioRef));
}

/**
 * Resets the background layer positions to their initial values.
 * Ensures backgrounds are correctly positioned when restarting the game.
 */
function resetBackground(){
    Sky.XPOS = -2 * canvas.width;
    DesertFirstLayer.XPOS = -2 * canvas.width;
    DesertSecondLayer.XPOS = -2 * canvas.width;
    DesertThirdLayer.XPOS = -2 * canvas.width;
}

/**
 * Restarts the game by hiding the end screen, reinitializing the world, and playing the start sound.
 */
function restartGame(){
    endscreenRef.classList.add('d-none');
    init();  
    setThemeSound();
    AudioHub.playOne({_soundName: AudioHub.GAME_START});      
};

/**
 * Returns to the home/start screen from the end screen.
 * Updates the visibility of relevant UI elements.
 */
function backToHome(){
    endscreenRef.classList.remove('d-flex');
    endscreenRef.classList.add('d-none');
    startscreenRef.classList.remove('d-none');
    startscreenRef.classList.add('d-flex');
}

window.startGame = startGame;
window.toggleMute = toggleMute;
window.restartGame = restartGame;
window.backToHome = backToHome;
window.showLegalNotice = showLegalNotice;
window.closeLegalNotice = closeLegalNotice;
// #endregion

// #region Keyboard Settings

/**
 * Handles keydown events for game controls.
 * Sets the corresponding property in the keyboard object to true.
 */
// window.addEventListener('keydown', (e) => {
//     if(e.key == 'ArrowRight'){
//         keyboard.RIGHT = true;
//     }
//     if(e.key == 'ArrowLeft'){
//         keyboard.LEFT = true;
//     }
//     if(e.key == ' '){
//         keyboard.SPACE = true;
//     }
//     if(e.key == 'd'){
//         keyboard.D = true;
//     }
// })

// /**
//  * Handles keyup events for game controls.
//  * Sets the corresponding property in the keyboard object to false.
//  */
// window.addEventListener("keyup",(e) => {
//     if(e.key == 'ArrowRight'){
//         keyboard.RIGHT = false;
//     }
//     if(e.key == 'ArrowLeft'){
//         keyboard.LEFT = false;
//     }
//     if(e.key == ' '){
//         keyboard.SPACE = false;
//     }
//     if(e.key == 'd'){
//         keyboard.D = false;
//     }
// });
// #endregion


