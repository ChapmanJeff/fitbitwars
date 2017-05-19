import axios from 'axios'

module.exports = {

  getProfile: ()=> {
    return axios.get('/api/profile')
      .then((result)=>result.data)
  },



}
