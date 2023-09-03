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

// approve healthRecord as a doctor
exports.approveHealthRecord = async (req, res) => {
    const healthRecordID = req.params.id
    try{
        const existingHealthRecord = await healthRecordModel.findOne({ _id: healthRecordID })
        if(!existingHealthRecord) return res.status(404).json({success: false, message: "HealthRecord not found"})

        await healthRecordModel.findByIdAndUpdate({
            _id: healthRecordID
        },
            {
                "$set": { approvalState: true, status: "Attended" }
            }
        )
        return res.status(200).json({ success: true, message: "This healthRecord has been attended to" })
    } catch (error) {
        res.status(500).json({ "Success": false, "message": error.message });
    }
}

