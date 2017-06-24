import React, { Component } from 'react'

import GoogleMapWrapper from './GoogleMapWrapper'

class GoogleMapContainer extends Component {
  constructor(props){
    super(props)
    // this.state = {
    //   lat: 13.6517367,
    //   lng: 100.4949226
    // }
        this.state = {
      lat: 0,
      lng: 0
    }

    this.handleLatLng = this.handleLatLng.bind(this)
  }

  handleLatLng(geoposition) {
    this.setState({
      lat: geoposition.coords.latitude,
      lng: geoposition.coords.longitude
    })
    
    console.log('in han',this.state)
  }

  componentDidMount() {
    console.log('nav',navigator)
    if (navigator.geolocation) {
      console.log('willup')
      navigator.geolocation.getCurrentPosition(this.handleLatLng)
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('recv')
    this.setState({
      lat: nextProps.lat,
      lng: nextProps.lng
    })
  }

  render() {
    console.log(11,this.state)
    return (
      <div className="google-map-wrapper">
        lat = {this.state.lat}
        lng = {this.state.lng}
        <GoogleMapWrapper
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          lat={this.state.lat}
          lng={this.state.lng}
        />
      </div>
    )
  }
}
// lat: 13.6517367, lng: 100.4949226

export default GoogleMapContainer