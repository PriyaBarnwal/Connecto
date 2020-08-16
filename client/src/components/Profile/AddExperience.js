import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { addExperience, editExperience } from '../../actions/profileActions'
import moment from 'moment'

const AddExperience = ({ editExperience, addExperience, action, closeModal, values}) => {
  const [formData, setFormData] = useState({
    company: values ? values.company : '',
    title: values ? values.title : '',
    location: values ? values.location : '',
    from: values ? moment(values.from).format("yyyy-MM-DD") : '',
    to: values && values.to ? moment(values.to).format("yyyy-MM-DD") : '',
    iscurrent: values ? (values.iscurrent==='true') : false,
    description: values ? values.description : ''
  })
  const { company, title, location, from, to, iscurrent, description } = formData

  const onChange = e =>{
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Fragment>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault()
          action=== 'Add' ? addExperience(formData) : editExperience(values._id, formData)
          closeModal()
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Job Title"
            className="form-control"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            className="form-control"
            value={company}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            className="form-control"
            value={location}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <h5>From Date</h5>
          <input type="date" name="from" value={from} onChange={onChange} className="form-control" required/>
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="iscurrent"
              checked={iscurrent}
              value={iscurrent}
              onChange={() => {
                setFormData({ ...formData, iscurrent: !iscurrent })
              }}
            />{' '}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h5>To Date</h5>
          <input
            className="form-control"
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            disabled={iscurrent}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            className="form-control"
            placeholder="Job Description"
            value={description}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-1">{action}</button>
      </form>
    </Fragment>
  )
}


export default connect(null, { addExperience, editExperience })(AddExperience)
