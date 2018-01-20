/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.states.specificStates.views.GameOneView = class GameOneView extends PIXI.Container {
    constructor(controller) {
        super();
        this._controller = controller;
        this.EXPRESSION_SCALE = 0.8;
        this._texts = {
            DRAW: "It's a draw! Nobody wins",
            WINNER_PLAYER: ' win!',
            WINNER_CPU: ' wins!',
            CONNECTION: "There's a connection error!"
        };
        this._init();
    }

    clear() {

    }

    disableBtns () {
        this._homeBtn.disable();
        this._restartBtn.disable();

    }

    enableBtns () {
        this._homeBtn.enable();
        this._restartBtn.enable();
    }

    issueConnectionError() {
        this._caption.text = this._texts.CONNECTION;
    }

    issueDraw() {
        this._caption.text = this._texts.DRAW
    }

    issueWinner(winner, info) {
        let fragment0,
            fragment1;

        if (winner === 1) {
            fragment0 = "You";
            fragment1 = this._texts.WINNER_PLAYER;
        } else {
            fragment0 = "CPU";
            fragment1 = this._texts.WINNER_CPU;
        }
        this._caption.text = fragment0 + fragment1;

        this.board.highlightElements(info);
    }

    resetCaption() {
        this._caption.text = '';
    }

    changeTurn(turn) {
        if(turn === 1) {
            this._playerLabel.enable();
            this._cpuLabel.disable();
        } else if (turn === -1) {
            this._playerLabel.disable();
            this._cpuLabel.enable();
        } else {
            this._playerLabel.disable();
            this._cpuLabel.disable();
        }
    }

    _callback (type, key, btn, event) {
        this._controller.btnClicked(key);
    };

    _addBoard() {
        this.board = new nmm.states.specificStates.components.Board();
        this.addChild(this.board);
    }

    _addCaption() {
        this._caption = new PIXI.Text('', {
            fontFamily: 'Arial',
            fontSize: '32px',
            fill: '#FFF',
            textAlign: 'center'
        });

        this._caption.anchor.set(0.5);
        this._caption.scale.set(0.5);
        this._caption.position.set(650, 730);
        this.addChild(this._caption);
    }

    _addLabels() {
        this._playerLabel = new nmm.states.specificStates.components.Label('player', 'label-player', 'cross', 168, 207);
        this.addChild(this._playerLabel);

        this._cpuLabel = new nmm.states.specificStates.components.Label('cpu', 'label-cpu', 'circle', 168, 417);
        this.addChild(this._cpuLabel);
    }

    _addBtns () {
        this._homeBtn = new nmm.components.TexturedButton({
            texture: PIXI.Texture.fromFrame('btn-game-return-menu'),
            x: 40,
            y: 40,
            key: 'menu',
            callback: this._callbackBound
        });
        this.addChild(this._homeBtn);

        this._restartBtn = new nmm.components.TexturedButton({
            texture: PIXI.Texture.fromFrame('btn-game-restart'),
            x: 40,
            y: 678,
            key: 'restart',
            callback: this._callbackBound
        });
        this.addChild(this._restartBtn);
    }

    _init() {
        this._callbackBound = this._callback.bind(this);
        this._addBtns();
        this._addLabels();
        this._addCaption();
        this._addBoard();
    }
};
