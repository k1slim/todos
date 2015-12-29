define(['react', 'Nav','Actions'],
    function (React, Nav, Actions) {

        return React.createClass({
            displayName: 'Header',

            getInitialState: function () {
                return {
                    value: ''
                };
            },

            _addItem: function () {
                Actions.createTab(this.state.value);
            },

            _onChange: function (event) {
                this.setState({value: event.target.value});
            },

            _onKeyPress: function (event) {
                if (event.which === 13) {
                    this._addItem();
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
                                       onChange={this._onChange} onKeyPress={this._onKeyPress}/>
                            </div>
                        </div>

                        <Nav/>
                    </header>
                );
            }
        });
    });