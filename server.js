const express = require('express')
const connectDB = require('./config/db')

const userRoute = require('./routes/api/user')
const authRoute = require('./routes/api/auth')
const profileRoute = require('./routes/api/profile')
const postsRoute = require('./routes/api/posts')

const app = express(),
  port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`server has started on port ${port}`))
connectDB()

app.use(express.json())
app.use('/api/users', userRoute)
app.use('/api/profile', profileRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)