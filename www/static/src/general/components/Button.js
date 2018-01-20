/**
 * Created by Nuno on 20/09/17.
 */
'use strict';
nmm.components.Button = class Button extends PIXI.Sprite {
    constructor(options) {
        super();

        options = options || {};
        options.anchor = options.anchor || {};

        this.position.set(options.x || 0, options.y || 0);
        this.scale.set(options.scale || 1);
        this.anchor.set(options.anchor.x || 0, options.anchor.y || 0);
        this.key = options.key || 0;
        this.autoHide = options.autoHide || false;
        this.callback = options.callback || function () {
            };
        this.enableOnStart = options.enableOnStart || false;
        this.trackOverOut = options.trackOverOut || false;
        this.trackDown = options.trackDown || false;

        // Pass a keycode if button is activated on key press.
        this.keyCode = options.keyCode;

        this.isEnabled = false;

        this._init();
    }

    hide() {
        this.visible = false;
        this.disable();
    }

    show() {
        this.visible = true;
        this.enable();
    }

    disable(alpha) {
        if (this.isEnabled) {
            this.isEnabled = false;
            alpha = alpha || 1;

            this.alpha = alpha;

            this.interactive = false;
            this.buttonMode = false;

            this.off('pointerdown', this._downHandler);
            this.off('pointerup', this._upHandler);
            this.off('pointerupoutside', this._upOutsideHandler);
            this.off('pointerover', this._overHandler);
            this.off('pointerout', this._outHandler);

            if (this.keyCode) {
                window.removeEventListener("keydown", this._keyHandlerBound);
            }
        }
    }

    enable() {
        if (!this.isEnabled) {
            this.isEnabled = true;
            this.interactive = true;
            this.buttonMode = true;

            this.on('pointerdown', this._downHandler);

            if (this.trackOverOut) {
                this.on('pointerover', this._overHandler);
            }

            if (this.keyCode) {
                window.addEventListener("keydown", this._keyHandlerBound);
            }
        }
    }

    _outHandler(event) {
        this.off('pointerout', this._outHandler);

        this.callback('OUT', this.key, this, event);
    }

    _overHandler(event) {
        this.on('pointerout', this._outHandler);

        this.callback('OVER', this.key, this, event);
    }

    _upOutsideHandler(event) {
        this.off('pointerup', this._upHandler);
        this.off('pointerupoutside', this._upOutsideHandler);
    }

    _keyHandler(event) {
        if(event.keyCode === this.keyCode) {
            this.callback('UP', this.key, this, event);

            if (this.autoHide) {
                this.hide();
            }
        }
    }

    _upHandler(event) {
        this.off('pointerup', this._upHandler);
        this.off('pointerupoutside', this._upOutsideHandler);

        this.callback('UP', this.key, this, event);

        if (this.autoHide) {
            this.hide();
        }
    }

    _downHandler(event) {
        this.on('pointerup', this._upHandler);
        this.on('pointerupoutside', this._upOutsideHandler);

        if (this.trackDown) {
            this.callback('DOWN', this.key, this, event);
        }
    }

    _init() {
        if(this.keyCode) {
            this._keyHandlerBound = this._keyHandler.bind(this);
        }

        if (this.enableOnStart) {
            this.enable();
        }
    }
};