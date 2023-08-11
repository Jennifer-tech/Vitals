const doctorModel = require('../models/doctorModel')
const patientModel = require('../models/patientModel')
const healthCareProviderModel = require('../models/healthCareProviderModel')

exports.doctorAuth = async(req, res, next) => {
    const _id = req.user
    try{
        const existingDoctor = await doctorModel.findOne({ _id, deleted: false})

        if(!existingDoctor){
            return res.status(403).json({
                success: false,
                message: "This user is not an authorized doctor"
            })
        };
        next()
    } catch(error){
        res.status(500).json({message:err.message})
    }
}

exports.patientAuth = async(req, res, next) => {
    const _id = req.user

    try{
        const existingPatient = await patientModel.findOne({ _id, deleted: false})

        if(!existingPatient){
            return res.status(403).json({
                success: false,
                message: "This user is not an authorized patient"
            })
        };
        next()
    } catch(error){
        res.status(500).json({ message: err.message })
    }
}

exports.healthCareProviderAuth = async(req, res, next) => {
    const _id = req.user

    try{
        const existinghealthCareProvider = await healthCareProviderModel.findOne({ _id, deleted: false})

        if(!existinghealthCareProvider){
            return res.status(403).json({
                success: false,
                message: "This user is not an authorized existinghealthCareProvider"
            })
        };
        next()
    } catch(error){
        res.status(500).json({ message: err.message })
    }
}