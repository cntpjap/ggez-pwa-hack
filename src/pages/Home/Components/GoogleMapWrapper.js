
import React, {Component} from 'react'
import {
  withGoogleMap,
  GoogleMap,
} from "react-google-maps";
// lat: 13.6517367, lng: 100.4949226
// const GoogleMapWrapper = withGoogleMap(props => (
//   <GoogleMap
//     defaultZoom={15}
//     defaultCenter={{ lat: props.lat, lng: props.lng }}
//   />
// ));

class GoogleMapWrapper extends Component {
    constructor(props){
    super(props)
    // this.state = {
    //   lat: 13.6517367,
    //   lng: 100.4949226
    // }
    //     this.state = {
    //   lat: 0,
    //   lng: 0
    // }
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
      />
    )
  }
}

export default withGoogleMap(GoogleMapWrapper)