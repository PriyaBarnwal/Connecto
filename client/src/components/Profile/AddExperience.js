import React from 'react'
import { connect } from 'react-redux'
import { Formik, Form, ErrorMessage, FastField, Field } from 'formik'
import * as Yup from 'yup'
import { addExperience, editExperience } from '../../actions/profileActions'
import moment from 'moment'

const AddExperience = ({ editExperience, addExperience, action, closeModal, values:_values}) => {
  const initialValues = {
    company: _values ? _values.company : '',
    title: _values ? _values.title : '',
    location: _values ? _values.location : '',
    from: _values ? moment(_values.from).format("yyyy-MM-DD") : '',
    to: _values && _values.to ? moment(_values.to).format("yyyy-MM-DD") : '',
    iscurrent: _values ? (_values.iscurrent==='true') : false,
    description: _values ? _values.description : ''
  }

  const validationSchema = Yup.object({
    company: Yup.string().required('Required!'),
    title: Yup.string().required('Required!'),
    location: Yup.string().required('Required!'),
    from: Yup.date().required('Required!'),
    iscurrent: Yup.bool()
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        action=== 'Add' ? addExperience(values) : editExperience(_values._id, values)
        closeModal()
      }}
    >
      {formik => {
        return (
          <Form className="form">
            <div className="form-group">
              <FastField
                type="text"
                placeholder="Job Title"
                className="form-control"
                name="title"
              />
              <div className="text-error"><ErrorMessage name='title'/></div>
            </div>
            <div className="form-group">
              <FastField
                type="text"
                placeholder="Company"
                name="company"
                className="form-control"
              />
              <div className="text-error"><ErrorMessage name='company'/></div>
            </div>
            <div className="form-group">
              <FastField
                type="text"
                placeholder="Location"
                name="location"
                className="form-control"
              />
              <div className="text-error"><ErrorMessage name='location'/></div>
            </div>
            <div className="form-group">
              <h5>From Date</h5>
              <FastField type="date" name="from" className="form-control"/>
              <div className="text-error"><ErrorMessage name='from'/></div>
            </div>
            <div className="form-group">
              <p>
                <Field
                  type="checkbox"
                  name="iscurrent"
                  id="iscurrent"
                />{' '}
                Current Job
              </p>
            </div>
            <div className="form-group">
              <h5>To Date</h5>
              <Field
                className="form-control"
                type="date"
                name="to"
                disabled={formik.values.iscurrent}
              />
            </div>
            <div className="form-group">
              <FastField
                as="textarea"
                name="description"
                className="form-control"
                placeholder="Job Description"
              />
            </div>
            <button type="submit" className="btn btn-primary my-1">{action}</button>
          </Form>
        )
      }}
    </Formik>
  )
}


export default connect(null, { addExperience, editExperience })(AddExperience)
