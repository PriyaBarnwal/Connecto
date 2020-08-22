const express = require('express')
const {body, validationResult} = require('express-validator')
const Profile = require('../../models/ProfileModel')
const Post = require('../../models/PostModel')
const User = require('../../models/UserModel')
const authMiddleware = require('../../middlewares/authMiddleware')

const router = express.Router()

router.route('/myprofile')
  .get(
    authMiddleware.checkAuth,
    async(req, res) => {
      try {
        let myProfile = await Profile.findOne({user: req.user}).populate('user', ['name', 'email', 'photo'])

        res.status(200).json({
          status: 'success',
          data: myProfile
        })
      }
      catch(err) {
        res.status(500).json({
          status: 'failed',
          message: 'server error'
        })
      }
    }
  )
  .patch(
    authMiddleware.checkAuth,
    async(req, res) => {
      try {
        let profile = await Profile.findOne({user: req.user})
        if(!profile)
          return res.status(404).json({
            message: 'no page found!'
          })

        let fields = ['company', 'location', 'role', 'skills', 'githubusername', 'hobbies', 'bio'],
          update = {} 
          
        Object.keys(req.body).map(key => {
          if(fields.includes(key))
            update[key] = req.body[key]
          if(key=== 'skills')
            update[key] = update[key].split(',').map(skill =>skill.trim())
          if(key=== 'hobbies')
            update[key] = update[key].split(',').map(hobby =>hobby.trim())
        })

        update['social'] = {}
        update.social.youtube = req.body.youtube || profile.social.youtube
        update.social.linkedIn = req.body.linkedIn || profile.social.linkedIn
        update.social.twitter = req.body.twitter || profile.social.twitter
        update.social.facebook = req.body.facebook || profile.social.facebook

        let updatedProfile = await Profile.findOneAndUpdate({user: req.user}, update, {new: true})

        res.status(200).json({
          status: 'success',
          data: updatedProfile
        })
      }
      catch(err) {
        if(err.name === 'CastError')
          res.status(404).json({
            message: 'no page found!'
          })

        res.status(500).json({
          status: 'failed',
          message: 'server error'
        })
      }
    }
  )
  .delete(
    authMiddleware.checkAuth,
    async(req, res) => {
      try {
        await Post.deleteMany({ user: req.user });

        await Profile.findOneAndRemove({user: req.user})

        await User.findOneAndRemove({_id: req.user})

        res.status(204).json({
          status: 'success'
        })
      }
      catch(err) {
        if(err.name === 'CastError')
          res.status(404).json({
            message: 'no page found!'
          })

        res.status(500).json({
          message: err.message || 'server error'
        })
      }
    }
  )

router.route('/')
  .get(async(req,res) => {
    try {
      let profiles = await Profile.find().populate('user')

      if(req.query && req.query.name) {
        profiles = profiles.filter(profile => 
          profile.user.name.toLowerCase().includes(req.query.name.toLowerCase())
        )
      }
      res.status(200).json({
        status: 'success',
        data: profiles
      })
    }
    catch(err) {
      res.status(500).json({
        message: err.message || 'server error'
      })
    }
  })
  .post(
    authMiddleware.checkAuth,
    [
      body('skills', 'skills is required field').not().isEmpty(),
      body('role', 'please enter your role').not().isEmpty(),
      body('bio', 'please enter something about yourself').not().isEmpty(),
      body('hobbies', 'hobbies is required field').not().isEmpty(),
      body('company', 'please enter your company').not().isEmpty()
    ],
    async(req, res)=> {
      let errors = validationResult(req).errors
      if (errors && errors.length > 0)
        return res.status(400).json({
          status: 'fail',
          errors
        })
      try {
        const {company, location, role, skills, githubusername, youtube, facebook, linkedIn, twitter, bio, hobbies} = req.body

        let newProfile = new Profile({
          user: req.user,
          company,
          location,
          role,
          skills: skills.split(',').map(skill => skill.trim()),
          hobbies: hobbies.split(',').map(hobby => hobby.trim()),
          bio,
          githubusername,
          social : {}
        })

        youtube ? (newProfile.social.youtube = youtube): null
        facebook ? (newProfile.social.facebook = facebook): null
        linkedIn ? (newProfile.social.linkedIn = linkedIn): null
        twitter ? (newProfile.social.twitter = twitter): null

        await newProfile.save()

        let profile = await Profile.findOne({user: req.user}).populate('user', ['name', 'email', 'photo'])

        res.status(200).json({
          status: 'success',
          data: profile
        })
      } catch(err) {
        res.status(500).json({
          message: 'server error'
        })
      }
    })

