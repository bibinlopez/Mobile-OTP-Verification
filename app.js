const express = require('express')
const app = express()

require('dotenv').config();

const verifyRouter = require('./router/verify')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const notFound = require('./middleware/notFound')




app.use('/',verifyRouter)

app.use(notFound)

const port = 3000;
app.listen(port ,console.log( `listening on port ${port}......`))