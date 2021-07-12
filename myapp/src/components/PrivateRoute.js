import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({ children, isAuthenticated, ...rest }) {
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
