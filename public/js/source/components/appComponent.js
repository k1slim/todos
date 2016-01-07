define(['react', 'Header', 'Content', 'Footer', 'LoginForm', 'LoginStore'],
    function (React, Header, Content, Footer, LoginForm, LoginStore) {

        return React.createClass({
            displayName: 'App',

            getInitialState: function () {
                return {
                    isLogged: false
                };
            },

            componentDidMount: function () {
                LoginStore.addLoginListener(this._toggleState);
            },

            componentWillUnmount: function () {
                LoginStore.removeLoginListener(this._toggleState);
            },

            _toggleState: function () {
                if (LoginStore.getLoginStatus() === 'Login successful') {
                    this.setState({isLogged: true});
                }
                else {
                    this.setState({isLogged: false});
                }
            },

            render: function () {
                return this.state.isLogged ? (
                    <section className="page">
                        <Header/>
                        <Content/>
                        <Footer/>
                    </section>
                ) : (
                    <section className="page">
                        <LoginForm/>
                    </section>
                );
            }
        });
    });