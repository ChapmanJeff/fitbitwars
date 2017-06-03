import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import config from '../../../config'
const keySecret = config.stripe.keySecret;
const keyPublishable = config.stripe.keyPublishable;
import styled from 'styled-components'
import axios from 'axios'

// const Button = styled.button`
//   background-image: linear-gradient(#28a0e5 60%,#015e94)
//   padding: 5px 12px;
//   border: 1px solid #015e94 ;
//   text-decoration: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-left: 12px;
//   color: white;
//   font-size: 15px;
//   font-weight: 500;
//   line-height: 32px;
//   text-align: center;
//   box-shadow: 2px 2px 5px #888888;
// `

//fetch('/save-stripe-token', {
//   method: 'POST',
//   body: JSON.stringify(token),
// }).then(token => {
//   alert(`We are in business, ${token.email}`);
// });

class TakeMoney extends Component {
  constructor(props) {
    super(props);

    this.state= {

    }

  }

  onToken (token) {
    console.log('TOKEN STRIPE', token)
    return axios.post('/api/stripeToken', {token}).then((tokenRes) => {
      console.log(tokenRes, 'here', this.props.handleStripeUpdate)
      alert(`We are in business, ${tokenRes.token.email}`)
      this.props.handleStripeUpdate();
      })
  }


  render() {
    return (
      <StripeCheckout
       token={this.onToken}
       stripeKey={keyPublishable}
       panelLabel="Save Info"
       name="Fitbit Wars"
       description="Save your stripe info so you can join battles"
       image='./app/images/fitbit.png'
       zipCode={true}
       locale="auto"
       billingAddress={true}
       label="Set Up Payments"
     />
    )
  }

}

export default TakeMoney;
