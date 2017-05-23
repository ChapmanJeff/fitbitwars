import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {saveNewChallenge, getUserChallenges} from '../utils/api'
import {Switch, Slider, InputSwitch, Icon, AmountInput, Button} from './Styles'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const SwitchInput = ({infoTog, id}) => {
  return (
    <Switch>
      <InputSwitch type="checkbox"  onChange={()=>infoTog(id)}/>
      <Slider></Slider>
    </Switch>
  )
}

SwitchInput.propTypes = {
  infoTog: PropTypes.func.isRequired,
  id: PropTypes.string
}

const IconInput = ({img, label, infoTog, onOff, inputVal, id, handleInputChange, placeholder}) =>{
  return (
    <div style={{display:'flex', alignItems:'center'}}>
      <div style={{display:'flex', alignItems:'center', marginRight:'20px', justifyContent:'space-around'}}>
        <Icon src={img} style={{marginRight:'20px'}}/>
        <h2 style={{marginRight:'10px', minWidth:'70px'}}>{label}</h2>
        <SwitchInput infoTog={infoTog} id={id} style={{marginRight:'20px'}}/>
      </div>
      {onOff ? <AmountInput value={inputVal} onChange={e => handleInputChange(e, id)} type='text' placeholder={placeholder}/> : null}
    </div>
  )
}

IconInput.propTypes = {
  img: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  infoTog: PropTypes.func.isRequired,
  onOff: PropTypes.bool.isRequired,
  inputVal: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
}


class ChallengeSignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      stepsOn: false,
      stepsVal: '',
      floorsOn: false,
      floorsVal: '',
      distanceOn: false,
      distanceVal: '',
      caloriesOn: false,
      caloriesVal: '',
      minutesOn: false,
      minutesVal: '',
      privateOn:false,
      privateVal:'',
      challengeVal: '',
      betVal: '',
      startDateVal: '',
      endDateVal: '',
      userChallenges: ''
    }

    this.infoTog = this.infoTog.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  infoTog (label) {
    this.setState(()=>{
      if (this.state[`${label}Val`]) {
        var newState = {};
        newState[`${label}On`] = !this.state[`${label}On`];
        newState[`${label}Val`] = '';
        return newState;
      } else {
        var newState = {};
        newState[`${label}On`] = !this.state[`${label}On`];
        return newState;
      }
    })
  }

  handleInputChange (e, action) {
    var value = e.target.value;

    this.setState(()=> {
      var newState = {};
      newState[`${action}Val`] = value;
      return newState;
    })
  }

  handleStartDateChange(date) {
    this.setState({
      startDateVal: date
    });
  }

  handleEndDateChange(date) {
    this.setState({
      endDateVal: date
    });
  }

submitChallenge () {
  // event.preventDefault();
  let challenge = {
    stepsOn: this.state.stepsOn,
    stepsVal: this.state.stepsVal,
    floorsOn: this.state.floorsOn,
    floorsVal: this.state.floorsVal,
    distanceOn: this.state.distanceOn,
    distanceVal: this.state.distanceVal,
    caloriesOn: this.state.caloriesOn,
    caloriesVal: this.state.caloriesVal,
    minutesOn: this.state.minutesOn,
    minutesVal: this.state.minutesVal,
    privateOn:this.state.privateOn,
    privateVal:this.state.privateVal,
    challengeVal: this.state.challengeVal,
    betVal: this.state.betVal,
    startDateVal: this.state.startDateVal,
    endDateVal: this.state.endDateVal
  };
  console.log(challenge)
  this.props.closeModal();
  saveNewChallenge(challenge);
}


  render() {
    var activityInputs = [
      {img: './app/images/icon steps.png',label: 'Steps',id: 'steps',infoTog: this.infoTog,onOff: this.state.stepsOn,inputVal: this.state.stepsVal,handleInputChange: this.handleInputChange,placeholder: 'How Many Steps Per Day? Ex: 10000'},
      {img: './app/images/icon stairs.png',label: 'Floors',id: 'floors',infoTog: this.infoTog,onOff: this.state.floorsOn,inputVal: this.state.floorsVal,handleInputChange: this.handleInputChange,placeholder: 'How Many Floors Per Day? Ex: 10'},
      {img: './app/images/icon distance.png',label: 'Distance',id: 'distance',infoTog: this.infoTog,onOff: this.state.distanceOn,inputVal: this.state.distanceVal,handleInputChange: this.handleInputChange,placeholder: 'How Many Miles Per Day? Ex: 3'},
      {img: './app/images/icon fire.png',label: 'Calories',id: 'calories',infoTog: this.infoTog,onOff: this.state.caloriesOn,inputVal: this.state.caloriesVal,handleInputChange: this.handleInputChange,placeholder: 'How Many Calories Per Day? Ex: 2000'},
      {img: './app/images/icon active.png',label: 'Minutes',id: 'minutes',infoTog: this.infoTog,onOff: this.state.minutesOn,inputVal: this.state.minutesVal,handleInputChange: this.handleInputChange,placeholder: 'How Many Active Minutes Per Day? Ex: 30'}
    ]
    return (
      <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
        <section style={{height:'5%', background:'linear-gradient(to right,#202229, #38618C 130%)'}}/>
        <section style={{display:'flex', flexDirection:'column', padding:'10px', height:'100%'}}>
          <h1 style={{textAlign:'center', marginBottom:'20px'}}>CREATE A NEW CHALLENGE</h1>
          <div>
            <h2>Name of Challenge</h2>
            <AmountInput style={{marginBottom:'10px'}} value={this.state.challengeVal} onChange={(e) => this.handleInputChange(e, 'challenge')} placeholder='Choose a name'/>
            <h2>Daily Bet Amount</h2>
            <AmountInput style={{marginBottom:'10px'}} value={this.state.betVal} onChange={(e) => this.handleInputChange(e, 'bet')} placeholder='Ex: $20'/>

            <h2>Start Date</h2>
            <DatePicker selected={this.state.startDateVal} placeholder='Choose Date' onChange={this.handleStartDateChange} />

            <h2>End Date</h2>
            <DatePicker selected={this.state.endDateVal} placeholder='Choose Date' onChange={this.handleEndDateChange} />

            <h2 style={{textAlign:'center'}}>Set Your Goals</h2>
          </div>
          {activityInputs.map((obj)=>{
            return <IconInput key={obj.id} img={obj.img} label={obj.label} id={obj.id} infoTog={obj.infoTog}
              onOff={obj.onOff} inputVal={obj.inputVal} handleInputChange={obj.handleInputChange}
              placeholder={obj.placeholder}/>
            })}
          <h2 style={{textAlign:'center'}}>Is this a private Competition?</h2>
          <IconInput img='./app/images/private.png' label='Private' id='private' infoTog={this.infoTog}
            onOff={this.state.privateOn} inputVal={this.state.privateVal} handleInputChange={this.handleInputChange} placeholder='Create a password for others to use to join'/>
          <Button style={{margin:'0 auto'}} onClick={()=>this.submitChallenge()}>Start Challenge</Button>
        </section>
      </div>
    )
  }
}

export default ChallengeSignUp;
