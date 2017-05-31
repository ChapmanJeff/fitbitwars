const app = require('../../server.js');
const db = app.get('db');
const q = require('q');
const moment = require('moment');
const stripeController = require('./stripeController')

module.exports = {

  dailyUpdate () {
    var dfd = q.defer();
    //Grab all Active challenges from the SQL DB
      this.getAllChallenges()
      .then((allChallenges)=>{
        // console.log(21,allChallenges,21)
        //Use Recursion to make sql calls without overwhelming my 5 connection max free elephant sql plan
        var results =[];
        //GO throught all challenges and pull all users. Create an array of challenges that contains an array of users and a goals object
        var usersAndGoals = this.getUsersAndGoalsRecursion(allChallenges, results);
        // console.log(5, q.all(usersAndGoals))
        q.all(usersAndGoals).then((usersAndGoalsRes)=>{
          // dfd.resolve(usersAndGoalsRes)
          console.log('MADE IT HERE, Now Onto CheckUSerSuccess')
          var results = []
          // Go through array of users and check if they accomplished the goals for the challenge. Save info to DB table achieved_or_not.
          var checkUserSuccess = this.checkUserSuccessRecursion(usersAndGoalsRes, results)
          q.all(checkUserSuccess).then((checkUserSuccess)=> {
            console.log('CHECK USER SUCCESS Results', allChallenges)
            dfd.resolve(checkUserSuccess)

          })
        })
      })

    return dfd.promise;
  },

  getAllChallenges () {
    var dfd = q.defer();
      db.run("select * from challenges where active = 'true'", (dbErr, dbRes)=> {
        if (dbErr) {
          console.log(dbErr)
        }else {
          dfd.resolve(dbRes)
        }
      })

    return dfd.promise;
  },

  getUsersInChallenge (id) {
    var dfd = q.defer();
      db.run("select user_id from challenge_users where challenge_id = $1",[id],(dbErr, dbRes)=>{
        if (dbErr) {
          console.log(dbErr)
        } else {
          dfd.resolve(dbRes)
        }
      })

    return dfd.promise;
  },

//Elephantsql free plan only allows 5 connections. Using recursion i wait for calls to be sent back before sending the next call.
  getUsersAndGoalsRecursion (array, resultsArr) {
    var response = (arr)=>{
      var dfd = q.defer();
      // console.log(1, arr[0].challenge_id)
      db.run("select user_id from challenge_users where challenge_id = $1",[arr[0].challenge_id], (dbErr, dbRes)=>{
        // console.log(3, dbErr,dbRes)
        if (dbErr) {
          console.log(dbErr)
          dfd.reject(new Error(dbErr))
        } else {

          dfd.resolve({
            id: arr[0].challenge_id,
            name: arr[0].challenge_val,
            users: dbRes,
            bet: arr[0].bet_val,
            endDate: arr[0].end_date,
            goals: {
              steps: arr[0].steps_val,
              floors: arr[0].floors_val,
              distance: arr[0].distance_val,
              calories: arr[0].calories_val,
              minutes: arr[0].minutes_val
            }
          })
        }
      })
      // console.log('inner')
      return dfd.promise;
    }

  return q.all([response(array)]).then((answer)=>{
      // console.log(6,'answer', answer)
      resultsArr.push(answer[0]);
      array.shift();
      if (array.length > 0) {
        // console.log(7)
        return this.getUsersAndGoalsRecursion(array, resultsArr)
      } else {
        // console.log(8)
        return resultsArr;
      }
    })
  },
// goes through array of cahllenges and send down the array of users to parse. return array of challenbes with parsed info for all users
  checkUserSuccessRecursion (array, resultsArr) {
    console.log('In Check User Success')
    var activityResults = [];
    //Go through users and grab activity summary and check to see if they achieved goals. Create new object and save to table achieved_or_not
    var getUsersActivity = this.getUsersActivityRecursion(array[0].users, activityResults, array[0].id, array[0].goals, array[0].bet, array[0].name, array[0].endDate)
    return q.all(getUsersActivity).then((getUsersActivityRes)=> {
      console.log('GET USERS ACTIVITY ', getUsersActivityRes)
      resultsArr.push(getUsersActivityRes);
      array.shift();
      if (array.length > 0) {
        console.log(77)
        return this.checkUserSuccessRecursion(array, resultsArr)
      } else {
        console.log(88);
        // console.log(resultsArr)
        return resultsArr;
      }
    })
  },
//Go through users and grab activity summary and check to see if they achieved goals. Create new object and save to table achieved_or_not
  getUsersActivityRecursion (array, resultsArr, challengeid, goals, bet, name, endDate) {
    console.log('In User Activity!',bet,  challengeid, goals, array, name, endDate, 33333333, moment(endDate).format('YYYY-MM-D') < moment().format('YYYY-MM-D'))
    if (moment(endDate).format('YYYY-MM-D') < moment().format('YYYY-MM-D')){
      console.log('CHALLENGE EXPIRED!')
      db.run("update challenges set active = $1 where challenge_id = $2",[false, challengeid],(dbErr,dbRes)=> {
        console.log('SET ACTIVE TO FALSE')
      })
    }
    var response = (arr)=>{
      var dfd = q.defer();
      console.log(1, arr[0].user_id, goals)
      var date = moment().subtract(1,'days').format('YYYY-MM-D')
      console.log(date)
      db.run("select * from activity_summary where user_id = $1 and date = $2",[arr[0].user_id, date], (dbErr, dbRes)=>{
        console.log(3.5, dbErr,dbRes)
        if (dbErr) {
          console.log(dbErr)
          dfd.reject(new Error(dbErr))
        } else {
          if (dbRes[0]) {
            var result = dbRes[0]
            arr[0].didPass = true;
            arr[0].bet = bet;

            arr[0].calories = result.summary_caloriesOut;
              if (goals.calories) {
                if (arr[0].calories >= goals.calories) {
                  arr[0].calories_passed = true;
                  arr[0].calories_on = true;
                } else {
                  arr[0].calories_passed = false;
                  arr[0].calories_on = true;
                  arr[0].didPass = false;
                }
              } else {
                arr[0].calories_on = false;
              }

            arr[0].distance = result.summary_totalDistance;
              if (goals.distance) {
                if (arr[0].distance >= goals.distance) {
                  arr[0].distance_passed = true;
                  arr[0].distance_on = true;
                } else {
                  arr[0].distance_passed = false;
                  arr[0].distance_on = true;
                  arr[0].didPass = false;
                }
              } else {
                arr[0].distance_on = false;
              }

            arr[0].floors = result.summary_floors;
              if (goals.floors) {
                if (arr[0].floors >= goals.floors) {
                  arr[0].floors_passed = true;
                  arr[0].floors_on = true;
                } else {
                  arr[0].floors_passed = false;
                  arr[0].floors_on = true;
                  arr[0].didPass = false;
                }
              } else {
                arr[0].floors_on = false;
              }

            arr[0].minutes = result.summary_activeMinutes;
              if (goals.minutes) {
                if (arr[0].minutes >= goals.minutes) {
                  arr[0].minutes_passed = true;
                  arr[0].minutes_on = true;
                } else {
                  arr[0].minutes_passed = false;
                  arr[0].minutes_on = true;
                  arr[0].didPass = false;
                }
              } else {
                arr[0].minutes_on = false;
              }

            arr[0].steps = result.summary_steps;
              if (goals.steps) {
                if (arr[0].steps >= goals.steps) {
                  arr[0].steps_passed = true;
                  arr[0].steps_on = true;
                } else {
                  arr[0].steps_passed = false;
                  arr[0].steps_on = true;
                  arr[0].didPass = false;
                }
              } else {
                arr[0].steps_on = false;
              }

            arr[0].didSync = true;
            arr[0].date = date;
            arr[0].id = challengeid;
            console.log('Finished activity Array ', arr[0])
            dfd.resolve(arr[0])
          } else {
            arr[0].didSync = false;
            arr[0].didPass = false;
            arr[0].date = date;
            arr[0].id = challengeid;
            arr[0].bet = bet;
            console.log('No Sync Finished activity Array ', arr[0])
            dfd.resolve(arr[0])
          }
        }
      })
      console.log('inner')
      return dfd.promise;
    }

  return q.all([response(array)]).then((answer)=>{
      console.log(6,'user activity answer', answer[0])
      return this.saveAchievedInfo(answer[0])
      .then((achievedRes)=>{
        console.log(6.2,'achieved result ',achievedRes)
        if (!answer[0].didPass) {
          console.log(6.5, 'DIDN"T PASS', answer[0])

        }
        resultsArr.push(answer[0]);
        array.shift();
        // console.log(6.5, array, array.length, challengeid, goals)
        if (array.length > 0) {
          console.log(7)
          return this.getUsersActivityRecursion(array, resultsArr, challengeid, goals, bet)
        } else {
          console.log(8)
          return resultsArr;
        }

      })
    })
  },
//Saves paresed info to table achieved_or_not
  saveAchievedInfo(info) {
    var dfd= q.defer()
    db.achieved_or_not.insert({
      user_id: info.user_id,
      did_pass: info.didPass,
      bet: info.bet,
      calories: info.calories,
      calories_passed: info.calories_passed,
      calories_on: info.calories_on,
      distance: info.distance,
      distance_passed: info.distance_passed,
      distance_on: info.distance_on,
      floors: info.floors,
      floors_passed: info.floors_passed,
      floors_on: info.floors_on,
      minutes: info.minutes,
      minutes_passed: info.minutes_passed,
      minutes_on: info.minutes_on,
      steps: info.steps,
      steps_passed: info.steps_passed,
      steps_on: info.steps_on,
      did_sync: info.didSync,
      date: info.date,
      challenge_id: info.id
    }, (dbErr, dbRes)=>{
      if (dbErr) {
        console.log('SaveAchievedInfo ERROR', dbErr)
        dfd.reject(new Error(dbErr))
      } else {
        if (dbRes.did_pass === false) {
          //charge for failure
          stripeController.chargeCustomer(dbRes.user_id, Number(""+dbRes.bet+000), `Failure to achieve goals for challenge ID: ${dbRes.challenge_id} on ${dbRes.date}. - FitBit Wars`)
            .then((chargeRes)=>{
              this.pullAmountPaidForChallenge(dbRes.user_id, dbRes.challenge_id)
              .then((amountPaid)=>{
                this.pullUserChallengeStats(dbRes)
                .then((userStats)=> {
                  console.log(11, userStats)
                  this.pullChallengeUserID(dbRes)
                  .then((id)=>{
                    console.log(12, id)
                    if (chargeRes.paid) {
                      var betAmount = dbRes.bet;
                      console.log(betAmount)
                    }
                    console.log("FinalSave With Charge", id, userStats, amountPaid+betAmount)
                    db.challenge_users.save({
                      id: id,
                      days_achieved: userStats.days_achieved,
                      days_failed: userStats.days_failed,
                      amount_paid: amountPaid + betAmount
                    }, (dbErr, dbRes)=> {
                      if (dbErr) {
                        console.log('Save Challenge Users Info ERROR', dbErr)
                      } else {
                        console.log('SaveAchievedInfo is saved!')
                        dfd.resolve(dbRes[0]);
                      }
                    })
                  })
                })
              })
            })
        } else {
          this.pullUserChallengeStats(dbRes)
          .then((userStats)=> {
            this.pullChallengeUserID(dbRes)
            .then((id)=>{
              console.log('FinalSave NoCharge', id, userStats)
              db.challenge_users.save({
                id: id,
                days_achieved: userStats.days_achieved,
                days_failed: userStats.days_failed
              }, (dbErr, dbRes)=> {
                if (dbErr) {
                  console.log('Save Challenge Users Info ERROR', dbErr)
                } else {
                  console.log('SaveAchievedInfo is saved!', dbRes[0])
                  dfd.resolve(dbRes[0]);
                }
              })
            })
          })
        }
      }
    })
    return dfd.promise;
  },

  pullUserChallengeStats(user){
    var dfd=q.defer();
    console.log(99999999999999, user)
      db.run("select SUM(CASE WHEN did_pass = $1 THEN 1 ELSE 0 END) days_achieved_tot, SUM(CASE WHEN did_pass = $2 THEN 1 ELSE 0 END) days_failed_tot from achieved_or_not where user_id = $3 and challenge_id = $4",[true, false, user.user_id, user.challenge_id]
        ,(dbErr, dbRes)=> {
          if (dbErr) {
            console.log(dbErr)
          } else {
            console.log('USER STATS!',dbRes)
            var result = dbRes[0];
            dfd.resolve({
              days_achieved: result.days_achieved_tot,
              days_failed: result.days_failed_tot
            })
          }
        })
    return dfd.promise;
  },

  pullChallengeUserID(user) {
    console.log(11.5)
    var dfd = q.defer();
      db.run("select id from challenge_users where user_id = $1 and challenge_id = $2",[user.user_id, user.challenge_id]
        ,(dbErr, dbRes)=> {
          if (dbErr) {
            console.log('pullChallengeUserID ERROR', dbErr)
          } else {
            console.log(dbRes[0].id)
            dfd.resolve(dbRes[0].id)
          }
        })
    return dfd.promise;
  },

  pullAmountPaidForChallenge(user_id, challenge_id) {
    var dfd = q.defer();
      db.run("select amount_paid from challenge_users where challenge_id = $1 and user_id= $2",[challenge_id,user_id], (dbErr,dbRes)=>{
        if (dbErr) {
          console.log('pullAmountPaidForChallenge ERROR', dbErr)
        } else {
          dfd.resolve(dbRes[0].amount_paid)
        }
      })
    return dfd.promise;
  },

  endChallenge (challenge) {
    var dfd = q.defer();
      db.run("update challenges set active = $1 where challenge_id = $2",[false, challenge.challenge_id], (dbErr, dbRes)=> {
        if (dbErr) {
          console.log(dbErr)
          dfd.reject(dbErr)
        } else {
          dfd.resolve(dbRes)
        }
      })
    return dfd.promise;
  }

}
