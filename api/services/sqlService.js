const app = require('../../server.js');
const db = app.get('db');
const request = require('request');
const q = require('q');

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

  updateActivitySummary: function(response, id, date){
    var dfd = q.defer();
      var distanceArr = response.summary.distances;
      var totalDistanceCalc = function(response){
        for (var i = 0; i < distanceArr.length; i++) {
          if (distanceArr[i].activity === "total") {
            return distanceArr[i].distance * 0.621371;// km to miles conversion
          }
        }
      }
      var totalDistance = totalDistanceCalc();

      db.activity_summary.save({
        id: id,
        user_id: req.user.user_id,
        goal_activeMinutes: response.goals.activeMinutes,
        goal_caloriesOut: response.goals.caloriesOut,
        goal_distance: response.goals.distance,
        goal_floors: response.goals.floors,
        goal_steps: response.goals.steps,
        summary_activeMinutes: response.summary.veryActiveMinutes + response.summary.fairlyActiveMinutes,
        summary_caloriesOut: response.summary.caloriesOut,
        summary_totalDistance: totalDistance,
        summary_floors: response.summary.floors,
        summary_steps: response.summary.steps,
        summary_sedentaryMinutes: response.summary.sedentaryMinutes,
        date: date
      }, function(dbErr, dbRes) {
        console.log(1, dbErr,2, dbRes);
        toSend = dbRes; //STILL HAS USER_ID ON IT! TAKE IT OFF!
        res.send(toSend); //DOESNT SEND BUT DATA is getting to database.
      })

    return dfd.promise;
  },

  insertDailySummary: function(response, date) {
    var dfd = q.defer();
      var distanceArr = response.summary.distances;
      var totalDistanceCalc = function(response){
        for (var i = 0; i < distanceArr.length; i++) {
          if (distanceArr[i].activity === "total") {
            return distanceArr[i].distance * 0.621371;// km to miles conversion
          }
        }
      }
      var totalDistance = totalDistanceCalc();

      db.activity_summary.save({
        user_id: response.user_id,
        goal_activeMinutes: response.goals.activeMinutes,
        goal_caloriesOut: response.goals.caloriesOut,
        goal_distance: response.goals.distance,
        goal_floors: response.goals.floors,
        goal_steps: response.goals.steps,
        summary_activeMinutes: response.summary.veryActiveMinutes + response.summary.fairlyActiveMinutes,
        summary_caloriesOut: response.summary.caloriesOut,
        summary_totalDistance: totalDistance,
        summary_floors: response.summary.floors,
        summary_steps: response.summary.steps,
        summary_sedentaryMinutes: response.summary.sedentaryMinutes,
        date: date
      }, function(dbErr, dbRes) {
        console.log(1, dbErr,2, dbRes);
        toSend = dbRes; //STILL HAS USER_ID ON IT! TAKE IT OFF!
        res.send(toSend); //DOESNT SEND BUT DATA is getting to database.
      })

    return dfd.promise;
  }

}
