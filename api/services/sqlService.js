const app = require('../../server.js');
const db = app.get('db');
const request = require('request');
const q = require('q');
const moment = require('moment');

module.exports = {

  getAccessToken: function(user_id) {
    var dfd = q.defer();
    db.run("select accesstoken from profile where user_id = $1",[user_id],
      function(err, res) {
        if (err) {
          console.log(err)
          res.reject(new Error(err));
        } else {
          console.log('get access token',res)
          dfd.resolve(res[0]);
        }
      })
    return dfd.promise;
  },

  checkExistingDay: function(date, user_id) {
    var dfd = q.defer();
    db.run("select p.user_id, a.id, a.date, p.accesstoken from profile p, activity_summary a where p.user_id = a.user_id AND date = $1 AND p.user_id= $2",
      [date,user_id],
      function(err, res) {
        if (err) {
          console.log(err)
          dfd.resolve(null);
        } else {
          console.log('checkExistingDay', res)
          dfd.resolve(res[0]);
        }
    });
    return dfd.promise;
  },

  updateActivitySummary: function(fitResponse, id, date){
    var dfd = q.defer();
      var distanceArr = fitResponse.summary.distances;
      var totalDistanceCalc = function(distanceArr){
        for (var i = 0; i < distanceArr.length; i++) {
          if (distanceArr[i].activity === "total") {
            return distanceArr[i].distance * 0.621371;// km to miles conversion
          }
        }
      }
      var totalDistance = totalDistanceCalc(distanceArr);
      console.log('UPDATE SUM BEFORE SAVE',id, date, totalDistance, fitResponse.goals.activeMinutes, fitResponse.summary.floors )

      db.activity_summary.save({
        id: id,
        goal_activeMinutes: fitResponse.goals.activeMinutes,
        goal_caloriesOut: fitResponse.goals.caloriesOut,
        goal_distance: fitResponse.goals.distance,
        goal_floors: fitResponse.goals.floors,
        goal_steps: fitResponse.goals.steps,
        summary_activeMinutes: fitResponse.summary.veryActiveMinutes + fitResponse.summary.fairlyActiveMinutes,
        summary_caloriesOut: fitResponse.summary.caloriesOut,
        summary_totalDistance: totalDistance,
        summary_floors: fitResponse.summary.floors,
        summary_steps: fitResponse.summary.steps,
        summary_sedentaryMinutes: fitResponse.summary.sedentaryMinutes,
        date: date
      }, function(dbErr, dbRes) {
        if (dbErr) {
          console.log('dbErr UPDATE',dbErr)
          dfd.reject(new Error(dbErr))
        } else {
          console.log('dbRes UPDATE',dbRes)
          dfd.resolve(dbRes);
        }
      })
    return dfd.promise;
  },

  insertDailySummary: function(fitResponse, user_id, date) {
    var dfd = q.defer();
      var distanceArr = fitResponse.summary.distances;
      var totalDistanceCalc = function(distanceArr){
        for (var i = 0; i < distanceArr.length; i++) {
          if (distanceArr[i].activity === "total") {
            return distanceArr[i].distance * 0.621371;// km to miles conversion
          }
        }
      }
      var totalDistance = totalDistanceCalc(distanceArr);

      db.activity_summary.save({
        user_id: user_id,
        goal_activeMinutes: fitResponse.goals.activeMinutes,
        goal_caloriesOut: fitResponse.goals.caloriesOut,
        goal_distance: fitResponse.goals.distance,
        goal_floors: fitResponse.goals.floors,
        goal_steps: fitResponse.goals.steps,
        summary_activeMinutes: fitResponse.summary.veryActiveMinutes + fitResponse.summary.fairlyActiveMinutes,
        summary_caloriesOut: fitResponse.summary.caloriesOut,
        summary_totalDistance: totalDistance,
        summary_floors: fitResponse.summary.floors,
        summary_steps: fitResponse.summary.steps,
        summary_sedentaryMinutes: fitResponse.summary.sedentaryMinutes,
        date: date
      }, function(dbErr, dbRes) {
        if (dbErr) {
          console.log('dbErr INSERT',dbErr)
          dfd.reject(new Error(dbErr))
        } else {
          console.log('dbRes INSERT',dbRes)
          dfd.resolve(dbRes);
        }
      })

    return dfd.promise;
  },

  updateTokens: function(newData) {
    var dfd = q.defer();

    db.profile.save({
      user_id: newData.user_id,
      refreshtoken: newData.refresh_token,
      accesstoken: newData.access_token,
      accesstokentimestamp: moment.utc().format()
    }, function(dbErr, dbRes) {
      if (dbErr) {
        console.log('dbErr UPDATE TOKEN',dbErr)
        dfd.reject(new Error(dbErr))
      } else {
        console.log('dbRes UPDATED TOKEN',dbRes)
        dfd.resolve(dbRes);
      }
    })
    
    return dfd.promise;
  }

}
