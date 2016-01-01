define(function () {

        function query(type, url, data) {
            type = type.toUpperCase();

            return xhr({
                type: type,
                data: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                },
                url: url
            });
        }

        function xhr(options) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open(options.type, options.url);
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.onerror = function () {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                };
                if (options.headers) {
                    Object.keys(options.headers).forEach(function (key) {
                        xhr.setRequestHeader(key, options.headers[key]);
                    });
                }
                xhr.send(options.data);
            });
        }

        return {
            getTodos: function (tabId) {
                return query('get', `/todos/${tabId}`);
            },

            createTodo(data){
                query('post', '/todo', data);
            },

            deleteTodo: function (id) {
                query('delete', `/todo/${id}`);
            },

            updateTodo: function (id, value) {
                query('put', `/todo/${id}`, {value: value});
            },

            toggleTodo: function (id, done) {
                query('put', `/todo/${id}`, {done: done});
            },

            getTabs: function () {
                return query('get', '/tabs');
            },

            createTab: function (data) {
                query('post', '/tab', data);
            },

            deleteTab: function (id) {
                query('delete', `/tab/${id}`);
            },

            updateTab: function (id, value) {
                query('put', `/tab/${id}`, {value: value});
            }
        };
    });