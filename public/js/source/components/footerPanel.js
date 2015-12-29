define(['react', 'Actions'],
    function (React, Actions) {

        return React.createClass({
            displayName: 'Footer',

            getInitialState: function () {
                return {
                    value: ''
                };
            },

            _addItem: function () {
                Actions.createTodo(this.state.value);
            },

            _onChange: function (event) {
                this.setState({value: event.target.value});
            },

            _onKeyPress: function (event) {
                if (event.which === 13) {
                    this._addItem();
                }
            },

            render: function () {
                return (
                    <footer className="footer">
                        <div className="textField">
                            <input type="text" placeholder="Text here" value={this.state.value}
                                   onChange={this._onChange} onKeyPress={this._onKeyPress}/>
                        </div>
                    </footer>
                );
            }
        });
    });
