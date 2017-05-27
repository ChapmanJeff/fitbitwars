import React, {Component} from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import styled from 'styled-components'
import {MainContainerWhite, BannerTop, Icon, JoinButton} from './Styles'
import {getPlayers, getChallengeInfo, addPlayer, removePlayer,test} from '../utils/api'
import moment from 'moment'

const H2Title = styled.h2`

  font-size: 25px;
  margin-bottom: 5px;
  text-align: center;
`
const H2SubTitle =styled.h2`
  font-family: Raleway;
  font-size: 12px;
  text-align: center
`

const LeaderBoard = ({players, challengeInfo}) => {
  return (
    <div className='LeaderBoard-container' style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
      <h2 style={{fontFamily:'Oswald', letterSpacing:'2px', textAlign:'center', fontSize:'18px'}}>LEADER BOARD</h2>
      <div className='leaderboard-tile' style={{width:'80%', margin:'20px', border:'1px solid #f3f3f3', borderRadius:'6px', boxShadow:'0px 2px 5px 2px rgba(0, 0, 0, 0.2)'}}>
        <div className='tile-top' style={{backgroundColor:'#f8f8f8', borderBottom:'2px solid #f3f3f3', display:'flex',textAlign:'center'}}>
          <div className='top-left' style={{width:'30%', padding:'10px'}}>
            <H2Title style={{color:'#37ce46'}}>${challengeInfo.current_payout}</H2Title>
            <H2SubTitle>Current Payout</H2SubTitle>
          </div>
          <div className='top-center' style={{borderLeft:'2px solid #f3f3f3', borderRight:'3px solid #f3f3f3', width:'40%', padding:'10px'}}>
            <H2Title style={{color:'#3596ff'}}>{players.length}</H2Title>
            <H2SubTitle>Contenders</H2SubTitle>
          </div>
          <div className='top-right' style={{width:'30%', padding:'10px'}}>
            <H2Title style={{color:'#37ce46'}}>${challengeInfo.bet_val}</H2Title>
            <H2SubTitle>Daily Bet Amount</H2SubTitle>
          </div>
        </div>
        <div className='tile-bottom' style={{maxHeight:'50vh', width:'100%', overflow:'scroll'}}>


          <div className='player-scorecard' style={{display:'flex', justifyContent:'space-around', alignItems:'center', paddingBottom:'15px', borderBottom:'3px dotted #f3f3f3', padding:'10px'}}>
            <div>
              <Icon style={{border:'2px solid #3596ff'}} src='http://www.ajc.com/rf/image_large/Pub/Web/AJC/Special%20Contents/StaffMembers/Images/QuinnC.jpg'/>
              <h2>John W.</h2>
            </div>
            <div>
              <H2Title>2</H2Title>
              <H2SubTitle>Days Achieved</H2SubTitle>
            </div>
            <div>
              <H2Title>2</H2Title>
              <H2SubTitle>Days Failed</H2SubTitle>
            </div>
            <div>
              <H2Title style={{color:'red'}}>$200</H2Title>
              <H2SubTitle>Amount Paid</H2SubTitle>
            </div>
          </div>

          <div className='player-scorecard' style={{display:'flex', justifyContent:'space-around', alignItems:'center', paddingBottom:'15px', borderBottom:'3px dotted #f3f3f3', padding:'10px'}}>
            <div>
              <Icon style={{border:'2px solid #3596ff'}} src='http://www.ajc.com/rf/image_large/Pub/Web/AJC/Special%20Contents/StaffMembers/Images/QuinnC.jpg'/>
              <h2>John W.</h2>
            </div>
            <div>
              <H2Title>2</H2Title>
              <H2SubTitle>Days Achieved</H2SubTitle>
            </div>
            <div>
              <H2Title>2</H2Title>
              <H2SubTitle>Days Failed</H2SubTitle>
            </div>
          </div>

          <div className='player-scorecard' style={{display:'flex', justifyContent:'space-around', alignItems:'center', paddingBottom:'15px', borderBottom:'3px dotted #f3f3f3', padding:'10px'}}>
            <div>
              <Icon style={{border:'2px solid #3596ff'}} src='http://www.ajc.com/rf/image_large/Pub/Web/AJC/Special%20Contents/StaffMembers/Images/QuinnC.jpg'/>
              <h2>John W.</h2>
            </div>
            <div>
              <H2Title>2</H2Title>
              <H2SubTitle>Days Achieved</H2SubTitle>
            </div>
            <div>
              <H2Title>2</H2Title>
              <H2SubTitle>Days Failed</H2SubTitle>
            </div>
          </div>



        </div>
      </div>
    </div>
  )
}

LeaderBoard.propTypes = {
  players: PropTypes.array.isRequired,
}

const TitleGoals = ({title, challengeInfo, userIncluded, handleRemovePlayer, handleAddPlayer}) => {
  return (
    <div className='titleGoals' style={{display:'flex', flexDirection:'column', alignItems:'center',marginTop:'10px', marginBottom:'10px'}}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <div style={{borderRight:'1px solid #f3f3f3', paddingRight:'15px', textAlign:'center'}}>
          <h2 style={{fontSize:'35px', fontFamily:'Raleway'}}>{title}</h2>
          <h2 style={{margin:'10px 0px', color:'#ff951c', fontFamily:'Raleway'}}>{moment(challengeInfo.start_date).format("MMM Do, YYYY")} - {moment(challengeInfo.end_date).format("MMM Do, YYYY")}</h2>
        </div>
        <div style={{textAlign:'center', display:'flex'}}>
          <div style={{display:'flex',flexDirection:'column', justifyContent:'center', paddingLeft:'15px'}}>
            <Icon src={challengeInfo.active ? '/./app/images/icon trophy.png' : '/./app/images/icon trophy completed.png'} />
            <h2 style={{fontFamily:'Raleway', fontSize:'12px', letterSpacing:'1px'}}>{challengeInfo.active ? 'Active' : 'Ended'}</h2>
          </div>
          {challengeInfo.active ? <div style={{display:'flex', alignItems:'center', paddingLeft:'10px'}}>
            {userIncluded ? <JoinButton onClick={()=>handleRemovePlayer(challengeInfo.challenge_id)}>Leave Challenge</JoinButton> : <JoinButton onClick={()=>handleAddPlayer(challengeInfo.challenge_id)}>JOIN CHALLENGE</JoinButton>}
          </div> : null}
        </div>
      </div>



      <div className='challenge-criteria' style={{display:'flex', padding:'15px', justifyContent:'space-around', textAlign:'center', width:'100%', width:'60%', borderBottom:'1px solid #f3f3f3', borderTop:'1px solid #f3f3f3', margin:'10px 0px'}}>
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
    test();
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
        <TitleGoals title={title} handleAddPlayer={this.handleAddPlayer} handleRemovePlayer={this.handleRemovePlayer} challengeInfo={this.state.challengeInfo} userIncluded={this.state.userIncluded}/>
        <LeaderBoard players={this.state.players} challengeInfo={this.state.challengeInfo}/>
      </MainContainerWhite>
    )
  }
}


export default SingleChallenge;
