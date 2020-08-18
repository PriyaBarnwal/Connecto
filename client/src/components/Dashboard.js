import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import PostItem from './Posts/PostItem'
import { getAllPosts} from '../actions/postActions'
import { Container, Row, Col, Spinner} from 'react-bootstrap'

const Dashboard = ({auth, posts, getAllPosts}) => {
  useEffect(()=>{
    getAllPosts()
  }, [getAllPosts])
  return (
    auth.loading || posts.loading? <Spinner animation='border' role='status'/>
    :(posts.posts && posts.posts.length> 0) ?(

    <Fragment>
      <h2>
        <i className="fas fa-user" /> Welcome {auth.user.name}
      </h2>
      {/* <PostForm /> */}
      <Container>
        <Row>
          <Col></Col>
          <Col md={8}>
            <div className="posts">
              {posts.posts.map((post) => 
                 <PostItem key={post._id} post={post} />)}
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      
    </Fragment>) : null
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts 
})

export default connect(mapStateToProps, {getAllPosts})(Dashboard)