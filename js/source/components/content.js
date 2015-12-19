define(['jquery', 'react', 'Sortable', 'sortableMixin', 'event', 'eventList', 'Item'],
    function ($, React, Sortable, SortableMixin, event, eventList, Item) {

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
                event.on(eventList.addItem, this.updateList);
                event.on(eventList.deleteItem, this.deleteItem);
            },

            componentWillUnmount: function () {
                event.off(eventList.addItem, this.updateList);
                event.off(eventList.deleteItem, this.deleteItem);
            },

            updateList: function (e, data) {
                var newItems = this.state.items;
                newItems.push(data);
                this.setState({items: newItems});
            },

            deleteItem: function (e, data) {
                var newItems = this.state.items;
                newItems = newItems.filter(item=>item.value !== data);
                this.setState({items: newItems});
            },

            render: function () {
                return (
                    <div className="content" id="content">
                        {this.state.items.map(item => <Item key={item.value} value={item.value}/>)}
                    </div>
                );
            }
        });
    });