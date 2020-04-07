
const Pool = require('pg').Pool

module.exports =(quertText, params)=> {
      return new Promise((resolve, reject) => {
        pool.query(quertText, params)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
