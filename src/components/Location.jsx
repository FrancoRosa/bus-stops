import { connect } from 'react-redux';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { useEffect, useState } from 'react';
import { setLatToVideoSet, setLngToVideoSet } from '../actions';

const Location = ({ google, selectedPlace, setLatToVideoSet, setLngToVideoSet, videoset }) => {
  
  const [ lat, setLat ] = useState(videoset.lat)
  const [ lng, setLng ] = useState(videoset.lng)

  const onMapClick = (mapProps, map, clickEvent) =>{
    if (clickEvent.latLng){
      let latitude = clickEvent.latLng.lat().toFixed(5)
      let longitude = clickEvent.latLng.lng().toFixed(5)
      setLat(latitude);
      setLng(longitude);
      setLatToVideoSet(latitude);
      setLngToVideoSet(longitude);

      console.log('>>',lat,lng)
    }
  }

  useEffect(()=>{
    setLat(videoset.lat);
    setLng(videoset.lng);
  },[videoset])

  return (
    <div className="container map-container">
      <Map google={google} zoom={4} onClick={onMapClick} initialCenter={{lat: lat, lng: lng}}>
        <Marker name={'target'} position={{lat: lat, lng: lng}}/>
      </Map>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setLatToVideoSet: lat => dispatch(setLatToVideoSet(lat)), 
  setLngToVideoSet: lng => dispatch(setLngToVideoSet(lng)), 
})

const mapStateToProps = state => ({
  // fullLocation: state.fullLocation,
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: ('AIzaSyBsgd5A9q-23gHy8tL6e5O0lct6JoD97xo')
})(Location))