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
    return axios.post('/api/stripeToken', {
      token
    }).then(token => {
      console.log(token)
        alert(`We are in business, ${token.token.email}`)
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
       image='http://www.moa.zcu.cz/hcewiki/images/Fitbit.png'
       zipCode={true}
       locale="auto"
       billingAddress={true}
       label="Set Up Stripe Payments"
     />
    )
  }

}

export default TakeMoney;
