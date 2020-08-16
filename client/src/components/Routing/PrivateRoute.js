import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({component: Component, auth, ...props}) => {
  return <Route {...props} render={()=> (auth.isLoading === false) && auth.isAuthenticated ? <Component {...props}/>: <Redirect to="/login"/>}/>
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)