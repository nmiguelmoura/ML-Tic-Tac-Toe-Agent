/**
 * Created by Nuno on 12/09/17.
 */

// This class simulates a simple finite state machine.

'use strict';
nmm.runtime.singletons = nmm.runtime.singletons || {};
nmm.runtime.singletons.fsm = null;

nmm.engine.FSM = class {

    constructor() {
        if (!nmm.runtime.singletons.fsm) {
            nmm.runtime.singletons.fsm = this;
        }

        this._state = null;
        this._states = {};
        this._stage = nmm.runtime.app.pixi.stage;

        this._removeStateFromStageBound = this._removeStateFromStage.bind(this);

        return nmm.runtime.singletons.fsm;
    }

    get currentStateName() {
        return lowerCaseName(this._state.name);
    }

    get currentState() {
        return this._state;
    }

    _lowerCaseName (name) {
        if (name) {
            name = name.toLowerCase();
        } else {
            name = "";
        }
        return name;
    };

    destroyState (stateName) {
        stateName = this._lowerCaseName(stateName);
        let state = this.getStateByName(stateName);

        if (state) {
            state.destroy();
            this._states[stateName] = null;
            delete this._states[stateName];
            console.log('xx State destroyed: ', stateName);
        }
    }

    _removeStateFromStage(oldState) {
        if (oldState) {
            this._stage.removeChild(oldState);
        }
    };

    getStateByName(name) {
        name = this._lowerCaseName(name);
        if (this._states[name]) {
            return this._states[name];
        } else {
            console.info('There is no state available with the name (--> ' + name + ' <--).');
        }
    }

    changeState(targetStateName, options) {
        targetStateName = this._lowerCaseName(targetStateName);

        console.log('-> Change to state: ', targetStateName);

        if (this._state) {
            this._state.animateOut(this._removeStateFromStageBound);
        }

        let newState = this.getStateByName(targetStateName);
        if (newState) {
            newState.init();
            newState.setParams(options);
            newState.animateIn();
            this._stage.addChild(newState);
            this._state = newState;
        } else {
            console.info('The state with the name ' + targetStateName + ' is not registered.');
        }
    }

    registerState(state) {
        let name = this._lowerCaseName(state.name);
        if (!this._states[name]) {
            this._states[name] = state;
        } else {
            console.info('There is already a state with the name (--> ' + name + ' <--)' +
                ' registered! Please choose another name' +
                ' or use method getStateByName (name) with chosen name as argument to get the state');
        }
    }

    _startMachine() {
        // Loading.
        var loadingState = new nmm.states.genericStates.Loading();
        this.registerState(loadingState);
        this.changeState(loadingState.name);

        // Check for app specific states.
        let key,
            appStates = nmm.states.specificStates;

        for(key in appStates) {
            if(appStates.hasOwnProperty(key) && typeof appStates[key] === 'function') {
                // Register all states.
                this.registerState(new appStates[key]());
            }
        }
    }

    init() {
        if (this._state === null) {
            this._startMachine();
        }
    }
};