/**
 * Handles user input for the game from both keyboard and mobile touch buttons.
 * Provides static flags representing the current state of movement and action keys.
 */
export class Keyboard{
    // #region ATTRIBUTES
    /** Flag indicating whether the left arrow key (or left mobile button) is pressed. */
    static LEFT = false;
    /** Flag indicating whether the right arrow key (or right mobile button) is pressed. */
    static RIGHT = false;
    /** Flag indicating whether the spacebar (or jump mobile button) is pressed. */
    static SPACE = false;
    /** Flag indicating whether the "D" key (or throw mobile button) is pressed. */
    static D = false;
    // #endregion

    /**
     * Creates a new Keyboard handler instance.
     * Binds event listeners for both desktop keyboard input and mobile touch buttons.
     */
    constructor(){
        this.bindKeyPressEvent();
        this.bindMobileBtnPressEvents();
    }
    // region METHODS
    /**
     * Binds desktop keyboard events to update the static key flags.
     * - `ArrowRight` → RIGHT
     * - `ArrowLeft` → LEFT
     * - `Space` → SPACE
     * - `d` → D
     *
     * Handles both `keydown` and `keyup` events.
     */
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

    /**
     * Binds mobile touch button events to update the static key flags.
     * Supports `touchstart`, `touchend`, and `touchcancel` events.
     * Buttons:
     * - Left → LEFT
     * - Right → RIGHT
     * - Jump → SPACE
     * - Throw → D
     */
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