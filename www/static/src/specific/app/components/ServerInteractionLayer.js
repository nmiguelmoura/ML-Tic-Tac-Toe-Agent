/**
 * Created by Nuno on 20/01/18.
 */
'use strict';
nmm.states.specificStates.components.ServerInteractionLayer = class ServerInteractionLayer {
    constructor() {

    }

    _xhttpCall(type, url, parameters, observerEvent) {
        let xhttp = new XMLHttpRequest();

        var t = setTimeout(function () {
            nmm.observer.publish('connection-error');
        }, 3000);

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                nmm.observer.publish(observerEvent, JSON.parse(this.response));
                clearTimeout(t);
            }
        };
        xhttp.open(type, url, true);

        if(type === "POST") {
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        xhttp.send(parameters);


    }

    askForCPUMove(boardStatus, difficulty) {
        let type = 'POST',
            url = '/make_move/',
            parameters = "board=" + JSON.stringify(boardStatus) + "&type=" + difficulty,
            observerEvent = 'cpu-move-result';
        this._xhttpCall(type, url, parameters, observerEvent);
    }

    checkIfGameIsOver(boardStatus) {
        let type = 'POST',
            url = '/check_game_over/',
            parameters = "board=" + JSON.stringify(boardStatus),
            observerEvent = 'evaluate-current-game-status';
        this._xhttpCall(type, url, parameters, observerEvent);
    }


};