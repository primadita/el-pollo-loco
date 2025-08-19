import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject{
    // #region ATTRIBUTES
    world;
    // #endregion
    
    constructor(){
        super({_img: ImageManager.PEPE.walk[0], _x: 100, _y: 165, _width: 120, _height: 270, _speed: 5});
        this.loadImage(ImageManager.PEPE.walk[0]);
        this.loadImages(ImageManager.PEPE.walk);
        IntervalHub.startInterval(this.animate, 1000 / 20);
        IntervalHub.startInterval(this.action, 1000 / 60);
        
    }
    
    // #region METHODS
    animate = () => {
        if( this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
            let i = this.currentImage % ImageManager.PEPE.walk.length;
            let path = ImageManager.PEPE.walk[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }   
    }

    action = () => {
        if(this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX){
            this.otherDirection = false;
            this.moveRight();
        }
        if(this.world.keyboard.LEFT && this.x > 0){
            this.otherDirection = true;
            this.moveLeft();
        }
        this.world.cameraX = -this.x + this.width;
    }

    jump(){

    }
    // #endregion

}