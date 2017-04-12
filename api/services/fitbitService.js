const request = require('request');
const config = require('../../config')
const q = require('q');
const moment = require('moment');
const sqlService = require('./sqlService')

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
              console.log(220022,body);
              dfd.resolve(body);
           }
       });

    return dfd.promise;

  },
  //base64 using Buffer for reference
  // var a = Buffer.from("HelloWOrld", "ascii");
  // console.log(a);
  // console.log(1111, a.toString('base64'))
  updateAccessCodes : function(profile) {
    var dfd = q.defer();
    var clientID = process.env.clientID || config.fitbit.clientID;
    var clientSecret = process.env.clientSecret || config.fitbit.clientSecret;
    var buffFrom = Buffer.from(`${clientID}:${clientSecret}`, 'ascii')
    var base64Encoded = buffFrom.toString('base64');

      request({
             method: 'POST',
             headers: {
               Authorization: `Basic ${base64Encoded}`,
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             form: {
               grant_type: 'refresh_token',
               refresh_token: profile.refreshtoken
             },
             json: true,
             url: `https://api.fitbit.com/oauth2/token`
         }, function(err, res, body) {
           if (err) {
             console.log(332211,err);
               dfd.reject(new Error(err));
           } else {
              console.log(220022,body);
              dfd.resolve(body);
           }
       });

    return dfd.promise;
  }

}
