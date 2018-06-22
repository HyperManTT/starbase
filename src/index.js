import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.MusicKitInstance = window.MusicKit.configure({
    developerToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVONzQ5NEhGNDcifQ.eyJpYXQiOjE1Mjk2OTUwMTgsImV4cCI6MTU0NTI0NzAxOCwiaXNzIjoiMlVKNUY0TVU1VSJ9.5xv6wLb7VeHt5wttDu7AFhSiqE8849rjMvdlvaKO00qzmzGwkxJJ5rovsCBKZ8ZFV02VKnpLcXTQIe0sQjKilw',
    app: {
        name: 'Starbase',
        build: '1978.4.1'
    }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
