import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import UserContext from '../user-context'

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useContext(UserContext)
  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated === true ? children : <Redirect to='/login' />
      }}
    />
  )
}

export default PrivateRoute
