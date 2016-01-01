require.config({
    paths: {
        'react': '../../bower_components/react/react',
        'reactDOM': '../../bower_components/react/react-dom',
        'flux': '../../bower_components/flux/dist/Flux',
        'eventEmitter': '../../bower_components/eventEmitter/EventEmitter',

        //Todo local libraries must replaced to CDN on production. In index.html too

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
        'Constants': 'constants/constants',

        'queries': 'queries'
    }
});

require(['reactDOM', 'react', 'Store', 'App'],
    function (ReactDOM, React, Store, App) {

        Store.initializeStore();

        ReactDOM.render(
            <App/>,
            document.getElementById('body')
        );

    });

