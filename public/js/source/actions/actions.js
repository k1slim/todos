define(['Dispatcher', 'Constants'],
    function (Dispatcher, Constants) {

        return {
            createTodo: function (value) {
                Dispatcher.dispatch({
                    actionType: Constants.TODO_CREATE,
                    value: value
                })
            },

            deleteTodo: function (id) {
                Dispatcher.dispatch({
                    actionType: Constants.TODO_DELETE,
                    id: id
                })
            },

            updateTodo: function (id, value) {
                Dispatcher.dispatch({
                    actionType: Constants.TODO_UPDATE,
                    id: id,
                    value: value
                })
            },

            toggleTodo: function (id) {
                Dispatcher.dispatch({
                    actionType: Constants.TODO_TOGGLE,
                    id: id
                })
            },

            createTab: function (value) {
                Dispatcher.dispatch({
                    actionType: Constants.TAB_CREATE,
                    value: value
                })
            },

            updateTab: function (id, value) {
                Dispatcher.dispatch({
                    actionType: Constants.TAB_UPDATE,
                    id: id,
                    value: value
                })
            }
        }
    });