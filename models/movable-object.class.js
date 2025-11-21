import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents a movable object with speed and gravity.
 * @extends DrawableObject
 */
export class MovableObject extends DrawableObject{
    // #region ATTRIBUTES
    xSpeed;
    ySpeed = 0;
    acceleration = 2.5; // or gravitation
    
    groundLevel = 165;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    lastMove = 0;
    dead = false;
    hurt = false;
    hurtTimeout = null;
    canbounce = true;
    attacking = false;
    attackingTimeout = null;
    // #endregion

    /**
     * Creates a new MovableObject.
     * @param {Object} [params] - Object parameters.
     * @param {HTMLImageElement|string} [params._img] - Image or image path.
     * @param {number} [params._x] - X position.
     * @param {number} [params._y] - Y position.
     * @param {number} [params._width] - Width.
     * @param {number} [params._height] - Height.
     * @param {number} [params._xSpeed] - Horizontal speed.
     */
    constructor({_img, _x, _y, _width, _height, _xSpeed} = {}){
        super({_img, _x, _y, _width, _height});
        this.xSpeed = _xSpeed;
    }

    // #region METHODS
    /**
     * Plays an animation from an array of image paths.
     * @param {string[]} arr - Array of image paths.
     */
    playAnimation(arr){
        let i = this.currentImage % arr.length;
        let path = arr[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Sets a randomized start position for the object.
     */
    randomizedStartPosition(){
        this.x = this.x + Math.random() * 1800;
    }
    
    /**
     * Registers the last move timestamp.
     */
    registerLastMove(){
        this.lastMove = new Date().getTime();
    }

    /**
     * Moves the object to the right.
     */
    moveRight = () => {
        this.x += this.xSpeed;
        this.registerLastMove();
    }

    /**
     * Moves the object to the left.
     */
    moveLeft = () => {
        if (!this.dead){
            this.x -= this.xSpeed;
        } else {
            this.xSpeed = 0;
        }
        this.registerLastMove();
    }
        
    /**
     * Makes the object jump.
     */
    jump(){
        this.ySpeed = 30;
        this.registerLastMove();
    }

    /**
     * Makes the object bounce (smaller than jump).
     */
    bounce(){
        this.ySpeed = 5;
        this.canbounce = false;
    }

    /**
     * Reduces the object's energy by a value.
     * @param {number} val - Amount to reduce.
     */
    hit(energyLoss){
        this.energy -= energyLoss;
        if (this.energy < 0){
            this.energy = 0;
        } 
        this.hurt  = true;

        if(this.hurtTimeout){
            clearTimeout(this.hurtTimeout);
        }
        this.hurtTimeout = setTimeout(() => {
            this.hurt = false;
            this.hurtTimeout = null;
        }, 700);
        this.registerLastMove();
    }
    /**
     * Applies gravity to the object.
     */
    applyGravity = () => {
        if(this.isAboveGround() || this.ySpeed > 0){
            this.y -= this.ySpeed;
            this.ySpeed -= this.acceleration;
        } else {
            this.y = this.groundLevel;
            this.ySpeed = 0;
        }
    }

    /**
     * Checks if the object is above ground.
     * @returns {boolean}
     */
    isAboveGround(){
        return this.y < this.groundLevel;
    }

    /**
     * Checks if the object is hurt within a time length after being hit.
     * @param {number} timelength - Time in seconds.
     * @returns {boolean}
     */
    isHurt(timelength){
        let timepassed = (new Date().getTime() - this.lastHit) / 1000;
        return timepassed < timelength;
    }

    /**
     * Checks if the object is angry within a certain time length after being hit(between timelength and timelength + 0.8s).
     * @param {number} timelength - Time in seconds.
     * @returns {boolean}
     */
    isAngry(timelength){
        let timepassed = (new Date().getTime() - this.lastHit) / 1000;
        return timepassed > timelength && timepassed < timelength + 0.8;
    }

    /**
     * Checks if the object is sleeping, after not moving for a certain time.
     * @returns {boolean}
     */
    isSleeping(){
        let timepassed = (new Date().getTime() - this.lastMove)/ 1000;
        return timepassed > 5;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean}
     */
    isDead(){
        return this.energy == 0;
    }
    // #endregion
}