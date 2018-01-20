/**
 * Created by Nuno on 12/09/17.
 */

'use strict';
nmm.states.genericStates.views.LoadingView = class LoadingView extends PIXI.Container {
    constructor () {
        super();
        this.name = 'loading';
        this.INCREMENT_ROTATION = 0.05;
        this._init ();
    }

    reset() {
        this._loadingIcon.scale.set(0.5);
        this.startLoading();
    }

    update () {
        this._loadingIcon.rotation += this.INCREMENT_ROTATION;
    }

    endLoading () {
        TweenLite.to(this._loadingIcon.scale, 0.5, {x: 1.5, y: 1.5});
        TweenLite.delayedCall(0.5, function () {
            nmm.runtime.app.pixi.app.ticker.remove(this._onFrameUpdateBound);
        }, [], this);
    }

    startLoading () {
        if(!this._onFrameUpdateBound) {
            this._onFrameUpdateBound = this.update.bind(this);
        }
        nmm.runtime.app.pixi.app.ticker.add(this._onFrameUpdateBound);
    }

    _buildLoader () {
        let graph = new PIXI.Graphics();
        let i,
            maxCircles = 8,
            // 180 instead of 360 because on angle calculation bellow, its necessary to transform deg to rad,
            // so dont need to divide by 180
            step = 180 / (maxCircles - 1),
            dist = 40,
            radius = 6,
            color = 0xFFFFFF,
            angle,
            x,
            y;
        for (i = 0; i < maxCircles; i++) {
            angle = (i * step) * Math.PI;
            x = Math.cos(angle) *  dist;
            y = Math.sin(angle) * dist;

            graph.beginFill(color, 1 - i * 0.1)
                .lineStyle(1, 0x000000, 1)
                .drawCircle(x, y, radius);
        }
        graph.endFill();

        this._loadingIcon = new PIXI.Sprite(graph.generateTexture());
        this._loadingIcon.position.set(nmm.runtime.app.defaultResolution.width / 2, nmm.runtime.app.defaultResolution.height / 2);
        this._loadingIcon.anchor.set(0.5);
        this._loadingIcon.scale.set(0.5);
        this.addChild(this._loadingIcon);

        graph.clear();
        graph.destroy({texture: true});
    };

    _init () {
        this._buildLoader();
    }
};