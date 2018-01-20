/**
 * Created by Nuno on 14/01/18.
 */
'use strict';
nmm.states.specificStates.components.Label = class Label extends PIXI.Container {
    constructor (name, nameFrame, iconFrame, x=0, y=0) {
        super();
        this.name = name;
        this.position.set(x, y);

        this._nameTexture = PIXI.Texture.fromFrame(nameFrame);
        this._nameTextureSelected = PIXI.Texture.fromFrame(nameFrame + '-selected');
        this._iconTexture = PIXI.Texture.fromFrame(iconFrame);

        this._init();
    }

    disable() {
        this._name.gotoAndStop(0);
    }

    enable() {
        this._name.gotoAndStop(1);
    }

    _addIcon() {
        let icon = new PIXI.Sprite();
        icon.texture = this._iconTexture;
        icon.anchor.set(0.5);
        icon.position.y = 100;
        this.addChild(icon);
    }

    _addName() {
        this._name = new PIXI.extras.AnimatedSprite([this._nameTexture, this._nameTextureSelected]);
        this.addChild(this._name);

        this._name.anchor.set(0.5, 0);
    }

    _init () {
        this._addName();
        this._addIcon();
    }
};