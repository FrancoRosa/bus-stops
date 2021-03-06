import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { removeFromVideoSets, setFileToVideoSet, setTitleToVideoSet } from "../actions";
import Location from "./Location";
import StopValues from "./StopValues";

const SetDetail = ({ displays, videosets, setTitleToVideoSet, removeFromVideoSets, setFileToVideoSet }) => {
  let videoset = videosets.find(videoset => videoset.selected == true)
  const [header, setHeader] = useState(videoset ? videoset.title: '')
  const [videosetId, setVideosetId] = useState(videoset ? videoset.id: '')
  const [vids, setVids] = useState(videoset.videos ? videoset.videos: [])
  
  const updateHeader = e => {
    setHeader(e.target.value);
    setTitleToVideoSet(videoset.id, e.target.value);
  }
  
  useEffect(()=>{
    videoset = videosets.find(videoset => videoset.selected === true);
    setHeader(videoset ? videoset.title: '');
    setVids(videoset.videos ? videoset.videos: []);
  },[videosets])

  useEffect(() => {setVideosetId(videoset ? videoset.id: '');},[header])

  return (
    <div>
      {
        videoset
          &&
        <div className="details">
          <input type="text" value={header} className="title title-input" onChange={updateHeader}/>
          <div className="columns edition">
            <div className="column is-two-thirds">
              <Location videoset={videoset}/>
            </div>
            <div className="column is-one-third">
              <StopValues videoset={videoset} setFileToVideoSet={setFileToVideoSet} />
            </div>
          </div>
          <span 
            className="icon has-text-danger delete-set"
            onClick={() => removeFromVideoSets(videoset.id)}
          >
            <i className="fas fa-trash"/>
          </span>
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  videosets: state.videosets,
  displays: state.displays
})

const mapDispatchToProps = dispatch => ({
  setTitleToVideoSet: (id, title) => dispatch(setTitleToVideoSet(id, title)),
  setFileToVideoSet: file => dispatch(setFileToVideoSet(file)),
  removeFromVideoSets: id => dispatch(removeFromVideoSets(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SetDetail);
