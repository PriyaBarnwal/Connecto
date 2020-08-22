import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Carousel } from 'react-bootstrap'
import carousel3 from '../img/carousel-3.jpg'
import carousel4 from '../img/carousel-4.jpg'
import carousel1 from '../img/carousel-1.png'
import carousel2 from '../img/carousel-2.jpg'
import carousel5 from '../img/carousel-5.jpg'
import Loader from './Loader'

const HomeContainer = ({auth}) => {
  if(auth.loading)
    return <Loader/>

  if(auth.isAuthenticated) 
    return <Redirect to='/dashboard'/>

  return (
    <section className="landing-page">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel1}
            height="550"
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <Badge variant="warning"><h3>CONNECT</h3></Badge> */}
            <p>Connect with developers from all across the world</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel2}
            height="550"
            alt="Third slide"
          />
          <Carousel.Caption>
            {/* <Badge variant="warning"><h3>SHARE</h3></Badge> */}
            <p>Share your ideas with others through your posts</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel3}
            alt="Third slide"
            height="550"
          />
          <Carousel.Caption>
            {/* <Badge variant="warning"><h3>DISCUSS</h3></Badge> */}
            <p>Discuss with other developers to work on your ideas.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel4}
            alt="Fourth slide"
            height="550"
          />
          <Carousel.Caption>
          {/* <Badge variant="warning"><h3>LEARN</h3></Badge> */}
            <p>Learn from others and get motivated to enhance skills.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel5}
            alt="Fourth slide"
            height="550"
          />
          <Carousel.Caption>
          {/* <Badge variant="warning"><h3>CREATE</h3></Badge> */}
            <p>Create your dream portfolio.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="welcome">
        <h2>Welcome to devWEavers</h2>
        <p>A community where you can connect with other developers, share posts, learn, grow as a developer and also create your portfolio.</p>
        <Link to="/register" className="btn btn-outline-info btn-lg" role="button" >Get Started</Link>
      </div>
    </section>
  )
}

const mapStateToProps = state =>({
  auth: state.auth
})
export default connect(mapStateToProps)(HomeContainer)