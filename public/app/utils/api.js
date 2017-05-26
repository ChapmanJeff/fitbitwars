import axios from 'axios'

module.exports = {

  getProfile () {
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
  },

  getChallenges () {
    return axios.get('/api/getAllChallenges')
      .then((response)=> {
        return response.data;
      })
      .catch((error)=> {
        console.log(error)
      })
  },

  getChallengeInfo(id) {
    return axios(`/api/getChallengeInfo?id=${id}`)
      .then((response)=> {
        return response.data[0];
      })
      .catch((error)=> {
        console.log(error)
      })
  },

  getPlayers (id) {
    return axios.get(`/api/getPlayers?id=${id}`)
      .then((response)=> {
        return response.data;
      })
      .catch((error)=> {
        console.log(error)
      })
  }

}
