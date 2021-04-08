import StopBrowser from "./StopBrowser";
import StopDetail from "./StopDetail";

const App = () => {
  return (
    <div className="columns">
      <div className="column is-one-quarter">
        <StopBrowser />
      </div>
      <div className="column">
        <StopDetail setTitle="The Beautiful Mountains"/>
      </div>
    </div>
  );
}

export default App;
