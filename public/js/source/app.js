require.config({
    paths: {
        'jquery': '../../bower_components/jquery/dist/jquery.min',
        'react': '../../bower_components/react/react',
        'reactDOM': '../../bower_components/react/react-dom',
        'flux': '../../bower_components/flux/dist/Flux',
        'eventEmitter': '../../bower_components/eventEmitter/EventEmitter',
        'Sortable': '../../bower_components/Sortable/Sortable.min',
        'sortableMixin': '../../bower_components/Sortable/react-sortable-mixin',

        'App': 'components/appComponent',
        'Header': 'components/header',
        'Nav': 'components/nav',
        'NavItem': 'components/navItem',
        'Content': 'components/content',
        'Item': 'components/item',
        'Footer': 'components/footerPanel',
        'ContentEditable': 'components/contentEditable',

        'Dispatcher': 'dispatcher/dispatcher',
        'Actions': 'actions/actions',
        'Store': 'stores/store',
        'Constants': 'constants/constants'
    }
});

require(['reactDOM', 'react', 'App'], function (ReactDOM, React, App) {

    ReactDOM.render(
        <App/>,
        document.getElementById('body')
    );

});

