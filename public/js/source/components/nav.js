define(['react', 'NavItem', 'Store'],
    function (React, NavItem, Store) {

        return React.createClass({
            displayName: 'Nav',

            getInitialState: function () {
                return {
                    items: []
                };
            },

            componentDidMount: function () {
                Store.addTabChangeListener(this._updateList);
            },

            componentWillUnmount: function () {
                Store.removeTabChangeListener(this._updateList);
            },

            _updateList: function () {
                this.setState({items: Store.getTabs()});
            },

            render: function () {
                return (
                    <nav className="nav">
                        {this.state.items.map(item => <NavItem id={item.id} key={item.id} value={item.value}/>)}
                    </nav>
                );
            }
        });
    });