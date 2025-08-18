export class MovableObject{
    // #region ATTRIBUTES
    x = 120;
    y = 250;
    width= 100;
    height= 150;
    img;

    // #endregion

    constructor(){

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