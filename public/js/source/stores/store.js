'use strict';

define(['queries', 'eventEmitter', 'Dispatcher', 'Constants'],
    function (queries, eventEmitter, Dispatcher, Constants) {

        const CHANGE_TODO_EVENT = 'changeTodo',
            CHANGE_TAB_EVENT = 'changeTab';

        var todos = [],
            tabs = [],
            selectedTab = -1,
            Store;

        function createTodo(value) {
            var currentTodo = {
                id: `${Date.now()}${~~(Math.random() * 100)}`,
                value: value,
                tab: selectedTab
            };
            todos.push(currentTodo);
            queries.createTodo(currentTodo);
        }

        function deleteTodo(id) {
            todos = todos.filter(item => item.id !== id);
            queries.deleteTodo(id);

            if (isAllTodosDeleted()) {
                deleteTab(selectedTab);
                setSelectTab(tabs[0].id);
                setSelectedIntoLocalStorage();
                getTodoForTab();
                Store.emitTabChange();
            }
        }

        function updateTodo(id, value) {
            todos.forEach(item => {
                if (item.id === id) {
                    item.value = value;
                }
            });
            queries.updateTodo(id, value);
        }

        function toggleTodo(id) {
            var currentDone = true;
            todos.forEach(item => {
                if (item.id === id) {
                    currentDone = !item.done;
                    item.done = currentDone;
                }
            });
            queries.toggleTodo(id, currentDone);
        }

        function isAllTodosDeleted() {
            return todos.length === 0;
        }

        function createTab(value) {
            var currentTab = {
                id: `${Date.now()}${~~(Math.random() * 100)}`,
                value: value
            };
            tabs.push(currentTab);
            queries.createTab(currentTab);
            setSelectTab(currentTab.id);
            setSelectedIntoLocalStorage();
            getTodoForTab();
        }

        function updateTab(id, value) {
            tabs.forEach(item => {
                if (item.id === id) {
                    item.value = value;
                }
            });
            queries.updateTab(id, value);
        }

        function deleteTab(id) {
            if (tabs.length > 1) {
                tabs = tabs.filter(item => item.id !== id);
                queries.deleteTab(id);
            }
        }

        function setSelectTab(id) {
            selectedTab = id;
        }

        function getTodoForTab() {
            queries.getTodos(selectedTab)
                .then(data => {
                    todos = data;
                    Store.emitTodoChange();
                });
        }

        function setSelectedIntoLocalStorage() {
            localStorage.setItem('selectedTab', selectedTab);
        }

        function getSelectedFromLocalStorage() {
            return localStorage.getItem('selectedTab');
        }

        Store = Object.assign({}, eventEmitter.prototype, {

            initializeStore: function () {
                queries.getTabs()
                    .then(data => {
                        tabs = data;
                        let currentSelectedTab = getSelectedFromLocalStorage();
                        if (currentSelectedTab && tabs.some(item => item.id === currentSelectedTab)) {
                            setSelectTab(currentSelectedTab);
                        }
                        else {
                            setSelectTab(tabs[0].id);
                            setSelectedIntoLocalStorage();
                        }
                        getTodoForTab();
                        Store.emitTabChange();
                    });
            },

            getTodos: function () {
                return todos;
            },

            emitTodoChange: function () {
                this.emit(CHANGE_TODO_EVENT)
            },

            addTodoChangeListener: function (callback) {
                this.on(CHANGE_TODO_EVENT, callback);
            },

            removeTodoChangeListener: function (callback) {
                this.removeListener(CHANGE_TODO_EVENT, callback);
            },

            getTabs: function () {
                return tabs;
            },

            emitTabChange: function () {
                this.emit(CHANGE_TAB_EVENT)
            },

            addTabChangeListener: function (callback) {
                this.on(CHANGE_TAB_EVENT, callback);
            },

            removeTabChangeListener: function (callback) {
                this.removeListener(CHANGE_TAB_EVENT, callback);
            },

            getSelected(){
                return selectedTab;
            }
        });

        Dispatcher.register(function (action) {
            const minLength = 0,
                maxLength = 250;
            var value;

            switch (action.actionType) {
                case Constants.TODO_CREATE:
                    value = action.value.trim();

                    if (value.length > minLength && value.length <= maxLength) {
                        createTodo(value);
                        Store.emitTodoChange();
                    }
                    break;

                case Constants.TODO_DELETE:
                    deleteTodo(action.id);
                    Store.emitTodoChange();
                    break;

                case Constants.TODO_UPDATE:
                    updateTodo(action.id, action.value);
                    Store.emitTodoChange();
                    break;

                case Constants.TODO_TOGGLE:
                    toggleTodo(action.id);
                    Store.emitTodoChange();
                    break;

                case Constants.TAB_CREATE:
                    value = action.value.trim();

                    if (value.length > minLength && value.length <= maxLength) {
                        createTab(value);
                        Store.emitTabChange();
                    }
                    break;

                case Constants.TAB_UPDATE:
                    updateTab(action.id, action.value);
                    Store.emitTabChange();
                    break;

                case Constants.TAB_SELECT:
                    setSelectTab(action.id);
                    setSelectedIntoLocalStorage();
                    getTodoForTab();
                    Store.emitTabChange();
                    break;

                default:
            }
        });

        return Store;
    });