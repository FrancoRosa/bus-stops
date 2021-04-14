import { connect } from 'react-redux';
import {Map, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import { useEffect, useState } from 'react';
import { setLatToVideoSet, setLngToVideoSet, setAngToVideoSet } from '../actions';

const Location = ({ 
  google,
  selectedPlace,
  setLatToVideoSet,
  setLngToVideoSet,
  setAngToVideoSet,
  videoset }) => {
  const floatLatLng = obj => {
    const {lat, lng} = obj 
    return ({lat: parseFloat(lat), lng: parseFloat(lng)})
  }

  const getEndPoint = (lat, lng, angle) => {
    const result = floatLatLng({lat, lng})
    let newLat = 0
    let newLng = 0
    if (angle === 0) {
      newLat = result.lat + 0.003;
      newLng = result.lng;
    } else {
      newLat = result.lat + 0.003*Math.sin(angle*Math.PI/180 + Math.PI/2);
      newLng = result.lng + 0.003*Math.cos(angle*Math.PI/180 - Math.PI/2);
    }
    return {lat: newLat, lng: newLng}
  }
  
  const {lat, lng, angle} = videoset
  const [start, setStart] = useState({lat, lng})
  const [start_p, setStart_p] = useState()
  const [newAngle, setNewAngle] = useState(angle)
  const [end, setEnd] = useState(getEndPoint(lat, lng, angle))
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
        setStart_p(new google.maps.LatLng(latitude, longitude));
        setAngToVideoSet(0)
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
    const {lat, lng, angle} = videoset;
    setStart({lat, lng});
    setEnd(getEndPoint(lat, lng, angle));
    setStart_p(new google.maps.LatLng(lat, lng));
  },[videoset])

  const lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  };

  return (
    <div className="container map-container">
      <Map google={google} zoom={16} 
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
          onClick={()=> {
            if(rotating){
              setRotating(false)
              const end_p = new google.maps.LatLng(end.lat, end.lng);
              const heading = google.maps.geometry.spherical.computeHeading(start_p, end_p);
              setAngToVideoSet(heading.toFixed(2));
            }
          }}
        />
      </Map>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setLatToVideoSet: lat => dispatch(setLatToVideoSet(lat)), 
  setLngToVideoSet: lng => dispatch(setLngToVideoSet(lng)), 
  setAngToVideoSet: angle => dispatch(setAngToVideoSet(angle)), 
})

const mapStateToProps = state => ({
  // fullLocation: state.fullLocation,
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: ('AIzaSyBsgd5A9q-23gHy8tL6e5O0lct6JoD97xo')
})(Location))