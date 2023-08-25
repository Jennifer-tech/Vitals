const vitalsService = require('../services/vitals.service')

exports.createVital = async(req, res) => {
    const patientID = req.params.id
    const doctorID = req.user
    const vitalInfo = req.body

    try {
        const vitalData = await vitalsModel.create({...vitalInfo, patientID, doctorID})
        return res.status(200).json({
            success: true,
            message: vitalData
        })
    } catch (error) {
        res.status(500).json({
            'success': false,
            'message': error.message
        })
    }
}

// Fetch vital by ID
exports.getVitalByID = async (req, res) => {
    const _id = req.params.id
    
    try{
        const vitalData = await vitalsModel.findById({ _id })

        return res.status(201).json({
            success: true,
            message: 'Patient vitals fetched successfully',
            data: vitalData
        })
    } catch (error) {
        res.status(403).json({ success: false, message: error.message })                       
    }
}