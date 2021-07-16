import React from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'

function NavBar({ isAuthenticated, signOut }) {
  const handleLogout = () => {
    localStorage.removeItem('x-auth-token')
    signOut()
  }

  return (
    <div>
      <Navbar color='dark' dark expand='lg'>
        <Container>
          <NavbarBrand href='/'>MERN</NavbarBrand>
          {isAuthenticated === true ? (
            <>
              {' '}
              <Nav className='mr-auto' navbar>
                <NavItem>
                  <LinkContainer to='#' onClick={handleLogout}>
                    <NavLink>Logout</NavLink>
                  </LinkContainer>
                </NavItem>
              </Nav>
            </>
          ) : (
            <>
              <Nav className='mr-auto' navbar>
                <NavItem>
                  <LinkContainer to='/login'>
                    <NavLink>Login</NavLink>
                  </LinkContainer>
                </NavItem>
                <NavItem>
                  <LinkContainer to='/register'>
                    <NavLink>Register</NavLink>
                  </LinkContainer>
                </NavItem>
                <NavItem>
                  <LinkContainer to='/users'>
                    <NavLink>Users</NavLink>
                  </LinkContainer>
                </NavItem>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar
