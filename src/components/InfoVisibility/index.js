import React, { useState } from 'react';

import * as styles from "../../utils/defaultStyles";

const InfoVisibility = (props) => {

  const [infoVisibility, setInfoVisibility] = useState(true);

  // Toggle visibility (not that it matters a lot in this case)
  const handleInfoVisibility = () => {
    setInfoVisibility(!infoVisibility);
  };

  return (
    <div className="mx-auto bg-sky-50 border-b border-sky-200 w-screen">
      {infoVisibility && (
        <section className="container mx-auto relative my-5">
          <p className="text-sky-900">
            <strong className="mb-2 text-lg block">What's this?</strong>
            This is a simple way to check if your flight to Mars is currently on schedule.<br></br>
            Powered by the <a className={styles.links} href="https://github.com/r-spacex/SpaceX-API" target="_blank" rel="noreferrer">r/SpaceX API</a>. Not affiliated in any way with SpaceX.<br></br>
            <strong className="pt-5 block">Check out my work:</strong> <a className={styles.links} href="https://github.com/joaopmarques/" target="_blank" rel="noreferrer">@joaopmarques</a>
          </p>
          <button className="absolute block right-5 top-5 text-sky-700 font-bold text-sm hover:text-sky-800 active:text-sky-900" onClick={handleInfoVisibility}>⬆️ Hide</button>
        </section>
      )}
    </div>
  );
};

export default InfoVisibility;