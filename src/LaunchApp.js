import React from "react";

import Launches from "./components/Launches";
import * as styles from "./utils/defaultStyles";

function App() {
  return (
    <main className="flex flex-col h-screen">
      <header className="py-6 px-5 bg-slate-800">
        <h1 className="text-slate-200 text-3xl font-bold">SpaceX Launch Status Mission Command</h1>
      </header>
      <div className="mb-auto flex flex-auto flex-grow">
        <Launches future={true} />
        <Launches future={false} />
      </div>
      <footer className="bg-slate-900 py-5 px-5">
        <p className="text-slate-400">
          <strong>What's this?</strong><br></br>
          This is a simple way to check if your next flight to Mars is on schedule. (one of these days!... 🚀)<br></br>
          Powered by the <a className={styles.links} href="https://github.com/r-spacex/SpaceX-API" target="_blank">r/SpaceX API</a>. Not affiliated in any way with SpaceX.<br></br>
          <hr className="border-slate-600 my-5"></hr>
          <strong>Check out my work:</strong> <a className={styles.links} href="https://github.com/joaopmarques/" target="_blank">@joaopmarques</a>
        </p>
      </footer>
    </main>
  );
}

export default App;
