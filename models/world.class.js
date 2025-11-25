import { AudioHub } from "../js/audio-hub.class.js";
import { BottleBar } from "./bottle-bar.class.js";
import { Bottle } from "./bottle.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { CoinBar } from "./coin-bar.class.js";
import { Coin } from "./coin.class.js";
import { EndBossBar } from "./endboss-bar.class.js";
import { Endboss } from "./endboss.class.js";
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
    ctx;
    character = new Character();
    level = new Level();
    canvas;
    keyboard;
    cameraX = 0;
    statusBar = [new HealthBar(), new CoinBar(), new BottleBar()];
    throwableObjects = [];
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
     * Draws all objects and status bars on the canvas.
     */
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.drawLevelObjects();
        
        this.ctx.translate(-this.cameraX, 0); //back 
        this.drawAllStatusBars();
        this.ctx.translate(this.cameraX, 0); // forward

        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.cameraX, 0);
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
        // if (mo instanceof Character || mo instanceof Hen || mo instanceof Chicken || mo instanceof Endboss || mo instanceof Coin || mo instanceof Bottle){
        //     this.drawFrame(mo);
        //     this.drawOffset(mo);
        // }
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
        // ---- space for fixed object -------
        this.addObjectsToMap(this.statusBar);
        // statusbar for the endboss will appear when endboss appears and only if, endbossbar has not existed yet.
        if(this.character.x == 1700 && this.statusBar.length == 3){
            let endbossbar = new EndBossBar();
            this.statusBar.push(endbossbar);
            console.log('energy endboss', this.level.endboss.energy)
        }
    }

    /**
     * Draws all level objects.
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
     * Sets the world reference for the character.
     */
    setWorld(){
        this.character.world = this;
        this.level.endboss.world = this;
    }

    /**
     * Flips the image horizontally.
     * @param {Object} mo - Movable object.
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
     * Draws the offset frame around an object.
     * @param {Object} mo - Movable object.
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
     * Checks collisions between character and objects.
     */
    checkCollisions = () => {
        this.handlingCharacterVsEnemiesCollisions();
        this.collectingObjects({objects: this.level.bottles, valuePerObj: 10, statusbarId: 2, soundname: AudioHub.BOTTLE_COLLECTED});
        this.collectingObjects({objects: this.level.coins, valuePerObj: 10, statusbarId: 1, soundname: AudioHub.COIN_COLLECTED});
        this.handlingCollisionsOfThrowablesAndEndboss();
        this.handlingCharacterVsEndbossCollisions();
    }

    /**
     * Handles collisions between character and enemies.
     */
    handlingCharacterVsEnemiesCollisions(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)){
                if(this.character.ySpeed < 0 && !enemy.dead){
                    enemy.dead = true;
                    this.hitEnemy(enemy);
                    this.checkMaxEnergy();
                    if(this.character.canbounce){
                        this.character.bounce(); // small jump after hitting enemy
                    }
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

    handlingCharacterVsEndbossCollisions(){
        if(this.character.isColliding(this.level.endboss)){
            if(!this.level.endboss.dead && !this.level.endboss.collided){
                this.character.hit(40);
                this.level.endboss.collided = true;
                console.log("pepes energy", this.character.energy);
                this.statusBar[0].setPercentage(this.character.energy);
                if(this.character.energy > 0){
                    this.character.hurt = true;
                    this.level.endboss.hurt = true;
                } else {
                    this.character.dead = true;
                    this.level.endboss.attacking = false;
                }
            } else {
                this.level.endboss.hurt = false;
            }
        } else {
            this.level.endboss.collided = false;
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
                console.log('energy endboss', this.level.endboss.energy);
                AudioHub.playOne({_soundName: AudioHub.BOTTLE_BROKEN});
                if(this.statusBar[3]){
                    this.statusBar[3].percentage = this.level.endboss.energy;
                    if (this.statusBar[3].percentage < 0){
                        this.statusBar[3].percentage = 0;
                        this.level.endboss.energy = 0;
                    }
                    this.statusBar[3].setPercentage(this.statusBar[3].percentage);
                }
                
            }
        });   
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
        console.log(this.character.energy); 
    }
    // #endregion

    // #region End of game
    /**
     * Checks if the game is over.
     * @returns {boolean}
     */
    isGameOver(){
        return this.state === "won" || this.state === "lost";
    }

    /**
     * Checks if the player won.
     * @returns {boolean}
     */
    won(){
        return this.state === "won";
    }

    /**
     * Checks if the player lost.
     * @returns {boolean}
     */
    lost(){
        return this.state === "lost";
    }

    finishDeathAnimation(_state){
        this.state = _state;
        IntervalHub.stopAllIntervals();
        cancelAnimationFrame(this.animationFrame);
        this.showEndscreen();
    }

    /**
     * Shows the end screen.
     */
    showEndscreen(){
        const endscreenImgRef = document.getElementById("endscreen-img");
        const endscreenRef = document.getElementById("endscreen");
        endscreenRef.classList.remove('d-none');
        endscreenRef.classList.add('d-flex');
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
    // #endregion
}