import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createPost, updatePost } from '../../actions/postActions'
import { Form, Button} from 'react-bootstrap'
import {withRouter, Redirect} from 'react-router-dom'

const initialState = {
  title: '',
  text: '',
  tags: ''
}

const PostForm = ({posts: {posts, error}, createPost, updatePost, history, match}) => {
  let [formData, setFormData] = useState(initialState)

  useEffect(() => {
    if(match.params && match.params.id)
      setFormData(posts.find(item =>item._id === match.params.id))
    },
    [posts, match.params]
  )

  const {title, text, tags} = formData
  const id = match.params && match.params.id

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    id ? updatePost(id, formData, history) : createPost(formData, history)
  }

  if(error.status === 404)
    return <Redirect to="/notFound"/>

  return (
    <Fragment>
      <div className="container form-container">
        <Form onSubmit={onSubmit} className="form">
          <Form.Group>
            <Form.Label>Title of Post<sup>*</sup></Form.Label>
            <Form.Control type="text" placeholder="Enter the title" name='title' value={title} onChange={onChange} required disabled={id ? 'true' : false}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Content<sup>*</sup></Form.Label>
            <Form.Control as="textarea" rows="15" type="text" name='text' value={text} onChange={onChange} required/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags<sup>*</sup> (Please use comma separated values)</Form.Label>
            <Form.Control type="tags" placeholder="eg. web-dev,ui-design,react" name='tags' value={tags} onChange={onChange} required disabled={id ? 'true' : false}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Fragment>
    
  )
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps, { createPost, updatePost })(withRouter(PostForm))
