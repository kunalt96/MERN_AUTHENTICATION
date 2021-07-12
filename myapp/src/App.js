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

function App() {
  const [isAuthenticated, setAuthentication] = useState(false)

  function authenticate() {
    setAuthentication(true)
  }

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
              authenticate={authenticate}
            />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <PrivateRoute isAuthenticated={isAuthenticated} exact path='/users'>
            <UsersDetails />
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
