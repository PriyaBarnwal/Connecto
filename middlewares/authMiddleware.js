const jwt = require('jsonwebtoken')
const config = require('config')

exports.checkAuth = async(req, res, next) => {
  let token = req.header('x-auth-token')
  if(!token) 
    return res.status(401).json({
      status: 'failed',
      message: 'access denied'
    })
  try {
    let decoded = jwt.verify(token, config.get('JWT_SECRET'))
    console.log(decoded)
    req.user = decoded.id
    next()
  } catch(err) {
    return res.status(401).json({
      status: 'failed',
      errors: [{ msg: 'token is not valid. access denied. Please login again.'}]
    })
  }
}