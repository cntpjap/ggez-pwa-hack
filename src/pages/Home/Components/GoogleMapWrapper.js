
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
          <div className="row">
            <a onClick={this.props.onClickUpvote}>upvote</a><p>Likes {this.props.modal.upvote}</p>
            <a onClick={this.props.onClickDownvote}>downvote</a><p>Unlikes {this.props.modal.downvote}</p>
          </div>
          <div>
            {this.props.modal.comments.map((comment, index) => (
              <li>{comment}</li>
            ))}
          </div>
          <input value={this.props.modal.currentComment} onChange={this.props.onInputCommentText} type="text" placeholder="enter comment"/>
          <button onClick={this.props.onSubmitComment}>Add</button>
        </Modal>
      )}
      </Marker>
      ))}
      </GoogleMap>
    )
  }
}

export default withGoogleMap(GoogleMapWrapper)