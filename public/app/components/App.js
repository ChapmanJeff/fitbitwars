import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import Profile from './Profile'
import styled from 'styled-components'

const MainWrap = styled.section`
  width: 100%;
  height: 100%;
`

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile}/>
            <Route render={()=>(<p>Not Found</p>)} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
