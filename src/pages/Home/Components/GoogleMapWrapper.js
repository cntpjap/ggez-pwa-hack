
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
        defaultZoom={17}
        center={this.props.center}
        onClick={this.props.onMapClick}
      >
      {this.props.markers.map((marker, index) => (
      <Marker
        {...marker}
        onClick={() => this.props.onMarkerClick(marker)}
      />
      ))}
      </GoogleMap>
    )
  }
}

export default withGoogleMap(GoogleMapWrapper)