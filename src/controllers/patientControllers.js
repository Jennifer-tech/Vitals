const patientModel = require('../models/patientModel')
const { storeImage } = reuire('../controllers/patientControllers.js')

exports.register = async (req, res) => {
    const patientInfo = req.body

    try{
        // checking if the user already exists
        const existingEmail = await patientModel.findOne({
            email: patientInfo.email
        });
        const existingPhoneNumber = await patientModel.findOne({
            phoneNumber: patientInfo.phoneNumber
        })

        // Throw an error if email or phone number exists
        if(existingEmail || existingPhoneNumber){
            return res.status(400).json({ message: 'Patient data already exists' });
        }

        // profile picture
        if(req.files !== undefined){
            if(req.files.profile_img !== undefined) {
                var profile_img = await storeImage(req.files.profile_img.path)
            }
        }

        const patientData = await patientModel.create({...patientInfo, profile_img});

        // send welcoming email
        await sendEmail(patientInfo.email, patientInfo.firstName, "patient")

        // Response
        res.status(200).json({ success: true, message: patientData })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};

