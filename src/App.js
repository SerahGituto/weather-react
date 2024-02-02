import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

import Search from "./Search.js";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Search defaultCity="Lisbon" />
      </div>
      <div className="footer">
        <a href="https://github.com/SerahGituto/weather-react">
          Open-source code
        </a>{" "}
        by Serah.
      </div>
    </div>
  );
}

export default App;
