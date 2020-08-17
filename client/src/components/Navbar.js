import React, {Fragment, useState} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../actions/authActions'
import {Spinner, Form, FormControl, Button} from 'react-bootstrap'

const Navbar = ({auth, signOut}) => {
  let [name, setName]= useState('')

  let authNav = (
    <ul className="navbar-nav">
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
    <ul className="navbar-nav">
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
        <Form onSubmit={(e)=> e.preventDefault()} inline className="mx-auto">
          <FormControl 
            type="text" 
            placeholder="Search for members.." 
            name={name} 
            value={name} 
            onChange={(e)=> setName(e.target.value)}
            className="mr-sm-2"
          />
          <Link to={{pathname: "/profiles", props: {'name': name}}}><Button variant="info" onClick={()=>setName('')}><i className="fas fa-search"></i></Button></Link>
        </Form>
        {auth.isLoading 
          ? <Spinner animation="border" role="status"></Spinner>
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