/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
// const requestpromise = require('request-promise');

 
const fetchCoordsByIP = function(ip,callback) {
  request(`https://api.freegeoip.app/json/${ip}?apikey=b0e2b2a0-53fb-11ec-9ffc-8175bb0bc511`, (error, response, body) => {
    if (error) {
      const msg = `Status Code ${response.statusCode} when fetching coords. Response: ${body}`;
      callback(error,null);
    } else {
      const data = JSON.parse(body);
      callback(null,data);
    }
  }

  );
};
const request = require('request');
let args = process.argv[2];
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    
    
    // if (error) {
    //   callback(error,null);
    // } else {
    //   const data = JSON.parse(body);
    //   callback(null,data.ip);
    // }
    if (response.statusCode !== 200 || error) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
  
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(` https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching iss-pass. Response: ${body}`;
        callback(Error(msg), null);
        return;
      } else {
        const data = JSON.parse(body);
        callback(null,data);
      }
    });
};

const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }


    console.log('It worked! Returned IP:' , ip);
  
    fetchCoordsByIP(ip,(error,data) => {
      if (data) {
        const result = {latitude: data.latitude,
          longitude: data.longitude};
        fetchISSFlyOverTimes(result,(error,data) => {
          if (data) {
            return callback(null, data.response);
          } else if (error) {
            return callback(error,null);
          }
        });
      } else if (error) [
        console.log(error)
      ];
    });
  });
};
// module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP,fetchMyIP, fetchISSFlyOverTimes,nextISSTimesForMyLocation};