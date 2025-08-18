export class MovableObject{
    // #region ATTRIBUTES
    x;
    y;
    width;
    height;
    img;
    speed;

    // #endregion

    constructor({_img, _x = 120, _y = 250, _width = 100, _height = 150, _speed = 10} = {}){
        this.img = _img;
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        this.speed = _speed;
    }

    // #region METHODS
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    randomizedStartPosition(){
        this.x = this.x + Math.random() * 500;
    }
    
    moveRight(){

    }

    moveLeft = () => {
        this.x -= 0.15;
    }
    // #endregion
}