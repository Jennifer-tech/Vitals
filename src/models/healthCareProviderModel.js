const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const healthCareProviderSchema = new mongoose.Schema(
  {
    wallet_address: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true
    },
    email: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    registrationNo: {
      type: String,
      required: true,
      unique: true
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  { timestamps: true }
);

healthCareProviderSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt); 
    next()
});

healthCareProviderSchema.methods.matchPassword = async function(password) {
    if(!password) throw new Error('Password is missing, cannot compare');

    try{
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (e){
        console.log("Error while comparing password!", e.message)
    }
}
healthCareProviderSchema.methods.toJSON = function(){
    const userData = this.toObject();

    delete userData.password;
    delete userData.deleted;
    return userData
}

const HCPModel = mongoose.model('HealthCareProvider', healthCareProviderSchema)

module.exports = HCPModel