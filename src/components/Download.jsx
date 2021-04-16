import { useEffect } from "react";
import { connect } from "react-redux"



const Download = ({ videosets }) => {
  let result;
  
  const generateFile = () => {
    result = videosets.map(videoset => ({
      nombre: videoset.title,
      latitud: videoset.lat,
      longitud: videoset.lng,
      angulo: videoset.angle>=0 ? videoset.angle : String(parseFloat(videoset.angle)+360),
      archivo: videoset.file[1],
    }))
    let currentTime = new Date();
    let currentStr = currentTime.toLocaleString('sv-SE').split(/-|:/).join('');
    let filePrefix = currentStr.replace(' ','_') 
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result));
    let dlAnchorElem = document.querySelector('.download_compact');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", `${filePrefix}_compacto.txt`);
  }

  const generateFileNormal = () => {
    result = videosets.map(videoset => ({
      nombre: videoset.title,
      latitud: videoset.lat,
      longitud: videoset.lng,
      angulo: videoset.angle>=0 ? videoset.angle : String(parseFloat(videoset.angle)+360),
      archivo: videoset.file[1],
    }))
    let currentTime = new Date();
    let currentStr = currentTime.toLocaleString('sv-SE').split(/-|:/).join('');
    let filePrefix = currentStr.replace(' ','_') 
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    let dlAnchorElem = document.querySelector('.download_normal');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", `${filePrefix}_normal.txt`);
  }

  return (
    <>
      <a href=""></a>
      <a className="panel-block download_compact" onClick={generateFile}>
        <span class="icon-text">
          <span class="icon has-text-link">
            <i class="fas fa-download"></i>
          </span>
          <span>Descargar Compacto</span>
        </span>
      </a>
      <a className="panel-block download_normal" onClick={generateFileNormal}>
      <span class="icon-text">
        <span class="icon has-text-link">
          <i class="fas fa-file-download"></i>
        </span>
        <span>Descargar Normal</span>
      </span>
    </a>
  </>
)}

const mapStateToProps = state => ({
  videosets: state.videosets
}) 
export default connect(mapStateToProps)(Download);