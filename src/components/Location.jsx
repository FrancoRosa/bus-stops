import { connect } from 'react-redux';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { useState } from 'react';

const Location = ({ google, selectedPlace }) => {
  const [ lat, setLat ] = useState(0)
  const [ lng, setLng ] = useState(0)

  const onMapClick = (mapProps, map, clickEvent) =>{
    if (clickEvent.latLng){
      setLat(clickEvent.latLng.lat().toFixed(5));
      setLng(clickEvent.latLng.lng().toFixed(5));
      console.log('>>',lat,lng)
    }
  }

  const style = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',

  }

  return (
    <div className="container map-container">
      <nav class="level">
      </nav>
      <h1 className="title is-7 has-text-success has-text-centered heading">Haz click en el mapa</h1>
      <Map style={style} containerStyle={style} google={google} zoom={4} onClick={onMapClick} initialCenter={{lat: lat, lng: lng}}>
        <Marker name={'target'} position={{lat: lat, lng: lng}}/>
      </Map>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  // setRpiResponse: rpi => dispatch(setRpiResponse(rpi))
})

const mapStateToProps = state => ({
  // fullLocation: state.fullLocation,
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: ('AIzaSyBsgd5A9q-23gHy8tL6e5O0lct6JoD97xo')
})(Location))