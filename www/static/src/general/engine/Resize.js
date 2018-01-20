/**
 * Created by Nuno on 11/09/17.
 */
'use strict';
nmm.runtime.singletons = nmm.runtime.singletons || {};
nmm.runtime.singletons.resize = null;

nmm.engine.Resize = class {
    constructor(renderer, stage, defaultResolution) {
        // singleton
        if (!nmm.runtime.singletons.resize) {
            nmm.runtime.singletons.resize = this;
        }

        this._renderer = renderer;
        this._stage = stage;
        this._default = defaultResolution;
        this._scale = null;
        this._size = {};
        this._margin = {};

        return nmm.runtime.singletons.resize;
    }

    get windowResolution () {
        return {
            width: this._size.windowWidth,
            height: this._size.windowHeight
        }
    }

    get scale  () {
        return this._scale;
    }

    get margins () {
        return this._margin;
    }

    get resolution () {
        return {
            width: this._size.width,
            height: this._size.height
        }
    }

    _canvasAlignment() {
        // Align app on the centre of scree.
        this._margin = {};
        this._margin.x = (this._size.windowWidth - this._size.width) / 2;
        this._margin.y = (this._size.windowHeight - this._size.height) / 2;
        this._renderer.view.style.marginLeft = this._margin.x + 'px';
        this._renderer.view.style.marginTop = this._margin.y + 'px';
    }

    _canvasResize() {
        this._size.windowWidth = window.innerWidth;
        this._size.windowHeight = window.innerHeight;

        let scaleX = this._size.windowWidth / this._default.width,
            scaleY = this._size.windowHeight / this._default.height;

        // Choose minor scale value.
        this._scale = Math.min(scaleX, scaleY);

        this._scale = this._scale <= 1 ? this._scale : 1;

        // Round values, or firefox and chrome render blurred images.
        this._size.width = Math.floor(this._default.width * this._scale);
        this._size.height = Math.floor(this._default.height * this._scale);

        // Set render size.
        this._renderer.resize(this._size.width, this._size.height);

        // Scale scene stage.
        this._stage.scale.x = this._scale;
        this._stage.scale.y = this._scale;
    }

    _resize() {
        // Render and stage scale.
        this._canvasResize();

        // Align app to the center of the scree.
        this._canvasAlignment();

        this._renderer.render(this._stage);

        nmm.observer.publish('resize');
    }

    init() {
        window.addEventListener('resize', this._resize.bind(this));
        this._resize();
    }
};