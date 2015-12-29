define(['jquery', 'eventEmitter', 'Dispatcher', 'Constants'],
    function ($, eventEmitter, Dispatcher, Constants) {

        const CHANGE_TODO_EVENT = 'changeTodo',
            CHANGE_TAB_EVENT = 'changeTab';

        var todos = [],
            tabs=[],
            Store;

        $.get('/todos')
            .then(data => {
                todos = data;
                Store.emitTodoChange();
            });

        function createTodo(value) {
            var currentTodo = {
                id: `${Date.now()}${~~(Math.random() * 100)}`,
                value: value,
                tab: '1'
            };
            todos.push(currentTodo);
            $.ajax({
                type: 'POST',
                data: JSON.stringify(currentTodo),
                contentType: 'application/json',
                url: '/todos'
            });
            //TODO сделать общую загрузку по табу
        }

        function deleteTodo(id) {
            todos = todos.filter(item => item.id !== id);

            $.ajax({
                type: 'DELETE',
                url: `/todos/${id}`
            });
        }

        function updateTodo(id, value) {
            todos.forEach(item => {
                if (item.id === id) {
                    item.value = value;
                }
            });

            $.ajax({
                type: 'PUT',
                data: JSON.stringify({value: value}),
                contentType: 'application/json',
                url: `/todos/${id}`
            });
        }

        function toggleTodo(id) {
            var currentDone = true;
            todos.forEach(item => {
                if (item.id === id) {
                    currentDone = !item.done;
                    item.done = currentDone;
                }
            });

            $.ajax({
                type: 'PUT',
                data: JSON.stringify({done: currentDone}),
                contentType: 'application/json',
                url: `/todos/${id}`
            });
        }

        function createTab(value){
            var currentTab = {
                id: `${Date.now()}${~~(Math.random() * 100)}`,
                value: value
            };
            tabs.push(currentTab);
        }

        function updateTab(id, value){
            tabs.forEach(item => {
                if (item.id === id) {
                    item.value = value;
                }
            });
        }

        Store = Object.assign({}, eventEmitter.prototype, {
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

                default:
            }
        });

        return Store;
    });