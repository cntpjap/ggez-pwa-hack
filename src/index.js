import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './pages/Home'
import FAQ from './pages/FAQ'
import PageNotFound from './pages/PageNotFound'
import configureStore from './lib/redux/configureStore'
import {init as firebaseInit} from './lib/firebase'
import registerServiceWorker from './lib/registerServiceWorker'

import './index.css';


class App extends Component {
  constructor(props) {
    super(props)
    firebaseInit()
    this.store = configureStore()
  }
  render() {
    return (
    <Provider  store={this.store}>
      <Router>
      <div>
          {/*<ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>

          <hr/>*/}

          <Route exact path="/" component={Home}/>
          <Route path="/faq" component={FAQ}/>
          {/*<Route path="*" component={PageNotFound}/>*/}
        </div>
      </Router>
    </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
