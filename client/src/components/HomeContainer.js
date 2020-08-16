import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const HomeContainer = (auth) => {
  if(auth.isAuthenticated) 
    return <Redirect to='/dashboard'/>

  return (
    <section>
      <p>Welcome to Connecto</p>
      <p>A community where you can connect with other developers, share posts and also create your portfolio.</p>
      <div className="btn-group" role="group">
        <Link to="/register" className="btn btn-outline-secondary btn-lg" role="button" >Sign up</Link>
        <Link to="/login" className="btn btn-outline-secondary btn-lg" role="button">Login</Link>
      </div>
    </section>
  )
}

const mapStateToProps = state =>({
  auth: state.auth
})
export default connect(mapStateToProps)(HomeContainer)