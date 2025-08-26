import { ImageManager } from "../js/image-manager.class.js";
import { DrawableObject } from "./drawable-object.class.js";
import { IntervalHub } from "./interval-hub.class.js";

export class MovableObject extends DrawableObject{
    // #region ATTRIBUTES
   
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
    
    xSpeed;
    ySpeed = 0;
    acceleration = 2.5; // or gravitation
    
    groundLevel = 165;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    dead = false;
    canbounce = true;

    // #endregion

    constructor({_img, _x, _y, _width, _height, _xSpeed} = {}){
        super({_img, _x, _y, _width, _height});
        this.xSpeed = _xSpeed;
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }

    // #region METHODS
    

    

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
        if (!this.dead){
            this.x -= this.xSpeed;
        } else {
            this.xSpeed = 0;
        }
    }
        
    jump(){
        this.ySpeed = 30;
    }

    bounce(){
        this.ySpeed = 5;
        this.canbounce = false;
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
        } else {
            this.y = this.groundLevel;
            this.ySpeed = 0;
        }
    }

    isAboveGround(){
        return this.y < this.groundLevel;
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