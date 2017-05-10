import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

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


const Nav = () => {
  return (
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
  )
}

export default Nav;