router.route('/user/:userid')
  .get(async(req, res) => {
    try {
      let profile = await Profile.findOne({user: req.params.userid}).populate('user', ['name', 'email', 'photo'])

      if(!profile)
        return res.status(404).json({
          message: 'profile not found!'
        })

      res.status(200).json({
        status: 'success',
        data: profile
      })
    }
    catch(err) {
      if(err.name === 'CastError')
          res.status(404).json({
            message: 'no page found!'
          })
      res.status(500).json({
        message: 'server error'
      })
    }
  })

router.route('/experience')
  .put(
    authMiddleware.checkAuth,
    [
      body('company', 'Company name is required').not().isEmpty(),
      body('title', 'job title is required').not().isEmpty(),
      body('from', 'from date is required').not().isEmpty(),
      body('location', 'location is required').not().isEmpty()
    ],
    async(req, res) => {
      let errors = validationResult(req).errors
      if(errors && errors.length)
        return res.status(400).json({
          status: 'failed',
          errors
        })

      try {
        let profile = await Profile.findOne({user: req.user})

        profile.experience.unshift({
          company: req.body.company,
          title: req.body.title,
          description: req.body.description,
          from: req.body.from,
          to: req.body.to,
          iscurrent: req.body.iscurrent,
          location: req.body.location
        })

        await profile.save()

        res.status(200).json({
          status: 'success',
          data: profile
        })
      }
      catch(err) {
        res.status(500).json({
          message: 'server error'
        })
      }
    }
  )

router.route('/experience/:expid')
  .delete(
    authMiddleware.checkAuth,
    async(req, res) => {
      try {
        let profile = await Profile.findOne({user: req.user})

        profile.experience = profile.experience.filter(exp => exp.id!==req.params.expid)
        await profile.save()
  
        res.status(200).json({
          status: 'success',
          data: profile
        })
      }
      catch(err) {
        if(err.name === 'CastError')
          res.status(404).json({
            message: 'no page found!'
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
      try{
        let profile = await Profile.findOne({user: req.user})

        let index = profile.experience.map(exp =>exp._id).indexOf(req.params.expid) 

        if(index == -1) 
          return res.status(404).json({
            status: 'failed',
            message: 'no experience found of this id'
          })
  
        profile.experience[index] = Object.assign(profile.experience[index], req.body)

        await profile.save()

        res.status(200).json({
          status: 'success',
          data: profile
        })
      }
      catch(err) {
        if(err.name === 'CastError')
          res.status(404).json({
            message: 'no page found!'
          })

        res.status(500).json({
          message: 'server error'
        })
      }
    }
  )

router.route('/education')
  .put(
    authMiddleware.checkAuth,
    [
      body('school', 'School name is required').not().isEmpty(),
      body('degree', 'degree name is required').not().isEmpty(),
      body('from', 'from date is required').not().isEmpty(),
      body('subject', 'subject is required').not().isEmpty()
    ],
    async(req, res) => {
      let errors = validationResult(req).errors
      if(errors && errors.length)
        return res.status(400).json({
          status: 'failed',
          errors
        })

      try {
        let profile = await Profile.findOne({user: req.user})

        profile.education.unshift({
          school: req.body.school,
          degree: req.body.degree,
          description: req.body.description,
          from: req.body.from,
          to: req.body.to,
          iscurrent: req.body.iscurrent,
          subject: req.body.subject
        })

        await profile.save()

        res.status(200).json({
          status: 'success',
          data: profile
        })
      }
      catch(err) {
        res.status(500).json({
          message: 'server error'
        })
      }
    }
  )

router.route('/education/:eduid')
  .delete(
    authMiddleware.checkAuth,
    async(req, res) => {
      try {
        let profile = await Profile.findOne({user: req.user})

        profile.education = profile.education.filter(edu => edu.id!==req.params.eduid)
        await profile.save()

        res.status(200).json({
          status: 'success',
          data: profile
        })
      }
      catch(err) {
        if(err.name === 'CastError')
          res.status(404).json({
            message: 'no page found!'
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
      try{
        let profile = await Profile.findOne({user: req.user})
        
        let index = profile.education.map(edu =>edu._id).indexOf(req.params.eduid) 

        if(index == -1) 
          return res.status(404).json({
            status: 'failed',
            message: 'no education found of this id'
          })

        profile.education[index] = Object.assign(profile.education[index], req.body)

        await profile.save()

        res.status(200).json({
          status: 'success',
          data: profile
        })
      }
      catch(err) {
        if(err.name === 'CastError')
          res.status(404).json({
            message: 'no page found!'
          })
        res.status(500).json({
          message: 'server error'
        })
      }
    }
  )

module.exports = router