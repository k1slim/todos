import React from 'react';
import ContentEditable from './contentEditable';
import Actions from '../actions/actions';

export default React.createClass({
    displayName: 'Item',

    _doneHandler: function () {
        Actions.toggleTodo(this.props.id);
    },

    _deleteHandler: function () {
        Actions.deleteTodo(this.props.id);
    },

    _setItemClass: function () {
        return this.props.done ? 'item completed' : 'item';
    },

    _updateValue: function (value) {
        Actions.updateTodo(this.props.id, value);
    },

    render: function () {
        return (
            <div className={this._setItemClass()}>
                <div className="itemDone" onClick={this._doneHandler}>
                    <img src="image/icons/done.png" alt="done"/>
                </div>
                <ContentEditable className="itemText" inputClassName="contentEditable" value={this.props.value}
                                 updateValue={this._updateValue}/>
                <div className="itemDelete" onClick={this._deleteHandler}>
                    <img src="image/icons/delete.png" alt="delete"/>
                </div>
            </div>
        );
    }
});