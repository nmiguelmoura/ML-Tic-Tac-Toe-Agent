/**
 * Created by Nuno on 12/09/17.
 */

'use strict';
nmm.states.specificStates.Menu = class Menu extends nmm.states.genericStates.TemplateState {
    constructor() {
        super();
        this.name = 'menu';
    }

    _stateOut() {
        this._view.clear();
    }

    _stateIn() {
        this._view.enableBtns();
    }

    changeState(stateName) {
        this._view.disableBtns();
    }

    btnPressed(key) {
        switch (key) {
            case "btn-menu-space-3":
            case "btn-menu-space-4":
            case "btn-menu-space-5":
                this._model.setRows(key);
                this._view.highlightRow(key);
                break;

            case "btn-menu-easy":
            case "btn-menu-hard":
                this._model.setDifficulty(key);
                this._view.highlightDifficulty(key);
                break;

            case "btn-menu-start":
                nmm.runtime.app.fsm.changeState('game', {
                    rows: this._model.getRows(),
                    difficulty: this._model.getDifficulty()
                });
                break;
        }
    }

    _addView() {
        this._view = new nmm.states.specificStates.views.MenuView(this);
        this.addChild(this._view);
    }

    _init() {
        this._model = new nmm.states.specificStates.models.MenuModel();
        this._addView();

        // Initialize pool.
        nmm.pool = new nmm.tools.Pool(30);
    }
};