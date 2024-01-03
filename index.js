const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./src/middlewares/errorMiddleware')
const router = require('./src/routes/indexRoute')
const formData = require("express-form-data")

const app = express()
require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(formData.parse())

app.use(require("cors")()) 
app.use('/vitals', router)

// Error handler
app.use(errorHandler)

// Database connection
mongoose.connect(process.env.MONGODB_URI_OFFLINE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})
.then(() => {
    console.log('DB connected!')
})
.catch((err) => {
    console.log(`An error occured while connecting to the database`)
})

const port = process.env.PORT || 4848
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})