const request = require('request');


const get = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      resolve(body);
    });
  });
};

module.exports = {
  get,
};
