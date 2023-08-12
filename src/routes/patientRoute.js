const router = require('express').Router();
const validate = require('../middlewares/validateMiddleware')
const { isAuth } = require('../middlewares/authenticationMiddleware')
const { patientAuth } = require('../middlewares/pathMiddleware')
const {
    RegisterSchema,
    LoginSchema
} = require('../schemas/patientSchema')
const {
    register,
    login
} = require('../controllers/patientControllers')

router.post('/register', validate(LoginSchema),login);
router.post("/register", validate(RegisterSchema), register);