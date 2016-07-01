import React from 'react';
import { render } from 'react-dom';

import LoginStore from './stores/loginStore';
import App from './components/appComponent';

LoginStore.initializeFromSession();

render(
    <App/>,
    document.getElementById('main')
);

