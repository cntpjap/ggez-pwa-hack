
import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
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
      >
      {this.props.modal.isOpen && (
          <Modal open={this.props.modal.isOpen} onClose={this.props.onCloseModal} little>
            <h2>{this.props.modal.content}</h2>
          </Modal>
      )}
      </Marker>
      ))}
      </GoogleMap>
    )
  }
}

export default withGoogleMap(GoogleMapWrapper)