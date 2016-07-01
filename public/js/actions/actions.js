import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/constants';

export default {
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
    },

    selectTab: function (id) {
        Dispatcher.dispatch({
            actionType: Constants.TAB_SELECT,
            id: id
        })
    }
}