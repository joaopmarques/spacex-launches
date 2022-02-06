import axios from "axios";

// API constant
const SPACEX_API_URL = "https://api.spacexdata.com/v4";

// Get data from SpaceX's API
const fetchData = (dataType, params) => {
  return axios(`${SPACEX_API_URL}/${dataType}/query`, { 
    method: 'POST',
    data: params
  })
};

export default fetchData;