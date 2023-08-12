const joi = require('joi')

// joi validation schema used to verify req data
const RegisterSchema = joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().min(6).required(),
    confirm_password: joi.any().equal(joi.ref('password'))
        .required()
        .label('Confirm password')
        .message({ 'any.only': '{{#label}} does not match' }),
    phoneNumber: joi.string().required()
})

const LoginSchema = joi.object().keys({
    email: joi.string().required().email(),
    password: joi.string().min(6).required()
})

module.exports = {
    RegisterSchema,
    LoginSchema
}