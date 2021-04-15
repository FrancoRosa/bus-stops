import { useState, useEffect } from "react";
import ReactAudioPlayer from 'react-audio-player';

const StopValues = ({ videoset, setFileToVideoSet}) => {
  const {lat, lng, angle, file} = videoset
  const [path, setPath] = useState(file[0]);
  const [name, setName] = useState(file[1]);
  // const [newFile, setNewFile] = useState('');

  const handleFiles = e => {
    let path = e.target.files[0]
    let localPath = URL.createObjectURL(path);
    let localName = path.name
    // setnewFile(e.target.files[0])
    setPath(localPath)
    setName(localName)
    console.log('localPath:', localPath)
    console.log('localName:', localName)
    setFileToVideoSet([localPath, localName])
  }

  const processVideo = () => {
    console.log('... clicked')
  }

  useEffect(()=>{
    const inputElement = document.querySelector(".videofile");
    inputElement.addEventListener("change", handleFiles, false);
  },[])

  useEffect(()=>{
    setPath(file[0])
    setName(file[1])
  },[videoset])
  
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
  )
}

export default StopValues