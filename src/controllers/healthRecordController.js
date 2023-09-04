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

// Cancel HealthRecord as a Doctor
exports.cancelHealthRecord = async (req, res) => {
    const healthRecordID = req.body
    try {
        // Update the HCP ref
        await healthRecordService.update({
            _id: healthRecordID
        },
            {
                "$set": { approvalState: true, status: "Cancelled", deleted: true }
            })
        return res.status(200).json({ Success: true, message: "This healthRecord has been Cancelled" })

    } catch (error) {
        res.status(500).json({ "Success": false, "message": error.message });
    }
}

// Fetch all healthRecord for doctor
exports.getAllDoctorHealthRecords = async (req, res) => {
    const doctor_id = req.user

    try {
        const healthRecordData = await healthRecordService.getAll({ doctor_id })

        return res.status(201).json({
            success: true,
            message: 'Patient healthRecord fetched successfully',
            total: healthRecordData.length,
            totalhealthRecords: healthRecordData,
        })
    } catch (error) {
        res.status(403).json({ success: false, message: error.message })
    }
}

// Fetch all unattended healthRecord for doctor
exports.getUnattendedHealthRecords = async (req, res) => {
    const doctor_id = req.user

    try {
        const healthRecordData = await healthRecordService.getAll({ doctor_id, approvalState: false })

        return res.status(201).json({
            success: true,
            message: 'Patient healthRecord fetched successfully',
            totalhealthRecords: healthRecordData.length,
            totalhealthRecords: healthRecordData,
        })
    } catch (error) {
        res.status(403).json({ success: false, message: error.message })
    }
}

// fetch all patient under a doctor 
exports.getAllDoctorsPatients = async (req, res) => {
    const doctor_id = req.user

    try{
        const healthRecordData = await healthRecordModel.find({ doctor_id })

        // Make a for loop from the healthRecordData and appends the patient id to the patient_id list
        var patient_id = [];
        for(let i = 0; i < healthRecordData.length; i++) {
            patient_id.push(healthRecordData[i].patient_id.toString())
        }

        // removing duplicate id
        const patients = [...new Set(patient_id)];

        // Makes a for loop from the patient_id to get the doctor with their id then appends to the patient_details list
        var patient_details = [];
        for(let i = 0; i < patients.length; i++){
            const existingPatient = await patientService.findOne({ _id: patients[i], deleted: false })
            patient_details.push(existingPatient)
        }
        return res.status(201).json({
            success: true,
            message: 'Patient healthRecord fetched successfully',
            totalNo: patient_details.length,
            totalPatients: patient_details
        })
    } catch (error){
        res.status(403).json({ success: false, message: error.message })
    }
}

// Fetch all healthRecord for healthCareProvider
exports.getAllHCPhealthRecords = async (req, res) => {
    const HCP_id = req.user

    try {
        const Data = await healthRecordService.getAll({ HCP_id })

        return res.status(201).json({
            success: true,
            message: 'Patient healthRecords fetched successfully',
            Total_Count: Data.length,
            HealthRecords: Data
        })
    } catch (error) {
        res.status(403).json({ success: false, message: error.message })
    }
}

// Fetch all patients for healthCareProvider
exports.getAllHCPsPatients = async (req, res) => {
    const HCP_Id = req.user
    
    try{
        const healthRecordData = await healthRecordModel.find({ HCP_Id })

        // makes a for loop from the healthRecord datas and appends the doctor id to the patient_id list
        var patient_id = [];
        for(let i = 0; i < healthRecordData.length; i++) {
            patient_id.push(healthRecordData[i].patient_id.toString())
        }

        const patients = [...new Set(patient_id)]

        // Makes a for loop from the doc_id to get the patient with their id then appends to the patient_details list
        var patient_details =[];
        for(let i = 0; i < patients.length; i++){
            const existingPatient = await patientService.findOne({_id: patients[i], deleted: false })
            patient_details.push(existingPatient)
        }

        return res.status(201).json({
            success: true,
            message: "Patient healthRecord fetched successfully",
            totalNo: patient_details.length,
            totalhealthRecords: patient_details,
        })
    } catch (error) {
        res.status(403).json({ success: false, message: error.message })
    }
}

