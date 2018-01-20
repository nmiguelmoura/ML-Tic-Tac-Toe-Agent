/**
 * Created by Nuno on 14/09/17.
 */

'use strict';
nmm.runtime.singletons = nmm.runtime.singletons || {};
nmm.runtime.singletons.observer = null;

nmm.engine.Observer = class {
    constructor () {
        if(!nmm.runtime.singletons.observer) {
            nmm.runtime.singletons.observer = this;
        }

        this._events = {};

        return nmm.runtime.singletons.observer;
    }

    subscribe (eventName, callback, scope) {
        if(!this._events.hasOwnProperty(eventName)) {
            this._events[eventName] = [];
        }

        this._events[eventName].push({
            callback: callback,
            scope: scope
        });
    }

    unsubscribe (eventName, callback) {
        if(this._events.hasOwnProperty(eventName)) {
            var i = 0,
                length = this._events[eventName].length,
                event = this._events[eventName];
            for (i = 0; i < length; i++) {
                if(event[i].callback === callback) {
                    event.splice(i, 1);
                    break;
                }
            }
        }
    }

    publish (eventName) {
        if(this._events.hasOwnProperty(eventName)) {
            var event = this._events[eventName],
                data = Array.prototype.slice.call(arguments, 1),
                i,
                length = event.length;

            for(i = 0; i < length; i++) {
                event[i].callback.apply(event[i].scope, data);
            }
        }
    }

};