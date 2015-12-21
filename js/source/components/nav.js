define(['react', 'event', 'eventList', 'NavItem'],
    function (React, event, eventList, NavItem) {

        return React.createClass({
            displayName: 'Nav',

            getInitialState: function () {
                return {
                    items: []
                };
            },

            componentDidMount: function () {
                event.on(eventList.addMenuItem, this.updateList);
            },

            componentWillUnmount: function () {
                event.off(eventList.addMenuItem, this.updateList);
            },

            updateList: function (e, data) {
                var newItems = this.state.items;
                newItems.push(data);
                this.setState({items: newItems});
            },

            render: function () {
                return (
                    <nav className="nav">
                        {this.state.items.map(item => <NavItem key={new Date + item.value} value={item.value}/>)}
                    </nav>
                );
            }
        });
    });