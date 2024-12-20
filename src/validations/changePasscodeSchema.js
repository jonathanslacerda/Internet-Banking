const joi = require('joi')

const changePasscode = joi.object({
    email: joi.string().email().required().messages({
        'string.empty': 'email required',
        'string.email': 'email is not valid',
        'any.required': 'email required',
    }),

    old_passcode: joi.string().min(5).required().messages({
        'string.empty': 'passcode required',
        'any.required': 'passcode required',
        'string.base': 'Passcode must have letters and numbers',
        'string.min': 'Passcode must have at least 5 caracters'
    }),

    new_passcode: joi.string().min(5).required().messages({
        'string.empty': 'passcode required',
        'any.required': 'passcode required',
        'string.base': 'Passcode must have letters and numbers',
        'string.min': 'Passcode must have at least 5 caracters'
    })

})

module.exports = changePasscode;