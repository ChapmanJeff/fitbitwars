const app = require('../../server.js');
const db = app.get('db');
const q = require('q');
const moment = require('moment');

module.exports = {

  dailyUpdate () {
    var dfd = q.defer();
      this.getAllChallenges()
      .then((allChallenges)=>{
        console.log(21,allChallenges,21)
        var results =[];
        var solution = this.recursiveCall(allChallenges, results);
        console.log(5, q.all(solution))
        q.all(solution).then((solution2)=>{
          dfd.resolve(solution2)
          console.log('RECURSIVE FINAL ANSWER', solution2)
        })



        // var usersInChallenge = allChallenges.map((challenge)=>{
        //   // var dfd = q.defer();
        //     this.getUsersInChallenge(challenge.challenge_id)
        //     .then((users)=> {
        //       console.log('here',users, challenge.challenge_id)
        //       return {
        //         id: challenge.challenge_id,
        //         users: users,
        //         goals: {
        //           steps: challenge.steps_val,
        //           floors: challenge.floors_val,
        //           distance: challenge.distance_val,
        //           calories: challenge.calories_val,
        //           minutes: challenge.minutes_val
        //         }
        //       }
        //     })
        //   return dfd.promise;
        // })
        // q.all(usersInChallenge).then((usersAndGoals)=>{
        //   console.log(1313, usersAndGoals)
        // })


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

  recursiveCall (array, resultsArr) {
    console.log('Array at 0',array[0].challenge_id)
    // var dfrd= q.defer();
    var response = (array)=>{
      var dfd = q.defer();
      console.log(1, array[0].challenge_id)
      db.run("select user_id from challenge_users where challenge_id = $1",[array[0].challenge_id], (dbErr, dbRes)=>{
        console.log(3, dbErr,dbRes)
        if (dbErr) {
          console.log(dbErr)
          dfd.reject(new Error(dbErr))
        } else {
          console.log(4,{
            id: array[0].challenge_id,
            users: dbRes,
            goals: {
              steps: array[0].steps_val,
              floors: array[0].floors_val,
              distance: array[0].distance_val,
              calories: array[0].calories_val,
              minutes: array[0].minutes_val
            }})

          dfd.resolve({
            id: array[0].challenge_id,
            users: dbRes,
            goals: {
              steps: array[0].steps_val,
              floors: array[0].floors_val,
              distance: array[0].distance_val,
              calories: array[0].calories_val,
              minutes: array[0].minutes_val
            }
          })
        }
      })
      console.log('inner')
      return dfd.promise;
    }
    // var a = () => {
    //   var dfd = q.defer();
    //   console.log(4)
    //    setTimeout(()=>dfd.resolve('heelo'),2000)
    //   return dfd.promise;
    // }
    //  return response
    // return response(array)

    // return q.all([response(array)]).then((res)=>{
    //   console.log(6)
    //   return res
    // })

  return q.all([response(array)]).then((answer)=>{
      console.log(6,'answer', answer)
      resultsArr.push(answer[0]);
      array.shift();
      if (array.length > 0) {
        console.log(7)
        return this.recursiveCall(array, resultsArr)
      } else {
        console.log(8)
        return resultsArr;
      }
    })
    console.log(3)
  // return dfrd.promise

  },


}

// My recursive solution
// var allChallenges= [1,2,3,4];
// var queryStr =
// results= [];
// function recursiveCall (array) {
//   var dfrd= q.defer();
//     var response = ()=>{
//       var dfd = q.defer();
//
//       db.run("elect user_id from challenge_users where challenge_id = $1",[array[0].challenge_id], (dbErr, dbRes)=>{
//         if (dbErr) {
//           dfd.reject(new Error(dbErr))
//         } else {
//           dfd.resolve({
//             id: array[0].challenge_id,
//             users: dbRes,
//             goals: {
//               steps: array[0].steps_val,
//               floors: array[0].floors_val,
//               distance: array[0].distance_val,
//               calories: array[0].calories_val,
//               minutes: array[0].minutes_val
//             }
//           })
//         }
//       })
//
//       return dfd.promise;
//     }
//     q.all(response).then((answer)=>{
//       console.log('answer', answer)
//       results.push(answer);
//       array.shift();
//       if (array.length > 0) {
//         return recursiveCall(array)
//       } else {
//         return results;
//       }
//     })
//
// return dfrd.promise
//
// }



//Brack's Recursion solution
// function recusiveCall(url, arry, results){
//
//   return db.run(url,arry[0]).then(function(resp){
//     arry.shift();
//     results.puish(resp);
//     if (arry.length)
//     return recursiveCall(url, arry, results).then(function(rep){return rep});
//     return results;
//   })
// }
//
// recursiveCall(url, ary, []);
