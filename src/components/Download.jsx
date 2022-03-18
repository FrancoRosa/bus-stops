import { connect } from "react-redux";

const Download = ({ videosets }) => {
  let result;

  const generateFile = () => {
    result = videosets.map((videoset) => ({
      nb: videoset.title,
      la: String(videoset.lat),
      lo: String(videoset.lng),
      na: videoset.file[1],
      ru:
        videoset.angle >= 0
          ? String(videoset.angle)
          : String(parseFloat(videoset.angle) + 360),
    }));
    let currentTime = new Date();
    let currentStr = currentTime.toLocaleString("sv-SE").split(/-|:/).join("");
    let filePrefix = currentStr.replace(" ", "_");
    let dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(result));
    let dlAnchorElem = document.querySelector(".download_compact");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `${filePrefix}_compacto.txt`);
  };

  const generateFileNormal = () => {
    result = videosets.map((videoset) => ({
      nb: videoset.title,
      la: String(videoset.lat),
      lo: String(videoset.lng),
      na:
        videoset.angle >= 0
          ? String(videoset.angle)
          : String(parseFloat(videoset.angle) + 360),
      ru: videoset.file[1],
    }));
    let currentTime = new Date();
    let currentStr = currentTime.toLocaleString("sv-SE").split(/-|:/).join("");
    let filePrefix = currentStr.replace(" ", "_");
    let dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(result, null, 2));
    let dlAnchorElem = document.querySelector(".download_normal");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `${filePrefix}_normal.txt`);
  };

  const formatAngle = (angle) => {
    let ang = parseFloat(angle);
    return ang >= 0 ? ang : ang + 360;
  };

  const generateFileArray = () => {
    result = videosets.map((videoset) => [
      `${Math.abs(videoset.lat).toFixed(5)}, ${Math.abs(videoset.lng).toFixed(
        5
      )}, ${formatAngle(videoset.angle).toFixed(2)},`,
    ]);
    console.log(result);
    let currentTime = new Date();
    let currentStr = currentTime.toLocaleString("sv-SE").split(/-|:/).join("");
    let filePrefix = currentStr.replace(" ", "_");
    console.log(result.join("\n"));
    let dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(result.join("\n"));
    let dlAnchorElem = document.querySelector(".download_array");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `${filePrefix}_array.txt`);
  };

  return (
    <>
      <a href=""></a>
      <a className="panel-block download_compact" onClick={generateFile}>
        <span className="icon-text">
          <span className="icon has-text-link mr-1">
            <i className="fas fa-download"></i>
          </span>
          <span>Descargar Compacto</span>
        </span>
      </a>
      <a className="panel-block download_normal" onClick={generateFileNormal}>
        <span className="icon-text">
          <span className="icon has-text-link mr-1">
            <i className="fas fa-file-download"></i>
          </span>
          <span>Descargar Normal</span>
        </span>
      </a>
      <a className="panel-block download_array" onClick={generateFileArray}>
        <span className="icon-text">
          <span className="icon has-text-link mr-1">
            <i className="fas fa-code"></i>
          </span>
          <span>Descargar Array</span>
        </span>
      </a>
    </>
  );
};

const mapStateToProps = (state) => ({
  videosets: state.videosets,
});
export default connect(mapStateToProps)(Download);
