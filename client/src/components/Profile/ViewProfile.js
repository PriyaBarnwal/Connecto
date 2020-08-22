import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import Loader from '../Loader.js'
import {Redirect} from 'react-router-dom'
import { getProfileById, clearProfile } from '../../actions/profileActions'
import Portfolio from './Portfolio'

const ViewProfile = ({ getProfileById, clearProfile, profile: { profile, error }, computedMatch, match }) => {
  useEffect(() => {
    clearProfile()
    getProfileById(computedMatch.params.id)
  }, [getProfileById, computedMatch.params.id, clearProfile])

  if(error.status === 404)
    return <Redirect to="/notFound"/>

  return (
    <Fragment>
      {profile === null ? (
        <Loader/>
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
