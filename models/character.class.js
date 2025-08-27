import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject{
    // #region ATTRIBUTES
    world;
    offset = {
        top: 135,
        left: 30,
        bottom: 15,
        right: 35
    }
 
    // #endregion
    
    constructor(){
        super({_img: ImageManager.PEPE.walk[0], _x: 100, _y: 65, _width: 120, _height: 270, _xSpeed: 5});
        this.loadImage(ImageManager.PEPE.walk[0]);
        this.loadImages(ImageManager.PEPE.walk);
        this.loadImages(ImageManager.PEPE.jump);
        this.loadImages(ImageManager.PEPE.dead);
        this.loadImages(ImageManager.PEPE.hurt);
        this.loadImages(ImageManager.PEPE.idle);
        this.loadImages(ImageManager.PEPE.longIdle);
        // this.getRealFrame();
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.animate, 1000 / 12);
        IntervalHub.startInterval(this.action, 1000 / 60);
        
    }
    
    // #region METHODS
    animate = () => {
        if(this.isDead()){
            this.playAnimation(ImageManager.PEPE.dead);
        } else if(this.isHurt(0.5)){
            this.playAnimation(ImageManager.PEPE.hurt);
        } else if(this.isAboveGround()){
            this.playAnimation(ImageManager.PEPE.jump);
            // TO DO: jump animation nur ein Durchlauf
        } else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.D){
            this.playAnimation(ImageManager.PEPE.walk);
        }  else {
            this.playAnimation(ImageManager.PEPE.idle);
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