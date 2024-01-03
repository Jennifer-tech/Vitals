const router = require('express').Router();
const patientRouter = require('./patientRoute');
// const doctorRouter = require('./doctorRoute');
const healthRecordRouter = require('./healthRecordRoute');
const vitalRouter = require('./vitalsRoute')

require('dotenv').config()

router.use('/patients', patientRouter);
router.use('/patients/vitals', vitalRouter)
// router.use('/doctors', doctorRouter)
router.use("/doctors/hcps/:HCPid/healthRecord", healthRecordRouter);

module.exports = router
