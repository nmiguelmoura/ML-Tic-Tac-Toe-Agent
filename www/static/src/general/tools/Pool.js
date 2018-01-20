/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.tools.Pool = class {
    constructor(max) {
        this._pool = [];
        this._totalCount = 0;
        this._max = max || 100;
        this._defaultTexture = PIXI.Texture.EMPTY;
    }

    _createNew() {
        if(this._totalCount < this._max) {
            return new nmm.components.TexturedButton({
                texture: this._defaultTexture
            });
        } else {
            console.log('POOL MAX REACHED!');
        }
    }

    returnToPool(object) {
        object.texture = this._defaultTexture;
        this._pool.push(object);
    }

    borrowFromPool () {
        if(this._pool.length === 0) {
            return this._createNew();
        } else {
            return this._pool.pop();
        }
    }

};