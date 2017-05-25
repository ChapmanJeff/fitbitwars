import React, {Component} from 'react'
import {getProfile, getLastSync, getUserChallenges} from '../utils/api'
import PropTypes from 'prop-types'
import Modal from './Modal'
import ChallengeSignUp from './ChallengeSignUp'
import TakeMoney from './StripeCheckout'
import moment from 'moment'
import styled from 'styled-components'
import {Icon, BannerTop, Banner, SmallerIcon, MainContainerWhite} from './Styles'

const Titleh1 = styled.h1`
  font-family: Oswald;
  letter-spacing: 1.5px;
  font-size: 40px;
  line-height: 50px;
  margin-bottom: 10px;
  color: black;
  font-weight: 400;
  color: #38618c;
`


const CurrentChallenges = ({userChallenges})=> {
  return (
    <div className='current-challenges' style={{paddingBottom:'30px', borderBottom:'1px solid #f3f3f3', padding:'20px'}}>
      <h1 style={{fontFamily:'Oswald', fontSize:'20px', fontWeight:'100', letterSpacing:'2px'}}>CURRENT CHALLENGES</h1>

      {userChallenges.map((challenge)=>{
        var today = moment();
        var diffBetweenStartAndToday = moment(challenge.start_date).diff(today, "hours");

        return (
          <div key={challenge.id} className='challenge-data' style={{width:'85%', borderRadius:'6px', margin:'15px auto', boxShadow:'0px 2px 5px 2px rgba(0, 0, 0, 0.2)'}}>
            {/* <Banner style={{height:'30px', borderRadius:'2px', border:'none'}}></Banner> */}
            <div className='challenge-top' style={{borderBottom:'2px solid #f3f3f3', display:'flex'}}>

              <div className='challenge-top-left' style={{padding:'15px', width:'70%', borderRight: '2px dotted #f3f3f3', display:'flex', alignItems:'center'}}>
                <Icon src='./app/images/icon trophy.png' style={{marginRight:'15px'}}/>
                <div className='challengeNameInfo'>
                  <h2 style={{fontFamily:'Raleway', fontSize:'15px'}}>{challenge.challenge_val}</h2>
                    {diffBetweenStartAndToday > 0 ? <h2 style={{color:'#ff951c', fontSize:'12px'}}>Starts in {diffBetweenStartAndToday} Hours</h2> : <h2 style={{color:'#ff951c', fontSize:'12px'}}>Active - Ends {moment(challenge.end_date).format("MMM Do, YYYY")}</h2>}
                </div>
              </div>
              <div className='challenge-top-right' style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'30%', textAlign:'center'}}>
                <h2 style={{fontFamily:'Oswald', fontSize:'25px', lineHeight:'40px', color:'#37ce46'}}>${challenge.bet_val}</h2>
                <h2 style={{fontFamily:'Raleway', fontSize:'12px', fontWeight:'bold'}}>Bet Per Day</h2>
              </div>
            </div>
            <div className='challenge-bottom' style={{display:'flex', padding:'15px', justifyContent:'space-around', textAlign:'center'}}>
              <div className='steps'>
                <SmallerIcon src={challenge.steps_on ? './app/images/icon steps.png': './app/images/icon steps disabled.png'}/>
                {challenge.steps_on ? <h2 style={{color:'#37ce46', fontSize:'12px'}}>{challenge.steps_val}</h2>
                  : <h2 style={{color:'gray', fontSize:'12px'}}>-</h2>}
                <h2 style={{fontSize:'12px', fontFamily:'Raleway'}}>Steps</h2>
              </div>
              <div>
                <SmallerIcon src={challenge.floors_on ? './app/images/icon stairs.png': './app/images/icon stairs disabled.png'}/>
                {challenge.floors_on ? <h2 style={{color:'#37ce46', fontSize:'12px'}}>{challenge.floors_val}</h2>
                  : <h2 style={{color:'gray', fontSize:'12px'}}>-</h2>}
                <h2 style={{fontSize:'12px', fontFamily:'Raleway'}}>Floors</h2>
              </div>
              <div>
                <SmallerIcon src={ challenge.distance_on ? './app/images/icon distance.png': './app/images/icon distance disabled.png'}/>
                {challenge.distance_on ? <h2 style={{color:'#37ce46', fontSize:'12px'}}>{challenge.distance_val}</h2>
                  : <h2 style={{color:'gray', fontSize:'12px'}}>-</h2>}
                <h2 style={{fontSize:'12px', fontFamily:'Raleway'}}>Miles</h2>
              </div>
              <div>
                <SmallerIcon src={challenge.calories_on ? './app/images/icon fire.png': './app/images/icon fire disabled.png'}/>
                {challenge.calories_on ? <h2 style={{color:'#37ce46', fontSize:'12px'}}>{challenge.calories_val}</h2>
                  : <h2 style={{color:'gray', fontSize:'12px'}}>-</h2>}
                <h2 style={{fontSize:'12px', fontFamily:'Raleway'}}>Calories</h2>
              </div>
              <div>
                <SmallerIcon src={challenge.minutes_on ? './app/images/icon active.png': './app/images/icon active disabled.png'}/>
                {challenge.minutes_on ? <h2 style={{color:'#37ce46', fontSize:'12px'}}>{challenge.minutes_val}</h2>
                  : <h2 style={{color:'gray', fontSize:'12px'}}>-</h2>}
                <h2 style={{fontSize:'12px', fontFamily:'Raleway'}}>Minutes</h2>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

CurrentChallenges.propTypes = {
  userChallenges: PropTypes.array.isRequired,
}

const LastSync = ({lastSync}) => {
  return (
    <div className='latest-sync' style={{paddingBottom:'30px', borderBottom:'1px solid #f3f3f3', padding:'20px'}}>
      <h1 style={{fontFamily:'Oswald', fontSize:'20px', fontWeight:'100', letterSpacing:'2px'}}>LAST SYNC</h1>
      <div className='sync-data' style={{width:'85%', borderRadius:'6px', margin:'15px auto', boxShadow:'0px 2px 5px 2px rgba(0, 0, 0, 0.2)'}}>
        <Banner style={{height:'30px', borderRadius:'2px', border:'none'}}></Banner>
        <div className='data' style={{display:'flex',justifyContent:'space-around', alignItems:'center', marginTop:'-20px', fontFamily:'Raleway', textAlign:'center', paddingBottom:'10px'}}>
          <div className='steps'>
            <Icon src='./app/images/icon steps.png'/>
            <h2 style={{color:'#ff951c'}}>{lastSync.summary_steps}</h2>
            <h2>Steps</h2>
          </div>
          <div>
            <Icon src='./app/images/icon stairs.png'/>
            <h2 style={{color:'#ff951c'}}>{lastSync.summary_floors}</h2>
            <h2>Floors</h2>
          </div>
          <div>
            <Icon src='./app/images/icon distance.png'/>
            <h2 style={{color:'#ff951c'}}>{Math.round(lastSync.summary_totalDistance * 100)/100 || null}</h2>
            <h2>Miles</h2>
          </div>
          <div>
            <Icon src='./app/images/icon fire.png'/>
            <h2 style={{color:'#ff951c'}}>{lastSync.summary_caloriesOut}</h2>
            <h2>Calories</h2>
          </div>
          <div>
            <Icon src='./app/images/icon active.png'/>
            <h2 style={{color:'#ff951c'}}>{lastSync.summary_activeMinutes}</h2>
            <h2>Minutes</h2>
          </div>
        </div>
        <div className='sync-date' style={{backgroundColor:'#F8F8F8', fontFamily:'Raleway', textAlign:'center', padding:'10px', borderRadius:'6px', color:'#35a7ff', fontWeight:'bold'}}>{moment(lastSync.date).format('MMMM Do YYYY')}</div>
      </div>
    </div>
  )
}

LastSync.proptypes = {
  lastSync: PropTypes.object.isRequired
}

const Namebar = ({profile, openModal}) => {
  return (
    <section className='name-bar' style={{height:'15%', borderBottom:'1px solid #f3f3f3', display:'flex', justifyContent:'space-between'}}>
      <div className='name-box'style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', marginLeft:'5%'}}>
        <Titleh1>{profile.fullname || 'John Wyatt'}</Titleh1>
        <p style={{fontFamily:'Raleway', letterSpacing:'2px', color:'#ff951c', fontSize:'20px'}}>Contender</p>
      </div>
      <div className='challenge-box' style={{marginRight:'5%', display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <button onClick={() => openModal()} style={{cursor:'pointer',border:'1px solid #3596ff', borderRadius:'3px', width:'150px', color:'white',background:'linear-gradient(#35a7ff, #38618C 150%)', padding:'10px', fontSize:'18px', letterSpacing:'1px', fontWeight:'bold'}}>Start New Challenge</button>
      </div>
    </section>
  )
}

Namebar.propTypes = {
  profile: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired
}

const ProfileInfo = ({profile}) => {
  return (
    <div style={{height:'100%', width:'100%'}}>
      <img src={profile.avatar150 ? profile.avatar150 : './app/images/penguin-avatar.jpeg'} style={{borderRadius:'100px', border:'2px solid #35a7ff', marginTop:'-90px'}}/>
      <div style={{marginTop:'25px'}}>
        {profile.stripe_connected ? null : <TakeMoney />}
      </div>
      <div className='stats' style={{display:'flex', justifyContent:'space-between', marginTop:'35px', borderBottom:'2px solid #f3f3f3', paddingBottom:'20px'}}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', marginRight:'10px'}}>
          <h2 style={{color:'#4A5153', fontWeight:'100', marginBottom:'10px', fontSize:'13px'}}>COMPLETED</h2>
          <h2 style={{color:'#35a7ff', fontSize:'23px', letterSpacing:'2px'}}>21</h2>
        </div>
        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', marginRight:'10px'}}>
          <h2 style={{color:'#4A5153', fontWeight:'100', marginBottom:'10px', fontSize:'13px'}}>CHAMPIONED</h2>
          <h2 style={{color:'#35a7ff', fontSize:'23px', letterSpacing:'2px'}}>5</h2>
        </div>
      </div>
      <div className='Earnings' style={{marginTop:'25px',display:'flex', flexDirection:'column', alignItems:'flex-start', borderBottom:'2px solid #f3f3f3', paddingBottom:'25px'}}>
        <h2 style={{color:'#4A5153', fontWeight:'100', marginBottom:'10px', fontSize:'13px'}}>EARNINGS</h2>
        <h2 style={{color:'#35a7ff', fontSize:'23px', letterSpacing:'2px'}}>$1,000</h2>
      </div>
    </div>
  )
}

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired
}

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      lastSync:'',
      isModalOpen: false,
      userChallenges: []
    }
    this.setNav = this.setNav.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  // Set up Navbar Links that will be sent to the App component to update Navbar. Called in Component Did Mount
  setNav () {
    var newNavs = {
      Profile: '/profile',
      Challenges: '/challenges'
    }
    this.props.updateNav(newNavs);
  }

  componentDidMount() {
    console.log(this.props)
    this.setNav();
    getProfile().then((profile)=>{
      console.log(123, profile)
      // Send profile info back to App component and update state there
      this.props.updateProfile(profile);
      //set state within this component
      this.setState(()=>{
        return {
          profile
        }
      })
      getUserChallenges()
        .then((challenges)=>{
          this.setState(()=>{
            return {
              userChallenges: challenges
            }
          })
        })
    })
    getLastSync().then((lastSync)=>{
      console.log(lastSync)
      this.setState(()=>{
        return {
          lastSync
        }
      })
    })
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
    getUserChallenges()
      .then((challenges)=>{
        this.setState(()=>{
          return {
            userChallenges: challenges
          }
        })
      })
  }

  render() {
    var profile = this.state.profile;
    var lastSync = this.state.lastSync;
console.log(this.state.userChallenges)


    return(
      <MainContainerWhite className='profile-container' >
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <ChallengeSignUp closeModal={this.closeModal}/>
        </Modal>
        <BannerTop/>
        <div className='lower-container' style={{height:'90%', width:'100%', display:'flex'}}>
          <div className='left-body' style={{width:'15%', minWidth:'150px',height:'100%',textAlign:'center', backgroundColor:'#F8F8F8', borderRight:'1px solid #f3f3f3', padding:'35px'}}>
            <ProfileInfo profile={this.state.profile}/>
          </div>
          <div className='right-body' style={{width:'85%'}}>
            <Namebar profile={this.state.profile} openModal={this.openModal}/>
            <div className='lower-right'style={{height:'85%', display:'flex'}}>
              <div className='lower-right-left' style={{height:'100%', width:'75%', minWidth:'450px', borderRight:'1px solid #f3f3f3', overflow:'scroll'}}>
                <LastSync lastSync={this.state.lastSync}/>
                <CurrentChallenges userChallenges={this.state.userChallenges}/>
              </div>
              <div className='lower-right-right' style={{height:'100%', width:'25%', minWidth:'200px', backgroundColor:'#F8F8F8'}}>

                <div className='box' style={{padding:'20px', display:'flex', flexDirection:'column', alignItems:'center'}}>
                  <h2 style={{fontFamily:'Raleway', color:'#4A5153', marginBottom:'15px'}}>STAY MOTIVATED</h2>
                  <img src='./app/images/watercolor splash black.png' style={{width:'200px', marginBottom:'15px'}}/>
                  <img src='./app/images/watercolor splash black.png' style={{width:'200px', marginBottom:'15px'}}/>
                </div>


              </div>
            </div>
          </div>
        </div>
      </MainContainerWhite>
    )
  }

}


export default Profile;
