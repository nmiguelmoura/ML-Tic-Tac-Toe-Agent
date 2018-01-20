/**
 * Created by Nuno on 20/09/17.
 */
'use strict';
nmm.components.TexturedButton = class TexturedButton extends nmm.components.Button {
    constructor (options) {
        super(options);
        this.useTexture(options.texture);

    }

    useTexture (texture) {
        this.texture = texture;
    }
};