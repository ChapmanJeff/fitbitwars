import React from 'react'
import PropTypes from 'prop-types'
import {Switch, Slider, InputSwitch} from './Styles'

const ChallengeSignUp = () => {
  return (
    <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column',padding:'10px'}}>
      <section style={{height:'15%', background:'linear-gradient(to right,#202229, #38618C 130%)'}}/>
      <form>
        <Switch>
          <InputSwitch type="checkbox" onChange={()=>console.log('changing')}/>
          <Slider></Slider>
        </Switch>
      </form>
    </div>
  )
}

export default ChallengeSignUp;
