import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Formik, Form, ErrorMessage, FastField} from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import { registerUser } from '../actions/authActions'
import logo from '../img/logo.png'
import Fade from 'react-reveal/Zoom'

const Register = ({registerUser, isAuthenticated}) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required!'),
    email: Yup.string().email('Invalid email format').required('email is required!'),
    password: Yup.string()
      .required('password is required!')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
        'Password should have atleast a lowercase, an uppercase and a number'
      ),
    passwordConfirm: Yup.string().required('Confirm your password!').oneOf([Yup.ref('password'), ''], 'passwords do not match')
  })

  let submitForm = (values, submitProps) => {
    registerUser(values)
      .then(() => submitProps.setSubmitting(false))
  }

  if(isAuthenticated)
    return <Redirect to="/dashboard"/>

  return (
    <section className="back-page">
      <Fade Zoom>
      <Container className="loginform-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {formik => {
            return (
              <Form className="form-signup">
                <div className="text-center mb-3">
                  <img className="mb-4" src={logo} alt="logo" height="90"/> 
                  <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                </div>
                <div className="mb-3">
                  <FastField type="text" id="name" name="name" className="form-control" placeholder="Enter Name"/>
                  <div className="text-error"><ErrorMessage name='name'/></div>
                </div>
                <div className="mb-3">
                  <FastField type="email" id="email" name="email" className="form-control" placeholder="Enter Email address"/>
                  <div className="text-error"><ErrorMessage name='email'/></div>
                </div>
                <div className="mb-3">
                  <FastField type="password" id="password" name="password" className="form-control" placeholder="Enter Password"/>
                  <div className="text-error"><ErrorMessage name='password'/></div>
                </div>
                <div>
                  <FastField type="password" id="passwordConfirm" name="passwordConfirm" className="form-control" placeholder="Confirm Password"/>
                  <div className="text-error"><ErrorMessage name='passwordConfirm'/></div>
                </div>
                <button className="btn btn-lg btn-info btn-block mt-3" type="submit" disabled={formik.isSubmitting}>Sign up</button>
                <p className="my-1">Already a User? <Link className="color-prime" to="/login">Login</Link> here</p>
              </Form>
            )
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

export default connect(mapStateToProps, {registerUser})(Register)