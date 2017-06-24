
import React, { Component } from 'react'
import {
  withGoogleMap,
  GoogleMap,
} from "react-google-maps";

class GoogleMapWrapper extends Component {
  render() {
    return (
      <GoogleMap
        defaultZoom={15}
        center={this.props.center}
      />
    )
  }
}

export default withGoogleMap(GoogleMapWrapper)