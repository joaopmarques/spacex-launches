import React, { useState, useEffect } from 'react';

// Import utilities & data getter
import * as util from '../../utils/util';
import * as api from '../../utils/api';
import * as query from "../../utils/query";
import * as styles from "../../utils/defaultStyles";

const Launches = (props) => {

  const [launches, setLaunches] = useState();

  const timeframeQuery = () => {
    if (props.future) {
      return query.futureLaunchesQuery;
    } else {
      return query.pastLaunchesQuery;
    }
  }

  // Get data from the API according to a desired timeframe
  useEffect(() => {
    api.fetchDataPOST('launches', timeframeQuery())
      .then(response => {
        setLaunches(response);
      })
      .catch(error => console.error(error));
  }, []);

  if (launches) {
    // If there's launch info, display it
    return (
      <section className={`basis-full flex flex-col p-5 ${!props.future && 'bg-slate-200 border-l border-slate-300'}`}>
        <h2 className="p-3 text-lg font-bold bg-slate-50 rounded-md shadow-md">
          {props.future ? '🧑‍🚀 Upcoming launches' : '🚀 Past launches'}
        </h2>
        <div className="">
          {launches.data.docs.map((mission, idx) => (
            <article key={mission.name} className="relative my-6 px-5 py-4 rounded-md overflow-hidden bg-slate-50 shadow-md">
              <header className="grid gap-2 grid-cols-3 grid-rows-2 bg-slate-300 p-5 -m-5 mb-3">
                {mission.links.patch.small && (
                  <img className="object-scale-down h-40 w-40 row-span-2" src={mission.links.patch.small} alt={`${mission.name} mission patch`} />
                )}
                <h3 className="col-span-2 text-3xl font-bold text-slate-700 flex items-end">{mission.name}</h3>
                <div className="col-span-2 items-top">
                  <span className="text-slate-500 bg-slate-200 px-1 rounded-sm inline-block">
                    {mission.flight_number}
                  </span>
                </div>
              </header>
              <div className={styles.inlineItem}><strong>Launch date</strong>{util.getFormattedDate(mission.date_utc, mission.date_precision)}</div>
              {props.future ?
                <div className={styles.inlineItem}><strong>Status</strong>Not launched</div>
                : <div className={styles.inlineItem}><strong>Status</strong>{mission.success ? <span className="success">Succeeded</span> : <span className="failure">Failed</span>}</div>
              }
              <div className={styles.inlineItem}><strong>Rocket</strong>{mission.rocket.name}</div>
            </article>
          ))}
        </div>
      </section>
    );
  } else {
    // If not, display a message
    return (
      <section className={`basis-1/2 flex flex-col p-5 ${!props.future && 'bg-slate-100'}`}>
        <p>🏜️ No launches to display currently.</p>
      </section>
    );
  }
}

export default Launches;