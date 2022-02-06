import React, { useState } from "react";

import Launches from "./components/Launches";
import * as styles from "./utils/defaultStyles";

function App() {

  const [ infoVisibility, setInfoVisibility ] = useState(true);

  const handleInfoVisibility = () => {
    setInfoVisibility(!infoVisibility);
  };

  return (
    <main className="flex flex-col h-screen bg-slate-300">

      <header className="py-8 px-5 bg-gradient-to-r from-purple-700 to-sky-700 border-b border-sky-700 shadow-lg z-10">
        <div className="container mx-auto">
          <h1 className="text-slate-200 text-2xl font-bold">🛰️ SpaceX Launch Status Mission Control</h1>
        </div>
      </header>

      <div className="container mx-auto">

        {infoVisibility && (
          <section className="bg-sky-50 border-b border-sky-200 py-10 px-5 relative">
            <p className="text-sky-900">
              <strong className="mb-2 text-lg block">What's this?</strong>
              This is a simple way to check if your flight to Mars is currently on schedule.<br></br>
              Powered by the <a className={styles.links} href="https://github.com/r-spacex/SpaceX-API" target="_blank">r/SpaceX API</a>. Not affiliated in any way with SpaceX.<br></br>
              <strong className="pt-5 block">Check out my work:</strong> <a className={styles.links} href="https://github.com/joaopmarques/" target="_blank">@joaopmarques</a>
            </p>
            <button className="absolute block right-5 top-5 text-sky-700 font-bold text-sm transition-colors hover:text-sky-800 active:text-sky-900" onClick={handleInfoVisibility}>⬆️ Hide</button>
          </section>
        )}

      </div>

      <div className="container bg-slate-100 mx-auto mb-auto flex flex-col md:flex-row flex-auto flex-grow">
        <Launches future={true} />
        <Launches future={false} />
      </div>

    </main>
  );
}

export default App;
