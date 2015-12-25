define(['jquery', 'react', 'event', 'eventList'],
    function ($, React, event, eventList) {

        return React.createClass({
            displayName: 'Item',

            propTypes: {
                value: React.PropTypes.string.isRequired
            },

            getDefaultProps: function () {
                return {
                    done: false
                };
            },

            getInitialState: function () {
                return {
                    id: this.props.id,
                    done: this.props.done,
                    value: this.props.value
                };
            },

            doneHandler: function () {
                this.setState({done: !this.state.done});
                $.ajax({
                    type: 'PUT',
                    data: JSON.stringify({done: !this.state.done}),
                    contentType: 'application/json',
                    url: `/todos/${this.state.id}`
                });
            },

            deleteHandler: function () {
                event.trigger(eventList.deleteItem, this.state.id);
            },

            setItemClass: function () {
                return this.state.done ? 'item completed' : 'item';
            },

            render: function () {
                return (
                    <div className={this.setItemClass()}>
                        <div className="itemDone" onClick={this.doneHandler}>
                            <img src="image/icons/done.png"/>
                        </div>
                        <div className="itemText">
                            {this.state.value}
                        </div>

                        <div className="itemDelete" onClick={this.deleteHandler}>
                            <img src="image/icons/delete.png"/>
                        </div>
                    </div>
                );
            }
        });
    });