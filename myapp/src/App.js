import React, { useState } from 'react'
import NavBar from './components/NavBar'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import UsersDetails from './components/UsersDetails'
import PrivateRoute from './components/PrivateRoute'
import setAuthToken from './setAuthToken'

let authToken = false

if (localStorage.getItem('x-auth-token')) {
  setAuthToken(localStorage.getItem('x-auth-token'))
  authToken = true
}

function App() {
  const [isAuthenticated, setAuthentication] = useState(authToken)
  const [verificationToken, setToken] = useState(
    localStorage.getItem('x-auth-token')?.length > 0
      ? localStorage.getItem('x-auth-token')
      : ''
  )

  function signOut() {
    setAuthentication(false)
  }

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} signOut={signOut} />
      <main className='my-color'>
        <Switch>
          <Route path='/login'>
            <Login
              isAuthenticated={isAuthenticated}
              setAuthentication={setAuthentication}
              setToken={setToken}
              verificationToken={verificationToken}
            />
          </Route>
          <Route exact path='/register'>
            <Register
              isAuthenticated={isAuthenticated}
              setAuthentication={setAuthentication}
              setToken={setToken}
              verificationToken={verificationToken}
            />
          </Route>
          <PrivateRoute isAuthenticated={isAuthenticated} exact path='/users'>
            <UsersDetails
              isAuthenticated={isAuthenticated}
              verificationToken={verificationToken}
            />
          </PrivateRoute>
          <Route path='/'>
            <Redirect to='/login'></Redirect>
          </Route>
        </Switch>
      </main>
    </Router>
  )
}

export default App
