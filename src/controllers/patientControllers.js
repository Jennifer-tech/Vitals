const patientModel = require('../models/patientModel')
const { storeImage } = require('../utils/cloudinaryUtil')
const { sendMail } = require('../utils/')

exports.register = async (req, res) => {
    const patientInfo = req.body

    try {
        // checking if the user already exists
        const existingEmail = await patientModel.findOne({
            email: patientInfo.email
        });
        const existingPhoneNumber = await patientModel.findOne({
            phoneNumber: patientInfo.phoneNumber
        })

        // Throw an error if email or phone number exists
        if (existingEmail || existingPhoneNumber) {
            return res.status(400).json({ message: 'Patient data already exists' });
        }

        // profile picture
        if (req.files !== undefined) {
            if (req.files.profile_img !== undefined) {
                var profile_img = await storeImage(req.files.profile_img.path)
            }
        }

        const patientData = await patientModel.create({ ...patientInfo, profile_img });

        // send welcoming email
        await sendMail(patientInfo.email, patientInfo.firstName, "patient")

        // Response
        res.status(200).json({ success: true, message: patientData })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingPatient = await patientModel.findOne({
            email: email,
            deleted: false
        })
        if (!existingPatient) return res.status(400).json({ message: "Patient does not exist" });

        const checkPassword = await existingPatient.matchPassword(password)
        if (!checkPassword)
            return res.status(400).json({ message: "Incorrect Password" })

        const token = encode_jwt({ _id: existingPatient._id, path: "patient" })

        res.status(200).json({
            token: token,
            Token_type: "Bearer",
            patient_ID: existingPatient._id
        });
    } catch (error) {
        res.status(500).jso({ message: error.message })
    }
}

exports.updatePatient = async (req, res) => {
    const updateData = req.body

    try {
        // check if selected email is already taken
        if (updateData.email) {
            const emailAvailable = await patientService.findOne({ email: updateData.email, deleted: false })

            if (emailAvailable) {
                return res.status(403).json({ success: false, message: "User with updated email already exists" })
            }
        }

        // profile picture
        if (req.files !== undefined) {
            if (req.files.profile._img !== undefined) {
                var profile_img = await storeImage(req.files.profile_img.path)
            }
        }

        const updatedData = await patientService.update(req.user, { ...updateData, profile_img })

        res.status(200).json({
            success: true,
            message: 'Patient updated successfully',
            data: updatedData
        })
    } catch (error) {
        res.status(401).son({ success: false, message: error.message })
    }
}

// Delete a patient
exports.deletePatient = async (req, res) => {
    const _id = req.user 
    try{
        const existingPatient = await patientService.findOne({ _id , deleted: false})
        if (!existingPatient)
        return res.status(404).json({ message: "Patient does not exist" });

        await patientService.update(req.user, {deleted: true})

        return res.status(200).json({
            success: true,
            message: "Patient deleted successfully",
        });
    } catch (error) {
        res.status(403).son({ success: false, message: error.message})
    }
}

// Fetch a single patient by ID
exports.getPatientByID = async (req, res) => {
    try{
        const myProfile = await patientService.findOne({
            _id: req.params.id,
            deleted: false
        });
        return res.status(201).json({
            success: true,
            message: "User fetched successfully",
            data: myProfile
        });
    } catch (error) {
        res.status(403).json({ success: false, message: error.message })
    }
}

// Fetch all patients in the db
exports.fetchAllPatients = async (req, res) => {
    try{
        // Find all the users in the system excluding the deleted ones
        const existingUser = await patientService.getAll({ deleted: false })
        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: existingUser,
        })
    } catch(error) {
        res.status(403).json({ success: false, message: error.message })
    }
}

// Get my profile
exports.getMyProfile = async (req, res) => {
    try {
        const myProfile = await patientService.findOne({
            _id: req.user,
            deleted: false
        })

        res.status(201).json({
            success: true,
            message: "User fetched successfully",
            data: myProfile,
        })
    } catch (error) {
        res.status(403).json({ success: false, message: error.message })
    }
}