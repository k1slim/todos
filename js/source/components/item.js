define(['react'],
    function (React) {

        return React.createClass({
            displayName: 'Item',

            getInitialState: function () {
                return {
                    done: this.props.done,
                    value:this.props.value
                };
            },

            toggleDone: function () {
                this.setState({done: !this.state.done});
            },

            setItemClass: function () {
                return this.state.done ? 'item' : 'item completed';
            },

            render: function () {
                return (
                    <div className={this.setItemClass()}>
                        <div className="itemDone" onClick={this.toggleDone}>
                            <img src="image/icons/done.png"/>
                        </div>
                        <div className="itemText" contentEditable="true">
                            {this.state.value}
                        </div>

                        <div className="itemDelete">
                            <img src="image/icons/delete.png"/>
                        </div>
                    </div>
                );
            }
        });
    });