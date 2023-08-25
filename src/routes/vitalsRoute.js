const router = require('express').Router();
const validate = require('../middlewares/validateMiddleware')
const { isAuth } = require('../middlewares/authenticationMiddleware')
const { doctorAuth, patientAuth } = require('../middlewares/pathMiddleare')
const { createSchema } = require('../schemas/vitalsSchema')

const { createVital } = require('../controllers/vitalsController')

router.post('/:id', validate(createSchema), isAuth, doctorAuth, createVital);