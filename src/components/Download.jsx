import { connect } from "react-redux"

const Download = ({ addToVideoSets }) => (
  <a className="panel-block" onClick={addToVideoSets}>
    <span class="icon-text">
      <span class="icon has-text-link">
        <i class="fas fa-download"></i>
      </span>
      <span>Descargar paraderos</span>
    </span>
  </a>
)

const mapStateToProps = state => ({
  videosets: state.videosets
}) 
export default connect(mapStateToProps)(Download);