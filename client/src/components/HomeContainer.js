import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import { connect } from 'react-redux'
import connection from '../img/connection.png'
import enhance from '../img/enhance.png'
import share from '../img/share3.png'
import discuss from '../img/discuss.png'
import portfolio from '../img/portfolio.png'

import Loader from './Loader'

const HomeContainer = ({auth}) => {
  if(auth.loading)
    return <Loader/>

  if(auth.isAuthenticated) 
    return <Redirect to='/dashboard'/>

  return (
    <Fragment>
      <div style={{backgroundColor: `rgb(5,87,131)`}}>
    <section className="welcome-page">
      <div className="welcome row">
        <div className="welcome-message col-sm-10 col-md-8 col-lg-6">
          <Fade left>
            <h1>Welcome to devWEavers</h1>
            <p>A community where you can connect with other developers, share posts, learn, grow as a developer and also create your portfolio.</p>
            <Link to="/register" className="btn btn-outline-info btn-lg" role="button" >Get Started</Link>
          </Fade>
        </div>
      </div>
    </section>
     <section className=" homepage-item row">
      <Zoom left cascade>
        <h1 >How Can We Help You?</h1>
      </Zoom>
    </section>
    <section className=" homepage-item row" style={{backgroundColor:'#ffa804'}}>
      <Fade left><div className="col-lg-6"><img src={connection} alt="connection" height={400}/></div></Fade>
      <div className="col-lg-6 about"><Fade right><p>Connect with developers from all across the world.</p></Fade></div>
    </section>
    <section className=" homepage-item row" style={{backgroundColor: `rgb(5,87,131)`}}>
      <Fade left><div className="col-lg-6 about"><p>Share your ideas with others through your posts.</p></div></Fade>
      <Fade right><div className="col-lg-6 order-first order-lg-last"><img src={share} alt="share" height={400}/></div></Fade>
    </section>
    <section className=" homepage-item row" style={{backgroundColor: `rgb(5,87,131)`}}>
      <Fade left><div className="col-lg-6 "><img src={discuss} alt="discuss" height={400}/></div></Fade>
      <Fade right><div className="col-lg-6 about"><p>Discuss with other developers to work on your ideas.</p></div></Fade>
    </section>
    <section className=" homepage-item row" style={{backgroundColor:'#ffa804'}}>
      <Fade left><div className="col-lg-6 about"><p>Learn from others and get motivated to enhance skills.</p></div></Fade>
      <Fade right><div className="col-lg-6 order-first order-lg-last"><img src={enhance} alt="learn" height={400}/></div></Fade>
    </section>
    <section className=" homepage-item row" style={{backgroundColor: `rgb(5,87,131)`}}>
      <Fade left><div className="col-lg-6"><img src={portfolio} alt="create" height={400}/></div></Fade>
      <Fade right><div className="col-lg-6 about"><p>Create your dream portfolio.</p></div></Fade>
    </section>
    </div>
    </Fragment>
  )
}

const mapStateToProps = state =>({
  auth: state.auth
})
export default connect(mapStateToProps)(HomeContainer)