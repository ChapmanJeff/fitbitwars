const fitbitService = require('../services/fitbitService');
var app = require('../../server.js');
var db = app.get('db');
const sqlService = require('../services/sqlService')
const q = require('q');
const moment = require('moment')

module.exports = {

  //From server.js app.get('api/lastSync') => Ask sqlService.js for last sync info for use in Profile Component
  getLastSync (req, res) {
    sqlService.getLastSync(req.user.user_id)
      .then((result)=>{
        res.status(200).send(result)
      })
  },

// FOR TEST ONLY ---- NO LONGER USING THIS FIRST FUNCTION. NOW USING UPDATING DAILY ACTIVITY VIA SUBSCRIPTIONS
  getDailyActivity (req, res) {
    fitbitService.getDailyActivity(req.user.user_id, req.user.accesstoken, '2017-05-01')
      .then((response) => {
        // sqlService.saveActivitySummary().then
        var distanceArr = response.summary.distances;
        var totalDistanceCalc = (response) => {
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
        }, (dbErr, dbRes) => {
          console.log(1, dbErr,2, dbRes);
          toSend = dbRes; //STILL HAS USER_ID ON IT! TAKE IT OFF!
          res.send(toSend); //DOESNT SEND BUT DATA is getting to database.
        })
      })

  },

  updateDailyActivity (notifArr) {
    var allUpdates = notifArr.map((notif) => {
      // for (var i = 0; i < notifArr.length; i++) {
      var date = notif.date;
      var user_id = notif.ownerId;
      var daySumExists = ()=>sqlService.checkExistingDay(date, user_id).then((daySumResponse)=> daySumResponse);
      var accesstoken = ()=>sqlService.getAccessToken(user_id).then((accessTResponse)=>accessTResponse.accesstoken);
      var dfd = q.defer();
      q.all([daySumExists(), accesstoken()]).then((qAllResponse)=>{
        console.log(111111111111111111,qAllResponse);
        fitbitService.getDailyActivity(user_id, qAllResponse[1], date)
        .then((fitResponse) => {
          if (qAllResponse[0]) {
            console.log(222222222222222222, qAllResponse[0])
            sqlService.updateActivitySummary(fitResponse, qAllResponse[0].id, date)
            .then((sqlResponse)=> {
              console.log('sqlResponse', sqlResponse);
              dfd.resolve(sqlResponse);
            })
          } else {
            console.log(33333333333)
            sqlService.insertDailySummary(fitResponse, user_id, date)
            .then((sqlResponse) => {
              console.log('sqlResponse', sqlResponse);
              dfd.resolve(sqlResponse);
            })
          }
        })
      })
      return dfd.promise;
      // } //End of FOR Loop
    }) // End of Map
    return q.all(allUpdates);
  }, //End of Function

  updateAccessTokens (profilesArr) {
    var dfd = q.defer();
      var updatedAccessTokens = () => {
        profilesArr.map((profile) => {
          if (moment(profile.accesstokentimestamp).utc().add(7, 'hours').format() < moment.utc().format()) {
            console.log('True') //FOR TESTING USE < moment.utc().add(8, 'hours').format()
            fitbitService.updateAccessCodes(profile).then((updatedRes) => {
              sqlService.updateTokens(updatedRes).then((sqlRes) => {
                dfd.resolve(sqlRes);
              })
            })
          }else {
            console.log('Expires at: ', moment(profile.accesstokentimestamp).utc().add(8, 'hours').format());
            dfd.resolve(moment(profile.accesstokentimestamp).utc().utc().add(8, 'hours').format());
          }
        });
      }
      q.all(updatedAccessTokens()).then((qAllRes) => { dfd.resolve(qAllRes)});
    return dfd.promise;
  }
}
