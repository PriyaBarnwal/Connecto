const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const userRoute = require('./routes/api/user')
const authRoute = require('./routes/api/auth')
const profileRoute = require('./routes/api/profile')
const postsRoute = require('./routes/api/posts')

const app = express()
connectDB()

app.use(express.json())
app.use('/api/users', userRoute)
app.use('/api/profiles', profileRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`server has started on port ${port}`))