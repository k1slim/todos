define(['react', 'LoginStore'],
    function (React, LoginStore) {

        const ENTER_KEY_CODE = 13;

        return React.createClass({
            displayName: 'LoginForm',

            getInitialState: function () {
                return {
                    username: '',
                    password: '',
                    checked: true,
                    loginError: false,
                    passwordError: false
                };
            },

            componentDidMount: function () {
                LoginStore.addLoginListener(this._login);
            },

            componentWillUnmount: function () {
                LoginStore.removeLoginListener(this._login);
            },

            _onPasswordChange: function (event) {
                this.setState({password: event.target.value});
            },

            _onUsernameChange: function (event) {
                this.setState({username: event.target.value});
            },

            _onCheckChange: function () {
                this.setState({checked: !this.state.checked});
            },

            _onClick: function () {
                if (this.state.username === '') {
                    this.setState({loginError: true});
                }
                else {
                    this.setState({loginError: false});
                }
                if (this.state.password === '') {
                    this.setState({passwordError: true})
                }
                else {
                    this.setState({passwordError: false});
                }
                if (this.state.username !== '' && this.state.password !== '') {
                    LoginStore.login(this.state.username, this.state.password, this.state.checked);
                }
            },

            _onKeyPress: function (event) {
                if (event.which === ENTER_KEY_CODE) {
                    this._onClick();
                }
            },

            _login: function () {
                var status = LoginStore.getLoginStatus();
                switch (status) {
                    case 'Incorrect username':
                        this.setState({loginError: true});
                        break;

                    case 'Incorrect password':
                        this.setState({passwordError: true});
                        break;

                    default:
                }
            },

            _setLoginErrorClass: function () {
                return this.state.loginError ? 'loginError showError' : 'loginError';
            },


            _setPasswordErrorClass: function () {
                return this.state.passwordError ? 'passwordError showError' : 'loginError';
            },

            render: function () {
                return (
                    <section className="loginForm">
                        <header className="loginFormHeader">
                            <h2>
                                Login
                            </h2>
                        </header>
                        <div className="login">
                            <input className="inputText" id="login" type="text" placeholder="Login"
                                   value={this.state.username} onChange={this._onUsernameChange}/>
                            <label htmlFor="login" className={this._setLoginErrorClass()}>
                                Incorrect login
                            </label>
                        </div>
                        <div className="password">
                            <input className="inputText" id="password" type="password" placeholder="Password"
                                   value={this.state.password} onChange={this._onPasswordChange}/>
                            <label htmlFor="password" className={this._setPasswordErrorClass()}>
                                Incorrect password
                            </label>
                        </div>
                        <footer className="loginFormFooter">
                            <span className="staySigned">
                                <input id="staySigned" type="checkbox" checked={this.state.checked}
                                       onChange={this._onCheckChange}/>
                                <label htmlFor="staySigned">Stay signed in</label>
                            </span>
                            <span className="submitLoginButton" tabIndex="0" onClick={this._onClick}
                                  onKeyPress={this._onKeyPress}>
                                SIGN IN
                            </span>
                        </footer>
                    </section>
                );
            }
        });
    });