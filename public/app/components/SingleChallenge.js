import React, {Component} from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import styled from 'styled-components'
import {MainContainerWhite, BannerTop, Icon, JoinButton} from './Styles'
import {getPlayers, getChallengeInfo, addPlayer, removePlayer} from '../utils/api'
import moment from 'moment'



const TitleGoals = ({title, challengeInfo, players, userIncluded, handleRemovePlayer, handleAddPlayer}) => {
  return (
    <div className='titleGoals' style={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom:'30px'}}>
      <h2 style={{fontSize:'35px', fontFamily:'Raleway', marginTop:'25px'}}>{title}</h2>
      <h2 style={{margin:'10px 0px', color:'#ff951c', fontFamily:'Raleway'}}>{moment(challengeInfo.start_date).format("MMM Do, YYYY")} - {moment(challengeInfo.end_date).format("MMM Do, YYYY")}</h2>
      {userIncluded ? <JoinButton onClick={()=>handleRemovePlayer(challengeInfo.challenge_id)}>Leave Challenge</JoinButton> : <JoinButton onClick={()=>handleAddPlayer(challengeInfo.challenge_id)}>JOIN CHALLENGE</JoinButton>}
      <div className='challenge-criteria' style={{display:'flex', padding:'15px', justifyContent:'space-around', textAlign:'center', width:'100%', width:'60%', marginTop:'15px'}}>
        {challengeInfo.steps_on ? <div className='steps'>
          <Icon src={challengeInfo.steps_on ? '/./app/images/icon steps.png': '/./app/images/icon steps disabled.png'}/>
          {challengeInfo.steps_on ? <h2 style={{color:'#37ce46', fontSize:'15px'}}>{challengeInfo.steps_val}</h2>
            : <h2 style={{color:'gray', fontSize:'15px'}}>-</h2>}
          <h2 style={{fontSize:'15px', fontFamily:'Raleway'}}>Steps</h2>
        </div>: null}
        {challengeInfo.floors_on ? <div>
          <Icon src={challengeInfo.floors_on ? '/./app/images/icon stairs.png': '/./app/images/icon stairs disabled.png'}/>
          {challengeInfo.floors_on ? <h2 style={{color:'#37ce46', fontSize:'15px'}}>{challengeInfo.floors_val}</h2>
            : <h2 style={{color:'gray', fontSize:'15px'}}>-</h2>}
          <h2 style={{fontSize:'15px', fontFamily:'Raleway'}}>Floors</h2>
        </div> : null}
        {challengeInfo.distance_on ? <div>
          <Icon src={ challengeInfo.distance_on ? '/./app/images/icon distance.png': '/./app/images/icon distance disabled.png'}/>
          {challengeInfo.distance_on ? <h2 style={{color:'#37ce46', fontSize:'15px'}}>{challengeInfo.distance_val}</h2>
            : <h2 style={{color:'gray', fontSize:'15px'}}>-</h2>}
          <h2 style={{fontSize:'15px', fontFamily:'Raleway'}}>Miles</h2>
        </div> : null}
        {challengeInfo.calories_on ? <div>
          <Icon src={challengeInfo.calories_on ? '/./app/images/icon fire.png': '/./app/images/icon fire disabled.png'}/>
          {challengeInfo.calories_on ? <h2 style={{color:'#37ce46', fontSize:'15px'}}>{challengeInfo.calories_val}</h2>
            : <h2 style={{color:'gray', fontSize:'15px'}}>-</h2>}
          <h2 style={{fontSize:'15px', fontFamily:'Raleway'}}>Calories</h2>
        </div> : null}
        {challengeInfo.minutes_on ? <div>
          <Icon src={challengeInfo.minutes_on ? '/./app/images/icon active.png': '/./app/images/icon active disabled.png'}/>
          {challengeInfo.minutes_on ? <h2 style={{color:'#37ce46', fontSize:'15px'}}>{challengeInfo.minutes_val}</h2>
            : <h2 style={{color:'gray', fontSize:'15px'}}>-</h2>}
          <h2 style={{fontSize:'15px', fontFamily:'Raleway'}}>Minutes</h2>
        </div> : null}
      </div>
    </div>
  )
}

TitleGoals.propTypes = {
  title: PropTypes.string.isRequired,
  challengeInfo: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  userIncluded: PropTypes.bool.isRequired,
  handleRemovePlayer: PropTypes.func.isRequired,
  handleAddPlayer: PropTypes.func.isRequired,
}


class SingleChallenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      challengeInfo: {},
      userIncluded: false
    }

    this.handleRemovePlayer = this.handleRemovePlayer.bind(this);
    this.handleAddPlayer = this.handleAddPlayer.bind(this);
  }

  componentDidMount () {
    var challengeQueryString = queryString.parse(this.props.location.search);
    getChallengeInfo(challengeQueryString.id)
      .then((challengeInfo)=>{
        this.setState(()=>{
          return {
            challengeInfo
          }
        })
      })
    getPlayers(challengeQueryString.id)
    .then((playerInfo)=>{
      console.log(playerInfo)
      this.setState(()=>{
        return {
          players: playerInfo.players,
          userIncluded: playerInfo.userInChallenge
        }
      })
    })
  }

  handleRemovePlayer (id) {
    removePlayer(id)
    .then((res)=> {
      getPlayers(id)
      .then((playerInfo)=>{
        console.log(playerInfo)
        this.setState(()=>{
          return {
            players: playerInfo.players,
            userIncluded: playerInfo.userInChallenge
          }
        })
      })
    })
  }

  handleAddPlayer (id) {
    addPlayer(id)
    .then((res)=> {
      getPlayers(id)
      .then((playerInfo)=>{
        console.log(playerInfo)
        this.setState(()=>{
          return {
            players: playerInfo.players,
            userIncluded: playerInfo.userInChallenge
          }
        })
      })
    })
  }

  render() {
    console.log(123321,this.state.challengeInfo)
    var titleObj = queryString.parse(this.props.location.search);
    var title= titleObj.name;
    console.log(title)
    return (
      <MainContainerWhite>
        <BannerTop />
        <TitleGoals title={title} players={this.state.players} handleAddPlayer={this.handleAddPlayer} handleRemovePlayer={this.handleRemovePlayer} challengeInfo={this.state.challengeInfo} userIncluded={this.state.userIncluded}/>

      </MainContainerWhite>
    )
  }
}


export default SingleChallenge;
