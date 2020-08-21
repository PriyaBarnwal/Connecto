import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import { Container } from 'react-bootstrap'
import logo from '../img/logo.png'

const Login = ({isAuthenticated, login}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  let { email, password } = formData

  let submitForm = (e) => {
    e.preventDefault()
    login(formData)
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
        <form className="form-signup" onSubmit ={e=>submitForm(e)}>
          <div className="text-center mb-3">
            <img className="mb-4" src={logo} alt="logo" height="90"/>
            <p className="lead"><i className="fas fa-user"></i> Sign in to Your Account</p>
          </div>
          <div className="mb-3">
            <input type="email" id="email" value={email} className="form-control" placeholder="Email address" onChange={e=>onChange(e)} required autoFocus/>
          </div>
          <div>
            <input type="password" id="password" value={password} className="form-control" placeholder="Password" onChange={e=>onChange(e)} required/>
          </div>
          <button className="btn btn-lg btn-info btn-block mt-3" type="submit">Sign in</button>
          <p className="my-1">Don't have an account? <Link to="/register" className="color-prime">Register</Link> here</p>
        </form>
      </Container>
    </section>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login)