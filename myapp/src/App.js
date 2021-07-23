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
import UserContext from './user-context'
import PostsPagination from './components/PostPagination'
// import ThemeContext, { themes } from './theme-context'

let authToken = false

if (localStorage.getItem('x-auth-token')) {
  setAuthToken(localStorage.getItem('x-auth-token'))
  authToken = true
}

function App() {
  // const [theme, setTheme] = useState(themes.dark)
  const [isAuthenticated, setAuthentication] = useState(authToken)
  const [alert, showAlert] = useState({ message: null, variant: null })
  const [verificationToken, setToken] = useState(
    localStorage.getItem('x-auth-token')?.length > 0
      ? localStorage.getItem('x-auth-token')
      : ''
  )

  function signOut() {
    setAuthentication(false)
  }
  const removeAlert = () => {
    showAlert({ message: null, variant: null })
  }

  // const toggleTheme = () =>
  //   theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark)

  // return (
  //   <ThemeContext.Provider value={theme}>
  //     <button onClick={toggleTheme}>Theme</button>
  //     <Layout />
  //   </ThemeContext.Provider>
  // )
  return (
    <UserContext.Provider value={{ isAuthenticated, setAuthentication }}>
      <Router>
        <NavBar isAuthenticated={isAuthenticated} signOut={signOut} />
        <main className='my-color'>
          <Switch>
            <Route path='/login'>
              <Login
                setToken={setToken}
                verificationToken={verificationToken}
                alert={alert}
                showAlert={showAlert}
                removeAlert={removeAlert}
              />
            </Route>
            <Route exact path='/register'>
              <Register
                setToken={setToken}
                verificationToken={verificationToken}
                alert={alert}
                showAlert={showAlert}
                removeAlert={removeAlert}
              />
            </Route>
            <PrivateRoute exact path='/users'>
              <UsersDetails verificationToken={verificationToken} />
            </PrivateRoute>
            <PrivateRoute exact path='/posts'>
              <PostsPagination verificationToken={verificationToken} />
            </PrivateRoute>
            <Route path='/'>
              <Redirect to='/login'></Redirect>
            </Route>
          </Switch>
        </main>
      </Router>
    </UserContext.Provider>
  )
}

export default App
