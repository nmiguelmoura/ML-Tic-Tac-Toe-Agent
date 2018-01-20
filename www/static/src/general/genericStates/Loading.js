/**
 * Created by Nuno on 12/09/17.
 */

'use strict';
nmm.states.genericStates.Loading = class Loading extends nmm.states.genericStates.TemplateState {
    constructor() {
        super();
        this.name = 'loading';
        this._toDestroy = false;
    }

    destroy() {
        this.removeChild(this._view);
        this._view.destroy();
        this._view = null;

        super.destroy({
            children: true,
            texture: true
        });
    }

    _stateOut() {
        this._stateToGo = null;
        if(nmm.app.config.destroyLoadingAfterInit || this._toDestroy) {
            nmm.runtime.app.fsm.destroyState(this.name);
        }
    };

    animateOut(callback) {
        this._view.endLoading();
        super.animateOut(callback);
    }

    _secondaryAssetsLoaded() {
        console.log('... Loading secondary assets successful');

        nmm.runtime.app.fsm.changeState(this._stateToGo);
    }

    _primaryAssetsLoaded() {
        console.log('... Loading primary assets successful');

        nmm.runtime.app.fsm.changeState('menu');
    }

    loadSecondaryAssets(assets, stateToGo, destroyLoading) {
        this._stateToGo = stateToGo;
        this._toDestroy = destroyLoading;

        this._view.reset();

        nmm.runtime.app.assetsLoader.loadExtraTextures(assets, this._secondaryAssetsLoaded.bind(this));
    }

    _loadPrimaryAssets() {
        nmm.runtime.app.assetsLoader.init(this._primaryAssetsLoaded.bind(this));
    }

    _addView() {
        this._view = new nmm.states.genericStates.views.LoadingView();
        this.addChild(this._view);
        this._view.startLoading();
    }

    _init() {
        this._addView();
        this._loadPrimaryAssets();
    }
};