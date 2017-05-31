const app = require('../../server.js');
const db = app.get('db');
const request = require('request');
const q = require('q');
const moment = require('moment');

function updateCurrentPayout(id) {
  var dfd = q.defer();
    findSum(id)
      .then((sum)=>{
        db.challenges.save({
          challenge_id: id,
          current_payout: sum
        }, (dbErr, dbRes)=> {
          if (dbErr) {
            console.log('SAVE SUM ERROR', dbErr)
          } else {
            console.log('SAVE SUM', dbRes)
            dfd.resolve(dbRes)
          }
        })
      })
  return dfd.promise;
}

function findSum(id) {
  var dfd = q.defer();
    db.run("select SUM(amount_paid) from challenge_users where challenge_id = $1",[id], (dbErr, dbRes)=> {
      if (dbErr) {
        console.log('FindSUm ERROR',dbErr)
      } else {
        console.log('FIND SUM', dbRes[0].sum)
        dfd.resolve(dbRes[0].sum)
      }
    })
  return dfd.promise;
}

module.exports = {

  getAccessToken (user_id) {
    var dfd = q.defer();
    db.run("select accesstoken from profile where user_id = $1",[user_id],
      (err, res) => {
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

  checkExistingDay (date, user_id) {
    var dfd = q.defer();
    db.run("select p.user_id, a.id, a.date, p.accesstoken from profile p, activity_summary a where p.user_id = a.user_id AND date = $1 AND p.user_id= $2",
      [date,user_id],
      (err, res) => {
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

  updateActivitySummary (fitResponse, id, date) {
    var dfd = q.defer();
      var distanceArr = fitResponse.summary.distances;
      //Find and convert distance from KM to Miles
      var totalDistanceCalc = (distanceArr) => {
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
      }, (dbErr, dbRes) => {
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

  //From FitbitCtrl => Grab last sync info for user and return for use in profile component
  getLastSync (user_id) {
    var dfd = q.defer();
    db.run("select * from activity_summary where user_id = $1 order by date desc limit 1",[user_id],
    (dbErr, dbRes) => {
      if (dbErr) {
        console.log(dbErr)
      }
      if (dbRes[0]) {
        delete dbRes[0].user_id;
        dfd.resolve(dbRes[0])
      } else {
        dfd.resolve(dfd.Res)
      }
    })
    return dfd.promise;

  },

  insertDailySummary (fitResponse, user_id, date) {
    var dfd = q.defer();
      var distanceArr = fitResponse.summary.distances;
      var totalDistanceCalc = (distanceArr) => {
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
      }, (dbErr, dbRes) => {
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

  updateTokens (newData) {
    var dfd = q.defer();

    db.profile.save({
      user_id: newData.user_id,
      refreshtoken: newData.refresh_token,
      accesstoken: newData.access_token,
      accesstokentimestamp: moment.utc().format()
    }, (dbErr, dbRes) => {
      if (dbErr) {
        console.log('dbErr UPDATE TOKEN',dbErr)
        dfd.reject(new Error(dbErr))
      } else {
        console.log('dbRes UPDATED TOKEN',dbRes)
        dfd.resolve(dbRes);
      }
    })

    return dfd.promise;
  },

  saveStripeCustomer (customer, user_id) {
    var dfd = q.defer();
    console.log("IN SQL SERVICE",customer.id, customer.email, user_id)
    db.profile.save({
      user_id: user_id,
      email: customer.email,
      stripe_connected: true
    }, (dbErr, dbRes)=>{
      if (dbErr) {
        console.log("Err Saving email from customer Object", dbErr)
      }
      console.log("Saved customer Email to Profile")
    })
    db.stripe_customer.insert({
      user_id: user_id,
      customer_id: customer.id,
      email: customer.email,
      created: customer.created,
      default_source: customer.default_source
    }, (dbErr, dbRes) => {
      if (dbErr) {
        console.log('dbErr saveStripeCustomer',dbErr)
        dfd.reject(new Error(dbErr))
      } else {
        console.log('dbRes saveStripeCustomer',dbRes)
        dfd.resolve(dbRes);
      }
    })

    return dfd.promise;
  },

  findStripeCustomer (user_id) {
    var dfd = q.defer();
    console.log(user_id)
    db.stripe_customer.findOne({user_id: user_id}, (dbErr, user) => {
      if (dbErr) {
        dfd.reject(new Error(dbErr))
      }
      console.log(user)
      dfd.resolve( user.customer_id )
    })
    return dfd.promise;
  },

  saveChargeInfo (charge, user_id) {
    var dfd = q.defer();

    db.stripe_charges.insert({
      charge_id: charge.id,
      user_id: user_id,
      description: charge.description,
      amount: charge.amount,
      created: charge.created,
      paid: charge.paid,
      status: charge.status
    },(dbErr, dbRes)=> {
      if (dbErr) {
        console.log('dbErr saveChargeErr', dbErr)
        dfd.reject(new Error(dbErr))
      } else {
        console.log('dbRes savedCharge', dbRes)
        dfd.resolve(dbRes);
      }
    })

    return dfd.promise;
  },

  saveNewChallenge (req, res) {

    db.challenges.save({
      steps_on: req.body.stepsOn,
      steps_val: req.body.stepsVal,
      floors_on: req.body.floorsOn,
      floors_val: req.body.floorsVal,
      distance_on: req.body.distanceOn,
      distance_val: req.body.distanceVal,
      calories_on: req.body.caloriesOn,
      calories_val: req.body.caloriesVal,
      minutes_on: req.body.minutesOn,
      minutes_val: req.body.minutesVal,
      private_on:req.body.privateOn,
      private_val:req.body.privateVal,
      challenge_val: req.body.challengeVal,
      bet_val: req.body.betVal,
      start_date: req.body.startDateVal,
      end_date: req.body.endDateVal,
      created_by: req.user.user_id,
      active: true,
      current_payout: 0,

    }, (dbErr, dbRes)=> {
      if (dbErr) {
        console.log('dbErr saveChallengeErr', dbErr)
        res.status(500).send(new Error(dbErr))
      } else {
        console.log('dbRes saveChallenge', dbRes)
        //Now take the new challenge and make creator a user in the challenge_users table
        db.challenge_users.save({
          challenge_id: dbRes.challenge_id,
          user_id: dbRes.created_by,
          name: req.user.displayname,
          avatar: req.user.avatar150,
          days_achieved: 0
        }, (dbErr, dbRes)=> {
          if (dbErr) {
            console.log('dbErr saveChallengeUserErr', dbErr)
            res.status(500).send(new Error(dbErr));
          } else {
            console.log('dbRes saveChallengeUser', dbRes)
            res.status(200).send('Successfully Saved New Challenge and added Creator to challenge_users');
          }
        })
      }
    })
  },

//Calls to DB and pulls challenge info for challeges user has joined using an sql join table sends results to front
  getUserChallenges(req, res) {
    db.run("select * from challenges inner join challenge_users on challenge_users.challenge_id = challenges.challenge_id where challenge_users.user_id = $1  order by challenges.active desc, challenges.start_date"
    ,[req.user.user_id], (dbErr, dbRes)=> {
      if (dbErr) {
        console.log('dbErr getUserChallengesErr', dbErr)
        res.status(500).send(new Error(dbErr));
      } else {
        var editForFront = dbRes.map((challenge)=>{
          //delete user id
          delete challenge.user_id;
          delete challenge.created_by;
          return challenge
        })
        console.log('dbRes getUserChallenges', editForFront)
        res.status(200).send(editForFront);
      }
    })
  },

  //Called from server.js app.get('/api/getAllChallenges'). Gets all challenges from challenge table in Db and returns active by date asc
  getAllChallenges (req, res) {
    db.run("select * from challenges where active = 'true' order by start_date asc", (dbErr, dbRes)=> {
      if (dbErr) {
        res.status(500).send(new Error(dbErr))
      } else {
        res.status(200).send(dbRes)
      }
    })
  },

  //Take challenge ID and get challenge info from DB and return
  getChallengeInfo (req, res) {
    updateCurrentPayout(req.query.id)
      .then((update)=>{
        db.run("select * from challenges where challenge_id = $1", [req.query.id],(dbErr, dbRes)=> {
          if (dbErr) {
            res.status(500).send(new Error(dbErr))
          } else {
            res.status(200).send(dbRes)
          }
        })
      })
  },

  // Fetch players in a specific challenge and if current user is in challenge add boolean true property
  //NEED TO JOIN NEW TABLE OF COMPLETIONS OR FAILURES //NEED TO TEST WITH MULTIPLE USERS
  getPlayers (req, res) {
    console.log(req.user.user_id)
    db.run("select p.firstname, p.displayname, p.avatar, p.avatar150, c.challenge_id, c.user_id from profile p inner join challenge_users c on p.user_id = c.user_id where c.challenge_id = $1"
      ,[req.query.id], (dbErr, dbRes)=> {
      if (dbErr) {
        res.status(500).send(new Error(dbErr))
      } else {
        console.log(dbRes)
        //See if current user is already in challenge
        var userOnList = dbRes.filter((el)=>{
        	return el.user_id === req.user.user_id
        })
        if (userOnList[0]) {
          res.status(200).send({
            userInChallenge: true,
            players: dbRes
          })
        } else {
          res.status(200).send({
            userInChallenge: false,
            players: dbRes
          })
        }
      }
    })
  },

  removePlayerFromChallenge (req, res) {
    console.log(req.query, req.user.user_id)
    db.run("delete from challenge_users where challenge_id = $1 and user_id = $2",[req.query.id, req.user.user_id], (dbErr,dbRes)=> {
      if (dbErr) {
        res.status(500).send(new Error(dbErr))
      } else {
        res.status(200).send(dbRes)
      }
    })
  },

  addPlayerToChallenge (req, res) {
    console.log(111, req.body.id, req.user.user_id)
    db.challenge_users.save({
      challenge_id: req.body.id,
      user_id: req.user.user_id,
      name: req.user.displayname,
      avatar: req.user.avatar150,
      days_achieved: 0
    }, (dbErr, dbRes)=>{
      if (dbErr) {
        console.log(222,dbErr)
        res.status(500).send(new Error(dbErr.message))
      } else {
        console.log(dbRes)
        res.status(200).send(dbRes)
      }
    })
  },

  getChallengeUsersInfo(req, res) {
    db.run("select * from challenge_users where challenge_id = $1 order by days_achieved desc",[req.query.id], (dbErr, dbRes) =>{
      if (dbErr) {
        console.log('dbErr challengeUsesInfo', dbErr)
        res.status(500).send(new Error(dbErr))
      } else {
        // console.log('dbRes challengeUsesInfo', dbRes)
        res.status(200).send(dbRes);
      }
    })
  }

}



// if (moment(array[0].endDate).format('YYYY-MM-D') < moment().format('YYYY-MM-D')) {
//   console.log('CHALLENGE EXPIRED', array[0].end_date, array[0].challenge_id)
//   this.endChallenge(array[0])
//     .then((res)=> {
//       console.log('BACK FROM END CHALLENGE', res)
//       return res
//     })
//   }
