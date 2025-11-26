import { AudioHub } from "../js/audio-hub.class.js";
import { BottleBar } from "./bottle-bar.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { CoinBar } from "./coin-bar.class.js";
import { EndBossBar } from "./endboss-bar.class.js";
import { HealthBar } from "./health-bar.class.js";
import { Hen } from "./hen.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { Level } from "./level.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

/**
 * Represents the game world, including rendering and game logic.
 */
export class World{
    // #region ATTRIBUTES
    /**
     * The 2D rendering context of the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The main controllable character.
     * @type {Character}
     */
    character = new Character();

    /**
     * The level configuration containing enemies, clouds, coins, etc.
     * @type {Level}
     */
    level = new Level();
    
    /**
     * The canvas element where the game is rendered.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * Keyboard input reference.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * Horizontal camera offset for side-scrolling.
     * @type {number}
     */
    cameraX = 0;

    /**
     * List of status bars (health, coins, bottles, endboss when available).
     * @type {(StatusBar[]) }
     */
    statusBar = [new HealthBar(), new CoinBar(), new BottleBar()];
    
    /**
     * Array of active throwable objects (bottles).
     * @type {ThrowableObject[]}
     */
    throwableObjects = [];

    /**
     * Current game state: `"running"`, `"won"`, `"lost"`.
     * @type {"running" | "won" | "lost"}
     */
    state = "running";
    // #endregion

