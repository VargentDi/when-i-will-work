const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const shiftHandler = require('./router/v1/shifts')
const shiftHandlerV2 = require('./router/v2/shifts')
const userHandler = require('./router/v2/user')
const authHandler = require('./router/login/auth')
const authMiddleware = require('./_helper/authMiddleware')
const roleMiddleWare = require('./_helper/validOperationMiddleware')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    console.log('hello world')
    res.status(200)
})
app.post('/login', authHandler)
app.use("/v2/users", authMiddleware, roleMiddleWare, userHandler)

//v1 not support authentication
app.use('/v1/shifts', shiftHandler)
//v2 support authentication
app.use('/v2/shifts', authMiddleware, roleMiddleWare, shiftHandlerV2)
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))


module.exports = app
