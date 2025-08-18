export class Background{
    // #region ATTRIBUTES
    x = 0;
    y = 0;
    width = 2 * canvas.width;
    height = canvas.height;
    img;
    // #endregion

    constructor({_img} = {}){
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