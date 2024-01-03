const router = require('express').Router();
const validate = require('../middlewares/validateMiddleware')
const { isAuth } = require('../middlewares/authenticationMiddleware')
const { doctorAuth, patientAuth } = require('../middlewares/pathMiddleware')
const { createSchema } = require('../schemas/vitalsSchema')

const { createVital, getVitalByID, getMyVitals } = require('../controllers/vitalsController')

router.post('/:id', validate(createSchema), isAuth, doctorAuth, createVital);
router.get("/:vitalID", isAuth, getVitalByID);
router.get("/me", isAuth, patientAuth, getMyVitals);

module.exports = router