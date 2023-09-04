const router = require('express').Router();
const validate = require('../middlewares/validateMiddleware')
const { isAuth } = require('../middlewares/authentication.middleware')
const { healthCareProviderAuth } = require('../middlewares/path.middleware')
const { RegisterSchema , LoginSchema, UpdateSchema } = require("../schemas/healthCareProvider.schema")

const { getDoctorByID } = require("../controllers/doctor.controller")
const { getAllHCPhealthRecords, getAllHCPsPatients } = require("../controllers/healthRecord.controller")
const {
    register
} = require('../controllers/healthCareProvider')


// HealthRecords and Patients
router.get("/healthRecords", isAuth, healthCareProviderAuth, getAllHCPhealthRecords);
router.get("/patients", isAuth, healthCareProviderAuth, getAllHCPsPatients);

