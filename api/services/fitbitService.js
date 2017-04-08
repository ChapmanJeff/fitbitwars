const request = require('request');
const q = require('q');
const moment = require('moment');

module.exports = {

  getDailyActivity: function (user_id, accesstoken, date) {
    var formatDate = moment(date).format('YYYY-MM-DD');
    console.log(112233, user_id, accesstoken, formatDate);
    var dfd = q.defer();
    request({
           method: 'GET',
           headers: {Authorization: `Bearer ${accesstoken}`},
           json: true,
           url: `https://api.fitbit.com/1/user/${user_id}/activities/date/${formatDate}.json`
       }, function(err, res, body) {
           if (err) {
             console.log(332211,err);
               res.reject(new Error(err));
           } else {
              console.log(11111,body);
              dfd.resolve(body);
           }
       });

    return dfd.promise;


  },

  updateDailyActivity: function(date, ownerId, accesstoken, collectionType){
    var dfd = q.defer();
    request({
           method: 'GET',
           headers: {Authorization: `Bearer ${accesstoken}`},
           json: true,
           url: `https://api.fitbit.com/1/user/${ownerId}/${collectionType}/date/${date}.json`
       }, function(err, res, body) {
           if (err) {
             console.log(332211,err);
               res.reject(new Error(err));
           } else {
              console.log(11111,body);
              dfd.resolve(body);
           }
       });

    return dfd.promise;

  }

}
