import React, {Component} from 'react'
import { NavLink, Link} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import PropTypes from 'prop-types'

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
`

const Li = styled.li`
  font-size: 25px;
  margin: 4px;
  padding: 1px;
  margin-right: 15px;
`
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #4A5153;
  font-weight: 100;

  &.active {
    font-weight: 400;
    color: #38618C;
  }
`
const StyledLink = styled.a`
  padding: 3px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  margin: 4px;
  font-weight: 100;
  color: #4A5153;
  font
`
const Navbar = styled.nav`
  height: 50px;
  border-top: 1px solid #CBC9CF;
  border-bottom: 1px solid #CBC9CF;
  display: flex;
  justify-content: space-between;
  padding: 5px 25px;
  align-items: center;
  background: white;
`

const MainLinks = ({pageLinks}) => {
  console.log(1122223333444,pageLinks)
  return (
    <Ul>
      <Li style={{fontFamily:'Oswald', letterSpacing: 1.5}}>FITBIT WARS</Li>
      {Object.keys(pageLinks).map((key)=>{
        if (key === 'Home') {
          return <Li key={key}>
            <StyledNavLink exact to={pageLinks[key]}>
              {key}
            </StyledNavLink>
          </Li>
        }
        return <Li key={key}>
          <StyledNavLink to={pageLinks[key]}>
            {key}
          </StyledNavLink>
        </Li>
      })}
      {/* <Li>
        <StyledNavLink exact to='/'>
        Home
        </StyledNavLink>
      </Li>
      <Li>
        <StyledNavLink to='/profile'>
          Profile
        </StyledNavLink>
      </Li> */}
    </Ul>
  )
}

MainLinks.propTypes = {
  pageLinks: PropTypes.object.isRequired,
}

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
    console.log('TESTTTONG',this.props.links)
    return (
      <Navbar>
        <MainLinks pageLinks={this.props.links}/>
        <LoginOrOut loggedIn={this.state.loggedIn}/>
      </Navbar>
    )
  }
}

export default Nav;

Nav.propTypes = {
  links: PropTypes.object.isRequired,
}
