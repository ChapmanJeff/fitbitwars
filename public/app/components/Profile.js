import React, {Component} from 'react'
import {getProfile} from '../utils/api'
import TakeMoney from './StripeCheckout'

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
        <TakeMoney />
        {this.state.profile}
      </div>
    )
  }

}




export default Profile;
