import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../actions/authActions'

const Navbar = ({auth, signOut}) => {
  let authNav = (
    <ul className="ml-auto navbar-nav">
      <li className="nav-item active px-2">
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item px-2">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      <li className="nav-item px-2">
        <Link className="nav-link" to="/register">Register</Link>
      </li>
    </ul>
  )
  
  let dashboardNav = (
    <ul className="ml-auto navbar-nav">
      <li className="nav-item px-2">
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Hi {auth.user && auth.user.name}
        </a>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/myprofile">My Profile</Link>
          <a className="dropdown-item" href="#">Account</a>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" type="button" onClick={signOut}>Sign out</button>
        </div>
      </li>
    </ul>
  )

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="index.html">Connecto</a>
      <button className="navbar-toggler-right navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarId" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarId" >
        {auth.isLoading 
          ? null 
          : (
          <Fragment>
            {auth.isAuthenticated ? dashboardNav : authNav}
          </Fragment>)
        }
      </div>
    </nav>
  )
}

const mapStateToProps = (state)=> ({auth: state.auth})

export default connect(mapStateToProps, {signOut})(Navbar)