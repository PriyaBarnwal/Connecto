import React, {Fragment, useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {getPostById, removeComment, addComment, clearPost, toggleLike} from '../../actions/postActions'
import { Container, Row, Image, Col, Badge, Media, Button, Form } from 'react-bootstrap'
import Moment from 'react-moment'
import Loader from '../Loader.js'

const hasUserLiked = (post, user) => {
  return post.likes.findIndex(like=> like.user.toString() === user._id) === -1 ? 'not-liked' : 'liked'
}

const ViewPost = ({posts: {post, posts}, auth: {user}, getPostById, removeComment, addComment, toggleLike, match, computedMatch}) => {
  useEffect(()=> {
    clearPost()
    getPostById(computedMatch.params.id)
  }, [getPostById, computedMatch.params.id, posts])

  let [text, setComment] = useState('')

  return (
    <Fragment>
      {post === null ? (
        <Loader/>
      ) : (
        <Fragment>
          <Container className="pt-3">
            <Row className="post-header">
              <Col xs={3}>
                <Link to={`/profiles/${post.user}`}>
                  <Image
                    className="d-flex"
                    roundedCircle
                    width={70}
                    height={70}
                    src={post.profilephoto}
                    alt=""
                  />
                </Link>
                <Link to={`/profiles/${post.user}`}>
                  <h7 className="color-prime">{post.name}</h7>
                </Link>
              </Col>
              <Col style={{textAlign: 'center'}}>
                <h3>{post.title}</h3>
                <p className="text-muted" style={{'fontSize': 'small'}}><i className="fas fa-calendar-alt"> </i> <Moment format="DD-MMM-YYYY hh:mm A">{post.date}</Moment></p>
                {post.tags.map((tag,index) => <Badge className="mx-2" key={index} pill variant="warning">{tag}</Badge>)}
              </Col>
              <Col xs={2} className="mt-auto" style={{textAlign: 'right'}}>
                <Button className={`transparent-button ${hasUserLiked(post, user)}`} onClick={()=> toggleLike(post._id)}><i className="fas fa-thumbs-up"/> {post.likes.length}</Button>
              </Col>
            </Row>
            <Row className="post-container" ><p>{post.text}</p></Row>
            <Row className="post-header my-3" id="comments-container">
              <Col>
                <Media className="p-3">
                  <Image
                    roundedCircle
                    width={50}
                    height={50}
                    className="mr-3 mb-3"
                    src={user.photo}
                    alt=""
                  />
                  <Media.Body className="d-flex justify-content-between">
                    <Form style={{width: '100%'}} 
                      onSubmit={(e)=> {
                        e.preventDefault()
                        addComment(post._id, {text})
                        setComment('')
                      }}>
                      <Form.Group style={{width: '100%', display: 'flex'}}>
                        <Form.Control as="textarea" value={text} onChange={(e)=>setComment(e.target.value)} placeholder="Join the discussion"/>
                        <Button type="submit" className="transparent-button color-prime ml-2"><i className="fas fa-paper-plane"/></Button>
                      </Form.Group>
                    </Form>
                  </Media.Body>
                </Media>
              <ul className="list-unstyled comments-container">
                {post.comments.map(coment => 
                <Media as="li" className="m-2">
                  <Image
                    roundedCircle
                    width={50}
                    height={50}
                    className="mr-3"
                    src={coment.profilephoto}
                    alt=""
                  />
                  <Media.Body className="d-flex justify-content-between  border-bottom">
                    <div>
                    <Link to={`/profiles/${coment.user}`}><p className="color-prime mb-0">{coment.name}</p></Link>
                    <p className="text-muted mb-1" style={{'fontSize': 'x-small'}}>
                      <Moment format="DD-MMM-YYYY hh:mm A">{coment.date}</Moment></p>
                    <p style={{'fontSize': 'small'}}>
                      {coment.text}
                    </p>
                    </div>
                    {user._id === coment.user.toString() ?
                    <Button className="transparent-button mr-3" onClick={()=>removeComment(post._id, coment._id)}>
                      <i style={{color:"white"}} className="fas fa-trash"></i>
                    </Button>: null}
                  </Media.Body>
                </Media>)}
              </ul>
                </Col>
            </Row>
          </Container>
        </Fragment>
      )}
    </Fragment>
  )
}

const mapStateToProps =(state) => ({
  posts: state.posts,
  auth: state.auth
})

export default connect(mapStateToProps, {getPostById, toggleLike, removeComment, addComment})(ViewPost)