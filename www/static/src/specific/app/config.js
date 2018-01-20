/**
 * Created by Nuno on 13/09/17.
 */
'use strict';
nmm.app.config = {
    // Set if loading state is to be destroyed after initial loading,
    // or to be kept to load more assets.
    destroyLoadingAfterInit: false,
    // Set color for html body.
    backgroundColorDocument: null,

    // Set url for body tile.
    tileURL: '',

    // Set PIXI transparent background.
    transparent: true,

    // Set background color for PIXI app. Only used if transparent is false.
    backgroundColorPIXI: 0x000000,

    // Set DOM elements. Create a div aligned and resizable with the canvas.
    DOMElements: false,

    // URL for textures.
    textures: {
        // Set url for spriteSheets.
        spriteSheets: {
            ss1: [
                'static/assets/images/ticTacToe@1x.json'
            ],
            ss2: [
                'static/assets/images/ticTacToe@2x.json'
            ]
        },

        // Set url for logo.
        logo: {

        },

        // Set url for other image files.
        otherTextures: [
            /*{
                label: 'abc',
                ss1: 'static/assets/general/filename.png',
                ss2: 'static/assets/general/filename@2x.png'
            }*/
        ]
    },

    // URL and data for audio.
    audio: {
        // Include alternate extensions: ['ogg'].
        alternateExtensions: [],

        // Import audio files no sprited.
        files: [
            /*{
                src: 'static/assets/specific/app00/audioSprite.mp3',
                label: 'audioSprite'
            }*/
        ],

        // Import data for audio sprites.
        spriteSheets: [

        ]
    }
};