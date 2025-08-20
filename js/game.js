import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";

let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
    console.log("My character is ", world.character);
}
init();

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
});
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
})