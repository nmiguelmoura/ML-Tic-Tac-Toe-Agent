/**
 * Created by Nuno on 20/09/17.
 */
'use strict';
nmm.states.specificStates.views.MenuView = class MenuView extends PIXI.Container {
    constructor(controller) {
        super();
        this._controller = controller;
        this._btnInfo = [
            {
                key: 'btn-menu-space-3',
                x: 50,
                y: 351,
                initialAlpha: 1
            },
            {
                key: 'btn-menu-space-4',
                x: 375,
                y: 351,
                initialAlpha: 0.5
            },
            {
                key: 'btn-menu-space-5',
                x: 700,
                y: 351,
                initialAlpha: 0.5
            },
            {
                key: 'btn-menu-easy',
                x: 50,
                y: 468,
                initialAlpha: 0.5
            },
            {
                key: 'btn-menu-hard',
                x: 537,
                y: 468,
                initialAlpha: 1
            },
            {
                key: 'btn-menu-start',
                x: 50,
                y: 623,
                initialAlpha: 1
            }
        ];

        this._btns = {};

        this._init();
    }

    clear() {

    }

    disableBtns() {
        let key;
        for (key in this._btns) {
            if (this._btns.hasOwnProperty(key)) {
                this._btns[key].disable();
            }
        }
    }

    enableBtns() {
        let key;
        for (key in this._btns) {
            if (this._btns.hasOwnProperty(key)) {
                this._btns[key].enable();
            }
        }
    }

    highlightRow(key) {
        this._btns["btn-menu-space-3"].alpha = 0.5;
        this._btns["btn-menu-space-4"].alpha = 0.5;
        this._btns["btn-menu-space-5"].alpha = 0.5;
        this._btns[key].alpha = 1;
    }

    highlightDifficulty(key) {
        this._btns["btn-menu-easy"].alpha = 0.5;
        this._btns["btn-menu-hard"].alpha = 0.5;
        this._btns[key].alpha = 1;
    }

    _callback(type, key, btn, event) {
        this._controller.btnPressed(key);
    }

    _animate() {
        this._titles.forEach (function (t, i) {
            TweenLite.to(t, 0.1, {alpha: 1, delay: i * 0.5 });
        }, this);

        TweenLite.to(this._btnsContainer, 0.1, {alpha: 1, delay: 1.5});
    }

    _addBtns() {
        var btn;

        this._btnsContainer = new PIXI.Container();
        this._btnsContainer.alpha = 0;
        this.addChild(this._btnsContainer);

        this._btnInfo.forEach(function (info, i) {
            btn = new nmm.components.TexturedButton({
                texture: PIXI.Texture.fromFrame(info.key),
                x: info.x,
                y: info.y,
                key: info.key,
                enableOnStart: false,
                autoHide: false,
                callback: this._callback.bind(this)
            });
            btn.alpha = info.initialAlpha;
            this._btnsContainer.addChild(btn);
            this._btns[info.key] = btn;
        }, this);
    }

    _addTitle() {
        var title0 = new PIXI.Sprite(PIXI.Texture.fromFrame('title-0'));
        title0.anchor.set(0);
        title0.position.set(50, 50);
        title0.alpha = 0;
        this.addChild(title0);

        var title1 = new PIXI.Sprite(PIXI.Texture.fromFrame('title-1'));
        title1.anchor.set(0);
        title1.position.set(345, 117);
        title1.alpha = 0;
        this.addChild(title1);

        var title2 = new PIXI.Sprite(PIXI.Texture.fromFrame('title-2'));
        title2.anchor.set(0);
        title2.position.set(689, 50);
        title2.alpha = 0;
        this.addChild(title2);

        this._titles = [title0, title1, title2];
    }

    _init() {
        this._addTitle();
        this._addBtns();
        this._animate();
    }
};