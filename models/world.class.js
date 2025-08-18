import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { DesertFirstLayer } from "./desert-first-layer.class.js";
import { DesertSecondLayer } from "./desert-second-layer.class.js";
import { DesertThirdLayer } from "./desert-third-layer.class.js";
import { Hen } from "./hen.class.js";
import { Sky } from "./sky.class.js";

export class World{
    // #region ATTRIBUTES
    ctx;
    character = new Character();
    enemies = [
        new Hen(),
        new Hen(),
        new Hen(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [new Cloud()];
    backgrounds = [new Sky(), new DesertThirdLayer(),new DesertSecondLayer(), new DesertFirstLayer()];
    canvas;
    // #endregion

    constructor(_canvas){
        this.ctx = _canvas.getContext('2d');
        this.canvas = _canvas;
        this.draw();
    }
    // #region METHODS
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgrounds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        
        requestAnimationFrame(() => this.draw());
    }

    addToMap(mo){
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

    addObjectsToMap(objects){
        objects.forEach(obj => {this.addToMap(obj)});
    }
    // #endregion
}