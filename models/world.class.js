import { BottleBar } from "./bottle-bar.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { CoinBar } from "./coin-bar.class.js";
import { EndBossBar } from "./endboss-bar.class.js";
import { Endboss } from "./endboss.class.js";
import { HealthBar } from "./health-bar.class.js";
import { Hen } from "./hen.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { Level } from "./level.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

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
    // #endregion

    constructor(_canvas, _keyboard){
        this.ctx = _canvas.getContext('2d');
        this.canvas = _canvas;
        this.keyboard = _keyboard;
        this.draw();
        this.setWorld();
        IntervalHub.startInterval(this.run, 1000 / 5);
    }
    // #region METHODS
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.ctx.translate(-this.cameraX, 0); //back 
        // ---- space for fixed object -------
        this.addObjectsToMap(this.statusBar);
        // statusbar for the endboss will appear when endboss appears
        if(this.character.x == 1700){
            let endbossbar = new EndBossBar();
            this.statusBar.push(endbossbar);
        }
        this.ctx.translate(this.cameraX, 0); // forward

        this.addToMap(this.character);
        this.level.coins.forEach((coin) => {
            if(!coin.collected){
                this.addToMap(coin);
            }
        });
        this.level.bottles.forEach((bottle) => {
            if(!bottle.collected){
                this.addToMap(bottle);
            }
        });

        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
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

    run = () => {
        this.checkCollisions();
        this.checkThrowObjects();
    }

    checkThrowObjects(){
        if(this.keyboard.D && !this.character.moveLeft()){ // TO DO: nur werfen, wenn Flaschen vorhanden sind
            let bottle = new ThrowableObject({ _x: this.character.realX, _y: this.character.realY });
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions(){
        // console.log('pepes energy',this.character.energy);
        // 
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)){
                if(this.character.ySpeed < 0 && this.character.realY + this.character.realHeight <= enemy.realY + 0.6* enemy.realHeight && !enemy.dead){
                    enemy.dead = true;
                    if(enemy instanceof Chicken){
                        this.character.energy += 10;
                    } else if (enemy instanceof Hen){
                        this.character.energy += 20;
                    } 
                    if ( this.character.energy > 100){
                        this.character.energy = 100;
                    }
                    if(this.character.canbounce){
                        this.character.bounce(); // small jump after hitting enemy
                    }
                    
                    // console.log('enemy is hit', this.character.energy);
                } else {
                    if(!enemy.dead){
                        this.character.hit();
                    }
                    
                }
                    this.statusBar[0].setPercentage(this.character.energy);
                    // console.log('pepe is hit', this.character.energy); 
            }
        });
        this.level.bottles.forEach((bottle) => {
            if(this.character.isColliding(bottle) && !bottle.collected){
                console.log('bottle is hit');
                bottle.collected = true;
                this.character.bottleState += 20;
                this.statusBar[2].setPercentage(this.character.bottleState);
            }
        });
        this.level.coins.forEach((coin) => {
            if(this.character.isColliding(coin) && !coin.collected){
                console.log('coin is hit');
                coin.collected = true;
                this.character.coinState += 20;
                this.statusBar[1].setPercentage(this.character.coinState);
            }
        });
        
    }

    isGameOver(){
        return this.character.energy === 0;
    }
    // #endregion
}