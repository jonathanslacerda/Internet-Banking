const joi = require('joi')

const transferSchema = joi.object({
    origin_account: joi.number().required().positive().integer().messages({
        'number.base': 'The id must be a number.',
        'number.integer': 'The id must be a integer.',
        'number.positive': 'The id must to be a positive number.',
        'any.required': 'Id is required',
    }),
    destiny_account: joi.number().required().positive().integer().messages({
        'number.base': 'The id must be a number.',
        'number.integer': 'The id must be a integer.',
        'number.positive': 'The id must to be a positive number.',
        'any.required': 'Id is required',
    }),
    amount: joi.number().required().positive().integer().messages({
        'number.base': 'The id must be a number.',
        'number.integer': 'The id must be a integer.',
        'number.positive': 'The id must to be a positive number.',
        'any.required': 'Id is required',
    }),
    passcode: joi.string().min(5).required().messages({
        'string.empty': 'passcode required',
        'any.required': 'passcode required',
        'string.base': 'Passcode must have letters and numbers',
        'string.min': 'Passcode must have at least 5 caracters'
    })
})

module.exports = transferSchema