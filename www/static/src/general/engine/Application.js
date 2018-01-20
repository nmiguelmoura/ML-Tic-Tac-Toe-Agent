/**
 * Created by Nuno on 11/09/17.
 */
'use strict';
nmm.runtime.singletons = nmm.runtime.singletons || {};
nmm.runtime.singletons.application = null;

nmm.engine.Application = class {
    constructor() {
        // singleton
        if (!nmm.runtime.singletons.application) {
            nmm.runtime.singletons.application = this;
        }

        this.WIDTH = 1024;
        this.HEIGHT = 768;

        // variable to store device pixel ratio.
        this._dpr = null;

        return nmm.runtime.singletons.application;
    }

    get touchSupport() {
        return "ontouchstart" in document.documentElement;
    }

    get rendererType() {
        if (nmm.renderer instanceof PIXI.CanvasRenderer) {
            return 'canvas';
        } else {
            return 'webgl';
        }
    }

    get defaultResolution() {
        return {
            width: this.WIDTH,
            height: this.HEIGHT
        };
    }

    get devicePixelRatio() {
        if (!this._dpr) {
            let dpr = window.devicePixelRatio;
            dpr = dpr <= 2 ? dpr : 2;
            this._dpr = dpr;
        }

        return this._dpr;
    }

    get pixi() {
        return {
            app: this._pixi,
            renderer: this._pixi.renderer,
            view: this._pixi.view,
            stage: this._pixi.stage
        };
    }

    get windowResolution() {
        return this._resize.windowResolution;
    }

    get margins() {
        return this._resize.margins;
    }

    get resolution() {
        return this._resize.resolution;
    }

    get scale() {
        return this._resize.scale;
    }

    get fsm() {
        return this._fsm;
    }

    get assetsLoader() {
        return this._assetsLoader;
    }

    _setAssetsLoader() {
        this._assetsLoader = new nmm.engine.AssetsLoader();
    }

    _setFSM() {
        this._fsm = new nmm.engine.FSM();
        this._fsm.init();
    }

    _resizeApp() {
        this._resize = new nmm.engine.Resize(this.pixi.renderer, this.pixi.stage, this.defaultResolution);
        this._resize.init();
    }

    _setupDOM() {
        if (nmm.app.config.backgroundColorDocument) {
            document.body.style.backgroundColor = PIXI.utils.hex2string(nmm.app.config.backgroundColorDocument);
        }

        if (nmm.app.config.tileURL) {
            document.body.style.backgroundImage = `url(${nmm.app.config.tileURL})`;
        }

        if (nmm.app.config.DOMElements) {
            let div = new nmm.dom.Div();
            nmm.runtime.dom.mainDiv = div;
        }
    }

    _setupPIXI() {
        this._pixi = new PIXI.Application({
            width: this.WIDTH,
            height: this.HEIGHT,
            resolution: this.devicePixelRatio,
            autoResize: true,
            transparent: nmm.app.config.transparent,
            backgroundColor: nmm.app.config.transparent ? null : nmm.app.config.backgroundColorPIXI
        });

        document.body.appendChild(this._pixi.view);
    }

    init() {
        nmm.observer = new nmm.engine.Observer();
        nmm.dataModel = new nmm.app.DataModel();
        nmm.dataModel.init();

        this._setupPIXI();
        this._resizeApp();
        this._setupDOM();
        this._setAssetsLoader();
        this._setFSM();
    }
};