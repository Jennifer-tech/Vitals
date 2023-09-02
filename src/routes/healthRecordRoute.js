const  validate = require('../middleware/validateMiddleware')
const { isAuth } = require('../middlewares/authenticationMiddleware')
const { doctorAuth } = require('../middlewares/pathMiddleware')
const { createSchema } = require('../schemas/healthRecordSchema')

const { createHealthRecord } = require('../controllers/healthRecordController');

// HealthRecord CRUD and Queries
router.post('/create', validate(createSchema), iAuth, doctorAuth, createHealthRecord);

module.exports = router