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

  if (!upcomingLaunches) {
    return <div className="loader">No upcoming launches.</div>
  }

  return (
    <section className="upcoming">
      <h2>Upcoming Launches</h2>
      <ul>
        {upcomingLaunches.map((launch, idx) => (
          <li>
            {launch.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default UpcomingLaunches;