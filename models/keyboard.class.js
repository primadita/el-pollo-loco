export class Keyboard{
    // #region ATTRIBUTES
    static LEFT = false;
    static RIGHT = false;
    static SPACE = false;
    static D = false;
    // #endregion

    constructor(){
        // this.bindKeyPressEvent();
    }
    // region METHODS
    bindKeyPressEvent(){
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
            if(e.key == 'd'){
                keyboard.D = false;
            }
        });
    }
    bindMobileBtnPressEvents(){
        document.getElementById('left-btn').addEventListener('touchstart', () => {
            Keyboard.LEFT = true;
        });
        document.getElementById('left-btn').addEventListener('touchend', () => {
            Keyboard.LEFT = false;
        });
        document.getElementById('right-btn').addEventListener('touchstart', () => {
            Keyboard.RIGHT = true;
        });
        document.getElementById('right-btn').addEventListener('touchend', () => {
            Keyboard.RIGHT = false;
        });
        document.getElementById('jump-btn').addEventListener('touchstart', () => {
            Keyboard.SPACE = true;
        });
        document.getElementById('jump-btn').addEventListener('touchend', () => {
            Keyboard.SPACE = false;
        });
        document.getElementById('throw-btn').addEventListener('touchstart', () => {
            Keyboard.D = true;
        });
        document.getElementById('throw-btn').addEventListener('touchend', () => {
            Keyboard.D = false;
        });
    }
    // #endregion
}