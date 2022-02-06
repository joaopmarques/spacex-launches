import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpcomingLaunches = () => {

  const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches";

  const [upcomingLaunches, getUpcomingLaunches] = useState();

  // Get upcoming launches from SpaceX's API
  useEffect(() => {
    axios.get(`${SPACEX_API_URL}/upcoming`)
      .then(response => {
        getUpcomingLaunches(response.data);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  // Return an empty list if there's no launches
  if (!upcomingLaunches) {
    return (
      <section className="upcoming">
        <p>No upcoming launches.</p>
      </section>
    );
  }

  // Date formatting helper
  const formatDate = (date) => {
    const tempDate = new Date(date);
    return `${tempDate.getDay()}/${tempDate.getMonth() + 1}/${tempDate.getFullYear()}`;
  }

  return (
    <section className="upcoming">
      <h2>Upcoming Launches</h2>
      <div className="grid">
        {upcomingLaunches.map((mission, idx) => (
          <article>
            <header>
              {mission.links.patch.small && (
                <img src={mission.links.patch.small} alt={`${mission.name} mission patch`} />
              )}
              <h3>{mission.name}</h3>
              <p>{mission.flight_number}</p>
            </header>
            <p><strong>Launch date</strong>{formatDate(mission.date_utc)}</p>
            <p><strong>Status</strong>Not launched</p>
            <p><strong>[TODO] Rocket</strong>{mission.rocket}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default UpcomingLaunches;