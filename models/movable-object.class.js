export class MovableObject{
    // #region ATTRIBUTES
    x;
    y;
    width;
    height;
    img;
    xSpeed;
    ySpeed = 0;
    acceleration = 2.5; // or gravitation
    imageCache = {};
    currentImage = 0;
    otherDirection = false;

    // #endregion

    constructor({_img, _x = 120, _y = 250, _width = 100, _height = 150, _xSpeed = 0.15} = {}){
        this.img = _img;
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        this.xSpeed = _xSpeed;
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
        });
        
    }

    playAnimation(arr){
        let i = this.currentImage % arr.length;
        let path = arr[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    randomizedStartPosition(){
        this.x = this.x + Math.random() * 1800;
    }
    
    moveRight = () => {
        this.x += this.xSpeed;
    }

    moveLeft = () => {
        this.x -= this.xSpeed;
    }

    applyGravity = () => {
        if(this.isAboveGround() || this.ySpeed > 0){
            this.y -= this.ySpeed;
            this.ySpeed -= this.acceleration;
        }
    }

    isAboveGround(){
        return this.y + this.height < 165;
    }

    jump(){
        this.ySpeed = 30;
    }
    // #endregion
}