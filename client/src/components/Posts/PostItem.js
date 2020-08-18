import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Card, Image, OverlayTrigger, Popover, Button, ListGroup} from 'react-bootstrap'
import {deletePost, toggleLike, updatePost} from '../../actions/postActions'
import Moment from 'react-moment'
import '../../styles/feed.css'

const PostItem = ({post, deletePost, toggleLike, updatePost, auth}) => {
  let liked = post.likes.findIndex(like=> like.user.toString() === auth.user._id) === -1 ? '' : 'liked'

  return (
    <Fragment>
      <Card className="my-3">
        <Card.Body className="d-flex pb-0">
          <Link to={`/profiles/${post.user}`}><Image roundedCircle width={60} height={60} src={post.profilephoto}/></Link>
          <div className="mx-3">
          <Link to={`/profiles/${post.user}`}><h5 className="mb-0 color-prime">{post.name}</h5></Link>
            <p className="text-muted" style={{'fontSize': 'small'}}><Moment format="DD-MMM-YYYY hh:mm A">{post.date}</Moment></p>
          </div>
          {auth.isAuthenticated && auth.user._id === post.user ?
          (<div className="ml-auto">
          <OverlayTrigger
            trigger="focus"
            placement='bottom'
            overlay={
              <Popover>
                <Popover.Content>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Button className="transparent-button">
                      <i className="fas fa-pencil-alt"></i> Edit
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button className="transparent-button" onClick={()=>deletePost(post._id)}>
                      <i className="fas fa-trash-alt"></i> Delete
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
                </Popover.Content>
              </Popover>
            }
          >
            <Button className="transparent-button"><i className="fas fa-ellipsis-v"></i></Button>
          </OverlayTrigger>
          </div>): null}
        </Card.Body>
        <Card.Body>
          <Card.Title>Live Search with React</Card.Title>
          {post.text.length> 500 
            ? <Card.Text>{post.text.slice(0,500)}... <Link className="simple-arrow">Read</Link></Card.Text>
            : <Card.Text>{post.text}</Card.Text>}
        </Card.Body>
        <Card.Footer className="d-flex">
          <Button className={`transparent-button ${liked}`} onClick={()=> toggleLike(post._id)}><i className="fas fa-thumbs-up"/> {post.likes.length}</Button>
          <Button className="transparent-button pl-3"><i className="fas fa-comments"/> {post.comments.length}</Button>
        </Card.Footer>
      </Card>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  auth: state.auth 
})

export default connect(mapStateToProps, {deletePost, updatePost, toggleLike})(PostItem)



