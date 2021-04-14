import { connect } from "react-redux";
import AddCard from "./AddCard";
import Download from "./Download";
import SetCard from "./SetCard";

const SetBrowser = ({ videosets }) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Paraderos</p>
      {videosets.map(videoset => <SetCard setInfo={videoset} />)}
      <AddCard />
      <Download />
    </nav>
  );
};

const mapStateToProps = state => ({
  videosets: state.videosets,
})

export default connect(mapStateToProps)(SetBrowser);