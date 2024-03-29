const request = require("request");
// const geoURL =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/aljubayl.json?access_token=sk.eyJ1Ijoicm9neW91IiwiYSI6ImNrcHJmM29jOTBlZzcyb3FrcThtY253OTkifQ.BaetQdX5L_yqBjVWQqtDGg";

// request({ url: geocode, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unale to connect to location service!");
//   } else if (response.body.features.length === 0) {
//     console.log("Unable to find location");
//   } else {
//     const latitude = response.body.features[0].center[1];
//     const longitude = response.body.features[0].center[0];
//   }
// });

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=sk.eyJ1Ijoicm9neW91IiwiYSI6ImNrcHJmM29jOTBlZzcyb3FrcThtY253OTkifQ.BaetQdX5L_yqBjVWQqtDGg";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search!", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
