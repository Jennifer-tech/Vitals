const healthRecordModel = require('../models/healthRecordModel')
// create HealthRecord as a doctor
exports.createHealthRecord = async (req, res) => {
    const doctor_id = req.user
    const healthRecordInfo = req.body
    const HCP_id = req.originalUrl.slice(21, 45);

    try{
        const healthRecordData = await healthRecordModel.create({
            ...healthRecordInfo, doctor_id, HCP_id
        })
        return res.status(200).json({ success: true, message: healthRecordData})
    } catch (error){
        res.status(500).json({ Success: false, message: error.message })
    }
}

