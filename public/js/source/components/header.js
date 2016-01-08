define(['react', 'Nav', 'Actions', 'LoginStore'],
    function (React, Nav, Actions, LoginStore) {

        const ENTER_KEY_CODE = 13;

        return React.createClass({
            displayName: 'Header',

            getInitialState: function () {
                return {
                    value: ''
                };
            },

            _onChange: function (event) {
                this.setState({value: event.target.value});
            },

            _onClick: function () {
                LoginStore.logout();
            },

            _onKeyPress: function (event) {
                if (event.which === ENTER_KEY_CODE) {
                    this._addItem();
                }
            },

            _addItem: function () {
                Actions.createTab(this.state.value);
                this.setState({value: ''});
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
                                <input type="text" placeholder="Add new tab" value={this.state.value}
                                       onChange={this._onChange} onKeyPress={this._onKeyPress}/>
                            </div>
                        </div>

                        <Nav/>
                    </header>
                );
            }
        });
    });