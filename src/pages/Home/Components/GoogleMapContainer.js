import React, { Component } from 'react'
import _ from 'lodash'

import GoogleMapWrapper from './GoogleMapWrapper'

class GoogleMapContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      center: {
        lat: 0,
        lng: 0
      },
      markers: [{
      position: {
        lat: 25.0112183,
        lng: 121.52067570000001,
      },
      key: `Taiwan`,
      defaultAnimation: 2,
      }]
    }
    this.getNearestToilet = this.getNearestToilet.bind(this)
  }

  getNearestToilet(){
    //TODO: Un Mock
    //Latitude 13.72342 Longitude 100.47623
    return [
      {
      position: {
        lat: 13.6868217,
        lng: 100.5678229,
      },
      key: `salad`,
      defaultAnimation: 2,
      },
      {
      position: {
        lat: 13.7150342,
        lng: 100.4873203,
      },
      key: `samre`,
      defaultAnimation: 2,
      },
      {
      position: {
        lat: 13.72342 ,
        lng: 100.476233,
      },
      key: `japhome`,
      defaultAnimation: 2,
      }
    ];
  }

  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((geoposition) => {
        this.setState({
          center: {
            lat: geoposition.coords.latitude,
            lng: geoposition.coords.longitude
          },
          markers : this.getNearestToilet()
        })
      })
    }
  }



  render() {
    return (
      <div className="google-map-wrapper">
        <GoogleMapWrapper
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          center={this.state.center}
          markers={this.state.markers}
          onMarkerRightClick={_.noop}
        />
      </div>
    )
  }
}
// lat: 13.6517367, lng: 100.4949226

export default GoogleMapContainer