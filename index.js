// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP} = require('./iss');
const {fetchISSFlyOverTimes} = require('./iss');
// const fetchCoordsByIP = function(ip,callback) {
//     request(`https://api.freegeoip.app/json/${ip}?apikey=b0e2b2a0-53fb-11ec-9ffc-8175bb0bc511`)
//       .then(response => {
//         callback(null,response);
//       })
//       .catch(error => {
//         callback(error,null);
//       });
//   };

  
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (const obj of passTimes) {
    const time = new Date(obj.risetime * 1000).toUTCString();
    console.log(`Next pass at ${time} for ${obj.duration} `);
  }
});

