import React from 'react';
import ContentEditable from './contentEditable';
import Store from '../stores/store';
import Actions from '../actions/actions';

export default React.createClass({
    displayName: 'NavItem',

    _onClick: function () {
        Actions.selectTab(this.props.id);
    },

    _setItemClass: function () {
        return (this.props.id === Store.getSelected()) ? 'menuItem selectedMenuItem' : 'menuItem';
    },

    _setPencilProps: function () {
        return this.props.id === Store.getSelected();
    },

    _updateValue: function (value) {
        Actions.updateTab(this.props.id, value);
    },

    render: function () {
        return (
            <div className={this._setItemClass()} onClick={this._onClick}>
                <ContentEditable className="menuItemText" inputClassName="contentEditable contentEditableTab"
                                 value={this.props.value} updateValue={this._updateValue}
                                 pencil={this._setPencilProps()}/>
            </div>
        );
    }
});