'use strict';

import queries from '../queries';
import EventEmitter from 'wolfy87-eventemitter';
import Constants from '../constants/constants';
import Dispatcher from '../dispatcher/dispatcher'

const CHANGE_TODO_EVENT = 'CHANGE_TODO_EVENT',
    CHANGE_TAB_EVENT = 'CHANGE_TAB_EVENT';

let todos = [],
    tabs = [],
    selectedTab = '',
    currentUserId = '',
    Store;

function createTodo(value) {
    let currentTodo = {
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
    let currentDone = true;
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
    let currentTab = {
        id: `${Date.now()}${~~(Math.random() * 100)}`,
        value: value,
        user: currentUserId
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

Store = Object.assign({}, EventEmitter.prototype, {
    initializeStore: function (userId) {
        queries.getTabs(userId)
            .then(data => {
                currentUserId = userId;
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
        this.emit(CHANGE_TODO_EVENT);
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
        this.emit(CHANGE_TAB_EVENT);
    },

    addTabChangeListener: function (callback) {
        this.on(CHANGE_TAB_EVENT, callback);
    },

    removeTabChangeListener: function (callback) {
        this.removeListener(CHANGE_TAB_EVENT, callback);
    },

    getSelected: function () {
        return selectedTab;
    }
});

Dispatcher.register(function (action) {
    const minLength = 0,
        maxLength = 250;
    let value;

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

export default Store;