import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { addCounter } from '../../../lib/redux/actions'
import { fetchMarkers, addMarker } from '../../../lib/firebase'

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
  return {
    markers : state.markers,
    center : state.center,
    modal : {
        isOpen : true,
        content : targetMarker.position.lat,
        picUrls : [],
        star: 0
    }
  }
}

function onCloseModal(state){
  return {
    markers : state.markers,
    center : state.center,
    modal : {
        isOpen : false,
        content : state.modal.content,
        picUrls : [],
        star: state.modal.star
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
        star: 0
      }
    }

    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this);
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
    this.setState(onOpenModal(this.state, targetMarker))
    //this.setState(showMarkerInfo(this.state,targetMarker,true));
  }

  handleCloseModal(){
    this.setState(onCloseModal(this.state, false))
  }

  componentWillMount() {
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
        counter: {this.props.counter}
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