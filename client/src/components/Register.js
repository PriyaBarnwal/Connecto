import React, {Fragment, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../actions/alertActions'
import { registerUser } from '../actions/authActions'

const Register = ({setAlert, registerUser, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  let { name, email, password, passwordConfirm } = formData

  let submitForm = (e) => {
    e.preventDefault()
    if(password!==passwordConfirm)
      setAlert('Passwords do not match!', 'danger')
    else
      registerUser(formData)
  }

  let onChange = e => setFormData({
    ...formData,
    [e.target.id]: e.target.value
  })

  if(isAuthenticated)
    return <Redirect to="/dashboard"/>

  return (
    <Fragment>
      <form className="container form-signup" onSubmit={e => submitForm(e)}>
        <div className="text-center mb-3">
          <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
          <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        </div>
        <div className="mb-3">
          <input type="text" id="name" value={name} className="form-control" placeholder="Enter Name" onChange={e=>onChange(e)}  autoFocus/>
        </div>
        <div className="mb-3">
          <input type="email" id="email" value={email} className="form-control" placeholder="Enter Email address" onChange={e=>onChange(e)} />
        </div>
        <div className="mb-3">
          <input type="password" id="password" value={password} className="form-control" placeholder="Enter Password" minLength="8" onChange={e=>onChange(e)} />
        </div>
        <div>
          <input type="password" id="passwordConfirm" value={passwordConfirm} className="form-control" placeholder="Confirm Password" onChange={e=>onChange(e)} minLength="8" />
        </div>
        <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">Sign up</button>
        <p className="my-1">Already a User? <Link to="/login">Login</Link> here</p>
      </form>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, registerUser})(Register)