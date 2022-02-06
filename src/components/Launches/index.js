import React, { useState, useEffect } from 'react';

// Import utilities & data getter
import * as util from '../../utils/util';
import * as api from '../../utils/api';
import * as query from "../../utils/query";

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

  // If there's launch info, display it
  return (
    <section className={`basis-1/2 flex flex-col p-5 ${!props.future && 'bg-slate-100'}`}>
      <h2 className="p-3 bg-slate-200 rounded-md">
        {props.future ? '🧑‍🚀 Upcoming launches' : '🚀 Past launches'}
      </h2>
      <div className="grid">
        {launches.data.docs.map((mission, idx) => (
          <article key={mission.name}>
            <header>
              {mission.links.patch.small && (
                <img src={mission.links.patch.small} alt={`${mission.name} mission patch`} />
              )}
              <h3>{mission.name}</h3>
              <p>{mission.flight_number}</p>
            </header>
            {util.getFormattedDate(mission.date_utc, mission.date_precision)}
            {props.future ?
              <p><strong>Status</strong>Not launched</p>
              : <p><strong>Status</strong>{mission.success ? <span className="success">Succeeded</span> : <span className="failure">Failed</span>}</p>
            }
            <p><strong>Rocket</strong>{mission.rocket.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Launches;