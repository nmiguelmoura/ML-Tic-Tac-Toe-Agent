/**
 * Created by Nuno on 13/09/17.
 */

'use strict';
nmm.runtime.singletons = nmm.runtime.singletons || {};
nmm.runtime.singletons.assetsLoader = null;

nmm.engine.AssetsLoader = class {
    constructor() {
        if (!nmm.runtime.singletons.assetsLoader) {
            nmm.runtime.singletons.assetsLoader = this;
        }

        this._texturesLoaded = false;
        this._audioLoaded = false;

        this._dpr = nmm.runtime.app.devicePixelRatio <= 2 ? Math.round(nmm.runtime.app.devicePixelRatio) : 2;

        return nmm.runtime.singletons.assetsLoader;
    }

    get loader () {
        return this._loader;
    }

    _loadComplete () {
        if (this._texturesLoaded && this._audioLoaded) {
            this._callback();
        }
    }

    _loadAudio () {
        var self = this,
            audio = nmm.app.config.audio,
            filesTotal = 0,
            filesLoaded = 0;

        // Load audio with soundjs.
        createjs.Sound.on('fileload', function (event) {
            // This runs everytime a file loads. We need to ensure the loadComplete method
            // only runs when all files are loaded.
            filesLoaded ++;
            if (filesTotal === filesLoaded) {
                self._audioLoaded = true;
                self._loadComplete();
            }
        });

        if(audio.alternateExtensions.length > 0) {
            createjs.Sound.alternateExtensions = audio.alternateExtensions;
        }

        audio.files.forEach(function (file) {
            filesTotal++;
            createjs.Sound.registerSound(file.src, file.label);
        });

        audio.spriteSheets.forEach(function (spriteSheet) {
            filesTotal++;
            createjs.Sound.registerSound(spriteSheet);
        });

        if (filesTotal === 0) {
            // If there are no sound files to load, proceed
            self._audioLoaded = true;
            self._loadComplete();
        }
    }

    _loadTextures () {
        var self = this;

        this._loader = PIXI.loader;

        nmm.app.config.textures.spriteSheets['ss' + this._dpr].forEach(function (sprite) {
            self._loader.add(sprite);
        });

        if (nmm.app.config.textures.logo['ss' + this._dpr]) {
            self._loader.add('logo', nmm.app.config.textures.logo['ss' + this._dpr]);
        }

        if (nmm.app.config.textures.otherTextures.length > 0) {
            nmm.app.config.textures.otherTextures.forEach(function (texture) {
                self._loader.add(texture.label, texture['ss' + this._dpr]);
            });
        }

        this._loader.load(function (loader, resources) {
            self._texturesLoaded = true;
            self._loadComplete();
        });
    }

    loadExtraTextures(assets, callback) {
        var self = this;
        // This method should be used to load loose images only.
        // Sprites for images and audio should go on init.

        if (assets.length > 0) {
            assets.forEach(function (texture) {
                self._loader.add(texture.label, texture['ss' + self._dpr]);
            });
        }

        this._loader.load(function (loader, resources) {
            callback();
        });

    }

    init(callback) {
        this._callback = callback;
        this._loadTextures();
        this._loadAudio();
    }
};