const fitbitService = require('../services/fitbitService');
var app = require('../../server.js');
var db = app.get('db');

module.exports = {

  getDailyActivity: function (req, res) {
    fitbitService.getDailyActivity(req.user.user_id, req.user.accesstoken)
      .then(function(response) {
        // sqlService.saveActivitySummary().then
        var distanceArr = response.summary.distances;
        var totalDistanceCalc = function(response){
          for (var i = 0; i < distanceArr.length; i++) {
            if (distanceArr[i].activity === "total") {
              return distanceArr[i].distance * 0.621371;// km to miles conversion
            }
          }
        }
        var totalDistance = totalDistanceCalc();
        var date = "2017-04-05"
        console.log('activeminutes ',response.goals.activeMinutes,'summarminutes ',response.summary.veryActiveMinutes + response.summary.fairlyActiveMinutes );
        var toSend ='';
        db.activity_summary.insert({
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
      })

  },
//select * from activity_summary where date = '2017-04-05' AND user_id = '3QWD5T'
//select p.user_id, a.id, a.date, p.accesstoken from profile p, activity_summary a where p.user_id = a.user_id AND date = '2017-04-05' AND p.user_id= '3QWD5T'
//   updateDailyActivity: function(nofitArr) {
//     for (var i = 0; i < nofitArr.length; i++) {
//       var user = db.profile.findOne({user_id: ownerId}, function(err, user){
//         return user;
//         console.log(0000,'this is the user ', user);
//       var date = nofitArr[i].date;
//       var ownerId = nofitArr[i].ownerId;
//       var accesstoken = user.accesstoken
//       var collectionType = nofitArr[i].collectionType;
//
//       fitbitService.updateDailyActivity(date, ownerId, accesstoken, collectionType)
//         .then(function(response) {
//           var activitySummaryId = db.activity_summary.where("id=$1 AND id=$2",["2017-04-05","3QWD5T"], function(err, res) {
//             if (err || res.length > 1) {
//               console.log('Error: ',err, 'Result: ',res)
//             } else {
//               console.log('204 Result: ', res);
//               return res[0].id;
//             }
//           })
//
//           if (activitySummaryId) {
//             db.activitySummary.save({
//               id: activitySummaryId,
//               . . .
//             })
//           } else {
//             db.activitySummary.save({
//               user_id: ,
//               . . .
//             })
//           }
//         })
//     }
//   }
//
// }


// const request = require('request');
// const q = require('q');
//
// module.exports = {
//
//   getDailyActivity: function (req, res) {
//     var dfd = q.defer();
//     var date = '2017-03-01';
//     console.log(req.user.user_id, req.user.accesstoken)
//     request({
//            method: 'GET',
//            headers: {Authorization: `Bearer ${req.user.accesstoken}`},
//            json: true,
//            url: `https://api.fitbit.com/1/user/${req.user.user_id}/activities/date/${date}.json`
//        }, function(err, res, body) {
//            if (err) {
//                res.reject(new Error(err));
//            } else {
//
//              console.log(11111,body);
//                dfd.resolve(body);
//            }
//        });
//
//     return dfd.promise;
//
//
//   }
//
}
