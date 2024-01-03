const router = require('express').Router();
const validate = require('../middlewares/validateMiddleware')
const { isAuth } = require('../middlewares/authenticationMiddleware')
const { patientAuth } = require('../middlewares/pathMiddleware')
const {
    RegisterSchema,
    LoginSchema,
    UpdateSchema
} = require('../schemas/patientSchema')
const {
    register,
    login,
    deletePatient,
    updatePatient,
    fetchAllPatients,
    getPatientByID,
    getMyProfile
} = require('../controllers/patientControllers')

router.post('/login', validate(LoginSchema), login);
router.post("/register", validate(RegisterSchema), register);
router.patch('/', validate(UpdateSchema), isAuth, updatePatient)
router.delete('/', isAuth, deletePatient);
router.get('/all', isAuth, fetchAllPatients);
router.get('/', isAuth, getMyProfile);

// Global Search
router.get("/:id", getPatientByID)

module.exports = router