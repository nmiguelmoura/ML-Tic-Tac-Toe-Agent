/**
 * Created by Nuno on 12/09/17.
 */
'use strict';
nmm.states.genericStates.TemplateState = class TemplateState extends PIXI.Container {
    constructor (name) {
        super();
        this.name = "";
        this.TWEEN_IN_TIME = 0.5;
        this.TWEEN_OUT_TIME = 0.5;
        this.alpha = 0;
        this._isInitted = false;
    }

    animateIn () {
        TweenLite.to(this, this.TWEEN_IN_TIME, {alpha: 1});
        TweenLite.delayedCall(this.TWEEN_IN_TIME, function () {
            this._stateIn();
        }, [], this);
    }

    animateOut (callback) {
        if(!callback) {
            console.error("ATTENTION\nCallback not defined in animateOut method from class " + this.name);
        }
        TweenLite.to(this, this.TWEEN_OUT_TIME, {alpha: 0});
        TweenLite.delayedCall(this.TWEEN_OUT_TIME, function () {
            this._stateOut();
            callback(this);
        }, [], this);
    }

    _stateIn () {}

    _stateOut () {}

    destroy () {
        super.destroy({
            children: true,
            textures: true
        });
    }

    setParams () {

    }

    _init () {
        // This method is meant to be override by the classes that inherit from this one.
    }

    init () {
        if (!this._isInitted) {
            this._init();
            this._isInitted = true;
        }
    }
};
