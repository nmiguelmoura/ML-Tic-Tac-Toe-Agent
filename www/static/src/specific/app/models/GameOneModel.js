/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.states.specificStates.models.GameOneModel = class GameOneModel {
    constructor() {
        this.difficulty = null;
        this.rows = null;
        this.turn = null;
        this._boardStatus = null;
    }

    getCurrentTurn() {
        return this.turn;
    }

    getTurn() {
        if (this.turn === null) {
            this.turn = -1 + Math.random() * 2 < 0 ? -1 : 1;
        } else {
            this.turn *= -1;
        }

        return this.turn;
    }

    reset() {
        this.turn = null;
        this.getNewBoard();
    }

    getNewBoard() {
        this._boardStatus = [];
        let i,
            j,
            length = this.rows;

        for(i = 0; i < length; i++) {
            this._boardStatus.push([]);
            for(j = 0; j < length; j++) {
                this._boardStatus[i][j] = 0;
            }
        }

        return this._boardStatus;
    }

    getBoardStatus() {
        return this._boardStatus;
    }

    registerMove(row, column, turn) {
        this._boardStatus[row][column] = turn;
    }

};