    /**
     * Creates a new World.
     * @param {HTMLCanvasElement} _canvas - The canvas element.
     * @param {Object} _keyboard - Keyboard input object.
     * @param {number} _volume - Sound volume.
     */
    constructor(_canvas, _keyboard, _volume){
        this.ctx = _canvas.getContext('2d');
        this.canvas = _canvas;
        this.soundVolume = _volume;
        this.draw();
        this.setWorld();
        IntervalHub.startInterval(this.checkCollisions, 1000 / 30);
        IntervalHub.startInterval(this.checkThrowObjects, 1000 / 5);
    }
    // #region METHODS
    // #region Draw methods
     /**
     * Continuously draws the entire world, including:
     * backgrounds, objects, status bars, character, enemies.
     * Uses the camera translation for scrolling.
     */
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderAllLevelObjects();
        this.renderStatusBars();
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.shiftCameraX("back");
        this.renderAnimationFrame();
    }

    /**
     * Shifts the camera horizontally by translating the canvas context.
     *
     * @param {"back" | "forward"} direction - Determines translation direction.
     *  - `"back"` resets translation using negative camera offset.
     *  - `"forward"` applies the current camera offset.
     */
    shiftCameraX(direction){
        switch (direction) {
            case "back":
                this.ctx.translate(-this.cameraX, 0);
                break;
            case "forward":
                this.ctx.translate(this.cameraX, 0);
                break;
            default:
                this.ctx.translate(this.cameraX, 0);
                break;
        }
    }

    /**
    * Renders all objects belonging to the level, including backgrounds
    * and foreground objects. Uses camera shifting to handle scrolling.
    */
    renderAllLevelObjects(){
        this.shiftCameraX("forward");
        this.addObjectsToMap(this.level.backgrounds);
        this.drawLevelObjects();
    }

    /**
    * Renders all status bars (health, coins, bottles, endboss).
    * Temporarily resets camera translation so the UI stays fixed.
    */
    renderStatusBars(){
        this.shiftCameraX("back"); 
        this.drawAllStatusBars();
        this.shiftCameraX("forward");
    }

    /**
    * Requests the next animation frame if the game is still running.
    * Stops automatically once state is "won" or "lost".
    */
    renderAnimationFrame(){
        if(this.state === "running"){
            this.animationFrame = requestAnimationFrame(() => this.draw());
        } 
    }
    /**
     * Adds a single object to the map.
     * @param {Object} mo - Movable or drawable object.
     */
    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }

    /**
     * Adds multiple objects to the map.
     * @param {Object[]} objects - Array of objects.
     */
    addObjectsToMap(objects){
        objects.forEach(obj => {this.addToMap(obj)});
    }

    /**
     * Adds collecting objects to the map if not collected yet.
     * @param {Object[]} objects - Array of objects.
     */
    addCollectingObjects(objects){
        objects.forEach((obj) => {
            if(!obj.collected){
                this.addToMap(obj);
            }
        });
    }

    /**
     * Draws all status bars.
     */
    drawAllStatusBars(){
        this.addObjectsToMap(this.statusBar);
        if(this.character.x == 1700 && this.statusBar.length == 3){
            let endbossbar = new EndBossBar();
            this.statusBar.push(endbossbar);
        }
    }

    /**
     * Draws all objects related to the level:
     * clouds, enemies, collectibles, endboss.
     */
    drawLevelObjects(){
        this.addObjectsToMap(this.level.clouds);
        this.addCollectingObjects(this.level.coins);
        this.addCollectingObjects(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
    }
    // #endregion

    // #region Character
    /**
    * Assigns the world reference to character and endboss,
    * enabling them to access world-level logic (camera, collisions etc.).
    */
    setWorld(){
        this.character.world = this;
        this.level.endboss.world = this;
    }

    /**
    * Mirrors the sprite horizontally for left-facing movement.
    *
    * @param {MovableObject} mo - The object whose sprite to flip.
    */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image orientation.
     * @param {Object} mo - Movable object.
     */
    flipImageBack(mo){
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
    // #endregion

    // #region Frame/Offset
    /**
     * Draws the frame around an object.
     * @param {Object} mo - Movable object.
     */
    drawFrame(mo){
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "blue";
        this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        this.ctx.stroke();
    }

    /**
     * Draws the object's collision offset box (real hitbox) in red.
     *
     * @param {MovableObject} mo - The object whose offset frame to draw.
     */
    drawOffset(mo){
        mo.getRealFrame();
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "red";
        this.ctx.rect(mo.realX, mo.realY, mo.realWidth, mo.realHeight);
        this.ctx.stroke();
    }
    // #endregion

    // #region Collisions
    /**
     * Checks if throwable objects should be created.
     */
    checkThrowObjects = () => {
        if(Keyboard.D && !this.character.otherDirection && this.statusBar[2].percentage >= 10){ // TO DO: nur werfen, wenn Flaschen vorhanden sind
            let bottle = new ThrowableObject({ _x: this.character.realX, _y: this.character.realY });
            this.throwableObjects.push(bottle);
            this.throwableObjects.fly = true;
            this.character.registerLastMove();
            this.statusBar[2].percentage -= 10;
            this.statusBar[2].setPercentage(this.statusBar[2].percentage);
        }
    }

    /**
 * Runs all collision checks:
 * - Character vs enemies
 * - Collecting coins and bottles
 * - Throwables vs endboss
 * - Character vs endboss
 */
    checkCollisions = () => {
        this.handlingCharacterVsEnemiesCollisions();
        this.collectingObjects({objects: this.level.bottles, valuePerObj: 10, statusbarId: 2, soundname: AudioHub.BOTTLE_COLLECTED});
        this.collectingObjects({objects: this.level.coins, valuePerObj: 10, statusbarId: 1, soundname: AudioHub.COIN_COLLECTED});
        this.handlingCollisionsOfThrowablesAndEndboss();
        this.handlingCharacterVsEndbossCollisions();
    }

    /**
 * Handles all interactions between the character and regular enemies:
 * - Jumping on enemies kills them
 * - Running into attacking enemies damages the character
 * - Updates health bar accordingly
 */
    handlingCharacterVsEnemiesCollisions(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)){
                if(this.character.ySpeed < 0 && !enemy.dead){
                    this.characterAttacks(enemy);
                } else if(this.character.ySpeed >= 0 && !enemy.dead && enemy.attacking) { //die Bedingungen, wann energy runtergeht wurde geändert,damit die Energy nicht so schnell runtergeht.
                    if(enemy instanceof Chicken){
                        this.character.hit(10);
                    } else if (enemy instanceof Hen){
                        this.character.hit(20);
                    }
                    enemy.attacking = false;  
                }
                this.statusBar[0].setPercentage(this.character.energy);
            } else {
                enemy.attacking = true;
            }
        });
    }

    /**
     * Executes the attack logic when character jumps on an enemy.
     *
     * @param {Enemy} enemy - The enemy being attacked.
     */
    characterAttacks(enemy){
        enemy.dead = true;
        this.hitEnemy(enemy);
        this.checkMaxEnergy();
        if(this.character.canbounce){
            this.character.bounce(); 
        }
    }

    /**
     * Handles direct collision between the character and the endboss:
     * - Reduces character health
     * - Marks endboss as temporarily collided (invulnerability window)
     */
    handlingCharacterVsEndbossCollisions(){
        if(this.character.isColliding(this.level.endboss)){
            if(!this.level.endboss.dead && !this.level.endboss.collided){
                this.character.hit(40);
                this.level.endboss.collided = true;
                this.statusBar[0].setPercentage(this.character.energy);
                this.checkCharacterState();
            } else {
                this.level.endboss.hurt = false;
            }
        } else {
            this.level.endboss.collided = false;
        }
    }
    
    /**
     * Updates the character and endboss states after taking damage:
     * - Sets hurt animations
     * - Marks character as dead when energy reaches zero
     */
    checkCharacterState(){
        if(this.character.energy > 0){
            this.character.hurt = true;
            this.level.endboss.hurt = true;
        } else {
            this.character.dead = true;
            this.level.endboss.attacking = false;
        }
    }
    /**
     * Checks and limits character's max energy.
     */
    checkMaxEnergy(){
        if ( this.character.energy > 100){
            this.character.energy = 100;
        }
    }

    /**
     * Handles collecting objects.
     * @param {Object} params - Parameters for collecting.
     */
    collectingObjects({objects, valuePerObj, statusbarId, soundname} = {}){
        objects.forEach((obj) => {
            if(this.character.isColliding(obj) && !obj.collected){
                obj.collected = true;
                this.statusBar[statusbarId].percentage += valuePerObj;
                this.statusBar[statusbarId].setPercentage(this.statusBar[statusbarId].percentage);
                AudioHub.playOne({_soundName: soundname});
            }
        });
    }

    /**
     * Handles collisions between throwable objects and endboss.
     */
    handlingCollisionsOfThrowablesAndEndboss(){
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.level.endboss) && this.throwableObjects.fly ){
                this.throwableObjects.fly = false;
                this.level.endboss.hit(25);
                bottle.hit = true;
                AudioHub.playOne({_soundName: AudioHub.BOTTLE_BROKEN});
                if(this.statusBar[3]){
                    this.statusBar[3].percentage = this.level.endboss.energy;
                    this.checkMinPercentageOnEndbossBar();
                    this.statusBar[3].setPercentage(this.statusBar[3].percentage);
                }
                
            }
        });   
    }

    /**
 * Prevents the endboss health bar from going below zero.
 * Synchronizes the energy value of the endboss.
 */
    checkMinPercentageOnEndbossBar(){
        if (this.statusBar[3].percentage < 0){
            this.statusBar[3].percentage = 0;
            this.level.endboss.energy = 0;
        }
    }
    /**
     * Handles hitting an enemy.
     * @param {Object} enemy - Enemy object.
     */
    hitEnemy(enemy){
        if(enemy instanceof Chicken){
            return this.character.energy += 5;
        } else if (enemy instanceof Hen){
            return this.character.energy += 10;
        }
    }
    // #endregion

    // #region End of game
    /**
     * Returns whether the game is over.
     * @returns {boolean}
     */
    isGameOver(){
        return this.state === "won" || this.state === "lost";
    }

    /**
     * Returns true if the player won the game.
     * @returns {boolean}
     */
    won(){
        return this.state === "won";
    }

    /**
     * Returns true if the player lost the game.
     * @returns {boolean}
     */
    lost(){
        return this.state === "lost";
    }

    /**
     * Ends the game after the character’s death animation finishes.
     *
     * @param {"won" | "lost"} _state
     */
    finishDeathAnimation(_state){
        this.state = _state;
        IntervalHub.stopAllIntervals();
        cancelAnimationFrame(this.animationFrame);
        this.playOutro();
    }

    /**
     * Displays the end screen and plays the final sound.
     */
    playOutro(){
        const endscreenImgRef = document.getElementById("endscreen-img");
        this.showEndscreen();
        AudioHub.stopAll();
        setTimeout(() => {
            if(this.won()){
                endscreenImgRef.src = "./assets/img/You won, you lost/You won B.png";
                endscreenImgRef.alt = "you won the game";
                AudioHub.playOne({_soundName: AudioHub.WIN_GAME});
            } else {
                endscreenImgRef.src = "./assets/img/You won, you lost/You lost b.png";
                endscreenImgRef.alt = "oh no, you lost";
                AudioHub.playOne({_soundName: AudioHub.GAME_OVER});
            }
        }, 100);
    }

    /**
     * Reveals the endscreen UI element and switches display mode.
    */
    showEndscreen(){
        const endscreenRef = document.getElementById("endscreen");
        endscreenRef.classList.remove('d-none');
        endscreenRef.classList.add('d-flex');
    }
    // #endregion
}