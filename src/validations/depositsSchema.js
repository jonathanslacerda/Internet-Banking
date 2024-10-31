const joi = require('joi')

const depositSchema = joi.object({
    client_id: joi.number().required().positive().integer().messages({
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
    })
})

module.exports = depositSchema