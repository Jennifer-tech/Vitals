const vitalsService = require('../services/vitals.service')

exports.createVital = async(req, res) => {
    const patientID = req.params.id
    const doctorID = req.user
    const vitalInfo = req.body

    try {
        const vitalData = await vitalsService.create({...vitalInfo, patientID, doctorID})
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