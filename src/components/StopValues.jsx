import { useState, useEffect } from "react";
import ReactAudioPlayer from 'react-audio-player';

const StopValues = ({videoset}) => {
  const {lat, lng, angle} = videoset
  const [path, setPath] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState('');

  const exists = true
  const enabled = true
  
  const handleFiles = e => {
    let path = e.target.files[0]
    let localPath = URL.createObjectURL(path);
    let localName = path.name
    setFile(e.target.files[0])
    setPath(localPath)
    setName(localName)
  }

  const processVideo = () => {
    console.log('... clicked')
  }

  useEffect(()=>{
    const inputElement = document.querySelector(".videofile");
    inputElement.addEventListener("change", handleFiles, false);
  },[])
  
  return(
    <div>
      <div className="feature">
        <p className="heading has-text-success">Latitud</p>
        <p>{lat}</p>
      </div>
      <div className="feature">
        
        <p className="heading has-text-success">Longitud</p>
        <p>{lng}</p>
      </div>
      <div className="feature">
        <p className="heading has-text-success"> Angle </p>
        <p>{angle}</p>
      </div>
      <div className="feature">
        <p className="heading has-text-success">Audio</p>
        <ReactAudioPlayer
          src={path}
          autoPlay
          controls
        />
        <div className="card-footer">
        <div className="file has-name file-selector">
          <label className="file-label">
            <input className={"file-input videofile"} type="file" name="resume"/>
            <span className="file-cta">
              <span className="file-icon has-text-success">
                <i className="fas fa-upload"></i>
              </span>
            </span>
            <span className="file-name">
              {name}
            </span>
          </label>
        </div>
      </div>
      </div>
    </div>
  )
}

export default StopValues