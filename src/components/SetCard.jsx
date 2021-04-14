import { connect } from "react-redux";
import { selectVideoSet } from "../actions";

const SetCard = ({ setInfo, selectVideoSet, videosets, displays }) => {
  const { title, selected, id } = setInfo;
  
  return(
    <a 
      className={`panel-block ${selected ? 'is-active' : ''}`}
      onClick={() => selectVideoSet(id)}
    > 
      <p>{title}</p>
    </a>
  )
}

const mapStateToProps = state => ({
  videosets: state.videosets,
  displays: state.displays
})

const mapDispatchToProps = dispatch => ({
  selectVideoSet: id => dispatch(selectVideoSet(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SetCard);
