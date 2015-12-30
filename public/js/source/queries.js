define(['jquery'],
    function ($) {

        function query(type, url, data) {
            type = type.toUpperCase();

            $.ajax({
                type: type,
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: url
            });
        }

        return {
            getTodos: function (tabId) {
                return $.get(`/todos/${tabId}`);
            },

            createTodo(data){
                query('post', '/todo', data);
            },

            deleteTodo: function (id) {
                $.ajax({
                    type: 'DELETE',
                    url: `/todo/${id}`
                });
            },

            updateTodo: function (id, value) {
                query('put', `/todo/${id}`, {value: value});
            },

            toggleTodo: function (id, done) {
                query('put', `/todo/${id}`, {done: done});
            },

            getTabs: function () {
                return $.get('/tabs');
            },

            createTab: function (data) {
                query('post', '/tab', data);
            },

            deleteTab: function (id) {
                $.ajax({
                    type: 'DELETE',
                    url: `/tab/${id}`
                });
            },

            updateTab: function (id, value) {
                query('put', `/tab/${id}`, {value: value});
            }
        };
    });