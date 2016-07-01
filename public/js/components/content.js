import React from 'react';
import Item from './item';
import Store from '../stores/store';

export default React.createClass({
    displayName: 'Content',

    getInitialState: function () {
        return {
            items: []
        };
    },

    componentDidMount: function () {
        Store.addTodoChangeListener(this._updateList);
    },

    componentWillUnmount: function () {
        Store.removeTodoChangeListener(this._updateList);
    },

    _updateList: function () {
        this.setState({items: Store.getTodos()});
    },

    render: function () {
        return (
            <div className="content" id="content">
                {this.state.items.map(item => <Item id={item.id} key={item.id} value={item.value}
                                                    done={item.done}/>)}
            </div>
        );
    }
});