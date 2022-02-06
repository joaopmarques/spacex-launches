import React, { useState, useEffect } from 'react';

import LaunchArticle from "../LaunchArticle";

// Import utilities & data getter
import * as api from '../../utils/api';
import * as query from "../../utils/query";

const Launches = (props) => {

  // Set state hooks
  const [launches, setLaunches] = useState();

  // Determine whether we're looking forwards or backwards
  const timeframeQuery = () => {
    if (props.isFutureLaunch) {
      return query.futureLaunchesQuery;
    } else {
      return query.pastLaunchesQuery;
    }
  }

  // Data and state setting logic
  const grabData = (dataType, timeframe) => {
    api.fetchDataPOST(dataType, timeframe)
      .then(response => {
        setLaunches(response);
      })
      .catch(error => console.error(error));
  }

  // Deal with side effects and refresh data
  useEffect(() => {
    grabData('launches', timeframeQuery());
  }, []);

  // If there's launch info, display it
  if (launches) {
    return (
      <section className={`basis-full h-max flex flex-col p-5 ${!props.isFutureLaunch && 'bg-slate-200 border-l border-slate-300'}`}>
        <h2 className="p-3 text-lg font-bold bg-slate-50 rounded-md shadow-sm">
          {props.isFutureLaunch ? '🧑‍🚀 Upcoming launches' : '🚀 Past launches'}
        </h2>
        <div className="">
          {launches.data.docs.map((mission, idx) => (
            idx < props.launchCap && (
              <LaunchArticle mission={mission} isFutureLaunch={props.isFutureLaunch} />
            )
          ))}
        </div>
      </section>
    );
  } else {
    // If there's no launches, display a message
    return (
      <section className={`basis-1/2 flex flex-col p-5 ${!props.isFutureLaunch && 'bg-slate-100'}`}>
        <p>🏜️ No launches to display currently.</p>
      </section>
    );
  }
}

export default Launches;