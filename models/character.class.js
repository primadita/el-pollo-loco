import { AudioHub } from "../js/audio-hub.class.js";
import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Represents the main character controlled by the player.
 * @extends MovableObject
 */
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
    
    /**
     * Creates a new Character.
     */
    constructor(){
        super({_img: ImageManager.PEPE.walk[0], _x: 100, _y: 65, _width: 120, _height: 270, _xSpeed: 5});
        this.loadImage(ImageManager.PEPE.walk[0]);
        this.loadImages(ImageManager.PEPE.walk);
        this.loadImages(ImageManager.PEPE.jump);
        this.loadImages(ImageManager.PEPE.dead);
        this.loadImages(ImageManager.PEPE.hurt);
        this.loadImages(ImageManager.PEPE.idle);
        this.loadImages(ImageManager.PEPE.longIdle);
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.animate, 1000 / 12);
        IntervalHub.startInterval(this.action, 1000 / 60);
        IntervalHub.startInterval(this.soundEffect, 1000 / 25);
    }
    
    // #region METHODS
    /**
     * Handles character animation based on state.
     */
    animate = () => {
        if(this.isDying()){
            this.playAnimation(ImageManager.PEPE.dead);
            if(this.currentImage >= ImageManager.PEPE.dead.length - 1){
                this.world.finishDeathAnimation("lost");
            }
        } else if(this.hurt){
            this.playAnimation(ImageManager.PEPE.hurt);
            // AudioHub.playOne({_soundName: AudioHub.PEPE_DAMAGE});
        } else if(this.isAboveGround()){
            this.playAnimation(ImageManager.PEPE.jump);
            // AudioHub.playOne({_soundName: AudioHub.PEPE_JUMP});
            // TO DO: jump animation nur ein Durchlauf
        } else if(Keyboard.RIGHT || Keyboard.LEFT){
            this.playAnimation(ImageManager.PEPE.walk);
            // AudioHub.playOne({_soundName: AudioHub.PEPE_RUN});
        } else if (this.isSleeping()){
            this.playAnimation(ImageManager.PEPE.longIdle);
            // AudioHub.playOne({_soundName: AudioHub.PEPE_SNORE});
        } else {
            this.playAnimation(ImageManager.PEPE.idle);
        }
    }

    /**
     * Handles character actions based on keyboard input.
     */
    action = () => {
        if(Keyboard.RIGHT && this.x < this.world.level.levelEndX){
            this.otherDirection = false;
            this.moveRight();
        }
        if(Keyboard.LEFT && this.x > 0){
            this.otherDirection = true;
            this.moveLeft();
        }
        if(Keyboard.SPACE && !this.isAboveGround()){
            this.jump();
            this.currentImage = 0;
        }
        this.world.cameraX = -this.x + this.width; 
    }

    /**
     * Plays sound effects based on character state.
     */
    soundEffect = () => {
        if(this.isDying()){
            AudioHub.playOne({_soundName: AudioHub.PEPE_DEAD});
        } else if(this.hurt){
            AudioHub.playOne({_soundName: AudioHub.PEPE_DAMAGE});
        } else if(this.isAboveGround()){
            AudioHub.stopOne(AudioHub.PEPE_RUN);
            AudioHub.playOne({_soundName: AudioHub.PEPE_JUMP});
        } else if(Keyboard.RIGHT || Keyboard.LEFT){
            AudioHub.playOne({_soundName: AudioHub.PEPE_RUN});
        } else if (this.isSleeping()){
            AudioHub.playOne({_soundName: AudioHub.PEPE_SNORE});
        } else {
            AudioHub.stopOne(AudioHub.PEPE_RUN);
        }
    }
    // #endregion
}