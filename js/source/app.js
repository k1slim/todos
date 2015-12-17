require.config({
    paths: {
        'jquery': '../../bower_components/jquery/dist/jquery.min',
        'react': '../../bower_components/react/react',
        'reactDOM': '../../bower_components/react/react-dom',

        'item': 'components/item'
    }
});

require(['jquery','reactDOM','react', 'item'], function ($, ReactDOM, React, Item) {

    ReactDOM.render(
        <Item />,
        $('#content')[0]
    );

});
