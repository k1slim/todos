require.config({
    paths: {
        'jquery': '../../bower_components/jquery/dist/jquery.min',
        'react': '../../bower_components/react/react',
        'reactDOM': '../../bower_components/react/react-dom',
        'Sortable': '../../bower_components/Sortable/Sortable.min',
        'sortableMixin': '../../bower_components/Sortable/react-sortable-mixin',

        'App':'components/appComponent',
        'Header': 'components/header',
        'Content': 'components/content',
        'Item': 'components/item',
        'Footer': 'components/footerPanel',

        'event': 'events/event',
        'eventList': 'events/eventList'
    }
});

require(['jquery', 'reactDOM', 'react','App'], function ($, ReactDOM, React, App) {

    ReactDOM.render(
        <App/>,
        $('body')[0]
    );

});

