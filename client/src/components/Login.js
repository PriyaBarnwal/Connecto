import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Formik, Form, ErrorMessage, FastField} from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import { Container } from 'react-bootstrap'
import logo from '../img/logo.png'
import Fade from 'react-reveal/Zoom'

const Login = ({isAuthenticated, login}) => {
  const initialValues ={
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('email is required!'),
    password: Yup.string().required('password is required!')
  })

  let submitForm = (values, submitProps) => {
    login(values).then(()=> {
      submitProps.setSubmitting(false)
    })
  }

  if(isAuthenticated)
    return <Redirect to="/dashboard"/>
    
  return (
    <section className="back-page">
      <Fade Zoom>
      <Container className="loginform-container">
        <Formik
          initialValues = {initialValues}
          validationSchema = {validationSchema}
          onSubmit = {submitForm}
        >
          {formik => {
            return (<Form className="form-signup">
              <div className="text-center mb-3">
                <img className="mb-4" src={logo} alt="logo" height="90"/>
                <p className="lead"><i className="fas fa-user"></i> Sign in to Your Account</p>
              </div>
              <div className='mb-3'>
                <FastField type='email' id='email' className='form-control' name='email' placeholder="Email address"/>
                <div  className="text-error"><ErrorMessage className="text-error" name='email'/></div>
              </div>
              <div>
                <FastField type='password' id='password' className='form-control' name='password' placeholder="Password"/>
                <div  className="text-error"><ErrorMessage name='password'/></div>
              </div>
              <button className="btn btn-lg btn-info btn-block mt-3" type="submit" disabled={formik.isSubmitting}>Sign in</button>
              <p className="my-1">Don't have an account? <Link to="/register" className="color-prime">Register</Link> here</p>
            </Form>)
          }}
        </Formik>
      </Container>
      </Fade>
    </section>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login)