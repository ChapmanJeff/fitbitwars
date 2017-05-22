import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Switch, Slider, InputSwitch, Icon, AmountInput, Button} from './Styles'

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
      stepsNum: '',
      floorsOn: false,
      floorsNum: '',
      distanceOn: false,
      distanceNum: '',
      caloriesOn: false,
      caloriesNum: '',
      minutesOn: false,
      minutesNum: '',
      privateOn:false,
      privateNum:''
    }

    this.infoTog = this.infoTog.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  infoTog (label) {
    this.setState(()=>{
      if (this.state[`${label}Num`]) {
        var newState = {};
        newState[`${label}On`] = !this.state[`${label}On`];
        newState[`${label}Num`] = '';
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
      newState[`${action}Num`] = value;
      return newState;
    })
  }



  render() {
    var activityInputs = [
      {img: './app/images/icon steps.png',label: 'Steps',id: 'steps',infoTog: this.infoTog,onOff: this.state.stepsOn,inputVal: this.state.stepsNum,handleInputChange: this.handleInputChange,placeholder: 'How Many Steps Per Day? Ex: 10000'},
      {img: './app/images/icon stairs.png',label: 'Floors',id: 'floors',infoTog: this.infoTog,onOff: this.state.floorsOn,inputVal: this.state.floorsNum,handleInputChange: this.handleInputChange,placeholder: 'How Many Floors Per Day? Ex: 10'},
      {img: './app/images/icon distance.png',label: 'Distance',id: 'distance',infoTog: this.infoTog,onOff: this.state.distanceOn,inputVal: this.state.distanceNum,handleInputChange: this.handleInputChange,placeholder: 'How Many Miles Per Day? Ex: 3'},
      {img: './app/images/icon fire.png',label: 'Calories',id: 'calories',infoTog: this.infoTog,onOff: this.state.caloriesOn,inputVal: this.state.caloriesNum,handleInputChange: this.handleInputChange,placeholder: 'How Many Calories Per Day? Ex: 2000'},
      {img: './app/images/icon active.png',label: 'Minutes',id: 'minutes',infoTog: this.infoTog,onOff: this.state.minutesOn,inputVal: this.state.minutesNum,handleInputChange: this.handleInputChange,placeholder: 'How Many Active Minutes Per Day? Ex: 30'}
    ]
    return (
      <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
        <section style={{height:'5%', background:'linear-gradient(to right,#202229, #38618C 130%)'}}/>
        <form style={{display:'flex', flexDirection:'column', padding:'10px', height:'100%'}}>
          <h1 style={{textAlign:'center', marginBottom:'20px'}}>CREATE A NEW CHALLENGE</h1>
          <div>
            <h2>Name of Challenge</h2>
            <AmountInput style={{marginBottom:'10px'}} placeholder='Choose a name'/>
            <h2>Daily Bet Amount</h2>
            <AmountInput style={{marginBottom:'10px'}} placeholder='$20'/>
            <h2>Start Date</h2>
            <AmountInput style={{marginBottom:'10px'}} placeholder='Use this format: MM/DD/YYYY - Tomorrow or Later'/>
            <h2>End Date</h2>
            <AmountInput style={{marginBottom:'10px'}} placeholder='Use this format: MM/DD/YYYY'/>
            <h2 style={{textAlign:'center'}}>Set Your Goals</h2>
          </div>
          {activityInputs.map((obj)=>{
            return <IconInput img={obj.img} label={obj.label} id={obj.id} infoTog={obj.infoTog}
              onOff={obj.onOff} inputVal={obj.inputVal} handleInputChange={obj.handleInputChange}
              placeholder={obj.placeholder}/>
            })}
          <hr/>
          <h2 style={{textAlign:'center'}}>Is this a private Competition?</h2>
          <IconInput img='./app/images/private.png' label='Private' id='private' infoTog={this.infoTog}
            onOff={this.state.privateOn} inputVal={this.state.privateNum} handleInputChange={this.handleInputChange} placeholder='Create a password for others to use to join'/>
          <Button style={{margin:'0 auto'}} type='submit'>Start Challenge</Button>
        </form>
      </div>
    )
  }
}

export default ChallengeSignUp;
