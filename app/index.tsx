import React from 'react';
import ReactDOM from 'react-dom';
import RootLayout from './layouts';

import LogRocket from 'logrocket';
LogRocket.init('personal-aftuk/httpserhathawaygithubio');

import setupLogRocketReact from 'logrocket-react';

// after calling LogRocket.init()
setupLogRocketReact(LogRocket);

LogRocket.getSessionURL(function(sessionURL) {
    window.mixpanel.track('LogRocket', {sessionURL: sessionURL});
});

LogRocket.getSessionURL(function(sessionURL) {
    window.heap.track('LogRocket', {sessionURL: sessionURL});
});

LogRocket.getSessionURL(function(sessionURL) {
    window.ga('send', {
        hitType: 'event',
        eventCategory: 'LogRocket',
        eventAction: sessionURL
    });
});

ReactDOM.render(<RootLayout />, document.getElementById('root'));
