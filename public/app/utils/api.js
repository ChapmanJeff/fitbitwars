import axios from 'axios'

module.exports = {

  getProfile: ()=> {
    return axios.get('/api/profile')
      .then((result)=>result.data)
  },

  getLastSync () {
    return axios.get('/api/lastSync')
      .then((result)=>result.data)
  },

  saveNewChallenge (challenge) {
    return axios.post('/api/saveNewChallenge', challenge)
    .then((response)=>{
      return response.data;
    })
    .catch((error)=>{
      console.log(error)
    })
  },

  getUserChallenges () {
    return axios.get('/api/getUserChallenges')
      .then((response)=>{
        return response.data;
      })
      .catch((error)=>{
        console.log(error)
      })
  }

}
