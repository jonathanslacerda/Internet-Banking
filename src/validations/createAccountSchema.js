const joi = require('joi')

const createAccountSchema = joi.object({
    
    fullname: joi.string().required().messages({
        'string.empty': 'full name required',
        'any.required': 'full name required',
        'string.base': 'full name field must be only letters'
    }),

    email: joi.string().email().required().messages({
        'string.empty': 'email required',
        'string.email': 'email is not valid',
        'any.required': 'email is required',
    }),

    register: joi.string().max(11).required().messages({
        'string.empty': 'Register required',
        'string.max': 'Register must have 14 caracters max',
        'any.required': 'Register required'
    }),

    passcode: joi.string().min(5).required().messages({
        'string.empty': 'passcode required',
        'any.required': 'passcode required',
        'string.base': 'Passcode must have letters and numbers',
        'string.min': 'Passcode must have at least 5 caracters'
    })
})

module.exports = createAccountSchema