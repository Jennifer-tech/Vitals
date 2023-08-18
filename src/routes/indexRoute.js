const router = require('express').Router();
const patientRouter = require('./patientRoute')

require('dotenv').config()

router.use('/patients', patientRouter)

module.exports = router
