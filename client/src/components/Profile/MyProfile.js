import React, {useEffect, Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getMyProfile } from '../../actions/profileActions'
import Portfolio from './Portfolio'
import ProfileForm from './ProfileForm'

const MyProfile = ({auth, profile, getMyProfile, history}) => {
  useEffect(()=>{
    getMyProfile()
  }, [getMyProfile])

  let editProfile = () => {
    history.push('/editprofile')
  }
  return (
    <Fragment>
      {
      profile.loading
        ? null
        : profile.myprofile!== null
        ? <Portfolio profile={profile.myprofile} editProfile={() =>editProfile()}/>
        : <ProfileForm/>
      }
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, {getMyProfile})(withRouter(MyProfile))