import React, { Fragment, useState, useEffect } from 'react'
import {Modal} from 'react-bootstrap'
import { connect } from 'react-redux'
import { Formik, Form, ErrorMessage, FastField } from 'formik'
import * as Yup from 'yup'
import Moment from 'react-moment'
import { createProfile, updateProfile, getMyProfile, removeEducation, removeExperience } from '../../actions/profileActions'
import AddExperience from './AddExperience'
import AddEducation from './AddEducation'

const ProfileForm = ({
  profile: {myprofile, loading},
  createProfile,
  updateProfile,
  getMyProfile,
  removeEducation,
  removeExperience
}) => {
  const [isExpAddModalOpen, toggleExpAddModal] = useState(false)
  const [isEduAddModalOpen, toggleEduAddModal] = useState(false)
  const [isExpEditModalOpen, toggleExpEditModal] = useState(false)
  const [isEduEditModalOpen, toggleEduEditModal] = useState(false)
  const [id, setId] = useState(null)

  let initialState = {
    company: '',
    bio: '',
    location: '',
    role: '',
    skills: '',
    github: '',
    twitter: '',
    facebook: '',
    linkedIn: '',
    youtube: '',
    hobbies: ''
  }

  const [initialValues, setFormData] = useState(initialState)

  const validationSchema = Yup.object({
    company: Yup.string().required('Required!'),
    bio: Yup.string().required('Required!').max(200, 'you cannot exceed 200 characters'),
    role: Yup.string().required('Required!'),
    location: Yup.string().required('Required!'),
    skills: Yup.string().required('Required!'),
    hobbies: Yup.string().required('Required!'),
  })

  useEffect(() => {
    if (!myprofile) getMyProfile()
    if (!loading && myprofile) {
      const profileData = { ...initialValues }
      for (const key in myprofile) {
        if (key in profileData) profileData[key] = myprofile[key]
      }
      for (const key in myprofile.social) {
        if (key in profileData) profileData[key] = myprofile.social[key]
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ')
      if (Array.isArray(profileData.hobbies))
        profileData.hobbies = profileData.hobbies.join(', ')
      setFormData(profileData)
    }
  }, [loading, getMyProfile, myprofile])

  const onSubmit = (values) => {
    myprofile ? updateProfile(values) :createProfile(values)
  }

  const Expmodal = (action, values)=>{
    return(
      ((values && id === values._id) || !values)? (
        <Modal
        key ={id || 0}
        show={values ? isExpEditModalOpen : isExpAddModalOpen}
        onHide={()=> {
          if(values) { 
            setId(null)
            toggleExpEditModal(!isExpEditModalOpen)
          } else
         toggleExpAddModal(!isExpAddModalOpen)}}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{action} Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddExperience action={action} closeModal={()=> values ? toggleExpEditModal(!isExpEditModalOpen) : toggleExpAddModal(!isExpAddModalOpen)} values={values}/>
        </Modal.Body>
      </Modal>
      ): null)  
    }

  const Edumodal = (action, values)=>{
    return(
      ((values && id === values._id) || !values)? (
        <Modal
        key ={id || 0}
        show={values ? isEduEditModalOpen : isEduAddModalOpen}
        onHide={()=> {
          if(values) { 
            setId(null)
            toggleEduEditModal(!isEduEditModalOpen)
          } else
         toggleEduAddModal(!isEduAddModalOpen)}}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{action} Education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddEducation action={action} closeModal={()=> values ? toggleEduEditModal(!isEduEditModalOpen) : toggleEduAddModal(!isEduAddModalOpen)} values={values}/>
        </Modal.Body>
      </Modal>
      ): null)  
    }

  const experiences = myprofile && myprofile.experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
        {exp.to ? (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        ) : (
          ' Now'
        )}
      </td>
      <td>
      <button
          onClick={() => {
            setId(exp._id)
            toggleExpEditModal(!isExpEditModalOpen)
          }}
          className="btn btn-info"
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        {Expmodal('Update', exp)}
        <button
          onClick={() => removeExperience(exp._id)}
          className="btn btn-danger"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  ))

  const educations = myprofile && myprofile.education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
        {edu.to ? (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        ) : (
          ' Now'
        )}
      </td>
      <td>
      <button
          onClick={() => {
            setId(edu._id)
            toggleEduEditModal(!isEduEditModalOpen)
          }}
          className="btn btn-info"
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        {Edumodal('Update', edu)}
        <button
          onClick={() => removeEducation(edu._id)}
          className="btn btn-danger"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  ))

  return (
    <Fragment>
      <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form className="form container form-container">
          <div className="form-group">
            <label htmlFor="bio">Bio<sup>*</sup></label>
            <FastField as="textarea" className="form-control" name="bio" id="bio"/>
            <div className="text-error"><ErrorMessage className="text-error" name='bio'/></div>
          </div>
          <label htmlFor="" className="form-label">Current job status<sup>*</sup></label>
          <div className="form-row form-group">
            <div className="col">
              <FastField 
                type="text" 
                name="role" 
                className="form-control"
                placeholder="Enter your current role"
              />
              <div className="text-error"><ErrorMessage className="text-error" name='role'/></div>
            </div>
            <div className="col">
              <FastField type="text" 
                placeholder="Enter your Current Company"
                name="company"
                className="form-control"
              />
              <div  className="text-error"><ErrorMessage className="text-error" name='company'/></div>
            </div>
            <div className="col">
              <FastField
                type="text"
                placeholder="Your location"
                name="location"
                className="form-control"
              />
              <div  className="text-error"><ErrorMessage className="text-error" name='location'/></div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="skills" className="form-label">Skills<sup>*</sup> (Please use comma separated values)</label>
            <FastField
              className="form-control"
              type="text"
              placeholder="eg. HTML,CSS,JavaScript,PHP"
              name="skills"
            />
            <div className="text-error"><ErrorMessage className="text-error" name='skills'/></div>
          </div>
          <div className="form-group">
            <label htmlFor="hobbies" className="form-label">Hobbies<sup>*</sup> (Please use comma separated values)</label>
            <FastField
              className="form-control"
              type="text"
              placeholder="eg. sketching,reading"
              name="hobbies"
            />
            <div className="text-error"><ErrorMessage className="text-error" name='hobbies'/></div>
          </div>
          <label htmlFor="" className="form-label mt-2">Social Links (optional)</label>
          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x" />
            <FastField
              className="form-control"
              type="text"
              placeholder="Twitter URL"
              name="twitter"
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x" />
            <FastField
              className="form-control"
              type="text"
              placeholder="Facebook URL"
              name="facebook"
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x" />
            <FastField
              className="form-control"
              type="text"
              placeholder="YouTube URL"
              name="youtube"
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x" />
            <FastField
              className="form-control"
              type="text"
              placeholder="Linkedin URL"
              name="linkedIn"
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-github fa-2x text-white"/>
            <FastField
              className="form-control"
              type="text"
              placeholder="Github profile URL"
              name="github"
            />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
        </Form>
      </Formik>
      <div className="container form-container">
        <div className="d-flex">
          <h2 className="my-2">Experience </h2>
          <button
            type="button"
            onClick={() => toggleExpAddModal(!isExpAddModalOpen)}
            className="btn btn-secondary m-2"
          >
            <i className="fas fa-plus"></i>
          </button>
          {isExpAddModalOpen? Expmodal('Add') : null}
        </div>
        {myprofile && myprofile.experience.length> 0 ?
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
        : <div>No experience to show.</div>}
      </div>
      <div className="container form-container">
        <div className="d-flex">
          <h2 className="my-2">Education </h2>
          <button
            type="button"
            onClick={() => toggleEduAddModal(!isEduAddModalOpen)}
            className="btn btn-secondary m-2"
          >
            <i className="fas fa-plus"></i>
          </button>
          {isEduAddModalOpen? Edumodal('Add') : null}
        </div>
        {myprofile && myprofile.education.length> 0 ?
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
        : <div>No education to show.</div>}
      </div>
    </Fragment>
    
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { createProfile, updateProfile, getMyProfile, removeExperience, removeEducation })(
  ProfileForm
)
