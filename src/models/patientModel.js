const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const patientSchema = new mongoose.Schema({
    wallet_address: {
        type: String,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: [true, "A user must have an email"],
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      max: 11,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["M", "F", "LGBTQ"],
    },
    allergies: {
      type: "array",
      of: "string",
    },
    bio: {
      type: String,
      trim: true,
    },
    height: {
      type: String,
      trim: true,
    },
    Weight: {
      type: String,
      trim: true,
    },
    blood_group: {
      type: String,
      enum: ["O+", "O-", "A-", "A+", "B-", "B+", "AB-", "AB+"],
      trim: true,
    },
    genotype: {
      type: String,
      enum: ["AA", "AS", "SS", "AC", "SC"],
      trim: true,
    },
    resetLink: {
      type: String,
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    profile_img: {
      type: String,
    }
  },
  { timestamps: true }
);

// Encrypt password befor pushing to database
patientSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

patientSchema.methods.matchPassword = async function (password) {
    if(!password) throw new Error('Password is missing, cannot compare');

    try{
        const result = await bcrypt.compare(password, this.password)
        return result;
    } catch (e) {
        console.log('Error while comapring password!', e.message)
    }
}

patientSchema.methods.toJSON = function () {
    const userData = this.toObject()

    delete userData.password;
    delete userData.deleted;
    return userData
}
const patientModel = mongoose.model('Patient', patientSchema)
module.exports = patientModel