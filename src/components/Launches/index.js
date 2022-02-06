import React, { useState, useEffect } from 'react';

// Import utilities & data getter
import * as util from '../../utils/util';
import * as api from '../../utils/api';
import * as query from "../../utils/query";

const UpcomingLaunches = () => {

  const [upcomingLaunches, setUpcomingLaunches] = useState();

  useEffect(() => {
    // Set future launches
    api.fetchData('launches', query.futureLaunchesQuery)
      .then(response => {
        setUpcomingLaunches(response);
      })
      .catch(error => console.error(error));
  }, []);

  // Future launches
  if (!upcomingLaunches) {
    return (
      <section className="upcoming">
        <p>No upcoming launches.</p>
      </section>
    );
  } else {
    return (
      <section className="upcoming">
        <h2>Upcoming Launches</h2>
        <div className="grid">
          {upcomingLaunches.data.docs.map((mission, idx) => (
            <article key={mission.name}>
              <header>
                {mission.links.patch.small && (
                  <img src={mission.links.patch.small} alt={`${mission.name} mission patch`} />
                )}
                <h3>{mission.name}</h3>
                <p>{mission.flight_number}</p>
              </header>
              <p><strong>Launch date</strong>{util.formatDate(mission.date_utc)} (UTC)</p>
              <p><strong>Status</strong>Not launched</p>
              <p><strong>Rocket</strong>{mission.rocket.name}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }
}

export default UpcomingLaunches;