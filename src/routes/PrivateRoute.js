import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// render the route only if the admin is authenticated
// else redirect to homepage
export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...props
}) => (
  // render all the route props - as defined in AppRouter.js
  // render the component only if authenticated - else render redirect
  <Route
    {...props}
    component={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

// return boolean value - authenticated or not
const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
