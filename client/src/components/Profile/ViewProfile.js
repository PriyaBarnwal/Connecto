import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import Loader from '../Loader.js'
import { getProfileById, clearProfile } from '../../actions/profileActions'
import Portfolio from './Portfolio'

const ViewProfile = ({ getProfileById, clearProfile, profile: { profile }, computedMatch, match }) => {
  console.log(match)
  useEffect(() => {
    clearProfile()
    getProfileById(computedMatch.params.id)
  }, [getProfileById, computedMatch.params.id, clearProfile])

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
