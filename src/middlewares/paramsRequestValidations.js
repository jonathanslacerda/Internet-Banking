const paramsRequestValidations = joiSchema => async (req, res, next) => {
    try {
        await joiSchema.validateAsync(req.params)
        next()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = paramsRequestValidations;