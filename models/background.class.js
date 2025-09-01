/**
 * Represents a background image for the game.
 */
export class Background{
    // #region ATTRIBUTES
    x;
    y = 0;
    width = 2 * canvas.width;
    height = canvas.height;
    img;
    // #endregion

    /**
     * Creates a new Background.
     * @param {Object} [params] - Object parameters.
     * @param {number} [params._x] - X position.
     * @param {HTMLImageElement|string} [params._img] - Image or image path.
     */
    constructor({_x, _img} = {}){
        this.x = _x;
        this.img = _img;
        this.loadImage(_img);
    }

    // #region METHODS
    /**
     * Loads a background image.
     * @param {string} path - Path to the image.
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
    // #endregion
}