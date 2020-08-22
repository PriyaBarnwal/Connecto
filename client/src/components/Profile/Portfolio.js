import React from 'react'
import ProfileSection from './ProfileSection'

import '../../styles/portfolio.css'

const Portfolio = ({profile, editProfile}) => {
  return (
    <div className="portfolio">
      <section className="intro-section">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-8 mx-auto">
              {editProfile ? 
              (<button type="button" className="btn btn-dark edit-btn" onClick={()=> editProfile()}>
                <i className="fas fa-user-edit"/> Edit Profile
              </button>): null}
              <div className="intro">
                <div className="profile-img">
                  <img src={profile.user.photo} alt=""/>
                </div>
                <h2><b>{profile.user.name}</b></h2>
                <h4>{profile.role} at {profile.company}</h4>
                <ul className="information my-3">
                  <li><i className="fas fa-envelope"></i> {profile.user.email}</li>
                  <li className="my-3">
                    <div className="d-flex justify-content-around align-items-center">
                      {/* <button type="button" className="btn ">
                        <span className="badge badge-dark stat">40</span> Connections 
                      </button> */}
                      <ul className="social-icons">
                        {profile.social.youtube? <li className="social-link"><a href={profile.social.youtube} target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li> : null}
                        {profile.social.linkedIn?<li className="social-link"><a href={profile.social.linkedIn} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li>: null}
                        {profile.social.facebook?<li className="social-link"><a href={profile.social.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>: null}
                        {profile.social.twitter?<li className="social-link"><a href={profile.social.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>: null}
                        {profile.social.github?<li className="social-link"><a href={profile.social.github} target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a></li>: null}
                      </ul>
                      {/* <button type="button" className="btn ">
                        <span className="badge badge-dark stat">4</span> Posts
                      </button> */}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
	    </section>
      <section className="bio-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card about-card">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-book-reader"></i> About</h5>
                    <p className="card-text">{profile.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <ProfileSection data={profile.experience} id='experience'/>
        <ProfileSection data={profile.education} id='education'/>
        <section className="skills-section">
          <div className="row">
            <article className="col-sm-6">
              <div className="card about-card col-12">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fas fa-laptop-code"></i> Skills
                  </h5>
                  <div className="badge-group">
                    {profile.skills.map((skill,index) =><span key={index}className="badge badge-pill badge-light mr-3 mb-2 p-2">{skill}</span>)}
                  </div>
                </div>
              </div>
            </article>
            <article className="col-sm-6 mt-3 mt-sm-0">
              <div className="card about-card col-12">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fas fa-heart"></i> Hobbies
                  </h5>
                  <div className="badge-group">
                    {profile.hobbies.map((hobby,index) =><span key={index} className="badge badge-pill badge-light mr-3 mb-2 p-2">{hobby}</span>)}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Portfolio