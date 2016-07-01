import React from 'react';
import Actions from '../actions/actions';

const ENTER_KEY_CODE = 13;

export default React.createClass({
    displayName: 'Footer',

    getInitialState: function () {
        return {
            value: ''
        };
    },

    _onChange: function (event) {
        this.setState({value: event.target.value});
    },

    _onKeyPress: function (event) {
        if (event.which === ENTER_KEY_CODE) {
            this._addItem();
        }
    },

    _addItem: function () {
        Actions.createTodo(this.state.value);
        this.setState({value: ''});
    },

    render: function () {
        return (
            <footer className="footer">
                <div className="textField">
                    <input type="text" placeholder="Add new todo" value={this.state.value}
                           onChange={this._onChange} onKeyPress={this._onKeyPress}/>
                </div>
            </footer>
        );
    }
});
