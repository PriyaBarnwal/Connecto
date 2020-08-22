import React, {useEffect, Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getMyProfile, setLoading } from '../../actions/profileActions'
import Loader from '../Loader.js'
import Portfolio from './Portfolio'
import ProfileForm from './ProfileForm'

const MyProfile = ({auth, profile, getMyProfile, history, setLoading}) => {
  useEffect(()=>{
    setLoading(true)
    
    getMyProfile()
  }, [getMyProfile, setLoading])

  let editProfile = () => {
    history.push('/editprofile')
  }
  return (
    <Fragment>
      {
      profile.loading
        ? <Loader/>
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

export default connect(mapStateToProps, {getMyProfile, setLoading})(withRouter(MyProfile))