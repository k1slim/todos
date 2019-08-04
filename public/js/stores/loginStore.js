'use strict';

import queries from '../queries';
import EventEmitter from 'wolfy87-eventemitter';
import Store from './store';

const CHANGE_LOGIN_STATUS_EVENT = 'CHANGE_LOGIN_STATUS_EVENT';

let loginStatus = '',
    user = '',
    LoginStore;

LoginStore = Object.assign({}, EventEmitter.prototype, {
    initializeFromSession: function () {
        queries.getSession()
            .then(data => {
                if (data !== false) {
                    loginStatus = 'Login successful';
                    user = data.username;
                    this.emitLoginChange();
                    Store.initializeStore(data.userId);
                }
            });
    },

    login: function (username, password, session) {
        queries.login(username, password, session)
            .then(data => {
                loginStatus = data.status;
                user = username;
                this.emitLoginChange();

                if (loginStatus === 'Login successful') {
                    Store.initializeStore(data.userId);
                }
            });
    },

    logout: function () {
        loginStatus = '';
        this.emitLoginChange();
        queries.logout();
    },

    getLoginStatus: function () {
        return loginStatus;
    },

    getUserName: function () {
        return user;
    },

    emitLoginChange: function () {
        this.emit(CHANGE_LOGIN_STATUS_EVENT);
    },

    addLoginListener: function (callback) {
        this.on(CHANGE_LOGIN_STATUS_EVENT, callback);
    },

    removeLoginListener: function (callback) {
        this.removeListener(CHANGE_LOGIN_STATUS_EVENT, callback);
    }
});

export default LoginStore;