export class Background{
    // #region ATTRIBUTES
    x;
    y = 0;
    width = 2 * canvas.width;
    height = canvas.height;
    img;
    // #endregion

    constructor({_x, _img} = {}){
        this.x = _x;
        this.img = _img;
        this.loadImage(_img);
    }

    // #region METHODS
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
    // #endregion
}