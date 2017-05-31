import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from './Styles'
import PropTypes from 'prop-types'

const Banner = styled.section`
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center top ;
  background-image: url('./app/images/fitbit-bg.png');
  height: 80vh;
  background-color: #F1F0F2;
`

const BanHeader = styled.div`
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 50%;
  padding-right: 20px;
  color: white;
  text-align: center;
  width: 500px;
  ${''/* text-shadow: 2px 2px black; */}
    & h1 {
    font-family: Oswald;
    font-size: 70px;
    line-height: 85px;
    color: #38618C;
    }
    & p {
      font-family: Raleway;
      font-size: 25px;
      line-height: 35px;
      color: #4A5153;
    }
`

const MainBanner = () => {
  return(
    <Banner>
      <BanHeader>
        <h1>
          Move or Lose
        </h1>
        <p>
          Compete to win money but if you fail to reach your goals it&#39;ll cost you
        </p>
        <a href='/auth/fitbit'><Button>
          Sign Up
        </Button></a>
      </BanHeader>
    </Banner>
  )
}

const Panel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
  padding: 20px;
  background-color: #F1F0F2;
  margin: 0;
`

const ContrastDiv = styled.div`
  background-color: white;
  margin: -110px auto 0px auto;
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  text-align: center;
`

const ContrastChild = styled.div`
  padding: 45px 2px;
  width: 250px;
  & h2 {
    font-family: Raleway;
    letter-spacing: .9px;
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 10px;
  }
  & p {
    font-family: Raleway;
    color: #4A5153;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: .9px;
  }
`

const Tile = ({leftImg, rightText, leftText, rightImg}) => {
  return (
    <Panel>
      <ContrastChild>
        {leftImg ? <img src={leftImg} /> : <p>{leftText}</p>}
      </ContrastChild>
      <ContrastChild>
        {rightImg ? <img src={rightImg} /> : <p>{rightText}</p>}
      </ContrastChild>
    </Panel>
  )
}

Tile.proptypes = {
  leftImg: PropTypes.string,
  rightImg:  PropTypes.string,
  leftText: PropTypes.string,
  rightText: PropTypes.string
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state= {

    }

  }

  render() {
    return (
      <div>
        <MainBanner />
        <ContrastDiv>
          <ContrastChild><h2>Connect Your Device</h2><p>Log in with your Fitbit Device to get started</p></ContrastChild>
          <ContrastChild><h2>Add A Payment Method</h2><p>Using Stripe, securely add a way to pay</p></ContrastChild>
          <ContrastChild><h2>Challenge Friends</h2><p>Create a competition. Stay motivated. Make money</p></ContrastChild>
        </ContrastDiv>
        {/* <Tile leftImg='./app/images/clipboard256x256.png' rightText='Set up a competition with daily goal requirements, a consequnece amount and a competion duration' />
        <Tile rightImg='./app/images/money256x256.png' leftText='If you fail to reach the goals for a day you will have to pay a predetermined amount into the community pot' />
        <Tile leftImg='./app/images/badge256x256.png' rightText='If you perform better than those in your competition pool you will walk away a winner and will collect the money in the pot' /> */}
        <div>
          <div></div>
          <div></div>
        </div>

      </div>
    )
  }
}

export default Home;
