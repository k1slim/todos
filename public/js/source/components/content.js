define(['react', 'Sortable', 'sortableMixin', 'Item', 'Store'],
    function (React, Sortable, SortableMixin, Item, Store) {

        return React.createClass({
            displayName: 'Content',

            mixins: [SortableMixin],

            sortableOptions: {
                scrollSensitivity: 100
            },

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
    });