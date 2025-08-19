import { Character } from "./character.class.js";
// import { Chicken } from "./chicken.class.js";
// import { Cloud } from "./cloud.class.js";
// import { DesertFirstLayer } from "./desert-first-layer.class.js";
// import { DesertSecondLayer } from "./desert-second-layer.class.js";
// import { DesertThirdLayer } from "./desert-third-layer.class.js";
// import { Hen } from "./hen.class.js";
import { Level } from "./level.class.js";
// import { Sky } from "./sky.class.js";

export class World{
    // #region ATTRIBUTES
    ctx;
    character = new Character();
    level = new Level();
    canvas;
    keyboard;
    cameraX = 0;
    // #endregion

    constructor(_canvas, _keyboard){
        this.ctx = _canvas.getContext('2d');
        this.canvas = _canvas;
        this.keyboard = _keyboard;
        this.draw();
        this.setWorld();
    }
    // #region METHODS
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgrounds);
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
    // #endregion
}