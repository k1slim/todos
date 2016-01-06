require.config({
    paths: {
        'react': '../../bower_components/react/react',
        'reactDOM': '../../bower_components/react/react-dom',
        'flux': '../../bower_components/flux/dist/Flux',
        'eventEmitter': '../../bower_components/eventEmitter/EventEmitter',

        //Todo Local libraries must replaced to CDN on production. In index.html too
        //TODO Make a test user and write about it in the readme
        //TODO Transpile ES6 to ES5

        'App': 'components/appComponent',
        'Header': 'components/header',
        'Nav': 'components/nav',
        'NavItem': 'components/navItem',
        'Content': 'components/content',
        'Item': 'components/item',
        'Footer': 'components/footerPanel',
        'ContentEditable': 'components/contentEditable',
        'LoginForm': 'components/loginForm',

        'Dispatcher': 'dispatcher/dispatcher',
        'Actions': 'actions/actions',
        'Store': 'stores/store',
        'LoginStore': 'stores/loginStore',
        'Constants': 'constants/constants',

        'queries': 'queries'
    }
});

require(['reactDOM', 'react', 'App', 'LoginStore'],
    function (ReactDOM, React, App, LoginStore) {
        LoginStore.initializeFromSession();

        ReactDOM.render(
            <App/>,
            document.getElementById('main')
        );

    });

