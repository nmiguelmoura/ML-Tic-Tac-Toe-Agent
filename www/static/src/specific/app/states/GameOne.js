/**
 * Created by Nuno on 21/09/17.
 */
'use strict';
nmm.states.specificStates.GameOne = class GameOne extends nmm.states.genericStates.TemplateState {

    constructor() {
        super();
        this.name = 'game';
        this._delayedTween = null;
    }

    _stateOut() {
        this._view.clear();
        this._view.disableBtns();
    }

    animateIn() {
        super.animateIn();
        this._newExercise();
        this._view.enableBtns();
    }

    btnClicked(key) {
        if (key === 'menu') {
            this._view.disableBtns();
            if (this._delayedTween) {
                this._delayedTween.kill();
            }

            nmm.runtime.app.fsm.changeState('menu');
        } else if (key === 'restart') {
            this._newExercise();
        }
    }

    _connectionError() {
        this._view.issueConnectionError();
        this._view.enableBtns();
    }

    _evaluateCurrentGameStatus(status) {
        if (status["winner"] !== 0) {
            this._view.issueWinner(status["winner"], status["info"]);
        } else {
            if (status["moves_available"] === 0) {
                this._view.issueDraw();
            } else {
                this._readyTurn();
            }
        }
        this._view.enableBtns();
    }

    _checkIfGameIsOver() {
        this._server.checkIfGameIsOver(this._model.getBoardStatus());
    }

    _cpuMoveResult(move) {
        this._makeMove(move['row'], move['column'], -1);
    }

    _makeMove(row, column, turn) {
        this._view.disableBtns();
        this._model.registerMove(row, column, turn);
        this._view.board.displayMove(row, column, turn);
        this._checkIfGameIsOver();
    }

    _elementClicked(options) {
        this._view.board.disable();
        this._view.changeTurn();

        this._makeMove(options.row, options.column, this._model.getCurrentTurn());
    }

    _readyTurn() {
        TweenLite.delayedCall(1, function () {
            let turn = this._model.getTurn();
            this._view.changeTurn(turn);

            if (turn === 1) {
                // Player turn. Enable board events.
                this._view.board.enable();
            } else if (turn === -1) {
                // CPU turn. Get Mover from server.
                this._server.askForCPUMove(this._model.getBoardStatus(), this._model.difficulty);
            }
        }, [], this);
    }

    _newExercise() {
        this._model.reset();
        this._view.board.populate(this._model.rows);
        this._view.changeTurn();
        this._view.resetCaption();

        this._readyTurn();
    }

    _addView() {
        this._view = new nmm.states.specificStates.views.GameOneView(this);
        this.addChild(this._view);
    }

    setParams(options) {
        this._model.rows = options.rows;
        this._model.difficulty = options.difficulty;
    }

    _init() {
        nmm.observer.subscribe('board-element-clicked', this._elementClicked, this);
        nmm.observer.subscribe('evaluate-current-game-status', this._evaluateCurrentGameStatus, this);
        nmm.observer.subscribe('cpu-move-result', this._cpuMoveResult, this);
        nmm.observer.subscribe('connection-error', this._connectionError, this);
        this._model = new nmm.states.specificStates.models.GameOneModel();
        this._server = new nmm.states.specificStates.components.ServerInteractionLayer();
        this._addView();
    }

};