
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
          {/*<div className="cool-modal">*/}
          <h2>{this.props.modal.content}</h2>
          <hr />
          <div className="row">
            <div className="col-md-6">
              <a onClick={this.props.onClickUpvote} className="yep"><i className="fa fa-thumbs-up"></i>สะอาดจริมๆนะ </a><span>{this.props.modal.upvote} คน</span>
            </div>
            <div className="col-md-6">
              <a onClick={this.props.onClickDownvote} className="nope"><i className="fa fa-thumbs-down"></i>อย่าเข้า! เชื่อเราเถอะ </a><span>{this.props.modal.downvote} คน</span>
            </div>           
          </div>
          <div>
            <h4>ความเห็น</h4>
            {this.props.modal.comments.map((comment, index) => (
              <li>{comment}</li>
            ))}
          </div>
          <input value={this.props.modal.currentComment} onChange={this.props.onInputCommentText} type="text" placeholder="บรรยายประสบการณ์ที่นี่.."/>
          <button onClick={this.props.onSubmitComment} className="btn primary">เพิ่มความเห็น</button>
          {/*</div>*/}
        </Modal>
      )}
      </Marker>
      ))}
      </GoogleMap>
    )
  }
}

export default withGoogleMap(GoogleMapWrapper)