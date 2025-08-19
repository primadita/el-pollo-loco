export class MovableObject{
    // #region ATTRIBUTES
    x;
    y;
    width;
    height;
    img;
    speed;
    imageCache = {};
    currentImage = 0;

    // #endregion

    constructor({_img, _x = 120, _y = 250, _width = 100, _height = 150, _speed = 0.15} = {}){
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

    loadImages(arr){
        arr.forEach((path) => {
            let images = new Image();
            images.src = path;
            this.imageCache[path] = images;
        })
        
    }

    randomizedStartPosition(){
        this.x = this.x + Math.random() * 500;
    }
    
    moveRight(){

    }

    moveLeft = () => {
        this.x -= this.speed;
    }
    // #endregion
}