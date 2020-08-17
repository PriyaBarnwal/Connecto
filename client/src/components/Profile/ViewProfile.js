import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import {Spinner} from 'react-bootstrap'
import { getProfileById, clearProfile } from '../../actions/profileActions'
import Portfolio from './Portfolio'

const ViewProfile = ({ getProfileById, clearProfile, profile: { profile }, match }) => {
  console.log(match)
  useEffect(() => {
    clearProfile()
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id, clearProfile])

  return (
    <Fragment>
      {profile === null ? (
        <Spinner  animation="border" role="status"/>
      ) : (
        <Fragment>
          <Portfolio profile={profile}/>
        </Fragment>
      )}
    </Fragment>
  )
}


const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileById, clearProfile })(ViewProfile)
