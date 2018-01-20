/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.states.specificStates.models.MenuModel = class MenuModel {
    constructor() {
        this._rows = 3;
        this._difficulty = "ai";
    }

    setRows(info) {
        switch (info) {
            case "btn-menu-space-3":
                this._rows = 3;
                break;

            case "btn-menu-space-4":
                this._rows = 4;
                break;

            case "btn-menu-space-5":
                this._rows = 5;
                break;

            default:
                this._rows = 3;
                break;
        }
    }

    getRows() {
        return this._rows;
    }

    setDifficulty(info) {
        switch (info) {
            case "btn-menu-easy":
                this._difficulty = "random";
                break;

            case "btn-menu-hard":
                this._difficulty = "ai";
                break;

            default:
                this._difficulty = "ai";
                break;
        }
    }

    getDifficulty() {
        return this._difficulty;
    }
};