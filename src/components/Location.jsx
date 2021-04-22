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

  const getEndPoint = (lat, lng, angle, scale) => {
    const result = floatLatLng({lat, lng})
    let newLat = 0
    let newLng = 0
    if (angle === 0) {
      newLat = result.lat + scale;
      newLng = result.lng;
    } else {
      newLat = result.lat + scale*Math.sin(angle*Math.PI/180 + Math.PI/2);
      newLng = result.lng + scale*Math.cos(angle*Math.PI/180 - Math.PI/2);
    }
    return {lat: newLat, lng: newLng}
  }
  
  const {lat, lng, angle} = videoset
  const [start, setStart] = useState({lat, lng})
  const [start_p, setStart_p] = useState()
  const [scale, setScale] = useState(0.001)
  const [end, setEnd] = useState(getEndPoint(lat, lng, angle, 0.001))
  const [rotating, setRotating] = useState(false)

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)


  const onMapClick = (mapProps, map, clickEvent) =>{
    if (clickEvent.latLng){
      let lat = clickEvent.latLng.lat().toFixed(5)
      let lng = clickEvent.latLng.lng().toFixed(5)
      
      setLatitude(lat)
      setLongitude(lng)
      
      if (!rotating) {
        setLatToVideoSet(lat);
        setLngToVideoSet(lng);
        setStart({lat, lng})
        setStart_p(new google.maps.LatLng(lat, lng));
        setEnd(getEndPoint(lat, lng, angle, scale));
      } else {
        setRotating(false)
      }
    }
  }

  const onMapMouseMove = (mapProps, map, mousemoveEvent) =>{
    if (mousemoveEvent.latLng && rotating) {
      let lat = mousemoveEvent.latLng.lat().toFixed(5)
      let lng = mousemoveEvent.latLng.lng().toFixed(5)
      setEnd({lat, lng});
    }
  }

  const getScale = zoom => {
    if (zoom >= 20) return 0.00025
    if (zoom == 19) return 0.0005
    if (zoom == 18) return 0.001
    if (zoom == 17) return 0.002
    if (zoom == 16) return 0.003
    if (zoom <= 15) return 0.004
  }

  const onMapZoomChanged = (mapProps, map, mousemoveEvent) =>{
    let newScale = getScale(parseInt(map.zoom))
    console.log('zoom & scale:', map.zoom, newScale)
    setEnd(getEndPoint(latitude, longitude, angle, newScale));
    setScale(newScale);
  }

  useEffect(()=>{
    const {lat, lng, angle} = videoset;
    setStart({lat, lng});
    setEnd(getEndPoint(lat, lng, angle, scale));
    setStart_p(new google.maps.LatLng(lat, lng));
  },[videoset, scale])

  const lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  };

  return (
    <div className="container map-container">
      <Map google={google} zoom={18} 
        onClick={onMapClick}
        onMousemove={onMapMouseMove}
        onZoomChanged={onMapZoomChanged}
        initialCenter={start}
      >
        <Marker 
          name={'target'}
          position={start}
          onClick={()=> {
            if(rotating){
              setRotating(false)
              const end_p = new google.maps.LatLng(end.lat, end.lng);
              const heading = google.maps.geometry.spherical.computeHeading(start_p, end_p);
              setAngToVideoSet(heading.toFixed(2));
            } else {
              setRotating(true)
            }
          }}
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
            } else {
              setRotating(true)
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