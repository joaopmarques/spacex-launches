import React, { useState, useEffect, useRef } from "react";

import Launches from "./components/Launches";

// Import utilities
import * as styles from "./utils/defaultStyles";
import * as query from "./utils/query";

function App() {

  // State management
  const [infoVisibility, setInfoVisibility] = useState(true);
  const [scrollNoticeVisibility, setScrollNoticeVisibility] = useState(true);
  const [launchCap, setLaunchCap] = useState(4);

  // Set a ref to this container
  const sectionRef = useRef();

  // Scrolling detection logic
  const handleScroll = () => {
    // Stop making requests if the limit has changed
    if (launchCap < query.QUERY_LIMIT) {
      if (sectionRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = sectionRef.current;
        if (scrollHeight - scrollTop === clientHeight) {
          setLaunchCap(launchCap + 2);
          setTimeout(() => setScrollNoticeVisibility(false), 3000);
        }
      }
    }
  }

  // Deal with side effects
  useEffect(() => {
    sectionRef.current.addEventListener('scroll', handleScroll);
    return () => {
      sectionRef.current.removeEventListener('scroll', handleScroll)
    };
  }, [launchCap]);

  // Toggle visibility (not that it matters a lot in this case)
  const handleInfoVisibility = () => {
    setInfoVisibility(!infoVisibility);
  };

  return (
    <main className="flex flex-col h-screen overflow-hidden bg-slate-300">

      <header className="py-10 px-5 bg-gradient-to-r from-purple-700 to-sky-700 border-b-4 border-yellow-500 shadow-lg z-10">
        <div className="container mx-auto">
          <h1 className="text-slate-200 sm:text-3xl lg:text-4xl">🛰️ SpaceX Launch Status Mission Control</h1>
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
            <button className="absolute block right-5 top-5 text-sky-700 font-bold text-sm hover:text-sky-800 active:text-sky-900" onClick={handleInfoVisibility}>⬆️ Hide</button>
          </section>
        )}
      </div>

      <div ref={sectionRef} className="h-100 overflow-x-hidden overflow-scroll container bg-slate-100 mx-auto mb-auto flex flex-col md:flex-row flex-auto flex-grow">
        <Launches launchCap={launchCap} future={true} />
        <Launches launchCap={launchCap} future={false} />
      </div>

      {scrollNoticeVisibility && (
        <aside className="fixed shadow-2xl z-20 bottom-10 left-0 block py-4 px-20 rounded-tr-3xl rounded-br-3xl text-sm font-bold text-slate-200 bg-slate-800">
          ⬇️ Scroll down to check more launches!
        </aside>
      )}

    </main>
  );
}

export default App;
