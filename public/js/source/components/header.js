define(['react', 'Nav', 'event', 'eventList'],
    function (React, Nav, event, eventList) {

        return React.createClass({
            displayName: 'Header',

            getInitialState: function () {
                return {
                    value: ''
                };
            },

            addItem: function () {
                const minLength = 0,
                    maxLength = 60;

                if (this.state.value.length > minLength && this.state.value.length <= maxLength) {
                    event.trigger(eventList.addMenuItem, {value: this.state.value.trim()});
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
                    <header className="header">
                        <div className="head">
                            <div className="Title">
                                <h1>
                                    ToDos
                                </h1>
                            </div>
                            <div className="addTabField">
                                <input type="text" placeholder="Tab name" value={this.state.value}
                                       onChange={this.onChangeHandler} onKeyPress={this.keyPressHandler}/>
                            </div>
                        </div>

                        <Nav/>
                    </header>
                );
            }
        });
    });