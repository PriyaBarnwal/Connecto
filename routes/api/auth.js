const express = require('express')
const authMiddleware = require('../../middlewares/authMiddleware')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const config = require('config')
const User = require('../../models/UserModel')

const router = express.Router()

router.route('/')
  .get(authMiddleware.checkAuth, (req,res) => res.status(200).send('auth route'))


router.route('/login')
.post([
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'please enter password').exists()
], 
async(req, res) => {
  let errors = validationResult(req).errors
  if (errors && errors.length > 0)
    return res.status(400).json({
      status: 'fail',
      errors
    })
  let {email, password} = req.body

  try {
    let user = await User.findOne({email}).select('+password')

    if(!user || !(await bcrypt.compare(password, user.password))) 
      return res.status(400).json({
        status: 'failed',
        message: 'invalid credentials'
      })

    let token = jwt.sign({id: user.id}, config.get('JWT_SECRET'), {expiresIn: config.get('JWT_EXPIRY')})
    res.status(200).json({
      status: 'success',
      token
    })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      status: 'failed',
      message: err.message
    })
  }
})

module.exports = router