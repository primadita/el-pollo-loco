import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject{
    // #region ATTRIBUTES
    world;
    // #endregion
    
    constructor(){
        super({_img: ImageManager.PEPE.walk[0], _x: 100, _y: 65, _width: 120, _height: 270, _xSpeed: 5});
        this.loadImage(ImageManager.PEPE.walk[0]);
        this.loadImages(ImageManager.PEPE.walk);
        this.loadImages(ImageManager.PEPE.jump);
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.animate, 1000 / 12);
        IntervalHub.startInterval(this.action, 1000 / 60);
        
    }
    
    // #region METHODS
    animate = () => {
        if(this.isAboveGround()){
            this.playAnimation(ImageManager.PEPE.jump);
        } else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
            this.playAnimation(ImageManager.PEPE.walk);
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
        if(this.world.keyboard.SPACE && !this.isAboveGround()){
            this.jump();
        }
        this.world.cameraX = -this.x + this.width; 
    }
    // #endregion
}