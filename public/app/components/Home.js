import React, {Component} from 'react'
import {fitbitLogin} from '../utils/api'
import styled from 'styled-components'

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
        <h1>Welcome! Please Log In</h1>
      </div>
    )
  }
}

export default Home;
