const request = require('request');
function geocode(country, callback) {
  url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    country
  )}.json?access_token=pk.eyJ1Ijoia2hvdWluaSIsImEiOiJja3M0Z2dwODYwaXp0Mm5waDZ3YnZjZnBvIn0.JgPf-Bj-0PCnkwDJAit67A&limit=1`;
  request({ url, json: true }, (error, { body } = {}) => {
    try {
      if (error) throw new Error('Unable to connect with mapbox server');
      if (!body.features[0]) throw new Error('Unable to find location. Try another search.');
      const [long, lat] = body.features[0].center;
      callback(undefined, { placename: body.features[0].place_name, longitude: long, latitude: lat });
    } catch (error) {
      callback(error, undefined);
    }
  });
}
module.exports = geocode;
