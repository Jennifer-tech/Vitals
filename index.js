const express = require('express');
const mongoose = require('mongoose');

const app = express()
require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use('/vitals', router)

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