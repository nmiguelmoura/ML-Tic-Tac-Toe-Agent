/**
 * Created by Nuno on 20/09/17.
 */
'use strict';

nmm.runtime.singletons = nmm.runtime.singletons || {};
nmm.runtime.singletons.dataModel = null;

nmm.app.DataModel = class DataModel {
    constructor() {
        if (!nmm.runtime.singletons.dataModel) {
            nmm.runtime.singletons.dataModel = this;
        }

        return nmm.runtime.singletons.dataModel;
    }

    init () {
        
    }
};