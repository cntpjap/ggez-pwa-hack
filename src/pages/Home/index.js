import React, { Component } from 'react'
import GoogleMapContainer from './Components/GoogleMapContainer'

class Home extends Component {
    
    render() {
        return (
            <div className="container home">
              <div>
                <h1>ห้องน้ำสะอาด... ใกล้ตัวคุณ</h1>
              </div>
              <div className="row">
                <div className="col-md-12 map-container">
                  <GoogleMapContainer />
                </div>
              </div>

            </div>
        )
    }
}

export default Home