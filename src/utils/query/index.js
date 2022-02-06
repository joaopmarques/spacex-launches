const futureLaunchesQuery = {
  query: {
    date_utc: {
      $gte: new Date(new Date().setFullYear(new Date().getFullYear())),
      $lte: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    }
  },
  options: {
    sort: {
      mission_number: 'desc'
    },
    limit: 10,
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
    limit: 10,
    populate: "rocket"
  }
};

export { futureLaunchesQuery, pastLaunchesQuery };