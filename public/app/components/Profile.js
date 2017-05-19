import React, {Component} from 'react'
import {getProfile} from '../utils/api'
import TakeMoney from './StripeCheckout'
import styled from 'styled-components'

const Banner = styled.section`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top ;
  background-image: url('./app/images/Portrait.jpg');
  height:10%;
  align-items: center;
  border-bottom:1px solid #cbc9cf;
`
const Titleh1 = styled.h1`
  font-family: Oswald;
  letter-spacing: 4.5px;
  font-size: 50px;
  line-height: 55px;
  margin-bottom: 10px;
  color: black;
  font-weight: 400;
`
const ProfileHeader = ({profile}) => {
  return (
    <div className='profile-container' style={{backgroundColor:'white', borderBottom:'2px solid white',height:'100%',width:'100%'}}>
      <Banner/>
      <div className='lower-container' style={{height:'90%', width:'100%', display:'flex'}}>
        <div className='left-body' style={{width:'20%',height:'100%',textAlign:'center', backgroundColor:'#FAFAFA', borderRight:'1px solid #f6f6f6'}}>
          <img src={profile.avatar150 ? profile.avatar150 : './app/images/penguin-avatar.jpeg'} style={{borderRadius:'100px', border:'1px solid white', marginTop:'-60px'}}/>
        </div>
        <div className='right-body' style={{width:'80%'}}>
          <section className='name-bar' style={{height:'15%', borderBottom:'1px solid #f6f6f6', display:'flex', justifyContent:'space-between'}}>
            <div className='name-box'style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', marginLeft:'5%'}}>
              <Titleh1>{profile.fullname || 'John Wyatt'}</Titleh1>
              <p style={{fontFamily:'Raleway', letterSpacing:'2px', color:'#CBC9CF', fontSize:'15px'}}>Contender</p>
            </div>
            <div className='challenge-box' style={{marginRight:'5%', display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <button style={{cursor:'pointer',border:'.2px solid #3596ff', borderRadius:'3px', width:'150px', color:'white',background:'linear-gradient(#35a7ff, #38618C)', padding:'9px', fontSize:'15px', letterSpacing:'1px'}}>New Challenge</button>
            </div>
          </section>
          <div className='lower-right'style={{height:'85%', display:'flex'}}>
            <div className='lower-right-left' style={{height:'100%', width:'70%', borderRight:'1px solid #f6f6f6'}}>
              <div className='latest-sync' style={{marginBottom:'30px',paddingBottom:'30px', borderBottom:'1px solid #f6f6f6'}}>
                <h1 style={{fontFamily:'Oswald', fontSize:'25px', fontWeight:'100', letterSpacing:'2px'}}>Last Sync</h1>
                <div className='sync-data' style={{width:'85%', borderRadius:'6px', marginLeft:'50px', marginTop:'20px', boxShadow:'0px 2px 5px 2px rgba(0, 0, 0, 0.2)'}}>
                  <Banner style={{height:'30px', borderRadius:'2px', border:'none'}}></Banner>
                  <div className='data' style={{display:'flex',justifyContent:'space-around', alignItems:'center', marginTop:'-20px', fontFamily:'Raleway', textAlign:'center', paddingBottom:'10px'}}>
                    <div className='steps'>
                      <img src='./app/images/icon steps.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>10,000</h2>
                      <h2>Steps</h2>
                    </div>
                    <div>
                      <img src='./app/images/icon stairs.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>10,000</h2>
                      <h2>Floors</h2>
                    </div>
                    <div>
                      <img src='./app/images/icon distance.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>3.5</h2>
                      <h2>Miles</h2>
                    </div>
                    <div>
                      <img src='./app/images/icon fire.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>2500</h2>
                      <h2>Calories</h2>
                    </div>
                    <div>
                      <img src='./app/images/icon active.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>95</h2>
                      <h2>Minutes</h2>
                    </div>
                  </div>
                  <div className='sync-date' style={{backgroundColor:'#FAFAFA', fontFamily:'Raleway', textAlign:'center', padding:'10px', borderRadius:'6px'}}>May 5, 2017</div>
                </div>
              </div>

              <div className='latest-sync' style={{marginBottom:'30px',paddingBottom:'30px', borderBottom:'1px solid #f6f6f6'}}>
                <h1 style={{fontFamily:'Oswald', fontSize:'25px', fontWeight:'100', letterSpacing:'2px'}}>Last Sync</h1>
                <div className='sync-data' style={{width:'85%', borderRadius:'6px', marginLeft:'50px', marginTop:'20px', boxShadow:'0px 2px 5px 2px rgba(0, 0, 0, 0.2)'}}>
                  <Banner style={{height:'30px', borderRadius:'2px', border:'none'}}></Banner>
                  <div className='data' style={{display:'flex',justifyContent:'space-around', alignItems:'center', marginTop:'-20px', fontFamily:'Raleway', textAlign:'center', paddingBottom:'10px'}}>
                    <div className='steps'>
                      <img src='./app/images/icon steps.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>10,000</h2>
                      <h2>Steps</h2>
                    </div>
                    <div>
                      <img src='./app/images/icon stairs.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>10,000</h2>
                      <h2>Floors</h2>
                    </div>
                    <div>
                      <img src='./app/images/icon distance.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>3.5</h2>
                      <h2>Miles</h2>
                    </div>
                    <div>
                      <img src='./app/images/icon fire.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>2500</h2>
                      <h2>Calories</h2>
                    </div>
                    <div>
                      <img src='./app/images/icon active.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>95</h2>
                      <h2>Minutes</h2>
                    </div>
                  </div>
                  <div className='sync-date' style={{backgroundColor:'#FAFAFA', fontFamily:'Raleway', textAlign:'center', padding:'10px', borderRadius:'6px'}}>May 5, 2017</div>
                </div>
              </div>

              {/* ***************DELETE THIS************* */}
              <div className='latest-sync' style={{marginBottom:'30px',paddingBottom:'30px', borderBottom:'1px solid #f6f6f6'}}>
                <h1 style={{fontFamily:'Oswald', fontSize:'25px', fontWeight:'100', letterSpacing:'2px'}}>Last Sync</h1>
                <div className='sync-data' style={{width:'85%', borderRadius:'6px', marginLeft:'50px', marginTop:'20px', boxShadow:'0px 2px 5px 2px rgba(0, 0, 0, 0.2)'}}>
                  <Banner style={{height:'30px', borderRadius:'2px', border:'none'}}></Banner>
                  <div className='data' style={{display:'flex',justifyContent:'space-around', alignItems:'center', marginTop:'-20px', fontFamily:'Raleway', textAlign:'center', paddingBottom:'10px'}}>
                    <div className='steps'>
                      <img src='./app/images/icon steps.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>10,000</h2>
                      <h2>Steps</h2>
                    </div>
                    <div>
                      <img src='./app/images/icon stairs.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>10,000</h2>
                      <h2>Floors</h2>
                    </div>
                    <div>
                      <img src='./app/images/icon distance.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>3.5</h2>
                      <h2>Miles</h2>
                    </div>
                    <div>
                      <img src='./app/images/icon fire.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>2500</h2>
                      <h2>Calories</h2>
                    </div>
                    <div>
                      <img src='./app/images/icon active.png' style={{heigh:'50px', width:'50px'}}/>
                      <h2>95</h2>
                      <h2>Minutes</h2>
                    </div>
                  </div>
                  <div className='sync-date' style={{backgroundColor:'#FAFAFA', fontFamily:'Raleway', textAlign:'center', padding:'10px', borderRadius:'6px'}}>May 5, 2017</div>
                </div>
              </div>
              {/* *************DELETE ABOVE****************** */}
              
            </div>
            <div className='lower-right-right' style={{height:'100%', width:'30%', backgroundColor:'#FAFAFA'}}>
              <div className='box' style={{padding:'20px', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <h2 style={{fontFamily:'Raleway', color:'#4A5153', marginBottom:'15px'}}>STAY MOTIVATED</h2>
                <img src='./app/images/watercolor splash.png' style={{width:'200px', marginBottom:'15px'}}/>
                <img src='./app/images/watercolor splash.png' style={{width:'200px', marginBottom:'15px'}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: ''
    }
    this.setNav = this.setNav.bind(this)
  }

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
      this.props.updateProfile(profile);
      this.setState(()=>{
        return {
          profile
        }
      })
    })
  }

  render() {
    return(
      <ProfileHeader profile={this.state.profile}/>
    )
  }

}




export default Profile;
