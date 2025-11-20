export class Keyboard{
    // #region ATTRIBUTES
    static LEFT = false;
    static RIGHT = false;
    static SPACE = false;
    static D = false;
    // #endregion

    constructor(){
        this.bindKeyPressEvent();
        this.bindMobileBtnPressEvents();
    }
    // region METHODS
    bindKeyPressEvent(){
        window.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowRight'){
                Keyboard.RIGHT = true;
            }
            if(e.key == 'ArrowLeft'){
                Keyboard.LEFT = true;
            }
            if(e.key == ' '){
                Keyboard.SPACE = true;
            }
            if(e.key == 'd'){
                Keyboard.D = true;
            }
        });
        window.addEventListener("keyup",(e) => {
            if(e.key == 'ArrowRight'){
                Keyboard.RIGHT = false;
            }
            if(e.key == 'ArrowLeft'){
                Keyboard.LEFT = false;
            }
            if(e.key == ' '){
                Keyboard.SPACE = false;
            }
            if(e.key == 'd'){
                Keyboard.D = false;
            }
        });
    }
    bindMobileBtnPressEvents(){
        const leftBtn = document.getElementById('left-btn');
        const rightBtn = document.getElementById('right-btn');
        const jumpBtn = document.getElementById('jump-btn');
        const throwBtn = document.getElementById('throw-btn');

        leftBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            Keyboard.LEFT = true;
        });
        leftBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            Keyboard.LEFT = false;
        });
        leftBtn.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            Keyboard.LEFT = false;
        });
        rightBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            Keyboard.RIGHT = true;
        });
        rightBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            Keyboard.RIGHT = false;
        });
        rightBtn.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            Keyboard.RIGHT = false;
        });
        jumpBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            Keyboard.SPACE = true;
        });
        jumpBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            Keyboard.SPACE = false;
        });
        jumpBtn.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            Keyboard.SPACE = false;
        });
        throwBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            Keyboard.D = true;
        });
        throwBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            Keyboard.D = false;
        });
        throwBtn.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            Keyboard.D = false;
        });
    }
    // #endregion
}