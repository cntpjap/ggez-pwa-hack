import React, { Component } from 'react'
import GoogleMapContainer from './Components/GoogleMapContainer'

class Home extends Component {
    
    render() {
        return (
            <div className="container">
              <h1>CLEANDEE</h1>
              <div className="row">
                <div className="col-md-12">
                  <GoogleMapContainer />
                </div>
              </div>

            </div>
        )
    }
}

export default Home