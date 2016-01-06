define(['react', 'Nav', 'Actions', 'LoginStore'],
    function (React, Nav, Actions, LoginStore) {

        return React.createClass({
            displayName: 'Header',

            getInitialState: function () {
                return {
                    value: ''
                };
            },

            _addItem: function () {
                Actions.createTab(this.state.value.trim());
                this.setState({value: ''});
            },

            _onChange: function (event) {
                this.setState({value: event.target.value});
            },

            _onKeyPress: function (event) {
                if (event.which === 13) {
                    this._addItem();
                }
            },

            _onClick: function () {
                LoginStore.logout();
            },

            render: function () {
                return (
                    <header className="header">
                        <div className="head">
                            <div className="title">
                                <h1>
                                    ToDos
                                </h1>
                            </div>
                            <div className="userField">
                                <span className="usernamePlaceholder">
                                    {LoginStore.getUserName()}
                                </span>
                                <span className="logoutButton" onClick={this._onClick}>
                                    LOGOUT
                                </span>
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