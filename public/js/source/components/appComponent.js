define(['react', 'Header', 'Content', 'Footer', 'LoginForm', 'LoginStore'],
    function (React, Header, Content, Footer, LoginForm, LoginStore) {

        const APP_STATUS = {
            SIGNED: 'SIGNED',
            UNSIGNED: 'UNSIGNED'
        };

        return React.createClass({
            displayName: 'App',

            getInitialState: function () {
                return {
                    page: APP_STATUS.UNSIGNED
                };
            },

            componentDidMount: function () {
                LoginStore.addLoginListener(this._showPage);
            },

            componentWillUnmount: function () {
                LoginStore.removeLoginListener(this._showPage);
            },

            _showPage: function () {
                if (LoginStore.getLoginStatus() === 'Login successful') {
                    this.setState({page: APP_STATUS.SIGNED});
                }
                else {
                    this.setState({page: APP_STATUS.UNSIGNED});
                }
            },

            render: function () {
                var page = this.state.page === APP_STATUS.UNSIGNED ?
                    <section className="page">
                        <LoginForm/>
                    </section>
                    :
                    <section className="page">
                        <Header/>
                        <Content/>
                        <Footer/>
                    </section>;
                return (
                    page
                );
            }
        });
    });