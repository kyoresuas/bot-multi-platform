const axios = require('axios');

const getWeather = async (city) => {
  const url = `https://wttr.in/${encodeURIComponent(city)}?format=3`;

  const response = await axios.get(url);
  return response.data;
};

module.exports = { getWeather };
