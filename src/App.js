import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GettingStartedGoogleMap from './GettingStartedGoogleMap';

class App extends Component {
  render() {
    return (
      <div className="row">        
        <div id="map-container" className="col-md-8 col-md-offset-2" style={{}}>
          <GettingStartedGoogleMap />
        </div>
      </div>
    );
  }
}

export default App;
