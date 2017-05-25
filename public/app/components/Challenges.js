import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {getChallenges} from '../utils/api'
import moment from 'moment'
import styled from 'styled-components'
import {BannerTop, MainContainerWhite, Icon, SmallerIcon, DetailsLink} from './Styles'

const ChallengeLookup = ({challenges, updateSearchQuery, searchQuery}) => {
  var filterByName = (query) => {
    return challenges.filter((el)=>{
      return el.challenge_val.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
  }

  return (
    <div className='ChallengeLookup-container' style={{height:'100%', width:'100%', overflow:'scroll'}}>
      <BannerTop />
      <div className='challenge-filter' style={{display:'flex', justifyContent:'center', margin:'20px 0px'}}>
        <h2 style={{fontFamily:'Raleway', fontSize:'25px', marginRight:'30px'}}>Search Challenges</h2>
        <input type='text' value={searchQuery} onChange={event => updateSearchQuery(event)} placeholder='Name of Challenge' style={{width:'200px'}}/>
      </div>
      <div className='challengeResults' style={{display:'flex', flexWrap:'wrap', justifyContent:'center', overflow:'scroll'}}>
        {challenges.map((challenge)=> {
          <div className='challengeTile' style={{width:'20%', border:'2px solid black', padding:'15px'}}>
            <h1>Hi</h1>
          </div>
        })}

        {filterByName(searchQuery).map((challenge)=>{
          return (
            <div key={challenge.id} className='challenge-data' style={{width:'20%', borderRadius:'6px', boxShadow:'0px 2px 5px 2px rgba(0, 0, 0, 0.2)', padding:'15px', margin:'10px', minWidth:'270px'}}>
              {/* <Banner style={{height:'30px', borderRadius:'2px', border:'none'}}></Banner> */}
              <div className='challenge-top' style={{borderBottom:'2px solid #f3f3f3', display:'flex'}}>

                <div className='challenge-top-left' style={{padding:'15px', width:'70%', borderRight: '2px dotted #f3f3f3', display:'flex', alignItems:'center'}}>
                  <Icon src='./app/images/icon trophy.png' style={{marginRight:'15px'}}/>
                  <div className='challengeNameInfo'>
                    <h2 style={{fontFamily:'Raleway', fontSize:'15px'}}>{challenge.challenge_val}</h2>
                    <h2 style={{color:'#ff951c', fontSize:'12px'}}>{moment(challenge.start_date).format("MMM Do, YYYY")} - {moment(challenge.end_date).format("MMM Do, YYYY")}</h2>
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
                <div className='joinChallenge' style={{alignItems:'center', display:'flex', justifyContent:'center'}}>
                  <DetailsLink to={`/challenges/${challenge.challenge_id}/${challenge.challenge_val}`}>See Details</DetailsLink>
                </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

ChallengeLookup.propTypes = {
  challenges: PropTypes.array,
  searchQuery: PropTypes.string,
  updateSearchQuery: PropTypes.func.isRequired,
}

class Challenges extends Component {
  constructor (props) {
    super(props)

    this.state = {
      challenges: [],
      searchQuery: '',
    }

    this.setNav = this.setNav.bind(this);
    this.updateSearchQuery = this.updateSearchQuery.bind(this);
  }

  setNav () {
    var newNavs = {
      Profile: '/profile',
      Challenges: '/challenges'
    }
    this.props.updateNav(newNavs);
  }

  componentDidMount () {
    this.setNav();
    getChallenges()
      .then((challenges)=> {
        this.setState(()=>{
          return {
            challenges
          }
        })
      })
  }

  updateSearchQuery (event) {
    console.log(event.target.value)
    var query = event.target.value;

    this.setState(()=> {
      return {
        searchQuery: query
      }
    })
  }


  render() {
    return (
      <MainContainerWhite >
        <ChallengeLookup challenges={this.state.challenges} searchQuery ={this.state.searchQuery} updateSearchQuery={this.updateSearchQuery}/>
      </MainContainerWhite>
    )
  }
}

export default Challenges;
