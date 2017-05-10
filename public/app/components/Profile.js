import React, {Component} from 'react'
import {getProfile} from '../utils/api'

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: ''
    }

  }

  componentDidMount() {
    getProfile().then((profile)=>{
      this.setState(()=>{
        return {
          profile
        }
      })
    })
  }

  render() {
    return(
      <div>
        {this.state.profile}
      </div>
    )
  }

}




export default Profile;
