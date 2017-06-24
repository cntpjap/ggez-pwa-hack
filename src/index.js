import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SimpleMap from './SimpleMap';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<SimpleMap />, document.getElementById('root'));
registerServiceWorker();
