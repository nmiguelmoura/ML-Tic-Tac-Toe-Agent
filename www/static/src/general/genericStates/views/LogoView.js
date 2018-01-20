/**
 * Created by Nuno on 13/09/17.
 */

'use strict';
nmm.states.genericStates.views.LogoView = class LogoView extends PIXI.Container {
    constructor () {
        super ();

        this._centerX = nmm.runtime.app.defaultResolution.width / 2;

        this._init();
    }

    destroy () {
        super.destroy ({
            children: true,
            texture: true,
            baseTexture: true
        });
    }

    _addFields () {
        var style = {
            fontFamily: 'Arial',
            fontSize: '66px',
            fill: '#FFFFFF'
        };
        this._title = new PIXI.Text('Casa das Ciências', style);
        this._title.anchor.set(0.5);
        this._title.position.set(this._centerX, 600);
        this.addChild(this._title);

        style.fontSize = '26px';
        this._subTitle = new PIXI.Text('RECURSOS DIGITAIS PARA PROFESSORES', style);
        this._subTitle.anchor.set(0.5);
        this._subTitle.position.set(this._centerX, 668);
        this.addChild(this._subTitle);
    }

    _addLogo () {
        this._logo = new PIXI.Sprite(PIXI.Texture.fromImage(PIXI.loader.resources.logo.url));
        this._logo.anchor.set(0.5);
        this._logo.position.set(this._centerX, 295);
        this.addChild(this._logo);
    }

    _init () {
        this._addLogo();
        this._addFields();
    }
};