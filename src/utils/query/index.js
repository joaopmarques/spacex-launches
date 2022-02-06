// This is a hard cap just to avoid getting more than we really need
const QUERY_LIMIT = 100;

const futureLaunchesQuery = (startDate) => {

  const safeStartDate = startDate ? startDate : new Date(new Date().setFullYear(new Date().getFullYear()));
  
  return {
    query: {
      upcoming: true,
      date_utc: {
        $gte: safeStartDate,
        $lte: new Date(new Date().setFullYear(new Date().getFullYear() + 5)) // 5 year lookup window
      }
    },
    options: {
      sort: {
        flight_number: 'asc'
      },
      limit: QUERY_LIMIT,
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
      populate: [
        "rocket", "launchpad"
      ]
    }
  };
};

const pastLaunchesQuery = (startDate) => {
  
  const safeStartDate = startDate ? startDate : new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  
  // Reverse this for custom starting dates - better UX
  let pastLookupSort = 'desc';
  if (startDate) {
    pastLookupSort = 'asc';
  }

  return {
    query: {
      past: true,
      date_utc: {
        $gte: safeStartDate,
        $lte: new Date()
      }
    },
    options: {
      sort: {
        flight_number: pastLookupSort
      },
      limit: QUERY_LIMIT,
      populate: [
        "rocket", "launchpad"
      ]
    }
  };
};

export { futureLaunchesQuery, pastLaunchesQuery, QUERY_LIMIT };