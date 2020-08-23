import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {setAlert} from '../../actions/alertActions'
import Loader from '../Loader'

const PrivateRoute = ({component: Component, auth, setAlert, ...props}) => {
  if(auth.isLoading === false && !auth.isAuthenticated ) 
    setAlert('You need to login to visit that page', 'info')
    
  return (
    auth.isLoading
      ? <Loader/>
      :(
        <Route 
        {...props} 
        render={()=> 
          (auth.isLoading === false) && auth.isAuthenticated 
          ? <Component {...props}/>
          : <Redirect to="/login"/>}
        />
      )
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {setAlert})(PrivateRoute)