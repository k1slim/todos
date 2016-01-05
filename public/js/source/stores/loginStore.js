'use strict';

define(['queries', 'eventEmitter', 'Store'],
    function (queries, eventEmitter, Store) {

        const CHANGE_LOGIN_STATUS_EVENT = 'changeLoginStatus';

        var loginStatus = '',
            LoginStore;

        LoginStore = Object.assign({}, eventEmitter.prototype, {

            initializeFromSession: function () {
                queries.getSession()
                    .then(data => {
                        if (data !== false) {
                            loginStatus = 'Login successful';
                            this.emitLoginChange();
                            Store.initializeStore(data);
                        }
                    });
            },

            login: function (username, password, session) {
                queries.login(username, password, session)
                    .then(data => {
                        loginStatus = data.status;
                        this.emitLoginChange();

                        if (loginStatus === 'Login successful') {
                            Store.initializeStore(data.user);
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

        return LoginStore;
    });