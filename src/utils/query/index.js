const futureLaunchesQuery = {
  query: {
    upcoming: true
  },
  options: {
    sort: {
      flight_number: 'asc'
    },
    limit: 2,
    offset: 1,
    select: {
      flight_number: 1,
      name: 1,
      date_utc: 1,
      date_precision: 1,
      upcoming: 1,
      links: 1,
      success: 1,
    },
    populate: "rocket"
  }
};

const pastLaunchesQuery = {
  query: {
    past: true,
    date_utc: {
      $gte: new Date(new Date().setFullYear(new Date().getFullYear() -1)),
      $lte: new Date()
    }
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