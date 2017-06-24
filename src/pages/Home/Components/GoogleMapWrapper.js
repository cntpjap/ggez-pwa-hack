
import React, { Component } from 'react'
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

class GoogleMapWrapper extends Component {

  render() {
    return (
      <GoogleMap
        defaultZoom={15}
        center={this.props.center}
      >
      {this.props.markers.map((marker, index) => (
      <Marker
        {...marker}
        onRightClick={() => this.props.onMarkerRightClick(index)}
      />
      ))}
      </GoogleMap>
    )
  }
}

export default withGoogleMap(GoogleMapWrapper)