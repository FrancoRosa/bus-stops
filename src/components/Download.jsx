import { useEffect } from "react";
import { connect } from "react-redux"



const Download = ({ videosets }) => {
  let result;
  
  useEffect(()=>{
    result = videosets.map(videoset => ({
      nombre: videoset.title,
      latitud: videoset.lat,
      longitud: videoset.lng,
      angulo: videoset.angle,
      archivo: videoset.file[1],
    }))
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result));
    let dlAnchorElem = document.querySelector('.download');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "paraderos.txt");
  },[])


  useEffect(()=>{
    result = videosets.map(videoset => ({
      nombre: videoset.title,
      latitud: videoset.lat,
      longitud: videoset.lng,
      angulo: videoset.angle,
      archivo: videoset.file[1],
    }))
  },[videosets])

  return (
    <a className="panel-block download">
      <span class="icon-text">
        <span class="icon has-text-link">
          <i class="fas fa-download"></i>
        </span>
        <span>Descargar paraderos</span>
      </span>
    </a>
)}

const mapStateToProps = state => ({
  videosets: state.videosets
}) 
export default connect(mapStateToProps)(Download);