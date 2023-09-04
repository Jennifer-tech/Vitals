const  validate = require('../middleware/validateMiddleware')
const { isAuth } = require('../middlewares/authenticationMiddleware')
const { doctorAuth } = require('../middlewares/pathMiddleware')
const { createSchema } = require('../schemas/healthRecordSchema')

const { createHealthRecord,
        aprroveHealthRecord,
        getAllDoctorHealthRecords
 } = require('../controllers/healthRecordController');

// HealthRecord CRUD and Queries
router.post('/create', validate(createSchema), isAuth, doctorAuth, createHealthRecord);
router.delete("/:id", isAuth, doctorAuth, cancelHealthRecord);

router.get("/all", isAuth, doctorAuth, getAllDoctorHealthRecords);
router.get("/patients", isAuth, doctorAuth, getAllDoctorsPatients);

router.get("/pending", isAuth, doctorAuth, getUnattendedHealthRecords);
router.get("/:id", isAuth, doctorAuth, approveHealthRecord);



module.exports = router