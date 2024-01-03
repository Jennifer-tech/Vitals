const router = require('express').Router();
const validate = require('../middlewares/validateMiddleware')
const { isAuth } = require('../middlewares/authenticationMiddleware')
const { healthCareProviderAuth } = require('../middlewares/pathMiddleware')
const { RegisterSchema , LoginSchema, UpdateSchema } = require("../schemas/healthCareProviderSchema")

// const { getDoctorByID } = require("../controllers/doctorController")
const { getAllHCPhealthRecords, getAllHCPsPatients } = require("../controllers/healthRecordController")
const {
    register
} = require('../controllers/healthCareProvider')

router.post("/register", validate(RegisterSchema), register);
// HealthRecords and Patients
router.get("/healthRecords", isAuth, healthCareProviderAuth, getAllHCPhealthRecords);
router.get("/patients", isAuth, healthCareProviderAuth, getAllHCPsPatients);

module.exports = router