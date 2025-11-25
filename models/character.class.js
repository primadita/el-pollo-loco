import { AudioHub } from "../js/audio-hub.class.js";
import { ImageManager } from "../js/image-manager.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Represents the main controllable player character.
 * Handles movement, animations, sound effects, and interaction
 * with the world environment. States such as jumping, being hurt,
 * sleeping, or dying determine which animation and sound is played.
 *
 * @extends MovableObject
 */
export class Character extends MovableObject{
    // #region ATTRIBUTES
    /**
     * Reference to the game world the character belongs to.
     * Assigned externally after instantiation.
     * @type {import('./world.class.js').World}
     */
    world;

    /**
     * Collision offset values to fine-tune the hitbox around the character.
     * @type {{ top: number, left: number, bottom: number, right: number }}
     */
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
     * Updates the character's animation depending on its current state.
     * Animation priority (highest → lowest):
     * 1. Dying
     * 2. Hurt
     * 3. Jumping
     * 4. Walking
     * 5. Sleeping
     * 6. Idle
     *
     * Triggered regularly via IntervalHub.
     */
    animate = () => {
        if(this.isDying()){
            this.playAnimation(ImageManager.PEPE.dead);
            // End-game trigger once death animation finishes
            if(this.currentImage >= ImageManager.PEPE.dead.length - 1){
                this.world.finishDeathAnimation("lost");
            }
        } else if(this.hurt){
            this.playAnimation(ImageManager.PEPE.hurt);
        } else if(this.isAboveGround()){
            this.playAnimation(ImageManager.PEPE.jump);
        } else if(Keyboard.RIGHT || Keyboard.LEFT){
            this.playAnimation(ImageManager.PEPE.walk);
        } else if (this.isSleeping()){
            this.playAnimation(ImageManager.PEPE.longIdle);
        } else {
            this.playAnimation(ImageManager.PEPE.idle);
        }
    }

    /**
     * Handles character controls based on keyboard input.
     * Includes walking, jumping, and camera movement.
     *
     * Triggered at a high frequency to achieve smooth movement.
     */
    action = () => {
        // Move right inside world boundaries
        if(Keyboard.RIGHT && this.x < this.world.level.levelEndX){
            this.otherDirection = false;
            this.moveRight();
        }
        // Move left inside world boundaries
        if(Keyboard.LEFT && this.x > 0){
            this.otherDirection = true;
            this.moveLeft();
        }
        // Jump if on the ground
        if(Keyboard.SPACE && !this.isAboveGround()){
            this.jump();
            this.currentImage = 0;
        }
        // Update camera position to follow character
        this.world.cameraX = -this.x + this.width; 
    }

    /**
     * Plays or stops sound effects according to the character's current state.
     * Sound priority (highest → lowest):
     * 1. Death sound
     * 2. Damage sound
     * 3. Jump sound (when airborne)
     * 4. Running sound (while moving)
     * 5. Snoring (when sleeping)
     *
     * Called frequently to keep sound effects responsive.
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