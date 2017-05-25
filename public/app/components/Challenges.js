import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {getChallenges} from '../utils/api'
import styled from 'styled-components'
import {BannerTop, MainContainerWhite} from './Styles'

const ChallengeLookup = ({challenges}) => {  
  return (
    <h1>Hi</h1>
  )
}

ChallengeLookup.propTypes = {
  challenges: PropTypes.array.isRequired,
}

class Challenges extends Component {
  constructor (props) {
    super(props)

    this.state = {
      challenges: [1,2,3],
    }

  }

  componentDidMount () {
    getChallenges()
      .then((challenges)=> {
        this.setState(()=>{
          return {
            challenges
          }
        })
      })
  }


  render() {
    return (
      <MainContainerWhite >
        <BannerTop />
        <h1>This is the challenge Page</h1>
        <ChallengeLookup challenges={this.state.challenges}/>
      </MainContainerWhite>
    )
  }
}

export default Challenges;
