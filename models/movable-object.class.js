export class MovableObject{
    // #region ATTRIBUTES
    x;
    y;
    width;
    height;
    img;

    // #endregion

    constructor({_img, _x = 120, _y = 250, _width = 100, _height = 150} = {}){
        this.img = _img;
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
    }

    // #region METHODS
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight(){

    }

    moveLeft(){

    }
    // #endregion
}