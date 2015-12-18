define(['jquery','react','reactDOM','item'],
    function ($, React, ReactDOM, Item) {

        return React.createClass({
            displayName: 'Footer',

            getInitialState: function () {
                return {
                    items:[],
                    value:''
                };
            },

            addItem:function(){
                var nextItems = this.state.items.concat([{value: this.state.value}]),
                    nextText = '',
                    createItem = function(item) {
                        return <Item value={item.value} done={true} />;
                    };
                console.log('asd');

                this.setState({items: nextItems, value: nextText});

                ReactDOM.render(
                    <div>
                        {this.state.items.map(createItem)}
                    </div>,
                   $('#content')[0]
                );
            },

            onChangeValue: function(e) {
                this.setState({value: e.target.value});
            },

            render: function () {
                return (
                    <footer className="footer">
                        <div className="textField">
                            <input type="text" placeholder="Text here" value={this.state.value} onChange={this.onChangeValue}/>
                        </div>
                        <div className="addButton" onClick={this.addItem}>
                            ADD
                        </div>
                    </footer>
                );
            }
        });
    });
