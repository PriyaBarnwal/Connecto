const express = require('express')
const {body, validationResult} = require('express-validator')
const User = require('../../models/UserModel')
const Post = require('../../models/PostModel')
const authMiddleware = require('../../middlewares//authMiddleware')

const router = express.Router()

router.route('/')
  .get(
    authMiddleware.checkAuth,
    async(req,res) => {
      try {
        let posts = await Post.find().sort({date: -1})
        res.status(200).json({
          status: 'success',
          data: posts
        })
      }
      catch(err) {
        res.status(500).json({
          message: 'server error'
        })
      }
    }
  )
  .post(
    authMiddleware.checkAuth,
    [
      body('text', 'please enter text to post').not().isEmpty(),
      body('title', 'please enter a title').not().isEmpty()
    ],
    async(req,res) => {
      let errors = validationResult(req).errors
      if(errors && errors.length)
        return res.status(400).json({
          errors
        })
      try {
        let user = await User.findById(req.user)
        let newPost = new Post({
          user: req.user,
          name: user.name,
          profilephoto: user.photo,
          text: req.body.text,
          title: req.body.title
        })

        await newPost.save()

        res.status(200).json({
          status: 'success',
          data: newPost
        })
      }
      catch(err) {
        res.status(500).json({
          message: 'server error'
        })
      }
    }
  )
  
router.route('/:postid')
  .get(
    authMiddleware.checkAuth,
    async(req, res) => {
      try {
        let post = await Post.findById(req.params.postid)
        if(!post)
          return res.status(404).json({
            message: 'post not found'
          })

        res.status(200).json({
          status: 'success',
          data: post
        })
      } catch (err) {
        if(err.kind === 'ObjectId')
          return res.status(404).json({
            message: 'post not found'
          })
        res.status(500).json({
          message: 'server error'
        })
      }
    }
  )
  .delete(
    authMiddleware.checkAuth,
    async(req, res) => {
      try {
        let post = await Post.findById(req.params.postid)
        if(!post)
          return res.status(404).json({
            message: 'post not found'
          })

        if(post.user.toString() !== req.user)
          return res.status(401).json({
            message: 'You are not authorised to perform this action'
          })
          
        post.remove()
        res.status(200).json({
          status: 'success',
          message: 'post removed successfully'
        })
      } catch (err) {
        if(err.kind === 'ObjectId')
          return res.status(404).json({
            message: 'post not found'
          })
        res.status(500).json({
          message: 'server error'
        })
      }
    }
  )
  .patch(
    authMiddleware.checkAuth,
    async(req, res) => {
      try {
        let post = await Post.findById(req.params.postid)
        if(!post)
          return res.status(404).json({
            message: 'post not found'
          })

        if(post.user.toString() !== req.user)
          return res.status(401).json({
            message: 'You are not authorised to perform this action'
          })
          
        post.text = req.body.text || post.text
        await post.save()

        res.status(200).json({
          status: 'success',
          data: post
        })
      } catch (err) {
        if(err.kind === 'ObjectId')
          return res.status(404).json({
            message: 'post not found'
          })

        res.status(500).json({
          message: 'server error'
        })
      }
    }
  )

router.route('/:postid/like')
  .put(
    authMiddleware.checkAuth,
    async(req, res) => {
      try {
        let post = await Post.findById(req.params.postid)
        if(!post)
          return res.status(404).json({
            message: 'post not found'
          })
          
        let index = post.likes.map(like =>like.user.toString()).indexOf(req.user) 
          console.log(index)
        if(index=== -1)
          post.likes.unshift({
            user: req.user,
          })
        else
          post.likes.splice(index,1)

        await post.save()

        res.status(200).json({
          status: 'success',
          data: post.likes
        })

      }
      catch(err) {
        console.log(err)
        if(err.kind === 'ObjectId')
          return res.status(404).json({
            message: 'post not found'
          })

        res.status(500).json({
          message: 'server error'
        })
      }
    }
  )
  
router.route('/:postid/comments')
  .post(
    authMiddleware.checkAuth,
    [
      body('text', 'please enter text to post').not().isEmpty()
    ],
    async(req,res) => {
      let errors = validationResult(req).errors
      if(errors && errors.length)
        return res.status(400).json({
          errors
        })
      try {
        let post = await Post.findById(req.params.postid)
        if(!post)
          return res.status(404).json({
            message: 'post not found'
          })

        let user = await User.findById(req.user)
        let newComment = {
          user: req.user,
          name: user.name,
          profilephoto: user.photo,
          text: req.body.text
        }

        post.comments.unshift(newComment)

        await post.save()

        res.status(200).json({
          status: 'success',
          data: post.comments
        })
      }
      catch(err) {
        if(err.kind === 'ObjectId')
          return res.status(404).json({
            message: 'post not found'
          })

        res.status(500).json({
          message: 'server error'
        })
      }
    }
  )

router.route('/:postid/comments/:commentid')
  .delete(
    authMiddleware.checkAuth,
    async(req, res) => {
      try {
        let post = await Post.findById(req.params.postid)
        if(!post)
          return res.status(404).json({
            message: 'post not found'
          })
        let comments = post.comments
        let index = comments.map(comment =>comment._id).indexOf(req.params.commentid)

        if(index === -1)
          return res.status(404).json({
            message: "comment not found"
          })

        if(comments[index].user.toString() !== req.user)
          return res.status(401).json({
            message: 'You are not authorised to perform this action'
          })
          
        post.comments.splice(index, 1)
        await post.save()

        res.status(200).json({
          status: 'success',
          data: post.comments
        })
      } catch (err) {
        if(err.kind === 'ObjectId')
          return res.status(404).json({
            message: 'post/comment not found'
          })
        res.status(500).json({
          message: 'server error'
        })
      }
    }
  )

module.exports = router