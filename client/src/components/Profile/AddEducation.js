import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { addEducation, editEducation } from '../../actions/profileActions'
import moment from 'moment'

const AddEducation = ({ editEducation, addEducation, action, closeModal, values}) => {
  const [formData, setFormData] = useState({
    school: values ? values.school : '',
    degree: values ? values.degree : '',
    subject: values ? values.subject : '',
    from: values ? moment(values.from).format("yyyy-MM-DD") : '',
    to: values && values.to ? moment(values.to).format("yyyy-MM-DD") : '',
    iscurrent: values ? (values.iscurrent==='true') : false,
    description: values ? values.description : ''
  })

  const { school, degree, subject, from, to, iscurrent, description } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <Fragment>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault()
          action=== 'Add' ? addEducation(formData) : editEducation(values._id, formData)
          closeModal()
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="School/College name"
            className="form-control"
            name="school"
            value={school}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="degree"
            name="degree"
            className="form-control"
            value={degree}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of study"
            name="subject"
            className="form-control"
            value={subject}
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
            currently studying here
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
            placeholder="Description"
            value={description}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-1">{action}</button>
      </form>
    </Fragment>
  )
}


export default connect(null, { addEducation, editEducation })(AddEducation)
