import React, {Component} from 'react'
import {fitbitLogin} from '../utils/api'
import styled from 'styled-components'
import TakeMoney from './StripeCheckout'

const Link = styled.a`
  margin-left: 18px;
`

class Home extends Component {
  constructor(props) {
    super(props);

    this.state= {

    }

  }

onToken(token) {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(token => {
      alert(`We are in business, ${token.email}`);
    });
  }

  render() {
    return (
      <div>
        <Link href='/auth/fitbit'>Login</Link>
        <Link href='/auth/logout'>Logout</Link>
        <TakeMoney />
      </div>
    )
  }
}

export default Home;
