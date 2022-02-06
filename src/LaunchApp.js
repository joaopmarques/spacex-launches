import React from "react";

import Launches from "./components/Launches";

function App() {
  return (
    <main>
      <header>
        <h1>SpaceX Launch Status Mission Command</h1>
      </header>
      <div className="LaunchApp">
        <Launches future={true} />
        <Launches future={false} />
      </div>
      <footer>
        <p>
          <strong>What's this?</strong><br></br>
          This is a simple way to check if your next flight to Mars is on schedule. One of these days!... 🚀<br></br>
          Powered by the <a href="https://github.com/r-spacex/SpaceX-API" target="_blank">r/SpaceX API</a>. Not affiliated in any way with SpaceX.
        </p>
      </footer>
    </main>
  );
}

export default App;
