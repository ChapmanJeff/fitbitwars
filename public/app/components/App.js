import React, {Component} from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import Profile from './Profile'
import Challenges from './Challenges'
import SingleChallenge from './SingleChallenge'
import styled from 'styled-components'


class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      navLinks: {Home: '/'},
      profileInfo: null,
    }

    this.changeNavLinks = this.changeNavLinks.bind(this);
    this.changeProfileInfo = this.changeProfileInfo.bind(this);
  }

  changeNavLinks (object) {
    this.setState(()=>{
      return {
        navLinks: object
      }
    })
  }

  changeProfileInfo (object) {
    this.setState(()=> {
      return {
        profileInfo: object
      }
    })
  }


  render() {
    return (
      <Router>
        <div className='container'>
          <Nav links={this.state.navLinks} profile={this.state.profileInfo}/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile' render={({match, location})=> <Profile
                  updateNav={this.changeNavLinks}
                  updateProfile={this.changeProfileInfo}
                  location={location}
                  match={match}/>} />
            <Route exact path='/challenges' render={({match, location})=> <Challenges
                  updateNav={this.changeNavLinks}
                  updateProfile={this.changeProfileInfo}
                  location={location}
                  match={match}/>} />
            <Route path='/challenges/challenge' render={({match, location})=> <SingleChallenge
                  location={location}
                  match={match}/>}/>
            <Route render={()=>(<p>Not Found</p>)} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
