import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {getProfiles} from './../actions/profileActions'
import {Media, Image, Container} from 'react-bootstrap'
import Loader from './Loader.js'

const PeopleSearch = ({profile: {profiles, loading}, getProfiles, location}) => {
  useEffect(()=>{
    if(location.props && location.props.name)
      getProfiles(location.props.name)
    else
      getProfiles()
  }, [getProfiles, location.props])

  return (
    <Container>
      {loading 
        ? <Loader/>
        : (
          <ul className="list-unstyled profile-list">{
          profiles && profiles.length>0 
            ? profiles.map(profile => {
            return(
              <Media as="li" className="my-3">
                <Image
                  roundedCircle
                  width={70}
                  height={70}
                  className="mr-3"
                  src={profile.user.photo}
                  alt=""
                />
                <Media.Body style={{'borderBottom': '1px solid darkgrey'}}>
                  <Link to={`/profiles/${profile.user._id}`}><h6 className="profile-item-name">{profile.user.name}</h6></Link>
                  <h7>
                    {profile.role} at {profile.company}
                  </h7>
                  <p className="profile-item-location"><i className="fas fa-map-marker-alt"></i> {profile.location}</p>
                </Media.Body>
              </Media>
            )
          })
            : <h5 className="profile-item-name">No results to display</h5>
      }</ul>)}
    </Container>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(PeopleSearch)