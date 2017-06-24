import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './pages/Home'
import FAQ from './pages/FAQ'
// import PageNotFound from './pages/PageNotFound'
import registerServiceWorker from './lib/registerServiceWorker';

import './index.css';



ReactDOM.render(
  // <Provider store={store}>
		<Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/faq" component={FAQ}/>
    </div>
    </Router>
	// </Provider>
  ,
  document.getElementById('root'));
registerServiceWorker();
