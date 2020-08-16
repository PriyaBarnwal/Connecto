import React, { Fragment, useState, useEffect } from 'react'
import {Modal} from 'react-bootstrap'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { createProfile, updateProfile, getMyProfile, removeEducation, removeExperience } from '../../actions/profileActions'
import AddExperience from './AddExperience'
import AddEducation from './AddEducation'

const initialState = {
  company: '',
  bio: '',
  location: '',
  role: '',
  skills: '',
  githubusername: '',
  twitter: '',
  facebook: '',
  linkedIn: '',
  youtube: '',
  hobbies: ''
}

const ProfileForm = ({
  profile: {myprofile, loading},
  createProfile,
  updateProfile,
  getMyProfile,
  removeEducation,
  removeExperience
}) => {
  const [formData, setFormData] = useState(initialState)

  const [isExpAddModalOpen, toggleExpAddModal] = useState(false)
  const [isEduAddModalOpen, toggleEduAddModal] = useState(false)
  const [isExpEditModalOpen, toggleExpEditModal] = useState(false)
  const [isEduEditModalOpen, toggleEduEditModal] = useState(false)
  const [id, setId] = useState(null)

  useEffect(() => {
    if (!myprofile) getMyProfile()
    if (!loading && myprofile) {
      const profileData = { ...initialState }
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

  const {
    company,
    location,
    role,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedIn,
    youtube,
    hobbies
  } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    myprofile ? updateProfile(formData) :createProfile(formData)
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
      <div className="container form-container">
        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <label for="bio" className="form-label">Bio<sup>*</sup></label>
            <textarea type="text" className="form-control" id="bio" name="bio" value={bio} onChange={onChange} required/>
          </div>
          <label for="" className="form-label">Current job status<sup>*</sup></label>
          <div className="form-row form-group">
            <div className="col">
              <input 
                type="text" 
                name="role" 
                className="form-control"
                value={role} 
                onChange={onChange} 
                placeholder="Enter your current role" 
                required
              />
            </div>
            <div className="col">
              <input type="text" 
                placeholder="Enter your Current Company"
                name="company"
                className="form-control"
                value={company}
                onChange={onChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                placeholder="Your location"
                name="location"
                className="form-control"
                value={location}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
              <label for="skills" className="form-label">Skills<sup>*</sup> (Please use comma separated values)</label>
              <input
                className="form-control"
                type="text"
                placeholder="eg. HTML,CSS,JavaScript,PHP"
                name="skills"
                value={skills}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label for="hobbies" className="form-label">Hobbies<sup>*</sup> (Please use comma separated values)</label>
              <input
                className="form-control"
                type="text"
                placeholder="eg. sketching,reading"
                name="hobbies"
                value={hobbies}
                onChange={onChange}
              />
            </div>
            <label for="" className="form-label mt-2">Social Links (optional)</label>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                className="form-control"
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                className="form-control"
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                className="form-control"
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                className="form-control"
                type="text"
                placeholder="Linkedin URL"
                name="linkedIn"
                value={linkedIn}
                onChange={onChange}
              />
            </div>
        <input type="submit" className="btn btn-primary my-1" />
      </form>
      </div>
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
      
      {myprofile && myprofile.experience.length> 0
      ?
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
      </table>: <div>No experience to show.</div>}
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
      {myprofile && myprofile.education.length> 0
      ?
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
      : <div>No education to show.</div>
      }
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
