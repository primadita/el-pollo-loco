import { Bottle } from "./bottle.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { Coin } from "./coin.class.js";
import { DesertFirstLayer } from "./desert-first-layer.class.js";
import { DesertSecondLayer } from "./desert-second-layer.class.js";
import { DesertThirdLayer } from "./desert-third-layer.class.js";
import { Endboss } from "./endboss.class.js";
import { Hen } from "./hen.class.js";
import { Sky } from "./sky.class.js";

export class Level{
    // #region ATTRIBUTES
    enemies;
    endboss;
    clouds;
    backgrounds;
    bottles;
    coins;
    levelEndX = 2160;
    // #endregion

    constructor(){
        this.enemies = [
            new Hen(),
            new Hen(),
            new Hen(),
            new Chicken(),
            new Chicken(),
        ];
        this.endboss = new Endboss(); 
        this.clouds = [new Cloud()];
        this.backgrounds = [
            new Sky(), 
            new DesertThirdLayer(),
            new DesertSecondLayer(), 
            new DesertFirstLayer(), 
            new Sky(), 
            new DesertThirdLayer(),
            new DesertSecondLayer(), 
            new DesertFirstLayer(),
            new Sky(), 
            new DesertThirdLayer(),
            new DesertSecondLayer(), 
            new DesertFirstLayer()
        ];
        this.coins = [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ];
        this.bottles = [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ]
    }
}