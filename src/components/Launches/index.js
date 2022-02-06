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

  // Display a date according to available precision data
  const constructedDate = (date, precision) => {

    // Not very precise: parse only the mission year
    if (precision === "quarter" ||
      precision === "half" ||
      precision === "year"
    ) {
      return <p><strong>Launch date</strong>{util.formatDate(date, 'year')} (UTC)</p>;
    }

    // Good enough: months only
    if (precision === "month") {
      return <p><strong>Launch date</strong>{util.formatDate(date, 'month')} (UTC)</p>;
    }

    // Everything else is sufficient to get a precise day - ignoring time
    return <p><strong>Launch date</strong>{util.formatDate(date, 'month')} (UTC)</p>;
  };

  // If there's launch info, display it
  if (!launches) {
    return (
      <section className="no-data">
        {props.future ?
          <p>No upcoming launches to show.</p>
          : <p>No past launches to show.</p>
        }
      </section>
    );
  } else {
    return (
      <section className="upcoming">
        {props.future ?
          <h2>🧑‍🚀 Upcoming launches</h2>
          : <h2>🚀 Past launches</h2>
        }
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
              {constructedDate(mission.date_utc, mission.date_precision)}
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
}

export default Launches;