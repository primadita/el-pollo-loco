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
        // statusbar for the endboss will appear when endboss appears and only if, endbossbar has not existed yet.
        if(this.character.x == 1700 && this.statusBar.length == 3){
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

        
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
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
        if(this.keyboard.D && !this.character.otherDirection && this.statusBar[2].percentage >= 20){ // TO DO: nur werfen, wenn Flaschen vorhanden sind
            let bottle = new ThrowableObject({ _x: this.character.realX, _y: this.character.realY });
            this.throwableObjects.push(bottle);
            this.statusBar[2].percentage -= 20;
            this.statusBar[2].setPercentage(this.statusBar[2].percentage);
        }
        
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)){
                if(this.character.ySpeed < 0 && this.character.realY + this.character.realHeight <= enemy.realY + 0.9 * enemy.realHeight && !enemy.dead){
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
                } else {
                    if(!enemy.dead){
                        this.character.hit(5);
                    }   
                }
                this.statusBar[0].setPercentage(this.character.energy);
            }
        });
        this.level.bottles.forEach((bottle) => {
            if(this.character.isColliding(bottle) && !bottle.collected){
                bottle.collected = true;
                this.statusBar[2].percentage += 20;
                this.statusBar[2].setPercentage(this.statusBar[2].percentage);
            }
        });
        this.level.coins.forEach((coin) => {
            if(this.character.isColliding(coin) && !coin.collected){
                coin.collected = true;
                this.statusBar[1].percentage += 20;
                this.statusBar[1].setPercentage(this.statusBar[1].percentage);
            }
        });
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.level.endboss)){
                this.level.endboss.hit(25);
                bottle.hit = true;
                this.statusBar[3].percentage -= 25;

                if (this.statusBar[3].percentage < 0){
                    this.statusBar[3].percentage = 0;
                    this.level.endboss.energy = 0;
                }
                this.statusBar[3].setPercentage(this.statusBar[3].percentage);
                console.log('bottle hits endboss', this.statusBar[3].percentage);
            }
        })
        
    }

    isGameOver(){
        return this.character.energy === 0 ||
        (this.statusBar[2].percentage === 0 && this.statusBar[3].percentage != 0) ||
        this.level.endboss.isDead() ;
    }
    // #endregion
}