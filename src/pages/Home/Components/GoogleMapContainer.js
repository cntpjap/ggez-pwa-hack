import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { addCounter } from '../../../lib/redux/actions'
import { fetchMarkers, addMarker } from '../../../lib/firebase'

import GoogleMapWrapper from './GoogleMapWrapper'

function showMarkerInfo(state, targetMarker){
  return {
    markers : state.markers.map( marker => {
      if(targetMarker === marker){
        console.log('in marker on click'+true);
        return marker = {...marker, showInfo: true}
      }
      else{
        console.log('in marker on click'+false);
        return marker = {...marker, showInfo: false}
      }
    }),
    center : state.center
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
      markers: []
    }

    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
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
    this.setState(showMarkerInfo(this.state,targetMarker));
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