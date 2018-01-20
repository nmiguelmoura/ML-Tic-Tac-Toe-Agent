/**
 * Created by Nuno on 14/01/18.
 */
'use strict';
nmm.states.specificStates.components.Board = class Board extends PIXI.Container {
    constructor() {
        super();
        this.position.set(337, 79);
        this._textures = {
            row3: {
                empty: PIXI.Texture.fromFrame("game-square-empty-3"),
                cross: PIXI.Texture.fromFrame("game-square-cross-3"),
                circle: PIXI.Texture.fromFrame("game-square-circle-3"),
                size: 200
            },
            row4: {
                empty: PIXI.Texture.fromFrame("game-square-empty-4"),
                cross: PIXI.Texture.fromFrame("game-square-cross-4"),
                circle: PIXI.Texture.fromFrame("game-square-circle-4"),
                size: 150
            },
            row5: {
                empty: PIXI.Texture.fromFrame("game-square-empty-5"),
                cross: PIXI.Texture.fromFrame("game-square-cross-5"),
                circle: PIXI.Texture.fromFrame("game-square-circle-5"),
                size: 120
            }
        };
        this._tintColors = {
            DEFAULT: 0xFFFFFF,
            HIGHLIGHT: 0xFF6262
        };

        this._boundClick = this._click.bind(this);
        this._selected = null;
        this._boardElements = [];
    }

    clear() {

    }

    tintElement(row, column, tint) {
        this._boardElements[row][column].tint = tint;
    }

    highlightElements(info) {
        let i,
            length = this._boardElements.length,
            tintColor = this._tintColors.HIGHLIGHT,
            row,
            column;

        if (info["row"] !== undefined) {
            row = info["row"];
            for (column = 0; column < length; column++) {
                this.tintElement(row, column, tintColor);
            }
        } else if (info["column"] !== undefined) {
            column = info["column"];
            for (row = 0; row < length; row++) {
                this.tintElement(row, column, tintColor)
            }
        } else if (info["diagonal"] !== undefined) {
            for (row = 0; row < length; row++) {
                for (column = 0; column < length; column++) {
                    if (info["diagonal"] === 0) {
                        if (row === column) {
                            this.tintElement(row, column, tintColor);
                        }
                    } else if (info["diagonal"] === 1) {
                        if (row === length - column - 1) {
                            this.tintElement(row, column, tintColor);
                        }
                    }
                }
            }

        }
    }

    displayMove(row, column, turn) {
        let element = this._boardElements[row][column],
            textureName = turn === 1 ? "cross" : "circle";

        element.useTexture(this._selected[textureName]);
        element.status = "full";

    }

    _click(eventType, key, element, event) {
        nmm.observer.publish('board-element-clicked', {
            row: element.row,
            column: element.column
        });
    }

    swap(row, column, icon) {
        this._boardElements[row][column].swapTexture(this._selected[icon]);
    }

    disable() {
        let i,
            j,
            length = this._boardElements.length;

        for (i = 0; i < length; i++) {
            for (j = 0; j < length; j++) {
                this._boardElements[i][j].disable();
            }
        }
    }

    enable() {
        let i,
            j,
            length = this._boardElements.length,
            element;

        for (i = 0; i < length; i++) {
            for (j = 0; j < length; j++) {
                element = this._boardElements[i][j];
                if (element.status === "empty") {
                    element.enable();
                }
            }
        }
    }

    killCurrentBoard() {
        let i,
            j,
            length = this._boardElements.length,
            element;
        for (i = 0; i < length; i++) {
            for (j = 0; j < length; j++) {
                element = this._boardElements[i][j];
                element.disable();
                this.removeChild(element);
                nmm.pool.returnToPool(element);
            }
        }

        this._boardElements = [];
    }

    populate(rows) {
        this.killCurrentBoard();

        this._selected = this._textures['row' + rows];

        this._boardElements = [];

        let i,
            j,
            element,
            gap = 5,
            displace = this._selected.size + gap;
        for (i = 0; i < rows; i++) {
            this._boardElements.push([]);

            for (j = 0; j < rows; j++) {
                element = nmm.pool.borrowFromPool();
                element.texture = this._selected.empty;
                element.position.set(j * displace, i * displace);
                element.row = i;
                element.column = j;
                element.status = "empty";
                element.callback = this._boundClick;
                this.addChild(element);

                this._boardElements[i][j] = element;
                this.tintElement(i, j, this._tintColors.DEFAULT);
            }


        }
    }
};