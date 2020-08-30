import React from 'react'
import { connect } from 'react-redux'
import { Formik, Form, ErrorMessage, FastField, Field } from 'formik'
import * as Yup from 'yup'
import { addEducation, editEducation } from '../../actions/profileActions'
import moment from 'moment'

const AddEducation = ({ editEducation, addEducation, action, closeModal, values:_values}) => {
  const initialValues = {
    school: _values ? _values.school : '',
    degree: _values ? _values.degree : '',
    subject: _values ? _values.subject : '',
    from: _values ? moment(_values.from).format("yyyy-MM-DD") : '',
    to: _values && _values.to ? moment(_values.to).format("yyyy-MM-DD") : '',
    iscurrent: _values ? (_values.iscurrent==='true') : false,
    description: _values ? _values.description : ''
  }

  const validationSchema = Yup.object({
    school: Yup.string().required('Required!'),
    degree: Yup.string().required('Required!'),
    subject: Yup.string().required('Required!'),
    from: Yup.date().required('Required!'),
    iscurrent: Yup.bool()
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        action=== 'Add' ? addEducation(values) : editEducation(_values._id, values)
        closeModal()
      }}
      enableReinitialize
    >
      {formik => {
        return (
          <Form className="form">
            <div className="form-group">
              <FastField
                type="text"
                placeholder="School/College name"
                className="form-control"
                id="school"
                name="school"
              />
              <div className="text-error"><ErrorMessage name='school'/></div>
            </div>
            <div className="form-group">
              <FastField
                type="text"
                placeholder="degree"
                name="degree"
                id="degree"
                className="form-control"
              />
              <div className="text-error"><ErrorMessage name='degree'/></div>
            </div>
            <div className="form-group">
              <FastField
                type="text"
                placeholder="Field of study"
                id="subject"
                name="subject"
                className="form-control"
              />
              <div className="text-error"><ErrorMessage name='subject'/></div>
            </div>
            <div className="form-group">
              <h5>From Date</h5>
              <FastField type="date" name="from" id="from" className="form-control"/>
              <div className="text-error"><ErrorMessage name='from'/></div>
            </div>
            <div className="form-group">
              <p>
                <Field
                  type="checkbox"
                  name="iscurrent"
                  id="iscurrent"
                />{' '}
                currently studying here
              </p>
            </div>
            <div className="form-group">
              <h5>To Date</h5>
              <Field
                className="form-control"
                disabled={formik.values.iscurrent}
                type="date"
                name="to"
                id="to"
              />
            </div>
            <div className="form-group">
              <FastField
                as="textarea"
                name="description"
                className="form-control"
                placeholder="Description"
              />
            </div>
            <button type="submit" className="btn btn-primary my-1">{action}</button>
          </Form>

        )
      }}
    </Formik>
  )
}


export default connect(null, { addEducation, editEducation })(AddEducation)
