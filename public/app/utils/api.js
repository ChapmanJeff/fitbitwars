import axios from 'axios'

module.exports = {

  getProfile: ()=> {
    return axios.get('/api/profile')
      .then((result)=>console.log(result.data))
  },

}
