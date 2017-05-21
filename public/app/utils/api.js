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


}
