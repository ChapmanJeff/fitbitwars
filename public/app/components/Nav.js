import React, {Component} from 'react'
import { NavLink, Link} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
`

const Li = styled.li`
  font-size: 20px;
  margin: 4px;
  padding: 1px;
`
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: grey;

  &:hover {
    font-weight: bold;
  }

  &.active {
    font-weight: bold;
    color: red;
  }
`
const StyledLink = styled.a`
  padding: 3px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin: 4px;
  font-weight: 500;
  color: #4A5153;
`
const Navbar = styled.nav`
  height: 50px;
  border-top: 1px solid #CBC9CF;
  border-bottom: 1px solid #CBC9CF;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  align-items: center;
`

const LoginOrOut = ({loggedIn}) => {
  return (
    <div>
      {loggedIn ? <StyledLink href='/auth/logout'>Logout</StyledLink> : <StyledLink href='/auth/fitbit'>Login</StyledLink>}
    </div>
  )
}


class Nav extends Component{
  constructor(props) {
    super(props);

    this.state= {
      loggedIn: true,
    }
  }

  componentDidMount() {
    axios.get('/api/isLoggedIn')
      .then((result)=>{
        console.log(result)
        this.setState(()=>{
          return {
            loggedIn: result.data.loggedIn
          }
        })
      })
  }


  render (){
    return (
      <Navbar>
        <Ul>
          <Li>
            <StyledNavLink exact to='/'>
            Home
          </StyledNavLink>
          </Li>
          <Li>
            <StyledNavLink to='/profile'>
              Profile
            </StyledNavLink>
          </Li>
        </Ul>
        <LoginOrOut loggedIn={this.state.loggedIn}/>
      </Navbar>
    )
  }
}

export default Nav;
