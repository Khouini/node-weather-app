const request = require('request');
function forecast(long, lat, callback) {
  const url = `http://api.weatherstack.com/current?access_key=f6998ee76ac3710746d535d1f9cc8b89&query=${lat}, ${long}`;
  request({ url, json: true }, (error, { body }) => {
    try {
      if (error) throw new Error('Unable to connect with weatherstack server');
      if (body.error) throw new Error('Unable to find location. Try another search.');
      const { weather_descriptions, temperature, precip } = body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}, it is currently ${temperature} degrees out. There is a ${precip}% chance of rain`
      );
    } catch (error) {
      callback(error, undefined);
    }
  });
}
module.exports = forecast;
