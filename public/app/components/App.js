import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import Profile from './Profile'

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
