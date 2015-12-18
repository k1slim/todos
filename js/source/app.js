require.config({
    paths: {
        'jquery': '../../bower_components/jquery/dist/jquery.min',
        'react': '../../bower_components/react/react',
        'reactDOM': '../../bower_components/react/react-dom',

        'item': 'components/item',
        'footer': 'components/footerPanel',
        'header': 'components/header',
        'content': 'components/content'
    }
});

require(['jquery','reactDOM','react','header','content','footer'], function ($, ReactDOM, React, Header, Content, Footer) {

    ReactDOM.render(
        <section className="page">
            <Header/>
            <Content/>
            <Footer/>
        </section>,
        $('body')[0]
    );

});
