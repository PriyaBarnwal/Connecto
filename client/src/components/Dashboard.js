import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import PostItem from './Posts/PostItem'
import { getAllPosts} from '../actions/postActions'
import { Container, Row, Col} from 'react-bootstrap'
import Loader from './Loader.js'

const Dashboard = ({auth, posts, getAllPosts}) => {
  useEffect(()=>{
    getAllPosts()
  }, [getAllPosts])
  return (
    auth.loading || posts.loading || !auth.user? <Loader/>
    :(posts.posts && posts.posts.length> 0) ?(

    <Fragment>
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