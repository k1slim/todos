define(['react', 'Header', 'Content', 'Footer'],
    function (React, Header, Content, Footer) {

        return React.createClass({
            displayName: 'App',

            render: function () {
                return (
                    <section className="page">
                        <Header/>
                        <Content/>
                        <Footer/>
                    </section>
                );
            }
        });
    });