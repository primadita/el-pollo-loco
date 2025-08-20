import { IntervalHub } from "./interval-hub.class.js";

export class MovableObject{
    // #region ATTRIBUTES
    x;
    y;
    width;
    height;
    offset = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
    realX;
    realY;
    realWidth;
    realHeight;
    img;
    xSpeed;
    ySpeed = 0;
    acceleration = 2.5; // or gravitation
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    energy = 100;
    lastHit = 0;

    // #endregion

    constructor({_img, _x = 120, _y = 250, _width = 100, _height = 150, _xSpeed = 0.15} = {}){
        this.img = _img;
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        this.xSpeed = _xSpeed;
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
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

    jump(){
        this.ySpeed = 30;
    }

    hit(){
        this.energy -= 5;
        if (this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    applyGravity = () => {
        if(this.isAboveGround() || this.ySpeed > 0){
            this.y -= this.ySpeed;
            this.ySpeed -= this.acceleration;
        }
    }

    isAboveGround(){
        return this.y < 165;
    }

    isColliding(mo){
        return this.realX + this.realWidth > mo.realX &&
            this.realY + this.realHeight > mo.realY &&
            this.realX < mo.realX + mo.realWidth &&
            this.realY < mo.realY + mo.realHeight;
    }
    isHurt(){
        let timepassed = (new Date().getTime() - this.lastHit) / 1000;
        return timepassed < 0.5
    }

    isDead(){
        return this.energy == 0;
    }

    getRealFrame = () => {
        this.realX = this.x + this.offset.left;
        this.realY = this.y + this.offset.top;
        this.realWidth = this.width - this.offset.left - this.offset.right;
        this.realHeight = this.height - this.offset.top - this.offset.bottom;
    }

    // #endregion
}