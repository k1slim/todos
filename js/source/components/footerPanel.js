define(['jquery', 'react', 'event', 'eventList'],
    function ($, React, event, eventList) {

        return React.createClass({
            displayName: 'Footer',

            getInitialState: function () {
                return {
                    value: ''
                };
            },

            addItem: function () {
                const minLength = 0,
                    maxLength = 250;

                if (this.state.value.length > minLength && this.state.value.length <= maxLength) {
                    event.trigger(eventList.addItem, {value: this.state.value.trim()});
                    this.setState({value: ''});
                }
                else {
                    return false;
                }
            },

            onChangeHandler: function (e) {
                this.setState({value: e.target.value});
            },

            keyPressHandler: function (e) {
                if (e.which === 13) {
                    this.addItem();
                }
            },

            render: function () {
                return (
                    <footer className="footer">
                        <div className="textField">
                            <input type="text" placeholder="Text here" value={this.state.value}
                                   onChange={this.onChangeHandler} onKeyPress={this.keyPressHandler}/>
                        </div>
                        <div className="addButton" onClick={this.addItem}>
                            ADD
                        </div>
                    </footer>
                );
            }
        });
    });
