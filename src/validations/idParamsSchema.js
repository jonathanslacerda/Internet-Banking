const joi = require('joi')

const idParamsSchema = joi.object({
    id: joi.number().required().positive().integer().messages({
        'number.base': 'The id must be a number.',
        'number.integer': 'The id must be a integer.',
        'number.positive': 'The id must to be a positive number.',
        'any.required': 'Id is required',
    }),
})

module.exports = idParamsSchema