const futureLaunchesQuery = {
  query: {
    upcoming: true
  },
  options: {
    sort: {
      flight_number: 'asc'
    },
    limit: 2,
    populate: "rocket"
  }
};

const pastLaunchesQuery = {
  query: {
    past: true
  },
  options: {
    sort: {
      flight_number: 'desc'
    },
    limit: 2,
    populate: "rocket"
  }
};

export { futureLaunchesQuery, pastLaunchesQuery };