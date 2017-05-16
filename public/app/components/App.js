import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import Profile from './Profile'
import styled from 'styled-components'


class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      navLinks: {Home: '/', Profile:'/profile'},
    }

    this.changeNavLinks = this.changeNavLinks.bind(this);
  }

  changeNavLinks (object) {
    this.setState(()=>{
      return {
        navLinks: object
      }
    })
  }



  render() {
    return (
      <Router>
        <div className='container'>
          <Nav links={this.state.navLinks}/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile} />
            <Route render={()=>(<p>Not Found</p>)} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
