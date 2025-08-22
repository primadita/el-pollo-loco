import { ImageManager } from "../js/image-manager.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { Hen } from "./hen.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { Level } from "./level.class.js";
import { StatusBar } from "./status-bar.class.js";

export class World{
    // #region ATTRIBUTES
    ctx;
    character = new Character();
    level = new Level();
    canvas;
    keyboard;
    cameraX = 0;
    statusBar = new StatusBar({_y:20, _imgArray: ImageManager.STATUSBAR.healthBar});
    // #endregion

    constructor(_canvas, _keyboard){
        this.ctx = _canvas.getContext('2d');
        this.canvas = _canvas;
        this.keyboard = _keyboard;
        this.draw();
        this.setWorld();
        IntervalHub.startInterval(this.checkCollisions, 1000 / 5);
    }
    // #region METHODS
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.ctx.translate(-this.cameraX, 0); //back 
        // ---- space for fixed object -------
        this.addToMap(this.statusBar);
        this.ctx.translate(this.cameraX, 0); // forward

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.cameraX, 0);
        requestAnimationFrame(() => this.draw());
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        
        if (mo instanceof Character || mo instanceof Hen || mo instanceof Chicken || mo instanceof Endboss){
            this.drawFrame(mo);
            this.drawOffset(mo);
        }

        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }

    addObjectsToMap(objects){
        objects.forEach(obj => {this.addToMap(obj)});
    }

    setWorld(){
        this.character.world = this;
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    drawFrame(mo){
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "blue";
        this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        this.ctx.stroke();
    }

    drawOffset(mo){
        mo.getRealFrame();
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "red";
        this.ctx.rect(mo.realX, mo.realY, mo.realWidth, mo.realHeight);
        this.ctx.stroke();
    }

    checkCollisions = () => {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)){
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        })
    }
    // #endregion
}