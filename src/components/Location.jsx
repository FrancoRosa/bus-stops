import { connect } from 'react-redux';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import { useEffect, useState } from 'react';
import { setLatToVideoSet, setLngToVideoSet } from '../actions';

const Location = ({ google, selectedPlace, setLatToVideoSet, setLngToVideoSet, videoset }) => {
  const {lat, lng} = videoset
  const [start, setStart] = useState({lat, lng})
  const [end, setEnd] = useState({lat, lng})
  const [rotating, setRotating] = useState(false)

  const onMapClick = (mapProps, map, clickEvent) =>{
    if (clickEvent.latLng){
      let latitude = clickEvent.latLng.lat().toFixed(5)
      let longitude = clickEvent.latLng.lng().toFixed(5)
      if (!rotating) {
        setLatToVideoSet(latitude);
        setLngToVideoSet(longitude);
        setStart({lat: latitude, lng: longitude})
        setEnd({lat: latitude, lng: longitude})
      } else {
        setRotating(false)
      }
    }
  }

  const onMapMouseMove = (mapProps, map, mousemoveEvent) =>{
    if (mousemoveEvent.latLng && rotating) {
      let latitude = mousemoveEvent.latLng.lat().toFixed(5)
      let longitude = mousemoveEvent.latLng.lng().toFixed(5)
      setEnd({lat: latitude, lng: longitude});
    }
  }

  useEffect(()=>{
    const {lat, lng} = videoset;
    setStart({lat, lng});
  },[videoset])

  const floatLatLng = obj => {
    const {lat, lng} = obj 
    return ({lat: parseFloat(lat), lng: parseFloat(lng)})
  }

  const lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  };
  
  return (
    <div className="container map-container">
      <Map google={google} zoom={15} 
        onClick={onMapClick}
        onMousemove={onMapMouseMove}
        initialCenter={start}
      >
        <Marker 
          name={'target'}
          position={start}
          onClick={() => setRotating(true)}
        />
        <Polyline
          path={[
            floatLatLng(start),
            floatLatLng(end),
          ]}
          strokeColor="#ea4335"
          strokeOpacity={0.5}
          strokeWeight={7}
          icons = {[
            {
              icon: lineSymbol,
              offset: "100%",
            },
          ]}
          onClick={()=> {setRotating(false)}}
        />
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