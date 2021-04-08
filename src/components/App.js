import SetBrowser from "./SetBrowser";
import SetDetail from "./SetDetail";

const App = () => {
  return (
    <div className="columns">
      <div className="column is-one-quarter">
        <SetBrowser />
      </div>
      <div className="column">
        <SetDetail />
      </div>
    </div>
  );
}

export default App;
