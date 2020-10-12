import React, {useContext}  from 'react'
import {UserContext} from './providers/userProvider';
import { Redirect, Route } from 'react-router-dom'
import {AuthService} from './services'

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const user = AuthService.isLoggedIn();


  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute;