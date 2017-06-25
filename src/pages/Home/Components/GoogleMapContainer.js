import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { addCounter } from '../../../lib/redux/actions'
import { fetchMarker, fetchMarkers, addMarker, updateMarker } from '../../../lib/firebase'

import GoogleMapWrapper from './GoogleMapWrapper'
import fetch from 'isomorphic-fetch'

// function showMarkerInfo(state, targetMarker, isOpen){
//   return {
//     markers : state.markers.map( marker => {
//       if(targetMarker === marker){
//         console.log('in marker targetMarker on click show='+isOpen);
//         return marker = {...marker, showInfo: isOpen}
//       }
//       else{
//         console.log('in marker on click'+false);
//         return marker = {...marker, showInfo: false}
//       }
//     }),
//     center : state.center
//   }
// }

function onOpenModal(state, targetMarker){
  console.log('open modal')
  console.log(targetMarker.comment)
  return {
    markers : state.markers,
    center : state.center,
    modal : {
        isOpen : true,
        content : targetMarker.name,
        picUrls : [],
        upvote : targetMarker.upvote,
        downvote : targetMarker.downvote,
        comments : targetMarker.comment!=null? targetMarker.comment:[],
        currentComment : '',
        currentMarker : targetMarker,
    }
  }
}

function onCloseModal(state){
  updateMarkerRepository(state)
  return {
    markers : state.markers,
    center : state.center,
    modal : {
        isOpen : false,
        content : state.modal.content,
        picUrls : [],
        upvote : state.modal.upvote,
        downvote : state.modal.downvote,
        comments : state.modal.comment,
        currentComment : state.modal.currentComment,
        currentMarker : state.modal.currentMarker
    }
  }
}

function updateCurrentComment(state, input){
  return {
    markers : state.markers,
    center : state.center,
    modal : {
        isOpen : state.modal.isOpen,
        content : state.modal.content,
        picUrls : [],
        upvote : state.modal.upvote,
        downvote : state.modal.downvote,
        comments : state.modal.comments,
        currentComment : input,
        currentMarker : state.modal.currentMarker
    }
  }
}

function addNewComment(state){
  return {
    markers : state.markers,
    center : state.center,
    modal : {
        isOpen : state.modal.isOpen,
        content : state.modal.content,
        picUrls : [],
        upvote : state.modal.upvote,
        downvote : state.modal.downvote,
        comments : state.modal.comments.push(state.modal.currentComment),
        currentComment : state.modal.currentComment,
        currentMarker : state.modal.currentMarker
    }
  }
}

function updateMarkerRepository(state){
  console.log(state.modal.currentMarker)
  updateMarker(state.modal.currentMarker.id, state.modal.currentMarker.name , state.modal.currentMarker.position, state.modal.upvote, state.modal.downvote, state.modal.comments)
}

function addVote(state){
  return {
    markers : state.markers,
    center : state.center,
    modal : {
        isOpen : state.modal.isOpen,
        content : state.modal.content,
        picUrls : [],
        upvote : state.modal.upvote+1,
        downvote : state.modal.downvote,
        comments : state.modal.comments,
        currentComment : state.modal.currentComment,
        currentMarker : state.modal.currentMarker
    }
  }
}

function downVote(state){
  return {
    markers : state.markers,
    center : state.center,
    modal : {
        isOpen : state.modal.isOpen,
        content : state.modal.content,
        picUrls : [],
        upvote : state.modal.upvote,
        downvote : state.modal.downvote+1,
        comments : state.modal.comments,
        currentComment : state.modal.currentComment,
        currentMarker : state.modal.currentMarker
    }
  }
}

class GoogleMapContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      center: {
        lat: 0,
        lng: 0
      },
      markers: [],
      modal: {
        isOpen : false,
        content : '',
        picUrls : [],
        upvote : 0,
        downvote : 0,
        comments : [],
        currentComment : '',
        currentMarker : {}
      }
    }

    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChangeCommentText = this.handleChangeCommentText.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleClickUpvote = this.handleClickUpvote.bind(this);
    this.handleClickDownvote = this.handleClickDownvote.bind(this);
  }

  handleMapClick(event) {
    let position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    }
    console.log('hand map')
    
    // addMarker('test 1', position, 0, 0)



    // const nextMarkers = [
    //   ...this.state.markers,
    //   {
    //     position: event.latLng,
    //     defaultAnimation: 2,
    //     key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
    //   },
    // ];
    // this.setState({
    //   markers: nextMarkers,
    // });

    // if (nextMarkers.length === 3) {
    //   this.props.toast(
    //     `Right click on the marker to remove it`,
    //     `Also check the code!`
    //   );
    // }
  }

  handleMarkerClick(targetMarker){
    fetchMarker(targetMarker.key)
        .then((data) => {
          console.log('fetch db');
          console.log(data.val())
        this.setState(onOpenModal(this.state, data.val()))
      })
      
    //this.setState(showMarkerInfo(this.state,targetMarker,true));
  }

  handleCloseModal(){
    this.setState(onCloseModal(this.state, false))
  }

  handleChangeCommentText(targetInput){
    this.setState(updateCurrentComment(this.state,targetInput.target.value))
  }

  handleSubmitComment(){
    this.setState(addNewComment(this.state))
    this.setState(updateCurrentComment(this.state,''))
  }

  handleClickUpvote(){
    this.setState(addVote(this.state))
  }

  handleClickDownvote(){
    this.setState(downVote(this.state))
  }

  componentWillMount() {

  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((geoposition) => {
        this.setState({
          center: {
            lat: geoposition.coords.latitude,
            lng: geoposition.coords.longitude
          }
        })
      })
    }

    fetchMarkers().then((data) => {
      let markers = _.values(data.val());

      console.log(markers,'getsec')
      this.setState({
        markers: markers
      })
    })
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
          onMarkerClick={this.handleMarkerClick}
          onMapClick={this.handleMapClick}
          modal={this.state.modal}
          onCloseModal = {this.handleCloseModal}
          onInputCommentText = {this.handleChangeCommentText}
          onSubmitComment = {this.handleSubmitComment}
          onClickUpvote = {this.handleClickUpvote}
          onClickDownvote = {this.handleClickDownvote}
        />
      </div>
    )
  }
}
// lat: 13.6517367, lng: 100.4949226

const mapStateToProps = (state) => {
  console.log('mapstp', state,state.markers)
  return {
    markers: state.markers,
    counter: state.counter,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		addCounter: (count) => { dispatch(addCounter(count)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapContainer)