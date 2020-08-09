const express = require('express')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const config = require('config')
const User = require('../../models/UserModel')

const router = express.Router()

router.route('/')
  .get((req,res) => res.status(200).send('User route'))

router.route('/register')
  .post([
    body('name', 'name is required').not().isEmpty(),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'password length should be greater than 7').isLength({min:7})
  ], 
  async(req, res) => {
    let errors = validationResult(req).errors
    if (errors && errors.length > 0)
      return res.status(400).json({
        status: 'fail',
        errors
      })
    let {name, email, password} = req.body

    let photoUrl = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})
    try {
      let newUser = new User({
        name: name,
        email: email,
        password: password,
        photo: photoUrl
      })

      let salt= await bcrypt.genSalt(10)
      newUser.password = await bcrypt.hash(password, salt)

      await newUser.save()

      let token = jwt.sign({id: newUser.id}, config.get('JWT_SECRET'), {expiresIn: config.get('JWT_EXPIRY')})
      res.status(200).json({
        status: 'success',
        token
      })

    } catch(err) {
      res.status(500).json({
        status: 'failed',
        message: err.message
      })
    }
  })

module.exports = router