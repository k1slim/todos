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
                $.get('/todos')
                    .then(data => this.setState({items: data}));
                event.on(eventList.addItem, this.updateList);
                event.on(eventList.deleteItem, this.deleteItem);
            },

            componentWillUnmount: function () {
                event.off(eventList.addItem, this.updateList);
                event.off(eventList.deleteItem, this.deleteItem);
            },

            updateList: function (e, data) {
                var newItems = this.state.items,
                    currentItem={id: `${Date.now()}${~~(Math.random() * 100)}`, value: data.value, tab: '1'};
                newItems.push(currentItem);
                this.setState({items: newItems});

                $.ajax({
                    type: 'POST',
                    data: JSON.stringify(currentItem),
                    contentType: 'application/json',
                    url: '/todos'
                });
            },

            deleteItem: function (e, data) {
                var newItems = this.state.items;
                newItems = newItems.filter(item => item.id !== data);
                this.setState({items: newItems});

                $.ajax({
                    type: 'DELETE',
                    url: `/todos/${data}`
                });
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