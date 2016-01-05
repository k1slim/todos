define(['react', 'LoginStore'],
    function (React, LoginStore) {

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

            _login: function () {
                var msg = LoginStore.getLoginStatus();
                switch (msg) {
                    case 'Incorrect username':
                        this.setState({loginError: true});
                        break;

                    case 'Incorrect password':
                        this.setState({passwordError: true});
                        break;

                    default:
                }
            },

            _onCheckChange: function () {
                this.setState({checked: !this.state.checked});
            },

            _onChange: function (event) {
                switch (event.target.type) {
                    case 'text':
                        this.setState({username: event.target.value});
                        break;

                    case 'password':
                        this.setState({password: event.target.value});
                        break;

                    default:
                }
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
                if (event.which === 13) {
                    this._onClick();
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
                                   value={this.state.username} onChange={this._onChange}/>
                            <label htmlFor="login" className={this._setLoginErrorClass()}>
                                Incorrect login
                            </label>
                        </div>
                        <div className="password">
                            <input className="inputText" id="password" type="password" placeholder="Password"
                                   value={this.state.password} onChange={this._onChange}/>
                            <label htmlFor="password" className={this._setPasswordErrorClass()}>
                                Incorrect password
                            </label>
                        </div>
                        <footer className="loginFormFooter">
                            <span className="staySigned">
                                <input type="checkbox" id="staySigned" checked={this.state.checked}
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