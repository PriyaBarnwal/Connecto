import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import { setAlert } from '../actions/alertActions'
import { registerUser } from '../actions/authActions'
import logo from '../img/logo.png'

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
    <section className="back-page">
      <Container className="loginform-container">
        <form className="form-signup" onSubmit={e => submitForm(e)}>
          <div className="text-center mb-3">
            <img className="mb-4" src={logo} alt="logo" height="90"/> 
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
          <button className="btn btn-lg btn-info btn-block mt-3" type="submit">Sign up</button>
          <p className="my-1">Already a User? <Link className="color-prime" to="/login">Login</Link> here</p>
        </form>
      </Container>
    </section>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, registerUser})(Register)