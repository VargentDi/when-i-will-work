const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const shiftHandler = require('./router/shifts')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    console.log('hello world')
})

app.use('/v1/shifts', shiftHandler)


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
